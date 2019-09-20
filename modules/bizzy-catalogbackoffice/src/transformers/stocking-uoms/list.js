'use strict';

exports.collection = function (data) {
    return {
        id: data.id,
        name: data.name,
        created_at: data.created_at,
        updated_at: data.updated_at
    };
};

module.exports = exports;
