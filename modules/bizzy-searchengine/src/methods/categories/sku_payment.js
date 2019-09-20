'use strict';


const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const CategoryRepository = require('../../repositories/category');

const schema = Joi.object().keys({
    sku: Joi.string().required()
});

exports.getSkuPayment = async function (data, context) {

    let {
        query: input
    } = data;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const wheres = {};

    wheres.sku = input.sku.split(',');

    const result = await CategoryRepository.findSkuPayment(wheres);

    return {
        data: result
    };
};

module.exports = exports;
