'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const cloneDeep = require('clone-deep');
const { BizzyError } = require('bizzy-common');
const context = require('../../../mocks/context.json');
const AttributeCodeRepo = require('../../../../src/repositories/attribute_code');
const ProductMappingRepo = require('../../../../src/repositories/product_sku_mapping');
const ProductVariantRepo = require('../../../../src/repositories/product_variant');

const Method = require('../../../../src/methods/products/list_mapping');

const getProductMappingCodeJson = require('../../../mocks/getProductMappingCode');
const getProductMappingBySkuCatalogIdJson = require('../../../mocks/getProductMappingBySkuCatalogId');

test.serial('Should be return success', function* (t) {
    const findAll = t.context.sandbox.stub(ProductMappingRepo, 'findAllMapping');
    findAll.onCall(0).resolves([]);
    findAll.onCall(1).resolves([
        {
            _id: '5ae15646841350718bcc174b',
            id: '1524119066519',
            product_sku: 'WBQH1BWFAN',
            payload: {
                catalog_id: '8',
                organization_id: 3,
                material_code: '10',
                material_group: '222'
            },
            user: {
                id: 3,
                name: 'Bambang Widodo',
                email: 'vendor@tokoledia.com'
            },
            created_at: '2018-04-19T06:24:26.519Z',
            updated_at: '2018-04-26T04:37:49.208Z'
        }
    ]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                ids: '3,8'
            }
        };
        const result = yield Method.getProductMapping(data, context);
        const expected = {
            data: [
                {
                    catalog_id: '3',
                    sku: []
                },
                {
                    catalog_id: '8',
                    sku: [
                        'WBQH1BWFAN'
                    ]
                }
            ]
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return authorized', function* (t) {
    try {
        const context = {
            user: ''
        };
        const data = {
            query: {
                ids: '10,12'
            }
        };
        yield Method.getProductMapping(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, 'You are not authorized user');
    }
});

test.serial('Should be return bad request', function* (t) {
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                ids: ''
            }
        };
        yield Method.getProductMapping(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

const productVariantDetailStub = [
    {
        sku: '93VN03AVNO',
        long_name: '',
        primary_image: '',
        ProductGroup: {
            Category: {
                name: ''
            },
            Uom: {
                id: '',
                name: 'uomBizzyName'
            },
            ProductGroupAttributes: [{
                attribute_code_id: '',
                attribute_value_id: 2,
                text_input: ''
            }]
        }
    },
    {
        sku: 'TRG8QVK5SI',
        long_name: '',
        primary_image: '',
        ProductGroup: {
            Category: {
                name: ''
            },
            Uom: {
                id: '',
                name: ''
            },
            ProductGroupAttributes: [{
                attribute_code_id: '',
                attribute_value_id: '',
                text_input: ''
            }]
        }
    }
];
const getMappingStub = [
    {
        _id: {
            product_sku: '93VN03AVNO',
            uom_bizzy: ''
        }
    },
    {
        _id: {
            product_sku: 'TRG8QVK5SI',
            uom_bizzy: ''
        }
    }
];
const totalDataStub = 2;
const attributeCodeStub = {
    label: '',
    AttributeValues: [
        {
            value: ''
        }
    ]
};
const dataList = {
    query: {
        page: 1,
        search: '',
        limit: 10
    }
};

test.serial('[FAILED] Error Auth', function* (t) {
    try {
        const data = cloneDeep(getProductMappingCodeJson);
        yield Method.getProductMappingCode(data, {});
        t.fail('should be throw BadRequest when Auth Error');
    } catch (err) {
        t.pass();
    }
});

// Test : Product Mapping Download
test.serial('[SUCCESS] Download Product Mapping', function* (t) {
    t.context.sandbox.stub(ProductMappingRepo, 'findAllMapping').resolves(getMappingStub);
    t.context.sandbox.stub(ProductVariantRepo, 'findBySkusWithPagination').resolves(productVariantDetailStub);
    t.context.sandbox.stub(ProductVariantRepo, 'countBySkus').resolves(2);
    t.context.sandbox.stub(AttributeCodeRepo, 'findWithValue').resolves(attributeCodeStub);

    try {
        const data = cloneDeep(getProductMappingCodeJson);
        data.query = {};

        const result = yield Method.getProductMappingCode(data, context);
        const expected = {
            data: [{
                sku: [{
                    category_name: '', long_name: '', manufacturer_code: undefined, mapped: undefined, material_code: undefined, material_group: undefined, primary_image: '', uom_bizzy: 'uomBizzyName', sku: '93VN03AVNO', uom: '0', quantity_stocking_uom: 0, specifications: [{ code: '', value: '' }]
                }, {
                    category_name: '', long_name: '', manufacturer_code: undefined, mapped: undefined, material_code: undefined, material_group: undefined, primary_image: '', uom_bizzy: '', sku: 'TRG8QVK5SI', uom: '0', quantity_stocking_uom: 0, specifications: [{ code: '', value: '' }]
                }]
            }],
            meta: {
                page: 1,
                limit: null,
                total_data: 2,
                total_page: 1
            }
        };

        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('[FAILED] Download Product Mapping throw NotFound when ProductMappingRepository.findAllMapping()', function* (t) {
    const getMappingStub2 = [];

    t.context.sandbox.stub(ProductMappingRepo, 'findAllMapping').resolves(getMappingStub2);
    t.context.sandbox.stub(ProductVariantRepo, 'findBySkusWithPagination').resolves(productVariantDetailStub);
    t.context.sandbox.stub(AttributeCodeRepo, 'findWithValue').resolves(attributeCodeStub);

    try {
        const data = cloneDeep(getProductMappingCodeJson);
        yield Method.getProductMappingCode(data, context);
        t.fail('should be throw NotFound when ProductMappingRepository.findAllMapping()');
    } catch (err) {
        t.pass();
    }
});

// TEST : Producr Mapping List
test.serial('[FAILED] List Product Mapping - Validation Error', function* (t) {
    try {
        const data = cloneDeep(dataList);
        data.query = {
            total_data: 100
        };

        yield Method.getProductMappingCode(data, context);
        t.fail('should return validation error');
    } catch (err) {
        t.deepEqual(err.message, '"total_data" is not allowed');
    }
});

test.serial('[SUCCESS] List Product Mapping', function* (t) {
    t.context.sandbox.stub(ProductMappingRepo, 'findAllMapping').resolves(getMappingStub);
    t.context.sandbox.stub(ProductVariantRepo, 'findBySkusWithPagination').resolves(productVariantDetailStub);
    t.context.sandbox.stub(ProductVariantRepo, 'countBySkus').resolves(totalDataStub);
    t.context.sandbox.stub(AttributeCodeRepo, 'findWithValue').resolves(attributeCodeStub);

    try {
        const result = yield Method.getProductMappingCode(dataList, context);
        const expected = {
            data: [{
                sku: [{
                    category_name: '', long_name: '', manufacturer_code: undefined, mapped: undefined, material_code: undefined, material_group: undefined, primary_image: '', uom_bizzy: 'uomBizzyName', sku: '93VN03AVNO', uom: '0', quantity_stocking_uom: 0, specifications: [{ code: '', value: '' }]
                }, {
                    category_name: '', long_name: '', manufacturer_code: undefined, mapped: undefined, material_code: undefined, material_group: undefined, primary_image: '', uom_bizzy: '', sku: 'TRG8QVK5SI', uom: '0', quantity_stocking_uom: 0, specifications: [{ code: '', value: '' }]
                }]
            }],
            meta: {
                page: 1, limit: 10, total_data: 2, total_page: 1
            }
        };

        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('[SUCCESS] List Product Mapping Return Empty', function* (t) {
    const dataList2 = {
        query: {
            page: 1,
            search: 'asdwaj',
            limit: 10
        }
    };
    const productVariantDetailStub2 = [];

    t.context.sandbox.stub(ProductMappingRepo, 'findAllMapping').resolves(getMappingStub);
    t.context.sandbox.stub(ProductVariantRepo, 'findBySkusWithPagination').resolves(productVariantDetailStub2);
    t.context.sandbox.stub(ProductVariantRepo, 'countBySkus').resolves(0);
    t.context.sandbox.stub(AttributeCodeRepo, 'findWithValue').resolves(attributeCodeStub);

    try {
        const result = yield Method.getProductMappingCode(dataList2, context);
        const expected = {
            data: [
                {

                    sku: []
                }
            ],
            meta: {
                page: 1,
                limit: 10,
                total_data: 0,
                total_page: 0
            }
        };

        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err.message);
    }
});

// test: getProductMappingBySkuCatalogId
test.serial('getProductMappingBySkuCatalogId: have no auth', function* (t) {
    try {
        yield Method.getProductMappingBySkuCatalogId(getProductMappingBySkuCatalogIdJson, {});
        t.fail('should return have no authorization');
    } catch (err) {
        t.deepEqual(err.message, 'You have no authorization access');
    }
});

test.serial('getProductMappingBySkuCatalogId: successfuly', function* (t) {
    t.context.sandbox.stub(ProductVariantRepo, 'findBySkus').resolves(productVariantDetailStub);
    t.context.sandbox.stub(ProductMappingRepo, 'findAllMapping').resolves(getMappingStub);

    try {
        const data = cloneDeep(getProductMappingBySkuCatalogIdJson);
        data.body.skus = '93VN03AVNO,TRG8QVK5SI';

        const result = yield Method.getProductMappingBySkuCatalogId(data, context);
        const expected = {
            data: {
                skus: [
                    {
                        payload: {
                            manufacturer_code: undefined,
                            mapped: undefined,
                            material_code: undefined,
                            material_group: undefined,
                            organization_id: undefined,
                            quantity_stocking_uom: undefined,
                            uom: undefined,
                            uom_bizzy: 'uomBizzyName'
                        },
                        product_sku: '93VN03AVNO'
                    },
                    {
                        payload: {
                            manufacturer_code: undefined,
                            mapped: undefined,
                            material_code: undefined,
                            material_group: undefined,
                            organization_id: undefined,
                            quantity_stocking_uom: undefined,
                            uom: undefined,
                            uom_bizzy: ''
                        },
                        product_sku: 'TRG8QVK5SI'
                    }
                ]
            },
            meta: {}
        };

        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('getProductMappingBySkuCatalogId: throw NotFound when getMapping.find()', function* (t) {
    t.context.sandbox.stub(ProductVariantRepo, 'findBySkus').resolves(productVariantDetailStub);
    t.context.sandbox.stub(ProductMappingRepo, 'findAllMapping').resolves(getMappingStub);

    try {
        const data = cloneDeep(getProductMappingBySkuCatalogIdJson);
        data.body.skus = '93VN03AVNO,TRG8QVK5SI,ZXG8QVK5SO';

        yield Method.getProductMappingBySkuCatalogId(data, context);

        t.fail('should be throw NotFound when getMapping.find');
    } catch (err) {
        t.pass();
    }
});

test.serial('getProductMappingBySkuCatalogId: throw NotFound when ProductMappingRepo.findAllMapping()', function* (t) {
    const getMappingStub2 = [];

    t.context.sandbox.stub(ProductVariantRepo, 'findBySkus').resolves(productVariantDetailStub);
    t.context.sandbox.stub(ProductMappingRepo, 'findAllMapping').resolves(getMappingStub2);

    try {
        const data = cloneDeep(getProductMappingBySkuCatalogIdJson);
        data.body.skus = '93VN03AVNO,TRG8QVK5SI,ZXG8QVK5SO';

        yield Method.getProductMappingBySkuCatalogId(data, context);

        t.fail('should be throw NotFound when ProductMappingRepo.findAllMapping');
    } catch (err) {
        t.is(err.message, 'Products not found');
    }
});

test.serial('getProductMappingBySkuCatalogId: throw BadRequest validate', function* (t) {
    try {
        const data = cloneDeep(getProductMappingBySkuCatalogIdJson);
        data.body.skus = '';

        yield Method.getProductMappingBySkuCatalogId(data, context);

        t.fail('should be throw BadRequest validate');
    } catch (err) {
        t.pass();
    }
});


// test: getSkusByMaterialCodeGroup
test.serial('getSkusByMaterialCodeGroup: successfuly', function* (t) {
    const distinctByStub = {};
    t.context.sandbox.stub(ProductMappingRepo, 'distinctBy').resolves(distinctByStub);

    try {
        const data = require('../../../mocks/getSkusByMaterialCodeGroup');

        const result = yield Method.getSkusByMaterialCodeGroup(data, context);
        const expected = { data: { product_skus: {} } };

        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('getSkusByMaterialCodeGroup: throw BadRequest validate', function* (t) {
    const distinctByStub = {};
    t.context.sandbox.stub(ProductMappingRepo, 'distinctBy').resolves(distinctByStub);

    try {
        const data = require('../../../mocks/getSkusByMaterialCodeGroup');
        data.query.product_skus = '';

        yield Method.getSkusByMaterialCodeGroup(data, context);
        t.fail('test failed: should be throw BadRequest validate');
        // eslint-disable-next-line no-unused-vars
    } catch (err) {
        t.pass();
    }
});

test.serial('getSkusByMaterialCodeGroup: throw Forbidden Authorization', function* (t) {
    try {
        yield Method.getSkusByMaterialCodeGroup({}, {});
        t.fail('test failed: should be throw Forbidden Authorization');
        // eslint-disable-next-line no-unused-vars
    } catch (err) {
        t.pass();
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
