'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const Transformer = require('../../transformers/products/list');
const ProductVendorRepository = require('../../repositories/product_vendor');
const CategoryRepository = require('../../repositories/category');
const VendorAdapter = require('../../utils/adapter/product_vendor');

const schema = Joi.object().keys({
    search: Joi.string().allow(''),
    c0: Joi.number().allow(''),
    brand: Joi.number().positive().allow(''),
    is_active: Joi.number().allow(''),
    stock: Joi.number().allow(''),
    sort: Joi.string().allow(''),
    limit: Joi.number().positive().default(20),
    page: Joi.number().positive().default(1)
});

const schemaEcart = Joi.object().keys({
    search: Joi.string().allow(''),
    sort: Joi.string().allow(''),
    limit: Joi.number().positive().default(20),
    page: Joi.number().positive().default(1)
});

const schemaPath = Joi.object().keys({
    id: Joi.number().positive().required()
});

const setOffset = function (page, limit) {
    return Helper.offsetPagination(page, limit);
};

const generateCondition = function generateCondition(input, path) {
    const wheres = [];

    if (input.search) {
        wheres.push({ name: 'search', value: input.search });
    }

    if (input.c0) {
        wheres.push({ name: 'category', value: parseInt(input.c0, 10) });
    }

    if (input.brand) {
        wheres.push({ name: 'brand', value: parseInt(input.brand, 10) });
    }

    if (input.is_active === 1 || input.is_active === 0) {
        wheres.push({ name: 'is_active', value: parseInt(input.is_active, 10) });
    }

    if (input.stock === 0) {
        wheres.push({ name: 'stock_nonavailable', value: input.stock });
    }

    if (input.sort) {
        wheres.push({ name: 'sort', value: input.sort });
    }

    wheres.push({ name: 'vendor', value: parseInt(path.id, 10) });

    return wheres;
};

exports.getProduct = async function (data, context) {
    if (!Authorization.vendorAccess(data, context)) {
        throw BizzyError.Forbidden('You have no authorization access');
    }

    let {
        query: input,
        path
    } = data;

    try {
        input = await Joi.validate(input, schema);
        path = await Joi.validate(path, schemaPath);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const wheres = generateCondition(input, path);
    const offset = setOffset(input.page, input.limit);
    const limit = input.limit;
    const vendorId = parseInt(path.id, 10);

    const where = { vendor_id: vendorId };
    const sqlCount = 'vendor_id=:vendor_id';
    const replacementCount = where;

    const [result, resultCategory, resultBrand, countAllProduct] = await Promise.all([
        ProductVendorRepository.findProductVendorWithoutCategoryAndBrand(wheres, offset, limit),
        ProductVendorRepository.findProductVendorCategory(where),
        ProductVendorRepository.findProductVendorBrand(where),
        ProductVendorRepository.countAll(sqlCount, replacementCount)
    ]);

    const res = Helper.parseDataObject(result.rows);
    const resBrand = Helper.parseDataObject(resultBrand.rows);
    const listBrand = resBrand.map(Transformer.brandList);
    const resCat = Helper.parseDataObject(resultCategory.rows);
    const listCategory = resCat.map(Transformer.categoryList);

    let totalActive = 0;
    let totalInactive = 0;
    let totalEmptyStock = 0;
    countAllProduct.forEach((item) => {
        totalEmptyStock = item.total_stock_empty;
        if (item.is_active === 1) {
            totalActive = item.total;
        }
        if (item.is_active === 0) {
            totalInactive = item.total;
        }
    });

    return {
        data: res.map(Transformer.collection),
        meta: {
            page: input.page,
            limit: input.limit,
            total_data: result.count,
            total_page: Math.ceil(result.count / input.limit),
            total_active: totalActive,
            total_inactive: totalInactive,
            total_empty_stock: totalEmptyStock,
            categories0: listCategory,
            brands: listBrand
        }
    };
};

exports.getProductByVendorId = async function (data, context) {
    if (!Authorization.vendorAccess(data, context)) {
        throw BizzyError.Forbidden('You have no authorization access');
    }

    let {
        path
    } = data;

    try {
        path = await Joi.validate(path, schemaPath);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const wheres = [{
        name: 'vendor',
        value: path.id
    }, {
        name: 'is_active',
        value: 1
    }];

    let result = await ProductVendorRepository.findProductVendorWithDetail(wheres);
    result = Helper.parseDataObject(result.rows);

    return {
        data: result.map(Transformer.collectionVendor)
    };
};

exports.getProductStock = async function (data, context) {
    // S2S
    const { body: requestQuery } = data;

    const schemaItems = Joi.object().keys({
        sku: Joi.string().required(),
        vendor_id: Joi.number().required()
    });
    const schemaQuery = Joi.object().keys({
        product: Joi.array().min(1).items(schemaItems)
    });
    try {
        await Joi.validate(requestQuery, schemaQuery);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    await Promise.map(requestQuery.product, async (item, index) => {
        const getTotalStock = await VendorAdapter.findOneProductVendorWithDetail(item);
        const totalStock = Helper.parseDataObject(getTotalStock);
        Object.assign(requestQuery.product[index], {
            stock: totalStock ? totalStock.stock_available : 0
        });
    }, { concurrency: 4 });

    return {
        data: requestQuery.product
    };
};

exports.getProductEcart = async function (data, context) {
    if (!Authorization.vendorAccess(data, context)) {
        throw BizzyError.Forbidden('You have no authorization access');
    }

    let {
        query: input,
        path
    } = data;

    try {
        [input, path] = await Promise.all([
            Joi.validate(data.query, schemaEcart),
            Joi.validate(data.path, schemaPath)
        ]);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const wheres = generateCondition(input, path);
    const offset = setOffset(input.page, input.limit);
    const limit = input.limit;

    const [result, allCategory] = await Promise.all([
        ProductVendorRepository.findProductVendorEcart(wheres, offset, limit),
        CategoryRepository.getFullCategory()
    ]);

    const res = Helper.parseDataObject(result.rows);
    const datas = Transformer.listEcartSKU(res, allCategory);

    return {
        data: datas,
        meta: {
            page: input.page,
            limit: input.limit,
            total_data: result.count,
            total_page: Math.ceil(result.count / input.limit)
        }
    };
};

module.exports = exports;
