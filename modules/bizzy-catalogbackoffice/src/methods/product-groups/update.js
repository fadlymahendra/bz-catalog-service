'use strict';

const Promise = require('bluebird');
const { DBContext, BizzyError, BizzyService } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const Repo = require('../../repositories/product_group');
const RepoCategory = require('../../repositories/category');
const RepoVariant = require('../../repositories/product_variant');
const ProductGroupAttributeRepository = require('../../repositories/product_group_attribute');
const ProductLogRepository = require('../../repositories/product_log');
const AttributeSetRepository = require('../../repositories/attribute_set');
const Transformer = require('../../transformers/product-groups/update');

const schemaPath = Joi.object().keys({
    id: Joi.number().required()
});

const schemaBody = Joi.object().keys({
    name: Joi.string().required(),
    category_id: Joi.string().required(),
    brand_id: Joi.string().required(),
    uom_id: Joi.string().required(),
    stocking_uom_id: Joi.string().required(),
    quantity_stocking_uom: Joi.string().allow(''),
    manufacturing_number: Joi.string().allow(''),
    manufacturing_number_type: Joi.string().allow(''),
    package_weight: Joi.string().required(),
    package_length: Joi.string().required(),
    package_width: Joi.string().required(),
    package_height: Joi.string().required(),
    package_content: Joi.string().allow(''),
    barcode: Joi.string().allow(''),
    description: Joi.string().required(),
    primary_image: Joi.string().allow(''),

    visibility: Joi.string().required(),
    specifications: Joi.array().required()
});

exports.putProductGroup = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }
    const user = Authorization.getUser(context);
    const Op = DBContext.ORMProvider.Op;

    let path;
    let input;

    try {
        path = await Joi.validate(data.path, schemaPath);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }
    try {
        input = await Joi.validate(data.body, schemaBody);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    input.manufacturing_number = (input.manufacturing_number === '') ? null : input.manufacturing_number;
    input.barcode = (input.barcode === '') ? null : input.barcode;
    input.primary_image = (input.primary_image === '') ? null : input.primary_image;
    input.quantity_stocking_uom = (input.quantity_stocking_uom === '') ? null : input.quantity_stocking_uom;
    input.package_content = (input.package_content === '') ? null : input.package_content;

    const product = await Repo.findByIdWithDetail(path.id);
    if (!product) {
        throw BizzyError.NotFound('Product not found');
    }
    const findSimilar = await Repo.findOne({
        name: input.name,
        id: {
            [Op.ne]: path.id
        },

        status: 1
    });
    if (findSimilar) {
        throw BizzyError.BadRequest('Another catalog with same name already exist!');
    }

    const attribute = await AttributeSetRepository.getVariantByCategoryId(input.category_id);
    input.variant_count = attribute.length;
    input.variant_matrix = JSON.stringify(attribute.map((row) => {
        return row.AttributeCode.code;
    }));

    const update = await Repo.update(path.id, input);
    if (update === null) {
        throw BizzyError.BadRequest('Update product group failed!');
    }

    input.id = path.id;
    await Promise.map(input.specifications, async (temp, i) => {
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
            product_group_id: parseInt(input.id),
            attribute_code_id: parseInt(input.specifications[i].attribute_code_id),
            attribute_value_id: attributeValueId,
            text_input: textInput,
            is_variant: 0
        };

        await ProductGroupAttributeRepository.update(input.specifications[i].id, dataForAttribute);
    });

    let result = await Repo.findByIdWithDetail(path.id);
    const log = {
        action: 'putProductGroup',
        title: 'Update Product Group',
        product_group_id: parseInt(result.id),
        payload: Helper.parseDataObject(result),
        user: {
            id: user.employee.id,
            name: user.employee.name,
            email: user.username,
            type: 'employee'
        },
        created_at: new Date(),
        updated_at: new Date()
    };
    await ProductLogRepository.insertOne(log);

    try {
        result = Helper.parseDataObject(result);
        result.Categories = await RepoCategory.getCategoryBreakdown(result.category_id);
        if (!result.Categories) {
            throw BizzyError.UnprocessableEntity('Problem with get category');
        }
    } catch (err) {
        throw BizzyError.UnprocessableEntity(err.message);
    }
    const arrVariant = await RepoVariant.findMultipleVariant({ product_group_id: path.id });

    await BizzyService.callAsync('bizzy-catalog-pubsub', 'publishItemERP', {
        context: {},
        data: {
            variants: arrVariant.map(item => ({
                sku: item.sku
            })),
            mode: 'update'
        }
    });

    await BizzyService.callAsync('bizzy-searchengine', 'reindex', {
        data: {
            body: {
                type: 'product_group',
                id: path.id,
                data: Object.assign(input, { variants: arrVariant })
            }
        }
    });

    return Transformer.item(result);
};

module.exports = exports;
