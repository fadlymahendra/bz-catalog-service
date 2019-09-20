'use strict';

const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');

const Authorization = require('../../../../src/utils/authorization');
const BrandRespository = require('../../../../src/repositories/brand');
const Methods = require('../../../../src/methods/brands/update');

const validContext = require('../../../mocks/context.json');

const invalidPayload = [
    {
        id: 81,
        name: 'Apple',
        image_url: null,
        is_active: 1,
        description: 'IPhone',
        created_at: '2017-11-28T14:54:10.000Z',
        updated_at: '2017-11-28T14:54:10.000Z'
    },
    false
];
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

test.serial('Success - Update Brand Case 1', function* (t) {
    
    t.context.sandbox.stub(BrandRespository, 'findByName').resolves(false);
    t.context.sandbox.stub(BrandRespository, 'update').resolves(validPayload);

    const findById = t.context.sandbox.stub(BrandRespository, 'findById');
    findById.onCall(0).resolves(validPayload);
    findById.onCall(1).resolves(validPayload);
    
    try {
        const data = {
            path: {
                id: '1865'
            },
            body: {
                name: 'foobar'
            }
        }
        yield Methods.putBrand(data, validContext);
        t.pass();
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('Success - Update Brand Case 2', function* (t) {
    
    t.context.sandbox.stub(BrandRespository, 'findByName').resolves(false);
    t.context.sandbox.stub(BrandRespository, 'update').resolves(false);

    const findById = t.context.sandbox.stub(BrandRespository, 'findById');
    findById.onCall(0).resolves(validPayload);
    findById.onCall(1).resolves(validPayload);
    
    try {
        const data = {
            path: {
                id: '1865'
            },
            body: {
                name: 'foobar'
            }
        }
        yield Methods.putBrand(data, validContext);
        t.pass();
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('Failed - Rename brand cannot with existing name or the same name: Should have return BizzyError.BadRequest', function* (t) {
    
    t.context.sandbox.stub(BrandRespository, 'findById').resolves(validPayload);
    t.context.sandbox.stub(BrandRespository, 'findByName').resolves(true);

    try {
        const data = {
            path: {
                id: '1865'
            },
            body: {
                name: 'foobar'
            }
        }
        yield Methods.putBrand(data, validContext);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, "Rename brand can't with existing name or the same name");
    }
});

test.serial('Failed - Brand not found: Should have return BizzyError.NotFound', function* (t) {
    
    t.context.sandbox.stub(BrandRespository, 'findById').resolves(false);

    try {
        const data = {
            path: {
                id: '1865'
            },
            body: {
                name: 'foobar'
            }
        }
        yield Methods.putBrand(data, validContext);
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
            },
            body: {
                name: 'foobar'
            }
        }
        yield Methods.putBrand(data, validContext);
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
        yield Methods.putBrand(data, context);
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
