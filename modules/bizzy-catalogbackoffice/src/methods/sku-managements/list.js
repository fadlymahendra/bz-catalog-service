'use strict';

const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const RepoProductVariant = require('../../repositories/product_variant');
const RepoRaw = require('../../repositories/raw_query');
const Transformer = require('../../transformers/sku-managements/list');


const schema = Joi.object().keys({
    search: Joi.string().allow(''),
    c0: Joi.number(),
    c1: Joi.number(),
    c2: Joi.number(),
    c3: Joi.number(),
    is_active: Joi.number(),
    limit: Joi.number().positive().default(20),
    page: Joi.number().positive().default(1)
});

const setOffset = function (page, limit) {
    return Helper.offsetPagination(page, limit);
};

exports.getSkuManagement = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    let {
        query: input
    } = data;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const wheres = [];
    const offset = setOffset(input.page, input.limit);
    const limit = input.limit;

    let isSearchByVariantOnly = true;
    if (input.search || input.c0 || input.c1 || input.c2 || input.c3) isSearchByVariantOnly = false;

    if (input.search) {
        wheres.push({ name: 'searchByKeyword', value: input.search });
    }

    if (input.c0) {
        wheres.push({ name: 'searchByC0', value: input.c0 });
    }

    if (input.c1) {
        wheres.push({ name: 'searchByC1', value: input.c1 });
    }

    if (input.c2) {
        wheres.push({ name: 'searchByC2', value: input.c2 });
    }

    if (input.c3) {
        wheres.push({ name: 'searchByC3', value: input.c3 });
    }

    if (input.is_active === 1 || input.is_active === 0) {
        wheres.push({ name: 'searchByIsActive', value: input.is_active });
    }

    let sku;
    if (isSearchByVariantOnly) {
        sku = await RepoRaw.getAllSKUProducts(wheres, offset, limit);
    } else {
        sku = await RepoRaw.getSKUProducts(wheres, offset, limit);
    }

    const {
        rows,
        total
    } = sku;

    let totalActive = 0;
    let totalInactive = 0;
    let totalAll = 0;

    const getTotalProductVariant = await RepoRaw.getTotalProductVariant();

    getTotalProductVariant.forEach((element) => {
        if (parseInt(element.is_active) === 1) {
            totalActive = element.total;
        }
        if (parseInt(element.is_active) === 0) {
            totalInactive = element.total;
        }
    });
    totalAll = totalActive + totalInactive;

    const ids = [];
    rows.forEach((element) => {
        ids.push(parseInt(element.product_variant_id));
    });

    let totalVendor = [];
    if (rows.length) { totalVendor = await RepoProductVariant.getTotalVendor(ids); }

    return {
        data: Transformer.collection(rows, totalVendor),
        meta: {
            page: input.page,
            limit: input.limit,
            total_data: totalAll,
            total_active_data: totalActive,
            total_inactive_data: totalInactive,
            total_page: Math.ceil(total.length / input.limit)
        }
    };
};

module.exports = exports;
