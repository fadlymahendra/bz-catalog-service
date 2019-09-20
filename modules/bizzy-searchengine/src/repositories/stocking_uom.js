'use strict';

const { DBContext } = require('bizzy-common');

exports.findById = async function (id) {
    const models = await DBContext.getInstance();
    return models.StockingUom.findOne({
        where: {
            id: parseInt(id)
        }
    });
};

module.exports = exports;
