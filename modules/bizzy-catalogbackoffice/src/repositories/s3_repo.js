'use strict';

const Promise = require('bluebird');
const AWS = require('aws-sdk');

function getInstance() {
    return new AWS.S3({
        accessKeyId: process.env.S3_KEY,
        secretAccessKey: process.env.S3_SECRET,
        region: process.env.S3_REGION
    });
}

exports.getBucketName = function () {
    return process.env.S3_BUCKET;
};

exports.upload = Promise.coroutine(function* (params) {
    const s3 = getInstance();
    return yield s3.upload(params).promise();
});

exports.putObject = Promise.coroutine(function* (params) {
    const s3 = getInstance();
    return yield s3.putObject(params).promise();
});

exports.listObjects = Promise.coroutine(function* (params) {
    const s3 = getInstance();
    return yield s3.listObjects(params).promise();
});

module.exports = exports;
