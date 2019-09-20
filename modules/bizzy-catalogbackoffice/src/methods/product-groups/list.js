'use strict';

const Promise = require('bluebird');
const { DBContext, BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const RawQueryRepository = require('../../repositories/raw_query');
const ProductVariantRepository = require('../../repositories/product_variant');
const ProductLogRepository = require('../../repositories/product_log');
const Transformer = require('../../transformers/product-groups/list');

const schema = Joi.object().keys({
    search: Joi.string().allow(''),
    c0: Joi.string().allow(''),
    c1: Joi.string().allow(''),
    c2: Joi.string().allow(''),
    c3: Joi.string().allow(''),
    visibility: Joi.string().allow(''),
    limit: Joi.number().positive().default(20),
    page: Joi.number().positive().default(1),
    sort: Joi.string().allow('')
});

const setOffset = function (page, limit) {
    return Helper.offsetPagination(page, limit);
};

exports.getProductGroup = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    const Op = DBContext.ORMProvider.Op;
    let { query: input } = data;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const paramOffset = setOffset(input.page, input.limit);
    const paramPage = input.page;
    const paramLimit = input.limit;
    const paramSort = input.sort;
    const params = {
        paramSearch: input.search,
        paramC0: input.c0,
        paramC1: input.c1,
        paramC2: input.c2,
        paramC3: input.c3,
        paramVisibility: input.visibility
    };

    const listProductGroup = await RawQueryRepository.findAndCountAllProductGroup(params, paramOffset, paramLimit, paramSort);
    let totalActive = 0;
    let totalInactive = 0;
    let totalData = 0;
    listProductGroup.count.forEach((item) => {
        if (item.visibility === 0) {
            totalInactive = item.total;
        }
        if (item.visibility === 1) {
            totalActive = item.total;
        }
        totalData += item.total;
    });

    const wheresCountTotalSKU = {
        product_group_id: {
            [Op.in]: (listProductGroup.ids).split(',')
        }
    };
    const wheresCountTotalLogs = {
        product_group_id: {
            $in: (listProductGroup.ids).split(',')
        },
        'user.type': 'employee'
    };

    const [
        countTotalSKU,
        countTotalLogs
    ] = await Promise.join(
        ProductVariantRepository.countTotalSku(wheresCountTotalSKU),
        ProductLogRepository.countAll(wheresCountTotalLogs)
    );
    const result = Transformer.listWithTotalSku(Helper.parseDataObject(listProductGroup.rows), Helper.parseDataObject(countTotalSKU), countTotalLogs);

    return {
        data: result,
        meta: {
            page: paramPage,
            limit: paramLimit,
            total_data: totalData,
            total_page: Math.ceil(totalData / paramLimit),
            total_active_data: totalActive,
            total_inactive_data: totalInactive
        }
    };
};

module.exports = exports;
