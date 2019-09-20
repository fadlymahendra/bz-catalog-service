'use strict';

exports.itemSnapshot = function (data, item, context) {
    return {
        company_seller_id: item.company_seller_id,
        pr_number: data.purchase_request_no,
        hub_id: item.hub_id,
        warehouse_id: item.warehouse_id,
        shipping_cost_estimation: item.shipping_price_estimation,
        shipping_address_id: item.shipping_address_id,
        added_price: item.added_price,
        discount: item.discount,
        deducted_price: item.deducted_price,
        qty: item.qty,
        channel_type: data.channel_type,
        is_punchout: 1,
        check_mapping: item.check_mapping,
        sku: {
            type: 'product_variant',
            id: item.sku_id,
            sku: item.sku_no,
            name: item.product_name,
            brand: item.brand,
            uom: item.uom,
            stocking_uom: item.stock_uom,
            quantity_stocking_uom: item.quantity_stocking_uom,
            categories: item.categories,
            barcode: item.barcode,
            manufacturing_number: item.manufacturing_number,
            package_weight: item.package_weight,
            package_length: item.package_length,
            package_width: item.package_width,
            package_height: item.package_height,
            package_content: item.package_content,
            primary_image: item.primary_image,
            additional_image: item.additional_image,
            description: item.description,
            product_group: item.product_group,
            specifications: item.specifications,
            variants: item.variants,
            variant_count: item.variant_count,
            variant_matrix: item.variant_matrix,
            variant_value: item.variant_value
        },
        vendors: item.vendors_information,
        pricing: item.vendor_pricing,
        total_price: item.price
    };
};

module.exports = exports;
