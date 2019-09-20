'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');

const tangga = '../../../..';
const UomRespository = require(tangga+'/src/repositories/uom');
const Methods = require(tangga+'/src/methods/uoms/create');
const { BizzyError } = require('bizzy-common');
const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

test.serial('Should be return object UOM', function* testCase(t) {
    t.context.sandbox.stub(UomRespository, 'findOrCreate').resolves(
        [
            {"id":999, "name":"Unit", 'created_at':'2017-12-05 16:59:10', 'updated_at':'2017-12-05 16:59:10'}, true
        ]
    );
    
    try{
        let context = require('../../../mocks/context.json');
        const data = {
            body: {
                "name": "Unit"
            }
        }
        const result = yield Methods.postUom(data, context);
        const expected = {
            data: {
                id: 999,
                name: 'Unit',
                created_at: '2017-12-05 16:59:10',
                updated_at: '2017-12-05 16:59:10' 
            }
        };
        t.deepEqual(result, expected);
    } catch(err) {
        console.log(err);
    }
});

test.serial('Invalid Input Data Should throw BizzyError.BadRequest', function* testCase(t) {
    try{
        let context = require('../../../mocks/context.json');
        const data = {
            body: {
                "name": ""
            }
        }
        const result = yield Methods.postUom(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch(err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);        
    }
});

test.serial('Uom Already Exist Should throw BizzyError.BadRequest', function* testCase(t) {
    t.context.sandbox.stub(UomRespository, 'findOrCreate').resolves(
        [
            {"id":999, "name":"Unit", 'created_at':'2017-12-05 16:59:10', 'updated_at':'2017-12-05 16:59:10'}, false
        ]
    );
    try{
        let context = require('../../../mocks/context.json');
        const data = {
            body: {
                "name": "Unit"
            }
        }
        const result = yield Methods.postUom(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch(err) {
        t.true(err instanceof BizzyError.BadRequest, 'Uom Already Exist');
    }
});

test.serial('You are not authorized user: Should be return Forbidden', function* (t) {
    try {
        let context = {
            user: ""
        }
        const data = {
            body: {
                "name": "Unit"
            }
        }
        yield Methods.postUom(data, context);
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