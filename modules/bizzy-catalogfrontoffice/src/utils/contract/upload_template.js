'use strict';

const { BizzyError } = require('bizzy-common');
const S3Repo = require('../../repositories/s3_repo');

exports.upload = async function (data) {
    const S3bucketName = S3Repo.getBucketName();
    const params = {
        Bucket: S3bucketName,
        Key: `contract-template/${data.fileName}`,
        Body: data.buffer,
        ACL: 'public-read'
    };
    try {
        return await S3Repo.upload(params);
    } catch (err) {
        throw BizzyError.BadRequest(`Failed to upload ${err.message}`);
    }
};

module.exports = exports;
