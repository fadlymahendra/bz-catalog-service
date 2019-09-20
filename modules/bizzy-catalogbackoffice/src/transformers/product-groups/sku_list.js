'use strict';

exports.list = function (data) {
    return {
        id: data.id,
        sku: data.sku,
        name: data.long_name,
        is_primary: data.is_primary,
        is_discontinue: data.is_discontinue,
        is_active: data.is_active
    };
};

module.exports = exports;
