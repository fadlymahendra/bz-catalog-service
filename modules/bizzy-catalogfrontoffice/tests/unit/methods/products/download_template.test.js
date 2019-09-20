'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const cloneDeep = require('clone-deep');
const { BizzyError, BizzyService, DBContext } = require('bizzy-common');

const BrandRepo = require('../../../../src/repositories/brand');
const UomRepo = require('../../../../src/repositories/uom');
const StockUomRepo = require('../../../../src/repositories/stocking_uom');
const CategoryRepo = require('../../../../src/repositories/category');
const ProductVendorRepo = require('../../../../src/repositories/product_vendor');
const AttributeCodeRepo = require('../../../../src/repositories/attribute_code');
const AttributeValueRepo = require('../../../../src/repositories/attribute_value');
const S3Bucket = require('../../../../src/utils/s3_bucket');

const Methods = require('../../../../src/methods/products/download_template');

const validPayload = {
    path: {
        id: 3
    },
    query: {
        brand_id: 1,
        c0: '222',
        search: 's',
        is_active: '1',
        stock: '0'
    }
};

const validPayloadQR = {
    path: {
        id: 73
    },
    query: {
        brand_id: 1,
        c0: '222',
        search: 's',
        is_active: 1,
        stock: 0
    }
};

const invalidPayload = {
    path: {
        ids: 3
    }
};

const validContext = require('../../../mocks/context.json');
const validContextQR = require('../../../mocks/contextQR.json');

const resBrand = [
    {
        id: 1,
        name: 'Samsung'
    },
    {
        id: 2,
        name: 'Apple'
    }
];
const resUom = [
    {
        id: 1,
        name: 'Box'
    }
];
const resStockUom = [
    {
        id: 1,
        name: 'Pcs'
    }
];
const resCategory = [
    {
        id: 1,
        name: 'Electronic',
        level: 'C3',
        unspsc: '11002212'
    },
    {
        id: 2,
        name: 'Phone and Communication',
        level: 'C3',
        unspsc: '11002213'
    }
];
const pvendor = {
    count: 4,
    rows: [{
        id: 22,
        product_variant_id: 10,
        vendor_id: 3,
        warehouse_id: 11,
        location_label: 'Jakarta',
        stock_available: 1,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: 111,
        tier_min_qty_2: 222,
        tier_min_qty_3: 333,
        tier_cogs_price_1: '444.00',
        tier_cogs_price_2: '555.00',
        tier_cogs_price_3: '666.00',
        warranty_option: 'official_warranty',
        warranty_period: 'month',
        warranty_limit: 1,
        warranty_coverage: 'Box',
        indent_period: 'week',
        indent_limit: 2,
        reference_link: '["http://google.com","http://facebook.com"]',
        sku_vendor: '111111111',
        is_indent: 1,
        is_active: 1,
        created_by: 3,
        created_at: '2018-01-16T02:59:03.000Z',
        ProductVariant: {
            id: 8,
            long_name: 'Apple iPhone 7 - Gold - 128GB',
            sku: 'DC8JLF43ND',
            product_group_id: 2,
            variant_value: '{"phone_color":2}',
            primary_image: 'http://localhost/testing/testing_image.jpg',
            ProductGroup: {
                id: 2,
                name: 'Apple iPhone 7',
                category_id: 561,
                brand_id: 81,
                Brand: { id: 81, name: 'Apple' },
                Category: {
                    id: 561,
                    name: 'Mobile phones',
                    level: 'C3',
                    parent_id: 219,
                    Category: {
                        id: 219,
                        name: 'Personal communication devices',
                        level: 'C2',
                        parent_id: 52,
                        Category: {
                            id: 52,
                            name: 'Communications Devices & Accessories',
                            level: 'C1',
                            parent_id: 8,
                            Category: {
                                id: 8,
                                name: 'IT and Mobile Devices',
                                level: 'C0'
                            }
                        }
                    }
                }
            }
        }
    },
    {
        id: 22,
        product_variant_id: 10,
        vendor_id: 3,
        warehouse_id: 11,
        location_label: 'Jakarta',
        stock_available: 1,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: 111,
        tier_min_qty_2: 222,
        tier_min_qty_3: 333,
        tier_cogs_price_1: '444.00',
        tier_cogs_price_2: '555.00',
        tier_cogs_price_3: '666.00',
        warranty_option: 'official_warranty',
        warranty_period: 'month',
        warranty_limit: 1,
        warranty_coverage: 'Box',
        indent_period: 'week',
        indent_limit: 2,
        reference_link: '["http://google.com","http://facebook.com"]',
        sku_vendor: '111111111',
        is_indent: 1,
        is_active: 1,
        created_by: 3,
        created_at: '2018-01-16T02:59:03.000Z',
        ProductVariant: {
            id: 8,
            long_name: 'Apple iPhone 7 - Gold - 128GB',
            sku: 'DC8JLF43ND',
            product_group_id: 2,
            variant_value: '{"phone_color":2}',
            primary_image: 'http://localhost/testing/testing_image.jpg',
            ProductGroup: {
                id: 2,
                name: 'Apple iPhone 7',
                category_id: 561,
                brand_id: 81,
                Brand: { id: 81, name: 'Apple' },
                Category: {
                    id: 561,
                    name: 'Mobile phones',
                    level: 'C3',
                    parent_id: 219,
                    Category: {
                        id: 219,
                        name: 'Personal communication devices',
                        level: 'C2',
                        parent_id: 52,
                        Category: {
                            id: 52,
                            name: 'Communications Devices & Accessories',
                            level: 'C1',
                            parent_id: 8,
                            Category: {
                                id: 8,
                                name: 'IT and Mobile Devices',
                                level: 'C0'
                            }
                        }
                    }
                }
            }
        }
    }]
};

const countresProductVendor = 4;
const resProductVendor = pvendor.rows;

const resAttributeCode = [
    {
        id: 5,
        label: 'Warna',
        code: 'phone_color',
        type: 'dropdown'
    },
    {
        id: 6,
        label: 'Kapasitas',
        code: 'phone_storage',
        type: 'dropdown'
    }
];
const resAttributeValue = [
    {
        id: 1,
        attribute_code_id: 5,
        value: 'Silver',
        is_deleted: 0
    },
    {
        id: 2,
        attribute_code_id: 6,
        value: '64GB',
        is_deleted: 0
    }
];

test.serial('Successfull Download Template Upload', function* (t) {
    t.context.sandbox.stub(BrandRepo, 'findAll').resolves(resBrand);
    t.context.sandbox.stub(UomRepo, 'findAll').resolves(resUom);
    t.context.sandbox.stub(StockUomRepo, 'findAll').resolves(resStockUom);
    t.context.sandbox.stub(CategoryRepo, 'findAll').resolves(resCategory);
    t.context.sandbox.stub(S3Bucket, 'uploads3').resolves({
        Location: 'http://location.xlxs'
    });

    try {
        yield Methods.downloadTemplateUpload(validPayload, validContext);
        t.pass();
    } catch (err) {
        console.log(err.message);
        t.fail();
    }
});

test.serial('Successfull Download Template Update', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(BrandRepo, 'findAll').resolves(resBrand);
    t.context.sandbox.stub(UomRepo, 'findAll').resolves(resUom);
    t.context.sandbox.stub(StockUomRepo, 'findAll').resolves(resStockUom);
    t.context.sandbox.stub(CategoryRepo, 'findAll').resolves(resCategory);
    t.context.sandbox.stub(S3Bucket, 'uploads3').resolves({
        Location: 'http://location.xlxs'
    });

    t.context.sandbox.stub(AttributeCodeRepo, 'findAll').resolves(resAttributeCode);
    t.context.sandbox.stub(AttributeValueRepo, 'findAll').resolves(resAttributeValue);

    t.context.sandbox.stub(ProductVendorRepo, 'countProductVendorWithDetail').resolves(countresProductVendor);
    t.context.sandbox.stub(ProductVendorRepo, 'findAllProductVendorWithDetail').resolves(resProductVendor);

    try {
        yield Methods.downloadTemplateUpdate(validPayload, validContext);
        t.pass();
    } catch (err) {
        console.log(err.message);
        t.fail();
    }
});

test.serial('Successfull Download Template Update with QR company, contract found', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(BrandRepo, 'findAll').resolves(resBrand);
    t.context.sandbox.stub(UomRepo, 'findAll').resolves(resUom);
    t.context.sandbox.stub(StockUomRepo, 'findAll').resolves(resStockUom);
    t.context.sandbox.stub(CategoryRepo, 'findAll').resolves(resCategory);
    t.context.sandbox.stub(S3Bucket, 'uploads3').resolves({
        Location: 'http://location.xlxs'
    });

    t.context.sandbox.stub(AttributeCodeRepo, 'findAll').resolves(resAttributeCode);
    t.context.sandbox.stub(AttributeValueRepo, 'findAll').resolves(resAttributeValue);

    t.context.sandbox.stub(ProductVendorRepo, 'countProductVendorWithDetail').resolves(countresProductVendor);
    t.context.sandbox.stub(ProductVendorRepo, 'findAllProductVendorWithDetail').resolves(resProductVendor);
    t.context.sandbox.stub(BizzyService, 'callSync').resolves({
        data: [
            {
                sku: 'DC8JLF43ND',
                min_qty: 1,
                cogs: '1000'
            }
        ]
    });
    try {
        yield Methods.downloadTemplateUpdate(validPayloadQR, validContextQR);
        t.pass();
    } catch (err) {
        console.log(err.message);
        t.fail();
    }
});

test.serial('Successfull Download Template Update with QR company, no contract', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(BrandRepo, 'findAll').resolves(resBrand);
    t.context.sandbox.stub(UomRepo, 'findAll').resolves(resUom);
    t.context.sandbox.stub(StockUomRepo, 'findAll').resolves(resStockUom);
    t.context.sandbox.stub(CategoryRepo, 'findAll').resolves(resCategory);
    t.context.sandbox.stub(S3Bucket, 'uploads3').resolves({
        Location: 'http://location.xlxs'
    });

    t.context.sandbox.stub(AttributeCodeRepo, 'findAll').resolves(resAttributeCode);
    t.context.sandbox.stub(AttributeValueRepo, 'findAll').resolves(resAttributeValue);

    t.context.sandbox.stub(ProductVendorRepo, 'countProductVendorWithDetail').resolves(countresProductVendor);
    t.context.sandbox.stub(ProductVendorRepo, 'findAllProductVendorWithDetail').resolves(resProductVendor);
    t.context.sandbox.stub(BizzyService, 'callSync').resolves({
        data: [
            {
                sku: 'AA0011',
                min_qty: 1,
                cogs: '1000'
            }
        ]
    });
    try {
        yield Methods.downloadTemplateUpdate(validPayloadQR, validContextQR);
        t.pass();
    } catch (err) {
        console.log(err.message);
        t.fail();
    }
});

test.serial('test requestQuery is empty', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(BrandRepo, 'findAll').resolves(resBrand);
    t.context.sandbox.stub(UomRepo, 'findAll').resolves(resUom);
    t.context.sandbox.stub(StockUomRepo, 'findAll').resolves(resStockUom);
    t.context.sandbox.stub(CategoryRepo, 'findAll').resolves(resCategory);
    t.context.sandbox.stub(S3Bucket, 'uploads3').resolves({
        Location: 'http://location.xlxs'
    });

    t.context.sandbox.stub(AttributeCodeRepo, 'findAll').resolves(resAttributeCode);
    t.context.sandbox.stub(AttributeValueRepo, 'findAll').resolves(resAttributeValue);

    const resProductVendor2 = cloneDeep(resProductVendor);
    resProductVendor2[0].ProductVariant.variant_value = 'NO_VARIANT';
    resProductVendor2[1].ProductVariant.variant_value = 'NO_VARIANT';
    t.context.sandbox.stub(ProductVendorRepo, 'countProductVendorWithDetail').resolves(countresProductVendor);
    t.context.sandbox.stub(ProductVendorRepo, 'findAllProductVendorWithDetail').resolves(resProductVendor2);

    try {
        const validPayload2 = cloneDeep(validPayload);
        validPayload2.query.search = '';
        validPayload2.query.c0 = '';
        validPayload2.query.brand_id = '';

        yield Methods.downloadTemplateUpdate(validPayload2, validContext);
        t.pass();
    } catch (err) {
        console.log(err.message);
        t.fail();
    }
});

test.serial('Failed: (result.rows.length == 0)', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(BrandRepo, 'findAll').resolves(resBrand);
    t.context.sandbox.stub(UomRepo, 'findAll').resolves(resUom);
    t.context.sandbox.stub(StockUomRepo, 'findAll').resolves(resStockUom);
    t.context.sandbox.stub(CategoryRepo, 'findAll').resolves(resCategory);
    t.context.sandbox.stub(S3Bucket, 'uploads3').resolves({
        Location: 'http://location.xlxs'
    });

    t.context.sandbox.stub(AttributeCodeRepo, 'findAll').resolves(resAttributeCode);
    t.context.sandbox.stub(AttributeValueRepo, 'findAll').resolves(resAttributeValue);

    // const resProductVendor2 = cloneDeep(resProductVendor);
    const resProductVendor2 = [];
    t.context.sandbox.stub(ProductVendorRepo, 'countProductVendorWithDetail').resolves(2001);
    t.context.sandbox.stub(ProductVendorRepo, 'findAllProductVendorWithDetail').resolves(resProductVendor2);


    try {
        yield Methods.downloadTemplateUpdate(validPayload, validContext);
        t.fail('test failed: should be throw BizzyError.BadRequest');
    } catch (err) {
        const expected = 'Maaf, jumlah produk yang anda mencoba unduh (2001 produk) ‌melebihi batas 2000 jumlah produk';
        t.is(err.message, expected);
        t.pass();
    }
});

test.serial('Failed Download Template Upload, Unauthorized', function* (t) {
    t.context.sandbox.stub(BrandRepo, 'findAll').resolves(resBrand);
    t.context.sandbox.stub(UomRepo, 'findAll').resolves(resUom);
    t.context.sandbox.stub(StockUomRepo, 'findAll').resolves(resStockUom);
    t.context.sandbox.stub(CategoryRepo, 'findAll').resolves(resCategory);
    t.context.sandbox.stub(S3Bucket, 'uploads3').resolves({
        Location: 'http://location.xlxs'
    });

    t.context.sandbox.stub(AttributeCodeRepo, 'findAll').resolves(resAttributeCode);
    t.context.sandbox.stub(AttributeValueRepo, 'findAll').resolves(resAttributeValue);

    t.context.sandbox.stub(ProductVendorRepo, 'findProductVendorWithDetail').resolves(resProductVendor);

    try {
        yield Methods.downloadTemplateUpload(validPayload, {});
        console.log('Should return BadRequest');
        t.fail();
    } catch (err) {
        t.pass();
    }
});

test.serial('Failed Download Template Update, Unauthorized', function* (t) {
    t.context.sandbox.stub(BrandRepo, 'findAll').resolves(resBrand);
    t.context.sandbox.stub(UomRepo, 'findAll').resolves(resUom);
    t.context.sandbox.stub(StockUomRepo, 'findAll').resolves(resStockUom);
    t.context.sandbox.stub(CategoryRepo, 'findAll').resolves(resCategory);
    t.context.sandbox.stub(S3Bucket, 'uploads3').resolves({
        Location: 'http://location.xlxs'
    });

    t.context.sandbox.stub(AttributeCodeRepo, 'findAll').resolves(resAttributeCode);
    t.context.sandbox.stub(AttributeValueRepo, 'findAll').resolves(resAttributeValue);

    t.context.sandbox.stub(ProductVendorRepo, 'countProductVendorWithDetail').resolves(countresProductVendor);
    t.context.sandbox.stub(ProductVendorRepo, 'findAllProductVendorWithDetail').resolves(resProductVendor);

    try {
        yield Methods.downloadTemplateUpdate(validPayload, {});
        console.log('Should return BadRequest');
        t.fail();
    } catch (err) {
        t.pass();
    }
});

test.serial('Failed Download Template Upload, Invalid Payload', function* (t) {
    t.context.sandbox.stub(BrandRepo, 'findAll').resolves(resBrand);
    t.context.sandbox.stub(UomRepo, 'findAll').resolves(resUom);
    t.context.sandbox.stub(StockUomRepo, 'findAll').resolves(resStockUom);
    t.context.sandbox.stub(CategoryRepo, 'findAll').resolves(resCategory);
    t.context.sandbox.stub(S3Bucket, 'uploads3').resolves({
        Location: 'http://location.xlxs'
    });

    t.context.sandbox.stub(AttributeCodeRepo, 'findAll').resolves(resAttributeCode);
    t.context.sandbox.stub(AttributeValueRepo, 'findAll').resolves(resAttributeValue);

    t.context.sandbox.stub(ProductVendorRepo, 'findProductVendorWithDetail').resolves(resProductVendor);

    try {
        yield Methods.downloadTemplateUpload({
            path: {
                id: 3,
                product_group_id: 1
            }
        }, validContext);
        console.log('Should return BadRequest');
        t.fail();
    } catch (err) {
        t.pass();
    }
});

test.serial('Failed Download Template Update, Invalid Payload', function* (t) {
    t.context.sandbox.stub(BrandRepo, 'findAll').resolves(resBrand);
    t.context.sandbox.stub(UomRepo, 'findAll').resolves(resUom);
    t.context.sandbox.stub(StockUomRepo, 'findAll').resolves(resStockUom);
    t.context.sandbox.stub(CategoryRepo, 'findAll').resolves(resCategory);
    t.context.sandbox.stub(S3Bucket, 'uploads3').resolves({
        Location: 'http://location.xlxs'
    });

    t.context.sandbox.stub(AttributeCodeRepo, 'findAll').resolves(resAttributeCode);
    t.context.sandbox.stub(AttributeValueRepo, 'findAll').resolves(resAttributeValue);

    t.context.sandbox.stub(ProductVendorRepo, 'countProductVendorWithDetail').resolves(countresProductVendor);
    t.context.sandbox.stub(ProductVendorRepo, 'findAllProductVendorWithDetail').resolves(resProductVendor);


    try {
        yield Methods.downloadTemplateUpdate({
            path: {
                id: 3,
                product_group_id: 1
            }
        }, validContext);
        console.log('Should return BadRequest');
        t.fail();
    } catch (err) {
        t.pass();
    }
});

test.before('Initialize BizzyError Before All Tests', (t) => {
    BizzyError.initializeErrors();
});
test.beforeEach('Initialize New Sandbox Before Each Test', (t) => {
    t.context.sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
});
test.afterEach.always('Restore Sandbox and Configuration After Each Test', (t) => {
    t.context.sandbox.restore();
});
