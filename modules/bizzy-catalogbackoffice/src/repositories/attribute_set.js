'use strict';

const { DBContext } = require('bizzy-common');

exports.findOne = async function (wheres) {
    const models = await DBContext.getInstance();
    return models.AttributeSet.findOne({
        where: wheres
    });
};

exports.findAll = async function (wheres = {}, offset, limit) {
    const models = await DBContext.getInstance();
    return models.AttributeSet.findAll({
        where: wheres,
        offset,
        limit
    });
};

exports.findAllVariants = async function (where = {}, offset, limit, include = [], order = []) {
    const models = await DBContext.getInstance();
    return models.AttributeSet.findAll({
        where,
        offset,
        limit,
        include,
        order: [order]
    });
};

exports.findOneVariants = async function (where = {}, include = []) {
    const models = await DBContext.getInstance();
    return models.AttributeSet.findOne({
        where,
        include
    });
};

exports.findById = async function (id) {
    const models = await DBContext.getInstance();
    return models.AttributeSet.findOne({
        where: {
            id: parseInt(id)
        },
        include: [
            {
                model: models.AttributeCode
            }
        ]
    });
};

exports.findAndCountAll = async function (wheres = {}, offset, limit) {
    const models = await DBContext.getInstance();
    return models.AttributeSet.findAndCountAll({
        where: wheres,
        offset,
        limit
    });
};

exports.findVariantSpec = async function (id) {
    const models = await DBContext.getInstance();
    return models.AttributeSet.findAll({
        where: {
            category_id: parseInt(id)
        },
        include: [
            {
                model: models.AttributeCode,
                include: [
                    {
                        model: models.AttributeValue,
                        separate: true
                    }
                ]
            }
        ]
    });
};

exports.update = async function (id, data = {}) {
    const models = await DBContext.getInstance();
    const transaction = await models.db_transaction;
    return models.AttributeSet.update(data, {
        where: {
            id: parseInt(id)
        },
        transaction
    });
};

exports.createOne = async function (values) {
    const models = await DBContext.getInstance();
    const transaction = await models.db_transaction;
    return models.AttributeSet.create(values, {
        transaction
    });
};

exports.delete = async function (id) {
    const models = await DBContext.getInstance();
    const transaction = await models.db_transaction;
    return models.AttributeSet.destroy({
        where: {
            id: parseInt(id)
        },
        transaction
    });
};

exports.getVariantByCategoryId = async function (id) {
    const models = await DBContext.getInstance();
    return models.AttributeSet.findAll({
        where: {
            category_id: parseInt(id),
            is_variant: 1,
            is_deleted: 0
        },
        include: [
            {
                model: models.AttributeCode,
                include: [
                    {
                        model: models.AttributeValue,
                        separate: true
                    }
                ]
            }
        ],
        order_by: ['id']
    });
};

module.exports = exports;
