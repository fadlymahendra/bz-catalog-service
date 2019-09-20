'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');
const CategoryRepository = require('../../../../src/repositories/category');
const AttributeSetRepository = require('../../../../src/repositories/attribute_set');
const Methods = require('../../../../src/methods/categories/attribute');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

test.serial('Should be return variant and spec list', function* (t) {
    t.context.sandbox.stub(CategoryRepository, 'findOne').resolves({ id: 561, name: 'Mobile Devices' });
    t.context.sandbox.stub(AttributeSetRepository, 'findVariantSpec').resolves([
        {
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
        },
        {
            id: 3,
            category_id: 561,
            attribute_code_id: 3,
            is_variant: 0,
            created_at: '2017-12-19T07:55:51.000Z',
            updated_at: '2017-12-19T07:55:51.000Z',
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
            }
        },
        {
            id: 4,
            category_id: 561,
            attribute_code_id: 4,
            is_variant: 0,
            created_at: '2017-12-19T07:56:03.000Z',
            updated_at: '2017-12-19T07:56:03.000Z',
            AttributeCode: {
                id: 4,
                code: 'phone_package',
                label: 'Kelengkapan Paket',
                type: 'textinput',
                created_at: '2017-12-19T10:37:34.000Z',
                updated_at: '2017-12-19T10:37:37.000Z',
                AttributeValues: []
            }
        }
    ]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '561'
            }
        };
        const result = yield Methods.getCategoryAttribute(data, context);
        const expected = {
            data: {
                variants: [
                    {
                        id: 1,
                        code: 'phone_color',
                        label: 'Warna',
                        type: 'dropdown',
                        values: [
                            {
                                id: 1,
                                value: 'Silver'
                            },
                            {
                                id: 2,
                                value: 'Black'
                            }
                        ]
                    },
                    {
                        id: 2,
                        code: 'phone_storage',
                        label: 'Kapasitas',
                        type: 'dropdown',
                        values: [
                            {
                                id: 3,
                                value: '32GB'
                            },
                            {
                                id: 4,
                                value: '64GB'
                            }
                        ]
                    }
                ],
                specifications: [
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
                variant_count: 2,
                variant_matrix: [
                    'phone_color',
                    'phone_storage'
                ]
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return Not Found', function* (t) {
    t.context.sandbox.stub(CategoryRepository, 'findOne').resolves(null);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '123435445'
            }
        };
        yield Methods.getCategoryAttribute(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'Category c3 not found');
    }
});

test.serial('Should be return Bad Request', function* (t) {
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: ''
            }
        };
        yield Methods.getCategoryAttribute(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'The Error Type is Incorrect');
    }
});

test.serial('You are not authorized user: Should be return Forbidden', function* (t) {
    try {
        const context = {
            user: ''
        };
        const data = {
            path: {
                id: '1500'
            }
        };
        yield Methods.getCategoryAttribute(data, context);
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
