'use strict';

const { DBContext, BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Authorization = require('../../utils/authorization');
const AttributeSetRepository = require('../../repositories/attribute_set');
const AttributeValueRepository = require('../../repositories/attribute_value');
const AttributeCodeRepository = require('../../repositories/attribute_code');
const CategoryRepository = require('../../repositories/category');
const VariantLogRepository = require('../../repositories/variant_log');
const VariantHistory = require('../../transformers/variants/history');
const Helper = require('../../utils/helper');
const _ = require('lodash');

const ADDVARIANT = 'ADDVARIANT';

const schema = Joi.object().keys({
    label: Joi.string().required(),
    category: Joi.number().positive().required(),
    description: Joi.string().allow(''),
    values: Joi.array().min(1).required()
});

const getAttributeLabel = function (categoryName, label) {
    const catName = String(categoryName).toLowerCase().replace(/ /g, '_');
    const labelName = String(label).toLowerCase().replace(/ /g, '_');
    return `${catName}_${labelName}`;
};

exports.postVariant = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    let {
        body: requestBody
    } = data;

    try {
        requestBody = await Joi.validate(requestBody, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const actionLog = {
        action: ADDVARIANT,
        payload: requestBody
    };

    let newAttributeSet;

    await DBContext.startTransaction();

    try {
        const isCategoryExist = await CategoryRepository.findOne({
            id: requestBody.category,
            level: 'C3',
            is_active: 1
        });

        if (!isCategoryExist) throw BizzyError.BadRequest('Category tidak ditemukan');

        const attributeCode = getAttributeLabel(isCategoryExist.name, requestBody.label);

        const isLabelExist = await AttributeCodeRepository.findOne({
            code: attributeCode,
            is_deleted: 0
        });

        if (isLabelExist) throw BizzyError.BadRequest('Label sudah terdaftar');

        const newAttributeCodeValues = Object.create({
            label: requestBody.label,
            type: 'dropdown',
            code: attributeCode
        });

        if (requestBody.description) Object.assign(newAttributeCodeValues, { description: requestBody.description });

        const newAttributeCode = await AttributeCodeRepository.createOne(newAttributeCodeValues);

        newAttributeSet = await AttributeSetRepository.createOne({
            category_id: requestBody.category,
            attribute_code_id: newAttributeCode.id,
            is_variant: 1,
            created_by: context.user.employee.id
        });

        if (requestBody.values.map(el => String(el).toLowerCase()).length !== _.uniq(requestBody.values.map(el => String(el).toLowerCase())).length) {
            throw BizzyError.BadRequest('Terjadi Kesalahan, Duplikasi Nilai Variant');
        }

        const attributeValues = requestBody.values.map(el => ({
            attribute_code_id: newAttributeCode.id,
            value: Helper.toTitleCase(el)
        }));
        await AttributeValueRepository.insertMany(attributeValues);
    } catch (err) {
        await DBContext.rollback();
        throw BizzyError.BadRequest(err.message);
    }

    // Commit Transaction
    await DBContext.commit();

    let variantLog = {
        attribute_set_id: newAttributeSet.id,
        action: actionLog.action,
        request: actionLog.payload
    };
    variantLog = VariantHistory.generateLog(variantLog, context);
    await VariantLogRepository.insertOne(variantLog);

    return {
        message: 'Variant Telah Disimpan'
    };
};

module.exports = exports;
