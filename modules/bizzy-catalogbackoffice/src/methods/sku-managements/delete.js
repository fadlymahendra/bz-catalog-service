'use strict';

const { DBContext, BizzyError, BizzyService } = require('bizzy-common');
const Promise = require('bluebird');
const Joi = require('joi');
const Authorization = require('../../utils/authorization');
const ZLib = require('zlib');

const ProductGroupRepo = require('../../repositories/product_group');
const ProductVariantRepo = require('../../repositories/product_variant');
const ProductVendorRepo = require('../../repositories/product_vendor');

const schema = Joi.object().keys({
    purchase_order_no: Joi.string(),
    data: Joi.string().required()
});

const unzipPayload = function (data) {
    const uncompressedString = ZLib.gunzipSync(Buffer.from(data, 'base64'));
    const jsonParse = JSON.parse(uncompressedString);
    return jsonParse;
};
exports.unzipPayloadDeletePrivateSku = unzipPayload;


exports.deletePrivateSku = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    let input = data;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    let poSkus;

    try {
        const payload = exports.unzipPayloadDeletePrivateSku(input.data);

        const poItems = payload.purchase_order.PurchaseOrderItems;
        poSkus = poItems.map(x => x.sku_no);
    } catch (err) {
        throw BizzyError.BadRequest('Fail to get No. SKU');
    }

    // get variants
    const findVariants = await ProductVariantRepo.findAll({
        sku: poSkus,
        is_free: 1
    });

    if (!findVariants) {
        throw BizzyError.NotFound('Sku Not Found');
    }

    const totalVariant = findVariants.length;
    let totalVendor = 0;
    let totalGroup;

    const productGroupIds = [];
    let findGroups = null;

    await DBContext.startTransaction();

    try {
        await Promise.map(findVariants, async (item, index) => {
            // push id product group
            productGroupIds.push(item.product_group_id);

            // update product variant
            await ProductVariantRepo.update(item.id, {
                is_active: 0
            });

            // get product vendor
            const findVendors = await ProductVendorRepo.findByVariant(item.id);

            if (findVendors.length > 0) {
                totalVendor += findVendors.length;

                // update product vendor
                await ProductVendorRepo.updateMany({
                    product_variant_id: item.id
                }, {
                    is_active: 0
                });
            }
        });

        // get product group
        findGroups = await ProductGroupRepo.findAll({
            id: productGroupIds
        });

        totalGroup = findGroups.length;

        await Promise.map(findGroups, async (item, index) => {
            // update product group
            await ProductGroupRepo.update(item.id, {
                status: 0,
                visibility: 0
            });
        });
    } catch (err) {
        await DBContext.rollback();
        throw BizzyError.InternalServerError(err.message);
    }

    await DBContext.commit();

    // delete reindex
    await Promise.map(findGroups, async (item, index) => {
        await BizzyService.callAsync('bizzy-searchengine', 'deleteIndex', {
            data: {
                body: {
                    type: 'product_group',
                    id: item.id
                }
            }
        });
    });

    return {
        data: {
            total_product_group: totalGroup,
            total_product_variant: totalVariant,
            total_product_vendor: totalVendor,
            message: 'Already success delete sku private'
        }
    };
};

module.exports = exports;
