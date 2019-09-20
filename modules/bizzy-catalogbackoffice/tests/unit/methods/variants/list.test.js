'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');

const VariantAdapter = require('../../../../src/utils/adapter/variants');
const AttributeSetRepo = require('../../../../src/repositories/attribute_set');
const ProductVariantRepo = require('../../../../src/repositories/product_variant');
const Methods = require('../../../../src/methods/variants/list');

const validPayload = {
    query: {
        search: 'VR-1',
        created_by: 1,
        category: 561
    }
};

const invalidPayload = {
    query: {
        ss: '1'
    }
};

const resAllVariant = [{
    id: 1,
    AttributeCode: {
        label: 'Warna',
        AttributeValues: [
            {
                value: 'Hitam'
            },
            {
                value: 'Hijau'
            }
        ]
    },
    Category: {
        name: 'Phone'
    }
}];

const resFindSKU = [
    {
        id: 1
    },
    {
        id: 2
    }
];

const validContext = require('../../../mocks/context.json');

test.serial('Successfull Get Variant List', function* (t) {
    const adapter = t.context.sandbox.stub(VariantAdapter, 'findAllVariants');
    adapter.onCall(0).resolves(resAllVariant);
    adapter.onCall(1).resolves(resAllVariant);

    t.context.sandbox.stub(VariantAdapter, 'findSkuByAttributeCode').resolves(resFindSKU);
    try {
        yield Methods.getVariant(validPayload, validContext);
        t.pass();
    } catch (err) {
        console.log(err.message);
        t.fail();
    }
});

test.serial('Successfull Get Variant List without conditional', function* (t) {
    const adapter = t.context.sandbox.stub(VariantAdapter, 'findAllVariants');
    adapter.onCall(0).resolves(resAllVariant);
    adapter.onCall(1).resolves(resAllVariant);

    t.context.sandbox.stub(VariantAdapter, 'findSkuByAttributeCode').resolves(resFindSKU);
    try {
        yield Methods.getVariant({
            query: {}
        }, validContext);
        t.pass();
    } catch (err) {
        console.log(err.message);
        t.fail();
    }
});

test.serial('Failed Get Variant List, Not Authorized', function* (t) {
    const adapter = t.context.sandbox.stub(VariantAdapter, 'findAllVariants');
    adapter.onCall(0).resolves(resAllVariant);
    adapter.onCall(1).resolves(resAllVariant);
    try {
        yield Methods.getVariant(validPayload, {});
        t.fail();
    } catch (err) {
        t.pass();
    }
});

test.serial('Failed Get Variant List, Payload Not Valid', function* (t) {
    const adapter = t.context.sandbox.stub(VariantAdapter, 'findAllVariants');
    adapter.onCall(0).resolves(resAllVariant);
    adapter.onCall(1).resolves(resAllVariant);
    try {
        yield Methods.getVariant(invalidPayload, validContext);
        t.fail();
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
