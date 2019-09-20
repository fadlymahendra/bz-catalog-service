'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');
const IndentPeriodRepository = require('../../../src/repositories/misc');
const Methods = require('../../../src/methods/indent_period');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

test.serial('Should be return Uom List', function*(t) {
    t.context.sandbox.stub(IndentPeriodRepository, 'findByKey').resolves({
        value: '{ "value": "week", "label": "Minggu" }'
    });

    try {
        let context = require('../../mocks/context.json');
        const data = {
            "query": {
            }
        }
        const result = yield Methods.getIndentPeriod(data, context);
        const expected = {
            data: { "value": "week", "label": "Minggu" }
        }
        t.deepEqual(result, expected);
    } catch(err) {
        console.log(err.message);
    }
});

test.serial('Should be return authorized user', function*(t) {
    try {
        let context = {
            user: ""
        };
        const data = {
            query: {}
        }

        yield Methods.getIndentPeriod(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch(err) {
        t.true(err instanceof BizzyError.Forbidden, 'You are not authorized user');
    }
});

test.before('Initialize BizzyError Before All Tests', (t) => {
    BizzyError.initializeErrors();
});

test.beforeEach('Initialize New Sandbox Before Each Test', function*(t) {
    t.context.sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
});

test.afterEach.always('Restore Sandbox and Configuration After Each Test',function*(t) {
    t.context.sandbox.restore();
});