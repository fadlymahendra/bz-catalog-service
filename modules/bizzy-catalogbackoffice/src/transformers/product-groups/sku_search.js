'use strict';

exports.collection = function (data) {
    return {
        id: data.id,
        sku: data.sku,
        long_name: data.long_name,
        product_group_id: data.ProductGroup.id
    };
};

module.exports = exports;
