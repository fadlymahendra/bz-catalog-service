'use strict';

const lod = require('lodash');

exports.collection = function (data, dataVendor) {
    const temp = {};
    const rows = [];

    if (dataVendor.length > 0) {
        lod.forEach(dataVendor, (value, key) => {
            temp[parseInt(value.product_variant_id)] = value.total_vendor;
        });
    }

    lod.forEach(data, (value, key) => {
        const primaryImageCount = value.primary_image === '' ? 0 : 1;
        const additionalImageCount = (value.additional_image === null || value.additional_image === '') ? 0 : JSON.parse(value.additional_image).length;
        const totalImage = primaryImageCount + additionalImageCount;
        const totalVendor = (temp[parseInt(value.product_variant_id)] ? temp[parseInt(value.product_variant_id)] : 0);

        rows[key] = {
            id: value.product_variant_id,
            product_group_id: value.product_group_id,
            sku: value.sku,
            long_name: value.long_name,
            is_active: value.is_active,
            is_discontinue: value.is_discontinue,
            total_vendor: totalVendor,
            total_image: totalImage
        };
    });

    return rows;
};

module.exports = exports;
