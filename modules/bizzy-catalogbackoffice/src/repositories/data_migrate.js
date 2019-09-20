'use strict';

const { DBContext } = require('bizzy-common');

exports.findAll = async function ({ startAt, endAt, skip = [] }) {
    const db = await DBContext.getInstance();
    const Op = DBContext.ORMProvider.Op;
    const whereCondition = {};

    if (startAt || endAt) {
        if (!whereCondition.id) {
            whereCondition.id = {};
        }

        if (startAt) {
            whereCondition.id[Op.gte] = startAt;
        }

        if (endAt) {
            whereCondition.id[Op.lte] = endAt;
        }
    }

    if (skip && skip.length > 0) {
        if (!whereCondition.id) {
            whereCondition.id = {};
        }

        whereCondition.id[Op.notIn] = skip;
    }

    return db.ProductVariant.findAll({
        where: whereCondition
    });
};

module.exports = exports;
