'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { DBContext, BizzyError } = require('bizzy-common');

const PremoderationRepository = require('../../../../src/repositories/premoderation');
const PremoderationLogRepository = require('../../../../src/repositories/premoderation_log');

const Methods = require('../../../../src/methods/premoderations/list');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

test.serial('Should be return Premoderation List Descending', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(PremoderationRepository, 'findAll').resolves([{
        _id: '5a3ea0676c0c26cfd4b1ffc4',
        id: '1514053735269',
        type: 'new',
        product_group_id: 1,
        payload: {
            name: 'Tst',
            category_id: 383,
            category: {
                c0: 11,
                c1: 69,
                c2: 252,
                c3: 383
            },
            brand_id: 0,
            brand_name: 'Testing Brand Name',
            brand_status: 'new',
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
            products: [{
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
                additional_images: [
                    'http://localhost/testing/testing_image.jpg',
                    'http://localhost/testing/testing_image.jpg'
                ],
                warehouse_id: 1,
                location_label: 'Jakarta',
                reference_links: [
                    'google.com',
                    'amazon.com'
                ],
                warranty_option: 'official_warranty',
                warranty_period: 'month',
                warranty_limit: 1,
                is_indent: 1,
                indent_period: 'week',
                indent_limit: 2
            }],
            specifications: [
                {
                    attribute_id: 3,
                    attribute_code: 'phone_os',
                    attribute_code_label: 'Sistem Operasi',
                    attribute_type: 'dropdown',
                    attribute_value_id: '',
                    attribute_value_label: 'Chrome',
                    attribute_status: 'new'
                },
                {
                    attribute_id: 4,
                    attribute_code: 'phone_display',
                    attribute_code_label: 'Layar',
                    attribute_type: 'textinput',
                    attribute_textinput: '',
                    attribute_status: 'clear'
                }
            ]
        },
        premoderation_status: 'need_revision',
        created_by: 11,
        vendor_id: 16,
        assign: {
            id: 73,
            name: 'Fathkurozaq BS',
            email: 'fatkhurozaq.budi@bizzy.co.id',
            type: 'employee'
        },
        created_at: '2017-12-23T18:28:55.269Z',
        updated_at: '2017-12-23T18:28:55.269Z'
    }]);

    t.context.sandbox.stub(PremoderationRepository, 'count').resolves(1);

    t.context.sandbox.stub(PremoderationRepository, 'countAllPremoderationStatus').resolves([
        {
            _id: 'revision_inprogress',
            count: 1
        },
        {
            _id: 'revision_complete',
            count: 1
        },
        {
            _id: 'need_revision',
            count: 1
        },
        {
            _id: 'rejected',
            count: 1
        }
    ]);

    t.context.sandbox.stub(PremoderationLogRepository, 'count').resolves(1);

    try {
        const context = require('../../../mocks/context.json');

        const data = {
            query: {
                search: 'GP-3',
                status: 'need_revision',
                c0: '11',
                c1: '69',
                c2: '252',
                c3: '383',
                sort: 'created_at_desc',
                vendor_id: '16',
                assign_to: '',
                page: 1,
                limit: 1
            }
        };

        const result = yield Methods.getPremoderation(data, context);
        const expected = {
            data: [{
                id: '1514053735269',
                name: 'Tst',
                product_group_id: 1,
                curations: [
                    '50',
                    'Chrome',
                    'Testing Brand Name'
                ],
                vendor_id: 16,
                assign_to: 73,
                status: 'need_revision',
                total_history: 1,
                created_at: '2017-12-23T18:28:55.269Z',
                updated_at: '2017-12-23T18:28:55.269Z'
            }],
            meta: {
                page: 1,
                limit: 1,
                total_data: 1,
                total_page: 1,
                total_need_revision: 1,
                total_revision_complete: 1,
                total_rejected: 1,
                total_revision_inprogress: 1
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});


test.serial('Should be return Premoderation List Descending B', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(PremoderationRepository, 'findAll').resolves([
        {
            _id: '5a3ea0676c0c26cfd4b1ffc4',
            id: '1514053735269',
            type: 'new',
            product_group_id: null,
            payload: {
                name: 'Tst',
                category_id: 383,
                category: {
                    c0: 11,
                    c1: 69,
                    c2: 252,
                    c3: 383
                },
                brand_id: 0,
                brand_name: 'Testing Brand Name',
                brand_status: 'new',
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
                products: [{
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
                    additional_images: [
                        'http://localhost/testing/testing_image.jpg',
                        'http://localhost/testing/testing_image.jpg'
                    ],
                    warehouse_id: 1,
                    location_label: 'Jakarta',
                    reference_links: [
                        'google.com',
                        'amazon.com'
                    ],
                    warranty_option: 'official_warranty',
                    warranty_period: 'month',
                    warranty_limit: 1,
                    is_indent: 1,
                    indent_period: 'week',
                    indent_limit: 2
                }],
                specifications: [
                    {
                        attribute_id: 3,
                        attribute_code: 'phone_os',
                        attribute_code_label: 'Sistem Operasi',
                        attribute_type: 'dropdown',
                        attribute_value_id: '',
                        attribute_value_label: 'Chrome',
                        attribute_status: 'new'
                    },
                    {
                        attribute_id: 4,
                        attribute_code: 'phone_display',
                        attribute_code_label: 'Layar',
                        attribute_type: 'textinput',
                        attribute_textinput: '',
                        attribute_status: 'clear'
                    }
                ]
            },
            premoderation_status: 'need_revision',
            created_by: 11,
            vendor_id: 16,
            assign_to: null,
            created_at: '2017-12-23T18:28:55.269Z',
            updated_at: '2017-12-23T18:28:55.269Z'
        }
    ]);

    t.context.sandbox.stub(PremoderationRepository, 'count').resolves(1);

    t.context.sandbox.stub(PremoderationRepository, 'countAllPremoderationStatus').resolves(false);

    t.context.sandbox.stub(PremoderationLogRepository, 'count').resolves(1);

    try {
        const context = require('../../../mocks/context.json');

        const data = {
            query: {
                search: '11',
                status: 'need_revision',
                c0: '11',
                c1: '69',
                c2: '252',
                c3: '383',
                sort: 'created_at_desc',
                vendor_id: '16',
                assign_to: '1',
                page: 1,
                limit: 1
            }
        };

        const result = yield Methods.getPremoderation(data, context);
        const expected = {
            data: [{
                id: '1514053735269',
                name: 'Tst',
                product_group_id: null,
                curations: [
                    '50',
                    'Chrome',
                    'Testing Brand Name'
                ],
                vendor_id: 16,
                assign_to: null,
                status: 'need_revision',
                total_history: 1,
                created_at: '2017-12-23T18:28:55.269Z',
                updated_at: '2017-12-23T18:28:55.269Z'
            }],
            meta: {
                page: 1,
                limit: 1,
                total_data: 1,
                total_page: 1,
                total_need_revision: 0,
                total_revision_complete: 0,
                total_rejected: 0,
                total_revision_inprogress: 0
            }
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
                search: 124
            }
        };
        yield Methods.getPremoderation(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'The Error Type is Incorrect');
    }
});

test.serial('Should be return Premoderation List Ascending', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(PremoderationRepository, 'findAll').resolves([{
        _id: '5a3ea0676c0c26cfd4b1ffc4',
        id: '1514053735269',
        type: 'new',
        product_group_id: null,
        payload: {
            name: 'Tst',
            category_id: 383,
            category: {
                c0: 11,
                c1: 69,
                c2: 252,
                c3: 383
            },
            brand_id: 0,
            brand_name: 'Testing Brand Name',
            brand_status: 'new',
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
            products: [{
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
                additional_images: [
                    'http://localhost/testing/testing_image.jpg',
                    'http://localhost/testing/testing_image.jpg'
                ],
                warehouse_id: 1,
                location_label: 'Jakarta',
                reference_links: [
                    'google.com',
                    'amazon.com'
                ],
                warranty_option: 'official_warranty',
                warranty_period: 'month',
                warranty_limit: 1,
                is_indent: 1,
                indent_period: 'week',
                indent_limit: 2
            }],
            specifications: [
                {
                    attribute_id: 3,
                    attribute_code: 'phone_os',
                    attribute_code_label: 'Sistem Operasi',
                    attribute_type: 'dropdown',
                    attribute_value_id: '',
                    attribute_value_label: 'Chrome',
                    attribute_status: 'new'
                },
                {
                    attribute_id: 4,
                    attribute_code: 'phone_display',
                    attribute_code_label: 'Layar',
                    attribute_type: 'textinput',
                    attribute_textinput: '',
                    attribute_status: 'clear'
                }
            ]
        },
        premoderation_status: 'need_revision',
        created_by: 11,
        vendor_id: 16,
        assign_to: null,
        created_at: '2017-12-23T18:28:55.269Z',
        updated_at: '2017-12-23T18:28:55.269Z'
    }]);

    t.context.sandbox.stub(PremoderationRepository, 'count').resolves(1);

    t.context.sandbox.stub(PremoderationRepository, 'countAllPremoderationStatus').resolves(false);

    t.context.sandbox.stub(PremoderationLogRepository, 'count').resolves(1);

    try {
        const context = require('../../../mocks/context.json');

        const data = {
            query: {
                search: 'Tst',
                status: 'need_revision',
                c0: '11',
                c1: '69',
                c2: '252',
                c3: '383',
                sort: 'created_at_asc',
                vendor_id: '1',
                assign_to: '1',
                page: 1,
                limit: 1
            }
        };

        const result = yield Methods.getPremoderation(data, context);
        const expected = {
            data: [{
                id: '1514053735269',
                name: 'Tst',
                product_group_id: null,
                curations: [
                    '50',
                    'Chrome',
                    'Testing Brand Name'
                ],
                vendor_id: 16,
                assign_to: null,
                status: 'need_revision',
                total_history: 1,
                created_at: '2017-12-23T18:28:55.269Z',
                updated_at: '2017-12-23T18:28:55.269Z'
            }],
            meta: {
                page: 1,
                limit: 1,
                total_data: 1,
                total_page: 1,
                total_need_revision: 0,
                total_revision_complete: 0,
                total_rejected: 0,
                total_revision_inprogress: 0
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return Premoderation List Variant with Conditions ', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(PremoderationRepository, 'findAll').resolves([
        {
            _id: '5a3ea0676c0c26cfd4b1ffc4',
            id: '1514053735269',
            type: 'new',
            payload: {
                name: 'Tst',
                category_id: 383,
                category: {
                    c0: '',
                    c1: '',
                    c2: '',
                    c3: ''
                },
                brand_id: 81,
                brand_name: 'Testing Brand Name',
                brand_status: 'clear',
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
                products: [{
                    variants: [{
                        attribute_id: 1,
                        attribue_code: 'tv_size',
                        attribute_value_id: 1,
                        attribute_value_name: '50\''
                    },
                    {
                        attribute_id: 1,
                        attribue_code: 'tv_color',
                        attribute_value_id: 1,
                        attribute_value_name: 'Black'
                    },
                    {
                        attribute_id: 1,
                        attribue_code: 'tv_size',
                        attribute_value_id: 1,
                        attribute_value_name: '40\''
                    }
                    ],
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
                    additional_images: [
                        'http://localhost/testing/testing_image.jpg',
                        'http://localhost/testing/testing_image.jpg'
                    ],
                    warehouse_id: 1,
                    location_label: 'Jakarta',
                    reference_links: [
                        'google.com',
                        'amazon.com'
                    ],
                    warranty_option: 'official_warranty',
                    warranty_period: 'month',
                    warranty_limit: 1,
                    is_indent: 1,
                    indent_period: 'week',
                    indent_limit: 2
                }],
                specifications: [
                    {
                        attribute_id: 3,
                        attribute_code: 'phone_os',
                        attribute_code_label: 'Sistem Operasi',
                        attribute_type: 'dropdown',
                        attribute_value_id: '',
                        attribute_value_label: 'Chrome',
                        attribute_status: 'new'
                    },
                    {
                        attribute_id: 4,
                        attribute_code: 'phone_display',
                        attribute_code_label: 'Layar',
                        attribute_type: 'textinput',
                        attribute_textinput: 'Layar sentuh maksimal',
                        attribute_status: 'new'
                    }
                ]
            },
            premoderation_status: 'need_revision',
            created_by: 11,
            vendor_id: null,
            assign_to: null,
            created_at: '2017-12-23T18:28:55.269Z',
            updated_at: '2017-12-23T18:28:55.269Z'
        }
    ]);

    t.context.sandbox.stub(PremoderationRepository, 'count').resolves(1);

    t.context.sandbox.stub(PremoderationRepository, 'countAllPremoderationStatus').resolves(false);

    t.context.sandbox.stub(PremoderationLogRepository, 'count').resolves(1);

    try {
        const context = require('../../../mocks/context.json');

        const data = {
            query: {
                search: '',
                status: '',
                c0: '',
                c1: '',
                c2: '',
                c3: '',
                sort: 'created_at_asc',
                vendor_id: '',
                assign_to: '',
                page: 1,
                limit: 1
            }
        };

        const result = yield Methods.getPremoderation(data, context);
        const expected = {
            data: [{
                id: '1514053735269',
                name: 'Tst',
                product_group_id: null,
                curations: [
                    '50\' Black',
                    '40\'',
                    'Chrome',
                    'Layar sentuh maksimal'
                ],
                vendor_id: null,
                assign_to: null,
                status: 'need_revision',
                total_history: 1,
                created_at: '2017-12-23T18:28:55.269Z',
                updated_at: '2017-12-23T18:28:55.269Z'
            }],
            meta: {
                page: 1,
                limit: 1,
                total_data: 1,
                total_page: 1,
                total_need_revision: 0,
                total_revision_complete: 0,
                total_rejected: 0,
                total_revision_inprogress: 0
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('You are not authorized user: Should be return Forbidden', function* (t) {
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
            query: {
                search: '',
                status: '',
                c0: '',
                c1: '',
                c2: '',
                c3: '',
                sort: 'created_at_asc',
                vendor_id: '',
                assign_to: '',
                page: 1,
                limit: 1
            }
        };
        yield Methods.getPremoderation(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, 'You are not authorized user');
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
