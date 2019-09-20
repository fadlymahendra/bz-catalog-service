'use strict';

const { MongoContext } = require('bizzy-common');

exports.insertOne = async function (data = {}) {
    const models = await MongoContext.getInstance();
    return models.collection('premoderation_log').insertOne(data);
};

exports.findById = async function (id) {
    const models = await MongoContext.getInstance();
    return models.collection('premoderation_log').find({ premoderation_id: id })
        .limit(1)
        .sort({ created_at: -1 })
        .toArray();
};

module.exports = exports;
