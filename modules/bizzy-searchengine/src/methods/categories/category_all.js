'use strict';

const { DBContext, BizzyError } = require('bizzy-common');
const Joi = require('joi');
const CategoryRepository = require('../../repositories/category');
const Helper = require('../../utils/helper');
const Transformer = require('../../transformers/categories/category_all');
const Promise = require('bluebird');

exports.categorySearchAll = async function categorySearchAll(data, context) {
    const schema = Joi.object().keys({
        search: Joi.string().allow('')
    });

    const Op = DBContext.ORMProvider.Op;

    let {
        query: input
    } = data;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const wheres = {
        is_active: 1
    };

    if (input.search) {
        wheres.name = { [Op.like]: `%${input.search}%` };
    }
    const result = await CategoryRepository.findBySearch(wheres);
    const rows = Helper.parseDataObject(result);
    const localCache = {};
    rows.forEach((dataRow) => {
        if (!localCache[dataRow.id]) {
            localCache[dataRow.id] = dataRow;
        }
    });

    await Promise.map(rows, async (perCategory) => {
        perCategory.hierarchy = [];
        switch (perCategory.level) {
        case 'C1':
            if (localCache[perCategory.parent_id]) {
                perCategory.hierarchy.push(localCache[perCategory.parent_id]);
            } else {
                const c0OfC1 = await CategoryRepository.findOneMinimum({ Id: perCategory.parent_id });
                const parsed = Helper.parseDataObject(c0OfC1);
                localCache[perCategory.parent_id] = parsed;

                perCategory.hierarchy.push(parsed);
            }
            break;
        case 'C2':
            if (localCache[perCategory.parent_id]) {
                perCategory.hierarchy.push(localCache[perCategory.parent_id]);
            } else {
                const c1OfC2 = await CategoryRepository.findOneMinimum({ Id: perCategory.parent_id });
                const parsed = Helper.parseDataObject(c1OfC2);
                localCache[perCategory.parent_id] = parsed;

                perCategory.hierarchy.push(parsed);
            }

            if (localCache[perCategory.hierarchy[0].parent_id]) {
                perCategory.hierarchy.push(localCache[perCategory.hierarchy[0].parent_id]);
            } else {
                const c1OfC2 = await CategoryRepository.findOneMinimum({ Id: perCategory.hierarchy[0].parent_id });
                const parsed = Helper.parseDataObject(c1OfC2);
                localCache[perCategory.hierarchy[0].parent_id] = parsed;

                perCategory.hierarchy.push(parsed);
            }
            break;
        case 'C3':
            if (localCache[perCategory.parent_id]) {
                perCategory.hierarchy.push(localCache[perCategory.parent_id]);
            } else {
                const c1OfC2 = await CategoryRepository.findOneMinimum({ Id: perCategory.parent_id });
                const parsed = Helper.parseDataObject(c1OfC2);
                localCache[perCategory.parent_id] = parsed;

                perCategory.hierarchy.push(parsed);
            }

            if (localCache[perCategory.hierarchy[0].parent_id]) {
                perCategory.hierarchy.push(localCache[perCategory.hierarchy[0].parent_id]);
            } else {
                const c1OfC2 = await CategoryRepository.findOneMinimum({ Id: perCategory.hierarchy[0].parent_id });
                const parsed = Helper.parseDataObject(c1OfC2);
                localCache[perCategory.hierarchy[0].parent_id] = parsed;

                perCategory.hierarchy.push(parsed);
            }

            if (localCache[perCategory.hierarchy[1].parent_id]) {
                perCategory.hierarchy.push(localCache[perCategory.hierarchy[1].parent_id]);
            } else {
                const c2OfC3 = await CategoryRepository.findOneMinimum({ Id: perCategory.hierarchy[1].parent_id });
                const parsed = Helper.parseDataObject(c2OfC3);
                localCache[perCategory.hierarchy[1].parent_id] = parsed;

                perCategory.hierarchy.push(parsed);
            }
            break;
        default:
            break;
        }

        perCategory.hierarchy = perCategory.hierarchy.map(Transformer.collection);
    });

    return {
        data: rows.map(Transformer.collection)
    };
};

module.exports = exports;
