'use strict';

const { DBContext } = require('bizzy-common');

exports.findOne = async function (wheres) {
    const models = await DBContext.getInstance();
    return models.AttributeCode.findOne({
        where: wheres
    });
};

exports.findAll = async function (wheres = {}, offset, limit) {
    const models = await DBContext.getInstance();
    return models.AttributeCode.findAll({
        where: wheres,
        offset,
        limit
    });
};

exports.findById = async function (id) {
    const models = await DBContext.getInstance();
    return models.AttributeCode.findOne({
        where: {
            id: parseInt(id)
        }
    });
};

exports.findAndCountAll = async function (wheres = {}, offset, limit) {
    const models = await DBContext.getInstance();
    return models.AttributeCode.findAndCountAll({
        where: wheres,
        offset,
        limit
    });
};

exports.update = async function (id, data = {}) {
    const models = await DBContext.getInstance();
    const transaction = await models.db_transaction;
    return models.AttributeCode.update(data, {
        where: {
            id: parseInt(id)
        },
        transaction
    });
};

exports.createOne = async function (values) {
    const models = await DBContext.getInstance();
    const transaction = await models.db_transaction;
    return models.AttributeCode.create(values, {
        transaction
    });
};

exports.delete = async function (id) {
    const models = await DBContext.getInstance();
    return models.AttributeCode.destroy({
        where: {
            id: parseInt(id)
        }
    });
};

exports.deleteMany = async function (where) {
    const models = await DBContext.getInstance();
    const transaction = await models.db_transaction;
    return models.AttributeCode.destroy({
        where,
        transaction
    });
};

exports.findAttributeValue = async function (id) {
    const models = await DBContext.getInstance();
    return models.AttributeCode.findOne({
        where: {
            id: parseInt(id),
            is_deleted: 0
        },
        include: [
            {
                model: models.AttributeValue,
                separate: true
            }
        ]
    });
};

module.exports = exports;
