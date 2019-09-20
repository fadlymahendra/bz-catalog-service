'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');
const Methods = require('../../../../src/methods/summary/product_count');
const ProductVendorRespository = require('../../../../src/repositories/product_vendor');
const PremoderationRepository = require('../../../../src/repositories/premoderation');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

test.serial('Should be return success', function* (t) {
    t.context.sandbox.stub(ProductVendorRespository, 'getCountProductVendor').resolves(6);
    t.context.sandbox.stub(PremoderationRepository, 'countAllPremoderationStatus').resolves([
        {
            _id: 'need_revision',
            status: [
                'need_revision',
                'need_revision',
                'need_revision'
            ],
            count: 3
        },
        {
            _id: 'revision_complete',
            status: [
                'revision_complete',
                'revision_complete'
            ],
            count: 2
        },
        {
            _id: 'revision_inprogress',
            status: [
                'revision_inprogress'
            ],
            count: 1
        },
        {
            _id: 'rejected',
            status: [
                'rejected'
            ],
            count: 1
        }
    ]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3'
            }
        };

        const result = yield Methods.getSummaryProductCount(data, context);
        const expected = {
            data: {
                products: 6,
                premoderation_inprogress: 6,
                premoderation_rejected: 1
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return success Premoderation in progress 0', function* (t) {
    t.context.sandbox.stub(ProductVendorRespository, 'getCountProductVendor').resolves(6);
    t.context.sandbox.stub(PremoderationRepository, 'countAllPremoderationStatus').resolves([
        {
            _id: 'need_revision',
            status: [],
            count: 0
        },
        {
            _id: 'revision_complete',
            status: [],
            count: 0
        },
        {
            _id: 'revision_inprogress',
            status: [],
            count: 0
        },
        {
            _id: 'rejected',
            status: [],
            count: 0
        }
    ]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3'
            }
        };

        const result = yield Methods.getSummaryProductCount(data, context);
        const expected = {
            data: {
                products: 6,
                premoderation_inprogress: 0,
                premoderation_rejected: 0
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return success Premoderation sum Premoderation {}', function* (t) {
    t.context.sandbox.stub(ProductVendorRespository, 'getCountProductVendor').resolves(1);
    t.context.sandbox.stub(PremoderationRepository, 'countAllPremoderationStatus').resolves([]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3'
            }
        };

        const result = yield Methods.getSummaryProductCount(data, context);
        const expected = {
            data: {
                products: 1,
                premoderation_inprogress: 0,
                premoderation_rejected: 0
            }
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
                id: '1234'
            }
        };

        yield Methods.getSummaryProductCount(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, 'You are not authorized user');
    }
});

test.serial('Should be return bad request', function* (t) {
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: 3
            }
        };

        yield Methods.getSummaryProductCount(data, context);
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
