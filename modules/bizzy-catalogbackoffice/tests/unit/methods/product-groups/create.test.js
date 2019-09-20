'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');
const ProductGroupRepository = require('../../../../src/repositories/product_group');
const ProductGroupAttributeRepository = require('../../../../src/repositories/product_group_attribute');
const AttributeSetRepository = require('../../../../src/repositories/attribute_set');
const Methods = require('../../../../src/methods/product-groups/create');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

test.serial('Should be return Product Group List', function* (t) {
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

    t.context.sandbox.stub(ProductGroupAttributeRepository, 'findAllWithCodeName').resolves([{
        id: 17,
        name: 'Apple Iphone 8',
        category_id: 561,
        brand_id: 81,
        uom_id: 1,
        stocking_uom_id: 1,
        quantity_stocking_uom: 1,
        manufacturing_number: 'XXXXX',
        package_weight: 800,
        package_length: '100.00',
        package_width: '200.00',
        package_height: '300.00',
        package_content: 'lorem ipsum content',
        barcode: null,
        description: 'lorem ipsum description',
        primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        created_at: '2017-12-28T14:14:37.000Z',
        updated_at: '2017-12-28T14:14:37.000Z'
    }, false]);

    t.context.sandbox.stub(ProductGroupRepository, 'findOrCreate').resolves([{
        id: 122,
        name: 'Apple Iphone 8',
        category_id: 561,
        brand_id: 81,
        uom_id: 1,
        stocking_uom_id: 1,
        quantity_stocking_uom: 1,
        manufacturing_number: 'XXXXX',
        package_weight: 800,
        package_length: '100.00',
        package_width: '200.00',
        package_height: '300.00',
        package_content: 'lorem ipsum content',
        barcode: null,
        description: 'lorem ipsum description',
        primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        created_at: '2018-01-02T11:42:41.000Z',
        updated_at: '2018-01-02T11:42:41.000Z'
    }, true]);

    t.context.sandbox.stub(ProductGroupAttributeRepository, 'findOrCreate').resolves([{
        id: 267,
        product_group_id: 121,
        attribute_code_id: 3,
        attribute_value_id: 5,
        text_input: '',
        is_variant: 0,
        updated_at: '2018-01-02T11:41:05.701Z',
        created_at: '2018-01-02T11:41:05.701Z'
    }], true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            body: {
                name: 'Apple Iphone 8',
                category_id: '561',
                brand_id: '81',
                uom_id: '1',
                stocking_uom_id: '1',
                quantity_stocking_uom: '1',
                manufacturing_number: 'XXXXX',
                package_weight: '800',
                package_length: '100.00',
                package_width: '200.00',
                package_height: '300.00',
                package_content: 'lorem ipsum content',
                barcode: '',
                description: 'lorem ipsum description',
                primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
                status: '1',
                visibility: '1',
                specifications: [
                    {
                        type: 'dropdown',
                        attribute_code_id: '3',
                        attribute_value_id: '5',
                        text_input: ''
                    },
                    {
                        type: 'textinput',
                        attribute_code_id: '4',
                        attribute_value_id: '',
                        text_input: 'Dapat box saja'
                    }
                ]
            }
        };

        const result = yield Methods.postProductGroup(data, context);
        const expected = {
            name: 'Apple Iphone 8',
            category_id: '561',
            brand_id: '81',
            uom_id: '1',
            stocking_uom_id: '1',
            quantity_stocking_uom: '1',
            manufacturing_number: 'XXXXX',
            package_weight: '800',
            package_length: '100.00',
            package_width: '200.00',
            package_height: '300.00',
            package_content: 'lorem ipsum content',
            barcode: null,
            description: 'lorem ipsum description',
            primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
            status: '1',
            visibility: '1',
            specifications: [
                {
                    type: 'dropdown',
                    attribute_code_id: '3',
                    attribute_value_id: '5',
                    text_input: ''
                },
                {
                    type: 'textinput',
                    attribute_code_id: '4',
                    attribute_value_id: '',
                    text_input: 'Dapat box saja'
                }
            ],
            created_by: 2,
            variant_count: 1,
            variant_matrix: '["phone_color"]',
            product_group_id: 122
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});


test.serial('Attribute value can not be empty!: Should be return BizzyError.BadRequest', function* (t) {
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

    t.context.sandbox.stub(ProductGroupAttributeRepository, 'findAllWithCodeName').resolves([{
        id: 17,
        name: 'Apple Iphone 8',
        category_id: 561,
        brand_id: 81,
        uom_id: 1,
        stocking_uom_id: 1,
        quantity_stocking_uom: 1,
        manufacturing_number: 'XXXXX',
        package_weight: 800,
        package_length: '100.00',
        package_width: '200.00',
        package_height: '300.00',
        package_content: 'lorem ipsum content',
        barcode: '',
        description: 'lorem ipsum description',
        primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        created_at: '2017-12-28T14:14:37.000Z',
        updated_at: '2017-12-28T14:14:37.000Z'
    }, false]);

    t.context.sandbox.stub(ProductGroupRepository, 'findOrCreate').resolves([{
        id: 122,
        name: 'Apple Iphone 8',
        category_id: 561,
        brand_id: 81,
        uom_id: 1,
        stocking_uom_id: 1,
        quantity_stocking_uom: 1,
        manufacturing_number: 'XXXXX',
        package_weight: 800,
        package_length: '100.00',
        package_width: '200.00',
        package_height: '300.00',
        package_content: 'lorem ipsum content',
        barcode: '',
        description: 'lorem ipsum description',
        primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        created_at: '2018-01-02T11:42:41.000Z',
        updated_at: '2018-01-02T11:42:41.000Z'
    }, true]);

    t.context.sandbox.stub(ProductGroupAttributeRepository, 'findOrCreate').resolves([{
        id: 267,
        product_group_id: 121,
        attribute_code_id: 3,
        attribute_value_id: 5,
        text_input: '',
        is_variant: 0,
        updated_at: '2018-01-02T11:41:05.701Z',
        created_at: '2018-01-02T11:41:05.701Z'
    }], true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            body: {
                name: 'Apple Iphone 8',
                category_id: '561',
                brand_id: '81',
                uom_id: '1',
                stocking_uom_id: '1',
                quantity_stocking_uom: '1',
                manufacturing_number: 'XXXXX',
                package_weight: '800',
                package_length: '100.00',
                package_width: '200.00',
                package_height: '300.00',
                package_content: 'lorem ipsum content',
                barcode: '',
                description: 'lorem ipsum description',
                primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
                status: '1',
                visibility: '1',
                specifications: [
                    {
                        type: 'dropdown',
                        attribute_code_id: '3',
                        attribute_value_id: '',
                        text_input: ''
                    },
                    {
                        type: 'textinput',
                        attribute_code_id: '4',
                        attribute_value_id: '',
                        text_input: 'Dapat box saja'
                    }
                ]
            }
        };

        yield Methods.postProductGroup(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});


test.serial('Text input can not be empty!: Should be return BizzyError.BadRequest', function* (t) {
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

    t.context.sandbox.stub(ProductGroupAttributeRepository, 'findAllWithCodeName').resolves([{
        id: 17,
        name: 'Apple Iphone 8',
        category_id: 561,
        brand_id: 81,
        uom_id: 1,
        stocking_uom_id: 1,
        quantity_stocking_uom: 1,
        manufacturing_number: 'XXXXX',
        package_weight: 800,
        package_length: '100.00',
        package_width: '200.00',
        package_height: '300.00',
        package_content: 'lorem ipsum content',
        barcode: '',
        description: 'lorem ipsum description',
        primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        created_at: '2017-12-28T14:14:37.000Z',
        updated_at: '2017-12-28T14:14:37.000Z'
    }, false]);

    t.context.sandbox.stub(ProductGroupRepository, 'findOrCreate').resolves([{
        id: 122,
        name: 'Apple Iphone 8',
        category_id: 561,
        brand_id: 81,
        uom_id: 1,
        stocking_uom_id: 1,
        quantity_stocking_uom: 1,
        manufacturing_number: 'XXXXX',
        package_weight: 800,
        package_length: '100.00',
        package_width: '200.00',
        package_height: '300.00',
        package_content: 'lorem ipsum content',
        barcode: '',
        description: 'lorem ipsum description',
        primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        created_at: '2018-01-02T11:42:41.000Z',
        updated_at: '2018-01-02T11:42:41.000Z'
    }, true]);

    t.context.sandbox.stub(ProductGroupAttributeRepository, 'findOrCreate').resolves([{
        id: 267,
        product_group_id: 121,
        attribute_code_id: 3,
        attribute_value_id: 5,
        text_input: '',
        is_variant: 0,
        updated_at: '2018-01-02T11:41:05.701Z',
        created_at: '2018-01-02T11:41:05.701Z'
    }], true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            body: {
                name: 'Apple Iphone 8',
                category_id: '561',
                brand_id: '81',
                uom_id: '1',
                stocking_uom_id: '1',
                quantity_stocking_uom: '1',
                manufacturing_number: '',
                package_weight: '800',
                package_length: '100.00',
                package_width: '200.00',
                package_height: '300.00',
                package_content: '',
                barcode: '1',
                description: 'lorem ipsum description',
                primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
                status: '1',
                visibility: '1',
                specifications: [
                    {
                        type: 'dropdown',
                        attribute_code_id: '3',
                        attribute_value_id: '5',
                        text_input: ''
                    },
                    {
                        type: 'textinput',
                        attribute_code_id: '4',
                        attribute_value_id: '',
                        text_input: ''
                    }
                ]
            }
        };

        yield Methods.postProductGroup(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Should be return Product Group List With empty quantity stocking uom ', function* (t) {
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

    t.context.sandbox.stub(ProductGroupAttributeRepository, 'findAllWithCodeName').resolves([{
        id: 17,
        name: 'Apple Iphone 8',
        category_id: 561,
        brand_id: 81,
        uom_id: 1,
        stocking_uom_id: 1,
        quantity_stocking_uom: null,
        manufacturing_number: 'XXXXX',
        package_weight: 800,
        package_length: '100.00',
        package_width: '200.00',
        package_height: '300.00',
        package_content: 'lorem ipsum content',
        barcode: '',
        description: 'lorem ipsum description',
        primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        created_at: '2017-12-28T14:14:37.000Z',
        updated_at: '2017-12-28T14:14:37.000Z'
    }, false]);

    t.context.sandbox.stub(ProductGroupRepository, 'findOrCreate').resolves([{
        id: 122,
        name: 'Apple Iphone 8',
        category_id: 561,
        brand_id: 81,
        uom_id: 1,
        stocking_uom_id: 1,
        quantity_stocking_uom: null,
        manufacturing_number: 'XXXXX',
        package_weight: 800,
        package_length: '100.00',
        package_width: '200.00',
        package_height: '300.00',
        package_content: 'lorem ipsum content',
        barcode: '',
        description: 'lorem ipsum description',
        primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        created_at: '2018-01-02T11:42:41.000Z',
        updated_at: '2018-01-02T11:42:41.000Z'
    }, true]);

    t.context.sandbox.stub(ProductGroupAttributeRepository, 'findOrCreate').resolves([{
        id: 267,
        product_group_id: 121,
        attribute_code_id: 3,
        attribute_value_id: 5,
        text_input: '',
        is_variant: 0,
        updated_at: '2018-01-02T11:41:05.701Z',
        created_at: '2018-01-02T11:41:05.701Z'
    }], true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            body: {
                name: 'Apple Iphone 8',
                category_id: '561',
                brand_id: '81',
                uom_id: '1',
                stocking_uom_id: '1',
                quantity_stocking_uom: '',
                manufacturing_number: 'XXXXX',
                package_weight: '800',
                package_length: '100.00',
                package_width: '200.00',
                package_height: '300.00',
                package_content: 'lorem ipsum content',
                barcode: '',
                description: 'lorem ipsum description',
                primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
                status: '1',
                visibility: '1',
                specifications: [
                    {
                        type: 'dropdown',
                        attribute_code_id: '3',
                        attribute_value_id: '5',
                        text_input: ''
                    },
                    {
                        type: 'textinput',
                        attribute_code_id: '4',
                        attribute_value_id: '',
                        text_input: 'Dapat box saja'
                    }
                ]
            }
        };

        const result = yield Methods.postProductGroup(data, context);
        const expected = {
            name: 'Apple Iphone 8',
            category_id: '561',
            brand_id: '81',
            uom_id: '1',
            stocking_uom_id: '1',
            quantity_stocking_uom: null,
            manufacturing_number: 'XXXXX',
            package_weight: '800',
            package_length: '100.00',
            package_width: '200.00',
            package_height: '300.00',
            package_content: 'lorem ipsum content',
            barcode: null,
            description: 'lorem ipsum description',
            primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
            status: '1',
            visibility: '1',
            specifications: [
                {
                    type: 'dropdown',
                    attribute_code_id: '3',
                    attribute_value_id: '5',
                    text_input: ''
                },
                {
                    type: 'textinput',
                    attribute_code_id: '4',
                    attribute_value_id: '',
                    text_input: 'Dapat box saja'
                }
            ],
            created_by: 2,
            variant_count: 1,
            variant_matrix: '["phone_color"]',
            product_group_id: 122
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Product Already Exist: Should be return BizzyError.BadRequest', function* (t) {
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

    t.context.sandbox.stub(ProductGroupAttributeRepository, 'findAllWithCodeName').resolves([{
        id: 17,
        name: 'Apple Iphone 8',
        category_id: 561,
        brand_id: 81,
        uom_id: 1,
        stocking_uom_id: 1,
        quantity_stocking_uom: 1,
        manufacturing_number: 'XXXXX',
        package_weight: 800,
        package_length: '100.00',
        package_width: '200.00',
        package_height: '300.00',
        package_content: 'lorem ipsum content',
        barcode: '',
        description: 'lorem ipsum description',
        primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        created_at: '2017-12-28T14:14:37.000Z',
        updated_at: '2017-12-28T14:14:37.000Z'
    }, false]);

    t.context.sandbox.stub(ProductGroupRepository, 'findOrCreate').resolves([{
        id: 122,
        name: 'Hihihixsl',
        category_id: 561,
        brand_id: 81,
        uom_id: 1,
        stocking_uom_id: 1,
        quantity_stocking_uom: 1,
        manufacturing_number: 'XXXXX',
        package_weight: 800,
        package_length: '100.00',
        package_width: '200.00',
        package_height: '300.00',
        package_content: 'lorem ipsum content',
        barcode: '',
        description: 'lorem ipsum description',
        primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        created_at: '2018-01-02T11:42:41.000Z',
        updated_at: '2018-01-02T11:42:41.000Z'
    }, false]);

    t.context.sandbox.stub(ProductGroupAttributeRepository, 'findOrCreate').resolves([{
        id: 267,
        product_group_id: 121,
        attribute_code_id: 3,
        attribute_value_id: 5,
        text_input: '',
        is_variant: 0,
        updated_at: '2018-01-02T11:41:05.701Z',
        created_at: '2018-01-02T11:41:05.701Z'
    }], true);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            body: {
                name: 'Apple Iphone 8',
                category_id: '561',
                brand_id: '81',
                uom_id: '1',
                stocking_uom_id: '1',
                quantity_stocking_uom: '1',
                manufacturing_number: 'XXXXX',
                package_weight: '800',
                package_length: '100.00',
                package_width: '200.00',
                package_height: '300.00',
                package_content: 'lorem ipsum content',
                barcode: '',
                description: 'lorem ipsum description',
                primary_image: '',
                status: '1',
                visibility: '1',
                specifications: [
                    {
                        type: 'dropdown',
                        attribute_code_id: '3',
                        attribute_value_id: '5',
                        text_input: ''
                    },
                    {
                        type: 'textinput',
                        attribute_code_id: '4',
                        attribute_value_id: '',
                        text_input: 'Dapat box saja'
                    }
                ]
            }
        };

        yield Methods.postProductGroup(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'Product Already Exist');
    }
});

test.serial('Invalid input data: Should be return Bad Request', function* (t) {
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            body: {
                name: '',
                category_id: '561',
                brand_id: '81',
                uom_id: '1',
                stocking_uom_id: '1',
                quantity_stocking_uom: '1',
                manufacturing_number: 'XXXXX',
                package_weight: '800',
                package_length: '100.00',
                package_width: '200.00',
                package_height: '300.00',
                package_content: 'lorem ipsum content',
                barcode: '',
                description: 'lorem ipsum description',
                primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
                status: '1',
                visibility: '1',
                specifications: [
                    {
                        type: 'dropdown',
                        attribute_code_id: '3',
                        attribute_value_id: '5',
                        text_input: ''
                    },
                    {
                        type: 'textinput',
                        attribute_code_id: '4',
                        attribute_value_id: '',
                        text_input: 'Dapat box saja'
                    }
                ]
            }
        };
        yield Methods.postProductGroup(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Invalid context: Should be return Forbidden', function* (t) {
    try {
        const context = {
            user: ''
        };
        const data = {
            body: {
                name: 'Apple Iphone 8',
                category_id: '561',
                brand_id: '81',
                uom_id: '1',
                stocking_uom_id: '1',
                quantity_stocking_uom: '1',
                manufacturing_number: 'XXXXX',
                package_weight: '800',
                package_length: '100.00',
                package_width: '200.00',
                package_height: '300.00',
                package_content: 'lorem ipsum content',
                barcode: '',
                description: 'lorem ipsum description',
                primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
                status: '1',
                visibility: '1',
                specifications: [
                    {
                        attribute_code_id: '3',
                        attribute_value_id: '5',
                        text_input: ''
                    },
                    {
                        attribute_code_id: '4',
                        attribute_value_id: '',
                        text_input: 'Dapat box saja'
                    }
                ]
            }
        };
        yield Methods.postProductGroup(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, err.message);
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
