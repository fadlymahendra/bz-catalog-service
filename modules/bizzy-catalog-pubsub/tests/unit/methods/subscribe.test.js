'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const {
    BizzyError
} = require('bizzy-common');
const method = require('../../../src/methods/subscribe');
const skuMappingRepo = require('../../../src/repositories/product_sku_mapping_repo');
const OrganizationSubRepo = require('../../../src/repositories/organization_sub_repo');
const skuMappingJob = require('../../../src/repositories/product_sku_mapping_job_repo');
const catalogPubsubService = require('../../../src/repositories/catalog_pubsub_service_repo');
const s3 = require('../../../src/utils/s3');
const _ = require('lodash');

const syncCreateProductMappingRequest = {
    catalog_management: "H4sIAAAAAAAAEyXMUQuCMBQF4L8S91lEp1vpk/mwAiEKAoOIuMu7GDSVaS+J/71Zb4fvcM4EnXtiaz44mq69mwbylK0DWAJwpVScKNo0ItFppDImEkGZBt+PZAfIr3CJOavObFdJr3V52sdlLbcHuAXwHshBPv2+eBQF0KIlfytJObM6OhzRol+RRfPyrhcP+78Xtg8fnYV5/gJDKzugowAAAA==",
    "publishedAt": "2018-09-29T08:24:15Z"
};

test.serial('syncCreateProductMapping SUCCESS', async (t) => {
    const syncProductSkuMapping = t.context.sandbox.stub(skuMappingRepo, 'syncProductSkuMapping');
    syncProductSkuMapping.onCall(0).resolves();
    syncProductSkuMapping.onCall(1).resolves();

    try {
        const result = await method.syncCreateProductMapping(syncCreateProductMappingRequest, {});
        t.deepEqual(result.message, 'Success')
    } catch (err) {
        t.fail(err.message)
    }
});

test.serial('syncCreateProductMapping ERROR', async (t) => {
    const syncProductSkuMapping = t.context.sandbox.stub(skuMappingRepo, 'syncProductSkuMapping');
    syncProductSkuMapping.onCall(0).resolves();
    syncProductSkuMapping.onCall(1).rejects();

    try {
        await method.syncCreateProductMapping(syncCreateProductMappingRequest, {});
        t.fail('Should eror')
    } catch (err) {
        t.is(err.message, 'Error')
    }
});

const syncDeleteProductMappingRequest = {
    catalog_management: {
        organization_id: 312,
        id: '5b150bfa24f585901d76a01e',
        items: [
            '93VN03AVNO',
            'TRG8QVK5SI'
        ]
    },
    publishedAt: '2018-09-29T08:24:15Z'
};

test.serial('syncDeleteProductMapping SUCCESS', async (t) => {
    t.context.sandbox.stub(skuMappingRepo, 'deleteManyProductMapping').resolves();
    try {
        const result = await method.syncDeleteProductMapping(syncDeleteProductMappingRequest, {});
        t.deepEqual(result.message, 'Success');
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('syncDeleteProductMapping ERROR', async (t) => {
    t.context.sandbox.stub(skuMappingRepo, 'deleteManyProductMapping').rejects();
    try {
        await method.syncDeleteProductMapping(syncDeleteProductMappingRequest, {});
        // eslint-disable-next-line no-undef
        t.fail(result.message, 'Success');
    } catch (err) {
        t.is(err.message, 'Error');
    }
});

test.serial('syncOrganizationSub: Successfuly', async (t) => {
    t.context.sandbox.stub(OrganizationSubRepo, 'addOrganizationSub').resolves();
    try {
        const data = {
            data: {}
        };

        const result = await method.syncOrganizationSub(data, {});
        t.is(result.message, 'Success');
    } catch (err) {
        t.fail(err.message, 'Error');
    }
});


test.serial('syncOrganizationSub: Successfuly with No data sent', async (t) => {
    t.context.sandbox.stub(OrganizationSubRepo, 'addOrganizationSub').resolves();
    try {
        const data = {};

        const result = await method.syncOrganizationSub(data, {});
        t.is(result.message, 'No data sent');
    } catch (err) {
        t.fail(err.message, 'Error');
    }
});


test.serial('syncOrganizationSub: throw InternalServerError when addOrganizationSub()', async (t) => {
    t.context.sandbox.stub(OrganizationSubRepo, 'addOrganizationSub').rejects();
    try {
        const data = {
            data: {}
        };

        const result = await method.syncOrganizationSub(data, {});
        t.fail(result.message, 'should be throw InternalServerError when addOrganizationSub()');
    } catch (err) {
        t.is(err.message, 'Error');
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
