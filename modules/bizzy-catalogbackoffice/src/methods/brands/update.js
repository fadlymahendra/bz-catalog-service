'use strict';

const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const BrandRespository = require('../../repositories/brand');
const Transformer = require('../../transformers/brands/detail');

const schema = Joi.object().keys({
    id: Joi.string().required(),
    name: Joi.string().min(1).max(250).required()
});

exports.putBrand = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    let {
        body: input
    } = data;

    input.id = data.path.id;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const id = parseInt(data.path.id);
    delete input.id;

    const findId = await BrandRespository.findById(id);

    if (!findId) {
        throw BizzyError.NotFound('Brand not found');
    }

    const findName = await BrandRespository.findByName(input.name);

    if (findName) {
        throw BizzyError.BadRequest("Rename brand can't with existing name or the same name");
    }

    const update = await BrandRespository.update(id, input);

    if (update[0]) { /* */ }

    let result = await BrandRespository.findById(id);

    result = Helper.parseDataObject(result);
    return Transformer.item(result);
};

module.exports = exports;
