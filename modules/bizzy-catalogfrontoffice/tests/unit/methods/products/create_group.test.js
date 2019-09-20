'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError, BizzyService } = require('bizzy-common');
const Methods = require('../../../../src/methods/products/create_group');
const ProductSkuGroupRepository = require('../../../../src/repositories/product_sku_group');
const ProductVariantRepository = require('../../../../src/repositories/product_variant');

test.serial('Should be return success', function* (t) {
    t.context.sandbox.stub(ProductVariantRepository, 'find').resolves([
        {
            id: 28,
            product_group_id: 3,
            sku: 'NG8TQOJ1F',
            long_name: 'Epson Tinta Refill Botol - Hijau',
            variant_value: '{"ink_color":15}',
            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/04/product_1522666509.png',
            additional_image: '[]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 0,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-04-02T10:57:34.000Z',
            updated_at: '2018-04-02T10:57:34.000Z'
        }
    ]);
    t.context.sandbox.stub(ProductSkuGroupRepository, 'findOne').resolves(null);
    t.context.sandbox.stub(ProductSkuGroupRepository, 'insertMany').resolves({});
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
        const result = yield Methods.postProductSkuGroup(data, context);
        const expected = {
            message: 'SUCCESS_INSERT_GROUP_SKU'
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return sku already same group', function* (t) {
    t.context.sandbox.stub(ProductVariantRepository, 'find').resolves([
        {
            id: 28,
            product_group_id: 3,
            sku: 'NG8TQOJ1F',
            long_name: 'Epson Tinta Refill Botol - Hijau',
            variant_value: '{"ink_color":15}',
            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/04/product_1522666509.png',
            additional_image: '[]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 0,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-04-02T10:57:34.000Z',
            updated_at: '2018-04-02T10:57:34.000Z'
        }
    ]);
    t.context.sandbox.stub(ProductSkuGroupRepository, 'findOne').resolves({});
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
        yield Methods.postProductSkuGroup(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'SKU NG8TQOJ1F already some group');
    }
});

test.serial('Should be return not found', function* (t) {
    t.context.sandbox.stub(ProductSkuGroupRepository, 'findOne').resolves([]);
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
        yield Methods.postProductSkuGroup(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
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

        yield Methods.postProductSkuGroup(data, context);
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
        yield Methods.postProductSkuGroup(data, context);
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
