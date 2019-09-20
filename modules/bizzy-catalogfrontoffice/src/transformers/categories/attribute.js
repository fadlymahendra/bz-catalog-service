'use strict';

const getVariantsList = function (data) {
    const productSpec = [];
    const productVariant = [];
    let attrVar = [];
    let attrSpec = [];
    const variantMatrix = [];

    for (let i = 0; i < data.length; i++) {
        const attrId = data[i].AttributeCode.id;
        const attrLabel = data[i].AttributeCode.label;
        const attrCode = data[i].AttributeCode.code;

        const isVariant = data[i].is_variant;

        const value = data[i].AttributeCode.AttributeValues;
        const valueList = [];

        for (let j = 0; j < value.length; j++) {
            const list = {
                id: value[j].id,
                value: value[j].value
            };
            valueList.push(list);
        }

        if (isVariant === 0) {
            attrSpec = {
                id: attrId,
                code: attrCode,
                label: attrLabel,
                type: data[i].AttributeCode.type,
                values: valueList
            };

            productSpec.push(attrSpec);
        } else {
            attrVar = {
                id: attrId,
                code: attrCode,
                label: attrLabel,
                type: data[i].AttributeCode.type,
                values: valueList
            };

            productVariant.push(attrVar);
        }
    }

    for (let vm = 0; vm < productVariant.length; vm++) {
        variantMatrix.push(productVariant[vm].code);
    }

    const productAttribute = {
        spesifications: productSpec,
        variants: productVariant,
        count_variant: productVariant.length,
        variant_matrix: variantMatrix
    };

    return productAttribute;
};

exports.item = function (data) {
    const productAttribute = getVariantsList(data);
    return {
        variants: productAttribute.variants,
        specifications: productAttribute.spesifications,
        variant_count: productAttribute.count_variant,
        variant_matrix: productAttribute.variant_matrix
    };
};

module.exports = exports;
