'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { DBContext, BizzyError } = require('bizzy-common');
const ProductGroupRepository = require('../../../../src/repositories/product_group');
const ProductVariantRepository = require('../../../../src/repositories/product_variant');
const Methods = require('../../../../src/methods/product-groups/sku_search');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

test.serial('Should be return success Ascending', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(ProductGroupRepository, 'findOne').resolves({});
    t.context.sandbox.stub(ProductVariantRepository, 'findAllVariant').resolves([
        {
            id: 1,
            product_group_id: 1,
            sku: '1111111',
            long_name: 'Tissue Toilet Paseo 50"',
            variant_value: '{tv_size:50"}',
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2017-12-20T05:09:44.000Z',
            updated_at: '2017-12-20T05:09:44.000Z',
            ProductGroup: {
                id: 1,
                name: 'Tissue Toilet Paseo'
            }
        }
    ]);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '2'
            },
            query: {
                search: '',
                sort: 'name_asc',
                limit: 20
            }
        };

        const result = yield Methods.getProductGroupSkuSearch(data, context);
        const expected = {
            data: [
                {
                    id: 1,
                    sku: '1111111',
                    long_name: 'Tissue Toilet Paseo 50"',
                    product_group_id: 1
                }
            ]
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return success Descending', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(ProductGroupRepository, 'findOne').resolves({});
    t.context.sandbox.stub(ProductVariantRepository, 'findAllVariant').resolves([
        {
            id: 1,
            product_group_id: 1,
            sku: '1111111',
            long_name: 'Tissue Toilet Paseo 50"',
            variant_value: '{tv_size:50"}',
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2017-12-20T05:09:44.000Z',
            updated_at: '2017-12-20T05:09:44.000Z',
            ProductGroup: {
                id: 1,
                name: 'Tissue Toilet Paseo'
            }
        }
    ]);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '2'
            },
            query: {
                search: 'Paseo',
                sort: 'name_desc',
                limit: 20
            }
        };

        const result = yield Methods.getProductGroupSkuSearch(data, context);
        const expected = {
            data: [
                {
                    id: 1,
                    sku: '1111111',
                    long_name: 'Tissue Toilet Paseo 50"',
                    product_group_id: 1
                }
            ]
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('You are not authorized user: Should be return Forbidden', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    try {
        const context = {};
        context.user = '';
        const data = {
            path: {
                id: '2'
            },
            query: {
                search: 'Paseo',
                sort: 'name_asc',
                limit: 20
            }
        };
        yield Methods.getProductGroupSkuSearch(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, 'You are not authorized user');
    }
});

test.serial('Should be return Bad Request', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: ''
            },
            query: {
                search: 'Paseo',
                sort: 'name_asc',
                limit: 20
            }
        };
        yield Methods.getProductGroupSkuSearch(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Should be return NotFound', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({ORMProvider: {Op: {}}});
    t.context.sandbox.stub(ProductGroupRepository, 'findOne').resolves(null);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: 'xxxx'
            },
            query: {
                search: 'Paseo',
                sort: 'name_asc',
                limit: 20
            }
        };
        yield Methods.getProductGroupSkuSearch(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'Product Group Not Found');
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
