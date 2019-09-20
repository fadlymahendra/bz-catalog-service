'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');
const Methods = require('../../../src/methods/filter_catman');
const skuMappingRepo = require('../../../src/repositories/product_sku_mapping');

// catalog detail
test.serial('getCatalogDetailMapping: Should return success with data', function* (t) {
    try {
        const context = require('../../../tests/mocks/context.json');
        const data = {
            query :{
                mapped : ""
            },
            path: {
                catalog_id: "5b607de4ca18f0671560caef"
            }
        };

        t.context.sandbox.stub(skuMappingRepo, 'findAllMappingNoPaging').resolves([
            {
                "product_sku": "93VN03AVNO",
                "payload": {
                    "catalog_id": "5b607de4ca18f0671560caef",
                    "organization_id": 308,
                    "material_code": "101",
                    "material_group": "100",
                    "mapped": 1,
                    "uom": "UN",
                    "quantity_stocking_uom": 1
                }
            },
            {
                "product_sku": "TRG8QVK5SI",
                "payload": {
                    "catalog_id": "5b607de4ca18f0671560caef",
                    "organization_id": 308,
                    "material_code": "",
                    "material_group": "",
                    "mapped": 0,
                    "uom": "0",
                    "quantity_stocking_uom": 0
                }
            },
            {
                "product_sku": "35GFZYNF2H",
                "payload": {
                    "catalog_id": "5b607de4ca18f0671560caef",
                    "organization_id": 308,
                    "material_code": "",
                    "material_group": "",
                    "mapped": 0,
                    "uom": "0",
                    "quantity_stocking_uom": 0
                }
            }]);

        const result = yield Methods.getCatalogDetailMapping(data, context);

        const expected = {
            message: "success",
            data: ['93VN03AVNO', 'TRG8QVK5SI', '35GFZYNF2H'],
            meta: {}
        };
        t.deepEqual(result.data, expected.data);
        t.deepEqual(result.message, expected.message);
    } catch (err) {
        t.fail('should return success')
    }
});

test.serial('getCatalogDetailMapping: Should return success with no data', function* (t) {
    try {
        const context = require('../../../tests/mocks/context.json');
        const data = {
            query :{
                mapped : 1
            },
            path: {
                catalog_id: "5b607de4ca18f0671560caef"
            }
        };

        t.context.sandbox.stub(skuMappingRepo, 'findAllMappingNoPaging').resolves([]);

        const result = yield Methods.getCatalogDetailMapping(data, context);

        const expected = {
            message: "success",
            data: [],
            meta: {}
        };
        t.deepEqual(result.data, expected.data);
        t.deepEqual(result.message, expected.message);
    } catch (err) {
        t.fail('should return success')
    }
});

test.serial('getCatalogDetailMapping: Should return Error Authorization', function* (t) {
    try {
        const context = {};
        const data = {
            query :{
                mapped : 1
            },
            path: {
                catalog_id: "5b607de4ca18f0671560caef"
            }
        };


        yield Methods.getCatalogDetailMapping(data, context);
        t.fail('should return error')
    } catch (err) {
        t.deepEqual('You are not authorized user', err.message);
    }
});

test.serial('getCatalogDetailMapping: Should return Error request validation', function* (t) {
    try {
        const context = require('../../../tests/mocks/context.json');
        const data = {
            query :{
                mapped : ""
            },
            path: {
            }
        };


        yield Methods.getCatalogDetailMapping(data, context);
        t.fail('should return error')
    } catch (err) {
        t.deepEqual('child catalog_id fails because [catalog_id is required]', err.message);
    }
});

test.serial('getCatalogDetailMapping: Should return Error request query validation', function* (t) {
    try {
        const context = require('../../../tests/mocks/context.json');
        const data = {
            query :{
                mapped : "abc"
            },
            path: {
                catalog_id: 'abc'
            }
        };


        yield Methods.getCatalogDetailMapping(data, context);
        t.fail('should return error')
    } catch (err) {
        t.deepEqual('child mapped fails because [mapped must be a number]', err.message);
    }
});

//catalog group
test.serial('getCatalogGroupMapping: Should return success with data', function* (t) {
    try {
        const context = require('../../../tests/mocks/context.json');
        const data = {
            query :{
                catalog_ids : "5b6829b46f95b1d3f0a8e38b,5b6829324490ebc3525c971d",
                mapped: ""
            },
            path: {
                group_id: 1
            }
        };

        t.context.sandbox.stub(skuMappingRepo, 'findAllByCatalogIds').resolves([
            {
                "product_sku": "93VN03AVNO",
                "payload": {
                    "catalog_id": "5b607de4ca18f0671560caef",
                    "organization_id": 308,
                    "material_code": "101",
                    "material_group": "100",
                    "mapped": 1,
                    "uom": "UN",
                    "quantity_stocking_uom": 1
                }
            },
            {
                "product_sku": "TRG8QVK5SI",
                "payload": {
                    "catalog_id": "5b607de4ca18f0671560caef",
                    "organization_id": 308,
                    "material_code": "",
                    "material_group": "",
                    "mapped": 0,
                    "uom": "0",
                    "quantity_stocking_uom": 0
                }
            },
            {
                "product_sku": "35GFZYNF2H",
                "payload": {
                    "catalog_id": "5b607de4ca18f0671560caef",
                    "organization_id": 308,
                    "material_code": "",
                    "material_group": "",
                    "mapped": 0,
                    "uom": "0",
                    "quantity_stocking_uom": 0
                }
            }]);

        const result = yield Methods.getCatalogGroupMapping(data, context);

        const expected = {
            message: "success",
            data: ['93VN03AVNO', 'TRG8QVK5SI', '35GFZYNF2H'],
            meta: {}
        };
        t.deepEqual(result.data, expected.data);
        t.deepEqual(result.message, expected.message);
    } catch (err) {
        t.fail('should return success')
    }
});

test.serial('getCatalogGroupMapping: Should return success with no data', function* (t) {
    try {
        const context = require('../../../tests/mocks/context.json');
        const data = {
            query :{
                catalog_ids : "5b6829b46f95b1d3f0a8e38b,5b6829324490ebc3525c971d",
                mapped: 1
            },
            path: {
                group_id: 1
            }
        };

        t.context.sandbox.stub(skuMappingRepo, 'findAllByCatalogIdsMapped').resolves([]);

        const result = yield Methods.getCatalogGroupMapping(data, context);

        const expected = {
            message: "success",
            data: []
        };
        t.deepEqual(result.data, expected.data);
        t.deepEqual(result.message, expected.message);
    } catch (err) {
        t.fail('should return success')
    }
});

test.serial('getCatalogGroupMapping: Should return Error Authorization', function* (t) {
    try {
        const context = {};
        const data = {
            query :{
                mapped : 1
            },
            path: {
                catalog_ids: "5b607de4ca18f0671560caef"
            }
        };


        yield Methods.getCatalogGroupMapping(data, context);
        t.fail('should return error')
    } catch (err) {
        t.deepEqual('You are not authorized user', err.message);
    }
});

test.serial('getCatalogGroupMapping: Should return Error request validation', function* (t) {
    try {
        const context = require('../../../tests/mocks/context.json');
        const data = {
            query :{
                mapped : "",
                catalog_ids: "abcd"
            },
            path: {
            }
        };


        yield Methods.getCatalogGroupMapping(data, context);
        t.fail('should return error')
    } catch (err) {
        t.deepEqual('child group_id fails because [group_id is required]', err.message);
    }
});

test.serial('getCatalogGroupMapping: Should return Error request query validation', function* (t) {
    try {
        const context = require('../../../tests/mocks/context.json');
        const data = {
            query :{
                mapped: ""
            },
            path: {
                group_id: 1
            }
        };


        yield Methods.getCatalogGroupMapping(data, context);
        t.fail('should return error')
    } catch (err) {
        t.deepEqual('child catalog_ids fails because [catalog_ids is required]', err.message);
    }
});

//all sku
test.serial('getAllCatalogMapping: Should return success with data', function* (t) {
    try {
        const context = require('../../../tests/mocks/context.json');
        const data = {};

        t.context.sandbox.stub(skuMappingRepo, 'findAllMappingNoPaging').resolves([
            {
                "product_sku": "93VN03AVNO",
                "payload": {
                    "catalog_id": "5b607de4ca18f0671560caef",
                    "organization_id": 308,
                    "material_code": "101",
                    "material_group": "100",
                    "mapped": 1,
                    "uom": "UN",
                    "quantity_stocking_uom": 1
                }
            },
            {
                "product_sku": "TRG8QVK5SI",
                "payload": {
                    "catalog_id": "5b607de4ca18f0671560caef",
                    "organization_id": 308,
                    "material_code": "",
                    "material_group": "",
                    "mapped": 0,
                    "uom": "0",
                    "quantity_stocking_uom": 0
                }
            },
            {
                "product_sku": "35GFZYNF2H",
                "payload": {
                    "catalog_id": "5b607de4ca18f0671560caef",
                    "organization_id": 308,
                    "material_code": "",
                    "material_group": "",
                    "mapped": 0,
                    "uom": "0",
                    "quantity_stocking_uom": 0
                }
            }]);

        const result = yield Methods.getAllCatalogMapping(data, context);

        const expected = {
            message: "success",
            data: ['93VN03AVNO', 'TRG8QVK5SI', '35GFZYNF2H'],
            meta: {}
        };
        t.deepEqual(result.data, expected.data);
        t.deepEqual(result.message, expected.message);
    } catch (err) {
        t.fail('should return success')
    }
});

test.serial('getAllCatalogMapping: Should return success with no data', function* (t) {
    try {
        const context = require('../../../tests/mocks/context.json');
        const data = {};

        t.context.sandbox.stub(skuMappingRepo, 'findAllMappingNoPaging').resolves([]);

        const result = yield Methods.getAllCatalogMapping(data, context);

        const expected = {
            message: "success",
            data: [],
            meta: {}
        };
        t.deepEqual(result.data, expected.data);
        t.deepEqual(result.message, expected.message);
    } catch (err) {
        t.fail('should return success')
    }
});

test.serial('getCatalogGroupMapping: Should return Error Authorization', function* (t) {
    try {
        const context = {};
        const data = {
            query :{
                mapped : 1
            },
            path: {
                catalog_id: "5b607de4ca18f0671560caef"
            }
        };


        yield Methods.getAllCatalogMapping(data, context);
        t.fail('should return error')
    } catch (err) {
        t.deepEqual('You are not authorized user', err.message);
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
