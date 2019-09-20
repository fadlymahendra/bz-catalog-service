'use strict';

const Promise = require('bluebird');
const { BizzyError, BizzyService } = require('bizzy-common');
const Joi = require('joi');
const ItemRepo = require('../repositories/data_migrate');

const schema = Joi.object().keys({
    key: Joi.string().required(),
    action: Joi.string().required()
});

const trigger = function (data, context, action) {
    if (action === 'postEmailPremoderationApproved') {
        const Method = require('./mails/premoderation_approved');
        return Method.postEmailPremoderationApproved(data, context);
    } else if (action === 'postEmailPremoderationRejected') {
        const Method = require('./mails/premoderation_rejected');
        return Method.postEmailPremoderationRejected(data, context);
    } else if (action === 'postEmailPremoderationAssign') {
        const Method = require('./mails/premoderation_assign');
        return Method.postEmailPremoderationAssign(data, context);
    } else if (action === 'postEmailPremoderationRevision') {
        const Method = require('./mails/premoderation_revision');
        return Method.postEmailPremoderationRevision(data, context);
    }
    return false;
};

function callWithRetry(action, payload) {
    return BizzyService.callSync('bizzy-netsuite', action, {
        data: {
            variants: [payload]
        }
    }).catch((err) => {
        console.error(`Entity ID: ${payload.id}, Action: ${action}`);
        console.error(err.stack);
        return callWithRetry(action, payload);
    });
}

exports.getCron = async function (data, context) {
    let {
        query: input
    } = data;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    if (input.key !== 'bizzyphoenix2018') {
        throw BizzyError.BadRequest('Invalid key parameter');
    }

    const actionList = [
        'postEmailPremoderationApproved',
        'postEmailPremoderationRejected',
        'postEmailPremoderationAssign',
        'postEmailPremoderationRevision'
    ];

    if (actionList.indexOf(input.action) > -1) {
        return trigger(data, context, input.action);
    }

    return {
        message: 'No action triggered!'
    };
};

exports.migrateItem = async function (data, context) {
    try {
        const result = await Promise.each(await ItemRepo.findAll({
            startAt: data.start_at,
            endAt: data.end_at,
            skip: data.skip || []
        }), async (item) => {
            console.log(`Start Processing: ID ${item.id}`);

            const detailItem = await BizzyService.callSync('bizzy-searchengine', 'getProductDetailByVariantForERP', {
                data: {
                    path: {
                        id: item.sku
                    }
                }
            });

            await callWithRetry('createItem', detailItem);

            console.log(`Done Processing: ID ${item.id}`);
        });

        return result;
    } catch (err) {
        console.error(err.stack);
        throw BizzyError.BadRequest(err.message);
    }
};

module.exports = exports;
