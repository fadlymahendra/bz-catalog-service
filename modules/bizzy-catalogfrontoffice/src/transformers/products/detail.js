'use strict';

const Helper = require('../../utils/helper');

const generateVariantValue = (data) => {
    if (String(data) === 'NO_VARIANT') {
        return 'NO_VARIANT';
    }
    return JSON.parse(data);
};

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
    let attrSpec = [];

    for (let i = 0; i < ProductAttributes.length; i++) {
        const attrLabel = ProductAttributes[i].AttributeCode.label;
        const attrCode = ProductAttributes[i].AttributeCode.code;
        let attrValue = '';


        const isVariant = ProductAttributes[i].is_variant;

        if (isVariant === 0) {
            if (ProductAttributes[i].text_input === null) {
                attrSpec = {
                    attribute_code: attrCode,
                    attribute_code_label: attrLabel,
                    attribute_type: ProductAttributes[i].AttributeCode.type,
                    attribute_value_id: ProductAttributes[i].AttributeValue.id,
                    attribute_value_name: ProductAttributes[i].AttributeValue.value
                };
            } else {
                attrValue = ProductAttributes[i].text_input;
                attrSpec = {
                    attribute_code: attrCode,
                    attribute_code_label: attrLabel,
                    attribute_type: ProductAttributes[i].AttributeCode.type,
                    attribute_value: attrValue
                };
            }

            productSpec.push(attrSpec);
        }
    }

    const productAttribute = {
        spesifications: productSpec,
        variants: productVariant
    };

    return productAttribute;
};


exports.item = function (data) {
    const refenceLink = (String(data.reference_link) === '' || data.reference_link == null) ? [] : JSON.parse(data.reference_link);
    const isBulk = data.is_bulk === 1 ? 1 : 0;
    const isPrivateSku = (data.is_private_sku) ? data.is_private_sku : false;
    const PrivateCustomers = (data.private_customers && data.private_customers.length >= 1) ? data.private_customers : [];

    const result = {
        id: data.id,
        product_variant_id: data.ProductVariant.id,
        long_name: data.ProductVariant.long_name,
        variants: data.variants,
        variant_value: generateVariantValue(data.ProductVariant.variant_value),
        primary_image: data.ProductVariant.primary_image,
        currency: data.currency,
        tier_min_qty_1: data.tier_min_qty_1,
        tier_min_qty_2: data.tier_min_qty_2,
        tier_min_qty_3: data.tier_min_qty_3,
        tier_cogs_price_1: data.tier_cogs_price_1,
        tier_cogs_price_2: data.tier_cogs_price_2,
        tier_cogs_price_3: data.tier_cogs_price_3,
        is_active: data.is_active,
        sku: data.ProductVariant.sku,
        sku_vendor: data.sku_vendor,
        stock_available: data.stock_available,
        warranty_option: data.warranty_option,
        warranty_period: data.warranty_period,
        warranty_limit: data.warranty_limit,
        warranty_coverage: data.warranty_coverage,
        reference_link: refenceLink,
        indent_limit: data.indent_limit,
        indent_period: data.indent_period,
        is_indent: data.is_indent,
        is_decimal: data.is_decimal,
        is_bulk: isBulk,
        is_private_sku: isPrivateSku,
        down_payment_type: data.down_payment_type,
        down_payment_value: data.down_payment_value,
        private_customers: PrivateCustomers,
        created_at: data.created_at
    };
    return result;
};

exports.organizationList = function (data) {
    const dataId = Helper.UndefinedToNull(data.id);
    const dataPhone = Helper.UndefinedToNull(data.phone);
    const dataPicName = Helper.UndefinedToNull(data.pic_name);
    const dataPicMobile = Helper.UndefinedToNull(data.pic_mobile);
    const dataPicEmail = Helper.UndefinedToNull(data.pic_email);

    const dataPrefix = Helper.NullUndefinedToStrEmpty(data.prefix);
    const dataSuffix = Helper.NullUndefinedToStrEmpty(data.suffix);
    const dataName = Helper.NullUndefinedToStrEmpty(data.name);
    const dataPlace = Helper.NullUndefinedToStrEmpty(data.place);
    const dataStreet = Helper.NullUndefinedToStrEmpty(data.street);

    const result = {
        id: dataId,
        name: `${dataPrefix}. ${dataName} ${dataSuffix}`,
        address: `${dataPlace} ${dataStreet}`,
        phone: dataPhone,
        pic: dataPicName,
        mobile_phone: dataPicMobile,
        email: dataPicEmail
    };
    return result;
};


exports.productGroupList = function (data) {
    const categoryList = getCategory(data.Categories[0]);
    const productAttribute = getProductAttribute(data.ProductGroupAttributes);

    return {
        data: {
            id: data.id,
            name: data.name,
            uom: {
                id: data.Uom.id,
                name: data.Uom.name
            },
            barcode: data.barcode,
            manufacturing_number: data.manufacturing_number,
            primary_image: data.primary_image,
            stocking_uom: {
                id: data.StockingUom.id,
                name: data.StockingUom.name
            },
            quantity_stocking_uom: data.quantity_stocking_uom,
            variant_count: data.variant_count,
            variant_matrix: (String(data.variant_matrix) === '' || data.variant_matrix == null) ? [] : JSON.parse(data.variant_matrix),
            brand: {
                id: data.Brand.id,
                name: data.Brand.name
            },
            categories: categoryList,
            dimensions: {
                package_weight: data.package_weight,
                package_length: data.package_length,
                package_width: data.package_width,
                package_height: data.package_height
            },
            package_content: data.package_content,
            specifications: productAttribute.spesifications,
            description: data.description
        }
    };
};
