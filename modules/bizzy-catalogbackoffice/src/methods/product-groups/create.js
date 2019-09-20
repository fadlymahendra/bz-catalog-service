'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Authorization = require('../../utils/authorization');
const ProductGroupRepository = require('../../repositories/product_group');
const ProductGroupAttributeRepository = require('../../repositories/product_group_attribute');
const AttributeSetRepository = require('../../repositories/attribute_set');

const schema = Joi.object().keys({
    name: Joi.string().required(),
    category_id: Joi.string().required(),
    brand_id: Joi.string().required(),
    uom_id: Joi.string().required(),
    stocking_uom_id: Joi.string().required(),
    quantity_stocking_uom: Joi.string().allow(''),
    manufacturing_number: Joi.string().allow(''),
    package_weight: Joi.string().required(),
    package_length: Joi.string().required(),
    package_width: Joi.string().required(),
    package_height: Joi.string().required(),
    package_content: Joi.string().allow(''),
    barcode: Joi.string().allow(''),
    description: Joi.string().required(),
    primary_image: Joi.string().allow(''),
    status: Joi.string().required(),
    visibility: Joi.string().required(),
    specifications: Joi.array().required()
});

exports.postProductGroup = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    let { body: input } = data;
    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    input.created_by = Authorization.getUserId(context);
    input.manufacturing_number = (input.manufacturing_number === '') ? null : input.manufacturing_number;
    input.barcode = (input.barcode === '') ? null : input.barcode;
    input.primary_image = (input.primary_image === '') ? null : input.primary_image;
    input.quantity_stocking_uom = (input.quantity_stocking_uom === '') ? null : input.quantity_stocking_uom;
    input.package_content = (input.package_content === '') ? null : input.package_content;

    const attribute = await AttributeSetRepository.getVariantByCategoryId(input.category_id);
    input.variant_count = attribute.length;
    input.variant_matrix = JSON.stringify(attribute.map((row) => {
        return row.AttributeCode.code;
    }));

    const result = await ProductGroupRepository.findOrCreate(input);
    if (result[1] === false) {
        throw BizzyError.BadRequest('Product Already Exist');
    } else {
        input.product_group_id = result[0].id;

        for (let i = 0; i < attribute.length; i++) {
            const dataForAttribute = {
                product_group_id: parseInt(input.product_group_id),
                attribute_code_id: parseInt(attribute[i].attribute_code_id),
                attribute_value_id: null,
                text_input: null,
                is_variant: 1
            };
            await ProductGroupAttributeRepository.findOrCreate(dataForAttribute);
        }
        for (let i = 0; i < input.specifications.length; i++) {
            let attributeValueId = null;
            let textInput = null;
            const type = input.specifications[i].type;
            if (type === 'dropdown') {
                attributeValueId = input.specifications[i].attribute_value_id;
                if (!attributeValueId) {
                    throw BizzyError.BadRequest('Attribute value can not be empty!');
                }
            }
            if (type === 'textinput') {
                textInput = input.specifications[i].text_input;
                if (!textInput) {
                    throw BizzyError.BadRequest('Text input can not be empty!');
                }
            }

            const dataForAttribute = {
                product_group_id: parseInt(input.product_group_id),
                attribute_code_id: parseInt(input.specifications[i].attribute_code_id),
                attribute_value_id: attributeValueId,
                text_input: textInput,
                is_variant: 0,
                visibility: 0
            };
            await ProductGroupAttributeRepository.findOrCreate(dataForAttribute);
        }
    }

    return input;
};

module.exports = exports;
