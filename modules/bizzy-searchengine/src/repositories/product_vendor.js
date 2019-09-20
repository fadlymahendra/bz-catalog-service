'use strict';

const { DBContext } = require('bizzy-common');

exports.findOne = async function (wheres) {
    const models = await DBContext.getInstance();
    return models.ProductVendor.findOne({
        where: wheres
    });
};

exports.findAll = async function (wheres = {}, offset, limit) {
    const models = await DBContext.getInstance();
    return models.ProductVendor.findAll({
        where: wheres,
        offset,
        limit
    });
};

exports.findById = async function (id) {
    const models = await DBContext.getInstance();
    return models.ProductVendor.findOne({
        where: {
            id: parseInt(id)
        }
    });
};

exports.findAndCountAll = async function (wheres = {}, offset, limit) {
    const models = await DBContext.getInstance();
    return models.ProductVendor.findAndCountAll({
        where: wheres,
        offset,
        limit
    });
};

exports.findByVariant = async function (id, ignoreActive = false) {
    const models = await DBContext.getInstance();

    const condition = {
        product_variant_id: parseInt(id)
    };

    if (ignoreActive === false) {
        condition.is_active = 1;
    }

    return models.ProductVendor.findAll({
        where: condition,
        order: [['tier_cogs_price_1', 'ASC']]
    });
};

exports.update = async function (id, data = {}) {
    const models = await DBContext.getInstance();
    const transaction = models.db_transaction;
    return models.ProductVendor.update(data, {
        where: {
            id: parseInt(id)
        },
        transaction
    });
};

exports.findWithVariant = async function (id) {
    const models = await DBContext.getInstance();
    return models.ProductVendor.findOne({
        where: {
            id: parseInt(id)
        },
        include: {
            model: models.ProductVariant,
            require: true
        }
    });
};

module.exports = exports;
