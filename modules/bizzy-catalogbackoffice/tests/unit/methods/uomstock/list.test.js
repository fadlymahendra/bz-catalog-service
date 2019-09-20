'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { DBContext, BizzyError } = require('bizzy-common');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
const Repo = require('../../../../src/repositories/stocking_uom');
const Method = require('../../../../src/methods/stocking-uoms/list');

test.serial('(List Outstock) - Should be return array object UomStock', Promise.coroutine(function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(Repo, 'findAndCountAll').resolves({
        rows: [
            {
                id: 1, name: 'Dozen', created_at: '2017-12-07T12:00:00.000Z', updated_at: '2017-12-07T09:10:24.000Z'
            }
        ],
        count: 1
    });

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                search: '',
                page: 1,
                limit: 1
            }
        };
        const model = Method;
        const result = yield model.getUomStock(data, context);
        const expected = {
            data: [
                {
                    id: 1,
                    name: 'Dozen',
                    created_at: '2017-12-07T12:00:00.000Z',
                    updated_at: '2017-12-07T09:10:24.000Z'
                }
            ],
            meta: {
                page: 1,
                limit: 1,
                total_data: 1,
                total_page: 1
            }
        };

        t.deepEqual(result, expected);
    } catch (exc) {
        console.log(exc);
    }
}));

test.serial('(List UomStock) - Try to Send invalid params', function* testCase(t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                search: '',
                page: 'page',
                limit: 1
            }
        };

        const result = yield Method.getUomStock(data, context);
        t.fail(' Doesn\'t Throw an Error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'The Error Type is Incorrect');
    }
});

test.serial('(List UomStock) - Try to Search invalid params', function* testCase(t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(Repo, 'findAndCountAll').resolves({
        rows: [
            {
                id: 1, name: 'Dozen', created_at: '2017-12-07T12:00:00.000Z', updated_at: '2017-12-07T09:10:24.000Z'
            }
        ],
        count: 1
    });

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                search: 'nope',
                page: 1,
                limit: 1
            }
        };

        const result = yield Method.getUomStock(data, context);
        const expected = {
            data: [
                {
                    id: 1,
                    name: 'Dozen',
                    created_at: '2017-12-07T12:00:00.000Z',
                    updated_at: '2017-12-07T09:10:24.000Z'
                }
            ],
            meta: {
                page: 1,
                limit: 1,
                total_data: 1,
                total_page: 1
            }
        };

        t.deepEqual(result, expected);
    } catch (err) {

    }
});

test.serial('You are not authorized user: Should be return Forbidden', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    try {
        const context = {
            user: ''
        };
        const data = {
            query: {
                search: 'nope',
                page: 1,
                limit: 1
            }
        };
        yield Method.getUomStock(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, 'You are not authorized user');
    }
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
