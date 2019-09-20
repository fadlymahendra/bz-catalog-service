'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');

const CategoryRepository = require('../../../../src/repositories/category');
const Methods = require('../../../../src/methods/categories/detail_single');

test.serial('Should be return detail category', function* (t) {
    t.context.sandbox.stub(CategoryRepository, 'findOne').resolves({
        id: 2,
        name: 'Komputer',
        level: 'C0',
        base_margin: null,
        commission: null,
        unspsc: 1100001,
        sequence: 1,
        breadcrumb: 'Komputer',
        parent_id: null,
        is_active: 1,
        created_by: 1,
        created_at: '2017-12-07T14:36:43.000Z',
        updated_at: '2017-12-07T14:36:43.000Z'
    });

    t.context.sandbox.stub(CategoryRepository, 'findById').resolves({
        parent_id: null
    });

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1'
            }
        };

        const result = yield Methods.getCategoryByIdSingle(data, context);
        const expected = {
            data: {
                id: 2,
                name: 'Komputer',
                level: 'C0',
                base_margin: null,
                commission: null,
                unspsc: 1100001,
                sequence: 1,
                breadcrumb: 'Komputer',
                parent: null,
                hirarchy: [],
                is_active: 1,
                created_by: 1,
                created_at: '2017-12-07T14:36:43.000Z',
                updated_at: '2017-12-07T14:36:43.000Z'
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return detail category, with hirarchy', function* (t) {
    t.context.sandbox.stub(CategoryRepository, 'findOne').resolves({
        id: 2,
        name: 'Komputer',
        level: 'C1',
        base_margin: null,
        commission: null,
        unspsc: 1100001,
        sequence: 1,
        breadcrumb: 'Komputer',
        parent_id: 1,
        is_active: 1,
        created_by: 1,
        created_at: '2017-12-07T14:36:43.000Z',
        updated_at: '2017-12-07T14:36:43.000Z',
        childs: [
            {
                id: 10,
                name: 'Naming'
            }
        ]
    });

    t.context.sandbox.stub(CategoryRepository, 'findById')
        .onCall(0).resolves({
            id: 10,
            level: 'C1',
            name: 'Naming',
            parent_id: 1
        })
        .onCall(1)
        .resolves({
            id: 10,
            level: 'C0',
            name: 'Naming',
            parent_id: null,
            unspsc: 11000000
        });

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1'
            }
        };

        const result = yield Methods.getCategoryByIdSingle(data, context);
        const expected = {
            data: {
                id: 2,
                name: 'Komputer',
                level: 'C1',
                base_margin: null,
                commission: null,
                unspsc: 1100001,
                sequence: 1,
                breadcrumb: 'Komputer',
                parent: {
                    id: 10,
                    name: 'Naming'
                },
                hirarchy: [{
                    id: 10,
                    name: 'Naming',
                    level: 'C0',
                    unspsc: 11000000
                }],
                is_active: 1,
                created_by: 1,
                created_at: '2017-12-07T14:36:43.000Z',
                updated_at: '2017-12-07T14:36:43.000Z'
            }
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

        yield Methods.getCategoryByIdSingle(data, context);
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
        yield Methods.getCategoryByIdSingle(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, 'You are not authorized user');
    }
});

test.serial('Should be return Not Found', function* (t) {
    t.context.sandbox.stub(CategoryRepository, 'findOne').resolves(null);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '540'
            }
        };
        yield Methods.getCategoryByIdSingle(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'You are not authorized user');
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
