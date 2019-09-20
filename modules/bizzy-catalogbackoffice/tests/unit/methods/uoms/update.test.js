'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');

const tangga = '../../../..';
const UomRespository = require(tangga+'/src/repositories/uom');
const Methods = require(tangga+'/src/methods/uoms/update');
const { BizzyError } = require('bizzy-common');
const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

test.serial('Should be return One UOM Updated', Promise.coroutine(function*(t) {
    t.context.sandbox.stub(UomRespository, 'findById').resolves(
        {"id":1, "name":"Dozen", 'created_at':'2017-12-05 16:59:10', 'updated_at':null}
    );
    t.context.sandbox.stub(UomRespository, 'findByName').resolves(
        
    );
    t.context.sandbox.stub(UomRespository, 'update').resolves(
        {"id":1, "name":"Unit", 'created_at':'2017-12-05 16:59:10', 'updated_at':null}
    );
    
    try{
        let context = require('../../../mocks/context.json');
        const data = {
            path: {
                "id": "1"
            },
            body: {
                "name": "Dozen"
            }    
        }
        const result = yield Methods.putUom(data, context);
        const expected = {
            data: {
                id: 1,
                name: 'Dozen',
                created_at: '2017-12-05 16:59:10',
                updated_at: null
            }
        };
        t.deepEqual(result, expected);
    } catch(err) {
        console.log(err);
    }
}));

test.serial('Invalid Input Data Should throw BizzyError.BadRequest', function* testCase(t) {
    try{
        let context = require('../../../mocks/context.json');
        const data = {
            path: {
                "id": ""
            },
            body: {
                "name": "Dozen"
            }   
        }
        const result = yield Methods.putUom(data, context);
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
            },
            body: {
                "name": "Dozen"
            }   
        }
        const result = yield Methods.putUom(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch(err) {
        t.true(err instanceof BizzyError.NotFound, 'Uom not found');   
    }
});
test.serial('Error Update Existing Data Should throw BizzyError.BadRequest', function* testCase(t) {
    t.context.sandbox.stub(UomRespository, 'findById').resolves(
        {"id":1, "name":"Dozen", 'created_at':'2017-12-05 16:59:10', 'updated_at':null}
    );    
    t.context.sandbox.stub(UomRespository, 'findByName').resolves(true);    
    try{
        let context = require('../../../mocks/context.json');
        const data = {
            path: {
                "id": "1"
            },
            body: {
                "name": "Dozen"
            }   
        }
        const result = yield Methods.putUom(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch(err) {
        t.true(err instanceof BizzyError.BadRequest, "Rename uom can't with existing name or the same name");   
    }
});

test.serial('You are not authorized user: Should be return Forbidden', function* (t) {
    try {
        let context = {
            user: ""
        }
        const data = {
            body: {
                "name": "Dozen"
            }
        }
        yield Methods.putUom(data, context);
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