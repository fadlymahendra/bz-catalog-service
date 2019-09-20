
const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError, BizzyService, DBContext } = require('bizzy-common');
const ProductVendorRepository = require('../../../../src/repositories/product_vendor');
const ProductLogRepository = require('../../../../src/repositories/product_log');
const WebhookRepository = require('../../../../src/repositories/webhook');
const Methods = require('../../../../src/methods/products/change_tier');

const payloadPubUpdate = {
    id: 20,
    vendor_id: 3,
    stock_available: 10,
    stock_used: 0,
    stock_reserved: 0,
    currency: 'IDR',
    tier_min_qty_1: 1,
    tier_min_qty_2: 2,
    tier_cogs_price_1: '50.00',
    tier_cogs_price_2: '49.00',
    tier_cogs_price_3: '9.00',
    indent_period: null,
    indent_limit: null,
    sku_vendor: 'XXXXX',
    is_indent: 1,
    is_active: 0,
    created_at: Date('2018-04-04T12:56:29.000Z'),
    updated_at: Date('2018-04-04T12:56:29.000Z'),
    ProductVariant: {
        id: 8,
        sku: 'DC8JLF43ND',
        long_name: 'Apple iPhone 7 - Gold - 128GB',
        variant_value: '{"phone_color":2,"phone_storage":11}',
        is_primary: 0,
        is_discontinue: 0,
        is_active: 1,
        updated_at: Date('2018-04-04T12:55:26.000Z'),
        created_at: Date('2018-04-04T12:55:26.000Z'),
        ProductGroup: {
            id: 2,
            name: 'Apple iPhone 7',
            variant_count: 0,
            variant_matrix: [],
            status: 1,
            visibility: 1,
            created_at: Date('2018-04-04T12:51:53.000Z'),
            updated_at: Date('2018-04-04T12:51:53.000Z'),
            Category: {
                id: 7019,
                name: 'Mobile phones',
                level: 'C3',
                base_margin: 0.03,
                unspsc: 43211508,
                sequence: 1,
                parent_id: 793,
                is_active: 1,
                is_deleted: 0,
                created_at: Date('2018-03-29T14:19:48.000Z'),
                updated_at: Date('2018-03-29T14:19:48.000Z')
            }
        }
    }
};

sinon.sandbox.create().stub(process, 'env').value({
    BCI_ID: 170
});

test.serial('Should be return success', function* (t) {
    const callback = t.context.sandbox.stub(ProductVendorRepository, 'findOne');
    callback.onCall(0).resolves({
        id: 2,
        product_variant_id: 2,
        vendor_id: 3,
        warehouse_id: 99999,
        location_label: 'Jakarta Barat',
        stock_available: 8,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: '1',
        tier_min_qty_2: '2',
        tier_min_qty_3: '3',
        tier_cogs_price_1: '19000000.00',
        tier_cogs_price_2: '19500000.00',
        tier_cogs_price_3: '20000000.00',
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
        created_by: 2,
        created_at: '2018-01-06T11:04:06.000Z',
        updated_at: '2018-01-18T04:46:32.000Z',
        ProductVariant: {
            id: 2,
            product_group_id: 2,
            sku: 'X152KT2GKF',
            long_name: 'Apple iPhone 7 Black 64GB',
            variant_value: '{"phone_color":2,"phone_storage":4}',
            primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
            additional_image: '["https://ecs7.tokopedia.net/img/cache/700/product-1/2016/11/25/98262774/98262774_4ea3f7ac-c76a-4926-8ee0-92c24a15fa2a_599_600","https://ecs7.tokopedia.net/img/cache/700/product-1/2017/1/13/98262774/98262774_6fcdfe95-cd8c-43bb-99bb-5da0f9a54a7e_700_700"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-06T10:44:13.000Z',
            updated_at: '2018-01-14T11:00:45.000Z'
        }
    });
    callback.onCall(1).resolves({
        id: 2,
        product_variant_id: 2,
        vendor_id: 3,
        warehouse_id: 99999,
        location_label: 'Jakarta Barat',
        stock_available: 8,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: '1',
        tier_min_qty_2: '2',
        tier_min_qty_3: '3',
        tier_cogs_price_1: '39000001.00',
        tier_cogs_price_2: '29500001.00',
        tier_cogs_price_3: '20000001.00',
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
        created_by: 2,
        created_at: '2018-01-06T11:04:06.000Z',
        updated_at: '2018-01-18T04:46:32.000Z',
        ProductVariant: {
            id: 2,
            product_group_id: 2,
            sku: 'X152KT2GKF',
            long_name: 'Apple iPhone 7 Black 64GB',
            variant_value: '{"phone_color":2,"phone_storage":4}',
            primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
            additional_image: '["https://ecs7.tokopedia.net/img/cache/700/product-1/2016/11/25/98262774/98262774_4ea3f7ac-c76a-4926-8ee0-92c24a15fa2a_599_600","https://ecs7.tokopedia.net/img/cache/700/product-1/2017/1/13/98262774/98262774_6fcdfe95-cd8c-43bb-99bb-5da0f9a54a7e_700_700"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-06T10:44:13.000Z',
            updated_at: '2018-01-14T11:00:45.000Z'
        },
        getValues() {
            return this;
        }
    });

    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithDetailById').resolves(payloadPubUpdate);
    t.context.sandbox.stub(ProductVendorRepository, 'update').resolves([
        1
    ]);
    t.context.sandbox.stub(ProductLogRepository, 'insertMany').resolves({
        ok: 1,
        n: 1
    });
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);
    t.context.sandbox.stub(BizzyService, 'callSync').resolves(true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: 3,
                pid: 2
            },
            body: {
                tier_min_qty_1: '1',
                tier_min_qty_2: '2',
                tier_min_qty_3: '3',
                tier_cogs_price_1: '39000001',
                tier_cogs_price_2: '29500001',
                tier_cogs_price_3: '20000001'
            }
        };

        const result = yield Methods.putProductTier(data, context);
        const expected = {
            data: {
                id: 2,
                tier_min_qty_1: '1',
                tier_min_qty_2: '2',
                tier_min_qty_3: '3',
                tier_cogs_price_1: '39000001.00',
                tier_cogs_price_2: '29500001.00',
                tier_cogs_price_3: '20000001.00',
                vendor_id: 3,
                warehouse_id: 99999
            },
            message: 'Ubah jumlah dan harga grosir berhasil'
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return success vendor is BCI (not send to webhook)', function* (t) {
    const callback = t.context.sandbox.stub(ProductVendorRepository, 'findOne');
    callback.onCall(0).resolves({
        id: 2,
        product_variant_id: 2,
        vendor_id: 3,
        warehouse_id: 99999,
        location_label: 'Jakarta Barat',
        stock_available: 8,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: '1',
        tier_min_qty_2: '2',
        tier_min_qty_3: '3',
        tier_cogs_price_1: '19000000.00',
        tier_cogs_price_2: '19500000.00',
        tier_cogs_price_3: '20000000.00',
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
        created_by: 2,
        created_at: '2018-01-06T11:04:06.000Z',
        updated_at: '2018-01-18T04:46:32.000Z',
        ProductVariant: {
            id: 2,
            product_group_id: 2,
            sku: 'X152KT2GKF',
            long_name: 'Apple iPhone 7 Black 64GB',
            variant_value: '{"phone_color":2,"phone_storage":4}',
            primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
            additional_image: '["https://ecs7.tokopedia.net/img/cache/700/product-1/2016/11/25/98262774/98262774_4ea3f7ac-c76a-4926-8ee0-92c24a15fa2a_599_600","https://ecs7.tokopedia.net/img/cache/700/product-1/2017/1/13/98262774/98262774_6fcdfe95-cd8c-43bb-99bb-5da0f9a54a7e_700_700"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-06T10:44:13.000Z',
            updated_at: '2018-01-14T11:00:45.000Z'
        }
    });
    callback.onCall(1).resolves({
        id: 2,
        product_variant_id: 2,
        vendor_id: 3,
        warehouse_id: 99999,
        location_label: 'Jakarta Barat',
        stock_available: 8,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: '1',
        tier_min_qty_2: '2',
        tier_min_qty_3: '3',
        tier_cogs_price_1: '39000001.00',
        tier_cogs_price_2: '29500001.00',
        tier_cogs_price_3: '20000001.00',
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
        created_by: 2,
        created_at: '2018-01-06T11:04:06.000Z',
        updated_at: '2018-01-18T04:46:32.000Z',
        ProductVariant: {
            id: 2,
            product_group_id: 2,
            sku: 'X152KT2GKF',
            long_name: 'Apple iPhone 7 Black 64GB',
            variant_value: '{"phone_color":2,"phone_storage":4}',
            primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
            additional_image: '["https://ecs7.tokopedia.net/img/cache/700/product-1/2016/11/25/98262774/98262774_4ea3f7ac-c76a-4926-8ee0-92c24a15fa2a_599_600","https://ecs7.tokopedia.net/img/cache/700/product-1/2017/1/13/98262774/98262774_6fcdfe95-cd8c-43bb-99bb-5da0f9a54a7e_700_700"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-06T10:44:13.000Z',
            updated_at: '2018-01-14T11:00:45.000Z'
        },
        getValues() {
            return this;
        }
    });

    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithDetailById').resolves(payloadPubUpdate);
    t.context.sandbox.stub(ProductVendorRepository, 'update').resolves([
        1
    ]);
    t.context.sandbox.stub(ProductLogRepository, 'insertMany').resolves({
        ok: 1,
        n: 1
    });
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);
    t.context.sandbox.stub(BizzyService, 'callSync').resolves(true);

    try {
        const context = {
            user: {
                username: 'vendor@tokoledia.com',
                first_name: 'Vendor',
                last_name: 'Tokoledia',
                scope: 'organization',
                organization_id: 170,
                punchout: {
                    is_punchout: false,
                    is_user_punchout: false,
                    sales_admin_id: 0,
                    data: {}
                },
                customer: {
                    organization_name: 'PT Vendor Jaya',
                    organization_id: 170, // Match with process.evn.BCI_ID
                    person_id: 3,
                    superadmin: 3,
                    roles: [
                        {
                            role_id: 3,
                            name: 'Super Admin'
                        }
                    ],
                    is_vendor: 1,
                    setup: 6,
                    status: 3,
                    has_agreement: 0,
                    channel_type: 'MP'
                },
                iat: 1532577179,
                exp: 1532584379
            }
        };
        const data = {
            path: {
                id: 170,
                pid: 2
            },
            body: {
                tier_min_qty_1: '1',
                tier_min_qty_2: '2',
                tier_min_qty_3: '3',
                tier_cogs_price_1: '39000001',
                tier_cogs_price_2: '29500001',
                tier_cogs_price_3: '20000001'
            }
        };

        const result = yield Methods.putProductTier(data, context);
        const expected = {
            data: {
                id: 2,
                tier_min_qty_1: '1',
                tier_min_qty_2: '2',
                tier_min_qty_3: '3',
                tier_cogs_price_1: '39000001.00',
                tier_cogs_price_2: '29500001.00',
                tier_cogs_price_3: '20000001.00',
                vendor_id: 3,
                warehouse_id: 99999
            },
            message: 'Ubah jumlah dan harga grosir berhasil'
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return success. (logs.length == 0)', function* (t) {
    const callback = t.context.sandbox.stub(ProductVendorRepository, 'findOne');
    callback.onCall(0).resolves({
        id: 2,
        product_variant_id: 2,
        vendor_id: 3,
        warehouse_id: 99999,
        location_label: 'Jakarta Barat',
        stock_available: 8,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: '1',
        tier_min_qty_2: '2',
        tier_min_qty_3: '3',
        tier_cogs_price_1: '19000000.00',
        tier_cogs_price_2: '19500000.00',
        tier_cogs_price_3: '20000000.00',
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
        created_by: 2,
        created_at: '2018-01-06T11:04:06.000Z',
        updated_at: '2018-01-18T04:46:32.000Z',
        ProductVariant: {
            id: 2,
            product_group_id: 2,
            sku: 'X152KT2GKF',
            long_name: 'Apple iPhone 7 Black 64GB',
            variant_value: '{"phone_color":2,"phone_storage":4}',
            primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
            additional_image: '["https://ecs7.tokopedia.net/img/cache/700/product-1/2016/11/25/98262774/98262774_4ea3f7ac-c76a-4926-8ee0-92c24a15fa2a_599_600","https://ecs7.tokopedia.net/img/cache/700/product-1/2017/1/13/98262774/98262774_6fcdfe95-cd8c-43bb-99bb-5da0f9a54a7e_700_700"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-06T10:44:13.000Z',
            updated_at: '2018-01-14T11:00:45.000Z'
        }
    });
    callback.onCall(1).resolves({
        id: 2,
        product_variant_id: 2,
        vendor_id: 3,
        warehouse_id: 99999,
        location_label: 'Jakarta Barat',
        stock_available: 8,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: '1',
        tier_min_qty_2: '2',
        tier_min_qty_3: '3',
        tier_cogs_price_1: '19000000.00',
        tier_cogs_price_2: '19500000.00',
        tier_cogs_price_3: '20000000.00',
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
        created_by: 2,
        created_at: '2018-01-06T11:04:06.000Z',
        updated_at: '2018-01-18T04:46:32.000Z',
        ProductVariant: {
            id: 2,
            product_group_id: 2,
            sku: 'X152KT2GKF',
            long_name: 'Apple iPhone 7 Black 64GB',
            variant_value: '{"phone_color":2,"phone_storage":4}',
            primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
            additional_image: '["https://ecs7.tokopedia.net/img/cache/700/product-1/2016/11/25/98262774/98262774_4ea3f7ac-c76a-4926-8ee0-92c24a15fa2a_599_600","https://ecs7.tokopedia.net/img/cache/700/product-1/2017/1/13/98262774/98262774_6fcdfe95-cd8c-43bb-99bb-5da0f9a54a7e_700_700"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-06T10:44:13.000Z',
            updated_at: '2018-01-14T11:00:45.000Z'
        },
        getValues() {
            return this;
        }
    });

    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithDetailById').resolves(payloadPubUpdate);
    t.context.sandbox.stub(ProductVendorRepository, 'update').resolves([
        1
    ]);
    t.context.sandbox.stub(ProductLogRepository, 'insertMany').resolves({
        ok: 1,
        n: 1
    });
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);
    t.context.sandbox.stub(BizzyService, 'callSync').resolves(true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: 3,
                pid: 2
            },
            body: {
                tier_min_qty_1: '1',
                tier_min_qty_2: '2',
                tier_min_qty_3: '3',
                tier_cogs_price_1: '39000001',
                tier_cogs_price_2: '29500001',
                tier_cogs_price_3: '20000000'
            }
        };

        const result = yield Methods.putProductTier(data, context);
        const expected = {
            data: {
                id: 2,
                tier_min_qty_1: '1',
                tier_min_qty_2: '2',
                tier_min_qty_3: '3',
                tier_cogs_price_1: '19000000.00',
                tier_cogs_price_2: '19500000.00',
                tier_cogs_price_3: '20000000.00',
                vendor_id: 3,
                warehouse_id: 99999
            },
            message: 'Ubah jumlah dan harga grosir berhasil'
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return success, only update on tier 1', function* (t) {
    const callback = t.context.sandbox.stub(ProductVendorRepository, 'findOne');
    callback.onCall(0).resolves({
        id: 2,
        product_variant_id: 2,
        vendor_id: 3,
        warehouse_id: 99999,
        location_label: 'Jakarta Barat',
        stock_available: 8,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: '1',
        tier_min_qty_2: '2',
        tier_min_qty_3: '3',
        tier_cogs_price_1: '19000000.00',
        tier_cogs_price_2: null,
        tier_cogs_price_3: null,
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
        created_by: 2,
        created_at: '2018-01-06T11:04:06.000Z',
        updated_at: '2018-01-18T04:46:32.000Z',
        ProductVariant: {
            id: 2,
            product_group_id: 2,
            sku: 'X152KT2GKF',
            long_name: 'Apple iPhone 7 Black 64GB',
            variant_value: '{"phone_color":2,"phone_storage":4}',
            primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
            additional_image: '["https://ecs7.tokopedia.net/img/cache/700/product-1/2016/11/25/98262774/98262774_4ea3f7ac-c76a-4926-8ee0-92c24a15fa2a_599_600","https://ecs7.tokopedia.net/img/cache/700/product-1/2017/1/13/98262774/98262774_6fcdfe95-cd8c-43bb-99bb-5da0f9a54a7e_700_700"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-06T10:44:13.000Z',
            updated_at: '2018-01-14T11:00:45.000Z'
        }
    });
    callback.onCall(1).resolves({
        id: 2,
        product_variant_id: 2,
        vendor_id: 3,
        warehouse_id: 99999,
        location_label: 'Jakarta Barat',
        stock_available: 8,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: '1',
        tier_min_qty_2: null,
        tier_min_qty_3: null,
        tier_cogs_price_1: '39000001.00',
        tier_cogs_price_2: null,
        tier_cogs_price_3: null,
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
        created_by: 2,
        created_at: '2018-01-06T11:04:06.000Z',
        updated_at: '2018-01-18T04:46:32.000Z',
        ProductVariant: {
            id: 2,
            product_group_id: 2,
            sku: 'X152KT2GKF',
            long_name: 'Apple iPhone 7 Black 64GB',
            variant_value: '{"phone_color":2,"phone_storage":4}',
            primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
            additional_image: '["https://ecs7.tokopedia.net/img/cache/700/product-1/2016/11/25/98262774/98262774_4ea3f7ac-c76a-4926-8ee0-92c24a15fa2a_599_600","https://ecs7.tokopedia.net/img/cache/700/product-1/2017/1/13/98262774/98262774_6fcdfe95-cd8c-43bb-99bb-5da0f9a54a7e_700_700"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-06T10:44:13.000Z',
            updated_at: '2018-01-14T11:00:45.000Z'
        },
        getValues() {
            return this;
        }
    });

    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithDetailById').resolves(payloadPubUpdate);
    t.context.sandbox.stub(ProductVendorRepository, 'update').resolves([
        1
    ]);
    t.context.sandbox.stub(ProductLogRepository, 'insertMany').resolves({
        ok: 1,
        n: 1
    });
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);
    t.context.sandbox.stub(BizzyService, 'callSync').resolves(true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: 3,
                pid: 2
            },
            body: {
                tier_min_qty_1: '1',
                tier_min_qty_2: '',
                tier_min_qty_3: '',
                tier_cogs_price_1: '39000001',
                tier_cogs_price_2: '',
                tier_cogs_price_3: ''
            }
        };

        const result = yield Methods.putProductTier(data, context);
        const expected = {
            data: {
                id: 2,
                tier_min_qty_1: '1',
                tier_min_qty_2: null,
                tier_min_qty_3: null,
                tier_cogs_price_1: '39000001.00',
                tier_cogs_price_2: null,
                tier_cogs_price_3: null,
                vendor_id: 3,
                warehouse_id: 99999
            },
            message: 'Ubah jumlah dan harga grosir berhasil'
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return Badrequest when request to contract', function* (t) {
    const callback = t.context.sandbox.stub(ProductVendorRepository, 'findOne');
    callback.onCall(0).resolves({
        id: 2,
        product_variant_id: 2,
        vendor_id: 3,
        warehouse_id: 99999,
        location_label: 'Jakarta Barat',
        stock_available: 8,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: '1',
        tier_min_qty_2: '2',
        tier_min_qty_3: '3',
        tier_cogs_price_1: '19000000.00',
        tier_cogs_price_2: '19500000.00',
        tier_cogs_price_3: '20000000.00',
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
        created_by: 2,
        created_at: '2018-01-06T11:04:06.000Z',
        updated_at: '2018-01-18T04:46:32.000Z',
        ProductVariant: {
            id: 2,
            product_group_id: 2,
            sku: 'X152KT2GKF',
            long_name: 'Apple iPhone 7 Black 64GB',
            variant_value: '{"phone_color":2,"phone_storage":4}',
            primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
            additional_image: '["https://ecs7.tokopedia.net/img/cache/700/product-1/2016/11/25/98262774/98262774_4ea3f7ac-c76a-4926-8ee0-92c24a15fa2a_599_600","https://ecs7.tokopedia.net/img/cache/700/product-1/2017/1/13/98262774/98262774_6fcdfe95-cd8c-43bb-99bb-5da0f9a54a7e_700_700"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-06T10:44:13.000Z',
            updated_at: '2018-01-14T11:00:45.000Z'
        }
    });
    callback.onCall(1).resolves({
        id: 2,
        product_variant_id: 2,
        vendor_id: 3,
        warehouse_id: 99999,
        location_label: 'Jakarta Barat',
        stock_available: 8,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: '1',
        tier_min_qty_2: '2',
        tier_min_qty_3: '3',
        tier_cogs_price_1: '39000001.00',
        tier_cogs_price_2: '29500001.00',
        tier_cogs_price_3: '20000001.00',
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
        created_by: 2,
        created_at: '2018-01-06T11:04:06.000Z',
        updated_at: '2018-01-18T04:46:32.000Z',
        ProductVariant: {
            id: 2,
            product_group_id: 2,
            sku: 'X152KT2GKF',
            long_name: 'Apple iPhone 7 Black 64GB',
            variant_value: '{"phone_color":2,"phone_storage":4}',
            primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
            additional_image: '["https://ecs7.tokopedia.net/img/cache/700/product-1/2016/11/25/98262774/98262774_4ea3f7ac-c76a-4926-8ee0-92c24a15fa2a_599_600","https://ecs7.tokopedia.net/img/cache/700/product-1/2017/1/13/98262774/98262774_6fcdfe95-cd8c-43bb-99bb-5da0f9a54a7e_700_700"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-06T10:44:13.000Z',
            updated_at: '2018-01-14T11:00:45.000Z'
        },
        getValues() {
            return this;
        }
    });

    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithDetailById').resolves(payloadPubUpdate);
    t.context.sandbox.stub(ProductVendorRepository, 'update').resolves([
        1
    ]);
    t.context.sandbox.stub(ProductLogRepository, 'insertMany').resolves({
        ok: 1,
        n: 1
    });
    t.context.sandbox.stub(BizzyService, 'callAsync').rejects();
    t.context.sandbox.stub(BizzyService, 'callSync').rejects();

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: 3,
                pid: 2
            },
            body: {
                tier_min_qty_1: '1',
                tier_min_qty_2: '2',
                tier_min_qty_3: '3',
                tier_cogs_price_1: '39000001',
                tier_cogs_price_2: '29500001',
                tier_cogs_price_3: '20000001'
            }
        };

        const result = yield Methods.putProductTier(data, context);
        t.fail('Should return BadRequest');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest);
        t.pass();
    }
});

test.serial('Should be return Not Found', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findOne').resolves(null);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: 3,
                pid: 2
            },
            body: {
                tier_min_qty_1: '5',
                tier_min_qty_2: '10',
                tier_min_qty_3: '15',
                tier_cogs_price_1: '30000000',
                tier_cogs_price_2: '29500000',
                tier_cogs_price_3: '19500000'
            }
        };

        yield Methods.putProductTier(data, context);
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
                id: 3,
                pid: 2
            },
            body: {
                tier_min_qty_1: '5',
                tier_min_qty_2: '10',
                tier_min_qty_3: '15',
                tier_cogs_price_1: '40000000',
                tier_cogs_price_2: '29500000',
                tier_cogs_price_3: '19000000'
            }
        };

        yield Methods.putProductTier(data, context);
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
                id: 3,
                pid: ''
            },
            body: {
                tier_min_qty_1: 5,
                tier_min_qty_2: 10,
                tier_min_qty_3: 15,
                tier_cogs_price_1: 20000000,
                tier_cogs_price_2: 19500000,
                tier_cogs_price_3: 19000000
            }
        };

        yield Methods.putProductTier(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Should be return Bad Request when request to catalog-pubsub: publishUpdateProduct', function* (t) {
    const callback = t.context.sandbox.stub(ProductVendorRepository, 'findOne');
    callback.onCall(0).resolves({
        id: 2,
        product_variant_id: 2,
        vendor_id: 3,
        warehouse_id: 99999,
        location_label: 'Jakarta Barat',
        stock_available: 8,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: '1',
        tier_min_qty_2: '2',
        tier_min_qty_3: '3',
        tier_cogs_price_1: '19000000.00',
        tier_cogs_price_2: '19500000.00',
        tier_cogs_price_3: '20000000.00',
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
        created_by: 2,
        created_at: '2018-01-06T11:04:06.000Z',
        updated_at: '2018-01-18T04:46:32.000Z',
        ProductVariant: {
            id: 2,
            product_group_id: 2,
            sku: 'X152KT2GKF',
            long_name: 'Apple iPhone 7 Black 64GB',
            variant_value: '{"phone_color":2,"phone_storage":4}',
            primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
            additional_image: '["https://ecs7.tokopedia.net/img/cache/700/product-1/2016/11/25/98262774/98262774_4ea3f7ac-c76a-4926-8ee0-92c24a15fa2a_599_600","https://ecs7.tokopedia.net/img/cache/700/product-1/2017/1/13/98262774/98262774_6fcdfe95-cd8c-43bb-99bb-5da0f9a54a7e_700_700"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-06T10:44:13.000Z',
            updated_at: '2018-01-14T11:00:45.000Z'
        }
    });
    callback.onCall(1).resolves({
        id: 2,
        product_variant_id: 2,
        vendor_id: 3,
        warehouse_id: 99999,
        location_label: 'Jakarta Barat',
        stock_available: 8,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: '1',
        tier_min_qty_2: '2',
        tier_min_qty_3: '3',
        tier_cogs_price_1: '39000001.00',
        tier_cogs_price_2: '29500001.00',
        tier_cogs_price_3: '20000001.00',
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
        created_by: 2,
        created_at: '2018-01-06T11:04:06.000Z',
        updated_at: '2018-01-18T04:46:32.000Z',
        ProductVariant: {
            id: 2,
            product_group_id: 2,
            sku: 'X152KT2GKF',
            long_name: 'Apple iPhone 7 Black 64GB',
            variant_value: '{"phone_color":2,"phone_storage":4}',
            primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
            additional_image: '["https://ecs7.tokopedia.net/img/cache/700/product-1/2016/11/25/98262774/98262774_4ea3f7ac-c76a-4926-8ee0-92c24a15fa2a_599_600","https://ecs7.tokopedia.net/img/cache/700/product-1/2017/1/13/98262774/98262774_6fcdfe95-cd8c-43bb-99bb-5da0f9a54a7e_700_700"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-06T10:44:13.000Z',
            updated_at: '2018-01-14T11:00:45.000Z'
        },
        getValues() {
            return this;
        }
    });

    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithDetailById').resolves(payloadPubUpdate);
    t.context.sandbox.stub(ProductVendorRepository, 'update').resolves([
        1
    ]);
    t.context.sandbox.stub(ProductLogRepository, 'insertMany').resolves({
        ok: 1,
        n: 1
    });
    const AsyncCallBack = t.context.sandbox.stub(BizzyService, 'callAsync');
    AsyncCallBack.onCall(0).resolves(true);
    AsyncCallBack.onCall(1).resolves(true);
    AsyncCallBack.onCall(2).rejects();
    t.context.sandbox.stub(BizzyService, 'callSync').resolves(true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: 3,
                pid: 2
            },
            body: {
                tier_min_qty_1: '1',
                tier_min_qty_2: '2',
                tier_min_qty_3: '3',
                tier_cogs_price_1: '39000001',
                tier_cogs_price_2: '29500001',
                tier_cogs_price_3: '20000001'
            }
        };

        yield Methods.putProductTier(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest);
    }
});

test.before('Initialize BizzyError Before All Tests', (t) => {
    BizzyError.initializeErrors();
});

test.beforeEach('Initialize New Sandbox Before Each Test', function* (t) {
    t.context.sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
    t.context.sandbox.stub(DBContext, 'startTransaction').resolves();
    t.context.sandbox.stub(DBContext, 'rollback').resolves();
    t.context.sandbox.stub(DBContext, 'commit').resolves();
});

test.afterEach.always('Restore Sandbox and Configuration After Each Test', function* (t) {
    t.context.sandbox.restore();
});
