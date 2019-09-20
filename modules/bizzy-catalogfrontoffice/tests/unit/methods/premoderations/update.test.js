'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const test = require('ava');
const sinon = require('sinon');
const RepoProductVendor = require('../../../../src/repositories/product_vendor');
const PremoderationRepository = require('../../../../src/repositories/premoderation');
const PremoderationLogRepository = require('../../../../src/repositories/premoderation_log');
const Method = require('../../../../src/methods/premoderations/update');


test.serial('Should be return product updated', function* (t) {
    t.context.sandbox.stub(RepoProductVendor, 'findOne').resolves(false);
    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves({
        _id: '5a4ddb608e16351613dfed29',
        id: '1514450425977',
        type: 'new',
        product_group_id: '2',
        payload: {
            name: 'Apple iPhone 7',
            category_id: '561',
            category: {
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 561
            },
            brand_id: '81',
            brand_status: 'clear',
            brand_name: '',
            brand_image: 'http://google.com',
            uom_id: '1',
            stocking_uom_id: '4',
            quantity_stocking_uom: '1',
            manufacturing_number: 'AP89232423434',
            package_weight: '180',
            package_length: '19',
            package_height: '10',
            package_width: '5',
            package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
            barcode: '924234324',
            description: 'Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.Di iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menanganihingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga70 persen dibandingkan Fusion A10.',
            variant_count: '2',
            variant_matrix: [
                'phone_color',
                'phone_storage'
            ],
            specification_status: 'completed',
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
                    tier_min_qty_1: '10',
                    tier_min_qty_2: '20',
                    tier_min_qty_3: '30',
                    tier_cogs_price_1: '20000000',
                    tier_cogs_price_2: '19000000',
                    tier_cogs_price_3: '18000000',
                    stock: 15,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                    additional_image: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_link: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    is_decimal: 0,
                    indent_period: '',
                    indent_limit: '',
                    variant_status: 'pending',
                    is_contract: 0
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
                    tier_min_qty_1: '10',
                    tier_min_qty_2: '20',
                    tier_min_qty_3: '30',
                    tier_cogs_price_1: '20000000',
                    tier_cogs_price_2: '19500000',
                    tier_cogs_price_3: '18500000',
                    stock: 10,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                    additional_image: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_link: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    is_decimal: 0,
                    indent_period: '',
                    indent_limit: '',
                    variant_status: 'pending',
                    is_contract: 1
                }
            ]
        },
        premoderation_status: 'revision_inprogress',
        vendor_id: 3,
        created_by: 3,
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2018-01-18T07:35:04.825Z'
    });
    t.context.sandbox.stub(PremoderationRepository, 'update').resolves({
        ok: 1,
        nModified: 1,
        n: 1
    });
    t.context.sandbox.stub(PremoderationLogRepository, 'insertOne').resolves({
        ok: 1,
        n: 1
    });

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3',
                pid: '1514450425977'
            },
            body: {
                type: 'new',
                product_group_id: '',
                payload: {
                    name: 'Apple iPhone 7',
                    category_id: '561',
                    category: {
                        c0: 8,
                        c1: 52,
                        c2: 219,
                        c3: 561
                    },
                    brand_id: '81',
                    brand_status: 'clear',
                    brand_name: '',
                    brand_image: 'http://google.com',
                    uom_id: '1',
                    stocking_uom_id: '4',
                    quantity_stocking_uom: '1',
                    manufacturing_number: 'AP89232423434',
                    package_weight: '180',
                    package_length: '19',
                    package_height: '10',
                    package_width: '5',
                    package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
                    barcode: '924234324',
                    description: 'Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.Di iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.',
                    variant_count: '2',
                    variant_matrix: [
                        'phone_color',
                        'phone_storage'
                    ],
                    specification_status: 'completed',
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
                            tier_min_qty_1: '10',
                            tier_min_qty_2: '20',
                            tier_min_qty_3: '30',
                            tier_cogs_price_1: '20000000',
                            tier_cogs_price_2: '19000000',
                            tier_cogs_price_3: '18000000',
                            stock: '15',
                            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                            additional_image: [],
                            warehouse_id: '1',
                            location_label: 'Jakarta selatan',
                            reference_link: [
                                'https://en.wikipedia.org/wiki/IPhone_X'
                            ],
                            warranty_option: 'international',
                            warranty_period: 'week',
                            warranty_limit: '1',
                            warranty_coverage: '',
                            is_indent: 0,
                            is_decimal: 0,
                            down_payment_type: 0,
                            down_payment_value: 0,
                            indent_period: '',
                            indent_limit: '',
                            variant_status: 'pending',
                            is_contract: 0
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
                            tier_min_qty_1: '10',
                            tier_min_qty_2: '20',
                            tier_min_qty_3: '30',
                            tier_cogs_price_1: '20000000',
                            tier_cogs_price_2: '19500000',
                            tier_cogs_price_3: '18500000',
                            stock: '10',
                            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                            additional_image: [],
                            warehouse_id: '1',
                            location_label: 'Jakarta selatan',
                            reference_link: [
                                'https://en.wikipedia.org/wiki/IPhone_X'
                            ],
                            warranty_option: 'international',
                            warranty_period: 'week',
                            warranty_limit: '1',
                            warranty_coverage: '',
                            is_indent: 0,
                            is_decimal: 0,
                            down_payment_type: 0,
                            down_payment_value: 0,
                            indent_period: '',
                            indent_limit: '',
                            variant_status: 'pending',
                            is_contract: 1
                        }
                    ]
                }
            }
        };
        const result = yield Method.putPremoderation(data, context);
        const expected = {
            data: {
                id: '1514450425977',
                type: 'new',
                name: 'Apple iPhone 7',
                vendor_id: 3,
                premoderation_status: 'revision_inprogress'
            },
            message: 'Product berhasil diubah'
        };
        t.pass();
    } catch (err) {
        console.log(err);
    }
});

test.serial('Should be return failed: SKU can not empty', function* (t) {
    t.context.sandbox.stub(RepoProductVendor, 'findOne').resolves(false);
    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves({
        _id: '5a4ddb608e16351613dfed29',
        id: '1514450425977',
        type: 'new',
        product_group_id: '2',
        payload: {
            name: 'Apple iPhone 7',
            category_id: '561',
            category: {
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 561
            },
            brand_id: '81',
            brand_status: 'clear',
            brand_name: '',
            brand_image: 'http://google.com',
            uom_id: '1',
            stocking_uom_id: '4',
            quantity_stocking_uom: '1',
            manufacturing_number: 'AP89232423434',
            package_weight: '180',
            package_length: '19',
            package_height: '10',
            package_width: '5',
            package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
            barcode: '924234324',
            description: 'Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.Di iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menanganihingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga70 persen dibandingkan Fusion A10.',
            variant_count: '2',
            variant_matrix: [
                'phone_color',
                'phone_storage'
            ],
            specification_status: 'completed',
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
                    sku_vendor: '',
                    tier_min_qty_1: '10',
                    tier_min_qty_2: '20',
                    tier_min_qty_3: '30',
                    tier_cogs_price_1: '20000000',
                    tier_cogs_price_2: '19000000',
                    tier_cogs_price_3: '18000000',
                    stock: 15,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                    additional_image: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_link: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: '',
                    variant_status: 'pending',
                    is_contract: 0
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
                    tier_min_qty_1: '10',
                    tier_min_qty_2: '20',
                    tier_min_qty_3: '30',
                    tier_cogs_price_1: '20000000',
                    tier_cogs_price_2: '19500000',
                    tier_cogs_price_3: '18500000',
                    stock: 10,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                    additional_image: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_link: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: '',
                    variant_status: 'pending',
                    is_contract: 1
                }
            ]
        },
        premoderation_status: 'revision_inprogress',
        vendor_id: 3,
        created_by: 3,
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2018-01-18T07:35:04.825Z'
    });
    t.context.sandbox.stub(PremoderationRepository, 'update').resolves({
        ok: 1,
        nModified: 1,
        n: 1
    });
    t.context.sandbox.stub(PremoderationLogRepository, 'insertOne').resolves({
        ok: 1,
        n: 1
    });

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3',
                pid: '1514450425977'
            },
            body: {
                type: 'new',
                product_group_id: '',
                payload: {
                    name: 'Apple iPhone 7',
                    category_id: '561',
                    category: {
                        c0: 8,
                        c1: 52,
                        c2: 219,
                        c3: 561
                    },
                    brand_id: '81',
                    brand_status: 'clear',
                    brand_name: '',
                    brand_image: 'http://google.com',
                    uom_id: '1',
                    stocking_uom_id: '4',
                    quantity_stocking_uom: '1',
                    manufacturing_number: 'AP89232423434',
                    package_weight: '180',
                    package_length: '19',
                    package_height: '10',
                    package_width: '5',
                    package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
                    barcode: '924234324',
                    description: 'Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.Di iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.',
                    variant_count: '2',
                    variant_matrix: [
                        'phone_color',
                        'phone_storage'
                    ],
                    specification_status: 'completed',
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
                            tier_min_qty_1: '10',
                            tier_min_qty_2: '20',
                            tier_min_qty_3: '30',
                            tier_cogs_price_1: '20000000',
                            tier_cogs_price_2: '19000000',
                            tier_cogs_price_3: '18000000',
                            stock: '15',
                            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                            additional_image: [],
                            warehouse_id: '1',
                            location_label: 'Jakarta selatan',
                            reference_link: [
                                'https://en.wikipedia.org/wiki/IPhone_X'
                            ],
                            warranty_option: 'international',
                            warranty_period: 'week',
                            warranty_limit: '1',
                            warranty_coverage: '',
                            is_indent: 0,
                            indent_period: '',
                            indent_limit: '',
                            variant_status: 'pending',
                            is_contract: 0
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
                            sku_vendor: '',
                            tier_min_qty_1: '10',
                            tier_min_qty_2: '20',
                            tier_min_qty_3: '30',
                            tier_cogs_price_1: '20000000',
                            tier_cogs_price_2: '19500000',
                            tier_cogs_price_3: '18500000',
                            stock: '10',
                            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                            additional_image: [],
                            warehouse_id: '1',
                            location_label: 'Jakarta selatan',
                            reference_link: [
                                'https://en.wikipedia.org/wiki/IPhone_X'
                            ],
                            warranty_option: 'international',
                            warranty_period: 'week',
                            warranty_limit: '1',
                            warranty_coverage: '',
                            is_indent: 0,
                            indent_period: '',
                            indent_limit: '',
                            variant_status: 'pending',
                            is_contract: 1
                        }
                    ]
                }
            }
        };
        yield Method.putPremoderation(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Should be return failed: SKU cantains symbol', function* (t) {
    t.context.sandbox.stub(RepoProductVendor, 'findOne').resolves(false);
    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves({
        _id: '5a4ddb608e16351613dfed29',
        id: '1514450425977',
        type: 'new',
        product_group_id: '2',
        payload: {
            name: 'Apple iPhone 7',
            category_id: '561',
            category: {
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 561
            },
            brand_id: '81',
            brand_status: 'clear',
            brand_name: '',
            brand_image: 'http://google.com',
            uom_id: '1',
            stocking_uom_id: '4',
            quantity_stocking_uom: '1',
            manufacturing_number: 'AP89232423434',
            package_weight: '180',
            package_length: '19',
            package_height: '10',
            package_width: '5',
            package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
            barcode: '924234324',
            description: 'Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.Di iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menanganihingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga70 persen dibandingkan Fusion A10.',
            variant_count: '2',
            variant_matrix: [
                'phone_color',
                'phone_storage'
            ],
            specification_status: 'completed',
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
                    sku_vendor: 'dsaf!',
                    tier_min_qty_1: '10',
                    tier_min_qty_2: '20',
                    tier_min_qty_3: '30',
                    tier_cogs_price_1: '20000000',
                    tier_cogs_price_2: '19000000',
                    tier_cogs_price_3: '18000000',
                    stock: 15,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                    additional_image: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_link: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: '',
                    variant_status: 'pending',
                    is_contract: 0
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
                    tier_min_qty_1: '10',
                    tier_min_qty_2: '20',
                    tier_min_qty_3: '30',
                    tier_cogs_price_1: '20000000',
                    tier_cogs_price_2: '19500000',
                    tier_cogs_price_3: '18500000',
                    stock: 10,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                    additional_image: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_link: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: '',
                    variant_status: 'pending',
                    is_contract: 1
                }
            ]
        },
        premoderation_status: 'revision_inprogress',
        vendor_id: 3,
        created_by: 3,
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2018-01-18T07:35:04.825Z'
    });
    t.context.sandbox.stub(PremoderationRepository, 'update').resolves({
        ok: 1,
        nModified: 1,
        n: 1
    });
    t.context.sandbox.stub(PremoderationLogRepository, 'insertOne').resolves({
        ok: 1,
        n: 1
    });

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3',
                pid: '1514450425977'
            },
            body: {
                type: 'new',
                product_group_id: '',
                payload: {
                    name: 'Apple iPhone 7',
                    category_id: '561',
                    category: {
                        c0: 8,
                        c1: 52,
                        c2: 219,
                        c3: 561
                    },
                    brand_id: '81',
                    brand_status: 'clear',
                    brand_name: '',
                    brand_image: 'http://google.com',
                    uom_id: '1',
                    stocking_uom_id: '4',
                    quantity_stocking_uom: '1',
                    manufacturing_number: 'AP89232423434',
                    package_weight: '180',
                    package_length: '19',
                    package_height: '10',
                    package_width: '5',
                    package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
                    barcode: '924234324',
                    description: 'Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.Di iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.',
                    variant_count: '2',
                    variant_matrix: [
                        'phone_color',
                        'phone_storage'
                    ],
                    specification_status: 'completed',
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
                            sku_vendor: 'X11!@!1',
                            tier_min_qty_1: '10',
                            tier_min_qty_2: '20',
                            tier_min_qty_3: '30',
                            tier_cogs_price_1: '20000000',
                            tier_cogs_price_2: '19000000',
                            tier_cogs_price_3: '18000000',
                            stock: '15',
                            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                            additional_image: [],
                            warehouse_id: '1',
                            location_label: 'Jakarta selatan',
                            reference_link: [
                                'https://en.wikipedia.org/wiki/IPhone_X'
                            ],
                            warranty_option: 'international',
                            warranty_period: 'week',
                            warranty_limit: '1',
                            warranty_coverage: '',
                            is_indent: 0,
                            indent_period: '',
                            indent_limit: '',
                            variant_status: 'pending',
                            is_contract: 0
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
                            tier_min_qty_1: '10',
                            tier_min_qty_2: '20',
                            tier_min_qty_3: '30',
                            tier_cogs_price_1: '20000000',
                            tier_cogs_price_2: '19500000',
                            tier_cogs_price_3: '18500000',
                            stock: '10',
                            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                            additional_image: [],
                            warehouse_id: '1',
                            location_label: 'Jakarta selatan',
                            reference_link: [
                                'https://en.wikipedia.org/wiki/IPhone_X'
                            ],
                            warranty_option: 'international',
                            warranty_period: 'week',
                            warranty_limit: '1',
                            warranty_coverage: '',
                            is_indent: 0,
                            indent_period: '',
                            indent_limit: '',
                            variant_status: 'pending',
                            is_contract: 1
                        }
                    ]
                }
            }
        };
        const result = yield Method.putPremoderation(data, context);
        const expected = {
            data: {
                id: '1514450425977',
                type: 'new',
                name: 'Apple iPhone 7',
                vendor_id: 3,
                premoderation_status: 'revision_inprogress'
            },
            message: 'Product berhasil diubah'
        };
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Should be return failed: SKU already used', function* (t) {
    t.context.sandbox.stub(RepoProductVendor, 'findOne').resolves(true);
    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves({
        _id: '5a4ddb608e16351613dfed29',
        id: '1514450425977',
        type: 'new',
        product_group_id: '2',
        payload: {
            name: 'Apple iPhone 7',
            category_id: '561',
            category: {
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 561
            },
            brand_id: '81',
            brand_status: 'clear',
            brand_name: '',
            brand_image: 'http://google.com',
            uom_id: '1',
            stocking_uom_id: '4',
            quantity_stocking_uom: '1',
            manufacturing_number: 'AP89232423434',
            package_weight: '180',
            package_length: '19',
            package_height: '10',
            package_width: '5',
            package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
            barcode: '924234324',
            description: 'Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.Di iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menanganihingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga70 persen dibandingkan Fusion A10.',
            variant_count: '2',
            variant_matrix: [
                'phone_color',
                'phone_storage'
            ],
            specification_status: 'completed',
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
                    sku_vendor: 'dsasd',
                    tier_min_qty_1: '10',
                    tier_min_qty_2: '20',
                    tier_min_qty_3: '30',
                    tier_cogs_price_1: '20000000',
                    tier_cogs_price_2: '19000000',
                    tier_cogs_price_3: '18000000',
                    stock: 15,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                    additional_image: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_link: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: '',
                    variant_status: 'pending',
                    is_contract: 0
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
                    tier_min_qty_1: '10',
                    tier_min_qty_2: '20',
                    tier_min_qty_3: '30',
                    tier_cogs_price_1: '20000000',
                    tier_cogs_price_2: '19500000',
                    tier_cogs_price_3: '18500000',
                    stock: 10,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                    additional_image: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_link: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: '',
                    variant_status: 'pending',
                    is_contract: 1
                }
            ]
        },
        premoderation_status: 'revision_inprogress',
        vendor_id: 3,
        created_by: 3,
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2018-01-18T07:35:04.825Z'
    });
    t.context.sandbox.stub(PremoderationRepository, 'update').resolves({
        ok: 1,
        nModified: 1,
        n: 1
    });
    t.context.sandbox.stub(PremoderationLogRepository, 'insertOne').resolves({
        ok: 1,
        n: 1
    });

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3',
                pid: '1514450425977'
            },
            body: {
                type: 'new',
                product_group_id: '',
                payload: {
                    name: 'Apple iPhone 7',
                    category_id: '561',
                    category: {
                        c0: 8,
                        c1: 52,
                        c2: 219,
                        c3: 561
                    },
                    brand_id: '81',
                    brand_status: 'clear',
                    brand_name: '',
                    brand_image: 'http://google.com',
                    uom_id: '1',
                    stocking_uom_id: '4',
                    quantity_stocking_uom: '1',
                    manufacturing_number: 'AP89232423434',
                    package_weight: '180',
                    package_length: '19',
                    package_height: '10',
                    package_width: '5',
                    package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
                    barcode: '924234324',
                    description: 'Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.Di iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.',
                    variant_count: '2',
                    variant_matrix: [
                        'phone_color',
                        'phone_storage'
                    ],
                    specification_status: 'completed',
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
                            tier_min_qty_1: '10',
                            tier_min_qty_2: '20',
                            tier_min_qty_3: '30',
                            tier_cogs_price_1: '20000000',
                            tier_cogs_price_2: '19000000',
                            tier_cogs_price_3: '18000000',
                            stock: '15',
                            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                            additional_image: [],
                            warehouse_id: '1',
                            location_label: 'Jakarta selatan',
                            reference_link: [
                                'https://en.wikipedia.org/wiki/IPhone_X'
                            ],
                            warranty_option: 'international',
                            warranty_period: 'week',
                            warranty_limit: '1',
                            warranty_coverage: '',
                            is_indent: 0,
                            indent_period: '',
                            indent_limit: '',
                            variant_status: 'pending',
                            is_contract: 0
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
                            tier_min_qty_1: '10',
                            tier_min_qty_2: '20',
                            tier_min_qty_3: '30',
                            tier_cogs_price_1: '20000000',
                            tier_cogs_price_2: '19500000',
                            tier_cogs_price_3: '18500000',
                            stock: '10',
                            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                            additional_image: [],
                            warehouse_id: '1',
                            location_label: 'Jakarta selatan',
                            reference_link: [
                                'https://en.wikipedia.org/wiki/IPhone_X'
                            ],
                            warranty_option: 'international',
                            warranty_period: 'week',
                            warranty_limit: '1',
                            warranty_coverage: '',
                            is_indent: 0,
                            indent_period: '',
                            indent_limit: '',
                            variant_status: 'pending',
                            is_contract: 1
                        }
                    ]
                }
            }
        };
        const result = yield Method.putPremoderation(data, context);
        const expected = {
            data: {
                id: '1514450425977',
                type: 'new',
                name: 'Apple iPhone 7',
                vendor_id: 3,
                premoderation_status: 'revision_inprogress'
            },
            message: 'Product berhasil diubah'
        };
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Update failed: Should be return BizzyError.BadRequest', function* (t) {
    t.context.sandbox.stub(RepoProductVendor, 'findOne').resolves(false);
    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves({
        _id: '5a4ddb608e16351613dfed29',
        id: '1514450425977',
        type: 'new',
        product_group_id: '2',
        payload: {
            name: 'Apple iPhone 7',
            category_id: '561',
            category: {
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 561
            },
            brand_id: '81',
            brand_status: 'clear',
            brand_name: '',
            brand_image: 'http://google.com',
            uom_id: '1',
            stocking_uom_id: '4',
            quantity_stocking_uom: '1',
            manufacturing_number: 'AP89232423434',
            package_weight: '180',
            package_length: '19',
            package_height: '10',
            package_width: '5',
            package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
            barcode: '924234324',
            description: 'Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.Di iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menanganihingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga70 persen dibandingkan Fusion A10.',
            variant_count: '2',
            variant_matrix: [
                'phone_color',
                'phone_storage'
            ],
            specification_status: 'completed',
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
                    tier_min_qty_1: '10',
                    tier_min_qty_2: '20',
                    tier_min_qty_3: '30',
                    tier_cogs_price_1: '20000000',
                    tier_cogs_price_2: '19000000',
                    tier_cogs_price_3: '18000000',
                    stock: 15,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                    additional_image: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_link: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: '',
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
                    tier_min_qty_1: '10',
                    tier_min_qty_2: '20',
                    tier_min_qty_3: '30',
                    tier_cogs_price_1: '20000000',
                    tier_cogs_price_2: '19500000',
                    tier_cogs_price_3: '18500000',
                    stock: 10,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                    additional_image: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_link: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: '',
                    variant_status: 'pending'
                }
            ]
        },
        premoderation_status: 'revision_inprogress',
        vendor_id: 3,
        created_by: 3,
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2018-01-18T07:35:04.825Z'
    });
    t.context.sandbox.stub(PremoderationRepository, 'update').resolves(false);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3',
                pid: '1514450425977'
            },
            body: {
                type: 'new',
                product_group_id: '2',
                payload: {
                    name: 'Apple iPhone 7',
                    category_id: '561',
                    category: {
                        c0: 8,
                        c1: 52,
                        c2: 219,
                        c3: 561
                    },
                    brand_id: '81',
                    brand_status: 'clear',
                    brand_name: '',
                    brand_image: 'http://google.com',
                    uom_id: '1',
                    stocking_uom_id: '4',
                    quantity_stocking_uom: '1',
                    manufacturing_number: 'AP89232423434',
                    package_weight: '180',
                    package_length: '19',
                    package_height: '10',
                    package_width: '5',
                    package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
                    barcode: '924234324',
                    description: 'Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.Di iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.',
                    variant_count: '2',
                    variant_matrix: [
                        'phone_color',
                        'phone_storage'
                    ],
                    specification_status: 'completed',
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
                            tier_min_qty_1: '10',
                            tier_min_qty_2: '20',
                            tier_min_qty_3: '30',
                            tier_cogs_price_1: '20000000',
                            tier_cogs_price_2: '19000000',
                            tier_cogs_price_3: '18000000',
                            stock: '15',
                            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                            additional_image: [],
                            warehouse_id: '1',
                            location_label: 'Jakarta selatan',
                            reference_link: [
                                'https://en.wikipedia.org/wiki/IPhone_X'
                            ],
                            warranty_option: 'international',
                            warranty_period: 'week',
                            warranty_limit: '1',
                            warranty_coverage: '',
                            is_indent: 0,
                            indent_period: '',
                            indent_limit: '',
                            variant_status: 'pending',
                            is_contract: 0
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
                            tier_min_qty_1: '10',
                            tier_min_qty_2: '20',
                            tier_min_qty_3: '30',
                            tier_cogs_price_1: '20000000',
                            tier_cogs_price_2: '19500000',
                            tier_cogs_price_3: '18500000',
                            stock: '10',
                            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                            additional_image: [],
                            warehouse_id: '1',
                            location_label: 'Jakarta selatan',
                            reference_link: [
                                'https://en.wikipedia.org/wiki/IPhone_X'
                            ],
                            warranty_option: 'international',
                            warranty_period: 'week',
                            warranty_limit: '1',
                            warranty_coverage: '',
                            is_indent: 0,
                            indent_period: '',
                            indent_limit: '',
                            variant_status: 'pending',
                            is_contract: 1
                        }
                    ]
                }
            }
        };

        yield Method.putPremoderation(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Premoderation data can not be processed: Should be return BizzyError.BadRequest', function* (t) {
    t.context.sandbox.stub(RepoProductVendor, 'findOne').resolves(false);
    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves({
        _id: '5a4ddb608e16351613dfed29',
        id: '1514450425977',
        type: 'new',
        product_group_id: '2',
        payload: {
            name: 'Apple iPhone 7',
            category_id: '561',
            category: {
                c0: 8,
                c1: 52,
                c2: 219,
                c3: 561
            },
            brand_id: '81',
            brand_status: 'clear',
            brand_name: '',
            brand_image: 'http://google.com',
            uom_id: '1',
            stocking_uom_id: '4',
            quantity_stocking_uom: '1',
            manufacturing_number: 'AP89232423434',
            package_weight: '180',
            package_length: '19',
            package_height: '10',
            package_width: '5',
            package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
            barcode: '924234324',
            description: 'Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.Di iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menanganihingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga70 persen dibandingkan Fusion A10.',
            variant_count: '2',
            variant_matrix: [
                'phone_color',
                'phone_storage'
            ],
            specification_status: 'completed',
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
                    tier_min_qty_1: '10',
                    tier_min_qty_2: '20',
                    tier_min_qty_3: '30',
                    tier_cogs_price_1: '20000000',
                    tier_cogs_price_2: '19000000',
                    tier_cogs_price_3: '18000000',
                    stock: 15,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                    additional_image: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_link: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: '',
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
                    tier_min_qty_1: '10',
                    tier_min_qty_2: '20',
                    tier_min_qty_3: '30',
                    tier_cogs_price_1: '20000000',
                    tier_cogs_price_2: '19500000',
                    tier_cogs_price_3: '18500000',
                    stock: 10,
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                    additional_image: [],
                    warehouse_id: 1,
                    location_label: 'Jakarta selatan',
                    reference_link: [
                        'https://en.wikipedia.org/wiki/IPhone_X'
                    ],
                    warranty_option: 'international',
                    warranty_period: 'week',
                    warranty_limit: 1,
                    is_indent: 0,
                    indent_period: '',
                    indent_limit: '',
                    variant_status: 'pending'
                }
            ]
        },
        premoderation_status: 'need_revision',
        vendor_id: 3,
        created_by: 3,
        created_at: '2017-12-28T08:40:25.982Z',
        updated_at: '2018-01-18T07:35:04.825Z'
    });
    t.context.sandbox.stub(PremoderationLogRepository, 'insertOne').resolves({
        ok: 1,
        n: 1
    });

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3',
                pid: '1514450425977'
            },
            body: {
                type: 'new',
                product_group_id: '2',
                payload: {
                    name: 'Apple iPhone 7',
                    category_id: '561',
                    category: {
                        c0: 8,
                        c1: 52,
                        c2: 219,
                        c3: 561
                    },
                    brand_id: '81',
                    brand_status: 'clear',
                    brand_name: '',
                    brand_image: 'http://google.com',
                    uom_id: '1',
                    stocking_uom_id: '4',
                    quantity_stocking_uom: '1',
                    manufacturing_number: 'AP89232423434',
                    package_weight: '180',
                    package_length: '19',
                    package_height: '10',
                    package_width: '5',
                    package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
                    barcode: '924234324',
                    description: 'Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.Di iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.',
                    variant_count: '2',
                    variant_matrix: [
                        'phone_color',
                        'phone_storage'
                    ],
                    specification_status: 'completed',
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
                            tier_min_qty_1: '10',
                            tier_min_qty_2: '20',
                            tier_min_qty_3: '30',
                            tier_cogs_price_1: '20000000',
                            tier_cogs_price_2: '19000000',
                            tier_cogs_price_3: '18000000',
                            stock: '15',
                            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                            additional_image: [],
                            warehouse_id: '1',
                            location_label: 'Jakarta selatan',
                            reference_link: [
                                'https://en.wikipedia.org/wiki/IPhone_X'
                            ],
                            warranty_option: 'international',
                            warranty_period: 'week',
                            warranty_limit: '1',
                            warranty_coverage: '',
                            is_indent: 0,
                            indent_period: '',
                            indent_limit: '',
                            variant_status: 'pending',
                            is_contract: 1
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
                            tier_min_qty_1: '10',
                            tier_min_qty_2: '20',
                            tier_min_qty_3: '30',
                            tier_cogs_price_1: '20000000',
                            tier_cogs_price_2: '19500000',
                            tier_cogs_price_3: '18500000',
                            stock: '10',
                            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                            additional_image: [],
                            warehouse_id: '1',
                            location_label: 'Jakarta selatan',
                            reference_link: [
                                'https://en.wikipedia.org/wiki/IPhone_X'
                            ],
                            warranty_option: 'international',
                            warranty_period: 'week',
                            warranty_limit: '1',
                            warranty_coverage: '',
                            is_indent: 0,
                            indent_period: '',
                            indent_limit: '',
                            variant_status: 'pending',
                            is_contract: 1
                        }
                    ]
                }
            }
        };

        yield Method.putPremoderation(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Premoderation data is not found: Should be return BizzyError.NotFound', function* (t) {
    t.context.sandbox.stub(RepoProductVendor, 'findOne').resolves(false);
    t.context.sandbox.stub(PremoderationRepository, 'findOne').resolves(null);

    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3',
                pid: '1514450425977'
            },
            body: {
                type: 'new',
                product_group_id: '2',
                payload: {
                    name: 'Apple iPhone 7',
                    category_id: '561',
                    category: {
                        c0: 8,
                        c1: 52,
                        c2: 219,
                        c3: 561
                    },
                    brand_id: '81',
                    brand_status: 'clear',
                    brand_name: '',
                    brand_image: 'http://google.com',
                    uom_id: '1',
                    stocking_uom_id: '4',
                    quantity_stocking_uom: '1',
                    manufacturing_number: 'AP89232423434',
                    package_weight: '180',
                    package_length: '19',
                    package_height: '10',
                    package_width: '5',
                    package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
                    barcode: '924234324',
                    description: 'Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.Di iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.',
                    variant_count: '2',
                    variant_matrix: [
                        'phone_color',
                        'phone_storage'
                    ],
                    specification_status: 'completed',
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
                            tier_min_qty_1: '10',
                            tier_min_qty_2: '20',
                            tier_min_qty_3: '30',
                            tier_cogs_price_1: '20000000',
                            tier_cogs_price_2: '19000000',
                            tier_cogs_price_3: '18000000',
                            stock: '15',
                            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                            additional_image: [],
                            warehouse_id: '1',
                            location_label: 'Jakarta selatan',
                            reference_link: [
                                'https://en.wikipedia.org/wiki/IPhone_X'
                            ],
                            warranty_option: 'international',
                            warranty_period: 'week',
                            warranty_limit: '1',
                            warranty_coverage: '',
                            is_indent: 0,
                            indent_period: '',
                            is_decimal: 0,
                            down_payment_type: 0,
                            down_payment_value: 0,
                            indent_limit: '',
                            variant_status: 'pending',
                            is_contract: 0
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
                            tier_min_qty_1: '10',
                            tier_min_qty_2: '20',
                            tier_min_qty_3: '30',
                            tier_cogs_price_1: '20000000',
                            tier_cogs_price_2: '19500000',
                            tier_cogs_price_3: '18500000',
                            stock: '10',
                            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                            additional_image: [],
                            warehouse_id: '1',
                            location_label: 'Jakarta selatan',
                            reference_link: [
                                'https://en.wikipedia.org/wiki/IPhone_X'
                            ],
                            warranty_option: 'international',
                            warranty_period: 'week',
                            warranty_limit: '1',
                            warranty_coverage: '',
                            is_indent: 0,
                            indent_period: '',
                            is_decimal: 0,
                            down_payment_type: 0,
                            down_payment_value: 0,
                            indent_limit: '',
                            variant_status: 'pending',
                            is_contract: 1
                        }
                    ]
                }
            }
        };

        yield Method.putPremoderation(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, err.message);
    }
});

test.serial('Invalid Context: Should be return Forbidden', function* (t) {
    try {
        const context = { user: '' };
        const data = {
            path: {
                id: '3',
                pid: '1514450425977'
            },
            body: {
                type: 'new',
                product_group_id: '2',
                payload: {
                    name: 'Apple iPhone 7',
                    category_id: '561',
                    category: {
                        c0: 8,
                        c1: 52,
                        c2: 219,
                        c3: 561
                    },
                    brand_id: '81',
                    brand_status: 'clear',
                    brand_name: '',
                    brand_image: 'http://google.com',
                    uom_id: '1',
                    stocking_uom_id: '4',
                    quantity_stocking_uom: '1',
                    manufacturing_number: 'AP89232423434',
                    package_weight: '180',
                    package_length: '19',
                    package_height: '10',
                    package_width: '5',
                    package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
                    barcode: '924234324',
                    description: 'Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.Di iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.',
                    variant_count: '2',
                    variant_matrix: [
                        'phone_color',
                        'phone_storage'
                    ],
                    specification_status: 'completed',
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
                            tier_min_qty_1: '10',
                            tier_min_qty_2: '20',
                            tier_min_qty_3: '30',
                            tier_cogs_price_1: '20000000',
                            tier_cogs_price_2: '19000000',
                            tier_cogs_price_3: '18000000',
                            stock: '15',
                            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                            additional_image: [],
                            warehouse_id: '1',
                            location_label: 'Jakarta selatan',
                            reference_link: [
                                'https://en.wikipedia.org/wiki/IPhone_X'
                            ],
                            warranty_option: 'international',
                            warranty_period: 'week',
                            warranty_limit: '1',
                            warranty_coverage: '',
                            is_indent: 0,
                            indent_period: '',
                            indent_limit: '',
                            variant_status: 'pending',
                            is_contract: 0
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
                            tier_min_qty_1: '10',
                            tier_min_qty_2: '20',
                            tier_min_qty_3: '30',
                            tier_cogs_price_1: '20000000',
                            tier_cogs_price_2: '19500000',
                            tier_cogs_price_3: '18500000',
                            stock: '10',
                            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                            additional_image: [],
                            warehouse_id: '1',
                            location_label: 'Jakarta selatan',
                            reference_link: [
                                'https://en.wikipedia.org/wiki/IPhone_X'
                            ],
                            warranty_option: 'international',
                            warranty_period: 'week',
                            warranty_limit: '1',
                            warranty_coverage: '',
                            is_indent: 0,
                            indent_period: '',
                            indent_limit: '',
                            variant_status: 'pending',
                            is_contract: 1
                        }
                    ]
                }
            }
        };

        yield Method.putPremoderation(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden, err.message);
    }
});

test.serial('Invalid Params: Should Throw BizzyError BadRequest', function* (t) {
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: '3',
                pid: ''
            },
            body: {
                type: 'new',
                product_group_id: '2',
                payload: {
                    name: 'Apple iPhone 7',
                    category_id: '561',
                    category: {
                        c0: 8,
                        c1: 52,
                        c2: 219,
                        c3: 561
                    },
                    brand_id: '81',
                    brand_status: 'clear',
                    brand_name: '',
                    brand_image: 'http://google.com',
                    uom_id: '1',
                    stocking_uom_id: '4',
                    quantity_stocking_uom: '1',
                    manufacturing_number: 'AP89232423434',
                    package_weight: '180',
                    package_length: '19',
                    package_height: '10',
                    package_width: '5',
                    package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
                    barcode: '924234324',
                    description: 'Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.Di iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.',
                    variant_count: '2',
                    variant_matrix: [
                        'phone_color',
                        'phone_storage'
                    ],
                    specification_status: 'completed',
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
                            tier_min_qty_1: '10',
                            tier_min_qty_2: '20',
                            tier_min_qty_3: '30',
                            tier_cogs_price_1: '20000000',
                            tier_cogs_price_2: '19000000',
                            tier_cogs_price_3: '18000000',
                            stock: '15',
                            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446297.jpg',
                            additional_image: [],
                            warehouse_id: '1',
                            location_label: 'Jakarta selatan',
                            reference_link: [
                                'https://en.wikipedia.org/wiki/IPhone_X'
                            ],
                            warranty_option: 'international',
                            warranty_period: 'week',
                            warranty_limit: '1',
                            warranty_coverage: '',
                            is_indent: 0,
                            indent_period: '',
                            indent_limit: '',
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
                            tier_min_qty_1: '10',
                            tier_min_qty_2: '20',
                            tier_min_qty_3: '30',
                            tier_cogs_price_1: '20000000',
                            tier_cogs_price_2: '19500000',
                            tier_cogs_price_3: '18500000',
                            stock: '10',
                            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2017/12/product_1514446306.jpg',
                            additional_image: [],
                            warehouse_id: '1',
                            location_label: 'Jakarta selatan',
                            reference_link: [
                                'https://en.wikipedia.org/wiki/IPhone_X'
                            ],
                            warranty_option: 'international',
                            warranty_period: 'week',
                            warranty_limit: '1',
                            warranty_coverage: '',
                            is_indent: 0,
                            indent_period: '',
                            indent_limit: '',
                            variant_status: 'pending'
                        }
                    ]
                }
            }
        };

        yield Method.putPremoderation(data, context);
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
