'use strict';

const { MongoContext } = require('bizzy-common');

exports.createSkuDetailMongo = async function (data) {
    const mongoClient = await MongoContext.getInstance();
    return mongoClient.collection('sku_details').insertOne(data)
        .then(result => String(result.insertedId));
};

exports.createBulkSkuDetailMongo = async function (data) {
    const mongoClient = await MongoContext.getInstance();
    return mongoClient.collection('sku_details').insertMany(data)
        .then(result => String(result.insertedId));
};

exports.getSkuDetailMongo = async function (sku) {
    const mongoClient = await MongoContext.getInstance();
    return mongoClient.collection('sku_details')
        .find({ sku }).toArray();
};

module.exports = exports;
