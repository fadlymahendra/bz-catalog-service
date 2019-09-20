'use strict';

const getItemsData = function (data) {
    const result = [];
    for (let i = 0; i < data.length; i++) {
        result.push(data[i].product_sku);
    }
    return result;
};

exports.collection = function (data) {
    return {
        group_id: data.group,
        items: getItemsData(data.items)
    };
};

module.exports = exports;
