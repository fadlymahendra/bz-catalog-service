'use strict';

exports.variantPayload = function (data) {
    return {
        variants: data.payload.products,
        specifications: data.payload.specifications
    };
};

exports.groupAttributePayload = function (data, productGroupId, isVariant) {
    return {
        product_group_id: parseInt(productGroupId),
        attribute_code_id: parseInt(data.attribute_id),
        attribute_value_id: data.attribute_value_id ? parseInt(data.attribute_value_id) : null,
        text_input: data.attribute_textinput ? data.attribute_textinput : null,
        is_variant: isVariant
    };
};

module.exports = exports;
