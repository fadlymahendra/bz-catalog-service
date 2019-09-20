'use strict';

const Moment = require('moment');

exports.collection = function (data) {
    return data.map((row) => {
        return {
            _id: row._id,
            title: row.title,
            before: row.payload.before,
            after: row.payload.after,
            user: row.user,
            created_at: row.created_at,
            updated_at: row.updated_at
        };
    });
};

const parseDate = function (date) {
    return Moment(date).format('YYYY-MM-DD HH:mm:ss');
};

exports.collection_upload = function (data) {
    return {
        _id: data._id,
        title: data.title,
        user: data.user,
        payload: data.payload,
        created_at: parseDate(data.created_at),
        updated_at: parseDate(data.updated_at)
    };
};

module.exports = exports;
