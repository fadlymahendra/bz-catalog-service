'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const RepoAttributeCode = require('../../repositories/attribute_code');
const Transformer = require('../../transformers/attributes/detail');

const schema = Joi.object().keys({
    id: Joi.string().required()
});

exports.getAttributeById = async function (data, context) {
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

    let result = await RepoAttributeCode.findAttributeValue(input.id);

    if (!result) {
        throw BizzyError.NotFound('Attribute not found');
    }

    result = Helper.parseDataObject(result);
    return Transformer.item(result);
};

module.exports = exports;
