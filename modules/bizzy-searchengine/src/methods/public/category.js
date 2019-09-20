'use strict';

const CategoryRepository = require('../../repositories/category');
const Transformer = require('../../transformers/categories/detail');
const { BizzyError } = require('bizzy-common');
const Joi = require('joi');

exports.getPublicCategory = async function (data, context) {
    const [C0, C1] = await Promise.all([
        CategoryRepository.findAll({
            level: 'C0',
            is_deleted: 0
        }),
        CategoryRepository.findC1()
    ]);

    const categoryC0 = C0.map(Transformer.itemList);
    categoryC0.map((item) => {
        item.child = C1.filter(p => p.parent_id === item.id).map(Transformer.itemList);
        return item;
    });

    return categoryC0;
};


exports.getCategoryDetail = async function (data, context) {
    let { path: requestPath } = data;

    try {
        requestPath = await Joi.validate(
            requestPath,
            Joi.object().keys({
                id: Joi.string().required()
            })
        );
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
    const resultCat = Transformer.itemList(mainCat);
    resultCat.parent = null;

    let parentId = mainCat.parent_id;
    let level;
    resultCat.parent = {};
    otherCat = await CategoryRepository.findAll({
        parent_id: mainCat.parent_id,
        is_deleted: 0
    });
    while (parentId) {
        const e = await CategoryRepository.findOne({
            id: parentId,
            is_deleted: 0
        });

        parentId = e.parent_id;
        level = e.level;
        resultCat.parent[level] = Transformer.itemList(e);
    }

    return {
        data: resultCat,
        others: otherCat.map(Transformer.itemList)
    };
};

module.exports = exports;
