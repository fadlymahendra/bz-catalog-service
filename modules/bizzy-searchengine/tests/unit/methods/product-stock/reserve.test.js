'use strict';

const Promise = require('bizzy-common');
const { DBContext, BizzyError, BizzyService } = require('bizzy-common');
const test = require('ava');
const sinon = require('sinon');
const ProductVariantRepository = require('../../../../src/repositories/product_variant');
const ProductVendorRepository = require('../../../../src/repositories/product_vendor');
const ProductLogRepository = require('../../../../src/repositories/product_log');
const Methods = require('../../../../src/methods/product-stock/reverse');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

test.serial('Should be return success', function* (t) {
    const mockStartTransaction = t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    const mockRollback = t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    const mockCommit = t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves({
        id: 2,
        product_group_id: 2,
        sku: 'X152KT2GKF',
        long_name: 'Apple iPhone 7 - Black - 64GB',
        variant_value: '{"phone_color":2,"phone_storage":4}',
        primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
        additional_image: null,
        product_id_magento: null,
        product_id_netsuite: null,
        is_primary: 1,
        is_discontinue: 0,
        is_active: 1,
        created_at: '2018-01-06T10:44:13.000Z',
        updated_at: '2018-01-18T15:40:54.000Z'
    });
    t.context.sandbox.stub(ProductVendorRepository, 'findOne').resolves({
        id: 2,
        product_variant_id: 2,
        vendor_id: 3,
        warehouse_id: 3,
        location_label: 'Jakarta Barat',
        stock_available: 48,
        stock_used: 32,
        stock_reserved: 0,
        currency: 'IDR',
        tier_min_qty_1: 5,
        tier_min_qty_2: 33,
        tier_min_qty_3: 111,
        tier_cogs_price_1: '4000000.00',
        tier_cogs_price_2: '3900000.00',
        tier_cogs_price_3: '3800000.00',
        warranty_option: 'official_warranty',
        warranty_period: 'year',
        warranty_limit: 11,
        warranty_coverage: 'xBox only',
        indent_period: 'year',
        indent_limit: 68,
        reference_link: '["https://www.apple.com/iphone-x/specs/","https://www.cnet.com/products/apple-iphone-x/review/","https://www.gsmarena.com/apple_iphone_x-8858.php"]',
        sku_vendor: 'XXXXX',
        is_indent: 1,
        is_active: 1,
        created_by: 3,
        created_at: '2018-01-06T11:04:06.000Z',
        updated_at: '2018-02-14T05:48:42.000Z'
    });
    t.context.sandbox.stub(ProductVendorRepository, 'update').resolves([1]);
    t.context.sandbox.stub(ProductVendorRepository, 'findWithVariant').resolves({
        id: 2,
        product_variant_id: 2,
        vendor_id: 3,
        warehouse_id: 3,
        location_label: 'Jawa Tengah',
        stock_available: 60,
        stock_used: 20,
        stock_reserved: 0,
        currency: 'IDR',
        tier_min_qty_1: 15,
        tier_min_qty_2: 20,
        tier_min_qty_3: 25,
        tier_cogs_price_1: '22000000.00',
        tier_cogs_price_2: '21000000.00',
        tier_cogs_price_3: '19500000.00',
        warranty_option: 'official_warranty',
        warranty_period: 'year',
        warranty_limit: 1,
        warranty_coverage: 'Every iPhone comes with one year of hardware repair coverage through its limited warranty and up to 90 days of complimentary support.',
        indent_period: 'month',
        indent_limit: 1,
        reference_link: '["https://www.apple.com/iphone-x/specs/","https://www.cnet.com/products/apple-iphone-x/review/","https://www.gsmarena.com/apple_iphone_x-8858.php"]',
        sku_vendor: 'UT9DXEMP74',
        is_indent: 1,
        is_active: 1,
        created_by: 3,
        created_at: '2018-01-06T11:04:06.000Z',
        updated_at: '2018-03-07T07:39:06.000Z',
        ProductVariant: {
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
            updated_at: '2018-01-25T13:11:05.000Z'
        }
    });
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);
    t.context.sandbox.stub(ProductLogRepository, 'insertOne').resolves();
    try {
        const context = require('../../../mocks/context');
        const data = {
            body: {
                payload: [
                    {
                        sku: 'X152KT2GKF',
                        vendor_id: 3,
                        warehouse_id: 3,
                        stock: 12
                    }
                ]
            }
        };
        const result = yield Methods.putProductStockReverse(data, context);
        const expected = {
            data: [
                {
                    id: 2,
                    sku: 'X152KT2GKF',
                    vendor_id: 3,
                    warehouse_id: 3,
                    stock_available: 60,
                    stock_used: 20,
                    created_at: result.data[0].created_at,
                    updated_at: result.data[0].updated_at
                }
            ]
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return Bad Request', function* (t) {
    const mockStartTransaction = t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    const mockRollback = t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    const mockCommit = t.context.sandbox.mock(DBContext).expects('commit').resolves();

    try {
        const context = require('../../../mocks/context');
        const data = {
            body: {
                payload: [
                    {
                        sku: '',
                        vendor_id: 3,
                        warehouse_id: 3,
                        stock: 4
                    }
                ]
            }
        };
        yield Methods.putProductStockReverse(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Should be return Variant not found', function* (t) {
    const mockStartTransaction = t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    const mockRollback = t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    const mockCommit = t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves(null);
    try {
        const context = require('../../../mocks/context');
        const data = {
            body: {
                payload: [
                    {
                        sku: '333333333',
                        vendor_id: 3,
                        warehouse_id: 3,
                        stock: 4
                    }
                ]
            }
        };
        yield Methods.putProductStockReverse(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'Variant Not Found');
    }
});

test.serial('Should be return Vendor Not Found', function* (t) {
    const mockStartTransaction = t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    const mockRollback = t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    const mockCommit = t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves({});
    t.context.sandbox.stub(ProductVendorRepository, 'findOne').resolves(null);
    try {
        const context = require('../../../mocks/context');
        const data = {
            body: {
                payload: [
                    {
                        sku: '2',
                        vendor_id: 3333333343,
                        warehouse_id: 3,
                        stock: 4
                    }
                ]
            }
        };
        yield Methods.putProductStockReverse(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'Vendor not found');
    }
});


test.serial('Forbiden Access', function* (t) {
    const mockStartTransaction = t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    const mockRollback = t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    const mockCommit = t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves({});
    t.context.sandbox.stub(ProductVendorRepository, 'findOne').resolves(null);
    try {
        const context = require('../../../mocks/context');
        const data = {
            body: {
                payload: [
                    {
                        sku: '2',
                        vendor_id: 3333333343,
                        warehouse_id: 3,
                        stock: 4
                    }
                ]
            }
        };
        yield Methods.putProductStockReverse(data, {});
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, 'You have no authorization access');
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
