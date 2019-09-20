'use strict';

const Helper = require('../../utils/helper');

const getUrlKey = function (name, level, id) {
    return Helper.slugify(`${name}_${level}.${id}`);
};

exports.getUrlKey = getUrlKey;

const recurse = function (data) {
    const result = [];

    Object.keys(data).forEach((key) => {
        const current = {
            id: data[key].id,
            name: data[key].name,
            url_key: getUrlKey(data[key].name, data[key].level, data[key].id),
            level: data[key].level,
            unspsc: data[key].unspsc
        };

        if (data[key].childs) {
            current.childs = recurse(data[key].childs);
        }

        result.push(current);
    });

    return result;
};

exports.collection = function (data) {
    const result = {};

    data.forEach((d) => {
        if (!result[d.category0_id]) {
            result[d.category0_id] = {
                id: d.category0_id,
                name: d.category0_name,
                url_key: getUrlKey(d.category0_name, d.category0_level, d.category0_id),
                level: d.category0_level,
                unspsc: d.category0_unspsc,
                childs: {}
            };
        }

        if (!result[d.category0_id].childs[d.category1_id]) {
            result[d.category0_id].childs[d.category1_id] = {
                id: d.category1_id,
                name: d.category1_name,
                url_key: getUrlKey(d.category1_name, d.category1_level, d.category1_id),
                level: d.category1_level,
                unspsc: d.category1_unspsc,
                childs: {}
            };
        }

        if (!result[d.category0_id].childs[d.category1_id].childs[d.category2_id]) {
            result[d.category0_id].childs[d.category1_id].childs[d.category2_id] = {
                id: d.category2_id,
                name: d.category2_name,
                url_key: getUrlKey(d.category2_name, d.category2_level, d.category2_id),
                level: d.category2_level,
                unspsc: d.category2_unspsc,
                childs: {}
            };
        }

        result[d.category0_id].childs[d.category1_id].childs[d.category2_id].childs[d.category3_id] = {
            id: d.category3_id,
            name: d.category3_name,
            url_key: getUrlKey(d.category3_name, d.category3_level, d.category3_id),
            level: d.category3_level,
            unspsc: d.category3_unspsc
        };
    });

    return {
        data: recurse(result)
    };
};

module.exports = exports;
