'use strict';

const { MongoContext } = require('bizzy-common');

exports.findOne = async function (wheres = {}) {
    const db = await MongoContext.getInstance();
    return db.collection('product_snapshot').findOne(wheres);
};

exports.findAll = async function (wheres = {}) {
    const db = await MongoContext.getInstance();
    return db.collection('product_snapshot').find(wheres).toArray();
};

exports.insertMany = async function (data = []) {
    const db = await MongoContext.getInstance();
    return db.collection('product_snapshot').insertMany(data);
};

exports.module = exports;
