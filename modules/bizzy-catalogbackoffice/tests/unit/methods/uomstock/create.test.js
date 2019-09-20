'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
const Repo = require('../../../../src/repositories/stocking_uom');
const Method = require('../../../../src/methods/stocking-uoms/create');

test.serial('(Create UomStock) - Should be return array object UomStock', function* testCase(t) {
    t.context.sandbox.stub(Repo, 'findOrCreate').resolves(
        [
            { "id": 999, "name": "Unit", 'created_at': '2017-12-05 16:59:10', 'updated_at': '2017-12-05 16:59:10' }
        ]
    );

    try {
        let context = require('../../../mocks/context.json');
        const data = {
            body: {
                "name": "Unit"
            }
        }
        const model = Method;
        const result = yield model.postUomStock(data, context);
        const expected = {
            data: {
                id: 999,
                name: 'Unit',
                created_at: '2017-12-05 16:59:10',
                updated_at: '2017-12-05 16:59:10'
            }
        };

        t.deepEqual(result, expected);
    } catch (exc) {

    }
});

test.serial('(Create UomStock) - Try to catch Joi (String required not Integer)', function* testCase(t) {

    try {
        let context = require('../../../mocks/context.json');
        const data = {
            body: {
                "name": ""
            }
        }

        const result = yield Method.postUomStock(data, context);
        t.fail(' Doesn\'t Throw an Error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'The Error Type is Incorrect');
    }
});

test.serial('(Create UomStock) - Try to Post Exist Data', function* testCase(t) {
    t.context.sandbox.stub(Repo, 'findOrCreate').resolves(
        [{}, false]
    );

    try {
        let context = require('../../../mocks/context.json');
        const data = {
            body: {
                "name": "Units"
            }
        }

        const result = yield Method.postUomStock(data, context);
        t.fail(' Doesn\'t Throw an Error');        
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'The Error Type is Incorrect');
    }
});

test.serial('You are not authorized user: Should be return Forbidden', function* (t) {
    try {
        let context = {
            user: ""
        }
        const data = {
            body: {
                "name": "Units"
            }
        }
        yield Method.postUomStock(data, context);
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

test.afterEach.always('Restore Sandbox and Configuration After Each Test', (t) => {
    t.context.sandbox.restore();
});