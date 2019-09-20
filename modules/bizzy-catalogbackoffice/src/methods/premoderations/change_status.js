'use strict';

const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const PremoderationRepository = require('../../repositories/premoderation');
const PremoderationLogRepository = require('../../repositories/premoderation_log');
const Transformer = require('../../transformers/premoderations/change_status');
const Authorization = require('../../utils/authorization');

const schema = Joi.object().keys({
    id: Joi.string().required()
});

exports.putPremoderationStatus = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    let {
        path: input
    } = data;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const premoderation = await PremoderationRepository.findOne(input.id);
    if (!premoderation) { throw BizzyError.NotFound('Premoderation Product Not Found'); }

    let status;
    if (premoderation.premoderation_status === 'revision_inprogress' || premoderation.premoderation_status === 'rejected') {
        status = 'need_revision';
    } else {
        throw BizzyError.BadRequest('Status must be revision_inprogress or rejected');
    }

    await PremoderationRepository.update(data.path.id, status);

    premoderation.created_by = Authorization.getUserId(context);
    premoderation.created_by = Authorization.getUserId(context);
    premoderation.created_name = Authorization.getUserFullname(context);
    premoderation.created_email = Authorization.getUserEmail(context);

    const payload = Transformer.insertLogPayload(premoderation, status);
    await PremoderationLogRepository.insertReject(payload);

    return {
        data: {
            id: premoderation._id,
            premoderation_status: premoderation.premoderation_status,
            premoderation_id: premoderation.id,
            created_at: premoderation.created_at,
            updated_at: premoderation.updated_at
        }
    };
};

module.exports = exports;
