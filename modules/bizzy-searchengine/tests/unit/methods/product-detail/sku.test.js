'use strict';

const Promise = require('bizzy-common');
const { BizzyError } = require('bizzy-common');
const test = require('ava');
const sinon = require('sinon');
const BrandRepository = require('../../../../src/repositories/brand');
const CategoryRepository = require('../../../../src/repositories/category');
const CustomeRepository = require('../../../../src/repositories/raw_query');
const GeneralRepository = require('../../../../src/repositories/general');
const ProductVariantRepository = require('../../../../src/repositories/product_variant');
const ProductGroupRepository = require('../../../../src/repositories/product_group');
const ProductVendorRepository = require('../../../../src/repositories/product_vendor');
const ProductGroupAttributeCategory = require('../../../../src/repositories/product_group_attribute');
const StockingUomRepository = require('../../../../src/repositories/stocking_uom');
const UomRepository = require('../../../../src/repositories/uom');
const Methods = require('../../../../src/methods/product-detail/sku');

test.serial('Should be return success', function* (t) {
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves({
        id: 2,
        product_group_id: 2,
        sku: 'X152KT2GKF',
        long_name: 'Apple iPhone 7 - Black - 64GB',
        variant_value: '{"phone_color":2,"phone_storage":4}',
        primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
        additional_image: '["https://ecs7.tokopedia.net/img/cache/700/product-1/2016/11/25/98262774/98262774_4ea3f7ac-c76a-4926-8ee0-92c24a15fa2a_599_600","https://ecs7.tokopedia.net/img/cache/700/product-1/2017/1/13/98262774/98262774_6fcdfe95-cd8c-43bb-99bb-5da0f9a54a7e_700_700"]',
        product_id_magento: null,
        product_id_netsuite: null,
        is_primary: 1,
        is_discontinue: 0,
        is_active: 1,
        created_at: '2018-01-06T10:44:13.000Z',
        updated_at: '2018-01-18T15:40:54.000Z'
    });
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves({
        id: 2,
        name: 'Apple iPhone 7',
        category_id: 561,
        brand_id: 81,
        uom_id: 1,
        stocking_uom_id: 1,
        quantity_stocking_uom: 1,
        manufacturing_number: 'MPN7PK1781',
        manufacturing_number_type: null,
        package_weight: 800,
        package_length: '100.00',
        package_width: '200.00',
        package_height: '300.00',
        package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
        barcode: '5012345678900',
        description: '<p>Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.\n\nDi iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.</p>',
        primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        created_at: '2017-12-19T14:59:19.000Z',
        updated_at: '2018-01-24T08:56:47.000Z'
    });
    t.context.sandbox.stub(CustomeRepository, 'findAllCategoryId').resolves([
        {
            c0: 8,
            c1: 52,
            c2: 219,
            c3: 561
        }
    ]);
    t.context.sandbox.stub(ProductVendorRepository, 'findByVariant').resolves([
        {
            id: 2,
            product_variant_id: 2,
            vendor_id: 3,
            warehouse_id: 3,
            location_label: 'Jakarta Barat',
            stock_available: 19,
            stock_used: 0,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 10,
            tier_min_qty_3: 15,
            tier_cogs_price_1: '20000000.00',
            tier_cogs_price_2: '20000000.00',
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
            updated_at: '2018-01-23T04:16:56.000Z'
        }
    ]);
    t.context.sandbox.stub(BrandRepository, 'findById').resolves({
        id: 81,
        name: 'Apple',
        image_url: null,
        created_at: '2017-11-28T14:54:10.000Z',
        updated_at: '2017-11-28T14:54:10.000Z'
    });
    t.context.sandbox.stub(UomRepository, 'findById').resolves({
        id: 1,
        name: 'Unit',
        created_at: '2017-12-05T16:59:10.000Z',
        updated_at: '2017-12-05T16:59:10.000Z'
    });

    t.context.sandbox.stub(StockingUomRepository, 'findById').resolves({
        id: 1,
        name: 'Dozeeen update',
        created_at: '2017-12-05T16:55:00.000Z',
        updated_at: '2018-01-24T08:48:07.000Z'
    });
    const callback = t.context.sandbox.stub(CategoryRepository, 'findOne');
    callback.onCall(0).resolves({
        id: 8,
        name: 'IT and Mobile Devices',
        level: 'C0',
        base_margin: null,
        commission: null,
        unspsc: 43000000,
        sequence: 1,
        parent_id: null,
        is_active: 1,
        created_at: '2017-12-18T06:32:18.000Z',
        updated_at: '2017-12-18T06:32:18.000Z'
    });
    callback.onCall(1).resolves({
        id: 52,
        name: 'Communications Devices & Accessories',
        level: 'C1',
        base_margin: null,
        commission: null,
        unspsc: 43190000,
        sequence: 1,
        parent_id: 8,
        is_active: 1,
        created_at: '2017-12-18T06:32:18.000Z',
        updated_at: '2017-12-18T06:32:18.000Z'
    });
    callback.onCall(2).resolves({
        id: 219,
        name: 'Personal communication devices',
        level: 'C2',
        base_margin: null,
        commission: null,
        unspsc: 43191500,
        sequence: 1,
        parent_id: 52,
        is_active: 1,
        created_at: '2017-12-18T06:32:18.000Z',
        updated_at: '2017-12-18T06:32:18.000Z'
    });
    callback.onCall(3).resolves({
        id: 561,
        name: 'Mobile phones',
        level: 'C3',
        base_margin: null,
        commission: null,
        unspsc: 43191501,
        sequence: 1,
        parent_id: 219,
        is_active: 1,
        created_at: '2017-12-18T06:32:18.000Z',
        updated_at: '2017-12-18T06:32:18.000Z'
    });
    t.context.sandbox.stub(GeneralRepository, 'findAttributeByVariantValue').resolves([
        {
            attribute_code: 'phone_color',
            attribute_code_label: 'Warna',
            attribute_value_id: 2,
            attribute_value_name: 'Black'
        },
        {
            attribute_code: 'phone_storage',
            attribute_code_label: 'Kapasitas',
            attribute_value_id: 4,
            attribute_value_name: '64GB'
        }
    ]);
    t.context.sandbox.stub(ProductGroupAttributeCategory, 'findAll').resolves([
        {
            id: 3,
            product_group_id: 2,
            attribute_code_id: 3,
            attribute_value_id: 5,
            text_input: null,
            is_variant: 0,
            created_at: '2017-12-19T08:01:38.000Z',
            updated_at: '2018-01-17T06:05:39.000Z',
            AttributeCode: {
                id: 3,
                code: 'phone_os',
                label: 'Sistem Operasi',
                type: 'dropdown',
                created_at: '2017-12-19T10:37:02.000Z',
                updated_at: '2017-12-19T10:37:04.000Z',
                AttributeValues: [
                    {
                        id: 5,
                        attribute_code_id: 3,
                        value: 'iOS',
                        image_url: null,
                        created_at: '2017-12-19T03:42:53.000Z',
                        updated_at: '2017-12-19T03:42:53.000Z'
                    },
                    {
                        id: 6,
                        attribute_code_id: 3,
                        value: 'Android',
                        image_url: null,
                        created_at: '2017-12-19T03:43:04.000Z',
                        updated_at: '2017-12-19T03:43:04.000Z'
                    }
                ]
            },
            AttributeValue: {
                id: 5,
                attribute_code_id: 3,
                value: 'iOS',
                image_url: null,
                created_at: '2017-12-19T03:42:53.000Z',
                updated_at: '2017-12-19T03:42:53.000Z'
            }
        },
        {
            id: 4,
            product_group_id: 2,
            attribute_code_id: 4,
            attribute_value_id: null,
            text_input: 'Super AMOLED capacitive touchscreen, 16M colors',
            is_variant: 0,
            created_at: '2017-12-19T08:02:03.000Z',
            updated_at: '2018-01-17T06:05:39.000Z',
            AttributeCode: {
                id: 4,
                code: 'phone_display',
                label: 'Layar',
                type: 'textinput',
                created_at: '2017-12-19T10:37:34.000Z',
                updated_at: '2017-12-19T10:37:37.000Z',
                AttributeValues: []
            },
            AttributeValue: null
        }
    ]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                sku: 'X152KT2GKF'
            }
        };
        const result = yield Methods.getProductDetailBySku(data, context);
        const expected = {
            data: {
                type: 'product_variant',
                id: 2,
                sku: 'X152KT2GKF',
                name: 'Apple iPhone 7 - Black - 64GB',
                brand: {
                    id: 81,
                    name: 'Apple',
                    url_key: 'apple'
                },
                uom: {
                    id: 1,
                    name: 'Unit'
                },
                stocking_uom: {
                    id: 1,
                    name: 'Dozeeen update'
                },
                quantity_stocking_uom: 1,
                categories: {
                    c0: {
                        id: 8,
                        name: 'IT and Mobile Devices',
                        url_key: 'it-and-mobile-devices_c0.8',
                        unspsc: 43000000
                    },
                    c1: {
                        id: 52,
                        name: 'Communications Devices & Accessories',
                        url_key: 'communications-devices-accessories_c1.52',
                        unspsc: 43190000
                    },
                    c2: {
                        id: 219,
                        name: 'Personal communication devices',
                        url_key: 'personal-communication-devices_c2.219',
                        unspsc: 43191500
                    },
                    c3: {
                        id: 561,
                        name: 'Mobile phones',
                        url_key: 'mobile-phones_c3.561',
                        unspsc: 43191501
                    }
                },
                barcode: '5012345678900',
                manufacturing_number: 'MPN7PK1781',
                package_weight: 800,
                package_length: 100,
                package_width: 200,
                package_height: 300,
                package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
                primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
                additional_image: [
                    'https://ecs7.tokopedia.net/img/cache/700/product-1/2016/11/25/98262774/98262774_4ea3f7ac-c76a-4926-8ee0-92c24a15fa2a_599_600',
                    'https://ecs7.tokopedia.net/img/cache/700/product-1/2017/1/13/98262774/98262774_6fcdfe95-cd8c-43bb-99bb-5da0f9a54a7e_700_700'
                ],
                description: '<p>Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.\n\nDi iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.</p>',
                product_group: {
                    id: 2,
                    name: 'Apple iPhone 7'
                },
                specifications: [
                    {
                        code: 'phone_os',
                        label: 'Sistem Operasi',
                        value: 'iOS'
                    },
                    {
                        code: 'phone_display',
                        label: 'Layar',
                        value: 'Super AMOLED capacitive touchscreen, 16M colors'
                    }
                ],
                variants: [
                    {
                        code: 'phone_color',
                        label: 'Warna',
                        value: 'Black'
                    },
                    {
                        code: 'phone_storage',
                        label: 'Kapasitas',
                        value: '64GB'
                    }
                ],
                variant_count: 2,
                variant_matrix: [
                    'phone_color',
                    'phone_storage'
                ],
                variant_value: {
                    phone_color: 2,
                    phone_storage: 4
                },
                start_from: 20000000,
                total_offer: 1
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});


test.serial('Should be return success with another data', function* (t) {
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves({
        id: 2,
        product_group_id: 2,
        sku: 'X152KT2GKF',
        long_name: 'Apple iPhone 7 - Black - 64GB',
        variant_value: 'NO_VARIANT',
        primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
        additional_image: '["https://ecs7.tokopedia.net/img/cache/700/product-1/2016/11/25/98262774/98262774_4ea3f7ac-c76a-4926-8ee0-92c24a15fa2a_599_600","https://ecs7.tokopedia.net/img/cache/700/product-1/2017/1/13/98262774/98262774_6fcdfe95-cd8c-43bb-99bb-5da0f9a54a7e_700_700"]',
        product_id_magento: null,
        product_id_netsuite: null,
        is_primary: 1,
        is_discontinue: 0,
        is_active: 1,
        created_at: '2018-01-06T10:44:13.000Z',
        updated_at: '2018-01-18T15:40:54.000Z'
    });
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves({
        id: 2,
        name: 'Apple iPhone 7',
        category_id: 561,
        brand_id: 81,
        uom_id: 1,
        stocking_uom_id: 1,
        quantity_stocking_uom: 1,
        manufacturing_number: 'MPN7PK1781',
        manufacturing_number_type: null,
        package_weight: 800,
        package_length: '100.00',
        package_width: '200.00',
        package_height: '300.00',
        package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
        barcode: '5012345678900',
        description: '<p>Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.\n\nDi iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.</p>',
        primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
        variant_count: 2,
        variant_matrix: [],
        status: 1,
        visibility: 1,
        created_by: 2,
        created_at: '2017-12-19T14:59:19.000Z',
        updated_at: '2018-01-24T08:56:47.000Z'
    });
    t.context.sandbox.stub(CustomeRepository, 'findAllCategoryId').resolves([
        {
            c0: 8,
            c1: 52,
            c2: 219,
            c3: 561
        }
    ]);
    t.context.sandbox.stub(ProductVendorRepository, 'findByVariant').resolves([
        {
            id: 2,
            product_variant_id: 2,
            vendor_id: 3,
            warehouse_id: 3,
            location_label: 'Jakarta Barat',
            stock_available: 19,
            stock_used: 0,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 10,
            tier_min_qty_3: 15,
            tier_cogs_price_1: '20000000.00',
            tier_cogs_price_2: '20000000.00',
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
            updated_at: '2018-01-23T04:16:56.000Z'
        }
    ]);
    t.context.sandbox.stub(BrandRepository, 'findById').resolves({
        id: 81,
        name: 'Apple',
        image_url: null,
        created_at: '2017-11-28T14:54:10.000Z',
        updated_at: '2017-11-28T14:54:10.000Z'
    });
    t.context.sandbox.stub(UomRepository, 'findById').resolves({
        id: 1,
        name: 'Unit',
        created_at: '2017-12-05T16:59:10.000Z',
        updated_at: '2017-12-05T16:59:10.000Z'
    });

    t.context.sandbox.stub(StockingUomRepository, 'findById').resolves({
        id: 1,
        name: 'Dozeeen update',
        created_at: '2017-12-05T16:55:00.000Z',
        updated_at: '2018-01-24T08:48:07.000Z'
    });
    const callback = t.context.sandbox.stub(CategoryRepository, 'findOne');
    callback.onCall(0).resolves({
        id: 8,
        name: 'IT and Mobile Devices',
        level: 'C0',
        base_margin: null,
        commission: null,
        unspsc: 43000000,
        sequence: 1,
        parent_id: null,
        is_active: 1,
        created_at: '2017-12-18T06:32:18.000Z',
        updated_at: '2017-12-18T06:32:18.000Z'
    });
    callback.onCall(1).resolves({
        id: 52,
        name: 'Communications Devices & Accessories',
        level: 'C1',
        base_margin: null,
        commission: null,
        unspsc: 43190000,
        sequence: 1,
        parent_id: 8,
        is_active: 1,
        created_at: '2017-12-18T06:32:18.000Z',
        updated_at: '2017-12-18T06:32:18.000Z'
    });
    callback.onCall(2).resolves({
        id: 219,
        name: 'Personal communication devices',
        level: 'C2',
        base_margin: null,
        commission: null,
        unspsc: 43191500,
        sequence: 1,
        parent_id: 52,
        is_active: 1,
        created_at: '2017-12-18T06:32:18.000Z',
        updated_at: '2017-12-18T06:32:18.000Z'
    });
    callback.onCall(3).resolves({
        id: 561,
        name: 'Mobile phones',
        level: 'C3',
        base_margin: null,
        commission: null,
        unspsc: 43191501,
        sequence: 1,
        parent_id: 219,
        is_active: 1,
        created_at: '2017-12-18T06:32:18.000Z',
        updated_at: '2017-12-18T06:32:18.000Z'
    });
    t.context.sandbox.stub(GeneralRepository, 'findAttributeByVariantValue').resolves([
        {
            attribute_code: 'phone_color',
            attribute_code_label: 'Warna',
            attribute_value_id: 2,
            attribute_value_name: 'Black'
        },
        {
            attribute_code: 'phone_storage',
            attribute_code_label: 'Kapasitas',
            attribute_value_id: 4,
            attribute_value_name: '64GB'
        }
    ]);
    t.context.sandbox.stub(ProductGroupAttributeCategory, 'findAll').resolves([]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                sku: 'X152KT2GKF'
            }
        };
        const result = yield Methods.getProductDetailBySku(data, context);
        const expected = {
            data: {
                type: 'product_variant',
                id: 2,
                sku: 'X152KT2GKF',
                name: 'Apple iPhone 7 - Black - 64GB',
                brand: {
                    id: 81,
                    name: 'Apple',
                    url_key: 'apple'
                },
                uom: {
                    id: 1,
                    name: 'Unit'
                },
                stocking_uom: {
                    id: 1,
                    name: 'Dozeeen update'
                },
                quantity_stocking_uom: 1,
                categories: {
                    c0: {
                        id: 8,
                        name: 'IT and Mobile Devices',
                        url_key: 'it-and-mobile-devices_c0.8',
                        unspsc: 43000000
                    },
                    c1: {
                        id: 52,
                        name: 'Communications Devices & Accessories',
                        url_key: 'communications-devices-accessories_c1.52',
                        unspsc: 43190000
                    },
                    c2: {
                        id: 219,
                        name: 'Personal communication devices',
                        url_key: 'personal-communication-devices_c2.219',
                        unspsc: 43191500
                    },
                    c3: {
                        id: 561,
                        name: 'Mobile phones',
                        url_key: 'mobile-phones_c3.561',
                        unspsc: 43191501
                    }
                },
                barcode: '5012345678900',
                manufacturing_number: 'MPN7PK1781',
                package_weight: 800,
                package_length: 100,
                package_width: 200,
                package_height: 300,
                package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
                primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
                additional_image: [
                    'https://ecs7.tokopedia.net/img/cache/700/product-1/2016/11/25/98262774/98262774_4ea3f7ac-c76a-4926-8ee0-92c24a15fa2a_599_600',
                    'https://ecs7.tokopedia.net/img/cache/700/product-1/2017/1/13/98262774/98262774_6fcdfe95-cd8c-43bb-99bb-5da0f9a54a7e_700_700'
                ],
                description: '<p>Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.\n\nDi iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.</p>',
                product_group: {
                    id: 2,
                    name: 'Apple iPhone 7'
                },
                specifications: [
                ],
                variants: [
                ],
                variant_count: 2,
                variant_matrix: [
                ],
                variant_value: 'NO_VARIANT',
                start_from: 20000000,
                total_offer: 1
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return success NO_VARIANT', function* (t) {
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves({
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
        updated_at: '2018-01-24T08:55:17.000Z'
    });
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves({
        id: 1,
        name: 'Tissue Toilet Paseo',
        category_id: 444,
        brand_id: 1194,
        uom_id: 3,
        stocking_uom_id: 7,
        quantity_stocking_uom: 1,
        manufacturing_number: 'MPN5061025',
        manufacturing_number_type: null,
        package_weight: 100,
        package_length: '20.00',
        package_width: '30.00',
        package_height: '20.00',
        package_content: 'Toilet paper and toilet paper holder.',
        barcode: '9780201379624',
        description: '<p>Bila kita selesai makan makanan yang berminyak dan sedang tidak berada di rumah, maka yang paling di cari adalah lembaran tisu yang dapat anda gunakan untuk membersihkan sisa kotoran pada tangan. Tisu juga dapat berperan untuk mengeringkan tangan atau banyak lagi manfaat dari tisu yang sejarang ini telah banyak di gunakan. salah satu produk tisu yang banyak di cari adalah tisu Paseo.</p>',
        primary_image: 'https://cf.shopee.co.id/file/d7bafa4b960799c76fb21c7b970b6cc8',
        variant_count: 0,
        variant_matrix: '[]',
        status: 1,
        visibility: 1,
        created_by: 2,
        created_at: '2017-12-19T00:00:00.000Z',
        updated_at: '2018-01-24T08:55:17.000Z'
    });
    t.context.sandbox.stub(CustomeRepository, 'findAllCategoryId').resolves([
        {
            c0: 10,
            c1: 63,
            c2: 240,
            c3: 444
        }
    ]);
    t.context.sandbox.stub(ProductVendorRepository, 'findByVariant').resolves([
        {
            id: 1,
            product_variant_id: 1,
            vendor_id: 3,
            warehouse_id: 3,
            location_label: 'Jakarta Selatan',
            stock_available: 19,
            stock_used: 0,
            currency: 'IDR',
            tier_min_qty_1: 100,
            tier_min_qty_2: 200,
            tier_min_qty_3: 300,
            tier_cogs_price_1: '12000.00',
            tier_cogs_price_2: '11500.00',
            tier_cogs_price_3: '11000.00',
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
            created_by: 3,
            created_at: '2018-01-06T10:59:52.000Z',
            updated_at: '2018-01-06T10:59:52.000Z'
        }
    ]);
    t.context.sandbox.stub(BrandRepository, 'findById').resolves({
        id: 1194,
        name: 'Paseo',
        image_url: null,
        created_at: '2017-11-28T14:54:10.000Z',
        updated_at: '2017-11-28T14:54:10.000Z'
    });
    t.context.sandbox.stub(UomRepository, 'findById').resolves({
        id: 3,
        name: 'Pack',
        created_at: '2017-12-05T16:59:10.000Z',
        updated_at: '2017-12-05T16:59:10.000Z'
    });

    t.context.sandbox.stub(StockingUomRepository, 'findById').resolves({
        id: 7,
        name: 'Pack 50',
        created_at: '2017-12-05T16:55:00.000Z',
        updated_at: '2017-12-05T16:55:00.000Z'
    });
    const callback = t.context.sandbox.stub(CategoryRepository, 'findOne');
    callback.onCall(0).resolves({
        id: 10,
        name: 'Pantry, Cleaning, and Health',
        level: 'C0',
        base_margin: null,
        commission: null,
        unspsc: 47000000,
        sequence: 1,
        parent_id: null,
        is_active: 1,
        created_at: '2017-12-18T06:32:18.000Z',
        updated_at: '2017-12-18T06:32:18.000Z'
    });
    callback.onCall(1).resolves({
        id: 63,
        name: 'Cleaning and janitorial supplies',
        level: 'C1',
        base_margin: null,
        commission: null,
        unspsc: 47130000,
        sequence: 1,
        parent_id: 10,
        is_active: 1,
        created_at: '2017-12-18T06:32:18.000Z',
        updated_at: '2017-12-18T06:32:18.000Z'
    });
    callback.onCall(2).resolves({
        id: 240,
        name: 'Restroom supplies',
        level: 'C2',
        base_margin: null,
        commission: null,
        unspsc: 47131700,
        sequence: 1,
        parent_id: 63,
        is_active: 1,
        created_at: '2017-12-18T06:32:18.000Z',
        updated_at: '2017-12-18T06:32:18.000Z'
    });
    callback.onCall(3).resolves({
        id: 444,
        name: 'Facial tissue dispensers',
        level: 'C3',
        base_margin: null,
        commission: null,
        unspsc: 47131709,
        sequence: 1,
        parent_id: 240,
        is_active: 1,
        created_at: '2017-12-18T06:32:18.000Z',
        updated_at: '2017-12-18T06:32:18.000Z'
    });
    t.context.sandbox.stub(ProductGroupAttributeCategory, 'findAll').resolves([]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                sku: 'YG6Z71PB0H'
            }
        };
        const result = yield Methods.getProductDetailBySku(data, context);
        const expected = {
            data: {
                type: 'product_variant',
                id: 1,
                sku: 'YG6Z71PB0H',
                name: 'Tissue Toilet Paseo',
                brand: {
                    id: 1194,
                    name: 'Paseo',
                    url_key: 'paseo'
                },
                uom: {
                    id: 3,
                    name: 'Pack'
                },
                stocking_uom: {
                    id: 7,
                    name: 'Pack 50'
                },
                quantity_stocking_uom: 1,
                categories: {
                    c0: {
                        id: 10,
                        name: 'Pantry, Cleaning, and Health',
                        url_key: 'pantry-cleaning-and-health_c0.10',
                        unspsc: 47000000
                    },
                    c1: {
                        id: 63,
                        name: 'Cleaning and janitorial supplies',
                        url_key: 'cleaning-and-janitorial-supplies_c1.63',
                        unspsc: 47130000
                    },
                    c2: {
                        id: 240,
                        name: 'Restroom supplies',
                        url_key: 'restroom-supplies_c2.240',
                        unspsc: 47131700
                    },
                    c3: {
                        id: 444,
                        name: 'Facial tissue dispensers',
                        url_key: 'facial-tissue-dispensers_c3.444',
                        unspsc: 47131709
                    }
                },
                barcode: '9780201379624',
                manufacturing_number: 'MPN5061025',
                package_weight: 100,
                package_length: 20,
                package_width: 30,
                package_height: 20,
                package_content: 'Toilet paper and toilet paper holder.',
                primary_image: 'https://cf.shopee.co.id/file/d7bafa4b960799c76fb21c7b970b6cc8',
                additional_image: [
                    'https://ecs7.tokopedia.net/img/cache/300/product-1/2017/6/10/1843029/1843029_dbf5e778-bae1-46fe-86e7-acb890bd5aef.jpg',
                    'https://ecs7.tokopedia.net/img/cache/700/product-1/2017/6/10/1843029/1843029_ecf9290a-1882-4350-a77e-487b4099dfb0.jpg'
                ],
                description: '<p>Bila kita selesai makan makanan yang berminyak dan sedang tidak berada di rumah, maka yang paling di cari adalah lembaran tisu yang dapat anda gunakan untuk membersihkan sisa kotoran pada tangan. Tisu juga dapat berperan untuk mengeringkan tangan atau banyak lagi manfaat dari tisu yang sejarang ini telah banyak di gunakan. salah satu produk tisu yang banyak di cari adalah tisu Paseo.</p>',
                product_group: {
                    id: 1,
                    name: 'Tissue Toilet Paseo'
                },
                specifications: [],
                variants: [],
                variant_count: 0,
                variant_matrix: [],
                variant_value: 'NO_VARIANT',
                start_from: 12000,
                total_offer: 1
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return success transformer uncovered line', function* (t) {
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves({
        id: 2,
        product_group_id: 2,
        sku: 'X152KT2GKF',
        long_name: 'Apple iPhone 7 - Black - 64GB',
        variant_value: '{}',
        primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
        additional_image: '["https://ecs7.tokopedia.net/img/cache/700/product-1/2016/11/25/98262774/98262774_4ea3f7ac-c76a-4926-8ee0-92c24a15fa2a_599_600","https://ecs7.tokopedia.net/img/cache/700/product-1/2017/1/13/98262774/98262774_6fcdfe95-cd8c-43bb-99bb-5da0f9a54a7e_700_700"]',
        product_id_magento: null,
        product_id_netsuite: null,
        is_primary: 1,
        is_discontinue: 0,
        is_active: 1,
        created_at: '2018-01-06T10:44:13.000Z',
        updated_at: '2018-01-18T15:40:54.000Z'
    });
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves({
        id: 2,
        name: 'Apple iPhone 7',
        category_id: 561,
        brand_id: 81,
        uom_id: 1,
        stocking_uom_id: 1,
        quantity_stocking_uom: 1,
        manufacturing_number: 'MPN7PK1781',
        manufacturing_number_type: null,
        package_weight: 800,
        package_length: '100.00',
        package_width: '200.00',
        package_height: '300.00',
        package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
        barcode: '5012345678900',
        description: '<p>Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.\n\nDi iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.</p>',
        primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
        variant_count: 0,
        variant_matrix: '[]',
        status: 1,
        visibility: 1,
        created_by: 2,
        created_at: '2017-12-19T14:59:19.000Z',
        updated_at: '2018-01-24T08:56:47.000Z'
    });
    t.context.sandbox.stub(CustomeRepository, 'findAllCategoryId').resolves([
        {
            c0: 8,
            c1: 52,
            c2: 219,
            c3: 561
        }
    ]);
    t.context.sandbox.stub(ProductVendorRepository, 'findByVariant').resolves([]);
    t.context.sandbox.stub(BrandRepository, 'findById').resolves({
        id: 81,
        name: 'Apple',
        image_url: null,
        created_at: '2017-11-28T14:54:10.000Z',
        updated_at: '2017-11-28T14:54:10.000Z'
    });
    t.context.sandbox.stub(UomRepository, 'findById').resolves({
        id: 1,
        name: 'Unit',
        created_at: '2017-12-05T16:59:10.000Z',
        updated_at: '2017-12-05T16:59:10.000Z'
    });

    t.context.sandbox.stub(StockingUomRepository, 'findById').resolves({
        id: 1,
        name: 'Dozeeen update',
        created_at: '2017-12-05T16:55:00.000Z',
        updated_at: '2018-01-24T08:48:07.000Z'
    });
    const callback = t.context.sandbox.stub(CategoryRepository, 'findOne');
    callback.onCall(0).resolves({
        id: 8,
        name: 'IT and Mobile Devices',
        level: 'C0',
        base_margin: null,
        commission: null,
        unspsc: 43000000,
        sequence: 1,
        parent_id: null,
        is_active: 1,
        created_at: '2017-12-18T06:32:18.000Z',
        updated_at: '2017-12-18T06:32:18.000Z'
    });
    callback.onCall(1).resolves({
        id: 52,
        name: 'Communications Devices & Accessories',
        level: 'C1',
        base_margin: null,
        commission: null,
        unspsc: 43190000,
        sequence: 1,
        parent_id: 8,
        is_active: 1,
        created_at: '2017-12-18T06:32:18.000Z',
        updated_at: '2017-12-18T06:32:18.000Z'
    });
    callback.onCall(2).resolves({
        id: 219,
        name: 'Personal communication devices',
        level: 'C2',
        base_margin: null,
        commission: null,
        unspsc: 43191500,
        sequence: 1,
        parent_id: 52,
        is_active: 1,
        created_at: '2017-12-18T06:32:18.000Z',
        updated_at: '2017-12-18T06:32:18.000Z'
    });
    callback.onCall(3).resolves({
        id: 561,
        name: 'Mobile phones',
        level: 'C3',
        base_margin: null,
        commission: null,
        unspsc: 43191501,
        sequence: 1,
        parent_id: 219,
        is_active: 1,
        created_at: '2017-12-18T06:32:18.000Z',
        updated_at: '2017-12-18T06:32:18.000Z'
    });

    t.context.sandbox.stub(GeneralRepository, 'findAttributeByVariantValue').resolves([]);
    t.context.sandbox.stub(ProductGroupAttributeCategory, 'findAll').resolves([]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                sku: 'X152KT2GKF'
            }
        };
        const result = yield Methods.getProductDetailBySku(data, context);
        const expected = {
            data: {
                type: 'product_variant',
                id: 2,
                sku: 'X152KT2GKF',
                name: 'Apple iPhone 7 - Black - 64GB',
                brand: {
                    id: 81,
                    name: 'Apple',
                    url_key: 'apple'
                },
                uom: {
                    id: 1,
                    name: 'Unit'
                },
                stocking_uom: {
                    id: 1,
                    name: 'Dozeeen update'
                },
                quantity_stocking_uom: 1,
                categories: {
                    c0: {
                        id: 8,
                        name: 'IT and Mobile Devices',
                        url_key: 'it-and-mobile-devices_c0.8',
                        unspsc: 43000000
                    },
                    c1: {
                        id: 52,
                        name: 'Communications Devices & Accessories',
                        url_key: 'communications-devices-accessories_c1.52',
                        unspsc: 43190000
                    },
                    c2: {
                        id: 219,
                        name: 'Personal communication devices',
                        url_key: 'personal-communication-devices_c2.219',
                        unspsc: 43191500
                    },
                    c3: {
                        id: 561,
                        name: 'Mobile phones',
                        url_key: 'mobile-phones_c3.561',
                        unspsc: 43191501
                    }
                },
                barcode: '5012345678900',
                manufacturing_number: 'MPN7PK1781',
                package_weight: 800,
                package_length: 100,
                package_width: 200,
                package_height: 300,
                package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
                primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
                additional_image: [
                    'https://ecs7.tokopedia.net/img/cache/700/product-1/2016/11/25/98262774/98262774_4ea3f7ac-c76a-4926-8ee0-92c24a15fa2a_599_600',
                    'https://ecs7.tokopedia.net/img/cache/700/product-1/2017/1/13/98262774/98262774_6fcdfe95-cd8c-43bb-99bb-5da0f9a54a7e_700_700'
                ],
                description: '<p>Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.\n\nDi iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.</p>',
                product_group: {
                    id: 2,
                    name: 'Apple iPhone 7'
                },
                specifications: [],
                variants: [],
                variant_count: 0,
                variant_matrix: [],
                variant_value: {},
                start_from: 0,
                total_offer: 0
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return Bad Request', function* (t) {
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                sku: ''
            }
        };
        yield Methods.getProductDetailBySku(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Should be return Not Found', function* (t) {
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves(null);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                sku: 'X152KT2GKFSDF'
            }
        };
        yield Methods.getProductDetailBySku(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'SKU Not Found');
    }
});


test.serial('Should be return auth error', function* (t) {
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves(null);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                sku: 'X152KT2GKFSDF'
            }
        };
        yield Methods.getProductDetailBySku(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'SKU Not Found');
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
