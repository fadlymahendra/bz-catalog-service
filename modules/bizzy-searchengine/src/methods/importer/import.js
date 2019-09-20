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
const VendorRepository = require('../../repositories/vendor');

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
    return await SyncRepository.findWarehouseByIds(ids.join(','));
};

const getAdditionalDataPoc = async function (result) {
    console.time(`productGroup_${result.sku}`);
    const productGroup = await ProductGroupRepository.findById(result.product_group_id);
    console.timeEnd(`productGroup_${result.sku}`);
    console.time(`newCategoryObject_${result.sku}`);
    const newCategoryObject = await CategoryRepository.getHierarchicalCategory(productGroup.category_id);
    console.timeEnd(`newCategoryObject_${result.sku}`);
    console.time(`getAllData_${result.sku}`);
    result.payload = productGroup;
    result.category = newCategoryObject;
    [
        // result.vendors,
        result.brand,
        result.uom,
        result.stocking_uom,
        result.product_specifications
    ] = await Promise.join(
        // ProductVendorRepository.findByVariant(result.id),
        BrandRepository.findById(productGroup.brand_id),
        UomRepository.findById(productGroup.uom_id),
        StockingUomRepository.findById(productGroup.stocking_uom_id),
        ProductGroupAttributeCategory.findAll({ product_group_id: parseInt(result.product_group_id), is_variant: 0 })
    );
    console.timeEnd(`getAllData_${result.sku}`);
    return result;
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

exports.skuImporter = async function (data, context) {
    console.time('getProductDetailByVariantPoc');

    // if (Helper.isNumber(input.id)) {
    //     wheres.id = parseInt(input.id);
    // } else {
    //     wheres.sku = input.id;
    // }

    console.time('productVariants');
    const productVariants = await ProductVariantRepository.findAll();
    if (!productVariants) {
        throw BizzyError.NotFound('Product SKU tidak ditemukan');
    }
    console.timeEnd('productVariants');

    const results = await Promise.map(productVariants, async (item) => {
        let response = {};
        let res = {};
        res.data = {};
        res.data.sku = item.sku;

        try {
            console.time(`getAdditionalData_${item.sku}`);
            response = await getAdditionalDataPoc(Helper.parseDataObject(item));
            // console.log(JSON.stringify(response, null, 4));

            // console.time('vendor_information');
            // response.vendor_information = await getVendorInformation(response.vendors);
            // console.timeEnd('vendor_information');

            console.time(`variant_attribute_${item.sku}`);
            response.variant_attribute = await getVariantAttribute(item);
            console.timeEnd(`variant_attribute_${item.sku}`);
            // response.price_engine = await getPriceEngine(response.payload, input.id, response.vendors, context);
            // console.time('product_mapping_' + item.sku);
            // response.product_mapping = await getMappingProduct(item.sku, context);
            // console.timeEnd('product_mapping)_' + item.sku);
            console.timeEnd(`getAdditionalData_${item.sku}`);

            res = Transformer.itemPoc(response, context.user.customer.channel_type);
        } catch (error) {
            console.log(`error on item: ${item.sku}\n ${error.message}`);
        }

        return res.data;
    }, { concurrency: 1 });

    const newId = await SkuRepository.createBulkSkuDetailMongo(results);

    console.time('withMongo');
    // const mongoResult = await SkuRepository.getSkuDetailMongo(input.id);
    console.timeEnd('withMongo');

    return newId;
};

exports.vendorImporter = async function (data, context) {
    console.time('getVendorDetail');

    const { body: input } = data;
    const response = {};

    console.time('vendors');
    response.vendors = await ProductVendorRepository.findByVariant(input.variant_id);
    console.timeEnd('vendors');

    console.time('productGroup');
    response.productGroup = await ProductGroupRepository.findById(input.product_group_id);
    console.timeEnd('productGroup');

    // console.time('get_vendor_and_pe');
    // [
    //     response.vendor_information,
    //     response.price_engine
    // ] = await Promise.join(
    //     getVendorInformation(response.vendors),
    //     getPriceEngine(response.productGroup, input.sku, response.vendors, context)
    // );
    // console.time('get_vendor_and_pe');

    console.time('vendor_information');
    response.vendor_information = await getVendorInformation(response.vendors);
    console.timeEnd('vendor_information');

    // console.time('price_engine');
    // response.price_engine = await getPriceEngine(response.productGroup, input.sku, response.vendors, context);
    // console.timeEnd('price_engine');

    const res = Transformer.vendorDetail(response, context.user.customer.channel_type);
    console.timeEnd('getVendorDetail');

    const mongoData = {};
    mongoData.sku = input.sku;
    mongoData.variant_id = input.variant_id;
    mongoData.product_group_id = input.product_group_id;
    mongoData.vendors = res.data;

    // const mongoResult = await VendorRepository.createVendorWarehousesMongo(mongoData);
    console.time('withMongo');
    const mongoResult = await VendorRepository.getVendorWarehousesMongo(input.sku);
    console.timeEnd('withMongo');

    return mongoResult;
};

module.exports = exports;
