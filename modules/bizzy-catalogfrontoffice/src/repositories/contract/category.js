'use strict';

const { DBContext } = require('bizzy-common');

exports.findC2 = async function findC3(id) {
    const models = await DBContext.getInstance();
    return models.Category.findAll({
        where: {
            is_active: 1,
            level: 'C2',
            id
        },
        attributes: ['id']
    });
};

exports.findC3ByC2 = async function findC3ByC2(c2) {
    const models = await DBContext.getInstance();
    const { Op } = DBContext.ORMProvider;

    return models.Category.findAll({
        where: {
            is_active: 1,
            level: 'C3',
            parent_id: {
                [Op.in]: c2
            }
        },
        attributes: ['id']
    });
};

exports.findC3 = async function findC3(id) {
    const models = await DBContext.getInstance();
    return models.Category.findAll({
        where: {
            is_active: 1,
            level: 'C3',
            id
        },
        attributes: ['id']
    });
};

module.exports = exports;
