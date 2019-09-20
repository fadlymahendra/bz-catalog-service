'use strict';

const Promise = require('bluebird');
const { DBContext, BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const AttributeSetRepo = require('../../repositories/attribute_set');
const AttributeCodeRepo = require('../../repositories/attribute_code');
const AttributeValueRepo = require('../../repositories/attribute_value');
const CategoryRepo = require('../../repositories/category');
const ProductGroupRepo = require('../../repositories/product_group');
const VariantLogRepo = require('../../repositories/variant_log');
const VariantAdapter = require('../../utils/adapter/variants');
const Transformer = require('../../transformers/variants/detail');
const VariantLog = require('../../transformers/variants/history');
const _ = require('lodash');

const EDITVARIANTVALUE = 'EDITVARIANTVALUE';
const EDITVARIANTNAME = 'EDITVARIANTNAME';
const EDITVARIANTCATEGORY = 'EDITVARIANTCATEGORY';
const EDITVARIANTDESCRIPTION = 'EDITVARIANTDESCRIPTION';

const schema = Joi.object().keys({
    id: Joi.string().required(),
    category: Joi.number().required(),
    label: Joi.string().required(),
    description: Joi.string().allow(''),
    value: Joi.array().min(1).required()
});

const getVariantValues = function (data) {
    const values = [];
    data.forEach((el) => {
        values.push(el.value);
    });
    return values;
};

const validateDeleteVariantValue = function (skus, variantId) {
    let status = true;
    skus.forEach((el) => {
        el.ProductVariants.filter(sku => sku.variant_value !== 'NO_VARIANT').forEach((key) => {
            let values = JSON.parse(key.variant_value);
            values = Helper.getObjectKeys(values);
            if (_.indexOf(values, variantId) !== -1) status = false; // variant value is using by sku
        });
    });

    return status;
};

const getValueIdByName = function (listValue, name) {
    let id = null;
    listValue.forEach((el) => {
        if (String(el.value).toLocaleLowerCase() === name) id = el.id;
    });
    return id;
};

const getAttributeLabel = function (categoryName, label) {
    const catName = String(categoryName).toLowerCase().replace(/ /g, '_');
    const labelName = String(label).toLowerCase().replace(/ /g, '_');
    return `${catName}_${labelName}`;
};

const isUpdate = function (oldValue, requestParams) {
    return oldValue !== requestParams;
};

exports.putVariant = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    const {
        body: input,
        path: inputPath
    } = data;

    input.id = inputPath.id;

    try {
        await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const id = input.id;
    let result = await VariantAdapter.findByIdVariant(id);
    if (!result) throw BizzyError.NotFound('Variant Tidak Ditemukan');
    result = Helper.parseDataObject(result);

    if (input.value.map(el => String(el).toLowerCase()).length !== _.uniq(input.value.map(el => String(el).toLowerCase())).length) {
        throw BizzyError.BadRequest('Terjadi Kesalahan, Duplikasi Nilai Variant');
    }

    const attributeSetId = result.id;
    let currentCategory = result.category_id;
    let attributeLabel = result.AttributeCode.label;

    let sku = await ProductGroupRepo.findAllSkuByCategory(result.category_id);
    sku = Helper.parseDataObject(sku);

    const listAttributeValue = result.AttributeCode.AttributeValues;

    const attributeCodeId = result.AttributeCode.id;
    const oldAttributeCode = result.AttributeCode.code;
    const dataUpdateToAttributeSet = {};
    const dataUpdateToAttributeCode = {};
    const actionLog = [];
    let catName = null;

    const isUpdateDescription = isUpdate(result.AttributeCode.description, input.description);
    const isUpdateCategory = isUpdate(result.category_id, Number(input.category));
    const isUpdateLabel = isUpdate(result.AttributeCode.label, input.label);
    let isUpdateValue = false;

    if (isUpdateDescription) {
        Object.assign(dataUpdateToAttributeCode, { description: input.description });
        actionLog.push({
            action: EDITVARIANTDESCRIPTION,
            payload: {
                before: result.AttributeCode.description,
                after: input.description
            }
        });
    }

    if (isUpdateCategory) {
        const idCategory = input.category;
        currentCategory = idCategory;
        const isValidCategory = await CategoryRepo.findOne({
            id: idCategory,
            level: 'C3'
        });
        if (!isValidCategory) throw BizzyError.BadRequest('Id Category tidak ditemukan');

        // Sku Validation
        catName = isValidCategory.name;
        const skuAttachedWithVariant = await VariantAdapter.findSkuByAttributeCode(result.AttributeCode.code);
        if (skuAttachedWithVariant.length > 0) throw BizzyError.BadRequest(`Variant sudah terdaftar pada sku dengan category '${catName}'`);
        Object.assign(dataUpdateToAttributeSet, { category_id: input.category });

        actionLog.push({
            action: EDITVARIANTCATEGORY,
            payload: {
                before: result.category_id,
                after: input.category
            }
        });
    }

    if (isUpdateLabel) {
        // Validate the code label
        attributeLabel = input.label;
        Object.assign(dataUpdateToAttributeCode, { label: input.label });
        actionLog.push({
            action: EDITVARIANTNAME,
            payload: {
                before: result.AttributeCode.label,
                after: input.label
            }
        });
    }

    if (isUpdateLabel || isUpdateCategory) {
        if (catName === null) {
            const cat = await CategoryRepo.findOne({
                is_deleted: 0,
                level: 'C3',
                id: result.category_id
            });

            catName = cat.name;
        }

        const newAttributeCode = getAttributeLabel(catName, attributeLabel);

        // Validate new label and code to AttributeCode
        const isAttributeCodeValid = await AttributeCodeRepo.findOne({
            code: newAttributeCode,
            is_deleted: 0
        });

        if (isAttributeCodeValid) throw BizzyError.BadRequest(`Variant dengan label '${attributeLabel}' sudah terdaftar`);
        Object.assign(dataUpdateToAttributeCode, { code: newAttributeCode });

        // update the variant_matrix && variant_value
        await VariantAdapter.replaceAttributeCode(oldAttributeCode, newAttributeCode);

        // request webhook
    }

    let variantToAdd = [];
    let variantToDelete = [];

    const lastValue = getVariantValues(result.AttributeCode.AttributeValues).map(el => String(el).toLowerCase());
    const newValue = input.value.map(el => String(el).toLowerCase());

    variantToAdd = _.difference(newValue, lastValue);
    variantToDelete = _.difference(lastValue, newValue);
    if (variantToAdd.length > 0 || variantToDelete.length > 0) {
        isUpdateValue = true;
        const beforeValues = _.join(result.AttributeCode.AttributeValues.map(el => el.value), ' | ');
        const afterValues = _.join(input.value, ' | ');
        actionLog.push({
            action: EDITVARIANTVALUE,
            payload: {
                before: beforeValues,
                after: afterValues
            }
        });
    }

    if (!isUpdateDescription && !isUpdateCategory && !isUpdateLabel && !isUpdateValue) throw BizzyError.BadRequest('Tidak ada data yang dirubah');

    await DBContext.startTransaction();

    try {
        if (Object.keys(dataUpdateToAttributeSet).length > 0) {
            await AttributeSetRepo.update(id, dataUpdateToAttributeSet);
        }

        if (Object.keys(dataUpdateToAttributeCode).length > 0) {
            await AttributeCodeRepo.update(attributeCodeId, dataUpdateToAttributeCode);
        }

        if (variantToAdd.length > 0) {
            // Add new variant
            variantToAdd = variantToAdd.map(el => ({
                attribute_code_id: attributeCodeId,
                value: Helper.toTitleCase(el)
            }));
            await AttributeValueRepo.insertMany(variantToAdd);
        }

        if (variantToDelete.length > 0) {
            // Delete Value
            let invalidValue = [];

            variantToDelete.forEach((item) => {
                const itemId = getValueIdByName(listAttributeValue, item);
                // if (itemId === null) { // catch here if variant value not valid }
                const valid = validateDeleteVariantValue(sku, itemId);
                if (!valid) invalidValue.push(item);
            });

            invalidValue = _.join(invalidValue, ',');
            if (invalidValue.length > 0) throw BizzyError.BadRequest(`Variant ${invalidValue} tidak dapat dihapus karena sudah terdafar dengan sku`);

            await VariantAdapter.updateManyVariantValue(attributeCodeId, variantToDelete, {
                is_deleted: 1
            });
        }
    } catch (err) {
        await DBContext.rollback();
        if (err instanceof BizzyError.BadRequest) throw err;
        throw BizzyError.InternalServerError(err.message);
    }

    // Commit the transaction
    await DBContext.commit();

    const category = await CategoryRepo.getCategoryBreakdown(currentCategory);
    result = await VariantAdapter.findByIdVariant(id);

    if (category.length === 0) throw BizzyError.NotFound('Variant Tidak Ditemukan');
    result.category = category;

    const variantLog = [];
    await Promise.map(actionLog, async (item) => {
        const logPayload = {
            attribute_set_id: attributeSetId,
            action: item.action,
            request: item.payload
        };
        variantLog.push(VariantLog.generateLog(logPayload, context));
    });

    await VariantLogRepo.insertMany(variantLog);

    return Transformer.item(result);
};

module.exports = exports;
