'use strict';

const getCategories = function (categories) {
    if (categories.length === 0) {
        const temp = {};
        const CName = ['C0', 'C1', 'C2', 'C3'];
        CName.forEach((item) => {
            temp[item] = {
                id: 0,
                name: '',
                unspsc: 0
            };
        });
        return temp;
    }
    return {
        C0: {
            id: categories[0].category0_id,
            name: categories[0].category0_name,
            unspsc: categories[0].category0_unspsc
        },
        C1: {
            id: categories[0].category1_id,
            name: categories[0].category1_name,
            unspsc: categories[0].category1_unspsc
        },
        C2: {
            id: categories[0].category2_id,
            name: categories[0].category2_name,
            unspsc: categories[0].category2_unspsc
        },
        C3: {
            id: categories[0].category3_id,
            name: categories[0].category3_name,
            unspsc: categories[0].category3_unspsc
        }
    };
};

const getProducts = function (products) {
    return products.map(row => ({
        index: (row.index ? row.index : ''),
        variants: row.variants,
        variant_value: row.variant_value,
        sku_vendor: row.sku_vendor,
        tier_min_qty_1: row.tier_min_qty_1,
        tier_min_qty_2: row.tier_min_qty_2,
        tier_min_qty_3: row.tier_min_qty_3,
        tier_cogs_price_1: row.tier_cogs_price_1,
        tier_cogs_price_2: row.tier_cogs_price_2,
        tier_cogs_price_3: row.tier_cogs_price_3,
        stock: row.stock,
        primary_image: row.primary_image,
        additional_image: row.additional_image,
        warehouse_id: row.warehouse_id,
        location_label: row.location_label,
        reference_link: row.reference_link,
        warranty_option: row.warranty_option,
        warranty_period: row.warranty_period,
        warranty_limit: row.warranty_limit,
        warranty_coverage: row.warranty_coverage,
        is_indent: row.is_indent,
        indent_period: row.indent_period,
        indent_limit: row.indent_limit,
        variant_status: row.variant_status,
        is_contract: (row.is_contract ? row.is_contract : 0),
        is_decimal: row.is_decimal ? row.is_decimal : 0,
        down_payment_type: row.down_payment_type ? row.down_payment_type : 0,
        down_payment_value: row.down_payment_value ? row.down_payment_value : 0
    }));
};

exports.item = function (data, complementary) {
    return {
        id: data.id,
        type: data.type,
        product_group_id: (data.product_group_id ? data.product_group_id : null),
        premoderation_status: data.premoderation_status,
        payload: {
            name: data.payload.name,
            uom: {
                id: complementary.uom.id,
                name: complementary.uom.name
            },
            barcode: data.payload.barcode,
            manufacturing_number: data.payload.manufacturing_number,
            stocking_uom: {
                id: complementary.stocking_uom.id,
                name: complementary.stocking_uom.name
            },
            quantity_stocking_uom: data.payload.quantity_stocking_uom,
            brand: {
                id: data.payload.brand_id,
                name: data.payload.brand_name,
                status: data.payload.brand_status,
                image: data.payload.brand_image
            },
            category_id: data.payload.category_id,
            categories: getCategories(complementary.categories),
            dimensions: {
                package_weight: data.payload.package_weight,
                package_length: data.payload.package_length,
                package_width: data.payload.package_width,
                package_height: data.payload.package_height
            },
            package_content: data.payload.package_content,
            description: data.payload.description,
            variant_count: data.payload.variant_count,
            variant_matrix: data.payload.variant_matrix,
            specification_status: data.payload.specification_status,
            specifications: data.payload.specifications,
            products: getProducts(data.payload.products),
            variant_images: data.variant_images
        },
        reject_reasons: complementary.reject_reasons
    };
};

module.exports = exports;
