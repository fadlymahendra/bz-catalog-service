'use strict';

const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const Repo = require('../../repositories/stocking_uom');
const Transformer = require('../../transformers/stocking-uoms/detail');

const schema = Joi.object().keys({
    name: Joi.string().min(1).max(250).required()
});

exports.postUomStock = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    let {
        body: input
    } = data;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const result = await Repo.findOrCreate(input);

    if (result[1] === false) {
        throw BizzyError.BadRequest('Uom Stock Already Exist');
    }

    const row = Helper.parseDataObject(result[0]);
    return Transformer.item(row);
};

module.exports = exports;
