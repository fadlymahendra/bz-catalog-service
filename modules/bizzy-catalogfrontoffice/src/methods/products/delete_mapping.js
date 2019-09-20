'use strict';

const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Promise = require('bluebird');
const Authorization = require('../../utils/authorization');
const ProductSkuRepository = require('../../repositories/product_sku_mapping');
const _ = require('lodash');

const itemsSchema = Joi.object().keys({
    sku: Joi.string().required(),
    payload: Joi.object().keys({
        catalog_id: Joi.string().required(),
        organization_id: Joi.number().required()
    })
});
const schema = Joi.object().keys({
    items: Joi.array().required().items(itemsSchema)
});

exports.delProductMapping = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You have no authorization access');
    }

    let {
        body: input
    } = data;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const arrayMapping = [];
    const skuMapping = [];
    await Promise.map(input.items, async (temp, i) => {
        const row = input.items[i];
        const wheres = {};
        wheres.product_sku = row.sku;
        wheres['payload.catalog_id'] = row.payload.catalog_id;
        wheres['payload.organization_id'] = parseInt(row.payload.organization_id);

        const findMapping = await ProductSkuRepository.findMapping(wheres);
        let payload = {
            sku: row.sku,
            message: 'Success'
        };
        if (!findMapping) {
            payload = {
                sku: row.sku,
                message: 'Failed'
            };
        }

        arrayMapping.push(payload);
        skuMapping.push(row.sku);
    });

    if (arrayMapping.length < 1) {
        throw BizzyError.BadRequest('One or More SKU Not Found');
    }

    const mappingFilter = _.find(arrayMapping, ['message', 'Failed']);
    if (mappingFilter) {
        throw BizzyError.NotFound(`SKU ${mappingFilter.sku} tidak ditemukan.`);
    }

    await Promise.map(input.items, async (temp, l) => {
        const rowItems = input.items[l];
        const wheresDelete = {};
        wheresDelete.product_sku = rowItems.sku;
        wheresDelete['payload.catalog_id'] = rowItems.payload.catalog_id;
        wheresDelete['payload.organization_id'] = parseInt(rowItems.payload.organization_id);

        await ProductSkuRepository.delete(wheresDelete);
    });

    return {
        message: 'SUCCESS_DELETE_SKU_MAPPING'
    };
};

module.exports = exports;
