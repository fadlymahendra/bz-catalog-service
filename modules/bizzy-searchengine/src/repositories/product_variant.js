'use strict';

const { DBContext } = require('bizzy-common');

exports.findOne = async function (wheres) {
    const models = await DBContext.getInstance();
    return models.ProductVariant.findOne({
        where: wheres
    });
};

exports.findAll = async function (wheres = {}, offset, limit) {
    const models = await DBContext.getInstance();
    return models.ProductVariant.findAll({
        where: wheres,
        offset,
        limit
    });
};

exports.findById = async function (id) {
    const models = await DBContext.getInstance();
    return models.ProductVariant.findOne({
        where: {
            id: parseInt(id)
        }
    });
};

exports.findSku = async function (wheres) {
    const models = await DBContext.getInstance();
    return models.ProductVariant.findAll({
        where: {
            product_group_id: parseInt(wheres)
        },
        attributes: [
            'sku'
        ]
    });
};

exports.findBySku = async function (id) {
    const models = await DBContext.getInstance();
    return models.ProductVariant.findOne({
        where: {
            sku: id
        }
    });
};

exports.findAndCountAll = async function (wheres = {}, offset, limit) {
    const models = await DBContext.getInstance();
    return models.ProductVariant.findAndCountAll({
        where: wheres,
        offset,
        limit
    });
};

exports.findByIdWithDetail = async function (id) {
    const models = await DBContext.getInstance();
    return models.ProductVariant.findOne({
        where: {
            sku: id
        },
        include: [{
            model: models.ProductGroup,
            required: true,
            include: {
                model: models.ProductGroupAttribute,
                include: [
                    {
                        model: models.AttributeCode,
                        include: [
                            { model: models.AttributeValue }
                        ]
                    },
                    models.AttributeValue
                ],
                required: true,
                separate: true,
                where: {
                    is_variant: 0
                }
            }
        }]
    });
};

module.exports = exports;
