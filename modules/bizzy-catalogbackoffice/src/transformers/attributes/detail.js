'use strict';


exports.item = function (data) {
    const attrId = data.id;
    const attrLabel = data.label;
    const attrCode = data.code;

    const value = data.AttributeValues;
    const valueList = [];

    for (let j = 0; j < value.length; j++) {
        const datas = {
            id: value[j].id,
            value: value[j].value
        };
        valueList.push(datas);
    }

    return {
        id: attrId,
        code: attrCode,
        label: attrLabel,
        type: data.type,
        values: valueList
    };
};

module.exports = exports;
