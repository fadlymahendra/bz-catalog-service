'use strict';

const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const VariantAdapter = require('../../utils/adapter/variants');
const CategoryRepository = require('../../repositories/category');
const Transformer = require('../../transformers/variants/detail');

const schema = Joi.object().keys({
    id: Joi.string().required()
});

exports.getVariantById = async function (data, context) {
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

    const id = String(input.id).replace('VR-', '');
    let result = await VariantAdapter.findByIdVariant(id);
    if (!result) throw BizzyError.NotFound('Variant Tidak Ditemukan');
    result = Helper.parseDataObject(result);

    const category = await CategoryRepository.getCategoryBreakdown(result.category_id);
    if (category.length === 0) throw BizzyError.NotFound('Variant Tidak Ditemukan');
    result.category = category;

    return {
        data: Transformer.item(result)
    };
};

module.exports = exports;
