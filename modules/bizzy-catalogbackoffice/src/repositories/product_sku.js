'use strict';

const { MongoContext } = require('bizzy-common');

exports.insertOne = async function (data = {}) {
    const db = await MongoContext.getInstance();
    return db.collection('product_sku').insertOne(data);
};

exports.findOne = async function (id) {
    const db = await MongoContext.getInstance();
    return db.collection('product_sku').findOne({
        sku: id
    });
};

exports.insertMany = async function (data = []) {
    const db = await MongoContext.getInstance();
    return db.collection('product_sku').insertMany(data);
};


exports.deleteAll = async function () {
    const db = await MongoContext.getInstance();
    return db.collection('product_sku').deleteMany();
};

module.exports = exports;
