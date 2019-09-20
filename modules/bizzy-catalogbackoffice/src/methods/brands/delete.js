'use strict';

const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Authorization = require('../../utils/authorization');
const BrandRespository = require('../../repositories/brand');

const schema = Joi.object().keys({
    id: Joi.string().required()
});

exports.deleteBrand = async function (data, context) {
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

    const result = await BrandRespository.findById(input.id);

    if (!result) {
        throw BizzyError.NotFound('Brand not found');
    }

    const del = await BrandRespository.delete(input.id);

    if (!del) {
        throw BizzyError.InternalServerError('Problem Database Occur');
    }

    return '';
};

module.exports = exports;
