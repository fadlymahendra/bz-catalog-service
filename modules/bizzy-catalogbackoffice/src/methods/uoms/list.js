'use strict';

const { DBContext, BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const UomRespository = require('../../repositories/uom');
const Transformer = require('../../transformers/uoms/list');

const schema = Joi.object().keys({
    search: Joi.string().allow(''),
    limit: Joi.number().positive().default(20),
    page: Joi.number().positive().default(1)
});

const setOffset = function (page, limit) {
    return Helper.offsetPagination(page, limit);
};

exports.getUom = async function (data, context) {
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

    const wheres = {};
    const offset = setOffset(input.page, input.limit);
    const limit = input.limit;

    if (input.search) {
        wheres.name = { [Op.like]: `%${input.search}%` };
    }

    const result = await UomRespository.findAndCountAll(wheres, offset, limit);
    const rows = Helper.parseDataObject(result.rows);

    return {
        data: rows.map(Transformer.collection),
        meta: {
            page: input.page,
            limit: input.limit,
            total_data: result.count,
            total_page: Math.ceil(result.count / input.limit)
        }
    };
};

module.exports = exports;
