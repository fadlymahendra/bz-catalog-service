'use strict';

const uuid = require('uuid');
const Helper = require('../../utils/helper');

exports.collection = function (data, info, status = true) {
    const lastName = info.context.user.last_name || '';
    const userName = `${info.context.user.first_name} ${lastName}`;

    return {
        title: 'Bulk Upload By Bizzy',
        customer_id: info.customer_id,
        file: {
            url: info.s3_file.Location,
            file_name: info.s3_file.file_name
        },
        product: data,
        user: {
            id: info.context.user.employee.id,
            name: userName,
            email: info.context.user.username,
            type: 'employee'
        },
        inserted: status,
        created_at: info.process_time,
        updated_at: info.process_time
    };
};

exports.transformProductPremoderation = function (data, info) {
    const {
        product_group: productGroup,
        // product_variant: productVariant,
        product_vendor: productVendor,
        key: selectedValue
    } = data.product;

    const {
        process_time: processTime,
        context
    } = info;

    const lastName = context.user.last_name || '';
    const userName = `${context.user.first_name} ${lastName}`;

    return {
        id: uuid.v4(),
        type: 'new',
        payload: {
            name: data.product_name,
            brand_id: productGroup.brand_id,
            brand_name: data.brand,
            category_id: 0,
            category: {
                c3: 0,
                c2: 0,
                c1: 0,
                c0: 0
            },
            brand_image: selectedValue.brand === null ? 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg' : selectedValue.brand.image_url,
            uom_id: selectedValue.uom ? selectedValue.uom.id : info.uom,
            stocking_uom_id: selectedValue.stock_uom ? selectedValue.stock_uom.id : info.stock_uom,
            quantity_stocking_uom: parseInt(data.quantity_stocking_uom, 10),
            manufacturing_number: '',
            brand_status: 'clear',
            specification_status: 'completed',
            package_weight: String(data.package_weight),
            package_length: String(data.package_length),
            package_height: String(data.package_height),
            package_width: String(data.package_width),
            package_content: productGroup.package_content,
            barcode: '',
            description: productGroup.description,
            variant_count: 0,
            variant_matrix: [],
            specifications: [],
            products: [
                {
                    variants: [],
                    variant_value: 'NO_VARIANT',
                    index: Helper.generateRandomIndex(),
                    sku_vendor: productVendor.sku_vendor ? String(productVendor.sku_vendor).toUpperCase() : '',
                    tier_min_qty_1: String(data.tier_min_qty_1),
                    tier_min_qty_2: '',
                    tier_min_qty_3: '',
                    tier_cogs_price_1: String(Math.floor(data.tier_cogs_price_1)),
                    tier_cogs_price_2: '',
                    tier_cogs_price_3: '',
                    stock: 1000,
                    warehouse_id: productVendor.id,
                    location_label: productVendor.location_label,
                    reference_link: [],
                    warranty_option: productVendor.warranty_type,
                    warranty_period: productVendor.warranty_period,
                    warranty_coverage: '',
                    warranty_limit: productVendor.warranty_limit,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: '',
                    variant_status: 'complete',
                    primary_image: 'https://assets.bizzy.co.id/image-placeholder-thumb.jpg',
                    additional_image: []
                }
            ]
        },
        premoderation_status: 'need_to_review',
        vendor_id: productVendor.vendor_id,
        user: {
            id: context.user.employee.id,
            name: userName,
            email: context.user.username,
            type: 'employee'
        },
        created_at: processTime,
        updated_at: processTime
    };
};

module.exports = exports;
