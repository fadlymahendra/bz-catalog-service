'use strict';

const { DBContext } = require('bizzy-common');

exports.getProductReindex = async function (id, type) {
    const models = await DBContext.getInstance();
    const Sequelize = models.context;
    let wheres = '';

    if (type === 'product_group') {
        wheres = 'AND c.id = :id';
    } else { // product_variant
        wheres = 'AND b.sku = :id';
    }

    let sql = `SELECT
        'product_variant' AS 'type',
        b.id AS product_variant_id,
        b.sku,
        b.long_name,
        c.id AS product_group_id,
        c.name AS product_group_name,
        d.id AS brand_id,
        d.name AS brand_name,
        b.variant_value,
        b.primary_image,
        b.additional_image,
        h.id AS category0_id,
        h.name AS category0_name,
        h.level AS category0_level,
        g.id AS category1_id,
        g.name AS category1_name,
        g.level AS category1_level,
        f.id AS category2_id,
        f.name AS category2_name,
        f.level AS category2_level,
        e.id AS category3_id,
        e.name AS category3_name,
        e.level AS category3_level,
        a.id AS product_vendor_id,
        a.vendor_id,
        a.warehouse_id,
        a.stock_available,
        a.currency,
        a.tier_min_qty_1,
        a.tier_min_qty_2,
        a.tier_min_qty_3,
        a.tier_cogs_price_1,
        a.tier_cogs_price_2,
        a.tier_cogs_price_3,
        a.customer_id,
        a.is_active,
        a.is_indent,
        a.indent_period,
        a.indent_limit,
        a.is_decimal,
        a.down_payment_type,
        a.down_payment_value,
        a.created_at
        FROM product_vendor a
        INNER JOIN product_variant b ON a.product_variant_id = b.id AND b.is_active = 1
        INNER JOIN product_group c ON (b.product_group_id = c.id AND c.status = 1 AND c.visibility = 1)
        INNER JOIN brand d ON (c.brand_id = d.id)
        INNER JOIN category e ON (c.category_id = e.id AND e.is_active = 1)
        INNER JOIN category f ON (e.parent_id = f.id AND f.is_active = 1)
        INNER JOIN category g ON (f.parent_id = g.id AND g.is_active = 1)
        INNER JOIN category h ON (g.parent_id = h.id AND h.is_active = 1)
        WHERE 1
        ${wheres}
        ORDER BY c.id ASC, a.tier_cogs_price_1 ASC`;

    let tempe = await Sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        replacements: {
            id
        }
    });

    if (tempe.length === 0) { // id variant tsb ga ada product vendor nya
        sql = `SELECT
            'product_variant' AS 'type',
            b.id AS product_variant_id,
            b.sku,
            b.long_name,
            c.id AS product_group_id,
            c.name AS product_group_name,
            d.id AS brand_id,
            d.name AS brand_name,
            b.variant_value,
            b.primary_image,
            b.additional_image,
            h.id AS category0_id,
            h.name AS category0_name,
            h.level AS category0_level,
            g.id AS category1_id,
            g.name AS category1_name,
            g.level AS category1_level,
            f.id AS category2_id,
            f.name AS category2_name,
            f.level AS category2_level,
            e.id AS category3_id,
            e.name AS category3_name,
            e.level AS category3_level,
            0 AS product_vendor_id,
            0 AS vendor_id,
            0 AS warehouse_id,
            0 AS stock_available,
            0 AS currency,
            0 AS tier_min_qty_1,
            0 AS tier_min_qty_2,
            0 AS tier_min_qty_3,
            0 AS tier_cogs_price_1,
            0 AS tier_cogs_price_2,
            0 AS tier_cogs_price_3,
            0 AS customer_id,
            0 AS is_active,
            0 AS is_indent,
            0 AS is_indent,
            '' AS indent_period,
            0 AS indent_limit,
            0 AS is_decimal,
            0 AS down_payment_type,
            0 AS down_payment_value,
            '' AS created_at
            FROM product_variant b 
            INNER JOIN product_group c ON (b.product_group_id = c.id AND c.status = 1 AND c.visibility = 1)
            INNER JOIN brand d ON (c.brand_id = d.id)
            INNER JOIN category e ON (c.category_id = e.id AND e.is_active = 1)
            INNER JOIN category f ON (e.parent_id = f.id AND f.is_active = 1)
            INNER JOIN category g ON (f.parent_id = g.id AND g.is_active = 1)
            INNER JOIN category h ON (g.parent_id = h.id AND h.is_active = 1)
            WHERE 1 AND b.is_active = 1
            ${wheres}
            ORDER BY c.id ASC`;

        tempe = await Sequelize.query(sql, {
            type: Sequelize.QueryTypes.SELECT,
            replacements: {
                id
            }
        });
    }
    return tempe;
};

exports.getVariantAttributenReindex = async function (id) {
    const models = await DBContext.getInstance();
    const Sequelize = models.context;

    const sql = `SELECT
        a.attribute_code_id,
        b.code,
        b.label,
        c.id AS attribute_value_id,
        c.value,
        b.type,
        a.is_variant
        FROM product_group_attribute a
        INNER JOIN attribute_code b ON (a.attribute_code_id = b.id AND a.is_variant = 1)
        INNER JOIN attribute_value c ON (b.id = c.attribute_code_id)
        WHERE 1
        AND product_group_id = :id
        ORDER BY a.id`;

    return Sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        replacements: {
            id
        }
    });
};

exports.getSpecificationAttributenReindex = async function (id) {
    const models = await DBContext.getInstance();
    const Sequelize = models.context;

    const sql = `SELECT
        a.attribute_code_id,
        a.attribute_value_id,
        a.text_input,
        b.code,
        b.label,
        b.type,
        c.value,
        a.is_variant
        FROM product_group_attribute a
        INNER JOIN attribute_code b ON (a.attribute_code_id = b.id AND a.is_variant = 0)
        LEFT JOIN attribute_value c ON (a.attribute_value_id = c.id)
        WHERE 1
        AND product_group_id = :id
        ORDER BY a.id`;

    return Sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        replacements: {
            id
        }
    });
};

exports.findAllCategoryId = async function (id) {
    const models = await DBContext.getInstance();
    const Sequelize = models.context;

    const sql = `SELECT c0.id AS c0,c1.id AS c1,c2.id AS c2,c3.id AS c3
        FROM category as c3
        JOIN category as c2 ON c2.id = c3.parent_id
        JOIN category as c1 ON c1.id = c2.parent_id
        JOIN category as c0 ON c0.id = c1.parent_id
        WHERE c3.id = ${id}`;
    return Sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT
    });
};

exports.getTotalProductVariant = async function (where = []) {
    const models = await DBContext.getInstance();
    const Sequelize = models.context;

    let additionalWhere = '';

    where.forEach((condition) => {
        if (condition.name === 'searchByC0') {
            additionalWhere = additionalWhere.concat(` AND d.id = ${parseInt(condition.value)}`);
        } else if (condition.name === 'searchByC1') {
            additionalWhere = additionalWhere.concat(` AND c.id = ${parseInt(condition.value)}`);
        } else if (condition.name === 'searchByC2') {
            additionalWhere = additionalWhere.concat(` AND b.id = ${parseInt(condition.value)}`);
        } else if (condition.name === 'searchByC3') {
            additionalWhere = additionalWhere.concat(` AND a.id = ${parseInt(condition.value)}`);
        } else if (condition.name === 'searchByKeyword') {
            additionalWhere = additionalWhere.concat(` AND (pvariant.long_name LIKE '%${condition.value}%' OR pvariant.sku = '${condition.value}') OR CONCAT('GP-',pgroup.id) = '${condition.value}'`);
        } else if (condition.name === 'searchByIsActive') {
            additionalWhere = additionalWhere.concat(` AND pvariant.is_active = ${condition.value}`);
        }
    });

    const sqlQuery = `SELECT
        pvariant.is_active, count(*) AS total
    FROM product_variant as pvariant
    JOIN product_group as pgroup
    ON pgroup.id = pvariant.product_group_id
    JOIN category a ON a.id = pgroup.category_id
    INNER JOIN category b ON (a.parent_id = b.id AND b.level = 'C2')
    INNER JOIN category c ON (b.parent_id = c.id AND c.level = 'C1')
    INNER JOIN category d ON (c.parent_id = d.id AND d.level = 'C0')
    WHERE a.level = 'C3' ${additionalWhere}
    GROUP BY pvariant.is_active`;

    return Sequelize.query(sqlQuery, {
        type: Sequelize.QueryTypes.SELECT
    });
};

exports.getSKUProducts = async function (where = [], offset = 0, limit = 0) {
    const models = await DBContext.getInstance();
    const Sequelize = models.context;

    let additionalWhere = '';

    where.forEach((condition) => {
        if (condition.name === 'searchByC0') {
            additionalWhere = additionalWhere.concat(` AND d.id = ${parseInt(condition.value)}`);
        } else if (condition.name === 'searchByC1') {
            additionalWhere = additionalWhere.concat(` AND c.id = ${parseInt(condition.value)}`);
        } else if (condition.name === 'searchByC2') {
            additionalWhere = additionalWhere.concat(` AND b.id = ${parseInt(condition.value)}`);
        } else if (condition.name === 'searchByC3') {
            additionalWhere = additionalWhere.concat(` AND a.id = ${parseInt(condition.value)}`);
        } else if (condition.name === 'searchByKeyword') {
            additionalWhere = additionalWhere.concat(` AND (pvariant.long_name LIKE '%${condition.value}%' OR pvariant.sku = '${condition.value}') OR CONCAT('GP-',pgroup.id) = '${condition.value}'`);
        } else if (condition.name === 'searchByIsActive') {
            additionalWhere = additionalWhere.concat(` AND pvariant.is_active = ${condition.value}`);
        }
    });

    let sqlQuery = `SELECT
        pgroup.id as product_group_id,
        pvariant.id as product_variant_id,
        pvariant.sku,
        pvariant.long_name,
        pvariant.is_active,
        pvariant.is_discontinue,
        pvariant.primary_image,
        pvariant.additional_image,
        a.id as C3,
        b.id as C2,
        c.id as C1,
        d.id as C0
    FROM product_variant as pvariant
    JOIN product_group as pgroup
    ON pgroup.id = pvariant.product_group_id
    JOIN category a ON a.id = pgroup.category_id
    INNER JOIN category b ON (a.parent_id = b.id AND b.level = 'C2')
    INNER JOIN category c ON (b.parent_id = c.id AND c.level = 'C1')
    INNER JOIN category d ON (c.parent_id = d.id AND d.level = 'C0')
    WHERE a.level = 'C3' ${additionalWhere}
    ORDER BY pvariant.created_at DESC`;

    const query = {
        type: Sequelize.QueryTypes.SELECT
    };

    if (limit !== 0) {
        sqlQuery = sqlQuery.concat(' LIMIT :limit OFFSET :offset');

        query.replacements = {
            limit,
            offset
        };
    }
    return Sequelize.query(sqlQuery, query);
};

exports.getTotalVendor = async function (ids) {
    const models = await DBContext.getInstance();
    const Sequelize = models.context;

    const sqlQuery = 'SELECT pvariant.id as product_variant_id, count(pvendor.id) as total_vendor FROM product_variant as pvariant LEFT JOIN product_vendor as pvendor ON pvariant.id = pvendor.product_variant_id where pvariant.id IN ( :ids ) group by pvariant.id';

    return Sequelize.query(sqlQuery, {
        type: Sequelize.QueryTypes.SELECT,
        replacements: {
            ids
        }
    });
};

module.exports = exports;
