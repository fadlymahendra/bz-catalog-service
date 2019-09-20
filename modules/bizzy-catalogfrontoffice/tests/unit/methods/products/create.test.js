'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError, BizzyService, DBContext } = require('bizzy-common');
const ProductGroupRepository = require('../../../../src/repositories/product_group');
const ProductVendorRepository = require('../../../../src/repositories/product_vendor');
const ProductVariantRepository = require('../../../../src/repositories/product_variant');
const CategoryRepository = require('../../../../src/repositories/category');
const PremoderationRepository = require('../../../../src/repositories/premoderation');
const ProductSkuRepository = require('../../../../src/repositories/product_sku');
const WebhookRepository = require('../../../../src/repositories/webhook');
const Methods = require('../../../../src/methods/products/create');
const RequestSkuMethod = require('../../../../src/methods/premoderations/create');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

test.serial('Should be return success', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findOneDetail').resolves(false);
    t.context.sandbox.stub(ProductGroupRepository, 'findByIdWithDetail').resolves({
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
        updated_at: '2018-01-12T10:40:43.000Z',
        Brand: {
            id: 81,
            name: 'Apple',
            image_url: null,
            created_at: '2017-11-28T14:54:10.000Z',
            updated_at: '2017-11-28T14:54:10.000Z'
        },
        Uom: {
            id: 1,
            name: 'Unit',
            created_at: '2017-12-05T16:59:10.000Z',
            updated_at: '2017-12-05T16:59:10.000Z'
        },
        StockingUom: {
            id: 1,
            name: 'Box',
            created_at: '2017-12-05T16:55:00.000Z',
            updated_at: '2017-12-20T05:49:50.000Z'
        },
        ProductGroupAttributes: [
            {
                id: 1,
                product_group_id: 2,
                attribute_code_id: 1,
                attribute_value_id: null,
                text_input: null,
                is_variant: 1,
                created_at: '2017-12-19T08:01:09.000Z',
                updated_at: '2017-12-19T08:01:09.000Z',
                AttributeCode: {
                    id: 1,
                    code: 'phone_color',
                    label: 'Warna',
                    type: 'dropdown',
                    created_at: '2017-12-19T10:34:50.000Z',
                    updated_at: '2017-12-19T10:34:53.000Z',
                    AttributeValues: [
                        {
                            id: 1,
                            attribute_code_id: 1,
                            value: 'Silver',
                            image_url: null,
                            created_at: '2017-12-19T10:39:35.000Z',
                            updated_at: '2017-12-19T10:39:38.000Z'
                        },
                        {
                            id: 2,
                            attribute_code_id: 1,
                            value: 'Black',
                            image_url: null,
                            created_at: '2017-12-19T03:40:00.000Z',
                            updated_at: '2017-12-19T03:40:00.000Z'
                        }
                    ]
                },
                AttributeValue: null
            },
            {
                id: 2,
                product_group_id: 2,
                attribute_code_id: 2,
                attribute_value_id: null,
                text_input: null,
                is_variant: 1,
                created_at: '2017-12-19T08:01:19.000Z',
                updated_at: '2017-12-19T08:01:19.000Z',
                AttributeCode: {
                    id: 2,
                    code: 'phone_storage',
                    label: 'Kapasitas',
                    type: 'dropdown',
                    created_at: '2017-12-19T10:35:12.000Z',
                    updated_at: '2017-12-19T10:35:15.000Z',
                    AttributeValues: [
                        {
                            id: 3,
                            attribute_code_id: 2,
                            value: '32GB',
                            image_url: null,
                            created_at: '2017-12-19T03:41:25.000Z',
                            updated_at: '2017-12-19T03:41:25.000Z'
                        },
                        {
                            id: 4,
                            attribute_code_id: 2,
                            value: '64GB',
                            image_url: null,
                            created_at: '2017-12-19T03:41:58.000Z',
                            updated_at: '2017-12-19T03:41:58.000Z'
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
                created_at: '2017-12-19T08:01:38.000Z',
                updated_at: '2017-12-19T08:01:38.000Z',
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
                updated_at: '2017-12-19T08:02:03.000Z',
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
    const callback = t.context.sandbox.stub(ProductVendorRepository, 'createOne');
    callback.onCall(0).resolves({
        getValues() {
            return {
                id: 11,
                vendor_id: 3
            };
        }
    });
    callback.onCall(1).resolves({
        getValues() {
            return {
                id: 11,
                vendor_id: 3
            };
        }
    });
    t.context.sandbox.stub(ProductVariantRepository, 'createOne').resolves({
        getValues() {
            return {
                id: 9,
                sku: '0EBNFN5BKR'
            };
        }
    });
    t.context.sandbox.stub(ProductVariantRepository, 'findAndCountAll').resolves({
        count: 1,
        rows: [
            {
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
        ]
    });
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves(false);
    t.context.sandbox.stub(ProductVariantRepository, 'findCountVariant').resolves({
        count: 0,
        rows: []
    });
    t.context.sandbox.stub(ProductGroupRepository, 'update').resolves(1);
    t.context.sandbox.stub(WebhookRepository, 'trigger').resolves();
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();
    t.context.sandbox.stub(ProductSkuRepository, 'findOne').resolves(false);
    t.context.sandbox.stub(ProductSkuRepository, 'insertOne').resolves(true);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3'
            },
            body: {
                product_group_id: 2,
                products: [
                    {
                        variants: [
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Silver',
                                attribute_value_id: 1
                            },
                            {
                                attribute_id: 2,
                                attribute_code: 'phone_storage',
                                attribute_code_label: 'Kapasitas',
                                attribute_value_name: '64GB',
                                attribute_value_id: 4
                            }
                        ],
                        variant_value: {
                            phone_color: '2',
                            phone_storage: '3'
                        },
                        sku_vendor: '111111111',
                        tier_min_qty_1: '5',
                        tier_min_qty_2: '10',
                        tier_min_qty_3: '15',
                        tier_cogs_price_1: '15000000',
                        tier_cogs_price_2: '14500000',
                        tier_cogs_price_3: '14000000',
                        stock: 0,
                        primary_image: 'http://localhost/testing/testing_image.jpg',
                        additional_image: [
                            'http://localhost/testing/testing_image.jpg',
                            'http://localhost/testing/testing_image.jpg'
                        ],
                        warehouse_id: 99,
                        location_label: 'Jakarta',
                        reference_link: [
                            'google.com',
                            'amazon.com'
                        ],
                        warranty_option: 'official_warranty',
                        warranty_period: 'month',
                        warranty_limit: 1,
                        warranty_coverage: 'Box',
                        is_indent: 1,
                        indent_period: 'week',
                        indent_limit: 2,
                        is_decimal: 0,
                        down_payment_type: 0,
                        down_payment_value: 0
                    },
                    {
                        variants: [
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Green',
                                attribute_value_id: 2
                            },
                            {
                                attribute_id: 2,
                                attribute_code: 'phone_storage',
                                attribute_code_label: 'Kapasitas',
                                attribute_value_name: '64GB',
                                attribute_value_id: 4
                            }
                        ],
                        variant_value: {
                            phone_color: '2',
                            phone_storage: '3'
                        },
                        sku_vendor: '111111111',
                        tier_min_qty_1: '5',
                        tier_min_qty_2: '10',
                        tier_min_qty_3: '15',
                        tier_cogs_price_1: '15000000',
                        tier_cogs_price_2: '14500000',
                        tier_cogs_price_3: '14000000',
                        stock: 0,
                        primary_image: 'http://localhost/testing/testing_image.jpg',
                        additional_image: [
                            'http://localhost/testing/testing_image.jpg',
                            'http://localhost/testing/testing_image.jpg'
                        ],
                        warehouse_id: 99,
                        location_label: 'Jakarta',
                        reference_link: [
                            'google.com',
                            'amazon.com'
                        ],
                        warranty_option: 'official_warranty',
                        warranty_period: 'month',
                        warranty_limit: 1,
                        warranty_coverage: 'Box',
                        is_indent: 1,
                        indent_period: 'week',
                        indent_limit: 2,
                        is_decimal: 0,
                        down_payment_type: 0,
                        down_payment_value: 0
                    }
                ]
            }
        };

        const result = yield Methods.postProduct(data, context);
        const expected = {
            data: {
                product_group_id: 2,
                product_variant: [
                    {
                        id: 9,
                        sku: '0EBNFN5BKR'
                    },
                    {
                        id: 9,
                        sku: '0EBNFN5BKR'
                    }
                ],
                product_vendor: [
                    {
                        id: 11,
                        vendor_id: 3
                    },
                    {
                        id: 11,
                        vendor_id: 3
                    }
                ]
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
        t.fail();
    }
});

test.serial('Should be return success with package_content is null', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findOneDetail').resolves(false);
    t.context.sandbox.stub(ProductGroupRepository, 'findByIdWithDetail').resolves({
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
        package_content: null,
        barcode: '5012345678900',
        description: 'Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.\n\nDi iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.',
        primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        created_at: '2017-12-19T14:59:19.000Z',
        updated_at: '2018-01-12T10:40:43.000Z',
        Brand: {
            id: 81,
            name: 'Apple',
            image_url: null,
            created_at: '2017-11-28T14:54:10.000Z',
            updated_at: '2017-11-28T14:54:10.000Z'
        },
        Uom: {
            id: 1,
            name: 'Unit',
            created_at: '2017-12-05T16:59:10.000Z',
            updated_at: '2017-12-05T16:59:10.000Z'
        },
        StockingUom: {
            id: 1,
            name: 'Box',
            created_at: '2017-12-05T16:55:00.000Z',
            updated_at: '2017-12-20T05:49:50.000Z'
        },
        ProductGroupAttributes: [
            {
                id: 1,
                product_group_id: 2,
                attribute_code_id: 1,
                attribute_value_id: null,
                text_input: null,
                is_variant: 1,
                created_at: '2017-12-19T08:01:09.000Z',
                updated_at: '2017-12-19T08:01:09.000Z',
                AttributeCode: {
                    id: 1,
                    code: 'phone_color',
                    label: 'Warna',
                    type: 'dropdown',
                    created_at: '2017-12-19T10:34:50.000Z',
                    updated_at: '2017-12-19T10:34:53.000Z',
                    AttributeValues: [
                        {
                            id: 1,
                            attribute_code_id: 1,
                            value: 'Silver',
                            image_url: null,
                            created_at: '2017-12-19T10:39:35.000Z',
                            updated_at: '2017-12-19T10:39:38.000Z'
                        },
                        {
                            id: 2,
                            attribute_code_id: 1,
                            value: 'Black',
                            image_url: null,
                            created_at: '2017-12-19T03:40:00.000Z',
                            updated_at: '2017-12-19T03:40:00.000Z'
                        }
                    ]
                },
                AttributeValue: null
            },
            {
                id: 2,
                product_group_id: 2,
                attribute_code_id: 2,
                attribute_value_id: null,
                text_input: null,
                is_variant: 1,
                created_at: '2017-12-19T08:01:19.000Z',
                updated_at: '2017-12-19T08:01:19.000Z',
                AttributeCode: {
                    id: 2,
                    code: 'phone_storage',
                    label: 'Kapasitas',
                    type: 'dropdown',
                    created_at: '2017-12-19T10:35:12.000Z',
                    updated_at: '2017-12-19T10:35:15.000Z',
                    AttributeValues: [
                        {
                            id: 3,
                            attribute_code_id: 2,
                            value: '32GB',
                            image_url: null,
                            created_at: '2017-12-19T03:41:25.000Z',
                            updated_at: '2017-12-19T03:41:25.000Z'
                        },
                        {
                            id: 4,
                            attribute_code_id: 2,
                            value: '64GB',
                            image_url: null,
                            created_at: '2017-12-19T03:41:58.000Z',
                            updated_at: '2017-12-19T03:41:58.000Z'
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
                created_at: '2017-12-19T08:01:38.000Z',
                updated_at: '2017-12-19T08:01:38.000Z',
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
                updated_at: '2017-12-19T08:02:03.000Z',
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
    const callback = t.context.sandbox.stub(ProductVendorRepository, 'createOne');
    callback.onCall(0).resolves({
        getValues() {
            return {
                id: 11,
                vendor_id: 3
            };
        }
    });
    callback.onCall(1).resolves({
        getValues() {
            return {
                id: 11,
                vendor_id: 3
            };
        }
    });
    t.context.sandbox.stub(ProductVariantRepository, 'createOne').resolves({
        getValues() {
            return {
                id: 9,
                sku: '0EBNFN5BKR'
            };
        }
    });
    t.context.sandbox.stub(ProductVariantRepository, 'findAndCountAll').resolves({
        count: 1,
        rows: [
            {
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
        ]
    });
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves(false);
    t.context.sandbox.stub(ProductVariantRepository, 'findCountVariant').resolves({
        count: 0,
        rows: []
    });
    t.context.sandbox.stub(ProductGroupRepository, 'update').resolves(1);
    t.context.sandbox.stub(WebhookRepository, 'trigger').resolves();
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();
    t.context.sandbox.stub(ProductSkuRepository, 'findOne').resolves(false);
    t.context.sandbox.stub(ProductSkuRepository, 'insertOne').resolves(true);
    t.context.sandbox.stub(RequestSkuMethod, 'postPremoderation').resolves(1);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3'
            },
            body: {
                product_group_id: '2',
                products: [
                    {
                        variants: [
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Silver',
                                attribute_value_id: 0
                            },
                            {
                                attribute_id: 2,
                                attribute_code: 'phone_storage',
                                attribute_code_label: 'Kapasitas',
                                attribute_value_name: '64GB',
                                attribute_value_id: 4
                            }
                        ],
                        variant_value: {
                            phone_color: '2',
                            phone_storage: '3'
                        },
                        sku_vendor: '111111111',
                        tier_min_qty_1: '5',
                        tier_min_qty_2: '10',
                        tier_min_qty_3: '15',
                        tier_cogs_price_1: '15000000',
                        tier_cogs_price_2: '14500000',
                        tier_cogs_price_3: '14000000',
                        stock: 0,
                        primary_image: 'http://localhost/testing/testing_image.jpg',
                        additional_image: [
                            'http://localhost/testing/testing_image.jpg',
                            'http://localhost/testing/testing_image.jpg'
                        ],
                        warehouse_id: 99,
                        location_label: 'Jakarta',
                        reference_link: [
                            'google.com',
                            'amazon.com'
                        ],
                        warranty_option: 'official_warranty',
                        warranty_period: 'month',
                        warranty_limit: 1,
                        warranty_coverage: 'Box',
                        is_indent: 1,
                        indent_period: 'week',
                        indent_limit: 2,
                        is_decimal: 0,
                        down_payment_type: 0,
                        down_payment_value: 0
                    },
                    {
                        variants: [
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Green',
                                attribute_value_id: 2
                            },
                            {
                                attribute_id: 2,
                                attribute_code: 'phone_storage',
                                attribute_code_label: 'Kapasitas',
                                attribute_value_name: '64GB',
                                attribute_value_id: 4
                            }
                        ],
                        variant_value: {
                            phone_color: '2',
                            phone_storage: '3'
                        },
                        sku_vendor: '111111111',
                        tier_min_qty_1: '5',
                        tier_min_qty_2: '10',
                        tier_min_qty_3: '15',
                        tier_cogs_price_1: '15000000',
                        tier_cogs_price_2: '14500000',
                        tier_cogs_price_3: '14000000',
                        stock: 0,
                        primary_image: 'http://localhost/testing/testing_image.jpg',
                        additional_image: [
                            'http://localhost/testing/testing_image.jpg',
                            'http://localhost/testing/testing_image.jpg'
                        ],
                        warehouse_id: 99,
                        location_label: 'Jakarta',
                        reference_link: [
                            'google.com',
                            'amazon.com'
                        ],
                        warranty_option: 'official_warranty',
                        warranty_period: 'month',
                        warranty_limit: 1,
                        warranty_coverage: 'Box',
                        is_indent: 1,
                        indent_period: 'week',
                        indent_limit: 2,
                        is_decimal: 0,
                        down_payment_type: 0,
                        down_payment_value: 0
                    }
                ]
            }
        };

        const result = yield Methods.postProduct(data, context);
        const expected = 1;
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
        t.fail();
    }
});

test.serial('Should be return success with generate sku', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findOneDetail').resolves(false);
    t.context.sandbox.stub(ProductGroupRepository, 'findByIdWithDetail').resolves({
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
        updated_at: '2018-01-12T10:40:43.000Z',
        Brand: {
            id: 81,
            name: 'Apple',
            image_url: null,
            created_at: '2017-11-28T14:54:10.000Z',
            updated_at: '2017-11-28T14:54:10.000Z'
        },
        Uom: {
            id: 1,
            name: 'Unit',
            created_at: '2017-12-05T16:59:10.000Z',
            updated_at: '2017-12-05T16:59:10.000Z'
        },
        StockingUom: {
            id: 1,
            name: 'Box',
            created_at: '2017-12-05T16:55:00.000Z',
            updated_at: '2017-12-20T05:49:50.000Z'
        },
        ProductGroupAttributes: [
            {
                id: 1,
                product_group_id: 2,
                attribute_code_id: 1,
                attribute_value_id: null,
                text_input: null,
                is_variant: 1,
                created_at: '2017-12-19T08:01:09.000Z',
                updated_at: '2017-12-19T08:01:09.000Z',
                AttributeCode: {
                    id: 1,
                    code: 'phone_color',
                    label: 'Warna',
                    type: 'dropdown',
                    created_at: '2017-12-19T10:34:50.000Z',
                    updated_at: '2017-12-19T10:34:53.000Z',
                    AttributeValues: [
                        {
                            id: 1,
                            attribute_code_id: 1,
                            value: 'Silver',
                            image_url: null,
                            created_at: '2017-12-19T10:39:35.000Z',
                            updated_at: '2017-12-19T10:39:38.000Z'
                        },
                        {
                            id: 2,
                            attribute_code_id: 1,
                            value: 'Black',
                            image_url: null,
                            created_at: '2017-12-19T03:40:00.000Z',
                            updated_at: '2017-12-19T03:40:00.000Z'
                        }
                    ]
                },
                AttributeValue: null
            },
            {
                id: 2,
                product_group_id: 2,
                attribute_code_id: 2,
                attribute_value_id: null,
                text_input: null,
                is_variant: 1,
                created_at: '2017-12-19T08:01:19.000Z',
                updated_at: '2017-12-19T08:01:19.000Z',
                AttributeCode: {
                    id: 2,
                    code: 'phone_storage',
                    label: 'Kapasitas',
                    type: 'dropdown',
                    created_at: '2017-12-19T10:35:12.000Z',
                    updated_at: '2017-12-19T10:35:15.000Z',
                    AttributeValues: [
                        {
                            id: 3,
                            attribute_code_id: 2,
                            value: '32GB',
                            image_url: null,
                            created_at: '2017-12-19T03:41:25.000Z',
                            updated_at: '2017-12-19T03:41:25.000Z'
                        },
                        {
                            id: 4,
                            attribute_code_id: 2,
                            value: '64GB',
                            image_url: null,
                            created_at: '2017-12-19T03:41:58.000Z',
                            updated_at: '2017-12-19T03:41:58.000Z'
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
                created_at: '2017-12-19T08:01:38.000Z',
                updated_at: '2017-12-19T08:01:38.000Z',
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
                updated_at: '2017-12-19T08:02:03.000Z',
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
    t.context.sandbox.stub(ProductVendorRepository, 'createOne').resolves({
        getValues() {
            return {
                id: 11,
                vendor_id: 3
            };
        }
    });

    t.context.sandbox.stub(ProductVariantRepository, 'createOne').resolves({
        getValues() {
            return {
                id: 9,
                sku: '0EBNFN5BKR'
            };
        }
    });
    t.context.sandbox.stub(ProductVariantRepository, 'findAndCountAll').resolves({
        count: 1,
        rows: [
            {
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
        ]
    });
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves(false);
    t.context.sandbox.stub(ProductVariantRepository, 'findCountVariant').resolves({
        count: 0,
        rows: []
    });
    t.context.sandbox.stub(ProductGroupRepository, 'update').resolves(1);
    t.context.sandbox.stub(WebhookRepository, 'trigger').resolves();
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();
    const callback = t.context.sandbox.stub(ProductSkuRepository, 'findOne');
    callback.onCall(0).resolves({
        id: 1
    });
    callback.onCall(1).resolves(false);
    callback.onCall(2).resolves(false);
    t.context.sandbox.stub(ProductSkuRepository, 'insertOne').resolves(true);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3'
            },
            body: {
                product_group_id: 2,
                products: [
                    {
                        variants: [
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Silver',
                                attribute_value_id: 1
                            },
                            {
                                attribute_id: 2,
                                attribute_code: 'phone_storage',
                                attribute_code_label: 'Kapasitas',
                                attribute_value_name: '64GB',
                                attribute_value_id: 4
                            }
                        ],
                        variant_value: {
                            phone_color: '2',
                            phone_storage: '3'
                        },
                        sku_vendor: '111111111',
                        tier_min_qty_1: '5',
                        tier_min_qty_2: '10',
                        tier_min_qty_3: '15',
                        tier_cogs_price_1: '15000000',
                        tier_cogs_price_2: '14500000',
                        tier_cogs_price_3: '14000000',
                        stock: 0,
                        primary_image: 'http://localhost/testing/testing_image.jpg',
                        additional_image: [
                            'http://localhost/testing/testing_image.jpg',
                            'http://localhost/testing/testing_image.jpg'
                        ],
                        warehouse_id: 99,
                        location_label: 'Jakarta',
                        reference_link: [
                            'google.com',
                            'amazon.com'
                        ],
                        warranty_option: 'official_warranty',
                        warranty_period: 'month',
                        warranty_limit: 1,
                        warranty_coverage: 'Box',
                        is_indent: 1,
                        indent_period: 'week',
                        indent_limit: 2,
                        is_decimal: 0,
                        down_payment_type: 0,
                        down_payment_value: 0
                    },
                    {
                        variants: [
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Green',
                                attribute_value_id: 2
                            },
                            {
                                attribute_id: 2,
                                attribute_code: 'phone_storage',
                                attribute_code_label: 'Kapasitas',
                                attribute_value_name: '64GB',
                                attribute_value_id: 4
                            }
                        ],
                        variant_value: {
                            phone_color: '2',
                            phone_storage: '3'
                        },
                        sku_vendor: '111111111',
                        tier_min_qty_1: '5',
                        tier_min_qty_2: '10',
                        tier_min_qty_3: '15',
                        tier_cogs_price_1: '15000000',
                        tier_cogs_price_2: '14500000',
                        tier_cogs_price_3: '14000000',
                        stock: 0,
                        primary_image: 'http://localhost/testing/testing_image.jpg',
                        additional_image: [
                            'http://localhost/testing/testing_image.jpg',
                            'http://localhost/testing/testing_image.jpg'
                        ],
                        warehouse_id: 99,
                        location_label: 'Jakarta',
                        reference_link: [
                            'google.com',
                            'amazon.com'
                        ],
                        warranty_option: 'official_warranty',
                        warranty_period: 'month',
                        warranty_limit: 1,
                        warranty_coverage: 'Box',
                        is_indent: 1,
                        indent_period: 'week',
                        indent_limit: 2,
                        is_decimal: 1,
                        down_payment_type: 0,
                        down_payment_value: 0
                    }
                ]
            }
        };

        const result = yield Methods.postProduct(data, context);
        const expected = {
            data: {
                product_group_id: 2,
                product_variant: [
                    {
                        id: 9,
                        sku: '0EBNFN5BKR'
                    },
                    {
                        id: 9,
                        sku: '0EBNFN5BKR'
                    }
                ],
                product_vendor: [
                    {
                        id: 11,
                        vendor_id: 3
                    },
                    {
                        id: 11,
                        vendor_id: 3
                    }
                ]
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
        t.fail();
    }
});

test.serial('Should be return success B', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findOneDetail').resolves(false);
    t.context.sandbox.stub(ProductGroupRepository, 'findByIdWithDetail').resolves({
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
        primary_image: '',
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        created_at: '2017-12-19T14:59:19.000Z',
        updated_at: '2018-01-12T10:40:43.000Z',
        Brand: {
            id: 81,
            name: 'Apple',
            image_url: null,
            created_at: '2017-11-28T14:54:10.000Z',
            updated_at: '2017-11-28T14:54:10.000Z'
        },
        Uom: {
            id: 1,
            name: 'Unit',
            created_at: '2017-12-05T16:59:10.000Z',
            updated_at: '2017-12-05T16:59:10.000Z'
        },
        StockingUom: {
            id: 1,
            name: 'Box',
            created_at: '2017-12-05T16:55:00.000Z',
            updated_at: '2017-12-20T05:49:50.000Z'
        },
        ProductGroupAttributes: [
            {
                id: 1,
                product_group_id: 2,
                attribute_code_id: 1,
                attribute_value_id: null,
                text_input: null,
                is_variant: 1,
                created_at: '2017-12-19T08:01:09.000Z',
                updated_at: '2017-12-19T08:01:09.000Z',
                AttributeCode: {
                    id: 1,
                    code: 'phone_color',
                    label: 'Warna',
                    type: 'dropdown',
                    created_at: '2017-12-19T10:34:50.000Z',
                    updated_at: '2017-12-19T10:34:53.000Z',
                    AttributeValues: [
                        {
                            id: 1,
                            attribute_code_id: 1,
                            value: 'Silver',
                            image_url: null,
                            created_at: '2017-12-19T10:39:35.000Z',
                            updated_at: '2017-12-19T10:39:38.000Z'
                        },
                        {
                            id: 2,
                            attribute_code_id: 1,
                            value: 'Black',
                            image_url: null,
                            created_at: '2017-12-19T03:40:00.000Z',
                            updated_at: '2017-12-19T03:40:00.000Z'
                        }
                    ]
                },
                AttributeValue: null
            },
            {
                id: 2,
                product_group_id: 2,
                attribute_code_id: 2,
                attribute_value_id: null,
                text_input: null,
                is_variant: 1,
                created_at: '2017-12-19T08:01:19.000Z',
                updated_at: '2017-12-19T08:01:19.000Z',
                AttributeCode: {
                    id: 2,
                    code: 'phone_storage',
                    label: 'Kapasitas',
                    type: 'dropdown',
                    created_at: '2017-12-19T10:35:12.000Z',
                    updated_at: '2017-12-19T10:35:15.000Z',
                    AttributeValues: [
                        {
                            id: 3,
                            attribute_code_id: 2,
                            value: '32GB',
                            image_url: null,
                            created_at: '2017-12-19T03:41:25.000Z',
                            updated_at: '2017-12-19T03:41:25.000Z'
                        },
                        {
                            id: 4,
                            attribute_code_id: 2,
                            value: '64GB',
                            image_url: null,
                            created_at: '2017-12-19T03:41:58.000Z',
                            updated_at: '2017-12-19T03:41:58.000Z'
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
                created_at: '2017-12-19T08:01:38.000Z',
                updated_at: '2017-12-19T08:01:38.000Z',
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
                updated_at: '2017-12-19T08:02:03.000Z',
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
    const callback = t.context.sandbox.stub(ProductVendorRepository, 'createOne');
    callback.onCall(0).resolves({
        getValues() {
            return {
                id: 11,
                vendor_id: 4
            };
        }
    });
    callback.onCall(1).resolves({
        getValues() {
            return {
                id: 11,
                vendor_id: 4
            };
        }
    });
    t.context.sandbox.stub(ProductVariantRepository, 'createOne').resolves({
        id: 9,
        sku: '0EBNFN5BKR'
    });
    t.context.sandbox.stub(ProductVariantRepository, 'findAndCountAll').resolves({
        count: 1,
        rows: [
            {
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
        ]
    });
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves({
        id: 14,
        product_group_id: 2,
        sku: 'ZCK3EML3IV',
        long_name: 'Apple iPhone 7 - Silver - 64GB',
        variant_value: '{"phone_color":1,"phone_storage":4}',
        primary_image: 'http://localhost/testing/testing_image.jpg',
        additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
        product_id_magento: null,
        product_id_netsuite: null,
        is_primary: 0,
        is_discontinue: 0,
        is_active: 1,
        created_at: '2018-01-18T09:16:43.000Z',
        updated_at: '2018-01-18T09:16:43.000Z'
    });
    t.context.sandbox.stub(ProductVendorRepository, 'findOne').resolves(false);
    t.context.sandbox.stub(ProductVariantRepository, 'findCountVariant').resolves({
        count: 0,
        rows: []
    });
    t.context.sandbox.stub(ProductGroupRepository, 'update').resolves(1);
    t.context.sandbox.stub(WebhookRepository, 'trigger').resolves();
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();
    t.context.sandbox.stub(ProductSkuRepository, 'findOne').resolves(null);
    t.context.sandbox.stub(ProductSkuRepository, 'insertOne').resolves(true);
    try {
        const context = {
            user: {
                username: 'vendor2@test.com',
                first_name: 'Bambang',
                last_name: 'Widodo',
                scope: 'organization',
                customer: {
                    organization_name: 'PT Vendor Jaya Tbk.',
                    organization_id: 4,
                    person_id: 3,
                    superadmin: 3,
                    roles: [
                        {
                            role_id: 1,
                            name: 'Super Admin'
                        }
                    ]
                },
                addons: [],
                groups: null,
                iat: 1515740579,
                exp: 1515747779
            }
        };
        const data = {
            path: {
                id: '4'
            },
            body: {
                product_group_id: 2,
                products: [
                    {
                        variants: [
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Silver',
                                attribute_value_id: 1
                            },
                            {
                                attribute_id: 2,
                                attribute_code: 'phone_storage',
                                attribute_code_label: 'Kapasitas',
                                attribute_value_name: '64GB',
                                attribute_value_id: 4
                            }
                        ],
                        variant_value: {
                            phone_color: '2',
                            phone_storage: '3'
                        },
                        sku_vendor: '111111111',
                        tier_min_qty_1: '5',
                        tier_min_qty_2: '10',
                        tier_min_qty_3: '15',
                        tier_cogs_price_1: '15000000',
                        tier_cogs_price_2: '14500000',
                        tier_cogs_price_3: '14000000',
                        stock: 0,
                        primary_image: 'http://localhost/testing/testing_image.jpg',
                        additional_image: [
                            'http://localhost/testing/testing_image.jpg',
                            'http://localhost/testing/testing_image.jpg'
                        ],
                        warehouse_id: 99,
                        location_label: 'Jakarta',
                        reference_link: [
                            'google.com',
                            'amazon.com'
                        ],
                        warranty_option: 'official_warranty',
                        warranty_period: 'month',
                        warranty_limit: 1,
                        warranty_coverage: 'Box',
                        is_indent: 1,
                        indent_period: 'week',
                        indent_limit: 2,
                        is_decimal: 0,
                        down_payment_type: 0,
                        down_payment_value: 0
                    },
                    {
                        variants: [
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Green',
                                attribute_value_id: 2
                            },
                            {
                                attribute_id: 2,
                                attribute_code: 'phone_storage',
                                attribute_code_label: 'Kapasitas',
                                attribute_value_name: '64GB',
                                attribute_value_id: 4
                            }
                        ],
                        variant_value: {
                            phone_color: '2',
                            phone_storage: '3'
                        },
                        sku_vendor: '111111111',
                        tier_min_qty_1: '5',
                        tier_min_qty_2: '10',
                        tier_min_qty_3: '15',
                        tier_cogs_price_1: '15000000',
                        tier_cogs_price_2: '14500000',
                        tier_cogs_price_3: '14000000',
                        stock: 1,
                        primary_image: 'http://localhost/testing/testing_image.jpg',
                        additional_image: [
                            'http://localhost/testing/testing_image.jpg',
                            'http://localhost/testing/testing_image.jpg'
                        ],
                        warehouse_id: 99,
                        location_label: 'Jakarta',
                        reference_link: [
                            'google.com',
                            'amazon.com'
                        ],
                        warranty_option: 'official_warranty',
                        warranty_period: 'month',
                        warranty_limit: 1,
                        warranty_coverage: 'Box',
                        is_indent: 0,
                        indent_period: '',
                        indent_limit: '',
                        is_decimal: 0,
                        down_payment_type: 0,
                        down_payment_value: 0
                    }
                ]
            }
        };

        const result = yield Methods.postProduct(data, context);
        const expected = {
            data: {
                product_group_id: 2,
                product_variant: [],
                product_vendor: [
                    {
                        id: 11,
                        vendor_id: 4
                    },
                    {
                        id: 11,
                        vendor_id: 4
                    }
                ]
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
        t.fail();
    }
});

test.serial('Should be return is new variant', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findOneDetail').resolves(false);
    t.context.sandbox.stub(ProductGroupRepository, 'findByIdWithDetail').resolves({
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
        updated_at: '2018-01-12T10:40:43.000Z',
        Brand: {
            id: 81,
            name: 'Apple',
            image_url: null,
            created_at: '2017-11-28T14:54:10.000Z',
            updated_at: '2017-11-28T14:54:10.000Z'
        },
        Uom: {
            id: 1,
            name: 'Unit',
            created_at: '2017-12-05T16:59:10.000Z',
            updated_at: '2017-12-05T16:59:10.000Z'
        },
        StockingUom: {
            id: 1,
            name: 'Box',
            created_at: '2017-12-05T16:55:00.000Z',
            updated_at: '2017-12-20T05:49:50.000Z'
        },
        ProductGroupAttributes: [
            {
                id: 1,
                product_group_id: 2,
                attribute_code_id: 1,
                attribute_value_id: null,
                text_input: null,
                is_variant: 1,
                created_at: '2017-12-19T08:01:09.000Z',
                updated_at: '2017-12-19T08:01:09.000Z',
                AttributeCode: {
                    id: 1,
                    code: 'phone_color',
                    label: 'Warna',
                    type: 'dropdown',
                    created_at: '2017-12-19T10:34:50.000Z',
                    updated_at: '2017-12-19T10:34:53.000Z',
                    AttributeValues: [
                        {
                            id: 1,
                            attribute_code_id: 1,
                            value: 'Silver',
                            image_url: null,
                            created_at: '2017-12-19T10:39:35.000Z',
                            updated_at: '2017-12-19T10:39:38.000Z'
                        },
                        {
                            id: 2,
                            attribute_code_id: 1,
                            value: 'Black',
                            image_url: null,
                            created_at: '2017-12-19T03:40:00.000Z',
                            updated_at: '2017-12-19T03:40:00.000Z'
                        }
                    ]
                },
                AttributeValue: null
            },
            {
                id: 2,
                product_group_id: 2,
                attribute_code_id: 2,
                attribute_value_id: null,
                text_input: null,
                is_variant: 1,
                created_at: '2017-12-19T08:01:19.000Z',
                updated_at: '2017-12-19T08:01:19.000Z',
                AttributeCode: {
                    id: 2,
                    code: 'phone_storage',
                    label: 'Kapasitas',
                    type: 'dropdown',
                    created_at: '2017-12-19T10:35:12.000Z',
                    updated_at: '2017-12-19T10:35:15.000Z',
                    AttributeValues: [
                        {
                            id: 3,
                            attribute_code_id: 2,
                            value: '32GB',
                            image_url: null,
                            created_at: '2017-12-19T03:41:25.000Z',
                            updated_at: '2017-12-19T03:41:25.000Z'
                        },
                        {
                            id: 4,
                            attribute_code_id: 2,
                            value: '64GB',
                            image_url: null,
                            created_at: '2017-12-19T03:41:58.000Z',
                            updated_at: '2017-12-19T03:41:58.000Z'
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
                created_at: '2017-12-19T08:01:38.000Z',
                updated_at: '2017-12-19T08:01:38.000Z',
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
                updated_at: '2017-12-19T08:02:03.000Z',
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
    t.context.sandbox.stub(PremoderationRepository, 'insertOne').resolves([]);
    t.context.sandbox.stub(ProductSkuRepository, 'findOne').resolves(null);
    t.context.sandbox.stub(ProductSkuRepository, 'insertOne').resolves(true);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3'
            },
            body: {
                product_group_id: '2',
                products: [
                    {
                        variants: [
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Maroon',
                                attribute_value_id: 0
                            },
                            {
                                attribute_id: 2,
                                attribute_code: 'phone_storage',
                                attribute_code_label: 'Kapasitas',
                                attribute_value_name: '64GB',
                                attribute_value_id: 4
                            }
                        ],
                        variant_value: {
                            phone_color: '2',
                            phone_storage: '3'
                        },
                        sku_vendor: '111111111',
                        tier_min_qty_1: '5',
                        tier_min_qty_2: '10',
                        tier_min_qty_3: '15',
                        tier_cogs_price_1: '15000000',
                        tier_cogs_price_2: '14500000',
                        tier_cogs_price_3: '14000000',
                        stock: 0,
                        primary_image: 'http://localhost/testing/testing_image.jpg',
                        additional_image: [
                            'http://localhost/testing/testing_image.jpg',
                            'http://localhost/testing/testing_image.jpg'
                        ],
                        warehouse_id: 99,
                        location_label: 'Jakarta',
                        reference_link: [
                            'google.com',
                            'amazon.com'
                        ],
                        warranty_option: 'official_warranty',
                        warranty_period: 'month',
                        warranty_limit: 1,
                        warranty_coverage: 'Box',
                        is_indent: 1,
                        indent_period: 'week',
                        indent_limit: 2,
                        is_decimal: 0,
                        down_payment_type: 0,
                        down_payment_value: 0
                    }
                ]
            }
        };

        const result = yield Methods.postProduct(data, context);
        const expected = {
            data: {
                id: result.data.id,
                type: result.data.type,
                premoderation_status: result.data.premoderation_status,
                created_at: result.data.created_at,
                updated_at: result.data.updated_at
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
        t.fail();
    }
});


test.serial('Should be return product group not found', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findOneDetail').resolves(false);
    t.context.sandbox.stub(ProductGroupRepository, 'findByIdWithDetail').resolves(false);
    t.context.sandbox.stub(ProductSkuRepository, 'findOne').resolves(null);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3'
            },
            body: {
                product_group_id: '12314234254',
                products: [
                    {
                        variants: [
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Gold',
                                attribute_value_id: 2
                            },
                            {
                                attribute_id: 2,
                                attribute_code: 'phone_storage',
                                attribute_code_label: 'Kapasitas',
                                attribute_value_name: '64GB',
                                attribute_value_id: 4
                            }
                        ],
                        variant_value: {
                            phone_color: '2',
                            phone_storage: '3'
                        },
                        sku_vendor: '111111111',
                        tier_min_qty_1: '5',
                        tier_min_qty_2: '10',
                        tier_min_qty_3: '15',
                        tier_cogs_price_1: '15000000',
                        tier_cogs_price_2: '14500000',
                        tier_cogs_price_3: '14000000',
                        stock: 1,
                        primary_image: 'http://localhost/testing/testing_image.jpg',
                        additional_image: [
                            'http://localhost/testing/testing_image.jpg',
                            'http://localhost/testing/testing_image.jpg'
                        ],
                        warehouse_id: 99,
                        location_label: 'Jakarta',
                        reference_link: [
                            'google.com',
                            'amazon.com'
                        ],
                        warranty_option: 'official_warranty',
                        warranty_period: 'month',
                        warranty_limit: 1,
                        warranty_coverage: 'Box',
                        is_indent: 0,
                        indent_period: '',
                        indent_limit: '',
                        is_decimal: 0,
                        down_payment_type: 0,
                        down_payment_value: 0
                    },
                    {
                        variants: [
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Green',
                                attribute_value_id: 2
                            },
                            {
                                attribute_id: 2,
                                attribute_code: 'phone_storage',
                                attribute_code_label: 'Kapasitas',
                                attribute_value_name: '64GB',
                                attribute_value_id: 4
                            }
                        ],
                        variant_value: {
                            phone_color: '2',
                            phone_storage: '3'
                        },
                        sku_vendor: '111111111',
                        tier_min_qty_1: '5',
                        tier_min_qty_2: '10',
                        tier_min_qty_3: '15',
                        tier_cogs_price_1: '15000000',
                        tier_cogs_price_2: '14500000',
                        tier_cogs_price_3: '14000000',
                        stock: 0,
                        primary_image: 'http://localhost/testing/testing_image.jpg',
                        additional_image: [
                            'http://localhost/testing/testing_image.jpg',
                            'http://localhost/testing/testing_image.jpg'
                        ],
                        warehouse_id: 99,
                        location_label: 'Jakarta',
                        reference_link: [
                            'google.com',
                            'amazon.com'
                        ],
                        warranty_option: 'official_warranty',
                        warranty_period: 'month',
                        warranty_limit: 1,
                        warranty_coverage: 'Box',
                        is_indent: 1,
                        indent_period: 'week',
                        indent_limit: 2,
                        is_decimal: 0,
                        down_payment_type: 0,
                        down_payment_value: 0
                    }
                ]
            }
        };

        yield Methods.postProduct(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'Product Not Found');
    }
});

test.serial('Should be return SKU already used', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findOneDetail').resolves(true);
    t.context.sandbox.stub(ProductGroupRepository, 'findByIdWithDetail').resolves({
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
        updated_at: '2018-01-12T10:40:43.000Z',
        Brand: {
            id: 81,
            name: 'Apple',
            image_url: null,
            created_at: '2017-11-28T14:54:10.000Z',
            updated_at: '2017-11-28T14:54:10.000Z'
        },
        Uom: {
            id: 1,
            name: 'Unit',
            created_at: '2017-12-05T16:59:10.000Z',
            updated_at: '2017-12-05T16:59:10.000Z'
        },
        StockingUom: {
            id: 1,
            name: 'Box',
            created_at: '2017-12-05T16:55:00.000Z',
            updated_at: '2017-12-20T05:49:50.000Z'
        },
        ProductGroupAttributes: [
            {
                id: 1,
                product_group_id: 2,
                attribute_code_id: 1,
                attribute_value_id: null,
                text_input: null,
                is_variant: 1,
                created_at: '2017-12-19T08:01:09.000Z',
                updated_at: '2017-12-19T08:01:09.000Z',
                AttributeCode: {
                    id: 1,
                    code: 'phone_color',
                    label: 'Warna',
                    type: 'dropdown',
                    created_at: '2017-12-19T10:34:50.000Z',
                    updated_at: '2017-12-19T10:34:53.000Z',
                    AttributeValues: [
                        {
                            id: 1,
                            attribute_code_id: 1,
                            value: 'Silver',
                            image_url: null,
                            created_at: '2017-12-19T10:39:35.000Z',
                            updated_at: '2017-12-19T10:39:38.000Z'
                        },
                        {
                            id: 2,
                            attribute_code_id: 1,
                            value: 'Black',
                            image_url: null,
                            created_at: '2017-12-19T03:40:00.000Z',
                            updated_at: '2017-12-19T03:40:00.000Z'
                        }
                    ]
                },
                AttributeValue: null
            },
            {
                id: 2,
                product_group_id: 2,
                attribute_code_id: 2,
                attribute_value_id: null,
                text_input: null,
                is_variant: 1,
                created_at: '2017-12-19T08:01:19.000Z',
                updated_at: '2017-12-19T08:01:19.000Z',
                AttributeCode: {
                    id: 2,
                    code: 'phone_storage',
                    label: 'Kapasitas',
                    type: 'dropdown',
                    created_at: '2017-12-19T10:35:12.000Z',
                    updated_at: '2017-12-19T10:35:15.000Z',
                    AttributeValues: [
                        {
                            id: 3,
                            attribute_code_id: 2,
                            value: '32GB',
                            image_url: null,
                            created_at: '2017-12-19T03:41:25.000Z',
                            updated_at: '2017-12-19T03:41:25.000Z'
                        },
                        {
                            id: 4,
                            attribute_code_id: 2,
                            value: '64GB',
                            image_url: null,
                            created_at: '2017-12-19T03:41:58.000Z',
                            updated_at: '2017-12-19T03:41:58.000Z'
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
                created_at: '2017-12-19T08:01:38.000Z',
                updated_at: '2017-12-19T08:01:38.000Z',
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
                updated_at: '2017-12-19T08:02:03.000Z',
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
    const callback = t.context.sandbox.stub(ProductVendorRepository, 'createOne');
    callback.onCall(0).resolves({
        getValues() {
            return {
                id: 11,
                vendor_id: 3
            };
        }
    });
    callback.onCall(1).resolves({
        getValues() {
            return {
                id: 11,
                vendor_id: 3
            };
        }
    });
    t.context.sandbox.stub(ProductVariantRepository, 'createOne').resolves({
        getValues() {
            return {
                id: 9,
                sku: '0EBNFN5BKR'
            };
        }
    });
    t.context.sandbox.stub(ProductVariantRepository, 'findAndCountAll').resolves({
        count: 1,
        rows: [
            {
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
        ]
    });
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves(false);
    t.context.sandbox.stub(ProductVariantRepository, 'findCountVariant').resolves({
        count: 0,
        rows: []
    });
    t.context.sandbox.stub(ProductGroupRepository, 'update').resolves(1);
    t.context.sandbox.stub(WebhookRepository, 'trigger').resolves();
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();
    t.context.sandbox.stub(ProductSkuRepository, 'findOne').resolves(false);
    t.context.sandbox.stub(ProductSkuRepository, 'insertOne').resolves(true);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3'
            },
            body: {
                product_group_id: '12314234254',
                products: [
                    {
                        variants: [
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Gold',
                                attribute_value_id: 2
                            },
                            {
                                attribute_id: 2,
                                attribute_code: 'phone_storage',
                                attribute_code_label: 'Kapasitas',
                                attribute_value_name: '64GB',
                                attribute_value_id: 4
                            }
                        ],
                        variant_value: {
                            phone_color: '2',
                            phone_storage: '3'
                        },
                        sku_vendor: '111111111',
                        tier_min_qty_1: '5',
                        tier_min_qty_2: '10',
                        tier_min_qty_3: '15',
                        tier_cogs_price_1: '15000000',
                        tier_cogs_price_2: '14500000',
                        tier_cogs_price_3: '14000000',
                        stock: 1,
                        primary_image: 'http://localhost/testing/testing_image.jpg',
                        additional_image: [
                            'http://localhost/testing/testing_image.jpg',
                            'http://localhost/testing/testing_image.jpg'
                        ],
                        warehouse_id: 99,
                        location_label: 'Jakarta',
                        reference_link: [
                            'google.com',
                            'amazon.com'
                        ],
                        warranty_option: 'official_warranty',
                        warranty_period: 'month',
                        warranty_limit: 1,
                        warranty_coverage: 'Box',
                        is_indent: 1,
                        indent_period: 'week',
                        indent_limit: 2,
                        is_decimal: 0,
                        down_payment_type: 0,
                        down_payment_value: 0
                    },
                    {
                        variants: [
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Green',
                                attribute_value_id: 2
                            },
                            {
                                attribute_id: 2,
                                attribute_code: 'phone_storage',
                                attribute_code_label: 'Kapasitas',
                                attribute_value_name: '64GB',
                                attribute_value_id: 4
                            }
                        ],
                        variant_value: {
                            phone_color: '2',
                            phone_storage: '3'
                        },
                        sku_vendor: '111111111',
                        tier_min_qty_1: '5',
                        tier_min_qty_2: '10',
                        tier_min_qty_3: '15',
                        tier_cogs_price_1: '15000000',
                        tier_cogs_price_2: '14500000',
                        tier_cogs_price_3: '14000000',
                        stock: 1,
                        primary_image: 'http://localhost/testing/testing_image.jpg',
                        additional_image: [
                            'http://localhost/testing/testing_image.jpg',
                            'http://localhost/testing/testing_image.jpg'
                        ],
                        warehouse_id: 99,
                        location_label: 'Jakarta',
                        reference_link: [
                            'google.com',
                            'amazon.com'
                        ],
                        warranty_option: 'official_warranty',
                        warranty_period: 'month',
                        warranty_limit: 1,
                        warranty_coverage: 'Box',
                        is_indent: 1,
                        indent_period: 'week',
                        indent_limit: 2,
                        is_decimal: 0,
                        down_payment_type: 0,
                        down_payment_value: 0
                    }
                ]
            }
        };

        yield Methods.postProduct(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'SKU already used');
    }
});


test.serial('Should be return SKU can not contains symbol', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findOneDetail').resolves(true);
    t.context.sandbox.stub(ProductGroupRepository, 'findByIdWithDetail').resolves({
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
        updated_at: '2018-01-12T10:40:43.000Z',
        Brand: {
            id: 81,
            name: 'Apple',
            image_url: null,
            created_at: '2017-11-28T14:54:10.000Z',
            updated_at: '2017-11-28T14:54:10.000Z'
        },
        Uom: {
            id: 1,
            name: 'Unit',
            created_at: '2017-12-05T16:59:10.000Z',
            updated_at: '2017-12-05T16:59:10.000Z'
        },
        StockingUom: {
            id: 1,
            name: 'Box',
            created_at: '2017-12-05T16:55:00.000Z',
            updated_at: '2017-12-20T05:49:50.000Z'
        },
        ProductGroupAttributes: [
            {
                id: 1,
                product_group_id: 2,
                attribute_code_id: 1,
                attribute_value_id: null,
                text_input: null,
                is_variant: 1,
                created_at: '2017-12-19T08:01:09.000Z',
                updated_at: '2017-12-19T08:01:09.000Z',
                AttributeCode: {
                    id: 1,
                    code: 'phone_color',
                    label: 'Warna',
                    type: 'dropdown',
                    created_at: '2017-12-19T10:34:50.000Z',
                    updated_at: '2017-12-19T10:34:53.000Z',
                    AttributeValues: [
                        {
                            id: 1,
                            attribute_code_id: 1,
                            value: 'Silver',
                            image_url: null,
                            created_at: '2017-12-19T10:39:35.000Z',
                            updated_at: '2017-12-19T10:39:38.000Z'
                        },
                        {
                            id: 2,
                            attribute_code_id: 1,
                            value: 'Black',
                            image_url: null,
                            created_at: '2017-12-19T03:40:00.000Z',
                            updated_at: '2017-12-19T03:40:00.000Z'
                        }
                    ]
                },
                AttributeValue: null
            },
            {
                id: 2,
                product_group_id: 2,
                attribute_code_id: 2,
                attribute_value_id: null,
                text_input: null,
                is_variant: 1,
                created_at: '2017-12-19T08:01:19.000Z',
                updated_at: '2017-12-19T08:01:19.000Z',
                AttributeCode: {
                    id: 2,
                    code: 'phone_storage',
                    label: 'Kapasitas',
                    type: 'dropdown',
                    created_at: '2017-12-19T10:35:12.000Z',
                    updated_at: '2017-12-19T10:35:15.000Z',
                    AttributeValues: [
                        {
                            id: 3,
                            attribute_code_id: 2,
                            value: '32GB',
                            image_url: null,
                            created_at: '2017-12-19T03:41:25.000Z',
                            updated_at: '2017-12-19T03:41:25.000Z'
                        },
                        {
                            id: 4,
                            attribute_code_id: 2,
                            value: '64GB',
                            image_url: null,
                            created_at: '2017-12-19T03:41:58.000Z',
                            updated_at: '2017-12-19T03:41:58.000Z'
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
                created_at: '2017-12-19T08:01:38.000Z',
                updated_at: '2017-12-19T08:01:38.000Z',
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
                updated_at: '2017-12-19T08:02:03.000Z',
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
    const callback = t.context.sandbox.stub(ProductVendorRepository, 'createOne');
    callback.onCall(0).resolves({
        getValues() {
            return {
                id: 11,
                vendor_id: 3
            };
        }
    });
    callback.onCall(1).resolves({
        getValues() {
            return {
                id: 11,
                vendor_id: 3
            };
        }
    });
    t.context.sandbox.stub(ProductVariantRepository, 'createOne').resolves({
        getValues() {
            return {
                id: 9,
                sku: '0EBNFN5BKR'
            };
        }
    });
    t.context.sandbox.stub(ProductVariantRepository, 'findAndCountAll').resolves({
        count: 1,
        rows: [
            {
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
        ]
    });
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves(false);
    t.context.sandbox.stub(ProductVariantRepository, 'findCountVariant').resolves({
        count: 0,
        rows: []
    });
    t.context.sandbox.stub(ProductGroupRepository, 'update').resolves(1);
    t.context.sandbox.stub(WebhookRepository, 'trigger').resolves();
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();
    t.context.sandbox.stub(ProductSkuRepository, 'findOne').resolves(false);
    t.context.sandbox.stub(ProductSkuRepository, 'insertOne').resolves(true);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3'
            },
            body: {
                product_group_id: '12314234254',
                products: [
                    {
                        variants: [
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Gold',
                                attribute_value_id: 2
                            },
                            {
                                attribute_id: 2,
                                attribute_code: 'phone_storage',
                                attribute_code_label: 'Kapasitas',
                                attribute_value_name: '64GB',
                                attribute_value_id: 4
                            }
                        ],
                        variant_value: {
                            phone_color: '2',
                            phone_storage: '3'
                        },
                        sku_vendor: '1111111###11',
                        tier_min_qty_1: '5',
                        tier_min_qty_2: '10',
                        tier_min_qty_3: '15',
                        tier_cogs_price_1: '15000000',
                        tier_cogs_price_2: '14500000',
                        tier_cogs_price_3: '14000000',
                        stock: 1,
                        primary_image: 'http://localhost/testing/testing_image.jpg',
                        additional_image: [
                            'http://localhost/testing/testing_image.jpg',
                            'http://localhost/testing/testing_image.jpg'
                        ],
                        warehouse_id: 99,
                        location_label: 'Jakarta',
                        reference_link: [
                            'google.com',
                            'amazon.com'
                        ],
                        warranty_option: 'official_warranty',
                        warranty_period: 'month',
                        warranty_limit: 1,
                        warranty_coverage: 'Box',
                        is_indent: 1,
                        indent_period: 'week',
                        indent_limit: 2,
                        is_decimal: 0,
                        down_payment_type: 0,
                        down_payment_value: 0
                    },
                    {
                        variants: [
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Green',
                                attribute_value_id: 2
                            },
                            {
                                attribute_id: 2,
                                attribute_code: 'phone_storage',
                                attribute_code_label: 'Kapasitas',
                                attribute_value_name: '64GB',
                                attribute_value_id: 4
                            }
                        ],
                        variant_value: {
                            phone_color: '2',
                            phone_storage: '3'
                        },
                        sku_vendor: '111111111',
                        tier_min_qty_1: '5',
                        tier_min_qty_2: '10',
                        tier_min_qty_3: '15',
                        tier_cogs_price_1: '15000000',
                        tier_cogs_price_2: '14500000',
                        tier_cogs_price_3: '14000000',
                        stock: 1,
                        primary_image: 'http://localhost/testing/testing_image.jpg',
                        additional_image: [
                            'http://localhost/testing/testing_image.jpg',
                            'http://localhost/testing/testing_image.jpg'
                        ],
                        warehouse_id: 99,
                        location_label: 'Jakarta',
                        reference_link: [
                            'google.com',
                            'amazon.com'
                        ],
                        warranty_option: 'official_warranty',
                        warranty_period: 'month',
                        warranty_limit: 1,
                        warranty_coverage: 'Box',
                        is_indent: 1,
                        indent_period: 'week',
                        indent_limit: 2,
                        is_decimal: 0,
                        down_payment_type: 0,
                        down_payment_value: 0
                    }
                ]
            }
        };

        yield Methods.postProduct(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'SKU already used');
    }
});

test.serial('Should be return authorized user', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findOneDetail').resolves(false);
    t.context.sandbox.stub(ProductSkuRepository, 'findOne').resolves(false);
    try {
        const context = {
            user: ''
        };
        const data = {
            path: {
                id: '3'
            },
            body: {
                product_group_id: '2',
                products: [
                    {
                        variants: [
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Gold',
                                attribute_value_id: 2
                            },
                            {
                                attribute_id: 2,
                                attribute_code: 'phone_storage',
                                attribute_code_label: 'Kapasitas',
                                attribute_value_name: '64GB',
                                attribute_value_id: 4
                            }
                        ],
                        variant_value: {
                            phone_color: '2',
                            phone_storage: '3'
                        },
                        sku_vendor: '111111111',
                        tier_min_qty_1: 0,
                        tier_min_qty_2: 0,
                        tier_min_qty_3: 0,
                        tier_cogs_price_1: 0,
                        tier_cogs_price_2: 0,
                        tier_cogs_price_3: 0,
                        stock: 1,
                        primary_image: 'http://localhost/testing/testing_image.jpg',
                        additional_image: [
                            'http://localhost/testing/testing_image.jpg',
                            'http://localhost/testing/testing_image.jpg'
                        ],
                        warehouse_id: 99,
                        location_label: 'Jakarta',
                        reference_link: [
                            'google.com',
                            'amazon.com'
                        ],
                        warranty_option: 'official_warranty',
                        warranty_period: 'month',
                        warranty_limit: 1,
                        warranty_coverage: 'Box',
                        is_indent: 1,
                        indent_period: 'week',
                        indent_limit: 2,
                        is_decimal: 0,
                        down_payment_type: 0,
                        down_payment_value: 0
                    },
                    {
                        variants: [
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Green',
                                attribute_value_id: 2
                            },
                            {
                                attribute_id: 2,
                                attribute_code: 'phone_storage',
                                attribute_code_label: 'Kapasitas',
                                attribute_value_name: '64GB',
                                attribute_value_id: 4
                            }
                        ],
                        variant_value: {
                            phone_color: '2',
                            phone_storage: '3'
                        },
                        sku_vendor: '111111111',
                        tier_min_qty_1: 0,
                        tier_min_qty_2: 0,
                        tier_min_qty_3: 0,
                        tier_cogs_price_1: 0,
                        tier_cogs_price_2: 0,
                        tier_cogs_price_3: 0,
                        stock: 1,
                        primary_image: 'http://localhost/testing/testing_image.jpg',
                        additional_image: [
                            'http://localhost/testing/testing_image.jpg',
                            'http://localhost/testing/testing_image.jpg'
                        ],
                        warehouse_id: 99,
                        location_label: 'Jakarta',
                        reference_link: [
                            'google.com',
                            'amazon.com'
                        ],
                        warranty_option: 'official_warranty',
                        warranty_period: 'month',
                        warranty_limit: 1,
                        warranty_coverage: 'Box',
                        is_indent: 1,
                        indent_period: 'week',
                        indent_limit: 2,
                        is_decimal: 0,
                        down_payment_type: 0,
                        down_payment_value: 0
                    }
                ]
            }
        };

        yield Methods.postProduct(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, 'You are not authorized user');
    }
});

test.serial('Should be return Product Variant Already Exists', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findOneDetail').resolves(false);
    t.context.sandbox.stub(ProductGroupRepository, 'findByIdWithDetail').resolves({
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
        updated_at: '2018-01-12T10:40:43.000Z',
        Brand: {
            id: 81,
            name: 'Apple',
            image_url: null,
            created_at: '2017-11-28T14:54:10.000Z',
            updated_at: '2017-11-28T14:54:10.000Z'
        },
        Uom: {
            id: 1,
            name: 'Unit',
            created_at: '2017-12-05T16:59:10.000Z',
            updated_at: '2017-12-05T16:59:10.000Z'
        },
        StockingUom: {
            id: 1,
            name: 'Box',
            created_at: '2017-12-05T16:55:00.000Z',
            updated_at: '2017-12-20T05:49:50.000Z'
        },
        ProductGroupAttributes: [
            {
                id: 1,
                product_group_id: 2,
                attribute_code_id: 1,
                attribute_value_id: null,
                text_input: null,
                is_variant: 1,
                created_at: '2017-12-19T08:01:09.000Z',
                updated_at: '2017-12-19T08:01:09.000Z',
                AttributeCode: {
                    id: 1,
                    code: 'phone_color',
                    label: 'Warna',
                    type: 'dropdown',
                    created_at: '2017-12-19T10:34:50.000Z',
                    updated_at: '2017-12-19T10:34:53.000Z',
                    AttributeValues: [
                        {
                            id: 1,
                            attribute_code_id: 1,
                            value: 'Silver',
                            image_url: null,
                            created_at: '2017-12-19T10:39:35.000Z',
                            updated_at: '2017-12-19T10:39:38.000Z'
                        },
                        {
                            id: 2,
                            attribute_code_id: 1,
                            value: 'Black',
                            image_url: null,
                            created_at: '2017-12-19T03:40:00.000Z',
                            updated_at: '2017-12-19T03:40:00.000Z'
                        }
                    ]
                },
                AttributeValue: null
            },
            {
                id: 2,
                product_group_id: 2,
                attribute_code_id: 2,
                attribute_value_id: null,
                text_input: null,
                is_variant: 1,
                created_at: '2017-12-19T08:01:19.000Z',
                updated_at: '2017-12-19T08:01:19.000Z',
                AttributeCode: {
                    id: 2,
                    code: 'phone_storage',
                    label: 'Kapasitas',
                    type: 'dropdown',
                    created_at: '2017-12-19T10:35:12.000Z',
                    updated_at: '2017-12-19T10:35:15.000Z',
                    AttributeValues: [
                        {
                            id: 3,
                            attribute_code_id: 2,
                            value: '32GB',
                            image_url: null,
                            created_at: '2017-12-19T03:41:25.000Z',
                            updated_at: '2017-12-19T03:41:25.000Z'
                        },
                        {
                            id: 4,
                            attribute_code_id: 2,
                            value: '64GB',
                            image_url: null,
                            created_at: '2017-12-19T03:41:58.000Z',
                            updated_at: '2017-12-19T03:41:58.000Z'
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
                created_at: '2017-12-19T08:01:38.000Z',
                updated_at: '2017-12-19T08:01:38.000Z',
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
                updated_at: '2017-12-19T08:02:03.000Z',
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
        ]
    });
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves({
        id: 12,
        product_group_id: 2,
        sku: 'MT7EHNDO65',
        long_name: 'Apple iPhone 7 - Silver - 64GB',
        variant_value: '{"phone_color":1,"phone_storage":4}',
        primary_image: 'http://localhost/testing/testing_image.jpg',
        additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
        product_id_magento: null,
        product_id_netsuite: null,
        is_primary: 0,
        is_discontinue: 0,
        is_active: 1,
        created_at: '2018-01-18T08:20:32.000Z',
        updated_at: '2018-01-18T08:20:32.000Z'
    });
    t.context.sandbox.stub(ProductVariantRepository, 'findAndCountAll').resolves({
        count: 2,
        rows: [
            {
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
            {
                id: 12,
                product_group_id: 2,
                sku: 'MT7EHNDO65',
                long_name: 'Apple iPhone 7 - Silver - 64GB',
                variant_value: '{"phone_color":1,"phone_storage":4}',
                primary_image: 'http://localhost/testing/testing_image.jpg',
                additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
                product_id_magento: null,
                product_id_netsuite: null,
                is_primary: 0,
                is_discontinue: 0,
                is_active: 1,
                created_at: '2018-01-18T08:20:32.000Z',
                updated_at: '2018-01-18T08:20:32.000Z'
            }
        ]
    });
    t.context.sandbox.stub(ProductVendorRepository, 'findOne').resolves({
        id: 15,
        product_variant_id: 12,
        vendor_id: 3,
        warehouse_id: 99,
        location_label: 'Jakarta',
        stock_available: 1,
        stock_used: 0,
        currency: 'IDR',
        tier_min_qty_1: 0,
        tier_min_qty_2: 0,
        tier_min_qty_3: 0,
        tier_cogs_price_1: '0.00',
        tier_cogs_price_2: '0.00',
        tier_cogs_price_3: '0.00',
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
        created_at: '2018-01-18T08:20:32.000Z',
        updated_at: '2018-01-18T08:20:32.000Z',
        ProductVariant: {
            id: 12,
            product_group_id: 2,
            sku: 'MT7EHNDO65',
            long_name: 'Apple iPhone 7 - Silver - 64GB',
            variant_value: '{"phone_color":1,"phone_storage":4}',
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 0,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-18T08:20:32.000Z',
            updated_at: '2018-01-18T08:20:32.000Z'
        }
    });
    t.context.sandbox.stub(ProductVariantRepository, 'findCountVariant').resolves({
        count: 0,
        rows: []
    });
    t.context.sandbox.stub(ProductGroupRepository, 'update').resolves(1);
    t.context.sandbox.stub(ProductSkuRepository, 'findOne').resolves(null);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3'
            },
            body: {
                product_group_id: '2',
                products: [
                    {
                        variants: [
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Black',
                                attribute_value_id: 2
                            },
                            {
                                attribute_id: 2,
                                attribute_code: 'phone_storage',
                                attribute_code_label: 'Kapasitas',
                                attribute_value_name: '64GB',
                                attribute_value_id: 4
                            }
                        ],
                        variant_value: {
                            phone_color: '2',
                            phone_storage: '3'
                        },
                        sku_vendor: '111111111',
                        tier_min_qty_1: '5',
                        tier_min_qty_2: '10',
                        tier_min_qty_3: '15',
                        tier_cogs_price_1: '15000000',
                        tier_cogs_price_2: '14500000',
                        tier_cogs_price_3: '14000000',
                        stock: 1,
                        primary_image: 'http://localhost/testing/testing_image.jpg',
                        additional_image: [
                            'http://localhost/testing/testing_image.jpg',
                            'http://localhost/testing/testing_image.jpg'
                        ],
                        warehouse_id: 99,
                        location_label: 'Jakarta',
                        reference_link: [
                            'google.com',
                            'amazon.com'
                        ],
                        warranty_option: 'official_warranty',
                        warranty_period: 'month',
                        warranty_limit: 1,
                        warranty_coverage: 'Box',
                        is_indent: 1,
                        indent_period: 'week',
                        indent_limit: 2,
                        is_decimal: 0,
                        down_payment_type: 0,
                        down_payment_value: 0
                    },
                    {
                        variants: [
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Green',
                                attribute_value_id: 2
                            },
                            {
                                attribute_id: 2,
                                attribute_code: 'phone_storage',
                                attribute_code_label: 'Kapasitas',
                                attribute_value_name: '64GB',
                                attribute_value_id: 4
                            }
                        ],
                        variant_value: {
                            phone_color: '2',
                            phone_storage: '3'
                        },
                        sku_vendor: '111111111',
                        tier_min_qty_1: '5',
                        tier_min_qty_2: '10',
                        tier_min_qty_3: '15',
                        tier_cogs_price_1: '15000000',
                        tier_cogs_price_2: '14500000',
                        tier_cogs_price_3: '14000000',
                        stock: 1,
                        primary_image: 'http://localhost/testing/testing_image.jpg',
                        additional_image: [
                            'http://localhost/testing/testing_image.jpg',
                            'http://localhost/testing/testing_image.jpg'
                        ],
                        warehouse_id: 99,
                        location_label: 'Jakarta',
                        reference_link: [
                            'google.com',
                            'amazon.com'
                        ],
                        warranty_option: 'official_warranty',
                        warranty_period: 'month',
                        warranty_limit: 1,
                        warranty_coverage: 'Box',
                        is_indent: 1,
                        indent_period: 'week',
                        indent_limit: 2,
                        is_decimal: 0,
                        down_payment_type: 0,
                        down_payment_value: 0
                    }
                ]
            }
        };

        yield Methods.postProduct(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Should be return Bad Request', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findOneDetail').resolves(false);
    t.context.sandbox.stub(ProductSkuRepository, 'findOne').resolves(false);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3'
            },
            body: {
                product_group_id: '',
                products: [
                    {
                        variants: [
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Gold',
                                attribute_value_id: 2
                            },
                            {
                                attribute_id: 2,
                                attribute_code: 'phone_storage',
                                attribute_code_label: 'Kapasitas',
                                attribute_value_name: '64GB',
                                attribute_value_id: 4
                            }
                        ],
                        variant_value: {
                            phone_color: '2',
                            phone_storage: '3'
                        },
                        sku_vendor: '111111111',
                        tier_min_qty_1: '5',
                        tier_min_qty_2: '10',
                        tier_min_qty_3: '15',
                        tier_cogs_price_1: '15000000',
                        tier_cogs_price_2: '14500000',
                        tier_cogs_price_3: '14000000',
                        stock: 1,
                        primary_image: 'http://localhost/testing/testing_image.jpg',
                        additional_image: [
                            'http://localhost/testing/testing_image.jpg',
                            'http://localhost/testing/testing_image.jpg'
                        ],
                        warehouse_id: 99,
                        location_label: 'Jakarta',
                        reference_link: [
                            'google.com',
                            'amazon.com'
                        ],
                        warranty_option: 'official_warranty',
                        warranty_period: 'month',
                        warranty_limit: 1,
                        warranty_coverage: 'Box',
                        is_indent: 1,
                        indent_period: 'week',
                        indent_limit: 2,
                        is_decimal: 0,
                        down_payment_type: 0,
                        down_payment_value: 0
                    },
                    {
                        variants: [
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Green',
                                attribute_value_id: 2
                            },
                            {
                                attribute_id: 2,
                                attribute_code: 'phone_storage',
                                attribute_code_label: 'Kapasitas',
                                attribute_value_name: '64GB',
                                attribute_value_id: 4
                            }
                        ],
                        variant_value: {
                            phone_color: '2',
                            phone_storage: '3'
                        },
                        sku_vendor: '111111111',
                        tier_min_qty_1: '5',
                        tier_min_qty_2: '10',
                        tier_min_qty_3: '15',
                        tier_cogs_price_1: '15000000',
                        tier_cogs_price_2: '14500000',
                        tier_cogs_price_3: '14000000',
                        stock: 1,
                        primary_image: 'http://localhost/testing/testing_image.jpg',
                        additional_image: [
                            'http://localhost/testing/testing_image.jpg',
                            'http://localhost/testing/testing_image.jpg'
                        ],
                        warehouse_id: 99,
                        location_label: 'Jakarta',
                        reference_link: [
                            'google.com',
                            'amazon.com'
                        ],
                        warranty_option: 'official_warranty',
                        warranty_period: 'month',
                        warranty_limit: 1,
                        warranty_coverage: 'Box',
                        is_indent: 1,
                        indent_period: 'week',
                        indent_limit: 2,
                        is_decimal: 0,
                        down_payment_type: 0,
                        down_payment_value: 0
                    }
                ]
            }
        };

        yield Methods.postProduct(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Should be return is new variant with variant data', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findOneDetail').resolves(false);
    t.context.sandbox.stub(ProductGroupRepository, 'findByIdWithDetail').resolves({
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
        barcode: null,
        description: 'Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.\n\nDi iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.',
        primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        created_at: '2017-12-19T14:59:19.000Z',
        updated_at: '2018-01-12T10:40:43.000Z',
        Brand: {
            id: 81,
            name: 'Apple',
            image_url: 'image url',
            created_at: '2017-11-28T14:54:10.000Z',
            updated_at: '2017-11-28T14:54:10.000Z'
        },
        Uom: {
            id: 1,
            name: 'Unit',
            created_at: '2017-12-05T16:59:10.000Z',
            updated_at: '2017-12-05T16:59:10.000Z'
        },
        StockingUom: {
            id: 1,
            name: 'Box',
            created_at: '2017-12-05T16:55:00.000Z',
            updated_at: '2017-12-20T05:49:50.000Z'
        },
        ProductGroupAttributes: [
            {
                id: 1,
                product_group_id: 2,
                attribute_code_id: 1,
                attribute_value_id: null,
                text_input: null,
                is_variant: 1,
                created_at: '2017-12-19T08:01:09.000Z',
                updated_at: '2017-12-19T08:01:09.000Z',
                AttributeCode: {
                    id: 1,
                    code: 'phone_color',
                    label: 'Warna',
                    type: 'dropdown',
                    created_at: '2017-12-19T10:34:50.000Z',
                    updated_at: '2017-12-19T10:34:53.000Z',
                    AttributeValues: [
                        {
                            id: 1,
                            attribute_code_id: 1,
                            value: 'Silver',
                            image_url: null,
                            created_at: '2017-12-19T10:39:35.000Z',
                            updated_at: '2017-12-19T10:39:38.000Z'
                        },
                        {
                            id: 2,
                            attribute_code_id: 1,
                            value: 'Black',
                            image_url: null,
                            created_at: '2017-12-19T03:40:00.000Z',
                            updated_at: '2017-12-19T03:40:00.000Z'
                        }
                    ]
                },
                AttributeValue: null
            },
            {
                id: 2,
                product_group_id: 2,
                attribute_code_id: 2,
                attribute_value_id: null,
                text_input: null,
                is_variant: 1,
                created_at: '2017-12-19T08:01:19.000Z',
                updated_at: '2017-12-19T08:01:19.000Z',
                AttributeCode: {
                    id: 2,
                    code: 'phone_storage',
                    label: 'Kapasitas',
                    type: 'dropdown',
                    created_at: '2017-12-19T10:35:12.000Z',
                    updated_at: '2017-12-19T10:35:15.000Z',
                    AttributeValues: [
                        {
                            id: 3,
                            attribute_code_id: 2,
                            value: '32GB',
                            image_url: null,
                            created_at: '2017-12-19T03:41:25.000Z',
                            updated_at: '2017-12-19T03:41:25.000Z'
                        },
                        {
                            id: 4,
                            attribute_code_id: 2,
                            value: '64GB',
                            image_url: null,
                            created_at: '2017-12-19T03:41:58.000Z',
                            updated_at: '2017-12-19T03:41:58.000Z'
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
                created_at: '2017-12-19T08:01:38.000Z',
                updated_at: '2017-12-19T08:01:38.000Z',
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
                updated_at: '2017-12-19T08:02:03.000Z',
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
    t.context.sandbox.stub(PremoderationRepository, 'insertOne').resolves([]);
    t.context.sandbox.stub(ProductSkuRepository, 'findOne').resolves(false);
    t.context.sandbox.stub(ProductSkuRepository, 'insertOne').resolves(true);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3'
            },
            body: {
                product_group_id: '2',
                products: [
                    {
                        variants: [
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Maroon',
                                attribute_value_id: 0
                            },
                            {
                                attribute_id: 2,
                                attribute_code: 'phone_storage',
                                attribute_code_label: 'Kapasitas',
                                attribute_value_name: '64GB',
                                attribute_value_id: 4
                            }
                        ],
                        variant_value: {
                            phone_color: '2',
                            phone_storage: '3'
                        },
                        sku_vendor: '111111111',
                        tier_min_qty_1: '5',
                        tier_min_qty_2: '10',
                        tier_min_qty_3: '15',
                        tier_cogs_price_1: '15000000',
                        tier_cogs_price_2: '14500000',
                        tier_cogs_price_3: '14000000',
                        stock: 0,
                        primary_image: 'http://localhost/testing/testing_image.jpg',
                        additional_image: [
                            'http://localhost/testing/testing_image.jpg',
                            'http://localhost/testing/testing_image.jpg'
                        ],
                        warehouse_id: 99,
                        location_label: 'Jakarta',
                        reference_link: [
                            'google.com',
                            'amazon.com'
                        ],
                        warranty_option: 'official_warranty',
                        warranty_period: 'month',
                        warranty_limit: 1,
                        warranty_coverage: 'Box',
                        is_indent: 1,
                        indent_period: 'week',
                        indent_limit: 2,
                        is_decimal: 0,
                        down_payment_type: 0,
                        down_payment_value: 0
                    }
                ]
            }
        };

        const result = yield Methods.postProduct(data, context);
        const expected = {
            data: {
                id: result.data.id,
                type: result.data.type,
                premoderation_status: result.data.premoderation_status,
                created_at: result.data.created_at,
                updated_at: result.data.updated_at
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
        t.fail();
    }
});

test.serial('Should be return success with another data', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findOneDetail').resolves(false);
    t.context.sandbox.stub(ProductGroupRepository, 'findByIdWithDetail').resolves({
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
        updated_at: '2018-01-12T10:40:43.000Z',
        Brand: {
            id: 81,
            name: 'Apple',
            image_url: null,
            created_at: '2017-11-28T14:54:10.000Z',
            updated_at: '2017-11-28T14:54:10.000Z'
        },
        Uom: {
            id: 1,
            name: 'Unit',
            created_at: '2017-12-05T16:59:10.000Z',
            updated_at: '2017-12-05T16:59:10.000Z'
        },
        StockingUom: {
            id: 1,
            name: 'Box',
            created_at: '2017-12-05T16:55:00.000Z',
            updated_at: '2017-12-20T05:49:50.000Z'
        },
        ProductGroupAttributes: [
            {
                id: 1,
                product_group_id: 2,
                attribute_code_id: 1,
                attribute_value_id: null,
                text_input: null,
                is_variant: 1,
                created_at: '2017-12-19T08:01:09.000Z',
                updated_at: '2017-12-19T08:01:09.000Z',
                AttributeCode: {
                    id: 1,
                    code: 'phone_color',
                    label: 'Warna',
                    type: 'dropdown',
                    created_at: '2017-12-19T10:34:50.000Z',
                    updated_at: '2017-12-19T10:34:53.000Z',
                    AttributeValues: [
                        {
                            id: 1,
                            attribute_code_id: 1,
                            value: 'Silver',
                            image_url: null,
                            created_at: '2017-12-19T10:39:35.000Z',
                            updated_at: '2017-12-19T10:39:38.000Z'
                        },
                        {
                            id: 2,
                            attribute_code_id: 1,
                            value: 'Black',
                            image_url: null,
                            created_at: '2017-12-19T03:40:00.000Z',
                            updated_at: '2017-12-19T03:40:00.000Z'
                        }
                    ]
                },
                AttributeValue: null
            },
            {
                id: 2,
                product_group_id: 2,
                attribute_code_id: 2,
                attribute_value_id: null,
                text_input: null,
                is_variant: 1,
                created_at: '2017-12-19T08:01:19.000Z',
                updated_at: '2017-12-19T08:01:19.000Z',
                AttributeCode: {
                    id: 2,
                    code: 'phone_storage',
                    label: 'Kapasitas',
                    type: 'dropdown',
                    created_at: '2017-12-19T10:35:12.000Z',
                    updated_at: '2017-12-19T10:35:15.000Z',
                    AttributeValues: [
                        {
                            id: 3,
                            attribute_code_id: 2,
                            value: '32GB',
                            image_url: null,
                            created_at: '2017-12-19T03:41:25.000Z',
                            updated_at: '2017-12-19T03:41:25.000Z'
                        },
                        {
                            id: 4,
                            attribute_code_id: 2,
                            value: '64GB',
                            image_url: null,
                            created_at: '2017-12-19T03:41:58.000Z',
                            updated_at: '2017-12-19T03:41:58.000Z'
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
                created_at: '2017-12-19T08:01:38.000Z',
                updated_at: '2017-12-19T08:01:38.000Z',
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
                updated_at: '2017-12-19T08:02:03.000Z',
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
    const callback = t.context.sandbox.stub(ProductVendorRepository, 'createOne');
    callback.onCall(0).resolves({
        getValues() {
            return false;
        }
    });
    callback.onCall(1).resolves({
        getValues() {
            return false;
        }
    });
    t.context.sandbox.stub(ProductVariantRepository, 'createOne').resolves({
        getValues() {
            return false;
        }
    });
    t.context.sandbox.stub(ProductVariantRepository, 'findAndCountAll').resolves({
        count: 0,
        rows: [
            {
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
        ]
    });
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves(false);
    t.context.sandbox.stub(ProductVariantRepository, 'findCountVariant').resolves({
        count: 0,
        rows: []
    });
    t.context.sandbox.stub(ProductGroupRepository, 'update').resolves(1);
    t.context.sandbox.stub(WebhookRepository, 'trigger').resolves();
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();
    t.context.sandbox.stub(ProductSkuRepository, 'findOne').resolves(false);
    t.context.sandbox.stub(ProductSkuRepository, 'insertOne').resolves(true);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3'
            },
            body: {
                product_group_id: 2,
                products: [
                    {
                        variants: [
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Silver',
                                attribute_value_id: 1
                            },
                            {
                                attribute_id: 2,
                                attribute_code: 'phone_storage',
                                attribute_code_label: 'Kapasitas',
                                attribute_value_name: '64GB',
                                attribute_value_id: 4
                            }
                        ],
                        variant_value: {
                            phone_color: '2',
                            phone_storage: '3'
                        },
                        sku_vendor: '111111111',
                        tier_min_qty_1: '5',
                        tier_min_qty_2: '10',
                        tier_min_qty_3: '15',
                        tier_cogs_price_1: '15000000',
                        tier_cogs_price_2: '14500000',
                        tier_cogs_price_3: '14000000',
                        stock: 0,
                        primary_image: 'http://localhost/testing/testing_image.jpg',
                        additional_image: [
                            'http://localhost/testing/testing_image.jpg',
                            'http://localhost/testing/testing_image.jpg'
                        ],
                        warehouse_id: 99,
                        location_label: 'Jakarta',
                        reference_link: [
                            'google.com',
                            'amazon.com'
                        ],
                        warranty_option: 'official_warranty',
                        warranty_period: '',
                        warranty_limit: 1,
                        warranty_coverage: 'Box',
                        is_indent: 1,
                        indent_period: 'week',
                        indent_limit: 2,
                        is_decimal: 0,
                        down_payment_type: 0,
                        down_payment_value: 0
                    },
                    {
                        variants: [
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Green',
                                attribute_value_id: 2
                            },
                            {
                                attribute_id: 2,
                                attribute_code: 'phone_storage',
                                attribute_code_label: 'Kapasitas',
                                attribute_value_name: '64GB',
                                attribute_value_id: 4
                            }
                        ],
                        variant_value: 'NO_VARIANT',
                        sku_vendor: '4',
                        tier_min_qty_1: '5',
                        tier_min_qty_2: '10',
                        tier_min_qty_3: '15',
                        tier_cogs_price_1: '15000000',
                        tier_cogs_price_2: '14500000',
                        tier_cogs_price_3: '14000000',
                        stock: 0,
                        primary_image: 'http://localhost/testing/testing_image.jpg',
                        additional_image: [
                            'http://localhost/testing/testing_image.jpg',
                            'http://localhost/testing/testing_image.jpg'
                        ],
                        warehouse_id: 99,
                        location_label: 'Jakarta',
                        reference_link: [
                            ''
                        ],
                        warranty_option: 'official_warranty',
                        warranty_period: 'month',
                        warranty_limit: 0,
                        warranty_coverage: '',
                        is_indent: 1,
                        indent_period: 'week',
                        indent_limit: 1,
                        is_decimal: 0,
                        down_payment_type: 0,
                        down_payment_value: 0
                    }
                ]
            }
        };

        const result = yield Methods.postProduct(data, context);
        const expected = {
            data: {
                product_group_id: 2,
                product_variant: [
                    {
                        id: 9,
                        sku: '0EBNFN5BKR'
                    },
                    {
                        id: 9,
                        sku: '0EBNFN5BKR'
                    }
                ],
                product_vendor: [
                    {
                        id: 11,
                        vendor_id: 3
                    },
                    {
                        id: 11,
                        vendor_id: 3
                    }
                ]
            }
        };
        t.true(result.data.product_group_id === expected.data.product_group_id, 'wrong get data');
    } catch (err) {
        console.log(err.message);
        t.fail();
    }
});

test.serial('Should be return success C', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findOneDetail').resolves(false);
    t.context.sandbox.stub(ProductGroupRepository, 'findByIdWithDetail').resolves({
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
        primary_image: '',
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        created_at: '2017-12-19T14:59:19.000Z',
        updated_at: '2018-01-12T10:40:43.000Z',
        Brand: {
            id: 81,
            name: 'Apple',
            image_url: null,
            created_at: '2017-11-28T14:54:10.000Z',
            updated_at: '2017-11-28T14:54:10.000Z'
        },
        Uom: {
            id: 1,
            name: 'Unit',
            created_at: '2017-12-05T16:59:10.000Z',
            updated_at: '2017-12-05T16:59:10.000Z'
        },
        StockingUom: {
            id: 1,
            name: 'Box',
            created_at: '2017-12-05T16:55:00.000Z',
            updated_at: '2017-12-20T05:49:50.000Z'
        },
        ProductGroupAttributes: [
            {
                id: 1,
                product_group_id: 2,
                attribute_code_id: 1,
                attribute_value_id: null,
                text_input: null,
                is_variant: 1,
                created_at: '2017-12-19T08:01:09.000Z',
                updated_at: '2017-12-19T08:01:09.000Z',
                AttributeCode: {
                    id: 1,
                    code: 'phone_color',
                    label: 'Warna',
                    type: 'dropdown',
                    created_at: '2017-12-19T10:34:50.000Z',
                    updated_at: '2017-12-19T10:34:53.000Z',
                    AttributeValues: [
                        {
                            id: 1,
                            attribute_code_id: 1,
                            value: 'Silver',
                            image_url: null,
                            created_at: '2017-12-19T10:39:35.000Z',
                            updated_at: '2017-12-19T10:39:38.000Z'
                        },
                        {
                            id: 2,
                            attribute_code_id: 1,
                            value: 'Black',
                            image_url: null,
                            created_at: '2017-12-19T03:40:00.000Z',
                            updated_at: '2017-12-19T03:40:00.000Z'
                        }
                    ]
                },
                AttributeValue: null
            },
            {
                id: 2,
                product_group_id: 2,
                attribute_code_id: 2,
                attribute_value_id: null,
                text_input: null,
                is_variant: 1,
                created_at: '2017-12-19T08:01:19.000Z',
                updated_at: '2017-12-19T08:01:19.000Z',
                AttributeCode: {
                    id: 2,
                    code: 'phone_storage',
                    label: 'Kapasitas',
                    type: 'dropdown',
                    created_at: '2017-12-19T10:35:12.000Z',
                    updated_at: '2017-12-19T10:35:15.000Z',
                    AttributeValues: [
                        {
                            id: 3,
                            attribute_code_id: 2,
                            value: '32GB',
                            image_url: null,
                            created_at: '2017-12-19T03:41:25.000Z',
                            updated_at: '2017-12-19T03:41:25.000Z'
                        },
                        {
                            id: 4,
                            attribute_code_id: 2,
                            value: '64GB',
                            image_url: null,
                            created_at: '2017-12-19T03:41:58.000Z',
                            updated_at: '2017-12-19T03:41:58.000Z'
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
                created_at: '2017-12-19T08:01:38.000Z',
                updated_at: '2017-12-19T08:01:38.000Z',
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
                updated_at: '2017-12-19T08:02:03.000Z',
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
    const callback = t.context.sandbox.stub(ProductVendorRepository, 'createOne');
    callback.onCall(0).resolves({
        getValues() {
            return false;
        }
    });
    callback.onCall(1).resolves({
        getValues() {
            return false;
        }
    });
    t.context.sandbox.stub(ProductVariantRepository, 'createOne').resolves({
        id: 9,
        sku: '0EBNFN5BKR'
    });
    t.context.sandbox.stub(ProductVariantRepository, 'findAndCountAll').resolves({
        count: 1,
        rows: [
            {
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
        ]
    });
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves({
        id: 14,
        product_group_id: 2,
        sku: 'ZCK3EML3IV',
        long_name: 'Apple iPhone 7 - Silver - 64GB',
        variant_value: '{"phone_color":1,"phone_storage":4}',
        primary_image: 'http://localhost/testing/testing_image.jpg',
        additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
        product_id_magento: null,
        product_id_netsuite: null,
        is_primary: 0,
        is_discontinue: 0,
        is_active: 1,
        created_at: '2018-01-18T09:16:43.000Z',
        updated_at: '2018-01-18T09:16:43.000Z'
    });
    t.context.sandbox.stub(ProductVendorRepository, 'findOne').resolves(false);
    t.context.sandbox.stub(ProductVariantRepository, 'findCountVariant').resolves({
        count: 0,
        rows: []
    });
    t.context.sandbox.stub(ProductGroupRepository, 'update').resolves(1);
    t.context.sandbox.stub(WebhookRepository, 'trigger').resolves();
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();
    t.context.sandbox.stub(ProductSkuRepository, 'findOne').resolves(false);
    try {
        const context = {
            user: {
                username: 'vendor2@test.com',
                first_name: 'Bambang',
                last_name: 'Widodo',
                scope: 'organization',
                customer: {
                    organization_name: 'PT Vendor Jaya Tbk.',
                    organization_id: 4,
                    person_id: 3,
                    superadmin: 3,
                    roles: [
                        {
                            role_id: 1,
                            name: 'Super Admin'
                        }
                    ]
                },
                addons: [],
                groups: null,
                iat: 1515740579,
                exp: 1515747779
            }
        };
        const data = {
            path: {
                id: '4'
            },
            body: {
                product_group_id: 2,
                products: [
                    {
                        variants: [
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Silver',
                                attribute_value_id: 1
                            },
                            {
                                attribute_id: 2,
                                attribute_code: 'phone_storage',
                                attribute_code_label: 'Kapasitas',
                                attribute_value_name: '64GB',
                                attribute_value_id: 4
                            }
                        ],
                        variant_value: {
                            phone_color: '2',
                            phone_storage: '3'
                        },
                        sku_vendor: '111111111',
                        tier_min_qty_1: '5',
                        tier_min_qty_2: '10',
                        tier_min_qty_3: '15',
                        tier_cogs_price_1: '15000000',
                        tier_cogs_price_2: '14500000',
                        tier_cogs_price_3: '14000000',
                        stock: 0,
                        primary_image: 'http://localhost/testing/testing_image.jpg',
                        additional_image: [
                            'http://localhost/testing/testing_image.jpg',
                            'http://localhost/testing/testing_image.jpg'
                        ],
                        warehouse_id: 99,
                        location_label: 'Jakarta',
                        reference_link: [
                            'google.com',
                            'amazon.com'
                        ],
                        warranty_option: 'official_warranty',
                        warranty_period: 'month',
                        warranty_limit: 1,
                        warranty_coverage: 'Box',
                        is_indent: 1,
                        indent_period: 'week',
                        indent_limit: 1,
                        is_decimal: 0,
                        down_payment_type: 0,
                        down_payment_value: 0
                    },
                    {
                        variants: [
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Green',
                                attribute_value_id: 2
                            },
                            {
                                attribute_id: 2,
                                attribute_code: 'phone_storage',
                                attribute_code_label: 'Kapasitas',
                                attribute_value_name: '64GB',
                                attribute_value_id: 4
                            }
                        ],
                        variant_value: {
                            phone_color: '2',
                            phone_storage: '3'
                        },
                        sku_vendor: '111111111',
                        tier_min_qty_1: '5',
                        tier_min_qty_2: '10',
                        tier_min_qty_3: '15',
                        tier_cogs_price_1: '15000000',
                        tier_cogs_price_2: '14500000',
                        tier_cogs_price_3: '14000000',
                        stock: 0,
                        primary_image: 'http://localhost/testing/testing_image.jpg',
                        additional_image: [
                            'http://localhost/testing/testing_image.jpg',
                            'http://localhost/testing/testing_image.jpg'
                        ],
                        warehouse_id: 99,
                        location_label: 'Jakarta',
                        reference_link: [
                            'google.com',
                            'amazon.com'
                        ],
                        warranty_option: 'official_warranty',
                        warranty_period: 'month',
                        warranty_limit: 1,
                        warranty_coverage: 'Box',
                        is_indent: 1,
                        indent_period: 'week',
                        indent_limit: 2,
                        is_decimal: 0,
                        down_payment_type: 0,
                        down_payment_value: 0
                    }
                ]
            }
        };

        const result = yield Methods.postProduct(data, context);
        const expected = {
            data: {
                product_group_id: 2,
                product_variant: [],
                product_vendor: [
                    {
                        id: 11,
                        vendor_id: 4
                    },
                    {
                        id: 11,
                        vendor_id: 4
                    }
                ]
            }
        };
        t.true(result.data.product_group_id === expected.data.product_group_id, 'wrong get product group id');
    } catch (err) {
        console.log(err.message);
        t.fail();
    }
});

test.serial('Should be error catch DB Transaction', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findOneDetail').resolves(false);
    t.context.sandbox.stub(ProductGroupRepository, 'findByIdWithDetail').resolves({
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
        primary_image: '',
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        created_at: '2017-12-19T14:59:19.000Z',
        updated_at: '2018-01-12T10:40:43.000Z',
        Brand: {
            id: 81,
            name: 'Apple',
            image_url: null,
            created_at: '2017-11-28T14:54:10.000Z',
            updated_at: '2017-11-28T14:54:10.000Z'
        },
        Uom: {
            id: 1,
            name: 'Unit',
            created_at: '2017-12-05T16:59:10.000Z',
            updated_at: '2017-12-05T16:59:10.000Z'
        },
        StockingUom: {
            id: 1,
            name: 'Box',
            created_at: '2017-12-05T16:55:00.000Z',
            updated_at: '2017-12-20T05:49:50.000Z'
        },
        ProductGroupAttributes: [
            {
                id: 1,
                product_group_id: 2,
                attribute_code_id: 1,
                attribute_value_id: null,
                text_input: null,
                is_variant: 1,
                created_at: '2017-12-19T08:01:09.000Z',
                updated_at: '2017-12-19T08:01:09.000Z',
                AttributeCode: {
                    id: 1,
                    code: 'phone_color',
                    label: 'Warna',
                    type: 'dropdown',
                    created_at: '2017-12-19T10:34:50.000Z',
                    updated_at: '2017-12-19T10:34:53.000Z',
                    AttributeValues: [
                        {
                            id: 1,
                            attribute_code_id: 1,
                            value: 'Silver',
                            image_url: null,
                            created_at: '2017-12-19T10:39:35.000Z',
                            updated_at: '2017-12-19T10:39:38.000Z'
                        },
                        {
                            id: 2,
                            attribute_code_id: 1,
                            value: 'Black',
                            image_url: null,
                            created_at: '2017-12-19T03:40:00.000Z',
                            updated_at: '2017-12-19T03:40:00.000Z'
                        }
                    ]
                },
                AttributeValue: null
            },
            {
                id: 2,
                product_group_id: 2,
                attribute_code_id: 2,
                attribute_value_id: null,
                text_input: null,
                is_variant: 1,
                created_at: '2017-12-19T08:01:19.000Z',
                updated_at: '2017-12-19T08:01:19.000Z',
                AttributeCode: {
                    id: 2,
                    code: 'phone_storage',
                    label: 'Kapasitas',
                    type: 'dropdown',
                    created_at: '2017-12-19T10:35:12.000Z',
                    updated_at: '2017-12-19T10:35:15.000Z',
                    AttributeValues: [
                        {
                            id: 3,
                            attribute_code_id: 2,
                            value: '32GB',
                            image_url: null,
                            created_at: '2017-12-19T03:41:25.000Z',
                            updated_at: '2017-12-19T03:41:25.000Z'
                        },
                        {
                            id: 4,
                            attribute_code_id: 2,
                            value: '64GB',
                            image_url: null,
                            created_at: '2017-12-19T03:41:58.000Z',
                            updated_at: '2017-12-19T03:41:58.000Z'
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
                created_at: '2017-12-19T08:01:38.000Z',
                updated_at: '2017-12-19T08:01:38.000Z',
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
                updated_at: '2017-12-19T08:02:03.000Z',
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
    t.context.sandbox.stub(ProductVariantRepository, 'createOne').resolves({
        id: 9,
        sku: '0EBNFN5BKR'
    });
    t.context.sandbox.stub(ProductVariantRepository, 'findAndCountAll').resolves({
        count: 1,
        rows: [
            {
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
        ]
    });
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves({
        id: 14,
        product_group_id: 2,
        sku: 'ZCK3EML3IV',
        long_name: 'Apple iPhone 7 - Silver - 64GB',
        variant_value: '{"phone_color":1,"phone_storage":4}',
        primary_image: 'http://localhost/testing/testing_image.jpg',
        additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
        product_id_magento: null,
        product_id_netsuite: null,
        is_primary: 0,
        is_discontinue: 0,
        is_active: 1,
        created_at: '2018-01-18T09:16:43.000Z',
        updated_at: '2018-01-18T09:16:43.000Z'
    });
    t.context.sandbox.stub(ProductVendorRepository, 'findOne').resolves(false);
    t.context.sandbox.stub(ProductVariantRepository, 'findCountVariant').resolves({
        count: 0,
        rows: []
    });
    t.context.sandbox.stub(ProductGroupRepository, 'update').resolves(1);
    t.context.sandbox.stub(WebhookRepository, 'trigger').resolves();
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();
    t.context.sandbox.stub(ProductSkuRepository, 'findOne').resolves(false);
    try {
        const context = {
            user: {
                username: 'vendor2@test.com',
                first_name: 'Bambang',
                last_name: 'Widodo',
                scope: 'organization',
                customer: {
                    organization_name: 'PT Vendor Jaya Tbk.',
                    organization_id: 4,
                    person_id: 3,
                    superadmin: 3,
                    roles: [
                        {
                            role_id: 1,
                            name: 'Super Admin'
                        }
                    ]
                },
                addons: [],
                groups: null,
                iat: 1515740579,
                exp: 1515747779
            }
        };
        const data = {
            path: {
                id: '4'
            },
            body: {
                product_group_id: '2',
                products: [
                    {
                        variants: [
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Silver',
                                attribute_value_id: 1
                            },
                            {
                                attribute_id: 2,
                                attribute_code: 'phone_storage',
                                attribute_code_label: 'Kapasitas',
                                attribute_value_name: '64GB',
                                attribute_value_id: 4
                            }
                        ],
                        variant_value: {
                            phone_color: '2',
                            phone_storage: '3'
                        },
                        sku_vendor: '111111111',
                        tier_min_qty_1: '5',
                        tier_min_qty_2: '10',
                        tier_min_qty_3: '15',
                        tier_cogs_price_1: '15000000',
                        tier_cogs_price_2: '14500000',
                        tier_cogs_price_3: '14000000',
                        stock: 1,
                        primary_image: 'http://localhost/testing/testing_image.jpg',
                        additional_image: [
                            'http://localhost/testing/testing_image.jpg',
                            'http://localhost/testing/testing_image.jpg'
                        ],
                        warehouse_id: 99,
                        location_label: 'Jakarta',
                        reference_link: [
                            'google.com',
                            'amazon.com'
                        ],
                        warranty_option: 'official_warranty',
                        warranty_period: 'month',
                        warranty_limit: 1,
                        warranty_coverage: 'Box',
                        is_indent: 1,
                        indent_period: 'week',
                        indent_limit: 2,
                        is_decimal: 0,
                        down_payment_type: 0,
                        down_payment_value: 0
                    },
                    {
                        variants: [
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Green',
                                attribute_value_id: 2
                            },
                            {
                                attribute_id: 2,
                                attribute_code: 'phone_storage',
                                attribute_code_label: 'Kapasitas',
                                attribute_value_name: '64GB',
                                attribute_value_id: 4
                            }
                        ],
                        variant_value: {
                            phone_color: '2',
                            phone_storage: '3'
                        },
                        sku_vendor: '111111111',
                        tier_min_qty_1: '5',
                        tier_min_qty_2: '10',
                        tier_min_qty_3: '15',
                        tier_cogs_price_1: '15000000',
                        tier_cogs_price_2: '14500000',
                        tier_cogs_price_3: '14000000',
                        stock: 1,
                        primary_image: 'http://localhost/testing/testing_image.jpg',
                        additional_image: [
                            'http://localhost/testing/testing_image.jpg',
                            'http://localhost/testing/testing_image.jpg'
                        ],
                        warehouse_id: 99,
                        location_label: 'Jakarta',
                        reference_link: [
                            'google.com',
                            'amazon.com'
                        ],
                        warranty_option: 'official_warranty',
                        warranty_period: 'month',
                        warranty_limit: 1,
                        warranty_coverage: 'Box',
                        is_indent: 1,
                        indent_period: 'week',
                        indent_limit: 2,
                        is_decimal: 0,
                        down_payment_type: 0,
                        down_payment_value: 0
                    }
                ]
            }
        };

        yield Methods.postProduct(data, context);
        t.fail('DB Transaction throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.before('Initialize BizzyError Before All Tests', (t) => {
    BizzyError.initializeErrors();
});

test.beforeEach('Initialize New Sandbox Before Each Test', function* (t) {
    t.context.sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
    t.context.sandbox.stub(DBContext, 'getInstance').resolves();
    t.context.sandbox.stub(DBContext, 'startTransaction').resolves();
    t.context.sandbox.stub(DBContext, 'rollback').resolves();
    t.context.sandbox.stub(DBContext, 'commit').resolves();
});

test.afterEach.always('Restore Sandbox and Configuration After Each Test', function* (t) {
    t.context.sandbox.restore();
});
