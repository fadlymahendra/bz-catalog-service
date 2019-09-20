'use strict';

const Promise = require('bluebird');
const test = require('ava');
const Variants = require('../../../../src/utils/adapter/variants');
const ProductVariantRepository = require('../../../../src/repositories/product_variant');
const AttributeSetRepository = require('../../../../src/repositories/attribute_set');
const { DBContext, BizzyError } = require('bizzy-common');
const sinon = require('sinon');

const validProductVariant = [
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
        is_active: 1,
        created_at: '2018-01-16T02:59:03.000Z',
        updated_at: '2018-01-16T02:59:03.000Z'
    }
];

const validFindOneVariant = [
    {
        id: 1,
        category_id: 561,
        AttributeCode: {
            label: 'Warna',
            AttributeValues: [{
                value: 'Hitam'
            }]
        }
    }
];

const validAllVariant = [{
    id: 1,
    AttributeCode: {
        label: 'Warna',
        AttributeValues: [
            {
                value: 'Hitam'
            },
            {
                value: 'Hijau'
            }
        ]
    },
    Category: {
        id: 561,
        name: 'Phone'
    }
}];

test.serial('Success findSkuByAttributeCode', function* (t) {

    t.context.sandbox.stub(ProductVariantRepository, 'findAll').resolves(validProductVariant);

    try {
        const data = '';

        const expected = [
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
                is_active: 1,
                created_at: '2018-01-16T02:59:03.000Z',
                updated_at: '2018-01-16T02:59:03.000Z'
            } 
        ];

        const result = yield Variants.findSkuByAttributeCode(data);
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err);
        t.fail();
    }
});

test.serial('Success findByIdVariant', function* (t) {

    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });

    t.context.sandbox.stub(AttributeSetRepository, 'findOneVariants').resolves(validFindOneVariant);

    try {
        const data = 1;

        const expected = [
            {
                id: 1,
                category_id: 561,
                AttributeCode: {
                    label: 'Warna',
                    AttributeValues: [{
                        value: 'Hitam'
                    }]
                }
            }
        ];

        const result = yield Variants.findByIdVariant(data);
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err);
        t.fail();
    }

});

test.serial('Success findAllVariants', function* (t) {

    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });

    t.context.sandbox.stub(AttributeSetRepository, 'findAllVariants').resolves(validAllVariant);

    try {
        const data = {
            search: '',
            created_by: '',
            category: ''
        };

        const expected = [
            {
                id: 1,
                AttributeCode: {
                    label: 'Warna',
                    AttributeValues: [
                        {
                            value: 'Hitam'
                        },
                        {
                            value: 'Hijau'
                        }
                    ]
                },
                Category: {
                    id: 561,
                    name: 'Phone'
                }
            }
        ];

        const result = yield Variants.findAllVariants(data);
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err);
        t.fail();
    }

});

test.serial('Success findAllVariants with search', function* (t) {

    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });

    t.context.sandbox.stub(AttributeSetRepository, 'findAllVariants').resolves(validAllVariant);

    try {
        const data = {
            search: 'Phone',
            created_by: 'User',
            category: 561
        };

        const expected = [
            {
                id: 1,
                AttributeCode: {
                    label: 'Warna',
                    AttributeValues: [
                        {
                            value: 'Hitam'
                        },
                        {
                            value: 'Hijau'
                        }
                    ]
                },
                Category: {
                    id: 561,
                    name: 'Phone'
                }
            }
        ];

        const result = yield Variants.findAllVariants(data);
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err);
        t.fail();
    }

});

test.before('Initialize BizzyError Before All Tests', (t) => {
    BizzyError.initializeErrors();
});

test.beforeEach('Initialize New Sandbox Before Each Test', (t) => {
    t.context.sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
});

test.afterEach.always('Restore Sandbox and Configuration After Each Test', (t) => {
    t.context.sandbox.restore();
});
