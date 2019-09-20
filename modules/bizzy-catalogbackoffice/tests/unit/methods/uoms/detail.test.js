'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');

const tangga = '../../../..';
const UomRespository = require(tangga+'/src/repositories/uom');
const Methods = require(tangga+'/src/methods/uoms/detail');
const { BizzyError } = require('bizzy-common');
const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

test.serial('Should be return one UOM', function* testCase(t) {
    t.context.sandbox.stub(UomRespository, 'findById').resolves(
            {"id":1, "name":"Unit", 'created_at':'2017-12-05 16:59:10', 'updated_at':null}
    );
    try{
        let context = require('../../../mocks/context.json');
        const data = {
            path : {
                "id": "1"
            }
        }
        const result = yield Methods.getUomById(data, context)        
        const expected = {
            data: {
                id: 1,
                name: 'Unit',
                created_at: '2017-12-05 16:59:10',
                updated_at: null
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
            path: {
                "id": ""
            }
        }
        const result = yield Methods.getUomById(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch(err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);        
    }
});
test.serial('Data Not Found Should throw BizzyError.NotFound', function* testCase(t) {
    t.context.sandbox.stub(UomRespository, 'findById').resolves(false);    
    try{
        let context = require('../../../mocks/context.json');
        const data = {
            path: {
                "id": "1"
            }
        }
        const result = yield Methods.getUomById(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch(err) {
        t.true(err instanceof BizzyError.NotFound, 'Uom not found');   
    }
});


test.serial('You are not authorized user: Should be return Forbidden', function* (t) {
    try {
        let context = {
            user: ""
        }
        const data = {
            path: {
                "id": "1"
            }
        }
        yield Methods.getUomById(data, context);
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