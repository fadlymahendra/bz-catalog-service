/* eslint-disable linebreak-style */

'use strict';

const Promise = require('bluebird');
const { BizzyError, BizzyService } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');

const ProductVendorRepository = require('../../repositories/product_vendor');
const ProductVariantRepository = require('../../repositories/product_variant');
const CategoryRepository = require('../../repositories/category');
const GeneralRepository = require('../../repositories/general');
const ProductLogRepository = require('../../repositories/product_log');
const OrganizationSubRepo = require('../../repositories/organization_sub_repo');

const ProductVendorTransformer = require('../../transformers/products/detail');
const ProductGroupTransformer = require('../../transformers/product-groups/detail');

const PUT_PRODUCT_TIER = 'putProductTier';
const PUT_PRODUCT_STOCK = 'putProductStock';
const PUT_PRODUCT = 'putProduct';

const countProductHistory = async function (pid) {
    const wheres = {
        product_vendor_id: parseInt(pid),
        action: {
            $in: [
                PUT_PRODUCT,
                PUT_PRODUCT_STOCK,
                PUT_PRODUCT_TIER
            ]
        }
    };

    const totalHistory = await ProductLogRepository.count(wheres);
    return totalHistory;
};

exports.getProductById = async function (data, context) {
    if (!Authorization.vendorAccess(data, context)) {
        throw BizzyError.Forbidden('You have no authorization access');
    }

    const schema = Joi.object().keys({
        id: Joi.number().required(),
        pid: Joi.number().required()
    });

    let {
        path
    } = data;

    try {
        path = await Joi.validate(path, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    let result = await ProductVendorRepository.findByProductGroupId(path.pid, path.id);

    if (!result) {
        throw BizzyError.NotFound('Product not found');
    }

    const pgIsBulk = result.is_bulk;
    const categoryId = result.category_id;
    result = Helper.parseDataObject(result);

    try {
        const Categories = await CategoryRepository.getCategoryBreakdown(categoryId);
        result.Categories = Categories;
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const item = ProductVendorTransformer.productGroupList(result);
    delete item.data.variants;

    const wheres = [
        { name: 'product_group', value: path.pid },
        { name: 'vendor', value: path.id }
    ];

    const product = await ProductVendorRepository.findProductVendorWithDetail(wheres);
    const res = Helper.parseDataObject(product.rows);
    let isError = false;

    await Promise.map(res, async (element) => {
        if (element.ProductVariant.variant_value !== 'NO_VARIANT') {
            const variantValue = JSON.parse(element.ProductVariant.variant_value);

            const variants = await GeneralRepository.findAttributeByVariantValue(variantValue);
            element.variants = variants;
        } else {
            element.variants = [];
        }

        let customerIds = [];
        if (element.customer_id !== null && element.customer_id > 0) {
            if (pgIsBulk === 1) {
                // add is_bulk
                element.is_bulk = pgIsBulk;
                element.is_private_sku = true;
                customerIds.push(element.customer_id); // customerIds = [1]
            } else {
                throw BizzyError.UnprocessableEntity('customer does not match because PG is not bulk');
            }
        } else if (element.is_private_sku) {
            let resPrivateSku;
            try {
                const privateSku = await ProductVendorRepository.findProductVendorPrivateSku(element.id);
                resPrivateSku = Helper.parseDataObject(privateSku);
            } catch (err) {
                throw BizzyError.InternalServerError('cannot get data customers');
            }

            if (!resPrivateSku || resPrivateSku.customers === undefined || resPrivateSku.customers === null || resPrivateSku.customers === '' || resPrivateSku.customers.length === 0) {
                throw BizzyError.NotFound('data customers not found');
            } else {
                customerIds = JSON.parse(resPrivateSku.customers); // customerIds = [1,2,3]
            }
        }

        const contract = await BizzyService.callSync('bizzy-contract', 'getAgreementByVendorSku', {
            data: {
                vendor_id: path.id,
                sku: element.ProductVariant.sku
            }
        });

        if (!element.is_private_sku) {
            customerIds = contract.data;
        }

        if (customerIds.length >= 1) {
            let organizationList;
            try {
                organizationList = await OrganizationSubRepo.getOrganizationSubs(customerIds);
            } catch (error) {
                throw BizzyError.InternalServerError('cannot get data customers');
            }

            if (organizationList && organizationList.length >= 1) {
                const listOrganization = organizationList.map(ProductVendorTransformer.organizationList);
                element.private_customers = listOrganization;
                for (let index = 0; index < element.private_customers.length; index++) {
                    const customer = element.private_customers[index];
                    customer.is_contract = !!contract.data.find(p => customer.id === p) || false;
                }
            } else {
                throw BizzyError.NotFound('data organizations not found');
            }
        } else {
            element.private_customers = [];
        }
    }).catch((error) => {
        if (error.name && error.name === 'NotFound') {
            throw BizzyError.NotFound(error.message);
        } else if (error.name && error.name === 'UnprocessableEntity') {
            throw BizzyError.UnprocessableEntity(error.message);
        } else {
            throw BizzyError.InternalServerError(error.message);
        }
    });

    let variantImages = await ProductVariantRepository.findAllProduct({
        product_group_id: path.pid
    });

    variantImages = Helper.parseDataObject(variantImages);
    variantImages = ProductGroupTransformer.generateVariantImages(variantImages);
    item.variant_images = variantImages;

    const listProduct = res.map(ProductVendorTransformer.item);
    item.product = listProduct;

    await Promise.map(listProduct, async (list) => {
        list.total_history = await countProductHistory(list.id);
    });
    // for (let i = 0; i < listProduct.length; i += 1) {
    //     listProduct[i].total_history = await countProductHistory(listProduct[i].id);
    // }

    return item;
};

module.exports = exports;
