'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');
const ProductLogRepository = require('../../../../src/repositories/product_log');
const Methods = require('../../../../src/methods/product-groups/history');
const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

test.serial('Should be return History List', function*(t) {
    t.context.sandbox.stub(ProductLogRepository, 'findAll').resolves([{
        "_id": "5a4b486b3702be84313137a0",
        "action": "putProductGroupSku",
        "title": "Add SKU",
        "product_group_id": 3,
        "payload": {},
        "user": {
            "id": 2,
            "name": "Admin Bizzy",
            "email": "admin@bizzy.co.id",
            "type": "employee"
        },
        "created_at": "1970-01-01T00:00:00.000Z",
        "updated_at": "2018-01-02T08:52:59.000Z"
    }]);

    try {
        let context = require('../../../mocks/context.json');
        const data = {
            "path": {
                "id": "3"
            }
        }

        const result = yield Methods.getProductGroupHistory(data, context);
        const expected = {
            "data": [
                {
                    "created_at": "1970-01-01T00:00:00.000Z",
                    "title": "Add SKU",
                    "user": "Admin Bizzy"
                }
            ]
        }
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return History List Empty', function*(t) {
    t.context.sandbox.stub(ProductLogRepository, 'findAll').resolves([]);

    try {
        let context = require('../../../mocks/context.json');
        const data = {
            "path": {
                "id": "3"
            }
        }

        const result = yield Methods.getProductGroupHistory(data, context);
        const expected = {
            "data": [
            ]
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
        yield Methods.getProductGroupHistory(data, context);
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
        yield Methods.getProductGroupHistory(data, context);
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