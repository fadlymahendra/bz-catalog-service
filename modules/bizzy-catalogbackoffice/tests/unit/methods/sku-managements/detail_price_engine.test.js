'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');
const ProductVariantRepository = require('../../../../src/repositories/product_variant');
const ProductVendorRepository = require('../../../../src/repositories/product_vendor');
const ProductGroupRepository = require('../../../../src/repositories/product_group');
const Methods = require('../../../../src/methods/sku-managements/detail_price_engine');

test.serial('Should be return Success', function* (t) {
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves({
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
    });
    t.context.sandbox.stub(ProductVendorRepository, 'findOne').resolves({
        id: 2,
        product_variant_id: 2,
        vendor_id: 3,
        warehouse_id: 3,
        location_label: 'Jawa Tengah',
        stock_available: 8,
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
        updated_at: '2018-01-06T11:04:06.000Z'
    });
    t.context.sandbox.stub(ProductGroupRepository, 'findByIdWithC3').resolves({
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
        description: 'Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.\n\nDi iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.',
        primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        created_at: '2017-12-19T14:59:19.000Z',
        updated_at: '2017-12-19T14:59:22.000Z',
        Category: {
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
        },
        StockingUom: {
            id: 1,
            name: 'Box',
            created_at: '2017-12-05T16:55:00.000Z',
            updated_at: '2017-12-20T05:49:50.000Z'
        }
    });
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                sku: 'X152KT2GKF'
            },
            query: {
                vendor: '3'
            }
        };
        const result = yield Methods.getSkuDetailBySku(data, context);
        const expected = {
            data: {
                id: 2,
                sku: 'X152KT2GKF',
                is_active: 1,
                c3: {
                    id: 561,
                    name: 'Mobile phones',
                    level: 'C3'
                },
                tier_data: [
                    {
                        tier_min_qty_1: 5,
                        tier_cogs_price_1: 20000000
                    },
                    {
                        tier_min_qty_2: 10,
                        tier_cogs_price_2: 19500000
                    },
                    {
                        tier_min_qty_3: 15,
                        tier_cogs_price_3: 19000000
                    }
                ],
                vendor: {
                    id: 3,
                    warehouse_id: 3
                },
                product_group: {
                    quantity_stocking_uom: 1,
                    stocking_uom: {
                        id: 1,
                        name: 'Box'
                    }
                }
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return Bad Request', function* (t) {
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves(null);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                sku: 'X152KT2GKF'
            },
            query: {
                vendor: ''
            }
        };
        yield Methods.getSkuDetailBySku(data, context);
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
                sku: 'X152KT2GKFSD'
            },
            query: {
                vendor: '3'
            }
        };
        yield Methods.getSkuDetailBySku(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'SKU Not Found');
    }
});

test.serial('Should be return Success Ecart', function* (t) {
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves({
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
    });
    t.context.sandbox.stub(ProductVendorRepository, 'findOne').resolves({
        id: 2,
        product_variant_id: 2,
        vendor_id: 3,
        warehouse_id: 3,
        location_label: 'Jawa Tengah',
        stock_available: 8,
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
        updated_at: '2018-01-06T11:04:06.000Z'
    });
    t.context.sandbox.stub(ProductGroupRepository, 'findByIdWithC3').resolves({
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
        description: 'Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.\n\nDi iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.',
        primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        created_at: '2017-12-19T14:59:19.000Z',
        updated_at: '2017-12-19T14:59:22.000Z',
        Category: {
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
        },
        StockingUom: {
            id: 1,
            name: 'Box',
            created_at: '2017-12-05T16:55:00.000Z',
            updated_at: '2017-12-20T05:49:50.000Z'
        }
    });
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                sku: 'X152KT2GKF'
            },
            query: {
                vendor: '3'
            }
        };
        const result = yield Methods.getSkuDetailBySkuEcart(data, context);
        const expected = {
            data: {
                id: 2,
                sku: 'X152KT2GKF',
                is_active: 1,
                c3: {
                    id: 561,
                    name: 'Mobile phones',
                    level: 'C3'
                },
                tier_data: [
                    {
                        tier_min_qty_1: 5,
                        tier_cogs_price_1: 20000000
                    },
                    {
                        tier_min_qty_2: 10,
                        tier_cogs_price_2: 19500000
                    },
                    {
                        tier_min_qty_3: 15,
                        tier_cogs_price_3: 19000000
                    }
                ],
                vendor: {
                    id: 3,
                    warehouse_id: 3
                },
                product_group: {
                    quantity_stocking_uom: 1,
                    stocking_uom: {
                        id: 1,
                        name: 'Box'
                    }
                }
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return Bad Request Ecart', function* (t) {
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves(null);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                sku: 'X152KT2GKF'
            },
            query: {
                vendor: ''
            }
        };
        yield Methods.getSkuDetailBySkuEcart(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Should be return Not Found Ecart', function* (t) {
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves(null);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                sku: 'X152KT2GKFSD'
            },
            query: {
                vendor: '3'
            }
        };
        yield Methods.getSkuDetailBySkuEcart(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'SKU Not Found');
    }
});

test.serial('getSkuDetailBySkuPdp - Should be return Success', function* (t) {
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves({
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
    });
    t.context.sandbox.stub(ProductVendorRepository, 'findAll').resolves([
        {
            id: 2,
            product_variant_id: 2,
            vendor_id: 3,
            warehouse_id: 3,
            location_label: 'Jawa Tengah',
            tier_min_qty_1: 5,
            tier_min_qty_2: 10,
            tier_min_qty_3: 15,
            tier_cogs_price_1: '20000000.00',
            tier_cogs_price_2: '19500000.00',
            tier_cogs_price_3: '19000000.00'
        },
        {
            id: 3,
            product_variant_id: 2,
            vendor_id: 4,
            warehouse_id: 3,
            location_label: 'Jawa Barat',
            tier_min_qty_1: 5,
            tier_min_qty_2: 10,
            tier_min_qty_3: 15,
            tier_cogs_price_1: '20000000.00',
            tier_cogs_price_2: '19500000.00',
            tier_cogs_price_3: '19000000.00'
        }
    ]);
    t.context.sandbox.stub(ProductGroupRepository, 'findByIdWithC3').resolves({
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
        description: 'Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.\n\nDi iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.',
        primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        created_at: '2017-12-19T14:59:19.000Z',
        updated_at: '2017-12-19T14:59:22.000Z',
        Category: {
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
        },
        StockingUom: {
            id: 1,
            name: 'Box',
            created_at: '2017-12-05T16:55:00.000Z',
            updated_at: '2017-12-20T05:49:50.000Z'
        }
    });
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                sku: 'X152KT2GKF'
            },
            query: {
                vendor: '3'
            }
        };
        const result = yield Methods.getSkuDetailBySkuPdp(data, context);
        const expected = [
            {
              id: 2,
              sku: 'X152KT2GKF',
              c3: {
                id: 561,
                name: 'Mobile phones',
                level: 'C3'
              },
              tier_data: [
                {
                    tier_min_qty_1: 5,
                    tier_cogs_price_1: 20000000
                  },
                  {
                    tier_min_qty_2: 10,
                    tier_cogs_price_2: 19500000
                  },
                  {
                    tier_min_qty_3: 15,
                    tier_cogs_price_3: 19000000
                  }
              ],
              vendor: {
                id: 3,
                warehouse_id: 3
              },
              product_group: {
                quantity_stocking_uom: 1,
                stocking_uom: {
                  id: 1,
                  name: 'Box'
                }
              }
            },
            {
              id: 2,
              sku: 'X152KT2GKF',
              c3: {
                id: 561,
                name: 'Mobile phones',
                level: 'C3'
              },
              tier_data: [
                {
                  tier_min_qty_1: 5,
                  tier_cogs_price_1: 20000000
                },
                {
                  tier_min_qty_2: 10,
                  tier_cogs_price_2: 19500000
                },
                {
                  tier_min_qty_3: 15,
                  tier_cogs_price_3: 19000000
                }
              ],
              vendor: {
                id: 4,
                warehouse_id: 3
              },
              product_group: {
                quantity_stocking_uom: 1,
                stocking_uom: {
                  id: 1,
                  name: 'Box'
                }
              }
            }
          ];
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('getSkuDetailBySkuPdp - Should be return Bad Request', function* (t) {
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves(null);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                sku: ''
            },
            query: {
                vendor: '3'
            }
        };
        yield Methods.getSkuDetailBySkuPdp(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('getSkuDetailBySkuPdp - Product variant not found', function* (t) {
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves(null);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                sku: 'X152KT2GKF'
            },
            query: {
                vendor: '3'
            }
        };
        yield Methods.getSkuDetailBySkuPdp(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, err.message);
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
