'use strict';

const Helper = require('../../utils/helper');

exports.item = function (data) {
    const productVariant = [];
    const productVendors = [];
    if (data.variants) {
        data.variants.forEach((element) => {
            productVariant.push({
                label: element.label,
                value: element.value
            });
        });
    }

    if (data.ProductVendors) {
        data.ProductVendors.forEach((element) => {
            productVendors.push({
                vendor_id: element.vendor_id
            });
        });
    }

    return {
        data: {
            id: data.id,
            sku: data.sku,
            product_group_id: data.ProductGroup.id,
            long_name: data.long_name,
            vendors: productVendors,
            primary_image: data.primary_image,
            additional_image: Helper.convertToArray(data.additional_image),
            variants: productVariant,
            is_discontinue: data.is_discontinue,
            is_active: data.is_active
        }
    };
};

module.exports = exports;
