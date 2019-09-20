'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const {
    BizzyError
} = require('bizzy-common');
const context = require('../../../mocks/context.json');

const Method = require('../../../../src/methods/products/list_mapping');
const ProductMappingRepository = require('../../../../src/repositories/product_sku_mapping');
const ProductVariantRepository = require('../../../../src/repositories/product_variant');
const Helper = require('../../../../src/utils/helper');

const validPayload = {
    body: {
        skus: '2BT5SHXXIY,HQT3RICWDH'
    }
};

const invalidPayload = {
    body: {}
};

const restFindAllMapping = [
    {
        _id: {
            organization_id: 308,
            product_sku: 'HQT3RICWDH',
            material_code: 'ONE+',
            material_group: 'SMPHONE',
            mapped: 1,
            manufacturer_code: 'OPSP1',
            uom: 'UNIT',
            quantity_stocking_uom: 1
        }
    },
    {
        _id: {
            organization_id: 308,
            product_sku: 'HQT3RICWDH',
            material_code: '',
            material_group: '',
            mapped: 0
        }
    },
    {
        _id: {
            organization_id: 308,
            product_sku: '2BT5SHXXIY',
            material_code: '',
            material_group: '',
            mapped: 0
        }
    }
];

const resFindBySkus = [
    {
        id: 87,
        product_group_id: 45,
        sku: '2BT5SHXXIY',
        long_name: 'Motorola - Silver - 64GB',
        variant_value: '{"phone_color":1,"phone_storage":4}',
        primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/08/product_1535206578.jpg',
        additional_image: '[]',
        product_id_magento: null,
        product_id_netsuite: null,
        is_primary: 0,
        is_discontinue: 0,
        is_active: 1,
        created_by: null,
        created_at: '2018-08-25T14:17:16.000Z',
        updated_at: '2018-08-25T14:17:16.000Z',
        ProductGroup: {
            id: 45,
            Uom: {
                id: 2,
                name: 'Dozen'
            },
            Category: {
                name: 'Mobile phones'
            },
            ProductGroupAttributes: [
                {
                    attribute_code_id: 3,
                    attribute_value_id: 6,
                    text_input: null,
                    is_variant: 0
                },
                {
                    attribute_code_id: 4,
                    attribute_value_id: null,
                    text_input: '5',
                    is_variant: 0
                }
            ]
        }
    },
    {
        id: 222,
        product_group_id: 177,
        sku: 'HQT3RICWDH',
        long_name: 'oneplus 5',
        variant_value: 'NO_VARIANT',
        primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/10/product_7cbef187-c7b5-4e8c-ac17-3580895ffebf.png',
        additional_image: '[]',
        product_id_magento: null,
        product_id_netsuite: null,
        is_primary: 1,
        is_discontinue: 0,
        is_active: 1,
        created_by: 168,
        created_at: '2018-10-19T03:42:09.000Z',
        updated_at: '2018-10-19T03:42:09.000Z',
        ProductGroup: {
            id: 177,
            Uom: {
                id: 1,
                name: 'Unit'
            },
            Category: {
                name: 'Acetylene'
            },
            ProductGroupAttributes: []
        }
    }
];


test.serial('SUCCESSFUL get product mapping by Sku & Catalog ID', Promise.coroutine(function* (t) {
    t.context.sandbox.mock(ProductMappingRepository).expects('findAllMapping').resolves(restFindAllMapping);
    t.context.sandbox.mock(ProductVariantRepository).expects('findBySkus').resolves(resFindBySkus);

    yield Method.getProductMappingBySkuCatalogId(validPayload, context)
        .then((result) => {
            t.pass();
        })
        .catch((err) => {
            t.fail(err.message);
        });
}));

test.serial('FAIL get product mapping by Sku & Catalog ID - Catalog ID not found', Promise.coroutine(function* (t) {
    const catIdNotFoundPayload = Object.assign({}, Helper.parseDataObject(validPayload));

    t.context.sandbox.mock(ProductMappingRepository).expects('findAllMapping').resolves([]);
    t.context.sandbox.mock(ProductVariantRepository).expects('findBySkus').resolves([]);

    yield Method.getProductMappingBySkuCatalogId(catIdNotFoundPayload, context)
        .then((result) => {
            t.fail('should return error - Catalog ID not found');
        })
        .catch((err) => {
            t.deepEqual(err.message, 'Products not found');
        });
}));

test.serial('FAIL get product mapping by Sku & Catalog ID - SKU not found', Promise.coroutine(function* (t) {
    const skuNotFoundPayload = Object.assign({}, Helper.parseDataObject(validPayload));
    skuNotFoundPayload.body.skus = '2BT5SHXXIY,alskdjf,HQT3RICWDH';

    t.context.sandbox.mock(ProductMappingRepository).expects('findAllMapping').resolves(restFindAllMapping);
    t.context.sandbox.mock(ProductVariantRepository).expects('findBySkus').resolves(resFindBySkus);

    yield Method.getProductMappingBySkuCatalogId(skuNotFoundPayload, context)
        .then((result) => {
            t.fail('should return error - SKU not found');
        })
        .catch((err) => {
            t.deepEqual(err.message, 'SKU alskdjf not found');
        });
}));

test.serial('FAIL because invalid payload by Sku', Promise.coroutine(function* (t) {
    yield Method.getProductMappingBySkuCatalogId(invalidPayload, context)
        .then((result) => {
            t.fail();
        })
        .catch((err) => {
            t.pass();
        });
}));

test.before('Initialize error handler', (t) => {
    BizzyError.initializeErrors();
});

test.beforeEach('Initialize New Sandbox Before Each Test', (t) => {
    t.context.sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
});

test.afterEach.always('Restore Sandbox and Configuration After Each Test', (t) => {
    t.context.sandbox.restore();
});
