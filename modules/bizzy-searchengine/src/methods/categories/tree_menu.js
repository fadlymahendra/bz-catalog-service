'use strict';


const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const CategoryRepository = require('../../repositories/tree_menu');
const RedisRepository = require('../../repositories/redis');
const Transformer = require('../../transformers/categories/tree_menu');

const schema = Joi.object().keys({
    reset: Joi.number().allow('').default(0)
});

exports.getCategoryTreeMenu = async function (data, context) {
    const key = 'bizzyCatalogTreeMenu';

    let {
        query: input
    } = data;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const result = await RedisRepository.find(key);
    if (input.reset === 1 || result.total === null) {
        const resultCategory = await CategoryRepository.getCategoryBreakdownList();
        const insertRedis = await RedisRepository.insert(key, Transformer.collection(resultCategory));
        return insertRedis;
    }

    return JSON.parse(result.total);
};

module.exports = exports;
