'use strict';

const _ = require('lodash');

exports.collection = function (data, data2) {
    const temp = {};
    const rows = [];

    if (data2) {
        _.forEach(data2, (value, key) => {
            temp[value.id] = value.total;
        });
    }

    _.forEach(data, (value, key) => {
        rows[key] = {
            id: value.id,
            name: value.name,
            total: temp[value.id] ? temp[value.id] : 0
        };
    });

    return rows;
};

module.exports = exports;
