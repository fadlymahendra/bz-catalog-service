'use strict';

const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Authorization = require('../../utils/authorization');
const RepoPremoderation = require('../../repositories/premoderation');
const RepoBrand = require('../../repositories/brand');
const Helper = require('../../utils/helper');
const Transformer = require('../../transformers/premoderations/brand_create');

const schemaPath = Joi.object().keys({
    id: Joi.string().required()
});

const schema = Joi.object().keys({
    brand_id: Joi.number().required(),
    name: Joi.string().required(),
    image_url: Joi.string().default('').allow('')
});

exports.postPremoderationBrand = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    let {
        path,
        body: input
    } = data;

    try {
        input = await Joi.validate(input, schema);
        path = await Joi.validate(path, schemaPath);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const findPremoderation = await RepoPremoderation.findById(path.id);
    if (!findPremoderation) {
        throw BizzyError.NotFound('Premoderation Tidak Ditemukan');
    }

    let brand = null;

    if (input.brand_id === 0) {
        const result = await RepoBrand.findOrCreate(Helper.convertToNull(input));

        if (result[1] === false) {
            throw BizzyError.BadRequest('Merek Sudah Terdaftar');
        }

        brand = Helper.parseDataObject(result[0]);
    } else {
        brand = await RepoBrand.findById(input.brand_id);

        if (!brand) {
            throw BizzyError.NotFound('Merek Tidak Ditemukan');
        }
        brand = Helper.parseDataObject(brand);
    }

    await RepoPremoderation.updateBrand({
        id: path.id,
        brand_id: brand.id,
        brand_name: brand.name,
        brand_image: brand.image_url
    });

    return {
        data: Transformer.item(brand),
        message: 'Merek Berhasil Disimpan'
    };
};

module.exports = exports;
