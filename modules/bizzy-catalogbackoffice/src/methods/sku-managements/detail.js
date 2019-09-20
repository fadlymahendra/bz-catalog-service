'use strict';

const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const RepoProductVariant = require('../../repositories/product_variant');
const RepoGeneral = require('../../repositories/general');
const Transformer = require('../../transformers/sku-managements/detail');

const schema = Joi.object().keys({
    id: Joi.string().required()
});


exports.getSkuManagementById = async function (data, context) {
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

    const id = parseInt(input.id);

    const findId = await RepoProductVariant.findByIdWithDetail(id);

    if (!findId) {
        throw BizzyError.NotFound('Sku Not Found');
    }

    const result = Helper.parseDataObject(findId);
    result.variants = [];
    if (result.variant_value !== 'NO_VARIANT') {
        const variantValue = JSON.parse(result.variant_value);

        const variants = await RepoGeneral.findAttributeByVariantValue(variantValue);

        result.variants = variants;
    }

    return Transformer.item(result);
};

module.exports = exports;
