'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Authorization = require('../../utils/authorization');
const CategoryRepository = require('../../repositories/category');
const Transformer = require('../../transformers/categories/detail');
const Helper = require('../../utils/helper');

const schema = Joi.object().keys({
    id: Joi.string().required()
});

exports.getCategoryById = async function getCategoryById(data, context) {
    let {
        path: input
    } = data;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const where = {
        parent_id: input.id,
        is_active: 1
    };
    const result = await CategoryRepository.findAll(where);
    const rows = Helper.parseDataObject(result);

    return {
        data: rows.map(Transformer.item)
    };
};

exports.getCategoryDetail = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    let { path: requestPath } = data;

    try {
        requestPath = await Joi.validate(requestPath, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    let mainCat = await CategoryRepository.findOne({
        id: parseInt(requestPath.id),
        is_deleted: 0
    });

    if (!mainCat) throw BizzyError.NotFound('Kategori tidak ditemukan');
    mainCat = mainCat.getValues();
    let otherCat = [];
    const resultCat = Transformer.item(mainCat);
    resultCat.parent = null;

    let parentId = mainCat.parent_id;
    let level;
    if (parentId) {
        resultCat.parent = {};
        otherCat = await CategoryRepository.findAll({
            parent_id: parseInt(mainCat.parent_id),
            is_deleted: 0
        });
        while (parentId) {
            const e = await CategoryRepository.findOne({
                id: parentId,
                is_deleted: 0
            });

            parentId = e.parent_id;
            level = e.level;
            resultCat.parent[level] = Transformer.item(e);
        }
    }

    return {
        data: resultCat,
        others: otherCat.map(Transformer.item)
    };
};

exports.getCategoryAll = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    let categoryC0 = await CategoryRepository.findAll({
        level: 'C0',
        is_deleted: 0
    });

    categoryC0 = categoryC0.map(Transformer.itemList);
    await Promise.map(categoryC0, async (item, index) => {
        const categoryChild = await CategoryRepository.findAll({
            parent_id: item.id,
            is_deleted: 0
        });
        categoryC0[index].child = categoryChild.map(Transformer.itemList);
    }, { concurrency: 10 });

    return categoryC0;
};

module.exports = exports;
