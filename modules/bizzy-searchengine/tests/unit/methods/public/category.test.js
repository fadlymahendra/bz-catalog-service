'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');

const CategoryRepository = require('../../../../src/repositories/category');
const Methods = require('../../../../src/methods/public/category');
const context = require('../../../mocks/context.json');

test.serial('Should return category list C0', function* (t) {
    t.context.sandbox.stub(CategoryRepository, 'findAll').resolves([
        {
            id: 23,
            name: 'b',
            level: 'C0',
            unspsc: 111,
            parent_id: 33
        },
        {
            id: 24,
            name: 'c',
            level: 'C0',
            unspsc: 111,
            parent_id: 44
        }
    ]);
    t.context.sandbox.stub(CategoryRepository, 'findC1').resolves([
        {
            id: 23,
            name: 'dd',
            level: 'C0',
            unspsc: 111
        },
        {
            id: 23,
            name: 'cc',
            level: 'C0',
            unspsc: 111
        }
    ]);

    const payload = {
        query: {
        }
    };

    try {
        yield Methods.getPublicCategory(payload, context);
        t.pass();
    } catch (err) {
        t.fail('Should return category list with child');
    }
});

test.before('Initialize BizzyError Before All Tests', (t) => {
    BizzyError.initializeErrors();
});

test.beforeEach('Initialize New Sandbox Before Each Test', function* (t) {
    t.context.sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
});

test.afterEach.always('Restore Sandbox and Configuration After Each Test', function* (t) {
    t.context.sandbox.restore();
});
