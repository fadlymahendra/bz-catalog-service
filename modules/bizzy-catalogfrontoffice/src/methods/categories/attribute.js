'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Authorization = require('../../utils/authorization');
const CategoryRepository = require('../../repositories/category');
const AttributeSetRepository = require('../../repositories/attribute_set');
const Transformer = require('../../transformers/categories/attribute');

const schema = Joi.object().keys({
    id: Joi.string().required()
});

exports.getCategoryAttribute = async function getCategoryAttribute(data, context) {
    let {
        path: input
    } = data;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const category = await CategoryRepository.findOne({ id: input.id, level: 'c3' });
    if (!category) {
        throw BizzyError.NotFound('Category c3 not found');
    }

    const result = await AttributeSetRepository.findVariantSpec(input.id);

    return {
        data: Transformer.item(result)
    };
};

module.exports = exports;
