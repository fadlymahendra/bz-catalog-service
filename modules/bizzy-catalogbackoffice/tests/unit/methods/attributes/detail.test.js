'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
const RepoAttributeCode = require('../../../../src/repositories/attribute_code');
const Method = require('../../../../src/methods/attributes/detail');

test.serial('Should return attribute Detail', function* (t) {
    t.context.sandbox.stub(RepoAttributeCode, 'findAttributeValue').resolves({
            id: 1,
            code: 'phone_color',
            label: 'Warna',
            type: 'dropdown',
            AttributeValues: [
                {
                    id: 1,
                    attribute_code_id: 1,
                    value: 'Silver'
                }
            ]
        });

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1'
            }
        };
        const result = yield Method.getAttributeById(data, context);
        const expected = {
            id: 1,
            code: 'phone_color',
            label: 'Warna',
            type: 'dropdown',
            values: [
                {
                    id: 1,
                    value: 'Silver'
                }
            ]
        };

        t.deepEqual(result, expected);
    } catch (exc) {
        console.log(exc.message);
    }
});

test.serial('Try to Send invalid params', function* testCase(t) {
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: ''
            }
        };

        yield Method.getAttributeById(data, context);
        t.fail(' Doesn\'t Throw an Error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'The Error Type is Incorrect');
    }
});

test.serial(' Try to get detail unexits data', function* testCase(t) {
    t.context.sandbox.stub(RepoAttributeCode, 'findAttributeValue').resolves(false);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '99'
            }
        };

        yield Method.getAttributeById(data, context);
        t.fail(' Doesn\'t Throw an Error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'The Error Type is Incorrect');
    }
});

test.serial('You are not authorized user: Should be return Forbidden', function* (t) {
    try {
        const context = {
            user: ''
        };
        const data = {
            path: {
                id: '99'
            }
        };
        yield Method.getAttributeById(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
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
