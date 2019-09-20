'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const Authorization = require('../utils/authorization');
const skuMappingRepo = require('../repositories/product_sku_mapping');
const validator = require('../utils/filter_catman_validator');
const Result = require('../utils/result');
const _ = require('lodash');

exports.getCatalogDetailMapping = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    // - get path and query from data
    const query = _.chain(data).get('query').value();
    const path = _.chain(data).get('path').value();

    // validate path
    await validator.validate(path, 'getCatalogDetailMappingPath')
        .catch((error) => {
            throw BizzyError.BadRequest(error.message);
        });

    // - validate query
    const {
        mapped
    } = await validator.validate(query, 'getCatalogDetailMappingQuery')
        .catch((error) => {
            throw BizzyError.BadRequest(error.message);
        });

    const criteria = {
        'payload.catalog_id': path.catalog_id
    };

    if (mapped === 1) {
        Object.assign(criteria, { 'payload.mapped': mapped });
    }

    const products = await skuMappingRepo.findAllMappingNoPaging(criteria);
    const result = _.chain(products).flatMap(p => p.product_sku).value();

    return new Result('success', result);
};

exports.getAllCatalogMapping = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    const criteria = {
        'payload.organization_id': context.user.customer.organization_id,
        'payload.mapped': 1
    };

    const rawSKUs = await skuMappingRepo.findAllMappingNoPaging(criteria);
    const result = _.chain(rawSKUs).flatMap(p => p.product_sku).uniq().value();
    return new Result('success', result);
};

exports.getCatalogGroupMapping = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    // - get path and query from data
    const query = _.chain(data).get('query').value();
    const path = _.chain(data).get('path').value();

    // validate path
    await validator.validate(path, 'getCatalogGroupMappingPath')
        .catch((error) => {
            throw BizzyError.BadRequest(error.message);
        });

    // - validate query
    const {
        catalog_ids: catalogsIds,
        mapped
    } = await validator.validate(query, 'getCatalogGroupMappingQuery')
        .catch((error) => {
            throw BizzyError.BadRequest(error.message);
        });

    const catalogIds = _.split(catalogsIds, ',');
    const rawSKUs = mapped === 1 ? await skuMappingRepo.findAllByCatalogIdsMapped(catalogIds) : await skuMappingRepo.findAllByCatalogIds(catalogIds);
    const result = _.chain(rawSKUs).flatMap(p => p.product_sku).uniq().value();

    return new Result('success', result);
};

module.exports = exports;
