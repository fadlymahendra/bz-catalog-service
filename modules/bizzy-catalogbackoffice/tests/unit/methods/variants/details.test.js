'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');

const VariantAdapter = require('../../../../src/utils/adapter/variants');
const AttributeSetRepo = require('../../../../src/repositories/attribute_set');
const CategoryRepo = require('../../../../src/repositories/category');
const Methods = require('../../../../src/methods/variants/detail');

const validPayload = {
    path: {
        id: 'VR-1'
    }
};

const invalidPayload = {
    path: {
        ids: 'VR-1'
    }
};

const validContext = require('../../../mocks/context.json');

test.serial('Successfull Get Variant Detail', function* (t) {
    // t.context.sandbox.stub(AttributeSetRepo, 'findOneVariants').resolves({
    //     id: 1,
    //     category_id: 561,
    //     AttributeCode: {
    //         label: 'Warna',
    //         AttributeValues: [{
    //             value: 'Hitam'
    //         }]
    //     }
    // });
    t.context.sandbox.stub(VariantAdapter, 'findByIdVariant').resolves({
        id: 1,
        category_id: 561,
        AttributeCode: {
            label: 'Warna',
            AttributeValues: [{
                value: 'Hitam'
            }]
        }
    });

    t.context.sandbox.stub(CategoryRepo, 'getCategoryBreakdown').resolves([{
        category0_id: 8,
        category0_name: 'IT and Mobile Devices',
        category0_unspsc: 43000000,
        category1_id: 52,
        category1_name: 'Communications Devices & Accessories',
        category1_unspsc: 43190000,
        category2_id: 219,
        category2_name: 'Personal communication devices',
        category2_unspsc: 43191500,
        category3_id: 561,
        category3_name: 'Mobile phones',
        category3_unspsc: 43191501
    }]);

    try {
        yield Methods.getVariantById({
            path: {
                id: 'VR-1'
            }
        }, validContext);
        t.pass();
    } catch (err) {
        console.log(err.message);
        t.fail();
    }
});

test.serial('Successfull Get Variant Detail with full description', function* (t) {
    t.context.sandbox.stub(VariantAdapter, 'findByIdVariant').resolves({
        id: 1,
        category_id: 561,
        AttributeCode: {
            label: 'Warna',
            AttributeValues: [{
                value: 'Hitam'
            }]
        }
    });

    t.context.sandbox.stub(CategoryRepo, 'getCategoryBreakdown').resolves([{
        category0_id: 8,
        category0_name: 'IT and Mobile Devices',
        category0_unspsc: 43000000,
        category1_id: 52,
        category1_name: 'Communications Devices & Accessories',
        category1_unspsc: 43190000,
        category2_id: 219,
        category2_name: 'Personal communication devices',
        category2_unspsc: 43191500,
        category3_id: 561,
        category3_name: 'Mobile phones',
        category3_unspsc: 43191501
    }]);

    try {
        yield Methods.getVariantById({
            path: {
                id: 'VR-1'
            }
        }, validContext);
        t.pass();
    } catch (err) {
        console.log(err.message);
        t.fail();
    }
});

test.serial('Successfull Get Variant Detail with full description on Attribute Code', function* (t) {
    t.context.sandbox.stub(VariantAdapter, 'findByIdVariant').resolves({
        id: 1,
        category_id: 561,
        AttributeCode: {
            label: 'Warna',
            description: 'Testing Desc',
            AttributeValues: [{
                value: 'Hitam'
            }]
        }
    });

    t.context.sandbox.stub(CategoryRepo, 'getCategoryBreakdown').resolves([{
        category0_id: 8,
        category0_name: 'IT and Mobile Devices',
        category0_unspsc: 43000000,
        category1_id: 52,
        category1_name: 'Communications Devices & Accessories',
        category1_unspsc: 43190000,
        category2_id: 219,
        category2_name: 'Personal communication devices',
        category2_unspsc: 43191500,
        category3_id: 561,
        category3_name: 'Mobile phones',
        category3_unspsc: 43191501
    }]);

    try {
        yield Methods.getVariantById({
            path: {
                id: 'VR-1'
            }
        }, validContext);
        t.pass();
    } catch (err) {
        console.log(err.message);
        t.fail();
    }
});

test.serial('Failed Get Variant Detail, Not Found', function* (t) {
    t.context.sandbox.stub(VariantAdapter, 'findByIdVariant').resolves(false);
    try {
        yield Methods.getVariantById(validPayload, validContext);
        t.fail();
    } catch (err) {
        t.pass();
    }
});

test.serial('Failed Get Variant Detail, Not Found', function* (t) {
    t.context.sandbox.stub(VariantAdapter, 'findByIdVariant').resolves({
        id: 1,
        category_id: 561
    });

    t.context.sandbox.stub(CategoryRepo, 'getCategoryBreakdown').resolves([]);
    try {
        yield Methods.getVariantById(validPayload, validContext);
        t.fail();
    } catch (err) {
        t.pass();
    }
});

test.serial('Failed Get Variant Detail, Not Authorized', function* (t) {
    try {
        yield Methods.getVariantById(validPayload, {});
        t.fail();
    } catch (err) {
        t.pass();
    }
});

test.serial('Failed Get Variant Detail, Payload Not Valid', function* (t) {
    try {
        yield Methods.getVariantById(invalidPayload, validContext);
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
