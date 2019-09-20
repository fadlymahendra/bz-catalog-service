'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { DBContext, BizzyError } = require('bizzy-common');

const S3Repo = require('../../../src/repositories/s3_repo');
const S3Bucket = require('../../../src/utils/s3_bucket');
const Method = require('../../../src/methods/upload_image');
const validPayload = require('../../mocks/postUploadImage');
const validPayloadJpeg = require('../../mocks/postUploadImageCaseJpeg.json');
const validContext = require('../../mocks/context');

let now = new Date();
let clock = sinon.useFakeTimers(now.getTime());

test.serial('Successfull Upload Image PNG', function* (t) {
    t.context.sandbox.stub(S3Bucket, 'createAlbum').resolves();
    t.context.sandbox.stub(S3Bucket, 'addImage').resolves({
        Location: 'http://url',
        Key: 'image.jpg'
    });
    t.context.sandbox.stub(S3Repo, 'getBucketName').resolves('demo');

    try {
        yield Method.postUploadImage(validPayload, validContext);
        t.pass();
    } catch (err) {
        t.fail();
    }
});

test.serial('Successfull Upload Image JPEG with month >= 10', function* (t) {
    t.context.sandbox.stub(S3Bucket, 'createAlbum').resolves();
    t.context.sandbox.stub(S3Bucket, 'addImage').resolves({ Location: 'http://url',Key: 'image.jpg' });
    t.context.sandbox.stub(S3Repo, 'getBucketName').resolves('demo');

    // eslint-disable-next-line no-const-assign
    now = new Date(2018, 10, 1, 1, 0, 0, 0);
    clock = sinon.useFakeTimers(now.getTime());

    try {
        yield Method.postUploadImage(validPayloadJpeg, validContext);
        t.pass();
    } catch (err) {
        t.fail();
    }
});

test.serial('Successfull Upload Image JPEG with month < 10', function* (t) {
    t.context.sandbox.stub(S3Bucket, 'createAlbum').resolves();
    t.context.sandbox.stub(S3Bucket, 'addImage').resolves({ Location: 'http://url', Key: 'image.jpg' });
    t.context.sandbox.stub(S3Repo, 'getBucketName').resolves('demo');

    // eslint-disable-next-line no-const-assign
    now = new Date(2018, 9, 1, 1, 0, 0, 0);
    clock = sinon.useFakeTimers(now.getTime());

    try {
        yield Method.postUploadImage(validPayloadJpeg, validContext);
        t.pass();
    } catch (err) {
        t.fail();
    }
});

test.serial('Successfull Upload Image with utils tested', function* (t) {
    t.context.sandbox.stub(S3Repo, 'putObject').resolves();
    t.context.sandbox.stub(S3Repo, 'upload').resolves({
        Location: 'http://url',
        Key: 'image.jpg'
    });
    const bucketName = t.context.sandbox.stub(S3Repo, 'getBucketName');
    bucketName.onCall(0).resolves('demo');
    bucketName.onCall(1).resolves('demo');

    try {
        yield Method.postUploadImage(validPayload, validContext);
        t.pass();
    } catch (err) {
        t.fail();
    }
});

test.serial('Failed Upload Image, Reject on upload', function* (t) {
    t.context.sandbox.stub(S3Repo, 'putObject').resolves();
    t.context.sandbox.stub(S3Repo, 'upload').rejects();
    const bucketName = t.context.sandbox.stub(S3Repo, 'getBucketName');
    bucketName.onCall(0).resolves('demo');
    bucketName.onCall(1).resolves('demo');

    try {
        yield Method.postUploadImage(validPayload, validContext);
        console.log('Should return BadRequest');
        t.fail();
    } catch (err) {
        t.pass();
    }
});


test.serial('Failed to Upload Image, Invalid Payload', function* (t) {
    t.context.sandbox.stub(S3Bucket, 'createAlbum').resolves();
    t.context.sandbox.stub(S3Bucket, 'addImage').resolves({
        Location: 'http://url',
        Key: 'image.jpg'
    });
    t.context.sandbox.stub(S3Repo, 'getBucketName').resolves('demo');

    try {
        yield Method.postUploadImage({
            body: { images: 'iamges' }
        }, validContext);
        t.fail();
    } catch (err) {
        t.pass();
    }
});

test.serial('Failed to Upload Image, Unauthorized', function* (t) {
    t.context.sandbox.stub(S3Bucket, 'createAlbum').resolves();
    t.context.sandbox.stub(S3Bucket, 'addImage').resolves({
        Location: 'http://url',
        Key: 'image.jpg'
    });
    t.context.sandbox.stub(S3Repo, 'getBucketName').resolves('demo');

    try {
        yield Method.postUploadImage(validPayload, {});
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
    clock.restore();
});
