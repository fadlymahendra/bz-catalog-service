'use strict';

const Helper = require('../../utils/helper');

const getUrlKey = function (name, level, id) {
    return Helper.slugify(`${name}_${level}.${id}`);
};

exports.item = function (data) {
    return {
        id: data.id,
        name: data.name,
        unspsc: data.unspsc,
        url_key: getUrlKey(data.name, data.level, data.id)
    };
};

exports.itemList = function (data) {
    return {
        id: data.id,
        name: data.name,
        url_key: getUrlKey(data.name, data.level, data.id),
        parent_id: data.parent_id
    };
};

module.exports = exports;
