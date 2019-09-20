'use strict';

const { MongoContext } = require('bizzy-common');

exports.insertOne = async function (data = {}) {
    const db = await MongoContext.getInstance();
    return db.collection('premoderation').insertOne(data);
};

exports.insertMany = async function (data) {
    const db = await MongoContext.getInstance();
    return db.collection('premoderation').insertMany(data);
};

exports.findAll = async function (wheres = {}, sort = {}, offset, limit) {
    const db = await MongoContext.getInstance();
    return db.collection('premoderation').find(wheres)
        .skip(offset)
        .limit(parseInt(limit))
        .sort(sort)
        .toArray();
};

exports.findWithoutPagination = async function (wheres = {}, sort = {}) {
    const db = await MongoContext.getInstance();
    return db.collection('premoderation').find(wheres)
        .sort(sort)
        .toArray();
};

exports.count = async function (wheres = {}) {
    const db = await MongoContext.getInstance();
    return db.collection('premoderation').find(wheres).count();    
};

exports.countAllPremoderationStatus = async function (wheres = {}) {
    const db = await MongoContext.getInstance();
    const cursor = db.collection('premoderation').aggregate([
        {
            $match: wheres
        },
        {
            $group: {
                _id: '$premoderation_status',
                status: { $push: '$premoderation_status' },
                count: {
                    $sum: 1
                }
            }
        }
    ]);

    return cursor.get();
};

exports.findOne = async function (wheres = {}) {
    const db = await MongoContext.getInstance();
    return db.collection('premoderation').findOne(wheres);
};

exports.findById = async function (id) {
    const db = await MongoContext.getInstance();
    return db.collection('premoderation').findOne({
        id
    });
};

exports.update = async function (id, data = {}) {
    const db = await MongoContext.getInstance();
    return db.collection('premoderation').updateOne(
        { id },
        {
            $set: {
                payload: data.payload,
                premoderation_status: data.premoderation_status
            },
            $currentDate: { updated_at: true }
        }
    );
};

exports.findDistinctData = async function (field, wheres) {
    const db = await MongoContext.getInstance();
    return db.collection('premoderation').distinct(field ,wheres);
};

module.exports = exports;
