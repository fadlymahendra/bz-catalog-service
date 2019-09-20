'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError, BizzyService } = require('bizzy-common');
const PremoderationRepository = require('../../../../src/repositories/premoderation');
const ProductGroupRepository = require('../../../../src/repositories/product_group');
const ProductGroupAttributeRepository = require('../../../../src/repositories/product_group_attribute');
const ProductVendorRepository = require('../../../../src/repositories/product_vendor');
const ProductVariantRepository = require('../../../../src/repositories/product_variant');
const ProductSkuRepository = require('../../../../src/repositories/product_sku');
const WebhookRepository = require('../../../../src/repositories/webhook');
const Methods = require('../../../../src/methods/premoderations/confirm_approve');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

test.serial('Should be return Success', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findOne').resolves(false);
    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves({
        _id: '5a44adf9d1db060001b99a6f',
        id: '1514450425982',
        type: 'new',
        payload: {
            name: 'Iphone Y',
            category_id: 561,
            category: {
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 561
            },
            brand_id: 81,
            uom_id: 1,
            stocking_uom_id: 4,
            quantity_stocking_uom: 1,
            manufacturing_number: 'AP89232423434',
            package_weight: '180',
            package_length: '19',
            package_height: '10',
            package_width: '5',
            package_content: 'tidak ada apa-apa',
            barcode: '924234324',
            description: '<p>lorem ipsum dolorosum de aremo</p>',
            variant_count: 2,
            variant_matrix: [
                'phone_color',
                'phone_storage'
            ],
            specifications: [
                {
                    attribute_id: 3,
                    attribute_code: 'phone_os',
                    attribute_code_label: 'Sistem Operasi',
                    attribute_type: 'dropdown',
                    attribute_value_id: 5,
                    attribute_value_label: 'iOS',
                    attribute_status: 'clear'
                },
                {
                    attribute_id: 4,
                    attribute_code: 'phone_package',
                    attribute_code_label: 'Kelengkapan Paket',
                    attribute_type: 'textinput',
                    attribute_textinput: 'Tidak dilengkapi dengan hardcase',
                    attribute_status: 'clear'
                }
            ],
            products: [
                {
                    index: '33n203',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Black',
                            attribute_value_id: 2,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '32GB',
                            attribute_value_id: 3,
                            attribute_status: 'clear'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '3'
                    },
                    sku_vendor: 'X111',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19000000,
                    tier_cogs_price_3: 18000000,
                    stock: 15,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                    additional_image: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 47,
                    is_contract: 1
                },
                {
                    index: '439pa3',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Silver',
                            attribute_value_id: 1,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '64GB',
                            attribute_value_id: 4,
                            attribute_status: 'new'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '4'
                    },
                    sku_vendor: 'X112',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19500000,
                    tier_cogs_price_3: 18500000,
                    stock: 10,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                    additional_image: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 48,
                    is_contract: 0
                }
            ]
        },
        premoderation_status: 'need_revision',
        vendor_id: 16,
        user: {
            id: 11,
            name: 'User Test',
            email: 'user@test.com',
            type: 'vendor'
        },
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2018-01-05T17:25:03.215Z'
    });
    t.context.sandbox.stub(PremoderationRepository, 'findWithStatus').resolves({
        _id: '5a44adf9d1db060001b99a6f',
        id: '1514450425982',
        type: 'new',
        payload: {
            name: 'Iphone Y',
            category_id: 561,
            category: {
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 561
            },
            brand_id: 81,
            uom_id: 1,
            stocking_uom_id: 4,
            quantity_stocking_uom: 1,
            manufacturing_number: 'AP89232423434',
            package_weight: '180',
            package_length: '19',
            package_height: '10',
            package_width: '5',
            package_content: 'tidak ada apa-apa',
            barcode: '924234324',
            description: '<p>lorem ipsum dolorosum de aremo</p>',
            variant_count: 2,
            variant_matrix: [
                'phone_color',
                'phone_storage'
            ],
            specifications: [
                {
                    attribute_id: 3,
                    attribute_code: 'phone_os',
                    attribute_code_label: 'Sistem Operasi',
                    attribute_type: 'dropdown',
                    attribute_value_id: 5,
                    attribute_value_label: 'iOS',
                    attribute_status: 'clear'
                },
                {
                    attribute_id: 4,
                    attribute_code: 'phone_package',
                    attribute_code_label: 'Kelengkapan Paket',
                    attribute_type: 'textinput',
                    attribute_textinput: 'Tidak dilengkapi dengan hardcase',
                    attribute_status: 'clear'
                }
            ],
            products: [
                {
                    index: '33n203',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Black',
                            attribute_value_id: 2,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '32GB',
                            attribute_value_id: 3,
                            attribute_status: 'clear'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '3'
                    },
                    sku_vendor: 'X111',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19000000,
                    tier_cogs_price_3: 18000000,
                    stock: 15,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                    additional_image: '[]',
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 47,
                    is_contract: 1
                },
                {
                    index: '439pa3',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Silver',
                            attribute_value_id: 1,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '64GB',
                            attribute_value_id: 4,
                            attribute_status: 'new'
                        }
                    ],
                    variant_value: 'NO_VARIANT',
                    sku_vendor: 'X112',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19500000,
                    tier_cogs_price_3: 18500000,
                    stock: 10,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                    additional_image: '[]',
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: null,
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 48,
                    is_contract: 0
                }
            ]
        },
        premoderation_status: 'done',
        vendor_id: 16,
        user: {
            id: 11,
            name: 'User Test',
            email: 'user@test.com',
            type: 'vendor'
        },
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2018-01-05T17:25:03.215Z'
    });
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves({
        id: 11,
        name: 'Iphone Y',
        category_id: 561,
        brand_id: 81,
        uom_id: 1,
        stocking_uom_id: 4,
        quantity_stocking_uom: 1,
        manufacturing_number: 'YYYY',
        manufacturing_number_type: null,
        package_weight: 0,
        package_length: '0.00',
        package_width: '0.00',
        package_height: '0.00',
        package_content: null,
        barcode: null,
        description: '',
        primary_image: null,
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 0,
        created_at: '2018-01-05T13:40:00.000Z',
        updated_at: null
    });
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves([
        {
            product_group_id: 11,
            sku: '173F9206R',
            long_name: 'Iphone Y Black 32GB',
            variant_value: '{"phone_color":2,"phone_storage":3}',
            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
            additional_image: '[]',
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1,
            product_vendor: {
                vendor_id: 16,
                warehouse_id: 1,
                location_label: 'Jakarta selatan',
                stock_available: 1,
                stock_used: 1,
                tier_min_qty_1: 10,
                tier_min_qty_2: 20,
                tier_min_qty_3: 30,
                tier_cogs_price_1: 20000000,
                tier_cogs_price_2: 19000000,
                tier_cogs_price_3: 18000000,
                warranty_option: 'international',
                warranty_period: 'week',
                warranty_limit: 1,
                indent_period: null,
                indent_limit: 0,
                is_indent: 0,
                reference_link: '["https://en.wikipedia.org/wiki/IPhone_X"]',
                sku_vendor: 'X111',
                is_active: 1,
                created_by: 11
            },
            index: '33n203'
        },
        {
            product_group_id: 11,
            sku: 'EANWB03KC',
            long_name: 'Iphone Y Silver 64GB',
            variant_value: '{"phone_color":1,"phone_storage":4}',
            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
            additional_image: '[]',
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1,
            product_vendor: {
                vendor_id: 16,
                warehouse_id: 1,
                location_label: 'Jakarta selatan',
                stock_available: 1,
                stock_used: 1,
                tier_min_qty_1: 10,
                tier_min_qty_2: 20,
                tier_min_qty_3: 30,
                tier_cogs_price_1: 20000000,
                tier_cogs_price_2: 19500000,
                tier_cogs_price_3: 18500000,
                warranty_option: 'international',
                warranty_period: 'week',
                warranty_limit: 1,
                indent_period: null,
                indent_limit: 0,
                is_indent: 0,
                reference_link: '["https://en.wikipedia.org/wiki/IPhone_X"]',
                sku_vendor: 'X112',
                is_active: 1,
                created_by: 11
            },
            index: '439pa3'
        }
    ]);
    t.context.sandbox.stub(PremoderationRepository, 'update').resolves({});
    t.context.sandbox.stub(ProductVendorRepository, 'createOne').resolves({});
    t.context.sandbox.stub(ProductVariantRepository, 'createOne').resolves({
        getValues() {
            return {
                sku: 1
            };
        }
    });
    t.context.sandbox.stub(PremoderationRepository, 'updateVariantId').resolves({});
    t.context.sandbox.stub(ProductGroupAttributeRepository, 'findOrCreate').resolves({});
    t.context.sandbox.stub(ProductVariantRepository, 'findCountVariant').resolves({});
    t.context.sandbox.stub(ProductGroupRepository, 'update').resolves({});
    t.context.sandbox.stub(WebhookRepository, 'trigger').resolves();
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();
    t.context.sandbox.stub(ProductSkuRepository, 'findOne').resolves(false);
    t.context.sandbox.stub(ProductSkuRepository, 'insertOne').resolves(true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1514450425982'
            },
            body: {
                product_group_id: '11'
            }
        };

        const result = yield Methods.putPremoderationApprove(data, context);
        const expected = {
            data: {
                id: '1514450425982',
                status: 'done',
                created_at: result.data.created_at,
                updated_at: result.data.updated_at
            }
        };

        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return Failed: sku empty', function* (t) {
    const getFindOne = t.context.sandbox.stub(ProductVendorRepository, 'findOne');
    getFindOne.onCall(0).resolves(false);
    getFindOne.onCall(1).resolves(null);

    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves({
        _id: '5a44adf9d1db060001b99a6f',
        id: '1514450425982',
        type: 'new',
        payload: {
            name: 'Iphone Y',
            category_id: 561,
            category: {
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 561
            },
            brand_id: 81,
            uom_id: 1,
            stocking_uom_id: 4,
            quantity_stocking_uom: 1,
            manufacturing_number: 'AP89232423434',
            package_weight: '180',
            package_length: '19',
            package_height: '10',
            package_width: '5',
            package_content: 'tidak ada apa-apa',
            barcode: '924234324',
            description: '<p>lorem ipsum dolorosum de aremo</p>',
            variant_count: 2,
            variant_matrix: [
                'phone_color',
                'phone_storage'
            ],
            specifications: [
                {
                    attribute_id: 3,
                    attribute_code: 'phone_os',
                    attribute_code_label: 'Sistem Operasi',
                    attribute_type: 'dropdown',
                    attribute_value_id: 5,
                    attribute_value_label: 'iOS',
                    attribute_status: 'clear'
                },
                {
                    attribute_id: 4,
                    attribute_code: 'phone_package',
                    attribute_code_label: 'Kelengkapan Paket',
                    attribute_type: 'textinput',
                    attribute_textinput: 'Tidak dilengkapi dengan hardcase',
                    attribute_status: 'clear'
                }
            ],
            products: [
                {
                    index: '33n203',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Black',
                            attribute_value_id: 2,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '32GB',
                            attribute_value_id: 3,
                            attribute_status: 'clear'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '3'
                    },
                    sku_vendor: '',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19000000,
                    tier_cogs_price_3: 18000000,
                    stock: 15,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                    additional_image: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 47,
                    is_contract: 1
                },
                {
                    index: '439pa3',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Silver',
                            attribute_value_id: 1,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '64GB',
                            attribute_value_id: 4,
                            attribute_status: 'new'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '4'
                    },
                    sku_vendor: 'X112',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19500000,
                    tier_cogs_price_3: 18500000,
                    stock: 10,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                    additional_image: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 48,
                    is_contract: 0
                }
            ]
        },
        premoderation_status: 'need_revision',
        vendor_id: 16,
        user: {
            id: 11,
            name: 'User Test',
            email: 'user@test.com',
            type: 'vendor'
        },
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2018-01-05T17:25:03.215Z'
    });
    t.context.sandbox.stub(PremoderationRepository, 'findWithStatus').resolves({
        _id: '5a44adf9d1db060001b99a6f',
        id: '1514450425982',
        type: 'new',
        payload: {
            name: 'Iphone Y',
            category_id: 561,
            category: {
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 561
            },
            brand_id: 81,
            uom_id: 1,
            stocking_uom_id: 4,
            quantity_stocking_uom: 1,
            manufacturing_number: 'AP89232423434',
            package_weight: '180',
            package_length: '19',
            package_height: '10',
            package_width: '5',
            package_content: 'tidak ada apa-apa',
            barcode: '924234324',
            description: '<p>lorem ipsum dolorosum de aremo</p>',
            variant_count: 2,
            variant_matrix: [
                'phone_color',
                'phone_storage'
            ],
            specifications: [
                {
                    attribute_id: 3,
                    attribute_code: 'phone_os',
                    attribute_code_label: 'Sistem Operasi',
                    attribute_type: 'dropdown',
                    attribute_value_id: 5,
                    attribute_value_label: 'iOS',
                    attribute_status: 'clear'
                },
                {
                    attribute_id: 4,
                    attribute_code: 'phone_package',
                    attribute_code_label: 'Kelengkapan Paket',
                    attribute_type: 'textinput',
                    attribute_textinput: 'Tidak dilengkapi dengan hardcase',
                    attribute_status: 'clear'
                }
            ],
            products: [
                {
                    index: '33n203',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Black',
                            attribute_value_id: 2,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '32GB',
                            attribute_value_id: 3,
                            attribute_status: 'clear'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '3'
                    },
                    sku_vendor: 'X111',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19000000,
                    tier_cogs_price_3: 18000000,
                    stock: 15,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                    additional_image: '[]',
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 47,
                    is_contract: 1
                },
                {
                    index: '439pa3',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Silver',
                            attribute_value_id: 1,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '64GB',
                            attribute_value_id: 4,
                            attribute_status: 'new'
                        }
                    ],
                    variant_value: 'NO_VARIANT',
                    sku_vendor: 'X112',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19500000,
                    tier_cogs_price_3: 18500000,
                    stock: 10,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                    additional_image: '[]',
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: null,
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 48,
                    is_contract: 0
                }
            ]
        },
        premoderation_status: 'done',
        vendor_id: 16,
        user: {
            id: 11,
            name: 'User Test',
            email: 'user@test.com',
            type: 'vendor'
        },
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2018-01-05T17:25:03.215Z'
    });
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves({
        id: 11,
        name: 'Iphone Y',
        category_id: 561,
        brand_id: 81,
        uom_id: 1,
        stocking_uom_id: 4,
        quantity_stocking_uom: 1,
        manufacturing_number: 'YYYY',
        manufacturing_number_type: null,
        package_weight: 0,
        package_length: '0.00',
        package_width: '0.00',
        package_height: '0.00',
        package_content: null,
        barcode: null,
        description: '',
        primary_image: null,
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 0,
        created_at: '2018-01-05T13:40:00.000Z',
        updated_at: null
    });
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves([
        {
            product_group_id: 11,
            sku: '173F9206R',
            long_name: 'Iphone Y Black 32GB',
            variant_value: '{"phone_color":2,"phone_storage":3}',
            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
            additional_image: '[]',
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1,
            product_vendor: {
                vendor_id: 16,
                warehouse_id: 1,
                location_label: 'Jakarta selatan',
                stock_available: 1,
                stock_used: 1,
                tier_min_qty_1: 10,
                tier_min_qty_2: 20,
                tier_min_qty_3: 30,
                tier_cogs_price_1: 20000000,
                tier_cogs_price_2: 19000000,
                tier_cogs_price_3: 18000000,
                warranty_option: 'international',
                warranty_period: 'week',
                warranty_limit: 1,
                indent_period: null,
                indent_limit: 0,
                is_indent: 0,
                reference_link: '["https://en.wikipedia.org/wiki/IPhone_X"]',
                sku_vendor: 'X111',
                is_active: 1,
                created_by: 11
            },
            index: '33n203'
        },
        {
            product_group_id: 11,
            sku: 'EANWB03KC',
            long_name: 'Iphone Y Silver 64GB',
            variant_value: '{"phone_color":1,"phone_storage":4}',
            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
            additional_image: '[]',
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1,
            product_vendor: {
                vendor_id: 16,
                warehouse_id: 1,
                location_label: 'Jakarta selatan',
                stock_available: 1,
                stock_used: 1,
                tier_min_qty_1: 10,
                tier_min_qty_2: 20,
                tier_min_qty_3: 30,
                tier_cogs_price_1: 20000000,
                tier_cogs_price_2: 19500000,
                tier_cogs_price_3: 18500000,
                warranty_option: 'international',
                warranty_period: 'week',
                warranty_limit: 1,
                indent_period: null,
                indent_limit: 0,
                is_indent: 0,
                reference_link: '["https://en.wikipedia.org/wiki/IPhone_X"]',
                sku_vendor: 'X112',
                is_active: 1,
                created_by: 11
            },
            index: '439pa3'
        }
    ]);

    t.context.sandbox.stub(PremoderationRepository, 'update').resolves({});
    t.context.sandbox.stub(ProductVendorRepository, 'createOne').resolves({});
    t.context.sandbox.stub(ProductVariantRepository, 'createOne').resolves({
        getValues() {
            return {
                sku: 1
            };
        }
    });
    t.context.sandbox.stub(PremoderationRepository, 'updateVariantId').resolves({});
    t.context.sandbox.stub(ProductGroupAttributeRepository, 'findOrCreate').resolves({});
    t.context.sandbox.stub(ProductVariantRepository, 'findCountVariant').resolves({});
    t.context.sandbox.stub(ProductGroupRepository, 'update').resolves({});
    t.context.sandbox.stub(WebhookRepository, 'trigger').resolves();
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();
    t.context.sandbox.stub(ProductSkuRepository, 'findOne').resolves(false);
    t.context.sandbox.stub(ProductSkuRepository, 'insertOne').resolves(true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1514450425982'
            },
            body: {
                product_group_id: '11'
            }
        };

        yield Methods.putPremoderationApprove(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'SKU can not be empty');
    }
});


test.serial('Should be return Failed: sku contains symbol', function* (t) {
    const getFindOne = t.context.sandbox.stub(ProductVendorRepository, 'findOne');
    getFindOne.onCall(0).resolves(false);
    getFindOne.onCall(1).resolves(null);

    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves({
        _id: '5a44adf9d1db060001b99a6f',
        id: '1514450425982',
        type: 'new',
        payload: {
            name: 'Iphone Y',
            category_id: 561,
            category: {
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 561
            },
            brand_id: 81,
            uom_id: 1,
            stocking_uom_id: 4,
            quantity_stocking_uom: 1,
            manufacturing_number: 'AP89232423434',
            package_weight: '180',
            package_length: '19',
            package_height: '10',
            package_width: '5',
            package_content: 'tidak ada apa-apa',
            barcode: '924234324',
            description: '<p>lorem ipsum dolorosum de aremo</p>',
            variant_count: 2,
            variant_matrix: [
                'phone_color',
                'phone_storage'
            ],
            specifications: [
                {
                    attribute_id: 3,
                    attribute_code: 'phone_os',
                    attribute_code_label: 'Sistem Operasi',
                    attribute_type: 'dropdown',
                    attribute_value_id: 5,
                    attribute_value_label: 'iOS',
                    attribute_status: 'clear'
                },
                {
                    attribute_id: 4,
                    attribute_code: 'phone_package',
                    attribute_code_label: 'Kelengkapan Paket',
                    attribute_type: 'textinput',
                    attribute_textinput: 'Tidak dilengkapi dengan hardcase',
                    attribute_status: 'clear'
                }
            ],
            products: [
                {
                    index: '33n203',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Black',
                            attribute_value_id: 2,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '32GB',
                            attribute_value_id: 3,
                            attribute_status: 'clear'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '3'
                    },
                    sku_vendor: 'dsaf@@@!!',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19000000,
                    tier_cogs_price_3: 18000000,
                    stock: 15,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                    additional_image: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 47,
                    is_contract: 1
                },
                {
                    index: '439pa3',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Silver',
                            attribute_value_id: 1,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '64GB',
                            attribute_value_id: 4,
                            attribute_status: 'new'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '4'
                    },
                    sku_vendor: 'X112',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19500000,
                    tier_cogs_price_3: 18500000,
                    stock: 10,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                    additional_image: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 48,
                    is_contract: 0
                }
            ]
        },
        premoderation_status: 'need_revision',
        vendor_id: 16,
        user: {
            id: 11,
            name: 'User Test',
            email: 'user@test.com',
            type: 'vendor'
        },
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2018-01-05T17:25:03.215Z'
    });
    t.context.sandbox.stub(PremoderationRepository, 'findWithStatus').resolves({
        _id: '5a44adf9d1db060001b99a6f',
        id: '1514450425982',
        type: 'new',
        payload: {
            name: 'Iphone Y',
            category_id: 561,
            category: {
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 561
            },
            brand_id: 81,
            uom_id: 1,
            stocking_uom_id: 4,
            quantity_stocking_uom: 1,
            manufacturing_number: 'AP89232423434',
            package_weight: '180',
            package_length: '19',
            package_height: '10',
            package_width: '5',
            package_content: 'tidak ada apa-apa',
            barcode: '924234324',
            description: '<p>lorem ipsum dolorosum de aremo</p>',
            variant_count: 2,
            variant_matrix: [
                'phone_color',
                'phone_storage'
            ],
            specifications: [
                {
                    attribute_id: 3,
                    attribute_code: 'phone_os',
                    attribute_code_label: 'Sistem Operasi',
                    attribute_type: 'dropdown',
                    attribute_value_id: 5,
                    attribute_value_label: 'iOS',
                    attribute_status: 'clear'
                },
                {
                    attribute_id: 4,
                    attribute_code: 'phone_package',
                    attribute_code_label: 'Kelengkapan Paket',
                    attribute_type: 'textinput',
                    attribute_textinput: 'Tidak dilengkapi dengan hardcase',
                    attribute_status: 'clear'
                }
            ],
            products: [
                {
                    index: '33n203',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Black',
                            attribute_value_id: 2,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '32GB',
                            attribute_value_id: 3,
                            attribute_status: 'clear'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '3'
                    },
                    sku_vendor: 'X111',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19000000,
                    tier_cogs_price_3: 18000000,
                    stock: 15,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                    additional_image: '[]',
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 47,
                    is_contract: 1
                },
                {
                    index: '439pa3',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Silver',
                            attribute_value_id: 1,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '64GB',
                            attribute_value_id: 4,
                            attribute_status: 'new'
                        }
                    ],
                    variant_value: 'NO_VARIANT',
                    sku_vendor: 'X112',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19500000,
                    tier_cogs_price_3: 18500000,
                    stock: 10,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                    additional_image: '[]',
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: null,
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 48,
                    is_contract: 0
                }
            ]
        },
        premoderation_status: 'done',
        vendor_id: 16,
        user: {
            id: 11,
            name: 'User Test',
            email: 'user@test.com',
            type: 'vendor'
        },
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2018-01-05T17:25:03.215Z'
    });
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves({
        id: 11,
        name: 'Iphone Y',
        category_id: 561,
        brand_id: 81,
        uom_id: 1,
        stocking_uom_id: 4,
        quantity_stocking_uom: 1,
        manufacturing_number: 'YYYY',
        manufacturing_number_type: null,
        package_weight: 0,
        package_length: '0.00',
        package_width: '0.00',
        package_height: '0.00',
        package_content: null,
        barcode: null,
        description: '',
        primary_image: null,
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 0,
        created_at: '2018-01-05T13:40:00.000Z',
        updated_at: null
    });
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves([
        {
            product_group_id: 11,
            sku: '173F9206R',
            long_name: 'Iphone Y Black 32GB',
            variant_value: '{"phone_color":2,"phone_storage":3}',
            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
            additional_image: '[]',
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1,
            product_vendor: {
                vendor_id: 16,
                warehouse_id: 1,
                location_label: 'Jakarta selatan',
                stock_available: 1,
                stock_used: 1,
                tier_min_qty_1: 10,
                tier_min_qty_2: 20,
                tier_min_qty_3: 30,
                tier_cogs_price_1: 20000000,
                tier_cogs_price_2: 19000000,
                tier_cogs_price_3: 18000000,
                warranty_option: 'international',
                warranty_period: 'week',
                warranty_limit: 1,
                indent_period: null,
                indent_limit: 0,
                is_indent: 0,
                reference_link: '["https://en.wikipedia.org/wiki/IPhone_X"]',
                sku_vendor: 'X111',
                is_active: 1,
                created_by: 11
            },
            index: '33n203'
        },
        {
            product_group_id: 11,
            sku: 'EANWB03KC',
            long_name: 'Iphone Y Silver 64GB',
            variant_value: '{"phone_color":1,"phone_storage":4}',
            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
            additional_image: '[]',
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1,
            product_vendor: {
                vendor_id: 16,
                warehouse_id: 1,
                location_label: 'Jakarta selatan',
                stock_available: 1,
                stock_used: 1,
                tier_min_qty_1: 10,
                tier_min_qty_2: 20,
                tier_min_qty_3: 30,
                tier_cogs_price_1: 20000000,
                tier_cogs_price_2: 19500000,
                tier_cogs_price_3: 18500000,
                warranty_option: 'international',
                warranty_period: 'week',
                warranty_limit: 1,
                indent_period: null,
                indent_limit: 0,
                is_indent: 0,
                reference_link: '["https://en.wikipedia.org/wiki/IPhone_X"]',
                sku_vendor: 'X112',
                is_active: 1,
                created_by: 11
            },
            index: '439pa3'
        }
    ]);

    t.context.sandbox.stub(PremoderationRepository, 'update').resolves({});
    t.context.sandbox.stub(ProductVendorRepository, 'createOne').resolves({});
    t.context.sandbox.stub(ProductVariantRepository, 'createOne').resolves({
        getValues() {
            return {
                sku: 1
            };
        }
    });
    t.context.sandbox.stub(PremoderationRepository, 'updateVariantId').resolves({});
    t.context.sandbox.stub(ProductGroupAttributeRepository, 'findOrCreate').resolves({});
    t.context.sandbox.stub(ProductVariantRepository, 'findCountVariant').resolves({});
    t.context.sandbox.stub(ProductGroupRepository, 'update').resolves({});
    t.context.sandbox.stub(WebhookRepository, 'trigger').resolves();
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();
    t.context.sandbox.stub(ProductSkuRepository, 'findOne').resolves(false);
    t.context.sandbox.stub(ProductSkuRepository, 'insertOne').resolves(true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1514450425982'
            },
            body: {
                product_group_id: '11'
            }
        };

        yield Methods.putPremoderationApprove(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Should be return Failed: sku already used', function* (t) {
    const getFindOne = t.context.sandbox.stub(ProductVendorRepository, 'findOne');
    getFindOne.onCall(0).resolves(true);
    getFindOne.onCall(1).resolves(null);

    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves({
        _id: '5a44adf9d1db060001b99a6f',
        id: '1514450425982',
        type: 'new',
        payload: {
            name: 'Iphone Y',
            category_id: 561,
            category: {
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 561
            },
            brand_id: 81,
            uom_id: 1,
            stocking_uom_id: 4,
            quantity_stocking_uom: 1,
            manufacturing_number: 'AP89232423434',
            package_weight: '180',
            package_length: '19',
            package_height: '10',
            package_width: '5',
            package_content: 'tidak ada apa-apa',
            barcode: '924234324',
            description: '<p>lorem ipsum dolorosum de aremo</p>',
            variant_count: 2,
            variant_matrix: [
                'phone_color',
                'phone_storage'
            ],
            specifications: [
                {
                    attribute_id: 3,
                    attribute_code: 'phone_os',
                    attribute_code_label: 'Sistem Operasi',
                    attribute_type: 'dropdown',
                    attribute_value_id: 5,
                    attribute_value_label: 'iOS',
                    attribute_status: 'clear'
                },
                {
                    attribute_id: 4,
                    attribute_code: 'phone_package',
                    attribute_code_label: 'Kelengkapan Paket',
                    attribute_type: 'textinput',
                    attribute_textinput: 'Tidak dilengkapi dengan hardcase',
                    attribute_status: 'clear'
                }
            ],
            products: [
                {
                    index: '33n203',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Black',
                            attribute_value_id: 2,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '32GB',
                            attribute_value_id: 3,
                            attribute_status: 'clear'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '3'
                    },
                    sku_vendor: '121212',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19000000,
                    tier_cogs_price_3: 18000000,
                    stock: 15,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                    additional_image: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 47,
                    is_contract: 1
                },
                {
                    index: '439pa3',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Silver',
                            attribute_value_id: 1,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '64GB',
                            attribute_value_id: 4,
                            attribute_status: 'new'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '4'
                    },
                    sku_vendor: 'X112',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19500000,
                    tier_cogs_price_3: 18500000,
                    stock: 10,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                    additional_image: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 48,
                    is_contract: 0
                }
            ]
        },
        premoderation_status: 'need_revision',
        vendor_id: 16,
        user: {
            id: 11,
            name: 'User Test',
            email: 'user@test.com',
            type: 'vendor'
        },
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2018-01-05T17:25:03.215Z'
    });
    t.context.sandbox.stub(PremoderationRepository, 'findWithStatus').resolves({
        _id: '5a44adf9d1db060001b99a6f',
        id: '1514450425982',
        type: 'new',
        payload: {
            name: 'Iphone Y',
            category_id: 561,
            category: {
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 561
            },
            brand_id: 81,
            uom_id: 1,
            stocking_uom_id: 4,
            quantity_stocking_uom: 1,
            manufacturing_number: 'AP89232423434',
            package_weight: '180',
            package_length: '19',
            package_height: '10',
            package_width: '5',
            package_content: 'tidak ada apa-apa',
            barcode: '924234324',
            description: '<p>lorem ipsum dolorosum de aremo</p>',
            variant_count: 2,
            variant_matrix: [
                'phone_color',
                'phone_storage'
            ],
            specifications: [
                {
                    attribute_id: 3,
                    attribute_code: 'phone_os',
                    attribute_code_label: 'Sistem Operasi',
                    attribute_type: 'dropdown',
                    attribute_value_id: 5,
                    attribute_value_label: 'iOS',
                    attribute_status: 'clear'
                },
                {
                    attribute_id: 4,
                    attribute_code: 'phone_package',
                    attribute_code_label: 'Kelengkapan Paket',
                    attribute_type: 'textinput',
                    attribute_textinput: 'Tidak dilengkapi dengan hardcase',
                    attribute_status: 'clear'
                }
            ],
            products: [
                {
                    index: '33n203',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Black',
                            attribute_value_id: 2,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '32GB',
                            attribute_value_id: 3,
                            attribute_status: 'clear'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '3'
                    },
                    sku_vendor: 'X111',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19000000,
                    tier_cogs_price_3: 18000000,
                    stock: 15,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                    additional_image: '[]',
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 47,
                    is_contract: 1
                },
                {
                    index: '439pa3',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Silver',
                            attribute_value_id: 1,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '64GB',
                            attribute_value_id: 4,
                            attribute_status: 'new'
                        }
                    ],
                    variant_value: 'NO_VARIANT',
                    sku_vendor: 'X112',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19500000,
                    tier_cogs_price_3: 18500000,
                    stock: 10,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                    additional_image: '[]',
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: null,
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 48,
                    is_contract: 0
                }
            ]
        },
        premoderation_status: 'done',
        vendor_id: 16,
        user: {
            id: 11,
            name: 'User Test',
            email: 'user@test.com',
            type: 'vendor'
        },
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2018-01-05T17:25:03.215Z'
    });
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves({
        id: 11,
        name: 'Iphone Y',
        category_id: 561,
        brand_id: 81,
        uom_id: 1,
        stocking_uom_id: 4,
        quantity_stocking_uom: 1,
        manufacturing_number: 'YYYY',
        manufacturing_number_type: null,
        package_weight: 0,
        package_length: '0.00',
        package_width: '0.00',
        package_height: '0.00',
        package_content: null,
        barcode: null,
        description: '',
        primary_image: null,
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 0,
        created_at: '2018-01-05T13:40:00.000Z',
        updated_at: null
    });
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves([
        {
            product_group_id: 11,
            sku: '173F9206R',
            long_name: 'Iphone Y Black 32GB',
            variant_value: '{"phone_color":2,"phone_storage":3}',
            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
            additional_image: '[]',
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1,
            product_vendor: {
                vendor_id: 16,
                warehouse_id: 1,
                location_label: 'Jakarta selatan',
                stock_available: 1,
                stock_used: 1,
                tier_min_qty_1: 10,
                tier_min_qty_2: 20,
                tier_min_qty_3: 30,
                tier_cogs_price_1: 20000000,
                tier_cogs_price_2: 19000000,
                tier_cogs_price_3: 18000000,
                warranty_option: 'international',
                warranty_period: 'week',
                warranty_limit: 1,
                indent_period: null,
                indent_limit: 0,
                is_indent: 0,
                reference_link: '["https://en.wikipedia.org/wiki/IPhone_X"]',
                sku_vendor: 'X111',
                is_active: 1,
                created_by: 11
            },
            index: '33n203'
        },
        {
            product_group_id: 11,
            sku: 'EANWB03KC',
            long_name: 'Iphone Y Silver 64GB',
            variant_value: '{"phone_color":1,"phone_storage":4}',
            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
            additional_image: '[]',
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1,
            product_vendor: {
                vendor_id: 16,
                warehouse_id: 1,
                location_label: 'Jakarta selatan',
                stock_available: 1,
                stock_used: 1,
                tier_min_qty_1: 10,
                tier_min_qty_2: 20,
                tier_min_qty_3: 30,
                tier_cogs_price_1: 20000000,
                tier_cogs_price_2: 19500000,
                tier_cogs_price_3: 18500000,
                warranty_option: 'international',
                warranty_period: 'week',
                warranty_limit: 1,
                indent_period: null,
                indent_limit: 0,
                is_indent: 0,
                reference_link: '["https://en.wikipedia.org/wiki/IPhone_X"]',
                sku_vendor: 'X112',
                is_active: 1,
                created_by: 11
            },
            index: '439pa3'
        }
    ]);

    t.context.sandbox.stub(PremoderationRepository, 'update').resolves({});
    t.context.sandbox.stub(ProductVendorRepository, 'createOne').resolves({});
    t.context.sandbox.stub(ProductVariantRepository, 'createOne').resolves({
        getValues() {
            return {
                sku: 1
            };
        }
    });
    t.context.sandbox.stub(PremoderationRepository, 'updateVariantId').resolves({});
    t.context.sandbox.stub(ProductGroupAttributeRepository, 'findOrCreate').resolves({});
    t.context.sandbox.stub(ProductVariantRepository, 'findCountVariant').resolves({});
    t.context.sandbox.stub(ProductGroupRepository, 'update').resolves({});
    t.context.sandbox.stub(WebhookRepository, 'trigger').resolves();
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();
    t.context.sandbox.stub(ProductSkuRepository, 'findOne').resolves(false);
    t.context.sandbox.stub(ProductSkuRepository, 'insertOne').resolves(true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1514450425982'
            },
            body: {
                product_group_id: '11'
            }
        };

        const result = yield Methods.putPremoderationApprove(data, context);
        const expected = {
            data: {
                id: '1514450425982',
                status: 'done',
                created_at: result.data.created_at,
                updated_at: result.data.updated_at
            }
        };
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'SKU already used');
    }
});

test.serial('Should be return Success with one looping sku', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findOne').resolves(false);
    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves({
        _id: '5a44adf9d1db060001b99a6f',
        id: '1514450425982',
        type: 'new',
        payload: {
            name: 'Iphone Y',
            category_id: 561,
            category: {
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 561
            },
            brand_id: 81,
            uom_id: 1,
            stocking_uom_id: 4,
            quantity_stocking_uom: 1,
            manufacturing_number: 'AP89232423434',
            package_weight: '180',
            package_length: '19',
            package_height: '10',
            package_width: '5',
            package_content: 'tidak ada apa-apa',
            barcode: '924234324',
            description: '<p>lorem ipsum dolorosum de aremo</p>',
            variant_count: 2,
            variant_matrix: [
                'phone_color',
                'phone_storage'
            ],
            specifications: [
                {
                    attribute_id: 3,
                    attribute_code: 'phone_os',
                    attribute_code_label: 'Sistem Operasi',
                    attribute_type: 'dropdown',
                    attribute_value_id: 5,
                    attribute_value_label: 'iOS',
                    attribute_status: 'clear'
                },
                {
                    attribute_id: 4,
                    attribute_code: 'phone_package',
                    attribute_code_label: 'Kelengkapan Paket',
                    attribute_type: 'textinput',
                    attribute_textinput: 'Tidak dilengkapi dengan hardcase',
                    attribute_status: 'clear'
                }
            ],
            products: [
                {
                    index: '33n203',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Black',
                            attribute_value_id: 2,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '32GB',
                            attribute_value_id: 3,
                            attribute_status: 'clear'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '3'
                    },
                    sku_vendor: 'X111',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19000000,
                    tier_cogs_price_3: 18000000,
                    stock: 15,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                    additional_image: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 47
                },
                {
                    index: '439pa3',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Silver',
                            attribute_value_id: 1,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '64GB',
                            attribute_value_id: 4,
                            attribute_status: 'new'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '4'
                    },
                    sku_vendor: 'X112',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19500000,
                    tier_cogs_price_3: 18500000,
                    stock: 10,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                    additional_image: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 48
                }
            ]
        },
        premoderation_status: 'need_revision',
        vendor_id: 16,
        user: {
            id: 11,
            name: 'User Test',
            email: 'user@test.com',
            type: 'vendor'
        },
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2018-01-05T17:25:03.215Z'
    });
    t.context.sandbox.stub(PremoderationRepository, 'findWithStatus').resolves({
        _id: '5a44adf9d1db060001b99a6f',
        id: '1514450425982',
        type: 'new',
        payload: {
            name: 'Iphone Y',
            category_id: 561,
            category: {
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 561
            },
            brand_id: 81,
            uom_id: 1,
            stocking_uom_id: 4,
            quantity_stocking_uom: 1,
            manufacturing_number: 'AP89232423434',
            package_weight: '180',
            package_length: '19',
            package_height: '10',
            package_width: '5',
            package_content: 'tidak ada apa-apa',
            barcode: '924234324',
            description: '<p>lorem ipsum dolorosum de aremo</p>',
            variant_count: 2,
            variant_matrix: [
                'phone_color',
                'phone_storage'
            ],
            specifications: [
                {
                    attribute_id: 3,
                    attribute_code: 'phone_os',
                    attribute_code_label: 'Sistem Operasi',
                    attribute_type: 'dropdown',
                    attribute_value_id: 5,
                    attribute_value_label: 'iOS',
                    attribute_status: 'clear'
                },
                {
                    attribute_id: 4,
                    attribute_code: 'phone_package',
                    attribute_code_label: 'Kelengkapan Paket',
                    attribute_type: 'textinput',
                    attribute_textinput: 'Tidak dilengkapi dengan hardcase',
                    attribute_status: 'clear'
                }
            ],
            products: [
                {
                    index: '33n203',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Black',
                            attribute_value_id: 2,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '32GB',
                            attribute_value_id: 3,
                            attribute_status: 'clear'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '3'
                    },
                    sku_vendor: 'X111',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19000000,
                    tier_cogs_price_3: 18000000,
                    stock: 15,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                    additional_image: '[]',
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 47
                },
                {
                    index: '439pa3',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Silver',
                            attribute_value_id: 1,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '64GB',
                            attribute_value_id: 4,
                            attribute_status: 'new'
                        }
                    ],
                    variant_value: 'NO_VARIANT',
                    sku_vendor: 'X112',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19500000,
                    tier_cogs_price_3: 18500000,
                    stock: 10,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                    additional_image: '[]',
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: null,
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 48
                }
            ]
        },
        premoderation_status: 'done',
        vendor_id: 16,
        user: {
            id: 11,
            name: 'User Test',
            email: 'user@test.com',
            type: 'vendor'
        },
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2018-01-05T17:25:03.215Z'
    });
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves({
        id: 11,
        name: 'Iphone Y',
        category_id: 561,
        brand_id: 81,
        uom_id: 1,
        stocking_uom_id: 4,
        quantity_stocking_uom: 1,
        manufacturing_number: 'YYYY',
        manufacturing_number_type: null,
        package_weight: 0,
        package_length: '0.00',
        package_width: '0.00',
        package_height: '0.00',
        package_content: null,
        barcode: null,
        description: '',
        primary_image: null,
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 0,
        created_at: '2018-01-05T13:40:00.000Z',
        updated_at: null
    });
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves([
        {
            product_group_id: 11,
            sku: '173F9206R',
            long_name: 'Iphone Y Black 32GB',
            variant_value: '{"phone_color":2,"phone_storage":3}',
            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
            additional_image: '[]',
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1,
            product_vendor: {
                vendor_id: 16,
                warehouse_id: 1,
                location_label: 'Jakarta selatan',
                stock_available: 1,
                stock_used: 1,
                tier_min_qty_1: 10,
                tier_min_qty_2: 20,
                tier_min_qty_3: 30,
                tier_cogs_price_1: 20000000,
                tier_cogs_price_2: 19000000,
                tier_cogs_price_3: 18000000,
                warranty_option: 'international',
                warranty_period: 'week',
                warranty_limit: 1,
                indent_period: null,
                indent_limit: 0,
                is_indent: 0,
                reference_link: '["https://en.wikipedia.org/wiki/IPhone_X"]',
                sku_vendor: 'X111',
                is_active: 1,
                created_by: 11
            },
            index: '33n203'
        },
        {
            product_group_id: 11,
            sku: 'EANWB03KC',
            long_name: 'Iphone Y Silver 64GB',
            variant_value: '{"phone_color":1,"phone_storage":4}',
            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
            additional_image: '[]',
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1,
            product_vendor: {
                vendor_id: 16,
                warehouse_id: 1,
                location_label: 'Jakarta selatan',
                stock_available: 1,
                stock_used: 1,
                tier_min_qty_1: 10,
                tier_min_qty_2: 20,
                tier_min_qty_3: 30,
                tier_cogs_price_1: 20000000,
                tier_cogs_price_2: 19500000,
                tier_cogs_price_3: 18500000,
                warranty_option: 'international',
                warranty_period: 'week',
                warranty_limit: 1,
                indent_period: null,
                indent_limit: 0,
                is_indent: 0,
                reference_link: '["https://en.wikipedia.org/wiki/IPhone_X"]',
                sku_vendor: 'X112',
                is_active: 1,
                created_by: 11
            },
            index: '439pa3'
        }
    ]);

    t.context.sandbox.stub(PremoderationRepository, 'update').resolves({});
    t.context.sandbox.stub(ProductVendorRepository, 'createOne').resolves({});
    t.context.sandbox.stub(ProductVariantRepository, 'createOne').resolves({
        getValues() {
            return {
                sku: 1
            };
        }
    });
    t.context.sandbox.stub(PremoderationRepository, 'updateVariantId').resolves({});
    t.context.sandbox.stub(ProductGroupAttributeRepository, 'findOrCreate').resolves({});
    t.context.sandbox.stub(ProductVariantRepository, 'findCountVariant').resolves({});
    t.context.sandbox.stub(ProductGroupRepository, 'update').resolves({});
    t.context.sandbox.stub(WebhookRepository, 'trigger').resolves();
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();
    const callback = t.context.sandbox.stub(ProductSkuRepository, 'findOne');
    callback.resolves({
        id: 1
    });
    callback.onCall(1).resolves(null);
    callback.onCall(2).resolves(null);
    callback.onCall(3).resolves(null);
    t.context.sandbox.stub(ProductSkuRepository, 'insertOne').resolves(true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1514450425982'
            },
            body: {
                product_group_id: '11'
            }
        };

        const result = yield Methods.putPremoderationApprove(data, context);
        const expected = {
            data: {
                id: '1514450425982',
                status: 'done',
                created_at: result.data.created_at,
                updated_at: result.data.updated_at
            }
        };

        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return No Spec and Variant', function* (t) {
    const getFindOne = t.context.sandbox.stub(ProductVendorRepository, 'findOne');
    getFindOne.onCall(0).resolves(false);
    getFindOne.onCall(1).resolves(null);

    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves({
        _id: '5a44adf9d1db060001b99a6f',
        id: '1514450425982',
        type: 'new',
        payload: {
            name: 'Iphone Y',
            category_id: 561,
            category: {
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 561
            },
            brand_id: 81,
            uom_id: 1,
            stocking_uom_id: 4,
            quantity_stocking_uom: 1,
            manufacturing_number: 'AP89232423434',
            package_weight: '180',
            package_length: '19',
            package_height: '10',
            package_width: '5',
            package_content: 'tidak ada apa-apa',
            barcode: '924234324',
            description: '<p>lorem ipsum dolorosum de aremo</p>',
            variant_count: 0,
            variant_matrix: [],
            specifications: [],
            products: []
        },
        premoderation_status: 'need_revision',
        vendor_id: 16,
        user: {
            id: 11,
            name: 'User Test',
            email: 'user@test.com',
            type: 'vendor'
        },
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2018-01-05T17:25:03.215Z'
    });
    t.context.sandbox.stub(PremoderationRepository, 'findWithStatus').resolves({
        _id: '5a44adf9d1db060001b99a6f',
        id: '1514450425982',
        type: 'new',
        payload: {
            name: 'Iphone Y',
            category_id: 561,
            category: {
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 561
            },
            brand_id: 81,
            uom_id: 1,
            stocking_uom_id: 4,
            quantity_stocking_uom: 1,
            manufacturing_number: 'AP89232423434',
            package_weight: '180',
            package_length: '19',
            package_height: '10',
            package_width: '5',
            package_content: 'tidak ada apa-apa',
            barcode: '924234324',
            description: '<p>lorem ipsum dolorosum de aremo</p>',
            variant_count: 0,
            variant_matrix: [
                'phone_color',
                'phone_storage'
            ],
            specifications: [
                {
                    attribute_id: 3,
                    attribute_code: 'phone_os',
                    attribute_code_label: 'Sistem Operasi',
                    attribute_type: 'dropdown',
                    attribute_value_id: 5,
                    attribute_value_label: 'iOS',
                    attribute_status: 'clear'
                },
                {
                    attribute_id: 4,
                    attribute_code: 'phone_package',
                    attribute_code_label: 'Kelengkapan Paket',
                    attribute_type: 'textinput',
                    attribute_textinput: 'Tidak dilengkapi dengan hardcase',
                    attribute_status: 'clear'
                }
            ],
            products: [
                {
                    index: '33n203',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Black',
                            attribute_value_id: 2,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '32GB',
                            attribute_value_id: 3,
                            attribute_status: 'clear'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '3'
                    },
                    sku_vendor: 'X111',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19000000,
                    tier_cogs_price_3: 18000000,
                    stock: 15,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                    additional_image: '[]',
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 47
                },
                {
                    index: '439pa3',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Silver',
                            attribute_value_id: 1,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '64GB',
                            attribute_value_id: 4,
                            attribute_status: 'new'
                        }
                    ],
                    variant_value: 'NO_VARIANT',
                    sku_vendor: 'X112',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19500000,
                    tier_cogs_price_3: 18500000,
                    stock: 10,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                    additional_image: '[]',
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: null,
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 48
                }
            ]
        },
        premoderation_status: 'done',
        vendor_id: 16,
        user: {
            id: 11,
            name: 'User Test',
            email: 'user@test.com',
            type: 'vendor'
        },
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2018-01-05T17:25:03.215Z'
    });
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves({
        id: 11,
        name: 'Iphone Y',
        category_id: 561,
        brand_id: 81,
        uom_id: 1,
        stocking_uom_id: 4,
        quantity_stocking_uom: 1,
        manufacturing_number: 'YYYY',
        manufacturing_number_type: null,
        package_weight: 0,
        package_length: '0.00',
        package_width: '0.00',
        package_height: '0.00',
        package_content: null,
        barcode: null,
        description: '',
        primary_image: null,
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 0,
        created_at: '2018-01-05T13:40:00.000Z',
        updated_at: null
    });
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves([
        {
            product_group_id: 11,
            sku: '173F9206R',
            long_name: 'Iphone Y Black 32GB',
            variant_value: '{"phone_color":2,"phone_storage":3}',
            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
            additional_image: '[]',
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1,
            product_vendor: {
                vendor_id: 16,
                warehouse_id: 1,
                location_label: 'Jakarta selatan',
                stock_available: 1,
                stock_used: 1,
                tier_min_qty_1: 10,
                tier_min_qty_2: 20,
                tier_min_qty_3: 30,
                tier_cogs_price_1: 20000000,
                tier_cogs_price_2: 19000000,
                tier_cogs_price_3: 18000000,
                warranty_option: 'international',
                warranty_period: 'week',
                warranty_limit: 1,
                indent_period: null,
                indent_limit: 0,
                is_indent: 0,
                reference_link: '["https://en.wikipedia.org/wiki/IPhone_X"]',
                sku_vendor: 'X111',
                is_active: 1,
                created_by: 11
            },
            index: '33n203'
        },
        {
            product_group_id: 11,
            sku: 'EANWB03KC',
            long_name: 'Iphone Y Silver 64GB',
            variant_value: '{"phone_color":1,"phone_storage":4}',
            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
            additional_image: '[]',
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1,
            product_vendor: {
                vendor_id: 16,
                warehouse_id: 1,
                location_label: 'Jakarta selatan',
                stock_available: 1,
                stock_used: 1,
                tier_min_qty_1: 10,
                tier_min_qty_2: 20,
                tier_min_qty_3: 30,
                tier_cogs_price_1: 20000000,
                tier_cogs_price_2: 19500000,
                tier_cogs_price_3: 18500000,
                warranty_option: 'international',
                warranty_period: 'week',
                warranty_limit: 1,
                indent_period: null,
                indent_limit: 0,
                is_indent: 0,
                reference_link: '["https://en.wikipedia.org/wiki/IPhone_X"]',
                sku_vendor: 'X112',
                is_active: 1,
                created_by: 11
            },
            index: '439pa3'
        }
    ]);

    t.context.sandbox.stub(PremoderationRepository, 'update').resolves({});
    t.context.sandbox.stub(ProductVendorRepository, 'createOne').resolves({});
    t.context.sandbox.stub(ProductVariantRepository, 'createOne').resolves({
        getValues() {
            return {
                sku: 1
            };
        }
    });
    t.context.sandbox.stub(PremoderationRepository, 'updateVariantId').resolves({});
    t.context.sandbox.stub(ProductGroupAttributeRepository, 'findOrCreate').resolves({});
    t.context.sandbox.stub(ProductVariantRepository, 'findCountVariant').resolves({});
    t.context.sandbox.stub(ProductGroupRepository, 'update').resolves({});
    t.context.sandbox.stub(WebhookRepository, 'trigger').resolves();
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();
    t.context.sandbox.stub(ProductSkuRepository, 'findOne').resolves(false);
    t.context.sandbox.stub(ProductSkuRepository, 'insertOne').resolves(true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1514450425982'
            },
            body: {
                product_group_id: '11'
            }
        };

        const result = yield Methods.putPremoderationApprove(data, context);
        const expected = {
            data: {
                id: '1514450425982',
                status: 'done',
                created_at: result.data.created_at,
                updated_at: result.data.updated_at
            }
        };

        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return Success Variant Count 0', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findOne').resolves(false);

    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves({
        _id: '5a44adf9d1db060001b99a6f',
        id: '1514450425982',
        type: 'new',
        payload: {
            name: 'Iphone Y',
            category_id: 561,
            category: {
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 561
            },
            brand_id: 81,
            uom_id: 1,
            stocking_uom_id: 4,
            quantity_stocking_uom: 1,
            manufacturing_number: 'AP89232423434',
            package_weight: '180',
            package_length: '19',
            package_height: '10',
            package_width: '5',
            package_content: 'tidak ada apa-apa',
            barcode: '924234324',
            description: '<p>lorem ipsum dolorosum de aremo</p>',
            variant_count: 2,
            variant_matrix: [
                'phone_color',
                'phone_storage'
            ],
            specifications: [
                {
                    attribute_id: 3,
                    attribute_code: 'phone_os',
                    attribute_code_label: 'Sistem Operasi',
                    attribute_type: 'dropdown',
                    attribute_value_id: 5,
                    attribute_value_label: 'iOS',
                    attribute_status: 'clear'
                },
                {
                    attribute_id: 4,
                    attribute_code: 'phone_package',
                    attribute_code_label: 'Kelengkapan Paket',
                    attribute_type: 'textinput',
                    attribute_textinput: 'Tidak dilengkapi dengan hardcase',
                    attribute_status: 'clear'
                }
            ],
            products: [
                {
                    index: '33n203',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Black',
                            attribute_value_id: 2,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '32GB',
                            attribute_value_id: 3,
                            attribute_status: 'clear'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '3'
                    },
                    sku_vendor: 'X111',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19000000,
                    tier_cogs_price_3: 18000000,
                    stock: 15,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                    additional_image: '[]',
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 47
                },
                {
                    index: '439pa3',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Silver',
                            attribute_value_id: 1,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '64GB',
                            attribute_value_id: 4,
                            attribute_status: 'new'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '4'
                    },
                    sku_vendor: 'X112',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19500000,
                    tier_cogs_price_3: 18500000,
                    stock: 10,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                    additional_image: '[]',
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 48
                }
            ]
        },
        premoderation_status: 'need_revision',
        vendor_id: 16,
        user: {
            id: 11,
            name: 'User Test',
            email: 'user@test.com',
            type: 'vendor'
        },
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2018-01-05T17:25:03.215Z'
    });
    t.context.sandbox.stub(PremoderationRepository, 'findWithStatus').resolves({
        _id: '5a44adf9d1db060001b99a6f',
        id: '1514450425982',
        type: 'new',
        payload: {
            name: 'Iphone Y',
            category_id: 561,
            category: {
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 561
            },
            brand_id: 81,
            uom_id: 1,
            stocking_uom_id: 4,
            quantity_stocking_uom: 1,
            manufacturing_number: 'AP89232423434',
            package_weight: '180',
            package_length: '19',
            package_height: '10',
            package_width: '5',
            package_content: 'tidak ada apa-apa',
            barcode: '924234324',
            description: '<p>lorem ipsum dolorosum de aremo</p>',
            variant_count: 2,
            variant_matrix: [
                'phone_color',
                'phone_storage'
            ],
            specifications: [
                {
                    attribute_id: 3,
                    attribute_code: 'phone_os',
                    attribute_code_label: 'Sistem Operasi',
                    attribute_type: 'dropdown',
                    attribute_value_id: 5,
                    attribute_value_label: 'iOS',
                    attribute_status: 'clear'
                },
                {
                    attribute_id: 4,
                    attribute_code: 'phone_package',
                    attribute_code_label: 'Kelengkapan Paket',
                    attribute_type: 'textinput',
                    attribute_textinput: 'Tidak dilengkapi dengan hardcase',
                    attribute_status: 'clear'
                }
            ],
            products: [
                {
                    index: '33n203',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Black',
                            attribute_value_id: 2,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '32GB',
                            attribute_value_id: 3,
                            attribute_status: 'clear'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '3'
                    },
                    sku_vendor: '',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19000000,
                    tier_cogs_price_3: 18000000,
                    stock: 15,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                    additional_image: '[]',
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 47
                },
                {
                    index: '439pa3',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Silver',
                            attribute_value_id: 1,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '64GB',
                            attribute_value_id: 4,
                            attribute_status: 'new'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '4'
                    },
                    sku_vendor: 'X112',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19500000,
                    tier_cogs_price_3: 18500000,
                    stock: 10,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                    additional_image: '[]',
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: '',
                    variant_status: 'pending',
                    product_variant_id: 48
                }
            ]
        },
        premoderation_status: 'done',
        vendor_id: 16,
        user: {
            id: 11,
            name: 'User Test',
            email: 'user@test.com',
            type: 'vendor'
        },
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2018-01-05T17:25:03.215Z'
    });
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves({
        id: 11,
        name: 'Iphone Y',
        category_id: 561,
        brand_id: 81,
        uom_id: 1,
        stocking_uom_id: 4,
        quantity_stocking_uom: 1,
        manufacturing_number: 'YYYY',
        manufacturing_number_type: null,
        package_weight: 0,
        package_length: '0.00',
        package_width: '0.00',
        package_height: '0.00',
        package_content: null,
        barcode: null,
        description: '',
        primary_image: null,
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 0,
        created_at: '2018-01-05T13:40:00.000Z',
        updated_at: null
    });
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves([
        {
            product_group_id: 11,
            sku: '173F9206R',
            long_name: 'Iphone Y Black 32GB',
            variant_value: '{"phone_color":2,"phone_storage":3}',
            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
            additional_image: '[]',
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1,
            product_vendor: {
                vendor_id: 16,
                warehouse_id: 1,
                location_label: 'Jakarta selatan',
                stock_available: 1,
                stock_used: 1,
                tier_min_qty_1: 10,
                tier_min_qty_2: 20,
                tier_min_qty_3: 30,
                tier_cogs_price_1: 20000000,
                tier_cogs_price_2: 19000000,
                tier_cogs_price_3: 18000000,
                warranty_option: 'international',
                warranty_period: 'week',
                warranty_limit: 1,
                indent_period: null,
                indent_limit: '',
                is_indent: 0,
                reference_link: '["https://en.wikipedia.org/wiki/IPhone_X"]',
                sku_vendor: 'X111',
                is_active: 1,
                created_by: 11
            },
            index: '33n203'
        },
        {
            product_group_id: 11,
            sku: 'EANWB03KC',
            long_name: 'Iphone Y Silver 64GB',
            variant_value: '{"phone_color":1,"phone_storage":4}',
            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
            additional_image: '[]',
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1,
            product_vendor: {
                vendor_id: 16,
                warehouse_id: 1,
                location_label: 'Jakarta selatan',
                stock_available: 1,
                stock_used: 1,
                tier_min_qty_1: 10,
                tier_min_qty_2: 20,
                tier_min_qty_3: 30,
                tier_cogs_price_1: 20000000,
                tier_cogs_price_2: 19500000,
                tier_cogs_price_3: 18500000,
                warranty_option: 'international',
                warranty_period: 'week',
                warranty_limit: 1,
                indent_period: null,
                indent_limit: 0,
                is_indent: 0,
                reference_link: '["https://en.wikipedia.org/wiki/IPhone_X"]',
                sku_vendor: 'X112',
                is_active: 1,
                created_by: 11
            },
            index: '439pa3'
        }
    ]);

    t.context.sandbox.stub(PremoderationRepository, 'update').resolves({});
    t.context.sandbox.stub(ProductVendorRepository, 'createOne').resolves({});
    t.context.sandbox.stub(ProductVariantRepository, 'createOne').resolves({
        getValues() {
            return {
                sku: 1
            };
        }
    });
    t.context.sandbox.stub(PremoderationRepository, 'updateVariantId').resolves({});
    t.context.sandbox.stub(ProductGroupAttributeRepository, 'findOrCreate').resolves({});
    t.context.sandbox.stub(ProductVariantRepository, 'findCountVariant').resolves({
        count: 0
    });
    t.context.sandbox.stub(ProductGroupRepository, 'update').resolves({});
    t.context.sandbox.stub(WebhookRepository, 'trigger').resolves();
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();
    t.context.sandbox.stub(ProductSkuRepository, 'findOne').resolves(false);
    t.context.sandbox.stub(ProductSkuRepository, 'insertOne').resolves(true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1514450425982'
            },
            body: {
                product_group_id: '11'
            }
        };

        const result = yield Methods.putPremoderationApprove(data, context);
        const expected = {
            data: {
                id: '1514450425982',
                status: 'done',
                created_at: result.data.created_at,
                updated_at: result.data.updated_at
            }
        };

        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return Forbidden user', function* (t) {
    try {
        const context = {
            user: ''
        };
        const data = {
            path: {
                id: '1514450425982'
            },
            body: {
                product_group_id: '11'
            }
        };

        yield Methods.putPremoderationApprove(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, 'You are not authorized user');
    }
});

test.serial('Should be return Update Mongo Product Variant Id', function* (t) {
    const getFindOne = t.context.sandbox.stub(ProductVendorRepository, 'findOne');
    getFindOne.onCall(0).resolves(false);
    getFindOne.onCall(1).resolves(false);
    getFindOne.onCall(2).resolves({});

    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves({
        _id: '5a44adf9d1db060001b99a6f',
        id: '1514450425982',
        type: 'new',
        payload: {
            name: 'Iphone Y',
            category_id: 561,
            category: {
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 561
            },
            brand_id: 81,
            uom_id: 1,
            stocking_uom_id: 4,
            quantity_stocking_uom: 1,
            manufacturing_number: 'AP89232423434',
            package_weight: '180',
            package_length: '19',
            package_height: '10',
            package_width: '5',
            package_content: 'tidak ada apa-apa',
            barcode: '924234324',
            description: '<p>lorem ipsum dolorosum de aremo</p>',
            variant_count: 2,
            variant_matrix: [
                'phone_color',
                'phone_storage'
            ],
            specifications: [
                {
                    attribute_id: 3,
                    attribute_code: 'phone_os',
                    attribute_code_label: 'Sistem Operasi',
                    attribute_type: 'dropdown',
                    attribute_value_id: 5,
                    attribute_value_label: 'iOS',
                    attribute_status: 'clear'
                },
                {
                    attribute_id: 4,
                    attribute_code: 'phone_package',
                    attribute_code_label: 'Kelengkapan Paket',
                    attribute_type: 'textinput',
                    attribute_textinput: 'Tidak dilengkapi dengan hardcase',
                    attribute_status: 'clear'
                }
            ],
            products: [
                {
                    index: '33n203',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Black',
                            attribute_value_id: 2,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '32GB',
                            attribute_value_id: 3,
                            attribute_status: 'clear'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '3'
                    },
                    sku_vendor: 'X11121',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19000000,
                    tier_cogs_price_3: 18000000,
                    stock: 15,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                    additional_image: '[]',
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 47
                },
                {
                    index: '439pa3',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Silver',
                            attribute_value_id: 1,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '64GB',
                            attribute_value_id: 4,
                            attribute_status: 'new'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '4'
                    },
                    sku_vendor: 'X11123121',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19500000,
                    tier_cogs_price_3: 18500000,
                    stock: 10,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                    additional_image: '[]',
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 48
                }
            ]
        },
        premoderation_status: 'need_revision',
        vendor_id: 16,
        user: {
            id: 11,
            name: 'User Test',
            email: 'user@test.com',
            type: 'vendor'
        },
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2018-01-05T17:25:03.215Z'
    });
    t.context.sandbox.stub(PremoderationRepository, 'findWithStatus').resolves({
        _id: '5a44adf9d1db060001b99a6f',
        id: '1514450425982',
        type: 'new',
        payload: {
            name: 'Iphone Y',
            category_id: 561,
            category: {
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 561
            },
            brand_id: 81,
            uom_id: 1,
            stocking_uom_id: 4,
            quantity_stocking_uom: 1,
            manufacturing_number: 'AP89232423434',
            package_weight: '180',
            package_length: '19',
            package_height: '10',
            package_width: '5',
            package_content: 'tidak ada apa-apa',
            barcode: '924234324',
            description: '<p>lorem ipsum dolorosum de aremo</p>',
            variant_count: 2,
            variant_matrix: [
                'phone_color',
                'phone_storage'
            ],
            specifications: [
                {
                    attribute_id: 3,
                    attribute_code: 'phone_os',
                    attribute_code_label: 'Sistem Operasi',
                    attribute_type: 'dropdown',
                    attribute_value_id: 5,
                    attribute_value_label: 'iOS',
                    attribute_status: 'clear'
                },
                {
                    attribute_id: 4,
                    attribute_code: 'phone_package',
                    attribute_code_label: 'Kelengkapan Paket',
                    attribute_type: 'textinput',
                    attribute_textinput: 'Tidak dilengkapi dengan hardcase',
                    attribute_status: 'clear'
                }
            ],
            products: [
                {
                    index: '33n203',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Black',
                            attribute_value_id: 2,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '32GB',
                            attribute_value_id: 3,
                            attribute_status: 'clear'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '3'
                    },
                    sku_vendor: 'X145411',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19000000,
                    tier_cogs_price_3: 18000000,
                    stock: 15,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                    additional_image: '[]',
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 47
                },
                {
                    index: '439pa3',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Silver',
                            attribute_value_id: 1,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '64GB',
                            attribute_value_id: 4,
                            attribute_status: 'new'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '4'
                    },
                    sku_vendor: 'X1112',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19500000,
                    tier_cogs_price_3: 18500000,
                    stock: 10,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                    additional_image: '[]',
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 48
                }
            ]
        },
        premoderation_status: 'done',
        vendor_id: 16,
        user: {
            id: 11,
            name: 'User Test',
            email: 'user@test.com',
            type: 'vendor'
        },
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2018-01-05T17:25:03.215Z'
    });
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves({
        id: 11,
        name: 'Iphone Y',
        category_id: 561,
        brand_id: 81,
        uom_id: 1,
        stocking_uom_id: 4,
        quantity_stocking_uom: 1,
        manufacturing_number: 'YYYY',
        manufacturing_number_type: null,
        package_weight: 0,
        package_length: '0.00',
        package_width: '0.00',
        package_height: '0.00',
        package_content: null,
        barcode: null,
        description: '',
        primary_image: null,
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 0,
        created_at: '2018-01-05T13:40:00.000Z',
        updated_at: null
    });
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves(null);

    t.context.sandbox.stub(PremoderationRepository, 'update').resolves({});
    t.context.sandbox.stub(ProductVendorRepository, 'createOne').resolves({});
    t.context.sandbox.stub(ProductVariantRepository, 'createOne').resolves({
        getValues() {
            return {
                sku: 1
            };
        }
    });
    t.context.sandbox.stub(PremoderationRepository, 'updateVariantId').resolves({});
    t.context.sandbox.stub(ProductGroupAttributeRepository, 'findOrCreate').resolves({});
    t.context.sandbox.stub(ProductVariantRepository, 'findCountVariant').resolves({});
    t.context.sandbox.stub(ProductGroupRepository, 'update').resolves({});
    t.context.sandbox.stub(WebhookRepository, 'trigger').resolves();
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();
    t.context.sandbox.stub(ProductSkuRepository, 'findOne').resolves(false);
    t.context.sandbox.stub(ProductSkuRepository, 'insertOne').resolves(true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1514450425982'
            },
            body: {
                product_group_id: '11'
            }
        };

        const result = yield Methods.putPremoderationApprove(data, context);
        const expected = {
            data: {
                id: '1514450425982',
                status: 'done',
                created_at: result.data.created_at,
                updated_at: result.data.updated_at
            }
        };

        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return Bad Request Product Variant Already Exist', function* (t) {
    const getFindOne = t.context.sandbox.stub(ProductVendorRepository, 'findOne');
    getFindOne.onCall(0).resolves(false);
    getFindOne.onCall(1).resolves({});

    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves({
        _id: '5a44adf9d1db060001b99a6f',
        id: '1514450425982',
        type: 'new',
        payload: {
            name: 'Iphone Y',
            category_id: 561,
            category: {
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 561
            },
            brand_id: 81,
            uom_id: 1,
            stocking_uom_id: 4,
            quantity_stocking_uom: 1,
            manufacturing_number: 'AP89232423434',
            package_weight: '180',
            package_length: '19',
            package_height: '10',
            package_width: '5',
            package_content: 'tidak ada apa-apa',
            barcode: '924234324',
            description: '<p>lorem ipsum dolorosum de aremo</p>',
            variant_count: 2,
            variant_matrix: [
                'phone_color',
                'phone_storage'
            ],
            specifications: [
                {
                    attribute_id: 3,
                    attribute_code: 'phone_os',
                    attribute_code_label: 'Sistem Operasi',
                    attribute_type: 'dropdown',
                    attribute_value_id: 5,
                    attribute_value_label: 'iOS',
                    attribute_status: 'clear'
                },
                {
                    attribute_id: 4,
                    attribute_code: 'phone_package',
                    attribute_code_label: 'Kelengkapan Paket',
                    attribute_type: 'textinput',
                    attribute_textinput: 'Tidak dilengkapi dengan hardcase',
                    attribute_status: 'clear'
                }
            ],
            products: [
                {
                    index: '33n203',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Black',
                            attribute_value_id: 2,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '32GB',
                            attribute_value_id: 3,
                            attribute_status: 'clear'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '3'
                    },
                    sku_vendor: 'X111',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19000000,
                    tier_cogs_price_3: 18000000,
                    stock: 15,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                    additional_image: '[]',
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 47
                },
                {
                    index: '439pa3',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Silver',
                            attribute_value_id: 1,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '64GB',
                            attribute_value_id: 4,
                            attribute_status: 'new'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '4'
                    },
                    sku_vendor: 'X112',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19500000,
                    tier_cogs_price_3: 18500000,
                    stock: 10,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                    additional_image: '[]',
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 48
                }
            ]
        },
        premoderation_status: 'need_revision',
        vendor_id: 16,
        user: {
            id: 11,
            name: 'User Test',
            email: 'user@test.com',
            type: 'vendor'
        },
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2018-01-05T17:25:03.215Z'
    });
    t.context.sandbox.stub(PremoderationRepository, 'findWithStatus').resolves({
        _id: '5a44adf9d1db060001b99a6f',
        id: '1514450425982',
        type: 'new',
        payload: {
            name: 'Iphone Y',
            category_id: 561,
            category: {
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 561
            },
            brand_id: 81,
            uom_id: 1,
            stocking_uom_id: 4,
            quantity_stocking_uom: 1,
            manufacturing_number: 'AP89232423434',
            package_weight: '180',
            package_length: '19',
            package_height: '10',
            package_width: '5',
            package_content: 'tidak ada apa-apa',
            barcode: '924234324',
            description: '<p>lorem ipsum dolorosum de aremo</p>',
            variant_count: 2,
            variant_matrix: [
                'phone_color',
                'phone_storage'
            ],
            specifications: [
                {
                    attribute_id: 3,
                    attribute_code: 'phone_os',
                    attribute_code_label: 'Sistem Operasi',
                    attribute_type: 'dropdown',
                    attribute_value_id: 5,
                    attribute_value_label: 'iOS',
                    attribute_status: 'clear'
                },
                {
                    attribute_id: 4,
                    attribute_code: 'phone_package',
                    attribute_code_label: 'Kelengkapan Paket',
                    attribute_type: 'textinput',
                    attribute_textinput: 'Tidak dilengkapi dengan hardcase',
                    attribute_status: 'clear'
                }
            ],
            products: [
                {
                    index: '33n203',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Black',
                            attribute_value_id: 2,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '32GB',
                            attribute_value_id: 3,
                            attribute_status: 'clear'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '3'
                    },
                    sku_vendor: 'X111',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19000000,
                    tier_cogs_price_3: 18000000,
                    stock: 15,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                    additional_image: '[]',
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 47
                },
                {
                    index: '439pa3',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Silver',
                            attribute_value_id: 1,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '64GB',
                            attribute_value_id: 4,
                            attribute_status: 'new'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '4'
                    },
                    sku_vendor: 'X112',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19500000,
                    tier_cogs_price_3: 18500000,
                    stock: 10,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                    additional_image: '[]',
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 48
                }
            ]
        },
        premoderation_status: 'done',
        vendor_id: 16,
        user: {
            id: 11,
            name: 'User Test',
            email: 'user@test.com',
            type: 'vendor'
        },
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2018-01-05T17:25:03.215Z'
    });
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves({
        id: 11,
        name: 'Iphone Y',
        category_id: 561,
        brand_id: 81,
        uom_id: 1,
        stocking_uom_id: 4,
        quantity_stocking_uom: 1,
        manufacturing_number: 'YYYY',
        manufacturing_number_type: null,
        package_weight: 0,
        package_length: '0.00',
        package_width: '0.00',
        package_height: '0.00',
        package_content: null,
        barcode: null,
        description: '',
        primary_image: null,
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 0,
        created_at: '2018-01-05T13:40:00.000Z',
        updated_at: null
    });
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves({
        id: 47,
        product_group_id: 11,
        sku: 'G3STWISZV',
        long_name: 'Iphone Y Black 32GB',
        variant_value: '{"phone_color":2,"phone_storage":3}',
        primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
        additional_image: '[]',
        product_id_magento: null,
        product_id_netsuite: null,
        is_primary: 1,
        is_discontinue: 0,
        is_active: 1,
        created_at: '2018-01-05T17:25:01.000Z',
        updated_at: '2018-01-05T17:25:01.000Z'
    });
    t.context.sandbox.stub(PremoderationRepository, 'update').resolves({});
    t.context.sandbox.stub(ProductVendorRepository, 'createOne').resolves({});
    t.context.sandbox.stub(ProductVariantRepository, 'createOne').resolves({
        getValues() {
            return {
                sku: 1
            };
        }
    });
    t.context.sandbox.stub(PremoderationRepository, 'updateVariantId').resolves({});
    t.context.sandbox.stub(ProductGroupAttributeRepository, 'findOrCreate').resolves({});
    t.context.sandbox.stub(ProductVariantRepository, 'findCountVariant').resolves({});
    t.context.sandbox.stub(WebhookRepository, 'trigger').resolves();
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();
    t.context.sandbox.stub(ProductSkuRepository, 'findOne').resolves(false);
    t.context.sandbox.stub(ProductSkuRepository, 'insertOne').resolves(true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1514450425982'
            },
            body: {
                product_group_id: '11'
            }
        };

        yield Methods.putPremoderationApprove(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'Variant already exists');
    }
});

test.serial('Should be return Premoderation Bad Request Joi', function* (t) {
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1514450425982'
            },
            body: {
                product_group_id: ''
            }
        };

        yield Methods.putPremoderationApprove(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Should be return Premoderation Not Found', function* (t) {
    const getFindOne = t.context.sandbox.stub(ProductVendorRepository, 'findOne');
    getFindOne.onCall(0).resolves(false);
    getFindOne.onCall(1).resolves(null);

    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves(null);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1514450425982345'
            },
            body: {
                product_group_id: '11'
            }
        };

        yield Methods.putPremoderationApprove(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'Premoderation Not Found');
    }
});

test.serial('Should be return Premoderation Status Done', function* (t) {
    const getFindOne = t.context.sandbox.stub(ProductVendorRepository, 'findOne');
    getFindOne.onCall(0).resolves(false);
    getFindOne.onCall(1).resolves(null);

    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves({
        _id: '5a44adf9d1db060001b99a6f',
        id: '1514450425982',
        type: 'new',
        payload: {
            name: 'Iphone Y',
            category_id: 561,
            category: {
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 561
            },
            brand_id: 81,
            uom_id: 1,
            stocking_uom_id: 4,
            quantity_stocking_uom: 1,
            manufacturing_number: 'AP89232423434',
            package_weight: '180',
            package_length: '19',
            package_height: '10',
            package_width: '5',
            package_content: 'tidak ada apa-apa',
            barcode: '924234324',
            description: '<p>lorem ipsum dolorosum de aremo</p>',
            variant_count: 2,
            variant_matrix: [
                'phone_color',
                'phone_storage'
            ],
            specifications: [
                {
                    attribute_id: 3,
                    attribute_code: 'phone_os',
                    attribute_code_label: 'Sistem Operasi',
                    attribute_type: 'dropdown',
                    attribute_value_id: 5,
                    attribute_value_label: 'iOS',
                    attribute_status: 'clear'
                },
                {
                    attribute_id: 4,
                    attribute_code: 'phone_package',
                    attribute_code_label: 'Kelengkapan Paket',
                    attribute_type: 'textinput',
                    attribute_textinput: 'Tidak dilengkapi dengan hardcase',
                    attribute_status: 'clear'
                }
            ],
            products: [
                {
                    index: '33n203',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Black',
                            attribute_value_id: 2,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '32GB',
                            attribute_value_id: 3,
                            attribute_status: 'clear'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '3'
                    },
                    sku_vendor: 'X111',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19000000,
                    tier_cogs_price_3: 18000000,
                    stock: 15,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                    additional_images: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 47
                },
                {
                    index: '439pa3',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Silver',
                            attribute_value_id: 1,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '64GB',
                            attribute_value_id: 4,
                            attribute_status: 'new'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '4'
                    },
                    sku_vendor: 'X112',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19500000,
                    tier_cogs_price_3: 18500000,
                    stock: 10,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                    additional_images: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 48
                }
            ]
        },
        premoderation_status: 'done',
        vendor_id: 16,
        user: {
            id: 11,
            name: 'User Test',
            email: 'user@test.com',
            type: 'vendor'
        },
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2018-01-05T17:25:03.215Z'
    });
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1514450425982'
            },
            body: {
                product_group_id: '11'
            }
        };

        yield Methods.putPremoderationApprove(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'Premoderation status cannot be processed: done');
    }
});

test.serial('Should be return Premoderation Already Done', function* (t) {
    const getFindOne = t.context.sandbox.stub(ProductVendorRepository, 'findOne');
    getFindOne.onCall(0).resolves(false);
    getFindOne.onCall(1).resolves(null);

    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves({
        _id: '5a44adf9d1db060001b99a6f',
        id: '1514450425982',
        type: 'new',
        payload: {
            name: 'Iphone Y',
            category_id: 561,
            category: {
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 561
            },
            brand_id: 81,
            uom_id: 1,
            stocking_uom_id: 4,
            quantity_stocking_uom: 1,
            manufacturing_number: 'AP89232423434',
            package_weight: '180',
            package_length: '19',
            package_height: '10',
            package_width: '5',
            package_content: 'tidak ada apa-apa',
            barcode: '924234324',
            description: '<p>lorem ipsum dolorosum de aremo</p>',
            variant_count: 2,
            variant_matrix: [
                'phone_color',
                'phone_storage'
            ],
            specifications: [
                {
                    attribute_id: 3,
                    attribute_code: 'phone_os',
                    attribute_code_label: 'Sistem Operasi',
                    attribute_type: 'dropdown',
                    attribute_value_id: 5,
                    attribute_value_label: 'iOS',
                    attribute_status: 'clear'
                },
                {
                    attribute_id: 4,
                    attribute_code: 'phone_package',
                    attribute_code_label: 'Kelengkapan Paket',
                    attribute_type: 'textinput',
                    attribute_textinput: 'Tidak dilengkapi dengan hardcase',
                    attribute_status: 'clear'
                }
            ],
            products: [
                {
                    index: '33n203',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Black',
                            attribute_value_id: 2,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '32GB',
                            attribute_value_id: 3,
                            attribute_status: 'clear'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '3'
                    },
                    sku_vendor: 'X111',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19000000,
                    tier_cogs_price_3: 18000000,
                    stock: 15,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                    additional_images: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 47
                },
                {
                    index: '439pa3',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Silver',
                            attribute_value_id: 1,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '64GB',
                            attribute_value_id: 4,
                            attribute_status: 'new'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '4'
                    },
                    sku_vendor: 'X112',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19500000,
                    tier_cogs_price_3: 18500000,
                    stock: 10,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                    additional_images: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 48
                }
            ]
        },
        premoderation_status: 'done',
        vendor_id: 16,
        user: {
            id: 11,
            name: 'User Test',
            email: 'user@test.com',
            type: 'vendor'
        },
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2018-01-05T17:25:03.215Z'
    });
    t.context.sandbox.stub(PremoderationRepository, 'findWithStatus').resolves({
        _id: '5a44adf9d1db060001b99a6f',
        id: '1514450425982',
        type: 'new',
        payload: {
            name: 'Iphone Y',
            category_id: 561,
            category: {
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 561
            },
            brand_id: 81,
            uom_id: 1,
            stocking_uom_id: 4,
            quantity_stocking_uom: 1,
            manufacturing_number: 'AP89232423434',
            package_weight: '180',
            package_length: '19',
            package_height: '10',
            package_width: '5',
            package_content: 'tidak ada apa-apa',
            barcode: '924234324',
            description: '<p>lorem ipsum dolorosum de aremo</p>',
            variant_count: 2,
            variant_matrix: [
                'phone_color',
                'phone_storage'
            ],
            specifications: [
                {
                    attribute_id: 3,
                    attribute_code: 'phone_os',
                    attribute_code_label: 'Sistem Operasi',
                    attribute_type: 'dropdown',
                    attribute_value_id: 5,
                    attribute_value_label: 'iOS',
                    attribute_status: 'clear'
                },
                {
                    attribute_id: 4,
                    attribute_code: 'phone_package',
                    attribute_code_label: 'Kelengkapan Paket',
                    attribute_type: 'textinput',
                    attribute_textinput: 'Tidak dilengkapi dengan hardcase',
                    attribute_status: 'clear'
                }
            ],
            products: [
                {
                    index: '33n203',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Black',
                            attribute_value_id: 2,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '32GB',
                            attribute_value_id: 3,
                            attribute_status: 'clear'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '3'
                    },
                    sku_vendor: 'X111',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19000000,
                    tier_cogs_price_3: 18000000,
                    stock: 15,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                    additional_images: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 47
                },
                {
                    index: '439pa3',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Silver',
                            attribute_value_id: 1,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '64GB',
                            attribute_value_id: 4,
                            attribute_status: 'new'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '4'
                    },
                    sku_vendor: 'X112',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19500000,
                    tier_cogs_price_3: 18500000,
                    stock: 10,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                    additional_images: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 48
                }
            ]
        },
        premoderation_status: 'done',
        vendor_id: 16,
        user: {
            id: 11,
            name: 'User Test',
            email: 'user@test.com',
            type: 'vendor'
        },
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2018-01-05T17:25:03.215Z'
    });
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1514450425982'
            },
            body: {
                product_group_id: '11'
            }
        };

        yield Methods.putPremoderationApprove(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'Premoderation already done');
    }
});

test.serial('Should be return Product Group Not Found', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findOne').resolves(false);
    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves({
        _id: '5a44adf9d1db060001b99a6f',
        id: '1514450425982',
        type: 'new',
        payload: {
            name: 'Iphone Y',
            category_id: 561,
            category: {
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 561
            },
            brand_id: 81,
            uom_id: 1,
            stocking_uom_id: 4,
            quantity_stocking_uom: 1,
            manufacturing_number: 'AP89232423434',
            package_weight: '180',
            package_length: '19',
            package_height: '10',
            package_width: '5',
            package_content: 'tidak ada apa-apa',
            barcode: '924234324',
            description: '<p>lorem ipsum dolorosum de aremo</p>',
            variant_count: 2,
            variant_matrix: [
                'phone_color',
                'phone_storage'
            ],
            specifications: [
                {
                    attribute_id: 3,
                    attribute_code: 'phone_os',
                    attribute_code_label: 'Sistem Operasi',
                    attribute_type: 'dropdown',
                    attribute_value_id: 5,
                    attribute_value_label: 'iOS',
                    attribute_status: 'clear'
                },
                {
                    attribute_id: 4,
                    attribute_code: 'phone_package',
                    attribute_code_label: 'Kelengkapan Paket',
                    attribute_type: 'textinput',
                    attribute_textinput: 'Tidak dilengkapi dengan hardcase',
                    attribute_status: 'clear'
                }
            ],
            products: [
                {
                    index: '33n203',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Black',
                            attribute_value_id: 2,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '32GB',
                            attribute_value_id: 3,
                            attribute_status: 'clear'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '3'
                    },
                    sku_vendor: 'X111',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19000000,
                    tier_cogs_price_3: 18000000,
                    stock: 15,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                    additional_images: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 47
                },
                {
                    index: '439pa3',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Silver',
                            attribute_value_id: 1,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '64GB',
                            attribute_value_id: 4,
                            attribute_status: 'new'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '4'
                    },
                    sku_vendor: 'X112',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19500000,
                    tier_cogs_price_3: 18500000,
                    stock: 10,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                    additional_images: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 48
                }
            ]
        },
        premoderation_status: 'need_revision',
        vendor_id: 16,
        user: {
            id: 11,
            name: 'User Test',
            email: 'user@test.com',
            type: 'vendor'
        },
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2018-01-05T17:25:03.215Z'
    });
    t.context.sandbox.stub(PremoderationRepository, 'findWithStatus').resolves({});
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves(null);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1514450425982'
            },
            body: {
                product_group_id: '117878'
            }
        };

        yield Methods.putPremoderationApprove(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'Product Not Found.');
    }
});

test.serial('Should be return joi badrequest', function* (t) {
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: ''
            },
            body: {
                product_group_id: ''
            }
        };

        yield Methods.putPremoderationApprove(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'Joi Schema.');
    }
});

test.serial('Should be return Variant Matrix not same', function* (t) {
    const getFindOne = t.context.sandbox.stub(ProductVendorRepository, 'findOne');
    getFindOne.onCall(0).resolves(false);
    getFindOne.onCall(1).resolves(null);

    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves({
        _id: '5a44adf9d1db060001b99a6f',
        id: '1514450425982',
        type: 'new',
        payload: {
            name: 'Iphone Y',
            category_id: 561,
            category: {
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 561
            },
            brand_id: 81,
            uom_id: 1,
            stocking_uom_id: 4,
            quantity_stocking_uom: 1,
            manufacturing_number: 'AP89232423434',
            package_weight: '180',
            package_length: '19',
            package_height: '10',
            package_width: '5',
            package_content: 'tidak ada apa-apa',
            barcode: '924234324',
            description: '<p>lorem ipsum dolorosum de aremo</p>',
            variant_count: 2,
            variant_matrix: [
                'phone_color',
                'phone_storage'
            ],
            specifications: [
                {
                    attribute_id: 3,
                    attribute_code: 'phone_os',
                    attribute_code_label: 'Sistem Operasi',
                    attribute_type: 'dropdown',
                    attribute_value_id: 5,
                    attribute_value_label: 'iOS',
                    attribute_status: 'clear'
                },
                {
                    attribute_id: 4,
                    attribute_code: 'phone_package',
                    attribute_code_label: 'Kelengkapan Paket',
                    attribute_type: 'textinput',
                    attribute_textinput: 'Tidak dilengkapi dengan hardcase',
                    attribute_status: 'clear'
                }
            ],
            products: [
                {
                    index: '33n203',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Black',
                            attribute_value_id: 2,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '32GB',
                            attribute_value_id: 3,
                            attribute_status: 'clear'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '3'
                    },
                    sku_vendor: 'X111',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19000000,
                    tier_cogs_price_3: 18000000,
                    stock: 15,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                    additional_images: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 47
                },
                {
                    index: '439pa3',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Silver',
                            attribute_value_id: 1,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '64GB',
                            attribute_value_id: 4,
                            attribute_status: 'new'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '4'
                    },
                    sku_vendor: 'X112',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19500000,
                    tier_cogs_price_3: 18500000,
                    stock: 10,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                    additional_images: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 48
                }
            ]
        },
        premoderation_status: 'need_revision',
        vendor_id: 16,
        user: {
            id: 11,
            name: 'User Test',
            email: 'user@test.com',
            type: 'vendor'
        },
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2018-01-05T17:25:03.215Z'
    });
    t.context.sandbox.stub(PremoderationRepository, 'findWithStatus').resolves({
        _id: '5a44adf9d1db060001b99a6f',
        id: '1514450425982',
        type: 'new',
        payload: {
            name: 'Iphone Y',
            category_id: 561,
            category: {
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 561
            },
            brand_id: 81,
            uom_id: 1,
            stocking_uom_id: 4,
            quantity_stocking_uom: 1,
            manufacturing_number: 'AP89232423434',
            package_weight: '180',
            package_length: '19',
            package_height: '10',
            package_width: '5',
            package_content: 'tidak ada apa-apa',
            barcode: '924234324',
            description: '<p>lorem ipsum dolorosum de aremo</p>',
            variant_count: 2,
            variant_matrix: [
                'phone_color',
                'phone_storage'
            ],
            specifications: [
                {
                    attribute_id: 3,
                    attribute_code: 'phone_os',
                    attribute_code_label: 'Sistem Operasi',
                    attribute_type: 'dropdown',
                    attribute_value_id: 5,
                    attribute_value_label: 'iOS',
                    attribute_status: 'clear'
                },
                {
                    attribute_id: 4,
                    attribute_code: 'phone_package',
                    attribute_code_label: 'Kelengkapan Paket',
                    attribute_type: 'textinput',
                    attribute_textinput: 'Tidak dilengkapi dengan hardcase',
                    attribute_status: 'clear'
                }
            ],
            products: [
                {
                    index: '33n203',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Black',
                            attribute_value_id: 2,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '32GB',
                            attribute_value_id: 3,
                            attribute_status: 'clear'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '3'
                    },
                    sku_vendor: 'X111',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19000000,
                    tier_cogs_price_3: 18000000,
                    stock: 15,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                    additional_images: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 47
                },
                {
                    index: '439pa3',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Silver',
                            attribute_value_id: 1,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '64GB',
                            attribute_value_id: 4,
                            attribute_status: 'new'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '4'
                    },
                    sku_vendor: 'X112',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19500000,
                    tier_cogs_price_3: 18500000,
                    stock: 10,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                    additional_images: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 48
                }
            ]
        },
        premoderation_status: 'need_revision',
        vendor_id: 16,
        user: {
            id: 11,
            name: 'User Test',
            email: 'user@test.com',
            type: 'vendor'
        },
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2018-01-05T17:25:03.215Z'
    });
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves({});
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1514450425982'
            },
            body: {
                product_group_id: '11'
            }
        };

        yield Methods.putPremoderationApprove(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'Variant Matrix not same');
    }
});

test.serial('Should be return Success with empty attribute product', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findOne').resolves(false);
    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves({
        _id: '5a44adf9d1db060001b99a6f',
        id: '1514450425982',
        type: 'new',
        payload: {
            name: 'Iphone Y',
            category_id: 561,
            category: {
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 561
            },
            brand_id: 81,
            uom_id: 1,
            stocking_uom_id: 4,
            quantity_stocking_uom: 1,
            manufacturing_number: 'AP89232423434',
            package_weight: '180',
            package_length: '19',
            package_height: '10',
            package_width: '5',
            package_content: 'tidak ada apa-apa',
            barcode: '924234324',
            description: '<p>lorem ipsum dolorosum de aremo</p>',
            variant_count: 2,
            variant_matrix: [
                'phone_color',
                'phone_storage'
            ],
            specifications: [
                {
                    attribute_id: 3,
                    attribute_code: 'phone_os',
                    attribute_code_label: 'Sistem Operasi',
                    attribute_type: 'dropdown',
                    attribute_value_id: 5,
                    attribute_value_label: 'iOS',
                    attribute_status: 'clear'
                },
                {
                    attribute_id: 4,
                    attribute_code: 'phone_package',
                    attribute_code_label: 'Kelengkapan Paket',
                    attribute_type: 'textinput',
                    attribute_textinput: 'Tidak dilengkapi dengan hardcase',
                    attribute_status: 'clear'
                }
            ],
            products: [
                {
                    index: '33n203',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Black',
                            attribute_value_id: 2,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '32GB',
                            attribute_value_id: 3,
                            attribute_status: 'clear'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '3'
                    },
                    sku_vendor: 'X111',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19000000,
                    tier_cogs_price_3: 18000000,
                    stock: 15,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                    additional_image: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 47
                },
                {
                    index: '439pa3',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Silver',
                            attribute_value_id: 1,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '64GB',
                            attribute_value_id: 4,
                            attribute_status: 'new'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '4'
                    },
                    sku_vendor: 'X112',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19500000,
                    tier_cogs_price_3: 18500000,
                    stock: 10,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                    additional_image: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 48
                }
            ]
        },
        premoderation_status: 'need_revision',
        vendor_id: 16,
        user: {
            id: 11,
            name: 'User Test',
            email: 'user@test.com',
            type: 'vendor'
        },
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2018-01-05T17:25:03.215Z'
    });
    t.context.sandbox.stub(PremoderationRepository, 'findWithStatus').resolves({
        _id: '5a44adf9d1db060001b99a6f',
        id: '1514450425982',
        type: 'new',
        payload: {
            name: 'Iphone Y',
            category_id: 561,
            category: {
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 561
            },
            brand_id: 81,
            uom_id: 1,
            stocking_uom_id: 4,
            quantity_stocking_uom: 1,
            manufacturing_number: 'AP89232423434',
            package_weight: '180',
            package_length: '19',
            package_height: '10',
            package_width: '5',
            package_content: 'tidak ada apa-apa',
            barcode: '924234324',
            description: '<p>lorem ipsum dolorosum de aremo</p>',
            variant_count: 2,
            variant_matrix: [
                'phone_color',
                'phone_storage'
            ],
            specifications: [
                {
                    attribute_id: 3,
                    attribute_code: 'phone_os',
                    attribute_code_label: 'Sistem Operasi',
                    attribute_type: 'dropdown',
                    attribute_value_id: 5,
                    attribute_value_label: 'iOS',
                    attribute_status: 'clear'
                },
                {
                    attribute_id: 4,
                    attribute_code: 'phone_package',
                    attribute_code_label: 'Kelengkapan Paket',
                    attribute_type: 'textinput',
                    attribute_textinput: 'Tidak dilengkapi dengan hardcase',
                    attribute_status: 'clear'
                }
            ],
            products: [
                {
                    index: '33n203',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Black',
                            attribute_value_id: 2,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '32GB',
                            attribute_value_id: 3,
                            attribute_status: 'clear'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '3'
                    },
                    sku_vendor: 'X111',
                    tier_min_qty_1: 10,
                    tier_cogs_price_1: 20000000,
                    stock: 15,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                    additional_image: '',
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_coverage: 'international',
                    is_indent: 0,
                    indent_period: 'ok',
                    indent_limit: 1,
                    variant_status: 'pending',
                    product_variant_id: 47
                }
            ]
        },
        premoderation_status: 'done',
        vendor_id: 16,
        user: {
            id: 11,
            name: 'User Test',
            email: 'user@test.com',
            type: 'vendor'
        },
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2018-01-05T17:25:03.215Z'
    });
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves({
        id: 11,
        name: 'Iphone Y',
        category_id: 561,
        brand_id: 81,
        uom_id: 1,
        stocking_uom_id: 4,
        quantity_stocking_uom: 1,
        manufacturing_number: 'YYYY',
        manufacturing_number_type: null,
        package_weight: 0,
        package_length: '0.00',
        package_width: '0.00',
        package_height: '0.00',
        package_content: null,
        barcode: null,
        description: '',
        primary_image: null,
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 0,
        created_at: '2018-01-05T13:40:00.000Z',
        updated_at: null
    });
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves([
        {
            product_group_id: 11,
            sku: '173F9206R',
            long_name: 'Iphone Y Black 32GB',
            variant_value: '{"phone_color":2,"phone_storage":3}',
            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
            additional_image: '[]',
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1,
            product_vendor: {
                vendor_id: 16,
                warehouse_id: 1,
                location_label: 'Jakarta selatan',
                stock_available: 1,
                stock_used: 1,
                tier_min_qty_1: 10,
                tier_min_qty_2: 20,
                tier_min_qty_3: 30,
                tier_cogs_price_1: 20000000,
                tier_cogs_price_2: 19000000,
                tier_cogs_price_3: 18000000,
                warranty_option: 'international',
                warranty_period: 'week',
                warranty_limit: 1,
                indent_period: null,
                indent_limit: 0,
                is_indent: 0,
                reference_link: '["https://en.wikipedia.org/wiki/IPhone_X"]',
                sku_vendor: 'X111',
                is_active: 1,
                created_by: 11
            },
            index: '33n203'
        },
        {
            product_group_id: 11,
            sku: 'EANWB03KC',
            long_name: 'Iphone Y Silver 64GB',
            variant_value: '{"phone_color":1,"phone_storage":4}',
            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
            additional_image: '[]',
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1,
            product_vendor: {
                vendor_id: 16,
                warehouse_id: 1,
                location_label: 'Jakarta selatan',
                stock_available: 1,
                stock_used: 1,
                tier_min_qty_1: 10,
                tier_min_qty_2: 20,
                tier_min_qty_3: 30,
                tier_cogs_price_1: 20000000,
                tier_cogs_price_2: 19500000,
                tier_cogs_price_3: 18500000,
                warranty_option: 'international',
                warranty_period: 'week',
                warranty_limit: 1,
                indent_period: null,
                indent_limit: 0,
                is_indent: 0,
                reference_link: '["https://en.wikipedia.org/wiki/IPhone_X"]',
                sku_vendor: 'X112',
                is_active: 1,
                created_by: 11
            },
            index: '439pa3'
        }
    ]);

    t.context.sandbox.stub(PremoderationRepository, 'update').resolves({});
    t.context.sandbox.stub(ProductVendorRepository, 'createOne').resolves({});
    t.context.sandbox.stub(ProductVariantRepository, 'createOne').resolves({
        getValues() {
            return {
                sku: 1
            };
        }
    });
    t.context.sandbox.stub(PremoderationRepository, 'updateVariantId').resolves({});
    t.context.sandbox.stub(ProductGroupAttributeRepository, 'findOrCreate').resolves({});
    t.context.sandbox.stub(ProductVariantRepository, 'findCountVariant').resolves({});
    t.context.sandbox.stub(ProductGroupRepository, 'update').resolves({});
    t.context.sandbox.stub(WebhookRepository, 'trigger').resolves();
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();
    t.context.sandbox.stub(ProductSkuRepository, 'findOne').resolves(false);
    t.context.sandbox.stub(ProductSkuRepository, 'insertOne').resolves(true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1514450425982'
            },
            body: {
                product_group_id: '11'
            }
        };

        const result = yield Methods.putPremoderationApprove(data, context);
        const expected = {
            data: {
                id: '1514450425982',
                status: 'done',
                created_at: result.data.created_at,
                updated_at: result.data.updated_at
            }
        };

        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return Success with empty spec and variant', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findOne').resolves(false);

    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves({
        _id: '5a44adf9d1db060001b99a6f',
        id: '1514450425982',
        type: 'new',
        payload: {
            name: 'Iphone Y',
            category_id: 561,
            category: {
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 561
            },
            brand_id: 81,
            uom_id: 1,
            stocking_uom_id: 4,
            quantity_stocking_uom: 1,
            manufacturing_number: 'AP89232423434',
            package_weight: '180',
            package_length: '19',
            package_height: '10',
            package_width: '5',
            package_content: 'tidak ada apa-apa',
            barcode: '924234324',
            description: '<p>lorem ipsum dolorosum de aremo</p>',
            variant_count: 2,
            variant_matrix: [
                'phone_color',
                'phone_storage'
            ],
            specifications: [
            ],
            products: [
            ]
        },
        premoderation_status: 'need_revision',
        vendor_id: 16,
        user: {
            id: 11,
            name: 'User Test',
            email: 'user@test.com',
            type: 'vendor'
        },
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2018-01-05T17:25:03.215Z'
    });
    t.context.sandbox.stub(PremoderationRepository, 'findWithStatus').resolves({
        _id: '5a44adf9d1db060001b99a6f',
        id: '1514450425982',
        type: 'new',
        payload: {
            name: 'Iphone Y',
            category_id: 561,
            category: {
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 561
            },
            brand_id: 81,
            uom_id: 1,
            stocking_uom_id: 4,
            quantity_stocking_uom: 1,
            manufacturing_number: 'AP89232423434',
            package_weight: '180',
            package_length: '19',
            package_height: '10',
            package_width: '5',
            package_content: 'tidak ada apa-apa',
            barcode: '924234324',
            description: '<p>lorem ipsum dolorosum de aremo</p>',
            variant_count: 2,
            variant_matrix: [
                'phone_color',
                'phone_storage'
            ],
            specifications: [
            ],
            products: [{
                index: '33n203',
                variants: [
                    {
                        attribute_id: 1,
                        attribute_code: 'phone_color',
                        attribute_code_label: 'Warna',
                        attribute_value_name: 'Black',
                        attribute_value_id: 2,
                        attribute_status: 'new'
                    },
                    {
                        attribute_id: 2,
                        attribute_code: 'phone_storage',
                        attribute_code_label: 'Kapasitas',
                        attribute_value_name: '32GB',
                        attribute_value_id: 3,
                        attribute_status: 'clear'
                    }
                ],
                variant_value: {
                    phone_color: '1',
                    phone_storage: '3'
                },
                sku_vendor: 'X111',
                tier_min_qty_1: 10,
                tier_min_qty_2: 20,
                tier_min_qty_3: 30,
                tier_cogs_price_1: 20000000,
                tier_cogs_price_2: 19000000,
                tier_cogs_price_3: 18000000,
                stock: 15,
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                additional_image: [],
                warehouse_id: 1,
                location_label: 'Jakarta selatan',
                reference_links: [
                    'https://en.wikipedia.org/wiki/IPhone_X'
                ],
                warranty_option: 'international',
                warranty_period: 'week',
                warranty_limit: 1,
                is_indent: 0,
                indent_period: '',
                indent_limit: 0,
                variant_status: 'pending',
                product_variant_id: 47
            }]
        },
        premoderation_status: 'done',
        vendor_id: 16,
        user: {
            id: 11,
            name: 'User Test',
            email: 'user@test.com',
            type: 'vendor'
        },
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2018-01-05T17:25:03.215Z'
    });
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves({
        id: 11,
        name: 'Iphone Y',
        category_id: 561,
        brand_id: 81,
        uom_id: 1,
        stocking_uom_id: 4,
        quantity_stocking_uom: 1,
        manufacturing_number: 'YYYY',
        manufacturing_number_type: null,
        package_weight: 0,
        package_length: '0.00',
        package_width: '0.00',
        package_height: '0.00',
        package_content: null,
        barcode: null,
        description: '',
        primary_image: 'image',
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 0,
        created_at: '2018-01-05T13:40:00.000Z',
        updated_at: null
    });
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves([
        {
            product_group_id: 11,
            sku: '173F9206R',
            long_name: 'Iphone Y Black 32GB',
            variant_value: '{"phone_color":2,"phone_storage":3}',
            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
            additional_image: '[]',
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1,
            product_vendor: {
                vendor_id: 16,
                warehouse_id: 1,
                location_label: 'Jakarta selatan',
                stock_available: 1,
                stock_used: 1,
                tier_min_qty_1: 10,
                tier_min_qty_2: 20,
                tier_min_qty_3: 30,
                tier_cogs_price_1: 20000000,
                tier_cogs_price_2: 19000000,
                tier_cogs_price_3: 18000000,
                warranty_option: 'international',
                warranty_period: 'week',
                warranty_limit: 1,
                indent_period: null,
                indent_limit: 0,
                is_indent: 0,
                reference_link: '["https://en.wikipedia.org/wiki/IPhone_X"]',
                sku_vendor: 'X111',
                is_active: 1,
                created_by: 11
            },
            index: '33n203'
        },
        {
            product_group_id: 11,
            sku: 'EANWB03KC',
            long_name: 'Iphone Y Silver 64GB',
            variant_value: '{"phone_color":1,"phone_storage":4}',
            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
            additional_image: '[]',
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1,
            product_vendor: {
                vendor_id: 16,
                warehouse_id: 1,
                location_label: 'Jakarta selatan',
                stock_available: 1,
                stock_used: 1,
                tier_min_qty_1: 10,
                tier_min_qty_2: 20,
                tier_min_qty_3: 30,
                tier_cogs_price_1: 20000000,
                tier_cogs_price_2: 19500000,
                tier_cogs_price_3: 18500000,
                warranty_option: 'international',
                warranty_period: 'week',
                warranty_limit: 1,
                indent_period: null,
                indent_limit: 0,
                is_indent: 0,
                reference_link: '["https://en.wikipedia.org/wiki/IPhone_X"]',
                sku_vendor: 'X112',
                is_active: 1,
                created_by: 11
            },
            index: '439pa3'
        }
    ]);

    t.context.sandbox.stub(PremoderationRepository, 'update').resolves({});
    t.context.sandbox.stub(ProductVendorRepository, 'createOne').resolves({});
    t.context.sandbox.stub(ProductVariantRepository, 'createOne').resolves({
        getValues() {
            return {
                sku: 1
            };
        }
    });
    t.context.sandbox.stub(PremoderationRepository, 'updateVariantId').resolves({});
    t.context.sandbox.stub(ProductGroupAttributeRepository, 'findOrCreate').resolves({});
    t.context.sandbox.stub(ProductVariantRepository, 'findCountVariant').resolves({ count: 0 });
    t.context.sandbox.stub(ProductGroupRepository, 'update').resolves({});
    t.context.sandbox.stub(WebhookRepository, 'trigger').resolves();
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();
    t.context.sandbox.stub(ProductSkuRepository, 'findOne').resolves(false);
    t.context.sandbox.stub(ProductSkuRepository, 'insertOne').resolves(true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1514450425982'
            },
            body: {
                product_group_id: '11'
            }
        };

        const result = yield Methods.putPremoderationApprove(data, context);
        const expected = {
            data: {
                id: '1514450425982',
                status: 'done',
                created_at: result.data.created_at,
                updated_at: result.data.updated_at
            }
        };

        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return Failed with one product already exist)', function* (t) {
    
    const vendorFindOne = t.context.sandbox.stub(ProductVendorRepository, 'findOne');
    vendorFindOne.onCall(0).resolves(null);
    vendorFindOne.onCall(1).resolves(false);
    vendorFindOne.onCall(2).resolves({
            vendor_id: 16,
            warehouse_id: 1
    });
    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves({
        _id: '5a44adf9d1db060001b99a6f',
        id: '1514450425982',
        type: 'new',
        payload: {
            name: 'Iphone Y',
            category_id: 561,
            category: {
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 561
            },
            brand_id: 81,
            uom_id: 1,
            stocking_uom_id: 4,
            quantity_stocking_uom: 1,
            manufacturing_number: 'AP89232423434',
            package_weight: '180',
            package_length: '19',
            package_height: '10',
            package_width: '5',
            package_content: 'tidak ada apa-apa',
            barcode: '924234324',
            description: '<p>lorem ipsum dolorosum de aremo</p>',
            variant_count: 2,
            variant_matrix: [
                'phone_color',
                'phone_storage'
            ],
            specifications: [
                {
                    attribute_id: 3,
                    attribute_code: 'phone_os',
                    attribute_code_label: 'Sistem Operasi',
                    attribute_type: 'dropdown',
                    attribute_value_id: 5,
                    attribute_value_label: 'iOS',
                    attribute_status: 'clear'
                },
                {
                    attribute_id: 4,
                    attribute_code: 'phone_package',
                    attribute_code_label: 'Kelengkapan Paket',
                    attribute_type: 'textinput',
                    attribute_textinput: 'Tidak dilengkapi dengan hardcase',
                    attribute_status: 'clear'
                }
            ],
            products: [
                {
                    index: '33n203',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Black',
                            attribute_value_id: 2,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '32GB',
                            attribute_value_id: 3,
                            attribute_status: 'clear'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '3'
                    },
                    sku_vendor: 'X111',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19000000,
                    tier_cogs_price_3: 18000000,
                    stock: 15,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                    additional_image: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 47,
                    is_contract: 1
                },
                {
                    index: '439pa3',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Silver',
                            attribute_value_id: 1,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '64GB',
                            attribute_value_id: 4,
                            attribute_status: 'new'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '4'
                    },
                    sku_vendor: 'X112',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19500000,
                    tier_cogs_price_3: 18500000,
                    stock: 10,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                    additional_image: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 48,
                    is_contract: 0
                }
            ]
        },
        premoderation_status: 'need_revision',
        vendor_id: 16,
        user: {
            id: 11,
            name: 'User Test',
            email: 'user@test.com',
            type: 'vendor'
        },
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2018-01-05T17:25:03.215Z'
    });
    t.context.sandbox.stub(PremoderationRepository, 'findWithStatus').resolves({
        _id: '5a44adf9d1db060001b99a6f',
        id: '1514450425982',
        type: 'new',
        payload: {
            name: 'Iphone Y',
            category_id: 561,
            category: {
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 561
            },
            brand_id: 81,
            uom_id: 1,
            stocking_uom_id: 4,
            quantity_stocking_uom: 1,
            manufacturing_number: 'AP89232423434',
            package_weight: '180',
            package_length: '19',
            package_height: '10',
            package_width: '5',
            package_content: 'tidak ada apa-apa',
            barcode: '924234324',
            description: '<p>lorem ipsum dolorosum de aremo</p>',
            variant_count: 2,
            variant_matrix: [
                'phone_color',
                'phone_storage'
            ],
            specifications: [
                {
                    attribute_id: 3,
                    attribute_code: 'phone_os',
                    attribute_code_label: 'Sistem Operasi',
                    attribute_type: 'dropdown',
                    attribute_value_id: 5,
                    attribute_value_label: 'iOS',
                    attribute_status: 'clear'
                },
                {
                    attribute_id: 4,
                    attribute_code: 'phone_package',
                    attribute_code_label: 'Kelengkapan Paket',
                    attribute_type: 'textinput',
                    attribute_textinput: 'Tidak dilengkapi dengan hardcase',
                    attribute_status: 'clear'
                }
            ],
            products: [
                {
                    index: '33n203',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Black',
                            attribute_value_id: 2,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '32GB',
                            attribute_value_id: 3,
                            attribute_status: 'clear'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '3'
                    },
                    sku_vendor: 'X111',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19000000,
                    tier_cogs_price_3: 18000000,
                    stock: 15,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                    additional_image: '[]',
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 47,
                    is_contract: 1
                },
                {
                    index: '439pa3',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Silver',
                            attribute_value_id: 1,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '64GB',
                            attribute_value_id: 4,
                            attribute_status: 'new'
                        }
                    ],
                    variant_value: 'NO_VARIANT',
                    sku_vendor: 'X112',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19500000,
                    tier_cogs_price_3: 18500000,
                    stock: 10,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                    additional_image: '[]',
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: null,
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 48,
                    is_contract: 0
                }
            ]
        },
        premoderation_status: 'done',
        vendor_id: 16,
        user: {
            id: 11,
            name: 'User Test',
            email: 'user@test.com',
            type: 'vendor'
        },
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2018-01-05T17:25:03.215Z'
    });
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves({
        id: 11,
        name: 'Iphone Y',
        category_id: 561,
        brand_id: 81,
        uom_id: 1,
        stocking_uom_id: 4,
        quantity_stocking_uom: 1,
        manufacturing_number: 'YYYY',
        manufacturing_number_type: null,
        package_weight: 0,
        package_length: '0.00',
        package_width: '0.00',
        package_height: '0.00',
        package_content: null,
        barcode: null,
        description: '',
        primary_image: null,
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 0,
        created_at: '2018-01-05T13:40:00.000Z',
        updated_at: null
    });
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves([
        {
            product_group_id: 11,
            sku: '173F9206R',
            long_name: 'Iphone Y Black 32GB',
            variant_value: '{"phone_color":2,"phone_storage":3}',
            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
            additional_image: '[]',
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1,
            product_vendor: {
                vendor_id: 16,
                warehouse_id: 1,
                location_label: 'Jakarta selatan',
                stock_available: 1,
                stock_used: 1,
                tier_min_qty_1: 10,
                tier_min_qty_2: 20,
                tier_min_qty_3: 30,
                tier_cogs_price_1: 20000000,
                tier_cogs_price_2: 19000000,
                tier_cogs_price_3: 18000000,
                warranty_option: 'international',
                warranty_period: 'week',
                warranty_limit: 1,
                indent_period: null,
                indent_limit: 0,
                is_indent: 0,
                reference_link: '["https://en.wikipedia.org/wiki/IPhone_X"]',
                sku_vendor: 'X111',
                is_active: 1,
                created_by: 11
            },
            index: '33n203'
        },
        {
            product_group_id: 11,
            sku: 'EANWB03KC',
            long_name: 'Iphone Y Silver 64GB',
            variant_value: '{"phone_color":1,"phone_storage":4}',
            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
            additional_image: '[]',
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1,
            product_vendor: {
                vendor_id: 16,
                warehouse_id: 1,
                location_label: 'Jakarta selatan',
                stock_available: 1,
                stock_used: 1,
                tier_min_qty_1: 10,
                tier_min_qty_2: 20,
                tier_min_qty_3: 30,
                tier_cogs_price_1: 20000000,
                tier_cogs_price_2: 19500000,
                tier_cogs_price_3: 18500000,
                warranty_option: 'international',
                warranty_period: 'week',
                warranty_limit: 1,
                indent_period: null,
                indent_limit: 0,
                is_indent: 0,
                reference_link: '["https://en.wikipedia.org/wiki/IPhone_X"]',
                sku_vendor: 'X112',
                is_active: 1,
                created_by: 11
            },
            index: '439pa3'
        }
    ]);

    t.context.sandbox.stub(PremoderationRepository, 'update').resolves({});
    t.context.sandbox.stub(ProductVendorRepository, 'createOne').resolves({});
    t.context.sandbox.stub(ProductVariantRepository, 'createOne').resolves({
        getValues() {
            return {
                sku: 1
            };
        }
    });
    t.context.sandbox.stub(PremoderationRepository, 'updateVariantId').resolves({});
    t.context.sandbox.stub(ProductGroupAttributeRepository, 'findOrCreate').resolves({});
    t.context.sandbox.stub(ProductVariantRepository, 'findCountVariant').resolves({});
    t.context.sandbox.stub(ProductGroupRepository, 'update').resolves({});
    t.context.sandbox.stub(WebhookRepository, 'trigger').resolves();
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();
    t.context.sandbox.stub(ProductSkuRepository, 'findOne').resolves(false);
    t.context.sandbox.stub(ProductSkuRepository, 'insertOne').resolves(true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1514450425982'
            },
            body: {
                product_group_id: '11'
            }
        };

        const result = yield Methods.putPremoderationApprove(data, context);
        const expected = {
            data: {
                id: '1514450425982',
                status: 'done',
                created_at: result.data.created_at,
                updated_at: result.data.updated_at
            }
        };
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'Iphone Y - Black - 32GB already exist');
        //console.log(err.message);
    }
});


test.serial('putPremoderationApprove: scenario context.user.employee.id is null', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findOne').resolves(false);
    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves({
        _id: '5a44adf9d1db060001b99a6f',
        id: '1514450425982',
        type: 'new',
        payload: {
            name: 'Iphone Y',
            category_id: 561,
            category: {
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 561
            },
            brand_id: 81,
            uom_id: 1,
            stocking_uom_id: 4,
            quantity_stocking_uom: 1,
            manufacturing_number: 'AP89232423434',
            package_weight: '180',
            package_length: '19',
            package_height: '10',
            package_width: '5',
            package_content: 'tidak ada apa-apa',
            barcode: '924234324',
            description: '<p>lorem ipsum dolorosum de aremo</p>',
            variant_count: 2,
            variant_matrix: [
                'phone_color',
                'phone_storage'
            ],
            specifications: [
                {
                    attribute_id: 3,
                    attribute_code: 'phone_os',
                    attribute_code_label: 'Sistem Operasi',
                    attribute_type: 'dropdown',
                    attribute_value_id: 5,
                    attribute_value_label: 'iOS',
                    attribute_status: 'clear'
                },
                {
                    attribute_id: 4,
                    attribute_code: 'phone_package',
                    attribute_code_label: 'Kelengkapan Paket',
                    attribute_type: 'textinput',
                    attribute_textinput: 'Tidak dilengkapi dengan hardcase',
                    attribute_status: 'clear'
                }
            ],
            products: [
                {
                    index: '33n203',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Black',
                            attribute_value_id: 2,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '32GB',
                            attribute_value_id: 3,
                            attribute_status: 'clear'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '3'
                    },
                    sku_vendor: 'X111',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19000000,
                    tier_cogs_price_3: 18000000,
                    stock: 15,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                    additional_image: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 47,
                    is_contract: 1
                },
                {
                    index: '439pa3',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Silver',
                            attribute_value_id: 1,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '64GB',
                            attribute_value_id: 4,
                            attribute_status: 'new'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '4'
                    },
                    sku_vendor: 'X112',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19500000,
                    tier_cogs_price_3: 18500000,
                    stock: 10,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                    additional_image: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 48,
                    is_contract: 0
                }
            ]
        },
        premoderation_status: 'need_revision',
        vendor_id: 16,
        user: {
            id: 11,
            name: 'User Test',
            email: 'user@test.com',
            type: 'vendor'
        },
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2018-01-05T17:25:03.215Z'
    });
    t.context.sandbox.stub(PremoderationRepository, 'findWithStatus').resolves({
        _id: '5a44adf9d1db060001b99a6f',
        id: '1514450425982',
        type: 'new',
        payload: {
            name: 'Iphone Y',
            category_id: 561,
            category: {
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 561
            },
            brand_id: 81,
            uom_id: 1,
            stocking_uom_id: 4,
            quantity_stocking_uom: 1,
            manufacturing_number: 'AP89232423434',
            package_weight: '180',
            package_length: '19',
            package_height: '10',
            package_width: '5',
            package_content: 'tidak ada apa-apa',
            barcode: '924234324',
            description: '<p>lorem ipsum dolorosum de aremo</p>',
            variant_count: 2,
            variant_matrix: [
                'phone_color',
                'phone_storage'
            ],
            specifications: [
                {
                    attribute_id: 3,
                    attribute_code: 'phone_os',
                    attribute_code_label: 'Sistem Operasi',
                    attribute_type: 'dropdown',
                    attribute_value_id: 5,
                    attribute_value_label: 'iOS',
                    attribute_status: 'clear'
                },
                {
                    attribute_id: 4,
                    attribute_code: 'phone_package',
                    attribute_code_label: 'Kelengkapan Paket',
                    attribute_type: 'textinput',
                    attribute_textinput: 'Tidak dilengkapi dengan hardcase',
                    attribute_status: 'clear'
                }
            ],
            products: [
                {
                    index: '33n203',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Black',
                            attribute_value_id: 2,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '32GB',
                            attribute_value_id: 3,
                            attribute_status: 'clear'
                        }
                    ],
                    variant_value: {
                        phone_color: '1',
                        phone_storage: '3'
                    },
                    sku_vendor: 'X111',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19000000,
                    tier_cogs_price_3: 18000000,
                    stock: 15,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                    additional_image: '[]',
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 47,
                    is_contract: 1
                },
                {
                    index: '439pa3',
                    variants: [
                        {
                            attribute_id: 1,
                            attribute_code: 'phone_color',
                            attribute_code_label: 'Warna',
                            attribute_value_name: 'Silver',
                            attribute_value_id: 1,
                            attribute_status: 'new'
                        },
                        {
                            attribute_id: 2,
                            attribute_code: 'phone_storage',
                            attribute_code_label: 'Kapasitas',
                            attribute_value_name: '64GB',
                            attribute_value_id: 4,
                            attribute_status: 'new'
                        }
                    ],
                    variant_value: 'NO_VARIANT',
                    sku_vendor: 'X112',
                    tier_min_qty_1: 10,
                    tier_min_qty_2: 20,
                    tier_min_qty_3: 30,
                    tier_cogs_price_1: 20000000,
                    tier_cogs_price_2: 19500000,
                    tier_cogs_price_3: 18500000,
                    stock: 10,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                    additional_image: '[]',
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_links: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: null,
                    indent_limit: 0,
                    variant_status: 'pending',
                    product_variant_id: 48,
                    is_contract: 0
                }
            ]
        },
        premoderation_status: 'done',
        vendor_id: 16,
        user: {
            id: 11,
            name: 'User Test',
            email: 'user@test.com',
            type: 'vendor'
        },
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2018-01-05T17:25:03.215Z'
    });
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves({
        id: 11,
        name: 'Iphone Y',
        category_id: 561,
        brand_id: 81,
        uom_id: 1,
        stocking_uom_id: 4,
        quantity_stocking_uom: 1,
        manufacturing_number: 'YYYY',
        manufacturing_number_type: null,
        package_weight: 0,
        package_length: '0.00',
        package_width: '0.00',
        package_height: '0.00',
        package_content: null,
        barcode: null,
        description: '',
        primary_image: null,
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 0,
        created_at: '2018-01-05T13:40:00.000Z',
        updated_at: null
    });
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves([
        {
            product_group_id: 11,
            sku: '173F9206R',
            long_name: 'Iphone Y Black 32GB',
            variant_value: '{"phone_color":2,"phone_storage":3}',
            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
            additional_image: '[]',
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1,
            product_vendor: {
                vendor_id: 16,
                warehouse_id: 1,
                location_label: 'Jakarta selatan',
                stock_available: 1,
                stock_used: 1,
                tier_min_qty_1: 10,
                tier_min_qty_2: 20,
                tier_min_qty_3: 30,
                tier_cogs_price_1: 20000000,
                tier_cogs_price_2: 19000000,
                tier_cogs_price_3: 18000000,
                warranty_option: 'international',
                warranty_period: 'week',
                warranty_limit: 1,
                indent_period: null,
                indent_limit: 0,
                is_indent: 0,
                reference_link: '["https://en.wikipedia.org/wiki/IPhone_X"]',
                sku_vendor: 'X111',
                is_active: 1,
                created_by: 11
            },
            index: '33n203'
        },
        {
            product_group_id: 11,
            sku: 'EANWB03KC',
            long_name: 'Iphone Y Silver 64GB',
            variant_value: '{"phone_color":1,"phone_storage":4}',
            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
            additional_image: '[]',
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1,
            product_vendor: {
                vendor_id: 16,
                warehouse_id: 1,
                location_label: 'Jakarta selatan',
                stock_available: 1,
                stock_used: 1,
                tier_min_qty_1: 10,
                tier_min_qty_2: 20,
                tier_min_qty_3: 30,
                tier_cogs_price_1: 20000000,
                tier_cogs_price_2: 19500000,
                tier_cogs_price_3: 18500000,
                warranty_option: 'international',
                warranty_period: 'week',
                warranty_limit: 1,
                indent_period: null,
                indent_limit: 0,
                is_indent: 0,
                reference_link: '["https://en.wikipedia.org/wiki/IPhone_X"]',
                sku_vendor: 'X112',
                is_active: 1,
                created_by: 11
            },
            index: '439pa3'
        }
    ]);
    t.context.sandbox.stub(PremoderationRepository, 'update').resolves({});
    t.context.sandbox.stub(ProductVendorRepository, 'createOne').resolves({});
    t.context.sandbox.stub(ProductVariantRepository, 'createOne').resolves({
        getValues() {
            return {
                sku: 1
            };
        }
    });
    t.context.sandbox.stub(PremoderationRepository, 'updateVariantId').resolves({});
    t.context.sandbox.stub(ProductGroupAttributeRepository, 'findOrCreate').resolves({});
    t.context.sandbox.stub(ProductVariantRepository, 'findCountVariant').resolves({});
    t.context.sandbox.stub(ProductGroupRepository, 'update').resolves({});
    t.context.sandbox.stub(WebhookRepository, 'trigger').resolves();
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();
    t.context.sandbox.stub(ProductSkuRepository, 'findOne').resolves(false);
    t.context.sandbox.stub(ProductSkuRepository, 'insertOne').resolves(true);

    try {
        const context = require('../../../mocks/context.json');
        const context2 = JSON.parse(JSON.stringify(context));
        context2.user.employee.id = null;

        const data = {
            path: {
                id: '1514450425982'
            },
            body: {
                product_group_id: '11'
            }
        };

        const result = yield Methods.putPremoderationApprove(data, context2);
        const expected = {
            data: {
                id: '1514450425982',
                status: 'done',
                created_at: result.data.created_at,
                updated_at: result.data.updated_at
            }
        };

        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
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
