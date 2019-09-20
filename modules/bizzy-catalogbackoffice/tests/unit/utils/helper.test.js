'use stict';

const Promise = require('bluebird');
const test = require('ava');
const Helper = require('../../../src/utils/helper');
const { BizzyError } = require('bizzy-common');
const sinon = require('sinon');

test('Should be return object', function* (t) {
    const page = 1;
    const limit = 20;
    const object = {
        id: 10045,
        name: 'Uom Test'
    };

    t.deepEqual(Helper.offsetPagination(page, limit), 0);
    t.deepEqual(Helper.parseDataObject(object), { id: 10045, name: 'Uom Test' });
});

test('Should be return object with empty page', function* (t) {
    t.deepEqual(Helper.offsetPagination('', 12), 0);
    t.deepEqual(Helper.offsetPagination(2, 5), 5);
});

test('Should be return lower case', function* (t) {
    t.deepEqual(Helper.lowerTrim('TEST'), 'test');
});

test('Should be return true for checking number', function* (t) {
    t.deepEqual(Helper.isNumber(1), true);
    t.deepEqual(Helper.isNumber('123abcd'), null);
});

test('Should be checking permalink', function* (t) {
    t.deepEqual(Helper.slugify(''), '');
    t.deepEqual(Helper.slugify('abcde'), 'abcde');
});

test('Should be implode array', function* (t) {
    t.deepEqual(Helper.implode([], ','), '');
    t.deepEqual(Helper.implode(['a', 'b'], ','), 'a,b');
});

test('Should be convert to array', function* (t) {
    t.deepEqual(Helper.convertToArray(''), []);
    t.deepEqual(Helper.convertToArray('{"test":"123"}'), { test: '123' });
});

test('Should be convert to object from string', function* (t) {
    t.deepEqual(Helper.convertToArray(''), []);
    t.deepEqual(Helper.convertToArray('{"test":"123"}'), { test: '123' });
});

test('should be generate correct length SKUD', function* (t) {
    t.true(Helper.generateSKUD(5).length === 5, 'wrong generate length SKUD');
});

test('Should be convert to array from object', function* (t) {
    t.deepEqual(Helper.objectToArray({ test: '123' }), ['123']);
});

test('Should be convert to array from object', function* (t) {
    t.deepEqual(Helper.objectToArray({ test: '123' }), ['123']);
});

test('Should be convert to null', function* (t) {
    t.deepEqual(Helper.convertToNull({ test: '' }), { test: null });
    t.deepEqual(Helper.convertToNull({ toString: 'toString' }), { toString: 'toString' });
});

test('Should be check status spec', function* (t) {
    let product = {
        specifications: [
            {
                type: 'new'
            }
        ]
    };
    t.deepEqual(Helper.checkSpecStatus(product), 'completed');
    product = {
        specifications: [
            {
                type: 'dropdown',
                attribute_status: 'new'
            }
        ]
    };
    t.deepEqual(Helper.checkSpecStatus(product), 'pending');
});

test('Should be check status variant', function* (t) {
    let product = {
        variant_value: 'NO_VARIANT',
        variants: [
            {
                attribute_status: 'new'
            }
        ]
    };
    t.deepEqual(Helper.checkVariantStatus(product), 'completed');
    product = {
        variant_value: 'VARIANT',
        variants: [
            {
                attribute_status: 'new'
            }
        ]
    };
    t.deepEqual(Helper.checkVariantStatus(product), 'pending');
    product = {
        variant_value: 'VARIANT',
        variants: [
            {
                attribute_status: 'sale'
            }
        ]
    };
    t.deepEqual(Helper.checkVariantStatus(product), 'completed');
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
