'use strict';

const { DBContext } = require('bizzy-common');

exports.findOne = async function findOne(wheres) {
    const models = await DBContext.getInstance();
    return models.AttributeSet.findOne({
        where: wheres
    });
};

exports.findAll = async function findAll(wheres = {}, offset = 0, limit = 20) {
    const models = await DBContext.getInstance();
    return models.AttributeSet.findAll({
        where: wheres,
        offset,
        limit
    });
};

exports.findById = async function findById(id) {
    const models = await DBContext.getInstance();
    return models.AttributeSet.findOne({
        where: {
            id: parseInt(id)
        }
    });
};

exports.findAndCountAll = async function findAndCountAll(wheres = {}, offset = 0, limit = 20) {
    const models = await DBContext.getInstance();
    return models.AttributeSet.findAndCountAll({
        where: wheres,
        offset,
        limit
    });
};

exports.findVariantSpec = async function findVariantSpec(id) {
    const models = await DBContext.getInstance();
    return models.AttributeSet.findAll({
        where: {
            category_id: parseInt(id)
        },
        include: [
            {
                model: models.AttributeCode,
                include: [
                    {
                        model: models.AttributeValue,
                        separate: true
                    }
                ]
            }
        ]
    });
};

module.exports = exports;
