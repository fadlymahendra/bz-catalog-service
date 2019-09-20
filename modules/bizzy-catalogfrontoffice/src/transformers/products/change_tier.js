'use strict';

exports.item = function (data) {
    return {
        id: data.id,
        tier_min_qty_1: data.tier_min_qty_1,
        tier_min_qty_2: data.tier_min_qty_2,
        tier_min_qty_3: data.tier_min_qty_3,
        tier_cogs_price_1: data.tier_cogs_price_1,
        tier_cogs_price_2: data.tier_cogs_price_2,
        tier_cogs_price_3: data.tier_cogs_price_3,
        vendor_id: data.vendor_id,
        warehouse_id: data.warehouse_id
    };
};

exports.payloadLog = function (product, user) {
    return {
        action: 'putProductTier',
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
