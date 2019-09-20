'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
const Repo = require('../../../../src/repositories/stocking_uom');
const Method = require('../../../../src/methods/stocking-uoms/delete');

test.serial('(Delete UomStock) - Should be return array object UomStock', function* (t) {
    t.context.sandbox.stub(Repo, 'findById').resolves(
        { "id": 1, "name": "Unit", 'created_at': '2017-12-05 16:59:10', 'updated_at': null }
    );

    t.context.sandbox.stub(Repo, 'delete').resolves({});

    try {
        let context = require('../../../mocks/context.json');
        const data = {
            path: {
                "id": "1"
            }
        }

        const result = yield Method.deleteUomStock(data, context);
        t.deepEqual(result, '');
    } catch (exc) {
        
    }
});

test.serial('(Delete UomStock) - Try to delete unexits data', function* (t) {
    t.context.sandbox.stub(Repo, 'findById').resolves(
        null
    );

    try {
        let context = require('../../../mocks/context.json');
        const data = {
            path: {
                "id": "99"
            }
        }

        const result = yield Method.deleteUomStock(data, context);
        t.fail(' Doesn\'t Throw an Error');        
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'The Error Type is Incorrect');
    }
});

test.serial('(Delete UomStock) - Try to send invalid params', function* (t) {
    t.context.sandbox.stub(Repo, 'findById').resolves(
        null
    );

    try {
        let context = require('../../../mocks/context.json');
        const data = {
            path: {
                "id": 11
            }
        }

        const result = yield Method.deleteUomStock(data, context);
        t.fail(' Doesn\'t Throw an Error');        
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'The Error Type is Incorrect');
    }
});


test.serial('(Delete UomStock) - If Delete return something', function* (t) {
    t.context.sandbox.stub(Repo, 'findById').resolves(
        { "id": 1, "name": "Unit", 'created_at': '2017-12-05 16:59:10', 'updated_at': null }
    );

    t.context.sandbox.stub(Repo, 'delete').resolves(false);

    try {
        let context = require('../../../mocks/context.json');
        const data = {
            path: {
                "id": "1"
            }
        }

        const result = yield Method.deleteUomStock(data, context);
        t.fail(err);
    } catch (err) {
        t.pass();
    }
});

test.serial('You are not authorized user: Should be return Forbidden', function*(t) {
    try {
        let context = {
            user: ""
        }
        const data = {
            path: {
                "id": "1"
            }
        }
        yield Method.deleteUomStock(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch(err) {
        t.true(err instanceof BizzyError.Forbidden, 'You are not authorized user');
    }
});

test.before('Initialize BizzyError Before All Tests', (t) => {
    BizzyError.initializeErrors();
});

test.beforeEach('Initialize New Sandbox Before Each Test', (t) => {
    t.context.sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
});

test.afterEach.always('Restore Sandbox and Configuration After Each Test', (t) =>{
    t.context.sandbox.restore();
});