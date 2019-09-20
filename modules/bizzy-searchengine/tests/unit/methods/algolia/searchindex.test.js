'use strict';

const Promise = require('bizzy-common');
const { BizzyError } = require('bizzy-common');
const test = require('ava');
const sinon = require('sinon');
const CategoryRepository = require('../../../../src/repositories/category');
const Methods = require('../../../../src/methods/algolia/search_index');
const context = require('../../../mocks/context.json');

const datas = {
    query: {
        ids: '1,8,16'
    }
};

const expected = [
    {
        id: 1,
        total_sku: 0
    }
];

sinon.sandbox.create().stub(process, 'env').value({
    ALGOLIA_APP_ID: 'IU85FU0XXT',
    ALGOLIA_API_KEY: '0879688dadcea91b3448f52fa1c9d888',
    ALGOLIA_INDICES: 'dev_catalog'
});


test.serial('Should be return success', function* (t) {
    t.context.sandbox.stub(CategoryRepository, 'findAll').resolves([
        {
            id: 1,
            name: 'Gardening and Tools',
            level: 'C0',
            base_margin: null,
            commission: null,
            unspsc: 10000000,
            sequence: 1,
            parent_id: null,
            breadcrumb: null,
            is_active: 1,
            created_by: null,
            is_deleted: 0,
            created_at: '2017-12-18T06:32:18.000Z',
            updated_at: '2017-12-18T06:32:18.000Z'
        }
    ]);

    try {
        yield Methods.getSkuByCategoriesId(datas, context);
        t.pass();
    } catch (err) {
        t.fail(err.stack);
    }
});

test.serial('Should be return Bad Request', function* (t) {
    try {
        const data = {
            query: {
                ids: ''
            }
        };
        yield Methods.getSkuByCategoriesId(data, context);
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
