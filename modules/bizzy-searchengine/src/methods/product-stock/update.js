'use strict';

const { DBContext, BizzyError, BizzyService } = require('bizzy-common');
const Joi = require('joi');
const Promise = require('bluebird');
const ProductVariantRepository = require('../../repositories/product_variant');
const ProductVendorRepository = require('../../repositories/product_vendor');
const ProductLogRepository = require('../../repositories/product_log');
const Transformer = require('../../transformers/product-stock/update');
const TransformerHistory = require('../../transformers/product-stock/history');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const _ = require('lodash');

const schemaPayload = {
    sku: Joi.string().required(),
    vendor_id: Joi.number().positive().required(),
    warehouse_id: Joi.number().positive().required(),
    stock: Joi.number().positive().required()
};

const schemaEmptyPayload = {
    sku: Joi.string().required(),
    vendor_id: Joi.number().positive().required(),
    warehouse_id: Joi.number().positive().required()
};

const schema = Joi.object().keys({
    payload: Joi.array().required().items(schemaPayload)
});

const schemaEmpty = Joi.object().keys({
    payload: Joi.array().required().items(schemaEmptyPayload)
});

const insertProductLog = async function (beforeUpdate, afterUpdate, user, type) {
    const logFrame = TransformerHistory.payloadLog(afterUpdate, user, type);
    const logs = Helper.generateProductlog(_, logFrame, Helper.parseDataObject(beforeUpdate), Helper.parseDataObject(afterUpdate));
    await ProductLogRepository.insertOne(logs[0]);
};

const objectMessage = async function (result, row, input, context) {
    let message = 'Stok berhasil dikurangi';
    let status = true;
    if (result.stock_available < row.stock) {
        message = 'Stok tidak mencukupi untuk melakukan transaksi';
        status = false;
    } else {
        const payload = {
            stock_available: (result.stock_available - row.stock),
            stock_used: (result.stock_used + row.stock)
        };

        await ProductVendorRepository.update(result.id, payload);
    }

    let result2 = await ProductVendorRepository.findWithVariant(result.id);
    result2 = Helper.parseDataObject(result2);

    return {
        id: result2.id,
        sku: row.sku,
        beforeUpdate: result,
        afterUpdate: result2,
        product_variant_id: result2.product_variant_id,
        product_group_id: result2.ProductVariant.product_group_id,
        sku_vendor: result2.sku_vendor,
        vendor_id: result2.vendor_id,
        warehouse_id: result2.warehouse_id,
        stock_available: result2.stock_available,
        stock_used: result2.stock_used,
        stock: row.stock,
        message,
        status,
        created_at: result2.created_at,
        updated_at: result2.updated_at
    };
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

exports.putProductStock = async function (data, context) {
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

    const result3 = [];
    const productVariantIds = [];
    const beforeUpdate = [];
    const afterUpdate = [];

    await Promise.map(input.payload, async (item, i) => {
        const row = item;
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

        const objectMessages = await objectMessage(result2, row, input, context);

        if (!objectMessages.status) {
            await DBContext.rollback();
            const message = `Update Gagal ${objectMessages.sku_vendor} ${objectMessages.message}`;
            throw BizzyError.BadRequest(message);
        }

        beforeUpdate.push(objectMessages.beforeUpdate);
        afterUpdate.push(objectMessages.afterUpdate);
        result3.push(objectMessages);
    });

    // End Transaction
    await DBContext.commit();
    await reindexProduct(input, productVariantIds);
    const typeTitle = 'putProductStock';
    await Promise.map(beforeUpdate, async (item, i) => {
        await insertProductLog(beforeUpdate[i], afterUpdate[i], user, typeTitle);
    });

    return {
        data: result3.map(Transformer.item)
    };
};

exports.putProductStockEmpty = async function (data, context) {
    if (!Authorization.vendorAccessNoPath(data, context)) {
        throw BizzyError.Forbidden('You have no authorization access');
    }
    const user = Authorization.getUser(context);

    let {
        body: input
    } = data;

    try {
        input = await Joi.validate(input, schemaEmpty);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    // Start Transaction
    await DBContext.startTransaction();

    const productVariantIds = [];
    const beforeUpdate = [];
    const afterUpdate = [];

    await Promise.map(input.payload, async (item, i) => {
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

        productVariantIds.push(result.id);

        const productVendor = await ProductVendorRepository.findOne(wheresVendor);
        if (!productVendor) {
            await DBContext.rollback();
            throw BizzyError.NotFound('Vendor tidak ditemukan');
        }

        if (productVendor.stock_available === 0) {
            await DBContext.rollback();
            throw BizzyError.UnprocessableEntity('Stock Produk Sudah Kosong');
        }

        beforeUpdate.push(Helper.parseDataObject(productVendor));

        await ProductVendorRepository.update(productVendor.id, {
            stock_available: 0,
            stock_used: productVendor.stock_available + productVendor.stock_used
        });

        const afterProductUpdate = await ProductVendorRepository.findWithVariant(productVendor.id);

        afterUpdate.push(Helper.parseDataObject(afterProductUpdate));
    });

    // End Transaction
    await DBContext.commit();
    await reindexProduct(input, productVariantIds);
    const typeTitle = 'putProductStockEmpty';
    await Promise.map(beforeUpdate, async (item, i) => {
        await insertProductLog(beforeUpdate[i], afterUpdate[i], user, typeTitle);
    });

    return {
        message: 'SUCCESS_EMPTY_STOCK'
    };
};

module.exports = exports;
