'use strict';

const { MongoContext } = require('bizzy-common');


exports.insertOne = async function (data = {}) {
    const db = await MongoContext.getInstance();
    return db.collection('product_log').insertOne(data);
};

exports.findOne = async function (id) {
    const db = await MongoContext.getInstance();
    return db.collection('product_log').findOne({
        product_group_id: id
    });
};

exports.findLastAction = async function (id, action) {
    const db = await MongoContext.getInstance();
    return db.collection('product_log')
        .find({
            product_group_id: id,
            'payload.visibility': 0,
            action
        })
        .sort({
            created_at: -1
        })
        .limit(1)
        .toArray();
};

exports.findAll = async function (wheres, offset, limit, sort = {}) {
    const db = await MongoContext.getInstance();
    return db.collection('product_log').find(wheres)
        .skip(offset)
        .limit(parseInt(limit))
        .sort(sort)
        .toArray();
};

exports.count = async function (wheres) {
    const db = await MongoContext.getInstance();
    return db.collection('product_log').find(wheres).count();
};

exports.countAll = async function countAll(wheres) {
    const db = await MongoContext.getInstance();
    return db.collection('product_log').aggregate([
        {
            $match: wheres
        },
        {
            $group: {
                _id: '$product_group_id', total: { $sum: 1 }
            }
        }
    ]).toArray();
};

exports.findAllWithoutPage = async function (id) {
    const db = await MongoContext.getInstance();
    return db.collection('product_log').find({
        product_group_id: id
    }).toArray();
};

exports.insertReject = async function (data = {}) {
    const db = await MongoContext.getInstance();
    return db.collection('product_log').insertOne(data);
};

module.exports = exports;
