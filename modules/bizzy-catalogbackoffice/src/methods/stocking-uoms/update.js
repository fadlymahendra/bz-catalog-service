'use strict';

const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const Repo = require('../../repositories/stocking_uom');
const Transformer = require('../../transformers/stocking-uoms/detail');

const schema = Joi.object().keys({
    id: Joi.string().required(),
    name: Joi.string().min(1).max(250).required()
});

exports.putUomStock = async function (data, context) {
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

    const findId = await Repo.findById(id);

    if (!findId) {
        throw BizzyError.NotFound('Uom Stock not found');
    }

    const findName = await Repo.findByName(input.name);

    if (findName) {
        throw BizzyError.BadRequest("Rename Uom Stock can't with existing name or the same name");
    }

    await Repo.update(id, input);

    let result = await Repo.findById(id);

    result = Helper.parseDataObject(result);
    return Transformer.item(result);
};

module.exports = exports;
