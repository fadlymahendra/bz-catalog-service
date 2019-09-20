'use strict';

exports.item = function (data) {
    return {
        data: {
            id: data.id,
            name: data.name,
            created_at: data.created_at,
            updated_at: data.updated_at
        }
    };
};

module.exports = exports;
