'use strict';


const { DBContext, BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const UomRespository = require('../../repositories/uom');
const Transformer = require('../../transformers/uoms/list');

const schema = Joi.object().keys({
    search: Joi.string().allow('')
});


exports.getUom = async function (data, context) {
    const Op = DBContext.ORMProvider.Op;

    let { query: input } = data;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const wheres = {};

    if (input.search) {
        wheres.name = { [Op.like]: `%${input.search}%` };
    }

    const result = await UomRespository.findAll(wheres);
    const rows = Helper.parseDataObject(result);

    return {
        data: rows.map(Transformer.transformUom)
    };
};

module.exports = exports;
