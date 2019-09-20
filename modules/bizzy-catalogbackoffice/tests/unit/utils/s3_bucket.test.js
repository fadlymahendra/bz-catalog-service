'use strict';

const Promise = require('bluebird');
const test = require('ava');
const S3Repo = require('../../../src/repositories/s3_repo');
const S3Bucket = require('../../../src/utils/s3_bucket');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');

sinon.sandbox.create().stub(process, 'env').value({
    S3_KEY: 'AKIAILZVY6H76HUV675A',
    S3_SECRET: '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',
    S3_REGION: 'ap-southeast-1',
    S3_BUCKET: 'catalogproducts-staging'
});

const validPayload = require('../../mocks/postUploadImage.json');

const validAddImage = {
    Location: 'http://url'
};

test.serial('Success S3 uploads3', function* (t) {
    try {
        let {
            body: input
        } = validPayload;
        const image = input.image;
        const temp = image.split(',');
        const data = {
            fileName: 'File',
            base64data: temp[1]
        }
        const expected = {
            ETag: '"b0e49fca3cdee36d2708721681b87b25"',
            Location: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/File',
            key: 'File',
            Key: 'File',
            Bucket: 'catalogproducts-staging'
        };
        const result = yield S3Bucket.uploads3(data);
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err);
        t.fail();
    }
});

test.serial('Failed S3 uploads3 throw: Failed to upload', function* (t) {
    try {
        const data = {
            fileName: '',
            base64data: ''
        }
        yield S3Bucket.uploads3(data);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest);
    }
});

test.serial('Success S3 addImage', function* (t) {

    try {
        let {
            body: input
        } = validPayload;

        const image = input.image;
        const temp = image.split(',');
        const albumName = 'Album';
        const imageName = 'Gambar';
        const imageBase64 = temp[1];
        const expected = {
            ETag: '"b0e49fca3cdee36d2708721681b87b25"',
            Location: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/AlbumGambar',
            key: 'AlbumGambar',
            Key: 'AlbumGambar',
            Bucket: 'catalogproducts-staging'
        };
        const result = yield S3Bucket.addImage(albumName, imageName, imageBase64);
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err);
        t.fail();
    }
});

test.serial('Failed S3 addImage', function* (t) {

    try {
        const albumName = '';
        const imageName = '';
        const imageBase64 = '';
        yield S3Bucket.addImage(albumName, imageName, imageBase64);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest);
    }
});

test.serial('Success S3 viewAlbum', function* (t) {

    try {
        let {
            body: input
        } = validPayload;

        const image = input.image;
        const temp = image.split(',');
        const albumName = 'Album';
        const result = yield S3Bucket.viewAlbum(albumName);
        t.pass(result);
    } catch (err) {
        console.log(err);
        t.fail();
    }
});

test.serial('Success S3 createAlbum', function* (t) {
    try {
        let {
            body: input
        } = validPayload;

        const image = input.image;
        const temp = image.split(',');
        const albumName = 'Album';
        const result = yield S3Bucket.createAlbum(albumName);
        t.pass(result);
    } catch (err) {
        console.log(err);
        t.fail();
    }
});

test.serial('Failed S3 createAlbum throw: Album names must contain at least one non-space character', function* (t) {
    try {
        const albumName = '';
        yield S3Bucket.createAlbum(albumName);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'Album names must contain at least one non-space character.');
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