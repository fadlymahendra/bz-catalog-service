'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');
const Methods = require('../../../../src/methods/products/create_mapping');
const ProductSkuRepository = require('../../../../src/repositories/product_sku_mapping');

test.serial('Should be return not found', function* (t) {
    t.context.sandbox.stub(ProductSkuRepository, 'findMapping').resolves({
        _id: '5ad8361a9a6c401f88ccd1ba',
        id: '1524119066503',
        product_sku: 'XTYDFR008',
        payload: {
            catalog_id: '3',
            organization_id: 4,
            material_code: '10',
            material_group: '12',
            mapped: 1
        },
        user: {
            id: 3,
            name: 'Bambang Widodo',
            email: 'vendor@tokoledia.com'
        },
        created_at: '2018-04-19T06:24:26.503+0000',
        updated_at: '2018-04-19T06:24:26.503+0000'
    });
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            body: {
                payload: [
                    {
                        sku: 'XTYDFR008',
                        items: [
                            {
                                catalog_id: '33333',
                                organization_id: 4,
                                material_code: '10',
                                material_group: '12',
                                mapped: 1
                            }
                        ]
                    }
                ]
            }
        };
        yield Methods.postProductMapping(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'SKU Mapping tidak ditemukan');
    }
});

test.serial('Should be return success with result', function* (t) {
    t.context.sandbox.stub(ProductSkuRepository, 'findMapping').resolves(null);
    t.context.sandbox.stub(ProductSkuRepository, 'insertMany').resolves([]);
    // t.context.sandbox.stub(WebhookRepository, 'trigger').resolves();
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            body: {
                payload: [
                    {
                        sku: 'XTYDFR008',
                        items: [
                            {
                                catalog_id: '3',
                                organization_id: 4,
                                material_code: '10',
                                material_group: '12',
                                mapped: 0
                            }
                        ]
                    }
                ]
            }
        };
        const result = yield Methods.postProductMapping(data, context);
        const expected = {
            message: 'SUCCESS_CREATE_SKU_MAPPING'
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
            body: {
                payload: [
                    {
                        sku: 'XTYDFR008',
                        items: [
                            {
                                catalog_id: '3',
                                organization_id: 4,
                                material_code: '10',
                                material_group: '12',
                                mapped: 1
                            }
                        ]
                    }
                ]
            }
        };
        yield Methods.postProductMapping(data, context);
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
                        sku: 'XTYDFR008',
                        items: [
                            {
                                catalog_id: '3',
                                organization_id: 4,
                                material_code: '10',
                                material_group: 12,
                                mapped: 0
                            }
                        ]
                    }
                ]
            }
        };
        yield Methods.postProductMapping(data, context);
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
                        sku: 'XTYDFR008',
                        items: []
                    }
                ]
            }
        };
        yield Methods.postProductMapping(data, context);
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
