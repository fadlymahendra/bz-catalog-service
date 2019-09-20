'use strict';

const { DBContext, BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const CategoryRepository = require('../../repositories/category');
const Transformer = require('../../transformers/categories/list');

const schema = Joi.object().keys({
    search: Joi.string().allow(''),
    parent_id: Joi.number(),
    level: Joi.string().valid('C0', 'C1', 'C2', 'C3').default('C0')
});

const setOffset = function (page, limit) {
    return Helper.offsetPagination(page, limit);
};

exports.getCategory = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

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
        level: input.level,
        is_active: 1
    };

    if (input.search) {
        wheres.name = { [Op.like]: `%${input.search}%` };
    }

    if (input.parent_id) {
        wheres.parent_id = input.parent_id;
    }

    const result = await CategoryRepository.findAll(wheres);
    const rows = Helper.parseDataObject(result);

    return {
        data: rows.map(Transformer.collection)
    };
};

exports.getCategoryByBreadcrumb = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    const Op = DBContext.ORMProvider.Op;

    let {
        query: input
    } = data;

    const schemaBreadcrumb = Joi.object().keys({
        search: Joi.string().required(),
        page: Joi.number().positive().default(1),
        limit: Joi.number().positive().default(20)
    });

    try {
        input = await Joi.validate(input, schemaBreadcrumb);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const wheres = {
        breadcrumb: { [Op.like]: `%${input.search}%` },
        is_active: 1
    };

    const offset = setOffset(input.page, input.limit);
    const limit = input.limit;

    const order = [['level', 'ASC']];
    const result = await CategoryRepository.findAll(wheres, offset, limit, order);

    const allRows = await CategoryRepository.findAll(wheres);
    const rows = Helper.parseDataObject(result);

    return {
        data: rows.map(Transformer.collection),
        meta: {
            page: input.page,
            limit: input.limit,
            total_data: allRows.length
        }
    };
};


exports.getListCategoryById = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    const Op = DBContext.ORMProvider.Op;

    let {
        query: input
    } = data;


    const schemaById = Joi.object().keys({
        search: Joi.string().allow(''),
        parent_id: Joi.number().allow(''),
        level: Joi.string().valid('C0', 'C1', 'C2', 'C3').default('C0')
    });
    try {
        input = await Joi.validate(input, schemaById);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const wheres = {
        level: input.level,
        is_active: 1
    };
    if (input.parent_id) {
        wheres.parent_id = input.parent_id;
    }
    if (input.search) {
        wheres.name = { [Op.like]: `%${input.search}%` };
    }

    const result = await CategoryRepository.findAll(wheres);
    const rows = Helper.parseDataObject(result);

    return {
        data: rows.map(Transformer.collection)
    };
};

module.exports = exports;
