'use strict';

const Promise = require('bluebird');
const Joi = require('joi');

const CATALOG_DETAIL_SCHEMA_PATH = Joi.object().keys({
    catalog_id: Joi.string().required()
});

const CATALOG_DETAIL_SCHEMA_QUERY = Joi.object().keys({
    mapped: Joi.number().integer().positive().max(1)
        .allow('')
});

const CATALOG_GROUP_SCHEMA_QUERY = Joi.object().keys({
    catalog_ids: Joi.string().required(),
    mapped: Joi.number().integer().positive().max(1)
        .allow('')
});

const CATALOG_GROUP_SCHEMA_PATH = Joi.object().keys({
    group_id: Joi.number().integer().required()
});

const SCHEMA = {
    getCatalogDetailMappingPath: CATALOG_DETAIL_SCHEMA_PATH,
    getCatalogDetailMappingQuery: CATALOG_DETAIL_SCHEMA_QUERY,
    getCatalogGroupMappingQuery: CATALOG_GROUP_SCHEMA_QUERY,
    getCatalogGroupMappingPath: CATALOG_GROUP_SCHEMA_PATH
};

const validate = Promise.coroutine(function* validate(payload, schema) {
    try {
        return yield Joi.validate(payload, SCHEMA[schema]);
    } catch (error) {
        throw new Error(error.message.replace(/"/g, ''));
    }
});

module.exports = {
    validate
};
