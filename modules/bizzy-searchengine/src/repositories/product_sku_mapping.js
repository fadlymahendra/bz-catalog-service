'use strict';

const { MongoContext } = require('bizzy-common');

exports.findMappingSku = async function (wheres = {}) {
    const db = await MongoContext.getInstance();
    return db.collection('product_sku_mapping').find(wheres).limit(1).toArray();
};

exports.findAllMapping = async function (wheres = {}) {
    const db = await MongoContext.getInstance();
    return db.collection('product_sku_mapping').find(wheres).toArray();
};

exports.findAllForValidation = async function (wheres = {}, condition = {}) {
    const db = await MongoContext.getInstance();
    return db.collection('product_sku_mapping').find(wheres, condition).toArray();
};

exports.updateMapping = async function (wheres = {}, data = {}) {
    const models = await MongoContext.getInstance();
    return models.collection('product_sku_mapping').update(
        wheres,
        {
            $set: {
                'payload.material_code': data.payload.material_code,
                'payload.material_group': data.payload.material_group,
                'payload.mapped': data.payload.mapped
            },
            $currentDate: { updated_at: true }
        },
        { multi: true }
    );
};

exports.module = exports;
