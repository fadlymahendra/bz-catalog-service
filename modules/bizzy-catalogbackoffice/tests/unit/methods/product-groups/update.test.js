'use strict';

const Promise = require('bluebird');
const { DBContext, BizzyError, BizzyService } = require('bizzy-common');
const test = require('ava');
const sinon = require('sinon');
const Repo = require('../../../../src/repositories/product_group');
const RepoCategory = require('../../../../src/repositories/category');
const RepoVariant = require('../../../../src/repositories/product_variant');
const AttributeSetRepository = require('../../../../src/repositories/attribute_set');
const ProductLogRepository = require('../../../../src/repositories/product_log');
const ProductGroupAttributeRepository = require('../../../../src/repositories/product_group_attribute');
const WebhookRepository = require('../../../../src/repositories/webhook');
const Method = require('../../../../src/methods/product-groups/update');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
const resfindMultipleVariant = [
    {
        sku: 1
    }
];
test.serial('Should be return One Data Updated', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(Repo, 'findByIdWithDetail').resolves({
        id: 17,
        name: 'Apple Iphone 8',
        category_id: 561,
        brand_id: 81,
        uom_id: 2,
        stocking_uom_id: 2,
        quantity_stocking_uom: 2,
        manufacturing_number: 'AAAAA',
        manufacturing_number_type: '',
        package_weight: 100,
        package_length: '100.00',
        package_width: '100.00',
        package_height: '100.00',
        package_content: 'lorem ipsum',
        barcode: '',
        description: 'lorem ipsum',
        primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        created_at: '2017-12-28T14:14:37.000Z',
        updated_at: '2018-01-05T17:12:38.000Z',
        Brand: {
            id: 81,
            name: 'Apple',
            image_url: null,
            created_at: '2017-11-28T14:54:10.000Z',
            updated_at: '2017-11-28T14:54:10.000Z'
        },
        Uom: {
            id: 2,
            name: 'Dozen',
            created_at: '2017-12-05T16:59:10.000Z',
            updated_at: '2017-12-05T16:59:10.000Z'
        },
        StockingUom: {
            id: 2,
            name: 'Carton',
            created_at: '2017-12-05T16:55:00.000Z',
            updated_at: '2017-12-05T16:55:00.000Z'
        },
        ProductGroupAttributes: [
            {
                id: 25,
                product_group_id: 17,
                attribute_code_id: 1,
                attribute_value_id: null,
                text_input: '',
                is_variant: 1,
                created_at: '2017-12-28T14:14:38.000Z',
                updated_at: '2018-01-05T17:12:38.000Z',
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
                id: 26,
                product_group_id: 17,
                attribute_code_id: 3,
                attribute_value_id: 5,
                text_input: 'hihi',
                is_variant: 0,
                created_at: '2017-12-28T14:14:38.000Z',
                updated_at: '2018-01-05T17:12:38.000Z',
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
                        },
                        {
                            id: 11,
                            attribute_code_id: 3,
                            value: 'Windows Phone',
                            image_url: null,
                            created_at: '2018-01-02T11:05:13.000Z',
                            updated_at: '2018-01-02T11:05:13.000Z'
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
                id: 27,
                product_group_id: 17,
                attribute_code_id: 4,
                attribute_value_id: null,
                text_input: 'Dapat box saja',
                is_variant: 0,
                created_at: '2017-12-28T14:14:38.000Z',
                updated_at: '2018-01-05T17:12:38.000Z',
                AttributeCode: {
                    id: 4,
                    code: 'phone_package',
                    label: 'Kelengkapan Paket',
                    type: 'textinput',
                    created_at: '2017-12-19T10:37:34.000Z',
                    updated_at: '2017-12-19T10:37:37.000Z',
                    AttributeValues: []
                },
                AttributeValue: null
            }
        ]
    });
    t.context.sandbox.stub(Repo, 'findOne').resolves(null);
    t.context.sandbox.stub(ProductLogRepository, 'insertOne').resolves({
        ok: 1,
        n: 1
    });
    t.context.sandbox.stub(AttributeSetRepository, 'getVariantByCategoryId').resolves([{
        id: 1,
        category_id: 561,
        attribute_code_id: 1,
        is_variant: 1,
        created_at: '2017-12-19T07:52:47.000Z',
        updated_at: '2017-12-19T07:52:47.000Z',
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
        }
    },
    {
        id: 2,
        category_id: 561,
        attribute_code_id: 2,
        is_variant: 1,
        created_at: '2017-12-19T07:55:34.000Z',
        updated_at: '2017-12-19T07:55:34.000Z',
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
        }
    }]);
    t.context.sandbox.stub(Repo, 'update').resolves([1]);
    t.context.sandbox.stub(ProductGroupAttributeRepository, 'update').resolves([1]);
    t.context.sandbox.stub(RepoCategory, 'getCategoryBreakdown').resolves([{
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
    }]);
    t.context.sandbox.stub(RepoVariant, 'findMultipleVariant').resolves(resfindMultipleVariant);
    t.context.sandbox.stub(WebhookRepository, 'trigger').resolves();
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '17'
            },
            body: {
                name: 'Apple Iphone 8',
                category_id: '561',
                brand_id: '81',
                uom_id: '2',
                stocking_uom_id: '2',
                quantity_stocking_uom: '2',
                manufacturing_number: 'AAAAA',
                package_weight: '100',
                package_length: '100.00',
                package_width: '100.00',
                package_height: '100.00',
                package_content: 'lorem ipsum',
                barcode: '',
                description: 'lorem ipsum',
                primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
                visibility: '1',
                specifications: [
                    {
                        id: '26',
                        type: 'dropdown',
                        attribute_code_id: '3',
                        attribute_value_id: '5',
                        text_input: ''
                    },
                    {
                        id: '27',
                        type: 'textinput',
                        attribute_code_id: '4',
                        attribute_value_id: '',
                        text_input: 'Dapat box saja'
                    }
                ]
            }
        };
        const result = yield Method.putProductGroup(data, context);
        const expect = {
            data: {
                id: 17,
                name: 'Apple Iphone 8',
                brand: 'Apple',
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
                    package_weight: 100,
                    package_length: '100.00',
                    package_width: '100.00',
                    package_height: '100.00'
                },
                detail: {
                    manufacturing_number: 'AAAAA',
                    barcode: '',
                    uom: 'Dozen',
                    stocking_uom: 'Carton',
                    quantity_stocking_uom: 2
                },
                specification: [
                    {
                        id: 3,
                        code: 'phone_os',
                        label: 'Sistem Operasi',
                        type: 'dropdown',
                        values: [
                            {
                                id: 5,
                                value: 'iOS'
                            },
                            {
                                id: 6,
                                value: 'Android'
                            },
                            {
                                id: 11,
                                value: 'Windows Phone'
                            }
                        ]
                    },
                    {
                        id: 4,
                        code: 'phone_package',
                        label: 'Kelengkapan Paket',
                        type: 'textinput',
                        values: []
                    }
                ],
                description: 'lorem ipsum',
                visibility: 1
            }
        };
        t.deepEqual(result, expect);
    } catch (err) {
        console.log(err);
    }
});

test.serial('Attribute value can not be empty! Should be return BizzyError.BadRequest', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(Repo, 'findByIdWithDetail').resolves({
        id: 17,
        name: 'Apple Iphone 8',
        category_id: 561,
        brand_id: 81,
        uom_id: 2,
        stocking_uom_id: 2,
        quantity_stocking_uom: 2,
        manufacturing_number: 'AAAAA',
        manufacturing_number_type: '',
        package_weight: 100,
        package_length: '100.00',
        package_width: '100.00',
        package_height: '100.00',
        package_content: 'lorem ipsum',
        barcode: '',
        description: 'lorem ipsum',
        primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        created_at: '2017-12-28T14:14:37.000Z',
        updated_at: '2018-01-05T17:12:38.000Z',
        Brand: {
            id: 81,
            name: 'Apple',
            image_url: null,
            created_at: '2017-11-28T14:54:10.000Z',
            updated_at: '2017-11-28T14:54:10.000Z'
        },
        Uom: {
            id: 2,
            name: 'Dozen',
            created_at: '2017-12-05T16:59:10.000Z',
            updated_at: '2017-12-05T16:59:10.000Z'
        },
        StockingUom: {
            id: 2,
            name: 'Carton',
            created_at: '2017-12-05T16:55:00.000Z',
            updated_at: '2017-12-05T16:55:00.000Z'
        },
        ProductGroupAttributes: [
            {
                id: 25,
                product_group_id: 17,
                attribute_code_id: 1,
                attribute_value_id: null,
                text_input: '',
                is_variant: 1,
                created_at: '2017-12-28T14:14:38.000Z',
                updated_at: '2018-01-05T17:12:38.000Z',
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
                id: 26,
                product_group_id: 17,
                attribute_code_id: 3,
                attribute_value_id: 5,
                text_input: 'hihi',
                is_variant: 0,
                created_at: '2017-12-28T14:14:38.000Z',
                updated_at: '2018-01-05T17:12:38.000Z',
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
                        },
                        {
                            id: 11,
                            attribute_code_id: 3,
                            value: 'Windows Phone',
                            image_url: null,
                            created_at: '2018-01-02T11:05:13.000Z',
                            updated_at: '2018-01-02T11:05:13.000Z'
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
                id: 27,
                product_group_id: 17,
                attribute_code_id: 4,
                attribute_value_id: null,
                text_input: 'Dapat box saja',
                is_variant: 0,
                created_at: '2017-12-28T14:14:38.000Z',
                updated_at: '2018-01-05T17:12:38.000Z',
                AttributeCode: {
                    id: 4,
                    code: 'phone_package',
                    label: 'Kelengkapan Paket',
                    type: 'textinput',
                    created_at: '2017-12-19T10:37:34.000Z',
                    updated_at: '2017-12-19T10:37:37.000Z',
                    AttributeValues: []
                },
                AttributeValue: null
            }
        ]
    });
    t.context.sandbox.stub(Repo, 'findOne').resolves(null);
    t.context.sandbox.stub(ProductLogRepository, 'insertOne').resolves({
        ok: 1,
        n: 1
    });
    t.context.sandbox.stub(AttributeSetRepository, 'getVariantByCategoryId').resolves([{
        id: 1,
        category_id: 561,
        attribute_code_id: 1,
        is_variant: 1,
        created_at: '2017-12-19T07:52:47.000Z',
        updated_at: '2017-12-19T07:52:47.000Z',
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
        }
    },
    {
        id: 2,
        category_id: 561,
        attribute_code_id: 2,
        is_variant: 1,
        created_at: '2017-12-19T07:55:34.000Z',
        updated_at: '2017-12-19T07:55:34.000Z',
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
        }
    }]);
    t.context.sandbox.stub(Repo, 'update').resolves([1]);
    t.context.sandbox.stub(ProductGroupAttributeRepository, 'update').resolves([1]);
    t.context.sandbox.stub(RepoCategory, 'getCategoryBreakdown').resolves([{
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
    }]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '17'
            },
            body: {
                name: 'Apple Iphone 8',
                category_id: '561',
                brand_id: '81',
                uom_id: '2',
                stocking_uom_id: '2',
                quantity_stocking_uom: '2',
                manufacturing_number: 'AAAAA',
                package_weight: '100',
                package_length: '100.00',
                package_width: '100.00',
                package_height: '100.00',
                package_content: 'lorem ipsum',
                barcode: '',
                description: 'lorem ipsum',
                primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
                visibility: '1',
                specifications: [
                    {
                        id: '26',
                        type: 'dropdown',
                        attribute_code_id: '3',
                        attribute_value_id: '',
                        text_input: ''
                    },
                    {
                        id: '27',
                        type: 'textinput',
                        attribute_code_id: '4',
                        attribute_value_id: '',
                        text_input: 'Dapat box saja'
                    }
                ]
            }
        };
        yield Method.putProductGroup(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Text input can not be empty! Should be return BizzyError.BadRequest', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(Repo, 'findByIdWithDetail').resolves({
        id: 17,
        name: 'Apple Iphone 8',
        category_id: 561,
        brand_id: 81,
        uom_id: 2,
        stocking_uom_id: 2,
        quantity_stocking_uom: 2,
        manufacturing_number: 'AAAAA',
        manufacturing_number_type: '',
        package_weight: 100,
        package_length: '100.00',
        package_width: '100.00',
        package_height: '100.00',
        package_content: 'lorem ipsum',
        barcode: '',
        description: 'lorem ipsum',
        primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        created_at: '2017-12-28T14:14:37.000Z',
        updated_at: '2018-01-05T17:12:38.000Z',
        Brand: {
            id: 81,
            name: 'Apple',
            image_url: null,
            created_at: '2017-11-28T14:54:10.000Z',
            updated_at: '2017-11-28T14:54:10.000Z'
        },
        Uom: {
            id: 2,
            name: 'Dozen',
            created_at: '2017-12-05T16:59:10.000Z',
            updated_at: '2017-12-05T16:59:10.000Z'
        },
        StockingUom: {
            id: 2,
            name: 'Carton',
            created_at: '2017-12-05T16:55:00.000Z',
            updated_at: '2017-12-05T16:55:00.000Z'
        },
        ProductGroupAttributes: [
            {
                id: 25,
                product_group_id: 17,
                attribute_code_id: 1,
                attribute_value_id: null,
                text_input: '',
                is_variant: 1,
                created_at: '2017-12-28T14:14:38.000Z',
                updated_at: '2018-01-05T17:12:38.000Z',
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
                id: 26,
                product_group_id: 17,
                attribute_code_id: 3,
                attribute_value_id: 5,
                text_input: 'hihi',
                is_variant: 0,
                created_at: '2017-12-28T14:14:38.000Z',
                updated_at: '2018-01-05T17:12:38.000Z',
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
                        },
                        {
                            id: 11,
                            attribute_code_id: 3,
                            value: 'Windows Phone',
                            image_url: null,
                            created_at: '2018-01-02T11:05:13.000Z',
                            updated_at: '2018-01-02T11:05:13.000Z'
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
                id: 27,
                product_group_id: 17,
                attribute_code_id: 4,
                attribute_value_id: null,
                text_input: 'Dapat box saja',
                is_variant: 0,
                created_at: '2017-12-28T14:14:38.000Z',
                updated_at: '2018-01-05T17:12:38.000Z',
                AttributeCode: {
                    id: 4,
                    code: 'phone_package',
                    label: 'Kelengkapan Paket',
                    type: 'textinput',
                    created_at: '2017-12-19T10:37:34.000Z',
                    updated_at: '2017-12-19T10:37:37.000Z',
                    AttributeValues: []
                },
                AttributeValue: null
            }
        ]
    });
    t.context.sandbox.stub(Repo, 'findOne').resolves(null);
    t.context.sandbox.stub(ProductLogRepository, 'insertOne').resolves({
        ok: 1,
        n: 1
    });
    t.context.sandbox.stub(AttributeSetRepository, 'getVariantByCategoryId').resolves([{
        id: 1,
        category_id: 561,
        attribute_code_id: 1,
        is_variant: 1,
        created_at: '2017-12-19T07:52:47.000Z',
        updated_at: '2017-12-19T07:52:47.000Z',
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
        }
    },
    {
        id: 2,
        category_id: 561,
        attribute_code_id: 2,
        is_variant: 1,
        created_at: '2017-12-19T07:55:34.000Z',
        updated_at: '2017-12-19T07:55:34.000Z',
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
        }
    }]);
    t.context.sandbox.stub(Repo, 'update').resolves([1]);
    t.context.sandbox.stub(ProductGroupAttributeRepository, 'update').resolves([1]);
    t.context.sandbox.stub(RepoCategory, 'getCategoryBreakdown').resolves([{
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
    }]);
    t.context.sandbox.stub(RepoVariant, 'findMultipleVariant').resolves(resfindMultipleVariant);
    t.context.sandbox.stub(WebhookRepository, 'trigger').resolves();
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '17'
            },
            body: {
                name: 'Apple Iphone 8',
                category_id: '561',
                brand_id: '81',
                uom_id: '2',
                stocking_uom_id: '2',
                quantity_stocking_uom: '2',
                manufacturing_number: 'AAAAA',
                package_weight: '100',
                package_length: '100.00',
                package_width: '100.00',
                package_height: '100.00',
                package_content: 'lorem ipsum',
                barcode: '',
                description: 'lorem ipsum',
                primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
                visibility: '1',
                specifications: [
                    {
                        id: '26',
                        type: 'dropdown',
                        attribute_code_id: '3',
                        attribute_value_id: '5',
                        text_input: ''
                    },
                    {
                        id: '27',
                        type: 'textinput',
                        attribute_code_id: '4',
                        attribute_value_id: '',
                        text_input: ''
                    }
                ]
            }
        };
        yield Method.putProductGroup(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});


test.serial('Should be return One Data Updated with empty quantity stocking uom', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(Repo, 'findByIdWithDetail').resolves({
        id: 17,
        name: 'Apple Iphone 8',
        category_id: 561,
        brand_id: 81,
        uom_id: 2,
        stocking_uom_id: 2,
        quantity_stocking_uom: null,
        manufacturing_number: 'AAAAA',
        manufacturing_number_type: '',
        package_weight: 100,
        package_length: '100.00',
        package_width: '100.00',
        package_height: '100.00',
        package_content: 'lorem ipsum',
        barcode: '',
        description: 'lorem ipsum',
        primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        created_at: '2017-12-28T14:14:37.000Z',
        updated_at: '2018-01-05T17:12:38.000Z',
        Brand: {
            id: 81,
            name: 'Apple',
            image_url: null,
            created_at: '2017-11-28T14:54:10.000Z',
            updated_at: '2017-11-28T14:54:10.000Z'
        },
        Uom: {
            id: 2,
            name: 'Dozen',
            created_at: '2017-12-05T16:59:10.000Z',
            updated_at: '2017-12-05T16:59:10.000Z'
        },
        StockingUom: {
            id: 2,
            name: 'Carton',
            created_at: '2017-12-05T16:55:00.000Z',
            updated_at: '2017-12-05T16:55:00.000Z'
        },
        ProductGroupAttributes: [
            {
                id: 25,
                product_group_id: 17,
                attribute_code_id: 1,
                attribute_value_id: null,
                text_input: '',
                is_variant: 1,
                created_at: '2017-12-28T14:14:38.000Z',
                updated_at: '2018-01-05T17:12:38.000Z',
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
                id: 26,
                product_group_id: 17,
                attribute_code_id: 3,
                attribute_value_id: 5,
                text_input: 'hihi',
                is_variant: 0,
                created_at: '2017-12-28T14:14:38.000Z',
                updated_at: '2018-01-05T17:12:38.000Z',
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
                        },
                        {
                            id: 11,
                            attribute_code_id: 3,
                            value: 'Windows Phone',
                            image_url: null,
                            created_at: '2018-01-02T11:05:13.000Z',
                            updated_at: '2018-01-02T11:05:13.000Z'
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
                id: 27,
                product_group_id: 17,
                attribute_code_id: 4,
                attribute_value_id: null,
                text_input: 'Dapat box saja',
                is_variant: 0,
                created_at: '2017-12-28T14:14:38.000Z',
                updated_at: '2018-01-05T17:12:38.000Z',
                AttributeCode: {
                    id: 4,
                    code: 'phone_package',
                    label: 'Kelengkapan Paket',
                    type: 'textinput',
                    created_at: '2017-12-19T10:37:34.000Z',
                    updated_at: '2017-12-19T10:37:37.000Z',
                    AttributeValues: []
                },
                AttributeValue: null
            }
        ]
    });
    t.context.sandbox.stub(Repo, 'findOne').resolves(null);
    t.context.sandbox.stub(ProductLogRepository, 'insertOne').resolves({
        ok: 1,
        n: 1
    });
    t.context.sandbox.stub(AttributeSetRepository, 'getVariantByCategoryId').resolves([{
        id: 1,
        category_id: 561,
        attribute_code_id: 1,
        is_variant: 1,
        created_at: '2017-12-19T07:52:47.000Z',
        updated_at: '2017-12-19T07:52:47.000Z',
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
        }
    },
    {
        id: 2,
        category_id: 561,
        attribute_code_id: 2,
        is_variant: 1,
        created_at: '2017-12-19T07:55:34.000Z',
        updated_at: '2017-12-19T07:55:34.000Z',
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
        }
    }]);
    t.context.sandbox.stub(Repo, 'update').resolves([1]);
    t.context.sandbox.stub(ProductGroupAttributeRepository, 'update').resolves([1]);
    t.context.sandbox.stub(RepoCategory, 'getCategoryBreakdown').resolves([{
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
    }]);
    t.context.sandbox.stub(RepoVariant, 'findMultipleVariant').resolves(resfindMultipleVariant);
    t.context.sandbox.stub(WebhookRepository, 'trigger').resolves();
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '17'
            },
            body: {
                name: 'Apple Iphone 8',
                category_id: '561',
                brand_id: '81',
                uom_id: '2',
                stocking_uom_id: '2',
                quantity_stocking_uom: '',
                manufacturing_number: '',
                package_weight: '100',
                package_length: '100.00',
                package_width: '100.00',
                package_height: '100.00',
                package_content: '',
                barcode: '1',
                description: 'lorem ipsum',
                primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
                visibility: '1',
                specifications: [
                    {
                        id: '26',
                        type: 'dropdown',
                        attribute_code_id: '3',
                        attribute_value_id: '5',
                        text_input: 'hihi'
                    },
                    {
                        id: '27',
                        type: 'textinput',
                        attribute_code_id: '4',
                        attribute_value_id: '',
                        text_input: 'Dapat box saja'
                    }
                ]
            }
        };
        const result = yield Method.putProductGroup(data, context);
        const expect = {
            data: {
                id: 17,
                name: 'Apple Iphone 8',
                brand: 'Apple',
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
                    package_weight: 100,
                    package_length: '100.00',
                    package_width: '100.00',
                    package_height: '100.00'
                },
                detail: {
                    manufacturing_number: 'AAAAA',
                    barcode: '',
                    uom: 'Dozen',
                    stocking_uom: 'Carton',
                    quantity_stocking_uom: null
                },
                specification: [
                    {
                        id: 3,
                        code: 'phone_os',
                        label: 'Sistem Operasi',
                        type: 'dropdown',
                        values: [
                            {
                                id: 5,
                                value: 'iOS'
                            },
                            {
                                id: 6,
                                value: 'Android'
                            },
                            {
                                id: 11,
                                value: 'Windows Phone'
                            }
                        ]
                    },
                    {
                        id: 4,
                        code: 'phone_package',
                        label: 'Kelengkapan Paket',
                        type: 'textinput',
                        values: []
                    }
                ],
                description: 'lorem ipsum',
                visibility: 1
            }
        };
        t.deepEqual(result, expect);
    } catch (err) {
        console.log(err);
    }
});

test.serial('Update product group failed!: Should be return BizzyError.BadRequest', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(Repo, 'findByIdWithDetail').resolves({
        id: 17,
        name: 'Apple Iphone 8',
        category_id: 561,
        brand_id: 81,
        uom_id: 2,
        stocking_uom_id: 2,
        quantity_stocking_uom: 2,
        manufacturing_number: 'AAAAA',
        manufacturing_number_type: '',
        package_weight: 100,
        package_length: '100.00',
        package_width: '100.00',
        package_height: '100.00',
        package_content: 'lorem ipsum',
        barcode: '',
        description: 'lorem ipsum',
        primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        created_at: '2017-12-28T14:14:37.000Z',
        updated_at: '2018-01-05T17:12:38.000Z',
        Brand: {
            id: 81,
            name: 'Apple',
            image_url: null,
            created_at: '2017-11-28T14:54:10.000Z',
            updated_at: '2017-11-28T14:54:10.000Z'
        },
        Uom: {
            id: 2,
            name: 'Dozen',
            created_at: '2017-12-05T16:59:10.000Z',
            updated_at: '2017-12-05T16:59:10.000Z'
        },
        StockingUom: {
            id: 2,
            name: 'Carton',
            created_at: '2017-12-05T16:55:00.000Z',
            updated_at: '2017-12-05T16:55:00.000Z'
        },
        ProductGroupAttributes: [
            {
                id: 25,
                product_group_id: 17,
                attribute_code_id: 1,
                attribute_value_id: null,
                text_input: '',
                is_variant: 1,
                created_at: '2017-12-28T14:14:38.000Z',
                updated_at: '2018-01-05T17:12:38.000Z',
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
                id: 26,
                product_group_id: 17,
                attribute_code_id: 3,
                attribute_value_id: 5,
                text_input: 'hihi',
                is_variant: 0,
                created_at: '2017-12-28T14:14:38.000Z',
                updated_at: '2018-01-05T17:12:38.000Z',
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
                        },
                        {
                            id: 11,
                            attribute_code_id: 3,
                            value: 'Windows Phone',
                            image_url: null,
                            created_at: '2018-01-02T11:05:13.000Z',
                            updated_at: '2018-01-02T11:05:13.000Z'
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
                id: 27,
                product_group_id: 17,
                attribute_code_id: 4,
                attribute_value_id: null,
                text_input: 'Dapat box saja',
                is_variant: 0,
                created_at: '2017-12-28T14:14:38.000Z',
                updated_at: '2018-01-05T17:12:38.000Z',
                AttributeCode: {
                    id: 4,
                    code: 'phone_package',
                    label: 'Kelengkapan Paket',
                    type: 'textinput',
                    created_at: '2017-12-19T10:37:34.000Z',
                    updated_at: '2017-12-19T10:37:37.000Z',
                    AttributeValues: []
                },
                AttributeValue: null
            }
        ]
    });
    t.context.sandbox.stub(Repo, 'findOne').resolves(null);
    t.context.sandbox.stub(AttributeSetRepository, 'getVariantByCategoryId').resolves([{
        id: 1,
        category_id: 561,
        attribute_code_id: 1,
        is_variant: 1,
        created_at: '2017-12-19T07:52:47.000Z',
        updated_at: '2017-12-19T07:52:47.000Z',
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
        }
    },
    {
        id: 2,
        category_id: 561,
        attribute_code_id: 2,
        is_variant: 1,
        created_at: '2017-12-19T07:55:34.000Z',
        updated_at: '2017-12-19T07:55:34.000Z',
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
        }
    }]);
    t.context.sandbox.stub(Repo, 'update').resolves(null);
    t.context.sandbox.stub(ProductGroupAttributeRepository, 'update').resolves([1]);
    t.context.sandbox.stub(RepoCategory, 'getCategoryBreakdown').resolves([{
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
    }]);
    t.context.sandbox.stub(RepoVariant, 'findMultipleVariant').resolves(resfindMultipleVariant);
    t.context.sandbox.stub(WebhookRepository, 'trigger').resolves();
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves();

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '17'
            },
            body: {
                name: 'Apple Iphone 8',
                category_id: '561',
                brand_id: '81',
                uom_id: '2',
                stocking_uom_id: '2',
                quantity_stocking_uom: '2',
                manufacturing_number: 'AAAAA',
                package_weight: '100',
                package_length: '100.00',
                package_width: '100.00',
                package_height: '100.00',
                package_content: 'lorem ipsum',
                barcode: '',
                description: 'lorem ipsum',
                primary_image: '',
                visibility: '1',
                specifications: [
                    {
                        id: '26',
                        type: 'dropdown',
                        attribute_code_id: '3',
                        attribute_value_id: '5',
                        text_input: 'hihi'
                    },
                    {
                        id: '27',
                        type: 'textinput',
                        attribute_code_id: '4',
                        attribute_value_id: '',
                        text_input: 'Dapat box saja'
                    }
                ]
            }
        };
        yield Method.putProductGroup(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Invalid Params Path Should Throw BizzyError BadRequest', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    const context = require('../../../mocks/context.json');
    const data = {
        path: {
            id: ''
        },
        body: {
            name: 'Apple Iphone 8',
            category_id: '561',
            brand_id: '81',
            uom_id: '2',
            stocking_uom_id: '2',
            quantity_stocking_uom: '2',
            manufacturing_number: 'AAAAA',
            package_weight: '100',
            package_length: '100.00',
            package_width: '100.00',
            package_height: '100.00',
            package_content: 'lorem ipsum',
            barcode: '',
            description: 'lorem ipsum',
            primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
            visibility: '1',
            specifications: [
                {
                    id: '26',
                    type: 'dropdown',
                    attribute_code_id: '3',
                    attribute_value_id: '5',
                    text_input: 'hihi'
                },
                {
                    id: '27',
                    type: 'textinput',
                    attribute_code_id: '4',
                    attribute_value_id: '',
                    text_input: 'Dapat box saja'
                }
            ]
        }
    };

    try {
        yield Method.putProductGroup(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Invalid Params Body Should Throw BizzyError BadRequest', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    const context = require('../../../mocks/context.json');
    const data = {
        path: {
            id: '17'
        },
        body: {
            name: '',
            category_id: '561',
            brand_id: '81',
            uom_id: '2',
            stocking_uom_id: '2',
            quantity_stocking_uom: '2',
            manufacturing_number: 'AAAAA',
            package_weight: '100',
            package_length: '100.00',
            package_width: '100.00',
            package_height: '100.00',
            package_content: 'lorem ipsum',
            barcode: '',
            description: 'lorem ipsum',
            primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
            visibility: '1',
            specifications: [
                {
                    id: '26',
                    type: 'dropdown',
                    attribute_code_id: '3',
                    attribute_value_id: '5',
                    text_input: 'hihi'
                },
                {
                    id: '27',
                    type: 'textinput',
                    attribute_code_id: '4',
                    attribute_value_id: '',
                    text_input: 'Dapat box saja'
                }
            ]
        }
    };

    try {
        yield Method.putProductGroup(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Product Not Found', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    const context = require('../../../mocks/context.json');
    const data = {
        path: {
            id: '1777'
        },
        body: {
            name: 'Apple Iphone 8',
            category_id: '561',
            brand_id: '81',
            uom_id: '2',
            stocking_uom_id: '2',
            quantity_stocking_uom: '2',
            manufacturing_number: 'AAAAA',
            package_weight: '100',
            package_length: '100.00',
            package_width: '100.00',
            package_height: '100.00',
            package_content: 'lorem ipsum',
            barcode: '',
            description: 'lorem ipsum',
            primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
            visibility: '1',
            specifications: [
                {
                    id: '26',
                    type: 'dropdown',
                    attribute_code_id: '3',
                    attribute_value_id: '5',
                    text_input: 'hihi'
                },
                {
                    id: '27',
                    type: 'textinput',
                    attribute_code_id: '4',
                    attribute_value_id: '',
                    text_input: 'Dapat box saja'
                }
            ]
        }
    };

    t.context.sandbox.stub(Repo, 'update').resolves({ id: 1, name: 'LG LED TV' });
    t.context.sandbox.stub(Repo, 'findOne').resolves(null);
    t.context.sandbox.stub(Repo, 'findByIdWithDetail').resolves(null);

    try {
        yield Method.putProductGroup(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'Product Group Not Found');
    }
});

test.serial('Product with same name already exist', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    const context = require('../../../mocks/context.json');
    const data = {
        path: {
            id: '1777'
        },
        body: {
            name: 'Apple Iphone 8',
            category_id: '561',
            brand_id: '81',
            uom_id: '2',
            stocking_uom_id: '2',
            quantity_stocking_uom: '2',
            manufacturing_number: 'AAAAA',
            package_weight: '100',
            package_length: '100.00',
            package_width: '100.00',
            package_height: '100.00',
            package_content: 'lorem ipsum',
            barcode: '',
            description: 'lorem ipsum',
            primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
            visibility: '1',
            specifications: [
                {
                    id: '26',
                    type: 'dropdown',
                    attribute_code_id: '3',
                    attribute_value_id: '5',
                    text_input: 'hihi'
                },
                {
                    id: '27',
                    type: 'textinput',
                    attribute_code_id: '4',
                    attribute_value_id: '',
                    text_input: 'Dapat box saja'
                }
            ]
        }
    };


    t.context.sandbox.stub(Repo, 'update').resolves({ id: 1, name: 'LG LED TV' });
    t.context.sandbox.stub(Repo, 'findOne').resolves({ id: 1, name: 'LG LED TV' });
    t.context.sandbox.stub(Repo, 'findByIdWithDetail').resolves({ id: 1, name: 'LG LED TV' });

    try {
        yield Method.putProductGroup(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'Another catalog with same name already exist!');
    }
});

test.serial('UnprocessableEntity getCategoryBreakdown', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    const context = require('../../../mocks/context.json');
    const data = {
        path: {
            id: '17'
        },
        body: {
            name: 'Apple Iphone 8',
            category_id: '561',
            brand_id: '81',
            uom_id: '2',
            stocking_uom_id: '2',
            quantity_stocking_uom: '2',
            manufacturing_number: 'AAAAA',
            package_weight: '100',
            package_length: '100.00',
            package_width: '100.00',
            package_height: '100.00',
            package_content: 'lorem ipsum',
            barcode: '',
            description: 'lorem ipsum',
            primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
            visibility: '1',
            specifications: [
                {
                    id: '26',
                    type: 'dropdown',
                    attribute_code_id: '3',
                    attribute_value_id: '5',
                    text_input: 'hihi'
                },
                {
                    id: '27',
                    type: 'textinput',
                    attribute_code_id: '4',
                    attribute_value_id: '',
                    text_input: 'Dapat box saja'
                }
            ]
        }
    };
    t.context.sandbox.stub(ProductGroupAttributeRepository, 'update').resolves([1]);
    t.context.sandbox.stub(ProductLogRepository, 'insertOne').resolves({
        ok: 1,
        n: 1
    });
    t.context.sandbox.stub(AttributeSetRepository, 'getVariantByCategoryId').resolves([{
        id: 1,
        category_id: 561,
        attribute_code_id: 1,
        is_variant: 1,
        created_at: '2017-12-19T07:52:47.000Z',
        updated_at: '2017-12-19T07:52:47.000Z',
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
        }
    }]);
    t.context.sandbox.stub(Repo, 'update').resolves([1]);
    t.context.sandbox.stub(Repo, 'findOne').resolves(null);
    t.context.sandbox.stub(Repo, 'findByIdWithDetail').resolves({
        id: 17,
        name: 'Apple Iphone 8',
        category_id: 561,
        brand_id: 81,
        uom_id: 2,
        stocking_uom_id: 2,
        quantity_stocking_uom: 2,
        manufacturing_number: 'AAAAA',
        manufacturing_number_type: '',
        package_weight: 100,
        package_length: '100.00',
        package_width: '100.00',
        package_height: '100.00',
        package_content: 'lorem ipsum',
        barcode: '',
        description: 'lorem ipsum',
        primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        created_at: '2017-12-28T14:14:37.000Z',
        updated_at: '2018-01-05T17:12:38.000Z',
        Brand: {
            id: 81,
            name: 'Apple',
            image_url: null,
            created_at: '2017-11-28T14:54:10.000Z',
            updated_at: '2017-11-28T14:54:10.000Z'
        },
        Uom: {
            id: 2,
            name: 'Dozen',
            created_at: '2017-12-05T16:59:10.000Z',
            updated_at: '2017-12-05T16:59:10.000Z'
        },
        StockingUom: {
            id: 2,
            name: 'Carton',
            created_at: '2017-12-05T16:55:00.000Z',
            updated_at: '2017-12-05T16:55:00.000Z'
        },
        ProductGroupAttributes: [
            {
                id: 25,
                product_group_id: 17,
                attribute_code_id: 1,
                attribute_value_id: null,
                text_input: '',
                is_variant: 1,
                created_at: '2017-12-28T14:14:38.000Z',
                updated_at: '2018-01-05T17:12:38.000Z',
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
                id: 26,
                product_group_id: 17,
                attribute_code_id: 3,
                attribute_value_id: 5,
                text_input: 'hihi',
                is_variant: 0,
                created_at: '2017-12-28T14:14:38.000Z',
                updated_at: '2018-01-05T17:12:38.000Z',
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
                        },
                        {
                            id: 11,
                            attribute_code_id: 3,
                            value: 'Windows Phone',
                            image_url: null,
                            created_at: '2018-01-02T11:05:13.000Z',
                            updated_at: '2018-01-02T11:05:13.000Z'
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
                id: 27,
                product_group_id: 17,
                attribute_code_id: 4,
                attribute_value_id: null,
                text_input: 'Dapat box saja',
                is_variant: 0,
                created_at: '2017-12-28T14:14:38.000Z',
                updated_at: '2018-01-05T17:12:38.000Z',
                AttributeCode: {
                    id: 4,
                    code: 'phone_package',
                    label: 'Kelengkapan Paket',
                    type: 'textinput',
                    created_at: '2017-12-19T10:37:34.000Z',
                    updated_at: '2017-12-19T10:37:37.000Z',
                    AttributeValues: []
                },
                AttributeValue: null
            }
        ]
    });
    t.context.sandbox.stub(RepoCategory, 'getCategoryBreakdown').resolves(null);

    try {
        yield Method.putProductGroup(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.UnprocessableEntity, 'Problem with get category');
    }
});


test.serial('You are not authorized user: Should be return Forbidden', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    try {
        const context = {};
        context.user = '';
        const data = {
            path: {
                id: '17'
            },
            body: {
                name: 'Apple Iphone 8',
                category_id: '561',
                brand_id: '81',
                uom_id: '2',
                stocking_uom_id: '2',
                quantity_stocking_uom: '2',
                manufacturing_number: 'AAAAA',
                package_weight: '100',
                package_length: '100.00',
                package_width: '100.00',
                package_height: '100.00',
                package_content: 'lorem ipsum',
                barcode: '',
                description: 'lorem ipsum',
                primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
                visibility: '1',
                specifications: [
                    {
                        id: '26',
                        type: 'dropdown',
                        attribute_code_id: '3',
                        attribute_value_id: '5',
                        text_input: 'hihi'
                    },
                    {
                        id: '27',
                        type: 'textinput',
                        attribute_code_id: '4',
                        attribute_value_id: '',
                        text_input: 'Dapat box saja'
                    }
                ]
            }
        };
        yield Method.putProductGroup(data, context);
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
