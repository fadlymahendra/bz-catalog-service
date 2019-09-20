'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');
const ProductRequestRepository = require('../../../../src/repositories/premoderation');
const PremoderationLogRepository = require('../../../../src/repositories/premoderation_log');
const ProductGroupRepository = require('../../../../src/repositories/product_group');
const CustomeRepository = require('../../../../src/repositories/raw_query');
const CategoryRepository = require('../../../../src/repositories/category');
const BrandRepository = require('../../../../src/repositories/brand');
const StockingUomRepository = require('../../../../src/repositories/stocking_uom');
const UomRepository = require('../../../../src/repositories/uom');
const Methods = require('../../../../src/methods/premoderations/detail');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

const expected = function () {
    return {
        data: {
            id: '1514450425982',
            type: 'new',
            product_group_id: null,
            product_name: 'Iphone X',
            category: {
                c0: {
                    id: 8,
                    name: 'IT and Mobile Devices',
                    level: 'C0',
                    unspc: 43000000
                },
                c1: {
                    id: 8,
                    name: 'IT and Mobile Devices',
                    level: 'C0',
                    unspc: 43000000
                },
                c2: {
                    id: 8,
                    name: 'IT and Mobile Devices',
                    level: 'C0',
                    unspc: 43000000
                },
                c3: {
                    id: 8,
                    name: 'IT and Mobile Devices',
                    level: 'C0',
                    unspc: 43000000
                }
            },
            brand: {
                id: 81,
                name: 'dunlop',
                status: 'clear',
                image: 'http://google.com'
            },
            variant_matrix: '["phone_color","phone_storage"]',
            variant_detail: [{
                index: undefined,
                variants: [{
                    attribute_id: 1,
                    attribute_value_id: 1,
                    attribute_value_name: 'Silver',
                    attribute_code: 'phone_color',
                    attribute_status: undefined,
                    attribute_code_label: 'Warna'
                },
                {
                    attribute_id: 2,
                    attribute_value_id: 4,
                    attribute_value_name: '64GB',
                    attribute_code: 'phone_storage',
                    attribute_status: undefined,
                    attribute_code_label: 'Kapasitas'
                }
                ],
                variant_value: { phone_color: '1', phone_storage: '3' },
                sku_vendor: 'X111',
                tier_min_qty_1: 10,
                tier_min_qty_2: 20,
                tier_min_qty_3: 30,
                tier_cogs_price_1: 20000000,
                tier_cogs_price_2: 19000000,
                tier_cogs_price_3: 18000000,
                stock: 15,
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                additional_image: ['http://localhost/testing/testing_image.jpg',
                    'http://localhost/testing/testing_image.jpg'
                ],
                warehouse_id: 1,
                location_label: 'Jakarta selatan',
                reference_link: ['https://en.wikipedia.org/wiki/IPhone_X'],
                warranty_option: 'international',
                warranty_period: 'week',
                warranty_limit: 1,
                warranty_coverage: null,
                is_indent: 0,
                indent_period: '',
                indent_limit: 0,
                variant_status: undefined
            },
            {
                index: undefined,
                variants: [{
                    attribute_id: 1,
                    attribute_value_id: 1,
                    attribute_value_name: 'Silver',
                    attribute_code: 'phone_color',
                    attribute_status: undefined,
                    attribute_code_label: 'Warna'
                },
                {
                    attribute_id: 2,
                    attribute_value_id: 4,
                    attribute_value_name: '64GB',
                    attribute_code: 'phone_storage',
                    attribute_status: undefined,
                    attribute_code_label: 'Kapasitas'
                }
                ],
                variant_value: { phone_color: '1', phone_storage: '4' },
                sku_vendor: 'X112',
                tier_min_qty_1: 10,
                tier_min_qty_2: 20,
                tier_min_qty_3: 30,
                tier_cogs_price_1: 20000000,
                tier_cogs_price_2: 19500000,
                tier_cogs_price_3: 18500000,
                stock: 10,
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                additional_image: ['http://localhost/testing/testing_image.jpg',
                    'http://localhost/testing/testing_image.jpg'
                ],
                warehouse_id: 1,
                location_label: 'Jakarta selatan',
                reference_link: ['https://en.wikipedia.org/wiki/IPhone_X'],
                warranty_option: 'international',
                warranty_period: 'week',
                warranty_limit: 1,
                warranty_coverage: null,
                is_indent: 0,
                indent_period: '',
                indent_limit: 0,
                variant_status: undefined
            }
            ],
            specifications: [{
                attribute_id: 3,
                attribute_code: 'phone_os',
                attribute_code_label: 'Sistem Operasi',
                attribute_type: 'dropdown',
                attribute_value_id: 5,
                attribute_value_label: 'iOS'
            },
            {
                attribute_id: 4,
                attribute_code: 'phone_package',
                attribute_code_label: 'Kelengkapan Paket',
                attribute_type: 'textinput',
                attribute_textinput: 'Tidak dilengkapi dengan hardcase'
            }
            ],
            package_weight: '180',
            package_length: '19',
            package_width: '5',
            package_height: '10',
            package_content: 'tidak ada apa-apa',
            uom: {
                id: 1,
                name: 'Unit'
            },
            stocking_uom: {
                id: 4,
                name: 'Each'
            },
            quantity_stocking_uom: 1,
            description: '<p>lorem ipsum dolorosum de aremo</p>',
            premoderation_status: 'need_revision',
            barcode: '924234324',
            manufacturing_number: 'AP89232423434',
            total_history: 1
        }
    };
};

const expectedWithNoCategory = function () {
    return {
        data: {
            id: '1514450425982',
            type: 'new',
            product_group_id: null,
            product_name: 'Iphone X',
            category: {
                c0: {
                    id: 0,
                    name: '',
                    level: '',
                    unspc: 0
                },
                c1: {
                    id: 0,
                    name: '',
                    level: '',
                    unspc: 0
                },
                c2: {
                    id: 0,
                    name: '',
                    level: '',
                    unspc: 0
                },
                c3: {
                    id: 0,
                    name: '',
                    level: '',
                    unspc: 0
                }
            },
            brand: {
                id: 81,
                name: 'dunlop',
                status: 'clear',
                image: 'http://google.com'
            },
            variant_matrix: '["phone_color","phone_storage"]',
            variant_detail: [{
                index: undefined,
                variants: [{
                    attribute_id: 1,
                    attribute_value_id: 1,
                    attribute_value_name: 'Silver',
                    attribute_code: 'phone_color',
                    attribute_status: undefined,
                    attribute_code_label: 'Warna'
                },
                {
                    attribute_id: 2,
                    attribute_value_id: 4,
                    attribute_value_name: '64GB',
                    attribute_code: 'phone_storage',
                    attribute_status: undefined,
                    attribute_code_label: 'Kapasitas'
                }
                ],
                variant_value: { phone_color: '1', phone_storage: '3' },
                sku_vendor: 'X111',
                tier_min_qty_1: 10,
                tier_min_qty_2: 20,
                tier_min_qty_3: 30,
                tier_cogs_price_1: 20000000,
                tier_cogs_price_2: 19000000,
                tier_cogs_price_3: 18000000,
                stock: 15,
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                additional_image: ['http://localhost/testing/testing_image.jpg',
                    'http://localhost/testing/testing_image.jpg'
                ],
                warehouse_id: 1,
                location_label: 'Jakarta selatan',
                reference_link: ['https://en.wikipedia.org/wiki/IPhone_X'],
                warranty_option: 'international',
                warranty_period: 'week',
                warranty_limit: 1,
                warranty_coverage: null,
                is_indent: 0,
                indent_period: '',
                indent_limit: 0,
                variant_status: undefined
            },
            {
                index: undefined,
                variants: [{
                    attribute_id: 1,
                    attribute_value_id: 1,
                    attribute_value_name: 'Silver',
                    attribute_code: 'phone_color',
                    attribute_status: undefined,
                    attribute_code_label: 'Warna'
                },
                {
                    attribute_id: 2,
                    attribute_value_id: 4,
                    attribute_value_name: '64GB',
                    attribute_code: 'phone_storage',
                    attribute_status: undefined,
                    attribute_code_label: 'Kapasitas'
                }
                ],
                variant_value: { phone_color: '1', phone_storage: '4' },
                sku_vendor: 'X112',
                tier_min_qty_1: 10,
                tier_min_qty_2: 20,
                tier_min_qty_3: 30,
                tier_cogs_price_1: 20000000,
                tier_cogs_price_2: 19500000,
                tier_cogs_price_3: 18500000,
                stock: 10,
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                additional_image: ['http://localhost/testing/testing_image.jpg',
                    'http://localhost/testing/testing_image.jpg'
                ],
                warehouse_id: 1,
                location_label: 'Jakarta selatan',
                reference_link: ['https://en.wikipedia.org/wiki/IPhone_X'],
                warranty_option: 'international',
                warranty_period: 'week',
                warranty_limit: 1,
                warranty_coverage: null,
                is_indent: 0,
                indent_period: '',
                indent_limit: 0,
                variant_status: undefined
            }
            ],
            specifications: [{
                attribute_id: 3,
                attribute_code: 'phone_os',
                attribute_code_label: 'Sistem Operasi',
                attribute_type: 'dropdown',
                attribute_value_id: 5,
                attribute_value_label: 'iOS'
            },
            {
                attribute_id: 4,
                attribute_code: 'phone_package',
                attribute_code_label: 'Kelengkapan Paket',
                attribute_type: 'textinput',
                attribute_textinput: 'Tidak dilengkapi dengan hardcase'
            }
            ],
            package_weight: '180',
            package_length: '19',
            package_width: '5',
            package_height: '10',
            package_content: 'tidak ada apa-apa',
            uom: {
                id: 1,
                name: 'Unit'
            },
            stocking_uom: {
                id: 4,
                name: 'Each'
            },
            quantity_stocking_uom: 1,
            description: '<p>lorem ipsum dolorosum de aremo</p>',
            premoderation_status: 'need_revision',
            barcode: '924234324',
            manufacturing_number: 'AP89232423434',
            total_history: 1
        }
    };
};

const varPr = function (t) {
    return {
        _id: '5a44adf9d1db060001b99a6f',
        id: '1514450425982',
        type: 'new',
        product_group_id: null,
        payload: {
            name: 'Iphone X',
            category_id: 561,
            category: {
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 561
            },
            brand_id: 81,
            brand_name: 'dunlop',
            brand_status: 'clear',
            brand_image: 'http://google.com',
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
            variant_matrix: '["phone_color","phone_storage"]',
            specifications: [{
                attribute_id: 3,
                attribute_code: 'phone_os',
                attribute_code_label: 'Sistem Operasi',
                attribute_type: 'dropdown',
                attribute_value_id: 5,
                attribute_value_label: 'iOS'
            },
            {
                attribute_id: 4,
                attribute_code: 'phone_package',
                attribute_code_label: 'Kelengkapan Paket',
                attribute_type: 'textinput',
                attribute_textinput: 'Tidak dilengkapi dengan hardcase'
            }
            ],
            products: [{
                variants: [{
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
                additional_image: ['http://localhost/testing/testing_image.jpg', 'http://localhost/testing/testing_image.jpg'],
                warehouse_id: 1,
                location_label: 'Jakarta selatan',
                reference_link: [
                    'https://en.wikipedia.org/wiki/IPhone_X'
                ],
                warranty_option: 'international',
                warranty_period: 'week',
                warranty_limit: 1,
                warranty_coverage: null,
                is_indent: 0,
                indent_period: '',
                indent_limit: 0
            },
            {
                variants: [{
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
                tier_min_qty_1: 10,
                tier_min_qty_2: 20,
                tier_min_qty_3: 30,
                tier_cogs_price_1: 20000000,
                tier_cogs_price_2: 19500000,
                tier_cogs_price_3: 18500000,
                stock: 10,
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                additional_image: ['http://localhost/testing/testing_image.jpg', 'http://localhost/testing/testing_image.jpg'],
                warehouse_id: 1,
                location_label: 'Jakarta selatan',
                reference_link: [
                    'https://en.wikipedia.org/wiki/IPhone_X'
                ],
                warranty_option: 'international',
                warranty_period: 'week',
                warranty_limit: 1,
                warranty_coverage: null,
                is_indent: 0,
                indent_period: '',
                indent_limit: 0
            }
            ]
        },
        premoderation_status: 'need_revision',
        vendor_id: '16',
        created_by: 11,
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2017-12-28T08:40:25.982Z'
    };
};


const varPrWithNoCategory = function (t) {
    return {
        _id: '5a44adf9d1db060001b99a6f',
        id: '1514450425982',
        type: 'new',
        product_group_id: null,
        payload: {
            name: 'Iphone X',
            category_id: 0,
            category: {
                c0: 0,
                c1: 0,
                c2: 0,
                c3: 0
            },
            brand_id: 81,
            brand_name: 'dunlop',
            brand_status: 'clear',
            brand_image: 'http://google.com',
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
            variant_matrix: '["phone_color","phone_storage"]',
            specifications: [{
                attribute_id: 3,
                attribute_code: 'phone_os',
                attribute_code_label: 'Sistem Operasi',
                attribute_type: 'dropdown',
                attribute_value_id: 5,
                attribute_value_label: 'iOS'
            },
            {
                attribute_id: 4,
                attribute_code: 'phone_package',
                attribute_code_label: 'Kelengkapan Paket',
                attribute_type: 'textinput',
                attribute_textinput: 'Tidak dilengkapi dengan hardcase'
            }
            ],
            products: [{
                variants: [{
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
                additional_image: ['http://localhost/testing/testing_image.jpg', 'http://localhost/testing/testing_image.jpg'],
                warehouse_id: 1,
                location_label: 'Jakarta selatan',
                reference_link: [
                    'https://en.wikipedia.org/wiki/IPhone_X'
                ],
                warranty_option: 'international',
                warranty_period: 'week',
                warranty_limit: 1,
                warranty_coverage: null,
                is_indent: 0,
                indent_period: '',
                indent_limit: 0
            },
            {
                variants: [{
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
                tier_min_qty_1: 10,
                tier_min_qty_2: 20,
                tier_min_qty_3: 30,
                tier_cogs_price_1: 20000000,
                tier_cogs_price_2: 19500000,
                tier_cogs_price_3: 18500000,
                stock: 10,
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                additional_image: ['http://localhost/testing/testing_image.jpg', 'http://localhost/testing/testing_image.jpg'],
                warehouse_id: 1,
                location_label: 'Jakarta selatan',
                reference_link: [
                    'https://en.wikipedia.org/wiki/IPhone_X'
                ],
                warranty_option: 'international',
                warranty_period: 'week',
                warranty_limit: 1,
                warranty_coverage: null,
                is_indent: 0,
                indent_period: '',
                indent_limit: 0
            }
            ]
        },
        premoderation_status: 'need_revision',
        vendor_id: '16',
        created_by: 11,
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2017-12-28T08:40:25.982Z'
    };
};

const expectedWithConditions = function () {
    return {
        data: {
            id: '1514450425982',
            type: 'new',
            product_group_id: null,
            product_name: 'Iphone X',
            category: {
                c0: {
                    id: 8,
                    name: 'IT and Mobile Devices',
                    level: 'C0',
                    unspc: 43000000
                },
                c1: {
                    id: 8,
                    name: 'IT and Mobile Devices',
                    level: 'C0',
                    unspc: 43000000
                },
                c2: {
                    id: 8,
                    name: 'IT and Mobile Devices',
                    level: 'C0',
                    unspc: 43000000
                },
                c3: {
                    id: 8,
                    name: 'IT and Mobile Devices',
                    level: 'C0',
                    unspc: 43000000
                }
            },
            brand: {
                id: 81,
                name: 'dunlop',
                status: 'clear',
                image: 'http://google.com'
            },
            variant_matrix: '["phone_color","phone_storage"]',
            variant_detail: [{
                index: undefined,
                variants: [{
                    attribute_id: 1,
                    attribute_value_id: 1,
                    attribute_value_name: 'Silver',
                    attribute_code: 'phone_color',
                    attribute_code_label: 'Warna',
                    attribute_status: undefined
                },
                {
                    attribute_id: 2,
                    attribute_value_id: 4,
                    attribute_value_name: '64GB',
                    attribute_code: 'phone_storage',
                    attribute_code_label: 'Kapasitas',
                    attribute_status: undefined
                }
                ],
                variant_value: { phone_color: '1', phone_storage: '3' },
                sku_vendor: 'X111',
                tier_min_qty_1: 10,
                tier_min_qty_2: 20,
                tier_min_qty_3: 30,
                tier_cogs_price_1: 20000000,
                tier_cogs_price_2: 19000000,
                tier_cogs_price_3: 18000000,
                stock: 15,
                primary_image: null,
                additional_image: [],
                warehouse_id: 1,
                location_label: 'Jakarta selatan',
                reference_link: [],
                warranty_option: null,
                warranty_period: null,
                warranty_limit: null,
                warranty_coverage: null,
                is_indent: 0,
                indent_period: '',
                indent_limit: 0,
                variant_status: undefined
            },
            {
                index: undefined,
                variants: [{
                    attribute_id: 1,
                    attribute_value_id: 1,
                    attribute_value_name: 'Silver',
                    attribute_code: 'phone_color',
                    attribute_code_label: 'Warna',
                    attribute_status: undefined
                },
                {
                    attribute_id: 2,
                    attribute_value_id: 4,
                    attribute_value_name: '64GB',
                    attribute_code: 'phone_storage',
                    attribute_code_label: 'Kapasitas',
                    attribute_status: undefined
                }
                ],
                variant_value: { phone_color: '1', phone_storage: '4' },
                sku_vendor: 'X112',
                tier_min_qty_1: 10,
                tier_min_qty_2: 20,
                tier_min_qty_3: 30,
                tier_cogs_price_1: 20000000,
                tier_cogs_price_2: 19500000,
                tier_cogs_price_3: 18500000,
                stock: 10,
                primary_image: null,
                additional_image: [],
                warehouse_id: 1,
                location_label: 'Jakarta selatan',
                reference_link: [],
                warranty_option: null,
                warranty_period: null,
                warranty_limit: null,
                warranty_coverage: null,
                is_indent: 0,
                indent_period: '',
                indent_limit: 0,
                variant_status: undefined
            }
            ],
            specifications: [{
                attribute_id: 3,
                attribute_code: 'phone_os',
                attribute_code_label: 'Sistem Operasi',
                attribute_type: 'dropdown',
                attribute_value_id: 5,
                attribute_value_label: 'iOS'
            },
            {
                attribute_id: 4,
                attribute_code: 'phone_package',
                attribute_code_label: 'Kelengkapan Paket',
                attribute_type: 'textinput',
                attribute_textinput: 'Tidak dilengkapi dengan hardcase'
            }
            ],
            package_weight: '180',
            package_length: '19',
            package_width: '5',
            package_height: '10',
            package_content: 'tidak ada apa-apa',
            uom: {
                id: 1,
                name: 'Unit'
            },
            stocking_uom: {
                id: 4,
                name: 'Each'
            },
            quantity_stocking_uom: 1,
            description: '<p>lorem ipsum dolorosum de aremo</p>',
            premoderation_status: null,
            barcode: '924234324',
            manufacturing_number: 'AP89232423434',
            total_history: 1
        }
    };
};

const varPrWithConditions = function (t) {
    return {
        _id: '5a44adf9d1db060001b99a6f',
        id: '1514450425982',
        type: 'new',
        product_group_id: null,
        payload: {
            name: 'Iphone X',
            category_id: 561,
            category: {
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 561
            },
            brand_id: 81,
            brand_name: 'dunlop',
            brand_status: 'clear',
            brand_image: 'http://google.com',
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
            variant_matrix: '["phone_color","phone_storage"]',
            specifications: [{
                attribute_id: 3,
                attribute_code: 'phone_os',
                attribute_code_label: 'Sistem Operasi',
                attribute_type: 'dropdown',
                attribute_value_id: 5,
                attribute_value_label: 'iOS'
            },
            {
                attribute_id: 4,
                attribute_code: 'phone_package',
                attribute_code_label: 'Kelengkapan Paket',
                attribute_type: 'textinput',
                attribute_textinput: 'Tidak dilengkapi dengan hardcase'
            }
            ],
            products: [{
                variants: [{
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
                primary_image: '',
                additional_image: '',
                warehouse_id: 1,
                location_label: 'Jakarta selatan',
                reference_link: '',
                warranty_option: '',
                warranty_period: '',
                warranty_limit: '',
                warranty_coverage: '',
                is_indent: 0,
                indent_period: '',
                indent_limit: 0
            },
            {
                variants: [{
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
                tier_min_qty_1: 10,
                tier_min_qty_2: 20,
                tier_min_qty_3: 30,
                tier_cogs_price_1: 20000000,
                tier_cogs_price_2: 19500000,
                tier_cogs_price_3: 18500000,
                stock: 10,
                primary_image: '',
                additional_image: '',
                warehouse_id: 1,
                location_label: 'Jakarta selatan',
                reference_link: '',
                warranty_option: '',
                warranty_period: '',
                warranty_limit: '',
                warranty_coverage: '',
                is_indent: 0,
                indent_period: '',
                indent_limit: 0
            }
            ]
        },
        premoderation_status: '',
        vendor_id: '16',
        created_by: 11,
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2017-12-28T08:40:25.982Z'
    };
};


test.serial('Should be return Product Request Detail', function* (t) {
    t.context.sandbox.stub(ProductRequestRepository, 'findById').resolves(varPr());
    t.context.sandbox.stub(CategoryRepository, 'findOne').resolves({
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
    t.context.sandbox.stub(BrandRepository, 'findById').resolves({
        id: 1,
        name: 'Apple',
        image_url: null,
        created_at: '2017-11-28T14:54:10.000Z',
        updated_at: '2017-11-28T14:54:10.000Z'
    });
    t.context.sandbox.stub(StockingUomRepository, 'findOne').resolves({
        id: 4,
        name: 'Each',
        created_at: '2017-12-05T16:55:00.000Z',
        updated_at: '2017-12-20T05:49:50.000Z'
    });
    t.context.sandbox.stub(UomRepository, 'findOne').resolves({
        id: 1,
        name: 'Unit',
        created_at: '2017-12-05T16:59:10.000Z',
        updated_at: '2017-12-05T16:59:10.000Z'
    });
    t.context.sandbox.stub(PremoderationLogRepository, 'count').resolves(1);
    try {
        const context = require('../../../mocks/context.json');
        const data = { path: { id: '1513831585492' } };
        const result = yield Methods.getPremoderationById(data, context);
        t.deepEqual(result, expected());
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'The Error Type is Incorrect');
    }
});


test.serial('Should be return Product Request Detail With No Category', function* (t) {
    t.context.sandbox.stub(ProductRequestRepository, 'findById').resolves(varPrWithNoCategory());
    t.context.sandbox.stub(CategoryRepository, 'findOne').resolves(null);
    t.context.sandbox.stub(BrandRepository, 'findById').resolves({
        id: 1,
        name: 'Apple',
        image_url: null,
        created_at: '2017-11-28T14:54:10.000Z',
        updated_at: '2017-11-28T14:54:10.000Z'
    });
    t.context.sandbox.stub(StockingUomRepository, 'findOne').resolves({
        id: 4,
        name: 'Each',
        created_at: '2017-12-05T16:55:00.000Z',
        updated_at: '2017-12-20T05:49:50.000Z'
    });
    t.context.sandbox.stub(UomRepository, 'findOne').resolves({
        id: 1,
        name: 'Unit',
        created_at: '2017-12-05T16:59:10.000Z',
        updated_at: '2017-12-05T16:59:10.000Z'
    });
    t.context.sandbox.stub(PremoderationLogRepository, 'count').resolves(1);
    try {
        const context = require('../../../mocks/context.json');
        const data = { path: { id: '1513831585492' } };
        const result = yield Methods.getPremoderationById(data, context);
        t.deepEqual(result, expectedWithNoCategory());
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'The Error Type is Incorrect');
    }
});


test.serial('Should be return Product Request Detail Existing Type', function* (t) {
    t.context.sandbox.stub(ProductRequestRepository, 'findById').resolves(varPrExisting());
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves({
        id: 1,
        name: 'Tissue Toilet Paseo',
        category_id: 444,
        brand_id: 81,
        uom_id: 1,
        stocking_uom_id: 1,
        quantity_stocking_uom: 1,
        manufacturing_number: 'XXXXX',
        manufacturing_number_type: null,
        package_weight: 180,
        package_length: '19',
        package_width: '5',
        package_height: '1',
        package_content: 'Lorem ipsum',
        barcode: 'YYYYY',
        description: '<p>lorem ipsum dolorosum de aremo</p>',
        primary_image: 'https://cf.shopee.co.id/file/d7bafa4b960799c76fb21c7b970b6cc8',
        variant_count: 0,
        variant_matrix: '',
        status: 1,
        visibility: 1,
        created_by: 1,
        created_at: '2017-12-19T00:00:00.000Z',
        updated_at: null
    });
    t.context.sandbox.stub(CustomeRepository, 'findAllCategoryId').resolves([{ c0: 8 }]);
    t.context.sandbox.stub(CategoryRepository, 'findOne').resolves({
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
    t.context.sandbox.stub(BrandRepository, 'findById').resolves({
        id: 1,
        name: 'Apple',
        image_url: null,
        created_at: '2017-11-28T14:54:10.000Z',
        updated_at: '2017-11-28T14:54:10.000Z'
    });
    t.context.sandbox.stub(StockingUomRepository, 'findOne').resolves({
        id: 4,
        name: 'Each',
        created_at: '2017-12-05T16:55:00.000Z',
        updated_at: '2017-12-20T05:49:50.000Z'
    });
    t.context.sandbox.stub(UomRepository, 'findOne').resolves({
        id: 1,
        name: 'Unit',
        created_at: '2017-12-05T16:59:10.000Z',
        updated_at: '2017-12-05T16:59:10.000Z'
    });
    t.context.sandbox.stub(PremoderationLogRepository, 'count').resolves(1);
    try {
        const context = require('../../../mocks/context.json');
        const data = { path: { id: '1513831585492' } };
        const result = yield Methods.getPremoderationById(data, context);
        t.deepEqual(result, expectedExisting());
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'The Error Type is Incorrect');
        console.log(err);
    }
});

test.serial('Should be return Product Request Detail with Covering All Conditions', function* (t) {
    t.context.sandbox.stub(ProductRequestRepository, 'findById').resolves(varPrWithConditions());
    t.context.sandbox.stub(CategoryRepository, 'findOne').resolves({
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
    t.context.sandbox.stub(BrandRepository, 'findById').resolves({
        id: 1,
        name: 'Apple',
        image_url: null,
        created_at: '2017-11-28T14:54:10.000Z',
        updated_at: '2017-11-28T14:54:10.000Z'
    });
    t.context.sandbox.stub(StockingUomRepository, 'findOne').resolves({
        id: 4,
        name: 'Each',
        created_at: '2017-12-05T16:55:00.000Z',
        updated_at: '2017-12-20T05:49:50.000Z'
    });
    t.context.sandbox.stub(UomRepository, 'findOne').resolves({
        id: 1,
        name: 'Unit',
        created_at: '2017-12-05T16:59:10.000Z',
        updated_at: '2017-12-05T16:59:10.000Z'
    });
    t.context.sandbox.stub(PremoderationLogRepository, 'count').resolves(1);
    try {
        const context = require('../../../mocks/context.json');
        const data = { path: { id: '1513831585492' } };
        const result = yield Methods.getPremoderationById(data, context);
        t.deepEqual(result, expectedWithConditions());
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'The Error Type is Incorrect');
    }
});


test.serial('Should be return Result Not Found', function* (t) {
    t.context.sandbox.stub(ProductRequestRepository, 'findById').resolves('');
    try {
        const context = require('../../../mocks/context.json');
        const data = { path: { id: '1513831585492' } };
        yield Methods.getPremoderationById(data, context);

        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'The Error Type is Incorrect');
    }
});


test.serial('Should be return Context Not Found', function* (t) {
    t.context.sandbox.stub(ProductRequestRepository, 'findById').resolves('');
    try {
        const context = {};
        const data = { path: { id: '1513831585492' } };
        yield Methods.getPremoderationById(data, context);

        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, 'The Error Type is Incorrect');
    }
});

test.serial('Should be return Result Bad Request', function* (t) {
    t.context.sandbox.stub(ProductRequestRepository, 'findById').resolves(varPr());
    try {
        const context = require('../../../mocks/context.json');
        const data = { path: { id: '' } };
        yield Methods.getPremoderationById(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'The Error Type is Incorrect');
    }
});

const varPrExisting = function () {
    return {
        _id: '5a44adf9d1db060001b99a6f',
        id: '1514865286665',
        type: 'existing',
        product_group_id: 2,
        payload: {
            name: 'Iphone X',
            specifications: [{
                attribute_id: 3,
                attribute_code: 'phone_os',
                attribute_code_label: 'Sistem Operasi',
                attribute_type: 'dropdown',
                attribute_value_id: 5,
                attribute_value_label: 'iOS'
            },
            {
                attribute_id: 4,
                attribute_code: 'phone_package',
                attribute_code_label: 'Kelengkapan Paket',
                attribute_type: 'textinput',
                attribute_textinput: 'Tidak dilengkapi dengan hardcase'
            }
            ],
            products: [{
                variants: [{
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
                    phone_color: 1,
                    phone_storage: 3
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
                additional_image: ['http://localhost/testing/testing_image.jpg', 'http://localhost/testing/testing_image.jpg'],
                warehouse_id: 1,
                location_label: 'Jakarta selatan',
                reference_link: [
                    'https://en.wikipedia.org/wiki/IPhone_X'
                ],
                warranty_option: 'official_warranty',
                warranty_period: 'week',
                warranty_limit: 1,
                warranty_coverage: 1,
                is_indent: 0,
                indent_period: '',
                indent_limit: 0
            },
            {
                variants: [{
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
                    phone_color: 1,
                    phone_storage: 4
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
                additional_image: ['http://localhost/testing/testing_image.jpg', 'http://localhost/testing/testing_image.jpg'],
                warehouse_id: 1,
                location_label: 'Jakarta selatan',
                reference_link: [
                    'https://en.wikipedia.org/wiki/IPhone_X'
                ],
                warranty_option: 'international',
                warranty_period: 'week',
                warranty_limit: 1,
                warranty_coverage: null,
                is_indent: 0,
                indent_period: '',
                indent_limit: 0
            }
            ]
        },
        premoderation_status: 'need_revision',
        vendor_id: '16',
        created_by: 11,
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2017-12-28T08:40:25.982Z'
    };
};

const expectedExisting = function () {
    return {
        data: {
            id: '1514865286665',
            type: 'existing',
            product_group_id: 2,
            product_name: 'Tissue Toilet Paseo',
            category: {
                c0: {
                    id: 8,
                    name: 'IT and Mobile Devices',
                    level: 'C0',
                    unspc: 43000000
                },
                c1: {
                    id: 8,
                    name: 'IT and Mobile Devices',
                    level: 'C0',
                    unspc: 43000000
                },
                c2: {
                    id: 8,
                    name: 'IT and Mobile Devices',
                    level: 'C0',
                    unspc: 43000000
                },
                c3: {
                    id: 8,
                    name: 'IT and Mobile Devices',
                    level: 'C0',
                    unspc: 43000000
                }
            },
            brand: {
                id: 81,
                name: undefined,
                status: undefined,
                image: undefined
            },
            variant_matrix: [],
            variant_detail: [{
                index: undefined,
                variants: [{
                    attribute_id: 1,
                    attribute_value_id: 1,
                    attribute_value_name: 'Silver',
                    attribute_code: 'phone_color',
                    attribute_code_label: 'Warna',
                    attribute_status: undefined
                },
                {
                    attribute_id: 2,
                    attribute_value_id: 4,
                    attribute_value_name: '64GB',
                    attribute_code: 'phone_storage',
                    attribute_code_label: 'Kapasitas',
                    attribute_status: undefined
                }
                ],
                variant_value: {
                    phone_color: 1,
                    phone_storage: 3
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
                additional_image: ['http://localhost/testing/testing_image.jpg',
                    'http://localhost/testing/testing_image.jpg'
                ],
                warehouse_id: 1,
                location_label: 'Jakarta selatan',
                reference_link: ['https://en.wikipedia.org/wiki/IPhone_X'],
                warranty_option: 'official_warranty',
                warranty_period: 'week',
                warranty_limit: 1,
                warranty_coverage: 1,
                is_indent: 0,
                indent_period: '',
                indent_limit: 0,
                variant_status: undefined
            },
            {
                index: undefined,
                variants: [{
                    attribute_id: 1,
                    attribute_value_id: 1,
                    attribute_value_name: 'Silver',
                    attribute_code: 'phone_color',
                    attribute_code_label: 'Warna',
                    attribute_status: undefined
                },
                {
                    attribute_id: 2,
                    attribute_value_id: 4,
                    attribute_value_name: '64GB',
                    attribute_code: 'phone_storage',
                    attribute_code_label: 'Kapasitas',
                    attribute_status: undefined
                }
                ],
                variant_value: {
                    phone_color: 1,
                    phone_storage: 4
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
                additional_image: ['http://localhost/testing/testing_image.jpg',
                    'http://localhost/testing/testing_image.jpg'
                ],
                warehouse_id: 1,
                location_label: 'Jakarta selatan',
                reference_link: ['https://en.wikipedia.org/wiki/IPhone_X'],
                warranty_option: 'international',
                warranty_period: 'week',
                warranty_limit: 1,
                warranty_coverage: null,
                is_indent: 0,
                indent_period: '',
                indent_limit: 0,
                variant_status: undefined
            }
            ],
            specifications: [{
                attribute_id: 3,
                attribute_code: 'phone_os',
                attribute_code_label: 'Sistem Operasi',
                attribute_type: 'dropdown',
                attribute_value_id: 5,
                attribute_value_label: 'iOS'
            },
            {
                attribute_id: 4,
                attribute_code: 'phone_package',
                attribute_code_label: 'Kelengkapan Paket',
                attribute_type: 'textinput',
                attribute_textinput: 'Tidak dilengkapi dengan hardcase'
            }
            ],
            package_weight: 180,
            package_length: '19',
            package_width: '5',
            package_height: '1',
            package_content: 'Lorem ipsum',
            uom: { id: 1, name: 'Unit' },
            stocking_uom: { id: 4, name: 'Each' },
            quantity_stocking_uom: 1,
            description: '<p>lorem ipsum dolorosum de aremo</p>',
            premoderation_status: 'need_revision',
            barcode: 'YYYYY',
            manufacturing_number: 'XXXXX',
            total_history: 1
        }
    };
};


test.before('Initialize BizzyError Before All Tests', (t) => {
    BizzyError.initializeErrors();
});
test.beforeEach('Initialize New Sandbox Before Each Test', function* (t) {
    t.context.sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
});
test.afterEach.always('Restore Sandbox and Configuration After Each Test', function* (t) {
    t.context.sandbox.restore();
});
