'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const S3Repo = require('../repositories/s3_repo');

exports.uploads3 = async (data) => {
    const S3bucketName = S3Repo.getBucketName();
    const buf = Buffer.from(data.base64data, 'base64');
    const params = {
        Bucket: S3bucketName,
        Key: data.fileName,
        Body: buf,
        ACL: 'public-read'
    };
    try {
        return await S3Repo.upload(params);
    } catch (err) {
        throw BizzyError.BadRequest(`Failed to upload ${err.message}`);
    }
};

exports.createAlbum = Promise.coroutine(function* (albumName) {
    // if (!albumName) {
    //     throw BizzyError.BadRequest('Album names must contain at least one non-space character.');
    // }
    const S3bucketName = S3Repo.getBucketName();
    const params = {
        Bucket: S3bucketName,
        Key: albumName.trim()
    };
    return yield S3Repo.putObject(params);
});

exports.addImage = Promise.coroutine(function* (albumName, imageName, imageBase64) {
    const buf = new Buffer(imageBase64, 'base64');
    const S3bucketName = S3Repo.getBucketName();
    const params = {
        Bucket: S3bucketName,
        Key: albumName + imageName,
        Body: buf,
        ContentType: 'image/jpg',
        ACL: 'public-read'
    };
    try {
        return yield S3Repo.upload(params);
    } catch (err) {
        throw BizzyError.BadRequest(`Failed add image: ${err.message}`);
    }
});

module.exports = exports;
