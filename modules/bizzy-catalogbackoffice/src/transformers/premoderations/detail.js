'use strict';

const lod = require('lodash');
const Helper = require('../../utils/helper');

/** transform data category */
const categoryItem = function (data) {
    if (data === null) {
        return {
            id: 0,
            name: '',
            level: '',
            unspc: 0
        };
    }
    const category = Helper.parseDataObject(data);
    return {
        id: category.id,
        name: category.name,
        level: category.level,
        unspc: category.unspsc
    };
};

/** transform data uom */
const uomItem = function (data) {
    const uom = Helper.parseDataObject(data);
    return {
        id: uom.id,
        name: uom.name
    };
};

/** transform data stocking_uom */
const stockingUomItem = function (data) {
    const stockingUom = Helper.parseDataObject(data);
    return {
        id: stockingUom.id,
        name: stockingUom.name
    };
};
/** transform data attribute variants */
const attributVarianItem = function (data) {
    const attributes = [];
    lod.each(data, (a) => {
        const item = {
            attribute_id: a.attribute_id,
            attribute_code: a.attribute_code,
            attribute_code_label: a.attribute_code_label,
            attribute_value_name: a.attribute_value_name,
            attribute_value_id: a.attribute_value_id,
            attribute_status: a.attribute_status
        };
        attributes.push(item);
    });
    return attributes;
};

/** transform data variants */
const varianItem = function (data) {
    const variants = [];
    lod.each(data, (v) => {
        const varianItems = {
            index: v.index,
            variants: attributVarianItem(v.variants),
            variant_value: v.variant_value,
            sku_vendor: v.sku_vendor,
            tier_min_qty_1: v.tier_min_qty_1,
            tier_min_qty_2: v.tier_min_qty_2,
            tier_min_qty_3: v.tier_min_qty_3,
            tier_cogs_price_1: v.tier_cogs_price_1,
            tier_cogs_price_2: v.tier_cogs_price_2,
            tier_cogs_price_3: v.tier_cogs_price_3,
            stock: v.stock,
            primary_image: v.primary_image ? v.primary_image : null,
            additional_image: v.additional_image ? v.additional_image : [],
            warehouse_id: v.warehouse_id,
            location_label: v.location_label,
            reference_link: v.reference_link ? v.reference_link : [],
            warranty_option: v.warranty_option ? v.warranty_option : null,
            warranty_period: v.warranty_period ? v.warranty_period : null,
            warranty_limit: v.warranty_limit ? v.warranty_limit : null,
            warranty_coverage: v.warranty_coverage ? v.warranty_coverage : null,
            is_indent: v.is_indent,
            indent_period: v.indent_period,
            indent_limit: v.indent_limit,
            variant_status: v.variant_status
        };
        variants.push(varianItems);
    });
    return variants;
};

/** transformer main function */
exports.item = function (data) {
    const { total_history: totalHistory } = data;

    return {
        data: {
            id: data.id,
            type: data.type,
            product_group_id: data.product_group_id ? data.product_group_id : null,
            product_name: data.payload.name,
            category: {
                c0: categoryItem(data.c0),
                c1: categoryItem(data.c1),
                c2: categoryItem(data.c2),
                c3: categoryItem(data.c3)
            },
            brand: {
                id: data.payload.brand_id,
                name: data.payload.brand_name,
                status: data.payload.brand_status,
                image: data.payload.brand_image
            },
            variant_matrix: (data.payload.variant_matrix === '' || data.payload.variant_matrix == null) ? [] : JSON.parse(data.payload.variant_matrix),
            variant_detail: varianItem(data.payload.products),
            specifications: data.payload.specifications,
            package_weight: data.payload.package_weight,
            package_length: data.payload.package_length,
            package_width: data.payload.package_width,
            package_height: data.payload.package_height,
            package_content: data.payload.package_content,
            uom: uomItem(data.uom),
            stocking_uom: stockingUomItem(data.stocking_uom),
            quantity_stocking_uom: data.payload.quantity_stocking_uom,
            description: data.payload.description,
            premoderation_status: data.premoderation_status ? data.premoderation_status : null,
            barcode: data.payload.barcode,
            manufacturing_number: data.payload.manufacturing_number,
            total_history: totalHistory
        }
    };
};

module.exports = exports;
