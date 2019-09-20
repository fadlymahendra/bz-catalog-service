'use strict';

const getAttributeValues = function (list) {
    const value = list.map((el) => { return el.value; });
    return value;
};

exports.item = function (data) {
    return {
        id: data.id,
        name: data.AttributeCode.label,
        description: data.AttributeCode.description ? data.AttributeCode.description : '-',
        category: data.category[0],
        values: getAttributeValues(data.AttributeCode.AttributeValues)
    };
};

module.exports = exports;
