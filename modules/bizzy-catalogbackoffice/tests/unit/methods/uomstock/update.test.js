'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
const Repo = require('../../../../src/repositories/stocking_uom');
const Method = require('../../../../src/methods/stocking-uoms/update');

test.serial('(Update UomStock) - Update UomStock with successfull response', function* (t) {
    t.context.sandbox.stub(Repo, 'findById').resolves(
        { "id": "1", "name": "Dozen", 'created_at': '2017-12-05 16:59:10', 'updated_at': null }
    );

    t.context.sandbox.stub(Repo, 'findByName').resolves(
        
    );

    t.context.sandbox.stub(Repo, 'update').resolves(
        {"id":1, "name":"Unit", 'created_at':'2017-12-05 16:59:10', 'updated_at':null}
    );

    const expected = {
        data: {
            id: "1",
            name: 'Dozen',
            created_at: '2017-12-05 16:59:10',
            updated_at: null
        }
    };

    try {
        let context = require('../../../mocks/context.json');
        const data = {
            path: {
                "id": "1"
            },
            body: {
                "name": "Dozen"
            }

        }

        const result = yield Method.putUomStock(data, context);
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err);
    }
});


test.serial('(Update UomStock) - Update UomStock for non UomStock', function* (t) {
    t.context.sandbox.stub(Repo, 'findById').resolves(
        false
    );

    try {
        let context = require('../../../mocks/context.json');
        const data = {
            path: {
                "id": "1"
            },
            body: {
                "name": "Dozen"
            }

        }
        const result = yield Method.putUomStock(data, context);       

        t.fail(' Doesn\'t Throw an Error');        
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'The Error Type is Incorrect');
    }
});

test.serial('(Update UomStock) - Update UomStock with existing name', function* (t) {
    t.context.sandbox.stub(Repo, 'findById').resolves(
        { "id": "1", "name": "Dozen", 'created_at': '2017-12-05 16:59:10', 'updated_at': null }
    );

    t.context.sandbox.stub(Repo, 'findByName').resolves(
        true
    );

    try {
        let context = require('../../../mocks/context.json');
        const data = {
            path: {
                "id": "1"
            },
            body: {
                "name": "Dozen"
            }

        }

        const result = yield Method.putUomStock(data, context);
        t.fail(' Doesn\'t Throw an Error');        
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'The Error Type is Incorrect');
    }
});

test.serial('(Update UomStock) - Should be return array object UomStock', function* (t) {
    t.context.sandbox.stub(Repo, 'findById').resolves(
        { "id": "1", "name": "Dozen", 'created_at': '2017-12-05 16:59:10', 'updated_at': null }
    );

    t.context.sandbox.stub(Repo, 'findByName').resolves(
        true
    );

    try {
        let context = require('../../../mocks/context.json');
        const data = {
            path: {
                "id": "1"
            },
            body: {
                "name": "Dozen"
            }

        }

        const result = yield Method.putUomStock(data, context);
        t.fail(' Doesn\'t Throw an Error');        
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'The Error Type is Incorrect');
    }
});

test.serial('(Update UomStock) - Try to send invalid params', function* (t) {
    t.context.sandbox.stub(Repo, 'findById').resolves(
        null
    );

    try {
        let context = require('../../../mocks/context.json');
        const data = {
            path: {
                "id": 1
            },
            body: {
                "name": "Dozen"
            }

        }

        const result = yield Method.putUomStock(data, context);
        t.fail(' Doesn\'t Throw an Error');        
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'The Error Type is Incorrect');
    }
});



test.serial('You are not authorized user: Should be return Forbidden', function*(t) {
    try {
        let context = {
            user: ""
        }
        const data = {
            path: {
                "id": 1
            },
            body: {
                "name": "Dozen"
            }

        }
        yield Method.putUomStock(data, context);
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