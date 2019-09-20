'use strict';

const Promise = require('bluebird');
const { BizzyService } = require('bizzy-common');
const Helper = require('../../utils/time');
const PremoderationRepository = require('../../repositories/premoderation');
const Transformer = require('../../transformers/mails/premoderation_revision');

exports.postEmailPremoderationRevision = async function (data, context) {
    const days = new Date();
    const getDays = Helper.rangeDate(days.getDay());

    const wheres = {};
    wheres.premoderation_status = 'need_revision';
    wheres.created_at = {
        $gte: new Date(getDays.start_date),
        $lte: new Date(getDays.end_date)
    };

    const result = await PremoderationRepository.findAllGroupVendor(wheres);
    if (result.length === 0) {
        return {
            message: 'Tidak ada data yang perlu dikirimkan email'
        };
    }

    await Promise.map(result, row => BizzyService.callAsync('bizzy-communication', 'publishNotification', Transformer.item(row)), {
        concurrency: 10
    });
    return {
        message: 'Email sukses dikirim'
    };
};

module.exports = exports;
