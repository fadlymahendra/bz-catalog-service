/* eslint-disable linebreak-style */

'use strict';

const { DBContext } = require('bizzy-common');

exports.findAll = async function (where = {}) {
    const models = await DBContext.getInstance();
    return models.PrivateSku.findAll({
        where
    });
};

exports.insert = async function (data) {
    const models = await DBContext.getInstance();
    return models.PrivateSku.bulkCreate(data, { ignoreDuplicates: true });
};

exports.delete = async function (where) {
    const models = await DBContext.getInstance();
    return models.PrivateSku.destroy({ where });
};

module.exports = exports;
