'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { DBContext, BizzyError, BizzyService } = require('bizzy-common');
const ZLib = require('zlib');

const Helper = require('../../../../src/utils/helper');

const Methods = require('../../../../src/methods/sku-managements/delete');
const ProductVariantRepo = require('../../../../src/repositories/product_variant');
const ProductVendorRepo = require('../../../../src/repositories/product_vendor');
const ProductGroupRepo = require('../../../../src/repositories/product_group');

const contextStub = {
    user: {
        username: 'admin@bizzy.co.id',
        first_name: 'Admin',
        last_name: 'Bizzy',
        scope: 'organization',
        employee: {
            id: 2,
            name: 'Admin Bizzy',
            team: 'Technology',
            roles: [
                {
                    id: 11,
                    name: 'Super Admin'
                }
            ]
        },
        iat: 1514477786,
        exp: 1514479586
    }
};

const dataPayload = {
    purchase_order_no: 'PO-7141544775108524',
    data: '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'
};

const unzipPayloadStub = {
    purchase_request_no: 'PR-1544775107749',
    purchase_order: {
        PurchaseOrderItems: [
            { sku_no: 'FRE01234001' },
            { sku_no: 'FRE01234002' }
        ]
    },
    sales_order: {},
    erpPayload: []
};

const findAllVariantStub = [
    {
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
        is_active: 0,
        created_by: null,
        created_at: '2018-01-06T10:43:00.000Z',
        updated_at: '2019-02-12T08:22:18.000Z'
    }
];

const findByVariantVendorStub = [{
    id: 16, product_variant_id: 1, vendor_id: 4, warehouse_id: 4, location_label: 'Jawa Barat', stock_available: '9999.99', stock_used: '0.00', stock_reserved: '0.00', currency: 'IDR', tier_min_qty_1: 1, tier_min_qty_2: 4, tier_min_qty_3: 8, tier_cogs_price_1: '500.00', tier_cogs_price_2: '400.00', tier_cogs_price_3: '300.00', warranty_option: 'no_warranty', warranty_period: null, warranty_limit: 1, warranty_coverage: null, indent_period: null, indent_limit: null, reference_link: '[]', sku_vendor: '6JF21KPQDD', is_indent: 0, is_active: 0, created_by: 4, is_contract: 0, customer_id: null, created_at: '2018-01-18T07:37:43.000Z', updated_at: '2019-02-12T08:26:58.000Z'
}, {
    id: 83, product_variant_id: 1, vendor_id: 322, warehouse_id: 139, location_label: 'Jakarta', stock_available: '337.00', stock_used: '663.00', stock_reserved: '0.00', currency: 'IDR', tier_min_qty_1: 1, tier_min_qty_2: 100, tier_min_qty_3: 200, tier_cogs_price_1: '13000.00', tier_cogs_price_2: '12800.00', tier_cogs_price_3: '12500.00', warranty_option: 'no_warranty', warranty_period: null, warranty_limit: null, warranty_coverage: null, indent_period: null, indent_limit: null, reference_link: '[]', sku_vendor: '1234', is_indent: 0, is_active: 0, created_by: 916, is_contract: 0, customer_id: null, created_at: '2018-05-18T04:44:28.000Z', updated_at: '2019-02-12T08:26:58.000Z'
}, {
    id: 1, product_variant_id: 1, vendor_id: 2, warehouse_id: 2, location_label: 'Jakarta', stock_available: '800.00', stock_used: '300.00', stock_reserved: '0.00', currency: 'IDR', tier_min_qty_1: 100, tier_min_qty_2: 200, tier_min_qty_3: 300, tier_cogs_price_1: '15000.00', tier_cogs_price_2: '12500.00', tier_cogs_price_3: '11000.00', warranty_option: 'no_warranty', warranty_period: null, warranty_limit: null, warranty_coverage: null, indent_period: null, indent_limit: null, reference_link: '["https://shopee.co.id/Tissue-PASEO-Smart-refill-250s-i.4365729.27241804","https://www.monotaro.id/corp_id/s000001628.html","http://www.lazada.co.id/tisue-paseo-smart-250-sheetx-4-pcs-53402599.html"]', sku_vendor: '1QTL64QC6S', is_indent: 0, is_active: 0, created_by: 2, is_contract: 0, customer_id: null, created_at: '2018-01-06T10:59:52.000Z', updated_at: '2019-02-12T08:26:58.000Z'
}, {
    id: 137, product_variant_id: 1, vendor_id: 3, warehouse_id: 3, location_label: 'Gudang Merdeka', stock_available: '1.00', stock_used: '0.00', stock_reserved: '0.00', currency: 'IDR', tier_min_qty_1: 1, tier_min_qty_2: null, tier_min_qty_3: null, tier_cogs_price_1: '20000.00', tier_cogs_price_2: null, tier_cogs_price_3: null, warranty_option: 'no_warranty', warranty_period: null, warranty_limit: null, warranty_coverage: null, indent_period: null, indent_limit: null, reference_link: null, sku_vendor: 'X113', is_indent: 0, is_active: 0, created_by: 3, is_contract: 0, customer_id: null, created_at: '2018-09-18T08:05:56.000Z', updated_at: '2019-02-12T08:26:58.000Z'
}];

const findAllGroupStub = [{
    id: 1, name: 'Tissue Toilet Paseo', category_id: 444, brand_id: 1194, uom_id: 3, stocking_uom_id: 7, quantity_stocking_uom: '1.00', manufacturing_number: 'MPN5061025', manufacturing_number_type: null, package_weight: 100, package_length: '23.00', package_width: '11.00', package_height: '9.00', package_content: 'Toilet paper and toilet paper holder.', barcode: '9780201379624', description: 'Bila kita selesai makan makanan yang berminyak dan sedang tidak berada di rumah, maka yang paling di cari adalah lembaran tisu yang dapat anda gunakan untuk membersihkan sisa kotoran pada tangan. Tisu juga dapat berperan untuk mengeringkan tangan atau banyak lagi manfaat dari tisu yang sejarang ini telah banyak di gunakan. salah satu produk tisu yang banyak di cari adalah tisu Paseo.', primary_image: 'https://cf.shopee.co.id/file/d7bafa4b960799c76fb21c7b970b6cc8', variant_count: 0, variant_matrix: '[]', is_bulk: 0, status: 0, visibility: 0, created_by: 2, created_at: '2017-12-19T00:00:00.000Z', updated_at: '2019-02-12T08:27:27.000Z'
}];


test.serial('deletePrivateSku: Should be return Success', function* (t) {
    const unzipPayloadStub2 = Helper.jsonCopy(unzipPayloadStub);
    t.context.sandbox.mock(Methods).expects('unzipPayloadDeletePrivateSku').returns(unzipPayloadStub2);

    t.context.sandbox.stub(ProductVariantRepo, 'findAll').resolves(findAllVariantStub);
    t.context.sandbox.stub(ProductVendorRepo, 'findByVariant').resolves(findByVariantVendorStub);
    t.context.sandbox.stub(ProductGroupRepo, 'findAll').resolves(findAllGroupStub);

    t.context.sandbox.stub(ProductVariantRepo, 'update').resolves(1);
    t.context.sandbox.stub(ProductVendorRepo, 'updateMany').resolves(1);
    t.context.sandbox.stub(ProductGroupRepo, 'update').resolves(1);

    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(1);

    try {
        const result = yield Methods.deletePrivateSku(dataPayload, contextStub);
        const expected = {
            data: {
                total_product_group: 1,
                total_product_variant: 1,
                total_product_vendor: 4,
                message: 'Already success delete sku private'
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err);
        console.log('---> ', err);
    }
});

test.serial('deletePrivateSku: Should be return Success with findVendors.length is 0', function* (t) {
    const unzipPayloadStub2 = Helper.jsonCopy(unzipPayloadStub);
    t.context.sandbox.mock(Methods).expects('unzipPayloadDeletePrivateSku').returns(unzipPayloadStub2);

    const findByVariantVendorStub2 = [];

    t.context.sandbox.stub(ProductVariantRepo, 'findAll').resolves(findAllVariantStub);
    t.context.sandbox.stub(ProductVendorRepo, 'findByVariant').resolves(findByVariantVendorStub2);
    t.context.sandbox.stub(ProductGroupRepo, 'findAll').resolves(findAllGroupStub);

    t.context.sandbox.stub(ProductVariantRepo, 'update').resolves(1);
    t.context.sandbox.stub(ProductVendorRepo, 'updateMany').resolves(1);
    t.context.sandbox.stub(ProductGroupRepo, 'update').resolves(1);

    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(1);

    try {
        const result = yield Methods.deletePrivateSku(dataPayload, contextStub);
        const expected = {
            data: {
                total_product_group: 1,
                total_product_variant: 1,
                total_product_vendor: 0,
                message: 'Already success delete sku private'
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err);
        console.log('---> ', err);
    }
});

test.serial('deletePrivateSku: Should be BizzyError.InternalServerError', function* (t) {
    const unzipPayloadStub2 = Helper.jsonCopy(unzipPayloadStub);
    t.context.sandbox.mock(Methods).expects('unzipPayloadDeletePrivateSku').returns(unzipPayloadStub2);

    t.context.sandbox.stub(ProductVariantRepo, 'findAll').resolves(findAllVariantStub);
    t.context.sandbox.stub(ProductVendorRepo, 'findByVariant').resolves(findByVariantVendorStub);
    t.context.sandbox.stub(ProductGroupRepo, 'findAll').resolves(findAllGroupStub);

    t.context.sandbox.stub(ProductVariantRepo, 'update').rejects();
    t.context.sandbox.stub(ProductVendorRepo, 'updateMany').resolves(1);
    t.context.sandbox.stub(ProductGroupRepo, 'update').resolves(1);

    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(1);

    try {
        yield Methods.deletePrivateSku(dataPayload, contextStub);
        t.fail('Should be BizzyError.InternalServerError');
    } catch (err) {
        t.true(err instanceof BizzyError.InternalServerError, '');
    }
});

test.serial('deletePrivateSku: Should be return "Sku Not Found"', function* (t) {
    const unzipPayloadStub2 = Helper.jsonCopy(unzipPayloadStub);
    t.context.sandbox.mock(Methods).expects('unzipPayloadDeletePrivateSku').returns(unzipPayloadStub2);

    const findAllVariantStub2 = null;

    t.context.sandbox.stub(ProductVariantRepo, 'findAll').resolves(findAllVariantStub2);
    t.context.sandbox.stub(ProductVendorRepo, 'findByVariant').resolves(findByVariantVendorStub);
    t.context.sandbox.stub(ProductGroupRepo, 'findAll').resolves(findAllGroupStub);

    t.context.sandbox.stub(ProductVariantRepo, 'update').resolves(1);
    t.context.sandbox.stub(ProductVendorRepo, 'updateMany').resolves(1);
    t.context.sandbox.stub(ProductGroupRepo, 'update').resolves(1);

    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(1);

    try {
        yield Methods.deletePrivateSku(dataPayload, contextStub);
        t.fail('Should be return "Sku Not Found"');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'Sku Not Found');
    }
});

test.serial('deletePrivateSku: Should be return "Sku FRE Not Found"', function* (t) {
    const unzipPayloadStub2 = Helper.jsonCopy(unzipPayloadStub);
    unzipPayloadStub2.purchase_order.PurchaseOrderItems = [];
    t.context.sandbox.mock(Methods).expects('unzipPayloadDeletePrivateSku').returns(unzipPayloadStub2);

    const findAllVariantStub2 = null;

    t.context.sandbox.stub(ProductVariantRepo, 'findAll').resolves(findAllVariantStub2);
    t.context.sandbox.stub(ProductVendorRepo, 'findByVariant').resolves(findByVariantVendorStub);
    t.context.sandbox.stub(ProductGroupRepo, 'findAll').resolves(findAllGroupStub);

    t.context.sandbox.stub(ProductVariantRepo, 'update').resolves(1);
    t.context.sandbox.stub(ProductVendorRepo, 'updateMany').resolves(1);
    t.context.sandbox.stub(ProductGroupRepo, 'update').resolves(1);

    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(1);

    try {
        yield Methods.deletePrivateSku(dataPayload, contextStub);
        t.fail('Should be return "Sku Not Found"');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'Sku FRE Not Found');
    }
});

test.serial('deletePrivateSku: Should be return "Fail to get No. SKU"', function* (t) {
    const unzipPayloadStub2 = Helper.jsonCopy(unzipPayloadStub);
    delete unzipPayloadStub2.purchase_order;

    t.context.sandbox.mock(Methods).expects('unzipPayloadDeletePrivateSku').returns(unzipPayloadStub2);

    const findAllVariantStub2 = null;

    t.context.sandbox.stub(ProductVariantRepo, 'findAll').resolves(findAllVariantStub2);
    t.context.sandbox.stub(ProductVendorRepo, 'findByVariant').resolves(findByVariantVendorStub);
    t.context.sandbox.stub(ProductGroupRepo, 'findAll').resolves(findAllGroupStub);

    t.context.sandbox.stub(ProductVariantRepo, 'update').resolves(1);
    t.context.sandbox.stub(ProductVendorRepo, 'updateMany').resolves(1);
    t.context.sandbox.stub(ProductGroupRepo, 'update').resolves(1);

    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(1);

    try {
        yield Methods.deletePrivateSku(dataPayload, contextStub);
        t.fail('Should be return "Sku Not Found"');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'Fail to get No. SKU');
    }
});

test.serial('deletePrivateSku: Should be BizzyError.BadRequest validate', function* (t) {
    t.context.sandbox.stub(ProductVariantRepo, 'findAll').resolves(findAllVariantStub);
    t.context.sandbox.stub(ProductVendorRepo, 'findByVariant').resolves(findByVariantVendorStub);
    t.context.sandbox.stub(ProductGroupRepo, 'findAll').resolves(findAllGroupStub);

    t.context.sandbox.stub(ProductVariantRepo, 'update').resolves(1);
    t.context.sandbox.stub(ProductVendorRepo, 'updateMany').resolves(1);
    t.context.sandbox.stub(ProductGroupRepo, 'update').resolves(1);

    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(1);

    const data = {
        path: {
            skus: 'YG6Z71PB0H'
        }
    };

    try {
        yield Methods.deletePrivateSku(data, contextStub);
        t.fail('Should be BizzyError.BadRequest validate');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'Joi validate');
    }
});

test.serial('deletePrivateSku: Should be BizzyError.Forbidden Authorization', function* (t) {
    t.context.sandbox.stub(ProductVariantRepo, 'findAll').resolves(findAllVariantStub);
    t.context.sandbox.stub(ProductVendorRepo, 'findByVariant').resolves(findByVariantVendorStub);
    t.context.sandbox.stub(ProductGroupRepo, 'findAll').resolves(findAllGroupStub);

    t.context.sandbox.stub(ProductVariantRepo, 'update').resolves(1);
    t.context.sandbox.stub(ProductVendorRepo, 'updateMany').resolves(1);
    t.context.sandbox.stub(ProductGroupRepo, 'update').resolves(1);

    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(1);

    const data = {
        path: {
            skus: 'YG6Z71PB0H'
        }
    };

    const contextStub2 = Helper.jsonCopy(contextStub);
    contextStub2.user = null;

    try {
        yield Methods.deletePrivateSku(data, contextStub2);
        t.fail('Should be BizzyError.Forbidden Authorization');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, 'You are not authorized user');
    }
});


// unzipPayload
test.serial('unzipPayload: Should be return true', function* (t) {
    const dataPayload2 = Helper.jsonCopy(dataPayload);
    dataPayload2.data = 'H4sIAAAAAAAAE6tWSsvPV7JSSkosUqoFAO/1K/4NAAAA';

    try {
        const result = Methods.unzipPayloadDeletePrivateSku(dataPayload2.data);
        const expected = {
            foo: 'bar'
        };
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err);
        console.log('---> ', err);
    }
});


test.before('Initialize BizzyError Before All Tests', (t) => {
    BizzyError.initializeErrors();
});
test.beforeEach('Initialize New Sandbox Before Each Test', function* (t) {
    t.context.sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();
});
test.afterEach.always('Restore Sandbox and Configuration After Each Test', function* (t) {
    t.context.sandbox.restore();
});
