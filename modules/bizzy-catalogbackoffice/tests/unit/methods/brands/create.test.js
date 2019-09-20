'use strict';

const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');

const BrandRespository = require('../../../../src/repositories/brand');
const Methods = require('../../../../src/methods/brands/create');

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

test.serial('Successfully Create brand', function* (t) {

    t.context.sandbox.stub(BrandRespository, 'findOrCreate').resolves(validPayload);
    
    try {
        const data = {
            body: {
                name: 'ABCDDDDDDDDD'
            }
        }
        const result = yield Methods.postBrand(data, validContext);
        const expected = {
            data: {
                id: 81,
                name: 'Apple',
                image_url: null,
                description: 'IPhone',
                status: 1,
                total_sku: undefined
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err);
        t.fail(err.message);
    }
});

test.serial('Brand Already Exist: Should have return BizzyError.BadRequest ', function* (t) {

    t.context.sandbox.stub(BrandRespository, 'findOrCreate').resolves(invalidPayload);

    try {
        const data = {
            body: {
                name: 'ABCDDDDDDDDD'
            }
        }
        yield Methods.postBrand(data, validContext);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'Brand Already Exist');
    }
});

test.serial('Invalid data input: Should have return BizzyError.BadRequest', function* (t) {

    try {
        const data = {
            body: {
                name: ''
            }
        }
        yield Methods.postBrand(data, validContext);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest);
    }
});

test.serial('You are not authorized user: Should have return BizzyError.Forbidden', function* (t) {

    try {
        let context = {
            user: ""
        }
        const data = {
            body: {
                name: ''
            }
        }
        yield Methods.postBrand(data, context);
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