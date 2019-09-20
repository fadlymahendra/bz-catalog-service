/* eslint-disable linebreak-style */
'use strict';

const { DBContext } = require('bizzy-common');

exports.findOne = async function (wheres) {
    const models = await DBContext.getInstance();
    return models.ProductVendor.findOne({
        where: wheres,
        include: [
            {
                model: models.ProductVariant
            },
            {
                model: models.PrivateSku
            }
        ]

    });
};

exports.findOneDetail = async function (where, include = []) {
    const models = await DBContext.getInstance();
    return models.ProductVendor.findOne({
        where,
        include
    });
};

exports.findAll = async function (wheres = {}, offset, limit) {
    const models = await DBContext.getInstance();
    return models.ProductVendor.findAll({
        where: wheres,
        offset,
        limit
    });
};

exports.findAllWithVariant = async function (wheres = {}, offset, limit) {
    const models = await DBContext.getInstance();
    return models.ProductVendor.findAll({
        where: wheres,
        offset,
        limit,
        include: [
            { model: models.ProductVariant }
        ]
    });
};

exports.findSkuAllWithVariant = async function (wheres = {}, offset, limit) {
    const models = await DBContext.getInstance();
    return models.ProductVendor.findAll({
        attributes: ['id', 'product_variant_id', 'sku_vendor'],
        where: wheres,
        offset,
        limit,
        include: [
            {
                attributes: ['id', 'sku'],
                model: models.ProductVariant
            }
        ]
    });
};

exports.findAllByParam = async function (options) {
    const { where, attributes } = options;
    const models = await DBContext.getInstance();
    return models.ProductVendor.findAll({ where, attributes });
};

exports.findAllByManufactureNo = async function (manufactureNo) {
    const models = await DBContext.getInstance();
    const Sequelize = models.context;

    const sql = `select a.*
                   from product_vendor a
                   left join product_variant b on b.id = a.product_variant_id
                   left join product_group c on c.id = b.product_group_id
                  where c.manufacturing_number = '${manufactureNo}'`;

    return Sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT });
};

exports.findById = async function (id) {
    const models = await DBContext.getInstance();
    return models.ProductVendor.findOne({
        where: {
            id: parseInt(id)
        },
        include: [
            {
                model: models.ProductVariant
            }
        ]
    });
};

exports.findAndCountAll = async function (wheres = {}, offset, limit) {
    const models = await DBContext.getInstance();
    return models.ProductVendor.findAndCountAll({
        where: wheres,
        offset,
        limit
    });
};

exports.createOne = async function (data = {}) {
    const models = await DBContext.getInstance();
    const transaction = models.db_transaction;
    return models.ProductVendor.create(data, { transaction });
};

exports.findOrCreate = async function (data = {}, findById = {}) {
    const models = await DBContext.getInstance();
    return models.ProductVendor.findOrCreate({
        where: findById,
        defaults: data
    });
};

exports.update = async function (id, vendorId, data = {}) {
    const models = await DBContext.getInstance();
    const transaction = models.db_transaction;
    return models.ProductVendor.update(data, {
        where: {
            id: parseInt(id),
            vendor_id: parseInt(vendorId)
        },
        transaction
    });
};

exports.updateById = async function (id, data = {}) {
    const models = await DBContext.getInstance();
    const transaction = models.db_transaction;
    return models.ProductVendor.update(data, {
        where: { id },
        transaction
    });
};

exports.updateSku = async function (wheres, data, models, transaction) {
    return models.ProductVendor.update(data, {
        where: wheres,
        transaction
    });
};

exports.getCountProductVendor = async function (wheres = {}) {
    const models = await DBContext.getInstance();

    return models.ProductVendor.count({
        where: wheres
    });
};

exports.findProductVendorCategory = async function (wheres = {}) {
    const models = await DBContext.getInstance();

    const queryObject = {
        group: 'ProductVariant->ProductGroup->Category->Category->Category->Category.id',
        where: wheres,
        include: [
            {
                model: models.ProductVariant,
                attributes: ['long_name', 'sku', 'product_group_id', 'variant_value', 'primary_image'],
                required: true,
                include: [
                    {
                        model: models.ProductGroup,
                        attributes: ['id', 'name', 'category_id', 'brand_id'],
                        required: true,
                        include: [
                            {
                                model: models.Category,
                                attributes: ['id', 'name', 'level', 'parent_id'],
                                as: 'Category',
                                required: true,
                                include: [
                                    {
                                        model: models.Category,
                                        attributes: ['id', 'name', 'level', 'parent_id'],
                                        required: true,
                                        include: [
                                            {
                                                model: models.Category,
                                                attributes: ['id', 'name', 'level', 'parent_id'],
                                                required: true,
                                                include: [
                                                    {
                                                        model: models.Category,
                                                        attributes: ['id', 'name', 'level'],
                                                        required: true
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };

    return models.ProductVendor.findAndCountAll(queryObject);
};

exports.findProductVendorBrand = async function (wheres = {}) {
    const models = await DBContext.getInstance();

    const queryObject = {
        group: 'brand_id',
        where: wheres,
        include: [
            {
                model: models.ProductVariant,
                attributes: ['id', 'product_group_id'],
                required: true,
                include: [
                    {
                        model: models.ProductGroup,
                        attributes: ['id', 'brand_id'],
                        required: true,
                        include: [
                            {
                                model: models.Brand,
                                attributes: ['id', 'name']
                            }
                        ]
                    }
                ]
            }
        ]
    };

    return models.ProductVendor.findAndCountAll(queryObject);
};

const getQueryProductVendorWithDetail = function (models, wheres = [], offset, limit) {
    const Op = DBContext.ORMProvider.Op;

    const brandKey = {};
    const categoryKey = {};
    const productVendorKey = {};
    const productGroupKey = {};
    let productVendorOrder = [
        ['id', 'DESC']
    ];

    wheres.forEach((element) => {
        if (element.name === 'search') {
            Object.assign(productVendorKey, {
                [Op.or]: [
                    { sku_vendor: { [Op.eq]: element.value } },
                    { '$ProductVariant.sku$': { [Op.eq]: element.value } },
                    { '$ProductVariant.ProductGroup.name$': { [Op.like]: `%${element.value}%` } }
                ]
            });
        } else if (element.name === 'brand') {
            brandKey.id = { [Op.eq]: element.value };
        } else if (element.name === 'is_active') {
            productVendorKey.is_active = { [Op.eq]: element.value };
        } else if (element.name === 'stock_nonavailable' && element.value === 0) {
            productVendorKey.stock_available = { [Op.eq]: 0 };
        } else if (element.name === 'category') {
            categoryKey.id = { [Op.eq]: element.value };
        } else if (element.name === 'vendor') {
            productVendorKey.vendor_id = { [Op.eq]: element.value };
        } else if (element.name === 'sort') {
            switch (element.value) {
            case 'stock_available_asc':
                productVendorOrder = [
                    ['stock_available', 'ASC']
                ];
                break;
            case 'stock_available_desc':
                productVendorOrder = [
                    ['stock_available', 'DESC']
                ];
                break;
            case 'tier_cogs_price_1_asc':
                productVendorOrder = [
                    ['tier_cogs_price_1', 'ASC']
                ];
                break;
            case 'tier_cogs_price_1_desc':
                productVendorOrder = [
                    ['tier_cogs_price_1', 'DESC']
                ];
                break;
            default:
                productVendorOrder = [
                    ['id', 'DESC']
                ];
                break;
            }
        } else if (element.name === 'product_group') {
            productGroupKey.id = { [Op.eq]: element.value };
        }
    });

    const queryObject = {
        offset,
        limit,
        where: productVendorKey,
        order: productVendorOrder,
        include: [
            {
                model: models.ProductVariant,
                attributes: ['id', 'long_name', 'sku', 'product_group_id', 'variant_value', 'primary_image'],
                required: true,
                include: [
                    {
                        model: models.ProductGroup,
                        attributes: ['id', 'name', 'category_id', 'brand_id'],
                        where: productGroupKey,
                        required: true,
                        include: [
                            {
                                model: models.Brand,
                                attributes: ['id', 'name'],
                                required: true,
                                where: brandKey
                            },
                            {
                                model: models.Category,
                                attributes: ['id', 'name', 'level', 'parent_id'],
                                as: 'Category',
                                required: true,
                                include: [
                                    {
                                        model: models.Category,
                                        attributes: ['id', 'name', 'level', 'parent_id'],
                                        required: true,
                                        include: [
                                            {
                                                model: models.Category,
                                                attributes: ['id', 'name', 'level', 'parent_id'],
                                                required: true,
                                                include: [
                                                    {
                                                        model: models.Category,
                                                        attributes: ['id', 'name', 'level'],
                                                        where: categoryKey,
                                                        required: true
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };

    return queryObject;
};

exports.countProductVendorWithDetail = async function (wheres = [], offset, limit) {
    const models = await DBContext.getInstance();
    const queryObject = getQueryProductVendorWithDetail(models, wheres, offset, limit);
    return models.ProductVendor.count(queryObject);
};

exports.findAllProductVendorWithDetail = async function (wheres = [], offset, limit) {
    const models = await DBContext.getInstance();
    const queryObject = getQueryProductVendorWithDetail(models, wheres, offset, limit);
    return models.ProductVendor.findAll(queryObject);
};

exports.findProductVendorWithDetail = async function (wheres = [], offset, limit) {
    const models = await DBContext.getInstance();
    const queryObject = getQueryProductVendorWithDetail(models, wheres, offset, limit);
    return models.ProductVendor.findAndCountAll(queryObject);
};

exports.findProductVendorPrivateSku = async function (where) {
    const models = await DBContext.getInstance();
    return models.ProductVendorPrivateSkuView.findByPk(where);
};


const findAllChildCategory = async function (where) {
    const models = await DBContext.getInstance();
    const Sequelize = models.context;

    const sql = `
        SELECT id FROM
        (SELECT id,parent_id,
            CASE WHEN id = ${where} THEN @idlist := CONCAT(id)
                    WHEN FIND_IN_SET(parent_id,@idlist) THEN @idlist := CONCAT(@idlist,',',id)
                    END as checkId
        FROM category
        ORDER BY id ASC) as T
        WHERE checkId IS NOT NULL
    `;
    const data = Sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT });
    return data;
};

exports.findProductVendorWithoutCategoryAndBrand = async function (wheres = [], offset, limit) {
    const models = await DBContext.getInstance();
    const Op = DBContext.ORMProvider.Op;

    const productVendorKey = {};
    const productGroupKey = {};
    let productVendorOrder = [
        ['id', 'DESC']
    ];

    for (let i = 0; i < wheres.length; i++) {
        const element = wheres[i];
        if (element.name === 'search') {
            Object.assign(productVendorKey, {
                [Op.or]: [
                    { sku_vendor: { [Op.eq]: element.value } },
                    { '$ProductVariant.sku$': { [Op.eq]: element.value } },
                    { '$ProductVariant.ProductGroup.name$': { [Op.like]: `%${element.value}%` } }
                ]
            });
        } else if (element.name === 'brand') {
            productGroupKey.brand_id = element.value;
        } else if (element.name === 'is_active') {
            productVendorKey.is_active = { [Op.eq]: element.value };
        } else if (element.name === 'stock_nonavailable' && element.value === 0) {
            productVendorKey.stock_available = 0;
        } else if (element.name === 'category') {
            const allCategory = await findAllChildCategory(element.value);
            const allCategoryMap = allCategory.map(a => a.id);
            productGroupKey.category_id = allCategoryMap;
        } else if (element.name === 'vendor') {
            productVendorKey.vendor_id = { [Op.eq]: element.value };
        } else if (element.name === 'sort') {
            switch (element.value) {
            case 'stock_available_asc':
                productVendorOrder = [
                    ['stock_available', 'ASC']
                ];
                break;
            case 'stock_available_desc':
                productVendorOrder = [
                    ['stock_available', 'DESC']
                ];
                break;
            case 'tier_cogs_price_1_asc':
                productVendorOrder = [
                    ['tier_cogs_price_1', 'ASC']
                ];
                break;
            case 'tier_cogs_price_1_desc':
                productVendorOrder = [
                    ['tier_cogs_price_1', 'DESC']
                ];
                break;
            default:
                productVendorOrder = [
                    ['id', 'DESC']
                ];
                break;
            }
        } else if (element.name === 'product_group') {
            productGroupKey.id = { [Op.eq]: element.value };
        }
    }

    const queryObject = {
        offset,
        limit,
        where: productVendorKey,
        order: productVendorOrder,
        include: [
            {
                model: models.ProductVariant,
                attributes: ['id', 'long_name', 'sku', 'product_group_id', 'variant_value', 'primary_image'],
                required: true,
                include: [
                    {
                        model: models.ProductGroup,
                        attributes: ['id', 'name', 'category_id', 'brand_id', 'uom_id'],
                        where: productGroupKey,
                        required: true,
                        include: [
                            {
                                model: models.Uom,
                                attributes: ['id', 'name'],
                                required: true
                            }
                        ]
                    }
                ]
            },
            {
                model: models.PrivateSku,
                required: false
            }
        ]
    };

    return models.ProductVendor.findAndCountAll(queryObject);
};

exports.findByProductGroupId = async function (id, vendorId) {
    const models = await DBContext.getInstance();
    const Op = DBContext.ORMProvider.Op;

    return models.ProductGroup.findOne({
        where: {
            id: parseInt(id),
            status: 1
        },
        include: [
            {
                model: models.ProductVariant,
                required: true,
                include: [
                    {
                        model: models.ProductVendor,
                        required: true,
                        where: {
                            vendor_id: { [Op.eq]: vendorId }
                        }
                    }
                ]
            },
            { model: models.Brand, required: true },
            { model: models.Uom, required: true },
            { model: models.StockingUom, required: true },
            {
                model: models.ProductGroupAttribute,
                include: [
                    {
                        model: models.AttributeCode,
                        include: [
                            { model: models.AttributeValue }
                        ]
                    },
                    models.AttributeValue
                ],
                required: true,
                separate: true
            }
        ]
    });
};

exports.findByViewProductGroupId = async function (id, vendorId) {
    const models = await DBContext.getInstance();
    const Op = DBContext.ORMProvider.Op;

    return models.product_vendor_private_sku_view.findOne({
        where: {
            id: parseInt(id),
            status: 1
        },
        include: [
            {
                model: models.ProductVariant,
                required: true,
                include: [
                    {
                        model: models.ProductVendor,
                        required: true,
                        where: {
                            vendor_id: { [Op.eq]: vendorId }
                        }
                    }
                ]
            },
            { model: models.Brand, required: true },
            { model: models.Uom, required: true },
            { model: models.StockingUom, required: true },
            {
                model: models.ProductGroupAttribute,
                include: [
                    {
                        model: models.AttributeCode,
                        include: [
                            { model: models.AttributeValue }
                        ]
                    },
                    models.AttributeValue
                ],
                required: true,
                separate: true
            }
        ]
    });
};

exports.updateVendorId = async function (wheres = {}, data = {}) {
    const models = await DBContext.getInstance();
    return models.ProductVendor.update(data, {
        where: wheres
    });
};

exports.findVariantWithStock = async function (wheres = {}, sort = [], offset, limit) {
    const models = await DBContext.getInstance();
    return models.ProductVendor.findAll({
        where: wheres,
        offset,
        limit,
        attributes: ['id', 'sku_vendor', 'stock_available', 'product_variant_id'],
        order: [sort],
        include: [
            {
                model: models.ProductVariant,
                attributes: ['id', 'sku', 'long_name', 'primary_image', 'product_group_id'],
                required: true,
                include: [
                    {
                        model: models.ProductGroup,
                        attributes: ['id', 'name', 'uom_id'],
                        required: true,
                        include: [
                            {
                                model: models.Uom,
                                attributes: ['id', 'name'],
                                required: true
                            }
                        ]
                    }
                ]
            }
        ]
    });
};


exports.countAll = async function (where, replacements) {
    const models = await DBContext.getInstance();
    const Sequelize = models.context;

    const whereStock = `${where} AND stock_available=:stock_available`;
    replacements.stock_available = 0;
    const sql = `
        SELECT COUNT(a.is_active) AS total, a.is_active,
        (
            SELECT COUNT(b.id)
            FROM product_vendor b
            WHERE ${whereStock}
        ) AS total_stock_empty
        FROM product_vendor a
        WHERE ${where}
        GROUP BY a.is_active
    `;

    return Sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT, replacements });
};

exports.findProductVendorWithDetailById = async function (wheres) {
    const models = await DBContext.getInstance();
    return models.ProductVendor.findOne({
        where: wheres,
        include: [
            {
                model: models.ProductVariant,
                required: true,
                include: [
                    {
                        model: models.ProductGroup,
                        required: true,
                        include: [
                            {
                                model: models.Category,
                                required: true
                            }
                        ]
                    }
                ]
            }
        ]
    });
};

exports.findOneWithPrivateSku = async function (wheres) {
    const models = await DBContext.getInstance();
    return models.ProductVendor.findOne({
        where: wheres,
        include: [
            {
                model: models.PrivateSku,
                required: false
            }
        ]
    });
};

exports.updateOne = async function (id, vendorId, data = {}) {
    const models = await DBContext.getInstance();
    return models.ProductVendor.update(data, {
        where: {
            id: parseInt(id),
            vendor_id: parseInt(vendorId)
        }
    });
};

exports.findProductVendorEcart = async function (wheres = [], offset, limit) {
    const models = await DBContext.getInstance();
    const Op = DBContext.ORMProvider.Op;

    const productVendorKey = {};
    const productGroupKey = {};
    const productVendorOrder = [
        ['id', 'DESC']
    ];

    for (let i = 0; i < wheres.length; i++) {
        const element = wheres[i];
        if (element.name === 'search') {
            Object.assign(productVendorKey, {
                [Op.or]: [
                    { sku_vendor: { [Op.eq]: element.value } },
                    { '$ProductVariant.sku$': { [Op.eq]: element.value } },
                    { '$ProductVariant.ProductGroup.name$': { [Op.like]: `%${element.value}%` } }
                ]
            });
        }
    }

    const queryObject = {
        offset,
        limit,
        where: productVendorKey,
        order: productVendorOrder,
        include: [
            {
                model: models.ProductVariant,
                attributes: ['id', 'long_name', 'sku', 'product_group_id', 'variant_value', 'primary_image'],
                required: true,
                include: [
                    {
                        model: models.ProductGroup,
                        attributes: ['id', 'name', 'description', 'category_id', 'stocking_uom_id', 'quantity_stocking_uom', 'package_length', 'package_width', 'package_height', 'package_weight'],
                        where: productGroupKey,
                        required: true,
                        include: [
                            {
                                model: models.StockingUom,
                                required: true
                            }
                        ]
                    }
                ]
            }
        ]
    };

    return models.ProductVendor.findAndCountAll(queryObject);
};

module.exports = exports;
