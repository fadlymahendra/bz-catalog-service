'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');
const StockingUomRepository = require('../../../src/repositories/stocking_uom');
const Methods = require('../../../src/methods/stocking_uom');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

test.serial('Should be return Stocking Uom List', function*(t) {
    t.context.sandbox.stub(StockingUomRepository, 'findAll').resolves(
        [
            { 'id': 1, "name": "Box" }
        ]
    );

    try {
        let context = require('../../mocks/context.json');
        const data = {
        }

        const result = yield Methods.getStockingUom(data, context);
        const expected = {
            data: [
                {
                    "id": 1,
                    "name": "Box"
                }
            ]
        }
        t.deepEqual(result, expected);
    } catch(err) {
        console.log(err.message);
    }
});

test.serial('Should be return authorized user', function*(t) {
    try {
        let context = {
            user: ""
        };
        const data = {}

        yield Methods.getStockingUom(data, context);
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