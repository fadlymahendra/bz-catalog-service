'use strict';

exports.payloadLog = function (product, user, type) {
    return {
        action: type,
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
