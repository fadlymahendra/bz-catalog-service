'use strict';

const Helper = require('../../utils/helper');

const getUrlKey = function (name, level, id) {
    return Helper.slugify(`${name}_${level}.${id}`);
};

exports.collection = function (data) {
    return {
        id: data.id,
        name: data.name,
        url_key: getUrlKey(data.name, data.level, data.id),
        level: data.level,
        unspsc: data.unspsc
    };
};

module.exports = exports;
