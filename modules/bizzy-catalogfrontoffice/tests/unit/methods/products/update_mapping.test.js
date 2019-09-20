'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');
const Methods = require('../../../../src/methods/products/update_mapping');
const ProductSkuRepository = require('../../../../src/repositories/product_sku_mapping');

test.serial('Should be return success', function* (t) {
    t.context.sandbox.stub(ProductSkuRepository, 'findMapping').resolves({
        _id: '5ae01557c8fa0ec81fda336c',
        id: '1524634967745',
        product_sku: 'ZYUR7876',
        payload: {
            organization_id: 4,
            material_code: '10',
            material_group: '11',
            manufacturer_code: '',
            mapped: 0
        },
        user: { id: 3, name: 'Bambang Widodo', email: 'vendor@tokoledia.com' },
        created_at: '2018-04-25T05:42:47.746Z',
        updated_at: '2018-04-25T05:52:49.296Z'
    });
    t.context.sandbox.stub(ProductSkuRepository, 'updateMapping').resolves({});
    // t.context.sandbox.stub(WebhookRepository, 'trigger').resolves();
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            body: {
                items: [
                    {
                        sku: 'ZYUR7876',
                        payload: {
                            organization_id: 4,
                            material_code: '',
                            material_group: '',
                            manufacturer_code: '',
                            mapped: 0
                        }
                    }
                ]
            }
        };
        const result = yield Methods.putProductMapping(data, context);
        const expected = {
            message: 'SUCCESS_UPDATE_SKU_MAPPING'
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return not found', function* (t) {
    t.context.sandbox.stub(ProductSkuRepository, 'findMapping').resolves(null);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            body: {
                items: [
                    {
                        sku: 'ZYUR7876',
                        payload: {
                            organization_id: 4,
                            material_code: '',
                            material_group: '',
                            manufacturer_code: '',
                            mapped: 1
                        }
                    }
                ]
            }
        };
        yield Methods.putProductMapping(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'SKU Mapping tidak ditemukan');
    }
});

test.serial('Should be return authorized user', function* (t) {
    try {
        const context = {
            user: ''
        };
        const data = {
            body: {
                items: [
                    {
                        sku: 'ZYUR7876',
                        payload: {
                            organization_id: 4,
                            material_code: '',
                            material_group: '',
                            manufacturer_code: '',
                            mapped: 0
                        }
                    }
                ]
            }
        };
        yield Methods.putProductMapping(data, context);
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
                items: [
                    {
                        sku: '',
                        payload: {
                            organization_id: 4,
                            material_code: '',
                            material_group: '',
                            manufacturer_code: '',
                            mapped: 1
                        }
                    }
                ]
            }
        };
        yield Methods.putProductMapping(data, context);
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
                items: []
            }
        };
        yield Methods.putProductMapping(data, context);
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
