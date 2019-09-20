'use strict';

const { DBContext } = require('bizzy-common');


exports.findOne = async function findOne(wheres) {
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


exports.findOrCreate = async function (data = {}) {
    const models = await DBContext.getInstance();
    const transaction = await models.db_transaction;
    return models.ProductVendor.findOrCreate({
        where: {
            id: data.id
        },
        defaults: {
            product_variant_id: data.product_variant_id,
            vendor_id: data.vendor_id || 1,
            warehouse_id: data.warehouse_id,
            location_label: data.location_label,
            stock_available: data.stock_available || 1,
            stock_used: 0,
            tier_min_qty_1: data.tier_min_qty_1,
            tier_min_qty_2: data.tier_min_qty_2,
            tier_min_qty_3: data.tier_min_qty_3,
            tier_cogs_price_1: data.tier_cogs_price_1,
            tier_cogs_price_2: data.tier_cogs_price_2,
            tier_cogs_price_3: data.tier_cogs_price_3,
            warranty_option: data.warranty_option,
            warranty_period: data.warranty_period,
            warranty_limit: data.warranty_limit,
            indent_period: data.indent_period,
            indent_limit: data.indent_limit,
            is_indent: data.is_indent,
            reference_link: JSON.stringify(data.reference_links),
            sku_vendor: data.sku_vendor,
            is_active: 1,
            created_by: data.created_by || 1
        },
        transaction
    });
};

exports.update = async function (id, data = {}) {
    const models = await DBContext.getInstance();
    return models.ProductVendor.update(data, {
        where: {
            id: parseInt(id)
        }
    });
};

exports.updateMany = async function (wheres, data) {
    const models = await DBContext.getInstance();
    const transaction = await models.db_transaction;
    return models.ProductVendor.update(data, {
        where: wheres,
        transaction
    });
};

exports.delete = async function (id) {
    const models = await DBContext.getInstance();
    return models.ProductVendor.destroy({
        where: {
            id: parseInt(id)
        }
    });
};

exports.createOne = async function createOne(data = {}) {
    const models = await DBContext.getInstance();
    const transaction = await models.db_transaction;
    return models.ProductVendor.create(data, {
        transaction
    });
};

exports.findByVariant = async function (id) {
    const models = await DBContext.getInstance();
    return models.ProductVendor.findAll({
        where: {
            product_variant_id: parseInt(id)
        },
        order: [['tier_cogs_price_1', 'ASC']]
    });
};

exports.findByVariantEcart = async function (id) {
    const models = await DBContext.getInstance();
    return models.ProductVendor.findAll({
        where: {
            product_variant_id: parseInt(id)
        },
        order: [['tier_cogs_price_1', 'ASC']]
    });
};

module.exports = exports;
