'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError, BizzyService } = require('bizzy-common');
const ProductVariantRepository = require('../../../../src/repositories/product_variant');
const ProductVendorRepository = require('../../../../src/repositories/product_vendor');
const ProductGroupRepository = require('../../../../src/repositories/product_group');
// const CustomeRepository = require('../../../../src/repositories/raw_query');
// const CategoryRepository = require('../../../../src/repositories/category');
// const BrandRepository = require('../../../../src/repositories/brand');
const StockingUomRepository = require('../../../../src/repositories/stocking_uom');
const UomRepository = require('../../../../src/repositories/uom');
// const SyncServiceRepository = require('../../../../src/repositories/sync_service');
const Methods = require('../../../../src/methods/sku-managements/detail_for_ecart');

test.serial('Should be return success', function* (t) {
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves({
        id: 4,
        product_group_id: 2,
        sku: 'WBQH1BWFAN',
        long_name: 'Apple iPhone 7 - Silver - 32GB',
        variant_value: '{"phone_color":1,"phone_storage":3}',
        primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516885661.jpg',
        additional_image: '["https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516885671.jpg","https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516885675.png"]',
        product_id_magento: null,
        product_id_netsuite: null,
        is_primary: 1,
        is_discontinue: 0,
        is_active: 1,
        created_at: '2018-01-18T07:20:05.000Z',
        updated_at: '2018-06-21T09:39:10.000Z'
    });
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves({
        id: 2,
        name: 'Apple iPhone 7',
        category_id: 561,
        brand_id: 81,
        uom_id: 1,
        stocking_uom_id: 1,
        quantity_stocking_uom: 1,
        manufacturing_number: 'MPN7PK1781',
        manufacturing_number_type: null,
        package_weight: 800,
        package_length: '13.83',
        package_width: '11.00',
        package_height: '9.00',
        package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
        barcode: '5012345678900',
        description: 'Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.\n\nDi iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.',
        primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        created_at: '2017-12-19T14:59:19.000Z',
        updated_at: '2018-06-21T09:39:45.000Z'
    });
    // t.context.sandbox.stub(CustomeRepository, 'findAllCategoryId').resolves([
    //     {
    //         c0: 8,
    //         c1: 52,
    //         c2: 219,
    //         c3: 561
    //     }
    // ]);
    t.context.sandbox.stub(ProductVendorRepository, 'findByVariantEcart').resolves([
        {
            id: 8,
            product_variant_id: 4,
            vendor_id: 3,
            warehouse_id: 3,
            location_label: 'Jawa Tengah',
            stock_available: 998,
            stock_used: 409,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 3,
            tier_min_qty_3: 5,
            tier_cogs_price_1: '11999000.00',
            tier_cogs_price_2: '11000000.00',
            tier_cogs_price_3: '10000000.00',
            warranty_option: 'distributor',
            warranty_period: 'week',
            warranty_limit: 1,
            warranty_coverage: 'All',
            indent_period: null,
            indent_limit: null,
            reference_link: '[]',
            sku_vendor: '28AKGEM32E',
            is_indent: 0,
            is_active: 1,
            created_by: 3,
            is_contract: 0,
            created_at: '2018-01-18T07:29:05.000Z',
            updated_at: '2018-07-05T10:50:07.000Z'
        },
        {
            id: 4,
            product_variant_id: 4,
            vendor_id: 2,
            warehouse_id: 2,
            location_label: 'Jakarta',
            stock_available: 9923,
            stock_used: 109,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 2,
            tier_min_qty_3: 3,
            tier_cogs_price_1: '12000000.00',
            tier_cogs_price_2: '11999000.00',
            tier_cogs_price_3: '11990000.00',
            warranty_option: 'international',
            warranty_period: 'year',
            warranty_limit: 1,
            warranty_coverage: '1',
            indent_period: null,
            indent_limit: null,
            reference_link: '[]',
            sku_vendor: 'F6MZM9LXDQ',
            is_indent: 0,
            is_active: 1,
            created_by: 2,
            is_contract: 0,
            created_at: '2018-01-18T07:20:05.000Z',
            updated_at: '2018-07-05T10:07:37.000Z'
        }
    ]);
    // t.context.sandbox.stub(BrandRepository, 'findById').resolves({
    //     id: 81,
    //     name: 'Apple',
    //     image_url: null,
    //     created_at: '2017-11-28T14:54:10.000Z',
    //     updated_at: '2017-11-28T14:54:10.000Z'
    // });
    t.context.sandbox.stub(UomRepository, 'findById').resolves({
        id: 1,
        name: 'Unit',
        created_at: '2017-12-05T16:59:10.000Z',
        updated_at: '2017-12-05T16:59:10.000Z'
    });

    t.context.sandbox.stub(StockingUomRepository, 'findById').resolves({
        id: 1,
        name: 'Dozeeen update',
        created_at: '2017-12-05T16:55:00.000Z',
        updated_at: '2018-01-24T08:48:07.000Z'
    });
    // const callback = t.context.sandbox.stub(CategoryRepository, 'findOne');
    // callback.onCall(0).resolves({
    //     id: 8,
    //     name: 'IT and Mobile Devices',
    //     level: 'C0',
    //     base_margin: null,
    //     commission: null,
    //     unspsc: 43000000,
    //     sequence: 1,
    //     parent_id: null,
    //     is_active: 1,
    //     created_at: '2017-12-18T06:32:18.000Z',
    //     updated_at: '2017-12-18T06:32:18.000Z'
    // });
    // callback.onCall(1).resolves({
    //     id: 52,
    //     name: 'Communications Devices & Accessories',
    //     level: 'C1',
    //     base_margin: null,
    //     commission: null,
    //     unspsc: 43190000,
    //     sequence: 1,
    //     parent_id: 8,
    //     is_active: 1,
    //     created_at: '2017-12-18T06:32:18.000Z',
    //     updated_at: '2017-12-18T06:32:18.000Z'
    // });
    // callback.onCall(2).resolves({
    //     id: 219,
    //     name: 'Personal communication devices',
    //     level: 'C2',
    //     base_margin: null,
    //     commission: null,
    //     unspsc: 43191500,
    //     sequence: 1,
    //     parent_id: 52,
    //     is_active: 1,
    //     created_at: '2017-12-18T06:32:18.000Z',
    //     updated_at: '2017-12-18T06:32:18.000Z'
    // });
    // callback.onCall(3).resolves({
    //     id: 561,
    //     name: 'Mobile phones',
    //     level: 'C3',
    //     base_margin: null,
    //     commission: null,
    //     unspsc: 43191501,
    //     sequence: 1,
    //     parent_id: 219,
    //     is_active: 1,
    //     created_at: '2017-12-18T06:32:18.000Z',
    //     updated_at: '2017-12-18T06:32:18.000Z'
    // });

    const callOther = t.context.sandbox.stub(BizzyService, 'callSync');
    callOther.onCall(0).resolves({
        data: [
            {
                id: 2,
                prefix: 'PT',
                name: 'Vendor Growth',
                suffix: 'Tbk',
                npwp: '521652651625615',
                status_pkp: 0,
                place: 'Abadi Tower',
                street: 'Jalan budi utomo no.39',
                phone: '62176767776',
                status: 3,
                trademark: 'Trademark',
                created_at: '2018-01-05T12:48:22.000Z',
                logo: 'https://bizzyx-growth-entity-pub-s3-staging.s3.amazonaws.com/pub_98f4491c-42b8-4bed-a024-e34e8396392e.png',
                geograph: {
                    id: 16014,
                    province: 'Jakarta',
                    city: 'Jakarta Selatan',
                    district: 'Jagakarsa',
                    village: 'Tanjung Barat',
                    zipcode: '12530',
                    geotag: '1006115105',
                    jnecitycode: 'CGK10201'
                },
                warehouse: [
                    2
                ]
            },
            {
                id: 3,
                prefix: 'PT',
                name: 'Vendor Jaya',
                suffix: '',
                npwp: '256156251652611',
                status_pkp: 1,
                place: 'Jaya Tower',
                street: 'Jalan budi jaya no.39',
                phone: '622168576712',
                status: 3,
                trademark: 'Vendor Jaya',
                created_at: '2018-01-05T12:53:17.000Z',
                logo: 'https://bizzyx-growth-entity-pub-s3-staging.s3.amazonaws.com/pub_5fdcd09c-d045-4c5b-9960-c5f2e8c1d1ce.jpeg',
                geograph: {
                    id: 14960,
                    province: 'Jakarta',
                    city: 'Jakarta Pusat',
                    district: 'Cempaka Putih',
                    village: 'Cempaka Putih Barat',
                    zipcode: '10520',
                    geotag: '1006115000',
                    jnecitycode: 'CGK10301'
                },
                warehouse: [
                    3
                ]
            }
        ],
        meta: {
            page: 1,
            limit: 50,
            total_data: 2,
            total_page: 1,
            filter: {
                is_vendor: 1,
                id: [
                    '2',
                    '3'
                ]
            }
        }
    });
    callOther.onCall(1).resolves([
        {
            id: 4,
            sku: 'WBQH1BWFAN',
            type: null,
            pricing_type: 'NONE',
            tier_data: [
                {
                    tier_min_qty_1: 1,
                    tier_cogs_1: 11999000,
                    tier_price_1: 14998750
                },
                {
                    tier_min_qty_2: 3,
                    tier_cogs_2: 11000000,
                    tier_price_2: 13750000
                },
                {
                    tier_min_qty_3: 5,
                    tier_cogs_3: 10000000,
                    tier_price_3: 12500000
                }
            ],
            cid: '72f0ed223c48f5443a4c7868099fe80c794ed798a5e94d9964bb17ceeae086b0b4d4138ba7ce522776bfae53adad688f2fb4a8698ecc4877f591adab06fe145c58c0887d390609387301923dafbb4dea36c5f93be1e0ce3b1991e21efbbd4f0f6c05afb7fa7824d18495469fdf064ebf',
            top_days: 30,
            is_franco: false,
            shipping: [],
            variable: {
                S: 0,
                COF: 1.5,
                salesAdjustment: 0,
                FF: 0,
                baseMargin: 10,
                topVendor: 30,
                topCustomer: 30,
                rebate: 10,
                topAdjustment: 0
            },
            vendor_id: '3',
            channel_type: 'QR'
        },
        {
            id: 4,
            sku: 'WBQH1BWFAN',
            type: null,
            pricing_type: 'NONE',
            tier_data: [
                {
                    tier_min_qty_1: 1,
                    tier_cogs_1: 12000000,
                    tier_price_1: 15288752
                },
                {
                    tier_min_qty_2: 2,
                    tier_cogs_2: 11999000,
                    tier_price_2: 15287478
                },
                {
                    tier_min_qty_3: 3,
                    tier_cogs_3: 11990000,
                    tier_price_3: 15276012
                }
            ],
            cid: '72f0ed223c48f5443a4c7868099fe80c2ed8ec8e4a575822632e207409155b77c96884d23b6ed4715abd479301c713d2fac008d2ad708b48c1793c155b5a9affdc2674811ed66a48a954535062a9d47a35b1ade8362ade5f13af3db8fb601a6befc4937090b98289306f3c2f21c05aae',
            top_days: 30,
            is_franco: false,
            shipping: [],
            variable: {
                S: 0,
                COF: 1.5,
                salesAdjustment: 0,
                FF: 0,
                baseMargin: 10,
                topVendor: 0,
                topCustomer: 30,
                rebate: 10,
                topAdjustment: 1.510925921727324
            },
            vendor_id: '2',
            channel_type: 'QR'
        }
    ]);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: 'WBQH1BWFAN'
            },
            query: {
                organization_id: 5
            }
        };
        const result = yield Methods.getSkuForEcart(data, context);
        const expected = {
            data: {
                id: 4,
                sku: 'WBQH1BWFAN',
                name: 'Apple iPhone 7 - Silver - 32GB',
                // brand: {
                //     id: 81,
                //     name: 'Apple'
                // },
                uom: {
                    id: 1,
                    name: 'Unit'
                },
                stocking_uom: {
                    id: 1,
                    name: 'Dozeeen update'
                },
                quantity_stocking_uom: 1,
                // categories: {
                //     c0: {
                //         id: 8,
                //         name: 'IT and Mobile Devices',
                //         unspsc: 43000000
                //     },
                //     c1: {
                //         id: 52,
                //         name: 'Communications Devices & Accessories',
                //         unspsc: 43190000
                //     },
                //     c2: {
                //         id: 219,
                //         name: 'Personal communication devices',
                //         unspsc: 43191500
                //     },
                //     c3: {
                //         id: 561,
                //         name: 'Mobile phones',
                //         unspsc: 43191501
                //     }
                // },
                barcode: '5012345678900',
                manufacturing_number: 'MPN7PK1781',
                package_weight: 800,
                package_length: 13.83,
                package_width: 11,
                package_height: 9,
                package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516885661.jpg',
                additional_image: [
                    'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516885671.jpg',
                    'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516885675.png'
                ],
                description: 'Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.\n\nDi iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.',
                product_group: {
                    id: 2,
                    name: 'Apple iPhone 7'
                },
                product_vendors: [
                    {
                        id: 8,
                        vendor_id: 3,
                        vendor_name: 'PT Vendor Jaya ',
                        warehouse_id: 3,
                        stock_available: 998,
                        currency: 'IDR',
                        tier_min_qty_1: 1,
                        tier_min_qty_2: 3,
                        tier_min_qty_3: 5,
                        tier_cogs_price_1: 11999000,
                        tier_cogs_price_2: 11000000,
                        tier_cogs_price_3: 10000000,
                        price_engine: {
                            id: 4,
                            sku: 'WBQH1BWFAN',
                            type: null,
                            pricing_type: 'NONE',
                            tier_data: [
                                {
                                    tier_min_qty_1: 1,
                                    tier_cogs_1: 11999000,
                                    tier_price_1: 14998750
                                },
                                {
                                    tier_min_qty_2: 3,
                                    tier_cogs_2: 11000000,
                                    tier_price_2: 13750000
                                },
                                {
                                    tier_min_qty_3: 5,
                                    tier_cogs_3: 10000000,
                                    tier_price_3: 12500000
                                }
                            ],
                            cid: '72f0ed223c48f5443a4c7868099fe80c794ed798a5e94d9964bb17ceeae086b0b4d4138ba7ce522776bfae53adad688f2fb4a8698ecc4877f591adab06fe145c58c0887d390609387301923dafbb4dea36c5f93be1e0ce3b1991e21efbbd4f0f6c05afb7fa7824d18495469fdf064ebf',
                            top_days: 30,
                            is_franco: false,
                            shipping: [],
                            variable: {
                                S: 0,
                                COF: 1.5,
                                salesAdjustment: 0,
                                FF: 0,
                                baseMargin: 10,
                                topVendor: 30,
                                topCustomer: 30,
                                rebate: 10,
                                topAdjustment: 0
                            },
                            vendor_id: '3',
                            channel_type: 'QR'
                        }
                    },
                    {
                        id: 4,
                        vendor_id: 2,
                        vendor_name: 'PT Vendor Growth Tbk',
                        warehouse_id: 2,
                        stock_available: 9923,
                        currency: 'IDR',
                        tier_min_qty_1: 1,
                        tier_min_qty_2: 2,
                        tier_min_qty_3: 3,
                        tier_cogs_price_1: 12000000,
                        tier_cogs_price_2: 11999000,
                        tier_cogs_price_3: 11990000,
                        price_engine: {
                            id: 4,
                            sku: 'WBQH1BWFAN',
                            type: null,
                            pricing_type: 'NONE',
                            tier_data: [
                                {
                                    tier_min_qty_1: 1,
                                    tier_cogs_1: 12000000,
                                    tier_price_1: 15288752
                                },
                                {
                                    tier_min_qty_2: 2,
                                    tier_cogs_2: 11999000,
                                    tier_price_2: 15287478
                                },
                                {
                                    tier_min_qty_3: 3,
                                    tier_cogs_3: 11990000,
                                    tier_price_3: 15276012
                                }
                            ],
                            cid: '72f0ed223c48f5443a4c7868099fe80c2ed8ec8e4a575822632e207409155b77c96884d23b6ed4715abd479301c713d2fac008d2ad708b48c1793c155b5a9affdc2674811ed66a48a954535062a9d47a35b1ade8362ade5f13af3db8fb601a6befc4937090b98289306f3c2f21c05aae',
                            top_days: 30,
                            is_franco: false,
                            shipping: [],
                            variable: {
                                S: 0,
                                COF: 1.5,
                                salesAdjustment: 0,
                                FF: 0,
                                baseMargin: 10,
                                topVendor: 0,
                                topCustomer: 30,
                                rebate: 10,
                                topAdjustment: 1.510925921727324
                            },
                            vendor_id: '2',
                            channel_type: 'QR'
                        }
                    }
                ],
                cheapest: {
                    id: 8,
                    vendor_id: 3,
                    vendor_name: 'PT Vendor Jaya ',
                    warehouse_id: 3,
                    stock_available: 998,
                    currency: 'IDR',
                    tier_min_qty_1: 1,
                    tier_min_qty_2: 3,
                    tier_min_qty_3: 5,
                    tier_cogs_price_1: 11999000,
                    tier_cogs_price_2: 11000000,
                    tier_cogs_price_3: 10000000,
                    price_engine: {
                        id: 4,
                        sku: 'WBQH1BWFAN',
                        type: null,
                        pricing_type: 'NONE',
                        tier_data: [
                            {
                                tier_min_qty_1: 1,
                                tier_cogs_1: 11999000,
                                tier_price_1: 14998750
                            },
                            {
                                tier_min_qty_2: 3,
                                tier_cogs_2: 11000000,
                                tier_price_2: 13750000
                            },
                            {
                                tier_min_qty_3: 5,
                                tier_cogs_3: 10000000,
                                tier_price_3: 12500000
                            }
                        ],
                        cid: '72f0ed223c48f5443a4c7868099fe80c794ed798a5e94d9964bb17ceeae086b0b4d4138ba7ce522776bfae53adad688f2fb4a8698ecc4877f591adab06fe145c58c0887d390609387301923dafbb4dea36c5f93be1e0ce3b1991e21efbbd4f0f6c05afb7fa7824d18495469fdf064ebf',
                        top_days: 30,
                        is_franco: false,
                        shipping: [],
                        variable: {
                            S: 0,
                            COF: 1.5,
                            salesAdjustment: 0,
                            FF: 0,
                            baseMargin: 10,
                            topVendor: 30,
                            topCustomer: 30,
                            rebate: 10,
                            topAdjustment: 0
                        },
                        vendor_id: '3',
                        channel_type: 'QR'
                    }
                }
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return Success no vendor name', function* (t) {
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves({
        id: 4,
        product_group_id: 2,
        sku: 'WBQH1BWFAN',
        long_name: 'Apple iPhone 7 - Silver - 32GB',
        variant_value: '{"phone_color":1,"phone_storage":3}',
        primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516885661.jpg',
        additional_image: '["https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516885671.jpg","https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516885675.png"]',
        product_id_magento: null,
        product_id_netsuite: null,
        is_primary: 1,
        is_discontinue: 0,
        is_active: 1,
        created_at: '2018-01-18T07:20:05.000Z',
        updated_at: '2018-06-21T09:39:10.000Z'
    });
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves({
        id: 2,
        name: 'Apple iPhone 7',
        category_id: 561,
        brand_id: 81,
        uom_id: 1,
        stocking_uom_id: 1,
        quantity_stocking_uom: 1,
        manufacturing_number: 'MPN7PK1781',
        manufacturing_number_type: null,
        package_weight: 800,
        package_length: '13.83',
        package_width: '11.00',
        package_height: '9.00',
        package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
        barcode: '5012345678900',
        description: 'Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.\n\nDi iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.',
        primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        created_at: '2017-12-19T14:59:19.000Z',
        updated_at: '2018-06-21T09:39:45.000Z'
    });
    // t.context.sandbox.stub(CustomeRepository, 'findAllCategoryId').resolves([
    //     {
    //         c0: 8,
    //         c1: 52,
    //         c2: 219,
    //         c3: 561
    //     }
    // ]);
    t.context.sandbox.stub(ProductVendorRepository, 'findByVariantEcart').resolves([
        {
            id: 8,
            product_variant_id: 4,
            vendor_id: 3,
            warehouse_id: 3,
            location_label: 'Jawa Tengah',
            stock_available: 998,
            stock_used: 409,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 3,
            tier_min_qty_3: 5,
            tier_cogs_price_1: '11999000.00',
            tier_cogs_price_2: '11000000.00',
            tier_cogs_price_3: '10000000.00',
            warranty_option: 'distributor',
            warranty_period: 'week',
            warranty_limit: 1,
            warranty_coverage: 'All',
            indent_period: null,
            indent_limit: null,
            reference_link: '[]',
            sku_vendor: '28AKGEM32E',
            is_indent: 0,
            is_active: 1,
            created_by: 3,
            is_contract: 0,
            created_at: '2018-01-18T07:29:05.000Z',
            updated_at: '2018-07-05T10:50:07.000Z'
        },
        {
            id: 4,
            product_variant_id: 4,
            vendor_id: 2,
            warehouse_id: 2,
            location_label: 'Jakarta',
            stock_available: 9923,
            stock_used: 109,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 2,
            tier_min_qty_3: 3,
            tier_cogs_price_1: '12000000.00',
            tier_cogs_price_2: '11999000.00',
            tier_cogs_price_3: '11990000.00',
            warranty_option: 'international',
            warranty_period: 'year',
            warranty_limit: 1,
            warranty_coverage: '1',
            indent_period: null,
            indent_limit: null,
            reference_link: '[]',
            sku_vendor: 'F6MZM9LXDQ',
            is_indent: 0,
            is_active: 1,
            created_by: 2,
            is_contract: 0,
            created_at: '2018-01-18T07:20:05.000Z',
            updated_at: '2018-07-05T10:07:37.000Z'
        }
    ]);
    // t.context.sandbox.stub(BrandRepository, 'findById').resolves({
    //     id: 81,
    //     name: 'Apple',
    //     image_url: null,
    //     created_at: '2017-11-28T14:54:10.000Z',
    //     updated_at: '2017-11-28T14:54:10.000Z'
    // });
    t.context.sandbox.stub(UomRepository, 'findById').resolves({
        id: 1,
        name: 'Unit',
        created_at: '2017-12-05T16:59:10.000Z',
        updated_at: '2017-12-05T16:59:10.000Z'
    });

    t.context.sandbox.stub(StockingUomRepository, 'findById').resolves({
        id: 1,
        name: 'Dozeeen update',
        created_at: '2017-12-05T16:55:00.000Z',
        updated_at: '2018-01-24T08:48:07.000Z'
    });
    // const callback = t.context.sandbox.stub(CategoryRepository, 'findOne');
    // callback.onCall(0).resolves({
    //     id: 8,
    //     name: 'IT and Mobile Devices',
    //     level: 'C0',
    //     base_margin: null,
    //     commission: null,
    //     unspsc: 43000000,
    //     sequence: 1,
    //     parent_id: null,
    //     is_active: 1,
    //     created_at: '2017-12-18T06:32:18.000Z',
    //     updated_at: '2017-12-18T06:32:18.000Z'
    // });
    // callback.onCall(1).resolves({
    //     id: 52,
    //     name: 'Communications Devices & Accessories',
    //     level: 'C1',
    //     base_margin: null,
    //     commission: null,
    //     unspsc: 43190000,
    //     sequence: 1,
    //     parent_id: 8,
    //     is_active: 1,
    //     created_at: '2017-12-18T06:32:18.000Z',
    //     updated_at: '2017-12-18T06:32:18.000Z'
    // });
    // callback.onCall(2).resolves({
    //     id: 219,
    //     name: 'Personal communication devices',
    //     level: 'C2',
    //     base_margin: null,
    //     commission: null,
    //     unspsc: 43191500,
    //     sequence: 1,
    //     parent_id: 52,
    //     is_active: 1,
    //     created_at: '2017-12-18T06:32:18.000Z',
    //     updated_at: '2017-12-18T06:32:18.000Z'
    // });
    // callback.onCall(3).resolves({
    //     id: 561,
    //     name: 'Mobile phones',
    //     level: 'C3',
    //     base_margin: null,
    //     commission: null,
    //     unspsc: 43191501,
    //     sequence: 1,
    //     parent_id: 219,
    //     is_active: 1,
    //     created_at: '2017-12-18T06:32:18.000Z',
    //     updated_at: '2017-12-18T06:32:18.000Z'
    // });

    const callOther = t.context.sandbox.stub(BizzyService, 'callSync');
    callOther.onCall(0).resolves({
        data: [
            {
                id: 2,
                prefix: '',
                name: '',
                suffix: 'Tbk',
                npwp: '521652651625615',
                status_pkp: 0,
                place: 'Abadi Tower',
                street: 'Jalan budi utomo no.39',
                phone: '62176767776',
                status: 3,
                trademark: 'Trademark',
                created_at: '2018-01-05T12:48:22.000Z',
                logo: 'https://bizzyx-growth-entity-pub-s3-staging.s3.amazonaws.com/pub_98f4491c-42b8-4bed-a024-e34e8396392e.png',
                geograph: {
                    id: 16014,
                    province: 'Jakarta',
                    city: 'Jakarta Selatan',
                    district: 'Jagakarsa',
                    village: 'Tanjung Barat',
                    zipcode: '12530',
                    geotag: '1006115105',
                    jnecitycode: 'CGK10201'
                },
                warehouse: [
                    2
                ]
            },
            {
                id: 3,
                prefix: '',
                name: '',
                suffix: '',
                npwp: '256156251652611',
                status_pkp: 1,
                place: 'Jaya Tower',
                street: 'Jalan budi jaya no.39',
                phone: '622168576712',
                status: 3,
                trademark: 'Vendor Jaya',
                created_at: '2018-01-05T12:53:17.000Z',
                logo: 'https://bizzyx-growth-entity-pub-s3-staging.s3.amazonaws.com/pub_5fdcd09c-d045-4c5b-9960-c5f2e8c1d1ce.jpeg',
                geograph: {
                    id: 14960,
                    province: 'Jakarta',
                    city: 'Jakarta Pusat',
                    district: 'Cempaka Putih',
                    village: 'Cempaka Putih Barat',
                    zipcode: '10520',
                    geotag: '1006115000',
                    jnecitycode: 'CGK10301'
                },
                warehouse: [
                    3
                ]
            }
        ],
        meta: {
            page: 1,
            limit: 50,
            total_data: 2,
            total_page: 1,
            filter: {
                is_vendor: 1,
                id: [
                    '2',
                    '3'
                ]
            }
        }
    });
    callOther.onCall(1).resolves([
        {
            id: 4,
            sku: 'WBQH1BWFAN',
            type: null,
            pricing_type: 'NONE',
            tier_data: [
                {
                    tier_min_qty_1: 1,
                    tier_cogs_1: 11999000,
                    tier_price_1: 14998750
                },
                {
                    tier_min_qty_2: 3,
                    tier_cogs_2: 11000000,
                    tier_price_2: 13750000
                },
                {
                    tier_min_qty_3: 5,
                    tier_cogs_3: 10000000,
                    tier_price_3: 12500000
                }
            ],
            cid: '72f0ed223c48f5443a4c7868099fe80c794ed798a5e94d9964bb17ceeae086b0b4d4138ba7ce522776bfae53adad688f2fb4a8698ecc4877f591adab06fe145c58c0887d390609387301923dafbb4dea36c5f93be1e0ce3b1991e21efbbd4f0f6c05afb7fa7824d18495469fdf064ebf',
            top_days: 30,
            is_franco: false,
            shipping: [],
            variable: {
                S: 0,
                COF: 1.5,
                salesAdjustment: 0,
                FF: 0,
                baseMargin: 10,
                topVendor: 30,
                topCustomer: 30,
                rebate: 10,
                topAdjustment: 0
            },
            vendor_id: '3',
            channel_type: 'QR'
        },
        {
            id: 4,
            sku: 'WBQH1BWFAN',
            type: null,
            pricing_type: 'NONE',
            tier_data: [
                {
                    tier_min_qty_1: 1,
                    tier_cogs_1: 12000000,
                    tier_price_1: 15288752
                },
                {
                    tier_min_qty_2: 2,
                    tier_cogs_2: 11999000,
                    tier_price_2: 15287478
                },
                {
                    tier_min_qty_3: 3,
                    tier_cogs_3: 11990000,
                    tier_price_3: 15276012
                }
            ],
            cid: '72f0ed223c48f5443a4c7868099fe80c2ed8ec8e4a575822632e207409155b77c96884d23b6ed4715abd479301c713d2fac008d2ad708b48c1793c155b5a9affdc2674811ed66a48a954535062a9d47a35b1ade8362ade5f13af3db8fb601a6befc4937090b98289306f3c2f21c05aae',
            top_days: 30,
            is_franco: false,
            shipping: [],
            variable: {
                S: 0,
                COF: 1.5,
                salesAdjustment: 0,
                FF: 0,
                baseMargin: 10,
                topVendor: 0,
                topCustomer: 30,
                rebate: 10,
                topAdjustment: 1.510925921727324
            },
            vendor_id: '2',
            channel_type: 'QR'
        }
    ]);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: 'WBQH1BWFAN'
            },
            query: {
                organization_id: 5
            }
        };
        const result = yield Methods.getSkuForEcart(data, context);
        const expected = {
            data: {
                id: 4,
                sku: 'WBQH1BWFAN',
                name: 'Apple iPhone 7 - Silver - 32GB',
                // brand: {
                //     id: 81,
                //     name: 'Apple'
                // },
                uom: {
                    id: 1,
                    name: 'Unit'
                },
                stocking_uom: {
                    id: 1,
                    name: 'Dozeeen update'
                },
                quantity_stocking_uom: 1,
                // categories: {
                //     c0: {
                //         id: 8,
                //         name: 'IT and Mobile Devices',
                //         unspsc: 43000000
                //     },
                //     c1: {
                //         id: 52,
                //         name: 'Communications Devices & Accessories',
                //         unspsc: 43190000
                //     },
                //     c2: {
                //         id: 219,
                //         name: 'Personal communication devices',
                //         unspsc: 43191500
                //     },
                //     c3: {
                //         id: 561,
                //         name: 'Mobile phones',
                //         unspsc: 43191501
                //     }
                // },
                barcode: '5012345678900',
                manufacturing_number: 'MPN7PK1781',
                package_weight: 800,
                package_length: 13.83,
                package_width: 11,
                package_height: 9,
                package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516885661.jpg',
                additional_image: [
                    'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516885671.jpg',
                    'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516885675.png'
                ],
                description: 'Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.\n\nDi iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.',
                product_group: {
                    id: 2,
                    name: 'Apple iPhone 7'
                },
                product_vendors: [
                    {
                        id: 8,
                        vendor_id: 3,
                        vendor_name: '',
                        warehouse_id: 3,
                        stock_available: 998,
                        currency: 'IDR',
                        tier_min_qty_1: 1,
                        tier_min_qty_2: 3,
                        tier_min_qty_3: 5,
                        tier_cogs_price_1: 11999000,
                        tier_cogs_price_2: 11000000,
                        tier_cogs_price_3: 10000000,
                        price_engine: {
                            id: 4,
                            sku: 'WBQH1BWFAN',
                            type: null,
                            pricing_type: 'NONE',
                            tier_data: [
                                {
                                    tier_min_qty_1: 1,
                                    tier_cogs_1: 11999000,
                                    tier_price_1: 14998750
                                },
                                {
                                    tier_min_qty_2: 3,
                                    tier_cogs_2: 11000000,
                                    tier_price_2: 13750000
                                },
                                {
                                    tier_min_qty_3: 5,
                                    tier_cogs_3: 10000000,
                                    tier_price_3: 12500000
                                }
                            ],
                            cid: '72f0ed223c48f5443a4c7868099fe80c794ed798a5e94d9964bb17ceeae086b0b4d4138ba7ce522776bfae53adad688f2fb4a8698ecc4877f591adab06fe145c58c0887d390609387301923dafbb4dea36c5f93be1e0ce3b1991e21efbbd4f0f6c05afb7fa7824d18495469fdf064ebf',
                            top_days: 30,
                            is_franco: false,
                            shipping: [],
                            variable: {
                                S: 0,
                                COF: 1.5,
                                salesAdjustment: 0,
                                FF: 0,
                                baseMargin: 10,
                                topVendor: 30,
                                topCustomer: 30,
                                rebate: 10,
                                topAdjustment: 0
                            },
                            vendor_id: '3',
                            channel_type: 'QR'
                        }
                    },
                    {
                        id: 4,
                        vendor_id: 2,
                        vendor_name: '',
                        warehouse_id: 2,
                        stock_available: 9923,
                        currency: 'IDR',
                        tier_min_qty_1: 1,
                        tier_min_qty_2: 2,
                        tier_min_qty_3: 3,
                        tier_cogs_price_1: 12000000,
                        tier_cogs_price_2: 11999000,
                        tier_cogs_price_3: 11990000,
                        price_engine: {
                            id: 4,
                            sku: 'WBQH1BWFAN',
                            type: null,
                            pricing_type: 'NONE',
                            tier_data: [
                                {
                                    tier_min_qty_1: 1,
                                    tier_cogs_1: 12000000,
                                    tier_price_1: 15288752
                                },
                                {
                                    tier_min_qty_2: 2,
                                    tier_cogs_2: 11999000,
                                    tier_price_2: 15287478
                                },
                                {
                                    tier_min_qty_3: 3,
                                    tier_cogs_3: 11990000,
                                    tier_price_3: 15276012
                                }
                            ],
                            cid: '72f0ed223c48f5443a4c7868099fe80c2ed8ec8e4a575822632e207409155b77c96884d23b6ed4715abd479301c713d2fac008d2ad708b48c1793c155b5a9affdc2674811ed66a48a954535062a9d47a35b1ade8362ade5f13af3db8fb601a6befc4937090b98289306f3c2f21c05aae',
                            top_days: 30,
                            is_franco: false,
                            shipping: [],
                            variable: {
                                S: 0,
                                COF: 1.5,
                                salesAdjustment: 0,
                                FF: 0,
                                baseMargin: 10,
                                topVendor: 0,
                                topCustomer: 30,
                                rebate: 10,
                                topAdjustment: 1.510925921727324
                            },
                            vendor_id: '2',
                            channel_type: 'QR'
                        }
                    }
                ],
                cheapest: {
                    id: 8,
                    vendor_id: 3,
                    vendor_name: '',
                    warehouse_id: 3,
                    stock_available: 998,
                    currency: 'IDR',
                    tier_min_qty_1: 1,
                    tier_min_qty_2: 3,
                    tier_min_qty_3: 5,
                    tier_cogs_price_1: 11999000,
                    tier_cogs_price_2: 11000000,
                    tier_cogs_price_3: 10000000,
                    price_engine: {
                        id: 4,
                        sku: 'WBQH1BWFAN',
                        type: null,
                        pricing_type: 'NONE',
                        tier_data: [
                            {
                                tier_min_qty_1: 1,
                                tier_cogs_1: 11999000,
                                tier_price_1: 14998750
                            },
                            {
                                tier_min_qty_2: 3,
                                tier_cogs_2: 11000000,
                                tier_price_2: 13750000
                            },
                            {
                                tier_min_qty_3: 5,
                                tier_cogs_3: 10000000,
                                tier_price_3: 12500000
                            }
                        ],
                        cid: '72f0ed223c48f5443a4c7868099fe80c794ed798a5e94d9964bb17ceeae086b0b4d4138ba7ce522776bfae53adad688f2fb4a8698ecc4877f591adab06fe145c58c0887d390609387301923dafbb4dea36c5f93be1e0ce3b1991e21efbbd4f0f6c05afb7fa7824d18495469fdf064ebf',
                        top_days: 30,
                        is_franco: false,
                        shipping: [],
                        variable: {
                            S: 0,
                            COF: 1.5,
                            salesAdjustment: 0,
                            FF: 0,
                            baseMargin: 10,
                            topVendor: 30,
                            topCustomer: 30,
                            rebate: 10,
                            topAdjustment: 0
                        },
                        vendor_id: '3',
                        channel_type: 'QR'
                    }
                }
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return success no vendor', function* (t) {
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves({
        id: 4,
        product_group_id: 2,
        sku: 'WBQH1BWFAN',
        long_name: 'Apple iPhone 7 - Silver - 32GB',
        variant_value: '{"phone_color":1,"phone_storage":3}',
        primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516885661.jpg',
        additional_image: '["https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516885671.jpg","https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516885675.png"]',
        product_id_magento: null,
        product_id_netsuite: null,
        is_primary: 1,
        is_discontinue: 0,
        is_active: 1,
        created_at: '2018-01-18T07:20:05.000Z',
        updated_at: '2018-06-21T09:39:10.000Z'
    });
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves({
        id: 2,
        name: 'Apple iPhone 7',
        category_id: 561,
        brand_id: 81,
        uom_id: 1,
        stocking_uom_id: 1,
        quantity_stocking_uom: 1,
        manufacturing_number: 'MPN7PK1781',
        manufacturing_number_type: null,
        package_weight: 800,
        package_length: '13.83',
        package_width: '11.00',
        package_height: '9.00',
        package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
        barcode: '5012345678900',
        description: 'Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.\n\nDi iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.',
        primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
        variant_count: 2,
        variant_matrix: '["phone_color","phone_storage"]',
        status: 1,
        visibility: 1,
        created_by: 2,
        created_at: '2017-12-19T14:59:19.000Z',
        updated_at: '2018-06-21T09:39:45.000Z'
    });
    // t.context.sandbox.stub(CustomeRepository, 'findAllCategoryId').resolves([
    //     {
    //         c0: 8,
    //         c1: 52,
    //         c2: 219,
    //         c3: 561
    //     }
    // ]);
    t.context.sandbox.stub(ProductVendorRepository, 'findByVariantEcart').resolves([]);
    // t.context.sandbox.stub(BrandRepository, 'findById').resolves({
    //     id: 81,
    //     name: 'Apple',
    //     image_url: null,
    //     created_at: '2017-11-28T14:54:10.000Z',
    //     updated_at: '2017-11-28T14:54:10.000Z'
    // });
    t.context.sandbox.stub(UomRepository, 'findById').resolves({
        id: 1,
        name: 'Unit',
        created_at: '2017-12-05T16:59:10.000Z',
        updated_at: '2017-12-05T16:59:10.000Z'
    });

    t.context.sandbox.stub(StockingUomRepository, 'findById').resolves({
        id: 1,
        name: 'Dozeeen update',
        created_at: '2017-12-05T16:55:00.000Z',
        updated_at: '2018-01-24T08:48:07.000Z'
    });
    // const callback = t.context.sandbox.stub(CategoryRepository, 'findOne');
    // callback.onCall(0).resolves({
    //     id: 8,
    //     name: 'IT and Mobile Devices',
    //     level: 'C0',
    //     base_margin: null,
    //     commission: null,
    //     unspsc: 43000000,
    //     sequence: 1,
    //     parent_id: null,
    //     is_active: 1,
    //     created_at: '2017-12-18T06:32:18.000Z',
    //     updated_at: '2017-12-18T06:32:18.000Z'
    // });
    // callback.onCall(1).resolves({
    //     id: 52,
    //     name: 'Communications Devices & Accessories',
    //     level: 'C1',
    //     base_margin: null,
    //     commission: null,
    //     unspsc: 43190000,
    //     sequence: 1,
    //     parent_id: 8,
    //     is_active: 1,
    //     created_at: '2017-12-18T06:32:18.000Z',
    //     updated_at: '2017-12-18T06:32:18.000Z'
    // });
    // callback.onCall(2).resolves({
    //     id: 219,
    //     name: 'Personal communication devices',
    //     level: 'C2',
    //     base_margin: null,
    //     commission: null,
    //     unspsc: 43191500,
    //     sequence: 1,
    //     parent_id: 52,
    //     is_active: 1,
    //     created_at: '2017-12-18T06:32:18.000Z',
    //     updated_at: '2017-12-18T06:32:18.000Z'
    // });
    // callback.onCall(3).resolves({
    //     id: 561,
    //     name: 'Mobile phones',
    //     level: 'C3',
    //     base_margin: null,
    //     commission: null,
    //     unspsc: 43191501,
    //     sequence: 1,
    //     parent_id: 219,
    //     is_active: 1,
    //     created_at: '2017-12-18T06:32:18.000Z',
    //     updated_at: '2017-12-18T06:32:18.000Z'
    // });
    const callOther = t.context.sandbox.stub(BizzyService, 'callSync');
    callOther.onCall(0).resolves({
        data: [],
        meta: {
            page: 1,
            limit: 50,
            total_data: 2,
            total_page: 1,
            filter: {
                is_vendor: 1,
                id: [
                    '2',
                    '3'
                ]
            }
        }
    });
    callOther.onCall(1).resolves([]);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: 'X152KT2GKF'
            },
            query: {
                organization_id: 5
            }
        };
        const result = yield Methods.getSkuForEcart(data, context);
        const expected = {
            data: {
                id: 4,
                sku: 'WBQH1BWFAN',
                name: 'Apple iPhone 7 - Silver - 32GB',
                // brand: {
                //     id: 81,
                //     name: 'Apple'
                // },
                uom: {
                    id: 1,
                    name: 'Unit'
                },
                stocking_uom: {
                    id: 1,
                    name: 'Dozeeen update'
                },
                quantity_stocking_uom: 1,
                // categories: {
                //     c0: {
                //         id: 8,
                //         name: 'IT and Mobile Devices',
                //         unspsc: 43000000
                //     },
                //     c1: {
                //         id: 52,
                //         name: 'Communications Devices & Accessories',
                //         unspsc: 43190000
                //     },
                //     c2: {
                //         id: 219,
                //         name: 'Personal communication devices',
                //         unspsc: 43191500
                //     },
                //     c3: {
                //         id: 561,
                //         name: 'Mobile phones',
                //         unspsc: 43191501
                //     }
                // },
                barcode: '5012345678900',
                manufacturing_number: 'MPN7PK1781',
                package_weight: 800,
                package_length: 13.83,
                package_width: 11,
                package_height: 9,
                package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516885661.jpg',
                additional_image: [
                    'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516885671.jpg',
                    'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516885675.png'
                ],
                description: 'Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.\n\nDi iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.',
                product_group: {
                    id: 2,
                    name: 'Apple iPhone 7'
                },
                product_vendors: [],
                cheapest: {}
            }
        };
        t.deepEqual(result, expected);
    } catch (err) {
        console.log(err.message);
    }
});

test.serial('Should be return Forbidden', function* (t) {
    try {
        const context = {
            user: ''
        };
        const data = {
            path: {
                id: 'X152KT2GKF'
            }
        };
        yield Methods.getSkuForEcart(data, context);
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
                id: ''
            },
            query: {
                organization_id: 5
            }
        };
        yield Methods.getSkuForEcart(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Should be return Not Found', function* (t) {
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves(null);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            path: {
                id: 'X152KT2GKFSDF'
            },
            query: {
                organization_id: 5
            }
        };
        yield Methods.getSkuForEcart(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'SKU Not Found');
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
