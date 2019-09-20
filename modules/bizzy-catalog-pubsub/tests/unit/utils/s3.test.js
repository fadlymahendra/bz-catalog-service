'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');
const s3 = require('../../../src/utils/s3');

class FakeS3Instance {
    putObject(params) { // eslint-disable-line class-methods-use-this
        return {
            promise: () => Promise.resolve({})
        };
    }

    getObject(params) { // eslint-disable-line class-methods-use-this
        return {
            promise: () => Promise.resolve(Buffer.from('hello world'))
        }
    }
}

test.serial('test getInstance returns new aws object', (t) => {
    t.truthy(s3.getS3Instance());
});

// - download
test.serial('test download successfull', Promise.coroutine(function* testDownloadSuccessfull(t) {
    t.context.sandbox.stub(s3, 'getS3Instance').returns(new FakeS3Instance());

    const result = yield s3.download('bucket', 'key');
    t.is('hello world', result.toString());
}));

test.serial('test download failed', Promise.coroutine(function* testDownloadFailed(t) {
    t.context.sandbox.stub(s3, 'getS3Instance').throws(new Error('omg'))

    try {
        yield s3.download('bucket', 'key');
    } catch (error) {
        t.is(error.message, 'Failed to download from s3 omg');
    }
}));

test.before('Initialize error handler', (t) => {
    BizzyError.initializeErrors();
});

test.beforeEach('Initialize New Sandbox Before Each Test', (t) => {
    t.context.sandbox = sinon.sandbox.create();
});

test.afterEach.always('Restore Sandbox and Configuration After Each Test', (t) => {
    t.context.sandbox.restore();
});
