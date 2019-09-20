'use strict';

const { DBContext } = require('bizzy-common');
const Promise = require('bluebird');
const AttributeSetRepository = require('../../repositories/attribute_set');
const AttributeValueRepository = require('../../repositories/attribute_value');
const ProductVariantRepository = require('../../repositories/product_variant');
const RawRepository = require('../../repositories/raw_query');

exports.findAllVariants = async function (condition, offset, limit) {
    const models = await DBContext.getInstance();
    const Op = DBContext.ORMProvider.Op;

    let where = {
        is_variant: 1,
        is_deleted: 0
    };

    const include = [
        {
            model: models.AttributeCode,
            include: [
                {
                    model: models.AttributeValue,
                    where: {
                        is_deleted: 0
                    },
                    separate: true
                }
            ],
            required: true,
            where: {
                is_deleted: 0
            }
        },
        {
            model: models.Category,
            where: {
                level: 'C3'
            },
            required: true
        }
    ];

    if (condition.search) {
        const key = String(condition.search).replace('VR-', '');
        where = {
            is_variant: 1,
            is_deleted: 0,
            [Op.or]: [
                {
                    id: key
                },
                {
                    '$AttributeCode.label$': {
                        [Op.like]: `${key}%`
                    }
                }
            ]
        };
    }

    if (condition.created_by) where.created_by = condition.created_by;
    if (condition.category) where.category_id = condition.category;
    const order = ['created_at', 'DESC'];

    return AttributeSetRepository.findAllVariants(where, offset, limit, include, order);
};

exports.findByIdVariant = async function (id) {
    const models = await DBContext.getInstance();
    const include = [
        {
            model: models.AttributeCode,
            where: {
                is_deleted: 0
            },
            include: [
                {
                    model: models.AttributeValue,
                    where: {
                        is_deleted: 0
                    },
                    separate: true
                }
            ],
            required: true
        }
    ];

    return AttributeSetRepository.findOneVariants({
        is_variant: 1,
        is_deleted: 0,
        id
    }, include);
};

exports.updateManyVariantValue = async function (attributeCodeId, variantName, dataToUpdate) {
    const models = await DBContext.getInstance();
    const sequelize = models.context;
    const Op = DBContext.ORMProvider.Op;

    const where = sequelize.and({ attribute_code_id: attributeCodeId }, sequelize.where(sequelize.fn('lower', sequelize.col('value')), {
        [Op.in]: variantName
    }));
    return AttributeValueRepository.updateMany(where, dataToUpdate);
};

exports.findSkuByAttributeCode = async function (code) {
    const Op = DBContext.ORMProvider.Op;

    const where = {
        variant_value: {
            [Op.like]: `%"${code}"%`
        },
        is_active: 1
    };

    return ProductVariantRepository.findAll(where);
};

exports.replaceAttributeCode = async function (oldAttributeCode, newAttributeCode) {
    await Promise.join(
        RawRepository.updateAttributeCode('product_group', oldAttributeCode, newAttributeCode),
        RawRepository.updateAttributeCode('product_variant', oldAttributeCode, newAttributeCode)
    );
};

module.exports = exports;
