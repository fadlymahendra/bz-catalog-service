'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Authorization = require('../../utils/authorization');
const CategoryRepository = require('../../repositories/category');
const CategoryLog = require('../../repositories/category_log');
const Transformer = require('../../transformers/categories/history');
const Helper = require('../../utils/helper');

const schema = Joi.object().keys({
    page: Joi.number().positive().default(1),
    limit: Joi.number().positive().default(20)
});

const schemaPath = Joi.object().keys({
    id: Joi.number().required()
});

const setOffset = function (page, limit) {
    return Helper.offsetPagination(page, limit);
};

exports.getCategoryHistoryById = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    const {
        query: input,
        path
    } = data;

    try {
        await Joi.validate(input, schema);
        await Joi.validate(path, schemaPath);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const offset = setOffset(input.page, input.limit);
    const limit = input.limit;

    const category = await CategoryRepository.findOne({
        id: path.id
    });

    if (!category) {
        throw BizzyError.NotFound('Category Not Found');
    }

    const categoryLog = await CategoryLog.findAllRecord({
        'category.id': parseInt(path.id)
    }, offset, limit, { created_at: -1 });
    const findAll = await CategoryLog.findAllWithOutPagination({
        'category.id': parseInt(path.id)
    });

    return {
        data: categoryLog.map(Transformer.collection),
        meta: {
            page: Number(input.page),
            limit: Number(input.limit),
            total_data: findAll.length,
            total_page: Math.ceil(findAll.length / limit)
        }
    };
};

module.exports = exports;
