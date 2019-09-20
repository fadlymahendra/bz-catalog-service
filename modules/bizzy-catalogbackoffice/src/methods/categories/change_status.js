'use strict';

const { DBContext, BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const CategoryRepository = require('../../repositories/category');
const CategoryMethod = require('./update');
const CategoryLogRepository = require('../../repositories/category_log');
const CategoryLog = require('../../transformers/categories/history');

const schema = Joi.object().keys({
    id: Joi.number().required(),
    is_active: Joi.number().required()
});

exports.putCategoryStatus = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    const {
        body: requestBody,
        path: requestPath
    } = data;

    const input = Object.assign(requestBody, requestPath);

    if (!Number.isInteger(parseInt(input.id))) throw BizzyError.BadRequest('Id harus berupa angka');

    try {
        await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    let category = await CategoryRepository.findById(parseInt(input.id));

    if (!category) {
        throw BizzyError.NotFound('Category Not Found');
    }

    category = Helper.parseDataObject(category);

    await DBContext.startTransaction();

    try {
        await CategoryRepository.update(parseInt(input.id), {
            is_active: input.is_active
        });

        const categoryLog = CategoryLog.generateLog('CHANGESTATUS_CATEGORY', {
            currentValue: category
        }, context);

        await CategoryLogRepository.insertOne(categoryLog);
        const updateType = input.is_active === 1 ? 'ACTIVEPARENT' : 'DEACTIVEPARENT';

        await CategoryMethod.updateCategoryCascade(category, updateType);
    } catch (err) {
        await DBContext.rollback();
        throw BizzyError.InternalServerError(err);
    }

    await DBContext.commit();

    return {
        message: 'SUCCESS_CHANGE_STATUS',
        data: {
            id: category.id,
            name: category.name
        }
    };
};

module.exports = exports;
