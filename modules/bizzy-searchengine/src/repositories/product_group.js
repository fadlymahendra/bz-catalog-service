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

exports.findById = async function (id) {
    const models = await DBContext.getInstance();
    return models.ProductGroup.findOne({
        where: {
            id: parseInt(id)
        }
    });
};

exports.grabUomBizzy = async function (wheres = {}) {
    const models = await DBContext.getInstance();
    return models.ProductGroup.findAll({
        attributes: ['uom_id'],
        include: [
            {
                model: models.ProductVariant,
                where: wheres
            },
            {
                model: models.Uom
            }
        ]
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

exports.findAndCountAll = async function (wheres = {}, offset, limit) {
    const models = await DBContext.getInstance();
    return models.ProductGroup.findAndCountAll({
        where: wheres,
        offset,
        limit
    });
};

exports.findAndCountAllFromProductVendor = async function (title = '', description = '', offset, limit = 10, sort = '') {
    const models = await DBContext.getInstance();
    const Sequelize = models.context;

    let sql = `SELECT c.id,
    c.name AS title,
    c.description AS spec,
    c.primary_image,
    MIN(b.tier_cogs_price_1) AS start_price,
    MIN(a.sku) AS sku_id,
    COUNT(*) AS count
    FROM product_variant AS a
    LEFT JOIN product_vendor AS b ON b.product_variant_id = a.id
    LEFT JOIN product_group AS c ON a.product_group_id = c.id
    WHERE c.status = 1
    AND c.name LIKE :title
    AND c.description LIKE :description
    GROUP BY a.product_group_id `;

    if (sort) {
        let order;
        if (sort.charAt(0) === '-') {
            order = 'DESC';
            sort = sort.substr(1);
        } else {
            order = 'ASC';
        }

        sql += `ORDER BY ${sort} ${order} `;
    }

    sql += `LIMIT :limit OFFSET :offset`;
    return Sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        order: 'price DESC',
        replacements: {
            title: '%' + title + '%',
            description: '%' + description + '%',
            limit,
            offset
        }
    });
};

exports.aggregateByCategory0 = async function (search) {
    const models = await DBContext.getInstance();
    const Sequelize = models.context;

    const sql = `SELECT
        e.id AS id,
        e.name AS category_name,
        COUNT(*) AS total
        FROM product_group a
        INNER JOIN category b ON (a.category_id = b.id AND b.level = 'C3')
        INNER JOIN category c ON (b.parent_id = c.id AND c.level = 'C2')
        INNER JOIN category d ON (c.parent_id = d.id AND d.level = 'C1')
        INNER JOIN category e ON (d.parent_id = e.id AND e.level = 'C0')
        WHERE 1
        AND a.name LIKE :search
        GROUP BY e.id`;

    return Sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        replacements: {
            search: '%' + search + '%'
        }
    });
};

exports.findAllBetween = async function (wheres = {}) {
    const models = await DBContext.getInstance();
    return models.ProductGroup.findAll({
        where: wheres
    });
};

module.exports = exports;
