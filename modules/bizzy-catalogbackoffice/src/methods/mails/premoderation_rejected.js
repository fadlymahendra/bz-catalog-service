'use strict';

const Promise = require('bluebird');
const { BizzyService } = require('bizzy-common');
const Helper = require('../../utils/time');
const PremoderationRepository = require('../../repositories/premoderation');
const PremoderationLogRepository = require('../../repositories/premoderation_log');
const Transformer = require('../../transformers/mails/premoderation_rejected');

const getPremoderationLog = async function (result) {
    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result[i].data.length; j++) {
            const wheres2 = {};
            wheres2.premoderation_id = result[i].data[j].id;
            wheres2.current_status = 'rejected';
            const sort2 = { created_at: -1 };
            [
                result[i].data[j].log
            ] = await PremoderationLogRepository.findAll(wheres2, 0, 1, sort2);
        }
    }

    return result;
};


exports.postEmailPremoderationRejected = async function (data, context) {
    const days = new Date();
    const getDays = Helper.rangeDate(days.getDay());

    const wheres = {};
    wheres.premoderation_status = 'rejected';
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

    await getPremoderationLog(result);
    await Promise.map(result, row => BizzyService.callAsync('bizzy-communication', 'publishNotification', Transformer.item(row)), {
        concurrency: 10
    });

    return {
        message: 'Email sukses dikirim'
    };
};

module.exports = exports;
