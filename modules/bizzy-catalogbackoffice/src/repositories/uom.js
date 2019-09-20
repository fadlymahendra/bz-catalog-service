'use strict';

const { DBContext } = require('bizzy-common');

exports.findOne = async function (wheres) {
    const models = await DBContext.getInstance();
    return models.Uom.findOne({
        where: wheres
    });
};

exports.findAll = async function (wheres = {}, offset, limit) {
    const models = await DBContext.getInstance();
    return models.Uom.findAll({
        where: wheres,
        offset,
        limit
    });
};

exports.findById = async function (id) {
    const models = await DBContext.getInstance();
    return models.Uom.findOne({
        where: {
            id: parseInt(id)
        }
    });
};

exports.findByName = async function (name) {
    const models = await DBContext.getInstance();
    return models.Uom.findOne({
        where: {
            name
        }
    });
};

exports.findAndCountAll = async function (wheres = {}, offset, limit) {
    const models = await DBContext.getInstance();
    return models.Uom.findAndCountAll({
        where: wheres,
        offset,
        limit
    });
};

exports.findOrCreate = async function (data = {}) {
    const models = await DBContext.getInstance();
    return models.Uom.findOrCreate({
        where: {
            name: data.name
        },
        defaults: {
            name: data.name
        }
    });
};

exports.update = async function (id, data = {}) {
    const models = await DBContext.getInstance();
    return models.Uom.update(data, {
        where: {
            id: parseInt(id)
        }
    });
};

exports.delete = async function (id) {
    const models = await DBContext.getInstance();
    return models.Uom.destroy({
        where: {
            id: parseInt(id)
        }
    });
};

module.exports = exports;
