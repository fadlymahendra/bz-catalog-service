'use strict';

const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const PremoderationRepository = require('../../repositories/premoderation');
const PremoderationLogRepository = require('../../repositories/premoderation_log');
const Transformer = require('../../transformers/premoderations/confirm_reject');

const schema = Joi.object().keys({
    id: Joi.string().required(),
    status: Joi.string().required(),
    reject_reasons: Joi.object().required()
});

exports.putPremoderationReject = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    let {
        body: input
    } = data;

    input.id = data.path.id;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const findId = await PremoderationRepository.findOne(data.path.id);
    if (!findId) {
        throw BizzyError.NotFound('Product Not Found');
    }

    const statusBefore = Helper.lowerTrim(findId.premoderation_status);
    if (statusBefore !== 'need_revision' && statusBefore !== 'revision_complete') { throw BizzyError.BadRequest(`Product status cannot be processed: ${statusBefore}`); }

    input.name = findId.payload.name;
    input.last_status = findId.premoderation_status;
    input.created_by = Authorization.getUserId(context);
    input.created_name = Authorization.getUserFullname(context);
    input.created_email = Authorization.getUserEmail(context);

    let status;
    if (input.status === 'rejected') {
        status = 'rejected';
        input.current_status = 'rejected';
    } else {
        status = 'revision_inprogress';
        input.current_status = 'revision_inprogress';
    }

    await PremoderationRepository.update(data.path.id, status);

    const payload = Transformer.payloadItem(input);
    await PremoderationLogRepository.insertReject(payload);

    return {
        data: {
            id: payload._id,
            status,
            premoderation_id: payload.premoderation_id,
            created_at: payload.created_at,
            updated_at: payload.updated_at
        }
    };
};

module.exports = exports;
