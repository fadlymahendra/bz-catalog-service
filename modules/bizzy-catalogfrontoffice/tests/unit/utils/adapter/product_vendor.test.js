const Promise = require('bluebird');
const test = require('ava');
const { DBContext, BizzyError } = require('bizzy-common');
const sinon = require('sinon');
const Utils = require('../../../../src/utils/adapter/product_vendor');
const _ = require('lodash');

const ProductVariantRepo = require('../../../../src/repositories/product_variant');
const ProductVendorRepo = require('../../../../src/repositories/product_vendor');

test.serial('findProductVendorWithDetail: test type-1', function* (t) {
    t.context.sandbox.stub(ProductVariantRepo, 'findAll').resolves({});

    try {
        const condition = {
            vendor_id: '1'
        };
        const offset = 1;
        const limit = 1;

        const result = yield Utils.findProductVendorWithDetail(condition, offset, limit);
        const expected = {};

        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
        t.fail(err.message);
    }
});

test.serial('findProductVendorWithDetail: test type-2', function* (t) {
    t.context.sandbox.stub(ProductVariantRepo, 'findAll').resolves({});

    try {
        const condition = {
        };
        const offset = 1;
        const limit = 1;

        const result = yield Utils.findProductVendorWithDetail(condition, offset, limit);
        const expected = {};

        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
        t.fail(err.message);
    }
});

test.serial('findAllProductVendorWithDetail: test type-1', function* (t) {
    t.context.sandbox.stub(ProductVariantRepo, 'findAll').resolves({});

    try {
        const condition = {
            vendor_id: '1'
        };
        const offset = 1;
        const limit = 1;

        const result = yield Utils.findAllProductVendorWithDetail(condition, offset, limit);
        const expected = {};

        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
        t.fail(err.message);
    }
});

test.serial('findAllProductVendorWithDetail: test type-2', function* (t) {
    t.context.sandbox.stub(ProductVariantRepo, 'findAll').resolves({});

    try {
        const condition = {
           
        };
        const offset = 1;
        const limit = 1;

        const result = yield Utils.findAllProductVendorWithDetail(condition, offset, limit);
        const expected = {};

        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
        t.fail(err.message);
    }
});

test.serial('findOneProductVendorWithDetail: test type-1', function* (t) {
    t.context.sandbox.stub(ProductVendorRepo, 'findOneDetail').resolves({});

    try {
        const condition = {
            vendor_id: '1',
            sku: true
        };

        const result = yield Utils.findOneProductVendorWithDetail(condition);
        const expected = {};

        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
        t.fail(err.message);
    }
});

test.serial('findOneProductVendorWithDetail: test type-2', function* (t) {
    t.context.sandbox.stub(ProductVendorRepo, 'findOneDetail').resolves({});

    try {
        const condition = {
            sku: false
        };

        const result = yield Utils.findOneProductVendorWithDetail(condition);
        const expected = {};

        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
        t.fail(err.message);
    }
});


test.before('Initialize BizzyError Before All Tests', (t) => {
    BizzyError.initializeErrors();
});

test.beforeEach('Initialize New Sandbox Before Each Test', function* (t) {
    t.context.sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({ ORMProvider: { Op: {} } });
});

test.afterEach.always('Restore Sandbox and Configuration After Each Test', function* (t) {
    t.context.sandbox.restore();
});

