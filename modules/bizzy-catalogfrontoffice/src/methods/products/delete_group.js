'use strict';

const { BizzyError, BizzyService } = require('bizzy-common');
const Joi = require('joi');
const Promise = require('bluebird');
const Authorization = require('../../utils/authorization');
const ProductSkuGroupRepository = require('../../repositories/product_sku_group');
const _ = require('lodash');

const schemaPayload = Joi.object().keys({
    group: Joi.number().required(),
    items: Joi.array().required(),
    type: Joi.allow('')
});

const schema = Joi.object().keys({
    payload: Joi.array().required().items(schemaPayload)
});

exports.delProductSkuGroup = async function (data, context) {
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

    const result = [];
    const skuItems = [];

    for (let i = 0; i < input.payload.length; i++) {
        const rowPayload = input.payload[i];
        const group = input.payload[i].group;

        for (let l = 0; l < rowPayload.items.length; l++) {
            const row = rowPayload.items[l];
            const payloadData = {
                group_id: group,
                product_sku: row,
                status: 'active'
            };

            const checkMongo = await ProductSkuGroupRepository.findOne(payloadData);
            let resultCheckMongo = {
                sku: row,
                group,
                message: 'Failed'
            };
            if (checkMongo) {
                resultCheckMongo = {
                    sku: row,
                    group,
                    message: 'Success'
                };
            }

            result.push(resultCheckMongo);
            skuItems.push(row);
        }
    }

    if (result.length < 1) {
        throw BizzyError.BadRequest('One or More SKU Not Found');
    }

    const checkGroup = _.find(result, ['message', 'Failed']);
    if (checkGroup) {
        throw BizzyError.NotFound(`SKU ${checkGroup.sku} Not Found.`);
    }

    await Promise.map(result, async (item, d) => {
        const wheres = {
            group_id: parseInt(result[d].group),
            product_sku: result[d].sku
        };
        await ProductSkuGroupRepository.deleteGroup(wheres);
    });

    // Reindex
    let cursor = 0;
    const concurrency = 2;
    const diff = skuItems.length;
    const iteration = Math.ceil(diff / concurrency);

    for (let c = 1; c <= iteration; c += 1) {
        const endCursor = cursor + concurrency;
        const item = _.slice(skuItems, cursor, endCursor);
        cursor += concurrency;
        await BizzyService.callAsync('bizzy-searchengine', 'reindex', {
            data: {
                body: {
                    type: 'product_variant',
                    id: _.uniq(item),
                    data: input
                }
            }
        });
    }

    return {
        message: 'SUCCESS_DELETE_GROUP_SKU'
    };
};

module.exports = exports;
