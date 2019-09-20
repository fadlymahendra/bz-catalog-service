'use strict';

exports.item = function (data) {
    return {
        id: data.id,
        sku: data.sku,
        vendor_id: data.vendor_id,
        warehouse_id: data.warehouse_id,
        stock_available: data.stock_available,
        stock_used: data.stock_used,
        message: data.message,
        created_at: data.created_at,
        updated_at: data.updated_at
    };
};

module.exports = exports;
