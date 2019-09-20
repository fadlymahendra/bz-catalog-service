'use strict';

const Promise = require('bluebird');
const {
    BizzyError
} = require('bizzy-common');
const Joi = require('joi');
const Authorization = require('../../utils/authorization');
const AttributeCodeRepository = require('../../repositories/attribute_code');
const ProductMappingRepository = require('../../repositories/product_sku_mapping');
const ProductVariantRepository = require('../../repositories/product_variant');
const Transformer = require('../../transformers/products/sku_mapping');
const Helper = require('../../utils/helper');

const schema = Joi.object().keys({
    ids: Joi.string().required()
});

const listAllSkuName = function (data) {
    const list = [];
    data.forEach((el) => {
        list.push({
            sku: el.sku,
            long_name: el.long_name,
            primary_image: el.primary_image,
            category_name: el.ProductGroup.Category.name,
            uom_bizzy: {
                id: el.ProductGroup.Uom.id,
                name: el.ProductGroup.Uom.name
            }
        });
    });

    return list;
};

const getAllSpecifications = async function (data) {
    const list = [];
    await Promise.map(data, async (el) => {
        const specifications = [];
        await Promise.map(el.ProductGroup.ProductGroupAttributes, async (pga) => {
            const variantDetail = {};

            const wheresCode = {
                id: pga.attribute_code_id
            };
            const wheresValue = {
                id: pga.attribute_value_id
            };

            const attributeCode = await AttributeCodeRepository.findWithValue(wheresCode, wheresValue);
            variantDetail.code = attributeCode.label;
            variantDetail.value = pga.attribute_value_id ? attributeCode.AttributeValues[0].value : pga.text_input;

            specifications.push(variantDetail);
        });

        list.push({
            sku: el.sku,
            specifications
        });
    });
    return list;
};

exports.getProductMapping = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You have no authorization access');
    }

    let {
        query: input
    } = data;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const items = input.ids.split(',');
    const result = [];
    for (let i = 0; i < items.length; i += 1) {
        const row = items[i];
        const wheres = {};
        wheres['payload.catalog_id'] = row;
        wheres['payload.organization_id'] = context.user.customer.organization_id;

        const getMapping = await ProductMappingRepository.findAllMapping(wheres);
        const response = {};
        response.catalog_id = row;
        response.skus = getMapping;
        result.push(response);
    }

    return {
        data: result.map(Transformer.mapping)
    };
};

exports.getProductMappingCode = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You have no authorization access');
    }

    let {
        query
    } = data;

    const schemaQuery = Joi.object().keys({
        search: Joi.string().allow('').allow(null),
        page: Joi.number().positive().default(1).allow(null),
        limit: Joi.number().positive().default(null).allow(null)
    });

    try {
        query = await Joi.validate(query, schemaQuery);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const skip = Helper.offsetPagination(query.page, query.limit);
    const wheres = {
        'payload.organization_id': context.user.customer.organization_id,
        $or: [
            { product_sku: RegExp(`.*${query.search}.*`, 'i') },
            { 'payload.material_code': RegExp(`.*${query.search}.*`, 'i') },
            { 'payload.material_group': RegExp(`.*${query.search}.*`, 'i') },
            { 'payload.manufacturer_code': RegExp(`.*${query.search}.*`, 'i') },
            { 'payload.uom': RegExp(`.*${query.search}.*`, 'i') }
        ]
    };
    let getMapping = await ProductMappingRepository.findAllMapping(wheres);
    getMapping = getMapping.map(Transformer.createPayload);

    const result = [];
    // Make SKU as an array
    let sku = [];
    getMapping.forEach((element) => {
        sku.push(element.product_sku);
    });
    sku = Array.from(new Set(sku));

    // Find Product Variant by SKUs
    const productVariantDetail = await ProductVariantRepository.findBySkusWithPagination(sku, skip, query.limit);
    const totalData = await ProductVariantRepository.countBySkus(sku);
    // Get Product Mapping Payload by Product Variant Detail
    const productMappingPayload = [];
    productVariantDetail.forEach((element) => {
        const payload = getMapping.find(mapping => mapping.product_sku === element.sku);
        productMappingPayload.push(payload);
    });
    const row = {
        skus: productMappingPayload,
        skusName: listAllSkuName(productVariantDetail),
        specifications: await getAllSpecifications(productVariantDetail)
    };
    result.push(row);

    const response = result.map(Transformer.mappingItem);

    return {
        data: response,
        meta: {
            page: query.page,
            limit: query.limit,
            total_data: totalData,
            total_page: query.limit ? Math.ceil(totalData / query.limit) : 1
        }
    };
};

exports.getProductMappingBySkuCatalogId = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You have no authorization access');
    }

    let {
        body
    } = data;

    const schemaBody = Joi.object().keys({
        skus: Joi.string().required()
    });

    try {
        body = await Joi.validate(body, schemaBody);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const skus = body.skus.split(',');
    const wheres = {
        'payload.organization_id': context.user.customer.organization_id,
        product_sku: {
            $in: skus
        }
    };
    const productVariantDetail = await ProductVariantRepository.findBySkus(skus);
    const dataSku = listAllSkuName(productVariantDetail);

    let getMapping = await ProductMappingRepository.findAllMapping(wheres);
    if (getMapping.length === 0) {
        throw BizzyError.NotFound('Products not found');
    }
    getMapping = getMapping.map(Transformer.createPayload);
    getMapping.forEach((sku) => {
        const dataUom = dataSku.find(map => map.sku === sku.product_sku);
        let uomBizzy = '';
        if (dataUom.uom_bizzy.name) {
            uomBizzy = dataUom.uom_bizzy.name;
        }
        sku.payload.uom_bizzy = uomBizzy;
    });

    skus.forEach((sku) => {
        const find = getMapping.find(map => map.product_sku === sku);
        if (!find) {
            throw BizzyError.NotFound(`SKU ${sku} not found`);
        }
    });

    const skusDetail = getMapping.map(Transformer.onlyPayload);
    const response = {
        skus: skusDetail
    };

    return {
        data: response,
        meta: {}
    };
};

exports.getSkusByMaterialCodeGroup = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    let {
        query: input
    } = data;

    const schemaSearch = Joi.object().keys({
        search: Joi.string().allow(''),
        product_skus: Joi.string().required()
    });

    try {
        input = await Joi.validate(input, schemaSearch);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const wheres = {
        product_sku: {
            $in: input.product_skus.split(',')
        },
        $or: [
            { 'payload.material_code': RegExp(`.*${input.search}.*`, 'i') },
            { 'payload.material_group': RegExp(`.*${input.search}.*`, 'i') }
        ]
    };
    const result = await ProductMappingRepository.distinctBy('product_sku', wheres);
    return {
        data: {
            product_skus: result
        }
    };
};

module.exports = exports;
