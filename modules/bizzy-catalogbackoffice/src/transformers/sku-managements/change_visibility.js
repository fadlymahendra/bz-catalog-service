'use strict';

exports.item = function (data) {
    return {
        id: data.id,
        is_active: data.is_active
    };
};

module.exports = exports;
