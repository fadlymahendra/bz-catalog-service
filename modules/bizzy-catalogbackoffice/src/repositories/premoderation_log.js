'use strict';

const { MongoContext } = require('bizzy-common');

exports.insertOne = async function (data = {}) {
    const models = await MongoContext.getInstance();
    return models.collection('premoderation_log').insertOne(data);
};

exports.findById = async function (id) {
    const db = await MongoContext.getInstance();
    return db.collection('premoderation_log').findOne({
        premoderation_id: id
    });
};

exports.findOne = async function (wheres = {}) {
    const db = await MongoContext.getInstance();
    return db.collection('premoderation_log').findOne(wheres);
};

exports.findAll = async function (wheres, offset, limit, sort = {}) {
    const db = await MongoContext.getInstance();
    return db.collection('premoderation_log').find(wheres)
        .skip(offset)
        .limit(parseInt(limit))
        .sort(sort)
        .toArray();
};

exports.count = async function (wheres = {}) {
    const db = await MongoContext.getInstance();
    return db.collection('premoderation_log').find(wheres).count();
};

exports.insertReject = async function (data = {}) {
    const models = await MongoContext.getInstance();
    return models.collection('premoderation_log').insertOne(data);
};

exports.findAllWithAggregate = async function (wheres = {}) {
    const db = await MongoContext.getInstance();
    const cursor = await db.collection('premoderation_log').aggregate([
        {
            $match: wheres
        },
        {
            $group: {
                _id: '$vendor_id',
                payload: {
                    $push: {
                        premoderation_id: '$premoderation_id',
                        product_name: '$product_name',
                        reject_reasons: '$reject_reasons',
                        last_status: '$last_status',
                        current_status: '$current_status',
                        user: '$user',
                        created_at: '$created_at',
                        updated_at: '$updated_at'
                    }
                }
            }
        }
    ]);

    return cursor.get();
};

module.exports = exports;
