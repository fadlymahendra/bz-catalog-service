'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const BrandRepository = require('../../repositories/brand');
const CategoryRepository = require('../../repositories/category');
const CustomeRepository = require('../../repositories/raw_query');
const GeneralRepository = require('../../repositories/general');
const ProductVariantRepository = require('../../repositories/product_variant');
const ProductGroupRepository = require('../../repositories/product_group');
const ProductVendorRepository = require('../../repositories/product_vendor');
const ProductGroupAttributeCategory = require('../../repositories/product_group_attribute');
const StockingUomRepository = require('../../repositories/stocking_uom');
const SyncRepository = require('../../repositories/sync_service');
const UomRepository = require('../../repositories/uom');
const Helper = require('../../utils/helper');
const Transformer = require('../../transformers/product-detail/variant');
const ProductMappingRepository = require('../../repositories/product_sku_mapping');
const SkuRepository = require('../../repositories/sku');

const schema = Joi.object().keys({
    id: Joi.string().required()
});

const getVariantAttribute = async function (variant) {
    let variants = [];
    if (variant.variant_value !== 'NO_VARIANT') {
        const variantValue = JSON.parse(variant.variant_value);

        const variantnya = await GeneralRepository.findAttributeByVariantValue(variantValue);
        variants = variantnya;
    }

    return variants;
};

const getVendorInformation = async function (vendor) {
    const ids = vendor.map(row => row.warehouse_id);
    return SyncRepository.findWarehouseByIds(ids.join(','));
};

const getAdditionalData = async function (result, ignoreActive = false) {
    const productGroup = await ProductGroupRepository.findById(result.product_group_id);
    const categoryObject = await CustomeRepository.findAllCategoryId(productGroup.category_id);
    result.payload = productGroup;
    const category = categoryObject[0];
    [
        result.vendors,
        result.brand,
        result.uom,
        result.stocking_uom,
        result.c0,
        result.c1,
        result.c2,
        result.c3,
        result.product_specifications
    ] = await Promise.join(
        ProductVendorRepository.findByVariant(result.id, ignoreActive),
        BrandRepository.findById(productGroup.brand_id),
        UomRepository.findById(productGroup.uom_id),
        StockingUomRepository.findById(productGroup.stocking_uom_id),
        CategoryRepository.findOne({ id: parseInt(category.c0) }),
        CategoryRepository.findOne({ id: parseInt(category.c1) }),
        CategoryRepository.findOne({ id: parseInt(category.c2) }),
        CategoryRepository.findOne({ id: parseInt(category.c3) }),
        ProductGroupAttributeCategory.findAll({ product_group_id: parseInt(result.product_group_id), is_variant: 0 })
    );
    return result;
};

const getAdditionalDataPdp = async function (result) {
    const productGroup = await ProductGroupRepository.findById(result.product_group_id);
    const newCategoryObject = await CategoryRepository.getHierarchicalCategory(productGroup.category_id);
    // console.time('getVendors');
    // const vendors = await ProductVendorRepository.findByVariant(result.id);
    // console.timeEnd('getVendors');
    result.payload = productGroup;
    result.category = newCategoryObject;
    [
        result.brand,
        result.uom,
        result.stocking_uom,
        result.product_specifications
    ] = await Promise.join(
        BrandRepository.findById(productGroup.brand_id),
        UomRepository.findById(productGroup.uom_id),
        StockingUomRepository.findById(productGroup.stocking_uom_id),
        ProductGroupAttributeCategory.findAll({ product_group_id: parseInt(result.product_group_id), is_variant: 0 })
    );
    return result;
};

const getPriceEngine = async function (result, sku, vendors, context) {
    const payload = [];
    vendors.forEach((row) => {
        const items = {
            vendor_id: row.vendor_id.toString(),
            sku_number: sku,
            category_id: result.category_id.toString(),
            brand_id: result.brand_id.toString()
        };

        payload.push(items);
    });
    return SyncRepository.priceEngineCart(payload, context);
};

const getMappingProduct = async function (sku, context) {
    const wheres = {
        product_sku: sku
    };
    wheres['payload.organization_id'] = context.user.customer.organization_id;
    wheres.$or = [
        {
            'payload.material_code': {
                $ne: ''
            }
        },
        {
            'payload.material_group': {
                $ne: ''
            }
        }
    ];
    const getMapping = await ProductMappingRepository.findMappingSku(wheres);
    return getMapping;
};

exports.getProductDetailByVariant = async function (data, context) {
    // console.time('getProductDetailByVariant');
    let {
        path: input
    } = data;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const wheres = {
        is_active: 1,
        sku: input.id
    };

    // if (Helper.isNumber(input.id)) {
    //     wheres.id = parseInt(input.id);
    // } else {
    //     wheres.sku = input.id;
    // }

    const result = await ProductVariantRepository.findOne(wheres);
    if (!result) {
        throw BizzyError.NotFound('Product SKU tidak ditemukan');
    }

    let response = {};
    response = await getAdditionalData(Helper.parseDataObject(result));
    [
        response.vendor_information,
        response.variant_attribute,
        response.price_engine,
        response.product_mapping
    ] = await Promise.join(
        getVendorInformation(response.vendors),
        getVariantAttribute(result),
        getPriceEngine(response.payload, input.id, response.vendors, context),
        getMappingProduct(input.id, context)
    );
    // console.timeEnd('getProductDetailByVariant');
    return Transformer.item(response, context.user.customer.channel_type);
};

exports.getProductDetailByVariantPdp = async function (data, context) {
    // console.time('getProductDetailByVariantPoc');
    let {
        path: input
    } = data;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }
    // if (Helper.isNumber(input.id)) {
    //     wheres.id = parseInt(input.id);
    // } else {
    //     wheres.sku = input.id;
    // }
    let response = {};
    // const productMapping = await getMappingProduct(input.id, context);
    const cache = await SkuRepository.getSkuDetailMongo(input.id);
    if (cache.length > 0) {
        // cache[0].material_code = (productMapping.length !== 0) ? productMapping[0].payload.material_code : '';
        // cache[0].material_group = (productMapping.length !== 0) ? productMapping[0].payload.material_group : '';
        // cache[0].is_mapping = (productMapping.length === 0) ? 0 : 1;
        response.data = cache[0];
        // console.timeEnd('getProductDetailByVariantPoc');
        return response;
    }

    const wheres = {
        is_active: 1,
        sku: input.id
    };

    const result = await ProductVariantRepository.findOne(wheres);
    if (!result) {
        throw BizzyError.NotFound('Product SKU tidak ditemukan');
    }

    response = await getAdditionalDataPdp(Helper.parseDataObject(result));
    // response.product_mapping = productMapping;
    response.variant_attribute = await getVariantAttribute(result);

    // console.timeEnd('getProductDetailByVariantPoc');
    return Transformer.itemPdp(response, context.user.customer.channel_type);
};

exports.getProductDetailByVariantForERP = async function (data, context) {
    let {
        path: input
    } = data;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const wheres = {
        // is_active: 1,
        sku: input.id
    };
    /*
    if (Helper.isNumber(input.id)) {
        wheres.id = parseInt(input.id);
    } else {
        wheres.sku = input.id;
    }
*/
    let result = await ProductVariantRepository.findOne(wheres);
    if (!result) {
        throw BizzyError.NotFound('Product SKU tidak ditemukan');
    }
    result = result.getValues();
    result.additional_image = '[]';

    let response = {};
    response = await getAdditionalData(Helper.parseDataObject(result), true);
    response.vendor_information = await getVendorInformation(response.vendors);
    response.variant_attribute = await getVariantAttribute(result);
    // response.price_engine = await getPriceEngine(response.payload, input.id, response.vendors, context);
    // response.product_mapping = await getMappingProduct(input.id, context);

    return Transformer.itemERP(response);
};

module.exports = exports;
