'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const test = require('ava');
const sinon = require('sinon');
const dir = "../../../../";
const ProductLogRepository = require(dir+'src/repositories/product_log');
const Method = require(dir+'src/methods/products/history');
const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

test.serial('Should be return list of history', function* (t) {
    t.context.sandbox.stub(ProductLogRepository, 'findAll').resolves([{
        "_id": "5a5de830f526fc0001275fe8",
        "action": "putProduct",
        "title": "Ubah Stock Produk",
        "product_group_id": 3,
        "product_variant_id": 3,
        "product_vendor_id": 3,
        "payload": {
            "field": "stock_available",
            "before": 220,
            "after": 100
        },
        "user": {
            "id": 3,
            "name": "Bambang Widodo",
            "email": "vendor2@test.com",
            "type": "vendor"
        },
        "created_at": "2018-01-06T11:08:05.000Z",
        "updated_at": "2018-01-16T11:55:28.000Z"
    }]);
    t.context.sandbox.stub(ProductLogRepository, 'count').resolves(51);

    try {
        let context = require('../../../mocks/context.json');
        let data = {
            "path": {
                "id": "3",
                "pid":"3"
            },
            "query":{
                "page": "1",
                "limit": "1"
            }        
        };

        let result = yield Method.getProductHistory(data, context);
        let expect = {
            "data": [
                {
                    "_id": "5a5de830f526fc0001275fe8",
                    "title": "Ubah Stock Produk",
                    "before": 220,
                    "after": 100,
                    "user": {
                        "id": 3,
                        "name": "Bambang Widodo",
                        "email": "vendor2@test.com",
                        "type": "vendor"
                    },
                    "created_at": "2018-01-06T11:08:05.000Z",
                    "updated_at": "2018-01-16T11:55:28.000Z"
                }
            ],
            "meta": {
                "page": 1,
                "limit": 1,
                "total_data": 51,
                "total_page": 51
            }
        };
        t.deepEqual(result, expect);
    } catch (err) {
        console.log(err);
    }
});

test.serial('Should be return list empty of history', function* (t) {
    t.context.sandbox.stub(ProductLogRepository, 'findAll').resolves(null);
    t.context.sandbox.stub(ProductLogRepository, 'count').resolves(51);

    try {
        let context = require('../../../mocks/context.json');
        let data = {
            "path": {
                "id": "3",
                "pid":"3"
            },
            "query":{
                "page": "1",
                "limit": "1"
            }        
        };

        let result = yield Method.getProductHistory(data, context);
        let expect = {
            "data": [],
            "meta": {
                "page": 1,
                "limit": 1,
                "total_data": 0,
                "total_page": 1
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
        let data = {
            "path": {
                "id": "3",
                "pid":"3"
            },
            "query":{
                "page": "1",
                "limit": "1"
            }        
        };

        yield Method.getProductHistory(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, err.message);
    }
});

test.serial('Invalid Params: Should Throw BizzyError BadRequest', function* (t) {
    try {
        let context = require('../../../mocks/context.json');
        let data = {
            "path": {
                "id": "3",
                "pid":""
            },
            "query":{
                "page": "1",
                "limit": "1"
            }        
        };

        yield Method.getProductHistory(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err. message);
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