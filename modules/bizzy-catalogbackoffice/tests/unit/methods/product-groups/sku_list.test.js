'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');
const ProductGroupRepository = require('../../../../src/repositories/product_group');
const ProductVariantRepository = require('../../../../src/repositories/product_variant');
const Methods = require('../../../../src/methods/product-groups/sku_list');
const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

test.serial('Should be return SKU List', function*(t) {
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves({
        "id": 3,
        "name": "Epson Tinta Refill Botol",
        "category_id": 507,
        "brand_id": 466,
        "uom_id": 1,
        "stocking_uom_id": 1,
        "quantity_stocking_uom": 1,
        "manufacturing_number": "XXXXX",
        "manufacturing_number_type": null,
        "package_weight": 400,
        "package_length": "100.00",
        "package_width": "200.00",
        "package_height": "40.00",
        "package_content": "loremp ipsum content",
        "barcode": null,
        "description": "lorem ipsum description",
        "primary_image": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium//931/epson_epson-original-t6641---t6644-set-tinta-botol_full02.jpg",
        "variant_count": 1,
        "variant_matrix": "[\"ink_color\"]",
        "status": 1,
        "visibility": 1,
        "created_by": 1,
        "created_at": "2017-12-19T08:43:09.000Z",
        "updated_at": "2017-12-19T08:43:09.000Z"
    });

    t.context.sandbox.stub(ProductVariantRepository, 'findAndCountAll').resolves({
        "count": 1,
        "rows": [
            {
                "id": 2,
                "product_group_id": 3,
                "sku": "345",
                "long_name": "Apple iPhone 7 Black",
                "variant_value": "{\"ink_color\": 9}",
                "primary_image": "image3.jpg",
                "additional_image": "[\"image4.jpg\",\"image2.jpg\",\"image1.jpg\"]",
                "product_id_magento": null,
                "product_id_netsuite": null,
                "is_primary": 0,
                "is_discontinue": 0,
                "is_active": 1,
                "created_at": null,
                "updated_at": "2018-01-02T09:24:39.000Z"
            }
        ]
    });

    try {
        let context = require('../../../mocks/context.json');
        const data = {
            "path": {
                "id": "3"
            }
        }

        const result = yield Methods.getProductGroupSku(data, context);
        const expected = {
            "data": {
                "product_group_id": 3,
                "product_name": "Epson Tinta Refill Botol",
                "skus": [
                    {
                        "id": 2,
                        "sku": "345",
                        "name": "Apple iPhone 7 Black",
                        "is_primary": 0,
                        "is_discontinue": 0,
                        "is_active": 1
                    }
                ]
            }
        }
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Invalid input data: Should be return Bad Request', function*(t) {
    try {
        let context = require('../../../mocks/context.json');
        const data = {
            "path": {
                "id": ""
            }
        }
        yield Methods.getProductGroupSku(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('You are not authorized user: Should be return Forbidden', function*(t) {
    try {
        let context = {}
        context.user = "";
        const data = {
            "path": {
                "id": ""
            }
        }
        yield Methods.getProductGroupSku(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, "You are not authorized user");
    }
});

test.before('Initialize BizzyError Before All Tests', (t) => {
    BizzyError.initializeErrors();
});
test.beforeEach('Initialize New Sandbox Before Each Test', function*(t) {
    t.context.sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
});
test.afterEach.always('Restore Sandbox and Configuration After Each Test', function*(t) {
    t.context.sandbox.restore();
});