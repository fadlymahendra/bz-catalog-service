'use strict';

const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Authorization = require('../../utils/authorization');
const UomRespository = require('../../repositories/uom');

const schema = Joi.object().keys({
    id: Joi.string().required()
});

exports.deleteUom = async function (data, context) {
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

    const result = await UomRespository.findById(input.id);
    if (!result) {
        throw BizzyError.NotFound('Uom not found');
    }

    const del = await UomRespository.delete(input.id);
    if (!del) {
        throw BizzyError.InternalServerError('Problem Database Occur');
    }

    return '';
};

module.exports = exports;
