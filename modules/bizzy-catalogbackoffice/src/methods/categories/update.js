'use strict';

const Promise = require('bluebird');
const { DBContext, BizzyService, BizzyError } = require('bizzy-common');
const Joi = require('joi');
const Helper = require('../../utils/helper');
const Authorization = require('../../utils/authorization');
const CategoryRepository = require('../../repositories/category');
const ProductGroupRepository = require('../../repositories/product_group');
const ProductVariantRepository = require('../../repositories/product_variant');
const Transformer = require('../../transformers/categories/detail');
const CategoryLogRepository = require('../../repositories/category_log');
const RawRepository = require('../../repositories/raw_query');
const CategoryLog = require('../../transformers/categories/history');
const CreateCategoryMethod = require('../../methods/categories/create');

const schema = Joi.object().keys({
    id: Joi.number().required(),
    name: Joi.string(),
    base_margin: Joi.number(),
    commission: Joi.number(),
    unspsc: Joi.number(),
    sequence: Joi.number(),
    is_active: Joi.number()
});

const getChildIds = function (childs) {
    const ids = [];
    if (childs.constructor === Array) {
        childs.forEach((el) => {
            const cat = Helper.parseDataObject(el);
            ids.push(cat.id);
        });
    }
    return ids;
};

const getChildLevel = function (childs) {
    let level = null;
    const cat = Helper.parseDataObject(childs);
    if (cat.constructor === Array) {
        if (cat.length > 0) level = cat[0].level;
    }
    return level;
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

exports.putCategory = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    const {
        body,
        path
    } = data;

    const payload = Object.assign(path, body);

    try {
        await Joi.validate(payload, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    let category = await CategoryRepository.findById(parseInt(path.id));

    if (!category) {
        throw BizzyError.NotFound('Category Not Found');
    }

    let categoryC3 = category.id;
    if (category.level !== 'C3') {
        categoryC3 = await CategoryRepository.getCategoryC3(category.id, category.level);
    }

    const totalSku = await ProductGroupRepository.findAllSkuByCategory(categoryC3);
    if (totalSku.length > 0) throw BizzyError.BadRequest('Category is already registered with sku');

    const categoryFindByNewName = await CategoryRepository.findOne({
        name: body.name
    });

    if (categoryFindByNewName) {
        throw BizzyError.BadRequest('Category Name is Already Exists');
    }

    let breadcrumb;
    if (category.level === 'C0') {
        breadcrumb = body.name;
    } else {
        const catName = body.name ? body.name : category.name;
        const parentName = await exports.getCategoryBreadcrumb(category.parent_id);
        breadcrumb = `${parentName} > ${catName}`;
    }

    const dataToUpdate = Object.assign({}, body, {
        breadcrumb
    });

    await DBContext.startTransaction();

    const unspsc = body.unspsc;
    try {
        if (unspsc) {
            const isValidUnspsc = await CreateCategoryMethod.validateUnspsc(category.level, String(unspsc), category.parent_id);
            if (!isValidUnspsc) throw BizzyError.BadRequest('Unspsc Category is Not Valid');

            // Update Category Children
            if (category.level === 'C1') {
                const keyUnspsc = String(category.unspsc).substring(0, 4);
                const newUnspsc = String(body.unspsc).substring(0, 4);
                await RawRepository.updateCategoryC1Unspsc(keyUnspsc, newUnspsc);
            }
            if (category.level === 'C2') {
                const keyUnspsc = String(category.unspsc).substring(0, 6);
                const newUnspsc = String(body.unspsc).substring(4, 6);
                await RawRepository.updateCategoryC2Unspsc(keyUnspsc, newUnspsc);
            }
            if (category.level === 'C0') {
                const keyUnspsc = String(category.unspsc).substring(0, 2);
                const newUnspsc = String(body.unspsc).substring(0, 2);
                await RawRepository.updateCategoryC0Unspsc(keyUnspsc, newUnspsc);
            }
        }

        await CategoryRepository.update(parseInt(path.id), dataToUpdate);
        // const productGroups = await ProductGroupRepository.findAllPGFromC3({ category_id: categoryC3 });
        // const testingERP = await BizzyService.callAsync('bizzy-catalogbackoffice', 'retriggerProductGroups', {
        //     data: {
        //         path: {
        //             id: data.path.id
        //         },
        //         body: {
        //             productGroups,
        //             dataWebhook: data.body
        //         }
        //     },
        //     context
        // });
        // const something = 'ERP';
    } catch (err) {
        await DBContext.rollback();
        throw BizzyError.InternalServerError(err);
    }

    await DBContext.commit();

    let result = await CategoryRepository.findOne({
        id: parseInt(path.id)
    });

    category = Helper.parseDataObject(category);
    result = Helper.parseDataObject(result);

    const categoryLog = CategoryLog.generateLog('EDITCATEGORY', {
        oldValue: category,
        currentValue: result
    }, context);

    await CategoryLogRepository.insertOne(categoryLog);

    return Transformer.collection(result);
};

exports.retriggerProductGroups = async function (data, context) {
    const productGroups = data.body.productGroups;

    const result = await Promise.each(productGroups, async (productGroup) => {
        const getVariant = await ProductVariantRepository.findByIdProductGroup(productGroup.id);

        await BizzyService.callAsync('bizzy-catalog-pubsub', 'publishItemERP', {
            context: {},
            data: {
                variants: getVariant.map(item => ({
                    sku: item.sku
                })),
                mode: 'update'
            }
        });
    }, {
        concurrency: 2
    });

    return result;
};

exports.updateCategoryCascade = async function (category, updateType) {
    let dataToUpdate;

    switch (updateType) {
    case 'ACTIVEPARENT':
        dataToUpdate = {
            is_active: 1
        };
        break;
    case 'DEACTIVEPARENT':
    default:
        dataToUpdate = {
            is_active: 0
        };
        break;
    }

    const parentId = category.id;
    const Op = DBContext.ORMProvider.Op;

    try {
        let childIds;
        let childLevel;
        let childCategory = await CategoryRepository.findAll({
            parent_id: parentId
        });
        childIds = getChildIds(childCategory);
        childLevel = getChildLevel(childCategory);

        while (childIds.length > 0) {
            await CategoryRepository.updateMany({
                id: {
                    [Op.in]: childIds
                }
            }, dataToUpdate);

            if (childLevel === 'C3') {
                await ProductGroupRepository.updateMany({
                    category_id: {
                        [Op.in]: childIds
                    }
                }, dataToUpdate);
            }

            childCategory = await CategoryRepository.findAll({
                parent_id: {
                    [Op.in]: childIds
                }
            });
            childIds = getChildIds(childCategory);
            childLevel = getChildLevel(childCategory);
        }
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    return true;
};

module.exports = exports;
