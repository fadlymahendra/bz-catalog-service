'use strict';

const Promise = require('bizzy-common');
const { BizzyError } = require('bizzy-common');
const test = require('ava');
const sinon = require('sinon');
const Method = require('../../../../src/methods/product-detail/snapshot');
const Repo = require('../../../../src/repositories/product_snapshot');
const ProductVariantRepo = require('../../../../src/repositories/product_variant');
const SyncRepo = require('../../../../src/repositories/sync_service');
const ProductMappingRepo = require('../../../../src/repositories/product_sku_mapping');
const Authorization = require('../../../../src/utils/authorization');

const resFindOne = {
    message: 'Purchase Request Snapshot Detail',
    data: {
        _id: '5b9fb00667b794164a50b589',
        notes: null,
        group_id: 282,
        channel: 1,
        ref: 'default ref',
        payment_type_id: 'TOP',
        payment_method_id: 0,
        channel_type: 'QR',
        term_of_payment: 30,
        purchase_request_internal: null,
        items: [
            {
                catalog_id: null,
                company_product_id: 1,
                company_seller_id: 2,
                company_seller_name: 'PT. Bizzy Commerce Indonesia',
                warehouse_id: 2,
                warehouse_name: 'PT. Bizzy Commerce Indonesia',
                sku_id: 7,
                sku_no: 'YTTJR6RNNY',
                budget_id: 0,
                qty: 2,
                base_price: 250000,
                margin: 0,
                added_price: 250000,
                deducted_price: 250000,
                discount: 0,
                tax: 25000,
                shipping_address_id: 715,
                shipping_cost: 1250000,
                shipping_method: 30,
                shipping_price_estimation: 1250000,
                shipping_country: 'Indonesia',
                shipping_province: 'Sumatera Utara',
                shipping_city: 'Medan',
                shipping_zipcode: '20213',
                shipping_address: 'Gedung Happiest QR TOP;Jalan Happiest QR TOP',
                shipping_phone: '62123123123',
                shipping_phone_prefix: '+62',
                shipping_district: 'Medan Kota',
                shipping_receiver_name: 'PENERIMA HAPPIEST',
                billing_address_id: 716,
                billing_country: 'Indonesia',
                billing_province: 'Sumatera Utara',
                billing_city: 'Medan',
                billing_zipcode: '20213',
                billing_address: 'Gedung Happiest QR TOP;Jalan Happiest QR TOP',
                billing_phone: '62123123123',
                billing_phone_prefix: '+62',
                billing_district: 'Medan Kota',
                billing_receiver_name: 'Happiest QR TOP Uyeah',
                billing_receiver_email: 'happiest_qrtop@yopmail.com',
                tier_price: {
                    tier1: {
                        min_qty: 2,
                        max_qty: 49,
                        price: 250000
                    },
                    tier2: {
                        min_qty: 50,
                        max_qty: 99,
                        price: 245000
                    },
                    tier3: {
                        min_qty: 100,
                        max_qty: 9999999,
                        price: 240000
                    }
                },
                tier_price_catalog: {
                    tier1: {
                        min_qty: 2,
                        max_qty: 50,
                        price: 250000
                    },
                    tier2: {
                        min_qty: 50,
                        max_qty: 100,
                        price: 245000
                    },
                    tier3: {
                        min_qty: 100,
                        max_qty: 10000000000000000000,
                        price: 240000
                    }
                },
                image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516260341.jpg',
                stock: 19529,
                product_available: true,
                product_id: 'YTTJR6RNNY',
                product_group_id: 5,
                product_name: 'Krisbow Bor Listrik 13MM (650W)',
                vendor_hub_id: 2,
                hub_id: 1,
                vendor_hub_name: 'PT. Bizzy Commerce Indonesia',
                customer_address_id: 715,
                shipping_method_id: 30,
                shipping_method_name: 'tbi',
                shipping_from: 'Jakarta Timur, Jakarta',
                is_partial: false,
                is_pkp: 0,
                uom: {
                    id: 1,
                    name: 'Unit'
                },
                stock_uom: {
                    id: 3,
                    name: 'Dozen'
                },
                quantity_stocking_uom: 220,
                pricing: {
                    id: 7,
                    sku: 'YTTJR6RNNY',
                    type: null,
                    tier_data: [
                        {
                            tier_min_qty_1: 2,
                            tier_price_1: 250000
                        },
                        {
                            tier_min_qty_2: 50,
                            tier_price_2: 245000
                        },
                        {
                            tier_min_qty_3: 100,
                            tier_price_3: 240000
                        }
                    ],
                    cid: 'f5005ec17c191bad3e29b403b4f233c51214cc02e388c699cdbd315b753cd011e8ad0523898879fad1cadafb61138f2156ca22845f0ed37298c45c3d2e645e2d777a0e66d6c0b81eb164028ac1e58a051434a4d6ab28aa55c15f894d33258625c172356e97027a6eab5c00582a1e3b50',
                    customer_id: '412',
                    vendor_id: '2',
                    variable: {
                        S: 0,
                        COF: 1.5,
                        salesAdjustment: 0,
                        FF: 0,
                        baseMargin: 0,
                        topVendor: 30,
                        topCustomer: 30,
                        rebate: 0,
                        topAdjustment: 0
                    },
                    margins: {
                        baseMargin: 0,
                        rebate: 0,
                        topAdjustment: 0,
                        salesAdjustment: 0
                    },
                    cogs_price: 250000,
                    sales_price: 250000,
                    qty: 2,
                    amount: 500000,
                    is_franco: false,
                    from_franco: 0,
                    shipping: [],
                    is_sku_vendor_active: 1,
                    is_sku_active: 1
                },
                lead_time: {
                    from: 1,
                    to: 2
                },
                brand: {
                    id: 841,
                    name: 'Krisbow',
                    url_key: 'krisbow'
                },
                categories: {
                    c0: {
                        id: 3,
                        name: 'Maintenance, Repair, Overhaul / Operation (MRO)',
                        url_key: 'maintenance-repair-overhaul-operation-mro_c0.3',
                        unspsc: 15000000
                    },
                    c1: {
                        id: 32,
                        name: 'Hand tools',
                        url_key: 'hand-tools_c1.32',
                        unspsc: 27110000
                    },
                    c2: {
                        id: 264,
                        name: 'Tool kits',
                        url_key: 'tool-kits_c2.264',
                        unspsc: 27113200
                    },
                    c3: {
                        id: 437,
                        name: 'Electrician kits',
                        url_key: 'electrician-kits_c3.437',
                        unspsc: 27113204
                    }
                },
                barcode: '2492352353254',
                manufacturing_number: 'MPN239235P',
                package_weight: 3000,
                package_length: 31,
                package_width: 8,
                package_height: 24,
                package_content: '1 unit bor listrik',
                primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516260341.jpg',
                additional_image: [],
                description: '<p>Bor listrik Krisbow hadir dengan kinerja maksimal dan performa cepat sehingga dapat menyelesaikan pekerjaan dengan lebih praktis. Produk ini dapat dipakai untuk pengeboran beton, keramik, plastik dan kayu. Bor listrik ini juga nyaman digenggam dan mudah dioperasikan serta tahan lama. Kualitasnya tidak perlu diragukan lagi dengan standarisasi produksi yang begitu ketat sehingga produk yang dihasilkan memiliki ketahanan bertahun-tahun.</p>',
                product_group: {
                    id: 5,
                    name: 'Krisbow Bor Listrik 13MM (650W)'
                },
                specifications: [],
                variants: [],
                variant_count: 0,
                variant_matrix: [],
                variant_value: 'NO_VARIANT',
                vendors_information: [
                    {
                        id: 14,
                        vendor_id: 2,
                        vendor_name: 'PT Vendor Growth Tbk',
                        vendor_trademark: 'Trademark-edit',
                        vendor_pkp: 0,
                        vendor_logo: 'https://bizzyx-growth-entity-pub-s3-staging.s3.amazonaws.com/pub_98f4491c-42b8-4bed-a024-e34e8396392e.png',
                        warehouse_id: 2,
                        warehouse_name: 'Gudang Pusat',
                        warehouse_hub_id: 1,
                        warehouse_hub_shipper: [],
                        warehouse_hub: {
                            id: 1,
                            name: 'Jakarta-aCommerce',
                            address: 'Intirub Business Park Warehouse Phase 1 Ground Floor Kav 47-48, Jalan Cililitan Besar No.454, RT.7/RW.11, Kebon Pala, Makasar, Jakarta Timur 13570',
                            phone: '-',
                            geograph: {
                                id: 69093,
                                province: 'Jakarta',
                                city: 'Jakarta Timur',
                                district: 'Makasar',
                                village: 'Makasar',
                                zipcode: '13570',
                                geotag: '1006115174',
                                jnecitycode: 'CGK10507'
                            }
                        },
                        stock_available: 19529,
                        currency: 'IDR',
                        warehouse_geograph: {
                            id: 16044,
                            province: 'Jakarta',
                            city: 'Jakarta Selatan',
                            district: 'Pasar Minggu',
                            village: 'Kebagusan',
                            zipcode: '12520',
                            geotag: '1006115103',
                            jnecitycode: 'CGK10206'
                        },
                        vendor_joined_at: '2018-01-05T12:48:22.000Z',
                        sku_vendor: 'D08ZHUUPVB'
                    },
                    {
                        id: 135,
                        vendor_id: 485,
                        vendor_name: 'PT MFP vendor Tbk',
                        vendor_trademark: '',
                        vendor_pkp: 1,
                        vendor_logo: '',
                        warehouse_id: 170,
                        warehouse_name: 'PT. MFP vendor Tbk',
                        warehouse_hub_id: 1,
                        warehouse_hub_shipper: [],
                        warehouse_hub: {
                            id: 1,
                            name: 'Jakarta-aCommerce',
                            address: 'Intirub Business Park Warehouse Phase 1 Ground Floor Kav 47-48, Jalan Cililitan Besar No.454, RT.7/RW.11, Kebon Pala, Makasar, Jakarta Timur 13570',
                            phone: '-',
                            geograph: {
                                id: 69093,
                                province: 'Jakarta',
                                city: 'Jakarta Timur',
                                district: 'Makasar',
                                village: 'Makasar',
                                zipcode: '13570',
                                geotag: '1006115174',
                                jnecitycode: 'CGK10507'
                            }
                        },
                        stock_available: 200,
                        currency: 'IDR',
                        warehouse_geograph: {
                            id: 16024,
                            province: 'Jakarta',
                            city: 'Jakarta Selatan',
                            district: 'Kebayoran Baru',
                            village: 'Senayan',
                            zipcode: '12190',
                            geotag: '1006115084',
                            jnecitycode: 'CGK10202'
                        },
                        vendor_joined_at: '2018-09-10T04:07:57.000Z',
                        sku_vendor: ''
                    },
                    {
                        id: 11,
                        vendor_id: 3,
                        vendor_name: 'PT Vendor Jaya ',
                        vendor_trademark: 'Vendor Jaya',
                        vendor_pkp: 1,
                        vendor_logo: 'https://bizzyx-growth-entity-pub-s3-staging.s3.amazonaws.com/pub_5fdcd09c-d045-4c5b-9960-c5f2e8c1d1ce.jpeg',
                        warehouse_id: 3,
                        warehouse_name: 'Gudang Merdeka',
                        warehouse_hub_id: 2,
                        warehouse_hub_shipper: [],
                        warehouse_hub: {
                            id: 2,
                            name: 'Palembang-TUJ',
                            address: 'Jl. Pangeran Ayin No. 333 Kenten Laut, Kec. Talang Kelapa, Kab. Banyu Asin, Palembang 30961',
                            phone: '-',
                            geograph: {
                                id: 27027,
                                province: 'Sumatera Selatan',
                                city: 'Banyu Asin',
                                district: 'Talang Kelapa',
                                village: 'Kenten Laut',
                                zipcode: '30961',
                                geotag: '1006133271',
                                jnecitycode: 'PLM21015'
                            }
                        },
                        stock_available: 119,
                        currency: 'IDR',
                        warehouse_geograph: {
                            id: 1372,
                            province: 'Sumatera Selatan',
                            city: 'Palembang',
                            district: 'Plaju',
                            village: 'Plaju Ilir',
                            zipcode: '30268',
                            geotag: '1006132372',
                            jnecitycode: 'PLM10001'
                        },
                        vendor_joined_at: '2018-01-05T12:53:17.000Z',
                        sku_vendor: ''
                    }
                ],
                vendor_pricing: [
                    {
                        id: 7,
                        sku: 'YTTJR6RNNY',
                        type: null,
                        tier_data: {
                            tier_min_qty_1: 2,
                            tier_price_1: 250000,
                            tier_min_qty_2: 50,
                            tier_price_2: 245000,
                            tier_min_qty_3: 100,
                            tier_price_3: 240000
                        },
                        cid: 'f5005ec17c191bad3e29b403b4f233c51214cc02e388c699cdbd315b753cd011e8ad0523898879fad1cadafb61138f2156ca22845f0ed37298c45c3d2e645e2d777a0e66d6c0b81eb164028ac1e58a051434a4d6ab28aa55c15f894d33258625c172356e97027a6eab5c00582a1e3b50',
                        top_days: 0,
                        is_contract_price: false,
                        is_franco: 0,
                        shipping: [],
                        channel_type: 'MP',
                        is_contract: 0,
                        vendor_id: '2'
                    },
                    {
                        id: 7,
                        sku: 'YTTJR6RNNY',
                        type: null,
                        tier_data: {
                            tier_min_qty_1: 1,
                            tier_price_1: 486000,
                            tier_min_qty_2: 30,
                            tier_price_2: 470000,
                            tier_min_qty_3: 90,
                            tier_price_3: 430000
                        },
                        cid: '72f0ed223c48f5443a4c7868099fe80c66bb98f6109ce9598633c7ae6d4b09de7af392adc4d2a24c2e92e93c64fb2283a142f105c9a0baa1dc1dd536eb745961924bdfb7074ea41ab7d0cc4b8308b8f995171df5d4f2d2acc3ebba1051cc6b9b31cb323aa46b8425e382dd0c338c1e6a',
                        top_days: 0,
                        is_contract_price: false,
                        is_franco: 0,
                        shipping: [],
                        channel_type: 'MP',
                        is_contract: 0,
                        vendor_id: '485'
                    },
                    {
                        id: 7,
                        sku: 'YTTJR6RNNY',
                        type: null,
                        tier_data: {
                            tier_min_qty_1: 6,
                            tier_price_1: 600001
                        },
                        cid: '188245ede5d708c7977816fed583fc91db29314ee556e17af8de11c6df1ab8eca867b26124be3fffed48c8873ee0d00a',
                        top_days: 0,
                        is_contract_price: false,
                        is_franco: 0,
                        shipping: [],
                        channel_type: 'MP',
                        is_contract: 0,
                        vendor_id: '3'
                    }
                ],
                price: 275000,
                quotation_id: 5094,
                created_by: 1193,
                _id: '5b9fb00567b7943ad650b588',
                shopping_cart_item_id: '5b9fb00567b7943ad650b588'
            }
        ],
        tax: 175000,
        subtotal: 500000,
        shipping_cost: 1250000,
        discount: 0,
        pr_amount_total: 1925000,
        purchase_request_id: 5040,
        purchase_request_no: 'PR-412-1537191941473',
        requestor_username: 'happiest_qrtop@yopmail.com',
        requestor_first_name: 'Happiest QR TOP',
        requestor_last_name: 'Uyeah'
    }
};

const expected = {
    data: {
        company_seller_id: 2,
        hub_id: 1,
        warehouse_id: 2,
        shipping_cost_estimation: 1250000,
        shipping_address_id: 715,
        added_price: 250000,
        discount: 0,
        deducted_price: 250000,
        qty: 2,
        channel_type: 'QR',
        is_punchout: 1,
        pr_number: 'PR-412-1537191941473',
        check_mapping: {
            mapping: 1,
            material_code: 'abc',
            material_group: 'def'
        },
        sku: {
            type: 'product_variant',
            id: 7,
            sku: 'YTTJR6RNNY',
            name: 'Krisbow Bor Listrik 13MM (650W)',
            brand: {
                id: 841,
                name: 'Krisbow',
                url_key: 'krisbow'
            },
            uom: {
                id: 1,
                name: 'Unit'
            },
            stocking_uom: {
                id: 3,
                name: 'Dozen'
            },
            quantity_stocking_uom: 220,
            categories: {
                c0: {
                    id: 3,
                    name: 'Maintenance, Repair, Overhaul / Operation (MRO)',
                    url_key: 'maintenance-repair-overhaul-operation-mro_c0.3',
                    unspsc: 15000000
                },
                c1: {
                    id: 32,
                    name: 'Hand tools',
                    url_key: 'hand-tools_c1.32',
                    unspsc: 27110000
                },
                c2: {
                    id: 264,
                    name: 'Tool kits',
                    url_key: 'tool-kits_c2.264',
                    unspsc: 27113200
                },
                c3: {
                    id: 437,
                    name: 'Electrician kits',
                    url_key: 'electrician-kits_c3.437',
                    unspsc: 27113204
                }
            },
            barcode: '2492352353254',
            manufacturing_number: 'MPN239235P',
            package_weight: 3000,
            package_length: 31,
            package_width: 8,
            package_height: 24,
            package_content: '1 unit bor listrik',
            primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516260341.jpg',
            additional_image: [],
            description: '<p>Bor listrik Krisbow hadir dengan kinerja maksimal dan performa cepat sehingga dapat menyelesaikan pekerjaan dengan lebih praktis. Produk ini dapat dipakai untuk pengeboran beton, keramik, plastik dan kayu. Bor listrik ini juga nyaman digenggam dan mudah dioperasikan serta tahan lama. Kualitasnya tidak perlu diragukan lagi dengan standarisasi produksi yang begitu ketat sehingga produk yang dihasilkan memiliki ketahanan bertahun-tahun.</p>',
            product_group: {
                id: 5,
                name: 'Krisbow Bor Listrik 13MM (650W)'
            },
            specifications: [],
            variants: [],
            variant_count: 0,
            variant_matrix: [],
            variant_value: 'NO_VARIANT'
        },
        vendors: [
            {
                id: 14,
                vendor_id: 2,
                vendor_name: 'PT Vendor Growth Tbk',
                vendor_trademark: 'Trademark-edit',
                vendor_pkp: 0,
                vendor_logo: 'https://bizzyx-growth-entity-pub-s3-staging.s3.amazonaws.com/pub_98f4491c-42b8-4bed-a024-e34e8396392e.png',
                warehouse_id: 2,
                warehouse_name: 'Gudang Pusat',
                warehouse_hub_id: 1,
                warehouse_hub_shipper: [],
                warehouse_hub: {
                    id: 1,
                    name: 'Jakarta-aCommerce',
                    address: 'Intirub Business Park Warehouse Phase 1 Ground Floor Kav 47-48, Jalan Cililitan Besar No.454, RT.7/RW.11, Kebon Pala, Makasar, Jakarta Timur 13570',
                    phone: '-',
                    geograph: {
                        id: 69093,
                        province: 'Jakarta',
                        city: 'Jakarta Timur',
                        district: 'Makasar',
                        village: 'Makasar',
                        zipcode: '13570',
                        geotag: '1006115174',
                        jnecitycode: 'CGK10507'
                    }
                },
                stock_available: 19529,
                currency: 'IDR',
                warehouse_geograph: {
                    id: 16044,
                    province: 'Jakarta',
                    city: 'Jakarta Selatan',
                    district: 'Pasar Minggu',
                    village: 'Kebagusan',
                    zipcode: '12520',
                    geotag: '1006115103',
                    jnecitycode: 'CGK10206'
                },
                vendor_joined_at: '2018-01-05T12:48:22.000Z',
                sku_vendor: 'D08ZHUUPVB'
            },
            {
                id: 135,
                vendor_id: 485,
                vendor_name: 'PT MFP vendor Tbk',
                vendor_trademark: '',
                vendor_pkp: 1,
                vendor_logo: '',
                warehouse_id: 170,
                warehouse_name: 'PT. MFP vendor Tbk',
                warehouse_hub_id: 1,
                warehouse_hub_shipper: [],
                warehouse_hub: {
                    id: 1,
                    name: 'Jakarta-aCommerce',
                    address: 'Intirub Business Park Warehouse Phase 1 Ground Floor Kav 47-48, Jalan Cililitan Besar No.454, RT.7/RW.11, Kebon Pala, Makasar, Jakarta Timur 13570',
                    phone: '-',
                    geograph: {
                        id: 69093,
                        province: 'Jakarta',
                        city: 'Jakarta Timur',
                        district: 'Makasar',
                        village: 'Makasar',
                        zipcode: '13570',
                        geotag: '1006115174',
                        jnecitycode: 'CGK10507'
                    }
                },
                stock_available: 200,
                currency: 'IDR',
                warehouse_geograph: {
                    id: 16024,
                    province: 'Jakarta',
                    city: 'Jakarta Selatan',
                    district: 'Kebayoran Baru',
                    village: 'Senayan',
                    zipcode: '12190',
                    geotag: '1006115084',
                    jnecitycode: 'CGK10202'
                },
                vendor_joined_at: '2018-09-10T04:07:57.000Z',
                sku_vendor: ''
            },
            {
                id: 11,
                vendor_id: 3,
                vendor_name: 'PT Vendor Jaya ',
                vendor_trademark: 'Vendor Jaya',
                vendor_pkp: 1,
                vendor_logo: 'https://bizzyx-growth-entity-pub-s3-staging.s3.amazonaws.com/pub_5fdcd09c-d045-4c5b-9960-c5f2e8c1d1ce.jpeg',
                warehouse_id: 3,
                warehouse_name: 'Gudang Merdeka',
                warehouse_hub_id: 2,
                warehouse_hub_shipper: [],
                warehouse_hub: {
                    id: 2,
                    name: 'Palembang-TUJ',
                    address: 'Jl. Pangeran Ayin No. 333 Kenten Laut, Kec. Talang Kelapa, Kab. Banyu Asin, Palembang 30961',
                    phone: '-',
                    geograph: {
                        id: 27027,
                        province: 'Sumatera Selatan',
                        city: 'Banyu Asin',
                        district: 'Talang Kelapa',
                        village: 'Kenten Laut',
                        zipcode: '30961',
                        geotag: '1006133271',
                        jnecitycode: 'PLM21015'
                    }
                },
                stock_available: 119,
                currency: 'IDR',
                warehouse_geograph: {
                    id: 1372,
                    province: 'Sumatera Selatan',
                    city: 'Palembang',
                    district: 'Plaju',
                    village: 'Plaju Ilir',
                    zipcode: '30268',
                    geotag: '1006132372',
                    jnecitycode: 'PLM10001'
                },
                vendor_joined_at: '2018-01-05T12:53:17.000Z',
                sku_vendor: ''
            }
        ],
        pricing: [
            {
                id: 7,
                sku: 'YTTJR6RNNY',
                type: null,
                tier_data: {
                    tier_min_qty_1: 2,
                    tier_price_1: 250000,
                    tier_min_qty_2: 50,
                    tier_price_2: 245000,
                    tier_min_qty_3: 100,
                    tier_price_3: 240000
                },
                cid: 'f5005ec17c191bad3e29b403b4f233c51214cc02e388c699cdbd315b753cd011e8ad0523898879fad1cadafb61138f2156ca22845f0ed37298c45c3d2e645e2d777a0e66d6c0b81eb164028ac1e58a051434a4d6ab28aa55c15f894d33258625c172356e97027a6eab5c00582a1e3b50',
                top_days: 0,
                is_contract_price: false,
                is_franco: 0,
                shipping: [],
                channel_type: 'MP',
                is_contract: 0,
                vendor_id: '2'
            },
            {
                id: 7,
                sku: 'YTTJR6RNNY',
                type: null,
                tier_data: {
                    tier_min_qty_1: 1,
                    tier_price_1: 486000,
                    tier_min_qty_2: 30,
                    tier_price_2: 470000,
                    tier_min_qty_3: 90,
                    tier_price_3: 430000
                },
                cid: '72f0ed223c48f5443a4c7868099fe80c66bb98f6109ce9598633c7ae6d4b09de7af392adc4d2a24c2e92e93c64fb2283a142f105c9a0baa1dc1dd536eb745961924bdfb7074ea41ab7d0cc4b8308b8f995171df5d4f2d2acc3ebba1051cc6b9b31cb323aa46b8425e382dd0c338c1e6a',
                top_days: 0,
                is_contract_price: false,
                is_franco: 0,
                shipping: [],
                channel_type: 'MP',
                is_contract: 0,
                vendor_id: '485'
            },
            {
                id: 7,
                sku: 'YTTJR6RNNY',
                type: null,
                tier_data: {
                    tier_min_qty_1: 6,
                    tier_price_1: 600001
                },
                cid: '188245ede5d708c7977816fed583fc91db29314ee556e17af8de11c6df1ab8eca867b26124be3fffed48c8873ee0d00a',
                top_days: 0,
                is_contract_price: false,
                is_franco: 0,
                shipping: [],
                channel_type: 'MP',
                is_contract: 0,
                vendor_id: '3'
            }
        ],
        total_price: 275000
    }
};

const resProductVariant = {
    id: 60,
    product_group_id: 38,
    sku: 'YTTJR6RNNY',
    long_name: 'lg - Gold - 32GB',
    variant_value: '{"phone_color":28,"phone_storage":3}',
    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/05/product_1526982986.png',
    additional_image: '[]',
    product_id_magento: null,
    product_id_netsuite: null,
    is_primary: 0,
    is_discontinue: 0,
    is_active: 1,
    created_at: '2018-05-28',
    updated_at: '2018-06-25'
};

const resGetSku = {
    data:
    {
        _id: '5b790c602d120474670525d2',
        type: 'product_variant',
        id: 60,
        sku: 'YTTJR6RNNY',
        name: 'lg - Gold - 32GB',
        brand: { id: 886, name: 'LG', url_key: 'lg' },
        uom: { id: 1, name: 'Unit' },
        stocking_uom: { id: 2, name: 'Carton' },
        quantity_stocking_uom: 100,
        categories: {
            c0: [Object], c1: [Object], c2: [Object], c3: [Object]
        },
        barcode: 'null',
        manufacturing_number: 'null',
        package_weight: 10000,
        package_length: 10,
        package_width: 10,
        package_height: 10,
        package_content: '1 unit hp, charger',
        primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/05/product_1526982986.png',
        additional_image: [],
        description: '<p>Memberikan teknologi terbaru di</p>',
        product_group: { id: 38, name: 'lg' },
        specifications: [[Object], [Object]],
        variants: [[Object], [Object]],
        variant_count: 2,
        variant_matrix: ['phone_color', 'phone_storage'],
        variant_value: { phone_color: 28, phone_storage: 3 }
    }
};

const resProductVendor = {
    data: [
        {
            id: 90,
            vendor_id: 4,
            vendor_name: 'PT Vendor Maju Terus Tbk',
            vendor_trademark: 'trademark',
            vendor_pkp: 1,
            vendor_logo: 'https://bizzyx-growth-entity-pub-s3-staging.s3.amazonaws.com/string.png',
            warehouse_id: 4,
            warehouse_name: 'Gudang Utama',
            warehouse_hub_id: 1,
            warehouse_hub_shipper: [],
            warehouse_hub: [Object],
            stock_available: 7,
            currency: 'IDR',
            warehouse_geograph: [Object],
            vendor_joined_at: '2018-01-05T13:00:03.000Z',
            sku_vendor: ''
        }
    ]
};

const resPricing = [{
    id: 60,
    sku: 'YTTJR6RNNY',
    type: null,
    tier_data: { tier_min_qty_1: 1, tier_price_1: 10000000 },
    cid: '72f0ed223c48f5443a4c7868099fe80c600594304430c815788e87bf870440fc904d0eab304f022171cb053c1871d528',
    top_days: 0,
    is_contract_price: false,
    is_franco: 0,
    shipping: [],
    channel_type: 'MP',
    is_contract: 0,
    vendor_id: '4'
}];

const resMapping = [{
    _id: '5b8ccffdee223b3dbe0d9d67',
    id: '1535954941619',
    product_sku: 'YTTJR6RNNY',
    payload:
     {
         catalog_id: '5b8ccffde60caf1dc0c05f62',
         organization_id: 3,
         material_code: 'abc',
         material_group: 'def',
         mapped: 1,
         uom: 'pc',
         quantity_stocking_uom: 1
     },
    user: { id: 847, name: 'Lius Punchout', email: 'ls@test.com' },
    created_at: '2018-09-03',
    updated_at: '2018-09-12'
}];

const payloadPost = {
    body: {
        quotation_item_id: '111',
        hub_id: 22,
        warehouse_id: 33,
        shipping_cost_estimation: '140000',
        shipping_address_id: 1,
        added_price: '15000',
        discount: '100000',
        deducted_price: '100000',
        total_price: '100000',
        products: [
            {
                sku: 'YTTJR6RNNY',
                company_seller_id: 1,
                qty: 1
            }
        ]
    }
};

test.serial('Should be return snapshot product', function* (t) {
    t.context.sandbox.stub(SyncRepo, 'getSnapshotPdp').resolves(resFindOne);
    t.context.sandbox.stub(ProductMappingRepo, 'findMappingSku').resolves(resMapping);
    try {
        const context = require('../../../mocks/contextSystem.json');
        const data = {
            body: {
                quotation_item: '111',
                sku: 'YTTJR6RNNY',
                token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6InN5c3RlbSIsInB1bmNob3V0Ijp7ImlzX3B1bmNob3V0Ijp0cnVlLCJpc191c2VyX3B1bmNob3V0Ijp0cnVlLCJzYWxlc19hZG1pbl9pZCI6NTQxOSwiZGF0YSI6eyJvcmdhbml6YXRpb25faWQiOjQyLCJsYW5ndWFnZSI6IlBDSSIsInB1cmNoYXNpbmdfc3lzdGVtIjoiU1JNIiwic2FsZXNfYWRtaW5faWQiOjU0MTksImNsaWVudF92ZW5kb3JfaWQiOiIxMjM0NWFhIiwib3JkZXJfc2V0dGluZyI6eyJjb250cmFjdCI6MSwic2hpcHBpbmdfY29zdCI6MSwibWFwcGluZyI6MSwicHBuIjoxfSwicGF5bG9hZCI6eyJzYXAtY2xpZW50IjoiMjAwIiwic2FwLWxhbmd1YWdlIjoiRSIsIkJZUEFTU19JTkJfSEFORExFUiI6IlgiLCJPQ0lfVkVSU0lPTiI6IjQuMCIsIk9QSV9WRVJTSU9OIjoiMS4wIiwicmV0dXJudGFyZ2V0IjoiX3RvcCIsIkhPT0tfVVJMIjoiaHR0cHM6Ly9zcm03cWFzcG9ydGFsLnNpbmFybWFzLWFncmkuY29tIiwiQ0FUQUxPR19VUkwiOiJodHRwczovL3N0YWdpbmctcGhvZW5peC5iaXp6eS5jby5pZC9jdXN0b21lci9wdW5jaG91dC9ob29rL2ZlOGVhNTk3LTkyYWMtNTY3Ni1iMDZjLTg1Yjg3MmUxNTFiOCIsIlBST0RVQ1RJRCI6IlFBQkJIWTExNTErfCsxNTQ4In19fSwiY3VzdG9tZXIiOnsib3JnYW5pemF0aW9uX2lkIjo0Mn0sImlzX3N5c3RlbSI6dHJ1ZSwiaWF0IjoxNTM3NDE5OTM0LCJleHAiOjE1Mzc0MjcxMzR9.10kr27qMK0yOe1uRZbdbOdH_G2C7xwFBJA0z-GSPkZrTeMd02XmTDjZxfmO19Qe6VtHCLTNv3pe-554Tr2re8UK5MIHSyU4dfWYR_S94O0XDJjzs_7ePjrzTN21fpovqmyTpIBy1D2fV6CXYppiXdh8_wUAa3CfwBXXIJQDkfFW-PDtBr2yl1qdUwT3B4_4vUo-XPovlQpS4GdmZgNEDXkhz8p_E1K7jUIv1TpuyjpntCpD4J2SdOk8gyKPuneAcoT6OiNa0I7UKy8R5AXVi8ie76TQvC8LijVJ6MsCYhZ9afRWQ9f6X1L1hNuHxJsCzta1nc-P47pX2C_4crZANNQ'
            }
        };
        const result = yield Method.getSnapshotProduct(data, context);
        t.deepEqual(result, expected);
        t.pass();
    } catch (err) {
        console.log(err);
        t.fail('Should return snapshots product');
    }
});


test.serial('Should be return snapshot product with another data', function* (t) {
    t.context.sandbox.stub(SyncRepo, 'getSnapshotPdp').resolves(resFindOne);
    t.context.sandbox.stub(ProductMappingRepo, 'findMappingSku').resolves([]);
    try {
        const context = require('../../../mocks/contextSystem.json');
        const data = {
            body: {
                quotation_item: '111',
                sku: 'YTTJR6RNNY',
                token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6InN5c3RlbSIsInB1bmNob3V0Ijp7ImlzX3B1bmNob3V0Ijp0cnVlLCJpc191c2VyX3B1bmNob3V0Ijp0cnVlLCJzYWxlc19hZG1pbl9pZCI6NTQxOSwiZGF0YSI6eyJvcmdhbml6YXRpb25faWQiOjQyLCJsYW5ndWFnZSI6IlBDSSIsInB1cmNoYXNpbmdfc3lzdGVtIjoiU1JNIiwic2FsZXNfYWRtaW5faWQiOjU0MTksImNsaWVudF92ZW5kb3JfaWQiOiIxMjM0NWFhIiwib3JkZXJfc2V0dGluZyI6eyJjb250cmFjdCI6MSwic2hpcHBpbmdfY29zdCI6MSwibWFwcGluZyI6MSwicHBuIjoxfSwicGF5bG9hZCI6eyJzYXAtY2xpZW50IjoiMjAwIiwic2FwLWxhbmd1YWdlIjoiRSIsIkJZUEFTU19JTkJfSEFORExFUiI6IlgiLCJPQ0lfVkVSU0lPTiI6IjQuMCIsIk9QSV9WRVJTSU9OIjoiMS4wIiwicmV0dXJudGFyZ2V0IjoiX3RvcCIsIkhPT0tfVVJMIjoiaHR0cHM6Ly9zcm03cWFzcG9ydGFsLnNpbmFybWFzLWFncmkuY29tIiwiQ0FUQUxPR19VUkwiOiJodHRwczovL3N0YWdpbmctcGhvZW5peC5iaXp6eS5jby5pZC9jdXN0b21lci9wdW5jaG91dC9ob29rL2ZlOGVhNTk3LTkyYWMtNTY3Ni1iMDZjLTg1Yjg3MmUxNTFiOCIsIlBST0RVQ1RJRCI6IlFBQkJIWTExNTErfCsxNTQ4In19fSwiY3VzdG9tZXIiOnsib3JnYW5pemF0aW9uX2lkIjo0Mn0sImlzX3N5c3RlbSI6dHJ1ZSwiaWF0IjoxNTM3NDE5OTM0LCJleHAiOjE1Mzc0MjcxMzR9.10kr27qMK0yOe1uRZbdbOdH_G2C7xwFBJA0z-GSPkZrTeMd02XmTDjZxfmO19Qe6VtHCLTNv3pe-554Tr2re8UK5MIHSyU4dfWYR_S94O0XDJjzs_7ePjrzTN21fpovqmyTpIBy1D2fV6CXYppiXdh8_wUAa3CfwBXXIJQDkfFW-PDtBr2yl1qdUwT3B4_4vUo-XPovlQpS4GdmZgNEDXkhz8p_E1K7jUIv1TpuyjpntCpD4J2SdOk8gyKPuneAcoT6OiNa0I7UKy8R5AXVi8ie76TQvC8LijVJ6MsCYhZ9afRWQ9f6X1L1hNuHxJsCzta1nc-P47pX2C_4crZANNQ'
            }
        };
        const result = yield Method.getSnapshotProduct(data, context);
        const expected2 = {
            data: {
                company_seller_id: 2,
                hub_id: 1,
                warehouse_id: 2,
                shipping_cost_estimation: 1250000,
                shipping_address_id: 715,
                added_price: 250000,
                discount: 0,
                deducted_price: 250000,
                qty: 2,
                channel_type: 'QR',
                is_punchout: 1,
                pr_number: 'PR-412-1537191941473',
                check_mapping: [],
                sku: {
                    type: 'product_variant',
                    id: 7,
                    sku: 'YTTJR6RNNY',
                    name: 'Krisbow Bor Listrik 13MM (650W)',
                    brand: {
                        id: 841,
                        name: 'Krisbow',
                        url_key: 'krisbow'
                    },
                    uom: {
                        id: 1,
                        name: 'Unit'
                    },
                    stocking_uom: {
                        id: 3,
                        name: 'Dozen'
                    },
                    quantity_stocking_uom: 220,
                    categories: {
                        c0: {
                            id: 3,
                            name: 'Maintenance, Repair, Overhaul / Operation (MRO)',
                            url_key: 'maintenance-repair-overhaul-operation-mro_c0.3',
                            unspsc: 15000000
                        },
                        c1: {
                            id: 32,
                            name: 'Hand tools',
                            url_key: 'hand-tools_c1.32',
                            unspsc: 27110000
                        },
                        c2: {
                            id: 264,
                            name: 'Tool kits',
                            url_key: 'tool-kits_c2.264',
                            unspsc: 27113200
                        },
                        c3: {
                            id: 437,
                            name: 'Electrician kits',
                            url_key: 'electrician-kits_c3.437',
                            unspsc: 27113204
                        }
                    },
                    barcode: '2492352353254',
                    manufacturing_number: 'MPN239235P',
                    package_weight: 3000,
                    package_length: 31,
                    package_width: 8,
                    package_height: 24,
                    package_content: '1 unit bor listrik',
                    primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516260341.jpg',
                    additional_image: [],
                    description: '<p>Bor listrik Krisbow hadir dengan kinerja maksimal dan performa cepat sehingga dapat menyelesaikan pekerjaan dengan lebih praktis. Produk ini dapat dipakai untuk pengeboran beton, keramik, plastik dan kayu. Bor listrik ini juga nyaman digenggam dan mudah dioperasikan serta tahan lama. Kualitasnya tidak perlu diragukan lagi dengan standarisasi produksi yang begitu ketat sehingga produk yang dihasilkan memiliki ketahanan bertahun-tahun.</p>',
                    product_group: {
                        id: 5,
                        name: 'Krisbow Bor Listrik 13MM (650W)'
                    },
                    specifications: [],
                    variants: [],
                    variant_count: 0,
                    variant_matrix: [],
                    variant_value: 'NO_VARIANT'
                },
                vendors: [
                    {
                        id: 14,
                        vendor_id: 2,
                        vendor_name: 'PT Vendor Growth Tbk',
                        vendor_trademark: 'Trademark-edit',
                        vendor_pkp: 0,
                        vendor_logo: 'https://bizzyx-growth-entity-pub-s3-staging.s3.amazonaws.com/pub_98f4491c-42b8-4bed-a024-e34e8396392e.png',
                        warehouse_id: 2,
                        warehouse_name: 'Gudang Pusat',
                        warehouse_hub_id: 1,
                        warehouse_hub_shipper: [],
                        warehouse_hub: {
                            id: 1,
                            name: 'Jakarta-aCommerce',
                            address: 'Intirub Business Park Warehouse Phase 1 Ground Floor Kav 47-48, Jalan Cililitan Besar No.454, RT.7/RW.11, Kebon Pala, Makasar, Jakarta Timur 13570',
                            phone: '-',
                            geograph: {
                                id: 69093,
                                province: 'Jakarta',
                                city: 'Jakarta Timur',
                                district: 'Makasar',
                                village: 'Makasar',
                                zipcode: '13570',
                                geotag: '1006115174',
                                jnecitycode: 'CGK10507'
                            }
                        },
                        stock_available: 19529,
                        currency: 'IDR',
                        warehouse_geograph: {
                            id: 16044,
                            province: 'Jakarta',
                            city: 'Jakarta Selatan',
                            district: 'Pasar Minggu',
                            village: 'Kebagusan',
                            zipcode: '12520',
                            geotag: '1006115103',
                            jnecitycode: 'CGK10206'
                        },
                        vendor_joined_at: '2018-01-05T12:48:22.000Z',
                        sku_vendor: 'D08ZHUUPVB'
                    },
                    {
                        id: 135,
                        vendor_id: 485,
                        vendor_name: 'PT MFP vendor Tbk',
                        vendor_trademark: '',
                        vendor_pkp: 1,
                        vendor_logo: '',
                        warehouse_id: 170,
                        warehouse_name: 'PT. MFP vendor Tbk',
                        warehouse_hub_id: 1,
                        warehouse_hub_shipper: [],
                        warehouse_hub: {
                            id: 1,
                            name: 'Jakarta-aCommerce',
                            address: 'Intirub Business Park Warehouse Phase 1 Ground Floor Kav 47-48, Jalan Cililitan Besar No.454, RT.7/RW.11, Kebon Pala, Makasar, Jakarta Timur 13570',
                            phone: '-',
                            geograph: {
                                id: 69093,
                                province: 'Jakarta',
                                city: 'Jakarta Timur',
                                district: 'Makasar',
                                village: 'Makasar',
                                zipcode: '13570',
                                geotag: '1006115174',
                                jnecitycode: 'CGK10507'
                            }
                        },
                        stock_available: 200,
                        currency: 'IDR',
                        warehouse_geograph: {
                            id: 16024,
                            province: 'Jakarta',
                            city: 'Jakarta Selatan',
                            district: 'Kebayoran Baru',
                            village: 'Senayan',
                            zipcode: '12190',
                            geotag: '1006115084',
                            jnecitycode: 'CGK10202'
                        },
                        vendor_joined_at: '2018-09-10T04:07:57.000Z',
                        sku_vendor: ''
                    },
                    {
                        id: 11,
                        vendor_id: 3,
                        vendor_name: 'PT Vendor Jaya ',
                        vendor_trademark: 'Vendor Jaya',
                        vendor_pkp: 1,
                        vendor_logo: 'https://bizzyx-growth-entity-pub-s3-staging.s3.amazonaws.com/pub_5fdcd09c-d045-4c5b-9960-c5f2e8c1d1ce.jpeg',
                        warehouse_id: 3,
                        warehouse_name: 'Gudang Merdeka',
                        warehouse_hub_id: 2,
                        warehouse_hub_shipper: [],
                        warehouse_hub: {
                            id: 2,
                            name: 'Palembang-TUJ',
                            address: 'Jl. Pangeran Ayin No. 333 Kenten Laut, Kec. Talang Kelapa, Kab. Banyu Asin, Palembang 30961',
                            phone: '-',
                            geograph: {
                                id: 27027,
                                province: 'Sumatera Selatan',
                                city: 'Banyu Asin',
                                district: 'Talang Kelapa',
                                village: 'Kenten Laut',
                                zipcode: '30961',
                                geotag: '1006133271',
                                jnecitycode: 'PLM21015'
                            }
                        },
                        stock_available: 119,
                        currency: 'IDR',
                        warehouse_geograph: {
                            id: 1372,
                            province: 'Sumatera Selatan',
                            city: 'Palembang',
                            district: 'Plaju',
                            village: 'Plaju Ilir',
                            zipcode: '30268',
                            geotag: '1006132372',
                            jnecitycode: 'PLM10001'
                        },
                        vendor_joined_at: '2018-01-05T12:53:17.000Z',
                        sku_vendor: ''
                    }
                ],
                pricing: [
                    {
                        id: 7,
                        sku: 'YTTJR6RNNY',
                        type: null,
                        tier_data: {
                            tier_min_qty_1: 2,
                            tier_price_1: 250000,
                            tier_min_qty_2: 50,
                            tier_price_2: 245000,
                            tier_min_qty_3: 100,
                            tier_price_3: 240000
                        },
                        cid: 'f5005ec17c191bad3e29b403b4f233c51214cc02e388c699cdbd315b753cd011e8ad0523898879fad1cadafb61138f2156ca22845f0ed37298c45c3d2e645e2d777a0e66d6c0b81eb164028ac1e58a051434a4d6ab28aa55c15f894d33258625c172356e97027a6eab5c00582a1e3b50',
                        top_days: 0,
                        is_contract_price: false,
                        is_franco: 0,
                        shipping: [],
                        channel_type: 'MP',
                        is_contract: 0,
                        vendor_id: '2'
                    },
                    {
                        id: 7,
                        sku: 'YTTJR6RNNY',
                        type: null,
                        tier_data: {
                            tier_min_qty_1: 1,
                            tier_price_1: 486000,
                            tier_min_qty_2: 30,
                            tier_price_2: 470000,
                            tier_min_qty_3: 90,
                            tier_price_3: 430000
                        },
                        cid: '72f0ed223c48f5443a4c7868099fe80c66bb98f6109ce9598633c7ae6d4b09de7af392adc4d2a24c2e92e93c64fb2283a142f105c9a0baa1dc1dd536eb745961924bdfb7074ea41ab7d0cc4b8308b8f995171df5d4f2d2acc3ebba1051cc6b9b31cb323aa46b8425e382dd0c338c1e6a',
                        top_days: 0,
                        is_contract_price: false,
                        is_franco: 0,
                        shipping: [],
                        channel_type: 'MP',
                        is_contract: 0,
                        vendor_id: '485'
                    },
                    {
                        id: 7,
                        sku: 'YTTJR6RNNY',
                        type: null,
                        tier_data: {
                            tier_min_qty_1: 6,
                            tier_price_1: 600001
                        },
                        cid: '188245ede5d708c7977816fed583fc91db29314ee556e17af8de11c6df1ab8eca867b26124be3fffed48c8873ee0d00a',
                        top_days: 0,
                        is_contract_price: false,
                        is_franco: 0,
                        shipping: [],
                        channel_type: 'MP',
                        is_contract: 0,
                        vendor_id: '3'
                    }
                ],
                total_price: 275000
            }
        };
        t.deepEqual(result, expected2);
        t.pass();
    } catch (err) {
        console.log(err);
        t.fail('Should return snapshots product');
    }
});


test.serial('Should be return snapshot product without token', function* (t) {
    t.context.sandbox.stub(SyncRepo, 'getSnapshotPdp').resolves(resFindOne);
    t.context.sandbox.stub(ProductMappingRepo, 'findMappingSku').resolves(resMapping);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            body: {
                quotation_item: '111',
                sku: 'YTTJR6RNNY'
            }
        };
        const result = yield Method.getSnapshotProduct(data, context);
        t.deepEqual(result, expected);
        t.pass();
    } catch (err) {
        console.log(err.message);
        t.fail('Should return snapshots product');
    }
});

test.serial('Should be return snapshot product without token: error auth', function* (t) {
    t.context.sandbox.stub(SyncRepo, 'getSnapshotPdp').resolves(resFindOne);
    t.context.sandbox.stub(ProductMappingRepo, 'findMappingSku').resolves(resMapping);
    try {
        const context = require('../../../mocks/context.json');
        const data = {
            body: {
                quotation_item: '111',
                sku: 'YTTJR6RNNY'
            }
        };
        const result = yield Method.getSnapshotProduct(data, context);
        t.deepEqual(result, expected);
        t.pass();
    } catch (err) {
        console.log(err.message);
        t.fail('Should return snapshots product');
    }
});


test.serial('Should be return snapshot - sku not found', function* (t) {
    t.context.sandbox.stub(SyncRepo, 'getSnapshotPdp').resolves(resFindOne);
    t.context.sandbox.stub(ProductMappingRepo, 'findMappingSku').resolves(resMapping);
    try {
        const context = require('../../../mocks/contextSystem.json');
        const data = {
            body: {
                quotation_item: '111',
                sku: 'YTTJR6RNNYXXX',
                token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6InN5c3RlbSIsInB1bmNob3V0Ijp7ImlzX3B1bmNob3V0Ijp0cnVlLCJpc191c2VyX3B1bmNob3V0Ijp0cnVlLCJzYWxlc19hZG1pbl9pZCI6NTQxOSwiZGF0YSI6eyJvcmdhbml6YXRpb25faWQiOjQyLCJsYW5ndWFnZSI6IlBDSSIsInB1cmNoYXNpbmdfc3lzdGVtIjoiU1JNIiwic2FsZXNfYWRtaW5faWQiOjU0MTksImNsaWVudF92ZW5kb3JfaWQiOiIxMjM0NWFhIiwib3JkZXJfc2V0dGluZyI6eyJjb250cmFjdCI6MSwic2hpcHBpbmdfY29zdCI6MSwibWFwcGluZyI6MSwicHBuIjoxfSwicGF5bG9hZCI6eyJzYXAtY2xpZW50IjoiMjAwIiwic2FwLWxhbmd1YWdlIjoiRSIsIkJZUEFTU19JTkJfSEFORExFUiI6IlgiLCJPQ0lfVkVSU0lPTiI6IjQuMCIsIk9QSV9WRVJTSU9OIjoiMS4wIiwicmV0dXJudGFyZ2V0IjoiX3RvcCIsIkhPT0tfVVJMIjoiaHR0cHM6Ly9zcm03cWFzcG9ydGFsLnNpbmFybWFzLWFncmkuY29tIiwiQ0FUQUxPR19VUkwiOiJodHRwczovL3N0YWdpbmctcGhvZW5peC5iaXp6eS5jby5pZC9jdXN0b21lci9wdW5jaG91dC9ob29rL2ZlOGVhNTk3LTkyYWMtNTY3Ni1iMDZjLTg1Yjg3MmUxNTFiOCIsIlBST0RVQ1RJRCI6IlFBQkJIWTExNTErfCsxNTQ4In19fSwiY3VzdG9tZXIiOnsib3JnYW5pemF0aW9uX2lkIjo0Mn0sImlzX3N5c3RlbSI6dHJ1ZSwiaWF0IjoxNTM3NDE5OTM0LCJleHAiOjE1Mzc0MjcxMzR9.10kr27qMK0yOe1uRZbdbOdH_G2C7xwFBJA0z-GSPkZrTeMd02XmTDjZxfmO19Qe6VtHCLTNv3pe-554Tr2re8UK5MIHSyU4dfWYR_S94O0XDJjzs_7ePjrzTN21fpovqmyTpIBy1D2fV6CXYppiXdh8_wUAa3CfwBXXIJQDkfFW-PDtBr2yl1qdUwT3B4_4vUo-XPovlQpS4GdmZgNEDXkhz8p_E1K7jUIv1TpuyjpntCpD4J2SdOk8gyKPuneAcoT6OiNa0I7UKy8R5AXVi8ie76TQvC8LijVJ6MsCYhZ9afRWQ9f6X1L1hNuHxJsCzta1nc-P47pX2C_4crZANNQ'
            }
        };
        yield Method.getSnapshotProduct(data, context);
        t.fail('Should return snapshots product not found');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound);
    }
});

test.serial('Should be return snapshot - product not found', function* (t) {
    t.context.sandbox.stub(SyncRepo, 'getSnapshotPdp').rejects();
    t.context.sandbox.stub(ProductMappingRepo, 'findMappingSku').resolves(resMapping);
    try {
        const context = require('../../../mocks/contextSystem.json');
        const data = {
            body: {
                quotation_item: '111',
                sku: 'YTTJR6RNNY',
                token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6InN5c3RlbSIsInB1bmNob3V0Ijp7ImlzX3B1bmNob3V0Ijp0cnVlLCJpc191c2VyX3B1bmNob3V0Ijp0cnVlLCJzYWxlc19hZG1pbl9pZCI6NTQxOSwiZGF0YSI6eyJvcmdhbml6YXRpb25faWQiOjQyLCJsYW5ndWFnZSI6IlBDSSIsInB1cmNoYXNpbmdfc3lzdGVtIjoiU1JNIiwic2FsZXNfYWRtaW5faWQiOjU0MTksImNsaWVudF92ZW5kb3JfaWQiOiIxMjM0NWFhIiwib3JkZXJfc2V0dGluZyI6eyJjb250cmFjdCI6MSwic2hpcHBpbmdfY29zdCI6MSwibWFwcGluZyI6MSwicHBuIjoxfSwicGF5bG9hZCI6eyJzYXAtY2xpZW50IjoiMjAwIiwic2FwLWxhbmd1YWdlIjoiRSIsIkJZUEFTU19JTkJfSEFORExFUiI6IlgiLCJPQ0lfVkVSU0lPTiI6IjQuMCIsIk9QSV9WRVJTSU9OIjoiMS4wIiwicmV0dXJudGFyZ2V0IjoiX3RvcCIsIkhPT0tfVVJMIjoiaHR0cHM6Ly9zcm03cWFzcG9ydGFsLnNpbmFybWFzLWFncmkuY29tIiwiQ0FUQUxPR19VUkwiOiJodHRwczovL3N0YWdpbmctcGhvZW5peC5iaXp6eS5jby5pZC9jdXN0b21lci9wdW5jaG91dC9ob29rL2ZlOGVhNTk3LTkyYWMtNTY3Ni1iMDZjLTg1Yjg3MmUxNTFiOCIsIlBST0RVQ1RJRCI6IlFBQkJIWTExNTErfCsxNTQ4In19fSwiY3VzdG9tZXIiOnsib3JnYW5pemF0aW9uX2lkIjo0Mn0sImlzX3N5c3RlbSI6dHJ1ZSwiaWF0IjoxNTM3NDE5OTM0LCJleHAiOjE1Mzc0MjcxMzR9.10kr27qMK0yOe1uRZbdbOdH_G2C7xwFBJA0z-GSPkZrTeMd02XmTDjZxfmO19Qe6VtHCLTNv3pe-554Tr2re8UK5MIHSyU4dfWYR_S94O0XDJjzs_7ePjrzTN21fpovqmyTpIBy1D2fV6CXYppiXdh8_wUAa3CfwBXXIJQDkfFW-PDtBr2yl1qdUwT3B4_4vUo-XPovlQpS4GdmZgNEDXkhz8p_E1K7jUIv1TpuyjpntCpD4J2SdOk8gyKPuneAcoT6OiNa0I7UKy8R5AXVi8ie76TQvC8LijVJ6MsCYhZ9afRWQ9f6X1L1hNuHxJsCzta1nc-P47pX2C_4crZANNQ'
            }
        };
        yield Method.getSnapshotProduct(data, context);
        t.fail('Should return snapshots product not found');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound);
    }
});

test.serial('Should be return snapshot - Auth Forbidden', function* (t) {
    t.context.sandbox.stub(Repo, 'findOne').resolves(null);
    try {
        const data = {
            body: {
                quotation_item: '111',
                sku: 'YTTJR6RNNY'
            }
        };
        yield Method.getSnapshotProduct(data, {});
        t.fail('Should return snapshots Auth Forbidden');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden);
    }
});

test.serial('Should be return snapshot - Auth Forbidden Token', function* (t) {
    t.context.sandbox.stub(Repo, 'findOne').resolves(null);
    try {
        const data = {
            body: {
                quotation_item: '111',
                sku: 'YTTJR6RNNY',
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
            }
        };
        yield Method.getSnapshotProduct(data, {});
        t.fail('Should return snapshots Auth Forbidden');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden);
    }
});

test.serial('Should be return snapshot - bad request', function* (t) {
    t.context.sandbox.stub(Repo, 'findOne').resolves(null);
    try {
        const context = require('../../../mocks/contextSystem.json');
        const data = {
            body: {
                quotation_items: '111',
                sku: 'YTTJR6RNNY',
                token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6InN5c3RlbSIsInB1bmNob3V0Ijp7ImlzX3B1bmNob3V0Ijp0cnVlLCJpc191c2VyX3B1bmNob3V0Ijp0cnVlLCJzYWxlc19hZG1pbl9pZCI6NTQxOSwiZGF0YSI6eyJvcmdhbml6YXRpb25faWQiOjQyLCJsYW5ndWFnZSI6IlBDSSIsInB1cmNoYXNpbmdfc3lzdGVtIjoiU1JNIiwic2FsZXNfYWRtaW5faWQiOjU0MTksImNsaWVudF92ZW5kb3JfaWQiOiIxMjM0NWFhIiwib3JkZXJfc2V0dGluZyI6eyJjb250cmFjdCI6MSwic2hpcHBpbmdfY29zdCI6MSwibWFwcGluZyI6MSwicHBuIjoxfSwicGF5bG9hZCI6eyJzYXAtY2xpZW50IjoiMjAwIiwic2FwLWxhbmd1YWdlIjoiRSIsIkJZUEFTU19JTkJfSEFORExFUiI6IlgiLCJPQ0lfVkVSU0lPTiI6IjQuMCIsIk9QSV9WRVJTSU9OIjoiMS4wIiwicmV0dXJudGFyZ2V0IjoiX3RvcCIsIkhPT0tfVVJMIjoiaHR0cHM6Ly9zcm03cWFzcG9ydGFsLnNpbmFybWFzLWFncmkuY29tIiwiQ0FUQUxPR19VUkwiOiJodHRwczovL3N0YWdpbmctcGhvZW5peC5iaXp6eS5jby5pZC9jdXN0b21lci9wdW5jaG91dC9ob29rL2ZlOGVhNTk3LTkyYWMtNTY3Ni1iMDZjLTg1Yjg3MmUxNTFiOCIsIlBST0RVQ1RJRCI6IlFBQkJIWTExNTErfCsxNTQ4In19fSwiY3VzdG9tZXIiOnsib3JnYW5pemF0aW9uX2lkIjo0Mn0sImlzX3N5c3RlbSI6dHJ1ZSwiaWF0IjoxNTM3NDE5OTM0LCJleHAiOjE1Mzc0MjcxMzR9.10kr27qMK0yOe1uRZbdbOdH_G2C7xwFBJA0z-GSPkZrTeMd02XmTDjZxfmO19Qe6VtHCLTNv3pe-554Tr2re8UK5MIHSyU4dfWYR_S94O0XDJjzs_7ePjrzTN21fpovqmyTpIBy1D2fV6CXYppiXdh8_wUAa3CfwBXXIJQDkfFW-PDtBr2yl1qdUwT3B4_4vUo-XPovlQpS4GdmZgNEDXkhz8p_E1K7jUIv1TpuyjpntCpD4J2SdOk8gyKPuneAcoT6OiNa0I7UKy8R5AXVi8ie76TQvC8LijVJ6MsCYhZ9afRWQ9f6X1L1hNuHxJsCzta1nc-P47pX2C_4crZANNQ'
            }
        };
        yield Method.getSnapshotProduct(data, context);
        t.fail('Should return snapshots - bad request');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest);
    }
});

test.serial('Should return success post snapshots', function* (t) {
    const context = require('../../../mocks/context.json');
    t.context.sandbox.stub(ProductVariantRepo, 'findOne').resolves(resProductVariant);
    t.context.sandbox.stub(SyncRepo, 'getSku').resolves(resGetSku);
    t.context.sandbox.stub(SyncRepo, 'getVendors').resolves(resProductVendor);
    t.context.sandbox.stub(SyncRepo, 'getPrincing').resolves(resPricing);
    t.context.sandbox.stub(ProductMappingRepo, 'findMappingSku').resolves(resMapping);
    t.context.sandbox.stub(Repo, 'insertMany').resolves(true);
    try {
        yield Method.postSnapshotProduct(payloadPost, context);
        t.pass();
    } catch (err) {
        console.log(err);
        t.fail('Should return success post snapshots');
    }
});


test.serial('Should return success post snapshots: with another data', function* (t) {
    const context = require('../../../mocks/context.json');
    t.context.sandbox.stub(ProductVariantRepo, 'findOne').resolves(resProductVariant);
    t.context.sandbox.stub(SyncRepo, 'getSku').resolves(resGetSku);
    t.context.sandbox.stub(SyncRepo, 'getVendors').resolves(resProductVendor);
    t.context.sandbox.stub(SyncRepo, 'getPrincing').resolves(resPricing);
    t.context.sandbox.stub(ProductMappingRepo, 'findMappingSku').resolves(null);
    t.context.sandbox.stub(Repo, 'insertMany').resolves(true);
    try {
        yield Method.postSnapshotProduct(payloadPost, context);
        t.pass();
    } catch (err) {
        console.log(err);
        t.fail('Should return success post snapshots');
    }
});

test.serial('Should return success post snapshots', function* (t) {
    const context = require('../../../mocks/context.json');
    t.context.sandbox.stub(ProductVariantRepo, 'findOne').resolves(resProductVariant);
    t.context.sandbox.stub(SyncRepo, 'getSku').resolves(resGetSku);
    t.context.sandbox.stub(SyncRepo, 'getVendors').resolves(resProductVendor);
    t.context.sandbox.stub(SyncRepo, 'getPrincing').resolves(resPricing);
    t.context.sandbox.stub(ProductMappingRepo, 'findMappingSku').resolves([]);
    t.context.sandbox.stub(Repo, 'insertMany').resolves(true);
    try {
        yield Method.postSnapshotProduct(payloadPost, context);
        t.pass();
    } catch (err) {
        console.log(err);
        t.fail('Should return success post snapshots');
    }
});

test.serial('Should return failed post snapshots - bad request', function* (t) {
    const context = require('../../../mocks/context.json');
    t.context.sandbox.stub(ProductVariantRepo, 'findOne').resolves(resProductVariant);
    t.context.sandbox.stub(SyncRepo, 'getSku').resolves(resGetSku);
    t.context.sandbox.stub(SyncRepo, 'getVendors').resolves(resProductVendor);
    t.context.sandbox.stub(SyncRepo, 'getPrincing').resolves(resPricing);
    t.context.sandbox.stub(ProductMappingRepo, 'findMappingSku').resolves(resMapping);
    t.context.sandbox.stub(Repo, 'insertMany').resolves(true);
    try {
        yield Method.postSnapshotProduct({
            body: {
                id: 1
            }
        }, context);
        t.fail('Should return failed post snapshots - badrequest');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest);
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
