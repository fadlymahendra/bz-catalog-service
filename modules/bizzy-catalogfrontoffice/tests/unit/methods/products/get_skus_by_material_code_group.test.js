'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const {
    BizzyError
} = require('bizzy-common');

const Method = require('../../../../src/methods/products/list_mapping');
const ProductMappingRepository = require('../../../../src/repositories/product_sku_mapping');

test.serial('[FAILED SCENARIO][VIEW] Test Case 1: Auth Error', function* (t) {
    const data = {
        query: {
            search: '',
            product_skus: ''
        }
    };
    try {
        yield Method.getSkusByMaterialCodeGroup(data, {});
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, 'You are not authorized user');
    }
});

test.serial('[FAILED SCENARIO][VIEW] Test Case 2: Validation Error', function* (t) {
    const context = require('../../../mocks/context.json');
    const data = {
        query: {
            search: null
        }
    };
    try {
        yield Method.getSkusByMaterialCodeGroup(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'Validation Error');
    }
});

test.serial('[SUCCESS SCENARIO][VIEW] Test Case 1: WITH EMPTY KEYWORD', function* (t) {
    const context = require('../../../mocks/context.json');
    const data = {
        query: {
            search: '',
            product_skus: '93VN03AVNO,TRG8QVK5SI,35GFZYNF2H,3604JKRAUR,I4A9V9ZAYU,KDVTNR2U6P,YTTJR6RNNY,TSZOZ2DOSY,KIAROC95BT'
        }
    };
    t.context.sandbox.stub(ProductMappingRepository, 'distinctBy').resolves([
        'TRG8QVK5SI',
        '93VN03AVNO',
        'KDVTNR2U6P',
        'TSZOZ2DOSY',
        'KIAROC95BT',
        '3604JKRAUR',
        'I4A9V9ZAYU',
        '35GFZYNF2H',
        'YTTJR6RNNY'
    ]);
    try {
        const response = yield Method.getSkusByMaterialCodeGroup(data, context);
        t.deepEqual(response, {
            data: {
                product_skus: [
                    'TRG8QVK5SI',
                    '93VN03AVNO',
                    'KDVTNR2U6P',
                    'TSZOZ2DOSY',
                    'KIAROC95BT',
                    '3604JKRAUR',
                    'I4A9V9ZAYU',
                    '35GFZYNF2H',
                    'YTTJR6RNNY'
                ]
            }
        });
    } catch (err) {
        t.fail(err instanceof BizzyError.Forbidden, 'Should return all list SKU');
    }
});

test.serial('[SUCCESS SCENARIO][VIEW] Test Case 2: WITH KEYWORD', function* (t) {
    const context = require('../../../mocks/context.json');
    const data = {
        query: {
            search: 'map',
            product_skus: '93VN03AVNO,TRG8QVK5SI,35GFZYNF2H,3604JKRAUR,I4A9V9ZAYU,KDVTNR2U6P,YTTJR6RNNY,TSZOZ2DOSY,KIAROC95BT'
        }
    };
    t.context.sandbox.stub(ProductMappingRepository, 'distinctBy').resolves(['TRG8QVK5SI']);
    try {
        const response = yield Method.getSkusByMaterialCodeGroup(data, context);
        t.deepEqual(response, {
            data: {
                product_skus: [
                    'TRG8QVK5SI'
                ]
            }
        });
    } catch (err) {
        t.fail(err instanceof BizzyError.Forbidden, 'Should return all list SKU');
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
