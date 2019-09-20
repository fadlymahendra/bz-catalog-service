'use strict';

exports.item = function (data, count) {
    return {
        data: {
            id: data.id,
            name: data.name,
            image_url: data.image_url,
            description: data.description,
            status: data.is_active,
            total_sku: count
        }
    };
};

module.exports = exports;
