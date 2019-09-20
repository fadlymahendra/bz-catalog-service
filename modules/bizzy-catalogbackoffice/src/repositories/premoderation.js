'use strict';

const { MongoContext, DBContext } = require('bizzy-common');

exports.insertOne = async function (data = {}) {
    const db = await MongoContext.getInstance();
    return db.collection('premoderation').insertOne(data);
};

exports.findOne = async function (id) {
    const db = await MongoContext.getInstance();
    return db.collection('premoderation').findOne({
        id
    });
};

exports.findById = async function (id) {
    const db = await MongoContext.getInstance();
    return db.collection('premoderation').findOne({ id });
};

exports.findAll = async function (wheres = {}, offset, limit, sort = {}) {
    const db = await MongoContext.getInstance();
    return db.collection('premoderation').find(wheres)
            .skip(offset)
            .limit(parseInt(limit))
            .sort(sort)
            .toArray();
};

exports.count = async function (wheres = {}) {
    const db = await MongoContext.getInstance();
    return db.collection('premoderation').find(wheres).count();
};

exports.countAllPremoderationStatus = async function (wheres = {}) {
    const db = await MongoContext.getInstance();
    const cursor = await db.collection('premoderation').aggregate([
        {
            $match: wheres
        },
        {
            $group: {
                _id: '$premoderation_status',
                count: {
                    $sum: 1
                }
            }
        }
    ]);

    return cursor.get();
};

exports.update = async function (id, status) {
    const models = await MongoContext.getInstance();
    return models.collection('premoderation').update(
        { id },
        {
            $set: {
                premoderation_status: status
            }
        }
    );
};

exports.updateAssign = async function (assignTo, wheres) {
    const models = await MongoContext.getInstance();
    return models.collection('premoderation').update(
        { id: wheres },
        {
            $set: {
                assign: assignTo
            },
            $currentDate: { assign_at: true }
        },
        { multi: true }
    );
};

exports.updateVariantId = async function (wheres, productVariantId) {
    const models = await MongoContext.getInstance();
    return models.collection('premoderation').updateOne(
        wheres,
        {
            $set: {
                'payload.products.$.product_variant_id': parseInt(productVariantId)
            },
            $currentDate: { updated_at: true }
        }
    );
};

exports.findWithStatus = async function (wheres) {
    const models = await MongoContext.getInstance();
    return models.collection('premoderation').findOne(wheres);
};

exports.insertDataOne = async function (payload) {
    const models = await DBContext.getInstance();
    return models.ProductGroup.findOrCreate({
        where: {
            name: payload.name
        },
        defaults: payload
    });
};

exports.updateVariantStatus = async function (id, index, newStatus) {
    const models = await MongoContext.getInstance();

    const wheres = {
        id: {
            $eq: id
        }
    };
    const newValues = {};

    const setNewValues = `payload.products.${index}.variant_status`;
    newValues[setNewValues] = newStatus;

    return models.collection('premoderation').update(
        wheres,
        {
            $set: newValues,
            $currentDate: { updated_at: true }
        }
    );
};

exports.updateSpecificationStatus = async function (id, newStatus) {
    const models = await MongoContext.getInstance();

    const wheres = {
        id: {
            $eq: id
        }
    };
    const newValues = {};

    const setNewValues = 'payload.specification_status';
    newValues[setNewValues] = newStatus;

    return models.collection('premoderation').update(
        wheres,
        {
            $set: newValues,
            $currentDate: { updated_at: true }
        }
    );
};

exports.updateAttributeValueByProduct = async function (data, index) {
    const models = await MongoContext.getInstance();

    const wheres = {
        id: {
            $eq: data.id
        }
    };
    const newValues = {};
    let keyValueId = '';
    let keyCode = '';
    let setValueId = '';
    let setValueLabel = '';

    if (data.is_variant === 1) {
        keyCode = `payload.products.${index}.variants.attribute_id`;
        keyValueId = `payload.products.${index}.variants.attribute_value_id`;
        setValueId = `payload.products.${index}.variants.$.attribute_value_id`;
        setValueLabel = `payload.products.${index}.variants.$.attribute_value_name`;

        const setVariantValue = `payload.products.${index}.variant_value.${data.attribute_code}`;
        const setAttributeStatus = `payload.products.${index}.variants.$.attribute_status`;
        const keyProductIndex = `payload.products.${index}.index`;

        wheres[keyProductIndex] = data.index;
        newValues[setVariantValue] = data.attribute_value_id;
        newValues[setAttributeStatus] = 'updated';
    } else {
        keyCode = 'payload.specifications.attribute_id';
        keyValueId = 'payload.specifications.attribute_value_id';
        setValueId = 'payload.specifications.$.attribute_value_id';
        setValueLabel = 'payload.specifications.$.attribute_value_label';

        const setSpecStatus = 'payload.specifications.$.attribute_status';
        newValues[setSpecStatus] = 'updated';
    }

    wheres[keyCode] = data.attribute_code_id;
    wheres[keyValueId] = { $eq: 0 };
    newValues[setValueId] = data.attribute_value_id;
    newValues[setValueLabel] = data.attribute_value_name;

    // console.log("[wheres]", wheres);
    // console.log("[newvalues]", newValues);

    return models.collection('premoderation').update(
        wheres,
        {
            $set: newValues,
            $currentDate: { updated_at: true }
        }
    );
};

exports.findAllWithRange = async function (wheres = {}) {
    const db = await MongoContext.getInstance();
    return db.collection('premoderation').find(wheres).toArray();
};

exports.findAllGroupVendor = async function (wheres = {}) {
    const db = await MongoContext.getInstance();
    const cursor = await db.collection('premoderation').aggregate([
        {
            $match: wheres
        },
        {
            $group: {
                _id: '$vendor_id',
                data: {
                    $push: {
                        id: '$id',
                        premoderation_status: '$premoderation_status',
                        payload: '$payload',
                        user: '$user',
                        assign: '$assign',
                        created_at: '$created_at',
                        updated_at: '$updated_at'
                    }
                }
            }
        }
    ]);

    return cursor.get();
};

exports.findAllGroupAssign = async function (wheres = {}) {
    const db = await MongoContext.getInstance();

    const cursor = await db.collection('premoderation').aggregate([
        {
            $match: wheres
        },
        {
            $group: {
                _id: '$assign.id',
                data: {
                    $push: {
                        id: '$id',
                        premoderation_status: '$premoderation_status',
                        payload: '$payload',
                        user: '$user',
                        assign: '$assign',
                        created_at: '$created_at',
                        updated_at: '$updated_at'
                    }
                }
            }
        }
    ]);

    return cursor.get();
};

exports.updateBrand = async function (data) {
    const models = await MongoContext.getInstance();

    const wheres = {
        id: {
            $eq: data.id
        },
        'payload.brand_id': 0
    };

    return models.collection('premoderation').update(
        wheres,
        {
            $set: {
                'payload.brand_id': data.brand_id,
                'payload.brand_name': data.brand_name,
                'payload.brand_image': data.brand_image,
                'payload.brand_status': 'clear'
            },
            $currentDate: { updated_at: true }
        }
    );
};

exports.insertMany = async function (data = []) {
    const db = await MongoContext.getInstance();
    return db.collection('premoderation').insertMany(data);
};

module.exports = exports;
