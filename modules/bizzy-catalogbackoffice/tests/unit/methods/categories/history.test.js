'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');

const CategoryRepository = require('../../../../src/repositories/category');
const CategoryLogRepository = require('../../../../src/repositories/category_log');
const Methods = require('../../../../src/methods/categories/history');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
const context = require('../../../mocks/context.json');

const validPayload = {
    path: {
        id: 1
    },
    query: {
        page: 1,
        limit: 20
    }
};

const resFindOne = {
    id: 1,
    name: 'Electronic'
};

const resFindAndCount = [
    {
        title: 'Ubah Status Kategori',
        category: {
            id: 1,
            name: 'Electronic',
            unspsc: '100100200',
            level: 'C0'
        },
        user: {
            username: 'admin@bizzy.co.id',
            first_name: 'Admin',
            last_name: 'Bizzy',
            employee: {
                id: 1
            }
        }
    },
    {
        title: 'Ubah Status Kategori',
        category: {
            id: 1,
            name: 'Electronic',
            unspsc: '100100200',
            level: 'C0'
        },
        user: {
            username: 'admin@bizzy.co.id',
            first_name: 'Admin',
            last_name: 'Bizzy',
            employee: {
                id: 1
            }
        }
    }
];

test.serial('Should be return Category History', function* (t) {
    t.context.sandbox.stub(CategoryRepository, 'findOne').resolves(resFindOne);
    t.context.sandbox.mock(CategoryLogRepository).expects('findAllRecord').resolves(resFindAndCount);
    t.context.sandbox.stub(CategoryLogRepository, 'findAllWithOutPagination').resolves(resFindAndCount);

    try {
        yield Methods.getCategoryHistoryById(validPayload, context);
        t.pass();
    } catch (err) {
        t.fail(err);
    }
});

test.serial('Should be return Category List with search empty', function* (t) {
    t.context.sandbox.stub(CategoryRepository, 'findOne').resolves(null);

    try {
        const data = {
            path: {
                id: 1
            },
            query: {
                page: 1,
                limit: 20
            }
        };
        yield Methods.getCategoryHistoryById(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'The Error Type is Incorrect');
    }
});

test.serial('Should be return Bad Request', function* (t) {
    try {
        const data = {
            path: {
                id: []
            },
            query: {
                page: 1,
                limit: 20
            }
        };

        yield Methods.getCategoryHistoryById(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'The Error Type is Incorrect');
    }
});

test.serial('You are not authorized user: Should be return Forbidden', function* (t) {
    try {
        const invalidContext = {
            user: ''
        };
        const data = {
            path: {
                id: 1
            },
            query: {
                page: 1,
                limit: 20
            }
        };
        yield Methods.getCategoryHistoryById(data, invalidContext);
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
