'use strict';

const { DBContext } = require('bizzy-common');

exports.findAll = async function findAll(wheres = {}, offset, limit) {
    const models = await DBContext.getInstance();
    return models.AttributeValue.findAll({
        where: wheres,
        offset,
        limit
    });
};

module.exports = exports;
