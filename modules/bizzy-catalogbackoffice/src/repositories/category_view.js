'use strict';

const { DBContext } = require('bizzy-common');

exports.findOne = async function (wheres) {
    const models = await DBContext.getInstance();
    return models.CategoryView.findOne({
        where: wheres,
        include: [
            {
                model: models.CategoryView,
                as: 'childs'
            }
        ]
    });
};

exports.findAll = async function (wheres = {}, offset, limit, order) {
    const models = await DBContext.getInstance();
    return models.CategoryView.findAll({
        include: [
            {
                model: models.CategoryView,
                as: 'childs'
            }
        ],
        where: wheres,
        offset,
        limit,
        order
    });
};

exports.findById = async function (id) {
    const models = await DBContext.getInstance();
    return models.CategoryView.findById(parseInt(id));
};

exports.findOrCreate = async function (data = {}) {
    const models = await DBContext.getInstance();
    const transaction = await models.db_transaction;
    return models.CategoryView.findOrCreate({
        where: {
            name: data.name
        },
        defaults: {
            name: data.name,
            level: data.level,
            base_margin: data.base_margin,
            commission: data.commission,
            unspsc: data.unspsc,
            sequence: data.sequence,
            parent_id: data.parent_id,
            breadcrumb: data.breadcrumb,
            is_active: data.is_active,
            created_by: data.created_by
        },
        transaction
    });
};

exports.findAndCountAll = async function (wheres = {}, offset, limit) {
    const models = await DBContext.getInstance();
    return models.CategoryView.findAndCountAll({
        where: wheres,
        offset,
        limit
    });
};

exports.countAll = async function (wheres = {}, replacements) {
    const models = await DBContext.getInstance();
    const Sequelize = await models.context;

    const sql = `SELECT 
    is_active, COUNT(id) AS total
    FROM CategoryView
    WHERE ${wheres}
    GROUP BY is_active`;

    return Sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        replacements
    });
};

exports.getUserCreated = async function (wheres = {}, replacements) {
    const models = await DBContext.getInstance();
    const Sequelize = await models.context;

    const sql = `SELECT 
    GROUP_CONCAT(IF(created_by='',null,created_by) SEPARATOR ',') AS user_created
    FROM CategoryView
    WHERE ${wheres}`;

    return Sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        replacements
    });
};

module.exports = exports;
