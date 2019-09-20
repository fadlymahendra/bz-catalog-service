'use strict';

const { DBContext } = require('bizzy-common');

exports.findOne = async function findOne(wheres) {
    const models = await DBContext.getInstance();
    return models.AttributeCode.findOne({
        where: wheres
    });
};

exports.findAll = async function findAll(wheres = {}, offset, limit) {
    const models = await DBContext.getInstance();
    return models.AttributeCode.findAll({
        where: wheres,
        offset,
        limit
    });
};

exports.findById = async function findById(id) {
    const models = await DBContext.getInstance();
    return models.AttributeCode.findOne({
        where: {
            id: parseInt(id)
        }
    });
};

exports.findAndCountAll = async function findAndCountAll(wheres = {}, offset = 0, limit = 20) {
    const models = await DBContext.getInstance();
    return models.AttributeCode.findAndCountAll({
        where: wheres,
        offset,
        limit
    });
};

exports.findWithValue = async function findWithValue(wheresCode = {}, wheresValue = {}) {
    const models = await DBContext.getInstance();
    return models.AttributeCode.findOne({
        where: wheresCode,
        attributes: ['id', 'label', 'type'],
        include: [
            {
                model: models.AttributeValue,
                required: false,
                where: wheresValue,
                attributes: ['id', 'value']
            }
        ]
    });
};

module.exports = exports;
