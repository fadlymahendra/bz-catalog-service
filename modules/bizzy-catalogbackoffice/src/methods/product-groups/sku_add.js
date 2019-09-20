'use strict';

const Promise = require('bluebird');
const { BizzyError, BizzyService } = require('bizzy-common');
const Joi = require('joi');
const Authorization = require('../../utils/authorization');
const ProductGroupRepository = require('../../repositories/product_group');
const AttributeValueRepository = require('../../repositories/attribute_value');
const ProductVariantRepository = require('../../repositories/product_variant');
const ProductLogRepository = require('../../repositories/product_log');
const SyncRepository = require('../../repositories/sync_service');

const schema = Joi.object().keys({
    id: Joi.string().required(),
    product_variant_id: Joi.string().required()
});

const generateLongName = function (productName, product) {
    let longName = productName;
    for (let i = 0; i < product.length; i++) {
        longName = longName.concat(` - ${product[i].value}`);
    }
    return longName;
};

exports.putProductGroupSku = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    const userId = Authorization.getUserId(context);
    if (!userId) {
        throw BizzyError.Forbidden('You are not logged in');
    }
    const user = Authorization.getUser(context);
    let { body: input } = data;
    input.id = data.path.id;

    try {
        input = await Joi.validate(input, schema);
    } catch (err) {
        throw BizzyError.BadRequest(err.message);
    }

    input.product_group_id = data.path.id;
    delete input.id;

    const [
        result1,
        getProductVariant
    ] = await Promise.join(
        ProductGroupRepository.findById(input.product_group_id),
        ProductVariantRepository.findById(input.product_variant_id)
    );

    if (!result1) {
        throw BizzyError.NotFound('Product group is not found');
    }

    if (!getProductVariant) {
        throw BizzyError.NotFound('Product variant is not found');
    }

    const categoryId1 = parseInt(result1.category_id);
    let categoryId2 = await ProductGroupRepository.findAndCountAllProductGroup({ id: getProductVariant.product_group_id }, 0, 1);
    categoryId2 = parseInt(categoryId2.rows[0].category_id);
    if (categoryId1 !== categoryId2) {
        throw BizzyError.BadRequest('SKU not in the same category');
    }

    const countPo = await SyncRepository.countPOBySku(getProductVariant.sku);
    if (countPo.data.count > 0) {
        throw BizzyError.BadRequest('Sudah terjadi transaksi di SKU ini');
    }

    let setLongName = '';
    if (getProductVariant.variant_value === 'NO_VARIANT') {
        setLongName = getProductVariant.long_name;
    } else {
        const productName = result1.name;
        const wheres3 = {};
        const productVariant = JSON.parse(getProductVariant.variant_value);
        const productAttributeId = Object.keys(productVariant).map(k => productVariant[k]);
        const resultData = [];
        await Promise.map(productAttributeId, async (temp, i) => {
            wheres3.id = productAttributeId[i];
            const result3 = await AttributeValueRepository.findOne(wheres3, 0, 999999);
            resultData.push(result3);
        });
        setLongName = generateLongName(productName, resultData);
    }

    const dataForUpdate = {
        product_group_id: input.product_group_id,
        long_name: setLongName
        // "variant_value": generateVariantValue(result2)
    };

    const update = await ProductVariantRepository.update(input.product_variant_id, dataForUpdate);
    if (!update) {
        throw BizzyError.BadRequest('Update failed');
    }

    const result4 = await ProductVariantRepository.findById(input.product_variant_id);
    const log = {
        action: 'putProductGroupSku',
        title: 'Add SKU',
        product_group_id: parseInt(input.product_group_id),
        payload: result1.dataValues,
        user: {
            id: user.employee.id,
            name: user.employee.name,
            email: user.username,
            type: 'employee'
        },
        created_at: new Date(),
        updated_at: new Date()
    };
    await ProductLogRepository.insertOne(log);
    // const result = Helper.parseDataObject(result4);

    await BizzyService.callAsync('bizzy-catalog-pubsub', 'publishItemERP', {
        context: {},
        data: {
            variants: {
                sku: result4.sku
            },
            mode: 'move'
        }
    });

    await Promise.all([
        BizzyService.callAsync('bizzy-searchengine', 'reindex', {
            data: {
                body: {
                    type: 'product_group',
                    id: getProductVariant.product_group_id,
                    data: Object.assign({}, input, { variants: [result4], changeProductGroup: false })
                }
            }
        }),
        BizzyService.callAsync('bizzy-searchengine', 'reindex', {
            data: {
                body: {
                    type: 'product_group',
                    id: input.product_group_id,
                    data: Object.assign({}, input, { variants: [result4], changeProductGroup: true })
                }
            }
        })
    ]);

    return result4;
};

module.exports = exports;
