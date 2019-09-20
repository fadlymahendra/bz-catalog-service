'use strict';

const { BizzyError, DBContext } = require('bizzy-common');
const Joi = require('joi');
const Authorization = require('../../utils/authorization');
const ProductGroupRepository = require('../../repositories/product_group');
const Transformer = require('../../transformers/premoderations/pg_search');
const Helper = require('../../utils/helper');

/** set schema */
const schema = Joi.object().keys({
    search: Joi.string().allow(''),
    page: Joi.number().positive().default(1),
    limit: Joi.number().positive().default(20)
});

/** set offset pagination */
const setOffset = function (page, limit) {
    return Helper.offsetPagination(page, limit);
};

/** main method get premoderation product group */
exports.getPremoderationProductGroup = async function (data, context) {
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
                    name: {
                        [Op.like]: `%${input.search}%`
                    }
                },
                {
                    id: {
                        [Op.like]: `%${input.search}%`
                    }
                }
            ],
            [Op.and]: {
                is_bulk: 0
            }
        };
    }

    const result = await ProductGroupRepository.findAndCountAllProductGroup(wheres, offset, limit);

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
