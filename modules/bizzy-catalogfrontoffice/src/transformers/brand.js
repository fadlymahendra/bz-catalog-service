'use strict';

exports.collection = function (data) {
    return {
        id: data.id,
        name: data.name
    };
};

exports.brandList = function (data) {
    return {
        id: `BR-${data.id}`,
        name: data.name
    };
};

module.exports = exports;
