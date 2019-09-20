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

const getProductAttribute = function (ProductAttributes) {
    const productSpec = [];
    const productVariant = [];
    let attrVar = [];
    let attrSpec = [];

    for (let i = 0; i < ProductAttributes.length; i++) {
        const attrLabel = ProductAttributes[i].AttributeCode.label;
        const attrCode = ProductAttributes[i].AttributeCode.code;
        let attrValue = '';


        const isVariant = ProductAttributes[i].is_variant;

        if (isVariant === 0) {
            if (ProductAttributes[i].text_input === null) {
                attrSpec = {
                    code: attrCode,
                    label: attrLabel,
                    value: ProductAttributes[i].AttributeValue.value
                };
            } else {
                attrValue = ProductAttributes[i].text_input;
                attrSpec = {
                    code: attrCode,
                    label: attrLabel,
                    value: attrValue
                };
            }

            productSpec.push(attrSpec);
        } else {
            const value = ProductAttributes[i].AttributeCode.AttributeValues;
            const attrId = ProductAttributes[i].AttributeCode.id;
            const valueList = [];

            for (let j = 0; j < value.length; j++) {
                const data = {
                    id: value[j].id,
                    value: value[j].value
                };
                valueList.push(data);
            }

            attrVar = {
                id: attrId,
                code: attrCode,
                label: attrLabel,
                type: ProductAttributes[i].AttributeCode.type,
                values: valueList
            };

            productVariant.push(attrVar);
        }
    }

    const productAttribute = {
        spesifications: productSpec,
        variants: productVariant
    };

    return productAttribute;
};

exports.item = function (data) {
    const categoryList = getCategory(data.Categories[0]);
    const productAttribute = getProductAttribute(data.ProductGroupAttributes);

    return {
        id: data.id,
        name: data.name,
        uom: data.Uom.name,
        barcode: data.barcode,
        manufacturing_number: data.manufacturing_number,
        primary_image: data.primary_image,
        stocking_uom: data.StockingUom.name,
        quantity_stocking_uom: data.quantity_stocking_uom,
        variant_count: data.variant_count,
        variant_matrix: (data.variant_matrix === '' || data.variant_matrix == null) ? [] : JSON.parse(data.variant_matrix),
        description: data.description,
        brand: data.Brand.name,
        categories: categoryList,
        dimensions: {
            package_weight: data.package_weight,
            package_length: data.package_length,
            package_width: data.package_width,
            package_height: data.package_height
        },
        package_content: data.package_content,
        spesifications: productAttribute.spesifications,
        variants: productAttribute.variants,
        variant_images: data.variant_images
    };
};

exports.generateVariantImages = function (data) {
    const variantImages = {};

    data.forEach((element) => {
        let variantValue = element.variant_value;
        if (variantValue !== 'NO_VARIANT') {
            variantValue = variantValue.replace(/"/g, '');
            variantValue = variantValue.replace(/,/g, '|');
            variantValue = variantValue.replace(/:/g, '=');
            variantValue = variantValue.replace(/{/g, '');
            variantValue = variantValue.replace(/}/g, '');
        }

        variantImages[variantValue] = {
            primary_image: element.primary_image,
            additional_image: (element.additional_image === '' || element.additional_image == null) ? [] : JSON.parse(element.additional_image)
        };
    });

    return variantImages;
};

module.exports = exports;
