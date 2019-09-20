'use strict';

const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const UomRespository = require('../../repositories/uom');
const Transformer = require('../../transformers/uoms/detail');

const schema = Joi.object().keys({
    id: Joi.string().required(),
    name: Joi.string().min(1).max(250).required()
});

exports.putUom = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    let {
        body: input
    } = data;

    input.id = data.path.id;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const id = parseInt(data.path.id);
    delete input.id;

    const find = await UomRespository.findById(id);
    if (!find) {
        throw BizzyError.NotFound('Uom not found');
    }

    const findName = await UomRespository.findByName(input.name);
    if (findName) {
        throw BizzyError.BadRequest("Rename uom can't with existing name or the same name");
    }

    await UomRespository.update(id, input);
    let result = await UomRespository.findById(id);

    result = Helper.parseDataObject(result);
    return Transformer.item(result);
};

module.exports = exports;
