'use strict';

const Helper = require('../../utils/helper');

const getVendorInformation = function (data) {
    const result = {};
    const delimeter = ' ';
    data.forEach((row, key) => {
        const nameVendor = [];
        nameVendor.push(row.prefix.trim());
        nameVendor.push(row.name.trim());
        nameVendor.push(row.suffix.trim());

        result[row.id] = (row.prefix === '' && row.name === '') ? '' : Helper.implode(nameVendor, delimeter);
    });
    return result;
};

const getPriceItems = function (data) {
    const result = {};
    const priceData = data;
    priceData.forEach((row, key) => {
        result[row.vendor_id] = row;
    });
    return result;
};

const customVendor = function (data, vendorInformation, priceEngine) {
    const dataVendor = [];
    const vendorName = getVendorInformation(vendorInformation.data);
    const priceItems = getPriceItems(priceEngine);

    data.forEach((row, key) => {
        const vendorInfo = {
            id: row.id,
            vendor_id: row.vendor_id,
            vendor_name: vendorName[(row.vendor_id).toString()],
            warehouse_id: row.warehouse_id,
            stock_available: row.stock_available,
            currency: row.currency,
            tier_min_qty_1: row.tier_min_qty_1,
            tier_min_qty_2: row.tier_min_qty_2,
            tier_min_qty_3: row.tier_min_qty_3,
            tier_cogs_price_1: parseFloat(row.tier_cogs_price_1),
            tier_cogs_price_2: parseFloat(row.tier_cogs_price_2),
            tier_cogs_price_3: parseFloat(row.tier_cogs_price_3),
            price_engine: priceItems[(row.vendor_id)]
        };

        dataVendor.push(vendorInfo);
    });

    return dataVendor;
};

exports.item = function (data) {
    const productVendors = customVendor(data.vendors, data.vendor_information, data.price_engine);
    return {
        data: {
            id: data.id,
            sku: data.sku,
            name: data.long_name,
            // brand: {
            //     id: data.brand.id,
            //     name: data.brand.name
            // },
            uom: {
                id: data.uom.id,
                name: data.uom.name
            },
            stocking_uom: {
                id: data.stocking_uom.id,
                name: data.stocking_uom.name
            },
            quantity_stocking_uom: data.payload.quantity_stocking_uom,
            // categories: {
            //     c0: {
            //         id: data.c0.id,
            //         name: data.c0.name,
            //         unspsc: data.c0.unspsc
            //     },
            //     c1: {
            //         id: data.c1.id,
            //         name: data.c1.name,
            //         unspsc: data.c1.unspsc
            //     },
            //     c2: {
            //         id: data.c2.id,
            //         name: data.c2.name,
            //         unspsc: data.c2.unspsc
            //     },
            //     c3: {
            //         id: data.c3.id,
            //         name: data.c3.name,
            //         unspsc: data.c3.unspsc
            //     }
            // },
            barcode: data.payload.barcode,
            manufacturing_number: data.payload.manufacturing_number,
            package_weight: data.payload.package_weight,
            package_length: parseFloat(data.payload.package_length),
            package_width: parseFloat(data.payload.package_width),
            package_height: parseFloat(data.payload.package_height),
            package_content: data.payload.package_content,
            primary_image: data.primary_image,
            additional_image: Helper.convertToArray(data.additional_image),
            description: data.payload.description,
            product_group: {
                id: data.payload.id,
                name: data.payload.name
            },
            product_vendors: productVendors,
            cheapest: productVendors[0] ? productVendors[0] : {}
        }
    };
};

module.exports = exports;
