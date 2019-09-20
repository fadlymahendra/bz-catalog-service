'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { DBContext, BizzyError } = require('bizzy-common');
const PremoderationRepository = require('../../../../src/repositories/premoderation');
const CategoryRepository = require('../../../../src/repositories/category');
const BrandRepository = require('../../../../src/repositories/brand');
const Methods = require('../../../../src/methods/premoderations/list');

const sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);

const resIdsBrand = [];
const resIdsCategory = [];

test.serial('Should be return list premoderation vendor', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(PremoderationRepository, 'findAll').resolves([
        {
            _id: '5a4ddb608e16351613dfed29',
            id: '1514450425977',
            type: 'existing',
            product_group_id: 2,
            payload: {
                name: 'Apple iPhone 7',
                category_id: 561,
                category: {
                    c0: 8,
                    c1: 52,
                    c2: 219,
                    c3: 561
                },
                brand_id: 81,
                uom_id: 1,
                stocking_uom_id: 1,
                quantity_stocking_uom: 1,
                manufacturing_number: 'MPN7PK1781',
                package_weight: '800',
                package_length: '100',
                package_height: '300',
                package_width: '200',
                package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
                barcode: '5012345678900',
                description: 'Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.Di iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.',
                variant_count: 2,
                variant_matrix: [
                    'phone_color',
                    'phone_storage'
                ],
                specifications: [
                    {
                        attribute_id: 3,
                        attribute_code: 'phone_os',
                        attribute_code_label: 'Sistem Operasi',
                        attribute_type: 'dropdown',
                        attribute_value_id: 5,
                        attribute_value_label: 'iOS',
                        attribute_status: 'clear'
                    },
                    {
                        attribute_id: 4,
                        attribute_code: 'phone_display',
                        attribute_code_label: 'Layar',
                        attribute_type: 'textinput',
                        attribute_textinput: 'Super AMOLED capacitive touchscreen, 16M colors',
                        attribute_status: 'clear'
                    }
                ],
                products: [
                    {
                        index: 'j2394p',
                        variants: [
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Pink',
                                attribute_value_id: 0,
                                attribute_status: 'new'
                            },
                            {
                                attribute_id: 2,
                                attribute_code: 'phone_storage',
                                attribute_code_label: 'Kapasitas',
                                attribute_value_name: '32GB',
                                attribute_value_id: 3,
                                attribute_status: 'clear'
                            }
                        ],
                        variant_value: {
                            phone_color: '1',
                            phone_storage: '3'
                        },
                        sku_vendor: 'X111',
                        tier_min_qty_1: 10,
                        tier_min_qty_2: 20,
                        tier_min_qty_3: 30,
                        tier_cogs_price_1: 20000000,
                        tier_cogs_price_2: 19000000,
                        tier_cogs_price_3: 18000000,
                        stock: 15,
                        primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                        additional_images: [],
                        warehouse_id: 1,
                        location_label: 'Jakarta selatan',
                        reference_links: [
                            'https://en.wikipedia.org/wiki/IPhone_X'
                        ],
                        warranty_option: 'international',
                        warranty_period: 'week',
                        warranty_limit: 1,
                        is_indent: 0,
                        indent_period: '',
                        indent_limit: 0,
                        variant_status: 'pending'
                    },
                    {
                        index: '8m4024',
                        variants: [
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Silver',
                                attribute_value_id: 1,
                                attribute_status: 'clear'
                            },
                            {
                                attribute_id: 2,
                                attribute_code: 'phone_storage',
                                attribute_code_label: 'Kapasitas',
                                attribute_value_name: '64GB',
                                attribute_value_id: 4,
                                attribute_status: 'new'
                            }
                        ],
                        variant_value: {
                            phone_color: '1',
                            phone_storage: '4'
                        },
                        sku_vendor: 'X112',
                        tier_min_qty_1: 10,
                        tier_min_qty_2: 20,
                        tier_min_qty_3: 30,
                        tier_cogs_price_1: 20000000,
                        tier_cogs_price_2: 19500000,
                        tier_cogs_price_3: 18500000,
                        stock: 10,
                        primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                        additional_images: [],
                        warehouse_id: 1,
                        location_label: 'Jakarta selatan',
                        reference_links: [
                            'https://en.wikipedia.org/wiki/IPhone_X'
                        ],
                        warranty_option: 'international',
                        warranty_period: 'week',
                        warranty_limit: 1,
                        is_indent: 0,
                        indent_period: '',
                        indent_limit: 0,
                        variant_status: 'pending'
                    }
                ]
            },
            premoderation_status: 'revision_complete',
            vendor_id: 3,
            user: {
                id: 3,
                name: 'Bambang Widodo',
                email: 'vendor2@test.com',
                type: 'vendor'
            },
            created_at: '2017-12-28T08:40:25.982Z',
            updated_at: '2017-12-28T08:40:25.982Z',
            c0: {
                id: 8,
                name: 'IT and Mobile Devices',
                level: 'C0',
                base_margin: null,
                commission: null,
                unspsc: 43000000,
                sequence: 1,
                parent_id: null,
                is_active: 1,
                created_at: '2017-12-18T06:32:18.000Z',
                updated_at: '2017-12-18T06:32:18.000Z'
            },
            c1: {
                id: 52,
                name: 'Communications Devices & Accessories',
                level: 'C1',
                base_margin: null,
                commission: null,
                unspsc: 43190000,
                sequence: 1,
                parent_id: 8,
                is_active: 1,
                created_at: '2017-12-18T06:32:18.000Z',
                updated_at: '2017-12-18T06:32:18.000Z'
            },
            c2: {
                id: 219,
                name: 'Personal communication devices',
                level: 'C2',
                base_margin: null,
                commission: null,
                unspsc: 43191500,
                sequence: 1,
                parent_id: 52,
                is_active: 1,
                created_at: '2017-12-18T06:32:18.000Z',
                updated_at: '2017-12-18T06:32:18.000Z'
            },
            c3: {
                id: 561,
                name: 'Mobile phones',
                level: 'C3',
                base_margin: null,
                commission: null,
                unspsc: 43191501,
                sequence: 1,
                parent_id: 219,
                is_active: 1,
                created_at: '2017-12-18T06:32:18.000Z',
                updated_at: '2017-12-18T06:32:18.000Z'
            }
        }
    ]);
    t.context.sandbox.stub(PremoderationRepository, 'count').resolves(1);
    const ids = t.context.sandbox.stub(PremoderationRepository, 'findDistinctData');
    ids.onCall(0).resolves(resIdsBrand);
    ids.onCall(1).resolves(resIdsCategory);
    t.context.sandbox.stub(PremoderationRepository, 'countAllPremoderationStatus').resolves([
        {
            status: ['revision_inprogress'],
            count: 2
        },
        {
            status: ['revision_complete'],
            count: 1
        }
    ]);
    t.context.sandbox.stub(CategoryRepository, 'findOne').resolves({
        id: 8,
        name: 'IT and Mobile Devices',
        level: 'C0',
        base_margin: null,
        commission: null,
        unspsc: 43000000,
        sequence: 1,
        parent_id: null,
        is_active: 1,
        created_at: '2017-12-18T06:32:18.000Z',
        updated_at: '2017-12-18T06:32:18.000Z'
    });
    t.context.sandbox.stub(CategoryRepository, 'findAll').resolves([
        {
            id: 3,
            name: 'Maintenance, Repair, Overhaul / Operation (MRO)',
            level: 'C0',
            base_margin: null,
            commission: null,
            unspsc: 15000000,
            sequence: 1,
            parent_id: null,
            is_active: 1,
            created_at: '2017-12-18T06:32:18.000Z',
            updated_at: '2017-12-18T06:32:18.000Z'
        },
        {
            id: 8,
            name: 'IT and Mobile Devices',
            level: 'C0',
            base_margin: null,
            commission: null,
            unspsc: 43000000,
            sequence: 1,
            parent_id: null,
            is_active: 1,
            created_at: '2017-12-18T06:32:18.000Z',
            updated_at: '2017-12-18T06:32:18.000Z'
        }
    ]);
    t.context.sandbox.stub(BrandRepository, 'findAll').resolves([
        {
            id: 81,
            name: 'Apple',
            image_url: null,
            created_at: '2017-11-28T14:54:10.000Z',
            updated_at: '2017-11-28T14:54:10.000Z'
        },
        {
            id: 466,
            name: 'Epson',
            image_url: null,
            created_at: '2017-11-28T14:54:10.000Z',
            updated_at: '2017-11-28T14:54:10.000Z'
        }
    ]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3'
            },
            query: {
                search: 'Apple',
                c0: '8',
                brand: '81',
                status: 'revision_inprogress,revision_complete',
                sort: 'created_at_asc',
                page: 1,
                limit: 20
            }
        };

        const result = yield Methods.getPremoderation(data, context);
        const expected = {
            data: [
                {
                    id: '1514450425977',
                    name: 'Apple iPhone 7',
                    product_group_id: 2,
                    variants: [
                        'Pink - 32GB',
                        'Silver - 64GB'
                    ],
                    categories: {
                        C0: {
                            id: 8,
                            name: 'IT and Mobile Devices',
                            unspsc: 43000000
                        }
                    },
                    status: 'revision_complete',
                    created_by: 3,
                    created_at: '2017-12-28T08:40:25.982Z',
                    updated_at: '2017-12-28T08:40:25.982Z',
                    rejected_at: null
                }
            ],
            meta: {
                page: 1,
                limit: 20,
                total_data: 1,
                total_page: 1,
                total_need_revision: 0,
                total_revision_inprogress: 2,
                total_revision_complete: 1,
                total_rejected: 0,
                categories0: [
                    {
                        id: 3,
                        name: 'Maintenance, Repair, Overhaul / Operation (MRO)'
                    },
                    {
                        id: 8,
                        name: 'IT and Mobile Devices'
                    }
                ],
                brands: [
                    {
                        id: 81,
                        name: 'Apple'
                    },
                    {
                        id: 466,
                        name: 'Epson'
                    }
                ]
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return list premoderation vendor with no category', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(PremoderationRepository, 'findAll').resolves([
        {
            _id: '5a4ddb608e16351613dfed29',
            id: '1514450425977',
            type: 'existing',
            product_group_id: 2,
            payload: {
                name: 'Apple iPhone 7',
                category_id: 0,
                category: {
                    c0: 0,
                    c1: 0,
                    c2: 0,
                    c3: 0
                },
                brand_id: 81,
                uom_id: 1,
                stocking_uom_id: 1,
                quantity_stocking_uom: 1,
                manufacturing_number: 'MPN7PK1781',
                package_weight: '800',
                package_length: '100',
                package_height: '300',
                package_width: '200',
                package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
                barcode: '5012345678900',
                description: 'Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.Di iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.',
                variant_count: 2,
                variant_matrix: [
                    'phone_color',
                    'phone_storage'
                ],
                specifications: [
                    {
                        attribute_id: 3,
                        attribute_code: 'phone_os',
                        attribute_code_label: 'Sistem Operasi',
                        attribute_type: 'dropdown',
                        attribute_value_id: 5,
                        attribute_value_label: 'iOS',
                        attribute_status: 'clear'
                    },
                    {
                        attribute_id: 4,
                        attribute_code: 'phone_display',
                        attribute_code_label: 'Layar',
                        attribute_type: 'textinput',
                        attribute_textinput: 'Super AMOLED capacitive touchscreen, 16M colors',
                        attribute_status: 'clear'
                    }
                ],
                products: [
                    {
                        index: 'j2394p',
                        variants: [
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Pink',
                                attribute_value_id: 0,
                                attribute_status: 'new'
                            },
                            {
                                attribute_id: 2,
                                attribute_code: 'phone_storage',
                                attribute_code_label: 'Kapasitas',
                                attribute_value_name: '32GB',
                                attribute_value_id: 3,
                                attribute_status: 'clear'
                            }
                        ],
                        variant_value: {
                            phone_color: '1',
                            phone_storage: '3'
                        },
                        sku_vendor: 'X111',
                        tier_min_qty_1: 10,
                        tier_min_qty_2: 20,
                        tier_min_qty_3: 30,
                        tier_cogs_price_1: 20000000,
                        tier_cogs_price_2: 19000000,
                        tier_cogs_price_3: 18000000,
                        stock: 15,
                        primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                        additional_images: [],
                        warehouse_id: 1,
                        location_label: 'Jakarta selatan',
                        reference_links: [
                            'https://en.wikipedia.org/wiki/IPhone_X'
                        ],
                        warranty_option: 'international',
                        warranty_period: 'week',
                        warranty_limit: 1,
                        is_indent: 0,
                        indent_period: '',
                        indent_limit: 0,
                        variant_status: 'pending'
                    },
                    {
                        index: '8m4024',
                        variants: [
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Silver',
                                attribute_value_id: 1,
                                attribute_status: 'clear'
                            },
                            {
                                attribute_id: 2,
                                attribute_code: 'phone_storage',
                                attribute_code_label: 'Kapasitas',
                                attribute_value_name: '64GB',
                                attribute_value_id: 4,
                                attribute_status: 'new'
                            }
                        ],
                        variant_value: {
                            phone_color: '1',
                            phone_storage: '4'
                        },
                        sku_vendor: 'X112',
                        tier_min_qty_1: 10,
                        tier_min_qty_2: 20,
                        tier_min_qty_3: 30,
                        tier_cogs_price_1: 20000000,
                        tier_cogs_price_2: 19500000,
                        tier_cogs_price_3: 18500000,
                        stock: 10,
                        primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                        additional_images: [],
                        warehouse_id: 1,
                        location_label: 'Jakarta selatan',
                        reference_links: [
                            'https://en.wikipedia.org/wiki/IPhone_X'
                        ],
                        warranty_option: 'international',
                        warranty_period: 'week',
                        warranty_limit: 1,
                        is_indent: 0,
                        indent_period: '',
                        indent_limit: 0,
                        variant_status: 'pending'
                    }
                ]
            },
            premoderation_status: 'revision_complete',
            vendor_id: 3,
            user: {
                id: 3,
                name: 'Bambang Widodo',
                email: 'vendor2@test.com',
                type: 'vendor'
            },
            created_at: '2017-12-28T08:40:25.982Z',
            updated_at: '2017-12-28T08:40:25.982Z',
            c0: {
                id: 8,
                name: 'IT and Mobile Devices',
                level: 'C0',
                base_margin: null,
                commission: null,
                unspsc: 43000000,
                sequence: 1,
                parent_id: null,
                is_active: 1,
                created_at: '2017-12-18T06:32:18.000Z',
                updated_at: '2017-12-18T06:32:18.000Z'
            },
            c1: {
                id: 52,
                name: 'Communications Devices & Accessories',
                level: 'C1',
                base_margin: null,
                commission: null,
                unspsc: 43190000,
                sequence: 1,
                parent_id: 8,
                is_active: 1,
                created_at: '2017-12-18T06:32:18.000Z',
                updated_at: '2017-12-18T06:32:18.000Z'
            },
            c2: {
                id: 219,
                name: 'Personal communication devices',
                level: 'C2',
                base_margin: null,
                commission: null,
                unspsc: 43191500,
                sequence: 1,
                parent_id: 52,
                is_active: 1,
                created_at: '2017-12-18T06:32:18.000Z',
                updated_at: '2017-12-18T06:32:18.000Z'
            },
            c3: {
                id: 561,
                name: 'Mobile phones',
                level: 'C3',
                base_margin: null,
                commission: null,
                unspsc: 43191501,
                sequence: 1,
                parent_id: 219,
                is_active: 1,
                created_at: '2017-12-18T06:32:18.000Z',
                updated_at: '2017-12-18T06:32:18.000Z'
            }
        }
    ]);
    t.context.sandbox.stub(PremoderationRepository, 'count').resolves(1);
    const ids = t.context.sandbox.stub(PremoderationRepository, 'findDistinctData');
    ids.onCall(0).resolves(resIdsBrand);
    ids.onCall(1).resolves(resIdsCategory);
    t.context.sandbox.stub(PremoderationRepository, 'countAllPremoderationStatus').resolves([
        {
            status: ['revision_inprogress'],
            count: 2
        },
        {
            status: ['revision_complete'],
            count: 1
        }
    ]);
    t.context.sandbox.stub(CategoryRepository, 'findOne').resolves(null);
    t.context.sandbox.stub(CategoryRepository, 'findAll').resolves([
        {
            id: 3,
            name: 'Maintenance, Repair, Overhaul / Operation (MRO)',
            level: 'C0',
            base_margin: null,
            commission: null,
            unspsc: 15000000,
            sequence: 1,
            parent_id: null,
            is_active: 1,
            created_at: '2017-12-18T06:32:18.000Z',
            updated_at: '2017-12-18T06:32:18.000Z'
        },
        {
            id: 8,
            name: 'IT and Mobile Devices',
            level: 'C0',
            base_margin: null,
            commission: null,
            unspsc: 43000000,
            sequence: 1,
            parent_id: null,
            is_active: 1,
            created_at: '2017-12-18T06:32:18.000Z',
            updated_at: '2017-12-18T06:32:18.000Z'
        }
    ]);
    t.context.sandbox.stub(BrandRepository, 'findAll').resolves([
        {
            id: 81,
            name: 'Apple',
            image_url: null,
            created_at: '2017-11-28T14:54:10.000Z',
            updated_at: '2017-11-28T14:54:10.000Z'
        },
        {
            id: 466,
            name: 'Epson',
            image_url: null,
            created_at: '2017-11-28T14:54:10.000Z',
            updated_at: '2017-11-28T14:54:10.000Z'
        }
    ]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3'
            },
            query: {
                search: 'Apple',
                c0: '8',
                brand: '81',
                status: 'revision_inprogress,revision_complete',
                sort: 'created_at_asc',
                page: 1,
                limit: 20
            }
        };

        const result = yield Methods.getPremoderation(data, context);
        const expected = {
            data: [
                {
                    id: '1514450425977',
                    name: 'Apple iPhone 7',
                    product_group_id: 2,
                    variants: [
                        'Pink - 32GB',
                        'Silver - 64GB'
                    ],
                    categories: {
                        C0: {
                            id: 0,
                            name: '',
                            unspsc: 0
                        }
                    },
                    status: 'revision_complete',
                    created_by: 3,
                    created_at: '2017-12-28T08:40:25.982Z',
                    updated_at: '2017-12-28T08:40:25.982Z',
                    rejected_at: null
                }
            ],
            meta: {
                page: 1,
                limit: 20,
                total_data: 1,
                total_page: 1,
                total_need_revision: 0,
                total_revision_inprogress: 2,
                total_revision_complete: 1,
                total_rejected: 0,
                categories0: [
                    {
                        id: 3,
                        name: 'Maintenance, Repair, Overhaul / Operation (MRO)'
                    },
                    {
                        id: 8,
                        name: 'IT and Mobile Devices'
                    }
                ],
                brands: [
                    {
                        id: 81,
                        name: 'Apple'
                    },
                    {
                        id: 466,
                        name: 'Epson'
                    }
                ]
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return list premoderation vendor no status', function* (t) {
    t.context.sandbox.stub(PremoderationRepository, 'findAll').resolves([
        {
            _id: '5a4ddb608e16351613dfed29',
            id: '1514450425977',
            type: 'existing',
            product_group_id: 2,
            payload: {
                name: 'Apple iPhone 7',
                category_id: 561,
                category: {
                    c0: 8,
                    c1: 52,
                    c2: 219,
                    c3: 561
                },
                brand_id: 81,
                uom_id: 1,
                stocking_uom_id: 1,
                quantity_stocking_uom: 1,
                manufacturing_number: 'MPN7PK1781',
                package_weight: '800',
                package_length: '100',
                package_height: '300',
                package_width: '200',
                package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
                barcode: '5012345678900',
                description: 'Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.Di iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.',
                variant_count: 2,
                variant_matrix: [
                    'phone_color',
                    'phone_storage'
                ],
                specifications: [
                    {
                        attribute_id: 3,
                        attribute_code: 'phone_os',
                        attribute_code_label: 'Sistem Operasi',
                        attribute_type: 'dropdown',
                        attribute_value_id: 5,
                        attribute_value_label: 'iOS',
                        attribute_status: 'clear'
                    },
                    {
                        attribute_id: 4,
                        attribute_code: 'phone_display',
                        attribute_code_label: 'Layar',
                        attribute_type: 'textinput',
                        attribute_textinput: 'Super AMOLED capacitive touchscreen, 16M colors',
                        attribute_status: 'clear'
                    }
                ],
                products: [
                    {
                        index: 'j2394p',
                        variants: [
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Pink',
                                attribute_value_id: 0,
                                attribute_status: 'new'
                            },
                            {
                                attribute_id: 2,
                                attribute_code: 'phone_storage',
                                attribute_code_label: 'Kapasitas',
                                attribute_value_name: '32GB',
                                attribute_value_id: 3,
                                attribute_status: 'clear'
                            }
                        ],
                        variant_value: {
                            phone_color: '1',
                            phone_storage: '3'
                        },
                        sku_vendor: 'X111',
                        tier_min_qty_1: 10,
                        tier_min_qty_2: 20,
                        tier_min_qty_3: 30,
                        tier_cogs_price_1: 20000000,
                        tier_cogs_price_2: 19000000,
                        tier_cogs_price_3: 18000000,
                        stock: 15,
                        primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                        additional_images: [],
                        warehouse_id: 1,
                        location_label: 'Jakarta selatan',
                        reference_links: [
                            'https://en.wikipedia.org/wiki/IPhone_X'
                        ],
                        warranty_option: 'international',
                        warranty_period: 'week',
                        warranty_limit: 1,
                        is_indent: 0,
                        indent_period: '',
                        indent_limit: 0,
                        variant_status: 'pending'
                    },
                    {
                        index: '8m4024',
                        variants: [
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Silver',
                                attribute_value_id: 1,
                                attribute_status: 'clear'
                            },
                            {
                                attribute_id: 2,
                                attribute_code: 'phone_storage',
                                attribute_code_label: 'Kapasitas',
                                attribute_value_name: '64GB',
                                attribute_value_id: 4,
                                attribute_status: 'new'
                            }
                        ],
                        variant_value: {
                            phone_color: '1',
                            phone_storage: '4'
                        },
                        sku_vendor: 'X112',
                        tier_min_qty_1: 10,
                        tier_min_qty_2: 20,
                        tier_min_qty_3: 30,
                        tier_cogs_price_1: 20000000,
                        tier_cogs_price_2: 19500000,
                        tier_cogs_price_3: 18500000,
                        stock: 10,
                        primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                        additional_images: [],
                        warehouse_id: 1,
                        location_label: 'Jakarta selatan',
                        reference_links: [
                            'https://en.wikipedia.org/wiki/IPhone_X'
                        ],
                        warranty_option: 'international',
                        warranty_period: 'week',
                        warranty_limit: 1,
                        is_indent: 0,
                        indent_period: '',
                        indent_limit: 0,
                        variant_status: 'pending'
                    }
                ]
            },
            premoderation_status: 'revision_complete',
            vendor_id: 3,
            user: {
                id: 3,
                name: 'Bambang Widodo',
                email: 'vendor2@test.com',
                type: 'vendor'
            },
            created_at: '2017-12-28T08:40:25.982Z',
            updated_at: '2017-12-28T08:40:25.982Z',
            c0: {
                id: 8,
                name: 'IT and Mobile Devices',
                level: 'C0',
                base_margin: null,
                commission: null,
                unspsc: 43000000,
                sequence: 1,
                parent_id: null,
                is_active: 1,
                created_at: '2017-12-18T06:32:18.000Z',
                updated_at: '2017-12-18T06:32:18.000Z'
            },
            c1: {
                id: 52,
                name: 'Communications Devices & Accessories',
                level: 'C1',
                base_margin: null,
                commission: null,
                unspsc: 43190000,
                sequence: 1,
                parent_id: 8,
                is_active: 1,
                created_at: '2017-12-18T06:32:18.000Z',
                updated_at: '2017-12-18T06:32:18.000Z'
            },
            c2: {
                id: 219,
                name: 'Personal communication devices',
                level: 'C2',
                base_margin: null,
                commission: null,
                unspsc: 43191500,
                sequence: 1,
                parent_id: 52,
                is_active: 1,
                created_at: '2017-12-18T06:32:18.000Z',
                updated_at: '2017-12-18T06:32:18.000Z'
            },
            c3: {
                id: 561,
                name: 'Mobile phones',
                level: 'C3',
                base_margin: null,
                commission: null,
                unspsc: 43191501,
                sequence: 1,
                parent_id: 219,
                is_active: 1,
                created_at: '2017-12-18T06:32:18.000Z',
                updated_at: '2017-12-18T06:32:18.000Z'
            }
        }
    ]);
    t.context.sandbox.stub(PremoderationRepository, 'count').resolves(0);
    const ids = t.context.sandbox.stub(PremoderationRepository, 'findDistinctData');
    ids.onCall(0).resolves(resIdsBrand);
    ids.onCall(1).resolves(resIdsCategory);
    t.context.sandbox.stub(PremoderationRepository, 'countAllPremoderationStatus').resolves();
    const CatFindOne = t.context.sandbox.stub(CategoryRepository, 'findOne');
    CatFindOne.onCall(0).resolves({
        id: 8,
        name: 'IT and Mobile Devices',
        level: 'C0',
        base_margin: null,
        commission: null,
        unspsc: 43000000,
        sequence: 1,
        parent_id: null,
        is_active: 1,
        created_at: '2017-12-18T06:32:18.000Z',
        updated_at: '2017-12-18T06:32:18.000Z'
    });
    CatFindOne.onCall(1).resolves({
        id: 63,
        name: 'Cleaning and janitorial supplies',
        level: 'C1',
        base_margin: null,
        commission: null,
        unspsc: 47130000,
        sequence: 1,
        parent_id: 10,
        is_active: 1,
        created_at: '2017-12-18T06:32:18.000Z',
        updated_at: '2017-12-18T06:32:18.000Z'
    });
    CatFindOne.onCall(2).resolves({
        id: 240,
        name: 'Restroom supplies',
        level: 'C2',
        base_margin: null,
        commission: null,
        unspsc: 47131700,
        sequence: 1,
        parent_id: 63,
        is_active: 1,
        created_at: '2017-12-18T06:32:18.000Z',
        updated_at: '2017-12-18T06:32:18.000Z'
    });
    CatFindOne.onCall(3).resolves({
        id: 444,
        name: 'Facial tissue dispensers',
        level: 'C3',
        base_margin: null,
        commission: null,
        unspsc: 47131709,
        sequence: 1,
        parent_id: 240,
        is_active: 1,
        created_at: '2017-12-18T06:32:18.000Z',
        updated_at: '2017-12-18T06:32:18.000Z'
    });

    t.context.sandbox.stub(CategoryRepository, 'findAll').resolves([
        {
            id: 8,
            name: 'IT and Mobile Devices',
            level: 'C0',
            base_margin: null,
            commission: null,
            unspsc: 43000000,
            sequence: 1,
            parent_id: null,
            is_active: 1,
            created_at: '2017-12-18T06:32:18.000Z',
            updated_at: '2017-12-18T06:32:18.000Z'
        }
    ]);
    t.context.sandbox.stub(BrandRepository, 'findAll').resolves([
        {
            id: 81,
            name: 'Apple',
            image_url: null,
            created_at: '2017-11-28T14:54:10.000Z',
            updated_at: '2017-11-28T14:54:10.000Z'
        }
    ]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3'
            },
            query: {
                search: 'Apple',
                c0: '8',
                brand: '81',
                status: '',
                sort: 'created_at_asc',
                page: 1,
                limit: 20
            }
        };

        const result = yield Methods.getPremoderation(data, context);
        const expected = {
            data: [
                {
                    id: '1514450425977',
                    name: 'Apple iPhone 7',
                    product_group_id: 2,
                    variants: [
                        'Pink - 32GB',
                        'Silver - 64GB'
                    ],
                    categories: {
                        C0: {
                            id: 8,
                            name: 'IT and Mobile Devices',
                            unspsc: 43000000
                        }
                    },
                    status: 'revision_complete',
                    created_by: 3,
                    created_at: '2017-12-28T08:40:25.982Z',
                    updated_at: '2017-12-28T08:40:25.982Z',
                    rejected_at: null
                }
            ],
            meta: {
                page: 1,
                limit: 20,
                total_data: 0,
                total_page: 0,
                total_need_revision: 0,
                total_revision_inprogress: 0,
                total_revision_complete: 0,
                total_rejected: 0,
                categories0: [],
                brands: []
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return list premoderation vendor with one variant only', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(PremoderationRepository, 'findAll').resolves([
        {
            _id: '5a4ddb608e16351613dfed29',
            id: '1514450425977',
            type: 'new',
            payload: {
                name: 'Apple iPhone 7',
                category_id: 561,
                category: {
                    c0: 8,
                    c1: 52,
                    c2: 219,
                    c3: 561
                },
                brand_id: 81,
                uom_id: 1,
                stocking_uom_id: 1,
                quantity_stocking_uom: 1,
                manufacturing_number: 'MPN7PK1781',
                package_weight: '800',
                package_length: '100',
                package_height: '300',
                package_width: '200',
                package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
                barcode: '5012345678900',
                description: 'Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.Di iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.',
                variant_count: 2,
                variant_matrix: [
                    'phone_color'
                ],
                specifications: [
                    {
                        attribute_id: 3,
                        attribute_code: 'phone_os',
                        attribute_code_label: 'Sistem Operasi',
                        attribute_type: 'dropdown',
                        attribute_value_id: 5,
                        attribute_value_label: 'iOS',
                        attribute_status: 'clear'
                    },
                    {
                        attribute_id: 4,
                        attribute_code: 'phone_display',
                        attribute_code_label: 'Layar',
                        attribute_type: 'textinput',
                        attribute_textinput: 'Super AMOLED capacitive touchscreen, 16M colors',
                        attribute_status: 'clear'
                    }
                ],
                products: [
                    {
                        index: 'j2394p',
                        variants: [
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Pink',
                                attribute_value_id: 0,
                                attribute_status: 'new'
                            }
                        ],
                        variant_value: {
                            phone_color: '1'
                        },
                        sku_vendor: 'X111',
                        tier_min_qty_1: 10,
                        tier_min_qty_2: 20,
                        tier_min_qty_3: 30,
                        tier_cogs_price_1: 20000000,
                        tier_cogs_price_2: 19000000,
                        tier_cogs_price_3: 18000000,
                        stock: 15,
                        primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                        additional_images: [],
                        warehouse_id: 1,
                        location_label: 'Jakarta selatan',
                        reference_links: [
                            'https://en.wikipedia.org/wiki/IPhone_X'
                        ],
                        warranty_option: 'international',
                        warranty_period: 'week',
                        warranty_limit: 1,
                        is_indent: 0,
                        indent_period: '',
                        indent_limit: 0,
                        variant_status: 'pending'
                    },
                    {
                        index: '8m4024',
                        variants: [
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Silver',
                                attribute_value_id: 1,
                                attribute_status: 'clear'
                            }
                        ],
                        variant_value: {
                            phone_color: '1'
                        },
                        sku_vendor: 'X112',
                        tier_min_qty_1: 10,
                        tier_min_qty_2: 20,
                        tier_min_qty_3: 30,
                        tier_cogs_price_1: 20000000,
                        tier_cogs_price_2: 19500000,
                        tier_cogs_price_3: 18500000,
                        stock: 10,
                        primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                        additional_images: [],
                        warehouse_id: 1,
                        location_label: 'Jakarta selatan',
                        reference_links: [
                            'https://en.wikipedia.org/wiki/IPhone_X'
                        ],
                        warranty_option: 'international',
                        warranty_period: 'week',
                        warranty_limit: 1,
                        is_indent: 0,
                        indent_period: '',
                        indent_limit: 0,
                        variant_status: 'pending'
                    }
                ]
            },
            premoderation_status: 'revision_complete',
            vendor_id: 3,
            user: {
                id: 3,
                name: 'Bambang Widodo',
                email: 'vendor2@test.com',
                type: 'vendor'
            },
            created_at: '2017-12-28T08:40:25.982Z',
            updated_at: '2017-12-28T08:40:25.982Z',
            rejected_at: '2017-12-28T08:40:25.982Z',
            c0: {
                id: 8,
                name: 'IT and Mobile Devices',
                level: 'C0',
                base_margin: null,
                commission: null,
                unspsc: 43000000,
                sequence: 1,
                parent_id: null,
                is_active: 1,
                created_at: '2017-12-18T06:32:18.000Z',
                updated_at: '2017-12-18T06:32:18.000Z'
            },
            c1: {
                id: 52,
                name: 'Communications Devices & Accessories',
                level: 'C1',
                base_margin: null,
                commission: null,
                unspsc: 43190000,
                sequence: 1,
                parent_id: 8,
                is_active: 1,
                created_at: '2017-12-18T06:32:18.000Z',
                updated_at: '2017-12-18T06:32:18.000Z'
            },
            c2: {
                id: 219,
                name: 'Personal communication devices',
                level: 'C2',
                base_margin: null,
                commission: null,
                unspsc: 43191500,
                sequence: 1,
                parent_id: 52,
                is_active: 1,
                created_at: '2017-12-18T06:32:18.000Z',
                updated_at: '2017-12-18T06:32:18.000Z'
            },
            c3: {
                id: 561,
                name: 'Mobile phones',
                level: 'C3',
                base_margin: null,
                commission: null,
                unspsc: 43191501,
                sequence: 1,
                parent_id: 219,
                is_active: 1,
                created_at: '2017-12-18T06:32:18.000Z',
                updated_at: '2017-12-18T06:32:18.000Z'
            }
        }
    ]);
    t.context.sandbox.stub(PremoderationRepository, 'count').resolves(1);
    const ids = t.context.sandbox.stub(PremoderationRepository, 'findDistinctData');
    ids.onCall(0).resolves(resIdsBrand);
    ids.onCall(1).resolves(resIdsCategory);
    t.context.sandbox.stub(PremoderationRepository, 'countAllPremoderationStatus').resolves([
        {
            status: ['revision_inprogress'],
            count: 2
        },
        {
            status: ['revision_complete'],
            count: 1
        }
    ]);
    t.context.sandbox.stub(CategoryRepository, 'findOne').resolves({
        id: 8,
        name: 'IT and Mobile Devices',
        level: 'C0',
        base_margin: null,
        commission: null,
        unspsc: 43000000,
        sequence: 1,
        parent_id: null,
        is_active: 1,
        created_at: '2017-12-18T06:32:18.000Z',
        updated_at: '2017-12-18T06:32:18.000Z'
    });
    t.context.sandbox.stub(CategoryRepository, 'findAll').resolves([
        {
            id: 3,
            name: 'Maintenance, Repair, Overhaul / Operation (MRO)',
            level: 'C0',
            base_margin: null,
            commission: null,
            unspsc: 15000000,
            sequence: 1,
            parent_id: null,
            is_active: 1,
            created_at: '2017-12-18T06:32:18.000Z',
            updated_at: '2017-12-18T06:32:18.000Z'
        },
        {
            id: 8,
            name: 'IT and Mobile Devices',
            level: 'C0',
            base_margin: null,
            commission: null,
            unspsc: 43000000,
            sequence: 1,
            parent_id: null,
            is_active: 1,
            created_at: '2017-12-18T06:32:18.000Z',
            updated_at: '2017-12-18T06:32:18.000Z'
        }
    ]);
    t.context.sandbox.stub(BrandRepository, 'findAll').resolves([
        {
            id: 81,
            name: 'Apple',
            image_url: null,
            created_at: '2017-11-28T14:54:10.000Z',
            updated_at: '2017-11-28T14:54:10.000Z'
        },
        {
            id: 466,
            name: 'Epson',
            image_url: null,
            created_at: '2017-11-28T14:54:10.000Z',
            updated_at: '2017-11-28T14:54:10.000Z'
        }
    ]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3'
            },
            query: {
                search: 'Apple',
                c0: '8',
                brand: '81',
                status: 'revision_inprogress,revision_complete',
                sort: 'created_at_asc',
                page: 1,
                limit: 20
            }
        };

        const result = yield Methods.getPremoderation(data, context);
        const expected = {
            data: [
                {
                    id: '1514450425977',
                    name: 'Apple iPhone 7',
                    product_group_id: null,
                    variants: [
                        'Pink',
                        'Silver'
                    ],
                    categories: {
                        C0: {
                            id: 8,
                            name: 'IT and Mobile Devices',
                            unspsc: 43000000
                        }
                    },
                    status: 'revision_complete',
                    created_by: 3,
                    created_at: '2017-12-28T08:40:25.982Z',
                    updated_at: '2017-12-28T08:40:25.982Z',
                    rejected_at: '2017-12-28T08:40:25.982Z'
                }
            ],
            meta: {
                page: 1,
                limit: 20,
                total_data: 1,
                total_page: 1,
                total_need_revision: 0,
                total_revision_inprogress: 2,
                total_revision_complete: 1,
                total_rejected: 0,
                categories0: [
                    {
                        id: 3,
                        name: 'Maintenance, Repair, Overhaul / Operation (MRO)'
                    },
                    {
                        id: 8,
                        name: 'IT and Mobile Devices'
                    }
                ],
                brands: [
                    {
                        id: 81,
                        name: 'Apple'
                    },
                    {
                        id: 466,
                        name: 'Epson'
                    }
                ]
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return list premoderation vendor with three variant', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(PremoderationRepository, 'findAll').resolves([
        {
            _id: '5a4ddb608e16351613dfed29',
            id: '1514450425977',
            type: 'existing',
            product_group_id: 2,
            payload: {
                name: 'Apple iPhone 7',
                category_id: 561,
                category: {
                    c0: 8,
                    c1: 52,
                    c2: 219,
                    c3: 561
                },
                brand_id: 81,
                uom_id: 1,
                stocking_uom_id: 1,
                quantity_stocking_uom: 1,
                manufacturing_number: 'MPN7PK1781',
                package_weight: '800',
                package_length: '100',
                package_height: '300',
                package_width: '200',
                package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
                barcode: '5012345678900',
                description: 'Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.Di iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.',
                variant_count: 2,
                variant_matrix: [
                    'phone_color'
                ],
                specifications: [
                    {
                        attribute_id: 3,
                        attribute_code: 'phone_os',
                        attribute_code_label: 'Sistem Operasi',
                        attribute_type: 'dropdown',
                        attribute_value_id: 5,
                        attribute_value_label: 'iOS',
                        attribute_status: 'clear'
                    },
                    {
                        attribute_id: 4,
                        attribute_code: 'phone_display',
                        attribute_code_label: 'Layar',
                        attribute_type: 'textinput',
                        attribute_textinput: 'Super AMOLED capacitive touchscreen, 16M colors',
                        attribute_status: 'clear'
                    }
                ],
                products: [
                    {
                        index: 'j2394p',
                        variants: [
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Pink',
                                attribute_value_id: 0,
                                attribute_status: 'new'
                            },
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Pink',
                                attribute_value_id: 0,
                                attribute_status: 'new'
                            },
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Pink',
                                attribute_value_id: 0,
                                attribute_status: 'new'
                            }
                        ],
                        variant_value: {
                            phone_color: '1'
                        },
                        sku_vendor: 'X111',
                        tier_min_qty_1: 10,
                        tier_min_qty_2: 20,
                        tier_min_qty_3: 30,
                        tier_cogs_price_1: 20000000,
                        tier_cogs_price_2: 19000000,
                        tier_cogs_price_3: 18000000,
                        stock: 15,
                        primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                        additional_images: [],
                        warehouse_id: 1,
                        location_label: 'Jakarta selatan',
                        reference_links: [
                            'https://en.wikipedia.org/wiki/IPhone_X'
                        ],
                        warranty_option: 'international',
                        warranty_period: 'week',
                        warranty_limit: 1,
                        is_indent: 0,
                        indent_period: '',
                        indent_limit: 0,
                        variant_status: 'pending'
                    }
                ]
            },
            premoderation_status: 'revision_complete',
            vendor_id: 3,
            user: {
                id: 3,
                name: 'Bambang Widodo',
                email: 'vendor2@test.com',
                type: 'vendor'
            },
            created_at: '2017-12-28T08:40:25.982Z',
            updated_at: '2017-12-28T08:40:25.982Z',
            c0: {
                id: 8,
                name: 'IT and Mobile Devices',
                level: 'C0',
                base_margin: null,
                commission: null,
                unspsc: 43000000,
                sequence: 1,
                parent_id: null,
                is_active: 1,
                created_at: '2017-12-18T06:32:18.000Z',
                updated_at: '2017-12-18T06:32:18.000Z'
            },
            c1: {
                id: 52,
                name: 'Communications Devices & Accessories',
                level: 'C1',
                base_margin: null,
                commission: null,
                unspsc: 43190000,
                sequence: 1,
                parent_id: 8,
                is_active: 1,
                created_at: '2017-12-18T06:32:18.000Z',
                updated_at: '2017-12-18T06:32:18.000Z'
            },
            c2: {
                id: 219,
                name: 'Personal communication devices',
                level: 'C2',
                base_margin: null,
                commission: null,
                unspsc: 43191500,
                sequence: 1,
                parent_id: 52,
                is_active: 1,
                created_at: '2017-12-18T06:32:18.000Z',
                updated_at: '2017-12-18T06:32:18.000Z'
            },
            c3: {
                id: 561,
                name: 'Mobile phones',
                level: 'C3',
                base_margin: null,
                commission: null,
                unspsc: 43191501,
                sequence: 1,
                parent_id: 219,
                is_active: 1,
                created_at: '2017-12-18T06:32:18.000Z',
                updated_at: '2017-12-18T06:32:18.000Z'
            }
        }
    ]);
    t.context.sandbox.stub(PremoderationRepository, 'count').resolves(1);
    const ids = t.context.sandbox.stub(PremoderationRepository, 'findDistinctData');
    ids.onCall(0).resolves(resIdsBrand);
    ids.onCall(1).resolves(resIdsCategory);
    t.context.sandbox.stub(PremoderationRepository, 'countAllPremoderationStatus').resolves([
        {
            status: ['revision_inprogress'],
            count: 2
        },
        {
            status: ['revision_complete'],
            count: 1
        },
        {
            status: [],
            count: 1
        }
    ]);
    t.context.sandbox.stub(CategoryRepository, 'findOne').resolves({
        id: 8,
        name: 'IT and Mobile Devices',
        level: 'C0',
        base_margin: null,
        commission: null,
        unspsc: 43000000,
        sequence: 1,
        parent_id: null,
        is_active: 1,
        created_at: '2017-12-18T06:32:18.000Z',
        updated_at: '2017-12-18T06:32:18.000Z'
    });
    t.context.sandbox.stub(CategoryRepository, 'findAll').resolves([
        {
            id: 3,
            name: 'Maintenance, Repair, Overhaul / Operation (MRO)',
            level: 'C0',
            base_margin: null,
            commission: null,
            unspsc: 15000000,
            sequence: 1,
            parent_id: null,
            is_active: 1,
            created_at: '2017-12-18T06:32:18.000Z',
            updated_at: '2017-12-18T06:32:18.000Z'
        },
        {
            id: 8,
            name: 'IT and Mobile Devices',
            level: 'C0',
            base_margin: null,
            commission: null,
            unspsc: 43000000,
            sequence: 1,
            parent_id: null,
            is_active: 1,
            created_at: '2017-12-18T06:32:18.000Z',
            updated_at: '2017-12-18T06:32:18.000Z'
        }
    ]);
    t.context.sandbox.stub(BrandRepository, 'findAll').resolves([
        {
            id: 81,
            name: 'Apple',
            image_url: null,
            created_at: '2017-11-28T14:54:10.000Z',
            updated_at: '2017-11-28T14:54:10.000Z'
        },
        {
            id: 466,
            name: 'Epson',
            image_url: null,
            created_at: '2017-11-28T14:54:10.000Z',
            updated_at: '2017-11-28T14:54:10.000Z'
        }
    ]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3'
            },
            query: {
                search: 'Apple',
                c0: '8',
                brand: '81',
                status: 'revision_inprogress,revision_complete',
                sort: 'created_at_asc',
                page: 1,
                limit: 20
            }
        };

        const result = yield Methods.getPremoderation(data, context);
        const expected = {
            data: [
                {
                    id: '1514450425977',
                    name: 'Apple iPhone 7',
                    product_group_id: 2,
                    variants: [
                        'Pink - Pink',
                        'Pink'
                    ],
                    categories: {
                        C0: {
                            id: 8,
                            name: 'IT and Mobile Devices',
                            unspsc: 43000000
                        }
                    },
                    status: 'revision_complete',
                    created_by: 3,
                    created_at: '2017-12-28T08:40:25.982Z',
                    updated_at: '2017-12-28T08:40:25.982Z',
                    rejected_at: null
                }
            ],
            meta: {
                page: 1,
                limit: 20,
                total_data: 1,
                total_page: 1,
                total_need_revision: 0,
                total_revision_inprogress: 2,
                total_revision_complete: 1,
                total_rejected: 1,
                categories0: [
                    {
                        id: 3,
                        name: 'Maintenance, Repair, Overhaul / Operation (MRO)'
                    },
                    {
                        id: 8,
                        name: 'IT and Mobile Devices'
                    }
                ],
                brands: [
                    {
                        id: 81,
                        name: 'Apple'
                    },
                    {
                        id: 466,
                        name: 'Epson'
                    }
                ]
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});


test.serial('Should be return list premoderation vendor status rejected', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(PremoderationRepository, 'findAll').resolves([
        {
            _id: '5a5d9af2960bef3205dcebbf',
            id: '1516083954744',
            type: 'existing',
            payload: {
                products: [
                    {
                        variants: [
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Gold',
                                attribute_value_id: 0,
                                attribute_status: 'new'
                            },
                            {
                                attribute_id: 2,
                                attribute_code: 'phone_storage',
                                attribute_code_label: 'Kapasitas',
                                attribute_value_name: '64GB',
                                attribute_value_id: 4,
                                attribute_status: 'clear'
                            }
                        ],
                        variant_value: {
                            phone_color: '2',
                            phone_storage: '3'
                        },
                        sku_vendor: '111111111',
                        tier_min_qty_1: 0,
                        tier_min_qty_2: 0,
                        tier_min_qty_3: 0,
                        tier_cogs_price_1: 0,
                        tier_cogs_price_2: 0,
                        tier_cogs_price_3: 0,
                        stock: 1,
                        primary_image: 'http://localhost/testing/testing_image.jpg',
                        additional_images: [
                            'http://localhost/testing/testing_image.jpg',
                            'http://localhost/testing/testing_image.jpg'
                        ],
                        warehouse_id: 99,
                        location_label: 'Jakarta',
                        reference_links: [
                            'google.com',
                            'amazon.com'
                        ],
                        warranty_option: 'official_warranty',
                        warranty_period: 'month',
                        warranty_limit: 1,
                        warranty_coverage: 'Box',
                        is_indent: 1,
                        indent_period: 'week',
                        indent_limit: 2,
                        variant_status: 'pending',
                        index: 'WIXE5Y'
                    },
                    {
                        variants: [
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Green',
                                attribute_value_id: 2,
                                attribute_status: 'clear'
                            },
                            {
                                attribute_id: 2,
                                attribute_code: 'phone_storage',
                                attribute_code_label: 'Kapasitas',
                                attribute_value_name: '64GB',
                                attribute_value_id: 4,
                                attribute_status: 'clear'
                            }
                        ],
                        variant_value: {
                            phone_color: '2',
                            phone_storage: '3'
                        },
                        sku_vendor: '111111111',
                        tier_min_qty_1: 0,
                        tier_min_qty_2: 0,
                        tier_min_qty_3: 0,
                        tier_cogs_price_1: 0,
                        tier_cogs_price_2: 0,
                        tier_cogs_price_3: 0,
                        stock: 1,
                        primary_image: 'http://localhost/testing/testing_image.jpg',
                        additional_images: [
                            'http://localhost/testing/testing_image.jpg',
                            'http://localhost/testing/testing_image.jpg'
                        ],
                        warehouse_id: 99,
                        location_label: 'Jakarta',
                        reference_links: [
                            'google.com',
                            'amazon.com'
                        ],
                        warranty_option: 'official_warranty',
                        warranty_period: 'month',
                        warranty_limit: 1,
                        warranty_coverage: 'Box',
                        is_indent: 1,
                        indent_period: 'week',
                        indent_limit: 2,
                        variant_status: 'complete',
                        index: 'QHLYQ5'
                    }
                ],
                name: 'Apple iPhone 7',
                category_id: 561,
                brand_id: 81,
                uom_id: 1,
                stocking_uom_id: 1,
                quantity_stocking_uom: 1,
                manufacturing_number: 'MPN7PK1781',
                package_weight: '800',
                package_length: '100.00',
                package_height: '300.00',
                package_width: '200.00',
                package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
                barcode: '5012345678900',
                description: 'Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.\n\nDi iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.',
                variant_count: 2,
                variant_matrix: [
                    'phone_color',
                    'phone_storage'
                ],
                specifications: [
                    {
                        attribute_id: 3,
                        attribute_code: 'phone_os',
                        attribute_code_label: 'Sistem Operasi',
                        attribute_type: 'dropdown',
                        attribute_value_id: 5,
                        attribute_value_label: 'iOS',
                        attribute_status: 'clear'
                    },
                    {
                        attribute_id: 4,
                        attribute_code: 'phone_display',
                        attribute_code_label: 'Layar',
                        attribute_type: 'textinput',
                        attribute_textinput: 'Super AMOLED capacitive touchscreen, 16M colors',
                        attribute_status: 'clear'
                    }
                ],
                category: {
                    c0: 8,
                    c1: 52,
                    c2: 219,
                    c3: 561
                },
                specification_status: 'clear'
            },
            premoderation_status: 'rejected',
            vendor_id: 3,
            user: {
                id: 3,
                name: 'Bambang Widodo',
                email: 'vendor2@test.com',
                type: 'vendor'
            },
            created_at: '2018-01-16T06:25:54.745Z',
            updated_at: '2018-01-16T06:25:54.745Z',
            product_group_id: 2,
            c0: {
                id: 8,
                name: 'IT and Mobile Devices',
                level: 'C0',
                base_margin: null,
                commission: null,
                unspsc: 43000000,
                sequence: 1,
                parent_id: null,
                is_active: 1,
                created_at: '2017-12-18T06:32:18.000Z',
                updated_at: '2017-12-18T06:32:18.000Z'
            },
            c1: {
                id: 52,
                name: 'Communications Devices & Accessories',
                level: 'C1',
                base_margin: null,
                commission: null,
                unspsc: 43190000,
                sequence: 1,
                parent_id: 8,
                is_active: 1,
                created_at: '2017-12-18T06:32:18.000Z',
                updated_at: '2017-12-18T06:32:18.000Z'
            },
            c2: {
                id: 219,
                name: 'Personal communication devices',
                level: 'C2',
                base_margin: null,
                commission: null,
                unspsc: 43191500,
                sequence: 1,
                parent_id: 52,
                is_active: 1,
                created_at: '2017-12-18T06:32:18.000Z',
                updated_at: '2017-12-18T06:32:18.000Z'
            },
            c3: {
                id: 561,
                name: 'Mobile phones',
                level: 'C3',
                base_margin: null,
                commission: null,
                unspsc: 43191501,
                sequence: 1,
                parent_id: 219,
                is_active: 1,
                created_at: '2017-12-18T06:32:18.000Z',
                updated_at: '2017-12-18T06:32:18.000Z'
            }
        }
    ]);
    t.context.sandbox.stub(PremoderationRepository, 'count').resolves(1);
    const ids = t.context.sandbox.stub(PremoderationRepository, 'findDistinctData');
    ids.onCall(0).resolves(resIdsBrand);
    ids.onCall(1).resolves(resIdsCategory);
    t.context.sandbox.stub(PremoderationRepository, 'countAllPremoderationStatus').resolves([
        {
            status: ['rejected'],
            count: 0
        }
    ]);
    t.context.sandbox.stub(CategoryRepository, 'findOne').resolves({
        id: 8,
        name: 'IT and Mobile Devices',
        level: 'C0',
        base_margin: null,
        commission: null,
        unspsc: 43000000,
        sequence: 1,
        parent_id: null,
        is_active: 1,
        created_at: '2017-12-18T06:32:18.000Z',
        updated_at: '2017-12-18T06:32:18.000Z'
    });
    t.context.sandbox.stub(CategoryRepository, 'findAll').resolves([
        {
            id: 8,
            name: 'IT and Mobile Devices',
            level: 'C0',
            base_margin: null,
            commission: null,
            unspsc: 43000000,
            sequence: 1,
            parent_id: null,
            is_active: 1,
            created_at: '2017-12-18T06:32:18.000Z',
            updated_at: '2017-12-18T06:32:18.000Z'
        }
    ]);
    t.context.sandbox.stub(BrandRepository, 'findAll').resolves([
        {
            id: 81,
            name: 'Apple',
            image_url: null,
            created_at: '2017-11-28T14:54:10.000Z',
            updated_at: '2017-11-28T14:54:10.000Z'
        }
    ]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3'
            },
            query: {
                search: '',
                c0: '',
                brand: '',
                status: 'rejected',
                sort: 'created_at_desc',
                page: 1,
                limit: 20
            }
        };

        const result = yield Methods.getPremoderation(data, context);
        const expected = {
            data: [
                {
                    id: '1516083954744',
                    name: 'Apple iPhone 7',
                    product_group_id: 2,
                    variants: [
                        'Gold - 64GB',
                        'Green - 64GB'
                    ],
                    categories: {
                        C0: {
                            id: 8,
                            name: 'IT and Mobile Devices',
                            unspsc: 43000000
                        }
                    },
                    status: 'rejected',
                    created_by: 3,
                    created_at: '2018-01-16T06:25:54.745Z',
                    updated_at: '2018-01-16T06:25:54.745Z',
                    rejected_at: null
                }
            ],
            meta: {
                page: 1,
                limit: 20,
                total_data: 1,
                total_page: 1,
                total_need_revision: 0,
                total_revision_inprogress: 0,
                total_revision_complete: 0,
                total_rejected: 0,
                categories0: [
                    {
                        id: 8,
                        name: 'IT and Mobile Devices'
                    }
                ],
                brands: [
                    {
                        id: 81,
                        name: 'Apple'
                    }
                ]
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return list premoderation vendor status need revision', function* (t) {
    t.context.sandbox.stub(DBContext, 'getInstance').resolves({
        ORMProvider: {
            Op: {}
        }
    });
    t.context.sandbox.stub(PremoderationRepository, 'findAll').resolves([
        {
            _id: '5a5d9af2960bef3205dcebbf',
            id: '1516083954744',
            type: 'existing',
            payload: {
                products: [
                    {
                        variants: [
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Gold',
                                attribute_value_id: 0,
                                attribute_status: 'new'
                            },
                            {
                                attribute_id: 2,
                                attribute_code: 'phone_storage',
                                attribute_code_label: 'Kapasitas',
                                attribute_value_name: '64GB',
                                attribute_value_id: 4,
                                attribute_status: 'clear'
                            }
                        ],
                        variant_value: {
                            phone_color: '2',
                            phone_storage: '3'
                        },
                        sku_vendor: '111111111',
                        tier_min_qty_1: 0,
                        tier_min_qty_2: 0,
                        tier_min_qty_3: 0,
                        tier_cogs_price_1: 0,
                        tier_cogs_price_2: 0,
                        tier_cogs_price_3: 0,
                        stock: 1,
                        primary_image: 'http://localhost/testing/testing_image.jpg',
                        additional_images: [
                            'http://localhost/testing/testing_image.jpg',
                            'http://localhost/testing/testing_image.jpg'
                        ],
                        warehouse_id: 99,
                        location_label: 'Jakarta',
                        reference_links: [
                            'google.com',
                            'amazon.com'
                        ],
                        warranty_option: 'official_warranty',
                        warranty_period: 'month',
                        warranty_limit: 1,
                        warranty_coverage: 'Box',
                        is_indent: 1,
                        indent_period: 'week',
                        indent_limit: 2,
                        variant_status: 'pending',
                        index: 'WIXE5Y'
                    },
                    {
                        variants: [
                            {
                                attribute_id: 1,
                                attribute_code: 'phone_color',
                                attribute_code_label: 'Warna',
                                attribute_value_name: 'Green',
                                attribute_value_id: 2,
                                attribute_status: 'clear'
                            },
                            {
                                attribute_id: 2,
                                attribute_code: 'phone_storage',
                                attribute_code_label: 'Kapasitas',
                                attribute_value_name: '64GB',
                                attribute_value_id: 4,
                                attribute_status: 'clear'
                            }
                        ],
                        variant_value: {
                            phone_color: '2',
                            phone_storage: '3'
                        },
                        sku_vendor: '111111111',
                        tier_min_qty_1: 0,
                        tier_min_qty_2: 0,
                        tier_min_qty_3: 0,
                        tier_cogs_price_1: 0,
                        tier_cogs_price_2: 0,
                        tier_cogs_price_3: 0,
                        stock: 1,
                        primary_image: 'http://localhost/testing/testing_image.jpg',
                        additional_images: [
                            'http://localhost/testing/testing_image.jpg',
                            'http://localhost/testing/testing_image.jpg'
                        ],
                        warehouse_id: 99,
                        location_label: 'Jakarta',
                        reference_links: [
                            'google.com',
                            'amazon.com'
                        ],
                        warranty_option: 'official_warranty',
                        warranty_period: 'month',
                        warranty_limit: 1,
                        warranty_coverage: 'Box',
                        is_indent: 1,
                        indent_period: 'week',
                        indent_limit: 2,
                        variant_status: 'complete',
                        index: 'QHLYQ5'
                    }
                ],
                name: 'Apple iPhone 7',
                category_id: 561,
                brand_id: 81,
                uom_id: 1,
                stocking_uom_id: 1,
                quantity_stocking_uom: 1,
                manufacturing_number: 'MPN7PK1781',
                package_weight: '800',
                package_length: '100.00',
                package_height: '300.00',
                package_width: '200.00',
                package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
                barcode: '5012345678900',
                description: 'Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.\n\nDi iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.',
                variant_count: 2,
                variant_matrix: [
                    'phone_color',
                    'phone_storage'
                ],
                specifications: [
                    {
                        attribute_id: 3,
                        attribute_code: 'phone_os',
                        attribute_code_label: 'Sistem Operasi',
                        attribute_type: 'dropdown',
                        attribute_value_id: 5,
                        attribute_value_label: 'iOS',
                        attribute_status: 'clear'
                    },
                    {
                        attribute_id: 4,
                        attribute_code: 'phone_display',
                        attribute_code_label: 'Layar',
                        attribute_type: 'textinput',
                        attribute_textinput: 'Super AMOLED capacitive touchscreen, 16M colors',
                        attribute_status: 'clear'
                    }
                ],
                category: {
                    c0: 8,
                    c1: 52,
                    c2: 219,
                    c3: 561
                },
                specification_status: 'clear'
            },
            premoderation_status: 'need_revision',
            vendor_id: 3,
            user: {
                id: 3,
                name: 'Bambang Widodo',
                email: 'vendor2@test.com',
                type: 'vendor'
            },
            created_at: '2018-01-16T06:25:54.745Z',
            updated_at: '2018-01-16T06:25:54.745Z',
            product_group_id: 2,
            c0: {
                id: 8,
                name: 'IT and Mobile Devices',
                level: 'C0',
                base_margin: null,
                commission: null,
                unspsc: 43000000,
                sequence: 1,
                parent_id: null,
                is_active: 1,
                created_at: '2017-12-18T06:32:18.000Z',
                updated_at: '2017-12-18T06:32:18.000Z'
            },
            c1: {
                id: 52,
                name: 'Communications Devices & Accessories',
                level: 'C1',
                base_margin: null,
                commission: null,
                unspsc: 43190000,
                sequence: 1,
                parent_id: 8,
                is_active: 1,
                created_at: '2017-12-18T06:32:18.000Z',
                updated_at: '2017-12-18T06:32:18.000Z'
            },
            c2: {
                id: 219,
                name: 'Personal communication devices',
                level: 'C2',
                base_margin: null,
                commission: null,
                unspsc: 43191500,
                sequence: 1,
                parent_id: 52,
                is_active: 1,
                created_at: '2017-12-18T06:32:18.000Z',
                updated_at: '2017-12-18T06:32:18.000Z'
            },
            c3: {
                id: 561,
                name: 'Mobile phones',
                level: 'C3',
                base_margin: null,
                commission: null,
                unspsc: 43191501,
                sequence: 1,
                parent_id: 219,
                is_active: 1,
                created_at: '2017-12-18T06:32:18.000Z',
                updated_at: '2017-12-18T06:32:18.000Z'
            }
        }
    ]);
    t.context.sandbox.stub(PremoderationRepository, 'count').resolves(1);
    const ids = t.context.sandbox.stub(PremoderationRepository, 'findDistinctData');
    ids.onCall(0).resolves(resIdsBrand);
    ids.onCall(1).resolves(resIdsCategory);
    t.context.sandbox.stub(PremoderationRepository, 'countAllPremoderationStatus').resolves([
        {
            status: ['need_revision'],
            count: 1
        }
    ]);
    t.context.sandbox.stub(CategoryRepository, 'findOne').resolves({
        id: 8,
        name: 'IT and Mobile Devices',
        level: 'C0',
        base_margin: null,
        commission: null,
        unspsc: 43000000,
        sequence: 1,
        parent_id: null,
        is_active: 1,
        created_at: '2017-12-18T06:32:18.000Z',
        updated_at: '2017-12-18T06:32:18.000Z'
    });
    t.context.sandbox.stub(CategoryRepository, 'findAll').resolves([
        {
            id: 8,
            name: 'IT and Mobile Devices',
            level: 'C0',
            base_margin: null,
            commission: null,
            unspsc: 43000000,
            sequence: 1,
            parent_id: null,
            is_active: 1,
            created_at: '2017-12-18T06:32:18.000Z',
            updated_at: '2017-12-18T06:32:18.000Z'
        }
    ]);
    t.context.sandbox.stub(BrandRepository, 'findAll').resolves([
        {
            id: 81,
            name: 'Apple',
            image_url: null,
            created_at: '2017-11-28T14:54:10.000Z',
            updated_at: '2017-11-28T14:54:10.000Z'
        }
    ]);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3'
            },
            query: {
                search: '',
                c0: '',
                brand: '',
                status: 'need_revision',
                sort: 'created_at_desc',
                page: 1,
                limit: 20
            }
        };

        const result = yield Methods.getPremoderation(data, context);
        const expected = {
            data: [
                {
                    id: '1516083954744',
                    name: 'Apple iPhone 7',
                    product_group_id: 2,
                    variants: [
                        'Gold - 64GB',
                        'Green - 64GB'
                    ],
                    categories: {
                        C0: {
                            id: 8,
                            name: 'IT and Mobile Devices',
                            unspsc: 43000000
                        }
                    },
                    status: 'need_revision',
                    created_by: 3,
                    created_at: '2018-01-16T06:25:54.745Z',
                    updated_at: '2018-01-16T06:25:54.745Z',
                    rejected_at: null
                }
            ],
            meta: {
                page: 1,
                limit: 20,
                total_data: 1,
                total_page: 1,
                total_need_revision: 1,
                total_revision_inprogress: 0,
                total_revision_complete: 0,
                total_rejected: 0,
                categories0: [
                    {
                        id: 8,
                        name: 'IT and Mobile Devices'
                    }
                ],
                brands: [
                    {
                        id: 81,
                        name: 'Apple'
                    }
                ]
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return authorized user', function* (t) {
    try {
        const context = {
            user: ''
        };
        const data = {
            path: {
                id: 1234
            },
            query: {
                search: '',
                c0: '',
                brand: '',
                status: 'revision_inprogress,revision_complete',
                sort: 'created_at_asc',
                page: 1,
                limit: 20
            }
        };

        yield Methods.getPremoderation(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, 'You are not authorized user');
    }
});

test.serial('Should be return Bad Request', function* (t) {
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3'
            },
            query: {
                search: '',
                c0: '',
                brand: '',
                status: 'revision_inprogress,revision_complete',
                sort: 'created_at_asc',
                page: -1,
                limit: 20
            }
        };

        yield Methods.getPremoderation(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
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

