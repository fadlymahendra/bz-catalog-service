'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { DBContext, BizzyError } = require('bizzy-common');


const ProductVariant = require('../../../../src/repositories/product_variant');
const BrandRepository = require('../../../../src/repositories/brand');
const Methods = require('../../../../src/methods/brands/list');
const context = require('../../../mocks/context.json');

const brandData = [
    {
        id: 72,
        name: 'ANYLINX',
        image_url: null,
        is_active: 1,
        created_at: '2017-11-28T14:54:10.000Z',
        updated_at: '2017-11-28T14:54:10.000Z'
    }
];

const variantData = [
    {
        id: 72,
        name: 'ANYLINX',
        logo: null,
        is_active: 1
    },
    {
        id: 73,
        name: 'AP Boots',
        logo: null,
        is_active: 1
    }
];

test.serial('Should have return list brand', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    const getOne = t.context.sandbox.stub(BrandRepository, 'findAll');

    getOne.onCall(0).resolves(brandData);
    getOne.onCall(1).resolves(brandData);

    t.context.sandbox.stub(ProductVariant, 'grabSkuByBrand').resolves(variantData);

    try {
        const data = {
            query: {
                search: '',
                page: 8,
                limit: 10
            }
        };
        const result = yield Methods.getBrand(data, context);

        const expected = {
            data: [
                {
                    id: 72,
                    name: 'ANYLINX',
                    logo: null,
                    total_sku: 2,
                    is_active: 1
                }
            ],
            meta: {
                page: 8,
                limit: 10,
                total_data: 1,
                total_page: 1
            }
        };
        // t.pass();
        t.deepEqual(result, expected);
    } catch (exc) {
        console.log(exc);
        t.fail(exc.message);
    }
});


test.serial('Should have return Brand List With empty search', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });

    const getOne = t.context.sandbox.stub(BrandRepository, 'findAll');

    getOne.onCall(0).resolves(brandData);
    getOne.onCall(1).resolves(brandData);

    t.context.sandbox.stub(ProductVariant, 'grabSkuByBrand').resolves(variantData);

    try {
        const data = {
            query: {
                search: 'Y',
                page: 1,
                limit: 1
            }
        };
        const result = yield Methods.getBrand(data, context);
        const expected = {
            data: [
                {
                    id: 72,
                    name: 'ANYLINX',
                    logo: null,
                    total_sku: 2,
                    is_active: 1
                }
            ],
            meta: {
                page: 1,
                limit: 1,
                total_data: 1,
                total_page: 1
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Invalid data input: Should have return BizzyError.BadRequest', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });

    try {
        const data = {
            query: {
                search: '',
                page: -1,
                limit: 20
            }
        };

        yield Methods.getBrand(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'The Error Type is Incorrect');
    }
});

test.serial('Should have returned Brand list given a search name/id/is_active', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });

    const getOne = t.context.sandbox.stub(BrandRepository, 'findAll');

    getOne.onCall(0).resolves(brandData);
    getOne.onCall(1).resolves(brandData);

    t.context.sandbox.stub(ProductVariant, 'grabSkuByBrand').resolves(variantData);

    try {
        const data = {
            query: {
                search: 'ANYLINX',
                page: 8,
                limit: 10,
                is_active: '1'
            }
        };
        const result = yield Methods.getBrand(data, context);

        const expected = {
            data: [
                {
                    id: 72,
                    name: 'ANYLINX',
                    logo: null,
                    total_sku: 2,
                    is_active: 1
                }
            ],
            meta: {
                page: 8,
                limit: 10,
                total_data: 1,
                total_page: 1
            }
        };
        // t.pass();
        t.deepEqual(result, expected);
    } catch (exc) {
        console.log(exc);
        t.fail(exc.message);
    }
});

test.serial('You are not authorized user: Should have return Forbidden', function* (t) {
    try {
        const context = {
            user: ''
        };
        const data = {
            query: {
                search: '18',
                page: 1,
                limit: 20
            }
        };
        yield Methods.getBrand(data, context);
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
