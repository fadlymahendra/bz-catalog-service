'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const test = require('ava');
const sinon = require('sinon');
const Repo = require('../../../../src/repositories/product_group');
const ProductVariantRepository = require('../../../../src/repositories/product_variant');
const RepoCategory = require('../../../../src/repositories/category');
const Method = require('../../../../src/methods/product-groups/detail');

test.serial('Should be return Product Group Detail object', function* (t) {
    t.context.sandbox.stub(RepoCategory, 'getCategoryBreakdown').resolves([
        {
            category0_id: 1,
            category0_name: 'Electronics',
            category0_unspsc: 1100000,
            category1_id: 2,
            category1_name: 'Komputer',
            category1_unspsc: 1100001,
            category2_id: 3,
            category2_name: 'TV',
            category2_unspsc: 1100002,
            category3_id: 4,
            category3_name: 'Monitor Komputer',
            category3_unspsc: 1100003
        }
    ]);

    t.context.sandbox.stub(Repo, 'findByIdWithDetail').resolves({
        id: 1,
        name: 'LG LED TV 32 inch',
        category_id: 4,
        brand_id: 1,
        uom_id: 1,
        stocking_uom_id: 1,
        quantity_stocking_uom: 1,
        manufacturing_number: 'X',
        manufacturing_number_type: null,
        package_weight: 0,
        package_length: '0.00',
        package_width: '0.00',
        package_height: '0.00',
        package_content: null,
        barcode: null,
        description: 'lorem ipsum dolorosum',
        primary_image: 'https://www.vodafone.co.uk/cs/groups/public/documents/webcontent/vfcon084827.jpg',
        variant_count: 2,
        variant_matrix: '',
        status: 1,
        visibility: 1,
        created_by: 1,
        created_at: '2017-12-07T00:00:00.000Z',
        updated_at: null,
        Brand: {
            id: 1,
            name: '2 Tang',
            image_url: null,
            created_at: '2017-11-28T14:54:10.000Z',
            updated_at: '2017-11-28T14:54:10.000Z'
        },
        Uom: {
            id: 1,
            name: 'Unit',
            created_at: '2017-12-05T16:59:10.000Z',
            updated_at: '2017-12-05T16:59:10.000Z'
        },
        StockingUom: {
            id: 1,
            name: 'Box',
            created_at: '2017-12-05T16:55:00.000Z',
            updated_at: '2017-12-05T16:55:00.000Z'
        },
        ProductGroupAttributes: [
            {
                id: 1,
                product_group_id: 1,
                attribute_code_id: 1,
                attribute_value_id: 1,
                text_input: null,
                is_variant: 1,
                created_at: '2017-12-07T00:00:00.000Z',
                updated_at: null,
                AttributeCode: {
                    id: 1,
                    code: 'tv_color',
                    label: 'Color',
                    type: 'dropdown',
                    created_at: '2017-11-28T15:18:27.000Z',
                    updated_at: null,
                    AttributeValues: [
                        {
                            id: 1,
                            attribute_code_id: 1,
                            value: 'Hitam',
                            image_url: null,
                            created_at: '2017-11-28T00:00:00.000Z',
                            updated_at: null
                        }
                    ]
                },
                AttributeValue: {
                    id: 1,
                    attribute_code_id: 1,
                    value: 'Hitam',
                    image_url: null,
                    created_at: '2017-11-28T00:00:00.000Z',
                    updated_at: null
                }
            },
            {
                id: 3,
                product_group_id: 1,
                attribute_code_id: 3,
                attribute_value_id: null,
                text_input: '1024x768',
                is_variant: 0,
                created_at: '2017-12-07T00:00:00.000Z',
                updated_at: null,
                AttributeCode: {
                    id: 3,
                    code: 'tv_screen_resolution',
                    label: 'Screen Resolution',
                    type: 'textinput',
                    created_at: '2017-11-28T16:21:25.000Z',
                    updated_at: null,
                    AttributeValues: []
                },
                AttributeValue: null
            }
        ],
        Categories: [
            {
                category0_id: 1,
                category0_name: 'Electronics',
                category0_unspsc: 1100000,
                category1_id: 2,
                category1_name: 'Komputer',
                category1_unspsc: 1100001,
                category2_id: 3,
                category2_name: 'TV',
                category2_unspsc: 1100002,
                category3_id: 4,
                category3_name: 'Monitor Komputer',
                category3_unspsc: 1100003
            }
        ]
    });

    t.context.sandbox.stub(ProductVariantRepository, 'findAllProduct').resolves([
        {
            id: 8,
            product_group_id: 2,
            sku: 'DC8JLF43ND',
            long_name: 'Apple iPhone 7 - Gold - 128GB',
            variant_value: '{"phone_color":2,"phone_storage":11}',
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 0,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-16T02:59:03.000Z',
            updated_at: '2018-01-16T02:59:03.000Z'
        }
    ]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1'
            }
        };

        const result = yield Method.getProductGroupById(data, context);
        const expected = {
            data: {
                id: 1,
                name: 'LG LED TV 32 inch',
                uom: 'Unit',
                barcode: null,
                manufacturing_number: 'X',
                primary_image: 'https://www.vodafone.co.uk/cs/groups/public/documents/webcontent/vfcon084827.jpg',
                stocking_uom: 'Box',
                quantity_stocking_uom: 1,
                variant_count: 2,
                variant_matrix: [],
                // "unspsc": "",
                description: 'lorem ipsum dolorosum',
                brand: '2 Tang',
                categories: {
                    C0: {
                        id: 1,
                        name: 'Electronics',
                        unspsc: 1100000
                    },
                    C1: {
                        id: 2,
                        name: 'Komputer',
                        unspsc: 1100001
                    },
                    C2: {
                        id: 3,
                        name: 'TV',
                        unspsc: 1100002
                    },
                    C3: {
                        id: 4,
                        name: 'Monitor Komputer',
                        unspsc: 1100003
                    }
                },
                dimensions: {
                    package_weight: 0,
                    package_length: '0.00',
                    package_width: '0.00',
                    package_height: '0.00'
                },
                package_content: null,
                spesifications: [
                    {
                        code: 'tv_screen_resolution',
                        label: 'Screen Resolution',
                        value: '1024x768'
                    }
                ],
                variants: [
                    {
                        id: 1,
                        code: 'tv_color',
                        label: 'Color',
                        type: 'dropdown',
                        values: [
                            {
                                id: 1,
                                value: 'Hitam'
                            }
                        ]
                    }
                ],
                variant_images: {
                    'phone_color=2|phone_storage=11': {
                        primary_image: 'http://localhost/testing/testing_image.jpg',
                        additional_image: []
                    }
                }
            }
        };

        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err);
    }
});

test.serial('Should be return Product Group Detail object NO VARIANT', function* (t) {
    t.context.sandbox.stub(RepoCategory, 'getCategoryBreakdown').resolves([
        {
            category0_id: 1,
            category0_name: 'Electronics',
            category0_unspsc: 1100000,
            category1_id: 2,
            category1_name: 'Komputer',
            category1_unspsc: 1100001,
            category2_id: 3,
            category2_name: 'TV',
            category2_unspsc: 1100002,
            category3_id: 4,
            category3_name: 'Monitor Komputer',
            category3_unspsc: 1100003
        }
    ]);

    t.context.sandbox.stub(Repo, 'findByIdWithDetail').resolves({
        id: 1,
        name: 'LG LED TV 32 inch',
        category_id: 4,
        brand_id: 1,
        uom_id: 1,
        stocking_uom_id: 1,
        quantity_stocking_uom: 1,
        manufacturing_number: 'X',
        manufacturing_number_type: null,
        package_weight: 0,
        package_length: '0.00',
        package_width: '0.00',
        package_height: '0.00',
        package_content: null,
        barcode: null,
        description: 'lorem ipsum dolorosum',
        primary_image: 'https://www.vodafone.co.uk/cs/groups/public/documents/webcontent/vfcon084827.jpg',
        variant_count: 2,
        variant_matrix: '',
        status: 1,
        visibility: 1,
        created_by: 1,
        created_at: '2017-12-07T00:00:00.000Z',
        updated_at: null,
        Brand: {
            id: 1,
            name: '2 Tang',
            image_url: null,
            created_at: '2017-11-28T14:54:10.000Z',
            updated_at: '2017-11-28T14:54:10.000Z'
        },
        Uom: {
            id: 1,
            name: 'Unit',
            created_at: '2017-12-05T16:59:10.000Z',
            updated_at: '2017-12-05T16:59:10.000Z'
        },
        StockingUom: {
            id: 1,
            name: 'Box',
            created_at: '2017-12-05T16:55:00.000Z',
            updated_at: '2017-12-05T16:55:00.000Z'
        },
        ProductGroupAttributes: [
            {
                id: 1,
                product_group_id: 1,
                attribute_code_id: 1,
                attribute_value_id: 1,
                text_input: null,
                is_variant: 1,
                created_at: '2017-12-07T00:00:00.000Z',
                updated_at: null,
                AttributeCode: {
                    id: 1,
                    code: 'tv_color',
                    label: 'Color',
                    type: 'dropdown',
                    created_at: '2017-11-28T15:18:27.000Z',
                    updated_at: null,
                    AttributeValues: [
                        {
                            id: 1,
                            attribute_code_id: 1,
                            value: 'Hitam',
                            image_url: null,
                            created_at: '2017-11-28T00:00:00.000Z',
                            updated_at: null
                        }
                    ]
                },
                AttributeValue: {
                    id: 1,
                    attribute_code_id: 1,
                    value: 'Hitam',
                    image_url: null,
                    created_at: '2017-11-28T00:00:00.000Z',
                    updated_at: null
                }
            },
            {
                id: 3,
                product_group_id: 1,
                attribute_code_id: 3,
                attribute_value_id: null,
                text_input: '1024x768',
                is_variant: 0,
                created_at: '2017-12-07T00:00:00.000Z',
                updated_at: null,
                AttributeCode: {
                    id: 3,
                    code: 'tv_screen_resolution',
                    label: 'Screen Resolution',
                    type: 'textinput',
                    created_at: '2017-11-28T16:21:25.000Z',
                    updated_at: null,
                    AttributeValues: []
                },
                AttributeValue: null
            }
        ],
        Categories: [
            {
                category0_id: 1,
                category0_name: 'Electronics',
                category0_unspsc: 1100000,
                category1_id: 2,
                category1_name: 'Komputer',
                category1_unspsc: 1100001,
                category2_id: 3,
                category2_name: 'TV',
                category2_unspsc: 1100002,
                category3_id: 4,
                category3_name: 'Monitor Komputer',
                category3_unspsc: 1100003
            }
        ]
    });

    t.context.sandbox.stub(ProductVariantRepository, 'findAllProduct').resolves([
        {
            id: 8,
            product_group_id: 2,
            sku: 'DC8JLF43ND',
            long_name: 'Apple iPhone 7 - Gold - 128GB',
            variant_value: 'NO_VARIANT',
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 0,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-16T02:59:03.000Z',
            updated_at: '2018-01-16T02:59:03.000Z'
        }
    ]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1'
            }
        };

        const result = yield Method.getProductGroupById(data, context);
        const expected = {
            data: {
                id: 1,
                name: 'LG LED TV 32 inch',
                uom: 'Unit',
                barcode: null,
                manufacturing_number: 'X',
                primary_image: 'https://www.vodafone.co.uk/cs/groups/public/documents/webcontent/vfcon084827.jpg',
                stocking_uom: 'Box',
                quantity_stocking_uom: 1,
                variant_count: 2,
                variant_matrix: [],
                // "unspsc": "",
                description: 'lorem ipsum dolorosum',
                brand: '2 Tang',
                categories: {
                    C0: {
                        id: 1,
                        name: 'Electronics',
                        unspsc: 1100000
                    },
                    C1: {
                        id: 2,
                        name: 'Komputer',
                        unspsc: 1100001
                    },
                    C2: {
                        id: 3,
                        name: 'TV',
                        unspsc: 1100002
                    },
                    C3: {
                        id: 4,
                        name: 'Monitor Komputer',
                        unspsc: 1100003
                    }
                },
                dimensions: {
                    package_weight: 0,
                    package_length: '0.00',
                    package_width: '0.00',
                    package_height: '0.00'
                },
                package_content: null,
                spesifications: [
                    {
                        code: 'tv_screen_resolution',
                        label: 'Screen Resolution',
                        value: '1024x768'
                    }
                ],
                variants: [
                    {
                        id: 1,
                        code: 'tv_color',
                        label: 'Color',
                        type: 'dropdown',
                        values: [
                            {
                                id: 1,
                                value: 'Hitam'
                            }
                        ]
                    }
                ],
                variant_images: {
                    NO_VARIANT: {
                        primary_image: 'http://localhost/testing/testing_image.jpg',
                        additional_image: []
                    }
                }
            }
        };

        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err);
    }
});

test.serial('Should be return Product Group Detail object with textinput variant', function* (t) {
    t.context.sandbox.stub(RepoCategory, 'getCategoryBreakdown').resolves([
        {
            category0_id: 1,
            category0_name: 'Electronics',
            category0_unspsc: 1100000,
            category1_id: 2,
            category1_name: 'Komputer',
            category1_unspsc: 1100001,
            category2_id: 3,
            category2_name: 'TV',
            category2_unspsc: 1100002,
            category3_id: 4,
            category3_name: 'Monitor Komputer',
            category3_unspsc: 1100003
        }
    ]);

    t.context.sandbox.stub(Repo, 'findByIdWithDetail').resolves({
        id: 1,
        name: 'LG LED TV 32 inch',
        category_id: 4,
        brand_id: 1,
        uom_id: 1,
        stocking_uom_id: 1,
        quantity_stocking_uom: 1,
        manufacturing_number: 'X',
        manufacturing_number_type: null,
        package_weight: 0,
        package_length: '0.00',
        package_width: '0.00',
        package_height: '0.00',
        package_content: null,
        barcode: null,
        description: 'lorem ipsum dolorosum',
        primary_image: 'https://www.vodafone.co.uk/cs/groups/public/documents/webcontent/vfcon084827.jpg',
        variant_count: 2,
        variant_matrix: '["tv_color","tv_size"]',
        status: 1,
        visibility: 1,
        created_by: 1,
        created_at: '2017-12-07T00:00:00.000Z',
        updated_at: null,
        Brand: {
            id: 1,
            name: '2 Tang',
            image_url: null,
            created_at: '2017-11-28T14:54:10.000Z',
            updated_at: '2017-11-28T14:54:10.000Z'
        },
        Uom: {
            id: 1,
            name: 'Unit',
            created_at: '2017-12-05T16:59:10.000Z',
            updated_at: '2017-12-05T16:59:10.000Z'
        },
        StockingUom: {
            id: 1,
            name: 'Box',
            created_at: '2017-12-05T16:55:00.000Z',
            updated_at: '2017-12-05T16:55:00.000Z'
        },
        ProductGroupAttributes: [
            {
                id: 1,
                product_group_id: 1,
                attribute_code_id: 1,
                attribute_value_id: 1,
                text_input: null,
                is_variant: 1,
                created_at: '2017-12-07T00:00:00.000Z',
                updated_at: null,
                AttributeCode: {
                    id: 1,
                    code: 'tv_color',
                    label: 'Color',
                    type: 'dropdown',
                    created_at: '2017-11-28T15:18:27.000Z',
                    updated_at: null,
                    AttributeValues: [
                        {
                            id: 1,
                            attribute_code_id: 1,
                            value: 'Hitam',
                            image_url: null,
                            created_at: '2017-11-28T00:00:00.000Z',
                            updated_at: null
                        }
                    ]
                },
                AttributeValue: {
                    id: 1,
                    attribute_code_id: 1,
                    value: 'Hitam',
                    image_url: null,
                    created_at: '2017-11-28T00:00:00.000Z',
                    updated_at: null
                }
            },
            {
                id: 3,
                product_group_id: 1,
                attribute_code_id: 3,
                attribute_value_id: null,
                text_input: '1024x768',
                is_variant: 1,
                created_at: '2017-12-07T00:00:00.000Z',
                updated_at: null,
                AttributeCode: {
                    id: 3,
                    code: 'tv_screen_resolution',
                    label: 'Screen Resolution',
                    type: 'textinput',
                    created_at: '2017-11-28T16:21:25.000Z',
                    updated_at: null,
                    AttributeValues: []
                },
                AttributeValue: null
            }
        ],
        Categories: [
            {
                category0_id: 1,
                category0_name: 'Electronics',
                category0_unspsc: 1100000,
                category1_id: 2,
                category1_name: 'Komputer',
                category1_unspsc: 1100001,
                category2_id: 3,
                category2_name: 'TV',
                category2_unspsc: 1100002,
                category3_id: 4,
                category3_name: 'Monitor Komputer',
                category3_unspsc: 1100003
            }
        ]
    });

    t.context.sandbox.stub(ProductVariantRepository, 'findAllProduct').resolves([
        {
            id: 8,
            product_group_id: 2,
            sku: 'DC8JLF43ND',
            long_name: 'Apple iPhone 7 - Gold - 128GB',
            variant_value: '{"phone_color":2,"phone_storage":11}',
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 0,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-16T02:59:03.000Z',
            updated_at: '2018-01-16T02:59:03.000Z'
        }
    ]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1'
            }
        };

        const result = yield Method.getProductGroupById(data, context);
        const expected = {
            data: {
                id: 1,
                name: 'LG LED TV 32 inch',
                uom: 'Unit',
                barcode: null,
                manufacturing_number: 'X',
                primary_image: 'https://www.vodafone.co.uk/cs/groups/public/documents/webcontent/vfcon084827.jpg',
                stocking_uom: 'Box',
                quantity_stocking_uom: 1,
                variant_count: 2,
                variant_matrix: ['tv_color', 'tv_size'],
                // "unspsc": "",
                description: 'lorem ipsum dolorosum',
                brand: '2 Tang',
                categories: {
                    C0: {
                        id: 1,
                        name: 'Electronics',
                        unspsc: 1100000
                    },
                    C1: {
                        id: 2,
                        name: 'Komputer',
                        unspsc: 1100001
                    },
                    C2: {
                        id: 3,
                        name: 'TV',
                        unspsc: 1100002
                    },
                    C3: {
                        id: 4,
                        name: 'Monitor Komputer',
                        unspsc: 1100003
                    }
                },
                dimensions: {
                    package_weight: 0,
                    package_length: '0.00',
                    package_width: '0.00',
                    package_height: '0.00'
                },
                package_content: null,
                spesifications: [
                ],
                variants: [
                    {
                        id: 1,
                        code: 'tv_color',
                        label: 'Color',
                        type: 'dropdown',
                        values: [
                            {
                                id: 1,
                                value: 'Hitam'
                            }
                        ]
                    },
                    {
                        id: 3,
                        code: 'tv_screen_resolution',
                        label: 'Screen Resolution',
                        type: 'textinput',
                        values: []
                    }
                ],
                variant_images: {
                    'phone_color=2|phone_storage=11': {
                        primary_image: 'http://localhost/testing/testing_image.jpg',
                        additional_image: [
                            'http://localhost/testing/testing_image.jpg',
                            'http://localhost/testing/testing_image.jpg'
                        ]
                    }
                }
            }
        };

        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err);
    }
});

test.serial('Should be return Product Group Detail object with textinput specification', function* (t) {
    t.context.sandbox.stub(RepoCategory, 'getCategoryBreakdown').resolves([
        {
            category0_id: 1,
            category0_name: 'Electronics',
            category0_unspsc: 1100000,
            category1_id: 2,
            category1_name: 'Komputer',
            category1_unspsc: 1100001,
            category2_id: 3,
            category2_name: 'TV',
            category2_unspsc: 1100002,
            category3_id: 4,
            category3_name: 'Monitor Komputer',
            category3_unspsc: 1100003
        }
    ]);

    t.context.sandbox.stub(Repo, 'findByIdWithDetail').resolves({
        id: 1,
        name: 'LG LED TV 32 inch',
        category_id: 4,
        brand_id: 1,
        uom_id: 1,
        stocking_uom_id: 1,
        quantity_stocking_uom: 1,
        manufacturing_number: 'X',
        manufacturing_number_type: null,
        package_weight: 0,
        package_length: '0.00',
        package_width: '0.00',
        package_height: '0.00',
        package_content: null,
        barcode: null,
        description: 'lorem ipsum dolorosum',
        primary_image: 'https://www.vodafone.co.uk/cs/groups/public/documents/webcontent/vfcon084827.jpg',
        variant_count: 2,
        variant_matrix: '["tv_color","tv_size"]',
        status: 1,
        visibility: 1,
        created_by: 1,
        created_at: '2017-12-07T00:00:00.000Z',
        updated_at: null,
        Brand: {
            id: 1,
            name: '2 Tang',
            image_url: null,
            created_at: '2017-11-28T14:54:10.000Z',
            updated_at: '2017-11-28T14:54:10.000Z'
        },
        Uom: {
            id: 1,
            name: 'Unit',
            created_at: '2017-12-05T16:59:10.000Z',
            updated_at: '2017-12-05T16:59:10.000Z'
        },
        StockingUom: {
            id: 1,
            name: 'Box',
            created_at: '2017-12-05T16:55:00.000Z',
            updated_at: '2017-12-05T16:55:00.000Z'
        },
        ProductGroupAttributes: [
            {
                id: 1,
                product_group_id: 1,
                attribute_code_id: 1,
                attribute_value_id: 1,
                text_input: null,
                is_variant: 0,
                created_at: '2017-12-07T00:00:00.000Z',
                updated_at: null,
                AttributeCode: {
                    id: 1,
                    code: 'tv_color',
                    label: 'Color',
                    type: 'dropdown',
                    created_at: '2017-11-28T15:18:27.000Z',
                    updated_at: null,
                    AttributeValues: [
                        {
                            id: 1,
                            attribute_code_id: 1,
                            value: 'Hitam',
                            image_url: null,
                            created_at: '2017-11-28T00:00:00.000Z',
                            updated_at: null
                        }
                    ]
                },
                AttributeValue: {
                    id: 1,
                    attribute_code_id: 1,
                    value: 'Hitam',
                    image_url: null,
                    created_at: '2017-11-28T00:00:00.000Z',
                    updated_at: null
                }
            },
            {
                id: 3,
                product_group_id: 1,
                attribute_code_id: 3,
                attribute_value_id: null,
                text_input: '1024x768',
                is_variant: 1,
                created_at: '2017-12-07T00:00:00.000Z',
                updated_at: null,
                AttributeCode: {
                    id: 3,
                    code: 'tv_screen_resolution',
                    label: 'Screen Resolution',
                    type: 'textinput',
                    created_at: '2017-11-28T16:21:25.000Z',
                    updated_at: null,
                    AttributeValues: []
                },
                AttributeValue: null
            }
        ],
        Categories: [
            {
                category0_id: 1,
                category0_name: 'Electronics',
                category0_unspsc: 1100000,
                category1_id: 2,
                category1_name: 'Komputer',
                category1_unspsc: 1100001,
                category2_id: 3,
                category2_name: 'TV',
                category2_unspsc: 1100002,
                category3_id: 4,
                category3_name: 'Monitor Komputer',
                category3_unspsc: 1100003
            }
        ]
    });

    t.context.sandbox.stub(ProductVariantRepository, 'findAllProduct').resolves([
        {
            id: 8,
            product_group_id: 2,
            sku: 'DC8JLF43ND',
            long_name: 'Apple iPhone 7 - Gold - 128GB',
            variant_value: '{"phone_color":2,"phone_storage":11}',
            primary_image: 'http://localhost/testing/testing_image.jpg',
            additional_image: '["http://localhost/testing/testing_image.jpg","http://localhost/testing/testing_image.jpg"]',
            product_id_magento: null,
            product_id_netsuite: null,
            is_primary: 0,
            is_discontinue: 0,
            is_active: 1,
            created_at: '2018-01-16T02:59:03.000Z',
            updated_at: '2018-01-16T02:59:03.000Z'
        }
    ]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1'
            }
        };

        const result = yield Method.getProductGroupById(data, context);
        const expected = {
            data: {
                id: 1,
                name: 'LG LED TV 32 inch',
                uom: 'Unit',
                barcode: null,
                manufacturing_number: 'X',
                primary_image: 'https://www.vodafone.co.uk/cs/groups/public/documents/webcontent/vfcon084827.jpg',
                stocking_uom: 'Box',
                quantity_stocking_uom: 1,
                variant_count: 2,
                variant_matrix: ['tv_color', 'tv_size'],
                // "unspsc": "",
                description: 'lorem ipsum dolorosum',
                brand: '2 Tang',
                categories: {
                    C0: {
                        id: 1,
                        name: 'Electronics',
                        unspsc: 1100000
                    },
                    C1: {
                        id: 2,
                        name: 'Komputer',
                        unspsc: 1100001
                    },
                    C2: {
                        id: 3,
                        name: 'TV',
                        unspsc: 1100002
                    },
                    C3: {
                        id: 4,
                        name: 'Monitor Komputer',
                        unspsc: 1100003
                    }
                },
                dimensions: {
                    package_weight: 0,
                    package_length: '0.00',
                    package_width: '0.00',
                    package_height: '0.00'
                },
                package_content: null,
                spesifications: [
                    {
                        code: 'tv_color',
                        label: 'Color',
                        value: 'Hitam'
                    }
                ],
                variants: [
                    {
                        id: 3,
                        code: 'tv_screen_resolution',
                        label: 'Screen Resolution',
                        type: 'textinput',
                        values: []
                    }
                ],
                variant_images: {
                    'phone_color=2|phone_storage=11': {
                        primary_image: 'http://localhost/testing/testing_image.jpg',
                        additional_image: [
                            'http://localhost/testing/testing_image.jpg',
                            'http://localhost/testing/testing_image.jpg'
                        ]
                    }
                }
            }
        };

        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err);
    }
});

test.serial('Should be return authorized user', function* (t) {
    try {
        const context = {
            user: ''
        };
        const data = {
            path: {
                id: ''
            }
        };

        yield Method.getProductGroupById(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, 'You are not authorized user');
    }
});

test.serial('Invalid Params Should Throw BizzyError BadRequest', function* (t) {
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: ''
            }
        };

        yield Method.getProductGroupById(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'The Error Type is Incorrect');
    }
});

test.serial('Invalid Params Should Throw BizzyError Not Found', function* (t) {
    t.context.sandbox.stub(Repo, 'findByIdWithDetail').resolves(false);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1000'
            }
        };

        yield Method.getProductGroupById(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'Product Group Not Found');
    }
});

test.serial('Invalid Breakdown Category with undefined Category Id', function* (t) {
    t.context.sandbox.stub(Repo, 'findByIdWithDetail').resolves({
        id: 1,
        name: 'LG LED TV 32 inch',
        brand_id: 1,
        uom_id: 1,
        stocking_uom_id: 1,
        quantity_stocking_uom: 1,
        manufacturing_number: 'X',
        manufacturing_number_type: null,
        package_weight: 0,
        package_length: '0.00',
        package_width: '0.00',
        package_height: '0.00',
        package_content: null,
        barcode: null,
        description: 'lorem ipsum dolorosum',
        primary_image: 'https://www.vodafone.co.uk/cs/groups/public/documents/webcontent/vfcon084827.jpg',
        variant_count: 2,
        variant_matrix: '["tv_color","tv_size"]',
        status: 1,
        visibility: 1,
        created_by: 1,
        created_at: '2017-12-07T00:00:00.000Z',
        updated_at: null,
        Brand: {
            id: 1,
            name: '2 Tang',
            image_url: null,
            created_at: '2017-11-28T14:54:10.000Z',
            updated_at: '2017-11-28T14:54:10.000Z'
        },
        Uom: {
            id: 1,
            name: 'Unit',
            created_at: '2017-12-05T16:59:10.000Z',
            updated_at: '2017-12-05T16:59:10.000Z'
        },
        StockingUom: {
            id: 1,
            name: 'Box',
            created_at: '2017-12-05T16:55:00.000Z',
            updated_at: '2017-12-05T16:55:00.000Z'
        },
        ProductGroupAttributes: [
            {
                id: 1,
                product_group_id: 1,
                attribute_code_id: 1,
                attribute_value_id: 1,
                text_input: null,
                is_variant: 1,
                created_at: '2017-12-07T00:00:00.000Z',
                updated_at: null,
                AttributeCode: {
                    id: 1,
                    code: 'tv_color',
                    label: 'Color',
                    type: 'dropdown',
                    created_at: '2017-11-28T15:18:27.000Z',
                    updated_at: null,
                    AttributeValues: [
                        {
                            id: 1,
                            attribute_code_id: 1,
                            value: 'Hitam',
                            image_url: null,
                            created_at: '2017-11-28T00:00:00.000Z',
                            updated_at: null
                        }
                    ]
                },
                AttributeValue: {
                    id: 1,
                    attribute_code_id: 1,
                    value: 'Hitam',
                    image_url: null,
                    created_at: '2017-11-28T00:00:00.000Z',
                    updated_at: null
                }
            },
            {
                id: 3,
                product_group_id: 1,
                attribute_code_id: 3,
                attribute_value_id: null,
                text_input: '1024x768',
                is_variant: 0,
                created_at: '2017-12-07T00:00:00.000Z',
                updated_at: null,
                AttributeCode: {
                    id: 3,
                    code: 'tv_screen_resolution',
                    label: 'Screen Resolution',
                    type: 'textinput',
                    created_at: '2017-11-28T16:21:25.000Z',
                    updated_at: null,
                    AttributeValues: []
                },
                AttributeValue: null
            },
            {
                id: 3,
                product_group_id: 1,
                attribute_code_id: 3,
                attribute_value_id: null,
                text_input: '1024x768',
                is_variant: 0,
                created_at: '2017-12-07T00:00:00.000Z',
                updated_at: null,
                AttributeCode: {
                    id: 3,
                    code: 'tv_screen_resolution',
                    label: 'Screen Resolution',
                    type: 'textinput',
                    created_at: '2017-11-28T16:21:25.000Z',
                    updated_at: null,
                    AttributeValues: []
                },
                AttributeValue: null
            }
        ],
        Categories: [
            {
                category0_id: 1,
                category0_name: 'Electronics',
                category0_unspsc: 1100000,
                category1_id: 2,
                category1_name: 'Komputer',
                category1_unspsc: 1100001,
                category2_id: 3,
                category2_name: 'TV',
                category2_unspsc: 1100002,
                category3_id: 4,
                category3_name: 'Monitor Komputer',
                category3_unspsc: 1100003
            }
        ]
    });

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '1000'
            }
        };

        yield Method.getProductGroupById(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, 'Category Id Undefined');
    }
});

test.before('Initialize BizzyError Before All Tests', (t) => {
    BizzyError.initializeErrors();
});

test.beforeEach('Initialize New Sandbox Before Each Test', function* (t) {
    t.context.sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
});

test.afterEach.always('Restore Sandbox and Configuration After Each Test', function* (t) {
    t.context.sandbox.restore();
});
