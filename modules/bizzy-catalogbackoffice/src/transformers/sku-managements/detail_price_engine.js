'use strict';

exports.item = function (data) {
    return {
        id: data.id,
        sku: data.sku,
        is_active: data.is_active,
        c3: {
            id: data.product_group.Category.id,
            name: data.product_group.Category.name,
            level: data.product_group.Category.level
        },
        tier_data: [
            {
                tier_min_qty_1: data.vendor_information ? data.vendor_information.tier_min_qty_1 : null,
                tier_cogs_price_1: data.vendor_information ? parseFloat(data.vendor_information.tier_cogs_price_1) : null
            },
            {
                tier_min_qty_2: data.vendor_information ? data.vendor_information.tier_min_qty_2 : null,
                tier_cogs_price_2: data.vendor_information ? parseFloat(data.vendor_information.tier_cogs_price_2) : null
            },
            {
                tier_min_qty_3: data.vendor_information ? data.vendor_information.tier_min_qty_3 : null,
                tier_cogs_price_3: data.vendor_information ? parseFloat(data.vendor_information.tier_cogs_price_3) : null
            }
        ],
        vendor: data.vendor_information ? {
            id: data.vendor_information.vendor_id,
            warehouse_id: data.vendor_information.warehouse_id
        } : null,
        product_group: {
            quantity_stocking_uom: data.product_group.quantity_stocking_uom,
            stocking_uom: {
                id: data.product_group.StockingUom.id,
                name: data.product_group.StockingUom.name
            }
        }
    };
};

exports.itemBulk = function (data, vendorInformation) {
    return {
        id: data.id,
        sku: data.sku,
        c3: {
            id: data.product_group.Category.id,
            name: data.product_group.Category.name,
            level: data.product_group.Category.level
        },
        tier_data: [
            {
                tier_min_qty_1: vendorInformation.tier_min_qty_1,
                tier_cogs_price_1: parseFloat(vendorInformation.tier_cogs_price_1)
            },
            {
                tier_min_qty_2: vendorInformation.tier_min_qty_2,
                tier_cogs_price_2: parseFloat(vendorInformation.tier_cogs_price_2)
            },
            {
                tier_min_qty_3: vendorInformation.tier_min_qty_3,
                tier_cogs_price_3: parseFloat(vendorInformation.tier_cogs_price_3)
            }
        ],
        vendor: {
            id: vendorInformation.vendor_id,
            warehouse_id: vendorInformation.warehouse_id
        },
        product_group: {
            quantity_stocking_uom: data.product_group.quantity_stocking_uom,
            stocking_uom: {
                id: data.product_group.StockingUom.id,
                name: data.product_group.StockingUom.name
            }
        }
    };
};

module.exports = exports;
