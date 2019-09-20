'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');

const RepoRaw = require('../../../../src/repositories/raw_query');
const Method = require('../../../../src/methods/sku-managements/list');

test.serial('Should be return list of Sku', function* (t) {
    t.context.sandbox.stub(RepoRaw, 'getSKUProducts').resolves([
        {
            product_group_id: 1,
            product_variant_id: 15,
            sku: 'LS5DIEZZWV',
            long_name: 'Apple iPhone 7 Black 64GB',
            is_active: 1,
            is_discontinue: 0,
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            C3: 561,
            C2: 219,
            C1: 52,
            C0: 8
        },
        {
            product_group_id: 2,
            product_variant_id: 16,
            sku: 'LS5DIEZZWV',
            long_name: 'Apple iPhone 7 Black 64GB',
            is_active: 1,
            is_discontinue: 0,
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            C3: 561,
            C2: 219,
            C1: 52,
            C0: 8
        }
    ]);

    t.context.sandbox.stub(RepoRaw, 'getTotalProductVariant').resolves([
        { is_active: 1, total: 2 }
    ]);

    t.context.sandbox.stub(RepoRaw, 'getTotalVendor').resolves([
        { product_variant_id: 15, total_vendor: 99 }
    ]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                search: 'iphone',
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 4,
                page: 1,
                limit: 20
            }
        };

        const result = yield Method.getSkuManagement(data, context);
        const expected = {
            data: [
                {
                    id: 15,
                    product_group_id: 1,
                    sku: 'LS5DIEZZWV',
                    long_name: 'Apple iPhone 7 Black 64GB',
                    is_active: 1,
                    is_discontinue: 0,
                    total_vendor: 99,
                    total_image: 3
                },
                {
                    id: 16,
                    product_group_id: 2,
                    sku: 'LS5DIEZZWV',
                    long_name: 'Apple iPhone 7 Black 64GB',
                    is_active: 1,
                    is_discontinue: 0,
                    total_vendor: 0,
                    total_image: 3
                }
            ],
            meta: {
                page: 1,
                limit: 20,
                total_data: 2,
                total_active_data: 2,
                total_inactive_data: 0,
                total_page: 1
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err);
    }
});

test.serial('Should be return list of Sku', function* (t) {
    t.context.sandbox.stub(RepoRaw, 'getSKUProducts').resolves([
        {
            product_group_id: 2,
            product_variant_id: 15,
            sku: 'LS5DIEZZWV',
            long_name: 'Apple iPhone 7 Black 64GB',
            is_active: 0,
            is_discontinue: 0,
            primary_image: '',
            additional_image: null,
            C3: 561,
            C2: 219,
            C1: 52,
            C0: 8
        }
    ]);

    t.context.sandbox.stub(RepoRaw, 'getTotalProductVariant').resolves([
        { is_active: 0, total: 1 }
    ]);

    t.context.sandbox.stub(RepoRaw, 'getTotalVendor').resolves([
        { product_variant_id: 1, total_vendor: 0 }
    ]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                search: 'iphone',
                is_active: 1,
                page: 1,
                limit: 20
            }
        };

        const result = yield Method.getSkuManagement(data, context);

        const expected = {
            data: [
                {
                    id: 15,
                    product_group_id: 2,
                    sku: 'LS5DIEZZWV',
                    long_name: 'Apple iPhone 7 Black 64GB',
                    is_active: 0,
                    is_discontinue: 0,
                    total_vendor: 0,
                    total_image: 0
                }
            ],
            meta: {
                page: 1,
                limit: 20,
                total_data: 1,
                total_active_data: 0,
                total_inactive_data: 1,
                total_page: 1
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err);
    }
});

test.serial('Should be return list of Sku', function* (t) {
    t.context.sandbox.stub(RepoRaw, 'getSKUProducts').resolves([
        {
            product_group_id: 2,
            product_variant_id: 15,
            sku: 'LS5DIEZZWV',
            long_name: 'Apple iPhone 7 Black 64GB',
            is_active: 1,
            is_discontinue: 0,
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            C3: 561,
            C2: 219,
            C1: 52,
            C0: 8
        }
    ]);

    t.context.sandbox.stub(RepoRaw, 'getTotalProductVariant').resolves([
        { is_active: 1, total: 1 },
        { is_active: 0, total: 0 }
    ]);

    t.context.sandbox.stub(RepoRaw, 'getTotalVendor').resolves([
        { product_variant_id: 1, total_vendor: 0 }
    ]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                c0: 1,
                page: 1,
                limit: 20
            }
        };

        const result = yield Method.getSkuManagement(data, context);
        const expected = {
            data: [
                {
                    id: 15,
                    product_group_id: 2,
                    sku: 'LS5DIEZZWV',
                    long_name: 'Apple iPhone 7 Black 64GB',
                    is_active: 1,
                    is_discontinue: 0,
                    total_vendor: 0,
                    total_image: 3
                }
            ],
            meta: {
                page: 1,
                limit: 20,
                total_data: 1,
                total_active_data: 1,
                total_inactive_data: 0,
                total_page: 1
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err);
    }
});

test.serial('Should be return list of Sku', function* (t) {
    t.context.sandbox.stub(RepoRaw, 'getSKUProducts').resolves([
        {
            product_group_id: 2,
            product_variant_id: 15,
            sku: 'LS5DIEZZWV',
            long_name: 'Apple iPhone 7 Black 64GB',
            is_active: 1,
            is_discontinue: 0,
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            C3: 561,
            C2: 219,
            C1: 52,
            C0: 8
        }
    ]);

    t.context.sandbox.stub(RepoRaw, 'getTotalProductVariant').resolves([
        { is_active: 1, total: 1 },
        { is_active: 0, total: 0 }
    ]);

    t.context.sandbox.stub(RepoRaw, 'getTotalVendor').resolves([
        { product_variant_id: 1, total_vendor: 0 }
    ]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                c1: 1,
                page: 1,
                limit: 20
            }
        };

        const result = yield Method.getSkuManagement(data, context);
        const expected = {
            data: [
                {
                    id: 15,
                    product_group_id: 2,
                    sku: 'LS5DIEZZWV',
                    long_name: 'Apple iPhone 7 Black 64GB',
                    is_active: 1,
                    is_discontinue: 0,
                    total_vendor: 0,
                    total_image: 3
                }
            ],
            meta: {
                page: 1,
                limit: 20,
                total_data: 1,
                total_active_data: 1,
                total_inactive_data: 0,
                total_page: 1
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err);
    }
});

test.serial('Should be return list of Sku with nothing sku product', function* (t) {
    t.context.sandbox.stub(RepoRaw, 'getSKUProducts').resolves([]);

    t.context.sandbox.stub(RepoRaw, 'getTotalProductVariant').resolves([
        { is_active: 0, total: 0 },
        { is_active: 0, total: 0 }
    ]);

    t.context.sandbox.stub(RepoRaw, 'getTotalVendor').resolves([]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                c1: 1,
                page: 1,
                limit: 20
            }
        };

        const result = yield Method.getSkuManagement(data, context);
        const expected = {
            data: [],
            meta: {
                page: 1,
                limit: 20,
                total_data: 0,
                total_active_data: 0,
                total_inactive_data: 0,
                total_page: 0
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err);
    }
});

test.serial('Invalid Input Data Should throw BizzyError.BadRequest', function* testCase(t) {
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                search: '',
                page: -1,
                limit: -2
            }
        };
        yield Method.getSkuManagement(data, context);
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
