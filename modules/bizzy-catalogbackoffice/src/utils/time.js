'use strict';

const Moment = require('moment');

exports.rangeDate = function (days) {
    const now = Moment();
    let setStartDate;
    const timeEnd = '23:59:59';
    const timeStart = '00:00:00';
    const setEnddate = Moment(now.valueOf() - (1000 * 60 * 60 * 24)).utc();

    if (days === 1) {
        setStartDate = Moment(now.valueOf() - (1000 * 60 * 60 * 24 * 4)).utc();
    } else if (days === 4) {
        setStartDate = Moment(now.valueOf() - (1000 * 60 * 60 * 24 * 3)).utc();
    } else {
        return false;
    }

    const startDate = `${setStartDate.format('YYYY')}-${setStartDate.format('MM')}-${setStartDate.format('DD')} ${timeStart}`;
    const endDate = `${setEnddate.format('YYYY')}-${setEnddate.format('MM')}-${setEnddate.format('DD')} ${timeEnd}`;
    return {
        start_date: startDate,
        end_date: endDate
    };
};

exports.rangeDateOnce = function (days) {
    const now = Moment();
    const timeEnd = '08:59:59';
    const timeStart = '09:00:00';

    if (days !== 1) {
        return false;
    }
    const setEnddate = Moment(now.valueOf()).utc();
    const setStartDate = Moment(now.valueOf() - (1000 * 60 * 60 * 24 * 7)).utc();

    const startDate = `${setStartDate.format('YYYY')}-${setStartDate.format('MM')}-${setStartDate.format('DD')} ${timeStart}`;
    const endDate = `${setEnddate.format('YYYY')}-${setEnddate.format('MM')}-${setEnddate.format('DD')} ${timeEnd}`;
    return {
        start_date: startDate,
        end_date: endDate
    };
};

exports.convertDateForMail = function (date) {
    const result = {};
    const utcFormat = Moment(date).utc();
    const d = utcFormat.format('DD');
    const m = utcFormat.format('MM');
    const y = utcFormat.format('YYYY');
    const h = utcFormat.format('HH');
    const i = utcFormat.format('mm');

    const month = [];
    month[0] = 'Januari';
    month[1] = 'Februari';
    month[2] = 'Maret';
    month[3] = 'April';
    month[4] = 'Mei';
    month[5] = 'Juni';
    month[6] = 'Juli';
    month[7] = 'Agustus';
    month[8] = 'September';
    month[9] = 'Oktober';
    month[10] = 'November';
    month[11] = 'Desember';

    result.date = `${d} ${month[parseInt(m) - 1]} ${y}`;
    result.time = `${h}:${i}`;

    return result;
};

module.exports = exports;
