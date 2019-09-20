'use strict';

const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Authorization = require('../../utils/authorization');
const ProductSkuRepository = require('../../repositories/product_sku_mapping');
const Transformer = require('../../transformers/products/sku_mapping');
const _ = require('lodash');

const itemsPayload = {
    catalog_id: Joi.string().required(),
    organization_id: Joi.number().required(),
    material_code: Joi.string().allow(''),
    material_group: Joi.string().allow(''),
    mapped: Joi.number().required().valid(0, 1),
    uom: Joi.string().allow('').default('0'),
    quantity_stocking_uom: Joi.number().allow('').default(0)
};

const schemaPayload = {
    sku: Joi.string().required(),
    items: Joi.array().required().items(itemsPayload)
};

const schema = Joi.object().keys({
    payload: Joi.array().required().items(schemaPayload)
});

exports.postProductMapping = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You have no authorization access');
    }

    let {
        body: input
    } = data;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const arrayMapping = [];
    const skuMapping = [];
    const payloadInsert = [];
    for (let i = 0; i < input.payload.length; i += 1) {
        const row = input.payload[i];
        for (let l = 0; l < row.items.length; l += 1) {
            const rowItems = row.items[l];
            const wheres = {};
            wheres.product_sku = row.sku;
            wheres['payload.catalog_id'] = rowItems.catalog_id;
            wheres['payload.organization_id'] = parseInt(rowItems.organization_id);

            const findMapping = await ProductSkuRepository.findMapping(wheres);
            let payload = {
                sku: row.sku,
                message: 'Failed'
            };
            if (!findMapping) {
                payload = {
                    sku: row.sku,
                    message: 'Success'
                };
            }

            arrayMapping.push(payload);
            skuMapping.push(row.sku);

            const uniqueId = new Date().getTime().toString();
            payloadInsert.push(Transformer.item(rowItems, row.sku, uniqueId, context));
        }
    }

    if (arrayMapping.length < 1) {
        throw BizzyError.BadRequest('One or More SKU Not Found');
    }

    const mappingFilter = _.find(arrayMapping, ['message', 'Failed']);
    if (mappingFilter) {
        throw BizzyError.BadRequest(`SKU ${mappingFilter.sku} sudah di mapping.`);
    }

    await ProductSkuRepository.insertMany(payloadInsert);

    // Reindex
    // let cursor = 0;
    // const concurrency = 2;
    // const diff = skuMapping.length;
    // const iteration = Math.ceil(diff / concurrency);

    // for (let c = 1; c <= iteration; c += 1) {
    //     const endCursor = cursor + concurrency;
    //     const item = _.slice(skuMapping, cursor, endCursor);
    //     cursor += concurrency;
    //     await WebhookRepository.trigger('FO_catalog_postProduct', context, {
    //         type: 'product_variant',
    //         id: _.uniq(item),
    //         data: Object.assign(input, {
    //             inserted_variants: [],
    //             updated_variants: []
    //         })
    //     });
    // }

    return {
        message: 'SUCCESS_CREATE_SKU_MAPPING'
    };
};

module.exports = exports;
