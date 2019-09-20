'use strict';

const { DBContext } = require('bizzy-common');

exports.findOne = async function (wheres) {
    const models = await DBContext.getInstance();
    return models.AttributeValue.findOne({
        where: wheres
    });
};

exports.findAll = async function (wheres = {}, offset, limit) {
    const models = await DBContext.getInstance();
    return models.AttributeValue.findAll({
        where: wheres,
        offset,
        limit
    });
};

exports.findById = async function (id) {
    const models = await DBContext.getInstance();
    return models.AttributeValue.findOne({
        where: {
            id: parseInt(id)
        }
    });
};

exports.findAndCountAll = async function (wheres = {}, offset, limit) {
    const models = await DBContext.getInstance();
    return models.AttributeValue.findAndCountAll({
        where: wheres,
        offset,
        limit
    });
};

exports.update = async function (id, data = {}) {
    const models = await DBContext.getInstance();
    return models.AttributeValue.update(data, {
        where: {
            id: parseInt(id)
        }
    });
};

exports.updateMany = async function (where = {}, data = {}) {
    const models = await DBContext.getInstance();
    const transaction = await models.db_transaction;
    return models.AttributeValue.update(data, {
        where,
        transaction
    });
};

exports.delete = async function (id) {
    const models = await DBContext.getInstance();
    return models.AttributeValue.destroy({
        where: {
            id: parseInt(id)
        }
    });
};

exports.deleteMany = async function (where) {
    const models = await DBContext.getInstance();
    const transaction = await models.db_transaction;
    return models.AttributeValue.destroy({
        where,
        transaction
    });
};

exports.findOrCreate = async function (data = {}) {
    const models = await DBContext.getInstance();
    return models.AttributeValue.findOrCreate({
        where: {
            attribute_code_id: data.attribute_code_id,
            value: data.value
        },
        defaults: {
            value: data.value
        }
    });
};

exports.insertMany = async function (records = []) {
    const models = await DBContext.getInstance();
    const transaction = await models.db_transaction;
    return models.AttributeValue.bulkCreate(records, {
        transaction
    });
};

module.exports = exports;
