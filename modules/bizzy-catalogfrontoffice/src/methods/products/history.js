'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const BaseJoi = require('joi');
const ExtensionJoi = require('joi-date-extensions');

const Joi = BaseJoi.extend(ExtensionJoi);
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const Transformer = require('../../transformers/products/history');
const ProductLogRepository = require('../../repositories/product_log');
const ProductUploadLogRepository = require('../../repositories/product_upload_log');

const setOffset = function (page, limit) {
    return Helper.offsetPagination(page, limit);
};

const schema = Joi.object().keys({
    id: Joi.number().required(),
    pid: Joi.number().required(),
    page: Joi.number().positive().default(1),
    limit: Joi.number().positive().default(20)
});

exports.getProductHistory = async function getProductHistory(data, context) {
    if (!Authorization.vendorAccess(data, context)) {
        throw BizzyError.Forbidden('You have no authorization access');
    }
    let { path: input } = data;
    const { query: input2 } = data;
    input.page = input2.page;
    input.limit = input2.limit;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const wheres = {};
    const page = input.page;
    const limit = input.limit;
    const offset = setOffset(page, limit);
    wheres.product_vendor_id = parseInt(input.pid);
    wheres.action = {
        $in: ['putProductTier', 'putProductStock', 'putProduct']
    };

    const sort = { updated_at: -1 };
    const result = await ProductLogRepository.findAll(wheres, offset, limit, sort);
    const totalData = await ProductLogRepository.count(wheres);

    if (!result) {
        return {
            data: [],
            meta: {
                page,
                limit,
                total_data: 0,
                total_page: 1
            }
        };
    }

    return {
        data: Transformer.collection(result),
        meta: {
            page,
            limit,
            total_data: totalData,
            total_page: Math.ceil(totalData / limit)
        }
    };
};

exports.getProductUploadHistory = async function (data, context) {
    const schemaPath = Joi.object().keys({
        id: Joi.number().required()
    });

    const schemaQuery = Joi.object().keys({
        page: Joi.number().positive().default(1),
        limit: Joi.number().positive().default(20),
        start_date: Joi.date().format('YYYY-MM-DD'),
        end_date: Joi.date().format('YYYY-MM-DD').min(Joi.ref('start_date')),
        search: Joi.string()
    });

    if (!Authorization.vendorAccess(data, context)) {
        throw BizzyError.Forbidden('You have no authorization access');
    }

    const {
        path: requestPath,
        query: requestQuery
    } = data;

    try {
        await Joi.validate(requestPath, schemaPath);
        await Joi.validate(requestQuery, schemaQuery);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const ACTIONBULKUPLOAD = 'Bulk Tambah Produk';
    const where = {
        title: ACTIONBULKUPLOAD,
        organization_id: parseInt(requestPath.id)
    };

    if (requestQuery.start_date && requestQuery.end_date && (new Date(requestQuery.end_date).getTime() > new Date(requestQuery.start_date).getTime())) {
        Object.assign(where, {
            created_at: {
                $gte: new Date(requestQuery.start_date),
                $lte: new Date(requestQuery.end_date)
            }
        });
    } else if (requestQuery.start_date) {
        Object.assign(where, {
            created_at: {
                $gte: new Date(requestQuery.start_date)
            }
        });
    }

    if (requestQuery.search) {
        Object.assign(where, {
            $or: [
                {
                    'user.name': {
                        $regex: requestQuery.search,
                        $options: 'i'
                    }
                },
                {
                    'payload.file_name': {
                        $regex: requestQuery.search,
                        $options: 'i'
                    }
                }
            ]
        });
    }

    const page = requestQuery.page;
    const limit = requestQuery.limit;
    const offset = setOffset(page, limit);
    const sort = { created_at: -1 };
    const getProductLog = await ProductUploadLogRepository.findAll(where, offset, limit, sort);
    let totalLog = await ProductUploadLogRepository.findAllWithoutPage(where);
    totalLog = totalLog.length;

    return {
        data: getProductLog.map(Transformer.collection_upload),
        meta: {
            page,
            limit,
            total_data: totalLog,
            total_page: Math.ceil(totalLog / limit)
        }
    };
};

exports.getProductUpdateHistory = async function (data, context) {
    const schemaPath = Joi.object().keys({
        id: Joi.number().required()
    });

    const schemaQuery = Joi.object().keys({
        page: Joi.number().positive().default(1),
        limit: Joi.number().positive().default(20),
        start_date: Joi.date().format('YYYY-MM-DD'),
        end_date: Joi.date().format('YYYY-MM-DD').min(Joi.ref('start_date')),
        search: Joi.string()
    });

    if (!Authorization.vendorAccess(data, context)) {
        throw BizzyError.Forbidden('You have no authorization access');
    }

    const {
        path: requestPath,
        query: requestQuery
    } = data;

    try {
        await Joi.validate(requestPath, schemaPath);
        await Joi.validate(requestQuery, schemaQuery);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const ACTIONBULKEDIT = 'Bulk Edit Produk';
    const where = {
        title: ACTIONBULKEDIT,
        organization_id: parseInt(requestPath.id)
    };

    if (requestQuery.start_date && requestQuery.end_date && (new Date(requestQuery.end_date).getTime() > new Date(requestQuery.start_date).getTime())) {
        Object.assign(where, {
            created_at: {
                $gte: new Date(requestQuery.start_date),
                $lte: new Date(requestQuery.end_date)
            }
        });
    } else if (requestQuery.start_date) {
        Object.assign(where, {
            created_at: {
                $gte: new Date(requestQuery.start_date)
            }
        });
    }

    if (requestQuery.search) {
        Object.assign(where, {
            $or: [
                {
                    'user.name': {
                        $regex: requestQuery.search,
                        $options: 'i'
                    }
                },
                {
                    'payload.file_name': {
                        $regex: requestQuery.search,
                        $options: 'i'
                    }
                }
            ]
        });
    }

    const page = requestQuery.page;
    const limit = requestQuery.limit;
    const offset = setOffset(page, limit);
    const sort = { created_at: -1 };
    const getProductLog = await ProductUploadLogRepository.findAll(where, offset, limit, sort);
    let totalLog = await ProductUploadLogRepository.findAllWithoutPage(where);
    totalLog = totalLog.length;

    return {
        data: getProductLog.map(Transformer.collection_upload),
        meta: {
            page,
            limit,
            total_data: totalLog,
            total_page: Math.ceil(totalLog / limit)
        }
    };
};

module.exports = exports;
