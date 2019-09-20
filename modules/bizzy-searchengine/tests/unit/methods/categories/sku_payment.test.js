'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const test = require('ava');
const sinon = require('sinon');
const Methods = require('../../../../src/methods/categories/sku_payment');
const CategoryRepository = require('../../../../src/repositories/category');

test.before('Initialize BizzyError Before All Tests', (t) => {
    BizzyError.initializeErrors();
});

test.beforeEach('Initialize New Sandbox Before Each Test', function* (t) {
    t.context.sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
});

test.afterEach.always('Restore Sandbox and Configuration After Each Test', function* (t) {
    t.context.sandbox.restore();
});

test.serial('Shoul be return bad request', function* (t) {
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                sku: []
            }
        };

        yield Methods.getSkuPayment(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Should be return data sku', function* (t) {
    t.context.sandbox.stub(CategoryRepository, 'findSkuPayment').resolves([
        {
            sku: '8Y20N10TL9',
            is_payment: null
        },
        {
            sku: 'WBQH1BWFAN',
            is_payment: null
        }
    ]);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                sku: 'WBQH1BWFAN,8Y20N10TL9'
            }
        };

        const result = yield Methods.getSkuPayment(data, context);
        const expected = {
            data: [
                {
                    sku: '8Y20N10TL9',
                    is_payment: null
                },
                {
                    sku: 'WBQH1BWFAN',
                    is_payment: null
                }
            ]
        };
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail('The validator doesn\'t throw an error');
    }
});


test.serial('Should be return data sku: another data', function* (t) {
    t.context.sandbox.stub(CategoryRepository, 'findSkuPayment').resolves([
        {
            sku: 'WBQH1BWFAN',
            is_payment: null
        }
    ]);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                sku: 'WBQH1BWFAN'
            }
        };

        const result = yield Methods.getSkuPayment(data, context);
        const expected = {
            data: [
                {
                    sku: 'WBQH1BWFAN',
                    is_payment: null
                }
            ]
        };
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail('The validator doesn\'t throw an error');
    }
});
