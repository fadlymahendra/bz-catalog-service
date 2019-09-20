'use strict';

exports.item = function (data) {
    return {
        id: data.id,
        sku: data.ProductVariant.sku,
        vendor_id: data.vendor_id,
        warehouse_id: data.warehouse_id,
        stock_available: data.stock_available,
        stock_used: data.stock_used,
        created_at: data.created_at,
        updated_at: data.updated_at
    };
};

exports.payloadLog = function (product, user) {
    return {
        action: 'putProductStockReverse',
        title: '',
        product_group_id: parseInt(product.ProductVariant.product_group_id),
        product_variant_id: parseInt(product.product_variant_id),
        product_vendor_id: parseInt(product.id),
        payload: {},
        user: {
            id: user.customer.person_id,
            name: `${user.first_name} ${user.last_name}`,
            email: user.username,
            type: 'vendor'
        },
        created_at: product.created_at,
        updated_at: product.updated_at
    };
};

module.exports = exports;
