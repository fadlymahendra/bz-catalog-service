'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');
const MiscRepository = require('../../../../src/repositories/misc');
const Methods = require('../../../../src/methods/premoderations/reject_list');
const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

test.serial('Should be return Reject Reason List', function*(t) {
    t.context.sandbox.stub(MiscRepository, 'findByKey').resolves({
        value:'{ "value": "product_data", "label": "Data Produk" }'
    });
    try {
        let context = require('../../../mocks/context.json');
        const data = {
            "query": {
            }
        }
        const result = yield Methods.getPremoderationRejectReason(data, context);
        const expected = {
            data:{
                "value": "product_data",
                "label": "Data Produk"
            }        
        }
        t.deepEqual(result, expected);
    } catch(err) {
        console.log(err.message);
    }
});


test.serial('You are not authorized user: Should be return Forbidden', function*(t) {
    try {
        let context = {
            user: ""
        }
        const data = {
            "query": {
            }
        }
        yield Methods.getPremoderationRejectReason(data, context);
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