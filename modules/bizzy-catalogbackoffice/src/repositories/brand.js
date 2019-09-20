'use strict';

const { DBContext } = require('bizzy-common');

exports.findOne = async function (wheres) {
    const models = await DBContext.getInstance();
    return models.Brand.findOne({
        where: wheres
    });
};

exports.findAll = async function (wheres = {}, offset, limit) {
    const models = await DBContext.getInstance();
    return models.Brand.findAll({
        where: wheres,
        offset,
        limit
    });
};

exports.findById = async function (id) {
    const models = await DBContext.getInstance();
    return models.Brand.findOne({
        where: {
            id: parseInt(id)
        }
    });
};

exports.findByName = async function (name) {
    const models = await DBContext.getInstance();
    return models.Brand.findOne({
        where: {
            name
        }
    });
};

exports.findAndCountAll = async function (wheres = {}, offset, limit) {
    const models = await DBContext.getInstance();
    return models.Brand.findAndCountAll({
        where: wheres,
        offset,
        limit
    });
};

exports.findOrCreate = async function (data = {}) {
    const models = await DBContext.getInstance();
    return models.Brand.findOrCreate({
        where: {
            name: data.name
        },
        defaults: {
            name: data.name,
            image_url: data.image_url,
            is_active: 1
        }
    });
};

exports.update = async function (id, data = {}) {
    const models = await DBContext.getInstance();
    return models.Brand.update(data, {
        where: {
            id: parseInt(id)
        }
    });
};

exports.delete = async function (id) {
    const models = await DBContext.getInstance();
    return models.Brand.destroy({
        where: {
            id: parseInt(id)
        }
    });
};

exports.createOne = async function (values) {
    const models = await DBContext.getInstance();
    const transaction = await models.db_transaction;
    return models.Brand.create(values, {
        transaction
    });
};

module.exports = exports;
