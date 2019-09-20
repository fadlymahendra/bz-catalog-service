'use strict';

const customVendor = function (data) {
    const dataVendor = [];
    data.forEach((row, key) => {
        const vendorInfo = {
            id: row.id,
            vendor_id: row.vendor_id,
            warehouse_id: row.warehouse_id,
            stock_available: row.stock_available,
            currency: row.currency,
            tier_min_qty_1: row.tier_min_qty_1,
            tier_min_qty_2: row.tier_min_qty_2,
            tier_min_qty_3: row.tier_min_qty_3,
            tier_cogs_price_1: parseFloat(row.tier_cogs_price_1),
            tier_cogs_price_2: parseFloat(row.tier_cogs_price_2),
            tier_cogs_price_3: parseFloat(row.tier_cogs_price_3)
        };

        dataVendor.push(vendorInfo);
    });

    return dataVendor;
};

exports.collection = function (data) {
    const productVendors = customVendor(data.ProductVendors);
    return {
        id: data.id,
        product_group_id: data.product_group_id,
        sku: data.sku,
        name: data.long_name,
        uom: {
            id: data.ProductGroup.Uom.id,
            name: data.ProductGroup.Uom.name
        },
        stocking_uom: {
            id: data.ProductGroup.StockingUom.id,
            name: data.ProductGroup.StockingUom.name
        },
        quantity_stocking_uom: data.ProductGroup.quantity_stocking_uom,
        package_weight: parseFloat(data.ProductGroup.package_weight),
        package_length: parseFloat(data.ProductGroup.package_length),
        package_width: parseFloat(data.ProductGroup.package_width),
        package_height: parseFloat(data.ProductGroup.package_height),
        package_content: data.ProductGroup.package_content,
        primary_image: data.primary_image,
        description: data.ProductGroup.description,
        product_vendors: productVendors
    };
};

module.exports = exports;
