'use strict';

const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');

const BrandRespository = require('../../../../src/repositories/brand');
const Methods = require('../../../../src/methods/brands/delete');

const validContext = require('../../../mocks/context.json');

const validPayload = [
    {
        id: 81,
        name: 'Apple',
        image_url: null,
        is_active: 1,
        description: 'IPhone',
        created_at: '2017-11-28T14:54:10.000Z',
        updated_at: '2017-11-28T14:54:10.000Z'
    },
    true
];

test.serial('Success - Delete brand', function* (t) {
    
    t.context.sandbox.stub(BrandRespository, 'findById').resolves(validPayload);
    t.context.sandbox.stub(BrandRespository, 'delete').resolves(true);

    try {
        const data = {
            path: {
                id: '18'
            }
        }
        yield Methods.deleteBrand(data, validContext);
        t.pass();
    } catch (err) {
        t.fail(err);
    }
});

test.serial('Failed - Problem Database Occur: Should have return BizzyError.InternalServerError', function* (t) {
    
    t.context.sandbox.stub(BrandRespository, 'findById').resolves(validPayload);
    t.context.sandbox.stub(BrandRespository, 'delete').resolves(false);

    try {
        const data = {
            path: {
                id: '18'
            }
        }
        yield Methods.deleteBrand(data, validContext);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.InternalServerError, 'Problem Database Occur');
    }
});

test.serial('Failed - Brand not found: Should have return BizzyError.NotFound', function* (t) {
    
    t.context.sandbox.stub(BrandRespository, 'findById').resolves(false);

    try {
        const data = {
            path: {
                id: '18'
            }
        }
        yield Methods.deleteBrand(data, validContext);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'Brand not found');
    }
});

test.serial('Failed - Joi Validation: Should have return BizzyError.BadRequest', function* (t) {
    try {
        const data = {
            path: {
                id: ''
            }
        }
        yield Methods.deleteBrand(data, validContext);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest);
    }
});

test.serial('Failed - You are not authorized user: Should have return BizzyError.Forbidden', function* (t) {

    try {
        let context = {
            user: ""
        }
        const data = {
            body: {
                name: ''
            }
        }
        yield Methods.deleteBrand(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, 'You are not authorized user');
    }
});

test.before('Initialize error handler', (t) => {
    BizzyError.initializeErrors();
});

test.beforeEach('Initialize New Sandbox Before Each Test', (t) => {
    t.context.sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
});

test.afterEach.always('Restore Sandbox and Configuration After Each Test', (t) => {
    t.context.sandbox.restore();
});