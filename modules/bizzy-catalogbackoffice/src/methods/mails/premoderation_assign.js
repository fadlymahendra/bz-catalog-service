'use strict';

const Promise = require('bluebird');
const { BizzyService } = require('bizzy-common');
const Transformer = require('../../transformers/mails/premoderation_assign');
const PremoderationRepository = require('../../repositories/premoderation');
const Helper = require('../../utils/time');

exports.postEmailPremoderationAssign = async function (data, context) {
    const days = new Date();
    const getDays = Helper.rangeDateOnce(days);

    const wheres = {
        premoderation_status: { $in: ['revision_complete', 'need_revision'] },
        assign: { $exists: true },
        created_at: {
            $gte: new Date(getDays.start_date),
            $lte: new Date(getDays.end_date)
        }
    };

    const result = await PremoderationRepository.findAllGroupAssign(wheres);
    if (result.length === 0) {
        return {
            message: 'Tidak ada data yang perlu dikirimkan email'
        };
    }

    await Promise.map(result, payload => BizzyService.callAsync('bizzy-communication', 'publishNotification', Transformer.item(payload)), {
        concurrency: 10
    });

    return {
        message: 'Email sukses dikirim'
    };
};

module.exports = exports;
