'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');
const Method = require('../../../../src/methods/products/list_group');
const ProductSkuGroupRepository = require('../../../../src/repositories/product_sku_group');

test.serial('Should be return success', function* (t) {
    const findAll = t.context.sandbox.stub(ProductSkuGroupRepository, 'findAll');
    findAll.onCall(0).resolves([
        {
            _id: '5acdd9e41c75114788652189',
            id: '1523440100931',
            group_id: 10,
            product_sku: 'X152KT2GKF',
            status: 'active',
            user: {
                id: 3,
                name: 'Bambang Widodo',
                email: 'vendor@tokoledia.com'
            },
            created_at: '2018-04-11T09:48:20.942Z',
            updated_at: '2018-04-11T10:15:28.886Z'
        },
        {
            _id: '5acdd9e41c7511478865218a',
            id: '1523440100942',
            group_id: 10,
            product_sku: 'WBQH1BWFAN',
            status: 'active',
            user: {
                id: 3,
                name: 'Bambang Widodo',
                email: 'vendor@tokoledia.com'
            },
            created_at: '2018-04-11T09:48:20.945Z',
            updated_at: '2018-04-11T10:15:28.886Z'
        }
    ]);
    findAll.onCall(1).resolves([
        {
            _id: '5acdd7f13b74e44719f0b258',
            id: '1523439601751',
            group_id: 12,
            product_sku: 'YTTJR6RNNY',
            status: 'active',
            user: {
                id: 3,
                name: 'Bambang Widodo',
                email: 'vendor@tokoledia.com'
            },
            created_at: '2018-04-11T09:40:01.760Z',
            updated_at: '2018-04-11T09:40:01.760Z'
        },
        {
            _id: '5acdd7f13b74e44719f0b259',
            id: '1523439601760',
            group_id: 12,
            product_sku: 'X152KT2GKF',
            status: 'active',
            user: {
                id: 3,
                name: 'Bambang Widodo',
                email: 'vendor@tokoledia.com'
            },
            created_at: '2018-04-11T09:40:01.762Z',
            updated_at: '2018-04-11T09:40:01.762Z'
        }
    ]);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                groups: '10,12'
            }
        };

        const result = yield Method.getSkuByGroup(data, context);
        const expected = {
            data: [
                {
                    group_id: 10,
                    items: [
                        'X152KT2GKF',
                        'WBQH1BWFAN'
                    ]
                },
                {
                    group_id: 12,
                    items: [
                        'YTTJR6RNNY',
                        'X152KT2GKF'
                    ]
                }
            ]
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return authorized', function* (t) {
    try {
        const context = {
            user: ''
        };
        const data = {
            query: {
                groups: '10,12'
            }
        };
        yield Method.getSkuByGroup(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, 'You are not authorized user');
    }
});

test.serial('Should be return bad request', function* (t) {
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            query: {
                groups: ''
            }
        };
        yield Method.getSkuByGroup(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
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
