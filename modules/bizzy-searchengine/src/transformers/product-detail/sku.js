'use strict';

const Helper = require('../../utils/helper');

const getProductVariant = function (data) {
    const result = [];
    data.forEach((row, key) => {
        const variants = {
            code: row.attribute_code,
            label: row.attribute_code_label,
            value: row.attribute_value_name
        };

        result.push(variants);
    });
    return result;
};

const getProductSpecifications = function (ProductAttributes) {
    const result = [];
    ProductAttributes.forEach((row, key) => {
        const attrLabel = row.AttributeCode.label;
        const attrCode = row.AttributeCode.code;
        let spec = {};

        if (row.text_input === null) {
            spec = {
                code: attrCode,
                label: attrLabel,
                value: row.AttributeValue.value
            };
        } else {
            const attrValue = row.text_input;
            spec = {
                code: attrCode,
                label: attrLabel,
                value: attrValue
            };
        }

        result.push(spec);
    });

    return result;
};

const getUrlKey = function (name, level, id) {
    return Helper.slugify(`${name}_${level}.${id}`);
};

exports.item = function (data) {
    return {
        type: 'product_variant',
        id: data.id,
        sku: data.sku,
        name: data.long_name,
        brand: {
            id: data.brand.id,
            name: data.brand.name,
            url_key: Helper.slugify(data.brand.name)
        },
        uom: {
            id: data.uom.id,
            name: data.uom.name
        },
        stocking_uom: {
            id: data.stocking_uom.id,
            name: data.stocking_uom.name
        },
        quantity_stocking_uom: data.payload.quantity_stocking_uom,
        categories: {
            c0: {
                id: data.c0.id,
                name: data.c0.name,
                url_key: getUrlKey(data.c0.name, data.c0.level, data.c0.id),
                unspsc: data.c0.unspsc
            },
            c1: {
                id: data.c1.id,
                name: data.c1.name,
                url_key: getUrlKey(data.c1.name, data.c1.level, data.c1.id),
                unspsc: data.c1.unspsc
            },
            c2: {
                id: data.c2.id,
                name: data.c2.name,
                url_key: getUrlKey(data.c2.name, data.c2.level, data.c2.id),
                unspsc: data.c2.unspsc
            },
            c3: {
                id: data.c3.id,
                name: data.c3.name,
                url_key: getUrlKey(data.c3.name, data.c3.level, data.c3.id),
                unspsc: data.c3.unspsc
            }
        },
        barcode: data.payload.barcode,
        manufacturing_number: data.payload.manufacturing_number,
        package_weight: data.payload.package_weight,
        package_length: parseFloat(data.payload.package_length),
        package_width: parseFloat(data.payload.package_width),
        package_height: parseFloat(data.payload.package_height),
        package_content: data.payload.package_content,
        primary_image: data.primary_image,
        additional_image: Helper.convertToArray(data.additional_image, 'array'),
        description: data.payload.description,
        product_group: {
            id: data.payload.id,
            name: data.payload.name
        },
        specifications: (data.product_specifications.length === 0) ? [] : getProductSpecifications(data.product_specifications),
        variants: (data.variant_attribute.length === 0) ? [] : getProductVariant(data.variant_attribute),
        variant_count: data.payload.variant_count,
        variant_matrix: (data.payload.variant_matrix.length === 0) ? [] : Helper.convertToArray(data.payload.variant_matrix, 'array'),
        variant_value: (data.variant_value === 'NO_VARIANT') ? 'NO_VARIANT' : Helper.convertToArray(data.variant_value, 'object'),
        start_from: (data.vendors.length === 0) ? 0 : parseFloat(data.vendors[0].tier_cogs_price_1),
        total_offer: data.vendors.length

    };
};

module.exports = exports;
