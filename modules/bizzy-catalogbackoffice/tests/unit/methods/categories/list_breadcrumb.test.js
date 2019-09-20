const test = require('ava');
const Promise = require('bluebird');
const { DBContext, BizzyError } = require('bizzy-common');
const sinon = require('sinon');

const CategoryRepo = require('../../../../src/repositories/category');
const Method = require('../../../../src/methods/categories/list');

const validPayload = {
    query: {
        search: 'Manifactur'
    }
};

const invalidPayload = {
    query: {
        searchs: 'Manifactur'
    }
};

const validContext = require('../../../mocks/context.json');
const invalidContext = {};

test.serial('Successfull list category by breadcrumb', Promise.coroutine(function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.mock(CategoryRepo).expects('findAll').resolves([{
        id: 1,
        parent_id: null
    }]).atLeast(2);

    yield Method.getCategoryByBreadcrumb(validPayload, validContext)
        .then((res) => {
            t.pass();
        })
        .catch((err) => {
            t.fail(err);
        })
}));

test.serial('Failed list category by breadcrumb, invalid Context', Promise.coroutine(function* (t) {
    t.context.sandbox.mock(CategoryRepo).expects('findAll').resolves(true);

    yield Method.getCategoryByBreadcrumb(validPayload, invalidContext)
        .then((res) => {
            t.fail(res);
        })
        .catch((err) => {
            t.pass(err);
        })
}));

test.serial('Failed list category by breadcrumb, invalid Payload', Promise.coroutine(function* (t) {
    t.context.sandbox.mock(CategoryRepo).expects('findAll').resolves(true);

    yield Method.getCategoryByBreadcrumb(invalidPayload, validContext)
        .then((res) => {
            t.fail(res);
        })
        .catch((err) => {
            t.pass(err);
        })
}));

test.before('Initialize error handler', (t) => {
    BizzyError.initializeErrors();
});

test.beforeEach('Initialize New Sandbox Before Each Test', (t) => {
    t.context.sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
});

test.afterEach.always('Restore Sandbox and Configuration After Each Test', (t) => {
    t.context.sandbox.restore();
});