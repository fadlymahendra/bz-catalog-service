'use strict';

const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const BrandRespository = require('../../repositories/brand');
const Transformer = require('../../transformers/brands/detail');

const schema = Joi.object().keys({
    name: Joi.string().min(1).max(250).required()
});

exports.postBrand = async function (data, context) {
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

    const result = await BrandRespository.findOrCreate(input);

    if (result[1] === false) {
        throw BizzyError.BadRequest('Brand Already Exist');
    }

    const row = Helper.parseDataObject(result[0]);
    return Transformer.item(row);
};

module.exports = exports;
