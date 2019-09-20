/* eslint-disable linebreak-style */
'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError, BizzyService } = require('bizzy-common');
const Method = require('../../../../src/methods/products/detail');
const context = require('../../../mocks/context.json');

const ProductVariantRepository = require('../../../../src/repositories/product_variant');
const ProductVendorRepository = require('../../../../src/repositories/product_vendor');
const GeneralRepository = require('../../../../src/repositories/general');
const CategoryRepository = require('../../../../src/repositories/category');
const ProductLogRepository = require('../../../../src/repositories/product_log');
const OrganizationSubRepo = require('../../../../src/repositories/organization_sub_repo');

test.serial('Should be return the object of Product Detail v1', function* (t) {
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
        is_bulk: 1,
        visibility: 1,
        created_by: 2,
        ProductVariants: [{
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
        }],
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

    t.context.sandbox.stub(CategoryRepository, 'getCategoryBreakdown').resolves([
        {
            category0_id: 8,
            category0_name: 'IT and Mobile Devices',
            category0_unspsc: 43000000,
            category1_id: 52,
            category1_name: 'Communications Devices & Accessories',
            category1_unspsc: 43190000,
            category2_id: 219,
            category2_name: 'Personal communication devices',
            category2_unspsc: 43191500,
            category3_id: 561,
            category3_name: 'Mobile phones',
            category3_unspsc: 43191501
        }
    ]);

    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithDetail').resolves({
        count: 4,
        rows: [{
            id: 22,
            product_variant_id: 10,
            vendor_id: 3,
            warehouse_id: 11,
            location_label: 'Jakarta',
            stock_available: 1,
            stock_used: 0,
            currency: 'IDR',
            tier_min_qty_1: 111,
            tier_min_qty_2: 222,
            tier_min_qty_3: 333,
            tier_cogs_price_1: '444.00',
            tier_cogs_price_2: '555.00',
            tier_cogs_price_3: '666.00',
            warranty_option: 'official_warranty',
            warranty_period: 'month',
            warranty_limit: 1,
            warranty_coverage: 'Box',
            reference_link: null,
            sku_vendor: '111111111',
            is_indent: 1,
            indent_period: 'week',
            indent_limit: 2,
            is_decimal: undefined,
            down_payment_type: undefined,
            down_payment_value: undefined,
            is_active: 1,
            created_by: 3,
            created_at: '2018-01-16T02:59:03.000Z',
            ProductVariant: {
                id: 8,
                long_name: 'Apple iPhone 7 - Gold - 128GB',
                sku: 'DC8JLF43ND',
                product_group_id: 2,
                variant_value: '{"phone_color":2}',
                primary_image: 'http://localhost/testing/testing_image.jpg',
                ProductGroup: {
                    id: 2,
                    name: 'Apple iPhone 7',
                    category_id: 561,
                    brand_id: 81,
                    Brand: { id: 81, name: 'Apple' },
                    Category: {
                        id: 561,
                        name: 'Mobile phones',
                        level: 'C3',
                        parent_id: 219,
                        Category: {
                            id: 219,
                            name: 'Personal communication devices',
                            level: 'C2',
                            parent_id: 52,
                            Category: {
                                id: 52,
                                name: 'Communications Devices & Accessories',
                                level: 'C1',
                                parent_id: 8,
                                Category: {
                                    id: 8,
                                    name: 'IT and Mobile Devices',
                                    level: 'C0'
                                }
                            }
                        }
                    }
                }
            }
        }]
    });

    t.context.sandbox.stub(GeneralRepository, 'findAttributeByVariantValue').resolves([
        {
            attribute_code: 'phone_color',
            attribute_code_label: 'Warna',
            attribute_value_id: 2,
            attribute_value_name: 'Black'
        }
    ]);

    t.context.sandbox.stub(ProductVariantRepository, 'findAllProduct').resolves([
        {
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
            is_active: 0,
            created_at: '2018-01-16T02:59:03.000Z',
            updated_at: '2018-01-16T02:59:03.000Z'
        },
        {
            id: 9,
            product_group_id: 2,
            sku: 'NR3Z5H99QT',
            long_name: 'Apple iPhone 7 - Gold - 64GB',
            variant_value: '{"phone_color":2,"phone_storage":4}',
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 0,
            is_discontinue: 0,
            is_active: 0,
            created_at: '2018-01-16T03:02:17.000Z',
            updated_at: '2018-01-16T03:02:17.000Z'
        },
        {
            id: 10,
            product_group_id: 2,
            sku: 'DJL3A4G3LR',
            long_name: 'Apple iPhone 7 - Green - 64GB',
            variant_value: '{"phone_color":2,"phone_storage":4}',
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 0,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-16T03:02:17.000Z',
            updated_at: '2018-01-16T03:02:17.000Z'
        }
    ]);

    t.context.sandbox.stub(ProductLogRepository, 'count').resolves(1);
    t.context.sandbox.stub(BizzyService, 'callSync').resolves({ data: [] });

    try {
        const context = require('../../../mocks/context.json');

        const data = {
            path: {
                id: 3,
                pid: 2
            }
        };

        const result = yield Method.getProductById(data, context);
        const expected = {
            data: {
                id: 2,
                name: 'Apple iPhone 7',
                uom: {
                    id: 1,
                    name: 'Unit'
                },
                barcode: '5012345678900',
                manufacturing_number: 'MPN7PK1781',
                primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
                stocking_uom: {
                    id: 1,
                    name: 'Box'
                },
                quantity_stocking_uom: 1,
                variant_count: 2,
                variant_matrix: [
                    'phone_color'
                ],
                brand: {
                    id: 81,
                    name: 'Apple'
                },
                categories: {
                    C0: {
                        id: 8,
                        name: 'IT and Mobile Devices',
                        unspsc: 43000000
                    },
                    C1: {
                        id: 52,
                        name: 'Communications Devices & Accessories',
                        unspsc: 43190000
                    },
                    C2: {
                        id: 219,
                        name: 'Personal communication devices',
                        unspsc: 43191500
                    },
                    C3: {
                        id: 561,
                        name: 'Mobile phones',
                        unspsc: 43191501
                    }
                },
                dimensions: {
                    package_weight: 800,
                    package_length: '100.00',
                    package_width: '200.00',
                    package_height: '300.00'
                },
                package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
                specifications: [
                    {
                        attribute_code: 'phone_os',
                        attribute_code_label: 'Sistem Operasi',
                        attribute_type: 'dropdown',
                        attribute_value_id: 5,
                        attribute_value_name: 'iOS'
                    }
                ],
                description: 'Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.\n\nDi iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.'
            },
            variant_images: {
                'phone_color=2|phone_storage=11': {
                    primary_image: 'http://localhost/testing/testing_image.jpg',
                    additional_image: [
                        'http://localhost/testing/testing_image.jpg',
                        'http://localhost/testing/testing_image.jpg'
                    ]
                },
                'phone_color=2|phone_storage=4': {
                    primary_image: 'http://localhost/testing/testing_image.jpg',
                    additional_image: [
                        'http://localhost/testing/testing_image.jpg',
                        'http://localhost/testing/testing_image.jpg'
                    ]
                }
            },
            product: [
                {
                    id: 22,
                    product_variant_id: 8,
                    long_name: 'Apple iPhone 7 - Gold - 128GB',
                    variants: [
                        {
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_id: 2,
                            attribute_value_name: 'Black'
                        }
                    ],
                    variant_value: {
                        phone_color: 2
                    },
                    primary_image: 'http://localhost/testing/testing_image.jpg',
                    currency: 'IDR',
                    tier_min_qty_1: 111,
                    tier_min_qty_2: 222,
                    tier_min_qty_3: 333,
                    tier_cogs_price_1: '444.00',
                    tier_cogs_price_2: '555.00',
                    tier_cogs_price_3: '666.00',
                    is_active: 1,
                    sku: 'DC8JLF43ND',
                    sku_vendor: '111111111',
                    stock_available: 1,
                    warranty_option: 'official_warranty',
                    warranty_period: 'month',
                    warranty_limit: 1,
                    warranty_coverage: 'Box',
                    reference_link: [],
                    is_indent: 1,
                    is_decimal: undefined,
                    down_payment_type: undefined,
                    down_payment_value: undefined,
                    indent_limit: 2,
                    indent_period: 'week',
                    created_at: '2018-01-16T02:59:03.000Z',
                    total_history: 1,
                    is_bulk: 0,
                    is_private_sku: false,
                    private_customers: []
                }
            ]
        };
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('Should be return the object of Product Detail v2', function* (t) {
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
        is_bulk: 1,
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
                text_input: 'Purple',
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
                text_input: 'Windows Phone',
                is_variant: 0,
                AttributeCode: {
                    id: 3,
                    code: 'phone_os',
                    label: 'Sistem Operasi',
                    type: 'textinput',
                    AttributeValues: null
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

    t.context.sandbox.stub(CategoryRepository, 'getCategoryBreakdown').resolves([
        {
            category0_id: 8,
            category0_name: 'IT and Mobile Devices',
            category0_unspsc: 43000000,
            category1_id: 52,
            category1_name: 'Communications Devices & Accessories',
            category1_unspsc: 43190000,
            category2_id: 219,
            category2_name: 'Personal communication devices',
            category2_unspsc: 43191500,
            category3_id: 561,
            category3_name: 'Mobile phones',
            category3_unspsc: 43191501
        }
    ]);

    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithDetail').resolves({
        count: 4,
        rows: [{
            id: 22,
            product_variant_id: 10,
            vendor_id: 3,
            warehouse_id: 11,
            location_label: 'Jakarta',
            stock_available: 1,
            stock_used: 0,
            currency: 'IDR',
            tier_min_qty_1: 111,
            tier_min_qty_2: 222,
            tier_min_qty_3: 333,
            tier_cogs_price_1: '444.00',
            tier_cogs_price_2: '555.00',
            tier_cogs_price_3: '666.00',
            warranty_option: 'official_warranty',
            warranty_period: 'month',
            warranty_limit: 1,
            warranty_coverage: 'Box',
            indent_period: 'week',
            indent_limit: 2,
            reference_link: '["http://google.com","http://facebook.com"]',
            sku_vendor: '111111111',
            is_indent: 1,
            is_active: 1,
            created_by: 3,
            created_at: '2018-01-16T02:59:03.000Z',
            ProductVariant: {
                id: 8,
                long_name: 'Apple iPhone 7 - Gold - 128GB',
                sku: 'DC8JLF43ND',
                product_group_id: 2,
                variant_value: '{"phone_color":2}',
                primary_image: 'http://localhost/testing/testing_image.jpg',
                ProductGroup: {
                    id: 2,
                    name: 'Apple iPhone 7',
                    category_id: 561,
                    brand_id: 81,
                    Brand: { id: 81, name: 'Apple' },
                    Category: {
                        id: 561,
                        name: 'Mobile phones',
                        level: 'C3',
                        parent_id: 219,
                        Category: {
                            id: 219,
                            name: 'Personal communication devices',
                            level: 'C2',
                            parent_id: 52,
                            Category: {
                                id: 52,
                                name: 'Communications Devices & Accessories',
                                level: 'C1',
                                parent_id: 8,
                                Category: {
                                    id: 8,
                                    name: 'IT and Mobile Devices',
                                    level: 'C0'
                                }
                            }
                        }
                    }
                }
            }
        }]
    });

    t.context.sandbox.stub(GeneralRepository, 'findAttributeByVariantValue').resolves([
        {
            attribute_code: 'phone_color',
            attribute_code_label: 'Warna',
            attribute_value_id: 2,
            attribute_value_name: 'Black'
        }
    ]);

    t.context.sandbox.stub(ProductVariantRepository, 'findAllProduct').resolves([
        {
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
            is_active: 0,
            created_at: '2018-01-16T02:59:03.000Z',
            updated_at: '2018-01-16T02:59:03.000Z'
        },
        {
            id: 9,
            product_group_id: 2,
            sku: 'NR3Z5H99QT',
            long_name: 'Apple iPhone 7 - Gold - 64GB',
            variant_value: '{"phone_color":2,"phone_storage":4}',
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 0,
            is_discontinue: 0,
            is_active: 0,
            created_at: '2018-01-16T03:02:17.000Z',
            updated_at: '2018-01-16T03:02:17.000Z'
        },
        {
            id: 10,
            product_group_id: 2,
            sku: 'DJL3A4G3LR',
            long_name: 'Apple iPhone 7 - Green - 64GB',
            variant_value: '{"phone_color":2,"phone_storage":4}',
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 0,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-16T03:02:17.000Z',
            updated_at: '2018-01-16T03:02:17.000Z'
        }
    ]);

    t.context.sandbox.stub(ProductLogRepository, 'count').resolves(1);
    t.context.sandbox.stub(BizzyService, 'callSync').resolves({ data: [] });

    try {
        const context = require('../../../mocks/context.json');

        const data = {
            path: {
                id: 3,
                pid: 2
            }
        };

        const result = yield Method.getProductById(data, context);
        const expected = {
            data: {
                id: 2,
                name: 'Apple iPhone 7',
                uom: {
                    id: 1,
                    name: 'Unit'
                },
                barcode: '5012345678900',
                manufacturing_number: 'MPN7PK1781',
                primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
                stocking_uom: {
                    id: 1,
                    name: 'Box'
                },
                quantity_stocking_uom: 1,
                variant_count: 2,
                variant_matrix: [
                    'phone_color'
                ],
                brand: {
                    id: 81,
                    name: 'Apple'
                },
                categories: {
                    C0: {
                        id: 8,
                        name: 'IT and Mobile Devices',
                        unspsc: 43000000
                    },
                    C1: {
                        id: 52,
                        name: 'Communications Devices & Accessories',
                        unspsc: 43190000
                    },
                    C2: {
                        id: 219,
                        name: 'Personal communication devices',
                        unspsc: 43191500
                    },
                    C3: {
                        id: 561,
                        name: 'Mobile phones',
                        unspsc: 43191501
                    }
                },
                dimensions: {
                    package_weight: 800,
                    package_length: '100.00',
                    package_width: '200.00',
                    package_height: '300.00'
                },
                package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
                specifications: [
                    {
                        attribute_code: 'phone_os',
                        attribute_code_label: 'Sistem Operasi',
                        attribute_type: 'textinput',
                        attribute_value: 'Windows Phone'
                    }
                ],
                description: 'Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.\n\nDi iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.'
            },
            variant_images: {
                'phone_color=2|phone_storage=11': {
                    primary_image: 'http://localhost/testing/testing_image.jpg',
                    additional_image: [
                        'http://localhost/testing/testing_image.jpg',
                        'http://localhost/testing/testing_image.jpg'
                    ]
                },
                'phone_color=2|phone_storage=4': {
                    primary_image: 'http://localhost/testing/testing_image.jpg',
                    additional_image: [
                        'http://localhost/testing/testing_image.jpg',
                        'http://localhost/testing/testing_image.jpg'
                    ]
                }
            },
            product: [
                {
                    id: 22,
                    product_variant_id: 8,
                    long_name: 'Apple iPhone 7 - Gold - 128GB',
                    variants: [
                        {
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_id: 2,
                            attribute_value_name: 'Black'
                        }
                    ],
                    variant_value: {
                        phone_color: 2
                    },
                    primary_image: 'http://localhost/testing/testing_image.jpg',
                    currency: 'IDR',
                    tier_min_qty_1: 111,
                    tier_min_qty_2: 222,
                    tier_min_qty_3: 333,
                    tier_cogs_price_1: '444.00',
                    tier_cogs_price_2: '555.00',
                    tier_cogs_price_3: '666.00',
                    is_active: 1,
                    is_decimal: undefined,
                    down_payment_type: undefined,
                    down_payment_value: undefined,
                    sku: 'DC8JLF43ND',
                    sku_vendor: '111111111',
                    stock_available: 1,
                    warranty_option: 'official_warranty',
                    warranty_period: 'month',
                    warranty_limit: 1,
                    warranty_coverage: 'Box',
                    reference_link: [
                        'http://google.com',
                        'http://facebook.com'
                    ],
                    is_indent: 1,
                    indent_limit: 2,
                    indent_period: 'week',
                    created_at: '2018-01-16T02:59:03.000Z',
                    total_history: 1,
                    is_bulk: 0,
                    is_private_sku: false,
                    private_customers: []
                }
            ]
        };
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('Should be return the object of Product Detail NO VARIANT', function* (t) {
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
        variant_matrix: null,
        status: 1,
        is_bulk: 1,
        visibility: 1,
        created_by: 2,
        ProductVariants: [
            {
                id: 8,
                product_group_id: 2,
                sku: 'DC8JLF43ND',
                long_name: 'Apple iPhone 7 - Gold - 128GB',
                variant_value: 'NO_VARIANT',
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
        Brand:
            {
                id: 81,
                name: 'Apple',
                image_url: null
            },
        Uom:
            {
                id: 1,
                name: 'Unit'
            },
        StockingUom:
            {
                id: 1,
                name: 'Box'
            },
        ProductGroupAttributes: [
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

    t.context.sandbox.stub(CategoryRepository, 'getCategoryBreakdown').resolves([
        {
            category0_id: 8,
            category0_name: 'IT and Mobile Devices',
            category0_unspsc: 43000000,
            category1_id: 52,
            category1_name: 'Communications Devices & Accessories',
            category1_unspsc: 43190000,
            category2_id: 219,
            category2_name: 'Personal communication devices',
            category2_unspsc: 43191500,
            category3_id: 561,
            category3_name: 'Mobile phones',
            category3_unspsc: 43191501
        }
    ]);

    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithDetail').resolves({
        count: 1,
        rows: [{
            id: 22,
            product_variant_id: 10,
            vendor_id: 3,
            warehouse_id: 11,
            location_label: 'Jakarta',
            stock_available: 1,
            stock_used: 0,
            currency: 'IDR',
            tier_min_qty_1: 111,
            tier_min_qty_2: 222,
            tier_min_qty_3: 333,
            tier_cogs_price_1: '444.00',
            tier_cogs_price_2: '555.00',
            tier_cogs_price_3: '666.00',
            warranty_option: 'official_warranty',
            warranty_period: 'month',
            warranty_limit: 1,
            warranty_coverage: 'Box',
            indent_period: 'week',
            indent_limit: 2,
            reference_link: '["http://google.com","http://facebook.com"]',
            sku_vendor: '111111111',
            is_indent: 1,
            is_active: 1,
            created_by: 3,
            created_at: '2018-01-16T02:59:03.000Z',
            ProductVariant: {
                id: 8,
                long_name: 'Apple iPhone 7 - Gold - 128GB',
                sku: 'DC8JLF43ND',
                product_group_id: 2,
                variant_value: 'NO_VARIANT',
                primary_image: 'http://localhost/testing/testing_image.jpg',
                ProductGroup: {
                    id: 2,
                    name: 'Apple iPhone 7',
                    category_id: 561,
                    brand_id: 81,
                    Brand: { id: 81, name: 'Apple' },
                    Category: {
                        id: 561,
                        name: 'Mobile phones',
                        level: 'C3',
                        parent_id: 219,
                        Category: {
                            id: 219,
                            name: 'Personal communication devices',
                            level: 'C2',
                            parent_id: 52,
                            Category: {
                                id: 52,
                                name: 'Communications Devices & Accessories',
                                level: 'C1',
                                parent_id: 8,
                                Category: {
                                    id: 8,
                                    name: 'IT and Mobile Devices',
                                    level: 'C0'
                                }
                            }
                        }
                    }
                }
            }
        }]
    });

    t.context.sandbox.stub(ProductVariantRepository, 'findAllProduct').resolves([
        {
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
            is_active: 0,
            created_at: '2018-01-16T02:59:03.000Z',
            updated_at: '2018-01-16T02:59:03.000Z'
        },
        {
            id: 9,
            product_group_id: 2,
            sku: 'NR3Z5H99QT',
            long_name: 'Apple iPhone 7 - Gold - 64GB',
            variant_value: '{"phone_color":2,"phone_storage":4}',
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 0,
            is_discontinue: 0,
            is_active: 0,
            created_at: '2018-01-16T03:02:17.000Z',
            updated_at: '2018-01-16T03:02:17.000Z'
        },
        {
            id: 10,
            product_group_id: 2,
            sku: 'DJL3A4G3LR',
            long_name: 'Apple iPhone 7 - Green - 64GB',
            variant_value: '{"phone_color":2,"phone_storage":4}',
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 0,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-16T03:02:17.000Z',
            updated_at: '2018-01-16T03:02:17.000Z'
        }
    ]);

    t.context.sandbox.stub(ProductLogRepository, 'count').resolves(1);
    t.context.sandbox.stub(BizzyService, 'callSync').resolves({ data: [] });

    try {
        const context = require('../../../mocks/context.json');

        const data = {
            path: {
                id: 3,
                pid: 2
            }
        };

        const result = yield Method.getProductById(data, context);
        const expected = {
            data: {
                id: 2,
                name: 'Apple iPhone 7',
                uom: {
                    id: 1,
                    name: 'Unit'
                },
                barcode: '5012345678900',
                manufacturing_number: 'MPN7PK1781',
                primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
                stocking_uom: {
                    id: 1,
                    name: 'Box'
                },
                quantity_stocking_uom: 1,
                variant_count: 2,
                variant_matrix: [],
                brand: {
                    id: 81,
                    name: 'Apple'
                },
                categories: {
                    C0: {
                        id: 8,
                        name: 'IT and Mobile Devices',
                        unspsc: 43000000
                    },
                    C1: {
                        id: 52,
                        name: 'Communications Devices & Accessories',
                        unspsc: 43190000
                    },
                    C2: {
                        id: 219,
                        name: 'Personal communication devices',
                        unspsc: 43191500
                    },
                    C3: {
                        id: 561,
                        name: 'Mobile phones',
                        unspsc: 43191501
                    }
                },
                dimensions: {
                    package_weight: 800,
                    package_length: '100.00',
                    package_width: '200.00',
                    package_height: '300.00'
                },
                package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
                specifications: [
                    {
                        attribute_code: 'phone_os',
                        attribute_code_label: 'Sistem Operasi',
                        attribute_type: 'dropdown',
                        attribute_value_id: 5,
                        attribute_value_name: 'iOS'
                    }
                ],
                description: 'Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.\n\nDi iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.'
            },
            variant_images: {
                'phone_color=2|phone_storage=11': {
                    primary_image: 'http://localhost/testing/testing_image.jpg',
                    additional_image: [
                        'http://localhost/testing/testing_image.jpg',
                        'http://localhost/testing/testing_image.jpg'
                    ]
                },
                'phone_color=2|phone_storage=4': {
                    primary_image: 'http://localhost/testing/testing_image.jpg',
                    additional_image: [
                        'http://localhost/testing/testing_image.jpg',
                        'http://localhost/testing/testing_image.jpg'
                    ]
                }
            },
            product: [
                {
                    id: 22,
                    product_variant_id: 8,
                    long_name: 'Apple iPhone 7 - Gold - 128GB',
                    variants: [],
                    variant_value: 'NO_VARIANT',
                    primary_image: 'http://localhost/testing/testing_image.jpg',
                    currency: 'IDR',
                    tier_min_qty_1: 111,
                    tier_min_qty_2: 222,
                    tier_min_qty_3: 333,
                    tier_cogs_price_1: '444.00',
                    tier_cogs_price_2: '555.00',
                    tier_cogs_price_3: '666.00',
                    is_active: 1,
                    is_decimal: undefined,
                    down_payment_type: undefined,
                    down_payment_value: undefined,
                    sku: 'DC8JLF43ND',
                    sku_vendor: '111111111',
                    stock_available: 1,
                    warranty_option: 'official_warranty',
                    warranty_period: 'month',
                    warranty_limit: 1,
                    warranty_coverage: 'Box',
                    reference_link: [
                        'http://google.com',
                        'http://facebook.com'
                    ],
                    is_indent: 1,
                    indent_limit: 2,
                    indent_period: 'week',
                    created_at: '2018-01-16T02:59:03.000Z',
                    total_history: 1,
                    is_bulk: 0,
                    is_private_sku: false,
                    private_customers: []
                }
            ]
        };
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('Should return Bad Request not Categories', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findByProductGroupId').resolves(true);

    try {
        const context = require('../../../mocks/context.json');

        const data = {
            path: {
                id: 3,
                pid: 2
            }
        };
        yield Method.getProductById(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Should return product not found', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findByProductGroupId').resolves(false);
    try {
        const context = require('../../../mocks/context.json');

        const data = {
            path: {
                id: 3,
                pid: 2
            }
        };
        yield Method.getProductById(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, err.message);
    }
});

test.serial('Should catch the invalid params', function* (t) {
    try {
        const context = require('../../../mocks/context.json');

        const data = {
            path: {
                id: 3,
                pid: 'aa'
            }
        };
        yield Method.getProductById(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Should be return authorized user', function* (t) {
    try {
        const context = {
            user: ''
        };
        const data = {
            query: {
                search: '',
                page: 1,
                limit: 20
            }
        };
        yield Method.getProductById(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, 'You are not authorized user');
    }
});

const productStub = {
    count: 4,
    rows: [{
        id: 22,
        product_variant_id: 10,
        vendor_id: 3,
        warehouse_id: 11,
        location_label: 'Jakarta',
        stock_available: 1,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: 111,
        tier_min_qty_2: 222,
        tier_min_qty_3: 333,
        tier_cogs_price_1: '444.00',
        tier_cogs_price_2: '555.00',
        tier_cogs_price_3: '666.00',
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
        customer_id: null,
        created_by: 3,
        created_at: '2018-01-16T02:59:03.000Z',
        is_private_sku: true,
        ProductVariant: {
            id: 8,
            long_name: 'Apple iPhone 7 - Gold - 128GB',
            sku: 'DC8JLF43ND',
            product_group_id: 2,
            variant_value: '{"phone_color":2}',
            primary_image: 'http://localhost/testing/testing_image.jpg',
            ProductGroup: {
                id: 2,
                name: 'Apple iPhone 7',
                category_id: 561,
                brand_id: 81,
                Brand: { id: 81, name: 'Apple' },
                Category: {
                    id: 561,
                    name: 'Mobile phones',
                    level: 'C3',
                    parent_id: 219,
                    Category: {
                        id: 219,
                        name: 'Personal communication devices',
                        level: 'C2',
                        parent_id: 52,
                        Category: {
                            id: 52,
                            name: 'Communications Devices & Accessories',
                            level: 'C1',
                            parent_id: 8,
                            Category: {
                                id: 8,
                                name: 'IT and Mobile Devices',
                                level: 'C0'
                            }
                        }
                    }
                }
            }
        }
    }]
};

const privateSkuStub = {
    id: 337,
    customers: '[351,445,493]',
    created_at: '2018-10-23T04:07:54.000Z',
    updated_at: '2018-10-24T11:31:29.000Z'
};

const organizationListStub = [{}];

const resultStub = {
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
    is_bulk: 1,
    visibility: 1,
    created_by: 2,
    ProductVariants: [{
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
    }],
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
};

const CategoriesStub = [
    {
        category0_id: 8,
        category0_name: 'IT and Mobile Devices',
        category0_unspsc: 43000000,
        category1_id: 52,
        category1_name: 'Communications Devices & Accessories',
        category1_unspsc: 43190000,
        category2_id: 219,
        category2_name: 'Personal communication devices',
        category2_unspsc: 43191500,
        category3_id: 561,
        category3_name: 'Mobile phones',
        category3_unspsc: 43191501
    }
];

const variantsStub = [
    {
        attribute_code: 'phone_color',
        attribute_code_label: 'Warna',
        attribute_value_id: 2,
        attribute_value_name: 'Black'
    }
];

const variantImagesStub = [
    {
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
        is_active: 0,
        created_at: '2018-01-16T02:59:03.000Z',
        updated_at: '2018-01-16T02:59:03.000Z'
    },
    {
        id: 9,
        product_group_id: 2,
        sku: 'NR3Z5H99QT',
        long_name: 'Apple iPhone 7 - Gold - 64GB',
        variant_value: '{"phone_color":2,"phone_storage":4}',
        primary_image: 'http://localhost/testing/testing_image.jpg',
        additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
        product_id_magento: null,
        product_id_netsuite: null,
        is_primary: 0,
        is_discontinue: 0,
        is_active: 0,
        created_at: '2018-01-16T03:02:17.000Z',
        updated_at: '2018-01-16T03:02:17.000Z'
    },
    {
        id: 10,
        product_group_id: 2,
        sku: 'DJL3A4G3LR',
        long_name: 'Apple iPhone 7 - Green - 64GB',
        variant_value: '{"phone_color":2,"phone_storage":4}',
        primary_image: 'http://localhost/testing/testing_image.jpg',
        additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
        product_id_magento: null,
        product_id_netsuite: null,
        is_primary: 0,
        is_discontinue: 0,
        is_active: 1,
        created_at: '2018-01-16T03:02:17.000Z',
        updated_at: '2018-01-16T03:02:17.000Z'
    }
];

test.serial('getProductById: Successfully with (element.is_private_sku === 1) is true', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findByProductGroupId').resolves(resultStub);
    t.context.sandbox.stub(CategoryRepository, 'getCategoryBreakdown').resolves(CategoriesStub);
    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithDetail').resolves(productStub);
    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorPrivateSku').resolves(privateSkuStub);
    t.context.sandbox.stub(GeneralRepository, 'findAttributeByVariantValue').resolves(variantsStub);
    t.context.sandbox.stub(ProductVariantRepository, 'findAllProduct').resolves(variantImagesStub);
    t.context.sandbox.stub(ProductLogRepository, 'count').resolves(1);
    t.context.sandbox.stub(OrganizationSubRepo, 'getOrganizationSubs').resolves(organizationListStub);
    t.context.sandbox.stub(BizzyService, 'callSync').resolves({ data: [] });

    try {
        const data = {
            path: {
                id: 3,
                pid: 2
            }
        };

        const result = yield Method.getProductById(data, context);
        const expected = {
            data: {
                id: 2,
                name: 'Apple iPhone 7',
                uom: {
                    id: 1,
                    name: 'Unit'
                },
                barcode: '5012345678900',
                manufacturing_number: 'MPN7PK1781',
                primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
                stocking_uom: {
                    id: 1,
                    name: 'Box'
                },
                quantity_stocking_uom: 1,
                variant_count: 2,
                variant_matrix: [
                    'phone_color'
                ],
                brand: {
                    id: 81,
                    name: 'Apple'
                },
                categories: {
                    C0: {
                        id: 8,
                        name: 'IT and Mobile Devices',
                        unspsc: 43000000
                    },
                    C1: {
                        id: 52,
                        name: 'Communications Devices & Accessories',
                        unspsc: 43190000
                    },
                    C2: {
                        id: 219,
                        name: 'Personal communication devices',
                        unspsc: 43191500
                    },
                    C3: {
                        id: 561,
                        name: 'Mobile phones',
                        unspsc: 43191501
                    }
                },
                dimensions: {
                    package_weight: 800,
                    package_length: '100.00',
                    package_width: '200.00',
                    package_height: '300.00'
                },
                package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
                specifications: [
                    {
                        attribute_code: 'phone_os',
                        attribute_code_label: 'Sistem Operasi',
                        attribute_type: 'dropdown',
                        attribute_value_id: 5,
                        attribute_value_name: 'iOS'
                    }
                ],
                description: 'Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.\n\nDi iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.'
            },
            variant_images: {
                'phone_color=2|phone_storage=11': {
                    primary_image: 'http://localhost/testing/testing_image.jpg',
                    additional_image: [
                        'http://localhost/testing/testing_image.jpg',
                        'http://localhost/testing/testing_image.jpg'
                    ]
                },
                'phone_color=2|phone_storage=4': {
                    primary_image: 'http://localhost/testing/testing_image.jpg',
                    additional_image: [
                        'http://localhost/testing/testing_image.jpg',
                        'http://localhost/testing/testing_image.jpg'
                    ]
                }
            },
            product: [
                {
                    id: 22,
                    product_variant_id: 8,
                    long_name: 'Apple iPhone 7 - Gold - 128GB',
                    variants: [
                        {
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_id: 2,
                            attribute_value_name: 'Black'
                        }
                    ],
                    variant_value: {
                        phone_color: 2
                    },
                    primary_image: 'http://localhost/testing/testing_image.jpg',
                    currency: 'IDR',
                    tier_min_qty_1: 111,
                    tier_min_qty_2: 222,
                    tier_min_qty_3: 333,
                    tier_cogs_price_1: '444.00',
                    tier_cogs_price_2: '555.00',
                    tier_cogs_price_3: '666.00',
                    is_active: 1,
                    sku: 'DC8JLF43ND',
                    sku_vendor: '111111111',
                    stock_available: 1,
                    warranty_option: 'official_warranty',
                    warranty_period: 'month',
                    warranty_limit: 1,
                    warranty_coverage: 'Box',
                    reference_link: [],
                    is_indent: 1,
                    indent_limit: 2,
                    indent_period: 'week',
                    is_decimal: undefined,
                    down_payment_type: undefined,
                    down_payment_value: undefined,
                    created_at: '2018-01-16T02:59:03.000Z',
                    total_history: 1,
                    is_bulk: 0,
                    is_private_sku: true,
                    private_customers: [
                        {
                            address: ' ',
                            email: null,
                            id: null,
                            mobile_phone: null,
                            name: '.  ',
                            phone: null,
                            pic: null,
                            is_contract: false
                        }
                    ]
                }
            ]
        };
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('getProductById: Successfully with (element.is_private_sku === 1) is false', function* (t) {
    const productStub2 = JSON.parse(JSON.stringify(productStub));
    productStub2.rows[0].is_private_sku = 0;

    t.context.sandbox.stub(ProductVendorRepository, 'findByProductGroupId').resolves(resultStub);
    t.context.sandbox.stub(CategoryRepository, 'getCategoryBreakdown').resolves(CategoriesStub);
    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorPrivateSku').resolves(privateSkuStub);
    t.context.sandbox.stub(GeneralRepository, 'findAttributeByVariantValue').resolves(variantsStub);
    t.context.sandbox.stub(ProductVariantRepository, 'findAllProduct').resolves(variantImagesStub);
    t.context.sandbox.stub(ProductLogRepository, 'count').resolves(1);
    t.context.sandbox.stub(OrganizationSubRepo, 'getOrganizationSubs').resolves(organizationListStub);

    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithDetail').resolves(productStub2);
    t.context.sandbox.stub(BizzyService, 'callSync').resolves({ data: [] });

    try {
        const data = {
            path: {
                id: 3,
                pid: 2
            }
        };

        const result = yield Method.getProductById(data, context);
        const expected = {
            data: {
                id: 2,
                name: 'Apple iPhone 7',
                uom: {
                    id: 1,
                    name: 'Unit'
                },
                barcode: '5012345678900',
                manufacturing_number: 'MPN7PK1781',
                primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
                stocking_uom: {
                    id: 1,
                    name: 'Box'
                },
                quantity_stocking_uom: 1,
                variant_count: 2,
                variant_matrix: [
                    'phone_color'
                ],
                brand: {
                    id: 81,
                    name: 'Apple'
                },
                categories: {
                    C0: {
                        id: 8,
                        name: 'IT and Mobile Devices',
                        unspsc: 43000000
                    },
                    C1: {
                        id: 52,
                        name: 'Communications Devices & Accessories',
                        unspsc: 43190000
                    },
                    C2: {
                        id: 219,
                        name: 'Personal communication devices',
                        unspsc: 43191500
                    },
                    C3: {
                        id: 561,
                        name: 'Mobile phones',
                        unspsc: 43191501
                    }
                },
                dimensions: {
                    package_weight: 800,
                    package_length: '100.00',
                    package_width: '200.00',
                    package_height: '300.00'
                },
                package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
                specifications: [
                    {
                        attribute_code: 'phone_os',
                        attribute_code_label: 'Sistem Operasi',
                        attribute_type: 'dropdown',
                        attribute_value_id: 5,
                        attribute_value_name: 'iOS'
                    }
                ],
                description: 'Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.\n\nDi iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.'
            },
            variant_images: {
                'phone_color=2|phone_storage=11': {
                    primary_image: 'http://localhost/testing/testing_image.jpg',
                    additional_image: [
                        'http://localhost/testing/testing_image.jpg',
                        'http://localhost/testing/testing_image.jpg'
                    ]
                },
                'phone_color=2|phone_storage=4': {
                    primary_image: 'http://localhost/testing/testing_image.jpg',
                    additional_image: [
                        'http://localhost/testing/testing_image.jpg',
                        'http://localhost/testing/testing_image.jpg'
                    ]
                }
            },
            product: [
                {
                    id: 22,
                    product_variant_id: 8,
                    long_name: 'Apple iPhone 7 - Gold - 128GB',
                    variants: [
                        {
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_id: 2,
                            attribute_value_name: 'Black'
                        }
                    ],
                    variant_value: {
                        phone_color: 2
                    },
                    primary_image: 'http://localhost/testing/testing_image.jpg',
                    currency: 'IDR',
                    tier_min_qty_1: 111,
                    tier_min_qty_2: 222,
                    tier_min_qty_3: 333,
                    tier_cogs_price_1: '444.00',
                    tier_cogs_price_2: '555.00',
                    tier_cogs_price_3: '666.00',
                    is_active: 1,
                    sku: 'DC8JLF43ND',
                    sku_vendor: '111111111',
                    stock_available: 1,
                    warranty_option: 'official_warranty',
                    warranty_period: 'month',
                    warranty_limit: 1,
                    warranty_coverage: 'Box',
                    reference_link: [],
                    is_indent: 1,
                    indent_limit: 2,
                    indent_period: 'week',
                    is_decimal: undefined,
                    down_payment_type: undefined,
                    down_payment_value: undefined,
                    created_at: '2018-01-16T02:59:03.000Z',
                    total_history: 1,
                    is_bulk: 0,
                    is_private_sku: false,
                    private_customers: []
                }
            ]
        };
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('getProductById: scenario when organizationList is empty', function* (t) {
    let organizationListStub2 = JSON.parse(JSON.stringify(organizationListStub));
    organizationListStub2 = [];

    t.context.sandbox.stub(ProductVendorRepository, 'findByProductGroupId').resolves(resultStub);
    t.context.sandbox.stub(CategoryRepository, 'getCategoryBreakdown').resolves(CategoriesStub);
    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithDetail').resolves(productStub);
    t.context.sandbox.stub(GeneralRepository, 'findAttributeByVariantValue').resolves(variantsStub);
    t.context.sandbox.stub(ProductVariantRepository, 'findAllProduct').resolves(variantImagesStub);
    t.context.sandbox.stub(ProductLogRepository, 'count').resolves(1);
    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorPrivateSku').resolves(privateSkuStub);

    t.context.sandbox.stub(OrganizationSubRepo, 'getOrganizationSubs').resolves(organizationListStub2);
    t.context.sandbox.stub(BizzyService, 'callSync').resolves({ data: [] });

    try {
        const data = {
            path: {
                id: 3,
                pid: 2
            }
        };

        yield Method.getProductById(data, context);
        t.fail('should be error data organizations not found');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'data organizations not found');
    }
});

test.serial('getProductById: scenario rejects on getOrganizationSubs()', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findByProductGroupId').resolves(resultStub);
    t.context.sandbox.stub(CategoryRepository, 'getCategoryBreakdown').resolves(CategoriesStub);
    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithDetail').resolves(productStub);
    t.context.sandbox.stub(GeneralRepository, 'findAttributeByVariantValue').resolves(variantsStub);
    t.context.sandbox.stub(ProductVariantRepository, 'findAllProduct').resolves(variantImagesStub);
    t.context.sandbox.stub(ProductLogRepository, 'count').resolves(1);
    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorPrivateSku').resolves(privateSkuStub);

    t.context.sandbox.stub(OrganizationSubRepo, 'getOrganizationSubs').rejects();
    t.context.sandbox.stub(BizzyService, 'callSync').resolves({ data: [] });

    try {
        const data = {
            path: {
                id: 3,
                pid: 2
            }
        };

        yield Method.getProductById(data, context);
        t.fail('should be error cannot get data customers');
    } catch (err) {
        t.is(err.message, 'cannot get data customers');
    }
});

test.serial('getProductById: scenario when resPrivateSku.customers is undefined', function* (t) {
    const privateSkuStub2 = JSON.parse(JSON.stringify(privateSkuStub));
    privateSkuStub2.customers = undefined;

    t.context.sandbox.stub(ProductVendorRepository, 'findByProductGroupId').resolves(resultStub);
    t.context.sandbox.stub(CategoryRepository, 'getCategoryBreakdown').resolves(CategoriesStub);
    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithDetail').resolves(productStub);
    t.context.sandbox.stub(GeneralRepository, 'findAttributeByVariantValue').resolves(variantsStub);
    t.context.sandbox.stub(ProductVariantRepository, 'findAllProduct').resolves(variantImagesStub);
    t.context.sandbox.stub(ProductLogRepository, 'count').resolves(1);
    t.context.sandbox.stub(OrganizationSubRepo, 'getOrganizationSubs').resolves(organizationListStub);

    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorPrivateSku').resolves(privateSkuStub2);

    try {
        const data = {
            path: {
                id: 3,
                pid: 2
            }
        };

        yield Method.getProductById(data, context);
        t.fail('should be error data customers not found');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'data customers not found');
    }
});

test.serial('getProductById: scenario when findProductVendorPrivateSku() is rejects', function* (t) {
    const privateSkuStub2 = JSON.parse(JSON.stringify(privateSkuStub));
    privateSkuStub2.customers = undefined;

    t.context.sandbox.stub(ProductVendorRepository, 'findByProductGroupId').resolves(resultStub);
    t.context.sandbox.stub(CategoryRepository, 'getCategoryBreakdown').resolves(CategoriesStub);
    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithDetail').resolves(productStub);
    t.context.sandbox.stub(GeneralRepository, 'findAttributeByVariantValue').resolves(variantsStub);
    t.context.sandbox.stub(ProductVariantRepository, 'findAllProduct').resolves(variantImagesStub);
    t.context.sandbox.stub(ProductLogRepository, 'count').resolves(1);
    t.context.sandbox.stub(OrganizationSubRepo, 'getOrganizationSubs').resolves(organizationListStub);

    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorPrivateSku').rejects();

    try {
        const data = {
            path: {
                id: 3,
                pid: 2
            }
        };

        yield Method.getProductById(data, context);
        t.fail('should be error cannot get data customers');
    } catch (err) {
        t.is(err.message, 'cannot get data customers');
    }
});

test.serial('getProductById: Successfully with (element.customer_id !== null) and (pgIsBulk === 1)', function* (t) {
    const productStub2 = JSON.parse(JSON.stringify(productStub));
    productStub2.rows[0].customer_id = 1;
    productStub2.rows[0].is_private_sku = false;
    t.context.sandbox.stub(ProductVendorRepository, 'findByProductGroupId').resolves(resultStub);
    t.context.sandbox.stub(CategoryRepository, 'getCategoryBreakdown').resolves(CategoriesStub);
    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorPrivateSku').resolves(privateSkuStub);
    t.context.sandbox.stub(GeneralRepository, 'findAttributeByVariantValue').resolves(variantsStub);
    t.context.sandbox.stub(ProductVariantRepository, 'findAllProduct').resolves(variantImagesStub);
    t.context.sandbox.stub(ProductLogRepository, 'count').resolves(1);
    t.context.sandbox.stub(OrganizationSubRepo, 'getOrganizationSubs').resolves(organizationListStub);

    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithDetail').resolves(productStub2);
    t.context.sandbox.stub(BizzyService, 'callSync').resolves({ data: [] });
    try {
        const data = {
            path: {
                id: 3,
                pid: 2
            }
        };

        const result = yield Method.getProductById(data, context);
        const expected = {
            data: {
                id: 2,
                name: 'Apple iPhone 7',
                uom: {
                    id: 1,
                    name: 'Unit'
                },
                barcode: '5012345678900',
                manufacturing_number: 'MPN7PK1781',
                primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
                stocking_uom: {
                    id: 1,
                    name: 'Box'
                },
                quantity_stocking_uom: 1,
                variant_count: 2,
                variant_matrix: [
                    'phone_color'
                ],
                brand: {
                    id: 81,
                    name: 'Apple'
                },
                categories: {
                    C0: {
                        id: 8,
                        name: 'IT and Mobile Devices',
                        unspsc: 43000000
                    },
                    C1: {
                        id: 52,
                        name: 'Communications Devices & Accessories',
                        unspsc: 43190000
                    },
                    C2: {
                        id: 219,
                        name: 'Personal communication devices',
                        unspsc: 43191500
                    },
                    C3: {
                        id: 561,
                        name: 'Mobile phones',
                        unspsc: 43191501
                    }
                },
                dimensions: {
                    package_weight: 800,
                    package_length: '100.00',
                    package_width: '200.00',
                    package_height: '300.00'
                },
                package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
                specifications: [
                    {
                        attribute_code: 'phone_os',
                        attribute_code_label: 'Sistem Operasi',
                        attribute_type: 'dropdown',
                        attribute_value_id: 5,
                        attribute_value_name: 'iOS'
                    }
                ],
                description: 'Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.\n\nDi iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.'
            },
            variant_images: {
                'phone_color=2|phone_storage=11': {
                    primary_image: 'http://localhost/testing/testing_image.jpg',
                    additional_image: [
                        'http://localhost/testing/testing_image.jpg',
                        'http://localhost/testing/testing_image.jpg'
                    ]
                },
                'phone_color=2|phone_storage=4': {
                    primary_image: 'http://localhost/testing/testing_image.jpg',
                    additional_image: [
                        'http://localhost/testing/testing_image.jpg',
                        'http://localhost/testing/testing_image.jpg'
                    ]
                }
            },
            product: [
                {
                    id: 22,
                    product_variant_id: 8,
                    long_name: 'Apple iPhone 7 - Gold - 128GB',
                    variants: [
                        {
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_id: 2,
                            attribute_value_name: 'Black'
                        }
                    ],
                    variant_value: {
                        phone_color: 2
                    },
                    primary_image: 'http://localhost/testing/testing_image.jpg',
                    currency: 'IDR',
                    tier_min_qty_1: 111,
                    tier_min_qty_2: 222,
                    tier_min_qty_3: 333,
                    tier_cogs_price_1: '444.00',
                    tier_cogs_price_2: '555.00',
                    tier_cogs_price_3: '666.00',
                    is_active: 1,
                    sku: 'DC8JLF43ND',
                    sku_vendor: '111111111',
                    stock_available: 1,
                    warranty_option: 'official_warranty',
                    warranty_period: 'month',
                    warranty_limit: 1,
                    warranty_coverage: 'Box',
                    reference_link: [],
                    is_indent: 1,
                    indent_limit: 2,
                    indent_period: 'week',
                    is_decimal: undefined,
                    down_payment_type: undefined,
                    down_payment_value: undefined,
                    created_at: '2018-01-16T02:59:03.000Z',
                    total_history: 1,
                    is_bulk: 1,
                    is_private_sku: true,
                    private_customers: [
                        {
                            address: ' ',
                            email: null,
                            id: null,
                            mobile_phone: null,
                            name: '.  ',
                            phone: null,
                            pic: null,
                            is_contract: false
                        }
                    ]
                }
            ]
        };
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('getProductById: scenario with (element.customer_id !== null) is true and (pgIsBulk === 1) is false', function* (t) {
    const productStub2 = JSON.parse(JSON.stringify(productStub));
    productStub2.rows[0].customer_id = 1;

    const resultStub2 = JSON.parse(JSON.stringify(resultStub));
    resultStub2.is_bulk = 0;

    t.context.sandbox.stub(ProductVendorRepository, 'findByProductGroupId').resolves(resultStub2);
    t.context.sandbox.stub(CategoryRepository, 'getCategoryBreakdown').resolves(CategoriesStub);
    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorPrivateSku').resolves(privateSkuStub);
    t.context.sandbox.stub(GeneralRepository, 'findAttributeByVariantValue').resolves(variantsStub);
    t.context.sandbox.stub(ProductVariantRepository, 'findAllProduct').resolves(variantImagesStub);
    t.context.sandbox.stub(ProductLogRepository, 'count').resolves(1);
    t.context.sandbox.stub(OrganizationSubRepo, 'getOrganizationSubs').resolves(organizationListStub);

    t.context.sandbox.stub(ProductVendorRepository, 'findProductVendorWithDetail').resolves(productStub2);

    try {
        const data = {
            path: {
                id: 3,
                pid: 2
            }
        };

        yield Method.getProductById(data, context);
        t.fail('should be throw UnprocessableEntity "customer does not match because PG is not bulk"');
    } catch (err) {
        t.true(err instanceof BizzyError.UnprocessableEntity, err.message);
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
