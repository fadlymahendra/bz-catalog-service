'use strict';

const Promise = require('bluebird');
const { BizzyError, BizzyService } = require('bizzy-common');
const Joi = require('joi');
const _ = require('lodash');

const ProductVendorRepo = require('../../repositories/product_vendor');
const ProductVariantRepo = require('../../repositories/product_variant');
const TransformerPubUpdate = require('../../transformers/products/pub_update');

const STATUS_NOT_OK = 'NOT_OK';
const STATUS_OK = 'OK';

const schemaPath = Joi.object().keys({
    id: Joi.number().required()
});

const schemaBody = Joi.object().keys({
    products: Joi.array().min(1).required()
});

const schemaItem = Joi.object().keys({
    product_sku: Joi.string().allow('').allow(null).optional(),
    vendor_sku: Joi.string().allow('').allow(null).optional(),
    manufacturing_no: Joi.string().allow('').allow(null).optional(),
    stock: Joi.number().integer().strict().allow(null)
        .optional(),
    product_status: Joi.number().integer().valid([0, 1]).strict()
        .allow(null)
        .optional(),
    wholesales: Joi.array().optional().items(Joi.object().keys({
        tier: Joi.number().integer().strict().optional(),
        min: Joi.number().integer().strict().optional(),
        unit_price: Joi.number().integer().strict().optional()
    }))
}).or('stock', 'wholesales', 'product_status').unknown(true);

const schemaItemsParameter = Joi.object().keys({
    stock: Joi.required(),
    product_sku: Joi.required(),
    vendor_sku: Joi.required(),
    manufacturing_no: Joi.required(),
    product_status: Joi.required(),
    wholesales: Joi.array().required().items(Joi.object().keys({
        tier: Joi.required(),
        min: Joi.required(),
        unit_price: Joi.required()
    }))
}).unknown(true);

const schemaStock = Joi.object().keys({
    stock: Joi.number().positive().strict().allow(0)
        .allow(null)
        .allow('')
});

const schemaTier = Joi.object().keys({
    tier: Joi.number().positive().strict().valid([1, 2, 3])
});

const schemaMin = Joi.object().keys({
    min: Joi.number().positive().strict()
});

const schemaUnitPrice = Joi.object().keys({
    unit_price: Joi.number().positive().strict()
});

const updateItems = async (vid, items, context) => {
    await Promise.map(items, async (item) => {
        const { data } = item;
        if (!item.status) {
            const { ids, values } = data;
            await Promise.map(ids, async (id) => {
                await ProductVendorRepo.updateById(id, values);
                item.status = STATUS_OK;
                item.message = 'UPDATE_SUCCESS';
                item.updated_timestamp = new Date().getTime();
            }, { concurrency: 10 });

            // Trigger Webhook for 3rd Party IF entity IS NOT BCI
            if (parseInt(process.env.BCI_ID) !== context.user.organization_id) {
                await Promise.map(ids, async (id) => {
                    const pubProduct = TransformerPubUpdate.item(await ProductVendorRepo.findProductVendorWithDetailById({
                        id,
                        vendor_id: vid
                    }));
                    try {
                        await BizzyService.callAsync('bizzy-catalog-pubsub', 'publishUpdateProduct', {
                            context,
                            data: {
                                e: pubProduct
                            }
                        });
                    } catch (err) {
                        throw BizzyError.BadRequest(err.message);
                    }
                }, { concurrency: 10 });
            }
        }

        delete item.data;
    }, { concurrency: 10 });
};

const validateItemWholesales = async (item, values) => {
    const wholesales = item.wholesales;
    const minQtys = [];
    const unitPrice = [];
    let currentMinQty = 0;
    let prevUnitPrice = 0;
    const prices = _.orderBy(wholesales, ['tier'], ['asc']);

    await Promise.map(prices, async (price) => {
        const { tier, min, unit_price } = price;

        // Validate wholsale structure format
        try {
            await Joi.validate({ tier }, schemaTier);
        } catch (err) {
            if (!item.status) {
                item.status = STATUS_NOT_OK;
                item.message = 'INVALID_TIER';
                item.updated_timestamp = new Date().getTime();
            }
        }

        // Validate tier min qty number value format
        try {
            await Joi.validate({ min }, schemaMin);
        } catch (err) {
            if (!item.status) {
                item.status = STATUS_NOT_OK;
                item.message = 'INVALID_MIN_QTY';
                item.updated_timestamp = new Date().getTime();
            }
        }

        // Validate tier unit price number value
        try {
            await Joi.validate({ unit_price }, schemaUnitPrice);
        } catch (err) {
            if (!item.status) {
                item.status = STATUS_NOT_OK;
                item.message = 'INVALID_PRICE';
                item.updated_timestamp = new Date().getTime();
            }
        }

        if (minQtys.includes(min) || (min < currentMinQty)) {
            if (!item.status) {
                item.status = STATUS_NOT_OK;
                item.message = 'INVALID_MIN_QTY';
                item.updated_timestamp = new Date().getTime();
            }
        }

        if (unitPrice.includes(unit_price) || ((unitPrice.length !== 0) && (unit_price > prevUnitPrice))) {
            if (!item.status) {
                item.status = STATUS_NOT_OK;
                item.message = 'INVALID_PRICE';
                item.updated_timestamp = new Date().getTime();
            }
        }

        currentMinQty = min;
        minQtys.push(min);
        prevUnitPrice = unit_price;
        unitPrice.push(unit_price);

        values[`tier_min_qty_${tier}`] = min;
        values[`tier_cogs_price_${tier}`] = unit_price;
    }, { concurrency: 10 });
};

// Validate payload data with database items
const validateItemWithDatabaseItems = async (item, values) => {
    if (!item.status && item.data.ids.length > 0) {
        await Promise.map(item.data.ids, async (id) => {
            const productVendor = await ProductVendorRepo.findById(id);
            if (productVendor) {
                const wholesales = [];
                for (let i = 1; i <= 3; i++) {
                    const payloadTierPrice = values[`tier_cogs_price_${i}`];
                    const payloadTierMin = values[`tier_min_qty_${i}`];
                    const dbTierPrice = productVendor[`tier_cogs_price_${i}`];
                    const dbTierMin = productVendor[`tier_min_qty_${i}`];

                    // Tier data from payload, will replace data in DB
                    if (payloadTierPrice && payloadTierMin) {
                        wholesales.push({
                            tier: i,
                            min: payloadTierMin,
                            unit_price: Number(payloadTierPrice)
                        });
                        // Validation Invalid Tier, Previous Tier must be exist on DB
                        if (i > 1 && !productVendor[`tier_min_qty_${i - 1}`]) {
                            if (!item.status) {
                                item.status = STATUS_NOT_OK;
                                item.message = 'INVALID_TIER';
                                item.updated_timestamp = new Date().getTime();
                            }
                        }
                    } else if (dbTierMin) {
                        // Make sure, Min Qty on DB is not null
                        wholesales.push({
                            tier: i,
                            min: dbTierMin,
                            unit_price: Number(dbTierPrice)
                        });
                    }
                }
                item.wholesales = wholesales;
                if (!item.status) {
                    await validateItemWholesales(item, values);
                }
            } else {
                item.status = STATUS_NOT_OK;
                item.message = 'SKU_NOT_FOUND';
                item.updated_timestamp = new Date().getTime();
            }
        }, { concurrency: 10 });
    } else if (!item.status) {
        item.status = STATUS_NOT_OK;
        item.message = 'SKU_NOT_FOUND';
        item.updated_timestamp = new Date().getTime();
    }
};

const validateItem = async (id, item) => {
    // Full http reject
    try {
        await Joi.validate(item, schemaItemsParameter);
    } catch (err) {
        const errMessage = 'MISSING_PARAMETER';
        throw BizzyError.BadRequest(errMessage);
    }

    // Change to HTTP Level error
    try {
        await Joi.validate(item, schemaItem);
    } catch (err) {
        const errMessage = 'INVALID_REQUEST_FORMAT';
        throw BizzyError.BadRequest(errMessage);
    }

    const {
        product_sku: pSku, vendor_sku: vSku, manufacturing_no: mNum, wholesales, stock, product_status: productStatus
    } = item;

    // Empty sku payload
    if (!pSku && !vSku && !mNum) {
        if (!item.status) {
            item.status = STATUS_NOT_OK;
            item.message = 'EMPTY_SKU';
            item.updated_timestamp = new Date().getTime();
        }
    }

    const itemKeys = [];

    // Lies here item validation partial error
    // vendor_sku (product_vendor)
    if (vSku) {
        const where = { sku_vendor: vSku, vendor_id: id };
        const attributes = ['id', 'vendor_id', 'sku_vendor', 'tier_min_qty_1', 'tier_min_qty_2', 'tier_min_qty_3'];
        const items = await ProductVendorRepo.findAllByParam({ where, attributes });
        itemKeys.push({
            key: 'sku_vendor',
            value: vSku,
            ids: _.map(items, 'id')
        });
    }
    // product_sku (in table product_variant)
    if (pSku) {
        const items = await ProductVariantRepo.findOneProductVariant({ sku: pSku });
        itemKeys.push({
            key: 'product_sku',
            value: pSku,
            ids: _.chain(items)
                .filter((itemByManufacturingNo) => {
                    if (itemByManufacturingNo.vendor_id === id) {
                        return itemByManufacturingNo.id;
                    }
                    return null;
                })
                .map('id')
                .value()
        });
    }
    // manufacturing_no (in table product_group)
    if (mNum) {
        const items = await ProductVendorRepo.findAllByManufactureNo(mNum);
        itemKeys.push({
            key: 'manufacturing_no',
            value: mNum,
            ids: _.chain(items)
                .filter((itemByManufacturingNo) => {
                    if (itemByManufacturingNo.vendor_id === id) {
                        return itemByManufacturingNo.id;
                    }
                    return null;
                })
                .map('id')
                .value()
        });
    }

    if (wholesales && wholesales.length === 0) {
        if ((!stock && typeof stock !== 'number') && (!productStatus && typeof productStatus !== 'number')) {
            if (!item.status) {
                item.status = STATUS_NOT_OK;
                item.message = 'EMPTY_PRODUCT_DATA';
                item.updated_timestamp = new Date().getTime();
            }
        }
    }

    try {
        await Joi.validate({ stock: item.stock }, schemaStock);
    } catch (err) {
        if (!item.status) {
            item.status = 'NOT_OK';
            item.message = 'INVALID_STOCK';
            item.updated_timestamp = new Date().getTime();
        }
    }

    const values = {};
    if (item.product_status != null) values.is_active = item.product_status;
    if (item.stock != null) values.stock_available = item.stock;

    item.data = {
        ikeys: itemKeys,
        keys: _.map(itemKeys, 'ids'),
        values
    };
    item.data.ids = _.intersection(...item.data.keys);

    if (wholesales && wholesales.length > 0) {
        await validateItemWholesales(item, values);
    }
    await validateItemWithDatabaseItems(item, values);
    return true;
};

exports.apiUpdateCatalog = async (data, context) => {
    let { path, body } = data;
    const { products } = body;

    try {
        path = await Joi.validate(path, schemaPath);
        body = await Joi.validate(body, schemaBody);
    } catch (err) {
        const errMessage = 'INVALID_REQUEST_FORMAT';
        throw BizzyError.BadRequest(errMessage);
    }

    if (path.id !== context.user.organization_id) {
        throw BizzyError.Forbidden('NOT_AUTHORIZED');
    }

    if (products.length > 1000) {
        const err = 'EXCESS_DATA_LIMIT';
        throw BizzyError.UnprocessableEntity(err);
    }
    await Promise.map(products, async (item, index) => {
        const product = products[index];
        await validateItem(path.id, product);
    });


    await updateItems(path.id, products, context);
    const result = {
        vendor_id: path.id,
        products
    };
    return result;
};

module.exports = exports;
