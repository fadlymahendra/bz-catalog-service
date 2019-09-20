/* eslint-disable linebreak-style */

'use strict';

const _ = require('lodash');

const generateVariantValue = (data) => {
    if (data === 'NO_VARIANT') {
        return 'NO_VARIANT';
    }

    return JSON.parse(data);
};


exports.collectionVendor = function (data) {
    return {
        id: data.id,
        long_name: data.ProductVariant.long_name,
        sku: data.ProductVariant.sku
    };
};

const getPrivateSkuCount = function (data) {
    let result = 0;
    if (data.customer_id) result = 1;
    else if (data.is_private_sku) result = data.PrivateSkus.length;
    return result;
};

exports.collection = function (data) {
    const uomName = (data.ProductVariant.ProductGroup.Uom.name !== undefined ? data.ProductVariant.ProductGroup.Uom.name : '');

    const result = {
        id: data.id,
        long_name: data.ProductVariant.long_name,
        product_group_id: data.ProductVariant.ProductGroup.id,
        product_group_name: data.ProductVariant.ProductGroup.name,
        variant_value: generateVariantValue(data.ProductVariant.variant_value),
        primary_image: data.ProductVariant.primary_image,
        currency: data.currency,
        tier_min_qty_1: data.tier_min_qty_1,
        tier_min_qty_2: data.tier_min_qty_2,
        tier_min_qty_3: data.tier_min_qty_3,
        tier_cogs_price_1: data.tier_cogs_price_1,
        tier_cogs_price_2: data.tier_cogs_price_2,
        tier_cogs_price_3: data.tier_cogs_price_3,
        is_active: data.is_active,
        is_indent: data.is_indent,
        is_decimal: data.is_decimal,
        down_payment_type: data.down_payment_type,
        down_payment_value: data.down_payment_value,
        sku: data.ProductVariant.sku,
        sku_vendor: data.sku_vendor,
        stock_available: data.stock_available,
        is_private_sku: data.customer_id > 0 || data.is_private_sku,
        private_customers: getPrivateSkuCount(data),
        uom_name: uomName,
        created_at: data.created_at
    };
    return result;
};

exports.brandList = function (data) {
    const result = {
        id: data.ProductVariant.ProductGroup.Brand.id,
        name: data.ProductVariant.ProductGroup.Brand.name
    };

    return result;
};

exports.categoryList = function (data) {
    const result = {
        id: data.ProductVariant.ProductGroup.Category.Category.Category.Category.id,
        name: data.ProductVariant.ProductGroup.Category.Category.Category.Category.name
    };

    return result;
};

exports.listEcartSKU = function (datas, allCategory) {
    const result = [];
    datas.forEach((data) => {
        result.push({
            id: data.id,
            long_name: data.ProductVariant.long_name,
            product_group_id: data.ProductVariant.ProductGroup.id,
            product_group_name: data.ProductVariant.ProductGroup.name,
            description: data.ProductVariant.ProductGroup.description,
            category_id: data.ProductVariant.ProductGroup.category_id,
            variant_value: generateVariantValue(data.ProductVariant.variant_value),
            primary_image: data.ProductVariant.primary_image,
            currency: data.currency,
            tier_min_qty_1: data.tier_min_qty_1,
            tier_min_qty_2: data.tier_min_qty_2,
            tier_min_qty_3: data.tier_min_qty_3,
            tier_cogs_price_1: data.tier_cogs_price_1,
            tier_cogs_price_2: data.tier_cogs_price_2,
            tier_cogs_price_3: data.tier_cogs_price_3,
            is_active: data.is_active,
            sku: data.ProductVariant.sku,
            sku_vendor: data.sku_vendor,
            stock_available: data.stock_available,
            quantity_stocking_uom: data.ProductVariant.ProductGroup.quantity_stocking_uom,
            stock_uom: {
                id: data.ProductVariant.ProductGroup.StockingUom.id,
                name: data.ProductVariant.ProductGroup.StockingUom.name
            },
            dimentions: {
                package_length: data.ProductVariant.ProductGroup.package_length,
                package_width: data.ProductVariant.ProductGroup.package_width,
                package_height: data.ProductVariant.ProductGroup.package_height,
                package_weight: data.ProductVariant.ProductGroup.package_weight
            },
            categories: _.find(allCategory, { c3_id: data.ProductVariant.ProductGroup.category_id }),
            created_at: data.created_at
        });
    });
    return result;
};

module.exports = exports;
