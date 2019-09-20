'use strict';

const { DBContext } = require('bizzy-common');

exports.findOne = async function (wheres) {
    const models = await DBContext.getInstance();
    return models.Category.findOne({
        where: wheres,
        include: [
            {
                model: models.Category,
                as: 'childs'
            }
        ]
    });
};

exports.findAll = async function (wheres = {}, offset, limit, order) {
    const models = await DBContext.getInstance();
    return models.Category.findAll({
        include: [
            {
                model: models.Category,
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
    return models.Category.findById(parseInt(id));
};

exports.findOrCreate = async function (data = {}) {
    const models = await DBContext.getInstance();
    const transaction = await models.db_transaction;
    return models.Category.findOrCreate({
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
    return models.Category.findAndCountAll({
        where: wheres,
        offset,
        limit
    });
};

exports.update = async function (id, data = {}) {
    const models = await DBContext.getInstance();
    const transaction = await models.db_transaction;

    return models.Category.update(data, {
        where: {
            id: parseInt(id)
        },
        transaction
    });
};

exports.updateMany = async function (wheres, data = {}) {
    const models = await DBContext.getInstance();
    const transaction = await models.db_transaction;

    return models.Category.update(data, {
        where: wheres,
        transaction
    });
};

exports.delete = async function (id) {
    const models = await DBContext.getInstance();
    return models.Category.destroy({
        where: {
            id: parseInt(id)
        }
    });
};

exports.deleteMany = async function (where) {
    const models = await DBContext.getInstance();
    const transaction = await models.db_transaction;
    return models.Category.destroy({
        where,
        transaction
    });
};

exports.getCategoryBreakdown = async function (id) {
    const models = await DBContext.getInstance();
    const Sequelize = await models.context;

    const sqlQuery = `SELECT d.id AS category0_id,
        d.name AS category0_name,
        d.unspsc AS category0_unspsc,
        c.id AS category1_id,
        c.name AS category1_name,
        c.unspsc AS category1_unspsc,
        b.id AS category2_id,
        b.name AS category2_name,
        b.unspsc AS category2_unspsc,
        a.id AS category3_id,
        a.name AS category3_name,
        a.unspsc AS category3_unspsc
    FROM category a
    INNER JOIN category b ON (a.parent_id = b.id AND b.level = 'C2')
    INNER JOIN category c ON (b.parent_id = c.id AND c.level = 'C1')
    INNER JOIN category d ON (c.parent_id = d.id AND d.level = 'C0')
    WHERE a.level = 'C3' AND a.id = :id`;

    return Sequelize.query(sqlQuery, {
        type: Sequelize.QueryTypes.SELECT,
        replacements: {
            id
        }
    });
};

exports.getCategoryC3 = async function (id, level) {
    const models = await DBContext.getInstance();
    const Sequelize = await models.context;
    let sqlQuery = '';
    if (level === 'C2') {
        sqlQuery = `SELECT a.id FROM category a WHERE a.parent_id = ${id}`;
    } else if (level === 'C1') {
        sqlQuery = `SELECT a.id FROM category a WHERE a.parent_id in (SELECT b.id FROM category b WHERE b.parent_id = ${id})`;
    } else if (level === 'C0') {
        sqlQuery = `SELECT a.id FROM category a WHERE a.parent_id in (SELECT a.id FROM category a WHERE a.parent_id in (SELECT b.id FROM category b WHERE b.parent_id = ${id}))`;
    }

    return Sequelize.query(sqlQuery, {
        type: Sequelize.QueryTypes.SELECT
    }).map(x => x.id);
};


exports.countAll = async function (wheres = {}, replacements) {
    const models = await DBContext.getInstance();
    const Sequelize = await models.context;

    const sql = `SELECT 
    is_active, COUNT(id) AS total
    FROM category
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
    FROM category
    WHERE ${wheres}`;

    return Sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        replacements
    });
};

module.exports = exports;
