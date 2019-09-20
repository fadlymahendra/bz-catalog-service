'use strict';

const { MongoContext } = require('bizzy-common');

exports.insertOne = async function (data = {}) {
    const db = await MongoContext.getInstance();
    return db.collection('category_log').insertOne(data);
};

exports.insertMany = async function (records = []) {
    const db = await MongoContext.getInstance();
    return db.collection('category_log').insertMany(records);
};

exports.findOne = async function (id) {
    const db = await MongoContext.getInstance();
    return db.collection('category_log').findOne({
        product_group_id: id
    });
};

exports.findAll = async function (wheres, offset, limit, sort = {}) {
    const db = await MongoContext.getInstance();
    return db.collection('category_log').find(wheres)
        .skip(offset)
        .limit(parseInt(limit))
        .sort(sort)
        .toArray();
};

exports.findAllRecord = async function (wheres, offset, limit, sort = {}) {
    const db = await MongoContext.getInstance();
    return db.collection('category_log').find(wheres)
        .skip(offset)
        .limit(parseInt(limit))
        .sort(sort)
        .toArray();
};

exports.findAllWithOutPagination = async function (wheres) {
    const db = await MongoContext.getInstance();
    return db.collection('category_log').find(wheres).toArray();
};

exports.count = async function (wheres) {
    const db = await MongoContext.getInstance();
    return db.collection('category_log').find(wheres).count();
};

module.exports = exports;
