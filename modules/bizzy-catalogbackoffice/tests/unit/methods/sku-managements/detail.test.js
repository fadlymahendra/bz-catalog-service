'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');

const RepoGeneral = require('../../../../src/repositories/general');
const RepoProductVariant = require('../../../../src/repositories/product_variant');
const Method = require('../../../../src/methods/sku-managements/detail');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

test.serial('Should be return Detail of Sku', function* (t) {
    // RepoProductVariant.findByIdWithDetail
    t.context.sandbox.stub(RepoProductVariant, 'findByIdWithDetail').resolves({
        id: 2,
        product_group_id: 2,
        sku: 'X152KT2GKF',
        long_name: 'Apple iPhone 7 - Black - 64GB',
        variant_value: '{"phone_color":2,"phone_storage":4}',
        primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516885849.jpg',
        additional_image: '["https://ecs7.tokopedia.net/img/cache/700/product-1/2016/11/25/98262774/98262774_4ea3f7ac-c76a-4926-8ee0-92c24a15fa2a_599_600","https://ecs7.tokopedia.net/img/cache/700/product-1/2017/1/13/98262774/98262774_6fcdfe95-cd8c-43bb-99bb-5da0f9a54a7e_700_700","https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516885854.jpg"]',
        product_id_magento: null,
        product_id_netsuite: null,
        is_primary: 1,
        is_discontinue: 0,
        is_active: 1,
        created_at: '2018-01-06T10:44:13.000Z',
        updated_at: '2018-02-28T06:15:12.000Z',
        ProductVendors: [
            {
                vendor_id: 3,
                reference_link: '["https://www.apple.com/iphone-x/specs/","https://www.cnet.com/products/apple-iphone-x/review/","https://www.gsmarena.com/apple_iphone_x-8858.php"]'
            }
        ],
        ProductGroup: {
            id: 2,
            ProductGroupAttributes: [
                {
                    id: 1,
                    product_group_id: 2,
                    attribute_code_id: 1,
                    attribute_value_id: null,
                    text_input: null,
                    is_variant: 1,
                    created_at: '2017-12-19T08:01:09.000Z',
                    updated_at: '2017-12-19T08:01:09.000Z'
                },
                {
                    id: 2,
                    product_group_id: 2,
                    attribute_code_id: 2,
                    attribute_value_id: null,
                    text_input: null,
                    is_variant: 1,
                    created_at: '2017-12-19T08:01:19.000Z',
                    updated_at: '2017-12-19T08:01:19.000Z'
                }
            ]
        }
    });

    // RepoGeneral.findAttributeByVariantValue
    t.context.sandbox.stub(RepoGeneral, 'findAttributeByVariantValue').resolves([
        {
            label: 'Warna',
            value: 'Black'
        },
        {
            label: 'Kapasitas',
            value: '64GB'
        }
    ]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '2'
            }
        };
        const result = yield Method.getSkuManagementById(data, context);

        const expected = {
            data: {
                id: 2,
                sku: 'X152KT2GKF',
                product_group_id: 2,
                long_name: 'Apple iPhone 7 - Black - 64GB',
                vendors: [
                    {
                        vendor_id: 3
                    }
                ],
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516885849.jpg',
                additional_image: [
                    'https://ecs7.tokopedia.net/img/cache/700/product-1/2016/11/25/98262774/98262774_4ea3f7ac-c76a-4926-8ee0-92c24a15fa2a_599_600',
                    'https://ecs7.tokopedia.net/img/cache/700/product-1/2017/1/13/98262774/98262774_6fcdfe95-cd8c-43bb-99bb-5da0f9a54a7e_700_700',
                    'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516885854.jpg'
                ],
                variants: [
                    {
                        label: 'Warna',
                        value: 'Black'
                    },
                    {
                        label: 'Kapasitas',
                        value: '64GB'
                    }
                ],
                is_discontinue: 0,
                is_active: 1
            }
        };
        t.deepEqual(result, expected);
    } catch (exc) {
        console.log(exc);
    }
});

test.serial('Should be return Detail empty variant and vendor', function* (t) {
    // RepoProductVariant.findByIdWithDetail
    t.context.sandbox.stub(RepoProductVariant, 'findByIdWithDetail').resolves({
        id: 2,
        product_group_id: 2,
        sku: 'X152KT2GKF',
        long_name: 'Apple iPhone 7 - Black - 64GB',
        variant_value: '{"phone_color":2,"phone_storage":4}',
        primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516885849.jpg',
        additional_image: '["https://ecs7.tokopedia.net/img/cache/700/product-1/2016/11/25/98262774/98262774_4ea3f7ac-c76a-4926-8ee0-92c24a15fa2a_599_600","https://ecs7.tokopedia.net/img/cache/700/product-1/2017/1/13/98262774/98262774_6fcdfe95-cd8c-43bb-99bb-5da0f9a54a7e_700_700","https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516885854.jpg"]',
        product_id_magento: null,
        product_id_netsuite: null,
        is_primary: 1,
        is_discontinue: 0,
        is_active: 1,
        created_at: '2018-01-06T10:44:13.000Z',
        updated_at: '2018-02-28T06:15:12.000Z',
        ProductVendors: '',
        ProductGroup: {
            id: 2,
            ProductGroupAttributes: [
                {
                    id: 1,
                    product_group_id: 2,
                    attribute_code_id: 1,
                    attribute_value_id: null,
                    text_input: null,
                    is_variant: 1,
                    created_at: '2017-12-19T08:01:09.000Z',
                    updated_at: '2017-12-19T08:01:09.000Z'
                },
                {
                    id: 2,
                    product_group_id: 2,
                    attribute_code_id: 2,
                    attribute_value_id: null,
                    text_input: null,
                    is_variant: 1,
                    created_at: '2017-12-19T08:01:19.000Z',
                    updated_at: '2017-12-19T08:01:19.000Z'
                }
            ]
        }
    });

    // RepoGeneral.findAttributeByVariantValue
    t.context.sandbox.stub(RepoGeneral, 'findAttributeByVariantValue').resolves();

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '2'
            }
        };
        const result = yield Method.getSkuManagementById(data, context);

        const expected = {
            data: {
                id: 2,
                sku: 'X152KT2GKF',
                product_group_id: 2,
                long_name: 'Apple iPhone 7 - Black - 64GB',
                vendors: [],
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516885849.jpg',
                additional_image: [
                    'https://ecs7.tokopedia.net/img/cache/700/product-1/2016/11/25/98262774/98262774_4ea3f7ac-c76a-4926-8ee0-92c24a15fa2a_599_600',
                    'https://ecs7.tokopedia.net/img/cache/700/product-1/2017/1/13/98262774/98262774_6fcdfe95-cd8c-43bb-99bb-5da0f9a54a7e_700_700',
                    'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516885854.jpg'
                ],
                variants: [],
                is_discontinue: 0,
                is_active: 1
            }
        };
        t.deepEqual(result, expected);
    } catch (exc) {
        console.log(exc);
    }
});

test.serial('Should be return Detail of Sku NO_VARIANT', function* (t) {
    // RepoProductVariant.findByIdWithDetail
    t.context.sandbox.stub(RepoProductVariant, 'findByIdWithDetail').resolves({
        id: 2,
        product_group_id: 2,
        sku: '345',
        long_name: 'Apple iPhone 7',
        variant_value: 'NO_VARIANT',
        primary_image: 'image4.jpg',
        additional_image: '["image3.jpg","image2.jpg","image1.jpg"]',
        product_id_magento: null,
        product_id_netsuite: null,
        is_primary: 0,
        is_discontinue: 0,
        is_active: 1,
        ProductVendors: [
            {
                vendor_id: 13
            }
        ],
        ProductGroup: {
            id: 2,
            ProductGroupAttributes: [
                {
                    id: 1,
                    product_group_id: 2,
                    attribute_code_id: 1,
                    attribute_value_id: null,
                    text_input: null,
                    is_variant: 1,
                    created_at: '2017-12-19T08:01:09.000Z',
                    updated_at: '2017-12-19T08:01:09.000Z'
                },
                {
                    id: 2,
                    product_group_id: 2,
                    attribute_code_id: 2,
                    attribute_value_id: null,
                    text_input: null,
                    is_variant: 1,
                    created_at: '2017-12-19T08:01:19.000Z',
                    updated_at: '2017-12-19T08:01:19.000Z'
                }
            ]
        }
    });

    // RepoGeneral.findAttributeByVariantValue
    t.context.sandbox.stub(RepoGeneral, 'findAttributeByVariantValue').resolves([
        {
            label: 'Kapasitas',
            value: '64GB'
        },
        {
            label: 'Color',
            value: 'Magenta'
        }
    ]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '2'
            }
        };
        const result = yield Method.getSkuManagementById(data, context);
        const expected = {
            data: {
                id: 2,
                sku: '345',
                product_group_id: 2,
                long_name: 'Apple iPhone 7',
                vendors: [
                    {
                        vendor_id: 13
                    }
                ],
                primary_image: 'image4.jpg',
                additional_image: [
                    'image3.jpg',
                    'image2.jpg',
                    'image1.jpg'
                ],
                variants: [],
                is_discontinue: 0,
                is_active: 1
            }
        };
        t.deepEqual(result, expected);
    } catch (exc) {
        console.log(exc);
    }
});

test.serial('You are not authorized user: Should be return Forbidden', function* (t) {
    try {
        const context = {
            user: ''
        };
        const data = {
            body: {
                name: 'Unit'
            }
        };
        yield Method.getSkuManagementById(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, 'You are not authorized user');
    }
});

test.serial('Sku Not Found', function* (t) {
    t.context.sandbox.stub(RepoProductVariant, 'findByIdWithDetail').resolves(false);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1'
            }
        };
        yield Method.getSkuManagementById(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'Sku not found');
    }
});

test.serial('Invalid Input Data Should throw BizzyError.BadRequest', function* testCase(t) {
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: ''
            }
        };
        yield Method.getSkuManagementById(data, context);
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
