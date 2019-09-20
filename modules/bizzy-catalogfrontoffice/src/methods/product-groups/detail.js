'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const Repo = require('../../repositories/product_group');
const ProductVariantRepository = require('../../repositories/product_variant');
const RepoCategory = require('../../repositories/category');
const Transformer = require('../../transformers/product-groups/detail');


const schema = Joi.object().keys({
    id: Joi.string().required()
});

exports.getProductGroupById = async function (data, context) {
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

    let result = await Repo.findByIdWithDetail(input.id);

    if (!result) {
        throw BizzyError.NotFound('Product not found');
    }

    const categoryId = result.category_id;
    result = Helper.parseDataObject(result);

    try {
        const Categories = await RepoCategory.getCategoryBreakdown(categoryId);
        result.Categories = Categories;
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    let variantImages = await ProductVariantRepository.findAllProduct({
        product_group_id: input.id
    });
    variantImages = Helper.parseDataObject(variantImages);
    variantImages = Transformer.generateVariantImages(variantImages);
    result.variant_images = variantImages;

    return {
        data: Transformer.item(result)
    };
};

module.exports = exports;
