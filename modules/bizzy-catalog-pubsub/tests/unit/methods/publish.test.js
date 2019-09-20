'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const {
    BizzyError,
    BizzyService
} = require('bizzy-common');
const method = require('../../../src/methods/publish');

test.serial('publishItemERP mode create SUCCESS', async (t) => {
    t.context.sandbox.stub(BizzyService, 'callSync').resolves();
    t.context.sandbox.stub(BizzyService, 'publish').resolves(true);

    try {
        const result = await method.publishItemERP({
            variants: [{
                sku: 'XGQX4TIQ0L'
            }],
            mode: 'create'
        }, {});
        t.is(result, 1);
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('publishItemERP mode update SUCCESS', async (t) => {
    t.context.sandbox.stub(BizzyService, 'callSync').resolves();
    t.context.sandbox.stub(BizzyService, 'publish').resolves(true);

    try {
        const result = await method.publishItemERP({
            variants: [{
                sku: 'XGQX4TIQ0L'
            }],
            mode: 'update'
        }, {});
        t.is(result, 1);
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('publishItemERP mode move SUCCESS', async (t) => {
    t.context.sandbox.stub(BizzyService, 'callSync').resolves();
    t.context.sandbox.stub(BizzyService, 'publish').resolves(true);

    try {
        const result = await method.publishItemERP({
            variants: [{
                sku: 'XGQX4TIQ0L'
            }],
            mode: 'move'
        }, {});
        t.is(result, 1);
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('publishUpsertItemERP SUCCESS', async (t) => {
    t.context.sandbox.stub(BizzyService, 'callSync').resolves();
    t.context.sandbox.stub(BizzyService, 'publish').resolves(true);

    try {
        const result = await method.publishUpsertItemERP({
            inserted_variants: [{
                sku: 'XGQX4TIQ0L'
            }],
            updated_variants: [{
                sku: 'MX7R97RTC7'
            }]
        }, {});
        t.is(result, true);
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('publishUpdateProduct SUCCESS', async (t) => {
    t.context.sandbox.stub(BizzyService, 'publish').resolves(true);
    try {
        const result = await method.publishUpdateProduct({
            data: {
                e: {
                    id: 273, // Product Vendor id
                    vendor_id: 602,
                    stock_available: 1000,
                    stock_used: 0,
                    stock_reserved: 0,
                    currency: 'IDR',
                    tier_min_qty_1: 1,
                    tier_min_qty_2: 1001,
                    tier_min_qty_3: null,
                    tier_cogs_price_1: 25000.00,
                    tier_cogs_price_2: 20250.00,
                    tier_cogs_price_3: null,
                    indent_period: null,
                    indent_limit: null,
                    sku_vendor: 'SENDAL1',
                    is_indent: 0,
                    is_active: 1,
                    created_at: '2018-10-19T09:41:59.000Z',
                    updated_at: '2018-10-19T09:41:59.000Z',
                    product_variant: {
                        id: 223, // will need to include product variant inside product vendor
                        sku: '4A4Z05YUEI',
                        long_name: 'Sandal Jepit Swallow',
                        variant_value: 'NO_VARIANT',
                        is_primary: 1,
                        is_discontinue: 0,
                        is_active: 1,
                        updated_at: '2018-10-19T09:39:46.000Z',
                        created_at: '2018-10-19T09:39:46.000Z',
                        product_group: {
                            id: 178, // will need to include product group inside product variant
                            name: 'Sandal Jepit Swallow',
                            variant_count: 0,
                            variant_matrix: '[]',
                            status: 1,
                            visibility: 1,
                            created_at: '2018-10-19T09:38:43.000Z',
                            updated_at: '2018-10-19T09:41:59.000Z',
                            category: {
                                id: 639, // will need to include category inside product group
                                name: 'Safety shoes',
                                level: 'C3',
                                base_margin: null,
                                unspsc: 46181605,
                                sequence: 1,
                                parent_id: 245,
                                is_active: 1,
                                is_deleted: 0,
                                created_at: '2017-12-18T06:32:18.000Z',
                                updated_at: '2017-12-18T06:32:18.000Z'
                            }
                        }
                    }
                }

            },
            context: {}
        }, {});
        t.is(result, true);
    } catch (err) {
        t.fail(err.message);
    }
});

test.before('Initialize Bizzy Error', function* before(t) {
    BizzyError.initializeErrors();
});

test.beforeEach('Initialize New Sandbox Before Each Test', function* beforeEach(t) {
    t.context.sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
});

test.afterEach.always('Restore Sandbox and Configuration After Each Test', function* afterEach(t) {
    t.context.sandbox.restore();
});
