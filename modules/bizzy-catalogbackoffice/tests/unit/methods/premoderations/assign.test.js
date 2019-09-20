'use strict';

const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');
const PremoderationRepository = require('../../../../src/repositories/premoderation');
const Methods = require('../../../../src/methods/premoderations/assign');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

test.serial('Should be return Premoderation Assign', function*(t) {
    t.context.sandbox.stub(PremoderationRepository, 'findById').resolves({});
    t.context.sandbox.stub(PremoderationRepository, 'updateAssign').resolves(
        {
            "ok": 1,
            "nModified": 0,
            "n": 2
        }
    );
    try {
        let context = require('../../../mocks/context.json');
        const data = {
            "body": {
                "assign": {
                    "id": 73,
                    "name": "Fathkurozaq BS",
                    "email": "fatkhurozaq.budi@bizzy.co.id",
                    "type": "employee"
                },
                "products": [
                    "1513934336602",
                    "1513934336603"
                ]
            }
        }

        const result = yield Methods.postPremoderationAssign(data, context);
        const expected = {
            "data": {
                "id": [
                    "1513934336602",
                    "1513934336603"
                ],
                "assign": {
                    "id": 73,
                    "name": "Fathkurozaq BS",
                    "email": "fatkhurozaq.budi@bizzy.co.id",
                    "type": "employee"
                }
            }
        }

        t.deepEqual(result, expected);
    } catch(err) {
        console.log(err.message);
    }
});

test.serial('Should be return bad request', function*(t) {
    try {
        let context = require('../../../mocks/context.json');
        const data = {
            "body": {
                "assign_to": "",
                "products": [
                    "1513934336602",
                    "1513934336603"
                ]
            }
        }
        yield Methods.postPremoderationAssign(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch(err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Should be return Not Found', function*(t) {
    t.context.sandbox.stub(PremoderationRepository, 'findById').resolves(null);
    try {
        let context = require('../../../mocks/context.json');
        const data = {
            "body": {
                "assign": {
                    "id": "73",
                    "name": "Fathkurozaq BS",
                    "email": "fatkhurozaq.budi@bizzy.co.id",
                    "type": "employee"
                },
                "products": [
                    "1513934336610",
                    "1513934336615"
                ]
            }
        }
        yield Methods.postPremoderationAssign(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'Premoderation Product Not Found');
    }
});

test.serial('You are not authorized user: Should be return Forbidden', function*(t) {
    try {
        let context = {
            user: ""
        }
        const data = {
            "body": {
                "assign_to": "10",
                "products": [
                    "1513934336610",
                    "1513934336615"
                ]
            }
        }
        yield Methods.postPremoderationAssign(data, context);
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