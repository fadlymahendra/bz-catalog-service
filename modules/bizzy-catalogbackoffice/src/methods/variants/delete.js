'use strict';

const { DBContext, BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Authorization = require('../../utils/authorization');
const AttributeSetRepository = require('../../repositories/attribute_set');
const AttributeValueRepository = require('../../repositories/attribute_value');
const AttributeCodeRepository = require('../../repositories/attribute_code');
const VariantAdapter = require('../../utils/adapter/variants');

const schema = Joi.object().keys({
    id: Joi.string().required()
});

exports.deleteVariant = async function (data, context) {
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

    const result = await AttributeSetRepository.findById(input.id);


    if (!result) {
        throw BizzyError.NotFound('Variant tidak ditemukan');
    }

    await DBContext.startTransaction();
    try {
        const variantCode = result.AttributeCode.code;
        const skuAttachedWithVariant = await VariantAdapter.findSkuByAttributeCode(variantCode);
        if (skuAttachedWithVariant.length > 0) throw BizzyError.BadRequest('Variant sudah terdaftar pada sku');

        const attributeCodeId = result.attribute_code_id;

        const newAttributeCode = {
            is_deleted: 1,
            code: `${variantCode}_deleted`
        };

        const dataToUpdate = {
            is_deleted: 1
        };
        await AttributeValueRepository.updateMany({
            attribute_code_id: attributeCodeId
        }, dataToUpdate);

        await AttributeSetRepository.update(input.id, dataToUpdate);

        await AttributeCodeRepository.update(attributeCodeId, newAttributeCode);
    } catch (err) {
        await DBContext.rollback();
        throw BizzyError.BadRequest(err.message);
    }

    // Commit Transaction
    await DBContext.commit();

    return '';
};

module.exports = exports;
