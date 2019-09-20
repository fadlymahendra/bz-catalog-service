'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const Transformer = require('../../../../src/transformers/products/download_template');

test.serial('collection_report: type-1', (t) => {
    const res = [{
        ProductVariant: {
            variant_value: 'NO_VARIANT',
            sku: '',
            long_name: '',
            ProductGroup: {
                Brand: {
                    name: ''
                }
            }
        },
        warranty_option: 'no_warranty',
        warranty_period: '',
        warranty_limit: '',
        warranty_coverage: '',
        is_indent: '',
        indent_period: '',
        indent_limit: '',
        is_active: ''
    }];
    const attribute = {
        code: [
        ]
    };

    const transformer = new Transformer.collection_report(res, attribute);
    const expected = [{
        sku_vendor: undefined,
        stock_available: undefined,
        tier_cogs_price_1: undefined,
        tier_cogs_price_2: undefined,
        tier_cogs_price_3: undefined,
        tier_min_qty_1: undefined,
        tier_min_qty_2: undefined,
        tier_min_qty_3: undefined,
        no: 1,
        sku_bizzy: '',
        long_name: '',
        brand: '',
        variant_1: '',
        variant_2: '',
        warranty_option: 'Tidak bergaransi',
        warranty_period: null,
        warranty_limit: '',
        warranty_coverage: '',
        is_indent: 'Tidak',
        indent_period: null,
        indent_limit: '',
        status_sku: 'Tidak'
    }];

    t.deepEqual(transformer, expected);
});

test.serial('collection_report: type-2', (t) => {
    const res = [{
        ProductVariant: {
            variant_value: 'NO_VARIANT',
            sku: '',
            long_name: '',
            ProductGroup: {
                Brand: {
                    name: ''
                }
            }
        },
        warranty_option: '',
        warranty_period: '',
        warranty_limit: '',
        warranty_coverage: '',
        is_indent: '',
        indent_period: '',
        indent_limit: '',
        is_active: ''
    }];
    const attribute = {
        code: [
        ]
    };

    const transformer = new Transformer.collection_report(res, attribute);
    const expected = [{
        sku_vendor: undefined,
        stock_available: undefined,
        tier_cogs_price_1: undefined,
        tier_cogs_price_2: undefined,
        tier_cogs_price_3: undefined,
        tier_min_qty_1: undefined,
        tier_min_qty_2: undefined,
        tier_min_qty_3: undefined,
        no: 1,
        sku_bizzy: '',
        long_name: '',
        brand: '',
        variant_1: '',
        variant_2: '',
        warranty_option: null,
        warranty_period: null,
        warranty_limit: '',
        warranty_coverage: '',
        is_indent: 'Tidak',
        indent_period: null,
        indent_limit: '',
        status_sku: 'Tidak'
    }];

    t.deepEqual(transformer, expected);
});

test.serial('generetaLog: type-1', (t) => {
    const now = new Date();
    sinon.useFakeTimers(now.getTime());

    const action = '';
    const payload = {};
    const context = {
        user: {
            first_name: '',
            last_name: '',
            customer: {
                organization_id: '',
                person_id: ''
            }
        }
    };

    const transformer = new Transformer.generetaLog(action, payload, context);
    const expected = {
        title: 'Bulk Tambah Produk',
        organization_id: context.user.customer.organization_id,
        payload,
        user: {
            id: context.user.customer.person_id,
            name: `${context.user.first_name} ${context.user.last_name}`,
            email: context.user.username,
            type: 'customer'
        },
        created_at: now,
        updated_at: now
    };

    t.deepEqual(transformer, expected);
});

test.serial('generetaLog: type-2', (t) => {
    const now = new Date();
    sinon.useFakeTimers(now.getTime());

    const action = 'BULK_EDITPRODUCT';
    const payload = {};
    const context = {
        user: {
            first_name: '',
            last_name: '',
            customer: {
                organization_id: '',
                person_id: ''
            }
        }
    };

    const transformer = new Transformer.generetaLog(action, payload, context);
    const expected = {
        title: 'Bulk Edit Produk',
        organization_id: context.user.customer.organization_id,
        payload,
        user: {
            id: context.user.customer.person_id,
            name: `${context.user.first_name} ${context.user.last_name}`,
            email: context.user.username,
            type: 'customer'
        },
        created_at: now,
        updated_at: now
    };

    t.deepEqual(transformer, expected);
});

test.serial('generetaLog: type-3', (t) => {
    const now = new Date();
    sinon.useFakeTimers(now.getTime());

    const action = 'BULK_ADDPRODUCT';
    const payload = {};
    const context = {
        user: {
            first_name: '',
            last_name: '',
            customer: {
                organization_id: '',
                person_id: ''
            }
        }
    };

    const transformer = new Transformer.generetaLog(action, payload, context);
    const expected = {
        title: 'Bulk Tambah Produk',
        organization_id: context.user.customer.organization_id,
        payload,
        user: {
            id: context.user.customer.person_id,
            name: `${context.user.first_name} ${context.user.last_name}`,
            email: context.user.username,
            type: 'customer'
        },
        created_at: now,
        updated_at: now
    };

    t.deepEqual(transformer, expected);
});


test.beforeEach('Initialize New Sandbox Before Each Test', (t) => {
    t.context.sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
});
test.afterEach.always('Restore Sandbox and Configuration After Each Test', (t) => {
    t.context.sandbox.restore();
});
