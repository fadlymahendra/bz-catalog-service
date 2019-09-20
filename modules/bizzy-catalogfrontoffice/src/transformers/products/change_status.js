'use strict';

exports.item = function (data) {
    return {
        id: data.id,
        is_active: data.is_active,
        vendor_id: data.vendor_id,
        warehouse_id: data.warehouse_id
    };
};
