'use strict';

const Promise = require('bluebird');
const { DBContext, BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const PremoderationRepository = require('../../repositories/premoderation');
const CategoryRepository = require('../../repositories/category');
const BrandRepository = require('../../repositories/brand');
const Transformer = require('../../transformers/premoderations/list');

const schema = Joi.object().keys({
    id: Joi.string().required(),
    search: Joi.string().allow(''),
    c0: Joi.string().allow(''),
    brand: Joi.string().allow(''),
    status: Joi.string().allow(''),
    sort: Joi.string().default('created_at_desc'),
    page: Joi.number().positive().default(1),
    limit: Joi.number().positive().default(20)
});

const setOffset = function (page, limit) {
    return Helper.offsetPagination(page, limit);
};

const showCategory = async function (result) {
    for (let i = 0; i < result.length; i++) {
        if (result[i].payload.category_id === null || result[i].payload.category_id === 0) {
            result[i].c0 = null;
            result[i].c1 = null;
            result[i].c2 = null;
            result[i].c3 = null;
        } else {
            [
                result[i].c0,
                result[i].c1,
                result[i].c2,
                result[i].c3
            ] = await Promise.join(
                CategoryRepository.findOne(result[i].payload.category.c0),
                CategoryRepository.findOne(result[i].payload.category.c1),
                CategoryRepository.findOne(result[i].payload.category.c2),
                CategoryRepository.findOne(result[i].payload.category.c3)
            );
        }
    }

    return result;
};

const getDataByIds = async function (ids, type) {
    const Op = DBContext.ORMProvider.Op;
    const otherWheres = {};
    otherWheres.id = {
        [Op.in]: ids
    };

    let showListData;
    if (type === 'Category') {
        showListData = await CategoryRepository.findAll(otherWheres);
    } else {
        showListData = await BrandRepository.findAll(otherWheres);
    }

    return showListData;
};

exports.getPremoderation = async function (data, context) {
    if (!Authorization.vendorAccess(data, context)) {
        throw BizzyError.Forbidden('You have no authorization access');
    }

    let {
        query: input
    } = data;

    input.id = data.path.id;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    delete input.id;

    const wheres = {};

    const offset = setOffset(input.page, input.limit);
    const limit = input.limit;
    let sort;
    if (input.sort === 'created_at_asc') {
        sort = { created_at: 1 };
    } else {
        sort = { created_at: -1 };
    }

    if (input.search) {
        wheres['payload.name'] = new RegExp(input.search, 'i');
    }

    if (input.c0) {
        wheres['payload.category.c0'] = parseInt(input.c0);
    }

    if (input.brand) {
        wheres['payload.brand_id'] = parseInt(input.brand);
    }

    if (input.status) {
        wheres.premoderation_status = {
            $in: input.status.split(',')
        };
    }
    wheres.vendor_id = parseInt(data.path.id);
    const result = await PremoderationRepository.findAll(wheres, sort, offset, limit);
    const totalData = await PremoderationRepository.count(wheres);

    await showCategory(result);

    delete wheres['payload.name'];
    delete wheres['payload.category.c0'];
    delete wheres['payload.brand_id'];
    const getIdBrand = await PremoderationRepository.findDistinctData('payload.brand_id', wheres);
    const getIdCategory = await PremoderationRepository.findDistinctData('payload.category.c0', wheres);
    let listCategory = [];
    let listBrand = [];
    if (totalData > 0) {
        listCategory = await getDataByIds(getIdCategory, 'Category');
        listBrand = await getDataByIds(getIdBrand, 'Brand');
    }

    const total = {
        need_revision: 0,
        revision_complete: 0,
        rejected: 0,
        revision_inprogress: 0
    };

    delete wheres.premoderation_status;
    const totalDataStatus = await PremoderationRepository.countAllPremoderationStatus(wheres);

    if (totalDataStatus) {
        const totalPremoderation = Helper.parseDataObject(totalDataStatus);

        totalPremoderation.forEach((element) => {
            switch (element.status[0]) {
            case 'need_revision':
                total.need_revision = element.count;
                break;
            case 'revision_inprogress':
                total.revision_inprogress = element.count;
                break;
            case 'revision_complete':
                total.revision_complete = element.count;
                break;
            default:
            case 'rejected':
                total.rejected = element.count;
                break;
            }
        });
    }

    return {
        data: result.map(Transformer.collection),
        meta: {
            page: input.page,
            limit: input.limit,
            total_data: totalData,
            total_page: Math.ceil(totalData / input.limit),
            total_need_revision: total.need_revision,
            total_revision_inprogress: total.revision_inprogress,
            total_revision_complete: total.revision_complete,
            total_rejected: total.rejected,
            categories0: listCategory.map(Transformer.categoryList),
            brands: listBrand.map(Transformer.categoryList)
        }
    };
};

module.exports = exports;
