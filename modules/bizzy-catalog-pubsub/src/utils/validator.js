'use strict';

const Joi = require('joi');
const { BizzyError } = require('bizzy-common');

const SCHEMA = {};

const validate = async (payload, schema) => {
    try {
        return await Joi.validate(payload, SCHEMA[schema]);
    } catch (err) {
        throw BizzyError.BadRequest(err.message.replace(/"/g, ''));
    }
};

module.exports = {
    validate
};
