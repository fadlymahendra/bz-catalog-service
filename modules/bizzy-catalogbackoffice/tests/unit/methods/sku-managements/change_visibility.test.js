'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError, BizzyService } = require('bizzy-common');

const RepoGeneral = require('../../../../src/repositories/general');
const Repo = require('../../../../src/repositories/product_variant');
const ProductGroupRepository = require('../../../../src/repositories/product_group');
const Method = require('../../../../src/methods/sku-managements/change_visibility');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

test.serial('Should be return an updated Sku', Promise.coroutine(function* (t) {
    t.context.sandbox.stub(Repo, 'findOne').resolves({
        id: 3,
        product_group_id: 3,
        sku: '567',
        long_name: 'Epson Tinta Refill Botol',
        variant_value: '{"ink_color": 9}',
        primary_image: 'image.jpg',
        additional_image: '["image1.jpg","image2.jpg", "image3.jpg"]',
        is_discontinue: 1,
        is_active: 1
    });

    t.context.sandbox.stub(Repo, 'update').resolves(true);

    t.context.sandbox.stub(Repo, 'findByIdWithDetail').resolves({
        id: 3,
        product_group_id: 3,
        sku: '567',
        long_name: 'Epson Tinta Refill Botol',
        variant_value: '{"ink_color": 9}',
        primary_image: 'image4.jpg',
        additional_image: '["image3.jpg"]',
        is_discontinue: 1,
        is_active: 1,
        ProductVendors: [
            {
                vendor_id: 1,
                reference_link: null
            }
        ],
        ProductGroup: { id: 3, ProductGroupAttributes: [] }
    });

    t.context.sandbox.stub(RepoGeneral, 'findAttributeByVariantValue').resolves([
        {
            label: 'Color',
            value: 'Magenta'
        }
    ]);

    t.context.sandbox.stub(Repo, 'findCountVariant').resolves({
        count: 1,
        rows: [
            {
                id: 1,
                product_group_id: 3,
                sku: 'X152KT2GKF',
                long_name: 'Apple iPhone 7 - Black - 64GB',
                variant_value: '{"phone_color":2,"phone_storage":4}',
                primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
                additional_image: '["https://ecs7.tokopedia.net/img/cache/700/product-1/2016/11/25/98262774/98262774_4ea3f7ac-c76a-4926-8ee0-92c24a15fa2a_599_600","https://ecs7.tokopedia.net/img/cache/700/product-1/2017/1/13/98262774/98262774_6fcdfe95-cd8c-43bb-99bb-5da0f9a54a7e_700_700"]',
                product_id_magento: null,
                product_id_netsuite: null,
                is_primary: 1,
                is_discontinue: 0,
                is_active: 0,
                created_at: '2018-01-06T10:44:13.000Z',
                updated_at: '2018-01-18T15:40:54.000Z'
            }
        ]
    });

    t.context.sandbox.stub(ProductGroupRepository, 'update').resolves([
        1
    ]);
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1'
            },
            body: {
                is_active: 1
            }
        };
        const result = yield Method.putSkuManagementVisibility(data, context);
        const expected = {
            data: {
                id: 3,
                is_active: 1
            },
            message: 'Change Visibility Sku Success'
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err);
    }
}));

test.serial('Should be return an updated Sku is_active 0', Promise.coroutine(function* (t) {
    t.context.sandbox.stub(Repo, 'findOne').resolves({
        id: 3,
        product_group_id: 3,
        sku: '567',
        long_name: 'Epson Tinta Refill Botol',
        variant_value: '{"ink_color": 9}',
        primary_image: 'image.jpg',
        additional_image: '["image1.jpg","image2.jpg", "image3.jpg"]',
        is_discontinue: 1,
        is_active: 1
    });

    t.context.sandbox.stub(Repo, 'update').resolves(true);

    t.context.sandbox.stub(Repo, 'findByIdWithDetail').resolves({
        id: 3,
        product_group_id: 3,
        sku: '567',
        long_name: 'Epson Tinta Refill Botol',
        variant_value: '{"ink_color": 9}',
        primary_image: 'image4.jpg',
        additional_image: '["image3.jpg"]',
        is_discontinue: 1,
        is_active: 1,
        ProductVendors: [
            {
                vendor_id: 1,
                reference_link: null
            }
        ],
        ProductGroup: { id: 3, ProductGroupAttributes: [] }
    });

    t.context.sandbox.stub(RepoGeneral, 'findAttributeByVariantValue').resolves([
        {
            label: 'Color',
            value: 'Magenta'
        }
    ]);

    t.context.sandbox.stub(Repo, 'findCountVariant').resolves({
        count: 1,
        rows: [
            {
                id: 1,
                product_group_id: 3,
                sku: 'X152KT2GKF',
                long_name: 'Apple iPhone 7 - Black - 64GB',
                variant_value: '{"phone_color":2,"phone_storage":4}',
                primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
                additional_image: '["https://ecs7.tokopedia.net/img/cache/700/product-1/2016/11/25/98262774/98262774_4ea3f7ac-c76a-4926-8ee0-92c24a15fa2a_599_600","https://ecs7.tokopedia.net/img/cache/700/product-1/2017/1/13/98262774/98262774_6fcdfe95-cd8c-43bb-99bb-5da0f9a54a7e_700_700"]',
                product_id_magento: null,
                product_id_netsuite: null,
                is_primary: 1,
                is_discontinue: 0,
                is_active: 0,
                created_at: '2018-01-06T10:44:13.000Z',
                updated_at: '2018-01-18T15:40:54.000Z'
            }
        ]
    });

    t.context.sandbox.stub(ProductGroupRepository, 'update').resolves([
        1
    ]);
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1'
            },
            body: {
                is_active: 0
            }
        };
        const result = yield Method.putSkuManagementVisibility(data, context);
        const expected = {
            data: {
                id: 3,
                is_active: 1
            },
            message: 'Change Visibility Sku Success'
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err);
    }
}));

test.serial('Should be return an updated Sku 0', Promise.coroutine(function* (t) {
    t.context.sandbox.stub(Repo, 'findOne').resolves({
        id: 3,
        product_group_id: 3,
        sku: '567',
        long_name: 'Epson Tinta Refill Botol',
        variant_value: '{"ink_color": 9}',
        primary_image: 'image.jpg',
        additional_image: '["image1.jpg","image2.jpg", "image3.jpg"]',
        is_discontinue: 1,
        is_active: 1
    });

    t.context.sandbox.stub(Repo, 'update').resolves(true);

    t.context.sandbox.stub(Repo, 'findByIdWithDetail').resolves({
        id: 3,
        product_group_id: 3,
        sku: '567',
        long_name: 'Epson Tinta Refill Botol',
        variant_value: '{"ink_color": 9}',
        primary_image: 'image4.jpg',
        additional_image: '["image3.jpg"]',
        is_discontinue: 1,
        is_active: 1,
        ProductVendors: [
            {
                vendor_id: 1,
                reference_link: null
            }
        ],
        ProductGroup: { id: 3, ProductGroupAttributes: [] }
    });

    t.context.sandbox.stub(RepoGeneral, 'findAttributeByVariantValue').resolves([
        {
            label: 'Color',
            value: 'Magenta'
        }
    ]);

    t.context.sandbox.stub(Repo, 'findCountVariant').resolves({
        count: 0,
        rows: []
    });

    t.context.sandbox.stub(ProductGroupRepository, 'update').resolves([
        1
    ]);
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1'
            },
            body: {
                is_active: 0
            }
        };
        const result = yield Method.putSkuManagementVisibility(data, context);
        const expected = {
            data: {
                id: 3,
                is_active: 1
            },
            message: 'Change Visibility Sku Success'
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err);
    }
}));

test.serial('Should be return Sku Not Found', Promise.coroutine(function* (t) {
    t.context.sandbox.stub(Repo, 'findOne').resolves(false);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1'
            },
            body: {
                is_active: 1
            }
        };
        yield Method.putSkuManagementVisibility(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'Sku Not found');
    }
}));

test.serial('Invalid Input Data Should throw BizzyError.BadRequest', function* testCase(t) {
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: ''
            },
            body: {
                is_active: 0
            }
        };
        yield Method.putSkuManagementVisibility(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('You are not authorized user: Should be return Forbidden', function* (t) {
    try {
        const context = {
            user: ''
        };
        const data = {
            path: {
                id: '1'
            }
        };
        yield Method.putSkuManagementVisibility(data, context);
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
