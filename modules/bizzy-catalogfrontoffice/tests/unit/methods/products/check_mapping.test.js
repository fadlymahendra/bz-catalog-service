'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');
const Methods = require('../../../../src/methods/products/check_mapping');
const ProductSkuMapping = require('../../../../src/repositories/product_sku_mapping');

test.serial('Should be return success no mapping', function* (t) {
    t.context.sandbox.stub(ProductSkuMapping, 'findMappingSku').resolves(null);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                skus: 'WBQH1BWFAN',
                organization_id: 3,
                catalog_id: '90'
            }
        };
        const result = yield Methods.getCheckSkuMapping(data, context);
        const expected = {
            data: [
                {
                    sku: 'WBQH1BWFAN',
                    mapping: 0,
                    catalog_id: '90',
                    material_code: null,
                    material_group: null
                }
            ]
        };
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('Should be return success mapping', function* (t) {
    t.context.sandbox.stub(ProductSkuMapping, 'findMappingSku').resolves({
        _id: '5ad8361a9a6c401f88ccd1bb',
        id: '1524119066519',
        product_sku: 'WBQH1BWFAN',
        payload: {
            catalog_id: 8,
            organization_id: 3,
            material_code: '10',
            material_group: ''
        },
        user: {
            id: 3,
            name: 'Bambang Widodo',
            email: 'vendor@tokoledia.com'
        },
        created_at: '2018-04-19T06:24:26.519Z',
        updated_at: '2018-04-19T06:24:26.519Z'
    });
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                skus: 'WBQH1BWFAN',
                organization_id: 3,
                catalog_id: '90'
            }
        };
        const result = yield Methods.getCheckSkuMapping(data, context);
        const expected = {
            data: [
                {
                    sku: 'WBQH1BWFAN',
                    mapping: 1,
                    catalog_id: 8,
                    material_code: '10',
                    material_group: ''
                }
            ]
        };
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('Should be return bad request', function* (t) {
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                skus: '',
                organization_id: 3,
                catalog_id: '90'
            }
        };
        yield Methods.getCheckSkuMapping(data, context);
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
