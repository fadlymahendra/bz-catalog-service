'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { DBContext, BizzyError } = require('bizzy-common');
const ProductVariantRepository = require('../../../../src/repositories/product_variant');
const Methods = require('../../../../src/methods/sku-managements/list_multiple');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

test.serial('Should be return success', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(ProductVariantRepository, 'findMultipleVariant').resolves([
        {
            id: 3,
            product_group_id: 3,
            sku: 'NL729T50H2',
            long_name: 'Epson Tinta Refill Botol - Blue',
            variant_value: '{"ink_color":8}',
            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516886018.jpg',
            additional_image: '["https://ecs7.tokopedia.net/img/cache/700/product-1/2017/8/9/5557816/5557816_01d7795d-8b3d-4bf2-9fd8-1d6f9039bc8e_380_380.jpg","https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516886029.jpg","https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516886035.jpg"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-06T10:53:40.000Z',
            updated_at: '2018-01-25T13:13:57.000Z',
            ProductGroup: {
                id: 3,
                name: 'Epson Tinta Refill Botol',
                quantity_stocking_uom: 3,
                package_weight: 400,
                package_length: '15.00',
                package_width: '5.00',
                package_height: '2.00',
                package_content: '1 Paket Tinta Black dan Color Original untuk L100/L110/L120/L300/L210/L350/L355/L550/L355. ',
                description: 'Epson Tinta T6641-44 ini berisi tinta yang tidak mudah pudar dan tahan noda. Dirancang sebagai partner kerja cartridge tinta Anda, dapatkan hasil cetak yang memuaskan dengan kecepatan tinggi dari Epson. Tinggalkan mencetak dengan pita karena hasil yang kadang tidak merata. Dengan tinta, siapkan segala dokumen Anda dengan lebih jelas dan mudah dibaca.\nPerforma: Anda akan mudah untuk mencetak dokumen dan surat-surat dengan kualitas yang baik. Cartridge tinta Epson Tinta T6641-44 dirancang untuk memberikan kenyamanan yang konsisten serta kinerja yang handal. Cartridge tinta ini mampu memberikan hasil cetak berkualitas laser.\nKompatibilitas: 1 Paket Tinta Black dan Color Original untuk L100/L110/L120/L300/L210/L350/L355/L550/L355.',
                Uom: {
                    id: 5,
                    name: 'Set'
                },
                StockingUom: {
                    id: 12,
                    name: 'Set of 3'
                }
            },
            ProductVendors: [
                {
                    id: 3,
                    product_variant_id: 3,
                    vendor_id: 4,
                    warehouse_id: 4,
                    location_label: 'Jawa Barat',
                    stock_available: 220,
                    stock_used: 0,
                    stock_reserved: 0,
                    currency: 'IDR',
                    tier_min_qty_1: 20,
                    tier_min_qty_2: 40,
                    tier_min_qty_3: 60,
                    tier_cogs_price_1: '85000.00',
                    tier_cogs_price_2: '83000.00',
                    tier_cogs_price_3: '81000.00',
                    warranty_option: 'distributor',
                    warranty_period: 'month',
                    warranty_limit: 1,
                    warranty_coverage: null,
                    indent_period: null,
                    indent_limit: null,
                    reference_link: '["https://shopee.co.id/Tinta-Epson-T2900-Tri-colour-Ink-Cartridge-(Wf-100)-i.18732899.190344768","http://www.lazada.co.id/epson-tinta-refill-t-6641234-black-and-color-485870.html","https://www.tokopedia.com/shopvenus/tinta-botol-original-epson-70ml-untuk-epson-l-series-2"]',
                    sku_vendor: 'K8G6RUKLTA',
                    is_indent: 0,
                    is_active: 1,
                    created_by: 4,
                    created_at: '2018-01-06T11:08:05.000Z',
                    updated_at: '2018-01-06T11:08:05.000Z'
                }
            ]
        },
        {
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
            is_active: 0,
            created_at: '2018-01-06T10:44:13.000Z',
            updated_at: '2018-04-04T01:51:38.000Z',
            ProductGroup: {
                id: 2,
                name: 'Apple iPhone 7',
                quantity_stocking_uom: 1,
                package_weight: 800,
                package_length: '13.83',
                package_width: '11.00',
                package_height: '9.00',
                package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
                description: 'Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.\n\nDi iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.',
                Uom: {
                    id: 1,
                    name: 'Unit'
                },
                StockingUom: {
                    id: 1,
                    name: 'Box'
                }
            },
            ProductVendors: [
                {
                    id: 2,
                    product_variant_id: 2,
                    vendor_id: 3,
                    warehouse_id: 3,
                    location_label: 'Jawa Tengah',
                    stock_available: 83,
                    stock_used: 117,
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
                    updated_at: '2018-04-04T01:38:57.000Z'
                }
            ]
        }
    ]);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                skus: 'X152KT2GKF,NL729T50H2'
            }
        };

        const result = yield Methods.getSkuManagementMultiple(data, context);
        const expected = {
            data: [
                {
                    id: 3,
                    product_group_id: 3,
                    sku: 'NL729T50H2',
                    name: 'Epson Tinta Refill Botol - Blue',
                    uom: {
                        id: 5,
                        name: 'Set'
                    },
                    stocking_uom: {
                        id: 12,
                        name: 'Set of 3'
                    },
                    quantity_stocking_uom: 3,
                    package_weight: 400,
                    package_length: 15,
                    package_width: 5,
                    package_height: 2,
                    package_content: '1 Paket Tinta Black dan Color Original untuk L100/L110/L120/L300/L210/L350/L355/L550/L355. ',
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516886018.jpg',
                    description: 'Epson Tinta T6641-44 ini berisi tinta yang tidak mudah pudar dan tahan noda. Dirancang sebagai partner kerja cartridge tinta Anda, dapatkan hasil cetak yang memuaskan dengan kecepatan tinggi dari Epson. Tinggalkan mencetak dengan pita karena hasil yang kadang tidak merata. Dengan tinta, siapkan segala dokumen Anda dengan lebih jelas dan mudah dibaca.\nPerforma: Anda akan mudah untuk mencetak dokumen dan surat-surat dengan kualitas yang baik. Cartridge tinta Epson Tinta T6641-44 dirancang untuk memberikan kenyamanan yang konsisten serta kinerja yang handal. Cartridge tinta ini mampu memberikan hasil cetak berkualitas laser.\nKompatibilitas: 1 Paket Tinta Black dan Color Original untuk L100/L110/L120/L300/L210/L350/L355/L550/L355.',
                    product_vendors: [
                        {
                            id: 3,
                            vendor_id: 4,
                            warehouse_id: 4,
                            stock_available: 220,
                            currency: 'IDR',
                            tier_min_qty_1: 20,
                            tier_min_qty_2: 40,
                            tier_min_qty_3: 60,
                            tier_cogs_price_1: 85000,
                            tier_cogs_price_2: 83000,
                            tier_cogs_price_3: 81000
                        }
                    ]
                },
                {
                    id: 2,
                    product_group_id: 2,
                    sku: 'X152KT2GKF',
                    name: 'Apple iPhone 7 - Black - 64GB',
                    uom: {
                        id: 1,
                        name: 'Unit'
                    },
                    stocking_uom: {
                        id: 1,
                        name: 'Box'
                    },
                    quantity_stocking_uom: 1,
                    package_weight: 800,
                    package_length: 13.83,
                    package_width: 11,
                    package_height: 9,
                    package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516885849.jpg',
                    description: 'Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.\n\nDi iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.',
                    product_vendors: [
                        {
                            id: 2,
                            vendor_id: 3,
                            warehouse_id: 3,
                            stock_available: 83,
                            currency: 'IDR',
                            tier_min_qty_1: 5,
                            tier_min_qty_2: 10,
                            tier_min_qty_3: 15,
                            tier_cogs_price_1: 20000000,
                            tier_cogs_price_2: 19500000,
                            tier_cogs_price_3: 19000000
                        }
                    ]
                }
            ]
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return Bad Request', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                skus: ''
            }
        };
        yield Methods.getSkuManagementMultiple(data, context);
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
