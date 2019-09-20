'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const test = require('ava');
const sinon = require('sinon');
const PremoderationRepository = require('../../../../src/repositories/premoderation');
const PremoderationLogRepository = require('../../../../src/repositories/premoderation_log');
const ProductGroupRepository = require('../../../../src/repositories/product_group');
const ProductVariantRepository = require('../../../../src/repositories/product_variant');
const UomRepository = require('../../../../src/repositories/uom');
const StockingUomRepository = require('../../../../src/repositories/stocking_uom');
const BrandRepository = require('../../../../src/repositories/brand');
const CategoryRepository = require('../../../../src/repositories/category');
const Method = require('../../../../src/methods/premoderations/detail');

test.serial('Should be return product detail with type: new', function* (t) {
    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves({
        _id: '5a53336c4acfd20001a341b7',
        id: '1515402092356',
        type: 'new',
        payload: {
            name: 'Tinner',
            category_id: 646,
            category: {
                c0: 3,
                c1: 43,
                c2: 199,
                c3: 646
            },
            brand_id: 429,
            brand_name: 'dunlop',
            brand_status: 'clear',
            brand_image: 'http://google.com',
            uom_id: 1,
            stocking_uom_id: 3,
            quantity_stocking_uom: 122,
            manufacturing_number: 'DKR0010001',
            package_weight: '1000',
            package_length: '200',
            package_height: '500',
            package_width: '150',
            package_content: '1 kaleng bonus kuas',
            barcode: 'DK001',
            description: '<p><span style="background-color: rgb(255, 255, 255); color: rgb(96, 96, 96);">Thinner cap Dakar</span></p><p><span style="background-color: rgb(255, 255, 255); color: rgb(96, 96, 96);">Kemasan kaleng 1 Liter (NETTO =0,9 LITER)</span></p><p><span style="background-color: rgb(255, 255, 255); color: rgb(96, 96, 96);">Pengencer cat minyak dan cat duco</span></p>',
            variant_count: 0,
            variant_matrix: [],
            specification_status: 'clear',
            specifications: [],
            products: [
                {
                    index: '',
                    variants: [],
                    variant_value: 'NO_VARIANT',
                    sku_vendor: '',
                    tier_min_qty_1: 20,
                    tier_min_qty_2: 30,
                    tier_min_qty_3: 50,
                    tier_cogs_price_1: 25000,
                    tier_cogs_price_2: 24500,
                    tier_cogs_price_3: 24250,
                    stock: 100,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1515401933.jpg',
                    additional_image: [
                        'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1515401997.png'
                    ],
                    reference_link: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    warranty_option: 'no_warranty',
                    warranty_period: '',
                    warranty_limit: '',
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    is_decimal: 0,
                    down_payment_type: 0,
                    down_payment_value: 0,
                    warranty_coverage: '',
                    variant_status: 'complete',
                    is_contract: 0
                }
            ]
        },
        premoderation_status: 'rejected',
        vendor_id: 3,
        created_by: 3,
        created_at: '2018-01-08T09:01:32.356Z',
        updated_at: '2018-01-08T09:01:32.356Z'
    });
    t.context.sandbox.stub(UomRepository, 'findById').resolves({
        id: 1,
        name: 'Unit',
        created_at: '2017-12-05T16:59:10.000Z',
        updated_at: '2017-12-05T16:59:10.000Z'
    });
    t.context.sandbox.stub(StockingUomRepository, 'findById').resolves({
        id: 3,
        name: 'Dozen',
        created_at: '2017-12-05T16:55:00.000Z',
        updated_at: '2017-12-05T16:55:00.000Z'
    });
    t.context.sandbox.stub(BrandRepository, 'findById').resolves({
        id: 429,
        name: 'dunlop',
        image_url: null,
        created_at: '2017-11-28T14:54:10.000Z',
        updated_at: '2017-11-28T14:54:10.000Z'
    });
    t.context.sandbox.stub(CategoryRepository, 'getCategoryBreakdown').resolves([{
        category0_id: 3,
        category0_name: 'Maintenance, Repair, Overhaul / Operation (MRO)',
        category0_unspsc: 15000000,
        category1_id: 43,
        category1_name: 'Paints & primers & finishes',
        category1_unspsc: 31210000,
        category2_id: 199,
        category2_name: 'Miscellaneous finishes',
        category2_unspsc: 31211700,
        category3_id: 646,
        category3_name: 'Sealers',
        category3_unspsc: 31211704
    }]);
    t.context.sandbox.stub(PremoderationLogRepository, 'findById').resolves([{
        _id: '5a533403421e700001669533',
        premoderation_id: '1515402092356',
        product_name: 'Tinner',
        reject_reasons: {
            product_data: '',
            sku_list: '',
            product_specification: '',
            description: '',
            product_details: '',
            package_dimension: '',
            warranty: '',
            totally_reject: 'Barang Ilegal'
        },
        last_status: 'revision_complete',
        current_status: 'rejected',
        created_by: 73,
        created_at: '2018-01-08T09:04:03.541Z',
        updated_at: '2018-01-08T09:04:03.541Z'
    }]);

    t.context.sandbox.stub(ProductVariantRepository, 'findAll').resolves([
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

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3',
                pid: '1515402092356'
            },
            query: {
                include: 'reject_reasons'
            }
        };

        const result = yield Method.getPremoderationById(data, context);
        const expect = {
            data: {
                id: '1515402092356',
                type: 'new',
                product_group_id: null,
                premoderation_status: 'rejected',
                payload: {
                    name: 'Tinner',
                    uom: {
                        id: 1,
                        name: 'Unit'
                    },
                    barcode: 'DK001',
                    manufacturing_number: 'DKR0010001',
                    stocking_uom: {
                        id: 3,
                        name: 'Dozen'
                    },
                    quantity_stocking_uom: 122,
                    brand: {
                        id: 429,
                        name: 'dunlop',
                        status: 'clear',
                        image: 'http://google.com'
                    },
                    category_id: 646,
                    categories: {
                        C0: {
                            id: 3,
                            name: 'Maintenance, Repair, Overhaul / Operation (MRO)',
                            unspsc: 15000000
                        },
                        C1: {
                            id: 43,
                            name: 'Paints & primers & finishes',
                            unspsc: 31210000
                        },
                        C2: {
                            id: 199,
                            name: 'Miscellaneous finishes',
                            unspsc: 31211700
                        },
                        C3: {
                            id: 646,
                            name: 'Sealers',
                            unspsc: 31211704
                        }
                    },
                    dimensions: {
                        package_weight: '1000',
                        package_length: '200',
                        package_width: '150',
                        package_height: '500'
                    },
                    package_content: '1 kaleng bonus kuas',
                    description: '<p><span style="background-color: rgb(255, 255, 255); color: rgb(96, 96, 96);">Thinner cap Dakar</span></p><p><span style="background-color: rgb(255, 255, 255); color: rgb(96, 96, 96);">Kemasan kaleng 1 Liter (NETTO =0,9 LITER)</span></p><p><span style="background-color: rgb(255, 255, 255); color: rgb(96, 96, 96);">Pengencer cat minyak dan cat duco</span></p>',
                    variant_count: 0,
                    variant_matrix: [],
                    specification_status: 'clear',
                    specifications: [],
                    variant_images: undefined,
                    // variant_images: {
                    //     'phone_color=2|phone_storage=11': {
                    //         primary_image: 'http://localhost/testing/testing_image.jpg',
                    //         additional_image: [
                    //             'http://localhost/testing/testing_image.jpg',
                    //             'http://localhost/testing/testing_image.jpg'
                    //         ]
                    //     },
                    //     'phone_color=2|phone_storage=4': {
                    //         primary_image: 'http://localhost/testing/testing_image.jpg',
                    //         additional_image: [
                    //             'http://localhost/testing/testing_image.jpg',
                    //             'http://localhost/testing/testing_image.jpg'
                    //         ]
                    //     }
                    // },
                    products: [
                        {
                            index: '',
                            variants: [],
                            variant_value: 'NO_VARIANT',
                            sku_vendor: '',
                            tier_min_qty_1: 20,
                            tier_min_qty_2: 30,
                            tier_min_qty_3: 50,
                            tier_cogs_price_1: 25000,
                            tier_cogs_price_2: 24500,
                            tier_cogs_price_3: 24250,
                            stock: 100,
                            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1515401933.jpg',
                            additional_image: [
                                'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1515401997.png'
                            ],
                            reference_link: [],
                            warehouse_id: 1,
                            location_label: 'Jakarta selatan',
                            warranty_option: 'no_warranty',
                            warranty_period: '',
                            warranty_limit: '',
                            is_indent: 0,
                            indent_period: '',
                            indent_limit: 0,
                            warranty_coverage: '',
                            variant_status: 'complete',
                            is_contract: 0,
                            is_decimal: 0,
                            down_payment_type: 0,
                            down_payment_value: 0
                        }
                    ]
                },
                reject_reasons: {
                    product_data: '',
                    sku_list: '',
                    product_specification: '',
                    description: '',
                    product_details: '',
                    package_dimension: '',
                    warranty: '',
                    totally_reject: 'Barang Ilegal'
                }
            }
        };
        t.deepEqual(result, expect);
    } catch (err) {
        console.log(err);
    }
});


test.serial('Should be return product detail with category: 0', function* (t) {
    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves({
        _id: '5a53336c4acfd20001a341b7',
        id: '1515402092356',
        type: 'new',
        payload: {
            name: 'Tinner',
            category_id: 0,
            category: {
                c0: 0,
                c1: 0,
                c2: 0,
                c3: 0
            },
            brand_id: 429,
            brand_name: 'dunlop',
            brand_status: 'clear',
            brand_image: 'http://google.com',
            uom_id: 1,
            stocking_uom_id: 3,
            quantity_stocking_uom: 122,
            manufacturing_number: 'DKR0010001',
            package_weight: '1000',
            package_length: '200',
            package_height: '500',
            package_width: '150',
            package_content: '1 kaleng bonus kuas',
            barcode: 'DK001',
            description: '<p><span style="background-color: rgb(255, 255, 255); color: rgb(96, 96, 96);">Thinner cap Dakar</span></p><p><span style="background-color: rgb(255, 255, 255); color: rgb(96, 96, 96);">Kemasan kaleng 1 Liter (NETTO =0,9 LITER)</span></p><p><span style="background-color: rgb(255, 255, 255); color: rgb(96, 96, 96);">Pengencer cat minyak dan cat duco</span></p>',
            variant_count: 0,
            variant_matrix: [],
            specification_status: 'clear',
            specifications: [],
            products: [
                {
                    index: '',
                    variants: [],
                    variant_value: 'NO_VARIANT',
                    sku_vendor: '',
                    tier_min_qty_1: 20,
                    tier_min_qty_2: 30,
                    tier_min_qty_3: 50,
                    tier_cogs_price_1: 25000,
                    tier_cogs_price_2: 24500,
                    tier_cogs_price_3: 24250,
                    stock: 100,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1515401933.jpg',
                    additional_image: [
                        'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1515401997.png'
                    ],
                    reference_link: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    warranty_option: 'no_warranty',
                    warranty_period: '',
                    warranty_limit: '',
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    warranty_coverage: '',
                    variant_status: 'complete',
                    is_contract: 0,
                    is_decimal: 0,
                    down_payment_type: 0,
                    down_payment_value: 0
                }
            ]
        },
        premoderation_status: 'rejected',
        vendor_id: 3,
        created_by: 3,
        created_at: '2018-01-08T09:01:32.356Z',
        updated_at: '2018-01-08T09:01:32.356Z'
    });
    t.context.sandbox.stub(UomRepository, 'findById').resolves({
        id: 1,
        name: 'Unit',
        created_at: '2017-12-05T16:59:10.000Z',
        updated_at: '2017-12-05T16:59:10.000Z'
    });
    t.context.sandbox.stub(StockingUomRepository, 'findById').resolves({
        id: 3,
        name: 'Dozen',
        created_at: '2017-12-05T16:55:00.000Z',
        updated_at: '2017-12-05T16:55:00.000Z'
    });
    t.context.sandbox.stub(BrandRepository, 'findById').resolves({
        id: 429,
        name: 'dunlop',
        image_url: null,
        created_at: '2017-11-28T14:54:10.000Z',
        updated_at: '2017-11-28T14:54:10.000Z'
    });
    t.context.sandbox.stub(CategoryRepository, 'getCategoryBreakdown').resolves([]);
    t.context.sandbox.stub(PremoderationLogRepository, 'findById').resolves([{
        _id: '5a533403421e700001669533',
        premoderation_id: '1515402092356',
        product_name: 'Tinner',
        reject_reasons: {
            product_data: '',
            sku_list: '',
            product_specification: '',
            description: '',
            product_details: '',
            package_dimension: '',
            warranty: '',
            totally_reject: 'Barang Ilegal'
        },
        last_status: 'revision_complete',
        current_status: 'rejected',
        created_by: 73,
        created_at: '2018-01-08T09:04:03.541Z',
        updated_at: '2018-01-08T09:04:03.541Z'
    }]);

    t.context.sandbox.stub(ProductVariantRepository, 'findAll').resolves([
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

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3',
                pid: '1515402092356'
            },
            query: {
                include: 'reject_reasons'
            }
        };

        const result = yield Method.getPremoderationById(data, context);
        const expect = {
            data: {
                id: '1515402092356',
                type: 'new',
                product_group_id: null,
                premoderation_status: 'rejected',
                payload: {
                    name: 'Tinner',
                    uom: {
                        id: 1,
                        name: 'Unit'
                    },
                    barcode: 'DK001',
                    manufacturing_number: 'DKR0010001',
                    stocking_uom: {
                        id: 3,
                        name: 'Dozen'
                    },
                    quantity_stocking_uom: 122,
                    brand: {
                        id: 429,
                        name: 'dunlop',
                        status: 'clear',
                        image: 'http://google.com'
                    },
                    category_id: 0,
                    categories: {
                        C0: {
                            id: 0,
                            name: '',
                            unspsc: 0
                        },
                        C1: {
                            id: 0,
                            name: '',
                            unspsc: 0
                        },
                        C2: {
                            id: 0,
                            name: '',
                            unspsc: 0
                        },
                        C3: {
                            id: 0,
                            name: '',
                            unspsc: 0
                        }
                    },
                    dimensions: {
                        package_weight: '1000',
                        package_length: '200',
                        package_width: '150',
                        package_height: '500'
                    },
                    package_content: '1 kaleng bonus kuas',
                    description: '<p><span style="background-color: rgb(255, 255, 255); color: rgb(96, 96, 96);">Thinner cap Dakar</span></p><p><span style="background-color: rgb(255, 255, 255); color: rgb(96, 96, 96);">Kemasan kaleng 1 Liter (NETTO =0,9 LITER)</span></p><p><span style="background-color: rgb(255, 255, 255); color: rgb(96, 96, 96);">Pengencer cat minyak dan cat duco</span></p>',
                    variant_count: 0,
                    variant_matrix: [],
                    specification_status: 'clear',
                    specifications: [],
                    variant_images: undefined,
                    // variant_images: {
                    //     'phone_color=2|phone_storage=11': {
                    //         primary_image: 'http://localhost/testing/testing_image.jpg',
                    //         additional_image: [
                    //             'http://localhost/testing/testing_image.jpg',
                    //             'http://localhost/testing/testing_image.jpg'
                    //         ]
                    //     },
                    //     'phone_color=2|phone_storage=4': {
                    //         primary_image: 'http://localhost/testing/testing_image.jpg',
                    //         additional_image: [
                    //             'http://localhost/testing/testing_image.jpg',
                    //             'http://localhost/testing/testing_image.jpg'
                    //         ]
                    //     }
                    // },
                    products: [
                        {
                            index: '',
                            variants: [],
                            variant_value: 'NO_VARIANT',
                            sku_vendor: '',
                            tier_min_qty_1: 20,
                            tier_min_qty_2: 30,
                            tier_min_qty_3: 50,
                            tier_cogs_price_1: 25000,
                            tier_cogs_price_2: 24500,
                            tier_cogs_price_3: 24250,
                            stock: 100,
                            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1515401933.jpg',
                            additional_image: [
                                'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1515401997.png'
                            ],
                            reference_link: [],
                            warehouse_id: 1,
                            location_label: 'Jakarta selatan',
                            warranty_option: 'no_warranty',
                            warranty_period: '',
                            warranty_limit: '',
                            is_indent: 0,
                            indent_period: '',
                            indent_limit: 0,
                            warranty_coverage: '',
                            variant_status: 'complete',
                            is_contract: 0,
                            is_decimal: 0,
                            down_payment_type: 0,
                            down_payment_value: 0
                        }
                    ]
                },
                reject_reasons: {
                    product_data: '',
                    sku_list: '',
                    product_specification: '',
                    description: '',
                    product_details: '',
                    package_dimension: '',
                    warranty: '',
                    totally_reject: 'Barang Ilegal'
                }
            }
        };
        t.deepEqual(result, expect);
    } catch (err) {
        console.log(err);
    }
});

test.serial('Should be return product detail with type: new without reject reasons', function* (t) {
    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves({
        _id: '5a53336c4acfd20001a341b7',
        id: '1515402092356',
        type: 'new',
        payload: {
            name: 'Tinner',
            category_id: 646,
            category: {
                c0: 3,
                c1: 43,
                c2: 199,
                c3: 646
            },
            brand_id: 429,
            brand_name: 'dunlop',
            brand_status: 'clear',
            brand_image: 'http://google.com',
            uom_id: 1,
            stocking_uom_id: 3,
            quantity_stocking_uom: 122,
            manufacturing_number: 'DKR0010001',
            package_weight: '1000',
            package_length: '200',
            package_height: '500',
            package_width: '150',
            package_content: '1 kaleng bonus kuas',
            barcode: 'DK001',
            description: '<p><span style="background-color: rgb(255, 255, 255); color: rgb(96, 96, 96);">Thinner cap Dakar</span></p><p><span style="background-color: rgb(255, 255, 255); color: rgb(96, 96, 96);">Kemasan kaleng 1 Liter (NETTO =0,9 LITER)</span></p><p><span style="background-color: rgb(255, 255, 255); color: rgb(96, 96, 96);">Pengencer cat minyak dan cat duco</span></p>',
            variant_count: 0,
            variant_matrix: [],
            specification_status: 'clear',
            specifications: [],
            products: [
                {
                    index: '80sv3',
                    variants: [],
                    variant_value: 'NO_VARIANT',
                    sku_vendor: '',
                    tier_min_qty_1: 20,
                    tier_min_qty_2: 30,
                    tier_min_qty_3: 50,
                    tier_cogs_price_1: 25000,
                    tier_cogs_price_2: 24500,
                    tier_cogs_price_3: 24250,
                    stock: 100,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1515401933.jpg',
                    additional_image: [
                        'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1515401997.png'
                    ],
                    reference_link: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    warranty_option: 'no_warranty',
                    warranty_period: '',
                    warranty_limit: '',
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    warranty_coverage: '',
                    variant_status: 'complete',
                    is_contract: 1,
                    is_decimal: 0,
                    down_payment_type: 0,
                    down_payment_value: 0
                }
            ]
        },
        premoderation_status: 'rejected',
        vendor_id: 3,
        created_by: 3,
        created_at: '2018-01-08T09:01:32.356Z',
        updated_at: '2018-01-08T09:01:32.356Z'
    });
    t.context.sandbox.stub(UomRepository, 'findById').resolves({
        id: 1,
        name: 'Unit',
        created_at: '2017-12-05T16:59:10.000Z',
        updated_at: '2017-12-05T16:59:10.000Z'
    });
    t.context.sandbox.stub(StockingUomRepository, 'findById').resolves({
        id: 3,
        name: 'Dozen',
        created_at: '2017-12-05T16:55:00.000Z',
        updated_at: '2017-12-05T16:55:00.000Z'
    });
    t.context.sandbox.stub(BrandRepository, 'findById').resolves({
        id: 429,
        name: 'dunlop',
        image_url: null,
        created_at: '2017-11-28T14:54:10.000Z',
        updated_at: '2017-11-28T14:54:10.000Z'
    });
    t.context.sandbox.stub(CategoryRepository, 'getCategoryBreakdown').resolves([{
        category0_id: 3,
        category0_name: 'Maintenance, Repair, Overhaul / Operation (MRO)',
        category0_unspsc: 15000000,
        category1_id: 43,
        category1_name: 'Paints & primers & finishes',
        category1_unspsc: 31210000,
        category2_id: 199,
        category2_name: 'Miscellaneous finishes',
        category2_unspsc: 31211700,
        category3_id: 646,
        category3_name: 'Sealers',
        category3_unspsc: 31211704
    }]);
    t.context.sandbox.stub(PremoderationLogRepository, 'findById').resolves([]);

    t.context.sandbox.stub(ProductVariantRepository, 'findAll').resolves([
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

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3',
                pid: '1515402092356'
            },
            query: {
                include: ''
            }
        };

        const result = yield Method.getPremoderationById(data, context);
        const expect = {
            data: {
                id: '1515402092356',
                type: 'new',
                product_group_id: null,
                premoderation_status: 'rejected',
                payload: {
                    name: 'Tinner',
                    uom: {
                        id: 1,
                        name: 'Unit'
                    },
                    barcode: 'DK001',
                    manufacturing_number: 'DKR0010001',
                    stocking_uom: {
                        id: 3,
                        name: 'Dozen'
                    },
                    quantity_stocking_uom: 122,
                    brand: {
                        id: 429,
                        name: 'dunlop',
                        status: 'clear',
                        image: 'http://google.com'
                    },
                    category_id: 646,
                    categories: {
                        C0: {
                            id: 3,
                            name: 'Maintenance, Repair, Overhaul / Operation (MRO)',
                            unspsc: 15000000
                        },
                        C1: {
                            id: 43,
                            name: 'Paints & primers & finishes',
                            unspsc: 31210000
                        },
                        C2: {
                            id: 199,
                            name: 'Miscellaneous finishes',
                            unspsc: 31211700
                        },
                        C3: {
                            id: 646,
                            name: 'Sealers',
                            unspsc: 31211704
                        }
                    },
                    dimensions: {
                        package_weight: '1000',
                        package_length: '200',
                        package_width: '150',
                        package_height: '500'
                    },
                    package_content: '1 kaleng bonus kuas',
                    description: '<p><span style="background-color: rgb(255, 255, 255); color: rgb(96, 96, 96);">Thinner cap Dakar</span></p><p><span style="background-color: rgb(255, 255, 255); color: rgb(96, 96, 96);">Kemasan kaleng 1 Liter (NETTO =0,9 LITER)</span></p><p><span style="background-color: rgb(255, 255, 255); color: rgb(96, 96, 96);">Pengencer cat minyak dan cat duco</span></p>',
                    variant_count: 0,
                    variant_matrix: [],
                    specification_status: 'clear',
                    specifications: [],
                    variant_images: undefined,
                    // variant_images: {
                    //     'phone_color=2|phone_storage=11': {
                    //         primary_image: 'http://localhost/testing/testing_image.jpg',
                    //         additional_image: [
                    //             'http://localhost/testing/testing_image.jpg',
                    //             'http://localhost/testing/testing_image.jpg'
                    //         ]
                    //     },
                    //     'phone_color=2|phone_storage=4': {
                    //         primary_image: 'http://localhost/testing/testing_image.jpg',
                    //         additional_image: [
                    //             'http://localhost/testing/testing_image.jpg',
                    //             'http://localhost/testing/testing_image.jpg'
                    //         ]
                    //     }
                    // },
                    products: [
                        {
                            index: '80sv3',
                            variants: [],
                            variant_value: 'NO_VARIANT',
                            sku_vendor: '',
                            tier_min_qty_1: 20,
                            tier_min_qty_2: 30,
                            tier_min_qty_3: 50,
                            tier_cogs_price_1: 25000,
                            tier_cogs_price_2: 24500,
                            tier_cogs_price_3: 24250,
                            stock: 100,
                            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1515401933.jpg',
                            additional_image: [
                                'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1515401997.png'
                            ],
                            reference_link: [],
                            warehouse_id: 1,
                            location_label: 'Jakarta selatan',
                            warranty_option: 'no_warranty',
                            warranty_period: '',
                            warranty_limit: '',
                            is_indent: 0,
                            indent_period: '',
                            indent_limit: 0,
                            warranty_coverage: '',
                            variant_status: 'complete',
                            is_contract: 1,
                            is_decimal: 0,
                            down_payment_type: 0,
                            down_payment_value: 0
                        }
                    ]
                },
                reject_reasons: {}
            }
        };
        t.deepEqual(result, expect);
    } catch (err) {
        console.log(err);
    }
});

test.serial('Should be return product detail with type: existing', function* (t) {
    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves({
        _id: '5a53336c4acfd20001a341b7',
        id: '1515402092356',
        type: 'existing',
        product_group_id: 2,
        payload: {
            name: 'Tinner',
            category_id: 646,
            category: {
                c0: 3,
                c1: 43,
                c2: 199,
                c3: 646
            },
            brand_id: 429,
            brand_name: 'dunlop',
            brand_status: 'clear',
            brand_image: 'http://google.com',
            uom_id: 1,
            stocking_uom_id: 3,
            quantity_stocking_uom: 122,
            manufacturing_number: 'DKR0010001',
            package_weight: '1000',
            package_length: '200',
            package_height: '500',
            package_width: '150',
            package_content: '1 kaleng bonus kuas',
            barcode: 'DK001',
            description: '<p><span style="background-color: rgb(255, 255, 255); color: rgb(96, 96, 96);">Thinner cap Dakar</span></p><p><span style="background-color: rgb(255, 255, 255); color: rgb(96, 96, 96);">Kemasan kaleng 1 Liter (NETTO =0,9 LITER)</span></p><p><span style="background-color: rgb(255, 255, 255); color: rgb(96, 96, 96);">Pengencer cat minyak dan cat duco</span></p>',
            variant_count: 0,
            variant_matrix: [],
            specification_status: 'clear',
            specifications: [],
            products: [
                {
                    index: '80sv3',
                    variants: [],
                    variant_value: 'NO_VARIANT',
                    sku_vendor: '',
                    tier_min_qty_1: 20,
                    tier_min_qty_2: 30,
                    tier_min_qty_3: 50,
                    tier_cogs_price_1: 25000,
                    tier_cogs_price_2: 24500,
                    tier_cogs_price_3: 24250,
                    stock: 100,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1515401933.jpg',
                    additional_image: [
                        'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1515401997.png'
                    ],
                    reference_link: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    warranty_option: 'no_warranty',
                    warranty_period: '',
                    warranty_limit: '',
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    warranty_coverage: '',
                    variant_status: 'complete',
                    is_contract: 1,
                    is_decimal: 1,
                    down_payment_type: 0,
                    down_payment_value: 0
                }
            ]
        },
        premoderation_status: 'rejected',
        vendor_id: 3,
        created_by: 3,
        created_at: '2018-01-08T09:01:32.356Z',
        updated_at: '2018-01-08T09:01:32.356Z'
    });
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves({
        id: 2,
        name: 'Apple iPhone 7',
        category_id: 646,
        brand_id: 429,
        uom_id: 1,
        stocking_uom_id: 3,
        quantity_stocking_uom: 122,
        manufacturing_number: 'DKR0010001',
        manufacturing_number_type: null,
        package_weight: '1000',
        package_length: '200',
        package_height: '500',
        package_width: '150',
        package_content: '1 kaleng bonus kuas',
        barcode: 'DK001',
        description: '<p><span style="background-color: rgb(255, 255, 255); color: rgb(96, 96, 96);">Thinner cap Dakar</span></p><p><span style="background-color: rgb(255, 255, 255); color: rgb(96, 96, 96);">Kemasan kaleng 1 Liter (NETTO =0,9 LITER)</span></p><p><span style="background-color: rgb(255, 255, 255); color: rgb(96, 96, 96);">Pengencer cat minyak dan cat duco</span></p>',
        primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        created_at: '2017-12-19T14:59:19.000Z',
        updated_at: '2018-01-17T06:05:39.000Z'
    });

    t.context.sandbox.stub(UomRepository, 'findById').resolves({
        id: 1,
        name: 'Unit',
        created_at: '2017-12-05T16:59:10.000Z',
        updated_at: '2017-12-05T16:59:10.000Z'
    });
    t.context.sandbox.stub(StockingUomRepository, 'findById').resolves({
        id: 3,
        name: 'Dozen',
        created_at: '2017-12-05T16:55:00.000Z',
        updated_at: '2017-12-05T16:55:00.000Z'
    });
    t.context.sandbox.stub(BrandRepository, 'findById').resolves({
        id: 429,
        name: 'dunlop',
        image_url: null,
        created_at: '2017-11-28T14:54:10.000Z',
        updated_at: '2017-11-28T14:54:10.000Z'
    });
    t.context.sandbox.stub(CategoryRepository, 'getCategoryBreakdown').resolves([{
        category0_id: 3,
        category0_name: 'Maintenance, Repair, Overhaul / Operation (MRO)',
        category0_unspsc: 15000000,
        category1_id: 43,
        category1_name: 'Paints & primers & finishes',
        category1_unspsc: 31210000,
        category2_id: 199,
        category2_name: 'Miscellaneous finishes',
        category2_unspsc: 31211700,
        category3_id: 646,
        category3_name: 'Sealers',
        category3_unspsc: 31211704
    }]);
    t.context.sandbox.stub(PremoderationLogRepository, 'findById').resolves([]);

    t.context.sandbox.stub(ProductVariantRepository, 'findAll').resolves([
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

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3',
                pid: '1515402092356'
            },
            query: {
                include: 'reject_reasons'
            }
        };

        const result = yield Method.getPremoderationById(data, context);
        const expect = {
            data: {
                id: '1515402092356',
                type: 'existing',
                product_group_id: 2,
                premoderation_status: 'rejected',
                payload: {
                    name: 'Tinner',
                    uom: {
                        id: 1,
                        name: 'Unit'
                    },
                    barcode: 'DK001',
                    manufacturing_number: 'DKR0010001',
                    stocking_uom: {
                        id: 3,
                        name: 'Dozen'
                    },
                    quantity_stocking_uom: 122,
                    brand: {
                        id: 429,
                        name: 'dunlop',
                        status: 'clear',
                        image: 'http://google.com'
                    },
                    category_id: 646,
                    categories: {
                        C0: {
                            id: 3,
                            name: 'Maintenance, Repair, Overhaul / Operation (MRO)',
                            unspsc: 15000000
                        },
                        C1: {
                            id: 43,
                            name: 'Paints & primers & finishes',
                            unspsc: 31210000
                        },
                        C2: {
                            id: 199,
                            name: 'Miscellaneous finishes',
                            unspsc: 31211700
                        },
                        C3: {
                            id: 646,
                            name: 'Sealers',
                            unspsc: 31211704
                        }
                    },
                    dimensions: {
                        package_weight: '1000',
                        package_length: '200',
                        package_width: '150',
                        package_height: '500'
                    },
                    package_content: '1 kaleng bonus kuas',
                    description: '<p><span style="background-color: rgb(255, 255, 255); color: rgb(96, 96, 96);">Thinner cap Dakar</span></p><p><span style="background-color: rgb(255, 255, 255); color: rgb(96, 96, 96);">Kemasan kaleng 1 Liter (NETTO =0,9 LITER)</span></p><p><span style="background-color: rgb(255, 255, 255); color: rgb(96, 96, 96);">Pengencer cat minyak dan cat duco</span></p>',
                    variant_count: 0,
                    variant_matrix: [],
                    specification_status: 'clear',
                    specifications: [],
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
                    products: [
                        {
                            index: '80sv3',
                            variants: [],
                            variant_value: 'NO_VARIANT',
                            sku_vendor: '',
                            tier_min_qty_1: 20,
                            tier_min_qty_2: 30,
                            tier_min_qty_3: 50,
                            tier_cogs_price_1: 25000,
                            tier_cogs_price_2: 24500,
                            tier_cogs_price_3: 24250,
                            stock: 100,
                            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1515401933.jpg',
                            additional_image: [
                                'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1515401997.png'
                            ],
                            reference_link: [],
                            warehouse_id: 1,
                            location_label: 'Jakarta selatan',
                            warranty_option: 'no_warranty',
                            warranty_period: '',
                            warranty_limit: '',
                            is_indent: 0,
                            indent_period: '',
                            indent_limit: 0,
                            warranty_coverage: '',
                            variant_status: 'complete',
                            is_contract: 1,
                            is_decimal: 1,
                            down_payment_type: 0,
                            down_payment_value: 0
                        }
                    ]
                },
                reject_reasons: {}
            }
        };
        t.deepEqual(result, expect);
    } catch (err) {
        console.log(err);
    }
});

test.serial('Premoderation data is not found: Should be return BizzyError.NotFound', function* (t) {
    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves(null);
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves({
        id: 2,
        name: 'Apple iPhone 7',
        category_id: 646,
        brand_id: 429,
        uom_id: 1,
        stocking_uom_id: 3,
        quantity_stocking_uom: 122,
        manufacturing_number: 'DKR0010001',
        manufacturing_number_type: null,
        package_weight: '1000',
        package_length: '200',
        package_height: '500',
        package_width: '150',
        package_content: '1 kaleng bonus kuas',
        barcode: 'DK001',
        description: '<p><span style="background-color: rgb(255, 255, 255); color: rgb(96, 96, 96);">Thinner cap Dakar</span></p><p><span style="background-color: rgb(255, 255, 255); color: rgb(96, 96, 96);">Kemasan kaleng 1 Liter (NETTO =0,9 LITER)</span></p><p><span style="background-color: rgb(255, 255, 255); color: rgb(96, 96, 96);">Pengencer cat minyak dan cat duco</span></p>',
        primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        created_at: '2017-12-19T14:59:19.000Z',
        updated_at: '2018-01-17T06:05:39.000Z'
    });

    t.context.sandbox.stub(UomRepository, 'findById').resolves({
        id: 1,
        name: 'Unit',
        created_at: '2017-12-05T16:59:10.000Z',
        updated_at: '2017-12-05T16:59:10.000Z'
    });
    t.context.sandbox.stub(StockingUomRepository, 'findById').resolves({
        id: 3,
        name: 'Dozen',
        created_at: '2017-12-05T16:55:00.000Z',
        updated_at: '2017-12-05T16:55:00.000Z'
    });
    t.context.sandbox.stub(BrandRepository, 'findById').resolves({
        id: 429,
        name: 'dunlop',
        image_url: null,
        created_at: '2017-11-28T14:54:10.000Z',
        updated_at: '2017-11-28T14:54:10.000Z'
    });
    t.context.sandbox.stub(CategoryRepository, 'getCategoryBreakdown').resolves([{
        category0_id: 3,
        category0_name: 'Maintenance, Repair, Overhaul / Operation (MRO)',
        category0_unspsc: 15000000,
        category1_id: 43,
        category1_name: 'Paints & primers & finishes',
        category1_unspsc: 31210000,
        category2_id: 199,
        category2_name: 'Miscellaneous finishes',
        category2_unspsc: 31211700,
        category3_id: 646,
        category3_name: 'Sealers',
        category3_unspsc: 31211704
    }]);
    t.context.sandbox.stub(PremoderationLogRepository, 'findById').resolves([{
        _id: '5a533403421e700001669533',
        premoderation_id: '1515402092356',
        product_name: 'Tinner',
        reject_reasons: {
            product_data: '',
            sku_list: '',
            product_specification: '',
            description: '',
            product_details: '',
            package_dimension: '',
            warranty: '',
            totally_reject: 'Barang Ilegal'
        },
        last_status: 'revision_complete',
        current_status: 'rejected',
        created_by: 73,
        created_at: '2018-01-08T09:04:03.541Z',
        updated_at: '2018-01-08T09:04:03.541Z'
    }]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3',
                pid: '1515402092356'
            },
            query: {
                include: 'reject_reasons'
            }
        };

        yield Method.getPremoderationById(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, err.message);
    }
});

test.serial('Product group data is not found: Should be return BizzyError.NotFound', function* (t) {
    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves({
        _id: '5a53336c4acfd20001a341b7',
        id: '1515402092356',
        type: 'existing',
        payload: {
            name: 'Tinner',
            category_id: 646,
            category: {
                c0: 3,
                c1: 43,
                c2: 199,
                c3: 646
            },
            brand_id: 429,
            brand_name: 'dunlop',
            brand_status: 'clear',
            brand_image: 'http://google.com',
            uom_id: 1,
            stocking_uom_id: 3,
            quantity_stocking_uom: 122,
            manufacturing_number: 'DKR0010001',
            package_weight: '1000',
            package_length: '200',
            package_height: '500',
            package_width: '150',
            package_content: '1 kaleng bonus kuas',
            barcode: 'DK001',
            description: '<p><span style="background-color: rgb(255, 255, 255); color: rgb(96, 96, 96);">Thinner cap Dakar</span></p><p><span style="background-color: rgb(255, 255, 255); color: rgb(96, 96, 96);">Kemasan kaleng 1 Liter (NETTO =0,9 LITER)</span></p><p><span style="background-color: rgb(255, 255, 255); color: rgb(96, 96, 96);">Pengencer cat minyak dan cat duco</span></p>',
            variant_count: 0,
            variant_matrix: [],
            specification_status: 'clear',
            specifications: [],
            products: [
                {
                    index: '80sv3',
                    variants: [],
                    variant_value: 'NO_VARIANT',
                    sku_vendor: '',
                    tier_min_qty_1: 20,
                    tier_min_qty_2: 30,
                    tier_min_qty_3: 50,
                    tier_cogs_price_1: 25000,
                    tier_cogs_price_2: 24500,
                    tier_cogs_price_3: 24250,
                    stock: 100,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1515401933.jpg',
                    additional_image: [
                        'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1515401997.png'
                    ],
                    reference_link: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    warranty_option: 'no_warranty',
                    warranty_period: '',
                    warranty_limit: '',
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: 0,
                    warranty_coverage: '',
                    variant_status: 'complete'
                }
            ]
        },
        premoderation_status: 'rejected',
        vendor_id: 3,
        created_by: 3,
        created_at: '2018-01-08T09:01:32.356Z',
        updated_at: '2018-01-08T09:01:32.356Z'
    });
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves(null);

    t.context.sandbox.stub(UomRepository, 'findById').resolves({
        id: 1,
        name: 'Unit',
        created_at: '2017-12-05T16:59:10.000Z',
        updated_at: '2017-12-05T16:59:10.000Z'
    });
    t.context.sandbox.stub(StockingUomRepository, 'findById').resolves({
        id: 3,
        name: 'Dozen',
        created_at: '2017-12-05T16:55:00.000Z',
        updated_at: '2017-12-05T16:55:00.000Z'
    });
    t.context.sandbox.stub(BrandRepository, 'findById').resolves({
        id: 429,
        name: 'dunlop',
        image_url: null,
        created_at: '2017-11-28T14:54:10.000Z',
        updated_at: '2017-11-28T14:54:10.000Z'
    });
    t.context.sandbox.stub(CategoryRepository, 'getCategoryBreakdown').resolves([{
        category0_id: 3,
        category0_name: 'Maintenance, Repair, Overhaul / Operation (MRO)',
        category0_unspsc: 15000000,
        category1_id: 43,
        category1_name: 'Paints & primers & finishes',
        category1_unspsc: 31210000,
        category2_id: 199,
        category2_name: 'Miscellaneous finishes',
        category2_unspsc: 31211700,
        category3_id: 646,
        category3_name: 'Sealers',
        category3_unspsc: 31211704
    }]);
    t.context.sandbox.stub(PremoderationLogRepository, 'findById').resolves([{
        _id: '5a533403421e700001669533',
        premoderation_id: '1515402092356',
        product_name: 'Tinner',
        reject_reasons: {
            product_data: '',
            sku_list: '',
            product_specification: '',
            description: '',
            product_details: '',
            package_dimension: '',
            warranty: '',
            totally_reject: 'Barang Ilegal'
        },
        last_status: 'revision_complete',
        current_status: 'rejected',
        created_by: 73,
        created_at: '2018-01-08T09:04:03.541Z',
        updated_at: '2018-01-08T09:04:03.541Z'
    }]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3',
                pid: '1515402092356'
            },
            query: {
                include: 'reject_reasons'
            }
        };

        yield Method.getPremoderationById(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, err.message);
    }
});

test.serial('Invalid Context: Should be return Forbidden', function* (t) {
    try {
        const context = { user: '' };
        const data = {
            path: {
                id: '3',
                pid: '1515402092356'
            },
            query: {
                include: 'reject_reasons'
            }
        };

        yield Method.getPremoderationById(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, err.message);
    }
});

test.serial('Invalid Params: Should Throw BizzyError BadRequest', function* (t) {
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3',
                pid: ''
            },
            query: {
                include: 'reject_reasons'
            }
        };

        yield Method.getPremoderationById(data, context);
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
