'use strict';

const { MongoContext } = require('bizzy-common');

exports.findAll = async function (wheres) {
    const db = await MongoContext.getInstance();
    return db.collection('product_sku_group').find(wheres).toArray();
};

exports.findMapping = async function (wheres) {
    const db = await MongoContext.getInstance();
    return db.collection('product_sku_mapping').find(wheres).toArray();
};

module.exports = exports;
