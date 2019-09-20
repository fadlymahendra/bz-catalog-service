'use strict';

const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const Repo = require('../../repositories/stocking_uom');
const Transformer = require('../../transformers/stocking-uoms/detail');

const schema = Joi.object().keys({
    id: Joi.string().required()
});

exports.getUomStockById = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    let {
        path: input
    } = data;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    let result = await Repo.findById(input.id);

    if (!result) {
        throw BizzyError.NotFound('Uom Stock Not Found');
    }

    result = Helper.parseDataObject(result);
    return Transformer.item(result);
};

module.exports = exports;
