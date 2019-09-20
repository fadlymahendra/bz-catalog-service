'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const ProductSkuGroupRepository = require('../../repositories/product_sku_group');
const Transformer = require('../../transformers/products/list_group');
const Authorization = require('../../utils/authorization');

const schema = Joi.object().keys({
    groups: Joi.string().required()
});

exports.getSkuByGroup = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You have no authorization access');
    }

    let {
        query: input
    } = data;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const groups = input.groups.split(',');
    const result = [];
    for (let i = 0; i < groups.length; i++) {
        const row = parseInt(groups[i]);
        const wheres = {
            group_id: row,
            status: 'active'
        };

        const result2 = await ProductSkuGroupRepository.findAll(wheres);

        const response = {};
        response.group = row;
        response.items = result2;
        result.push(response);
    }

    return {
        data: result.map(Transformer.collection)
    };
};

module.exports = exports;
