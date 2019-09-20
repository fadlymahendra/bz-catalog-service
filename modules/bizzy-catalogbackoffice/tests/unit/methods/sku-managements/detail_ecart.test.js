'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError, BizzyService } = require('bizzy-common');
const ProductVariantRepository = require('../../../../src/repositories/product_variant');
const ProductVendorRepository = require('../../../../src/repositories/product_vendor');
const ProductGroupRepository = require('../../../../src/repositories/product_group');
const CustomeRepository = require('../../../../src/repositories/raw_query');
const CategoryRepository = require('../../../../src/repositories/category');
const BrandRepository = require('../../../../src/repositories/brand');
const StockingUomRepository = require('../../../../src/repositories/stocking_uom');
const UomRepository = require('../../../../src/repositories/uom');
const Methods = require('../../../../src/methods/sku-managements/detail_ecart');

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
            id: 5,
            product_variant_id: 2,
            vendor_id: 2,
            warehouse_id: 1,
            location_label: 'Jakarta selatan',
            stock_available: 212,
            stock_used: 0,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 5,
            tier_min_qty_3: 10,
            tier_cogs_price_1: '20000.00',
            tier_cogs_price_2: '19500.00',
            tier_cogs_price_3: '19000.00',
            warranty_option: 'no_warranty',
            warranty_period: null,
            warranty_limit: null,
            warranty_coverage: null,
            indent_period: null,
            indent_limit: null,
            reference_link: null,
            sku_vendor: null,
            is_indent: 0,
            is_active: 1,
            created_by: 4,
            created_at: '2018-01-18T11:03:47.000Z',
            updated_at: '2018-01-18T11:03:47.000Z'
        },
        {
            id: 2,
            product_variant_id: 2,
            vendor_id: 3,
            warehouse_id: 99999,
            location_label: 'Jakarta Barat',
            stock_available: 0,
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
    t.context.sandbox.stub(BizzyService, 'callSync').resolves({
        data: [
            {
                id: 2,
                prefix: 'PT',
                name: 'Vendor Abadi',
                suffix: 'Tbk.',
                npwp: '521652651625615',
                place: 'Abadi Tower',
                street: 'Jalan budi utomo no.39',
                phone: '62216356536',
                status: 3,
                created_at: '2018-01-05T12:48:22.000Z',
                geograph: {
                    id: 16014,
                    province: 'Jakarta',
                    city: 'Jakarta Selatan',
                    district: 'Jagakarsa',
                    village: 'Tanjung Barat',
                    zipcode: '12530',
                    geotag: '1006115105',
                    jnecitycode: 'CGK10201'
                }
            },
            {
                id: 3,
                prefix: 'PT',
                name: 'Vendor Jaya',
                suffix: 'Tbk.',
                npwp: '256156251652611',
                place: 'Jaya Tower',
                street: 'Jalan budi jaya no.39',
                phone: '6221652152516',
                status: 3,
                created_at: '2018-01-05T12:53:17.000Z',
                geograph: {
                    id: 14960,
                    province: 'Jakarta',
                    city: 'Jakarta Pusat',
                    district: 'Cempaka Putih',
                    village: 'Cempaka Putih Barat',
                    zipcode: '10520',
                    geotag: '1006115000',
                    jnecitycode: 'CGK10301'
                }
            }
        ],
        meta: {
            page: 1,
            limit: 50,
            total_data: 2,
            total_page: 1,
            filter: {
                is_vendor: 1,
                id: [
                    '2',
                    '3'
                ]
            }
        }
    });
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: 'X152KT2GKF'
            }
        };
        const result = yield Methods.getSkuManagementBySku(data, context);
        const expected = {
            data: {
                id: 2,
                sku: 'X152KT2GKF',
                name: 'Apple iPhone 7 - Black - 64GB',
                // brand: {
                //     id: 81,
                //     name: 'Apple'
                // },
                uom: {
                    id: 1,
                    name: 'Unit'
                },
                stocking_uom: {
                    id: 1,
                    name: 'Dozeeen update'
                },
                quantity_stocking_uom: 1,
                // categories: {
                //     c0: {
                //         id: 8,
                //         name: 'IT and Mobile Devices',
                //         unspsc: 43000000
                //     },
                //     c1: {
                //         id: 52,
                //         name: 'Communications Devices & Accessories',
                //         unspsc: 43190000
                //     },
                //     c2: {
                //         id: 219,
                //         name: 'Personal communication devices',
                //         unspsc: 43191500
                //     },
                //     c3: {
                //         id: 561,
                //         name: 'Mobile phones',
                //         unspsc: 43191501
                //     }
                // },
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
                product_vendors: [
                    {
                        id: 5,
                        vendor_id: 2,
                        vendor_name: 'PT Vendor Abadi Tbk.',
                        warehouse_id: 1,
                        stock_available: 212,
                        currency: 'IDR',
                        tier_min_qty_1: 1,
                        tier_min_qty_2: 5,
                        tier_min_qty_3: 10,
                        tier_cogs_price_1: 20000,
                        tier_cogs_price_2: 19500,
                        tier_cogs_price_3: 19000,
                        sku_vendor: ''
                    },
                    {
                        id: 2,
                        vendor_id: 3,
                        vendor_name: 'PT Vendor Jaya Tbk.',
                        warehouse_id: 99999,
                        stock_available: 0,
                        currency: 'IDR',
                        tier_min_qty_1: 1,
                        tier_min_qty_2: 10,
                        tier_min_qty_3: 15,
                        tier_cogs_price_1: 20000000,
                        tier_cogs_price_2: 20000000,
                        tier_cogs_price_3: 20000000,
                        sku_vendor: 'UT9DXEMP74'
                    }
                ],
                cheapest: {
                    id: 5,
                    vendor_id: 2,
                    vendor_name: 'PT Vendor Abadi Tbk.',
                    warehouse_id: 1,
                    stock_available: 212,
                    currency: 'IDR',
                    tier_min_qty_1: 1,
                    tier_min_qty_2: 5,
                    tier_min_qty_3: 10,
                    tier_cogs_price_1: 20000,
                    tier_cogs_price_2: 19500,
                    tier_cogs_price_3: 19000,
                    sku_vendor: ''
                }
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return Success no vendor name', function* (t) {
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
    // t.context.sandbox.stub(CustomeRepository, 'findAllCategoryId').resolves([
    //     {
    //         c0: 8,
    //         c1: 52,
    //         c2: 219,
    //         c3: 561
    //     }
    // ]);
    t.context.sandbox.stub(ProductVendorRepository, 'findByVariant').resolves([
        {
            id: 5,
            product_variant_id: 2,
            vendor_id: 2,
            warehouse_id: 1,
            location_label: 'Jakarta selatan',
            stock_available: 212,
            stock_used: 0,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 5,
            tier_min_qty_3: 10,
            tier_cogs_price_1: '20000.00',
            tier_cogs_price_2: '19500.00',
            tier_cogs_price_3: '19000.00',
            warranty_option: 'no_warranty',
            warranty_period: null,
            warranty_limit: null,
            warranty_coverage: null,
            indent_period: null,
            indent_limit: null,
            reference_link: null,
            sku_vendor: null,
            is_indent: 0,
            is_active: 1,
            created_by: 4,
            created_at: '2018-01-18T11:03:47.000Z',
            updated_at: '2018-01-18T11:03:47.000Z'
        },
        {
            id: 2,
            product_variant_id: 2,
            vendor_id: 3,
            warehouse_id: 99999,
            location_label: 'Jakarta Barat',
            stock_available: 0,
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
    // t.context.sandbox.stub(BrandRepository, 'findById').resolves({
    //     id: 81,
    //     name: 'Apple',
    //     image_url: null,
    //     created_at: '2017-11-28T14:54:10.000Z',
    //     updated_at: '2017-11-28T14:54:10.000Z'
    // });
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
    // const callback = t.context.sandbox.stub(CategoryRepository, 'findOne');
    // callback.onCall(0).resolves({
    //     id: 8,
    //     name: 'IT and Mobile Devices',
    //     level: 'C0',
    //     base_margin: null,
    //     commission: null,
    //     unspsc: 43000000,
    //     sequence: 1,
    //     parent_id: null,
    //     is_active: 1,
    //     created_at: '2017-12-18T06:32:18.000Z',
    //     updated_at: '2017-12-18T06:32:18.000Z'
    // });
    // callback.onCall(1).resolves({
    //     id: 52,
    //     name: 'Communications Devices & Accessories',
    //     level: 'C1',
    //     base_margin: null,
    //     commission: null,
    //     unspsc: 43190000,
    //     sequence: 1,
    //     parent_id: 8,
    //     is_active: 1,
    //     created_at: '2017-12-18T06:32:18.000Z',
    //     updated_at: '2017-12-18T06:32:18.000Z'
    // });
    // callback.onCall(2).resolves({
    //     id: 219,
    //     name: 'Personal communication devices',
    //     level: 'C2',
    //     base_margin: null,
    //     commission: null,
    //     unspsc: 43191500,
    //     sequence: 1,
    //     parent_id: 52,
    //     is_active: 1,
    //     created_at: '2017-12-18T06:32:18.000Z',
    //     updated_at: '2017-12-18T06:32:18.000Z'
    // });
    // callback.onCall(3).resolves({
    //     id: 561,
    //     name: 'Mobile phones',
    //     level: 'C3',
    //     base_margin: null,
    //     commission: null,
    //     unspsc: 43191501,
    //     sequence: 1,
    //     parent_id: 219,
    //     is_active: 1,
    //     created_at: '2017-12-18T06:32:18.000Z',
    //     updated_at: '2017-12-18T06:32:18.000Z'
    // });
    t.context.sandbox.stub(BizzyService, 'callSync').resolves({
        data: [
            {
                id: 2,
                prefix: '',
                name: '',
                suffix: '',
                npwp: '521652651625615',
                place: 'Abadi Tower',
                street: 'Jalan budi utomo no.39',
                phone: '62216356536',
                status: 3,
                created_at: '2018-01-05T12:48:22.000Z',
                geograph: {
                    id: 16014,
                    province: 'Jakarta',
                    city: 'Jakarta Selatan',
                    district: 'Jagakarsa',
                    village: 'Tanjung Barat',
                    zipcode: '12530',
                    geotag: '1006115105',
                    jnecitycode: 'CGK10201'
                }
            },
            {
                id: 3,
                prefix: '',
                name: '',
                suffix: '',
                npwp: '256156251652611',
                place: 'Jaya Tower',
                street: 'Jalan budi jaya no.39',
                phone: '6221652152516',
                status: 3,
                created_at: '2018-01-05T12:53:17.000Z',
                geograph: {
                    id: 14960,
                    province: 'Jakarta',
                    city: 'Jakarta Pusat',
                    district: 'Cempaka Putih',
                    village: 'Cempaka Putih Barat',
                    zipcode: '10520',
                    geotag: '1006115000',
                    jnecitycode: 'CGK10301'
                }
            }
        ],
        meta: {
            page: 1,
            limit: 50,
            total_data: 2,
            total_page: 1,
            filter: {
                is_vendor: 1,
                id: [
                    '2',
                    '3'
                ]
            }
        }
    });
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: 'X152KT2GKF'
            }
        };
        const result = yield Methods.getSkuManagementBySku(data, context);
        const expected = {
            data: {
                id: 2,
                sku: 'X152KT2GKF',
                name: 'Apple iPhone 7 - Black - 64GB',
                // brand: {
                //     id: 81,
                //     name: 'Apple'
                // },
                uom: {
                    id: 1,
                    name: 'Unit'
                },
                stocking_uom: {
                    id: 1,
                    name: 'Dozeeen update'
                },
                quantity_stocking_uom: 1,
                // categories: {
                //     c0: {
                //         id: 8,
                //         name: 'IT and Mobile Devices',
                //         unspsc: 43000000
                //     },
                //     c1: {
                //         id: 52,
                //         name: 'Communications Devices & Accessories',
                //         unspsc: 43190000
                //     },
                //     c2: {
                //         id: 219,
                //         name: 'Personal communication devices',
                //         unspsc: 43191500
                //     },
                //     c3: {
                //         id: 561,
                //         name: 'Mobile phones',
                //         unspsc: 43191501
                //     }
                // },
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
                product_vendors: [
                    {
                        id: 5,
                        vendor_id: 2,
                        vendor_name: '',
                        warehouse_id: 1,
                        stock_available: 212,
                        currency: 'IDR',
                        tier_min_qty_1: 1,
                        tier_min_qty_2: 5,
                        tier_min_qty_3: 10,
                        tier_cogs_price_1: 20000,
                        tier_cogs_price_2: 19500,
                        tier_cogs_price_3: 19000,
                        sku_vendor: ''
                    },
                    {
                        id: 2,
                        vendor_id: 3,
                        vendor_name: '',
                        warehouse_id: 99999,
                        stock_available: 0,
                        currency: 'IDR',
                        tier_min_qty_1: 1,
                        tier_min_qty_2: 10,
                        tier_min_qty_3: 15,
                        tier_cogs_price_1: 20000000,
                        tier_cogs_price_2: 20000000,
                        tier_cogs_price_3: 20000000,
                        sku_vendor: 'UT9DXEMP74'
                    }
                ],
                cheapest: {
                    id: 5,
                    vendor_id: 2,
                    vendor_name: '',
                    warehouse_id: 1,
                    stock_available: 212,
                    currency: 'IDR',
                    tier_min_qty_1: 1,
                    tier_min_qty_2: 5,
                    tier_min_qty_3: 10,
                    tier_cogs_price_1: 20000,
                    tier_cogs_price_2: 19500,
                    tier_cogs_price_3: 19000,
                    sku_vendor: ''
                }
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return success no vendor', function* (t) {
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves({
        id: 2,
        product_group_id: 2,
        sku: 'X152KT2GKF',
        long_name: 'Apple iPhone 7 - Black - 64GB',
        variant_value: '{"phone_color":2,"phone_storage":4}',
        primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
        additional_image: '',
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
    // t.context.sandbox.stub(CustomeRepository, 'findAllCategoryId').resolves([
    //     {
    //         c0: 8,
    //         c1: 52,
    //         c2: 219,
    //         c3: 561
    //     }
    // ]);
    t.context.sandbox.stub(ProductVendorRepository, 'findByVariant').resolves([]);
    // t.context.sandbox.stub(BrandRepository, 'findById').resolves({
    //     id: 81,
    //     name: 'Apple',
    //     image_url: null,
    //     created_at: '2017-11-28T14:54:10.000Z',
    //     updated_at: '2017-11-28T14:54:10.000Z'
    // });
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
    // const callback = t.context.sandbox.stub(CategoryRepository, 'findOne');
    // callback.onCall(0).resolves({
    //     id: 8,
    //     name: 'IT and Mobile Devices',
    //     level: 'C0',
    //     base_margin: null,
    //     commission: null,
    //     unspsc: 43000000,
    //     sequence: 1,
    //     parent_id: null,
    //     is_active: 1,
    //     created_at: '2017-12-18T06:32:18.000Z',
    //     updated_at: '2017-12-18T06:32:18.000Z'
    // });
    // callback.onCall(1).resolves({
    //     id: 52,
    //     name: 'Communications Devices & Accessories',
    //     level: 'C1',
    //     base_margin: null,
    //     commission: null,
    //     unspsc: 43190000,
    //     sequence: 1,
    //     parent_id: 8,
    //     is_active: 1,
    //     created_at: '2017-12-18T06:32:18.000Z',
    //     updated_at: '2017-12-18T06:32:18.000Z'
    // });
    // callback.onCall(2).resolves({
    //     id: 219,
    //     name: 'Personal communication devices',
    //     level: 'C2',
    //     base_margin: null,
    //     commission: null,
    //     unspsc: 43191500,
    //     sequence: 1,
    //     parent_id: 52,
    //     is_active: 1,
    //     created_at: '2017-12-18T06:32:18.000Z',
    //     updated_at: '2017-12-18T06:32:18.000Z'
    // });
    // callback.onCall(3).resolves({
    //     id: 561,
    //     name: 'Mobile phones',
    //     level: 'C3',
    //     base_margin: null,
    //     commission: null,
    //     unspsc: 43191501,
    //     sequence: 1,
    //     parent_id: 219,
    //     is_active: 1,
    //     created_at: '2017-12-18T06:32:18.000Z',
    //     updated_at: '2017-12-18T06:32:18.000Z'
    // });
    t.context.sandbox.stub(BizzyService, 'callSync').resolves({
        data: [],
        meta: {
            page: 1,
            limit: 50,
            total_data: 2,
            total_page: 1,
            filter: {
                is_vendor: 1,
                id: [
                    '2',
                    '3'
                ]
            }
        }
    });
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: 'X152KT2GKF'
            }
        };
        const result = yield Methods.getSkuManagementBySku(data, context);
        const expected = {
            data: {
                id: 2,
                sku: 'X152KT2GKF',
                name: 'Apple iPhone 7 - Black - 64GB',
                // brand: {
                //     id: 81,
                //     name: 'Apple'
                // },
                uom: {
                    id: 1,
                    name: 'Unit'
                },
                stocking_uom: {
                    id: 1,
                    name: 'Dozeeen update'
                },
                quantity_stocking_uom: 1,
                // categories: {
                //     c0: {
                //         id: 8,
                //         name: 'IT and Mobile Devices',
                //         unspsc: 43000000
                //     },
                //     c1: {
                //         id: 52,
                //         name: 'Communications Devices & Accessories',
                //         unspsc: 43190000
                //     },
                //     c2: {
                //         id: 219,
                //         name: 'Personal communication devices',
                //         unspsc: 43191500
                //     },
                //     c3: {
                //         id: 561,
                //         name: 'Mobile phones',
                //         unspsc: 43191501
                //     }
                // },
                barcode: '5012345678900',
                manufacturing_number: 'MPN7PK1781',
                package_weight: 800,
                package_length: 100,
                package_width: 200,
                package_height: 300,
                package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
                primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
                additional_image: [],
                description: '<p>Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.\n\nDi iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.</p>',
                product_group: {
                    id: 2,
                    name: 'Apple iPhone 7'
                },
                product_vendors: [],
                cheapest: {}
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return Forbidden', function* (t) {
    try {
        const context = {
            user: ''
        };
        const data = {
            path: {
                id: 'X152KT2GKF'
            }
        };
        yield Methods.getSkuManagementBySku(data, context);
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
                id: ''
            }
        };
        yield Methods.getSkuManagementBySku(data, context);
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
                id: 'X152KT2GKFSDF'
            }
        };
        yield Methods.getSkuManagementBySku(data, context);
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
