'use strict';

exports.collection = function (data) {
    return {
        id: data._id,
        premoderation_id: data.premoderation_id,
        product_name: data.product_name,
        reject_reasons: {
            product_data: data.reject_reasons.product_data,
            sku_list: data.reject_reasons.sku_list,
            product_specification: data.reject_reasons.product_specification,
            description: data.reject_reasons.description,
            product_details: data.reject_reasons.product_details,
            package_dimension: data.reject_reasons.package_dimension,
            warranty: data.reject_reasons.warranty,
            totally_reject: data.reject_reasons.totally_reject
        },
        last_status: data.last_status,
        current_status: data.current_status,
        user: {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            type: data.user.type
        },
        created_at: data.created_at,
        updated_at: data.updated_at
    };
};
