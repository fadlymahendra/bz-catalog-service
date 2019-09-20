'use strict';

exports.list = function (data) {
    return {
        created_at: data.created_at,
        title: data.title,
        user: data.user.name
    };
};

module.exports = exports;
