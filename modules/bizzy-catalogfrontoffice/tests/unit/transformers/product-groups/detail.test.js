'use strict';

const Promise = require('bluebird');
const test = require('ava');
const Transformer = require('../../../../src/transformers/product-groups/detail');


test.serial('test item: getProductAttribute: when (isVariant === 0) is false', (t) => {
    const data = {
        id: '',
        name: '',
        Uom: {
            name: ''
        },
        barcode: '',
        manufacturing_number: '',
        primary_image: '',
        StockingUom: {
            name: ''
        },
        quantity_stocking_uom: '',
        variant_count: '',
        variant_matrix: '[]',
        description: '',
        Brand: {
            name: ''
        },
        Categories: [{}],
        package_weight: '',
        package_length: '',
        package_width: '',
        package_height: '',
        package_content: '',
        ProductGroupAttributes: [
            {
                AttributeCode: {
                    label: '',
                    code: '',
                    AttributeValues: [{
                        id: '',
                        value: ''
                    }]
                },
                AttributeValue: {
                    value: ''
                },
                is_variant: 1,
                text_input: ''
            }
        ],
        variant_images: ''
    };

    const expected = {
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
        categories: {
            C0: { id: undefined, name: undefined, unspsc: undefined },
            C1: { id: undefined, name: undefined, unspsc: undefined },
            C2: { id: undefined, name: undefined, unspsc: undefined },
            C3: { id: undefined, name: undefined, unspsc: undefined }
        },
        dimensions: {
            package_weight: data.package_weight,
            package_length: data.package_length,
            package_width: data.package_width,
            package_height: data.package_height
        },
        package_content: data.package_content,
        spesifications: [],
        variants: [{
            id: undefined,
            code: '',
            label: '',
            type: undefined,
            values: [{
                id: '',
                value: ''
            }]
        }],
        variant_images: data.variant_images
    };

    const transformer = new Transformer.item(data);
    t.deepEqual(transformer, expected);
});

test.serial('test item: getProductAttribute: when (isVariant === 0) is true', (t) => {
    const data = {
        id: '',
        name: '',
        Uom: {
            name: ''
        },
        barcode: '',
        manufacturing_number: '',
        primary_image: '',
        StockingUom: {
            name: ''
        },
        quantity_stocking_uom: '',
        variant_count: '',
        variant_matrix: '',
        description: '',
        Brand: {
            name: ''
        },
        Categories: [{}],
        package_weight: '',
        package_length: '',
        package_width: '',
        package_height: '',
        package_content: '',
        ProductGroupAttributes: [
            {
                AttributeCode: {
                    label: '',
                    code: '',
                    AttributeValues: [{
                        id: '',
                        value: ''
                    }]
                },
                AttributeValue: {
                    value: ''
                },
                is_variant: 0,
                text_input: ''
            }
        ],
        variant_images: ''
    };

    const expected = {
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
        categories: {
            C0: { id: undefined, name: undefined, unspsc: undefined },
            C1: { id: undefined, name: undefined, unspsc: undefined },
            C2: { id: undefined, name: undefined, unspsc: undefined },
            C3: { id: undefined, name: undefined, unspsc: undefined }
        },
        dimensions: {
            package_weight: data.package_weight,
            package_length: data.package_length,
            package_width: data.package_width,
            package_height: data.package_height
        },
        package_content: data.package_content,
        spesifications: [
            {
                code: '',
                label: '',
                value: ''
            }
        ],
        variants: [],
        variant_images: data.variant_images
    };

    const transformer = new Transformer.item(data);
    t.deepEqual(transformer, expected);
});

test.serial('test item: getProductAttribute: when (isVariant === 0) and (text_input === null) is true', (t) => {
    const data = {
        id: '',
        name: '',
        Uom: {
            name: ''
        },
        barcode: '',
        manufacturing_number: '',
        primary_image: '',
        StockingUom: {
            name: ''
        },
        quantity_stocking_uom: '',
        variant_count: '',
        variant_matrix: '',
        description: '',
        Brand: {
            name: ''
        },
        Categories: [{}],
        package_weight: '',
        package_length: '',
        package_width: '',
        package_height: '',
        package_content: '',
        ProductGroupAttributes: [
            {
                AttributeCode: {
                    label: '',
                    code: '',
                    AttributeValues: [{
                        id: '',
                        value: ''
                    }]
                },
                AttributeValue: {
                    value: ''
                },
                is_variant: 0,
                text_input: null
            }
        ],
        variant_images: ''
    };

    const expected = {
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
        categories: {
            C0: { id: undefined, name: undefined, unspsc: undefined },
            C1: { id: undefined, name: undefined, unspsc: undefined },
            C2: { id: undefined, name: undefined, unspsc: undefined },
            C3: { id: undefined, name: undefined, unspsc: undefined }
        },
        dimensions: {
            package_weight: data.package_weight,
            package_length: data.package_length,
            package_width: data.package_width,
            package_height: data.package_height
        },
        package_content: data.package_content,
        spesifications: [
            {
                code: '',
                label: '',
                value: ''
            }
        ],
        variants: [],
        variant_images: data.variant_images
    };

    const transformer = new Transformer.item(data);
    t.deepEqual(transformer, expected);
});


test.serial('test generateVariantImages when (variantValue !== NO_VARIANT) is false', (t) => {
    const data = [
        {
            variant_value: '',
            primary_image: '',
            additional_image: ''
        }
    ];

    const expected = { '': { primary_image: '', additional_image: [] } };

    const transformer = new Transformer.generateVariantImages(data);
    t.deepEqual(transformer, expected);
});


test.serial('test generateVariantImages when (variantValue !== NO_VARIANT) is true', (t) => {
    const data = [
        {
            variant_value: 'NO_VARIANT',
            primary_image: '',
            additional_image: ''
        }
    ];

    const expected = { NO_VARIANT: { primary_image: '', additional_image: [] } };

    const transformer = new Transformer.generateVariantImages(data);
    t.deepEqual(transformer, expected);
});

