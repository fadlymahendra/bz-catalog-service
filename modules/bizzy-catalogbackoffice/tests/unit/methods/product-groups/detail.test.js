'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const test = require('ava');
const sinon = require('sinon');
const Repo = require('../../../../src/repositories/product_group');
const RepoCategory = require('../../../../src/repositories/category');
const ProductLogRepository = require('../../../../src/repositories/product_log');
const Method = require('../../../../src/methods/product-groups/detail');
const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

test.serial('Should be return Product Group Detail object', function* (t) {
    t.context.sandbox.stub(RepoCategory, 'getCategoryBreakdown').resolves(
        [{
            "category0_id": 7,
            "category0_name": "Lab and Measuring Equipment",
            "category0_unspsc": 41000000,
            "category1_id": 51,
            "category1_name": "Measuring & observing & testing instruments",
            "category1_unspsc": 41110000,
            "category2_id": 180,
            "category2_name": "Humidity & moisture measuring instruments",
            "category2_unspsc": 41112300,
            "category3_id": 500,
            "category3_name": "Hygrometers",
            "category3_unspsc": 41112301
        }]
    );

    t.context.sandbox.stub(Repo, 'findByIdWithDetail').resolves({
        "id": 2,
        "name": "Epson Tinta Refill Botol1",
        "category_id": 500,
        "brand_id": 80,
        "uom_id": 1,
        "stocking_uom_id": 1,
        "quantity_stocking_uom": 1,
        "manufacturing_number": "X1234567",
        "manufacturing_number_type": null,
        "package_weight": 150,
        "package_length": "40.00",
        "package_width": "75.00",
        "package_height": "20.00",
        "package_content": "1 Unit Samsung Galaxy S8\nCharger",
        "barcode": "BAR1234",
        "description": "Samsung Galaxy S8, Unbox Your Phone! Dapatkan fitur-fitur terbaik dari samsung dalam genggamanmu! Dengan RAM 4GB, ROM 64GB  dan dilengkapi dengan berbagai keunggulan",
        "primary_image": "https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01",
        "variant_count": 2,
        "variant_matrix": "[\"phone_color\",\"phone_storage\"]",
        "status": 1,
        "visibility": 0,
        "created_by": 1,
        "created_at": "2017-12-19T14:59:19.000Z",
        "updated_at": "2018-01-05T12:58:34.000Z",
        "Brand": {
            "id": 80,
            "name": "Appeton",
            "image_url": null,
            "created_at": "2017-11-28T14:54:10.000Z",
            "updated_at": "2017-11-28T14:54:10.000Z"
        },
        "Uom": {
            "id": 1,
            "name": "Unit",
            "created_at": "2017-12-05T16:59:10.000Z",
            "updated_at": "2017-12-05T16:59:10.000Z"
        },
        "StockingUom": {
            "id": 1,
            "name": "Box",
            "created_at": "2017-12-05T16:55:00.000Z",
            "updated_at": "2017-12-20T05:49:50.000Z"
        },
        "ProductGroupAttributes": [
            {
                "id": 1,
                "product_group_id": 2,
                "attribute_code_id": 1,
                "attribute_value_id": null,
                "text_input": null,
                "is_variant": 1,
                "created_at": "2017-12-19T08:01:09.000Z",
                "updated_at": "2017-12-19T08:01:09.000Z",
                "AttributeCode": {
                    "id": 1,
                    "code": "phone_color",
                    "label": "Warna",
                    "type": "dropdown",
                    "created_at": "2017-12-19T10:34:50.000Z",
                    "updated_at": "2017-12-19T10:34:53.000Z",
                    "AttributeValues": [
                        {
                            "id": 1,
                            "attribute_code_id": 1,
                            "value": "Silver",
                            "image_url": null,
                            "created_at": "2017-12-19T10:39:35.000Z",
                            "updated_at": "2017-12-19T10:39:38.000Z"
                        },
                        {
                            "id": 2,
                            "attribute_code_id": 1,
                            "value": "Black",
                            "image_url": null,
                            "created_at": "2017-12-19T03:40:00.000Z",
                            "updated_at": "2017-12-19T03:40:00.000Z"
                        }
                    ]
                },
                "AttributeValue": null
            },
            {
                "id": 2,
                "product_group_id": 2,
                "attribute_code_id": 2,
                "attribute_value_id": null,
                "text_input": null,
                "is_variant": 1,
                "created_at": "2017-12-19T08:01:19.000Z",
                "updated_at": "2017-12-19T08:01:19.000Z",
                "AttributeCode": {
                    "id": 2,
                    "code": "phone_storage",
                    "label": "Kapasitas",
                    "type": "dropdown",
                    "created_at": "2017-12-19T10:35:12.000Z",
                    "updated_at": "2017-12-19T10:35:15.000Z",
                    "AttributeValues": [
                        {
                            "id": 3,
                            "attribute_code_id": 2,
                            "value": "32GB",
                            "image_url": null,
                            "created_at": "2017-12-19T03:41:25.000Z",
                            "updated_at": "2017-12-19T03:41:25.000Z"
                        },
                        {
                            "id": 4,
                            "attribute_code_id": 2,
                            "value": "64GB",
                            "image_url": null,
                            "created_at": "2017-12-19T03:41:58.000Z",
                            "updated_at": "2017-12-19T03:41:58.000Z"
                        }
                    ]
                },
                "AttributeValue": null
            },
            {
                "id": 3,
                "product_group_id": 2,
                "attribute_code_id": 3,
                "attribute_value_id": 5,
                "text_input": null,
                "is_variant": 0,
                "created_at": "2017-12-19T08:01:38.000Z",
                "updated_at": "2017-12-19T08:01:38.000Z",
                "AttributeCode": {
                    "id": 3,
                    "code": "phone_os",
                    "label": "Sistem Operasi",
                    "type": "dropdown",
                    "created_at": "2017-12-19T10:37:02.000Z",
                    "updated_at": "2017-12-19T10:37:04.000Z",
                    "AttributeValues": [
                        {
                            "id": 5,
                            "attribute_code_id": 3,
                            "value": "iOS",
                            "image_url": null,
                            "created_at": "2017-12-19T03:42:53.000Z",
                            "updated_at": "2017-12-19T03:42:53.000Z"
                        },
                        {
                            "id": 6,
                            "attribute_code_id": 3,
                            "value": "Android",
                            "image_url": null,
                            "created_at": "2017-12-19T03:43:04.000Z",
                            "updated_at": "2017-12-19T03:43:04.000Z"
                        },
                        {
                            "id": 11,
                            "attribute_code_id": 3,
                            "value": "Windows Phone",
                            "image_url": null,
                            "created_at": "2018-01-02T11:05:13.000Z",
                            "updated_at": "2018-01-02T11:05:13.000Z"
                        }
                    ]
                },
                "AttributeValue": {
                    "id": 5,
                    "attribute_code_id": 3,
                    "value": "iOS",
                    "image_url": null,
                    "created_at": "2017-12-19T03:42:53.000Z",
                    "updated_at": "2017-12-19T03:42:53.000Z"
                }
            },
            {
                "id": 4,
                "product_group_id": 2,
                "attribute_code_id": 4,
                "attribute_value_id": null,
                "text_input": "Dapat charger dan box saja",
                "is_variant": 0,
                "created_at": "2017-12-19T08:02:03.000Z",
                "updated_at": "2017-12-19T08:02:03.000Z",
                "AttributeCode": {
                    "id": 4,
                    "code": "phone_package",
                    "label": "Kelengkapan Paket",
                    "type": "textinput",
                    "created_at": "2017-12-19T10:37:34.000Z",
                    "updated_at": "2017-12-19T10:37:37.000Z",
                    "AttributeValues": []
                },
                "AttributeValue": null
            }
        ]
    });

    t.context.sandbox.stub(ProductLogRepository, 'count').resolves(1);

    try {
        let context = require('../../../mocks/context.json');
        let data = { path: { id: '1' } };

        let result = yield Method.getProductGroupById(data, context);
        let expect = {
            "data": {
                "id": 2,
                "name": "Epson Tinta Refill Botol1",
                "image": "https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01",
                "brand": 'Appeton',
                "brand_id": 80,
                "categories": {
                    "C0": {
                        "id": 7,
                        "name": "Lab and Measuring Equipment",
                        "unspsc": 41000000
                    },
                    "C1": {
                        "id": 51,
                        "name": "Measuring & observing & testing instruments",
                        "unspsc": 41110000
                    },
                    "C2": {
                        "id": 180,
                        "name": "Humidity & moisture measuring instruments",
                        "unspsc": 41112300
                    },
                    "C3": {
                        "id": 500,
                        "name": "Hygrometers",
                        "unspsc": 41112301
                    }
                },
                "dimensions": {
                    "package_weight": 150,
                    "package_length": "40.00",
                    "package_width": "75.00",
                    "package_height": "20.00"
                },
                "detail": {
                    "manufacturing_number": "X1234567",
                    "barcode": "BAR1234",
                    "uom": 'Unit',
                    "uom_id": 1,
                    "stocking_uom": 'Box',
                    "stocking_uom_id": 1,
                    "quantity_stocking_uom": 1
                },
                "specifications": [
                    {
                        "id": 3,
                        "code": "phone_os",
                        "code_id": 3,
                        "label": "Sistem Operasi",
                        "type": "dropdown",
                        "values": [
                            {
                                "id": 5,
                                "value": "iOS"
                            }
                        ]
                    },
                    {
                        "id": 4,
                        "code": "phone_package",
                        "code_id": 4,
                        "label": "Kelengkapan Paket",
                        "type": "textinput",
                        "values": "Dapat charger dan box saja"
                    }
                ],
                "package_content": "1 Unit Samsung Galaxy S8\nCharger",
                "description": "Samsung Galaxy S8, Unbox Your Phone! Dapatkan fitur-fitur terbaik dari samsung dalam genggamanmu! Dengan RAM 4GB, ROM 64GB  dan dilengkapi dengan berbagai keunggulan",
                "visibility": 0,
                "total_history": 1
            }
        };
        t.deepEqual(result, expect);
    } catch (err) {
        console.log(err);
    }
});

test.serial('Invalid context: Should be return Forbidden', function* (t) {
    try {
        let context = { user: '' }
        let data = { path: { id: '1' } };

        let result = yield Method.getProductGroupById(data, context);

        yield Method.getProductGroupById(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, err.message);
    }
});

test.serial('Invalid Params Should Throw BizzyError BadRequest', function* (t) {
    try {
        let context = require('../../../mocks/context.json');
        let data = { path: { id: '' } };

        yield Method.getProductGroupById(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'The Error Type is Incorrect');
    }
});

test.serial('Invalid Params Should Throw BizzyError Not Found', function* (t) {
    t.context.sandbox.stub(Repo, 'findByIdWithDetail').resolves(false);

    try {
        let context = require('../../../mocks/context.json');
        let data = { path: { id: '1' } };

        yield Method.getProductGroupById(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'Product Group Not Found');
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