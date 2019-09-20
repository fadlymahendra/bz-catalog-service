'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const CategoryRepository = require('../../repositories/category');
const Transformer = require('../../transformers/categories/detail');
const _ = require('lodash');

const schema = Joi.object().keys({
    id: Joi.number().required()
});

const getHirarchy = async function (id) {
    const cat = await CategoryRepository.findById(id);
    let parentId = cat.parent_id;
    const hirarchy = [];

    while (parentId !== null) {
        const parent = await CategoryRepository.findById(parentId);
        parentId = parent.parent_id;
        hirarchy.push({
            id: parent.id,
            level: parent.level,
            name: parent.name,
            unspsc: parent.unspsc
        });
    }
    return _.reverse(hirarchy);
};

exports.getCategoryByIdSingle = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    let {
        path: input
    } = data;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    const where = {
        id: input.id,
        is_deleted: 0
    };

    const result = await CategoryRepository.findOne(where);
    if (!result) throw BizzyError.NotFound('Kategori tidak ditemukan');

    const rows = Helper.parseDataObject(result);
    rows.hirarchy = await getHirarchy(rows.id);

    return {
        data: Transformer.collectionItem(rows)
    };
};

module.exports = exports;
