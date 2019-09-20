'use strict';

const { DBContext } = require('bizzy-common');

exports.findOne = async function (wheres) {
    const models = await DBContext.getInstance();
    return models.Uom.findOne({
        where: wheres
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

exports.findAll = async function (wheres = {}) {
    const models = await DBContext.getInstance();
    return models.Uom.findAll({
        where: wheres
    });
};

module.exports = exports;
