'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError, BizzyService } = require('bizzy-common');
const Methods = require('../../../../src/methods/products/delete_group');
const ProductSkuGroupRepository = require('../../../../src/repositories/product_sku_group');

test.serial('Should be return delete success', function* (t) {
    t.context.sandbox.stub(ProductSkuGroupRepository, 'findOne').resolves({});
    t.context.sandbox.stub(ProductSkuGroupRepository, 'deleteGroup').resolves({});
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            body: {
                payload: [
                    {
                        group: 10,
                        items: [
                            'NG8TQOJ1F'
                        ]
                    }
                ]
            }
        };
        const result = yield Methods.delProductSkuGroup(data, context);
        const expected = {
            message: 'SUCCESS_DELETE_GROUP_SKU'
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return add success not found', function* (t) {
    t.context.sandbox.stub(ProductSkuGroupRepository, 'findOne').resolves(null);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            body: {
                payload: [
                    {
                        group: 10001,
                        items: [
                            'NG8TQOJ1F'
                        ]
                    }
                ]
            }
        };
        yield Methods.delProductSkuGroup(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'One or more SKU Not Found or SKU inactive.');
    }
});

test.serial('Should be return authorized user', function* (t) {
    try {
        const context = {
            user: ''
        };
        const data = {
            body: {
                payload: [
                    {
                        group: 10,
                        items: [
                            'NG8TQOJ1F', 'TA0EAP8JZ', 'L0ZY0TI59'
                        ]
                    }
                ]
            }
        };

        yield Methods.delProductSkuGroup(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, 'You are not authorized user');
    }
});

test.serial('Should be return bad request', function* (t) {
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            body: {
                payload: [
                    {
                        group: '',
                        items: [
                            'NG8TQOJ1F', 'TA0EAP8JZ', 'L0ZY0TI59'
                        ]
                    }
                ]
            }
        };
        yield Methods.delProductSkuGroup(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Should be return bad request empty items', function* (t) {
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            body: {
                payload: [
                    {
                        group: '10',
                        items: []
                    }
                ]
            }
        };
        yield Methods.delProductSkuGroup(data, context);
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
