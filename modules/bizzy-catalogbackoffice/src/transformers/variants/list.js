'use strict';

const getAttributeValues = function (list) {
    const value = list.map((el) => { return el.value; });
    return value;
};

exports.collection = function (data) {
    return {
        id: data.id,
        name: data.AttributeCode.label,
        total_sku: data.skus.length,
        category: data.Category.name,
        values: getAttributeValues(data.AttributeCode.AttributeValues),
        created_by: data.created_by
    };
};

module.exports = exports;
