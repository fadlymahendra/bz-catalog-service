'use strict';

const { MongoContext } = require('bizzy-common');

exports.insertOne = async function (data = {}) {
    const db = await MongoContext.getInstance();
    return db.collection('product_upload_log').insertOne(data);
};

exports.insertMany = async function (data = []) {
    const db = await MongoContext.getInstance();
    return db.collection('product_upload_log').insertMany(data);
};

exports.findOne = async function (id) {
    const db = await MongoContext.getInstance();
    return db.collection('product_upload_log').findOne({
        product_group_id: id
    });
};

exports.findAll = async function (wheres, offset, limit, sort = {}) {
    const db = await MongoContext.getInstance();
    return db.collection('product_upload_log').find(wheres)
        .skip(offset)
        .limit(parseInt(limit))
        .sort(sort)
        .toArray();
};

exports.count = async function (wheres = {}) {
    const db = await MongoContext.getInstance();
    return db.collection('product_upload_log').find(wheres).count();
};

exports.findAllWithoutPage = async function (wheres = {}) {
    const db = await MongoContext.getInstance();
    return db.collection('product_upload_log').find(wheres).toArray();
};

exports.insertReject = async function (data = {}) {
    const db = await MongoContext.getInstance();
    return db.collection('product_upload_log').insertOne(data);
};

module.exports = exports;
