'use strict';

exports.transformUom = function (data) {
    return {
        id: data.id,
        name: data.name
    };
};

module.exports = exports;
