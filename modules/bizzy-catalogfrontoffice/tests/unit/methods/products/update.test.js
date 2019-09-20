'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError, BizzyService, DBContext } = require('bizzy-common');
const Method = require('../../../../src/methods/products/update');

const ProductVendorRepository = require('../../../../src/repositories/product_vendor');
const ProductLogRepository = require('../../../../src/repositories/product_log');
const PrivateSkuRepository = require('../../../../src/repositories/private_sku');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
const payloadPubUpdate = {
    id: 20,
    vendor_id: 3,
    stock_available: 10,
    stock_used: 0,
    stock_reserved: 0,
    currency: 'IDR',
    tier_min_qty_1: 1,
    tier_min_qty_2: 2,
    tier_min_qty_3: 3,
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

test.serial('Should update product', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(ProductVendorRepository, 'findOneDetail').resolves(false);
    t.context.sandbox.stub(ProductVendorRepository, 'findByProductGroupId').resolves({
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
        variant_matrix: '["phone_color"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        ProductVariants: [
            {
                id: 8,
                product_group_id: 2,
                sku: 'DC8JLF43ND',
                long_name: 'Apple iPhone 7 - Gold - 128GB',
                variant_value: '{"phone_color":2}',
                primary_image: 'http://localhost/testing/testing_image.jpg',
                additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
                product_id_magento: null,
                product_id_netsuite: null,
                is_primary: 0,
                is_discontinue: 0,
                is_active: 1,
                ProductVendors: [
                    {
                        id: 20
                    }
                ]
            }
        ],
        Brand: {
            id: 81,
            name: 'Apple',
            image_url: null
        },
        Uom: {
            id: 1,
            name: 'Unit'
        },
        StockingUom: {
            id: 1,
            name: 'Box'
        },
        ProductGroupAttributes: [
            {
                id: 1,
                product_group_id: 2,
                attribute_code_id: 1,
                attribute_value_id: null,
                text_input: null,
                is_variant: 1,
                AttributeCode: {
                    id: 1,
                    code: 'phone_color',
                    label: 'Warna',
                    type: 'dropdown',
                    AttributeValues: [
                        {
                            id: 1,
                            attribute_code_id: 1,
                            value: 'Silver',
                            image_url: null
                        },
                        {
                            id: 2,
                            attribute_code_id: 1,
                            value: 'Black',
                            image_url: null
                        }
                    ]
                },
                AttributeValue: null
            },
            {
                id: 3,
                product_group_id: 2,
                attribute_code_id: 3,
                attribute_value_id: 5,
                text_input: null,
                is_variant: 0,
                AttributeCode: {
                    id: 3,
                    code: 'phone_os',
                    label: 'Sistem Operasi',
                    type: 'dropdown',
                    AttributeValues: [
                        {
                            id: 5,
                            attribute_code_id: 3,
                            value: 'iOS',
                            image_url: null
                        },
                        {
                            id: 6,
                            attribute_code_id: 3,
                            value: 'Android',
                            image_url: null
                        }
                    ]
                },
                AttributeValue: {
                    id: 5,
                    attribute_code_id: 3,
                    value: 'iOS',
                    image_url: null
                }
            }
        ],
        PrivateSkus: []
    });

    const callback = t.context.sandbox.stub(ProductVendorRepository, 'findOne');
    callback.onCall(0).resolves({
        id: 20,
        product_variant_id: 8,
        vendor_id: 3,
        warehouse_id: 11,
        location_label: 'Jakarta',
        stock_available: 10,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: 1,
        tier_min_qty_2: 2,
        tier_min_qty_3: 3,
        tier_cogs_price_1: '50.00',
        tier_cogs_price_2: '49.00',
        tier_cogs_price_3: '9.00',
        warranty_option: 'official_warranty',
        warranty_period: 'year',
        warranty_limit: 1,
        warranty_coverage: 'xBox only',
        indent_period: 'day',
        indent_limit: 6,
        reference_link: '["http://google.com","http://facebook.com"]',
        sku_vendor: 'XXXXX',
        is_indent: 1,
        is_active: 0,
        created_by: 3,
        created_at: '2018-01-16T02:59:03.000Z',
        updated_at: '2018-01-18T09:50:39.000Z',
        ProductVariant: {
            id: 8,
            product_group_id: 2,
            sku: 'DC8JLF43ND',
            long_name: 'Apple iPhone 7 - Gold - 128GB',
            variant_value: '{"phone_color":2,"phone_storage":11}',
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 0,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-16T02:59:03.000Z',
            updated_at: '2018-01-16T02:59:03.000Z'
        },
        PrivateSkus: [],
        getValues() {
            return this;
        }
    });
    callback.onCall(1).resolves({
        id: 20,
        product_variant_id: 8,
        vendor_id: 3,
        warehouse_id: 11,
        location_label: 'Jakarta',
        stock_available: 10,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: 1,
        tier_min_qty_2: 2,
        tier_min_qty_3: 3,
        tier_cogs_price_1: '50.00',
        tier_cogs_price_2: '49.00',
        tier_cogs_price_3: '9.00',
        warranty_option: 'official_warranty',
        warranty_period: 'year',
        warranty_limit: 1,
        warranty_coverage: 'xBox only',
        indent_period: 'day',
        indent_limit: 6,
        reference_link: '["http://google.com","http://facebook.com"]',
        sku_vendor: 'XXXXX',
        is_indent: 1,
        is_active: 0,
        created_by: 3,
        created_at: '2018-01-16T02:59:03.000Z',
        updated_at: '2018-01-18T09:50:39.000Z',
        ProductVariant: {
            id: 8,
            product_group_id: 2,
            sku: 'DC8JLF43ND',
            long_name: 'Apple iPhone 7 - Gold - 128GB',
            variant_value: '{"phone_color":2,"phone_storage":11}',
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 0,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-16T02:59:03.000Z',
            updated_at: '2018-01-16T02:59:03.000Z'
        },
        getValues() {
            return this;
        }
    });
    t.context.sandbox.stub(ProductVendorRepository, 'updateOne').resolves(true);
    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithDetailById').resolves(payloadPubUpdate);

    t.context.sandbox.stub(ProductLogRepository, 'insertMany').resolves(true);
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);
    t.context.sandbox.stub(BizzyService, 'callSync').resolves(true);
    t.context.sandbox.stub(PrivateSkuRepository, 'delete').resolves(true);
    t.context.sandbox.stub(PrivateSkuRepository, 'insert').resolves(true);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3',
                pid: '2'
            },
            body: {
                products: [
                    {
                        id: 20,
                        sku_vendor: 'XXXXX',
                        tier_min_qty_1: '1',
                        tier_min_qty_2: '2',
                        tier_min_qty_3: '3',
                        tier_cogs_price_1: '40',
                        tier_cogs_price_2: '19',
                        tier_cogs_price_3: '9',
                        stock_available: 0,
                        is_indent: 1,
                        indent_period: 'day',
                        indent_limit: 68,
                        is_decimal: 1,
                        down_payment_type: 1,
                        down_payment_value: 20,
                        warranty_option: 'official_warranty',
                        warranty_period: 'year',
                        warranty_limit: 11,
                        warranty_coverage: 'xBox only',
                        reference_link: [],
                        is_bulk: 0,
                        private_customers: [],
                        is_private_sku: false
                    }
                ]
            }
        };
        const result = yield Method.putProduct(data, context);
        const expected = {
            data: {
                id: 2,
                name: 'Apple iPhone 7'
            },
            message: 'Product berhasil diubah'
        };
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err.stack);
        console.log(err.message);
        t.fail(err);
    }
});

test.serial('Should update product with (tier min qty and cogs (2 & 3) empty)', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(ProductVendorRepository, 'findOneDetail').resolves(false);
    t.context.sandbox.stub(ProductVendorRepository, 'findByProductGroupId').resolves({
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
        variant_matrix: '["phone_color"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        ProductVariants: [
            {
                id: 8,
                product_group_id: 2,
                sku: 'DC8JLF43ND',
                long_name: 'Apple iPhone 7 - Gold - 128GB',
                variant_value: '{"phone_color":2}',
                primary_image: 'http://localhost/testing/testing_image.jpg',
                additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
                product_id_magento: null,
                product_id_netsuite: null,
                is_primary: 0,
                is_discontinue: 0,
                is_active: 1,
                ProductVendors: [
                    {
                        id: 20
                    }
                ]
            }
        ],
        Brand: {
            id: 81,
            name: 'Apple',
            image_url: null
        },
        Uom: {
            id: 1,
            name: 'Unit'
        },
        StockingUom: {
            id: 1,
            name: 'Box'
        },
        ProductGroupAttributes: [
            {
                id: 1,
                product_group_id: 2,
                attribute_code_id: 1,
                attribute_value_id: null,
                text_input: null,
                is_variant: 1,
                AttributeCode: {
                    id: 1,
                    code: 'phone_color',
                    label: 'Warna',
                    type: 'dropdown',
                    AttributeValues: [
                        {
                            id: 1,
                            attribute_code_id: 1,
                            value: 'Silver',
                            image_url: null
                        },
                        {
                            id: 2,
                            attribute_code_id: 1,
                            value: 'Black',
                            image_url: null
                        }
                    ]
                },
                AttributeValue: null
            },
            {
                id: 3,
                product_group_id: 2,
                attribute_code_id: 3,
                attribute_value_id: 5,
                text_input: null,
                is_variant: 0,
                AttributeCode: {
                    id: 3,
                    code: 'phone_os',
                    label: 'Sistem Operasi',
                    type: 'dropdown',
                    AttributeValues: [
                        {
                            id: 5,
                            attribute_code_id: 3,
                            value: 'iOS',
                            image_url: null
                        },
                        {
                            id: 6,
                            attribute_code_id: 3,
                            value: 'Android',
                            image_url: null
                        }
                    ]
                },
                AttributeValue: {
                    id: 5,
                    attribute_code_id: 3,
                    value: 'iOS',
                    image_url: null
                }
            }
        ]
    });

    const callback = t.context.sandbox.stub(ProductVendorRepository, 'findOne');
    callback.onCall(0).resolves({
        id: 20,
        product_variant_id: 8,
        vendor_id: 3,
        warehouse_id: 11,
        location_label: 'Jakarta',
        stock_available: 10,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: 1,
        tier_min_qty_2: '',
        tier_min_qty_3: '',
        tier_cogs_price_1: '50.00',
        tier_cogs_price_2: '',
        tier_cogs_price_3: '',
        warranty_option: 'official_warranty',
        warranty_period: 'year',
        warranty_limit: 1,
        warranty_coverage: 'xBox only',
        indent_period: 'day',
        indent_limit: 6,
        reference_link: '["http://google.com","http://facebook.com"]',
        sku_vendor: 'XXXXX',
        is_indent: 1,
        is_active: 0,
        created_by: 3,
        created_at: '2018-01-16T02:59:03.000Z',
        updated_at: '2018-01-18T09:50:39.000Z',
        ProductVariant: {
            id: 8,
            product_group_id: 2,
            sku: 'DC8JLF43ND',
            long_name: 'Apple iPhone 7 - Gold - 128GB',
            variant_value: '{"phone_color":2,"phone_storage":11}',
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 0,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-16T02:59:03.000Z',
            updated_at: '2018-01-16T02:59:03.000Z'
        },
        getValues() {
            return this;
        }
    });

    callback.onCall(1).resolves({
        id: 20,
        product_variant_id: 8,
        vendor_id: 3,
        warehouse_id: 11,
        location_label: 'Jakarta',
        stock_available: 10,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: 1,
        tier_min_qty_2: '',
        tier_min_qty_3: '',
        tier_cogs_price_1: '50.00',
        tier_cogs_price_2: '49.00',
        tier_cogs_price_3: '9.00',
        warranty_option: 'official_warranty',
        warranty_period: 'year',
        warranty_limit: 1,
        warranty_coverage: 'xBox only',
        indent_period: 'day',
        indent_limit: 6,
        reference_link: '["http://google.com","http://facebook.com"]',
        sku_vendor: 'XXXXX',
        is_indent: 1,
        is_active: 0,
        created_by: 3,
        created_at: '2018-01-16T02:59:03.000Z',
        updated_at: '2018-01-18T09:50:39.000Z',
        ProductVariant: {
            id: 8,
            product_group_id: 2,
            sku: 'DC8JLF43ND',
            long_name: 'Apple iPhone 7 - Gold - 128GB',
            variant_value: '{"phone_color":2,"phone_storage":11}',
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 0,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-16T02:59:03.000Z',
            updated_at: '2018-01-16T02:59:03.000Z'
        },
        getValues() {
            return this;
        }
    });

    t.context.sandbox.stub(ProductVendorRepository, 'updateOne').resolves(true);
    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithDetailById').resolves(payloadPubUpdate);

    t.context.sandbox.stub(ProductLogRepository, 'insertMany').resolves(true);
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);
    t.context.sandbox.stub(BizzyService, 'callSync').resolves(true);
    t.context.sandbox.stub(PrivateSkuRepository, 'delete').resolves(true);
    t.context.sandbox.stub(PrivateSkuRepository, 'insert').resolves(true);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3',
                pid: '2'
            },
            body: {
                products: [
                    {
                        id: 20,
                        sku_vendor: 'XXXXX',
                        tier_min_qty_1: '1',
                        tier_min_qty_2: '',
                        tier_min_qty_3: '',
                        tier_cogs_price_1: '40',
                        tier_cogs_price_2: '',
                        tier_cogs_price_3: '',
                        stock_available: 0,
                        is_indent: 1,
                        indent_period: 'day',
                        indent_limit: 68,
                        is_decimal: 1,
                        down_payment_type: 1,
                        down_payment_value: 20,
                        warranty_option: 'official_warranty',
                        warranty_period: 'year',
                        warranty_limit: 11,
                        warranty_coverage: 'xBox only',
                        reference_link: []
                    }
                ]
            }
        };
        const result = yield Method.putProduct(data, context);
        const expected = {
            data: {
                id: 2,
                name: 'Apple iPhone 7'
            },
            message: 'Product berhasil diubah'
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
        t.fail(err);
    }
});

test.serial('Should failed to update product because SKU contains symbols', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findOneDetail').resolves(false);
    t.context.sandbox.stub(ProductVendorRepository, 'findByProductGroupId').resolves({
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
        variant_matrix: '["phone_color"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        ProductVariants: [
            {
                id: 8,
                product_group_id: 2,
                sku: 'DC8JLF43ND',
                long_name: 'Apple iPhone 7 - Gold - 128GB',
                variant_value: '{"phone_color":2}',
                primary_image: 'http://localhost/testing/testing_image.jpg',
                additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
                product_id_magento: null,
                product_id_netsuite: null,
                is_primary: 0,
                is_discontinue: 0,
                is_active: 1,
                ProductVendors: [
                    {
                        id: 20
                    }
                ]
            }
        ],
        Brand: {
            id: 81,
            name: 'Apple',
            image_url: null
        },
        Uom: {
            id: 1,
            name: 'Unit'
        },
        StockingUom: {
            id: 1,
            name: 'Box'
        },
        ProductGroupAttributes: [
            {
                id: 1,
                product_group_id: 2,
                attribute_code_id: 1,
                attribute_value_id: null,
                text_input: null,
                is_variant: 1,
                AttributeCode: {
                    id: 1,
                    code: 'phone_color',
                    label: 'Warna',
                    type: 'dropdown',
                    AttributeValues: [
                        {
                            id: 1,
                            attribute_code_id: 1,
                            value: 'Silver',
                            image_url: null
                        },
                        {
                            id: 2,
                            attribute_code_id: 1,
                            value: 'Black',
                            image_url: null
                        }
                    ]
                },
                AttributeValue: null
            },
            {
                id: 3,
                product_group_id: 2,
                attribute_code_id: 3,
                attribute_value_id: 5,
                text_input: null,
                is_variant: 0,
                AttributeCode: {
                    id: 3,
                    code: 'phone_os',
                    label: 'Sistem Operasi',
                    type: 'dropdown',
                    AttributeValues: [
                        {
                            id: 5,
                            attribute_code_id: 3,
                            value: 'iOS',
                            image_url: null
                        },
                        {
                            id: 6,
                            attribute_code_id: 3,
                            value: 'Android',
                            image_url: null
                        }
                    ]
                },
                AttributeValue: {
                    id: 5,
                    attribute_code_id: 3,
                    value: 'iOS',
                    image_url: null
                }
            }
        ]
    });

    const callback = t.context.sandbox.stub(ProductVendorRepository, 'findOne');
    callback.onCall(0).resolves({
        id: 20,
        product_variant_id: 8,
        vendor_id: 3,
        warehouse_id: 11,
        location_label: 'Jakarta',
        stock_available: 10,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: 1,
        tier_min_qty_2: 2,
        tier_min_qty_3: 3,
        tier_cogs_price_1: '50.00',
        tier_cogs_price_2: '49.00',
        tier_cogs_price_3: '9.00',
        warranty_option: 'official_warranty',
        warranty_period: 'year',
        warranty_limit: 1,
        warranty_coverage: 'xBox only',
        indent_period: 'day',
        indent_limit: 6,
        reference_link: '["http://google.com","http://facebook.com"]',
        sku_vendor: 'XXXXX',
        is_indent: 1,
        is_active: 0,
        created_by: 3,
        created_at: '2018-01-16T02:59:03.000Z',
        updated_at: '2018-01-18T09:50:39.000Z',
        ProductVariant: {
            id: 8,
            product_group_id: 2,
            sku: 'DC8JLF43ND',
            long_name: 'Apple iPhone 7 - Gold - 128GB',
            variant_value: '{"phone_color":2,"phone_storage":11}',
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 0,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-16T02:59:03.000Z',
            updated_at: '2018-01-16T02:59:03.000Z'
        },
        getValues() {
            return this;
        }
    });

    t.context.sandbox.stub(ProductVendorRepository, 'updateOne').resolves(true);
    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithDetailById').resolves(payloadPubUpdate);

    callback.onCall(1).resolves({
        id: 20,
        product_variant_id: 8,
        vendor_id: 3,
        warehouse_id: 11,
        location_label: 'Jakarta',
        stock_available: 10,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: 1,
        tier_min_qty_2: 2,
        tier_min_qty_3: 3,
        tier_cogs_price_1: '50.00',
        tier_cogs_price_2: '49.00',
        tier_cogs_price_3: '9.00',
        warranty_option: 'official_warranty',
        warranty_period: 'year',
        warranty_limit: 1,
        warranty_coverage: 'xBox only',
        indent_period: 'day',
        indent_limit: 6,
        reference_link: '["http://google.com","http://facebook.com"]',
        sku_vendor: 'XXXXX',
        is_indent: 1,
        is_active: 0,
        created_by: 3,
        created_at: '2018-01-16T02:59:03.000Z',
        updated_at: '2018-01-18T09:50:39.000Z',
        ProductVariant: {
            id: 8,
            product_group_id: 2,
            sku: 'DC8JLF43ND',
            long_name: 'Apple iPhone 7 - Gold - 128GB',
            variant_value: '{"phone_color":2,"phone_storage":11}',
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 0,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-16T02:59:03.000Z',
            updated_at: '2018-01-16T02:59:03.000Z'
        },
        getValues() {
            return this;
        }
    });

    t.context.sandbox.stub(ProductLogRepository, 'insertMany').resolves(true);
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);
    t.context.sandbox.stub(BizzyService, 'callSync').resolves(true);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3',
                pid: '2'
            },
            body: {
                products: [
                    {
                        id: 20,
                        sku_vendor: 'XXX@@@XX',
                        tier_min_qty_1: '1',
                        tier_min_qty_2: '2',
                        tier_min_qty_3: '3',
                        tier_cogs_price_1: '40',
                        tier_cogs_price_2: '19',
                        tier_cogs_price_3: '9',
                        stock_available: 10,
                        is_indent: 1,
                        indent_period: 'day',
                        indent_limit: 68,
                        warranty_option: 'official_warranty',
                        warranty_period: 'year',
                        warranty_limit: 11,
                        warranty_coverage: 'xBox only',
                        reference_link: [],
                        is_decimal: 1,
                        down_payment_type: 1,
                        down_payment_value: 20
                    }
                ]
            }
        };
        yield Method.putProduct(data, context);
        t.fail('Should return BadRequest');
    } catch (err) {
        t.pass(err instanceof BizzyError.BadRequest);
    }
});

test.serial('Should failed to update product because SKU already used', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findOneDetail').resolves(true);
    t.context.sandbox.stub(ProductVendorRepository, 'findByProductGroupId').resolves({
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
        variant_matrix: '["phone_color"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        ProductVariants: [
            {
                id: 8,
                product_group_id: 2,
                sku: 'DC8JLF43ND',
                long_name: 'Apple iPhone 7 - Gold - 128GB',
                variant_value: '{"phone_color":2}',
                primary_image: 'http://localhost/testing/testing_image.jpg',
                additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
                product_id_magento: null,
                product_id_netsuite: null,
                is_primary: 0,
                is_discontinue: 0,
                is_active: 1,
                ProductVendors: [
                    {
                        id: 20
                    }
                ]
            }
        ],
        Brand: {
            id: 81,
            name: 'Apple',
            image_url: null
        },
        Uom: {
            id: 1,
            name: 'Unit'
        },
        StockingUom: {
            id: 1,
            name: 'Box'
        },
        ProductGroupAttributes: [
            {
                id: 1,
                product_group_id: 2,
                attribute_code_id: 1,
                attribute_value_id: null,
                text_input: null,
                is_variant: 1,
                AttributeCode: {
                    id: 1,
                    code: 'phone_color',
                    label: 'Warna',
                    type: 'dropdown',
                    AttributeValues: [
                        {
                            id: 1,
                            attribute_code_id: 1,
                            value: 'Silver',
                            image_url: null
                        },
                        {
                            id: 2,
                            attribute_code_id: 1,
                            value: 'Black',
                            image_url: null
                        }
                    ]
                },
                AttributeValue: null
            },
            {
                id: 3,
                product_group_id: 2,
                attribute_code_id: 3,
                attribute_value_id: 5,
                text_input: null,
                is_variant: 0,
                AttributeCode: {
                    id: 3,
                    code: 'phone_os',
                    label: 'Sistem Operasi',
                    type: 'dropdown',
                    AttributeValues: [
                        {
                            id: 5,
                            attribute_code_id: 3,
                            value: 'iOS',
                            image_url: null
                        },
                        {
                            id: 6,
                            attribute_code_id: 3,
                            value: 'Android',
                            image_url: null
                        }
                    ]
                },
                AttributeValue: {
                    id: 5,
                    attribute_code_id: 3,
                    value: 'iOS',
                    image_url: null
                }
            }
        ]
    });

    const callback = t.context.sandbox.stub(ProductVendorRepository, 'findOne');
    callback.onCall(0).resolves({
        id: 20,
        product_variant_id: 8,
        vendor_id: 3,
        warehouse_id: 11,
        location_label: 'Jakarta',
        stock_available: 10,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: 1,
        tier_min_qty_2: 2,
        tier_min_qty_3: 3,
        tier_cogs_price_1: '50.00',
        tier_cogs_price_2: '49.00',
        tier_cogs_price_3: '9.00',
        warranty_option: 'official_warranty',
        warranty_period: 'year',
        warranty_limit: 1,
        warranty_coverage: 'xBox only',
        indent_period: 'day',
        indent_limit: 6,
        reference_link: '["http://google.com","http://facebook.com"]',
        sku_vendor: 'XXXXX',
        is_indent: 1,
        is_active: 0,
        created_by: 3,
        created_at: '2018-01-16T02:59:03.000Z',
        updated_at: '2018-01-18T09:50:39.000Z',
        ProductVariant: {
            id: 8,
            product_group_id: 2,
            sku: 'DC8JLF43ND',
            long_name: 'Apple iPhone 7 - Gold - 128GB',
            variant_value: '{"phone_color":2,"phone_storage":11}',
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 0,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-16T02:59:03.000Z',
            updated_at: '2018-01-16T02:59:03.000Z'
        },
        getValues() {
            return this;
        }
    });

    t.context.sandbox.stub(ProductVendorRepository, 'updateOne').resolves(true);
    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithDetailById').resolves(payloadPubUpdate);

    callback.onCall(1).resolves({
        id: 20,
        product_variant_id: 8,
        vendor_id: 3,
        warehouse_id: 11,
        location_label: 'Jakarta',
        stock_available: 10,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: 1,
        tier_min_qty_2: 2,
        tier_min_qty_3: 3,
        tier_cogs_price_1: '50.00',
        tier_cogs_price_2: '49.00',
        tier_cogs_price_3: '9.00',
        warranty_option: 'official_warranty',
        warranty_period: 'year',
        warranty_limit: 1,
        warranty_coverage: 'xBox only',
        indent_period: 'day',
        indent_limit: 6,
        reference_link: '["http://google.com","http://facebook.com"]',
        sku_vendor: 'XXXXX',
        is_indent: 1,
        is_active: 0,
        created_by: 3,
        created_at: '2018-01-16T02:59:03.000Z',
        updated_at: '2018-01-18T09:50:39.000Z',
        ProductVariant: {
            id: 8,
            product_group_id: 2,
            sku: 'DC8JLF43ND',
            long_name: 'Apple iPhone 7 - Gold - 128GB',
            variant_value: '{"phone_color":2,"phone_storage":11}',
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 0,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-16T02:59:03.000Z',
            updated_at: '2018-01-16T02:59:03.000Z'
        },
        getValues() {
            return this;
        }
    });

    t.context.sandbox.stub(ProductLogRepository, 'insertMany').resolves(true);
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);
    t.context.sandbox.stub(BizzyService, 'callSync').resolves(true);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3',
                pid: '2'
            },
            body: {
                products: [
                    {
                        id: 20,
                        sku_vendor: '1212hgh',
                        tier_min_qty_1: '1',
                        tier_min_qty_2: '2',
                        tier_min_qty_3: '3',
                        tier_cogs_price_1: '40',
                        tier_cogs_price_2: '19',
                        tier_cogs_price_3: '9',
                        stock_available: 10,
                        is_indent: 1,
                        indent_period: 'day',
                        indent_limit: 68,
                        warranty_option: 'official_warranty',
                        warranty_period: 'year',
                        warranty_limit: 11,
                        warranty_coverage: 'xBox only',
                        reference_link: [],
                        is_decimal: 1,
                        down_payment_type: 1,
                        down_payment_value: 20
                    }
                ]
            }
        };
        yield Method.putProduct(data, context);
        t.fail('Should return BadRequest');
    } catch (err) {
        t.pass(err instanceof BizzyError.BadRequest);
    }
});

test.serial('Should update product - When nothing updated', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(ProductVendorRepository, 'findOneDetail').resolves(false);
    t.context.sandbox.stub(ProductVendorRepository, 'findByProductGroupId').resolves({
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
        variant_matrix: '["phone_color"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        ProductVariants: [
            {
                id: 8,
                product_group_id: 2,
                sku: 'DC8JLF43ND',
                long_name: 'Apple iPhone 7 - Gold - 128GB',
                variant_value: '{"phone_color":2}',
                primary_image: 'http://localhost/testing/testing_image.jpg',
                additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
                product_id_magento: null,
                product_id_netsuite: null,
                is_primary: 0,
                is_discontinue: 0,
                is_active: 1,
                ProductVendors: [
                    {
                        id: 20
                    }
                ]
            }
        ],
        Brand: {
            id: 81,
            name: 'Apple',
            image_url: null
        },
        Uom: {
            id: 1,
            name: 'Unit'
        },
        StockingUom: {
            id: 1,
            name: 'Box'
        },
        ProductGroupAttributes: [
            {
                id: 1,
                product_group_id: 2,
                attribute_code_id: 1,
                attribute_value_id: null,
                text_input: null,
                is_variant: 1,
                AttributeCode: {
                    id: 1,
                    code: 'phone_color',
                    label: 'Warna',
                    type: 'dropdown',
                    AttributeValues: [
                        {
                            id: 1,
                            attribute_code_id: 1,
                            value: 'Silver',
                            image_url: null
                        },
                        {
                            id: 2,
                            attribute_code_id: 1,
                            value: 'Black',
                            image_url: null
                        }
                    ]
                },
                AttributeValue: null
            },
            {
                id: 3,
                product_group_id: 2,
                attribute_code_id: 3,
                attribute_value_id: 5,
                text_input: null,
                is_variant: 0,
                AttributeCode: {
                    id: 3,
                    code: 'phone_os',
                    label: 'Sistem Operasi',
                    type: 'dropdown',
                    AttributeValues: [
                        {
                            id: 5,
                            attribute_code_id: 3,
                            value: 'iOS',
                            image_url: null
                        },
                        {
                            id: 6,
                            attribute_code_id: 3,
                            value: 'Android',
                            image_url: null
                        }
                    ]
                },
                AttributeValue: {
                    id: 5,
                    attribute_code_id: 3,
                    value: 'iOS',
                    image_url: null
                }
            }
        ]
    });

    const callback = t.context.sandbox.stub(ProductVendorRepository, 'findOne');
    callback.onCall(0).resolves({
        id: 20,
        product_variant_id: 8,
        vendor_id: 3,
        warehouse_id: 11,
        location_label: 'Jakarta',
        stock_available: 10,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: '1',
        tier_min_qty_2: '2',
        tier_min_qty_3: '3',
        tier_cogs_price_1: '50.00',
        tier_cogs_price_2: '49.00',
        tier_cogs_price_3: '9.00',
        warranty_option: 'official_warranty',
        warranty_period: 'year',
        warranty_limit: 1,
        warranty_coverage: 'xBox only',
        indent_period: 'day',
        indent_limit: 6,
        reference_link: '["http://google.com","http://facebook.com"]',
        sku_vendor: 'XXXXX',
        is_indent: 1,
        is_active: 0,
        created_by: 3,
        created_at: '2018-01-16T02:59:03.000Z',
        updated_at: '2018-01-18T09:50:39.000Z',
        ProductVariant: {
            id: 8,
            product_group_id: 2,
            sku: 'DC8JLF43ND',
            long_name: 'Apple iPhone 7 - Gold - 128GB',
            variant_value: '{"phone_color":2,"phone_storage":11}',
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 0,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-16T02:59:03.000Z',
            updated_at: '2018-01-16T02:59:03.000Z'
        },
        getValues() {
            return this;
        }
    });
    callback.onCall(1).resolves({
        id: 20,
        product_variant_id: 8,
        vendor_id: 3,
        warehouse_id: 11,
        location_label: 'Jakarta',
        stock_available: 15,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: '1',
        tier_min_qty_2: '2',
        tier_min_qty_3: '3',
        tier_cogs_price_1: '52.00',
        tier_cogs_price_2: '49.00',
        tier_cogs_price_3: '9.00',
        warranty_option: 'official_warranty',
        warranty_period: 'year',
        warranty_limit: 1,
        warranty_coverage: 'xBox only',
        indent_period: 'day',
        indent_limit: 6,
        reference_link: '["http://google.com","http://facebook.com"]',
        sku_vendor: 'XXXXX',
        is_indent: 1,
        is_active: 0,
        created_by: 3,
        created_at: '2018-01-16T02:59:03.000Z',
        updated_at: '2018-01-18T09:50:39.000Z',
        ProductVariant: {
            id: 8,
            product_group_id: 2,
            sku: 'DC8JLF43ND',
            long_name: 'Apple iPhone 7 - Gold - 128GB',
            variant_value: '{"phone_color":2,"phone_storage":11}',
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 0,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-16T02:59:03.000Z',
            updated_at: '2018-01-16T02:59:03.000Z'
        },
        getValues() {
            return this;
        }
    });

    t.context.sandbox.stub(ProductVendorRepository, 'updateOne').resolves(true);
    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithDetailById').resolves(payloadPubUpdate);
    t.context.sandbox.stub(ProductLogRepository, 'insertMany').resolves(true);
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);
    t.context.sandbox.stub(BizzyService, 'callSync').resolves(true);
    t.context.sandbox.stub(PrivateSkuRepository, 'delete').resolves(true);
    t.context.sandbox.stub(PrivateSkuRepository, 'insert').resolves(true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3',
                pid: '2'
            },
            body: {
                products: [
                    {
                        id: 20,
                        sku_vendor: 'XXXXX',
                        tier_min_qty_1: '1',
                        tier_min_qty_2: '2',
                        tier_min_qty_3: '3',
                        tier_cogs_price_1: '50',
                        tier_cogs_price_2: '49',
                        tier_cogs_price_3: '9',
                        stock_available: 0,
                        is_indent: 1,
                        indent_period: 'day',
                        indent_limit: 68,
                        is_decimal: 1,
                        down_payment_type: 1,
                        down_payment_value: 20,
                        warranty_option: 'official_warranty',
                        warranty_period: 'year',
                        warranty_limit: 11,
                        warranty_coverage: 'xBox only',
                        reference_link: [
                            'http://google.com',
                            'http://facebook.com'
                        ]
                    }
                ]
            }
        };
        const result = yield Method.putProduct(data, context);
        const expected = {
            data: {
                id: 2,
                name: 'Apple iPhone 7'
            },
            message: 'Product berhasil diubah'
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
        t.fail(err);
    }
});

test.serial('Should update product - When nothing updated. vendor is BCI (not send to webhook)', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(ProductVendorRepository, 'findOneDetail').resolves(false);
    t.context.sandbox.stub(ProductVendorRepository, 'findByProductGroupId').resolves({
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
        variant_matrix: '["phone_color"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        ProductVariants: [
            {
                id: 8,
                product_group_id: 2,
                sku: 'DC8JLF43ND',
                long_name: 'Apple iPhone 7 - Gold - 128GB',
                variant_value: '{"phone_color":2}',
                primary_image: 'http://localhost/testing/testing_image.jpg',
                additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
                product_id_magento: null,
                product_id_netsuite: null,
                is_primary: 0,
                is_discontinue: 0,
                is_active: 1,
                ProductVendors: [{
                    id: 20
                }]
            }
        ],
        Brand: {
            id: 81,
            name: 'Apple',
            image_url: null
        },
        Uom: {
            id: 1,
            name: 'Unit'
        },
        StockingUom: {
            id: 1,
            name: 'Box'
        },
        ProductGroupAttributes: [
            {
                id: 1,
                product_group_id: 2,
                attribute_code_id: 1,
                attribute_value_id: null,
                text_input: null,
                is_variant: 1,
                AttributeCode: {
                    id: 1,
                    code: 'phone_color',
                    label: 'Warna',
                    type: 'dropdown',
                    AttributeValues: [
                        {
                            id: 1,
                            attribute_code_id: 1,
                            value: 'Silver',
                            image_url: null
                        },
                        {
                            id: 2,
                            attribute_code_id: 1,
                            value: 'Black',
                            image_url: null
                        }
                    ]
                },
                AttributeValue: null
            },
            {
                id: 3,
                product_group_id: 2,
                attribute_code_id: 3,
                attribute_value_id: 5,
                text_input: null,
                is_variant: 0,
                AttributeCode: {
                    id: 3,
                    code: 'phone_os',
                    label: 'Sistem Operasi',
                    type: 'dropdown',
                    AttributeValues: [
                        {
                            id: 5,
                            attribute_code_id: 3,
                            value: 'iOS',
                            image_url: null
                        },
                        {
                            id: 6,
                            attribute_code_id: 3,
                            value: 'Android',
                            image_url: null
                        }
                    ]
                },
                AttributeValue: {
                    id: 5,
                    attribute_code_id: 3,
                    value: 'iOS',
                    image_url: null
                }
            }
        ]
    });

    const callback = t.context.sandbox.stub(ProductVendorRepository, 'findOne');
    callback.onCall(0).resolves({
        id: 20,
        product_variant_id: 8,
        vendor_id: 3,
        warehouse_id: 11,
        location_label: 'Jakarta',
        stock_available: 10,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: 1,
        tier_min_qty_2: 2,
        tier_min_qty_3: 3,
        tier_cogs_price_1: '50.00',
        tier_cogs_price_2: '49.00',
        tier_cogs_price_3: '9.00',
        tier_min_qty_4: 3,
        warranty_option: 'official_warranty',
        warranty_period: 'year',
        warranty_limit: 1,
        warranty_coverage: 'xBox only',
        indent_period: 'day',
        indent_limit: 6,
        reference_link: '["http://google.com","http://facebook.com"]',
        sku_vendor: 'XXXXX',
        is_indent: 1,
        is_active: 0,
        created_by: 3,
        created_at: '2018-01-16T02:59:03.000Z',
        updated_at: '2018-01-18T09:50:39.000Z',
        ProductVariant: {
            id: 8,
            product_group_id: 2,
            sku: 'DC8JLF43ND',
            long_name: 'Apple iPhone 7 - Gold - 128GB',
            variant_value: '{"phone_color":2,"phone_storage":11}',
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 0,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-16T02:59:03.000Z',
            updated_at: '2018-01-16T02:59:03.000Z'
        },
        getValues() {
            return this;
        }
    });

    t.context.sandbox.stub(ProductVendorRepository, 'updateOne').resolves(true);
    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithDetailById').resolves(payloadPubUpdate);

    callback.onCall(1).resolves({
        id: 20,
        product_variant_id: 8,
        vendor_id: 3,
        warehouse_id: 11,
        location_label: 'Jakarta',
        stock_available: 10,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: 1,
        tier_min_qty_2: 2,
        tier_min_qty_3: 33,
        tier_cogs_price_1: '50.00',
        tier_cogs_price_2: '49.00',
        tier_cogs_price_3: '9.00',
        tier_min_qty_4: 3,
        warranty_option: 'official_warranty',
        warranty_period: 'year',
        warranty_limit: 1,
        warranty_coverage: 'xBox only',
        indent_period: 'day',
        indent_limit: 6,
        reference_link: '["http://google.com","http://facebook.com"]',
        sku_vendor: 'XXXXX',
        is_indent: 1,
        is_active: 0,
        created_by: 3,
        created_at: '2018-01-16T02:59:03.000Z',
        updated_at: '2018-01-18T09:50:39.000Z',
        ProductVariant: {
            id: 8,
            product_group_id: 2,
            sku: 'DC8JLF43ND',
            long_name: 'Apple iPhone 7 - Gold - 128GB',
            variant_value: '{"phone_color":2,"phone_storage":11}',
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 0,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-16T02:59:03.000Z',
            updated_at: '2018-01-16T02:59:03.000Z'
        },
        getValues() {
            return this;
        }
    });

    t.context.sandbox.stub(ProductLogRepository, 'insertMany').resolves(true);
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);
    t.context.sandbox.stub(BizzyService, 'callSync').resolves(true);
    t.context.sandbox.stub(PrivateSkuRepository, 'delete').resolves(true);
    t.context.sandbox.stub(PrivateSkuRepository, 'insert').resolves(true);

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
                id: '170',
                pid: '2'
            },
            body: {
                products: [
                    {
                        id: 20,
                        sku_vendor: 'XXXXX',
                        tier_min_qty_1: '1',
                        tier_min_qty_2: '2',
                        tier_min_qty_3: '3',
                        tier_cogs_price_1: '40',
                        tier_cogs_price_2: '19',
                        tier_cogs_price_3: '9',
                        stock_available: 0,
                        is_indent: 1,
                        indent_period: 'day',
                        indent_limit: 68,
                        is_decimal: 1,
                        down_payment_type: 1,
                        down_payment_value: 20,
                        warranty_option: 'official_warranty',
                        warranty_period: 'year',
                        warranty_limit: 11,
                        warranty_coverage: 'xBox only',
                        reference_link: [
                            'http://google.com',
                            'http://facebook.com'
                        ]
                    }
                ]
            }
        };
        const result = yield Method.putProduct(data, context);
        const expected = {
            data: {
                id: 2,
                name: 'Apple iPhone 7'
            },
            message: 'Product berhasil diubah'
        };
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err.stack);
        console.log(err.message);
        t.fail(err);
    }
});

test.serial('Product Not Found', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(ProductVendorRepository, 'findOneDetail').resolves(false);
    t.context.sandbox.stub(ProductVendorRepository, 'findByProductGroupId').resolves(false);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3',
                pid: '2'
            },
            body: {
                products: [
                    {
                        id: 20,
                        sku_vendor: 'XXXXX',
                        tier_min_qty_1: '1',
                        tier_min_qty_2: '2',
                        tier_min_qty_3: '3',
                        tier_cogs_price_1: '40',
                        tier_cogs_price_2: '19',
                        tier_cogs_price_3: '9',
                        stock_available: 0,
                        is_indent: 1,
                        is_decimal: 0,
                        down_payment_type: 1,
                        down_payment_value: 20,
                        indent_period: 'day',
                        indent_limit: 68,
                        warranty_option: 'official_warranty',
                        warranty_period: 'year',
                        warranty_limit: 11,
                        warranty_coverage: 'xBox only',
                        reference_link: [
                            'http://google.com',
                            'http://facebook.com'
                        ]
                    }
                ]
            }
        };
        yield Method.putProduct(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, err.message);
    }
});

test.serial('Product Vendor Not Found', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(ProductVendorRepository, 'findOneDetail').resolves(false);
    t.context.sandbox.stub(ProductVendorRepository, 'findByProductGroupId').resolves(true);

    const callback = t.context.sandbox.stub(ProductVendorRepository, 'findOne');
    callback.onCall(0).resolves(false);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3',
                pid: '2'
            },
            body: {
                products: [
                    {
                        id: 20,
                        sku_vendor: 'XXXXX',
                        tier_min_qty_1: '1',
                        tier_min_qty_2: '2',
                        tier_min_qty_3: '3',
                        tier_cogs_price_1: '40',
                        tier_cogs_price_2: '19',
                        tier_cogs_price_3: '9',
                        stock_available: 0,
                        is_indent: 1,
                        is_decimal: 0,
                        down_payment_type: 1,
                        down_payment_value: 20,
                        indent_period: 'day',
                        indent_limit: 68,
                        warranty_option: 'official_warranty',
                        warranty_period: 'year',
                        warranty_limit: 11,
                        warranty_coverage: 'xBox only',
                        reference_link: [
                            'http://google.com',
                            'http://facebook.com'
                        ]
                    }
                ]
            }
        };
        yield Method.putProduct(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, err.message);
    }
});

test.serial('Should catch the invalid params', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    try {
        const context = require('../../../mocks/context.json');

        const data = {
            path: {
                id: '3',
                pid: -1
            },
            body: {
                products: [
                    {
                        id: 20,
                        sku_vendor: 'XXXXX',
                        tier_min_qty_1: '1',
                        tier_min_qty_2: '2',
                        tier_min_qty_3: '3',
                        tier_cogs_price_1: '40',
                        tier_cogs_price_2: '19',
                        tier_cogs_price_3: '9',
                        stock_available: 10,
                        is_indent: 1,
                        is_decimal: 1,
                        down_payment_type: 1,
                        down_payment_value: 20,
                        indent_period: 'day',
                        indent_limit: 68,
                        warranty_option: 'official_warranty',
                        warranty_period: 'year',
                        warranty_limit: 11,
                        warranty_coverage: 'xBox only',
                        reference_link: [
                            'http://google.com',
                            'http://facebook.com'
                        ]
                    }
                ]
            }
        };
        yield Method.putProduct(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Should be return authorized user', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    try {
        const context = {
            user: ''
        };
        const data = {
            path: {
                id: '3',
                pid: '2'
            },
            body: {
                products: [
                    {
                        id: 20,
                        sku_vendor: 'XXXXX',
                        tier_min_qty_1: '1',
                        tier_min_qty_2: '2',
                        tier_min_qty_3: '3',
                        tier_cogs_price_1: '40',
                        tier_cogs_price_2: '19',
                        tier_cogs_price_3: '9',
                        stock_available: 0,
                        is_indent: 1,
                        is_decimal: 1,
                        down_payment_type: 1,
                        down_payment_value: 20,
                        indent_period: 'day',
                        indent_limit: 68,
                        warranty_option: 'official_warranty',
                        warranty_period: 'year',
                        warranty_limit: 11,
                        warranty_coverage: 'xBox only',
                        reference_link: [
                            'http://google.com',
                            'http://facebook.com'
                        ]
                    }
                ]
            }
        };
        yield Method.putProduct(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, 'You are not authorized user');
    }
});

test.serial('Should update product return BadRequest when failed to update product', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(ProductVendorRepository, 'findOneDetail').resolves(false);
    t.context.sandbox.stub(ProductVendorRepository, 'findByProductGroupId').resolves({
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
        variant_matrix: '["phone_color"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        ProductVariants: [
            {
                id: 8,
                product_group_id: 2,
                sku: 'DC8JLF43ND',
                long_name: 'Apple iPhone 7 - Gold - 128GB',
                variant_value: '{"phone_color":2}',
                primary_image: 'http://localhost/testing/testing_image.jpg',
                additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
                product_id_magento: null,
                product_id_netsuite: null,
                is_primary: 0,
                is_discontinue: 0,
                is_active: 1,
                ProductVendors: [
                    {
                        id: 20
                    }
                ]
            }
        ],
        Brand: {
            id: 81,
            name: 'Apple',
            image_url: null
        },
        Uom: {
            id: 1,
            name: 'Unit'
        },
        StockingUom: {
            id: 1,
            name: 'Box'
        },
        ProductGroupAttributes: [
            {
                id: 1,
                product_group_id: 2,
                attribute_code_id: 1,
                attribute_value_id: null,
                text_input: null,
                is_variant: 1,
                AttributeCode: {
                    id: 1,
                    code: 'phone_color',
                    label: 'Warna',
                    type: 'dropdown',
                    AttributeValues: [
                        {
                            id: 1,
                            attribute_code_id: 1,
                            value: 'Silver',
                            image_url: null
                        },
                        {
                            id: 2,
                            attribute_code_id: 1,
                            value: 'Black',
                            image_url: null
                        }
                    ]
                },
                AttributeValue: null
            },
            {
                id: 3,
                product_group_id: 2,
                attribute_code_id: 3,
                attribute_value_id: 5,
                text_input: null,
                is_variant: 0,
                AttributeCode: {
                    id: 3,
                    code: 'phone_os',
                    label: 'Sistem Operasi',
                    type: 'dropdown',
                    AttributeValues: [
                        {
                            id: 5,
                            attribute_code_id: 3,
                            value: 'iOS',
                            image_url: null
                        },
                        {
                            id: 6,
                            attribute_code_id: 3,
                            value: 'Android',
                            image_url: null
                        }
                    ]
                },
                AttributeValue: {
                    id: 5,
                    attribute_code_id: 3,
                    value: 'iOS',
                    image_url: null
                }
            }
        ]
    });

    const callback = t.context.sandbox.stub(ProductVendorRepository, 'findOne');
    callback.onCall(0).resolves({
        id: 20,
        product_variant_id: 8,
        vendor_id: 3,
        warehouse_id: 11,
        location_label: 'Jakarta',
        stock_available: 10,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: 1,
        tier_min_qty_2: 2,
        tier_min_qty_3: 3,
        tier_cogs_price_1: '50.00',
        tier_cogs_price_2: '49.00',
        tier_cogs_price_3: '9.00',
        warranty_option: 'official_warranty',
        warranty_period: 'year',
        warranty_limit: 1,
        warranty_coverage: 'xBox only',
        indent_period: 'day',
        indent_limit: 6,
        reference_link: '["http://google.com","http://facebook.com"]',
        sku_vendor: 'XXXXX',
        is_indent: 1,
        is_active: 0,
        created_by: 3,
        created_at: '2018-01-16T02:59:03.000Z',
        updated_at: '2018-01-18T09:50:39.000Z',
        ProductVariant: {
            id: 8,
            product_group_id: 2,
            sku: 'DC8JLF43ND',
            long_name: 'Apple iPhone 7 - Gold - 128GB',
            variant_value: '{"phone_color":2,"phone_storage":11}',
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 0,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-16T02:59:03.000Z',
            updated_at: '2018-01-16T02:59:03.000Z'
        },
        getValues() {
            return this;
        }
    });
    callback.onCall(1).resolves({
        id: 20,
        product_variant_id: 8,
        vendor_id: 3,
        warehouse_id: 11,
        location_label: 'Jakarta',
        stock_available: 10,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: 1,
        tier_min_qty_2: 2,
        tier_min_qty_3: 3,
        tier_cogs_price_1: '50.00',
        tier_cogs_price_2: '49.00',
        tier_cogs_price_3: '9.00',
        warranty_option: 'official_warranty',
        warranty_period: 'year',
        warranty_limit: 1,
        warranty_coverage: 'xBox only',
        indent_period: 'day',
        indent_limit: 6,
        reference_link: '["http://google.com","http://facebook.com"]',
        sku_vendor: 'XXXXX',
        is_indent: 1,
        is_active: 0,
        created_by: 3,
        created_at: '2018-01-16T02:59:03.000Z',
        updated_at: '2018-01-18T09:50:39.000Z',
        ProductVariant: {
            id: 8,
            product_group_id: 2,
            sku: 'DC8JLF43ND',
            long_name: 'Apple iPhone 7 - Gold - 128GB',
            variant_value: '{"phone_color":2,"phone_storage":11}',
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 0,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-16T02:59:03.000Z',
            updated_at: '2018-01-16T02:59:03.000Z'
        },
        getValues() {
            return this;
        }
    });

    t.context.sandbox.stub(ProductVendorRepository, 'update').rejects();
    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithDetailById').resolves(payloadPubUpdate);
    t.context.sandbox.stub(ProductLogRepository, 'insertMany').resolves(true);

    const AsyncCallBack = t.context.sandbox.stub(BizzyService, 'callAsync');
    AsyncCallBack.onCall(0).resolves(true);
    AsyncCallBack.onCall(1).rejects();
    // t.context.sandbox.stub(BizzyService, 'callSync').resolves();
    AsyncCallBack.onCall(2).resolves(true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3',
                pid: '2'
            },
            body: {
                products: [
                    {
                        id: 20,
                        sku_vendor: 'XXXXX',
                        tier_min_qty_1: '1',
                        tier_min_qty_2: '2',
                        tier_min_qty_3: '3',
                        tier_cogs_price_1: '40',
                        tier_cogs_price_2: '19',
                        tier_cogs_price_3: '9',
                        stock_available: 0,
                        is_indent: 1,
                        indent_period: 'day',
                        indent_limit: 68,
                        is_decimal: 1,
                        down_payment_type: 1,
                        down_payment_value: 20,
                        warranty_option: 'official_warranty',
                        warranty_period: 'year',
                        warranty_limit: 11,
                        warranty_coverage: 'xBox only',
                        reference_link: []
                    }
                ]
            }
        };
        yield Method.putProduct(data, context);
        t.fail('Should return BadRequest');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest);
    }
});

test.serial('Should update product return BadRequest when request to catalog-pubsub: publishUpdateProduct', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(ProductVendorRepository, 'findOneDetail').resolves(false);
    t.context.sandbox.stub(ProductVendorRepository, 'findByProductGroupId').resolves({
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
        variant_matrix: '["phone_color"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        ProductVariants: [
            {
                id: 8,
                product_group_id: 2,
                sku: 'DC8JLF43ND',
                long_name: 'Apple iPhone 7 - Gold - 128GB',
                variant_value: '{"phone_color":2}',
                primary_image: 'http://localhost/testing/testing_image.jpg',
                additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
                product_id_magento: null,
                product_id_netsuite: null,
                is_primary: 0,
                is_discontinue: 0,
                is_active: 1,
                ProductVendors: [
                    {
                        id: 20
                    }
                ]
            }
        ],
        Brand: {
            id: 81,
            name: 'Apple',
            image_url: null
        },
        Uom: {
            id: 1,
            name: 'Unit'
        },
        StockingUom: {
            id: 1,
            name: 'Box'
        },
        ProductGroupAttributes: [
            {
                id: 1,
                product_group_id: 2,
                attribute_code_id: 1,
                attribute_value_id: null,
                text_input: null,
                is_variant: 1,
                AttributeCode: {
                    id: 1,
                    code: 'phone_color',
                    label: 'Warna',
                    type: 'dropdown',
                    AttributeValues: [
                        {
                            id: 1,
                            attribute_code_id: 1,
                            value: 'Silver',
                            image_url: null
                        },
                        {
                            id: 2,
                            attribute_code_id: 1,
                            value: 'Black',
                            image_url: null
                        }
                    ]
                },
                AttributeValue: null
            },
            {
                id: 3,
                product_group_id: 2,
                attribute_code_id: 3,
                attribute_value_id: 5,
                text_input: null,
                is_variant: 0,
                AttributeCode: {
                    id: 3,
                    code: 'phone_os',
                    label: 'Sistem Operasi',
                    type: 'dropdown',
                    AttributeValues: [
                        {
                            id: 5,
                            attribute_code_id: 3,
                            value: 'iOS',
                            image_url: null
                        },
                        {
                            id: 6,
                            attribute_code_id: 3,
                            value: 'Android',
                            image_url: null
                        }
                    ]
                },
                AttributeValue: {
                    id: 5,
                    attribute_code_id: 3,
                    value: 'iOS',
                    image_url: null
                }
            }
        ]
    });

    const callback = t.context.sandbox.stub(ProductVendorRepository, 'findOne');
    callback.onCall(0).resolves({
        id: 20,
        product_variant_id: 8,
        vendor_id: 3,
        warehouse_id: 11,
        location_label: 'Jakarta',
        stock_available: 10,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: 1,
        tier_min_qty_2: 2,
        tier_min_qty_3: 3,
        tier_cogs_price_1: '50.00',
        tier_cogs_price_2: '49.00',
        tier_cogs_price_3: '9.00',
        warranty_option: 'official_warranty',
        warranty_period: 'year',
        warranty_limit: 1,
        warranty_coverage: 'xBox only',
        indent_period: 'day',
        indent_limit: 6,
        reference_link: '["http://google.com","http://facebook.com"]',
        sku_vendor: 'XXXXX',
        is_indent: 1,
        is_active: 0,
        created_by: 3,
        created_at: '2018-01-16T02:59:03.000Z',
        updated_at: '2018-01-18T09:50:39.000Z',
        ProductVariant: {
            id: 8,
            product_group_id: 2,
            sku: 'DC8JLF43ND',
            long_name: 'Apple iPhone 7 - Gold - 128GB',
            variant_value: '{"phone_color":2,"phone_storage":11}',
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 0,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-16T02:59:03.000Z',
            updated_at: '2018-01-16T02:59:03.000Z'
        },
        getValues() {
            return this;
        }
    });

    t.context.sandbox.stub(ProductVendorRepository, 'updateOne').resolves(true);
    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithDetailById').resolves(payloadPubUpdate);

    callback.onCall(1).resolves({
        id: 20,
        product_variant_id: 8,
        vendor_id: 3,
        warehouse_id: 11,
        location_label: 'Jakarta',
        stock_available: 10,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: 1,
        tier_min_qty_2: 2,
        tier_min_qty_3: 3,
        tier_cogs_price_1: '50.00',
        tier_cogs_price_2: '49.00',
        tier_cogs_price_3: '9.00',
        warranty_option: 'official_warranty',
        warranty_period: 'year',
        warranty_limit: 1,
        warranty_coverage: 'xBox only',
        indent_period: 'day',
        indent_limit: 6,
        reference_link: '["http://google.com","http://facebook.com"]',
        sku_vendor: 'XXXXX',
        is_indent: 1,
        is_active: 0,
        created_by: 3,
        created_at: '2018-01-16T02:59:03.000Z',
        updated_at: '2018-01-18T09:50:39.000Z',
        ProductVariant: {
            id: 8,
            product_group_id: 2,
            sku: 'DC8JLF43ND',
            long_name: 'Apple iPhone 7 - Gold - 128GB',
            variant_value: '{"phone_color":2,"phone_storage":11}',
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 0,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-16T02:59:03.000Z',
            updated_at: '2018-01-16T02:59:03.000Z'
        },
        getValues() {
            return this;
        }
    });

    t.context.sandbox.stub(ProductLogRepository, 'insertMany').resolves(true);
    t.context.sandbox.stub(BizzyService, 'callAsync').rejects();
    t.context.sandbox.stub(BizzyService, 'callSync').rejects();
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3',
                pid: '2'
            },
            body: {
                products: [
                    {
                        id: 20,
                        sku_vendor: 'XXXXX',
                        tier_min_qty_1: '1',
                        tier_min_qty_2: '2',
                        tier_min_qty_3: '3',
                        tier_cogs_price_1: '40',
                        tier_cogs_price_2: '19',
                        tier_cogs_price_3: '9',
                        stock_available: 0,
                        is_indent: 1,
                        indent_period: 'day',
                        indent_limit: 68,
                        is_decimal: 1,
                        down_payment_type: 1,
                        down_payment_value: 20,
                        warranty_option: 'official_warranty',
                        warranty_period: 'year',
                        warranty_limit: 11,
                        warranty_coverage: 'xBox only',
                        reference_link: []
                    }
                ]
            }
        };
        yield Method.putProduct(data, context);
        t.fail('Should return BadRequest');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest);
        t.pass();
    }
});

test.serial('Should update product return BadRequest when request to catalog-pubsub: publishUpdateProduct', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(ProductVendorRepository, 'findOneDetail').resolves(false);
    t.context.sandbox.stub(ProductVendorRepository, 'findByProductGroupId').resolves({
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
        variant_matrix: '["phone_color"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        ProductVariants: [
            {
                id: 8,
                product_group_id: 2,
                sku: 'DC8JLF43ND',
                long_name: 'Apple iPhone 7 - Gold - 128GB',
                variant_value: '{"phone_color":2}',
                primary_image: 'http://localhost/testing/testing_image.jpg',
                additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
                product_id_magento: null,
                product_id_netsuite: null,
                is_primary: 0,
                is_discontinue: 0,
                is_active: 1,
                ProductVendors: [
                    {
                        id: 20
                    }
                ]
            }
        ],
        Brand: {
            id: 81,
            name: 'Apple',
            image_url: null
        },
        Uom: {
            id: 1,
            name: 'Unit'
        },
        StockingUom: {
            id: 1,
            name: 'Box'
        },
        ProductGroupAttributes: [
            {
                id: 1,
                product_group_id: 2,
                attribute_code_id: 1,
                attribute_value_id: null,
                text_input: null,
                is_variant: 1,
                AttributeCode: {
                    id: 1,
                    code: 'phone_color',
                    label: 'Warna',
                    type: 'dropdown',
                    AttributeValues: [
                        {
                            id: 1,
                            attribute_code_id: 1,
                            value: 'Silver',
                            image_url: null
                        },
                        {
                            id: 2,
                            attribute_code_id: 1,
                            value: 'Black',
                            image_url: null
                        }
                    ]
                },
                AttributeValue: null
            },
            {
                id: 3,
                product_group_id: 2,
                attribute_code_id: 3,
                attribute_value_id: 5,
                text_input: null,
                is_variant: 0,
                AttributeCode: {
                    id: 3,
                    code: 'phone_os',
                    label: 'Sistem Operasi',
                    type: 'dropdown',
                    AttributeValues: [
                        {
                            id: 5,
                            attribute_code_id: 3,
                            value: 'iOS',
                            image_url: null
                        },
                        {
                            id: 6,
                            attribute_code_id: 3,
                            value: 'Android',
                            image_url: null
                        }
                    ]
                },
                AttributeValue: {
                    id: 5,
                    attribute_code_id: 3,
                    value: 'iOS',
                    image_url: null
                }
            }
        ]
    });

    const callback = t.context.sandbox.stub(ProductVendorRepository, 'findOne');
    callback.onCall(0).resolves({
        id: 20,
        product_variant_id: 8,
        vendor_id: 3,
        warehouse_id: 11,
        location_label: 'Jakarta',
        stock_available: 10,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: 1,
        tier_min_qty_2: 2,
        tier_min_qty_3: 3,
        tier_cogs_price_1: '50.00',
        tier_cogs_price_2: '49.00',
        tier_cogs_price_3: '9.00',
        warranty_option: 'official_warranty',
        warranty_period: 'year',
        warranty_limit: 1,
        warranty_coverage: 'xBox only',
        indent_period: 'day',
        indent_limit: 6,
        reference_link: '["http://google.com","http://facebook.com"]',
        sku_vendor: 'XXXXX',
        is_indent: 1,
        is_active: 0,
        created_by: 3,
        created_at: '2018-01-16T02:59:03.000Z',
        updated_at: '2018-01-18T09:50:39.000Z',
        ProductVariant: {
            id: 8,
            product_group_id: 2,
            sku: 'DC8JLF43ND',
            long_name: 'Apple iPhone 7 - Gold - 128GB',
            variant_value: '{"phone_color":2,"phone_storage":11}',
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 0,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-16T02:59:03.000Z',
            updated_at: '2018-01-16T02:59:03.000Z'
        },
        getValues() {
            return this;
        }
    });
    callback.onCall(1).resolves({
        id: 20,
        product_variant_id: 8,
        vendor_id: 3,
        warehouse_id: 11,
        location_label: 'Jakarta',
        stock_available: 10,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: 1,
        tier_min_qty_2: 2,
        tier_min_qty_3: 3,
        tier_cogs_price_1: '50.00',
        tier_cogs_price_2: '49.00',
        tier_cogs_price_3: '9.00',
        warranty_option: 'official_warranty',
        warranty_period: 'year',
        warranty_limit: 1,
        warranty_coverage: 'xBox only',
        indent_period: 'day',
        indent_limit: 6,
        reference_link: '["http://google.com","http://facebook.com"]',
        sku_vendor: 'XXXXX',
        is_indent: 1,
        is_active: 0,
        created_by: 3,
        created_at: '2018-01-16T02:59:03.000Z',
        updated_at: '2018-01-18T09:50:39.000Z',
        ProductVariant: {
            id: 8,
            product_group_id: 2,
            sku: 'DC8JLF43ND',
            long_name: 'Apple iPhone 7 - Gold - 128GB',
            variant_value: '{"phone_color":2,"phone_storage":11}',
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 0,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-16T02:59:03.000Z',
            updated_at: '2018-01-16T02:59:03.000Z'
        },
        getValues() {
            return this;
        }
    });

    t.context.sandbox.stub(ProductVendorRepository, 'updateOne').resolves(true);
    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithDetailById').resolves(payloadPubUpdate);
    t.context.sandbox.stub(ProductLogRepository, 'insertMany').resolves(true);

    const AsyncCallBack = t.context.sandbox.stub(BizzyService, 'callAsync');
    AsyncCallBack.onCall(0).rejects();
    t.context.sandbox.stub(BizzyService, 'callSync').resolves();
    AsyncCallBack.onCall(1).rejects();

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3',
                pid: '2'
            },
            body: {
                products: [
                    {
                        id: 20,
                        sku_vendor: 'XXXXX',
                        tier_min_qty_1: '1',
                        tier_min_qty_2: '2',
                        tier_min_qty_3: '3',
                        tier_cogs_price_1: '40',
                        tier_cogs_price_2: '19',
                        tier_cogs_price_3: '9',
                        stock_available: 0,
                        is_indent: 1,
                        is_decimal: 0,
                        down_payment_type: 0,
                        down_payment_value: 0,
                        indent_period: 'day',
                        indent_limit: 68,
                        warranty_option: 'official_warranty',
                        warranty_period: 'year',
                        warranty_limit: 11,
                        warranty_coverage: 'xBox only',
                        reference_link: []
                    }
                ]
            }
        };
        yield Method.putProduct(data, context);
        t.fail('Should return BadRequest');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest);
    }
});

test.serial('putProduct: scenario ProductVendorRepository.update() is rejected', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(ProductVendorRepository, 'findOneDetail').resolves(false);
    t.context.sandbox.stub(ProductVendorRepository, 'findByProductGroupId').resolves({
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
        variant_matrix: '["phone_color"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        ProductVariants: [
            {
                id: 8,
                product_group_id: 2,
                sku: 'DC8JLF43ND',
                long_name: 'Apple iPhone 7 - Gold - 128GB',
                variant_value: '{"phone_color":2}',
                primary_image: 'http://localhost/testing/testing_image.jpg',
                additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
                product_id_magento: null,
                product_id_netsuite: null,
                is_primary: 0,
                is_discontinue: 0,
                is_active: 1,
                ProductVendors: [
                    {
                        id: 20
                    }
                ]
            }
        ],
        Brand: {
            id: 81,
            name: 'Apple',
            image_url: null
        },
        Uom: {
            id: 1,
            name: 'Unit'
        },
        StockingUom: {
            id: 1,
            name: 'Box'
        },
        ProductGroupAttributes: [
            {
                id: 1,
                product_group_id: 2,
                attribute_code_id: 1,
                attribute_value_id: null,
                text_input: null,
                is_variant: 1,
                AttributeCode: {
                    id: 1,
                    code: 'phone_color',
                    label: 'Warna',
                    type: 'dropdown',
                    AttributeValues: [
                        {
                            id: 1,
                            attribute_code_id: 1,
                            value: 'Silver',
                            image_url: null
                        },
                        {
                            id: 2,
                            attribute_code_id: 1,
                            value: 'Black',
                            image_url: null
                        }
                    ]
                },
                AttributeValue: null
            },
            {
                id: 3,
                product_group_id: 2,
                attribute_code_id: 3,
                attribute_value_id: 5,
                text_input: null,
                is_variant: 0,
                AttributeCode: {
                    id: 3,
                    code: 'phone_os',
                    label: 'Sistem Operasi',
                    type: 'dropdown',
                    AttributeValues: [
                        {
                            id: 5,
                            attribute_code_id: 3,
                            value: 'iOS',
                            image_url: null
                        },
                        {
                            id: 6,
                            attribute_code_id: 3,
                            value: 'Android',
                            image_url: null
                        }
                    ]
                },
                AttributeValue: {
                    id: 5,
                    attribute_code_id: 3,
                    value: 'iOS',
                    image_url: null
                }
            }
        ]
    });

    const callback = t.context.sandbox.stub(ProductVendorRepository, 'findOne');
    callback.onCall(0).resolves({
        id: 20,
        product_variant_id: 8,
        vendor_id: 3,
        warehouse_id: 11,
        location_label: 'Jakarta',
        stock_available: 10,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: 1,
        tier_min_qty_2: 2,
        tier_min_qty_3: 3,
        tier_cogs_price_1: '50.00',
        tier_cogs_price_2: '49.00',
        tier_cogs_price_3: '9.00',
        warranty_option: 'official_warranty',
        warranty_period: 'year',
        warranty_limit: 1,
        warranty_coverage: 'xBox only',
        indent_period: 'day',
        indent_limit: 6,
        reference_link: '["http://google.com","http://facebook.com"]',
        sku_vendor: 'XXXXX',
        is_indent: 1,
        is_active: 0,
        created_by: 3,
        created_at: '2018-01-16T02:59:03.000Z',
        updated_at: '2018-01-18T09:50:39.000Z',
        ProductVariant: {
            id: 8,
            product_group_id: 2,
            sku: 'DC8JLF43ND',
            long_name: 'Apple iPhone 7 - Gold - 128GB',
            variant_value: '{"phone_color":2,"phone_storage":11}',
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 0,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-16T02:59:03.000Z',
            updated_at: '2018-01-16T02:59:03.000Z'
        },
        getValues() {
            return this;
        }
    });
    callback.onCall(1).resolves({
        id: 20,
        product_variant_id: 8,
        vendor_id: 3,
        warehouse_id: 11,
        location_label: 'Jakarta',
        stock_available: 10,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: 1,
        tier_min_qty_2: 2,
        tier_min_qty_3: 3,
        tier_cogs_price_1: '50.00',
        tier_cogs_price_2: '49.00',
        tier_cogs_price_3: '9.00',
        warranty_option: 'official_warranty',
        warranty_period: 'year',
        warranty_limit: 1,
        warranty_coverage: 'xBox only',
        indent_period: 'day',
        indent_limit: 6,
        reference_link: '["http://google.com","http://facebook.com"]',
        sku_vendor: 'XXXXX',
        is_indent: 1,
        is_active: 0,
        created_by: 3,
        created_at: '2018-01-16T02:59:03.000Z',
        updated_at: '2018-01-18T09:50:39.000Z',
        ProductVariant: {
            id: 8,
            product_group_id: 2,
            sku: 'DC8JLF43ND',
            long_name: 'Apple iPhone 7 - Gold - 128GB',
            variant_value: '{"phone_color":2,"phone_storage":11}',
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 0,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-16T02:59:03.000Z',
            updated_at: '2018-01-16T02:59:03.000Z'
        },
        getValues() {
            return this;
        }
    });
    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithDetailById').resolves(payloadPubUpdate);

    t.context.sandbox.stub(ProductLogRepository, 'insertMany').resolves(true);
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);
    t.context.sandbox.stub(BizzyService, 'callSync').resolves(true);

    t.context.sandbox.stub(ProductVendorRepository, 'update').rejects();

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3',
                pid: '2'
            },
            body: {
                products: [
                    {
                        id: 20,
                        sku_vendor: 'XXXXX',
                        tier_min_qty_1: '1',
                        tier_min_qty_2: '2',
                        tier_min_qty_3: '3',
                        tier_cogs_price_1: '40',
                        tier_cogs_price_2: '19',
                        tier_cogs_price_3: '9',
                        stock_available: 0,
                        is_indent: 1,
                        is_decimal: 1,
                        down_payment_type: 0,
                        down_payment_value: 0,
                        indent_period: 'day',
                        indent_limit: 68,
                        warranty_option: 'official_warranty',
                        warranty_period: 'year',
                        warranty_limit: 11,
                        warranty_coverage: 'xBox only',
                        reference_link: []
                    }
                ]
            }
        };
        yield Method.putProduct(data, context);
        t.fail('should be throw BadRequest when ProductVendorRepository.update()');
    } catch (err) {
        t.pass();
    }
});

test.serial('putProduct: scenario (logs.length > 0) is false', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(ProductVendorRepository, 'findOneDetail').resolves(false);
    t.context.sandbox.stub(ProductVendorRepository, 'findByProductGroupId').resolves({
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
        variant_matrix: '["phone_color"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        ProductVariants: [
            {
                id: 8,
                product_group_id: 2,
                sku: 'DC8JLF43ND',
                long_name: 'Apple iPhone 7 - Gold - 128GB',
                variant_value: '{"phone_color":2}',
                primary_image: 'http://localhost/testing/testing_image.jpg',
                additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
                product_id_magento: null,
                product_id_netsuite: null,
                is_primary: 0,
                is_discontinue: 0,
                is_active: 1,
                ProductVendors: [
                    {
                        id: 20
                    }
                ]
            }
        ],
        Brand: {
            id: 81,
            name: 'Apple',
            image_url: null
        },
        Uom: {
            id: 1,
            name: 'Unit'
        },
        StockingUom: {
            id: 1,
            name: 'Box'
        },
        ProductGroupAttributes: [
            {
                id: 1,
                product_group_id: 2,
                attribute_code_id: 1,
                attribute_value_id: null,
                text_input: null,
                is_variant: 1,
                AttributeCode: {
                    id: 1,
                    code: 'phone_color',
                    label: 'Warna',
                    type: 'dropdown',
                    AttributeValues: [
                        {
                            id: 1,
                            attribute_code_id: 1,
                            value: 'Silver',
                            image_url: null
                        },
                        {
                            id: 2,
                            attribute_code_id: 1,
                            value: 'Black',
                            image_url: null
                        }
                    ]
                },
                AttributeValue: null
            },
            {
                id: 3,
                product_group_id: 2,
                attribute_code_id: 3,
                attribute_value_id: 5,
                text_input: null,
                is_variant: 0,
                AttributeCode: {
                    id: 3,
                    code: 'phone_os',
                    label: 'Sistem Operasi',
                    type: 'dropdown',
                    AttributeValues: [
                        {
                            id: 5,
                            attribute_code_id: 3,
                            value: 'iOS',
                            image_url: null
                        },
                        {
                            id: 6,
                            attribute_code_id: 3,
                            value: 'Android',
                            image_url: null
                        }
                    ]
                },
                AttributeValue: {
                    id: 5,
                    attribute_code_id: 3,
                    value: 'iOS',
                    image_url: null
                }
            }
        ]
    });

    const callback = t.context.sandbox.stub(ProductVendorRepository, 'findOne');
    callback.onCall(0).resolves({
        id: 20,
        product_variant_id: 8,
        vendor_id: 3,
        warehouse_id: 11,
        location_label: 'Jakarta',
        stock_available: 10,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: 1,
        tier_min_qty_2: 2,
        tier_min_qty_3: 3,
        tier_cogs_price_1: '50.00',
        tier_cogs_price_2: '49.00',
        tier_cogs_price_3: '9.00',
        warranty_option: 'official_warranty',
        warranty_period: 'year',
        warranty_limit: 1,
        warranty_coverage: 'xBox only',
        indent_period: 'year',
        indent_limit: 6,
        reference_link: '["http://google.com","http://facebook.com"]',
        sku_vendor: 'XXXXX',
        is_indent: 1,
        is_active: 0,
        created_by: 3,
        created_at: '2018-01-16T02:59:03.000Z',
        updated_at: '2018-01-18T09:50:39.000Z',
        ProductVariant: {
            id: 8,
            product_group_id: 2,
            sku: 'DC8JLF43ND',
            long_name: 'Apple iPhone 7 - Gold - 128GB',
            variant_value: '{"phone_color":2,"phone_storage":11}',
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 0,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-16T02:59:03.000Z',
            updated_at: '2018-01-16T02:59:03.000Z'
        },
        getValues() {
            return {
                ProductVariant: {
                    sku: ''
                }
            };
        }
    });
    callback.onCall(1).resolves({
        id: 20,
        product_variant_id: 8,
        vendor_id: 3,
        warehouse_id: 11,
        location_label: 'Jakarta',
        stock_available: 10,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: 1,
        tier_min_qty_2: 2,
        tier_min_qty_3: 3,
        tier_cogs_price_1: '50.00',
        tier_cogs_price_2: '49.00',
        tier_cogs_price_3: '9.00',
        warranty_option: 'official_warranty',
        warranty_period: 'year',
        warranty_limit: 1,
        warranty_coverage: 'xBox only',
        indent_period: 'year',
        indent_limit: 6,
        reference_link: '["http://google.com","http://facebook.com"]',
        sku_vendor: 'XXXXX',
        is_indent: 1,
        is_active: 0,
        created_by: 3,
        created_at: '2018-01-16T02:59:03.000Z',
        updated_at: '2018-01-18T09:50:39.000Z',
        ProductVariant: {
            id: 8,
            product_group_id: 2,
            sku: 'DC8JLF43ND',
            long_name: 'Apple iPhone 7 - Gold - 128GB',
            variant_value: '{"phone_color":2,"phone_storage":11}',
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 0,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-16T02:59:03.000Z',
            updated_at: '2018-01-16T02:59:03.000Z'
        },
        getValues() {
            return {
                ProductVariant: {
                    sku: ''
                }
            };
        }
    });
    t.context.sandbox.stub(ProductVendorRepository, 'updateOne').resolves(true);
    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithDetailById').resolves(payloadPubUpdate);

    t.context.sandbox.stub(ProductLogRepository, 'insertMany').resolves(true);
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);
    t.context.sandbox.stub(BizzyService, 'callSync').resolves(true);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3',
                pid: '2'
            },
            body: {
                products: [
                    {
                        id: 20,
                        sku_vendor: 'XXXXX',
                        tier_min_qty_1: '1',
                        tier_min_qty_2: '2',
                        tier_min_qty_3: '3',
                        tier_cogs_price_1: '40',
                        tier_cogs_price_2: '19',
                        tier_cogs_price_3: '9',
                        stock_available: 10,
                        is_indent: 1,
                        indent_period: 'year',
                        indent_limit: 68,
                        warranty_option: 'official_warranty',
                        warranty_period: 'year',
                        warranty_limit: 11,
                        warranty_coverage: 'xBox only',
                        reference_link: []
                    }
                ]
            }
        };
        const result = yield Method.putProduct(data, context);
        const expected = {
            data: {
                id: 2,
                name: 'Apple iPhone 7'
            },
            message: 'Product berhasil diubah'
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('putProduct: scenarion "Cannot edit customer for auto live SKU"', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(ProductVendorRepository, 'findOneDetail').resolves(false);
    t.context.sandbox.stub(ProductVendorRepository, 'findByProductGroupId').resolves({
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
        variant_matrix: '["phone_color"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        ProductVariants: [
            {
                id: 8,
                product_group_id: 2,
                sku: 'DC8JLF43ND',
                long_name: 'Apple iPhone 7 - Gold - 128GB',
                variant_value: '{"phone_color":2}',
                primary_image: 'http://localhost/testing/testing_image.jpg',
                additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
                product_id_magento: null,
                product_id_netsuite: null,
                is_primary: 0,
                is_discontinue: 0,
                is_active: 1,
                ProductVendors: [
                    {
                        id: 20
                    }
                ]
            }
        ],
        Brand: {
            id: 81,
            name: 'Apple',
            image_url: null
        },
        Uom: {
            id: 1,
            name: 'Unit'
        },
        StockingUom: {
            id: 1,
            name: 'Box'
        },
        ProductGroupAttributes: [
            {
                id: 1,
                product_group_id: 2,
                attribute_code_id: 1,
                attribute_value_id: null,
                text_input: null,
                is_variant: 1,
                AttributeCode: {
                    id: 1,
                    code: 'phone_color',
                    label: 'Warna',
                    type: 'dropdown',
                    AttributeValues: [
                        {
                            id: 1,
                            attribute_code_id: 1,
                            value: 'Silver',
                            image_url: null
                        },
                        {
                            id: 2,
                            attribute_code_id: 1,
                            value: 'Black',
                            image_url: null
                        }
                    ]
                },
                AttributeValue: null
            },
            {
                id: 3,
                product_group_id: 2,
                attribute_code_id: 3,
                attribute_value_id: 5,
                text_input: null,
                is_variant: 0,
                AttributeCode: {
                    id: 3,
                    code: 'phone_os',
                    label: 'Sistem Operasi',
                    type: 'dropdown',
                    AttributeValues: [
                        {
                            id: 5,
                            attribute_code_id: 3,
                            value: 'iOS',
                            image_url: null
                        },
                        {
                            id: 6,
                            attribute_code_id: 3,
                            value: 'Android',
                            image_url: null
                        }
                    ]
                },
                AttributeValue: {
                    id: 5,
                    attribute_code_id: 3,
                    value: 'iOS',
                    image_url: null
                }
            }
        ]
    });

    const callback = t.context.sandbox.stub(ProductVendorRepository, 'findOne');
    callback.onCall(0).resolves({
        id: 20,
        product_variant_id: 8,
        vendor_id: 3,
        warehouse_id: 11,
        location_label: 'Jakarta',
        stock_available: 10,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: 1,
        tier_min_qty_2: 2,
        tier_min_qty_3: 3,
        tier_cogs_price_1: '50.00',
        tier_cogs_price_2: '49.00',
        tier_cogs_price_3: '9.00',
        warranty_option: 'official_warranty',
        warranty_period: 'year',
        warranty_limit: 1,
        warranty_coverage: 'xBox only',
        indent_period: 'year',
        indent_limit: 6,
        reference_link: '["http://google.com","http://facebook.com"]',
        sku_vendor: 'XXXXX',
        is_indent: 1,
        is_active: 0,
        created_by: 3,
        created_at: '2018-01-16T02:59:03.000Z',
        updated_at: '2018-01-18T09:50:39.000Z',
        ProductVariant: {
            id: 8,
            product_group_id: 2,
            sku: 'DC8JLF43ND',
            long_name: 'Apple iPhone 7 - Gold - 128GB',
            variant_value: '{"phone_color":2,"phone_storage":11}',
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 0,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-16T02:59:03.000Z',
            updated_at: '2018-01-16T02:59:03.000Z'
        },
        getValues() {
            return this;
        }
    });
    callback.onCall(1).resolves({
        id: 20,
        product_variant_id: 8,
        vendor_id: 3,
        warehouse_id: 11,
        location_label: 'Jakarta',
        stock_available: 10,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: 1,
        tier_min_qty_2: 2,
        tier_min_qty_3: 3,
        tier_cogs_price_1: '50.00',
        tier_cogs_price_2: '49.00',
        tier_cogs_price_3: '9.00',
        warranty_option: 'official_warranty',
        warranty_period: 'year',
        warranty_limit: 1,
        warranty_coverage: 'xBox only',
        indent_period: 'year',
        indent_limit: 6,
        reference_link: '["http://google.com","http://facebook.com"]',
        sku_vendor: 'XXXXX',
        is_indent: 1,
        is_active: 0,
        created_by: 3,
        created_at: '2018-01-16T02:59:03.000Z',
        updated_at: '2018-01-18T09:50:39.000Z',
        ProductVariant: {
            id: 8,
            product_group_id: 2,
            sku: 'DC8JLF43ND',
            long_name: 'Apple iPhone 7 - Gold - 128GB',
            variant_value: '{"phone_color":2,"phone_storage":11}',
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 0,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-16T02:59:03.000Z',
            updated_at: '2018-01-16T02:59:03.000Z'
        },
        getValues() {
            return this;
        }
    });
    t.context.sandbox.stub(ProductVendorRepository, 'update').resolves(true);
    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithDetailById').resolves(payloadPubUpdate);

    t.context.sandbox.stub(ProductLogRepository, 'insertMany').resolves(true);
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);
    t.context.sandbox.stub(BizzyService, 'callSync').resolves(true);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3',
                pid: '2'
            },
            body: {
                products: [
                    {
                        id: 20,
                        sku_vendor: 'XXXXX',
                        tier_min_qty_1: '1',
                        tier_min_qty_2: '2',
                        tier_min_qty_3: '3',
                        tier_cogs_price_1: '40',
                        tier_cogs_price_2: '19',
                        tier_cogs_price_3: '9',
                        stock_available: 0,
                        is_indent: 1,
                        is_bulk: 1,
                        private_customers: [{id: 1}, {id: 2}],
                        indent_period: 'week',
                        indent_limit: 53,
                        is_decimal: 0,
                        down_payment_type: 0,
                        down_payment_value: 0,
                        warranty_option: 'official_warranty',
                        warranty_period: 'year',
                        warranty_limit: 11,
                        warranty_coverage: 'xBox only',
                        reference_link: []
                    }
                ]
            }
        };
        const result = yield Method.putProduct(data, context);
        const expected = {
            data: {
                id: 2,
                name: 'Apple iPhone 7'
            },
            message: 'Product berhasil diubah'
        };
        t.fail('should be throw BadRequest "Cannot edit customer for auto live SKU"');
    } catch (err) {
        t.is(err.message, 'Cannot edit customer for auto live SKU');
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
