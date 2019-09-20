'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { MongoContext, BizzyError } = require('bizzy-common');
const PremoderationRepository = require('../../../../src/repositories/premoderation');
const PremoderationLogRepository = require('../../../../src/repositories/premoderation_log');
const Methods = require('../../../../src/methods/premoderations/create');
const ProductVendorRepository = require('../../../../src/repositories/product_vendor');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

test.serial('Create Product Request Premoderation New Brand', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findOneDetail').resolves(false);
    t.context.sandbox.stub(PremoderationRepository, 'insertOne').resolves([]);
    t.context.sandbox.stub(PremoderationLogRepository, 'insertOne').resolves([]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3'
            },
            body: {
                name: 'Iphone X',
                category_id: 561,
                category: {
                    c0: 8,
                    c1: 52,
                    c2: 219,
                    c3: 561
                },
                brand_id: 0,
                brand_name: 'Brand Name',
                brand_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                uom_id: 1,
                stocking_uom_id: 4,
                quantity_stocking_uom: '1',
                manufacturing_number: 'AP89232423434',
                package_weight: '180',
                package_length: '19',
                package_height: '10',
                package_width: '5',
                package_content: 'tidak ada apa-apa',
                barcode: '924234324',
                description: '<p>lorem ipsum dolorosum de aremo</p>',
                variant_count: 1,
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
                        attribute_value_id: 0,
                        attribute_value_label: 'test'
                    },
                    {
                        attribute_id: 4,
                        attribute_code: 'phone_display',
                        attribute_code_label: 'Layar',
                        attribute_type: 'textinput',
                        attribute_textinput: 'Super AMOLED capacitive touchscreen, 16M colors'
                    }
                ],
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
                                attribute_value_name: '32GB',
                                attribute_value_id: 3
                            }
                        ],
                        variant_value: {
                            phone_color: '1',
                            phone_storage: '3'
                        },
                        sku_vendor: 'X111',
                        tier_min_qty_1: '10',
                        tier_min_qty_2: '20',
                        tier_min_qty_3: '30',
                        tier_cogs_price_1: '20000000',
                        tier_cogs_price_2: '19000000',
                        tier_cogs_price_3: '18000000',
                        stock: '15',
                        primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                        additional_image: [
                        ],
                        warehouse_id: 1,
                        location_label: 'Jakarta selatan',
                        reference_link: [
                            'https://en.wikipedia.org/wiki/IPhone_X'
                        ],
                        warranty_option: 'international',
                        warranty_period: 'week',
                        warranty_limit: '1',
                        is_indent: 0,
                        is_decimal: 0,
                        indent_period: '',
                        indent_limit: '',
                        down_payment_type: 0,
                        down_payment_value: 0
                    },
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
                            phone_color: '1',
                            phone_storage: '4'
                        },
                        sku_vendor: 'X112',
                        tier_min_qty_1: '10',
                        tier_min_qty_2: '20',
                        tier_min_qty_3: '30',
                        tier_cogs_price_1: '20000000',
                        tier_cogs_price_2: '19500000',
                        tier_cogs_price_3: '18500000',
                        stock: 0,
                        primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                        additional_image: [
                        ],
                        warehouse_id: 1,
                        location_label: 'Jakarta selatan',
                        reference_link: [
                            'https://en.wikipedia.org/wiki/IPhone_X'
                        ],
                        warranty_option: 'international',
                        warranty_period: 'week',
                        warranty_limit: '1',
                        is_indent: 1,
                        is_decimal: 0,
                        indent_period: 'day',
                        indent_limit: 1,
                        down_payment_type: 1,
                        down_payment_value: 20
                    }
                ]
            }
        };
        const result = yield Methods.postPremoderation(data, context);
        const expected = {
            data: {
                id: result.data.id,
                type: 'new',
                premoderation_status: 'need_revision',
                created_at: result.data.created_at,
                updated_at: result.data.updated_at
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err);
        t.fail('The validator doesn\'t throw an error');
    }
});

test.serial('Create Product Request Premoderation: SKU already used', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findOneDetail').resolves(true);
    t.context.sandbox.stub(PremoderationRepository, 'insertOne').resolves([]);
    t.context.sandbox.stub(PremoderationLogRepository, 'insertOne').resolves([]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3'
            },
            body: {
                name: 'Iphone X',
                category_id: 561,
                category: {
                    c0: 8,
                    c1: 52,
                    c2: 219,
                    c3: 561
                },
                brand_id: 0,
                brand_name: 'Brand Name',
                brand_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                uom_id: 1,
                stocking_uom_id: 4,
                quantity_stocking_uom: '1',
                manufacturing_number: 'AP89232423434',
                package_weight: '180',
                package_length: '19',
                package_height: '10',
                package_width: '5',
                package_content: 'tidak ada apa-apa',
                barcode: '924234324',
                description: '<p>lorem ipsum dolorosum de aremo</p>',
                variant_count: 1,
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
                        attribute_value_id: 0,
                        attribute_value_label: 'test'
                    },
                    {
                        attribute_id: 4,
                        attribute_code: 'phone_display',
                        attribute_code_label: 'Layar',
                        attribute_type: 'textinput',
                        attribute_textinput: 'Super AMOLED capacitive touchscreen, 16M colors'
                    }
                ],
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
                                attribute_value_name: '32GB',
                                attribute_value_id: 3
                            }
                        ],
                        variant_value: {
                            phone_color: '1',
                            phone_storage: '3'
                        },
                        sku_vendor: 'X111',
                        tier_min_qty_1: '10',
                        tier_min_qty_2: '20',
                        tier_min_qty_3: '30',
                        tier_cogs_price_1: '20000000',
                        tier_cogs_price_2: '19000000',
                        tier_cogs_price_3: '18000000',
                        stock: '15',
                        primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                        additional_image: [
                        ],
                        warehouse_id: 1,
                        location_label: 'Jakarta selatan',
                        reference_link: [
                            'https://en.wikipedia.org/wiki/IPhone_X'
                        ],
                        warranty_option: 'international',
                        warranty_period: 'week',
                        warranty_limit: '1',
                        is_indent: 0,
                        is_decimal: 0,
                        indent_period: '',
                        indent_limit: 0,
                        down_payment_type: 1,
                        down_payment_value: 20
                    },
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
                            phone_color: '1',
                            phone_storage: '4'
                        },
                        sku_vendor: 'X112',
                        tier_min_qty_1: '10',
                        tier_min_qty_2: '20',
                        tier_min_qty_3: '30',
                        tier_cogs_price_1: '20000000',
                        tier_cogs_price_2: '19500000',
                        tier_cogs_price_3: '18500000',
                        stock: '10',
                        primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                        additional_image: [
                        ],
                        warehouse_id: 1,
                        location_label: 'Jakarta selatan',
                        reference_link: [
                            'https://en.wikipedia.org/wiki/IPhone_X'
                        ],
                        warranty_option: 'international',
                        warranty_period: 'week',
                        warranty_limit: '1',
                        is_indent: 0,
                        is_decimal: 1,
                        indent_period: '',
                        indent_limit: 0,
                        down_payment_type: 1,
                        down_payment_value: 20
                    }
                ]
            }
        };
        yield Methods.postPremoderation(data, context);

        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'SKU already used');

    }
});


test.serial('Create Product Request Premoderation: SKU can not contains symbol', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findOneDetail').resolves(true);
    t.context.sandbox.stub(PremoderationRepository, 'insertOne').resolves([]);
    t.context.sandbox.stub(PremoderationLogRepository, 'insertOne').resolves([]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3'
            },
            body: {
                name: 'Iphone X',
                category_id: 561,
                category: {
                    c0: 8,
                    c1: 52,
                    c2: 219,
                    c3: 561
                },
                brand_id: 0,
                brand_name: 'Brand Name',
                brand_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                uom_id: 1,
                stocking_uom_id: 4,
                quantity_stocking_uom: '1',
                manufacturing_number: 'AP89232423434',
                package_weight: '180',
                package_length: '19',
                package_height: '10',
                package_width: '5',
                package_content: 'tidak ada apa-apa',
                barcode: '924234324',
                description: '<p>lorem ipsum dolorosum de aremo</p>',
                variant_count: 1,
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
                        attribute_value_id: 0,
                        attribute_value_label: 'test'
                    },
                    {
                        attribute_id: 4,
                        attribute_code: 'phone_display',
                        attribute_code_label: 'Layar',
                        attribute_type: 'textinput',
                        attribute_textinput: 'Super AMOLED capacitive touchscreen, 16M colors'
                    }
                ],
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
                                attribute_value_name: '32GB',
                                attribute_value_id: 3
                            }
                        ],
                        variant_value: {
                            phone_color: '1',
                            phone_storage: '3'
                        },
                        sku_vendor: 'X1!@11',
                        tier_min_qty_1: '10',
                        tier_min_qty_2: '20',
                        tier_min_qty_3: '30',
                        tier_cogs_price_1: '20000000',
                        tier_cogs_price_2: '19000000',
                        tier_cogs_price_3: '18000000',
                        stock: '15',
                        primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                        additional_image: [
                        ],
                        warehouse_id: 1,
                        location_label: 'Jakarta selatan',
                        reference_link: [
                            'https://en.wikipedia.org/wiki/IPhone_X'
                        ],
                        warranty_option: 'international',
                        warranty_period: 'week',
                        warranty_limit: '1',
                        is_indent: 0,
                        is_decimal: 0,
                        indent_period: '',
                        indent_limit: 0,
                        down_payment_type: 1,
                        down_payment_value: 20
                    },
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
                            phone_color: '1',
                            phone_storage: '4'
                        },
                        sku_vendor: 'X112',
                        tier_min_qty_1: '10',
                        tier_min_qty_2: '20',
                        tier_min_qty_3: '30',
                        tier_cogs_price_1: '20000000',
                        tier_cogs_price_2: '19500000',
                        tier_cogs_price_3: '18500000',
                        stock: '10',
                        primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                        additional_image: [
                        ],
                        warehouse_id: 1,
                        location_label: 'Jakarta selatan',
                        reference_link: [
                            'https://en.wikipedia.org/wiki/IPhone_X'
                        ],
                        warranty_option: 'international',
                        warranty_period: 'week',
                        warranty_limit: '1',
                        is_indent: 0,
                        is_decimal: 0,
                        indent_period: '',
                        indent_limit: 0,
                        down_payment_type: 1,
                        down_payment_value: 20
                    }
                ]
            }
        };
        yield Methods.postPremoderation(data, context);

        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'SKU can not contains symbol');

    }
});

test.serial('Create Product Request Premoderation', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findOneDetail').resolves(false);
    t.context.sandbox.stub(PremoderationRepository, 'insertOne').resolves([]);
    t.context.sandbox.stub(PremoderationLogRepository, 'insertOne').resolves([]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3'
            },
            body: {
                name: 'Iphone X',
                category_id: 561,
                category: {
                    c0: 8,
                    c1: 52,
                    c2: 219,
                    c3: 561
                },
                brand_id: 81,
                brand_name: '',
                brand_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                uom_id: 1,
                stocking_uom_id: 4,
                quantity_stocking_uom: '1',
                manufacturing_number: 'AP89232423434',
                package_weight: '180',
                package_length: '19',
                package_height: '10',
                package_width: '5',
                package_content: 'tidak ada apa-apa',
                barcode: '924234324',
                description: '<p>lorem ipsum dolorosum de aremo</p>',
                variant_count: 1,
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
                        attribute_value_id: 0,
                        attribute_value_label: 'test'
                    },
                    {
                        attribute_id: 4,
                        attribute_code: 'phone_display',
                        attribute_code_label: 'Layar',
                        attribute_type: 'textinput',
                        attribute_textinput: 'Super AMOLED capacitive touchscreen, 16M colors'
                    }
                ],
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
                                attribute_value_name: '32GB',
                                attribute_value_id: 3
                            }
                        ],
                        variant_value: {
                            phone_color: '1',
                            phone_storage: '3'
                        },
                        sku_vendor: 'X111',
                        tier_min_qty_1: '10',
                        tier_min_qty_2: '20',
                        tier_min_qty_3: '30',
                        tier_cogs_price_1: '20000000',
                        tier_cogs_price_2: '19000000',
                        tier_cogs_price_3: '18000000',
                        stock: 0,
                        primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                        additional_image: [
                        ],
                        warehouse_id: 1,
                        location_label: 'Jakarta selatan',
                        reference_link: [
                            'https://en.wikipedia.org/wiki/IPhone_X'
                        ],
                        warranty_option: 'international',
                        warranty_period: 'week',
                        warranty_limit: '1',
                        is_indent: 1,
                        is_decimal: 0,
                        indent_period: 'week',
                        indent_limit: 2,
                        down_payment_type: 1,
                        down_payment_value: 20
                    },
                    {
                        variants: [],
                        variant_value: 'NO_VARIANT',
                        sku_vendor: 'X112',
                        tier_min_qty_1: '10',
                        tier_min_qty_2: '20',
                        tier_min_qty_3: '30',
                        tier_cogs_price_1: '20000000',
                        tier_cogs_price_2: '19500000',
                        tier_cogs_price_3: '18500000',
                        stock: 0,
                        primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                        additional_image: [
                        ],
                        warehouse_id: 1,
                        location_label: 'Jakarta selatan',
                        reference_link: [
                            'https://en.wikipedia.org/wiki/IPhone_X'
                        ],
                        warranty_option: 'international',
                        warranty_period: 'week',
                        warranty_limit: '1',
                        is_indent: 1,
                        is_decimal: 0,
                        indent_period: 'week',
                        indent_limit: 2,
                        down_payment_type: 1,
                        down_payment_value: 20
                    }
                ]
            }
        };
        const result = yield Methods.postPremoderation(data, context);
        const expected = {
            data: {
                id: result.data.id,
                type: 'new',
                premoderation_status: 'need_revision',
                created_at: result.data.created_at,
                updated_at: result.data.updated_at
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        // console.log(err.message);
        t.fail(err);
    }
});

test.serial('Create Product Request Premoderation No variant', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findOneDetail').resolves(false);
    t.context.sandbox.stub(PremoderationRepository, 'insertOne').resolves([]);
    t.context.sandbox.stub(PremoderationLogRepository, 'insertOne').resolves([]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3'
            },
            body: {
                name: 'Iphone X',
                category_id: 561,
                category: {
                    c0: 8,
                    c1: 52,
                    c2: 219,
                    c3: 561
                },
                brand_id: 81,
                brand_name: '',
                brand_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                uom_id: 1,
                stocking_uom_id: 4,
                quantity_stocking_uom: '1',
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
                        attribute_value_id: 0,
                        attribute_value_label: 'test'
                    },
                    {
                        attribute_id: 4,
                        attribute_code: 'phone_display',
                        attribute_code_label: 'Layar',
                        attribute_type: 'textinput',
                        attribute_textinput: 'Super AMOLED capacitive touchscreen, 16M colors'
                    }
                ],
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
                                attribute_value_name: '32GB',
                                attribute_value_id: 3
                            }
                        ],
                        variant_value: {
                            phone_color: '1',
                            phone_storage: '3'
                        },
                        sku_vendor: 'X111',
                        tier_min_qty_1: '10',
                        tier_min_qty_2: '20',
                        tier_min_qty_3: '30',
                        tier_cogs_price_1: '20000000',
                        tier_cogs_price_2: '19000000',
                        tier_cogs_price_3: '18000000',
                        stock: 0,
                        primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                        additional_image: [
                        ],
                        warehouse_id: 1,
                        location_label: 'Jakarta selatan',
                        reference_link: [''],
                        warranty_option: 'international',
                        warranty_period: 'week',
                        warranty_limit: '1',
                        is_decimal: 0,
                        is_indent: 1,
                        indent_period: 'day',
                        indent_limit: 1,
                        down_payment_type: 1,
                        down_payment_value: 20
                    },
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
                            phone_color: '1',
                            phone_storage: '4'
                        },
                        sku_vendor: 'X112',
                        tier_min_qty_1: '10',
                        tier_min_qty_2: '20',
                        tier_min_qty_3: '30',
                        tier_cogs_price_1: '20000000',
                        tier_cogs_price_2: '19500000',
                        tier_cogs_price_3: '18500000',
                        stock: 0,
                        primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                        additional_image: [
                        ],
                        warehouse_id: 1,
                        location_label: 'Jakarta selatan',
                        reference_link: [
                            'https://en.wikipedia.org/wiki/IPhone_X'
                        ],
                        warranty_option: 'international',
                        warranty_period: 'week',
                        warranty_limit: '1',
                        is_decimal: 0,
                        is_indent: 1,
                        indent_period: 'week',
                        indent_limit: 1,
                        down_payment_type: 1,
                        down_payment_value: 20
                    }
                ]
            }
        };
        const result = yield Methods.postPremoderation(data, context);
        const expected = {
            data: {
                id: result.data.id,
                type: 'new',
                premoderation_status: 'need_revision',
                created_at: result.data.created_at,
                updated_at: result.data.updated_at
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail('The validator doesn\'t throw an error');
    }
});

test.serial('Create Product Request Premoderation without specifications', function* (t) {
    t.context.sandbox.stub(ProductVendorRepository, 'findOneDetail').resolves(false);
    t.context.sandbox.stub(PremoderationRepository, 'insertOne').resolves([]);
    t.context.sandbox.stub(PremoderationLogRepository, 'insertOne').resolves([]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3'
            },
            body: {
                name: 'Iphone X',
                category_id: 561,
                category: {
                    c0: 8,
                    c1: 52,
                    c2: 219,
                    c3: 561
                },
                brand_id: 81,
                brand_name: '',
                brand_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                uom_id: 1,
                stocking_uom_id: 4,
                quantity_stocking_uom: '1',
                manufacturing_number: 'AP89232423434',
                package_weight: '180',
                package_length: '19',
                package_height: '10',
                package_width: '5',
                package_content: 'tidak ada apa-apa',
                barcode: '924234324',
                description: '<p>lorem ipsum dolorosum de aremo</p>',
                variant_count: 1,
                variant_matrix: [
                    'phone_color',
                    'phone_storage'
                ],
                specifications: '',
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
                                attribute_value_name: '32GB',
                                attribute_value_id: 3
                            }
                        ],
                        variant_value: {
                            phone_color: '1',
                            phone_storage: '3'
                        },
                        sku_vendor: 'X111',
                        tier_min_qty_1: '10',
                        tier_min_qty_2: '20',
                        tier_min_qty_3: '30',
                        tier_cogs_price_1: '20000000',
                        tier_cogs_price_2: '19000000',
                        tier_cogs_price_3: '18000000',
                        stock: 0,
                        primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                        additional_image: [
                        ],
                        warehouse_id: 1,
                        location_label: 'Jakarta selatan',
                        reference_link: [
                            'https://en.wikipedia.org/wiki/IPhone_X'
                        ],
                        warranty_option: 'international',
                        warranty_period: 'week',
                        warranty_limit: '1',
                        is_indent: 1,
                        is_decimal: 0,
                        indent_period: 'day',
                        indent_limit: 2,
                        down_payment_type: 1,
                        down_payment_value: 20
                    },
                    {
                        variants: [],
                        variant_value: 'NO_VARIANT',
                        sku_vendor: 'X112',
                        tier_min_qty_1: '10',
                        tier_min_qty_2: '20',
                        tier_min_qty_3: '30',
                        tier_cogs_price_1: '20000000',
                        tier_cogs_price_2: '19500000',
                        tier_cogs_price_3: '18500000',
                        stock: 0,
                        primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                        additional_image: [
                        ],
                        warehouse_id: 1,
                        location_label: 'Jakarta selatan',
                        reference_link: [
                            'https://en.wikipedia.org/wiki/IPhone_X'
                        ],
                        warranty_option: 'international',
                        warranty_period: 'week',
                        warranty_limit: '1',
                        is_indent: 1,
                        is_decimal: 0,
                        indent_period: 'day',
                        indent_limit: 22,
                        down_payment_type: 1,
                        down_payment_value: 20
                    }
                ]
            }
        };
        const result = yield Methods.postPremoderation(data, context);
        const expected = {
            data: {
                id: result.data.id,
                type: 'new',
                premoderation_status: 'need_revision',
                created_at: result.data.created_at,
                updated_at: result.data.updated_at
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail('The validator doesn\'t throw an error');
    }
});

test.serial('Create Product Request Bad Request', function* (t) {
    try {
        const context = require('../../../mocks/context.json');

        const data = {
            path: {
                id: '3'
            },
            body: {
                name: 'Tst',
                category_id: 'aaa',
                brand_id: 1,
                uom_id: 1,
                stocking_uom_id: 1,
                quantity_stocking_uom: 10,
                manufacturing_number: '11111',
                package_weight: '0',
                package_length: '0',
                package_width: '0',
                package_height: '0',
                package_content: 'lorem ipsum',
                barcode: '1234',
                description: 'test',
                reference_link: [],
                variant_count: 1,
                variant_matrix: '{1=tv_color|2=tv_size}',
                products: [
                    {
                        variants: [{
                            attribute_id: 1,
                            attribue_code: 'tv_size',
                            attribute_value_id: 1,
                            attribute_value_name: '50'
                        }],
                        variant_value: 'NO_VARIANT',
                        sku_vendor: '1111111',
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
                        warehouse_id: 1,
                        location_label: 'Jakarta',
                        reference_link: [
                            'google.com',
                            'amazon.com'
                        ],
                        warranty_option: 'official_warranty',
                        warranty_period: 'month',
                        warranty_limit: 1,
                        is_indent: 1,
                        indent_period: 'week',
                        indent_limit: 2,
                        down_payment_type: 1,
                        down_payment_value: 20
                    }
                ]
            }
        };

        yield Methods.postPremoderation(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'The Error Type is Incorrect');
    }
});

test.serial('Create Product Request No Access', function* (t) {
    try {
        const context = require('../../../mocks/context.json');

        const data = {
            path: {
                id: '17'
            },
            body: {
                name: 'Tst',
                category_id: 1,
                brand_id: 1,
                uom_id: 1,
                stocking_uom_id: 1,
                quantity_stocking_uom: 10,
                manufacturing_number: '11111',
                package_weight: '0',
                package_length: '0',
                package_width: '0',
                package_height: '0',
                package_content: 'lorem ipsum',
                barcode: '1234',
                description: 'test',
                reference_link: [],
                variant_count: 1,
                variant_matrix: '{1=tv_color|2=tv_size}',
                products: [
                    {
                        variants: [{
                            attribute_id: 1,
                            attribue_code: 'tv_size',
                            attribute_value_id: 1,
                            attribute_value_name: '50'
                        }],
                        variant_value: 'NO_VARIANT',
                        sku_vendor: '1111111',
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
                        warehouse_id: 1,
                        location_label: 'Jakarta',
                        reference_link: [
                            'google.com',
                            'amazon.com'
                        ],
                        warranty_option: 'official_warranty',
                        warranty_period: 'month',
                        warranty_limit: 1,
                        is_indent: 1,
                        indent_period: 'week',
                        indent_limit: 2,
                        down_payment_type: 1,
                        down_payment_value: 20
                    }
                ]
            }
        };

        yield Methods.postPremoderation(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, 'You have no authorization access');
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
