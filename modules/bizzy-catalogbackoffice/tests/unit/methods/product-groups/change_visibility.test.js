'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { DBContext, BizzyError, BizzyService } = require('bizzy-common');
const ProductGroupRepository = require('../../../../src/repositories/product_group');
const ProductVariantRepository = require('../../../../src/repositories/product_variant');
const ProductLogRepository = require('../../../../src/repositories/product_log');
const WebhookRepository = require('../../../../src/repositories/webhook');
const Methods = require('../../../../src/methods/product-groups/change_visibility');

sinon.sandbox.create().usingPromise(Promise.Promise);

const resProductVariant = [{
    id: 1
}, {
    id: 2
}];

const resLastAction = [{
    _id: '1',
    payload: {
        altered_sku: '1,2'
    }
}];

test.serial('Should be return one product group', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();
    t.context.sandbox.mock(ProductVariantRepository).expects('updateMany').resolves(true);

    t.context.sandbox.stub(ProductGroupRepository, 'findByIdWithDetail').resolves({
        id: 2,
        name: 'Epson Tinta Refill Botol1',
        category_id: 500,
        brand_id: 80,
        uom_id: 1,
        stocking_uom_id: 1,
        quantity_stocking_uom: 1,
        manufacturing_number: 'X1234567',
        manufacturing_number_type: null,
        package_weight: 150,
        package_length: '40.00',
        package_width: '75.00',
        package_height: '20.00',
        package_content: '1 Unit Samsung Galaxy S8\nCharger',
        barcode: 'BAR1234',
        description: 'Samsung Galaxy S8, Unbox Your Phone! Dapatkan fitur-fitur terbaik dari samsung dalam genggamanmu! Dengan RAM 4GB, ROM 64GB  dan dilengkapi dengan berbagai keunggulan',
        primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 0,
        created_by: 1,
        created_at: '2017-12-19T14:59:19.000Z',
        updated_at: '2018-01-03T14:32:52.000Z',
        Brand: {
            id: 80,
            name: 'Appeton',
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
                        },
                        {
                            id: 12,
                            attribute_code_id: 1,
                            value: 'Magenta',
                            image_url: null,
                            created_at: '2018-01-03T06:36:09.000Z',
                            updated_at: '2018-01-03T06:36:09.000Z'
                        },
                        {
                            id: 13,
                            attribute_code_id: 1,
                            value: 'Dark Brown',
                            image_url: null,
                            created_at: '2018-01-03T06:39:38.000Z',
                            updated_at: '2018-01-03T06:39:38.000Z'
                        },
                        {
                            id: 14,
                            attribute_code_id: 1,
                            value: 'Dark Blue',
                            image_url: null,
                            created_at: '2018-01-03T06:55:57.000Z',
                            updated_at: '2018-01-03T06:55:57.000Z'
                        },
                        {
                            id: 15,
                            attribute_code_id: 1,
                            value: 'Dark Shadow',
                            image_url: null,
                            created_at: '2018-01-03T07:00:19.000Z',
                            updated_at: '2018-01-03T07:00:19.000Z'
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
                id: 4,
                product_group_id: 2,
                attribute_code_id: 4,
                attribute_value_id: null,
                text_input: 'Dapat charger dan box saja',
                is_variant: 0,
                created_at: '2017-12-19T08:02:03.000Z',
                updated_at: '2017-12-19T08:02:03.000Z',
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
    t.context.sandbox.stub(ProductLogRepository, 'insertOne').resolves({
        ok: 1,
        n: 1
    });
    t.context.sandbox.stub(ProductGroupRepository, 'update').resolves([1]);
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);    
    t.context.sandbox.stub(ProductVariantRepository, 'findAll').resolves(resProductVariant);
    t.context.sandbox.stub(ProductLogRepository, 'findLastAction').resolves(resLastAction);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '2'
            },
            body: {
                visibility: '1'
            }
        };

        const result = yield Methods.putProductGroupVisibility(data, context);
        const expected = {
            data: {
                id: 2,
                visibility: 1
            },
            message: 'Change product group visibility is successfully'
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return one product group with no history before', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();
    t.context.sandbox.mock(ProductVariantRepository).expects('updateMany').resolves(true);

    t.context.sandbox.stub(ProductGroupRepository, 'findByIdWithDetail').resolves({
        id: 2,
        name: 'Epson Tinta Refill Botol1',
        category_id: 500,
        brand_id: 80,
        uom_id: 1,
        stocking_uom_id: 1,
        quantity_stocking_uom: 1,
        manufacturing_number: 'X1234567',
        manufacturing_number_type: null,
        package_weight: 150,
        package_length: '40.00',
        package_width: '75.00',
        package_height: '20.00',
        package_content: '1 Unit Samsung Galaxy S8\nCharger',
        barcode: 'BAR1234',
        description: 'Samsung Galaxy S8, Unbox Your Phone! Dapatkan fitur-fitur terbaik dari samsung dalam genggamanmu! Dengan RAM 4GB, ROM 64GB  dan dilengkapi dengan berbagai keunggulan',
        primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 0
    });
    t.context.sandbox.stub(ProductLogRepository, 'insertOne').resolves({
        ok: 1,
        n: 1
    });
    t.context.sandbox.stub(ProductGroupRepository, 'update').resolves([1]);
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);
    t.context.sandbox.stub(ProductVariantRepository, 'findAll').resolves(resProductVariant);
    t.context.sandbox.stub(ProductLogRepository, 'findLastAction').resolves([{
        _id: 1,
        payload: {
            altered_sku: ''
        }
    }]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '2'
            },
            body: {
                visibility: '1'
            }
        };

        const result = yield Methods.putProductGroupVisibility(data, context);
        const expected = {
            data: {
                id: 2,
                visibility: 1
            },
            message: 'Change product group visibility is successfully'
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return one product group visibility 0', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();
    t.context.sandbox.mock(ProductVariantRepository).expects('updateMany').resolves(true);

    t.context.sandbox.stub(ProductGroupRepository, 'findByIdWithDetail').resolves({
        id: 2,
        name: 'Epson Tinta Refill Botol1',
        category_id: 500,
        brand_id: 80,
        uom_id: 1,
        stocking_uom_id: 1,
        quantity_stocking_uom: 1,
        manufacturing_number: 'X1234567',
        manufacturing_number_type: null,
        package_weight: 150,
        package_length: '40.00',
        package_width: '75.00',
        package_height: '20.00',
        package_content: '1 Unit Samsung Galaxy S8\nCharger',
        barcode: 'BAR1234',
        description: 'Samsung Galaxy S8, Unbox Your Phone! Dapatkan fitur-fitur terbaik dari samsung dalam genggamanmu! Dengan RAM 4GB, ROM 64GB  dan dilengkapi dengan berbagai keunggulan',
        primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 1,
        created_at: '2017-12-19T14:59:19.000Z',
        updated_at: '2018-01-03T14:32:52.000Z',
        Brand: {
            id: 80,
            name: 'Appeton',
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
                        },
                        {
                            id: 12,
                            attribute_code_id: 1,
                            value: 'Magenta',
                            image_url: null,
                            created_at: '2018-01-03T06:36:09.000Z',
                            updated_at: '2018-01-03T06:36:09.000Z'
                        },
                        {
                            id: 13,
                            attribute_code_id: 1,
                            value: 'Dark Brown',
                            image_url: null,
                            created_at: '2018-01-03T06:39:38.000Z',
                            updated_at: '2018-01-03T06:39:38.000Z'
                        },
                        {
                            id: 14,
                            attribute_code_id: 1,
                            value: 'Dark Blue',
                            image_url: null,
                            created_at: '2018-01-03T06:55:57.000Z',
                            updated_at: '2018-01-03T06:55:57.000Z'
                        },
                        {
                            id: 15,
                            attribute_code_id: 1,
                            value: 'Dark Shadow',
                            image_url: null,
                            created_at: '2018-01-03T07:00:19.000Z',
                            updated_at: '2018-01-03T07:00:19.000Z'
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
                id: 4,
                product_group_id: 2,
                attribute_code_id: 4,
                attribute_value_id: null,
                text_input: 'Dapat charger dan box saja',
                is_variant: 0,
                created_at: '2017-12-19T08:02:03.000Z',
                updated_at: '2017-12-19T08:02:03.000Z',
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
    t.context.sandbox.stub(ProductLogRepository, 'insertOne').resolves({
        ok: 1,
        n: 1
    });
    t.context.sandbox.stub(ProductGroupRepository, 'update').resolves([1]);
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);
    t.context.sandbox.stub(ProductVariantRepository, 'findAll').resolves(resProductVariant);
    t.context.sandbox.stub(ProductLogRepository, 'findLastAction').resolves(resLastAction);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '2'
            },
            body: {
                visibility: '0'
            }
        };

        const result = yield Methods.putProductGroupVisibility(data, context);
        const expected = {
            data: {
                id: 2,
                visibility: 0
            },
            message: 'Change product group visibility is successfully'
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Fail to change visibility: Should be return BizzyError.BadRequest', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();


    t.context.sandbox.stub(ProductGroupRepository, 'findByIdWithDetail').resolves({
        id: 2,
        name: 'Epson Tinta Refill Botol1',
        category_id: 500,
        brand_id: 80,
        uom_id: 1,
        stocking_uom_id: 1,
        quantity_stocking_uom: 1,
        manufacturing_number: 'X1234567',
        manufacturing_number_type: null,
        package_weight: 150,
        package_length: '40.00',
        package_width: '75.00',
        package_height: '20.00',
        package_content: '1 Unit Samsung Galaxy S8\nCharger',
        barcode: 'BAR1234',
        description: 'Samsung Galaxy S8, Unbox Your Phone! Dapatkan fitur-fitur terbaik dari samsung dalam genggamanmu! Dengan RAM 4GB, ROM 64GB  dan dilengkapi dengan berbagai keunggulan',
        primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 0,
        created_by: 1,
        created_at: '2017-12-19T14:59:19.000Z',
        updated_at: '2018-01-03T14:32:52.000Z',
        Brand: {
            id: 80,
            name: 'Appeton',
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
                        },
                        {
                            id: 12,
                            attribute_code_id: 1,
                            value: 'Magenta',
                            image_url: null,
                            created_at: '2018-01-03T06:36:09.000Z',
                            updated_at: '2018-01-03T06:36:09.000Z'
                        },
                        {
                            id: 13,
                            attribute_code_id: 1,
                            value: 'Dark Brown',
                            image_url: null,
                            created_at: '2018-01-03T06:39:38.000Z',
                            updated_at: '2018-01-03T06:39:38.000Z'
                        },
                        {
                            id: 14,
                            attribute_code_id: 1,
                            value: 'Dark Blue',
                            image_url: null,
                            created_at: '2018-01-03T06:55:57.000Z',
                            updated_at: '2018-01-03T06:55:57.000Z'
                        },
                        {
                            id: 15,
                            attribute_code_id: 1,
                            value: 'Dark Shadow',
                            image_url: null,
                            created_at: '2018-01-03T07:00:19.000Z',
                            updated_at: '2018-01-03T07:00:19.000Z'
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
                id: 4,
                product_group_id: 2,
                attribute_code_id: 4,
                attribute_value_id: null,
                text_input: 'Dapat charger dan box saja',
                is_variant: 0,
                created_at: '2017-12-19T08:02:03.000Z',
                updated_at: '2017-12-19T08:02:03.000Z',
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
    t.context.sandbox.stub(ProductLogRepository, 'insertOne').resolves({
        ok: 1,
        n: 1
    });
    t.context.sandbox.stub(ProductGroupRepository, 'update').resolves(null);
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);
    t.context.sandbox.stub(ProductVariantRepository, 'findAll').resolves(resProductVariant);
    t.context.sandbox.stub(ProductLogRepository, 'findLastAction').resolves(resLastAction);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '2'
            },
            body: {
                visibility: '1'
            }
        };

        yield Methods.putProductGroupVisibility(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Fail to change visibility: Cuz already inactive, Should be return BizzyError.BadRequest', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();


    t.context.sandbox.stub(ProductGroupRepository, 'findByIdWithDetail').resolves({
        id: 2,
        visibility: 0
    });
    t.context.sandbox.stub(ProductLogRepository, 'insertOne').resolves({
        ok: 1,
        n: 1
    });
    t.context.sandbox.stub(ProductGroupRepository, 'update').resolves(null);
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);
    t.context.sandbox.stub(ProductVariantRepository, 'findAll').resolves(resProductVariant);
    t.context.sandbox.stub(ProductLogRepository, 'findLastAction').resolves(resLastAction);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '2'
            },
            body: {
                visibility: '0'
            }
        };

        yield Methods.putProductGroupVisibility(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});


test.serial('Fail to change visibility: Cuz already active, Should be return BizzyError.BadRequest', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();


    t.context.sandbox.stub(ProductGroupRepository, 'findByIdWithDetail').resolves({
        id: 2,
        visibility: 1
    });
    t.context.sandbox.stub(ProductLogRepository, 'insertOne').resolves({
        ok: 1,
        n: 1
    });
    t.context.sandbox.stub(ProductGroupRepository, 'update').resolves(null);
    t.context.sandbox.stub(BizzyService, 'callAsync').resolves(true);
    t.context.sandbox.stub(ProductVariantRepository, 'findAll').resolves(resProductVariant);
    t.context.sandbox.stub(ProductLogRepository, 'findLastAction').resolves(resLastAction);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '2'
            },
            body: {
                visibility: '1'
            }
        };

        yield Methods.putProductGroupVisibility(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});


test.serial('Product not found: Should be return BizzyError.NotFound', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(ProductGroupRepository, 'findByIdWithDetail').resolves(null);
    t.context.sandbox.stub(ProductGroupRepository, 'update').resolves([1]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '2'
            },
            body: {
                visibility: '1'
            }
        };

        yield Methods.putProductGroupVisibility(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, err.message);
    }
});

test.serial('Invalid input data for path: Should be return Bad Request', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: ''
            },
            body: {
                product_variant_id: '1'
            }
        };
        yield Methods.putProductGroupVisibility(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Invalid input data for body: Should be return Bad Request', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1'
            },
            body: {
                product_variant_id: ''
            }
        };
        yield Methods.putProductGroupVisibility(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
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
                id: '2'
            },
            body: {
                visibility: '1'
            }
        };
        yield Methods.putProductGroupVisibility(data, context);
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
