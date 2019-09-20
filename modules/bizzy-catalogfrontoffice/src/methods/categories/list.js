'use strict';

const Promise = require('bluebird');
const { DBContext, BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const CategoryRepository = require('../../repositories/category');
const Transformer = require('../../transformers/categories/list');

const setOffset = function (page, limit) {
    return Helper.offsetPagination(page, limit);
};

exports.getCategory = async function getCategory(data, context) {
    const schema = Joi.object().keys({
        search: Joi.string().allow('')
    });

    const Op = DBContext.ORMProvider.Op;

    let {
        query: input
    } = data;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const wheres = {
        level: 'C0',
        is_active: 1
    };

    if (input.search) {
        wheres.name = { [Op.like]: `%${input.search}%` };
    }
    const result = await CategoryRepository.findAll(wheres);
    const rows = Helper.parseDataObject(result);

    return {
        data: rows.map(Transformer.collection)
    };
};

exports.getHierarchicalCategory = async function getHierarchicalCategory(data) {
    const schema = Joi.object().keys({
        search: Joi.string().allow(''),
        limit: Joi.number().positive().default(20),
        page: Joi.number().positive().default(1)
    });

    let { query: input } = data;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const wheres = {};
    const offset = setOffset(input.page, input.limit);
    const limit = input.limit;

    if (input.search) wheres.name = input.search;

    const categories = await CategoryRepository.getHierarchicalCategory(wheres, offset, limit);
    const categoriesAll = await CategoryRepository.getCountAllHierarchicalCategory(wheres);

    return {
        data: categories,
        meta: {
            page: input.page,
            limit: input.limit,
            total_data: categoriesAll[0].total_data,
            total_page: Math.ceil(categoriesAll[0].total_data / input.limit)
        }
    };
};

module.exports = exports;
