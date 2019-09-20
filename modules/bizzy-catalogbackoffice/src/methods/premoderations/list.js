'use strict';

const Promise = require('bluebird');
const { DBContext, BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const PremoderationRepository = require('../../repositories/premoderation');
const PremoderationLogRepository = require('../../repositories/premoderation_log');
const Transformer = require('../../transformers/premoderations/list');

const schema = Joi.object().keys({
    search: Joi.string().allow(''),
    status: Joi.string().allow(''),
    c0: Joi.string().allow(''),
    c1: Joi.string().allow(''),
    c2: Joi.string().allow(''),
    c3: Joi.string().allow(''),
    sort: Joi.string().allow('').default('desc'),
    vendor_id: Joi.string().allow(''),
    assign_to: Joi.string().allow(''),
    page: Joi.number().positive().default(1),
    limit: Joi.number().positive().default(20)
});

const setOffset = function (page, limit) {
    return Helper.offsetPagination(page, limit);
};

const PREMODERATION_REVISION_INPROGRESS = 'revision_inprogress';
const PREMODERATION_REVISION_COMPLETE = 'revision_complete';
const PREMODERATION_REJECTED = 'rejected';
const PREMODERATION_DONE = 'done';
const PREMODERATION_NEED_REVISION = 'need_revision';

const getTotalPremoderationHistory = async function (id) {
    const wheres = {
        premoderation_id: id,
        current_status: {
            $in: [
                PREMODERATION_REVISION_INPROGRESS,
                PREMODERATION_REJECTED,
                PREMODERATION_DONE
            ]
        }
    };

    const totalHistory = await PremoderationLogRepository.count(wheres);
    return totalHistory;
};

exports.getPremoderation = async function (data, context) {
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

    const wheres = {};
    const offset = setOffset(input.page, input.limit);
    const limit = input.limit;

    if (input.search) {
        const inputs = input.search.toLowerCase();
        if (inputs.indexOf('gp-') === 0) {
            const split = inputs.split('gp-');
            wheres.product_group_id = parseInt(split[1]);
        } else {
            wheres.$or = [
                {
                    'payload.name': new RegExp(input.search, 'i')
                },
                {
                    id: input.search
                }
            ];
        }
    }

    if (input.status) {
        wheres.premoderation_status = {
            $in: input.status.split(',')
        };
    }

    if (input.c0) {
        wheres['payload.category.c0'] = parseInt(input.c0);
    }

    if (input.c1) {
        wheres['payload.category.c1'] = parseInt(input.c1);
    }

    if (input.c2) {
        wheres['payload.category.c2'] = parseInt(input.c2);
    }

    if (input.c3) {
        wheres['payload.category.c3'] = parseInt(input.c3);
    }

    let sort;
    if (input.sort === 'created_at_asc') {
        sort = { created_at: 1 };
    } else {
        sort = { created_at: -1 };
    }

    if (input.vendor_id) {
        wheres.vendor_id = parseInt(input.vendor_id);
    }

    if (input.assign_to) {
        wheres['assign.id'] = parseInt(input.assign_to);
    }

    const result = await PremoderationRepository.findAll(wheres, offset, limit, sort);
    const totalData = await PremoderationRepository.count(wheres);

    const total = {
        need_revision: 0,
        revision_complete: 0,
        rejected: 0,
        revision_inprogress: 0
    };

    const totalDataStatus = await PremoderationRepository.countAllPremoderationStatus();

    if (totalDataStatus) {
        const totalPremoderation = Helper.parseDataObject(totalDataStatus);

        totalPremoderation.forEach((element) => {
            switch (element._id) {
            case 'revision_inprogress':
                total.revision_inprogress = element.count;
                break;
            case 'revision_complete':
                total.revision_complete = element.count;
                break;
            case 'need_revision':
                total.need_revision = element.count;
                break;
            case 'rejected':
                total.rejected = element.count;
                break;
            }
        });
    }

    for (let i = 0; i < result.length; i += 1) {
        result[i].total_history = await getTotalPremoderationHistory(result[i].id);
    }

    return {
        data: result.map(Transformer.collection),
        meta: {
            page: input.page,
            limit: input.limit,
            total_data: totalData,
            total_page: Math.ceil(totalData / input.limit),
            total_need_revision: total.need_revision,
            total_revision_complete: total.revision_complete,
            total_rejected: total.rejected,
            total_revision_inprogress: total.revision_inprogress
        }
    };
};

module.exports = exports;
