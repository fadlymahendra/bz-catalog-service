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

exports.item = function (data) {
    const categoryList = getCategory(data.Categories[0]);

    const {
        total_history: totalHistory,
        visibility,
        description,
        package_content: packageContent
    } = data;

    return {
        data: {
            id: data.id,
            name: data.name,
            image: data.primary_image,
            brand: data.Brand.name,
            brand_id: data.Brand.id,
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
                uom_id: data.Uom.id,
                stocking_uom: data.StockingUom.name,
                stocking_uom_id: data.StockingUom.id,
                quantity_stocking_uom: data.quantity_stocking_uom
            },
            specifications: getSpecification(data.ProductGroupAttributes),
            package_content: packageContent,
            description,
            visibility,
            total_history: totalHistory
        }
    };
};

const getSpecification = function (data) {
    const hasil = data.map(function (row) {
        if (row.is_variant === 0) {
            return {
                id: row.id,
                code: row.AttributeCode.code,
                code_id: row.AttributeCode.id,
                label: row.AttributeCode.label,
                type: row.AttributeCode.type,
                values: getValueOfSpecification(row.attribute_value_id, row.AttributeCode.type, row.text_input, row.AttributeCode.AttributeValues)
            };
        }
    });

    return cleanNullValue(hasil);
};


const getValueOfSpecification = function (id, type, textInput, data) {
    let hasil;
    if (type === 'dropdown') {
        hasil = data.map(function (row) {
            if (id === row.id) {
                return {
                    id: row.id,
                    value: row.value
                };
            }
        });
        hasil = cleanNullValue(hasil);
    } else {
        hasil = textInput;
    }
    return hasil;
};

const cleanNullValue = function (data) {
    const hasil = [];
    let count = 0;
    for (const propName in data) {
        if (data[propName] !== null && data[propName] !== undefined) {
            hasil[count] = data[propName];
            count += 1;
        }
    }
    return hasil;
};

module.exports = exports;
