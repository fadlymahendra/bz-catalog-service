'use strict';

const { DBContext } = require('bizzy-common');

exports.findOne = async function (wheres) {
    const models = await DBContext.getInstance();
    return models.Category.findOne({
        where: wheres
    });
};

exports.findOneWithParent = async function (wheres) {
    const models = await DBContext.getInstance();
    return models.Category.findOne({
        where: wheres,
        include: [{
            model: models.Category,
            as: 'childs'
        }]
    });
};

exports.findAll = async function (wheres = {}, offset, limit) {
    const models = await DBContext.getInstance();
    return models.Category.findAll({
        where: wheres,
        offset,
        limit
    });
};

exports.findById = async function (id) {
    const models = await DBContext.getInstance();
    return models.Category.findById(parseInt(id), {
        include: [{
            model: models.Category,
            as: 'childs'
        }]
    });
};

exports.findByName = async function (name) {
    const models = await DBContext.getInstance();
    return models.Category.findOne({
        where: {
            name
        }
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


exports.getCategoryBreakdown = async function (id) {
    const models = await DBContext.getInstance();
    const Sequelize = models.context;

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

exports.getFullCategory = async function () {
    const models = await DBContext.getInstance();
    const Sequelize = models.context;

    const sqlQuery = `SELECT c0.name as c0_name, c0.id as c0_id, c1.name as c1_name, c1.id as c1_id, c2.name as c2_name, c2.id as c2_id, c3.name as c3_name, c3.id as c3_id, c3.unspsc, c3.id as valid_c3_id
    FROM category c3 LEFT OUTER JOIN category c2 ON c3.parent_id = c2.id LEFT OUTER JOIN category c1 ON c2.parent_id=c1.id LEFT OUTER JOIN category c0 ON c1.parent_id = c0.id
    WHERE c3.level='C3' ORDER BY c3.unspsc ASC`;

    return Sequelize.query(sqlQuery, {
        type: Sequelize.QueryTypes.SELECT
    });
};

exports.getConcatIdCategory3 = async function (id) {
    const models = await DBContext.getInstance();
    const Sequelize = models.context;

    const sql = `SELECT
            IFNULL(CONCAT(d.id),'X') AS ids
            FROM category a
            INNER JOIN category b ON (a.id = b.parent_id AND a.level = 'C0')
            INNER JOIN category c ON (b.id = c.parent_id AND b.level = 'C1')
            INNER JOIN category d ON (c.id = d.parent_id AND c.level = 'C2')
            WHERE 1
            AND a.id = ${parseInt(id)}`;

    return Sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT
    });
};

exports.getHierarchicalCategory = async function (filter = {}, offset = 0, limit = 0) {
    const models = await DBContext.getInstance();
    const Sequelize = models.context;

    const wheres = `
    AND (
        c3.name LIKE :search
        OR c3.id LIKE :search
        OR c3.unspsc LIKE :search
    )
    `;

    let sql = `
    SELECT
        c0.name as nameC0,
        c0.id, c1.name as nameC1,
        c1.id, c2.name as nameC2,
        c2.id, c3.name as nameC3,
        c3.id,
        c3.unspsc as unspsc
    FROM
        category c3
    LEFT OUTER JOIN category c2 ON c3.parent_id = c2.id
    LEFT OUTER JOIN category c1 ON c2.parent_id = c1.id
    LEFT OUTER JOIN category c0 ON c1.parent_id = c0.id
    WHERE c3.level='C3' AND c3.is_deleted = 0 AND c3.is_active = 1 
    ${filter.name ? wheres : ''} ORDER BY c3.unspsc ASC`;

    const replacements = {};

    if (filter) {
        replacements.search = `%${filter.name}%`;
    }

    if (limit) {
        sql = sql.concat(' LIMIT :limit OFFSET :offset');
        replacements.limit = limit;
        replacements.offset = offset;
    }

    return Sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        replacements
    });
};

exports.getCountAllHierarchicalCategory = async function (filter = {}) {
    const models = await DBContext.getInstance();
    const Sequelize = models.context;

    const wheres = `
    AND (
        c3.name LIKE :search
        OR c3.id LIKE :search
        OR c3.unspsc LIKE :search
    )
    `;

    const sql = `
    SELECT
        count(c3.id) as total_data
    FROM
        category c3
    LEFT OUTER JOIN category c2 ON c3.parent_id = c2.id
    LEFT OUTER JOIN category c1 ON c2.parent_id = c1.id
    LEFT OUTER JOIN category c0 ON c1.parent_id = c0.id
    WHERE c3.level='C3' AND c3.is_deleted = 0 AND c3.is_active = 1 
    ${filter.name ? wheres : ''} ORDER BY c3.unspsc ASC`;

    const replacements = {};

    if (filter) {
        replacements.search = `%${filter.name}%`;
    }

    return Sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        replacements
    });
};

module.exports = exports;
