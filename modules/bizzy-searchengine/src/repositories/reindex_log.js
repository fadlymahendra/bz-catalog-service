'use strict';

const { MongoContext } = require('bizzy-common');

exports.insertMany = async function (data = []) {
    const db = await MongoContext.getInstance();
    return db.collection('reindex_log').insertMany(data);
};

module.exports = exports;
