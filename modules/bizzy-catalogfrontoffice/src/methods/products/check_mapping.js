'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const ProductSkuMapping = require('../../repositories/product_sku_mapping');
const Transformer = require('../../transformers/products/sku_mapping');
const _ = require('lodash');

const schema = Joi.object().keys({
    skus: Joi.string().required(),
    organization_id: Joi.number().required(),
    catalog_id: Joi.string().required()
});

exports.getCheckSkuMapping = async function (data, context) {
    let {
        query: input
    } = data;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const sku = input.skus.split(',');
    const result = [];
    const catalogIds = _.split(input.catalog_id, ',');
    for (let i = 0; i < sku.length; i += 1) {
        const row = sku[i];
        const wheres = {
            product_sku: row
        };
        wheres['payload.organization_id'] = parseInt(input.organization_id);
        wheres['payload.catalog_id'] = {
            $in: catalogIds
        };
        wheres.$or = [
            {
                'payload.material_code': {
                    $ne: ''
                }
            },
            {
                'payload.material_group': {
                    $ne: ''
                }
            }
        ];
        const checkMapping = await ProductSkuMapping.findMappingSku(wheres);
        const payload = {
            sku: row,
            mapping: checkMapping,
            catalog_id: checkMapping ? checkMapping.payload.catalog_id : catalogIds[0]
        };
        result.push(payload);
    }

    return {
        data: result.map(Transformer.collection)
    };
};

module.exports = exports;
