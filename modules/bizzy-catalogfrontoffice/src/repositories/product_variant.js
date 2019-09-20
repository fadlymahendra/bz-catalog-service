'use strict';

const { DBContext } = require('bizzy-common');

exports.findOne = async function (wheres) {
    const models = await DBContext.getInstance();
    return models.ProductVariant.findOne({
        where: wheres
    });
};

exports.findOneProductVariant = async function (wheres) {
    const models = await DBContext.getInstance();
    return models.ProductVariant.findOne({
        where: wheres
    }).then((res) => {
        if (res) {
            return res.getProductVendors();
        }
        return res;
    });
};

exports.findAll = async function (where = {}, offset, limit, order = [], include = []) {
    const models = await DBContext.getInstance();
    return models.ProductVariant.findAll({
        where,
        offset,
        limit,
        include,
        order: [order]
    });
};

exports.findAllProduct = async function (where = {}) {
    const models = await DBContext.getInstance();
    return models.ProductVariant.findAll({
        where
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

exports.findAndCountAll = async function (wheres = {}, offset, limit) {
    const models = await DBContext.getInstance();
    return models.ProductVariant.findAndCountAll({
        where: wheres,
        offset,
        limit
    });
};

exports.createOne = async function (data = {}) {
    const models = await DBContext.getInstance();
    const transaction = models.db_transaction;
    return models.ProductVariant.create(data, { transaction });
};

exports.findOrCreate = async function (data = {}, findBy = {}) {
    const models = await DBContext.getInstance();

    return models.ProductVariant.findOrCreate({
        where: findBy,
        defaults: data
    });
};

exports.findCountVariant = async function (wheres) {
    const models = await DBContext.getInstance();
    return models.ProductVariant.findAndCountAll({
        where: wheres
    });
};

exports.update = async function (wheres, data = {}) {
    const models = await DBContext.getInstance();
    return models.ProductVariant.update(data, {
        where: wheres
    });
};

exports.find = async function (wheres = {}) {
    const models = await DBContext.getInstance();
    return models.ProductVariant.findAll({
        where: wheres
    });
};

exports.findBySkus = async function (skus = [], search = '') {
    const models = await DBContext.getInstance();
    const Op = DBContext.ORMProvider.Op;

    const results = await models.ProductVariant.findAll({
        where: {
            sku: skus,
            [Op.or]: [
                {
                    sku: {
                        [Op.eq]: search
                    }
                },
                {
                    long_name: {
                        [Op.like]: `%${search}%`
                    }
                }
            ]
        },
        include: [
            {
                model: models.ProductGroup,
                required: true,
                attributes: ['id'],
                include: [
                    {
                        model: models.Uom,
                        required: true,
                        attributes: ['id', 'name']
                    },
                    {
                        model: models.Category,
                        required: true,
                        attributes: ['name']
                    },
                    {
                        model: models.ProductGroupAttribute,
                        required: false,
                        where: {
                            is_variant: 0
                        },
                        attributes: ['attribute_code_id', 'attribute_value_id', 'text_input', 'is_variant']
                    }
                ]
            }
        ]
    });

    return results;
};

exports.findBySkusWithPagination = async function (skus = [], offset = 0, limit) {
    const models = await DBContext.getInstance();

    const results = await models.ProductVariant.findAll({
        where: {
            sku: skus
        },
        offset,
        limit,
        include: [
            {
                model: models.ProductGroup,
                required: true,
                attributes: ['id'],
                include: [
                    {
                        model: models.Uom,
                        required: true,
                        attributes: ['id', 'name']
                    },
                    {
                        model: models.Category,
                        required: true,
                        attributes: ['name']
                    },
                    {
                        model: models.ProductGroupAttribute,
                        required: false,
                        where: {
                            is_variant: 0
                        },
                        attributes: ['attribute_code_id', 'attribute_value_id', 'text_input', 'is_variant']
                    }
                ]
            }
        ]
    });

    return results;
};

exports.countBySkus = async function (skus = []) {
    const models = await DBContext.getInstance();

    const results = await models.ProductVariant.count({
        where: {
            sku: skus
        },
        include: [
            {
                model: models.ProductGroup,
                required: true,
                attributes: ['id'],
                include: [
                    {
                        model: models.Uom,
                        required: true,
                        attributes: ['id', 'name']
                    },
                    {
                        model: models.Category,
                        required: true,
                        attributes: ['name']
                    }
                ]
            }
        ]
    });

    return results;
};

module.exports = exports;
