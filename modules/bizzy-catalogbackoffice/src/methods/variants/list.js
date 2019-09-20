'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const VariantAdapter = require('../../utils/adapter/variants');
const Transformer = require('../../transformers/variants/list');
const _ = require('lodash');

const schema = Joi.object().keys({
    search: Joi.string().allow(''),
    category: Joi.number().positive(),
    created_by: Joi.number().positive(),
    limit: Joi.number().positive().default(20),
    page: Joi.number().positive().default(1)
});

const setOffset = function (page, limit) {
    return Helper.offsetPagination(page, limit);
};

const getListCreator = function (list) {
    const ids = [];
    list.forEach((el) => {
        ids.push(el.created_by);
    });
    return ids.filter((el) => el !== null);
};

exports.getVariant = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    let {
        query: input
    } = data;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const offset = setOffset(input.page, input.limit);
    const limit = input.limit;

    const condition = {
        offset,
        limit,
        search: input.search,
        category: input.category,
        created_by: input.created_by
    };

    const result = await VariantAdapter.findAllVariants(condition, offset, limit);
    let resultAll = await VariantAdapter.findAllVariants(condition);
    const rows = Helper.parseDataObject(result);
    resultAll = Helper.parseDataObject(resultAll);

    await Promise.map(rows, async (item, index) => {
        const code = item.AttributeCode.code;
        const sku = await VariantAdapter.findSkuByAttributeCode(code);
        rows[index].skus = sku;
    }, { concurrency: 4 });

    let listCreator = getListCreator(resultAll);
    listCreator = _.uniq(listCreator);
    listCreator = _.join(listCreator, ',');

    return {
        data: rows.map(Transformer.collection),
        meta: {
            page: input.page,
            limit: input.limit,
            user_created: listCreator,
            total_data: result.length,
            total_page: Math.ceil(resultAll.length / input.limit)
        }
    };
};

module.exports = exports;
