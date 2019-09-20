'use strict';

const { MongoContext } = require('bizzy-common');

exports.createVendorWarehousesMongo = async function (data) {
    const mongoClient = await MongoContext.getInstance();
    return mongoClient.collection('vendor_warehouses').insertOne(data)
        .then(result => String(result.insertedId));
};

exports.createBulkVendorWarehousesMongo = async function (data) {
    const mongoClient = await MongoContext.getInstance();
    return mongoClient.collection('vendor_warehouses').insertMany(data)
        .then(result => String(result.insertedId));
};

exports.getVendorWarehousesMongo = async function (wheres) {
    const mongoClient = await MongoContext.getInstance();
    return mongoClient.collection('vendor_warehouses')
        .find({
            sku: wheres.sku,
            variant_id: wheres.variant_id,
            product_group_id: wheres.product_group_id
        }).toArray();
};

module.exports = exports;
