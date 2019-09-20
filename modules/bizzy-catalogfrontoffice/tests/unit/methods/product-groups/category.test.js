'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError, DBContext } = require('bizzy-common');
const CategoryRepository = require('../../../../src/repositories/category');
const ProductGroupRespository = require('../../../../src/repositories/product_group');
const Methods = require('../../../../src/methods/product-groups/category');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

test.serial('Should be return list of category', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(CategoryRepository, 'findAll').resolves([
        {
            id: 1,
            name: 'Electronics',
            level: 'C0',
            base_margin: '5.00',
            commission: '3.00',
            unspsc: 1100000,
            sequence: 0,
            parent_id: 0,
            is_active: 1,
            created_at: '2017-11-28T00:00:00.000Z',
            updated_at: '2017-12-07T09:26:05.000Z'
        }
    ]);
    t.context.sandbox.stub(ProductGroupRespository, 'aggregateByCategory0').resolves([
        {
            id: 1,
            category_name: 'Electronics',
            total: 1
        }
    ]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                search: ''
            }
        };
        const result = yield Methods.getProductGroupCategory(data, context);
        const expected = {
            data: [
                {
                    id: 1,
                    name: 'Electronics',
                    total: 1
                }
            ]
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return No category', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(CategoryRepository, 'findAll').resolves(null);
    t.context.sandbox.stub(ProductGroupRespository, 'aggregateByCategory0').resolves(null);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                search: ''
            }
        };
        const result = yield Methods.getProductGroupCategory(data, context);
        const expected = {
            data: []
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return list of category total 0', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(CategoryRepository, 'findAll').resolves([
        {
            id: 1,
            name: 'Electronics',
            level: 'C0',
            base_margin: '5.00',
            commission: '3.00',
            unspsc: 1100000,
            sequence: 0,
            parent_id: 0,
            is_active: 1,
            created_at: '2017-11-28T00:00:00.000Z',
            updated_at: '2017-12-07T09:26:05.000Z'
        }
    ]);
    t.context.sandbox.stub(ProductGroupRespository, 'aggregateByCategory0').resolves([]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                search: ''
            }
        };
        const result = yield Methods.getProductGroupCategory(data, context);
        const expected = {
            data: [
                {
                    id: 1,
                    name: 'Electronics',
                    total: 0
                }
            ]
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return authorized user', function* (t) {
    try {
        const context = {
            user: ''
        };
        const data = {
            path: {
                id: ''
            }
        };

        yield Methods.getProductGroupCategory(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, 'You are not authorized user');
    }
});

test.serial('Invalid input: Should be return BizzyError.BadRequest', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                search: null
            }
        };
        yield Methods.getProductGroupCategory(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
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
