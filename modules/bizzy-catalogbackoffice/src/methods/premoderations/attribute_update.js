'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const RepoAttributeValue = require('../../repositories/attribute_value');
const RepoAttributeCode = require('../../repositories/attribute_code');
const RepoPremoderation = require('../../repositories/premoderation');

const schemaPath = Joi.object().keys({
    id: Joi.string().required(),
    attribute_id: Joi.number().required()
});

const schema = Joi.object().keys({
    is_variant: Joi.number().required(),
    attribute_value_id: Joi.number().required(),
    index: Joi.string().allow('')
});

exports.putPremoderationAttribute = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    let {
        path,
        body: input
    } = data;

    try {
        input = await Joi.validate(input, schema);
        path = await Joi.validate(path, schemaPath);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    if (input.is_variant === 1 && input.index === '') { throw BizzyError.BadRequest('Index Cannot be Empty'); }

    const requestData = await RepoPremoderation.findById(path.id);

    if (!requestData) {
        throw BizzyError.NotFound('Request Premoderation Value not Found');
    }

    const attributeValue = await RepoAttributeValue.findById(input.attribute_value_id);

    if (!attributeValue) {
        throw BizzyError.NotFound('Attribute Value not Found');
    }

    const attributeCode = await RepoAttributeCode.findById(path.attribute_id);

    if (!attributeCode) {
        throw BizzyError.NotFound('Attribute Code not Found');
    }

    if (attributeCode.type === 'textinput') { throw BizzyError.BadRequest('Attribute tidak diizinkan'); }

    const attr = {
        id: path.id,
        is_variant: input.is_variant,
        index: input.index,
        attribute_code_id: path.attribute_id,
        attribute_code: attributeCode.code,
        attribute_value_id: input.attribute_value_id,
        attribute_value_name: attributeValue.value
    };

    const payload = requestData.payload;

    try {
        for (let i = 0; i < payload.products.length; i++) {
            await RepoPremoderation.updateAttributeValueByProduct(attr, i);

            const updatedData = await RepoPremoderation.findById(path.id);

            if (input.is_variant === 1) {
                const newStatus = Helper.checkVariantStatus(updatedData.payload.products[i]);

                if (newStatus !== payload.products[i].variant_status) {
                    await RepoPremoderation.updateVariantStatus(path.id, i, newStatus);
                }
            } else {
                const newStatus = Helper.checkSpecStatus(updatedData.payload);

                if (newStatus !== payload.specification_status) {
                    await RepoPremoderation.updateSpecificationStatus(path.id, newStatus);
                }
            }
        }
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    return {
        data: {
            id: path.id,
            created_at: requestData.created_at,
            updated_at: requestData.updated_at
        }
    };
};

module.exports = exports;
