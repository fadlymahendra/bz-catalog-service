'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError, BizzyService } = require('bizzy-common');
const ProductVendorRepository = require('../../../../src/repositories/product_vendor');
const Methods = require('../../../../src/methods/products/change_status');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

test.serial('Should be return Success', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findOne').resolves({
        id: 1,
        product_variant_id: 1,
        vendor_id: 3,
        warehouse_id: 99999,
        location_label: 'Jakarta Selatan',
        stock_available: 1000,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: 17,
        tier_min_qty_2: 27,
        tier_min_qty_3: 37,
        tier_cogs_price_1: '147.00',
        tier_cogs_price_2: '247.00',
        tier_cogs_price_3: '347.00',
        warranty_option: 'no_warranty',
        warranty_period: null,
        warranty_limit: null,
        warranty_coverage: null,
        indent_period: null,
        indent_limit: null,
        reference_link: '["https://shopee.co.id/Tissue-PASEO-Smart-refill-250s-i.4365729.27241804","https://www.monotaro.id/corp_id/s000001628.html","http://www.lazada.co.id/tisue-paseo-smart-250-sheetx-4-pcs-53402599.html"]',
        sku_vendor: '1QTL64QC6S',
        is_indent: 0,
        is_active: 1,
        created_by: 2,
        created_at: '2018-01-06T10:59:52.000Z',
        updated_at: '2018-01-18T04:16:36.000Z',
        ProductVariant: {
            id: 1,
            product_group_id: 1,
            sku: 'YG6Z71PB0H',
            long_name: 'Tissue Toilet Paseo',
            variant_value: 'NO_VARIANT',
            primary_image: 'https://cf.shopee.co.id/file/d7bafa4b960799c76fb21c7b970b6cc8',
            additional_image: '["https://ecs7.tokopedia.net/img/cache/300/product-1/2017/6/10/1843029/1843029_dbf5e778-bae1-46fe-86e7-acb890bd5aef.jpg","https://ecs7.tokopedia.net/img/cache/700/product-1/2017/6/10/1843029/1843029_ecf9290a-1882-4350-a77e-487b4099dfb0.jpg"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-06T10:43:00.000Z',
            updated_at: '2018-01-13T06:11:14.000Z'
        }
    });
    t.context.sandbox.stub(ProductVendorRepository, 'update').resolves([
        1
    ]);
    t.context.sandbox.stub(ProductVendorRepository, 'findById').resolves({
        id: 1,
        product_variant_id: 1,
        vendor_id: 3,
        warehouse_id: 99999,
        location_label: 'Jakarta Selatan',
        stock_available: 1000,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: 17,
        tier_min_qty_2: 27,
        tier_min_qty_3: 37,
        tier_cogs_price_1: '147.00',
        tier_cogs_price_2: '247.00',
        tier_cogs_price_3: '347.00',
        warranty_option: 'no_warranty',
        warranty_period: null,
        warranty_limit: null,
        warranty_coverage: null,
        indent_period: null,
        indent_limit: null,
        reference_link: '["https://shopee.co.id/Tissue-PASEO-Smart-refill-250s-i.4365729.27241804","https://www.monotaro.id/corp_id/s000001628.html","http://www.lazada.co.id/tisue-paseo-smart-250-sheetx-4-pcs-53402599.html"]',
        sku_vendor: '1QTL64QC6S',
        is_indent: 0,
        is_active: 1,
        created_by: 2,
        created_at: '2018-01-06T10:59:52.000Z',
        updated_at: '2018-01-18T04:16:36.000Z',
        ProductVariant: {
            id: 1,
            product_group_id: 1,
            sku: 'YG6Z71PB0H',
            long_name: 'Tissue Toilet Paseo',
            variant_value: 'NO_VARIANT',
            primary_image: 'https://cf.shopee.co.id/file/d7bafa4b960799c76fb21c7b970b6cc8',
            additional_image: '["https://ecs7.tokopedia.net/img/cache/300/product-1/2017/6/10/1843029/1843029_dbf5e778-bae1-46fe-86e7-acb890bd5aef.jpg","https://ecs7.tokopedia.net/img/cache/700/product-1/2017/6/10/1843029/1843029_ecf9290a-1882-4350-a77e-487b4099dfb0.jpg"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-06T10:43:00.000Z',
            updated_at: '2018-01-13T06:11:14.000Z'
        },
        getValues: function() {
            return this;
        }
    });
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3',
                pid: '1'
            },
            body: {
                is_active: 1
            }
        };

        const result = yield Methods.putProductStatus(data, context);
        const expected = {
            data: {
                id: 1,
                is_active: 1,
                vendor_id: 3,
                warehouse_id: 99999
            },
            message: 'Ubah status product berhasil'
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return Success is active 0', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findOne').resolves({
        id: 1,
        product_variant_id: 1,
        vendor_id: 3,
        warehouse_id: 99999,
        location_label: 'Jakarta Selatan',
        stock_available: 1000,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: 17,
        tier_min_qty_2: 27,
        tier_min_qty_3: 37,
        tier_cogs_price_1: '147.00',
        tier_cogs_price_2: '247.00',
        tier_cogs_price_3: '347.00',
        warranty_option: 'no_warranty',
        warranty_period: null,
        warranty_limit: null,
        warranty_coverage: null,
        indent_period: null,
        indent_limit: null,
        reference_link: '["https://shopee.co.id/Tissue-PASEO-Smart-refill-250s-i.4365729.27241804","https://www.monotaro.id/corp_id/s000001628.html","http://www.lazada.co.id/tisue-paseo-smart-250-sheetx-4-pcs-53402599.html"]',
        sku_vendor: '1QTL64QC6S',
        is_indent: 0,
        is_active: 1,
        created_by: 2,
        created_at: '2018-01-06T10:59:52.000Z',
        updated_at: '2018-01-18T04:16:36.000Z',
        ProductVariant: {
            id: 1,
            product_group_id: 1,
            sku: 'YG6Z71PB0H',
            long_name: 'Tissue Toilet Paseo',
            variant_value: 'NO_VARIANT',
            primary_image: 'https://cf.shopee.co.id/file/d7bafa4b960799c76fb21c7b970b6cc8',
            additional_image: '["https://ecs7.tokopedia.net/img/cache/300/product-1/2017/6/10/1843029/1843029_dbf5e778-bae1-46fe-86e7-acb890bd5aef.jpg","https://ecs7.tokopedia.net/img/cache/700/product-1/2017/6/10/1843029/1843029_ecf9290a-1882-4350-a77e-487b4099dfb0.jpg"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-06T10:43:00.000Z',
            updated_at: '2018-01-13T06:11:14.000Z'
        }
    });
    t.context.sandbox.stub(ProductVendorRepository, 'update').resolves([
        1
    ]);
    t.context.sandbox.stub(ProductVendorRepository, 'findById').resolves({
        id: 1,
        product_variant_id: 1,
        vendor_id: 3,
        warehouse_id: 99999,
        location_label: 'Jakarta Selatan',
        stock_available: 1000,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: 17,
        tier_min_qty_2: 27,
        tier_min_qty_3: 37,
        tier_cogs_price_1: '147.00',
        tier_cogs_price_2: '247.00',
        tier_cogs_price_3: '347.00',
        warranty_option: 'no_warranty',
        warranty_period: null,
        warranty_limit: null,
        warranty_coverage: null,
        indent_period: null,
        indent_limit: null,
        reference_link: '["https://shopee.co.id/Tissue-PASEO-Smart-refill-250s-i.4365729.27241804","https://www.monotaro.id/corp_id/s000001628.html","http://www.lazada.co.id/tisue-paseo-smart-250-sheetx-4-pcs-53402599.html"]',
        sku_vendor: '1QTL64QC6S',
        is_indent: 0,
        is_active: 0,
        created_by: 2,
        created_at: '2018-01-06T10:59:52.000Z',
        updated_at: '2018-01-18T04:16:36.000Z',
        ProductVariant: {
            id: 1,
            product_group_id: 1,
            sku: 'YG6Z71PB0H',
            long_name: 'Tissue Toilet Paseo',
            variant_value: 'NO_VARIANT',
            primary_image: 'https://cf.shopee.co.id/file/d7bafa4b960799c76fb21c7b970b6cc8',
            additional_image: '["https://ecs7.tokopedia.net/img/cache/300/product-1/2017/6/10/1843029/1843029_dbf5e778-bae1-46fe-86e7-acb890bd5aef.jpg","https://ecs7.tokopedia.net/img/cache/700/product-1/2017/6/10/1843029/1843029_ecf9290a-1882-4350-a77e-487b4099dfb0.jpg"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-06T10:43:00.000Z',
            updated_at: '2018-01-13T06:11:14.000Z'
        },
        getValues: function() {
            return this;
        }
    });
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3',
                pid: '1'
            },
            body: {
                is_active: 0
            }
        };

        const result = yield Methods.putProductStatus(data, context);
        const expected = {
            data: {
                id: 1,
                is_active: 0,
                vendor_id: 3,
                warehouse_id: 99999
            },
            message: 'Ubah status product berhasil'
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return Product Not Found', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findOne').resolves(null);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3',
                pid: '1213243435'
            },
            body: {
                is_active: 1
            }
        };

        yield Methods.putProductStatus(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'Product Not Found');
    }
});

test.serial('Should be return authorized user', function* (t) {
    try {
        const context = {
            user: ''
        };
        const data = {
            path: {
                id: '3',
                pid: '1'
            },
            body: {
                is_active: 1
            }
        };

        yield Methods.putProductStatus(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, 'You are not authorized user');
    }
});

test.serial('Should be return Bad Request', function* (t) {
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3',
                pid: ''
            },
            body: {
                is_active: 1
            }
        };

        yield Methods.putProductStatus(data, context);
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
