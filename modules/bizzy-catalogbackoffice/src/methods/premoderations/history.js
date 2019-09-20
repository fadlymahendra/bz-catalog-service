'use strict';

const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const PremoderationRepository = require('../../repositories/premoderation');
const PremoderationLogRepository = require('../../repositories/premoderation_log');
const Transformer = require('../../transformers/premoderations/history');

const schema = Joi.object().keys({
    id: Joi.string().required(),
    sort: Joi.string().default('created_at_desc'),
    page: Joi.number().positive().default(1),
    limit: Joi.number().positive().default(20)
});

const setOffset = function (page, limit) {
    return Helper.offsetPagination(page, limit);
};

exports.getPremoderationHistory = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    let {
        query: input
    } = data;

    input.id = data.path.id;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    delete input.id;

    const wheres = {
        premoderation_id: data.path.id,
        current_status: {
            $in: [
                'revision_inprogress',
                'rejected',
                'done'
            ]
        }
    };
    const offset = setOffset(input.page, input.limit);
    const limit = input.limit;
    let sort;
    if (input.sort === 'created_at_asc') {
        sort = { created_at: 1 };
    } else {
        sort = { created_at: -1 };
    }

    const premoderation = await PremoderationRepository.findOne(data.path.id);

    if (!premoderation) {
        throw BizzyError.NotFound('Premoderation Not Found'); 
    }

    const result = await PremoderationLogRepository.findAll(wheres, offset, limit, sort);
    const totalData = await PremoderationLogRepository.count(wheres);

    return {
        data: result.map(Transformer.collection),
        meta: {
            page: input.page,
            limit: input.limit,
            total_data: totalData,
            total_page: Math.ceil(totalData / input.limit)
        }
    };
};

module.exports = exports;
