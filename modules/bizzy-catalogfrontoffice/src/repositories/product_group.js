'use strict';

const { DBContext } = require('bizzy-common');

exports.findOne = async function (wheres) {
    const models = await DBContext.getInstance();
    return models.ProductGroup.findOne({
        where: wheres
    });
}

exports.findAll = async function (wheres = {}, offset, limit) {
    const models = await DBContext.getInstance();
    return models.ProductGroup.findAll({
        where: wheres,
        offset: offset,
        limit: limit
    });
}

exports.findById = async function (id) {
    const models = await DBContext.getInstance();
    return models.ProductGroup.findOne({
        where: {
            id: parseInt(id)
        }
    });
}

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
                        ],
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
            name: name
        }
    });
}

exports.findAndCountAll = async function (wheres = {}, offset, limit) {
    const models = await DBContext.getInstance();
    return models.ProductGroup.findAndCountAll({
        where: wheres,
        offset: offset,
        limit: limit
    });
}

exports.findAndCountAllWithJoin = async function (wheres = {}, offset, limit) {
    const models = await DBContext.getInstance();
    return models.ProductGroup.findAndCountAll({
        where: wheres,
        offset: offset,
        limit: limit,
        include: [
            {
                model: models.Uom,
                required: true
            },
            {
                model: models.StockingUom,
                required: true
            }
        ]
    });
}


exports.aggregateByCategory0 = async function (search) {
    const models = await DBContext.getInstance();
    const Sequelize = models.context;

    let sql = `SELECT 
        e.id AS id,
        e.name AS category_name,
        COUNT(*) AS total
        FROM product_group a
        INNER JOIN category b ON (a.category_id = b.id AND b.level = 'C3')
        INNER JOIN category c ON (b.parent_id = c.id AND c.level = 'C2')
        INNER JOIN category d ON (c.parent_id = d.id AND d.level = 'C1')
        INNER JOIN category e ON (d.parent_id = e.id AND e.level = 'C0')
        WHERE 1
        AND a.name LIKE :search AND a.is_bulk = 0 AND a.visibility = 1
        GROUP BY e.id`;

    return Sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        replacements: { 
            search: `%${search}%`
        },
    });
}

exports.update = async function (id, data = {}) {
    const models = await DBContext.getInstance();
    return models.ProductGroup.update(data, {
        where: {
            id: parseInt(id)
        }
    });
}

module.exports = exports;