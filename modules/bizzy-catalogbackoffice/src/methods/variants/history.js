'use strict';

const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const VariantLogRepository = require('../../repositories/variant_log');
const Transformer = require('../../transformers/variants/history');

const schemaPath = Joi.object().keys({
    id: Joi.string().required()
});

const schema = Joi.object().keys({
    page: Joi.number().positive().default(1),
    limit: Joi.number().positive().default(20)
});

const setOffset = function (page, limit) {
    return Helper.offsetPagination(page, limit);
};

exports.getVariantHistory = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    let {
        query: input,
        path
    } = data;

    try {
        input = await Joi.validate(input, schema);
        path = await Joi.validate(path, schemaPath);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const id = path.id;
    const wheres = {
        attribute_set_id: parseInt(id),
        'user.type': 'employee'
    };

    const offset = setOffset(input.page, input.limit);
    const limit = input.limit;
    const sort = { created_at: -1 };

    const result = await VariantLogRepository.findAll(wheres, offset, limit, sort);
    const totalData = await VariantLogRepository.count(wheres);

    return {
        data: result.map(Transformer.collection),
        meta: {
            page: input.page,
            limit: input.limit,
            total_data: result.length,
            total_page: Math.ceil(totalData / input.limit)
        }
    };
};

module.exports = exports;
