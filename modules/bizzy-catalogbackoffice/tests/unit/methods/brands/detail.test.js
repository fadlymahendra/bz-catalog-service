'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');


const BrandRespository = require('../../../../src/repositories/brand');
const VariantRepository = require('../../../../src/repositories/product_variant');
const Methods = require('../../../../src/methods/brands/detail');

const brandData = {
    id: 81,
    name: 'Apple',
    image_url: null,
    is_active: 1,
    description: null,
    created_at: '2017-11-28T14:54:10.000Z',
    updated_at: '2017-11-28T14:54:10.000Z'
};

const variantData = [
    {
        id: 4,
        product_group_id: 2,
        sku: 'WBQH1BWFAN',
        is_active: 1,
        ProductGroup: {
            id: 2,
            name: 'Apple iPhone 7',
            brand_id: 81
        }
    }
];

test.serial('Should have return lists of brand', function* (t) {
    t.context.sandbox.stub(BrandRespository, 'findById').resolves(brandData);

    t.context.sandbox.stub(VariantRepository, 'grabSkuByBrand').resolves(variantData);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '81'
            }
        };
        const result = yield Methods.getBrandById(data, context);

        const expected = {
            data: {
                id: 81,
                name: 'Apple',
                image_url: null,
                description: null,
                status: 1,
                total_sku: 1
            }
        };
        // t.pass();
        t.deepEqual(result, expected);
    } catch (exc) {
        console.log(exc);
        t.fail(exc.message);
    }
});

test.serial('Invalid data input: Should have return BizzyError.BadRequest', function* (t) {
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: ''
            }
        };

        yield Methods.getBrandById(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'The Error Type is Incorrect');
    }
});

test.serial('Invalid data input: Brand not found', function* (t) {
    t.context.sandbox.stub(BrandRespository, 'findById').resolves(null);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1000000000'
            }
        };

        yield Methods.getBrandById(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'Brand not found');
    }
});

test.serial('You are not authorized user: Should have return Forbidden', function* (t) {
    try {
        const context = {
            user: ''
        };
        const data = {
            path: {
                id: '81'
            }
        };
        yield Methods.getBrandById(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, 'You are not authorized user');
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
