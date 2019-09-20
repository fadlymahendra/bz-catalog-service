const Promise = require('bluebird');
const AWS = require('aws-sdk');
const { BizzyError } = require('bizzy-common');

exports.getS3Instance = () => {
    const { S3_REGION } = process.env;
    AWS.config.setPromisesDependency(Promise);
    return new AWS.S3({ region: S3_REGION });
};

exports.download = async (bucket, key) => {
    try {
        const s3 = this.getS3Instance();
        const params = {
            Bucket: bucket,
            Key: key
        };

        return await s3.getObject(params).promise();
    } catch (err) {
        throw BizzyError.InternalServerError(`Failed to download from s3 ${err.message}`);
    }
};

module.exports = exports;
