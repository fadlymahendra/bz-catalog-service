'use strict';

const Promise = require('bluebird');
const Joi = require('joi');

const schemaCategoryItem = {
    id: Joi.number().allow(0).required(),
    name: Joi.string().required(),
    unspsc: Joi.number().positive()
};

const schemaCategoryItemC3 = {
    name: Joi.string().required(),
    unspsc: Joi.number().positive()
};

const schema = Joi.object().keys({
    C0: Joi.object().keys(schemaCategoryItem).required(),
    C1: Joi.object().keys(schemaCategoryItem).required(),
    C2: Joi.object().keys(schemaCategoryItem).required(),
    C3: Joi.array().items(schemaCategoryItemC3).min(1).required()
});

exports.validateCreateCategory = async function (requestBody) {
    await Joi.validate(requestBody, schema);
};

module.exports = exports;
