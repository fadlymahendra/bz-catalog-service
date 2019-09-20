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
        order: [['id', 'ASC']],
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

module.exports = exports;
