'use strict';

const Promise = require('bluebird');
const { DBContext, BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const CategoryRepository = require('../../repositories/category');
const Transformer = require('../../transformers/categories/list');
const _ = require('lodash');

const schema = Joi.object().keys({
    level: Joi.string().valid('C0', 'C1', 'C2', 'C3'),
    created_by: Joi.number().positive(),
    name: Joi.string().allow(''),
    status: Joi.string(),
    page: Joi.number().positive().default(1),
    limit: Joi.number().positive().default(20)
});

const setOffset = function (page, limit) {
    return Helper.offsetPagination(page, limit);
};

exports.getCategoryAll = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    const Op = DBContext.ORMProvider.Op;

    let {
        query: input
    } = data;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    let wheres = {
        is_deleted: 0
    };
    const replacementUserCreated = {};
    let sqlUserCreated = 'is_deleted=:is_deleted';
    replacementUserCreated.is_deleted = 0;

    if (input.name) {
        wheres = {
            [Op.or]: [
                {
                    name: {
                        [Op.like]: `%${input.name}%`
                    }
                },
                {
                    id: {
                        [Op.eq]: input.name
                    }
                }
            ],
            is_deleted: 0
        };
        sqlUserCreated += ' AND name LIKE :name OR id=:id';
        replacementUserCreated.name = `%${input.name}%`;
        replacementUserCreated.id = input.name;
    }

    const offset = setOffset(input.page, input.limit);
    const limit = input.limit;

    if (input.status) {
        wheres.is_active = input.status;
        sqlUserCreated += ' AND is_active = :is_active';
        replacementUserCreated.is_active = input.status;
    }
    if (input.level) {
        wheres.level = input.level;
        sqlUserCreated += ' AND level = :level';
        replacementUserCreated.level = input.level;
    }
    if (input.created_by) {
        wheres.created_by = input.created_by;
        sqlUserCreated += ' AND created_by = :created_by';
        replacementUserCreated.created_by = input.created_by;
    }

    const sqlCount = 'is_deleted = :is_deleted';
    const replacementCount = { is_deleted: 0 };
    const [
        result,
        count,
        dataUserCreated
    ] = await Promise.all([
        CategoryRepository.findAll(wheres, offset, limit, [['created_at', 'DESC']]),
        CategoryRepository.countAll(sqlCount, replacementCount),
        CategoryRepository.getUserCreated(sqlUserCreated, replacementUserCreated)
    ]);

    let activeCategory = 0;
    let inactiveCategory = 0;
    let totalData = 0;
    count.forEach((item) => {
        if (item.is_active === 1) {
            activeCategory = item.total;
        }
        if (item.is_active === 0) {
            inactiveCategory = item.total;
        }
        totalData += item.total;
    });
    const userCreated = dataUserCreated[0].user_created;

    const rows = Helper.parseDataObject(result);

    return {
        data: rows.map(Transformer.collection_all),
        meta: {
            page: input.page,
            limit: input.limit,
            total_data: totalData,
            total_page: Math.ceil(totalData / input.limit),
            user_created: userCreated,
            total_active: activeCategory,
            total_inactive: inactiveCategory
        }
    };
};

module.exports = exports;
