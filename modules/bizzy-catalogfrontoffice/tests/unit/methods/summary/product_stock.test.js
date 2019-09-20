'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');
const Methods = require('../../../../src/methods/summary/product_stock');
const ProductVendorRespository = require('../../../../src/repositories/product_vendor');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

test.serial('Should be return success', function* (t) {
    t.context.sandbox.stub(ProductVendorRespository, 'findVariantWithStock').resolves([
        {
            id: 4,
            product_variant_id: 4,
            vendor_id: 3,
            warehouse_id: 1,
            location_label: 'Jakarta selatan',
            stock_available: 123,
            stock_used: 0,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 5,
            tier_min_qty_3: 8,
            tier_cogs_price_1: '3210.00',
            tier_cogs_price_2: '2211.00',
            tier_cogs_price_3: '2210.00',
            warranty_option: 'official_warranty',
            warranty_period: 'year',
            warranty_limit: 1,
            warranty_coverage: 'rusak karena rusak',
            indent_period: null,
            indent_limit: null,
            reference_link: '["http://google.com","http://apple.com"]',
            sku_vendor: '123',
            is_indent: 0,
            is_active: 1,
            created_by: 3,
            created_at: '2018-01-17T08:24:54.000Z',
            updated_at: '2018-02-15T07:43:20.000Z',
            ProductVariant: {
                id: 4,
                product_group_id: 2,
                sku: 'O3FJT350LQ',
                long_name: 'Apple iPhone 7',
                variant_value: '{"phone_color":1,"phone_storage":3}',
                primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
                additional_image: '[]',
                product_id_magento: null,
                product_id_netsuite: null,
                is_primary: 0,
                is_discontinue: 0,
                is_active: 1,
                created_at: '2018-01-17T08:24:54.000Z',
                updated_at: '2018-01-22T11:20:10.000Z',
                ProductGroup: {
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
                    updated_at: '2018-01-24T08:56:47.000Z',
                    Uom: {
                        id: 1,
                        name: 'Unit',
                        created_at: '2017-12-05T16:59:10.000Z',
                        updated_at: '2017-12-05T16:59:10.000Z'
                    }
                }
            }
        },
        {
            id: 2,
            product_variant_id: 2,
            vendor_id: 3,
            warehouse_id: 3,
            location_label: 'Jakarta Barat',
            stock_available: 8,
            stock_used: 72,
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
            updated_at: '2018-02-14T07:34:26.000Z',
            ProductVariant: {
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
                updated_at: '2018-01-18T15:40:54.000Z',
                ProductGroup: {
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
                    updated_at: '2018-01-24T08:56:47.000Z',
                    Uom: {
                        id: 1,
                        name: 'Unit',
                        created_at: '2017-12-05T16:59:10.000Z',
                        updated_at: '2017-12-05T16:59:10.000Z'
                    }
                }
            }
        },
        {
            id: 8,
            product_variant_id: 7,
            vendor_id: 3,
            warehouse_id: 99,
            location_label: 'Jakarta',
            stock_available: 1,
            stock_used: 0,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: 5,
            tier_min_qty_2: 10,
            tier_min_qty_3: 15,
            tier_cogs_price_1: '1500000.00',
            tier_cogs_price_2: '1450000.00',
            tier_cogs_price_3: '1400000.00',
            warranty_option: 'official_warranty',
            warranty_period: 'month',
            warranty_limit: 1,
            warranty_coverage: 'Box',
            indent_period: 'week',
            indent_limit: 2,
            reference_link: '["google.com","amazon.com"]',
            sku_vendor: '111111111',
            is_indent: 1,
            is_active: 1,
            created_by: 3,
            created_at: '2018-01-23T10:33:04.000Z',
            updated_at: '2018-01-23T10:33:04.000Z',
            ProductVariant: {
                id: 7,
                product_group_id: 7,
                sku: 'CZV7NKW10N',
                long_name: 'Blalalala - Silver - 64GB',
                variant_value: '{"phone_color":1,"phone_storage":4}',
                primary_image: 'http://localhost/testing/testing_images.jpg',
                additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
                product_id_magento: null,
                product_id_netsuite: null,
                is_primary: 1,
                is_discontinue: 0,
                is_active: 1,
                created_at: '2018-01-23T10:33:04.000Z',
                updated_at: '2018-01-23T10:33:04.000Z',
                ProductGroup: {
                    id: 7,
                    name: 'Blalalala',
                    category_id: 561,
                    brand_id: 197,
                    uom_id: 5,
                    stocking_uom_id: 5,
                    quantity_stocking_uom: 22,
                    manufacturing_number: null,
                    manufacturing_number_type: null,
                    package_weight: 21,
                    package_length: '22.00',
                    package_width: '32.00',
                    package_height: '42.00',
                    package_content: 'memer43543543',
                    barcode: null,
                    description: '<p>jasfpsf sdfksdofsdgfnsdgsodgdsg sdg</p>',
                    primary_image: 'http://localhost/testing/testing_images.jpg',
                    variant_count: 2,
                    variant_matrix: '["phone_color","phone_storage"]',
                    status: 1,
                    visibility: 0,
                    created_by: 65,
                    created_at: '2018-01-18T05:30:12.000Z',
                    updated_at: '2018-01-18T11:38:47.000Z',
                    Uom: {
                        id: 5,
                        name: 'Set',
                        created_at: '2017-12-05T16:59:10.000Z',
                        updated_at: '2017-12-05T16:59:10.000Z'
                    }
                }
            }
        },
        {
            id: 9,
            product_variant_id: 8,
            vendor_id: 3,
            warehouse_id: 99,
            location_label: 'Jakarta',
            stock_available: 1,
            stock_used: 0,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: 5,
            tier_min_qty_2: 10,
            tier_min_qty_3: 15,
            tier_cogs_price_1: '1500000.00',
            tier_cogs_price_2: '1450000.00',
            tier_cogs_price_3: '1400000.00',
            warranty_option: 'official_warranty',
            warranty_period: 'month',
            warranty_limit: 1,
            warranty_coverage: 'Box',
            indent_period: 'week',
            indent_limit: 2,
            reference_link: '["google.com","amazon.com"]',
            sku_vendor: '111111111',
            is_indent: 1,
            is_active: 1,
            created_by: 3,
            created_at: '2018-01-23T10:33:04.000Z',
            updated_at: '2018-01-23T10:33:04.000Z',
            ProductVariant: {
                id: 8,
                product_group_id: 7,
                sku: 'V3DQVYWRGX',
                long_name: 'Blalalala - Green - 64GB',
                variant_value: '{"phone_color":2,"phone_storage":4}',
                primary_image: 'http://localhost/testing/testing.jpg',
                additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
                product_id_magento: null,
                product_id_netsuite: null,
                is_primary: 0,
                is_discontinue: 0,
                is_active: 1,
                created_at: '2018-01-23T10:33:04.000Z',
                updated_at: '2018-01-23T10:33:04.000Z',
                ProductGroup: {
                    id: 7,
                    name: 'Blalalala',
                    category_id: 561,
                    brand_id: 197,
                    uom_id: 5,
                    stocking_uom_id: 5,
                    quantity_stocking_uom: 22,
                    manufacturing_number: null,
                    manufacturing_number_type: null,
                    package_weight: 21,
                    package_length: '22.00',
                    package_width: '32.00',
                    package_height: '42.00',
                    package_content: 'memer43543543',
                    barcode: null,
                    description: '<p>jasfpsf sdfksdofsdgfnsdgsodgdsg sdg</p>',
                    primary_image: 'http://localhost/testing/testing_images.jpg',
                    variant_count: 2,
                    variant_matrix: '["phone_color","phone_storage"]',
                    status: 1,
                    visibility: 0,
                    created_by: 65,
                    created_at: '2018-01-18T05:30:12.000Z',
                    updated_at: '2018-01-18T11:38:47.000Z',
                    Uom: {
                        id: 5,
                        name: 'Set',
                        created_at: '2017-12-05T16:59:10.000Z',
                        updated_at: '2017-12-05T16:59:10.000Z'
                    }
                }
            }
        },
        {
            id: 17,
            product_variant_id: 18,
            vendor_id: 3,
            warehouse_id: 99,
            location_label: 'Jakarta',
            stock_available: 1,
            stock_used: 0,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: 5,
            tier_min_qty_2: 10,
            tier_min_qty_3: 15,
            tier_cogs_price_1: '1600000.00',
            tier_cogs_price_2: '1450000.00',
            tier_cogs_price_3: '1400000.00',
            warranty_option: 'official_warranty',
            warranty_period: 'month',
            warranty_limit: 1,
            warranty_coverage: 'Box',
            indent_period: 'week',
            indent_limit: 2,
            reference_link: null,
            sku_vendor: '111111111',
            is_indent: 1,
            is_active: 1,
            created_by: 3,
            created_at: '2018-02-12T12:45:03.000Z',
            updated_at: '2018-02-14T09:22:28.000Z',
            ProductVariant: {
                id: 18,
                product_group_id: 3,
                sku: 'P0WZ1YWPTS',
                long_name: 'Epson Tinta Refill Botol - Silver - 64GB',
                variant_value: '{"phone_color":1,"phone_storage":4}',
                primary_image: 'http://localhost/testing/testing_images.jpg',
                additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
                product_id_magento: null,
                product_id_netsuite: null,
                is_primary: 0,
                is_discontinue: 0,
                is_active: 1,
                created_at: '2018-02-12T12:45:03.000Z',
                updated_at: '2018-02-12T12:45:03.000Z',
                ProductGroup: {
                    id: 3,
                    name: 'Epson Tinta Refill Botol',
                    category_id: 507,
                    brand_id: 466,
                    uom_id: 5,
                    stocking_uom_id: 12,
                    quantity_stocking_uom: 3,
                    manufacturing_number: 'MPN4060882',
                    manufacturing_number_type: null,
                    package_weight: 400,
                    package_length: '100.00',
                    package_width: '200.00',
                    package_height: '40.00',
                    package_content: '1 Paket Tinta Black dan Color Original untuk L100/L110/L120/L300/L210/L350/L355/L550/L355. ',
                    barcode: '0075678164125',
                    description: 'Epson Tinta T6641-44 ini berisi tinta yang tidak mudah pudar dan tahan noda. Dirancang sebagai partner kerja cartridge tinta Anda, dapatkan hasil cetak yang memuaskan dengan kecepatan tinggi dari Epson. Tinggalkan mencetak dengan pita karena hasil yang kadang tidak merata. Dengan tinta, siapkan segala dokumen Anda dengan lebih jelas dan mudah dibaca.\nPerforma: Anda akan mudah untuk mencetak dokumen dan surat-surat dengan kualitas yang baik. Cartridge tinta Epson Tinta T6641-44 dirancang untuk memberikan kenyamanan yang konsisten serta kinerja yang handal. Cartridge tinta ini mampu memberikan hasil cetak berkualitas laser.\nKompatibilitas: 1 Paket Tinta Black dan Color Original untuk L100/L110/L120/L300/L210/L350/L355/L550/L355. ',
                    primary_image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium//931/epson_epson-original-t6641---t6644-set-tinta-botol_full02.jpg',
                    variant_count: 1,
                    variant_matrix: '["ink_color"]',
                    status: 1,
                    visibility: 1,
                    created_by: 2,
                    created_at: '2017-12-19T08:43:09.000Z',
                    updated_at: '2018-02-14T11:12:44.000Z',
                    Uom: {
                        id: 5,
                        name: 'Set',
                        created_at: '2017-12-05T16:59:10.000Z',
                        updated_at: '2017-12-05T16:59:10.000Z'
                    }
                }
            }
        }
    ]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3'
            },
            query: {
                sort: '',
                limit: 5
            }
        };
        const result = yield Methods.getSummaryProductStock(data, context);
        const expected = {
            data: [
                {
                    id: 4,
                    sku: 'O3FJT350LQ',
                    long_name: 'Apple iPhone 7',
                    primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
                    stock_available: 123,
                    sku_vendor: '123',
                    product_group: {
                        id: 2,
                        name: 'Apple iPhone 7'
                    },
                    uom: {
                        id: 1,
                        name: 'Unit'
                    }
                },
                {
                    id: 2,
                    sku: 'X152KT2GKF',
                    long_name: 'Apple iPhone 7 - Black - 64GB',
                    primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
                    stock_available: 8,
                    sku_vendor: 'XXXXX',
                    product_group: {
                        id: 2,
                        name: 'Apple iPhone 7'
                    },
                    uom: {
                        id: 1,
                        name: 'Unit'
                    }
                },
                {
                    id: 8,
                    sku: 'CZV7NKW10N',
                    long_name: 'Blalalala - Silver - 64GB',
                    primary_image: 'http://localhost/testing/testing_images.jpg',
                    stock_available: 1,
                    sku_vendor: '111111111',
                    product_group: {
                        id: 7,
                        name: 'Blalalala'
                    },
                    uom: {
                        id: 5,
                        name: 'Set'
                    }
                },
                {
                    id: 9,
                    sku: 'V3DQVYWRGX',
                    long_name: 'Blalalala - Green - 64GB',
                    primary_image: 'http://localhost/testing/testing.jpg',
                    stock_available: 1,
                    sku_vendor: '111111111',
                    product_group: {
                        id: 7,
                        name: 'Blalalala'
                    },
                    uom: {
                        id: 5,
                        name: 'Set'
                    }
                },
                {
                    id: 17,
                    sku: 'P0WZ1YWPTS',
                    long_name: 'Epson Tinta Refill Botol - Silver - 64GB',
                    primary_image: 'http://localhost/testing/testing_images.jpg',
                    stock_available: 1,
                    sku_vendor: '111111111',
                    product_group: {
                        id: 3,
                        name: 'Epson Tinta Refill Botol'
                    },
                    uom: {
                        id: 5,
                        name: 'Set'
                    }
                }
            ]
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return success ascending', function* (t) {
    t.context.sandbox.stub(ProductVendorRespository, 'findVariantWithStock').resolves([
        {
            id: 2,
            product_variant_id: 2,
            vendor_id: 3,
            warehouse_id: 3,
            location_label: 'Jakarta Barat',
            stock_available: 8,
            stock_used: 72,
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
            updated_at: '2018-02-14T07:34:26.000Z',
            ProductVariant: {
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
                updated_at: '2018-01-18T15:40:54.000Z',
                ProductGroup: {
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
                    updated_at: '2018-01-24T08:56:47.000Z',
                    Uom: {
                        id: 1,
                        name: 'Unit',
                        created_at: '2017-12-05T16:59:10.000Z',
                        updated_at: '2017-12-05T16:59:10.000Z'
                    }
                }
            }
        },
        {
            id: 4,
            product_variant_id: 4,
            vendor_id: 3,
            warehouse_id: 1,
            location_label: 'Jakarta selatan',
            stock_available: 123,
            stock_used: 0,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 5,
            tier_min_qty_3: 8,
            tier_cogs_price_1: '3210.00',
            tier_cogs_price_2: '2211.00',
            tier_cogs_price_3: '2210.00',
            warranty_option: 'official_warranty',
            warranty_period: 'year',
            warranty_limit: 1,
            warranty_coverage: 'rusak karena rusak',
            indent_period: null,
            indent_limit: null,
            reference_link: '["http://google.com","http://apple.com"]',
            sku_vendor: '123',
            is_indent: 0,
            is_active: 1,
            created_by: 3,
            created_at: '2018-01-17T08:24:54.000Z',
            updated_at: '2018-02-15T07:43:20.000Z',
            ProductVariant: {
                id: 4,
                product_group_id: 2,
                sku: 'O3FJT350LQ',
                long_name: 'Apple iPhone 7',
                variant_value: '{"phone_color":1,"phone_storage":3}',
                primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
                additional_image: '[]',
                product_id_magento: null,
                product_id_netsuite: null,
                is_primary: 0,
                is_discontinue: 0,
                is_active: 1,
                created_at: '2018-01-17T08:24:54.000Z',
                updated_at: '2018-01-22T11:20:10.000Z',
                ProductGroup: {
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
                    updated_at: '2018-01-24T08:56:47.000Z',
                    Uom: {
                        id: 1,
                        name: 'Unit',
                        created_at: '2017-12-05T16:59:10.000Z',
                        updated_at: '2017-12-05T16:59:10.000Z'
                    }
                }
            }
        }
    ]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3'
            },
            query: {
                sort: 'stock_asc',
                limit: ''
            }
        };
        const result = yield Methods.getSummaryProductStock(data, context);
        const expected = {
            data: [
                {
                    id: 2,
                    sku: 'X152KT2GKF',
                    long_name: 'Apple iPhone 7 - Black - 64GB',
                    primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
                    stock_available: 8,
                    sku_vendor: 'XXXXX',
                    product_group: {
                        id: 2,
                        name: 'Apple iPhone 7'
                    },
                    uom: {
                        id: 1,
                        name: 'Unit'
                    }
                },
                {
                    id: 4,
                    sku: 'O3FJT350LQ',
                    long_name: 'Apple iPhone 7',
                    primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
                    stock_available: 123,
                    sku_vendor: '123',
                    product_group: {
                        id: 2,
                        name: 'Apple iPhone 7'
                    },
                    uom: {
                        id: 1,
                        name: 'Unit'
                    }
                }
            ]
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return authorized user', function* (t) {
    try {
        const context = {
            user: ''
        };
        const data = {
            path: {
                id: '1234'
            },
            query: {
                sort: '',
                limit: 5
            }
        };

        yield Methods.getSummaryProductStock(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, 'You are not authorized user');
    }
});

test.serial('Should be return bad request', function* (t) {
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: 3
            },
            query: {
                sort: '',
                limit: '5'
            }
        };

        yield Methods.getSummaryProductStock(data, context);
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
