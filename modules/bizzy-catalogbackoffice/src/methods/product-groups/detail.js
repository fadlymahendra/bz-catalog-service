'use strict';

const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const Repo = require('../../repositories/product_group');
const ProductLogRepository = require('../../repositories/product_log');
const RepoCategory = require('../../repositories/category');
const Transformer = require('../../transformers/product-groups/detail');


const schema = Joi.object().keys({
    id: Joi.string().required()
});

exports.getProductGroupById = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    let input;

    try {
        input = await Joi.validate(data.path, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    let result = await Repo.findByIdWithDetail(input.id);
    if (!result) {
        throw BizzyError.NotFound('Product not found');
    }

    result = Helper.parseDataObject(result);
    result.Categories = await RepoCategory.getCategoryBreakdown(result.category_id);

    const wheres = {
        product_group_id: parseInt(result.id),
        'user.type': 'employee'
    };
    result.total_history = await ProductLogRepository.count(wheres);

    return Transformer.item(result);
};

module.exports = exports;
