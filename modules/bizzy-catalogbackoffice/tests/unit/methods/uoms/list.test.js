'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');

const tangga = '../../../..';
const UomRespository = require(`${tangga}/src/repositories/uom`);
const Methods = require(`${tangga}/src/methods/uoms/list`);
const { DBContext, BizzyError } = require('bizzy-common');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

test.serial('Should be return list UOM With param search', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(UomRespository, 'findAndCountAll').resolves({
        rows: [
            {
                id: 1, name: 'Unit', created_at: '2017-12-05 16:59:10', updated_at: null
            },
            {
                id: 2, name: 'Dozen', created_at: '2017-12-05 16:59:10', updated_at: null
            }
        ],
        count: 2
    });

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                search: 'u',
                page: 1,
                limit: 2
            }
        };
        const result = yield Methods.getUom(data, context);

        const expected = {
            data:
            [{
                id: 1,
                name: 'Unit',
                created_at: '2017-12-05 16:59:10',
                updated_at: null
            },
            {
                id: 2,
                name: 'Dozen',
                created_at: '2017-12-05 16:59:10',
                updated_at: null
            }],
            meta: {
                page: 1, limit: 2, total_data: 2, total_page: 1
            }
        };
        t.deepEqual(result, expected);
    } catch (exc) {
        console.log(exc);
    }
});

test.serial('Should be return list UOM With search empty', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(UomRespository, 'findAndCountAll').resolves({
        rows: [
            {
                id: 1, name: 'Unit', created_at: '2017-12-05 16:59:10', updated_at: null
            },
            {
                id: 2, name: 'Dozen', created_at: '2017-12-05 16:59:10', updated_at: null
            }
        ],
        count: 2
    });

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                search: '',
                page: 1,
                limit: 2
            }
        };
        const result = yield Methods.getUom(data, context);

        const expected = {
            data:
            [{
                id: 1,
                name: 'Unit',
                created_at: '2017-12-05 16:59:10',
                updated_at: null
            },
            {
                id: 2,
                name: 'Dozen',
                created_at: '2017-12-05 16:59:10',
                updated_at: null
            }],
            meta: {
                page: 1, limit: 2, total_data: 2, total_page: 1
            }
        };
        t.deepEqual(result, expected);
    } catch (exc) {
        console.log(exc);
    }
});

test.serial('Invalid Input Data Should throw BizzyError.BadRequest', function* testCase(t) {
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
                page: -1,
                limit: -2
            }
        };
        const result = yield Methods.getUom(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('You are not authorized user: Should be return Forbidden', function* (t) {
    try {
        const context = {
            user: ''
        };
        const data = {
            query: {
                search: '',
                page: -1,
                limit: -2
            }
        };
        yield Methods.getUom(data, context);
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
