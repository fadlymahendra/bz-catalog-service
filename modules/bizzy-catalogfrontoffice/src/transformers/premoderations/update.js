'use strict';

exports.item = function (data) {
    return {
        id: data.id,
        type: data.type,
        name: data.payload.name,
        vendor_id: data.vendor_id,
        premoderation_status: data.premoderation_status
    };
};
