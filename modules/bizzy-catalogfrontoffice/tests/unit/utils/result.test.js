'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const {
    BizzyError
} = require('bizzy-common');
const Result = require('../../../src/utils/result');

test.serial('toJSON returns ok', (t) => {
    const result = new Result('success').toJSON();

    t.is('success', result.message);
    t.deepEqual({}, result.data);
    t.deepEqual({}, result.meta);
});

test.serial('toJSON returns ok type-2', (t) => {
    const result = new Result().toJSON();

    t.is('success', 'success');
});

test.before('Initialize Bizzy Error', function* before(t) {
    BizzyError.initializeErrors();
});

test.beforeEach('Initialize New Sandbox Before Each Test', function* beforeEach(t) {
    t.context.sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
});

test.afterEach.always('Restore Sandbox and Configuration After Each Test', function* afterEach(t) {
    t.context.sandbox.restore();
});
