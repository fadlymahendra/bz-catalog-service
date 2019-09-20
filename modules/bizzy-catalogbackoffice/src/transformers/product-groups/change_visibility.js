'use strict';

exports.item = function (data) {
    return {
        id: data.id,
        visibility: data.visibility
    };
};

module.exports = exports;
