'use strict';

exports.insertLogPayload = function (data, status) {
    return {
        premoderation_id: data.id,
        product_name: data.payload.name,
        reject_reasons: {
            product_data: '',
            sku_list: '',
            product_specification: '',
            description: '',
            product_details: '',
            package_dimension: '',
            warranty: '',
            totally_reject: ''
        },
        last_status: data.premoderation_status,
        current_status: status,
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
