'use strict';

const { DBContext } = require('bizzy-common');


exports.getTotalProductVariant = async function (where = []) {
    const models = await DBContext.getInstance();
    const Sequelize = await models.context;

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
    LEFT JOIN category a ON a.id = pgroup.category_id
    LEFT JOIN category b ON (a.parent_id = b.id AND b.level = 'C2')
    LEFT JOIN category c ON (b.parent_id = c.id AND c.level = 'C1')
    LEFT JOIN category d ON (c.parent_id = d.id AND d.level = 'C0')
    WHERE a.level = 'C3' and a.id IS NOT NULL ${additionalWhere}
    GROUP BY pvariant.is_active`;

    return Sequelize.query(sqlQuery, {
        type: Sequelize.QueryTypes.SELECT
    });
};

exports.getSKUProducts = async function (where = [], offset = 0, limit = 0, isSort = false) {
    const models = await DBContext.getInstance();
    const Sequelize = await models.context;

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

    const sort = isSort ? ' ORDER BY pvariant.created_at DESC' : '';

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
    LEFT JOIN category a ON a.id = pgroup.category_id
    LEFT JOIN category b ON (a.parent_id = b.id AND b.level = 'C2')
    LEFT JOIN category c ON (b.parent_id = c.id AND c.level = 'C1')
    LEFT JOIN category d ON (c.parent_id = d.id AND d.level = 'C0')
    WHERE a.level = 'C3' and a.id IS NOT NULL ${additionalWhere} 
    ${sort}`;

    // const query = {
    //     type: Sequelize.QueryTypes.SELECT
    // };

    let replacements = {};
    const total = await Sequelize.query(sqlQuery, {
        type: Sequelize.QueryTypes.SELECT,
        replacements
    });

    if (limit !== 0) {
        sqlQuery = sqlQuery.concat(' LIMIT :limit OFFSET :offset');

        replacements = {
            limit,
            offset
        };
    }

    const rows = await Sequelize.query(sqlQuery, {
        type: Sequelize.QueryTypes.SELECT,
        replacements
    });

    return {
        rows,
        total
    };
};

exports.getAllSKUProducts = async function (where = [], offset = 0, limit = 0) {
    const models = await DBContext.getInstance();
    const Sequelize = await models.context;

    let additionalWhere = '';

    where.forEach((condition) => {
        if (condition.name === 'searchByIsActive') {
            additionalWhere = additionalWhere.concat(` AND product_variant.is_active = ${condition.value}`);
        }
    });

    const query = {
        type: Sequelize.QueryTypes.SELECT
    };
    let limitQuery = '';
    let replacements = {};

    if (limit !== 0) {
        limitQuery = ' LIMIT :limit OFFSET :offset';
        replacements = {
            limit,
            offset
        };
    }

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
    FROM (SELECT * from product_variant WHERE 1 ${additionalWhere} ORDER BY product_variant.created_at DESC ${limitQuery}) as pvariant
    JOIN product_group as pgroup
    ON pgroup.id = pvariant.product_group_id    
    LEFT JOIN category a ON a.id = pgroup.category_id
    LEFT JOIN category b ON (a.parent_id = b.id AND b.level = 'C2')
    LEFT JOIN category c ON (b.parent_id = c.id AND c.level = 'C1')
    LEFT JOIN category d ON (c.parent_id = d.id AND d.level = 'C0')
    WHERE a.level = 'C3' and a.id IS NOT NULL`;

    const rows = await Sequelize.query(sqlQuery, {
        type: Sequelize.QueryTypes.SELECT,
        replacements
    });

    sqlQuery = `SELECT 
        pvariant.id as product_variant_id
    FROM (SELECT * from product_variant WHERE 1 ${additionalWhere}) as pvariant
    JOIN product_group as pgroup
    ON pgroup.id = pvariant.product_group_id    
    LEFT JOIN category a ON a.id = pgroup.category_id
    LEFT JOIN category b ON (a.parent_id = b.id AND b.level = 'C2')
    LEFT JOIN category c ON (b.parent_id = c.id AND c.level = 'C1')
    LEFT JOIN category d ON (c.parent_id = d.id AND d.level = 'C0')
    WHERE a.level = 'C3' and a.id IS NOT NULL`;

    const total = await Sequelize.query(sqlQuery, {
        type: Sequelize.QueryTypes.SELECT,
        replacements
    });

    return {
        rows,
        total
    };
};

exports.findAndCountAllProductGroup = async function (params, paramOffset, paramLimit, paramSort) {
    const models = await DBContext.getInstance();
    const Sequelize = await models.context;

    const replacements = {};
    let where = 'a.status=:status';
    replacements.status = 1;
    if (params.paramSearch) {
        const inputs = params.paramSearch.toLowerCase();
        if (inputs.indexOf('gp-') === 0) {
            const split = inputs.split('gp-');
            where += ' AND a.id =:ida';
            replacements.ida = split[1];
        } else if (Number(params.paramSearch)) {
            where += ' AND a.id =:ida';
            replacements.ida = params.paramSearch;
        } else {
            where += ' AND a.name LIKE :name';
            replacements.name = `%${params.paramSearch}%`;
        }
    }
    if (params.paramVisibility) {
        where += ' AND a.visibility =:visibility';
        replacements.visibility = params.paramVisibility;
    }


    if (params.paramC3) {
        where += ' AND b.id=:idb';
        replacements.idb = parseInt(params.paramC3);
    } else if (params.paramC2) {
        where += ' AND c.id=:idc';
        replacements.idc = parseInt(params.paramC2);
    } else if (params.paramC1) {
        where += ' AND d.id=:idd';
        replacements.idd = parseInt(params.paramC1);
    } else if (params.paramC0) {
        where += ' AND e.id=:ide';
        replacements.ide = parseInt(params.paramC0);
    }

    let orderBy = 'a.created_at DESC';
    if (paramSort === 'created_at_asc') {
        orderBy = 'a.created_at';
    }

    const result = {};
    const sql = `SELECT a.*
            FROM product_group a 
            LEFT JOIN category b ON (b.id = a.category_id AND b.level = 'C3')
            LEFT JOIN category c ON (c.id = b.parent_id AND c.level = 'C2')
            LEFT JOIN category d ON (d.id = c.parent_id AND d.level = 'C1')
            LEFT JOIN category e ON (e.id = d.parent_id AND e.level = 'C0')
            WHERE ${where}
        ORDER BY ${orderBy}
        LIMIT ${paramLimit}
        OFFSET ${paramOffset}`;

    result.rows = await Sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        replacements
    });

    const sqlIds = `SELECT GROUP_CONCAT(id separator ',') AS ids FROM (${sql}) AS temp`;
    const temp = await Sequelize.query(sqlIds, {
        type: Sequelize.QueryTypes.SELECT,
        replacements
    });
    result.ids = (temp[0].ids) ? temp[0].ids : '';


    const whereCount = 'a.status=:status';
    const replacementCount = { status: 1 };
    const sqlCount = `SELECT a.visibility, COUNT(a.id) AS total
        FROM product_group a 
        WHERE ${whereCount} 
        GROUP BY a.visibility`;
    result.count = await Sequelize.query(sqlCount, {
        type: Sequelize.QueryTypes.SELECT,
        replacements: replacementCount
    });

    return result;
};


exports.countTotalSku = async function (wheres) {
    const models = await DBContext.getInstance();
    const sequelize = await models.context;

    return models.ProductVariant.findAll({
        where: wheres,
        attributes: ['product_group_id', [sequelize.fn('COUNT', sequelize.col('sku')), 'total_sku']],
        group: ['product_group_id']
    });
};

exports.getTotalProductGroup = async function () {
    const models = await DBContext.getInstance();
    const Sequelize = await models.context;

    const where = 'a.status="1" ';
    const sql = `SELECT a.visibility, COUNT(a.id) AS total
            FROM product_group a 
            WHERE ${where} GROUP BY a.visibility`;

    return Sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT
    });
};

exports.countAllProductGroup = async function (params) {
    const models = await DBContext.getInstance();
    const Sequelize = await models.context;

    let where = 'a.status="1" ';
    if (params.paramSearch) {
        let wheresCondition;
        const inputs = params.paramSearch.toLowerCase();
        if (inputs.indexOf('gp-') === 0) {
            const split = inputs.split('gp-');
            wheresCondition = `AND a.id = "${split[1]}"`;
        } else if (Number(params.paramSearch)) {
            wheresCondition = `AND a.id = "${params.paramSearch}"`;
        } else {
            wheresCondition = `AND a.name LIKE "%${params.paramSearch}%"`;
        }
        where += wheresCondition;
        // where += ' AND (a.name LIKE "%' + params.paramSearch + '%" OR  a.id LIKE "%' + params.paramSearch + '%")';
    }
    if (params.paramVisibility) {
        where += ` AND a.visibility = "${params.paramVisibility}"`;
    }

    const sql = `SELECT COUNT(a.id) AS total_data
            FROM product_group a 
            WHERE ${where}`;

    return Sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT
    });
};

exports.findAllCategoryId = async function (id) {
    const models = await DBContext.getInstance();
    const Sequelize = await models.context;


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

exports.updateCategoryC2Unspsc = async function (key, newUnspsc) {
    const models = await DBContext.getInstance();
    const transaction = await models.db_transaction;
    const Sequelize = await models.context;

    const sqlQuery = 'UPDATE category SET unspsc = CONCAT(LEFT(unspsc, 4), :new , RIGHT(unspsc,2)) WHERE LEFT(unspsc, 6) = :key';

    return Sequelize.query(sqlQuery, {
        type: Sequelize.QueryTypes.UPDATE,
        replacements: {
            new: newUnspsc,
            key
        },
        transaction
    });
};

exports.updateCategoryC1Unspsc = async function (key, newUnspsc) {
    const models = await DBContext.getInstance();
    const transaction = await models.db_transaction;
    const Sequelize = await models.context;

    const sqlQuery = 'UPDATE category SET unspsc = CONCAT(:new, RIGHT(unspsc, 4)) WHERE LEFT(unspsc, 4) = :key';

    return Sequelize.query(sqlQuery, {
        type: Sequelize.QueryTypes.UPDATE,
        replacements: {
            new: newUnspsc,
            key
        },
        transaction
    });
};

exports.updateCategoryC0Unspsc = async function (key, newUnspsc) {
    const models = await DBContext.getInstance();
    const transaction = await models.db_transaction;
    const Sequelize = await models.context;

    const sqlQuery = 'UPDATE category SET unspsc = CONCAT(:new, RIGHT(unspsc, 6)) WHERE LEFT(unspsc, 2) = :key';

    return Sequelize.query(sqlQuery, {
        type: Sequelize.QueryTypes.UPDATE,
        replacements: {
            new: newUnspsc,
            key
        },
        transaction
    });
};

exports.updateAttributeCode = async function (table, oldValue, newValue) {
    const models = await DBContext.getInstance();
    const transaction = await models.db_transaction;
    const Sequelize = await models.context;

    const field = table === 'product_variant' ? 'variant_value' : 'variant_matrix';
    const sqlQuery = `UPDATE ${table} SET ${field} = REPLACE(${field}, '":${oldValue}"', '"${newValue}"') WHERE ${field} like '%"${oldValue}"%'`;

    return Sequelize.query(sqlQuery, {
        type: Sequelize.QueryTypes.UPDATE,
        transaction
    });
};

module.exports = exports;
