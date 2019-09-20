'use strict';

const { MongoContext } = require('bizzy-common');

exports.findMappingSku = async function (wheres = {}) {
    const db = await MongoContext.getInstance();
    return db.collection('product_sku_mapping').findOne(wheres);
};

exports.findMapping = async function (wheres = {}) {
    const db = await MongoContext.getInstance();
    return db.collection('product_sku_mapping').findOne(wheres);
};

exports.findAllMapping = async function (wheres = {}) {
    const db = await MongoContext.getInstance();
    const result = await db.collection('product_sku_mapping').aggregate([
        {
            $match: wheres
        },
        {
            $group: {
                _id:
                {
                    organization_id: '$payload.organization_id',
                    product_sku: '$product_sku',
                    material_code: '$payload.material_code',
                    material_group: '$payload.material_group',
                    mapped: '$payload.mapped',
                    manufacturer_code: '$payload.manufacturer_code',
                    uom: '$payload.uom',
                    quantity_stocking_uom: '$payload.quantity_stocking_uom'
                }
            }
        }
    ]).toArray();
    return result;
};

exports.insertMapping = async function (payload = {}) {
    const db = await MongoContext.getInstance();
    return db.collection('product_sku_mapping').insertOne(payload);
};

exports.updateMapping = async function (wheres = {}, data = {}) {
    const models = await MongoContext.getInstance();
    return models.collection('product_sku_mapping').updateMany(
        wheres,
        {
            $set: {
                'payload.material_code': data.payload.material_code,
                'payload.material_group': data.payload.material_group,
                'payload.manufacturer_code': data.payload.manufacturer_code,
                'payload.mapped': data.payload.mapped,
                'payload.uom': data.payload.uom,
                'payload.quantity_stocking_uom': data.payload.quantity_stocking_uom
            },
            $currentDate: { updated_at: true }
        },
        { multi: true }
    );
};

exports.delete = async function (wheres = {}) {
    const models = await MongoContext.getInstance();
    return models.collection('product_sku_mapping').deleteOne(wheres);
};

exports.insertMany = async function (data = []) {
    const db = await MongoContext.getInstance();
    return db.collection('product_sku_mapping').insertMany(data);
};

exports.findAllMappingNoPaging = async function (wheres = {}) {
    const db = await MongoContext.getInstance();
    return db.collection('product_sku_mapping').find(wheres)
        .toArray();
};

exports.findAllByCatalogIds = async function (catalogIds) {
    const db = await MongoContext.getInstance();
    return db.collection('product_sku_mapping').find({
        'payload.catalog_id': { $in: catalogIds }
    }).toArray();
};

exports.findAllByCatalogIdsMapped = async function (catalogIds) {
    const db = await MongoContext.getInstance();
    return db.collection('product_sku_mapping').find({
        'payload.catalog_id': { $in: catalogIds },
        'payload.mapped': 1
    }).toArray();
};

exports.distinctBy = async function (column, query) {
    const db = await MongoContext.getInstance();
    return db.collection('product_sku_mapping').distinct(column, query);
};

module.exports = exports;
