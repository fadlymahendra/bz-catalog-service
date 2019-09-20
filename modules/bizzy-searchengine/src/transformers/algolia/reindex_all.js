'use strict';

exports.item = function (data) {
    return {
        context: {},
        data: {
            body: {
                type: 'product_group',
                id: data.id.toString()
            }
        }
    };
};

module.exports = exports;
