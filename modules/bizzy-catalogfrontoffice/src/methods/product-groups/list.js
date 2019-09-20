'use strict';

const { DBContext, BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const ProductGroupRepository = require('../../repositories/product_group');
const CategoryRepository = require('../../repositories/category');
const Transformer = require('../../transformers/product-groups/list');

const schema = Joi.object().keys({
    search: Joi.string().allow(''),
    c0: Joi.string().allow(''),
    limit: Joi.number().positive().default(20),
    page: Joi.number().positive().default(1)
});

const setOffset = function (page, limit) {
    return Helper.offsetPagination(page, limit);
};

exports.getProductGroup = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    const Op = DBContext.ORMProvider.Op;

    let { query: input } = data;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    let wheres = {};
    const offset = setOffset(input.page, input.limit);
    const limit = input.limit;
    if (input.search) {
        wheres = {
            [Op.or]: [
                {
                    name: { [Op.like]: `%${input.search}%` }
                },
                {
                    manufacturing_number: { [Op.like]: `%${input.search}%` }
                }
            ]
        };
    }

    if (input.c0) {
        const showCat = await CategoryRepository.getConcatIdCategory3(input.c0);
        const resultCat = [];

        showCat.forEach((el) => {
            resultCat.push(el.ids);
        });

        if (showCat[0].ids === 'X') {
            throw BizzyError.BadRequest('Category not Found');
        }

        wheres.category_id = { [Op.in]: resultCat };
    }
    wheres.is_bulk = 0;
    wheres.status = 1;
    wheres.visibility = 1;
    const result = await ProductGroupRepository.findAndCountAllWithJoin(wheres, offset, limit);
    const rows = Helper.parseDataObject(result.rows);

    return {
        data: rows.map(Transformer.list),
        meta: {
            page: input.page,
            limit: input.limit,
            total_data: result.count,
            total_page: Math.ceil(result.count / input.limit)
        }
    };
};

module.exports = exports;
