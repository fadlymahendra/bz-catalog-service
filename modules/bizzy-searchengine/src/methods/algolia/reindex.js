'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Algoliasearch = require('algoliasearch');
const RawQueryRepository = require('../../repositories/raw_query');
const SyncServiceRepository = require('../../repositories/sync_service');
const Transformer = require('../../transformers/algolia/reindex');
const ReindexLogRepository = require('../../repositories/reindex_log');
const publisher = require('../../utils/publisher');
const compressor = require('../../utils/compressor');

const schema = Joi.object().keys({
    type: Joi.string().valid('product_group', 'product_variant'),
    id: Joi.required(),
    data: Joi.allow()
});

const algoliaConnect = function () {
    return Algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
};

const getWarehouse = async function (ids) {
    const result = {};
    try {
        result.warehouses = await SyncServiceRepository.findWarehouseByIds(ids.join(','));
    } catch (err) {
        result.messageError = `Data warehouse not found: ${err}`;
    }

    return result;
};

const getOrganization = async function (ids) {
    const result = {};
    try {
        result.organizations = await SyncServiceRepository.getOrganizationsByIds(ids.join(','));
    } catch (err) {
        result.messageError = `Organization not found: ${err}`;
    }

    return result;
};

exports.reindex = async function (data, context) {
    let {
        body: input
    } = data;

    const algolia = algoliaConnect();
    const index = algolia.initIndex(process.env.ALGOLIA_INDICES);

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    let arrayId = [];
    if (typeof input.id === 'string' || typeof input.id === 'number') {
        arrayId.push(input.id);
    } else {
        arrayId = input.id;
    }
    const payloadInsert = [];
    for (let i = 0; i < arrayId.length; i += 1) {
        const rows = arrayId[i];
        const products = await RawQueryRepository.getProductReindex(rows, input.type);

        let messageError = 'Success';
        if (products.length < 1) {
            messageError = 'Data product not found!';
        }
        const attributes = {};
        const others = {};

        if (products.length > 0) {
            const productGroupId = products[0].product_group_id;
            let warehouseIds = products.map((row) => {
                if (parseInt(row.is_active) === 1) {
                    return row.warehouse_id;
                }
            });
            const organizationIds = products.map((row) => {
                return row.vendor_id;
            });
            warehouseIds = warehouseIds.filter((el) => el != null);

            others.warehouses = {};
            others.warehouses.data = [];
            others.organizations = {};
            others.organizations.data = [];
            if (warehouseIds.length > 0 && organizationIds.length > 0) {
                const [warehouseResponse, organizationResponse] = await Promise.all(
                    [
                        getWarehouse(warehouseIds),
                        getOrganization(organizationIds)
                    ]
                );
                // warehouseResponse = await getWarehouse(warehouseIds);
                if (warehouseResponse.messageError) messageError = warehouseResponse.messageError;
                else others.warehouses = warehouseResponse.warehouses;

                if (organizationResponse.messageError) messageError = organizationResponse.messageError;
                else others.organizations = organizationResponse.organizations;
            } else {
                messageError = 'Product vendor not found!';
            }

            [
                attributes.variants,
                attributes.specifications
            ] = await Promise.all([
                RawQueryRepository.getVariantAttributenReindex(productGroupId),
                RawQueryRepository.getSpecificationAttributenReindex(productGroupId)
            ]);

            const payload = Transformer.collection(products, attributes, others);

            // upsert algolia
            index.addObjects(payload);
            await Promise.map(payload, item => publisher.reIndexAlgolia(compressor.compressObjectToString(item)), { concurrency: 100 });
            await Promise.delay(300);
        } else {
            messageError = 'Product variant not found!';
        }
        // Loggin reindex
        const uniqueId = new Date().getTime().toString();
        payloadInsert.push(Transformer.mongoInsert(messageError, rows, uniqueId, input));
    }

    await ReindexLogRepository.insertMany(payloadInsert);
    return {
        message: 'SUCCESS_UPSERT_ALGOLIA'
    };
};

module.exports = exports;
