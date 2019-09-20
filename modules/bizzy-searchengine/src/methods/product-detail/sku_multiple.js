'use strict';

const Bluebird = require('bluebird');
const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const ProductVariantRepository = require('../../repositories/product_variant');
const ProductVendorRepository = require('../../repositories/product_vendor');
const ProductGroupRepository = require('../../repositories/product_group');
const CustomeRepository = require('../../repositories/raw_query');
const UomRepository = require('../../repositories/uom');
const BrandRepository = require('../../repositories/brand');
const StockingUomRepository = require('../../repositories/stocking_uom');
const CategoryRepository = require('../../repositories/category');
const SyncRepository = require('../../repositories/sync_service');
const ProductGroupAttributeCategory = require('../../repositories/product_group_attribute');
const ProductMappingRepository = require('../../repositories/product_sku_mapping');
const GeneralRepository = require('../../repositories/general');
const Transformer = require('../../transformers/product-detail/variant');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const _ = require('lodash');

const schema = Joi.object().keys({
    skus: Joi.string().required()
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

const getAdditionalData = async function (result) {
    const productGroup = await ProductGroupRepository.findById(result.product_group_id);
    const categoryObject = await CustomeRepository.findAllCategoryId(productGroup.category_id);
    const category = categoryObject[0];
    [
        result.payload,
        result.vendors,
        result.brand,
        result.uom,
        result.stocking_uom,
        result.c0,
        result.c1,
        result.c2,
        result.c3,
        result.product_specifications
    ] = await Bluebird.join(
        productGroup,
        ProductVendorRepository.findByVariant(result.id),
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

exports.getAdditionalData = getAdditionalData;

const getPriceEngine = async function (result, sku, vendors, context) {
    if (vendors.length === 0) return [];
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

exports.getSkuMultiple = async function (data, context) {
    if (!Authorization.vendorAccessNoPath(data, context)) {
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

    const skus = _.split(input.skus, ',');
    const responses = [];
    for (let i = 0; i < skus.length; i++) {
        const sku = skus[i];
        const wheres = {
            is_active: 1,
            sku
        };

        const result = await ProductVariantRepository.findOne(wheres);
        if (result) {
            let response = {};
            response = await getAdditionalData(Helper.parseDataObject(result));
            response.vendor_information = await getVendorInformation(response.vendors);
            response.variant_attribute = await getVariantAttribute(result);
            response.price_engine = await getPriceEngine(response.payload, sku, response.vendors, context);
            response.product_mapping = await getMappingProduct(sku, context);
            const res = Transformer.item(response, context.user.customer.channel_type);
            responses.push(res);
        }
    }

    return {
        data: responses
    };
};

module.exports = exports;
