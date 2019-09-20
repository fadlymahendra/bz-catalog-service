'use strict';

const getCategory = function (Categories) {
    return {
        C0: {
            id: Categories.category0_id,
            name: Categories.category0_name,
            unspsc: Categories.category0_unspsc
        },
        C1: {
            id: Categories.category1_id,
            name: Categories.category1_name,
            unspsc: Categories.category1_unspsc
        },
        C2: {
            id: Categories.category2_id,
            name: Categories.category2_name,
            unspsc: Categories.category2_unspsc
        },
        C3: {
            id: Categories.category3_id,
            name: Categories.category3_name,
            unspsc: Categories.category3_unspsc
        }
    };
};

const getSpecification = function (data) {
    const hasil = data.map(function (row) {
        if (row.is_variant === 0) {
            return {
                id: row.AttributeCode.id,
                code: row.AttributeCode.code,
                label: row.AttributeCode.label,
                type: row.AttributeCode.type,
                values: row.AttributeCode.AttributeValues.map(function (rowValue) {
                    return {
                        id: rowValue.id,
                        value: rowValue.value
                    };
                })
            };
        }
    });

    const hasil2 = [];
    let count = 0;
    for (const propName in hasil) {
        if (hasil[propName] !== null && hasil[propName] !== undefined) {
            hasil2[count] = hasil[propName];
            count += 1;
        }
    }
    return hasil2;
};
exports.item = function (data) {
    const categoryList = getCategory(data.Categories[0]);

    return {
        data: {
            id: data.id,
            name: data.name,
            brand: data.Brand.name,
            categories: categoryList,
            dimensions: {
                package_weight: data.package_weight,
                package_length: data.package_length,
                package_width: data.package_width,
                package_height: data.package_height
            },
            detail: {
                manufacturing_number: data.manufacturing_number,
                barcode: data.barcode,
                uom: data.Uom.name,
                stocking_uom: data.StockingUom.name,
                quantity_stocking_uom: data.quantity_stocking_uom
            },
            specification: getSpecification(data.ProductGroupAttributes),
            description: data.description,
            visibility: data.visibility
        }
    };
};

module.exports = exports;
