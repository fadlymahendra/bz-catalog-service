'use strict';

const { MongoContext } = require('bizzy-common');

exports.insertMany = async function (data = []) {
    const db = await MongoContext.getInstance();
    return db.collection('product_sku_group').insertMany(data);
};

exports.insertManyLog = async function (data = []) {
    const db = await MongoContext.getInstance();
    return db.collection('product_sku_group_log').insertMany(data);
};

exports.findAll = async function (wheres = {}) {
    const db = await MongoContext.getInstance();
    return db.collection('product_sku_group').find(wheres).toArray();
};

exports.findOne = async function (wheres) {
    const db = await MongoContext.getInstance();
    return db.collection('product_sku_group').findOne(wheres);
};

exports.updateSetInactive = async function (user, wheres = {}) {
    const models = await MongoContext.getInstance();
    return models.collection('product_sku_group').update(
        wheres,
        {
            $set: {
                status: 'inactive',
                user
            },
            $currentDate: { updated_at: true }
        },
        { multi: true }
    );
};

exports.findMapping = async function (wheres = {}) {
    const db = await MongoContext.getInstance();
    return db.collection('product_sku_mapping').findOne(wheres);
};

exports.insertMapping = async function (payload = {}) {
    const db = await MongoContext.getInstance();
    return db.collection('product_sku_mapping').insertOne(payload);
};

exports.updateMapping = async function (wheres = {}, data = {}) {
    const models = await MongoContext.getInstance();
    return models.collection('product_sku_mapping').update(
        wheres,
        {
            $set: {
                'payload.material_code': data.payload.material_code,
                'payload.material_group': data.payload.material_group
            },
            $currentDate: { updated_at: true }
        },
        { multi: true }
    );
};

exports.deleteGroup = async function (wheres = {}) {
    const db = await MongoContext.getInstance();
    return db.collection('product_sku_group').deleteOne(wheres);
};

module.exports = exports;
