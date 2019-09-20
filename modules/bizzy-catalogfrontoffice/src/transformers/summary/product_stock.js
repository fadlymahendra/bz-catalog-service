'use strict';

exports.collection = function (data) {
    return {
        id: data.id,
        sku: data.ProductVariant.sku,
        long_name: data.ProductVariant.long_name,
        primary_image: data.ProductVariant.primary_image,
        stock_available: data.stock_available,
        sku_vendor: data.sku_vendor,
        product_group: {
            id: data.ProductVariant.ProductGroup.id,
            name: data.ProductVariant.ProductGroup.name
        },
        uom: {
            id: data.ProductVariant.ProductGroup.Uom.id,
            name: data.ProductVariant.ProductGroup.Uom.name
        }
    };
};

module.exports = exports;
