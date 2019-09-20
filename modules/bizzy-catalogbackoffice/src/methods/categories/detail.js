'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const CategoryRepository = require('../../repositories/category');
const Transformer = require('../../transformers/categories/detail');

const schema = Joi.object().keys({
    id: Joi.string().required()
});

exports.getCategoryById = async function (data, context) {
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

    const where = {
        parent_id: input.id,
        is_active: 1
    };
    const result = await CategoryRepository.findAll(where);
    const rows = Helper.parseDataObject(result);

    return {
        data: rows.map(Transformer.collection)
    };
};

module.exports = exports;
