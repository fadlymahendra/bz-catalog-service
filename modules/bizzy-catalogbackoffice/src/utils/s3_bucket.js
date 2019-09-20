'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const AWS = require('aws-sdk');
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

exports.createAlbum = async function (albumName) {
    const s3 = new AWS.S3({
        accessKeyId: process.env.S3_KEY,
        secretAccessKey: process.env.S3_SECRET,
        region: process.env.S3_REGION
    });
    albumName.trim();
    if (!albumName) {
        throw BizzyError.BadRequest('Album names must contain at least one non-space character.');
    }
    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: albumName
    };
    return await s3.putObject(params).promise();
    // return yield s3.headObject(params).promise().then(()=>{
    //     s3.putObject(params).promise();
    // });
};

exports.addImage = async function (albumName, imageName, imageBase64) {
    const s3 = new AWS.S3({
        accessKeyId: process.env.S3_KEY,
        secretAccessKey: process.env.S3_SECRET,
        region: process.env.S3_REGION
    });
    const buf = new Buffer(imageBase64, 'base64');
    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: albumName + imageName,
        Body: buf,
        ContentType: 'image/jpg',
        ACL: 'public-read'
    };
    try {
        return await s3.upload(params).promise();
    } catch (err) {
        throw BizzyError.BadRequest('Failed add image: ' + err.message);   
    }
};

exports.viewAlbum = async function (albumName) {
    const s3 = new AWS.S3({
        accessKeyId: process.env.S3_KEY,
        secretAccessKey: process.env.S3_SECRET,
        region: process.env.S3_REGION
    });
    const params = {
        Bucket: process.env.S3_BUCKET,
        Prefix: albumName
    };
    return s3.listObjects(params).promise();
};

module.exports = exports;
