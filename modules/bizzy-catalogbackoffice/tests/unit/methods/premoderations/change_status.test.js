'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');
const PremoderationRepository = require('../../../../src/repositories/premoderation');
const PremoderationLogRepository = require('../../../../src/repositories/premoderation_log');
const Methods = require('../../../../src/methods/premoderations/change_status');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

test.serial('Should be return Change Status', function*(t) {
    t.context.sandbox.stub(PremoderationRepository, 'update').resolves({
        "ok": 1,
        "nModified": 1,
        "n": 1
    });
    t.context.sandbox.stub(PremoderationLogRepository, 'insertReject').resolves({});
    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves({
        "_id": "5a462aed8246630001295510",
        "id": "1514547949639",
        "type": "new",
        "payload": {
            "name": "Coba tanpa garansi",
            "category_id": 313,
            "category": {
                "c0": 2,
                "c1": 18,
                "c2": 107,
                "c3": 313
            },
            "brand_id": 658,
            "uom_id": 2,
            "stocking_uom_id": 2,
            "quantity_stocking_uom": 1,
            "manufacturing_number": "",
            "package_weight": "10",
            "package_length": "10",
            "package_height": "10",
            "package_width": "10",
            "package_content": "",
            "barcode": "",
            "description": "<p>minimal 30 chakaraktakskeawekoaeo</p>",
            "variant_count": 1,
            "variant_matrix": "KOSONGDL",
            "products": [
                {
                    "variants": [],
                    "variant_value": "NO_VARIANT",
                    "sku_vendor": "ini ga wajib lhoo",
                    "tier_min_qty_1": 1,
                    "tier_min_qty_2": 5,
                    "tier_min_qty_3": 10,
                    "tier_cogs_price_1": 10000,
                    "tier_cogs_price_2": 9000,
                    "tier_cogs_price_3": 8900,
                    "stock": 12,
                    "primary_image": "https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514482593.png",
                    "additional_images": [],
                    "warehouse_id": 1,
                    "location_label": "Jakarta selatan",
                    "reference_links": [],
                    "warranty_option": "official_warranty",
                    "warranty_period": "week",
                    "warranty_limit": 1,
                    "is_indent": 0,
                    "indent_period": "",
                    "indent_limit": 0
                }
            ]
        },
        "premoderation_status": "revision_inprogress",
        "vendor_id": 196,
        "created_by": 204,
        "created_at": "2017-12-29T11:45:49.639Z",
        "updated_at": "2017-12-29T11:45:49.639Z"
    });

    try {
        let context = require('../../../mocks/context.json');
        const data = {
            "path": {
                "id": "1514547949639"
            }
        }

        const result = yield Methods.putPremoderationStatus(data, context);
        const expected = {
            "data": {
                "id": "5a462aed8246630001295510",
                "premoderation_status": "revision_inprogress",
                "premoderation_id": "1514547949639",
                "created_at": "2017-12-29T11:45:49.639Z",
                "updated_at": "2017-12-29T11:45:49.639Z"
            }
        }

        t.deepEqual(result, expected);
    } catch(err) {
        console.log(err.message);
    }
});

test.serial('Should be return Change Status Bad Request', function*(t) {
    t.context.sandbox.stub(PremoderationRepository, 'update').resolves({});
    t.context.sandbox.stub(PremoderationLogRepository, 'insertReject').resolves({});
    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves({
        "_id": "5a462aed8246630001295510",
        "id": "1514547949639",
        "type": "new",
        "payload": {
            "name": "Coba tanpa garansi",
            "category_id": 313,
            "category": {
                "c0": 2,
                "c1": 18,
                "c2": 107,
                "c3": 313
            },
            "brand_id": 658,
            "uom_id": 2,
            "stocking_uom_id": 2,
            "quantity_stocking_uom": 1,
            "manufacturing_number": "",
            "package_weight": "10",
            "package_length": "10",
            "package_height": "10",
            "package_width": "10",
            "package_content": "",
            "barcode": "",
            "description": "<p>minimal 30 chakaraktakskeawekoaeo</p>",
            "variant_count": 1,
            "variant_matrix": "KOSONGDL",
            "products": [
                {
                    "variants": [],
                    "variant_value": "NO_VARIANT",
                    "sku_vendor": "ini ga wajib lhoo",
                    "tier_min_qty_1": 1,
                    "tier_min_qty_2": 5,
                    "tier_min_qty_3": 10,
                    "tier_cogs_price_1": 10000,
                    "tier_cogs_price_2": 9000,
                    "tier_cogs_price_3": 8900,
                    "stock": 12,
                    "primary_image": "https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514482593.png",
                    "additional_images": [],
                    "warehouse_id": 1,
                    "location_label": "Jakarta selatan",
                    "reference_links": [],
                    "warranty_option": "official_warranty",
                    "warranty_period": "week",
                    "warranty_limit": 1,
                    "is_indent": 0,
                    "indent_period": "",
                    "indent_limit": 0
                }
            ]
        },
        "premoderation_status": "revision_inprogress",
        "vendor_id": 196,
        "created_by": 204,
        "created_at": "2017-12-29T11:45:49.639Z",
        "updated_at": "2017-12-29T11:45:49.639Z"
    });
    
    try {
        let context = require('../../../mocks/context.json');
        const data = {
            "path": {
                "id": ""
            }
        }

        yield Methods.putPremoderationStatus(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch(err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Should be return Change Status Bad Request Status', function*(t) {
    t.context.sandbox.stub(PremoderationRepository, 'update').resolves({});
    t.context.sandbox.stub(PremoderationLogRepository, 'insertReject').resolves({});
    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves({
        "_id": "5a462aed8246630001295510",
        "id": "1514547949639",
        "type": "new",
        "payload": {
            "name": "Coba tanpa garansi",
            "category_id": 313,
            "category": {
                "c0": 2,
                "c1": 18,
                "c2": 107,
                "c3": 313
            },
            "brand_id": 658,
            "uom_id": 2,
            "stocking_uom_id": 2,
            "quantity_stocking_uom": 1,
            "manufacturing_number": "",
            "package_weight": "10",
            "package_length": "10",
            "package_height": "10",
            "package_width": "10",
            "package_content": "",
            "barcode": "",
            "description": "<p>minimal 30 chakaraktakskeawekoaeo</p>",
            "variant_count": 1,
            "variant_matrix": "KOSONGDL",
            "products": [
                {
                    "variants": [],
                    "variant_value": "NO_VARIANT",
                    "sku_vendor": "ini ga wajib lhoo",
                    "tier_min_qty_1": 1,
                    "tier_min_qty_2": 5,
                    "tier_min_qty_3": 10,
                    "tier_cogs_price_1": 10000,
                    "tier_cogs_price_2": 9000,
                    "tier_cogs_price_3": 8900,
                    "stock": 12,
                    "primary_image": "https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514482593.png",
                    "additional_images": [],
                    "warehouse_id": 1,
                    "location_label": "Jakarta selatan",
                    "reference_links": [],
                    "warranty_option": "official_warranty",
                    "warranty_period": "week",
                    "warranty_limit": 1,
                    "is_indent": 0,
                    "indent_period": "",
                    "indent_limit": 0
                }
            ]
        },
        "premoderation_status": "need_revision",
        "vendor_id": 196,
        "created_by": 204,
        "created_at": "2017-12-29T11:45:49.639Z",
        "updated_at": "2017-12-29T11:45:49.639Z"
    });
    
    try {
        let context = require('../../../mocks/context.json');
        const data = {
            "path": {
                "id": "1514547949639"
            }
        }

        yield Methods.putPremoderationStatus(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch(err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Should be return Change Status: Premoderation Product Not Found', function*(t) {
    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves(null);
    
    try {
        let context = require('../../../mocks/context.json');
        const data = {
            "path": {
                "id": "12345"
            }
        }

        yield Methods.putPremoderationStatus(data, context);
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
                "id": "12345"
            }
        }
        yield Methods.putPremoderationStatus(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch(err) {
        t.true(err instanceof BizzyError.Forbidden, 'You are not authorized user');
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