'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const CategoryRepository = require('../../repositories/category');
const Authorization = require('../../utils/authorization');
const Helper = require('../../utils/helper');
const CategoryLogRepository = require('../../repositories/category_log');
const CategoryLog = require('../../transformers/categories/history');
const Transformers = require('../../transformers/categories/detail');
const Validator = require('../../utils/validator/category');

const validateUnspsc = async function (level, unspsc, parentId) {
    let parentCategoryC1;
    let parentCategoryC2;
    if (level === 'C2') {
        parentCategoryC1 = await CategoryRepository.findOne({
            id: parentId
        });
        parentCategoryC1 = parentCategoryC1.dataValues;
    } else if (level === 'C3') {
        parentCategoryC2 = await CategoryRepository.findOne({
            id: parentId
        });
        parentCategoryC2 = parentCategoryC2.dataValues;

        parentCategoryC1 = await CategoryRepository.findOne({
            id: parentCategoryC2.parent_id
        });
        parentCategoryC1 = parentCategoryC1.dataValues;
    }

    const wheres = {
        is_deleted: 0,
        unspsc
    };
    switch (level) {
    case 'C0':
        wheres.level = 'C0';
        break;
    case 'C1':
        if (unspsc.substring(4, 8) !== '0000') return false;
        wheres.level = 'C1';
        break;
    case 'C2':
        if (unspsc.substring(6, 8) !== '00') return false;
        if (!parentCategoryC1.unspsc) return false;
        if (String(parentCategoryC1.unspsc).substring(0, 4) !== unspsc.substring(0, 4)) return false;
        wheres.level = 'C2';
        break;
    default:
        if (!parentCategoryC2.unspsc) return false;
        if (String(parentCategoryC2.unspsc).substring(4, 6) !== unspsc.substring(4, 6)) return false;
        if (String(parentCategoryC1.unspsc).substring(0, 4) !== unspsc.substring(0, 4)) return false;
        wheres.level = 'C3';
        break;
    }

    const existingCategory = await CategoryRepository.findOne(wheres);
    if (existingCategory) return false;
    return true;
};

const createCategory = async function (payload, parentId, context) {
    const reqName = payload.name;
    const reqUnspsc = String(payload.unspsc);

    let breadcrumb = reqName;
    if (payload.level !== 'C0') {
        breadcrumb = await exports.getCategoryBreadcrumb(parentId);
        breadcrumb = `${breadcrumb} > ${reqName}`;
    }

    const isValidUnspsc = await validateUnspsc(payload.level, reqUnspsc, parentId);
    if (!isValidUnspsc) throw BizzyError.BadRequest('Unspsc Category is Not Valid');
    const userId = context.user.employee.id;

    const dataToInsert = {
        name: reqName,
        unspsc: reqUnspsc,
        parent_id: parentId,
        level: payload.level,
        breadcrumb,
        sequence: 1,
        is_active: 1,
        created_by: userId
    };

    let result = await CategoryRepository.findOrCreate(dataToInsert);
    result = Helper.parseDataObject(result);
    if (result[1] === false) throw BizzyError.BadRequest('Category Already Exist');
    return result[0];
};

const cancelCreateCategory = async function (categories) {
    const ids = categories.map(el => el.id);
    await CategoryRepository.deleteMany({
        id: ids
    });
};

exports.getCategoryBreadcrumb = async function (id) {
    const cat = await CategoryRepository.findById(id);
    let parentId = cat.parent_id;
    let breadcrumb = cat.name;

    while (parentId !== null) {
        const parent = await CategoryRepository.findById(parentId);
        breadcrumb = `${parent.name} > ${breadcrumb}`;
        parentId = parent.parent_id;
    }

    return breadcrumb;
};

exports.postCategory = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    const {
        body: requestBody
    } = data;

    const categoryKeys = Object.keys(requestBody).filter(el => (el !== 'C3'));

    let parentId = null;
    const insertedCategory = [];

    try {
        await Validator.validateCreateCategory(requestBody);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    try {
        for (let i = 0; i < categoryKeys.length; i++) {
            const level = categoryKeys[i];
            const payload = requestBody[level];

            if (payload.id !== 0) {
                const isCategoryValid = await CategoryRepository.findOne({
                    id: payload.id,
                    parent_id: parentId,
                    level
                });

                if (!isCategoryValid) throw BizzyError.BadRequest(`Kategori ${level} tidak valid`);
                parentId = payload.id;
            } else {
                const dataCategory = Object.create(payload);
                Object.assign(dataCategory, { level });
                const newCategory = await createCategory(dataCategory, parentId, context);
                parentId = newCategory.id;
                insertedCategory.push(newCategory);
            }
        }

        const payload = requestBody.C3;
        await Promise.map(payload, async (item) => {
            const dataCategory = Object.create(item);
            Object.assign(dataCategory, { level: 'C3' });
            const newCategory = await createCategory(dataCategory, parentId, context);
            insertedCategory.push(newCategory);
        }, { concurrency: 1 });
    } catch (err) {
        if (insertedCategory.length > 0) await cancelCreateCategory(insertedCategory);
        throw BizzyError.BadRequest(err.message);
    }

    const categoryLog = insertedCategory.map(el => CategoryLog.generateLog('ADDCATEGORY', { currentValue: el }, context));
    await CategoryLogRepository.insertMany(categoryLog);

    return {
        message: `${insertedCategory.length} Kategori Berhasil Ditambahkan`,
        ids: insertedCategory.map(Transformers.collection)
    };
};

exports.validateUnspsc = validateUnspsc;

module.exports = exports;
