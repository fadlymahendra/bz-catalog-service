'use strict';

const { DBContext } = require('bizzy-common');

exports.getCategoryBreakdownList = async function (id) {
    const models = await DBContext.getInstance();
    const Sequelize = models.context;

    const sqlQuery = `SELECT d.id AS category0_id,
        d.name AS category0_name,
        d.level AS category0_level,
        d.unspsc AS category0_unspsc,
        c.id AS category1_id,
        c.name AS category1_name,
        c.level AS category1_level,
        c.unspsc AS category1_unspsc,
        b.id AS category2_id,
        b.name AS category2_name,
        b.level AS category2_level,
        b.unspsc AS category2_unspsc,
        a.id AS category3_id,
        a.name AS category3_name,
        a.level AS category3_level,
        a.unspsc AS category3_unspsc
    FROM category a
    INNER JOIN category b ON (a.parent_id = b.id AND b.level = 'C2')
    INNER JOIN category c ON (b.parent_id = c.id AND c.level = 'C1')
    INNER JOIN category d ON (c.parent_id = d.id AND d.level = 'C0')
    WHERE a.level = 'C3'
    ORDER BY d.id, c.id, b.id, a.id`;

    return Sequelize.query(sqlQuery, {
        type: Sequelize.QueryTypes.SELECT,
        replacements: {
            id
        }
    });
};

module.exports = exports;
