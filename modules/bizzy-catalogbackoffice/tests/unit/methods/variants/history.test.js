'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');

const VariantLogRepository = require('../../../../src/repositories/variant_log');
const Methods = require('../../../../src/methods/variants/history');


const validPayload = {
    path: {
        id: 'VR-1'
    },
    query: {
        limit: 5
    }
};

const invalidPayload = {
    path: {
        ids: '3'
    },
    query: {}
};

const validContext = require('../../../mocks/context.json');

test.serial('Successfull Get Variant Detail', function* (t) {
    t.context.sandbox.stub(VariantLogRepository, 'findAll').resolves([{
        id: '1010',
        attribute_set_id: 1,
        type: 'Ubah Variant',
        user: {
            id: 1,
            name: 'Mr.Jo',
            email: 'test@bizzymail.com',
            type: 'employee'
        },
        created_at: '2019-09-09',
        updated_at: '2019-09-09'
    }]);

    t.context.sandbox.stub(VariantLogRepository, 'count').resolves(10);

    try {
        yield Methods.getVariantHistory({
            path: {
                id: 'VR-1'
            },
            query: {}
        }, validContext);
        t.pass();
    } catch (err) {
        t.fail();
    }
});

test.serial('Failed Get Variant History, Not Authorized', function* (t) {
    try {
        yield Methods.getVariantHistory(validPayload, {});
        t.fail();
        console.log('Should return error');
    } catch (err) {
        t.pass();
    }
});

test.serial('Failed Get Variant History, Payload Not Valid', function* (t) {
    try {
        yield Methods.getVariantHistory(invalidPayload, validContext);
        t.fail();
        console.log('Should return error');
    } catch (err) {
        t.pass();
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
