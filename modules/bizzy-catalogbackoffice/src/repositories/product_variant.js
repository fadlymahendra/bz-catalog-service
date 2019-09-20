'use strict';

const { DBContext } = require('bizzy-common');


exports.findOne = async function (wheres) {
    const models = await DBContext.getInstance();
    return models.ProductVariant.findOne({
        where: wheres
    });
};

exports.findAll = async function (wheres = {}, offset, limit) {
    const models = await DBContext.getInstance();
    return models.ProductVariant.findAll({
        where: wheres,
        offset,
        limit
    });
};

exports.findById = async function (id) {
    const models = await DBContext.getInstance();
    return models.ProductVariant.findOne({
        where: {
            id: parseInt(id)
        }
    });
};

exports.findByIdProductGroup = async function (id) {
    const models = await DBContext.getInstance();
    return models.ProductVariant.findAll({
        where: {
            product_group_id: parseInt(id)
        }
    });
};

exports.findAndCountAll = async function (wheres = {}, offset, limit) {
    const models = await DBContext.getInstance();
    return models.ProductVariant.findAndCountAll({
        where: wheres,
        offset,
        limit
    });
};

exports.findOrCreate = async function (data = {}) {
    // considere about no variant ( cek ke variant count di product group)

    // check SKU duplicate
    const models = await DBContext.getInstance();
    const longName = `${data.product_name} ${data.variants.attribute_value_name}`; // name variant value variant value
    const variantValue = `{${data.variants.attribute_code}:${data.variants.attribute_value_name}}`;
    return models.ProductVariant.findOrCreate({
        where: {
            product_group_id: parseInt(data.product_group_id),
            variant_value: variantValue
            // should compare with product_group_id and variant_value
        },
        defaults: {
            product_group_id: parseInt(data.product_group_id),
            sku: data.sku_vendor,
            long_name: longName, // Group name - variant
            variant_value: variantValue, // {code=value}
            primary_image: data.primary_image,
            additional_image: JSON.stringify(data.additional_image),
            is_primary: 1,
            is_discontinue: 0,
            is_active: 1
        }
    });
};

exports.update = async function (id, data = {}) {
    const models = await DBContext.getInstance();
    return models.ProductVariant.update(data, {
        where: {
            id: parseInt(id)
        }
    });
};

exports.updateMany = async function (wheres, data) {
    const models = await DBContext.getInstance();
    const transaction = await models.db_transaction;
    return models.ProductVariant.update(data, {
        where: wheres,
        transaction
    });
};

exports.delete = async function (id) {
    const models = await DBContext.getInstance();
    return models.ProductVariant.destroy({
        where: {
            id: parseInt(id)
        }
    });
};

exports.getTotalVendor = async function (ids) {
    const models = await DBContext.getInstance();
    const Sequelize = await models.context;

    const sqlQuery = 'SELECT pvariant.id as product_variant_id, count(pvendor.id) as total_vendor FROM product_variant as pvariant LEFT JOIN product_vendor as pvendor ON pvariant.id = pvendor.product_variant_id where pvariant.id IN ( :ids ) group by pvariant.id';

    return Sequelize.query(sqlQuery, {
        type: Sequelize.QueryTypes.SELECT,
        replacements: {
            ids
        }
    });
};

exports.findByIdWithDetail = async function (id) {
    const models = await DBContext.getInstance();
    return models.ProductVariant.findById(parseInt(id), {
        include: [
            {
                model: models.ProductVendor,
                attributes: ['vendor_id', 'reference_link']
            },
            {
                attributes: ['id'],
                model: models.ProductGroup,
                include: [
                    {
                        model: models.ProductGroupAttribute,
                        where: {
                            is_variant: 1
                        },
                        separate: true
                    }
                ]
            }
        ]
    });
};

exports.findVariantByVariantValue = async function (code, value) {
    const models = await DBContext.getInstance();
    const attributeCode = await models.AttributeCode.findOne({
        code
    });

    const attributeValue = await models.AttributeValue.findById(value);

    const variantLabel = attributeCode.label;
    const variantValue = attributeValue.value;

    return {
        label: variantLabel,
        value: variantValue
    };
};

exports.createOne = async function (data = {}) {
    const models = await DBContext.getInstance();
    const transaction = await models.db_transaction;
    return models.ProductVariant.create(data, {
        transaction
    });
};

exports.countTotalSku = async function (wheres) {
    const models = await DBContext.getInstance();
    const sequelize = await models.context;
    return models.ProductVariant.findAll({
        where: wheres,
        attributes: ['product_group_id', [sequelize.fn('COUNT', sequelize.col('sku')), 'total_sku']],
        group: ['product_group_id']
    });
};

exports.grabSkuByBrand = async function (brandId) {
    const model = await DBContext.getInstance();
    return model.ProductVariant.findAll({
        where: {
            is_active: 1
        },
        include: [
            {
                model: model.ProductGroup,
                attributes: ['id', 'name', 'brand_id'],
                required: true,
                where: {
                    brand_id: brandId
                }
            }
        ],
        attributes: ['id', 'product_group_id', 'sku', 'is_active']
    });
};

module.exports = exports;
exports.findCountVariant = async function (wheres) {
    const models = await DBContext.getInstance();
    return models.ProductVariant.findAndCountAll({
        where: wheres
    });
};

exports.findAllVariant = async function (wheres, sort, limit) {
    const models = await DBContext.getInstance();
    const categoryId = wheres.category_id;
    const isBulk = wheres.is_bulk;

    delete wheres.category_id;
    delete wheres.is_bulk;
    
    return models.ProductVariant.findAll({
        where: wheres,
        include: [
            {
                model: models.ProductGroup,
                attributes: ['id', 'name'],
                where: {
                    category_id: categoryId,
                    is_bulk: isBulk
                }
            }
        ],
        limit,
        order: [sort]
    });
};

exports.findMultipleVariant = async function (wheres) {
    const models = await DBContext.getInstance();
    return models.ProductVariant.findAll({
        where: wheres,
        include: [
            {
                model: models.ProductGroup,
                attributes: ['id', 'name', 'quantity_stocking_uom', 'package_weight', 'package_length', 'package_width', 'package_height', 'package_content', 'description'],
                include: [
                    {
                        model: models.Uom,
                        attributes: ['id', 'name']
                    },
                    {
                        model: models.StockingUom,
                        attributes: ['id', 'name']
                    }
                ]
            },
            {
                model: models.ProductVendor,
                require: true
            }
        ]
    });
};

exports.findByIdWithVendor = async function (wheres) {
    const models = await DBContext.getInstance();
    return models.ProductVariant.findOne({
        where: wheres,
        include: [
            {
                model: models.ProductVendor,
                attributes: ['id', 'product_variant_id', 'vendor_id', 'warehouse_id', 'is_active']
            }
        ]
    });
};

module.exports = exports;
