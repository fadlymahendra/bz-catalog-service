'use strict';

exports.payloadItem = function (data) {
    return {
        premoderation_id: data.id,
        product_name: data.name,
        reject_reasons: data.reject_reasons,
        last_status: data.last_status,
        current_status: data.current_status,
        user: {
            id: data.created_by,
            name: data.created_name,
            email: data.created_email,
            type: 'employee'
        },
        created_at: new Date(),
        updated_at: new Date()
    };
};

module.exports = exports;
