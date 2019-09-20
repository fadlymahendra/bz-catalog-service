'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { DBContext, BizzyError } = require('bizzy-common');

const AttributeSetRepo = require('../../../../src/repositories/attribute_set');
const AttributeCodeRepo = require('../../../../src/repositories/attribute_code');
const AttributeValueRepo = require('../../../../src/repositories/attribute_value');
const VariantAdapter = require('../../../../src/utils/adapter/variants');
const Methods = require('../../../../src/methods/variants/delete');

const validPayload = {
    path: {
        id: '1'
    }
};

const invalidPayload = {
    path: {
        ids: '1'
    }
};

const resAttributeSet = {
    id: 1,
    category_id: 556,
    AttributeCode: {
        code: 'phone_color'
    }
};

const resFindSKU = [{
    id: 1,
    ProductVariants: [
        {
            variant_value: '{"phone_size": 1}'
        }
    ]
}];


const validContext = require('../../../mocks/context.json');

test.serial('Success To Delete Variant', function* (t) {
    t.context.sandbox.stub(AttributeSetRepo, 'findById').resolves(resAttributeSet);
    t.context.sandbox.stub(VariantAdapter, 'findSkuByAttributeCode').resolves([]);
    t.context.sandbox.stub(AttributeSetRepo, 'update').resolves(true);
    t.context.sandbox.stub(AttributeCodeRepo, 'update').resolves(true);
    t.context.sandbox.stub(AttributeValueRepo, 'updateMany').resolves(true);

    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    try {
        yield Methods.deleteVariant(validPayload, validContext);
        t.pass();
    } catch (err) {
        console.log(err);
        t.fail();
    }
});

test.serial('Failed To Delete Variant, Sku Found more than 1', function* (t) {
    t.context.sandbox.stub(AttributeSetRepo, 'findById').resolves(resAttributeSet);
    t.context.sandbox.stub(VariantAdapter, 'findSkuByAttributeCode').resolves(resFindSKU);
    t.context.sandbox.stub(AttributeSetRepo, 'update').resolves(true);
    t.context.sandbox.stub(AttributeCodeRepo, 'update').resolves(true);
    t.context.sandbox.stub(AttributeValueRepo, 'updateMany').resolves(true);

    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    try {
        yield Methods.deleteVariant(validPayload, validContext);
        console.log('should return bizzy error');
        t.fail();
    } catch (err) {
        t.pass();
    }
});


test.serial('Failed To Delete Variant, Variant tidak ditemukan', function* (t) {
    t.context.sandbox.stub(AttributeSetRepo, 'findById').resolves(null);
    t.context.sandbox.stub(VariantAdapter, 'findSkuByAttributeCode').resolves(resFindSKU);
    t.context.sandbox.stub(AttributeSetRepo, 'update').resolves(true);
    t.context.sandbox.stub(AttributeCodeRepo, 'update').resolves(true);
    t.context.sandbox.stub(AttributeValueRepo, 'updateMany').resolves(true);

    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    try {
        yield Methods.deleteVariant(validPayload, validContext);
        console.log('should return bizzy error');
        t.fail();
    } catch (err) {
        t.pass();
    }
});

test.serial('Failed To Delete Variant, Not Authorized', function* (t) {
    try {
        yield Methods.deleteVariant(validPayload, {});
        t.fail();
    } catch (err) {
        t.pass();
    }
});

test.serial('Failed To Delete Variant, Payload Not Valid', function* (t) {
    try {
        yield Methods.deleteVariant(invalidPayload, validContext);
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
