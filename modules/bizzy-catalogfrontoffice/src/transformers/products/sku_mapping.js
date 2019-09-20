'use strict';

exports.item = function (items, sku, uniqueId, person) {
    return {
        id: uniqueId,
        product_sku: sku,
        payload: items,
        user: {
            id: person.user.customer.person_id,
            name: `${person.user.first_name} ${person.user.last_name}`,
            email: person.user.username
        },
        created_at: new Date(),
        updated_at: new Date()
    };
};

exports.collection = function (data) {
    const {
        sku,
        mapping,
        catalog_id: catalogId
    } = data;

    return {
        sku,
        mapping: (mapping === null) ? 0 : 1,
        catalog_id: catalogId,
        material_code: mapping ? mapping.payload.material_code : null,
        material_group: mapping ? mapping.payload.material_group : null
    };
};

const getSkuData = function (data) {
    const result = [];
    data.forEach((row) => {
        result.push(row.product_sku);
    });
    return result;
};

const getSkuDetail = function (sku, skusName) {
    const result = {};
    const data = skusName.find(el => el.sku === sku);
    result.category_name = data.category_name;
    result.long_name = data.long_name;
    result.primary_image = data.primary_image;
    result.uom_bizzy = data.uom_bizzy.name;
    return result;
};

const getSpecifications = function (sku, specifications) {
    const specs = specifications.find(spec => spec.sku === sku);
    return specs.specifications;
};

const getItemData = function (skus, skusName, specifications) {
    const res = [];
    skus.forEach((element) => {
        const skuDetail = getSkuDetail(element.product_sku, skusName);
        const sku = {
            sku: element.product_sku,
            material_code: element.payload.material_code,
            material_group: element.payload.material_group,
            manufacturer_code: element.payload.manufacturer_code,
            mapped: element.payload.mapped,
            uom: element.payload.uom || '0',
            quantity_stocking_uom: element.payload.quantity_stocking_uom || 0,
            specifications: getSpecifications(element.product_sku, specifications)
        };
        const row = Object.assign(skuDetail, sku);
        res.push(row);
    });
    return res;
};

exports.mapping = function (data) {
    return {
        catalog_id: data.catalog_id,
        sku: getSkuData(data.skus)
    };
};

exports.mappingItem = function (data) {
    return {
        sku: getItemData(data.skus, data.skusName, data.specifications)
    };
};

exports.onlyPayload = function (data) {
    return {
        product_sku: data.product_sku,
        payload: data.payload
    };
};

exports.createPayload = function (data) {
    return {
        product_sku: data._id.product_sku,
        payload: {
            organization_id: data._id.organization_id,
            material_code: data._id.material_code,
            material_group: data._id.material_group,
            mapped: data._id.mapped,
            manufacturer_code: data._id.manufacturer_code,
            uom: data._id.uom,
            quantity_stocking_uom: data._id.quantity_stocking_uom
        }
    };
};

module.exports = exports;
