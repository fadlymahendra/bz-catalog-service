'use strict';

const { DBContext } = require('bizzy-common');

exports.findOne = async function (wheres) {
    const models = await DBContext.getInstance();
    return models.ProductGroup.findOne({
        where: wheres
    });
};

exports.findAll = async function (wheres = {}, offset, limit) {
    const models = await DBContext.getInstance();
    return models.ProductGroup.findAll({
        where: wheres,
        offset,
        limit
    });
};

exports.findAllPGFromC3 = async function (wheres) {
    const models = await DBContext.getInstance();
    const { Op } = DBContext.ORMProvider;
    const categoryId = wheres.category_id;
    delete wheres.category_id;
    return models.ProductGroup.findAll({
        attributes: ['id'],
        where: {
            category_id: {
                [Op.in]: categoryId
            }
        }
    }).then(results => results.map(result => result.getValues()));
};

/** just product_group table */
exports.findAndCountAllProductGroup = async function (wheres = {}, offset, limit) {
    const models = await DBContext.getInstance();
    return models.ProductGroup.findAndCountAll({
        where: wheres,
        offset,
        limit
    });
};

exports.findById = async function (id) {
    const models = await DBContext.getInstance();
    return models.ProductGroup.findOne({
        where: {
            id: parseInt(id)
        }
    });
};

exports.findByIdWithDetail = async function (id) {
    const models = await DBContext.getInstance();
    return models.ProductGroup.findOne({
        where: {
            id: parseInt(id),
            status: 1
        },
        include: [
            { model: models.Brand, required: true },
            { model: models.Uom, required: true },
            { model: models.StockingUom, required: true },
            {
                model: models.ProductGroupAttribute,
                include: [{
                    model: models.AttributeCode,
                    include: [
                        { model: models.AttributeValue }
                    ]
                },
                models.AttributeValue
                ],
                required: true,
                separate: true
            }
        ]
    });
};

exports.findByName = async function (name) {
    const models = await DBContext.getInstance();
    return models.ProductGroup.findOne({
        where: {
            name
        }
    });
};

exports.update = async function (id, data = {}) {
    const models = await DBContext.getInstance();
    const transaction = await models.db_transaction;
    return models.ProductGroup.update(data, {
        where: {
            id: parseInt(id)
        },
        transaction
    });
};

exports.updateMany = async function (wheres, data) {
    const models = await DBContext.getInstance();
    const transaction = await models.db_transaction;

    return models.ProductGroup.update(data, {
        where: wheres,
        transaction
    });
};

exports.delete = async function (id) {
    const models = await DBContext.getInstance();
    return models.ProductGroup.update({ status: 0 }, {
        where: {
            id: parseInt(id)
        }
    });
};

exports.findOrCreate = async function (data = {}) {
    const models = await DBContext.getInstance();
    const transaction = await models.db_transaction;
    return models.ProductGroup.findOrCreate({
        where: {
            name: data.name,
            status: 1
        },
        transaction,
        defaults: data
    });
};

exports.findByIdWithC3 = async function (wheres) {
    const models = await DBContext.getInstance();
    return models.ProductGroup.findOne({
        where: wheres,
        include: [
            {
                model: models.Category,
                required: true
            },
            {
                model: models.StockingUom,
                required: true
            }
        ]
    });
};

exports.findAllSkuByCategory = async function (category) {
    const model = await DBContext.getInstance();
    return model.ProductGroup.findAll({
        where: {
            category_id: category
        },
        include: [
            {
                model: model.ProductVariant,
                where: {
                    is_active: 1
                },
                required: true
            }
        ]
    });
};

exports.createOne = async function createOne(data = {}) {
    const models = await DBContext.getInstance();
    const transaction = await models.db_transaction;
    return models.ProductGroup.create(data, {
        transaction
    });
};

exports.findAllView = async function (where) {
    const models = await DBContext.getInstance();
    return models.ProductGroupView.findAll({
        where
    });
};

module.exports = exports;
