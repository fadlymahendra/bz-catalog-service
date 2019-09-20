'use strict';

const { DBContext } = require('bizzy-common');

exports.findAll = async function (wheres = {}) {
    const models = await DBContext.getInstance();
    return models.ProductGroupAttribute.findAll({
        where: wheres,
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
    });
};

module.exports = exports;
