'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const Authorization = require('../utils/authorization');
const UomRespository = require('../repositories/uom');
const Transformer = require('../transformers/uom');

exports.getUom = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    const result = await UomRespository.findAll({}, 0, 1000000);

    return {
        data: result.map(Transformer.collection)
    };
};

module.exports = exports;
