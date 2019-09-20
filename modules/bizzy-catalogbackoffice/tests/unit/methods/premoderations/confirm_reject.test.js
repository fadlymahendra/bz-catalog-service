'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');
const PremoderationRepository = require('../../../../src/repositories/premoderation');
const PremoderationLogRepository = require('../../../../src/repositories/premoderation_log');
const Methods = require('../../../../src/methods/premoderations/confirm_reject');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

test.serial('Should be return Confirm Rejected', function*(t) {
    t.context.sandbox.stub(PremoderationRepository, 'update').resolves({});
    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves(
        {
            "_id": "5a3cce0049a0e0261d2a2eb7",
            "id": "1513934336601",
            "type": "new",
            "payload": {
                "name": "Product Baru",
                "category_id": 1,
                "brand_id": 1,
                "uom_id": 1,
                "stocking_uom_id": 1,
                "quantity_stocking_uom": 10,
                "manufacturing_number": "11111",
                "package_weight": "0",
                "package_length": "0",
                "package_width": "0",
                "package_height": "0",
                "package_content": "lorem ipsum",
                "barcode": "1234",
                "description": "test",
                "reference_link": [],
                "variant_count": 1,
                "variant_matrix": "{1=tv_color|2=tv_size}",
                "products": [
                    {
                        "variants": [
                            {
                                "attribute_id": 1,
                                "attribute_value_id": 1,
                                "attribute_value_name": "50\"",
                                "attribute_code": "tv_size"
                            },
                            {
                                "attribute_id": 2,
                                "attribute_value_id": 1,
                                "attribute_value_name": "Black",
                                "attribute_code": "tv_color"
                            }
                        ],
                        "variant_value": "NO_VARIANT",
                        "sku_vendor": "1111111",
                        "tier_min_qty_1": 0,
                        "tier_min_qty_2": 0,
                        "tier_min_qty_3": 0,
                        "tier_cogs_price_1": 0,
                        "tier_cogs_price_2": 0,
                        "tier_cogs_price_3": 0,
                        "stock": 1,
                        "primary_image": "http://localhost/testing/testing_image.jpg",
                        "additional_images": [
                            "http://localhost/testing/testing_image.jpg",
                            "http://localhost/testing/testing_image.jpg"
                        ],
                        "warehouse_id": 1,
                        "location_label": "Jakarta",
                        "reference_links": [
                            "google.com",
                            "amazon.com"
                        ],
                        "warranty_option": "official_warranty",
                        "warranty_period": "month",
                        "warranty_limit": 1,
                        "is_indent": 0,
                        "indent_period": "week",
                        "indent_limit": 2
                    },
                    {
                        "variants": [
                            {
                                "attribute_id": 1,
                                "attribue_code": "tv_size",
                                "attribute_value_id": 1,
                                "attribute_value_name": "40"
                            },
                            {
                                "attribute_id": 2,
                                "attribue_code": "tv_color",
                                "attribute_value_id": 1,
                                "attribute_value_name": "Red"
                            }
                        ],
                        "variant_value": "NO_VARIANT",
                        "sku_vendor": "1111111",
                        "tier_min_qty_1": 0,
                        "tier_min_qty_2": 0,
                        "tier_min_qty_3": 0,
                        "tier_cogs_price_1": 0,
                        "tier_cogs_price_2": 0,
                        "tier_cogs_price_3": 0,
                        "stock": 1,
                        "primary_image": "http://localhost/testing/testing_image.jpg",
                        "additional_images": [
                            "http://localhost/testing/testing_image.jpg",
                            "http://localhost/testing/testing_image.jpg"
                        ],
                        "warehouse_id": 1,
                        "location_label": "Jakarta",
                        "reference_links": [
                            "google.com",
                            "amazon.com"
                        ],
                        "warranty_option": "official_warranty",
                        "warranty_period": "month",
                        "warranty_limit": 1,
                        "is_indent": 0,
                        "indent_period": "week",
                        "indent_limit": 2
                    },
                    {
                        "variants": [
                            {
                                "attribute_id": 1,
                                "attribute_value_id": 1,
                                "attribute_value_name": "40",
                                "attribute_code": "tv_size"
                            },
                            {
                                "attribute_id": 2,
                                "attribute_value_id": 1,
                                "attribute_value_name": "Black",
                                "attribute_code": "tv_color"
                            }
                        ],
                        "variant_value": "NO_VARIANT",
                        "sku_vendor": "1111111",
                        "tier_min_qty_1": 0,
                        "tier_min_qty_2": 0,
                        "tier_min_qty_3": 0,
                        "tier_cogs_price_1": 0,
                        "tier_cogs_price_2": 0,
                        "tier_cogs_price_3": 0,
                        "stock": 1,
                        "primary_image": "http://localhost/testing/testing_image.jpg",
                        "additional_images": [
                            "http://localhost/testing/testing_image.jpg",
                            "http://localhost/testing/testing_image.jpg"
                        ],
                        "warehouse_id": 1,
                        "location_label": "Jakarta",
                        "reference_links": [
                            "google.com",
                            "amazon.com"
                        ],
                        "warranty_option": "official_warranty",
                        "warranty_period": "month",
                        "warranty_limit": 1,
                        "is_indent": 0,
                        "indent_period": "week",
                        "indent_limit": 2
                    }
                ],
                "specifications": []
            },
            "premoderation_status": "need_revision",
            "vendor_id": "16",
            "created_by": 11,
            "created_at": "2017-12-22T09:18:56.601Z",
            "updated_at": "2017-12-22T09:18:56.601Z",
            "assign_to": 10
        }
    );
    t.context.sandbox.stub(PremoderationLogRepository, 'insertReject').resolves({
        "data": {
            "premoderation_id": "1513934336601",
            "created_at": "2017-12-25T17:01:34.056Z",
            "updated_at": "2017-12-25T17:01:34.056Z"
        }
    });

    try {
        let context = require('../../../mocks/context.json');
        const data = {
            "path": {
                "id": "1513934336601"
            },
            "body": {
                "status": "rejected",
                "reject_reasons": {
                    "product_data" : "", 
                    "sku_list" : "", 
                    "product_specification" : "", 
                    "description" : "", 
                    "product_details" : "", 
                    "package_dimension" : "", 
                    "warranty" : "", 
                    "totally_reject" : "Barang Ilegal"
                }
            }
        }

        const result = yield Methods.putPremoderationReject(data, context);
        const expected = {
            "data": {
                "id": result.data.id,
                "status": "rejected",
                "premoderation_id": "1513934336601",
                "created_at": result.data.created_at,
                "updated_at": result.data.updated_at
            }
        }

        t.deepEqual(result, expected);
    } catch(err) {
        console.log(err.message);
    }
});


test.serial('Should be return Confirm In Progress', function*(t) {
    t.context.sandbox.stub(PremoderationRepository, 'update').resolves({});
    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves(
        {
            "_id": "5a3cce0049a0e0261d2a2eb7",
            "id": "1513934336601",
            "type": "new",
            "payload": {
                "name": "Product Baru",
                "category_id": 1,
                "brand_id": 1,
                "uom_id": 1,
                "stocking_uom_id": 1,
                "quantity_stocking_uom": 10,
                "manufacturing_number": "11111",
                "package_weight": "0",
                "package_length": "0",
                "package_width": "0",
                "package_height": "0",
                "package_content": "lorem ipsum",
                "barcode": "1234",
                "description": "test",
                "reference_link": [],
                "variant_count": 1,
                "variant_matrix": "{1=tv_color|2=tv_size}",
                "products": [
                    {
                        "variants": [
                            {
                                "attribute_id": 1,
                                "attribute_value_id": 1,
                                "attribute_value_name": "50\"",
                                "attribute_code": "tv_size"
                            },
                            {
                                "attribute_id": 2,
                                "attribute_value_id": 1,
                                "attribute_value_name": "Black",
                                "attribute_code": "tv_color"
                            }
                        ],
                        "variant_value": "NO_VARIANT",
                        "sku_vendor": "1111111",
                        "tier_min_qty_1": 0,
                        "tier_min_qty_2": 0,
                        "tier_min_qty_3": 0,
                        "tier_cogs_price_1": 0,
                        "tier_cogs_price_2": 0,
                        "tier_cogs_price_3": 0,
                        "stock": 1,
                        "primary_image": "http://localhost/testing/testing_image.jpg",
                        "additional_images": [
                            "http://localhost/testing/testing_image.jpg",
                            "http://localhost/testing/testing_image.jpg"
                        ],
                        "warehouse_id": 1,
                        "location_label": "Jakarta",
                        "reference_links": [
                            "google.com",
                            "amazon.com"
                        ],
                        "warranty_option": "official_warranty",
                        "warranty_period": "month",
                        "warranty_limit": 1,
                        "is_indent": 0,
                        "indent_period": "week",
                        "indent_limit": 2
                    },
                    {
                        "variants": [
                            {
                                "attribute_id": 1,
                                "attribue_code": "tv_size",
                                "attribute_value_id": 1,
                                "attribute_value_name": "40"
                            },
                            {
                                "attribute_id": 2,
                                "attribue_code": "tv_color",
                                "attribute_value_id": 1,
                                "attribute_value_name": "Red"
                            }
                        ],
                        "variant_value": "NO_VARIANT",
                        "sku_vendor": "1111111",
                        "tier_min_qty_1": 0,
                        "tier_min_qty_2": 0,
                        "tier_min_qty_3": 0,
                        "tier_cogs_price_1": 0,
                        "tier_cogs_price_2": 0,
                        "tier_cogs_price_3": 0,
                        "stock": 1,
                        "primary_image": "http://localhost/testing/testing_image.jpg",
                        "additional_images": [
                            "http://localhost/testing/testing_image.jpg",
                            "http://localhost/testing/testing_image.jpg"
                        ],
                        "warehouse_id": 1,
                        "location_label": "Jakarta",
                        "reference_links": [
                            "google.com",
                            "amazon.com"
                        ],
                        "warranty_option": "official_warranty",
                        "warranty_period": "month",
                        "warranty_limit": 1,
                        "is_indent": 0,
                        "indent_period": "week",
                        "indent_limit": 2
                    },
                    {
                        "variants": [
                            {
                                "attribute_id": 1,
                                "attribute_value_id": 1,
                                "attribute_value_name": "40",
                                "attribute_code": "tv_size"
                            },
                            {
                                "attribute_id": 2,
                                "attribute_value_id": 1,
                                "attribute_value_name": "Black",
                                "attribute_code": "tv_color"
                            }
                        ],
                        "variant_value": "NO_VARIANT",
                        "sku_vendor": "1111111",
                        "tier_min_qty_1": 0,
                        "tier_min_qty_2": 0,
                        "tier_min_qty_3": 0,
                        "tier_cogs_price_1": 0,
                        "tier_cogs_price_2": 0,
                        "tier_cogs_price_3": 0,
                        "stock": 1,
                        "primary_image": "http://localhost/testing/testing_image.jpg",
                        "additional_images": [
                            "http://localhost/testing/testing_image.jpg",
                            "http://localhost/testing/testing_image.jpg"
                        ],
                        "warehouse_id": 1,
                        "location_label": "Jakarta",
                        "reference_links": [
                            "google.com",
                            "amazon.com"
                        ],
                        "warranty_option": "official_warranty",
                        "warranty_period": "month",
                        "warranty_limit": 1,
                        "is_indent": 0,
                        "indent_period": "week",
                        "indent_limit": 2
                    }
                ],
                "specifications": []
            },
            "premoderation_status": "need_revision",
            "vendor_id": "16",
            "created_by": 11,
            "created_at": "2017-12-22T09:18:56.601Z",
            "updated_at": "2017-12-22T09:18:56.601Z"
        }
    );
    t.context.sandbox.stub(PremoderationLogRepository, 'insertReject').resolves({
        "data": {
            "premoderation_id": "1513934336601",
            "created_at": "2017-12-25T17:01:34.056Z",
            "updated_at": "2017-12-25T17:01:34.056Z"
        }
    });

    try {
        let context = require('../../../mocks/context.json');
        const data = {
            "path": {
                "id": "1513934336601"
            },
            "body": {
                "status": "revision_inprogress",
                "reject_reasons": {
                    "product_data": "Nama Produk Tidak Sesuai Image",
                    "sku_list": "Data SKU Produk tidak okeh",
                    "product_specification": "Spesifikasi banyak yang tertukar",
                    "description": "Deskripsi kurang lengkap",
                    "product_details": "Berat Produk Tidak Sesuai",
                    "package_dimension": "Dimensi tidak masuk akal",
                    "warranty": "harap masukkan warranty",
                    "totally_reject": ""
                }
            }
        }

        const result = yield Methods.putPremoderationReject(data, context);
        const expected = {
            "data": {
                "id": result.data.id,
                "status": "revision_inprogress",
                "premoderation_id": "1513934336601",
                "created_at": result.data.created_at,
                "updated_at": result.data.updated_at
            }
        }

        t.deepEqual(result, expected);
    } catch(err) {
        console.log(err.message);
    }
});

test.serial('Shoul be return Bad Request', function*(t) {
    try {
        let context = require('../../../mocks/context.json');
        const data = {
            "path": {
                "id": 10
            },
            "body": {
                "status": "rejected",
                "reject_reasons": {
                    "product_data" : "", 
                    "sku_list" : "", 
                    "product_specification" : "", 
                    "description" : "", 
                    "product_details" : "", 
                    "package_dimension" : "", 
                    "warranty" : "", 
                    "totally_reject" : "Barang Ilegal"
                }
            }
        }

        yield Methods.putPremoderationReject(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch(err) {
        t.true(err instanceof BizzyError.BadRequest, 'The Error Type is Incorrect');
    }
});

test.serial('Shoul be return Not Found', function*(t) {
    t.context.sandbox.stub(PremoderationRepository, 'update').resolves({});
    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves(null);
    t.context.sandbox.stub(PremoderationLogRepository, 'insertReject').resolves({});
    try {
        let context = require('../../../mocks/context.json');
        const data = {
            "path": {
                "id": "101"
            },
            "body": {
                "status": "rejected",
                "reject_reasons": {
                    "product_data" : "", 
                    "sku_list" : "", 
                    "product_specification" : "", 
                    "description" : "", 
                    "product_details" : "", 
                    "package_dimension" : "", 
                    "warranty" : "", 
                    "totally_reject" : "Barang Ilegal"
                }
            }
        }

        yield Methods.putPremoderationReject(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch(err) {
        t.true(err instanceof BizzyError.NotFound, 'Premoderation Product Not Found');
    }
});

test.serial('You are not authorized user: Should be return Forbidden', function*(t) {
    try {
        let context = {
            user: ""
        }
        const data = {
            "path": {
                "id": "101"
            },
            "body": {
                "status": "rejected",
                "reject_reasons": {
                    "product_data" : "", 
                    "sku_list" : "", 
                    "product_specification" : "", 
                    "description" : "", 
                    "product_details" : "", 
                    "package_dimension" : "", 
                    "warranty" : "", 
                    "totally_reject" : "Barang Ilegal"
                }
            }
        }
        yield Methods.putPremoderationReject(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch(err) {
        t.true(err instanceof BizzyError.Forbidden, 'You are not authorized user');
    }
});



test.serial('Product status cannot be processed: Should be return BizzyError.BadRequest', function*(t) {
    t.context.sandbox.stub(PremoderationRepository, 'update').resolves({});
    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves(
        {
            "_id": "5a3cce0049a0e0261d2a2eb7",
            "id": "1513934336601",
            "type": "new",
            "payload": {
                "name": "Product Baru",
                "category_id": 1,
                "brand_id": 1,
                "uom_id": 1,
                "stocking_uom_id": 1,
                "quantity_stocking_uom": 10,
                "manufacturing_number": "11111",
                "package_weight": "0",
                "package_length": "0",
                "package_width": "0",
                "package_height": "0",
                "package_content": "lorem ipsum",
                "barcode": "1234",
                "description": "test",
                "reference_link": [],
                "variant_count": 1,
                "variant_matrix": "{1=tv_color|2=tv_size}",
                "products": [
                    {
                        "variants": [
                            {
                                "attribute_id": 1,
                                "attribute_value_id": 1,
                                "attribute_value_name": "50\"",
                                "attribute_code": "tv_size"
                            },
                            {
                                "attribute_id": 2,
                                "attribute_value_id": 1,
                                "attribute_value_name": "Black",
                                "attribute_code": "tv_color"
                            }
                        ],
                        "variant_value": "NO_VARIANT",
                        "sku_vendor": "1111111",
                        "tier_min_qty_1": 0,
                        "tier_min_qty_2": 0,
                        "tier_min_qty_3": 0,
                        "tier_cogs_price_1": 0,
                        "tier_cogs_price_2": 0,
                        "tier_cogs_price_3": 0,
                        "stock": 1,
                        "primary_image": "http://localhost/testing/testing_image.jpg",
                        "additional_images": [
                            "http://localhost/testing/testing_image.jpg",
                            "http://localhost/testing/testing_image.jpg"
                        ],
                        "warehouse_id": 1,
                        "location_label": "Jakarta",
                        "reference_links": [
                            "google.com",
                            "amazon.com"
                        ],
                        "warranty_option": "official_warranty",
                        "warranty_period": "month",
                        "warranty_limit": 1,
                        "is_indent": 0,
                        "indent_period": "week",
                        "indent_limit": 2
                    },
                    {
                        "variants": [
                            {
                                "attribute_id": 1,
                                "attribue_code": "tv_size",
                                "attribute_value_id": 1,
                                "attribute_value_name": "40"
                            },
                            {
                                "attribute_id": 2,
                                "attribue_code": "tv_color",
                                "attribute_value_id": 1,
                                "attribute_value_name": "Red"
                            }
                        ],
                        "variant_value": "NO_VARIANT",
                        "sku_vendor": "1111111",
                        "tier_min_qty_1": 0,
                        "tier_min_qty_2": 0,
                        "tier_min_qty_3": 0,
                        "tier_cogs_price_1": 0,
                        "tier_cogs_price_2": 0,
                        "tier_cogs_price_3": 0,
                        "stock": 1,
                        "primary_image": "http://localhost/testing/testing_image.jpg",
                        "additional_images": [
                            "http://localhost/testing/testing_image.jpg",
                            "http://localhost/testing/testing_image.jpg"
                        ],
                        "warehouse_id": 1,
                        "location_label": "Jakarta",
                        "reference_links": [
                            "google.com",
                            "amazon.com"
                        ],
                        "warranty_option": "official_warranty",
                        "warranty_period": "month",
                        "warranty_limit": 1,
                        "is_indent": 0,
                        "indent_period": "week",
                        "indent_limit": 2
                    },
                    {
                        "variants": [
                            {
                                "attribute_id": 1,
                                "attribute_value_id": 1,
                                "attribute_value_name": "40",
                                "attribute_code": "tv_size"
                            },
                            {
                                "attribute_id": 2,
                                "attribute_value_id": 1,
                                "attribute_value_name": "Black",
                                "attribute_code": "tv_color"
                            }
                        ],
                        "variant_value": "NO_VARIANT",
                        "sku_vendor": "1111111",
                        "tier_min_qty_1": 0,
                        "tier_min_qty_2": 0,
                        "tier_min_qty_3": 0,
                        "tier_cogs_price_1": 0,
                        "tier_cogs_price_2": 0,
                        "tier_cogs_price_3": 0,
                        "stock": 1,
                        "primary_image": "http://localhost/testing/testing_image.jpg",
                        "additional_images": [
                            "http://localhost/testing/testing_image.jpg",
                            "http://localhost/testing/testing_image.jpg"
                        ],
                        "warehouse_id": 1,
                        "location_label": "Jakarta",
                        "reference_links": [
                            "google.com",
                            "amazon.com"
                        ],
                        "warranty_option": "official_warranty",
                        "warranty_period": "month",
                        "warranty_limit": 1,
                        "is_indent": 0,
                        "indent_period": "week",
                        "indent_limit": 2
                    }
                ],
                "specifications": []
            },
            "premoderation_status": "revision_inprogress",
            "vendor_id": "16",
            "created_by": 11,
            "created_at": "2017-12-22T09:18:56.601Z",
            "updated_at": "2017-12-22T09:18:56.601Z"
        }
    );
    t.context.sandbox.stub(PremoderationLogRepository, 'insertReject').resolves({
        "data": {
            "premoderation_id": "1513934336601",
            "created_at": "2017-12-25T17:01:34.056Z",
            "updated_at": "2017-12-25T17:01:34.056Z"
        }
    });

    try {
        let context = require('../../../mocks/context.json');
        const data = {
            "path": {
                "id": "1513934336601"
            },
            "body": {
                "status": "revision_inprogress",
                "reject_reasons": {
                    "product_data": "Nama Produk Tidak Sesuai Image",
                    "sku_list": "Data SKU Produk tidak okeh",
                    "product_specification": "Spesifikasi banyak yang tertukar",
                    "description": "Deskripsi kurang lengkap",
                    "product_details": "Berat Produk Tidak Sesuai",
                    "package_dimension": "Dimensi tidak masuk akal",
                    "warranty": "harap masukkan warranty",
                    "totally_reject": ""
                }
            }
        }

        yield Methods.putPremoderationReject(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch(err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.before('Initialize BizzyError Before All Tests', (t) => {
    BizzyError.initializeErrors();
});

test.beforeEach('Initialize New Sandbox Before Each Test', function*(t) {
    t.context.sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
});

test.afterEach.always('Restore Sandbox and Configuration After Each Test',function*(t) {
    t.context.sandbox.restore();
});