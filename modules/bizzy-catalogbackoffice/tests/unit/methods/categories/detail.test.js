'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');

const CategoryRepository = require('../../../../src/repositories/category');
const Methods = require('../../../../src/methods/categories/detail');

test.serial('Should be return detail category', function* (t) {
    t.context.sandbox.stub(CategoryRepository, 'findAll').resolves([
        {
            id: 2,
            name: 'Komputer',
            level: 'C1',
            base_margin: null,
            commission: null,
            unspsc: 1100001,
            sequence: 1,
            parent_id: 1,
            breadcrumb: 'Elektronik > Komputer',
            created_by: 1,
            is_active: 1,
            created_at: '2017-12-07T14:36:43.000Z',
            updated_at: '2017-12-07T14:36:43.000Z'
        }
    ]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1'
            }
        };

        const result = yield Methods.getCategoryById(data, context);
        const expected = {
            data: [
                {
                    id: 2,
                    name: 'Komputer',
                    level: 'C1',
                    base_margin: null,
                    commission: null,
                    unspsc: 1100001,
                    sequence: 1,
                    parent_id: 1,
                    is_active: 1,
                    created_at: '2017-12-07T14:36:43.000Z',
                    updated_at: '2017-12-07T14:36:43.000Z'
                }
            ]
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return Bad Request', function* (t) {
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: ''
            }
        };

        yield Methods.getCategoryById(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'The Error Type is Incorrect');
    }
});

test.serial('You are not authorized user: Should be return Forbidden', function* (t) {
    try {
        const context = {
            user: ''
        };
        const data = {
            path: {
                id: ''
            }
        };
        yield Methods.getCategoryById(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, 'You are not authorized user');
    }
});

test.before('Initialize BizzyError Before All Tests', (t) => {
    BizzyError.initializeErrors();
});

test.beforeEach('Initialize New Sandbox Before Each Test', function* (t) {
    t.context.sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
});

test.afterEach.always('Restore Sandbox and Configuration After Each Test', function* (t) {
    t.context.sandbox.restore();
});
