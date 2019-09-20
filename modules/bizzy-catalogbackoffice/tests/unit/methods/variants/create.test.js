'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { DBContext, BizzyError } = require('bizzy-common');

const AttributeCodeRepo = require('../../../../src/repositories/attribute_code');
const AttributeValueRepo = require('../../../../src/repositories/attribute_value');
const AttributeSetRepo = require('../../../../src/repositories/attribute_set');
const CategoryRepo = require('../../../../src/repositories/category');
const VariantLogRepo = require('../../../../src/repositories/variant_log');
const Methods = require('../../../../src/methods/variants/create');
const validContext = require('../../../mocks/context.json');

const validPayload = {
    body: {
        label: 'This is Label',
        category: 561,
        description: 'this is description',
        values: [
            'Medium',
            'Low'
        ]
    }
};

const validPayloadCase2 = {
    body: {
        label: 'This is Label',
        category: 561,
        values: [
            'Medium',
            'Low'
        ]
    }
};

const validPayloadCase3 = {
    body: {
        label: 'This is Label',
        category: 561,
        values: [
            'Medium',
            'Medium'
        ]
    }
};

const invalidPayload = {
    body: {
        label: 'This is Label',
        category: 561,
        description: 'this is description',
        values: []
    }
};

const resCategory = {
    id: 1,
    name: 'phone and media'
};

const resCreateAttributeCode = {
    id: 1
};

test.serial('Success Create Variant with description', function* (t) {
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.mock(CategoryRepo).expects('findOne').resolves(resCategory);
    t.context.sandbox.mock(AttributeCodeRepo).expects('findOne').resolves(null);
    t.context.sandbox.mock(AttributeCodeRepo).expects('createOne').resolves(resCreateAttributeCode);
    t.context.sandbox.mock(AttributeSetRepo).expects('createOne').resolves(true);
    t.context.sandbox.mock(AttributeValueRepo).expects('insertMany').resolves(true);
    t.context.sandbox.mock(VariantLogRepo).expects('insertOne').resolves(true);

    try {
        yield Methods.postVariant(validPayload, validContext);
        t.pass();
    } catch (err) {
        console.log(err);
        t.fail();
    }
});


test.serial('Success Create Variant without description', function* (t) {
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.mock(CategoryRepo).expects('findOne').resolves(resCategory);
    t.context.sandbox.mock(AttributeCodeRepo).expects('findOne').resolves(null);
    t.context.sandbox.mock(AttributeCodeRepo).expects('createOne').resolves(resCreateAttributeCode);
    t.context.sandbox.mock(AttributeSetRepo).expects('createOne').resolves(true);
    t.context.sandbox.mock(AttributeValueRepo).expects('insertMany').resolves(true);
    t.context.sandbox.mock(VariantLogRepo).expects('insertOne').resolves(true);

    try {
        yield Methods.postVariant(validPayloadCase2, validContext);
        t.pass();
    } catch (err) {
        console.log(err);
        t.fail();
    }
});


test.serial('Failed Create Variant, Duplicate variant value', function* (t) {
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.mock(CategoryRepo).expects('findOne').resolves(resCategory);
    t.context.sandbox.mock(AttributeCodeRepo).expects('findOne').resolves(null);
    t.context.sandbox.mock(AttributeCodeRepo).expects('createOne').resolves(resCreateAttributeCode);
    t.context.sandbox.mock(AttributeSetRepo).expects('createOne').resolves(true);
    t.context.sandbox.mock(AttributeValueRepo).expects('insertMany').resolves(true);
    t.context.sandbox.mock(VariantLogRepo).expects('insertOne').resolves(true);

    try {
        yield Methods.postVariant(validPayloadCase3, validContext);
        t.fail();
    } catch (err) {
        t.pass();
    }
});

test.serial('Failed Create Variant, Category Not Found', function* (t) {
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.mock(CategoryRepo).expects('findOne').resolves(null);
    t.context.sandbox.mock(AttributeCodeRepo).expects('findOne').resolves(null);
    t.context.sandbox.mock(AttributeCodeRepo).expects('createOne').resolves(resCreateAttributeCode);
    t.context.sandbox.mock(AttributeSetRepo).expects('createOne').resolves(true);
    t.context.sandbox.mock(AttributeValueRepo).expects('insertMany').resolves(true);

    try {
        yield Methods.postVariant(validPayload, validContext);
        t.fail();
    } catch (err) {
        t.pass();
    }
});

test.serial('Failed Create Variant, Label sudah terdaftar', function* (t) {
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();

    t.context.sandbox.mock(CategoryRepo).expects('findOne').resolves({
        id: 1
    });
    t.context.sandbox.mock(AttributeCodeRepo).expects('findOne').resolves({
        id: 1
    });
    t.context.sandbox.mock(AttributeCodeRepo).expects('createOne').resolves(resCreateAttributeCode);
    t.context.sandbox.mock(AttributeSetRepo).expects('createOne').resolves(true);
    t.context.sandbox.mock(AttributeValueRepo).expects('insertMany').resolves(true);

    try {
        yield Methods.postVariant(validPayload, validContext);
        t.fail();
    } catch (err) {
        t.pass();
    }
});

test.serial('Failed Create Variant, Not Authorized', function* (t) {
    try {
        yield Methods.postVariant(validPayload, {});
        t.fail();
    } catch (err) {
        t.pass();
    }
});

test.serial('Failed Create Variant, Payload Not Valid', function* (t) {
    try {
        yield Methods.postVariant(invalidPayload, validContext);
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
