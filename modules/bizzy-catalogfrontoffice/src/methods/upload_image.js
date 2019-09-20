'use strict';

const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../utils/helper');
const Authorization = require('../utils/authorization');
const S3Bucket = require('../utils/s3_bucket');
const Uuid = require('uuid');

const schema = Joi.object().keys({
    image: Joi.string().required()
});

function createAlbumName() {
    const dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1; /* months from 1-12 */
    month = (parseInt(month) < 10 ? (`0${month}`) : month);
    const year = dateObj.getUTCFullYear();
    const newdate = `${year}/${month}/`;
    return newdate;
}

exports.postUploadImage = async function postUploadImage(data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    let {
        body: input
    } = data;
    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }
    const albumName = createAlbumName();
    const image = input.image;
    const temp = image.split(',');
    const imageMime = temp[0].slice(5, temp[0].lastIndexOf(';'));
    const imageBase64 = temp[1];
    let imageExt = Helper.lowerTrim(imageMime.split('/')[1]);
    imageExt = (imageExt === 'jpeg') ? 'jpg' : imageExt;
    let imageName = `product_${Uuid.v4()}.`;
    imageName += imageExt;

    await S3Bucket.createAlbum(albumName);
    const result = await S3Bucket.addImage(albumName, imageName, imageBase64);
    const fileName = result.Key;
    const fileUrlCDN = `${process.env.S3_CDN}/${fileName}`;
    return {
        data: { url: fileUrlCDN }
    };
};

module.exports = exports;
