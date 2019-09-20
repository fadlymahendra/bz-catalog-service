'use strict';

const { DBContext } = require('bizzy-common');

exports.findOne = async function (wheres) {
    const models = await DBContext.getInstance();
    return models.ProductGroupAttribute.findOne({
        where: wheres
    });
};

exports.findAll = async function (wheres = {}, offset, limit) {
    const models = await DBContext.getInstance();
    return models.ProductGroupAttribute.findAll({
        where: wheres,
        offset,
        limit
    });
};

exports.findById = async function (id) {
    const models = await DBContext.getInstance();
    return models.ProductGroupAttribute.findOne({
        where: {
            id: parseInt(id)
        }
    });
};

exports.findAndCountAll = async function (wheres = {}, offset, limit) {
    const models = await DBContext.getInstance();
    return models.ProductGroupAttribute.findAndCountAll({
        where: wheres,
        offset,
        limit
    });
};

exports.update = async function (id, data = {}) {
    const models = await DBContext.getInstance();
    return models.ProductGroupAttribute.update(data, {
        where: {
            id: parseInt(id)
        }
    });
};

exports.delete = async function (id) {
    const models = await DBContext.getInstance();
    return models.ProductGroupAttribute.destroy({
        where: {
            id: parseInt(id)
        }
    });
};

exports.findOrCreate = async function (data = {}) {
    const models = await DBContext.getInstance();
    return models.ProductGroupAttribute.findOrCreate({
        where: {
            product_group_id: data.product_group_id,
            attribute_code_id: data.attribute_code_id,
            is_variant: data.is_variant
        },
        defaults: data
    });
};

exports.findAllWithCodeName = async function (wheres = {}) {
    const models = await DBContext.getInstance();
    return models.ProductGroupAttribute.findAll({
        where: wheres,
        include: [
            {
                model: models.AttributeCode
            }
        ]
    });
};

module.exports = exports;
