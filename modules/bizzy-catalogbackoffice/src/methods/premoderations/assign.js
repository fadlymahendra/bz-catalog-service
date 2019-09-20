'use strict';

const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Authorization = require('../../utils/authorization');
const PremoderationRepository = require('../../repositories/premoderation');

const schemaAssign = {
    id: Joi.number().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    type: Joi.string().required()
};

const schema = Joi.object().keys({
    assign: Joi.object().keys(schemaAssign),
    products: Joi.array().required()
});

exports.postPremoderationAssign = async function (data, context) {
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

    const wheres = {};
    wheres.$in = input.products;

    const findId = await PremoderationRepository.findById(wheres);

    if (!findId) {
        throw BizzyError.NotFound('Product Not Found');
    }

    await PremoderationRepository.updateAssign(input.assign, wheres);

    return {
        data: {
            id: input.products,
            assign: input.assign
        }
    };
};

module.exports = exports;
