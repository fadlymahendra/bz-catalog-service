'use strict';

exports.transformBrand = function (data) {
    return {
        id: data.id,
        name: data.name,
        logo: data.image_url,
        total_sku: data.total_sku,
        is_active: data.is_active
    };
};


module.exports = exports;
