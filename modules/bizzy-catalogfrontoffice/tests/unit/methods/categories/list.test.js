'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError, DBContext } = require('bizzy-common');

const CategoryRepository = require('../../../../src/repositories/category');
const Methods = require('../../../../src/methods/categories/list');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

const validCountCategory = [
    {
        total_data : 2
    }
];  

test.serial('Should be return Category List', function* (t) {
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
            unspsc: 1100000
        }
    ]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                search: 'a'
            }
        };
        const result = yield Methods.getCategory(data, context);
        const expected = {
            data: [
                {
                    id: 1,
                    name: 'Electronics',
                    url_key: 'electronics_c0.1',
                    level: 'C0',
                    unspsc: 1100000
                }
            ]
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return Category List without search', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(CategoryRepository, 'findAll').resolves([
        {
            id: 1,
            name: 'Electronics',
            url_key: 'electronics_c0.1',
            level: 'C0',
            unspsc: 1100000
        }
    ]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
            }
        };
        const result = yield Methods.getCategory(data, context);
        const expected = {
            data: [
                {
                    id: 1,
                    name: 'Electronics',
                    url_key: 'electronics_c0.1',
                    level: 'C0',
                    unspsc: 1100000
                }
            ]
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

const resgetHierarchicalCategory = [
    {
        nameC0: 'Furniture and Furnishings',
        id: 694,
        nameC1: 'Commercial and industrial furniture',
        nameC2: 'Seating',
        nameC3: 'Task seating',
        unspsc: 56112102
    },
    {
        nameC0: 'Furniture and Furnishings',
        id: 482,
        nameC1: 'Commercial and industrial furniture',
        nameC2: 'Seating',
        nameC3: 'Guest seating',
        unspsc: 56112103
    }
];

test.serial('Should be return List All C3 with parent', function* (t) {
    t.context.sandbox.stub(CategoryRepository, 'getHierarchicalCategory').resolves(resgetHierarchicalCategory);
    t.context.sandbox.stub(CategoryRepository, 'getCountAllHierarchicalCategory').resolves(validCountCategory);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                search: ''
            }
        };
        const result = yield Methods.getHierarchicalCategory(data, context);
        const expected = {
            data: [
                {
                    nameC0: 'Furniture and Furnishings',
                    id: 694,
                    nameC1: 'Commercial and industrial furniture',
                    nameC2: 'Seating',
                    nameC3: 'Task seating',
                    unspsc: 56112102
                },
                {
                    nameC0: 'Furniture and Furnishings',
                    id: 482,
                    nameC1: 'Commercial and industrial furniture',
                    nameC2: 'Seating',
                    nameC3: 'Guest seating',
                    unspsc: 56112103
                }
            ],
            meta: {
                page: 1,
                limit: 20,
                total_data: 2,
                total_page: 1
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return 1 record of C3 with parent', function* (t) {
    t.context.sandbox.stub(CategoryRepository, 'getHierarchicalCategory').resolves([
        {
            nameC0: 'Furniture and Furnishings',
            id: 694,
            nameC1: 'Commercial and industrial furniture',
            nameC2: 'Seating',
            nameC3: 'Task seating',
            unspsc: 56112102
        }
    ]);

    t.context.sandbox.stub(CategoryRepository, 'getCountAllHierarchicalCategory').resolves([
        {
        total_data : 1
        }
    ]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                search: 'Furniture'
            }
        };
        const result = yield Methods.getHierarchicalCategory(data, context);
        const expected = {
            data: [
                {
                    nameC0: 'Furniture and Furnishings',
                    id: 694,
                    nameC1: 'Commercial and industrial furniture',
                    nameC2: 'Seating',
                    nameC3: 'Task seating',
                    unspsc: 56112102
                }
            ],
            meta: {
                page: 1,
                limit: 20,
                total_data: 1,
                total_page: 1
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return Bad Request get hierarchical category', function* (t) {
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                search: 1
            }
        };

        yield Methods.getHierarchicalCategory(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'The Error Type is Incorrect');
    }
});

test.serial('Should be return Bad Request', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                search: []
            }
        };

        yield Methods.getCategory(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'The Error Type is Incorrect');
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

