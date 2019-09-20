'use strict';

// Plugin helper
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');
const S3Repo = require('../../../../src/repositories/s3_repo');

// Method
const Methods = require('../../../../src/utils/contract/upload_template');

const payload = {
    filename: 'Hahahaha.xlsx',
    buffer: 'Bufffferrrr'
};

const responseUpload = {
    ETag: '"054e3e0d75bb78dd1a7adf390002cd77"',
    Location: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/contract-template/template-contract-3615f75e-c989-4b03-9800-e38f022e52ce.xlsx',
    key: 'contract-template/template-contract-3615f75e-c989-4b03-9800-e38f022e52ce.xlsx',
    Key: 'contract-template/template-contract-3615f75e-c989-4b03-9800-e38f022e52ce.xlsx',
    Bucket: 'catalogproducts-staging'
};

test.serial('Upload Template -> Failed', async (t) => {
    t.context.sandbox.stub(S3Repo, 'upload')
        .throws(new Error('karena memang gagal aja'));

    await Methods.upload(payload)
        .then((response) => {
            t.fail('Seharusnya tak terupload');
        }).catch((error) => {
            t.is(error.message, 'Failed to upload karena memang gagal aja');
        });
});

test.serial('Upload Template -> Success', async (t) => {
    t.context.sandbox.stub(S3Repo, 'upload')
        .resolves(responseUpload);

    await Methods.upload(payload)
        .then((response) => {
            t.deepEqual(response, responseUpload);
        });
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
