'use strict';

const { BizzyError, DBContext } = require('bizzy-common');
const Joi = require('joi');
const ProductVariantRepository = require('../../repositories/product_variant');
const Transformer = require('../../transformers/sku-managements/list_multiple');

const schema = Joi.object().keys({
    skus: Joi.string().required()
});

exports.getSkuManagementMultiple = async function (data, context) {
    const Op = DBContext.ORMProvider.Op;

    let {
        query: input
    } = data;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const sku = input.skus.split(',');
    const wheres = {
        sku: {
            [Op.in]: sku
        }
    };

    const result = await ProductVariantRepository.findMultipleVariant(wheres);

    return {
        data: result.map(Transformer.collection)
    };
};

module.exports = exports;
