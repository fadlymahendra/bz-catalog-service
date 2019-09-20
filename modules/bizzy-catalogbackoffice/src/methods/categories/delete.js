'use strict';

const Promise = require('bluebird');
const { DBContext, BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Authorization = require('../../utils/authorization');
const CategoryRepository = require('../../repositories/category');
const ProductGroupRepository = require('../../repositories/product_group');
const Helper = require('../../utils/helper');

const schema = Joi.object().keys({
    id: Joi.number().required()
});

exports.deleteCategory = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    const {
        path
    } = data;

    try {
        await Joi.validate(path, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    let category = await CategoryRepository.findById(parseInt(path.id));

    if (!category) {
        throw BizzyError.NotFound('Category Not Found');
    }

    category = Helper.parseDataObject(category);

    await DBContext.startTransaction();

    try {
        // Check SKU
        if (category.level === 'C3') {
            const sku = await ProductGroupRepository.findAllSkuByCategory(path.id);
            if (sku.length > 0) {
                throw BizzyError.UnprocessableEntity('Cant Delete Category that have one or more sku ');
            }
        } else {
            const childs = await CategoryRepository.findAndCountAll({
                parent_id: path.id
            });

            if (childs.count > 0) {
                throw BizzyError.UnprocessableEntity('Cant Delete Category with child');
            }
        }

        await CategoryRepository.update(path.id, {
            is_deleted: 1,
            is_active: 0
        });
    } catch (err) {
        await DBContext.rollback();
        throw BizzyError.InternalServerError(err);
    }

    await DBContext.commit();

    return {
        message: 'SUCCESS_DELETE_CATEGORY'
    };
};

module.exports = exports;
