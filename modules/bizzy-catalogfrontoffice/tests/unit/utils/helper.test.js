const Promise = require('bluebird');
const test = require('ava');
const { BizzyError } = require('bizzy-common');
const sinon = require('sinon');
const Helper = require('../../../src/utils/helper');
const _ = require('lodash');

test.serial('Should be return object', function* (t) {
    const page = 2;
    const limit = 20;
    const object = {
        id: 10045,
        name: 'Uom Test'
    };

    t.deepEqual(Helper.offsetPagination(page, limit), 20);
    t.deepEqual(Helper.offsetPagination(0, 0), 0);
    t.deepEqual(Helper.parseDataObject(object), { id: 10045, name: 'Uom Test' });
    t.deepEqual(Helper.lowerTrim('Bizzy Indonesia'), 'bizzy indonesia');
    t.deepEqual(Helper.implode([], '-'), '');
    t.deepEqual(Helper.implode(['Bizzy', 'Indonesia'], ' '), 'Bizzy Indonesia');
    t.deepEqual(Helper.isNumber('test'), null);
    t.deepEqual(Helper.isNumber(123), true);

    const variants = [{
        attribute_value_id: 0
    }];

    t.deepEqual(Helper.IsNewVariant(variants), true);
    t.deepEqual(Helper.IsNewVariant([{
        attribute_value_id: 1
    }]), false);
});

test.serial('Should be return generate product log stock', function* (t) {
    const result1 = {
        id: 2,
        product_variant_id: 2,
        vendor_id: 3,
        warehouse_id: 3,
        location_label: 'Jawa Tengah',
        stock_available: 221,
        stock_used: 0,
        stock_reserved: 0,
        currency: 'IDR',
        tier_min_qty_1: 5,
        tier_min_qty_2: 10,
        tier_min_qty_3: 15,
        tier_cogs_price_1: '20000000.00',
        tier_cogs_price_2: '19500000.00',
        tier_cogs_price_3: '19000000.00',
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
        updated_at: '2018-02-28T04:29:02.000Z',
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
    };

    const result2 = {
        id: 2,
        product_variant_id: 2,
        vendor_id: 3,
        warehouse_id: 3,
        location_label: 'Jawa Tengah',
        stock_available: 200,
        stock_used: 0,
        stock_reserved: 0,
        currency: 'IDR',
        tier_min_qty_1: 5,
        tier_min_qty_2: 10,
        tier_min_qty_3: 15,
        tier_cogs_price_1: '20000000.00',
        tier_cogs_price_2: '19500000.00',
        tier_cogs_price_3: '19000000.00',
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
        updated_at: '2018-02-28T04:29:02.000Z',
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
    };

    const logFrame = {
        action: 'putProductStock',
        title: '',
        product_group_id: 2,
        product_variant_id: 2,
        product_vendor_id: 2,
        payload: {},
        user: {
            id: 3,
            name: 'Bambang Widodo',
            email: 'vendor@tokoledia.com',
            type: 'vendor'
        },
        created_at: '2018-01-06T11:04:06.000Z',
        updated_at: '2018-02-28T04:29:02.000Z'
    };

    const expected = [
        {
            action: 'putProductStock',
            title: 'Ubah Stok',
            product_group_id: 2,
            product_variant_id: 2,
            product_vendor_id: 2,
            payload: {
                before: 221,
                after: 200
            },
            user: {
                id: 3,
                name: 'Bambang Widodo',
                email: 'vendor@tokoledia.com',
                type: 'vendor'
            },
            created_at: '2018-01-06T11:04:06.000Z',
            updated_at: '2018-02-28T04:29:02.000Z'
        }
    ];

    t.deepEqual(Helper.generateProductlog(_, logFrame, Helper.parseDataObject(result1), Helper.parseDataObject(result2)), expected);
});

test.serial('Should be return generate product log tier', function* (t) {
    const result1 = {
        id: 2,
        product_variant_id: 2,
        vendor_id: 3,
        warehouse_id: 3,
        location_label: 'Jawa Tengah',
        stock_available: 15,
        stock_used: 0,
        stock_reserved: 0,
        currency: 'IDR',
        tier_min_qty_1: 11,
        tier_min_qty_2: 15,
        tier_min_qty_3: 20,
        tier_cogs_price_1: '21000000.00',
        tier_cogs_price_2: '20000000.00',
        tier_cogs_price_3: '19000000.00',
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
        updated_at: '2018-03-01T07:38:34.000Z',
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
    };

    const result2 = {
        id: 2,
        product_variant_id: 2,
        vendor_id: 3,
        warehouse_id: 3,
        location_label: 'Jawa Tengah',
        stock_available: 15,
        stock_used: 0,
        stock_reserved: 0,
        currency: 'IDR',
        tier_min_qty_1: 15,
        tier_min_qty_2: 20,
        tier_min_qty_3: 25,
        tier_cogs_price_1: '21000000.00',
        tier_cogs_price_2: '20000000.00',
        tier_cogs_price_3: '19000000.00',
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
        updated_at: '2018-03-01T07:38:34.000Z',
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
    };

    const logFrame = {
        action: 'putProductTier',
        title: '',
        product_group_id: 2,
        product_variant_id: 2,
        product_vendor_id: 2,
        payload: {},
        user: {
            id: 3,
            name: 'Bambang Widodo',
            email: 'vendor@tokoledia.com',
            type: 'vendor'
        },
        created_at: '2018-01-06T11:04:06.000Z',
        updated_at: '2018-03-01T07:43:45.000Z'
    };

    const expected = [
        {
            action: 'putProductTier',
            title: 'Ubah Jumlah Produk Dijual 1',
            product_group_id: 2,
            product_variant_id: 2,
            product_vendor_id: 2,
            payload: {
                before: '1 - 11',
                after: '1 - 15'
            },
            user: {
                id: 3,
                name: 'Bambang Widodo',
                email: 'vendor@tokoledia.com',
                type: 'vendor'
            },
            created_at: '2018-01-06T11:04:06.000Z',
            updated_at: '2018-03-01T07:43:45.000Z'
        },
        {
            action: 'putProductTier',
            title: 'Ubah Jumlah Produk Dijual 2',
            product_group_id: 2,
            product_variant_id: 2,
            product_vendor_id: 2,
            payload: {
                before: '12 - 15',
                after: '16 - 20'
            },
            user: {
                id: 3,
                name: 'Bambang Widodo',
                email: 'vendor@tokoledia.com',
                type: 'vendor'
            },
            created_at: '2018-01-06T11:04:06.000Z',
            updated_at: '2018-03-01T07:43:45.000Z'
        },
        {
            action: 'putProductTier',
            title: 'Ubah Jumlah Produk Dijual 3',
            product_group_id: 2,
            product_variant_id: 2,
            product_vendor_id: 2,
            payload: {
                before: '16 - 20',
                after: '21 - 25'
            },
            user: {
                id: 3,
                name: 'Bambang Widodo',
                email: 'vendor@tokoledia.com',
                type: 'vendor'
            },
            created_at: '2018-01-06T11:04:06.000Z',
            updated_at: '2018-03-01T07:43:45.000Z'
        }
    ];

    t.deepEqual(Helper.generateProductlog(_, logFrame, Helper.parseDataObject(result1), Helper.parseDataObject(result2)), expected);
});

test.serial('Should be return generate product log tier price', function* (t) {
    const result1 = {
        id: 2,
        product_variant_id: 2,
        vendor_id: 3,
        warehouse_id: 3,
        location_label: 'Jawa Tengah',
        stock_available: 15,
        stock_used: 0,
        stock_reserved: 0,
        currency: 'IDR',
        tier_min_qty_1: 11,
        tier_min_qty_2: 15,
        tier_min_qty_3: 20,
        tier_cogs_price_1: '21000000.00',
        tier_cogs_price_2: '20000000.00',
        tier_cogs_price_3: '19000000.00',
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
        updated_at: '2018-03-01T07:38:34.000Z',
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
    };

    const result2 = {
        id: 2,
        product_variant_id: 2,
        vendor_id: 3,
        warehouse_id: 3,
        location_label: 'Jawa Tengah',
        stock_available: 15,
        stock_used: 0,
        stock_reserved: 0,
        currency: 'IDR',
        tier_min_qty_1: 11,
        tier_min_qty_2: 15,
        tier_min_qty_3: 20,
        tier_cogs_price_1: '22000000.00',
        tier_cogs_price_2: '21000000.00',
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
        created_by: 3,
        created_at: '2018-01-06T11:04:06.000Z',
        updated_at: '2018-03-01T07:38:34.000Z',
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
    };

    const logFrame = {
        action: 'putProductTier',
        title: '',
        product_group_id: 2,
        product_variant_id: 2,
        product_vendor_id: 2,
        payload: {},
        user: {
            id: 3,
            name: 'Bambang Widodo',
            email: 'vendor@tokoledia.com',
            type: 'vendor'
        },
        created_at: '2018-01-06T11:04:06.000Z',
        updated_at: '2018-03-01T07:43:45.000Z'
    };

    const expected = [
        {
            action: 'putProductTier',
            title: 'Ubah Harga Grosir 1',
            product_group_id: 2,
            product_variant_id: 2,
            product_vendor_id: 2,
            payload: {
                before: 21000000,
                after: 22000000
            },
            user: {
                id: 3,
                name: 'Bambang Widodo',
                email: 'vendor@tokoledia.com',
                type: 'vendor'
            },
            created_at: '2018-01-06T11:04:06.000Z',
            updated_at: '2018-03-01T07:43:45.000Z'
        },
        {
            action: 'putProductTier',
            title: 'Ubah Harga Grosir 2',
            product_group_id: 2,
            product_variant_id: 2,
            product_vendor_id: 2,
            payload: {
                before: 20000000,
                after: 21000000
            },
            user: {
                id: 3,
                name: 'Bambang Widodo',
                email: 'vendor@tokoledia.com',
                type: 'vendor'
            },
            created_at: '2018-01-06T11:04:06.000Z',
            updated_at: '2018-03-01T07:43:45.000Z'
        },
        {
            action: 'putProductTier',
            title: 'Ubah Harga Grosir 3',
            product_group_id: 2,
            product_variant_id: 2,
            product_vendor_id: 2,
            payload: {
                before: 19000000,
                after: 20000000
            },
            user: {
                id: 3,
                name: 'Bambang Widodo',
                email: 'vendor@tokoledia.com',
                type: 'vendor'
            },
            created_at: '2018-01-06T11:04:06.000Z',
            updated_at: '2018-03-01T07:43:45.000Z'
        }
    ];

    t.deepEqual(Helper.generateProductlog(_, logFrame, Helper.parseDataObject(result1), Helper.parseDataObject(result2)), expected);
});

test.serial('Should be tier validation', function* (t) {
    try {
        const input = {
            tier_min_qty_1: '15',
            tier_min_qty_2: '14',
            tier_min_qty_3: '13',
            tier_cogs_price_1: '22000000',
            tier_cogs_price_2: '23000000',
            tier_cogs_price_3: '24000000'
        };

        yield Helper.tierValidation(input);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Should be generate SKU ID', function* (t) {
    try {
        const input = 2;

        const result = Helper.generateSKUD(input);
        t.deepEqual(input, result.length);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be tier validation tier2 and tier3 null', function* (t) {
    try {
        const input = {
            tier_min_qty_1: '15',
            tier_min_qty_2: null,
            tier_min_qty_3: null,
            tier_cogs_price_1: '22000000',
            tier_cogs_price_2: '23000000',
            tier_cogs_price_3: '24000000'
        };

        yield Helper.tierValidation(input);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Should be tier validation cogs price2 and cogs price3 null', function* (t) {
    try {
        const input = {
            tier_min_qty_1: '15',
            tier_min_qty_2: '20',
            tier_min_qty_3: '25',
            tier_cogs_price_1: '22000000',
            tier_cogs_price_2: null,
            tier_cogs_price_3: null
        };

        yield Helper.tierValidation(input);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Should be tier validation convert to null', function* (t) {
    try {
        const input = {
            tier_min_qty_1: '15',
            tier_min_qty_2: '',
            tier_min_qty_3: '',
            tier_cogs_price_1: '22000000',
            tier_cogs_price_2: '',
            tier_cogs_price_3: ''
        };

        const expected = {
            tier_min_qty_1: '15',
            tier_min_qty_2: null,
            tier_min_qty_3: null,
            tier_cogs_price_1: '22000000',
            tier_cogs_price_2: null,
            tier_cogs_price_3: null
        };

        t.deepEqual(Helper.convertToNull(input), expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be slugify return null', function* (t) {
    try {
        const input = '';
        t.deepEqual(Helper.slugify(input), '');
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be slugify return slugify', function* (t) {
    try {
        const input = 'IT Mobile and Device';
        t.deepEqual(Helper.slugify(input), 'it-mobile-and-device');
    } catch (err) {
        console.log(err.message);
    }
});


//--------
test.serial('Should be return generate product log tier 2', function* (t) {
    const result1 = {
        id: 2,
        product_variant_id: 2,
        vendor_id: 3,
        warehouse_id: 3,
        location_label: 'Jawa Tengah',
        stock_available: 15,
        stock_used: 0,
        stock_reserved: 0,
        currency: 'IDR',
        tier_min_qty_1: null,
        tier_min_qty_2: 15,
        tier_min_qty_3: 20,
        tier_cogs_price_1: null,
        tier_cogs_price_2: '20000000.00',
        tier_cogs_price_3: '19000000.00',
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
        updated_at: '2018-03-01T07:38:34.000Z',
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
    };

    const result2 = {
        id: 2,
        product_variant_id: 2,
        vendor_id: 3,
        warehouse_id: 3,
        location_label: 'Jawa Tengah',
        stock_available: 15,
        stock_used: 0,
        stock_reserved: 0,
        currency: 'IDR',
        tier_min_qty_1: 15,
        tier_min_qty_2: 20,
        tier_min_qty_3: 25,
        tier_cogs_price_1: '21000000.00',
        tier_cogs_price_2: '20000000.00',
        tier_cogs_price_3: '19000000.00',
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
        updated_at: '2018-03-01T07:38:34.000Z',
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
    };

    const logFrame = {
        action: 'putProductTier',
        title: '',
        product_group_id: 2,
        product_variant_id: 2,
        product_vendor_id: 2,
        payload: {},
        user: {
            id: 3,
            name: 'Bambang Widodo',
            email: 'vendor@tokoledia.com',
            type: 'vendor'
        },
        created_at: '2018-01-06T11:04:06.000Z',
        updated_at: '2018-03-01T07:43:45.000Z'
    };

    const expected = [{
        action: 'putProductTier',
        title: 'Ubah Jumlah Produk Dijual 1',
        product_group_id: 2,
        product_variant_id: 2,
        product_vendor_id: 2,
        payload: { before: '1 - NaN', after: '1 - 15' },
        user:
            {
                id: 3,
                name: 'Bambang Widodo',
                email: 'vendor@tokoledia.com',
                type: 'vendor'
            },
        created_at: '2018-01-06T11:04:06.000Z',
        updated_at: '2018-03-01T07:43:45.000Z'
    },
    {
        action: 'putProductTier',
        title: 'Ubah Harga Grosir 1',
        product_group_id: 2,
        product_variant_id: 2,
        product_vendor_id: 2,
        payload: { before: NaN, after: 21000000 },
        user:
            {
                id: 3,
                name: 'Bambang Widodo',
                email: 'vendor@tokoledia.com',
                type: 'vendor'
            },
        created_at: '2018-01-06T11:04:06.000Z',
        updated_at: '2018-03-01T07:43:45.000Z'
    },
    {
        action: 'putProductTier',
        title: 'Ubah Jumlah Produk Dijual 2',
        product_group_id: 2,
        product_variant_id: 2,
        product_vendor_id: 2,
        payload: { before: '1 - 15', after: '16 - 20' },
        user:
            {
                id: 3,
                name: 'Bambang Widodo',
                email: 'vendor@tokoledia.com',
                type: 'vendor'
            },
        created_at: '2018-01-06T11:04:06.000Z',
        updated_at: '2018-03-01T07:43:45.000Z'
    },
    {
        action: 'putProductTier',
        title: 'Ubah Jumlah Produk Dijual 3',
        product_group_id: 2,
        product_variant_id: 2,
        product_vendor_id: 2,
        payload: { before: '16 - 20', after: '21 - 25' },
        user:
            {
                id: 3,
                name: 'Bambang Widodo',
                email: 'vendor@tokoledia.com',
                type: 'vendor'
            },
        created_at: '2018-01-06T11:04:06.000Z',
        updated_at: '2018-03-01T07:43:45.000Z'
    }];
    t.deepEqual(Helper.generateProductlog(_, logFrame, Helper.parseDataObject(result1), Helper.parseDataObject(result2)), expected);
});

test.serial('convertToNullInteger: test type-1', function* (t) {
    try {
        const obj = {
            tier_min_qty_1: '1',
            tier_min_qty_2: '',
            tier_min_qty_3: 0
        };

        const result = yield Helper.convertToNullInteger(obj);
        const expected = {
            tier_min_qty_1: '1',
            tier_min_qty_2: null,
            tier_min_qty_3: null
        };

        t.deepEqual(result, expected);
    } catch (err) {
        t.pass();
    }
});

test.serial('tierValidation: test type-1', function* (t) {
    try {
        const input = {
            tier_min_qty_1: '1',
            tier_min_qty_2: '2',
            tier_min_qty_3: '3',
            tier_cogs_price_1: '22000000',
            tier_cogs_price_2: '23000000',
            tier_cogs_price_3: '24000000'
        };

        const result = yield Helper.tierValidation(input, false);
        const expected = false;

        t.deepEqual(result, expected);
    } catch (err) {
        t.pass();
    }
});

test.serial('getHeadersExcel: test type-1', function* (t) {
    const result = Helper.getHeadersExcel();
    const expected = {
        no: 'No.',
        product_name: 'Nama Produk',
        sku_vendor: 'SKU ID Vendor',
        brand: 'ID Merek',
        description: 'Deskripsi',
        package_content: 'Isi Dalam Kemasan',
        unspsc: 'UNSPSC (Opsional)',
        manufacturing_number: 'Nomor Manufactur (Opsional)',
        barcode_number: 'Nomor Barcode (Opsional)',
        uom: 'Unit of Measure (UOM)',
        stocking_uom: 'Stok UOM',
        quantity_stocking_uom: 'Jumlah Stok per UOM',
        package_weight: 'Berat Kemasan (Gr)',
        package_width: 'Panjang Kemasan (Cm)',
        package_length: 'Lebar Kemasan (Cm)',
        package_height: 'Tinggi Kemasan (Cm)',
        tier_min_qty_1: 'Min. Quantity Jual Grosir 1',
        tier_min_qty_2: 'Min. Quantity Jual Grosir 2 (Opsional)',
        tier_min_qty_3: 'Min. Quantity Jual Grosir 3 (Opsional)',
        tier_cogs_price_1: 'Harga Jual Grosir 1 (Belum Termasuk PPN)',
        tier_cogs_price_2: 'Harga Jual Grosir 2 (Belum Termasuk PPN) (Opsional)',
        tier_cogs_price_3: 'Harga Jual Grosir 3 (Belum Termasuk PPN) (Opsional)',
        stock: 'Stok',
        warranty_type: 'Tipe Garansi',
        warranty_period: 'Periode Garansi',
        warranty_limit: 'Lama Garansi',
        warranty_coverage: 'Cakupan Garansi (Opsional)',
        is_indent: 'Produk Inden (Opsional)',
        indent_period: 'Periode Inden',
        indent_limit: 'Waktu Proses'
    };

    t.deepEqual(result, expected);
});

test.serial('getHeadersExcelEdit: test type-1', function* (t) {
    const channelType = { };

    const result = Helper.getHeadersExcelEdit(channelType);
    const expected = {
        no: 'No.',
        sku_bizzy: 'SKU ID Bizzy',
        product_name: 'Nama Produk',
        sku_vendor: 'SKU ID Vendor (Opsional)',
        brand: 'ID Merek',
        variant1: 'Varian 1',
        variant2: 'Varian 2',
        tier_min_qty_1: 'Min. Quantity Jual Grosir 1',
        tier_min_qty_2: 'Min. Quantity Jual Grosir 2 (Opsional)',
        tier_min_qty_3: 'Min. Quantity Jual Grosir 3 (Opsional)',
        tier_cogs_price_1: 'Harga Jual Grosir 1',
        tier_cogs_price_2: 'Harga Jual Grosir 2 (Belum Termasuk PPN) (Opsional)',
        tier_cogs_price_3: 'Harga Jual Grosir 3 (Belum Termasuk PPN) (Opsional)',
        // tier_min_qty_for_bizzy: 'Min. Quantity Jual Kontrak', (uncomment this line to enable contract)
        // tier_price_for_bizzy: 'Harga Jual Kontrak (Belum Termasuk PPN)', (uncomment this line to enable contract)
        stock: 'Stock',
        warranty_type: 'Tipe Garansi',
        warranty_period: 'Periode Garansi',
        warranty_limit: 'Lama Garansi',
        warranty_coverage: 'Cakupan Garansi (Opsional)',
        is_indent: 'Produk Inden (Opsional)',
        indent_period: 'Periode Inden',
        indent_limit: 'Waktu Proses',
        is_active: 'Status SKU'
    };

    t.deepEqual(result, expected);
});

test.serial('checkDuplicateArray: test type-1', function* (t) {
    const arr = [{
        id: 1
    }, {
        id: 2
    }];

    const result = Helper.checkDuplicateArray(arr);
    const expected = {
        isValid: false,
        value: { id: 1}
    };

    t.deepEqual(result, expected);
});

test.serial('isAlphaNumeric: test type-1', function* (t) {
    const text = 'ABC';

    const result = Helper.isAlphaNumeric(text);
    const expected = true;

    t.deepEqual(result, expected);
});

test.serial('isAlphaNumeric: test type-2', function* (t) {
    const text = '%$#';

    const result = Helper.isAlphaNumeric(text);
    const expected = false;

    t.deepEqual(result, expected);
});

test.serial('NullUndefinedToStrEmpty: test type-1', function* (t) {
    const data = {};

    const result = Helper.NullUndefinedToStrEmpty(data);
    const expected = data;

    t.deepEqual(result, expected);
});

test.serial('NullUndefinedToStrEmpty: test type-2', function* (t) {
    const data = null;

    const result = Helper.NullUndefinedToStrEmpty(data);
    const expected = '';

    t.deepEqual(result, expected);
});

test.serial('UndefinedToNull: test type-1', function* (t) {
    const data = {};

    const result = Helper.UndefinedToNull(data);
    const expected = data;

    t.deepEqual(result, expected);
});

test.serial('UndefinedToNull: test type-2', function* (t) {
    const data = undefined;

    const result = Helper.UndefinedToNull(data);
    const expected = null;

    t.deepEqual(result, expected);
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

