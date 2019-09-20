'use strict';

const { DBContext } = require('bizzy-common');

exports.findOne = async function (wheres) {
    const models = await DBContext.getInstance();
    return models.Category.findOne({
        where: wheres
    });
};

exports.findOneMinimum = async function (wheres) {
    const models = await DBContext.getInstance();
    return models.Category.findOne({
        where: wheres,
        attributes: ['id', 'name', 'level', 'parent_id', 'unspsc']
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

exports.findBySearch = async function (wheres = {}) {
    const models = await DBContext.getInstance();
    return models.Category.findAll({
        where: wheres,
        attributes: ['id', 'name', 'level', 'parent_id', 'unspsc']
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

exports.getConcatIdCategory3 = async function (id) {
    const models = await DBContext.getInstance();
    const Sequelize = models.context;

    const sql = `SELECT
            IFNULL(GROUP_CONCAT(d.id),'X') AS ids
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

exports.getHierarchicalCategory = async function (id) {
    const models = await DBContext.getInstance();
    const Sequelize = models.context;

    const sql = `
    SELECT
        c0.id c0_id, c0.name c0_name,
        c0.unspsc c0_unspsc, c0.level c0_level,
        c1.id c1_id, c1.name c1_name,
        c1.unspsc c1_unspsc, c1.level c1_level,
        c2.id c2_id, c2.name c2_name,
        c2.unspsc c2_unspsc, c2.level c2_level,
        c3.id c3_id, c3.name c3_name,
        c3.unspsc c3_unspsc, c3.level c3_level
    FROM
        category c3
    LEFT OUTER JOIN category c2 ON c3.parent_id = c2.id
    LEFT OUTER JOIN category c1 ON c2.parent_id = c1.id
    LEFT OUTER JOIN category c0 ON c1.parent_id = c0.id
    WHERE c3.id = ${id}`;

    return Sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT
    });
};


exports.findSkuPayment = async function (wheres) {
    const models = await DBContext.getInstance();
    const Sequelize = models.context;

    const sql = `
    SELECT pva.sku, cat.commission AS 'is_payment'
    FROM product_variant pva
    LEFT JOIN product_group pgr ON pgr.id = pva.product_group_id
    LEFT JOIN category cat ON cat.id = pgr.category_id
    WHERE sku IN(:sku)`;

    const Op = DBContext.ORMProvider.Op;
    return Sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        replacements: { sku: wheres.sku }
    });
};

exports.findC1 = async function () {
    const models = await DBContext.getInstance();
    const Sequelize = models.context;

    const sqlQuery = `
    select * 
    from category 
    where parent_id in 
        (select id from category where level = 'C0' and is_deleted=0) 
        and is_deleted=0
    `;

    return Sequelize.query(sqlQuery, {
        type: Sequelize.QueryTypes.SELECT
    });
};

module.exports = exports;
