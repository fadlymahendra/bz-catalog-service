'use strict';

const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Authorization = require('../../utils/authorization');
const Repo = require('../../repositories/stocking_uom');

const schema = Joi.object().keys({
    id: Joi.string().required()
});

exports.deleteUomStock = async function (data, context) {
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

    const result = await Repo.findById(input.id);

    if (!result) {
        throw BizzyError.NotFound('Uom Stock not found');
    }

    const del = await Repo.delete(input.id);

    if (!del) {
        throw BizzyError.InternalServerError('Problem Database Occur');
    }

    return '';
};

module.exports = exports;
