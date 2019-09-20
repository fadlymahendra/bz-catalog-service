'use strict';

const { DBContext, BizzyError, BizzyService } = require('bizzy-common');
const Joi = require('joi');
const ProductVariantRepository = require('../../repositories/product_variant');
const ProductVendorRepository = require('../../repositories/product_vendor');
const ProductLogRepository = require('../../repositories/product_log');
const Transformer = require('../../transformers/product-stock/reverse');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const _ = require('lodash');

const schemaPayload = {
    sku: Joi.string().required(),
    vendor_id: Joi.number().positive().required(),
    warehouse_id: Joi.number().positive().required(),
    stock: Joi.number().positive().required()
};

const schema = Joi.object().keys({
    payload: Joi.array().required().items(schemaPayload)
});

const insertProductLog = async function (beforeUpdate, afterUpdate, user) {
    const logFrame = Transformer.payloadLog(afterUpdate, user);
    const logs = Helper.generateProductlog(_, logFrame, Helper.parseDataObject(beforeUpdate), Helper.parseDataObject(afterUpdate));
    await ProductLogRepository.insertOne(logs[0]);
};

const reindexProduct = async function (input, productVariantIds) {
    await BizzyService.callAsync('bizzy-searchengine', 'reindex', {
        data: {
            body: {
                type: 'product_variant',
                id: _.uniq(productVariantIds),
                data: input
            }
        }
    });
};

exports.putProductStockReverse = async function (data, context) {
    if (!Authorization.vendorAccessNoPath(data, context)) {
        throw BizzyError.Forbidden('You have no authorization access');
    }
    const user = Authorization.getUser(context);

    let {
        body: input
    } = data;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    // Start Transaction
    await DBContext.startTransaction();

    const productVariantIds = [];
    const beforeUpdate = [];
    const afterUpdate = [];

    for (let i = 0; i < input.payload.length; i++) {
        const row = input.payload[i];

        const wheres = {
            sku: row.sku,
            is_active: 1
        };
        const result = await ProductVariantRepository.findOne(wheres);
        if (!result) {
            await DBContext.rollback();
            throw BizzyError.NotFound('Produk tidak ditemukan');
        }

        const wheresVendor = {
            product_variant_id: result.id,
            vendor_id: row.vendor_id,
            warehouse_id: row.warehouse_id,
            is_active: 1
        };

        productVariantIds.push(result.sku);

        const result2 = await ProductVendorRepository.findOne(wheresVendor);
        if (!result2) {
            await DBContext.rollback();
            throw BizzyError.NotFound('Vendor tidak ditemukan');
        }

        const payload = {
            stock_available: (Number(result2.stock_available) + row.stock),
            stock_used: (result2.stock_used - row.stock)
        };

        beforeUpdate.push(result2);

        await ProductVendorRepository.update(result2.id, payload);

        let result3 = await ProductVendorRepository.findWithVariant(result2.id);
        result3 = Helper.parseDataObject(result3);
        afterUpdate.push(result3);
    }

    // End Transaction
    await DBContext.commit();
    await reindexProduct(input, productVariantIds);
    for (let i = 0; i < beforeUpdate.length; i++) {
        await insertProductLog(beforeUpdate[i], afterUpdate[i], user);
    }

    return {
        data: afterUpdate.map(Transformer.item)
    };
};

module.exports = exports;
