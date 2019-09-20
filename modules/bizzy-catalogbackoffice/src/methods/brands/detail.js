'use strict';

const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const BrandRespository = require('../../repositories/brand');
const VariantRepository = require('../../repositories/product_variant');
const Transformer = require('../../transformers/brands/detail');

const schema = Joi.object().keys({
    id: Joi.string().required()
});

exports.getBrandById = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    let {
        path: input
    } = data;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    let result = await BrandRespository.findById(input.id);

    if (!result) {
        throw BizzyError.NotFound('Brand not found');
    }

    const skuList = await VariantRepository.grabSkuByBrand(input.id);

    const skuCount = skuList.length;

    result = Helper.parseDataObject(result);

    return Transformer.item(result, skuCount);
};

module.exports = exports;
