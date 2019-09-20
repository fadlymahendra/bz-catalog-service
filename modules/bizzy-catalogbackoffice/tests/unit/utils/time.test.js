'use stict';

const Promise = require('bluebird');
const test = require('ava');
const timeService = require('../../../src/utils/time');
const { BizzyError } = require('bizzy-common');
const sinon = require('sinon');
const moment = require('moment');

test('Should be return rangeDate', function* (t) {
    const valTime = timeService.convertDateForMail('2018-01-18 07:26:51');
    t.true(valTime.date === '18 Januari 2018', 'wrong convertDateForMail');
    moment.now = () => +new Date('1995-12-20 00:00:00');
    const day1 = timeService.rangeDate(1);
    t.true(day1.start_date === '1995-12-15 00:00:00', 'wrong generate date 1');
    const day4 = timeService.rangeDate(4);
    t.true(day4.start_date === '1995-12-16 00:00:00', 'wrong generate date 4');
    t.true(timeService.rangeDate(40) === false, 'wrong generate date != 1 or != 4 ');
    t.true(timeService.rangeDateOnce(40) === false, 'wrong generate date once != 1');
    const dayOnce = timeService.rangeDateOnce(1);
    t.true(dayOnce.start_date === '1995-12-12 09:00:00', 'wrong generate date once 1');
});

test.before('Initialize BizzyError Before All Tests', (t) => {
    BizzyError.initializeErrors();
});

test.beforeEach('Initialize New Sandbox Before Each Test', (t) => {
    t.context.sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
});

test.afterEach.always('Restore Sandbox and Configuration After Each Test', (t) => {
    t.context.sandbox.restore();
});
