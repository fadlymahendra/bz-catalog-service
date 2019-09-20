'use strict';

const Promise = require('bizzy-common');
const { BizzyError, BizzyService } = require('bizzy-common');
const test = require('ava');
const sinon = require('sinon');
const ProductGroupRepository = require('../../../../src/repositories/product_group');
const SyncRepository = require('../../../../src/repositories/sync_service');
const ProductVendorRepository = require('../../../../src/repositories/product_vendor');
const VendorRepository = require('../../../../src/repositories/vendor');
const Methods = require('../../../../src/methods/product-detail/vendor_price');
const context = require('../../../mocks/context.json');

const datas = {
    body: {
        sku: 'WBQH1BWFAN',
        variant_id: 4,
        product_group_id: 2,
        to: 2
    }
};

const resultFindIdPG = {
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
    package_length: '100.00',
    package_width: '200.00',
    package_height: '300.00',
    package_content: 'iPhone X features a new all-screen design. Face ID, which makes your face your password. And the most powerful and smartest chip ever in a smartphone.',
    barcode: '5012345678900',
    description: '<p>Visi Apple sejak awal adalah menciptakan iPhone yang sepenuhnya berisi layar. Yang begitu menghanyutkan sehingga tak ada lagi batasan antara perangkat dan pengalaman. Dan begitu cerdas sehingga dapat merespons dengan sekali sentuh, atau bahkan sekali pandang. Dengan iPhone X, visi ini menjadi kenyataan. Selamat datang, masa depan.\n\nDi iPhone X, layarnya adalah perangkatnya. Layar Super Retina 5,8 inci yang baru sempurna dalam genggaman dan memukau pandangan. Layar dirancang dengan teknik dan teknologi baru untuk mengikuti lekukan desain dengan presisi, bahkan ke sudut-sudut melengkung yang begitu elegan. Desain yang sepenuhnya baru. Kaca terkuat yang pernah ada di ponsel pintar, baik depan maupun belakang. Baja tahan karat sekelas peralatan bedah. Pengisian daya nirkabel. Tahan air dan debu. Gerakan Intuitif, semua gerakan yang sudah tidak asing lagi membuat navigasi terasa natural dan intuitif. Tanpa menekan tombol, tapi cukup dengan sekali usap saja Anda akan kembali ke layar Home, dari mana pun. Kamera Ganda 12 MP. Seni fotografi jadi lebih sederhana dengan dukungan prosesor A11 Bionic. Chip yang paling andal dan cerdas di ponsel pintar, dengan mesin neural yang mampu menangani hingga 600 miliar operasi per detik. Empat core efisiensi di CPU yang baru lebih cepat hingga 70 persen dibandingkan Fusion A10.</p>',
    primary_image: 'https://cf.shopee.co.id/file/0eb2207f2d47ad314ab353f783cf2b01',
    variant_count: 2,
    variant_matrix: '["phone_color","phone_storage"]',
    status: 1,
    visibility: 1,
    created_by: 2,
    created_at: '2017-12-19T14:59:19.000Z',
    updated_at: '2018-01-24T08:56:47.000Z'
};

const getRatingByVendorIds = {
    data: [{
        organization_uuid: '6fec9b99-e3e8-11e8-b92b-06b0976369e4',
        ratings: {
            PO_APPROVE_RATE: {
                unit: 'PERCENTAGE', value: 100.00
            },
            PO_PROCESS_TIME: {
                unit: 'HOUR', value: 44.04
            },
            PO_RESPONSE_TIME: {
                unit: 'HOUR', value: 179.41
            },
            PO_APPROVE_TIME: {
                unit: 'HOUR', value: 3.01
            }
        }
    }, {
        organization_uuid: '4761dad2-e9a4-11e8-8841-021d5f0f1c74',
        ratings: {
            PO_APPROVE_RATE: {
                unit: 'PERCENTAGE', value: 100.00
            },
            PO_PROCESS_TIME: {
                unit: 'HOUR', value: 44.04
            },
            PO_RESPONSE_TIME: {
                unit: 'HOUR', value: 179.41
            },
            PO_APPROVE_TIME: {
                unit: 'HOUR', value: 3.01
            }
        }
    }]
};

test.serial('Should be return success', function* (t) {
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves(resultFindIdPG);
    t.context.sandbox.stub(ProductVendorRepository, 'findByVariant').resolves([
        {
            id: 97,
            product_variant_id: 4,
            vendor_id: 345,
            warehouse_id: 145,
            location_label: 'Jakarta',
            stock_available: 977,
            stock_used: 23,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 11,
            tier_min_qty_3: 21,
            tier_cogs_price_1: '9000000.00',
            tier_cogs_price_2: '8900000.00',
            tier_cogs_price_3: '8800000.00',
            warranty_option: 'no_warranty',
            warranty_period: null,
            warranty_limit: null,
            warranty_coverage: null,
            indent_period: 'month',
            indent_limit: 1,
            reference_link: '[]',
            sku_vendor: 'dj-1',
            is_indent: 1,
            is_active: 1,
            created_by: 975,
            is_contract: 0,
            created_at: '2018-06-06T08:49:37.000Z',
            updated_at: '2018-08-06T06:49:30.000Z',
            is_decimal: 0,
            down_payment_type: 0,
            down_payment_value: 0

        }
    ]);
    t.context.sandbox.stub(BizzyService, 'callSync').resolves({
        data: [
            {
                id: 145,
                organization_address_id: 525,
                type_id: 1,
                is_primary: 1,
                warehouse_hub_id: 1,
                warehouse_hub: {
                    id: 1,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    address: 'Intirub Business Park Warehouse Phase 1 Ground Floor Kav 47-48, Jalan Cililitan Besar No.454, RT.7/RW.11, Kebon Pala, Makasar, Jakarta Timur 13570',
                    phone: '-',
                    geograph: {
                        id: 69089,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                warehouse_hub_shipper: [],
                warehouse_address: {
                    id: 525,
                    organization_id: 345,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    internal_code: null,
                    place: 'Gedung Dim V 1',
                    street: 'Jalan Tim V 1',
                    geograph_id: 69089,
                    phone: '6221831290830912',
                    status: 1,
                    company_name: null,
                    geograph: {
                        id: 69089,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                vendor: {
                    id: 345,
                    prefix: 'PT',
                    name: 'DJ VENDOR 1',
                    suffix: '',
                    status_pkp: 1,
                    place: 'Gedung Dim V 1',
                    street: 'Jalan Tim V 1',
                    trademark: 'DJ 1',
                    created_at: '2018-06-05T08:31:31.000Z',
                    logo: null,
                    geograph: {
                        id: 11594,
                        province: 'Sumatera Selatan',
                        city: 'Palembang',
                        district: 'Alang-Alang Lebar',
                        village: 'Karya Baru',
                        zipcode: '30151',
                        geotag: '1006132327',
                        jnecitycode: 'PLM10017'
                    }
                }
            }
        ]
    });

    t.context.sandbox.stub(SyncRepository, 'getPriceContract').resolves([{
        id: 11756,
        sku: '75312DCDBD',
        type: null,
        tier_data: {
            tier_min_qty_1: 1,
            tier_price_1: 24800,
            tier_min_qty_2: 24,
            tier_price_2: 24153,
            tier_min_qty_3: 60,
            tier_price_3: 23722
        },
        cid: '72f0ed223c48f5443a4c7868099fe80c19c191ae04e91ecd2cf0fc51ef8e598f010d0d2ec4f6887033def119756249d06a6b8e6fc403e06bb0ce4e80b7a6bfb46ac60c9c40026601fc5e1fef056070e70b22ef4cfdd58e8485ba950e3610e03674657b3807741fc8e76958567a3b87f9',
        top_days: 0,
        is_contract_price: false,
        is_franco: 0,
        shipping: [],
        channel_type: 'MP',
        is_contract: 0,
        vendor_id: '345'
    }]);

    t.context.sandbox.stub(SyncRepository, 'getOrganizationsByIds').resolves({
        data: [{
            uuid: '6fec9b99-e3e8-11e8-b92b-06b0976369e4',
            id: 345
        }]
    });

    const expected = {
        data: [
            {
                id: 97,
                uuid: '6fec9b99-e3e8-11e8-b92b-06b0976369e4',
                vendor_id: 345,
                vendor_joined_at: '2018-06-05T08:31:31.000Z',
                vendor_name: 'PT DJ VENDOR 1 ',
                vendor_trademark: 'DJ 1',
                vendor_pkp: 1,
                vendor_logo: '',
                warehouse_id: 145,
                warehouse_name: 'Warehouse PT. DJ VENDOR 1',
                warehouse_hub_id: 1,
                warehouse_hub_shipper: [],
                warehouse_hub: {
                    id: 1,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    address: 'Intirub Business Park Warehouse Phase 1 Ground Floor Kav 47-48, Jalan Cililitan Besar No.454, RT.7/RW.11, Kebon Pala, Makasar, Jakarta Timur 13570',
                    phone: '-',
                    geograph: {
                        id: 69089,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                stock_available: 977,
                currency: 'IDR',
                warehouse_geograph: {
                    id: 69089,
                    province: 'Jakarta',
                    city: 'Jakarta Selatan',
                    district: 'Setia Budi',
                    village: 'Setiabudi',
                    zipcode: '12910',
                    geotag: '1006115132',
                    jnecitycode: 'CGK10208'
                },
                sku_vendor: 'dj-1',
                warranty_coverage: null,
                warranty_limit: null,
                warranty_option: 'no_warranty',
                warranty_period: null,
                price: {
                    id: 11756,
                    sku: '75312DCDBD',
                    tier_data: {
                        tier_min_qty_1: 1,
                        tier_price_1: 24800,
                        tier_min_qty_2: 24,
                        tier_price_2: 24153,
                        tier_min_qty_3: 60,
                        tier_price_3: 23722
                    },
                    cid: '72f0ed223c48f5443a4c7868099fe80c19c191ae04e91ecd2cf0fc51ef8e598f010d0d2ec4f6887033def119756249d06a6b8e6fc403e06bb0ce4e80b7a6bfb46ac60c9c40026601fc5e1fef056070e70b22ef4cfdd58e8485ba950e3610e03674657b3807741fc8e76958567a3b87f9',
                    top_days: 0,
                    is_contract_price: false,
                    channel_type: 'MP',
                    vendor_id: '345',
                    from_franco: false
                },
                indent_limit: 1,
                indent_period: 'month',
                is_indent: 1,
                is_decimal: 0,
                down_payment_type: 0,
                down_payment_value: 0,
                rating_process_time: null
            }
        ]
    };

    try {
        const result = yield Methods.getVendorPrice(datas, context);
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err.stack);
    }
});

test.serial('Should be return success DP percentage', function* (t) {
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves(resultFindIdPG);
    t.context.sandbox.stub(ProductVendorRepository, 'findByVariant').resolves([
        {
            id: 97,
            product_variant_id: 4,
            vendor_id: 345,
            warehouse_id: 145,
            location_label: 'Jakarta',
            stock_available: 977,
            stock_used: 23,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 11,
            tier_min_qty_3: 21,
            tier_cogs_price_1: '9000000.00',
            tier_cogs_price_2: '8900000.00',
            tier_cogs_price_3: '8800000.00',
            warranty_option: 'no_warranty',
            warranty_period: null,
            warranty_limit: null,
            warranty_coverage: null,
            indent_period: 'month',
            indent_limit: 1,
            reference_link: '[]',
            sku_vendor: 'dj-1',
            is_indent: 1,
            is_active: 1,
            created_by: 975,
            is_contract: 0,
            created_at: '2018-06-06T08:49:37.000Z',
            updated_at: '2018-08-06T06:49:30.000Z',
            is_decimal: 0,
            down_payment_type: 1,
            down_payment_value: 25
        }
    ]);
    t.context.sandbox.stub(BizzyService, 'callSync').resolves({
        data: [
            {
                id: 145,
                organization_address_id: 525,
                type_id: 1,
                is_primary: 1,
                warehouse_hub_id: 1,
                warehouse_hub: {
                    id: 1,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    address: 'Intirub Business Park Warehouse Phase 1 Ground Floor Kav 47-48, Jalan Cililitan Besar No.454, RT.7/RW.11, Kebon Pala, Makasar, Jakarta Timur 13570',
                    phone: '-',
                    geograph: {
                        id: 69089,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                warehouse_hub_shipper: [],
                warehouse_address: {
                    id: 525,
                    organization_id: 345,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    internal_code: null,
                    place: 'Gedung Dim V 1',
                    street: 'Jalan Tim V 1',
                    geograph_id: 69089,
                    phone: '6221831290830912',
                    status: 1,
                    company_name: null,
                    geograph: {
                        id: 69089,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                vendor: {
                    id: 345,
                    prefix: 'PT',
                    name: 'DJ VENDOR 1',
                    suffix: '',
                    status_pkp: 1,
                    place: 'Gedung Dim V 1',
                    street: 'Jalan Tim V 1',
                    trademark: 'DJ 1',
                    created_at: '2018-06-05T08:31:31.000Z',
                    logo: null,
                    geograph: {
                        id: 11594,
                        province: 'Sumatera Selatan',
                        city: 'Palembang',
                        district: 'Alang-Alang Lebar',
                        village: 'Karya Baru',
                        zipcode: '30151',
                        geotag: '1006132327',
                        jnecitycode: 'PLM10017'
                    }
                }
            }
        ]
    });

    t.context.sandbox.stub(SyncRepository, 'getPriceContract').resolves([{
        id: 11756,
        sku: '75312DCDBD',
        type: null,
        tier_data: {
            tier_min_qty_1: 1,
            tier_price_1: 24800,
            tier_min_qty_2: 24,
            tier_price_2: 24153,
            tier_min_qty_3: 60,
            tier_price_3: 23722
        },
        cid: '72f0ed223c48f5443a4c7868099fe80c19c191ae04e91ecd2cf0fc51ef8e598f010d0d2ec4f6887033def119756249d06a6b8e6fc403e06bb0ce4e80b7a6bfb46ac60c9c40026601fc5e1fef056070e70b22ef4cfdd58e8485ba950e3610e03674657b3807741fc8e76958567a3b87f9',
        top_days: 0,
        is_contract_price: false,
        is_franco: 0,
        shipping: [],
        channel_type: 'MP',
        is_contract: 0,
        vendor_id: '345'
    }]);

    t.context.sandbox.stub(SyncRepository, 'getOrganizationsByIds').resolves({
        data: [{
            uuid: '6fec9b99-e3e8-11e8-b92b-06b0976369e4',
            id: 345
        }]
    });

    const expected = {
        data: [
            {
                id: 97,
                uuid: '6fec9b99-e3e8-11e8-b92b-06b0976369e4',
                vendor_id: 345,
                vendor_joined_at: '2018-06-05T08:31:31.000Z',
                vendor_name: 'PT DJ VENDOR 1 ',
                vendor_trademark: 'DJ 1',
                vendor_pkp: 1,
                vendor_logo: '',
                warehouse_id: 145,
                warehouse_name: 'Warehouse PT. DJ VENDOR 1',
                warehouse_hub_id: 1,
                warehouse_hub_shipper: [],
                warehouse_hub: {
                    id: 1,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    address: 'Intirub Business Park Warehouse Phase 1 Ground Floor Kav 47-48, Jalan Cililitan Besar No.454, RT.7/RW.11, Kebon Pala, Makasar, Jakarta Timur 13570',
                    phone: '-',
                    geograph: {
                        id: 69089,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                stock_available: 977,
                currency: 'IDR',
                warehouse_geograph: {
                    id: 69089,
                    province: 'Jakarta',
                    city: 'Jakarta Selatan',
                    district: 'Setia Budi',
                    village: 'Setiabudi',
                    zipcode: '12910',
                    geotag: '1006115132',
                    jnecitycode: 'CGK10208'
                },
                sku_vendor: 'dj-1',
                warranty_coverage: null,
                warranty_limit: null,
                warranty_option: 'no_warranty',
                warranty_period: null,
                price: {
                    id: 11756,
                    sku: '75312DCDBD',
                    tier_data: {
                        tier_min_qty_1: 1,
                        tier_price_1: 24800,
                        tier_min_qty_2: 24,
                        tier_price_2: 24153,
                        tier_min_qty_3: 60,
                        tier_price_3: 23722
                    },
                    cid: '72f0ed223c48f5443a4c7868099fe80c19c191ae04e91ecd2cf0fc51ef8e598f010d0d2ec4f6887033def119756249d06a6b8e6fc403e06bb0ce4e80b7a6bfb46ac60c9c40026601fc5e1fef056070e70b22ef4cfdd58e8485ba950e3610e03674657b3807741fc8e76958567a3b87f9',
                    top_days: 0,
                    is_contract_price: false,
                    channel_type: 'MP',
                    vendor_id: '345',
                    from_franco: false
                },
                indent_limit: 1,
                indent_period: 'month',
                is_indent: 1,
                is_decimal: 0,
                down_payment_type: 1,
                down_payment_value: 25,
                rating_process_time: null
            }
        ]
    };

    try {
        const result = yield Methods.getVendorPrice(datas, context);
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err.stack);
    }
});

test.serial('Should be return success DP nominal', function* (t) {
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves(resultFindIdPG);
    t.context.sandbox.stub(ProductVendorRepository, 'findByVariant').resolves([
        {
            id: 97,
            product_variant_id: 4,
            vendor_id: 345,
            warehouse_id: 145,
            location_label: 'Jakarta',
            stock_available: 977,
            stock_used: 23,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 11,
            tier_min_qty_3: 21,
            tier_cogs_price_1: '9000000.00',
            tier_cogs_price_2: '8900000.00',
            tier_cogs_price_3: '8800000.00',
            warranty_option: 'no_warranty',
            warranty_period: null,
            warranty_limit: null,
            warranty_coverage: null,
            indent_period: 'month',
            indent_limit: 1,
            reference_link: '[]',
            sku_vendor: 'dj-1',
            is_indent: 1,
            is_active: 1,
            created_by: 975,
            is_contract: 0,
            created_at: '2018-06-06T08:49:37.000Z',
            updated_at: '2018-08-06T06:49:30.000Z',
            is_decimal: 0,
            down_payment_type: 1,
            down_payment_value: 3000000
        }
    ]);
    t.context.sandbox.stub(BizzyService, 'callSync').resolves({
        data: [
            {
                id: 145,
                organization_address_id: 525,
                type_id: 1,
                is_primary: 1,
                warehouse_hub_id: 1,
                warehouse_hub: {
                    id: 1,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    address: 'Intirub Business Park Warehouse Phase 1 Ground Floor Kav 47-48, Jalan Cililitan Besar No.454, RT.7/RW.11, Kebon Pala, Makasar, Jakarta Timur 13570',
                    phone: '-',
                    geograph: {
                        id: 69089,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                warehouse_hub_shipper: [],
                warehouse_address: {
                    id: 525,
                    organization_id: 345,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    internal_code: null,
                    place: 'Gedung Dim V 1',
                    street: 'Jalan Tim V 1',
                    geograph_id: 69089,
                    phone: '6221831290830912',
                    status: 1,
                    company_name: null,
                    geograph: {
                        id: 69089,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                vendor: {
                    id: 345,
                    prefix: 'PT',
                    name: 'DJ VENDOR 1',
                    suffix: '',
                    status_pkp: 1,
                    place: 'Gedung Dim V 1',
                    street: 'Jalan Tim V 1',
                    trademark: 'DJ 1',
                    created_at: '2018-06-05T08:31:31.000Z',
                    logo: null,
                    geograph: {
                        id: 11594,
                        province: 'Sumatera Selatan',
                        city: 'Palembang',
                        district: 'Alang-Alang Lebar',
                        village: 'Karya Baru',
                        zipcode: '30151',
                        geotag: '1006132327',
                        jnecitycode: 'PLM10017'
                    }
                }
            }
        ]
    });

    t.context.sandbox.stub(SyncRepository, 'getPriceContract').resolves([{
        id: 11756,
        sku: '75312DCDBD',
        type: null,
        tier_data: {
            tier_min_qty_1: 1,
            tier_price_1: 24800,
            tier_min_qty_2: 24,
            tier_price_2: 24153,
            tier_min_qty_3: 60,
            tier_price_3: 23722
        },
        cid: '72f0ed223c48f5443a4c7868099fe80c19c191ae04e91ecd2cf0fc51ef8e598f010d0d2ec4f6887033def119756249d06a6b8e6fc403e06bb0ce4e80b7a6bfb46ac60c9c40026601fc5e1fef056070e70b22ef4cfdd58e8485ba950e3610e03674657b3807741fc8e76958567a3b87f9',
        top_days: 0,
        is_contract_price: false,
        is_franco: 0,
        shipping: [],
        channel_type: 'MP',
        is_contract: 0,
        vendor_id: '345'
    }]);

    t.context.sandbox.stub(SyncRepository, 'getOrganizationsByIds').resolves({
        data: [{
            uuid: '6fec9b99-e3e8-11e8-b92b-06b0976369e4',
            id: 345
        }]
    });

    t.context.sandbox.stub(SyncRepository, 'getRatingByVendorIds').resolves(getRatingByVendorIds);

    const expected = {
        data: [
            {
                id: 97,
                uuid: '6fec9b99-e3e8-11e8-b92b-06b0976369e4',
                vendor_id: 345,
                vendor_joined_at: '2018-06-05T08:31:31.000Z',
                vendor_name: 'PT DJ VENDOR 1 ',
                vendor_trademark: 'DJ 1',
                vendor_pkp: 1,
                vendor_logo: '',
                warehouse_id: 145,
                warehouse_name: 'Warehouse PT. DJ VENDOR 1',
                warehouse_hub_id: 1,
                warehouse_hub_shipper: [],
                warehouse_hub: {
                    id: 1,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    address: 'Intirub Business Park Warehouse Phase 1 Ground Floor Kav 47-48, Jalan Cililitan Besar No.454, RT.7/RW.11, Kebon Pala, Makasar, Jakarta Timur 13570',
                    phone: '-',
                    geograph: {
                        id: 69089,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                stock_available: 977,
                currency: 'IDR',
                warehouse_geograph: {
                    id: 69089,
                    province: 'Jakarta',
                    city: 'Jakarta Selatan',
                    district: 'Setia Budi',
                    village: 'Setiabudi',
                    zipcode: '12910',
                    geotag: '1006115132',
                    jnecitycode: 'CGK10208'
                },
                sku_vendor: 'dj-1',
                warranty_coverage: null,
                warranty_limit: null,
                warranty_option: 'no_warranty',
                warranty_period: null,
                price: {
                    id: 11756,
                    sku: '75312DCDBD',
                    tier_data: {
                        tier_min_qty_1: 1,
                        tier_price_1: 24800,
                        tier_min_qty_2: 24,
                        tier_price_2: 24153,
                        tier_min_qty_3: 60,
                        tier_price_3: 23722
                    },
                    cid: '72f0ed223c48f5443a4c7868099fe80c19c191ae04e91ecd2cf0fc51ef8e598f010d0d2ec4f6887033def119756249d06a6b8e6fc403e06bb0ce4e80b7a6bfb46ac60c9c40026601fc5e1fef056070e70b22ef4cfdd58e8485ba950e3610e03674657b3807741fc8e76958567a3b87f9',
                    top_days: 0,
                    is_contract_price: false,
                    channel_type: 'MP',
                    vendor_id: '345',
                    from_franco: false
                },
                indent_limit: 1,
                indent_period: 'month',
                is_indent: 1,
                is_decimal: 0,
                down_payment_type: 1,
                down_payment_value: 3000000,
                rating_process_time: {
                    unit: 'HOUR',
                    value: 44.04
                }
            }
        ]
    };

    try {
        const result = yield Methods.getVendorPrice(datas, context);
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err.stack);
    }
});

test.serial('Should be return success decimal stock', function* (t) {
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves(resultFindIdPG);
    t.context.sandbox.stub(ProductVendorRepository, 'findByVariant').resolves([
        {
            id: 97,
            product_variant_id: 4,
            vendor_id: 345,
            warehouse_id: 145,
            location_label: 'Jakarta',
            stock_available: 977,
            stock_used: 23,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 11,
            tier_min_qty_3: 21,
            tier_cogs_price_1: '9000000.00',
            tier_cogs_price_2: '8900000.00',
            tier_cogs_price_3: '8800000.00',
            warranty_option: 'no_warranty',
            warranty_period: null,
            warranty_limit: null,
            warranty_coverage: null,
            indent_period: 'month',
            indent_limit: 1,
            reference_link: '[]',
            sku_vendor: 'dj-1',
            is_indent: 1,
            is_active: 1,
            created_by: 975,
            is_contract: 0,
            created_at: '2018-06-06T08:49:37.000Z',
            updated_at: '2018-08-06T06:49:30.000Z',
            is_decimal: 1,
            down_payment_type: 1,
            down_payment_value: 3000000
        }
    ]);
    t.context.sandbox.stub(BizzyService, 'callSync').resolves({
        data: [
            {
                id: 145,
                organization_address_id: 525,
                type_id: 1,
                is_primary: 1,
                warehouse_hub_id: 1,
                warehouse_hub: {
                    id: 1,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    address: 'Intirub Business Park Warehouse Phase 1 Ground Floor Kav 47-48, Jalan Cililitan Besar No.454, RT.7/RW.11, Kebon Pala, Makasar, Jakarta Timur 13570',
                    phone: '-',
                    geograph: {
                        id: 69089,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                warehouse_hub_shipper: [],
                warehouse_address: {
                    id: 525,
                    organization_id: 345,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    internal_code: null,
                    place: 'Gedung Dim V 1',
                    street: 'Jalan Tim V 1',
                    geograph_id: 69089,
                    phone: '6221831290830912',
                    status: 1,
                    company_name: null,
                    geograph: {
                        id: 69089,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                vendor: {
                    id: 345,
                    prefix: 'PT',
                    name: 'DJ VENDOR 1',
                    suffix: '',
                    status_pkp: 1,
                    place: 'Gedung Dim V 1',
                    street: 'Jalan Tim V 1',
                    trademark: 'DJ 1',
                    created_at: '2018-06-05T08:31:31.000Z',
                    logo: null,
                    geograph: {
                        id: 11594,
                        province: 'Sumatera Selatan',
                        city: 'Palembang',
                        district: 'Alang-Alang Lebar',
                        village: 'Karya Baru',
                        zipcode: '30151',
                        geotag: '1006132327',
                        jnecitycode: 'PLM10017'
                    }
                }
            }
        ]
    });

    t.context.sandbox.stub(SyncRepository, 'getPriceContract').resolves([{
        id: 11756,
        sku: '75312DCDBD',
        type: null,
        tier_data: {
            tier_min_qty_1: 1,
            tier_price_1: 24800,
            tier_min_qty_2: 24,
            tier_price_2: 24153,
            tier_min_qty_3: 60,
            tier_price_3: 23722
        },
        cid: '72f0ed223c48f5443a4c7868099fe80c19c191ae04e91ecd2cf0fc51ef8e598f010d0d2ec4f6887033def119756249d06a6b8e6fc403e06bb0ce4e80b7a6bfb46ac60c9c40026601fc5e1fef056070e70b22ef4cfdd58e8485ba950e3610e03674657b3807741fc8e76958567a3b87f9',
        top_days: 0,
        is_contract_price: false,
        is_franco: 0,
        shipping: [],
        channel_type: 'MP',
        is_contract: 0,
        vendor_id: '345'
    }]);

    t.context.sandbox.stub(SyncRepository, 'getOrganizationsByIds').resolves({
        data: [{
            uuid: '6fec9b99-e3e8-11e8-b92b-06b0976369e4',
            id: 345
        }]
    });

    const expected = {
        data: [
            {
                id: 97,
                uuid: '6fec9b99-e3e8-11e8-b92b-06b0976369e4',
                vendor_id: 345,
                vendor_joined_at: '2018-06-05T08:31:31.000Z',
                vendor_name: 'PT DJ VENDOR 1 ',
                vendor_trademark: 'DJ 1',
                vendor_pkp: 1,
                vendor_logo: '',
                warehouse_id: 145,
                warehouse_name: 'Warehouse PT. DJ VENDOR 1',
                warehouse_hub_id: 1,
                warehouse_hub_shipper: [],
                warehouse_hub: {
                    id: 1,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    address: 'Intirub Business Park Warehouse Phase 1 Ground Floor Kav 47-48, Jalan Cililitan Besar No.454, RT.7/RW.11, Kebon Pala, Makasar, Jakarta Timur 13570',
                    phone: '-',
                    geograph: {
                        id: 69089,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                stock_available: 977,
                currency: 'IDR',
                warehouse_geograph: {
                    id: 69089,
                    province: 'Jakarta',
                    city: 'Jakarta Selatan',
                    district: 'Setia Budi',
                    village: 'Setiabudi',
                    zipcode: '12910',
                    geotag: '1006115132',
                    jnecitycode: 'CGK10208'
                },
                sku_vendor: 'dj-1',
                warranty_coverage: null,
                warranty_limit: null,
                warranty_option: 'no_warranty',
                warranty_period: null,
                price: {
                    id: 11756,
                    sku: '75312DCDBD',
                    tier_data: {
                        tier_min_qty_1: 1,
                        tier_price_1: 24800,
                        tier_min_qty_2: 24,
                        tier_price_2: 24153,
                        tier_min_qty_3: 60,
                        tier_price_3: 23722
                    },
                    cid: '72f0ed223c48f5443a4c7868099fe80c19c191ae04e91ecd2cf0fc51ef8e598f010d0d2ec4f6887033def119756249d06a6b8e6fc403e06bb0ce4e80b7a6bfb46ac60c9c40026601fc5e1fef056070e70b22ef4cfdd58e8485ba950e3610e03674657b3807741fc8e76958567a3b87f9',
                    top_days: 0,
                    is_contract_price: false,
                    channel_type: 'MP',
                    vendor_id: '345',
                    from_franco: false
                },
                indent_limit: 1,
                indent_period: 'month',
                is_indent: 1,
                is_decimal: 1,
                down_payment_type: 1,
                down_payment_value: 3000000,
                rating_process_time: null
            }
        ]
    };

    try {
        const result = yield Methods.getVendorPrice(datas, context);
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err.stack);
    }
});

test.serial('Should be return success all vendors', function* (t) {
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves(resultFindIdPG);
    t.context.sandbox.stub(ProductVendorRepository, 'findByVariant').resolves([
        {
            id: 97,
            product_variant_id: 4,
            vendor_id: 345,
            warehouse_id: 145,
            location_label: 'Jakarta',
            stock_available: 977,
            stock_used: 23,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 11,
            tier_min_qty_3: 21,
            tier_cogs_price_1: '9000000.00',
            tier_cogs_price_2: '8900000.00',
            tier_cogs_price_3: '8800000.00',
            warranty_option: 'no_warranty',
            warranty_period: null,
            warranty_limit: null,
            warranty_coverage: null,
            indent_period: null,
            indent_limit: null,
            reference_link: '[]',
            sku_vendor: 'dj-1',
            is_indent: 0,
            is_active: 1,
            created_by: 975,
            is_contract: 0,
            created_at: '2018-06-06T08:49:37.000Z',
            updated_at: '2018-08-06T06:49:30.000Z',
            is_decimal: 0,
            down_payment_type: 0,
            down_payment_value: 0
        },
        {
            id: 97,
            product_variant_id: 4,
            vendor_id: 678,
            warehouse_id: 567,
            location_label: 'Jakarta',
            stock_available: 977,
            stock_used: 23,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 11,
            tier_min_qty_3: 21,
            tier_cogs_price_1: '9000000.00',
            tier_cogs_price_2: '8900000.00',
            tier_cogs_price_3: '8800000.00',
            warranty_option: 'no_warranty',
            warranty_period: null,
            warranty_limit: null,
            warranty_coverage: null,
            indent_period: null,
            indent_limit: null,
            reference_link: '[]',
            sku_vendor: 'dj-1',
            is_indent: 0,
            is_active: 1,
            created_by: 975,
            is_contract: 0,
            created_at: '2018-06-06T08:49:37.000Z',
            updated_at: '2018-08-06T06:49:30.000Z',
            is_decimal: 0,
            down_payment_type: 0,
            down_payment_value: 0
        }
    ]);
    t.context.sandbox.stub(BizzyService, 'callSync').resolves({
        data: [
            {
                id: 145,
                organization_address_id: 525,
                type_id: 1,
                is_primary: 1,
                warehouse_hub_id: 1,
                warehouse_hub: {
                    id: 1,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    address: 'Intirub Business Park Warehouse Phase 1 Ground Floor Kav 47-48, Jalan Cililitan Besar No.454, RT.7/RW.11, Kebon Pala, Makasar, Jakarta Timur 13570',
                    phone: '-',
                    geograph: {
                        id: 69089,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                warehouse_hub_shipper: [],
                warehouse_address: {
                    id: 525,
                    organization_id: 345,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    internal_code: null,
                    place: 'Gedung Dim V 1',
                    street: 'Jalan Tim V 1',
                    geograph_id: 69089,
                    phone: '6221831290830912',
                    status: 1,
                    company_name: null,
                    geograph: {
                        id: 69089,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                vendor: {
                    id: 345,
                    prefix: 'PT',
                    name: 'DJ VENDOR 1',
                    suffix: '',
                    status_pkp: 1,
                    place: 'Gedung Dim V 1',
                    street: 'Jalan Tim V 1',
                    trademark: 'DJ 1',
                    created_at: '2018-06-05T08:31:31.000Z',
                    logo: null,
                    geograph: {
                        id: 1,
                        province: 'Sumatera Selatan',
                        city: 'Palembang',
                        district: 'Alang-Alang Lebar',
                        village: 'Karya Baru',
                        zipcode: '30151',
                        geotag: '1006132327',
                        jnecitycode: 'PLM10017'
                    }
                }
            },
            {
                id: 567,
                organization_address_id: 525,
                type_id: 1,
                is_primary: 1,
                warehouse_hub_id: 1,
                warehouse_hub: {
                    id: 1,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    address: 'Intirub Business Park Warehouse Phase 1 Ground Floor Kav 47-48, Jalan Cililitan Besar No.454, RT.7/RW.11, Kebon Pala, Makasar, Jakarta Timur 13570',
                    phone: '-',
                    geograph: {
                        id: 69089,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                warehouse_hub_shipper: [],
                warehouse_address: {
                    id: 525,
                    organization_id: 345,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    internal_code: null,
                    place: 'Gedung Dim V 1',
                    street: 'Jalan Tim V 1',
                    geograph_id: 69089,
                    phone: '6221831290830912',
                    status: 1,
                    company_name: null,
                    geograph: {
                        id: 69089,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                vendor: {
                    id: 678,
                    prefix: 'PT',
                    name: 'DJ VENDOR 1',
                    suffix: '',
                    status_pkp: 1,
                    place: 'Gedung Dim V 1',
                    street: 'Jalan Tim V 1',
                    trademark: 'DJ 1',
                    created_at: '2018-06-05T08:31:31.000Z',
                    logo: null,
                    geograph: {
                        id: 1,
                        province: 'Sumatera Selatan',
                        city: 'Palembang',
                        district: 'Alang-Alang Lebar',
                        village: 'Karya Baru',
                        zipcode: '30151',
                        geotag: '1006132327',
                        jnecitycode: 'PLM10017'
                    }
                }
            }
        ]
    });

    t.context.sandbox.stub(SyncRepository, 'getPriceContract').resolves([{
        id: 11756,
        sku: '75312DCDBD',
        type: null,
        tier_data: {
            tier_min_qty_1: 1,
            tier_price_1: 24800,
            tier_min_qty_2: 24,
            tier_price_2: 24153,
            tier_min_qty_3: 60,
            tier_price_3: 23722
        },
        shipping: [],
        cid: '72f0ed223c48f5443a4c7868099fe80c19c191ae04e91ecd2cf0fc51ef8e598f010d0d2ec4f6887033def119756249d06a6b8e6fc403e06bb0ce4e80b7a6bfb46ac60c9c40026601fc5e1fef056070e70b22ef4cfdd58e8485ba950e3610e03674657b3807741fc8e76958567a3b87f9',
        top_days: 0,
        is_contract_price: false,
        is_franco: 0,
        channel_type: 'MP',
        is_contract: 0,
        vendor_id: '345'
    },
    {
        id: 11756,
        sku: '75312DCDBD',
        type: null,
        tier_data: {
            tier_min_qty_1: 1,
            tier_price_1: 22222,
            tier_min_qty_2: 50,
            tier_price_2: 33333,
            tier_min_qty_3: 100,
            tier_price_3: 44444
        },
        shipping: [
            {
                tier_data: {
                    tier_min_qty_1: 1,
                    tier_price_1: 24800,
                    tier_min_qty_2: 24,
                    tier_price_2: 24153,
                    tier_min_qty_3: 60,
                    tier_price_3: 23722
                },
                from: 1,
                to: 3
            }
        ],
        cid: '72f0ed223c48f5443a4c7868099fe80c19c191ae04e91ecd2cf0fc51ef8e598f010d0d2ec4f6887033def119756249d06a6b8e6fc403e06bb0ce4e80b7a6bfb46ac60c9c40026601fc5e1fef056070e70b22ef4cfdd58e8485ba950e3610e03674657b3807741fc8e76958567a3b87f9',
        top_days: 0,
        is_contract_price: false,
        is_franco: 0,
        channel_type: 'MP',
        is_contract: 0,
        vendor_id: '678'
    }]);

    t.context.sandbox.stub(SyncRepository, 'getOrganizationsByIds').resolves({
        data: [{
            uuid: '6fec9b99-e3e8-11e8-b92b-06b0976369e4',
            id: 345
        },
        {
            uuid: '6fec9b99-e3e8-11e8-b92b-06b0976369e5',
            id: 678
        }]
    });
    t.context.sandbox.stub(SyncRepository, 'getRatingByVendorIds').resolves(getRatingByVendorIds);

    const expected = {
        data: [
            {
                id: 97,
                uuid: '6fec9b99-e3e8-11e8-b92b-06b0976369e4',
                vendor_id: 345,
                vendor_joined_at: '2018-06-05T08:31:31.000Z',
                vendor_name: 'PT DJ VENDOR 1 ',
                vendor_trademark: 'DJ 1',
                vendor_pkp: 1,
                vendor_logo: '',
                warehouse_id: 145,
                warehouse_name: 'Warehouse PT. DJ VENDOR 1',
                warehouse_hub_id: 1,
                warehouse_hub_shipper: [],
                warehouse_hub: {
                    id: 1,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    address: 'Intirub Business Park Warehouse Phase 1 Ground Floor Kav 47-48, Jalan Cililitan Besar No.454, RT.7/RW.11, Kebon Pala, Makasar, Jakarta Timur 13570',
                    phone: '-',
                    geograph: {
                        id: 69089,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                stock_available: 977,
                currency: 'IDR',
                warehouse_geograph: {
                    id: 69089,
                    province: 'Jakarta',
                    city: 'Jakarta Selatan',
                    district: 'Setia Budi',
                    village: 'Setiabudi',
                    zipcode: '12910',
                    geotag: '1006115132',
                    jnecitycode: 'CGK10208'
                },
                sku_vendor: 'dj-1',
                warranty_coverage: null,
                warranty_limit: null,
                warranty_option: 'no_warranty',
                warranty_period: null,
                price: {
                    id: 11756,
                    sku: '75312DCDBD',
                    tier_data: {
                        tier_min_qty_1: 1,
                        tier_price_1: 24800,
                        tier_min_qty_2: 24,
                        tier_price_2: 24153,
                        tier_min_qty_3: 60,
                        tier_price_3: 23722
                    },
                    cid: '72f0ed223c48f5443a4c7868099fe80c19c191ae04e91ecd2cf0fc51ef8e598f010d0d2ec4f6887033def119756249d06a6b8e6fc403e06bb0ce4e80b7a6bfb46ac60c9c40026601fc5e1fef056070e70b22ef4cfdd58e8485ba950e3610e03674657b3807741fc8e76958567a3b87f9',
                    top_days: 0,
                    is_contract_price: false,
                    channel_type: 'MP',
                    from_franco: false,
                    vendor_id: '345'
                },
                indent_limit: 0,
                indent_period: '',
                is_indent: 0,
                rating_process_time: {
                    unit: 'HOUR',
                    value: 44.04
                },
                is_decimal: 0,
                down_payment_type: 0,
                down_payment_value: 0
            },
            {
                id: 97,
                uuid: '6fec9b99-e3e8-11e8-b92b-06b0976369e5',
                vendor_id: 678,
                vendor_joined_at: '2018-06-05T08:31:31.000Z',
                vendor_name: 'PT DJ VENDOR 1 ',
                vendor_trademark: 'DJ 1',
                vendor_pkp: 1,
                vendor_logo: '',
                warehouse_id: 567,
                warehouse_name: 'Warehouse PT. DJ VENDOR 1',
                warehouse_hub_id: 1,
                warehouse_hub_shipper: [],
                warehouse_hub: {
                    id: 1,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    address: 'Intirub Business Park Warehouse Phase 1 Ground Floor Kav 47-48, Jalan Cililitan Besar No.454, RT.7/RW.11, Kebon Pala, Makasar, Jakarta Timur 13570',
                    phone: '-',
                    geograph: {
                        id: 69089,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                stock_available: 977,
                currency: 'IDR',
                warehouse_geograph: {
                    id: 69089,
                    province: 'Jakarta',
                    city: 'Jakarta Selatan',
                    district: 'Setia Budi',
                    village: 'Setiabudi',
                    zipcode: '12910',
                    geotag: '1006115132',
                    jnecitycode: 'CGK10208'
                },
                sku_vendor: 'dj-1',
                warranty_coverage: null,
                warranty_limit: null,
                warranty_option: 'no_warranty',
                warranty_period: null,
                price: {
                    id: 11756,
                    sku: '75312DCDBD',
                    tier_data: {
                        tier_min_qty_1: 1,
                        tier_price_1: 22222,
                        tier_min_qty_2: 50,
                        tier_price_2: 33333,
                        tier_min_qty_3: 100,
                        tier_price_3: 44444
                    },
                    cid: '72f0ed223c48f5443a4c7868099fe80c19c191ae04e91ecd2cf0fc51ef8e598f010d0d2ec4f6887033def119756249d06a6b8e6fc403e06bb0ce4e80b7a6bfb46ac60c9c40026601fc5e1fef056070e70b22ef4cfdd58e8485ba950e3610e03674657b3807741fc8e76958567a3b87f9',
                    top_days: 0,
                    is_contract_price: false,
                    channel_type: 'MP',
                    from_franco: false,
                    vendor_id: '678'
                },
                indent_limit: 0,
                indent_period: '',
                is_indent: 0,
                rating_process_time: null,
                is_decimal: 0,
                down_payment_type: 0,
                down_payment_value: 0
            }
        ]
    };

    try {
        const result = yield Methods.getVendorPrice(datas, context);
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err.stack);
    }
});
test.serial('Should be return success franco', function* (t) {
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves(resultFindIdPG);
    t.context.sandbox.stub(ProductVendorRepository, 'findByVariant').resolves([
        {
            id: 97,
            product_variant_id: 4,
            vendor_id: 345,
            warehouse_id: 145,
            location_label: 'Jakarta',
            stock_available: 977,
            stock_used: 23,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 11,
            tier_min_qty_3: 21,
            tier_cogs_price_1: '9000000.00',
            tier_cogs_price_2: '8900000.00',
            tier_cogs_price_3: '8800000.00',
            warranty_option: 'no_warranty',
            warranty_period: null,
            warranty_limit: null,
            warranty_coverage: null,
            indent_period: null,
            indent_limit: null,
            reference_link: '[]',
            sku_vendor: 'dj-1',
            is_indent: 0,
            is_active: 1,
            created_by: 975,
            is_contract: 0,
            created_at: '2018-06-06T08:49:37.000Z',
            updated_at: '2018-08-06T06:49:30.000Z',
            is_decimal: 0,
            down_payment_type: 0,
            down_payment_value: 0
        }
    ]);
    t.context.sandbox.stub(BizzyService, 'callSync').resolves({
        data: [
            {
                id: 145,
                organization_address_id: 525,
                type_id: 1,
                is_primary: 1,
                warehouse_hub_id: 1,
                warehouse_hub: {
                    id: 1,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    address: 'Intirub Business Park Warehouse Phase 1 Ground Floor Kav 47-48, Jalan Cililitan Besar No.454, RT.7/RW.11, Kebon Pala, Makasar, Jakarta Timur 13570',
                    phone: '-',
                    geograph: {
                        id: 69089,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                warehouse_hub_shipper: [],
                warehouse_address: {
                    id: 525,
                    organization_id: 345,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    internal_code: null,
                    place: 'Gedung Dim V 1',
                    street: 'Jalan Tim V 1',
                    geograph_id: 69089,
                    phone: '6221831290830912',
                    status: 1,
                    company_name: null,
                    geograph: {
                        id: 1,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                vendor: {
                    id: 345,
                    prefix: 'PT',
                    name: 'DJ VENDOR 1',
                    suffix: '',
                    status_pkp: 1,
                    place: 'Gedung Dim V 1',
                    street: 'Jalan Tim V 1',
                    trademark: 'DJ 1',
                    created_at: '2018-06-05T08:31:31.000Z',
                    logo: null,
                    geograph: {
                        id: 1,
                        province: 'Sumatera Selatan',
                        city: 'Palembang',
                        district: 'Alang-Alang Lebar',
                        village: 'Karya Baru',
                        zipcode: '30151',
                        geotag: '1006132327',
                        jnecitycode: 'PLM10017'
                    }
                }
            }
        ]
    });

    t.context.sandbox.stub(SyncRepository, 'getPriceContract').resolves([{
        id: 11756,
        sku: '75312DCDBD',
        type: null,
        tier_data: {
            tier_min_qty_1: 1,
            tier_price_1: 24800,
            tier_min_qty_2: 24,
            tier_price_2: 24153,
            tier_min_qty_3: 60,
            tier_price_3: 23722
        },
        shipping: [
            {
                tier_data: {
                    tier_min_qty_1: 1,
                    tier_price_1: 24800,
                    tier_min_qty_2: 24,
                    tier_price_2: 24153,
                    tier_min_qty_3: 60,
                    tier_price_3: 23722
                },
                from: 1,
                to: 2
            }
        ],
        cid: '72f0ed223c48f5443a4c7868099fe80c19c191ae04e91ecd2cf0fc51ef8e598f010d0d2ec4f6887033def119756249d06a6b8e6fc403e06bb0ce4e80b7a6bfb46ac60c9c40026601fc5e1fef056070e70b22ef4cfdd58e8485ba950e3610e03674657b3807741fc8e76958567a3b87f9',
        top_days: 0,
        is_contract_price: false,
        is_franco: 0,
        channel_type: 'MP',
        is_contract: 0,
        vendor_id: '345'
    }]);

    t.context.sandbox.stub(SyncRepository, 'getOrganizationsByIds').resolves({
        data: [{
            uuid: '6fec9b99-e3e8-11e8-b92b-06b0976369e4',
            id: 345
        }]
    });
    t.context.sandbox.stub(SyncRepository, 'getRatingByVendorIds').resolves(getRatingByVendorIds);

    const expected = {
        data: [
            {
                id: 97,
                uuid: '6fec9b99-e3e8-11e8-b92b-06b0976369e4',
                vendor_id: 345,
                vendor_joined_at: '2018-06-05T08:31:31.000Z',
                vendor_name: 'PT DJ VENDOR 1 ',
                vendor_trademark: 'DJ 1',
                vendor_pkp: 1,
                vendor_logo: '',
                warehouse_id: 145,
                warehouse_name: 'Warehouse PT. DJ VENDOR 1',
                warehouse_hub_id: 1,
                warehouse_hub_shipper: [],
                warehouse_hub: {
                    id: 1,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    address: 'Intirub Business Park Warehouse Phase 1 Ground Floor Kav 47-48, Jalan Cililitan Besar No.454, RT.7/RW.11, Kebon Pala, Makasar, Jakarta Timur 13570',
                    phone: '-',
                    geograph: {
                        id: 1,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                stock_available: 977,
                currency: 'IDR',
                warehouse_geograph: {
                    id: 1,
                    province: 'Jakarta',
                    city: 'Jakarta Selatan',
                    district: 'Setia Budi',
                    village: 'Setiabudi',
                    zipcode: '12910',
                    geotag: '1006115132',
                    jnecitycode: 'CGK10208'
                },
                sku_vendor: 'dj-1',
                warranty_coverage: null,
                warranty_limit: null,
                warranty_option: 'no_warranty',
                warranty_period: null,
                price: {
                    id: 11756,
                    sku: '75312DCDBD',
                    tier_data: {
                        tier_min_qty_1: 1,
                        tier_price_1: 24800,
                        tier_min_qty_2: 24,
                        tier_price_2: 24153,
                        tier_min_qty_3: 60,
                        tier_price_3: 23722
                    },
                    cid: '72f0ed223c48f5443a4c7868099fe80c19c191ae04e91ecd2cf0fc51ef8e598f010d0d2ec4f6887033def119756249d06a6b8e6fc403e06bb0ce4e80b7a6bfb46ac60c9c40026601fc5e1fef056070e70b22ef4cfdd58e8485ba950e3610e03674657b3807741fc8e76958567a3b87f9',
                    top_days: 0,
                    is_contract_price: false,
                    channel_type: 'MP',
                    from_franco: true,
                    vendor_id: '345'
                },
                indent_limit: 0,
                indent_period: '',
                is_indent: 0,
                rating_process_time: {
                    unit: 'HOUR',
                    value: 44.04
                },
                is_decimal: 0,
                down_payment_type: 0,
                down_payment_value: 0
            }
        ]
    };

    try {
        const result = yield Methods.getVendorPrice(datas, context);
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err.stack);
    }
});

test.serial('Should be return success contract make DP void', function* (t) {
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves(resultFindIdPG);
    t.context.sandbox.stub(ProductVendorRepository, 'findByVariant').resolves([
        {
            id: 97,
            product_variant_id: 4,
            vendor_id: 345,
            warehouse_id: 145,
            location_label: 'Jakarta',
            stock_available: 977,
            stock_used: 23,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 11,
            tier_min_qty_3: 21,
            tier_cogs_price_1: '9000000.00',
            tier_cogs_price_2: '8900000.00',
            tier_cogs_price_3: '8800000.00',
            warranty_option: 'no_warranty',
            warranty_period: null,
            warranty_limit: null,
            warranty_coverage: null,
            indent_period: null,
            indent_limit: null,
            reference_link: '[]',
            sku_vendor: 'dj-1',
            is_indent: 0,
            is_active: 1,
            created_by: 975,
            is_contract: 0,
            created_at: '2018-06-06T08:49:37.000Z',
            updated_at: '2018-08-06T06:49:30.000Z',
            is_decimal: 0,
            down_payment_type: 1,
            down_payment_value: 25
        }
    ]);
    t.context.sandbox.stub(BizzyService, 'callSync').resolves({
        data: [
            {
                id: 145,
                organization_address_id: 525,
                type_id: 1,
                is_primary: 1,
                warehouse_hub_id: 1,
                warehouse_hub: {
                    id: 1,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    address: 'Intirub Business Park Warehouse Phase 1 Ground Floor Kav 47-48, Jalan Cililitan Besar No.454, RT.7/RW.11, Kebon Pala, Makasar, Jakarta Timur 13570',
                    phone: '-',
                    geograph: {
                        id: 69089,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                warehouse_hub_shipper: [],
                warehouse_address: {
                    id: 525,
                    organization_id: 345,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    internal_code: null,
                    place: 'Gedung Dim V 1',
                    street: 'Jalan Tim V 1',
                    geograph_id: 69089,
                    phone: '6221831290830912',
                    status: 1,
                    company_name: null,
                    geograph: {
                        id: 1,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                vendor: {
                    id: 345,
                    prefix: 'PT',
                    name: 'DJ VENDOR 1',
                    suffix: '',
                    status_pkp: 1,
                    place: 'Gedung Dim V 1',
                    street: 'Jalan Tim V 1',
                    trademark: 'DJ 1',
                    created_at: '2018-06-05T08:31:31.000Z',
                    logo: null,
                    geograph: {
                        id: 1,
                        province: 'Sumatera Selatan',
                        city: 'Palembang',
                        district: 'Alang-Alang Lebar',
                        village: 'Karya Baru',
                        zipcode: '30151',
                        geotag: '1006132327',
                        jnecitycode: 'PLM10017'
                    }
                }
            }
        ]
    });

    t.context.sandbox.stub(SyncRepository, 'getPriceContract').resolves([{
        id: 11756,
        sku: '75312DCDBD',
        type: null,
        tier_data: {
            tier_min_qty_1: 1,
            tier_price_1: 24800,
            tier_min_qty_2: 24,
            tier_price_2: 24153,
            tier_min_qty_3: 60,
            tier_price_3: 23722
        },
        shipping: [
            {
                tier_data: {
                    tier_min_qty_1: 1,
                    tier_price_1: 24800,
                    tier_min_qty_2: 24,
                    tier_price_2: 24153,
                    tier_min_qty_3: 60,
                    tier_price_3: 23722
                },
                from: 1,
                to: 2
            }
        ],
        cid: '72f0ed223c48f5443a4c7868099fe80c19c191ae04e91ecd2cf0fc51ef8e598f010d0d2ec4f6887033def119756249d06a6b8e6fc403e06bb0ce4e80b7a6bfb46ac60c9c40026601fc5e1fef056070e70b22ef4cfdd58e8485ba950e3610e03674657b3807741fc8e76958567a3b87f9',
        top_days: 0,
        is_contract_price: false,
        is_franco: 0,
        channel_type: 'MP',
        is_contract: 0,
        vendor_id: '345'
    }]);

    t.context.sandbox.stub(SyncRepository, 'getOrganizationsByIds').resolves({
        data: [{
            uuid: '6fec9b99-e3e8-11e8-b92b-06b0976369e4',
            id: 345
        }]
    });

    const expected = {
        data: [
            {
                id: 97,
                uuid: '6fec9b99-e3e8-11e8-b92b-06b0976369e4',
                vendor_id: 345,
                vendor_joined_at: '2018-06-05T08:31:31.000Z',
                vendor_name: 'PT DJ VENDOR 1 ',
                vendor_trademark: 'DJ 1',
                vendor_pkp: 1,
                vendor_logo: '',
                warehouse_id: 145,
                warehouse_name: 'Warehouse PT. DJ VENDOR 1',
                warehouse_hub_id: 1,
                warehouse_hub_shipper: [],
                warehouse_hub: {
                    id: 1,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    address: 'Intirub Business Park Warehouse Phase 1 Ground Floor Kav 47-48, Jalan Cililitan Besar No.454, RT.7/RW.11, Kebon Pala, Makasar, Jakarta Timur 13570',
                    phone: '-',
                    geograph: {
                        id: 1,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                stock_available: 977,
                currency: 'IDR',
                warehouse_geograph: {
                    id: 1,
                    province: 'Jakarta',
                    city: 'Jakarta Selatan',
                    district: 'Setia Budi',
                    village: 'Setiabudi',
                    zipcode: '12910',
                    geotag: '1006115132',
                    jnecitycode: 'CGK10208'
                },
                sku_vendor: 'dj-1',
                warranty_coverage: null,
                warranty_limit: null,
                warranty_option: 'no_warranty',
                warranty_period: null,
                price: {
                    id: 11756,
                    sku: '75312DCDBD',
                    tier_data: {
                        tier_min_qty_1: 1,
                        tier_price_1: 24800,
                        tier_min_qty_2: 24,
                        tier_price_2: 24153,
                        tier_min_qty_3: 60,
                        tier_price_3: 23722
                    },
                    cid: '72f0ed223c48f5443a4c7868099fe80c19c191ae04e91ecd2cf0fc51ef8e598f010d0d2ec4f6887033def119756249d06a6b8e6fc403e06bb0ce4e80b7a6bfb46ac60c9c40026601fc5e1fef056070e70b22ef4cfdd58e8485ba950e3610e03674657b3807741fc8e76958567a3b87f9',
                    top_days: 0,
                    is_contract_price: false,
                    channel_type: 'MP',
                    from_franco: true,
                    vendor_id: '345'
                },
                indent_limit: 0,
                indent_period: '',
                is_indent: 0,
                is_decimal: 0,
                down_payment_type: 0,
                down_payment_value: 0,
                rating_process_time: null
            }
        ]
    };

    try {
        const result = yield Methods.getVendorPrice(datas, context);
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err.stack);
    }
});

test.serial('Should be return success contract only', function* (t) {
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves(resultFindIdPG);
    t.context.sandbox.stub(ProductVendorRepository, 'findByVariant').resolves([
        {
            id: 97,
            product_variant_id: 4,
            vendor_id: 345,
            warehouse_id: 145,
            location_label: 'Jakarta',
            stock_available: 977,
            stock_used: 23,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 11,
            tier_min_qty_3: 21,
            tier_cogs_price_1: '9000000.00',
            tier_cogs_price_2: '8900000.00',
            tier_cogs_price_3: '8800000.00',
            warranty_option: 'no_warranty',
            warranty_period: null,
            warranty_limit: null,
            warranty_coverage: null,
            indent_period: null,
            indent_limit: null,
            reference_link: '[]',
            sku_vendor: 'dj-1',
            is_indent: 0,
            is_active: 1,
            created_by: 975,
            is_contract: 0,
            created_at: '2018-06-06T08:49:37.000Z',
            updated_at: '2018-08-06T06:49:30.000Z',
            down_payment_type: 0,
            down_payment_value: 0,
            is_decimal: 0
        }
    ]);
    t.context.sandbox.stub(BizzyService, 'callSync').resolves({
        data: [
            {
                id: 145,
                organization_address_id: 525,
                type_id: 1,
                is_primary: 1,
                warehouse_hub_id: 1,
                warehouse_hub: {
                    id: 1,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    address: 'Intirub Business Park Warehouse Phase 1 Ground Floor Kav 47-48, Jalan Cililitan Besar No.454, RT.7/RW.11, Kebon Pala, Makasar, Jakarta Timur 13570',
                    phone: '-',
                    geograph: {
                        id: 69089,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                warehouse_hub_shipper: [],
                warehouse_address: {
                    id: 525,
                    organization_id: 345,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    internal_code: null,
                    place: 'Gedung Dim V 1',
                    street: 'Jalan Tim V 1',
                    geograph_id: 69089,
                    phone: '6221831290830912',
                    status: 1,
                    company_name: null,
                    geograph: {
                        id: 69089,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                vendor: {
                    id: 345,
                    prefix: 'PT',
                    name: 'DJ VENDOR 1',
                    suffix: '',
                    status_pkp: 1,
                    place: 'Gedung Dim V 1',
                    street: 'Jalan Tim V 1',
                    trademark: 'DJ 1',
                    created_at: '2018-06-05T08:31:31.000Z',
                    logo: null,
                    geograph: {
                        id: 1,
                        province: 'Sumatera Selatan',
                        city: 'Palembang',
                        district: 'Alang-Alang Lebar',
                        village: 'Karya Baru',
                        zipcode: '30151',
                        geotag: '1006132327',
                        jnecitycode: 'PLM10017'
                    }
                }
            }
        ]
    });

    t.context.sandbox.stub(SyncRepository, 'getPriceContract').resolves([{
        id: 11756,
        sku: '75312DCDBD',
        type: null,
        tier_data: {
            tier_min_qty_1: 1,
            tier_price_1: 24800,
            tier_min_qty_2: 24,
            tier_price_2: 24153,
            tier_min_qty_3: 60,
            tier_price_3: 23722
        },
        shipping: [
            {
                tier_data: {
                    tier_min_qty_1: 1,
                    tier_price_1: 24800,
                    tier_min_qty_2: 24,
                    tier_price_2: 24153,
                    tier_min_qty_3: 60,
                    tier_price_3: 23722
                },
                from: 1,
                to: 2
            }
        ],
        cid: '72f0ed223c48f5443a4c7868099fe80c19c191ae04e91ecd2cf0fc51ef8e598f010d0d2ec4f6887033def119756249d06a6b8e6fc403e06bb0ce4e80b7a6bfb46ac60c9c40026601fc5e1fef056070e70b22ef4cfdd58e8485ba950e3610e03674657b3807741fc8e76958567a3b87f9',
        top_days: 0,
        is_contract_price: false,
        is_franco: 0,
        channel_type: 'MP',
        is_contract: 0,
        vendor_id: '345'
    }]);

    t.context.sandbox.stub(SyncRepository, 'getOrganizationsByIds').resolves({
        data: [{
            uuid: '6fec9b99-e3e8-11e8-b92b-06b0976369e4',
            id: 345
        }]
    });

    const expected = {
        data: [
            {
                id: 97,
                uuid: '6fec9b99-e3e8-11e8-b92b-06b0976369e4',
                vendor_id: 345,
                vendor_joined_at: '2018-06-05T08:31:31.000Z',
                vendor_name: 'PT DJ VENDOR 1 ',
                vendor_trademark: 'DJ 1',
                vendor_pkp: 1,
                vendor_logo: '',
                warehouse_id: 145,
                warehouse_name: 'Warehouse PT. DJ VENDOR 1',
                warehouse_hub_id: 1,
                warehouse_hub_shipper: [],
                warehouse_hub: {
                    id: 1,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    address: 'Intirub Business Park Warehouse Phase 1 Ground Floor Kav 47-48, Jalan Cililitan Besar No.454, RT.7/RW.11, Kebon Pala, Makasar, Jakarta Timur 13570',
                    phone: '-',
                    geograph: {
                        id: 69089,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                stock_available: 977,
                currency: 'IDR',
                warehouse_geograph: {
                    id: 69089,
                    province: 'Jakarta',
                    city: 'Jakarta Selatan',
                    district: 'Setia Budi',
                    village: 'Setiabudi',
                    zipcode: '12910',
                    geotag: '1006115132',
                    jnecitycode: 'CGK10208'
                },
                sku_vendor: 'dj-1',
                warranty_coverage: null,
                warranty_limit: null,
                warranty_option: 'no_warranty',
                warranty_period: null,
                price: {
                    id: 11756,
                    sku: '75312DCDBD',
                    tier_data: {
                        tier_min_qty_1: 1,
                        tier_price_1: 24800,
                        tier_min_qty_2: 24,
                        tier_price_2: 24153,
                        tier_min_qty_3: 60,
                        tier_price_3: 23722
                    },
                    cid: '72f0ed223c48f5443a4c7868099fe80c19c191ae04e91ecd2cf0fc51ef8e598f010d0d2ec4f6887033def119756249d06a6b8e6fc403e06bb0ce4e80b7a6bfb46ac60c9c40026601fc5e1fef056070e70b22ef4cfdd58e8485ba950e3610e03674657b3807741fc8e76958567a3b87f9',
                    top_days: 0,
                    is_contract_price: false,
                    channel_type: 'MP',
                    from_franco: false,
                    vendor_id: '345'
                },
                indent_limit: 0,
                indent_period: '',
                is_indent: 0,
                rating_process_time: null,
                down_payment_type: 0,
                down_payment_value: 0,
                is_decimal: 0
            }
        ]
    };

    try {
        const result = yield Methods.getVendorPrice(datas, context);
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err.stack);
    }
});

test.serial('Should be return success contract only', function* (t) {
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves(resultFindIdPG);
    t.context.sandbox.stub(ProductVendorRepository, 'findByVariant').resolves([
        {
            id: 97,
            product_variant_id: 4,
            vendor_id: 345,
            warehouse_id: 145,
            location_label: 'Jakarta',
            stock_available: 977,
            stock_used: 23,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 11,
            tier_min_qty_3: 21,
            tier_cogs_price_1: '9000000.00',
            tier_cogs_price_2: '8900000.00',
            tier_cogs_price_3: '8800000.00',
            warranty_option: 'no_warranty',
            warranty_period: null,
            warranty_limit: null,
            warranty_coverage: null,
            indent_period: null,
            indent_limit: null,
            reference_link: '[]',
            sku_vendor: 'dj-1',
            is_indent: 0,
            is_active: 1,
            created_by: 975,
            is_contract: 0,
            created_at: '2018-06-06T08:49:37.000Z',
            updated_at: '2018-08-06T06:49:30.000Z',
            down_payment_type: 0,
            down_payment_value: 0,
            is_decimal: 0
        }
    ]);
    t.context.sandbox.stub(BizzyService, 'callSync').resolves({
        data: [
            {
                id: 145,
                organization_address_id: 525,
                type_id: 1,
                is_primary: 1,
                warehouse_hub_id: 1,
                warehouse_hub: {
                    id: 1,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    address: 'Intirub Business Park Warehouse Phase 1 Ground Floor Kav 47-48, Jalan Cililitan Besar No.454, RT.7/RW.11, Kebon Pala, Makasar, Jakarta Timur 13570',
                    phone: '-',
                    geograph: {
                        id: 69089,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                warehouse_hub_shipper: [],
                warehouse_address: {
                    id: 525,
                    organization_id: 345,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    internal_code: null,
                    place: 'Gedung Dim V 1',
                    street: 'Jalan Tim V 1',
                    geograph_id: 69089,
                    phone: '6221831290830912',
                    status: 1,
                    company_name: null,
                    geograph: {
                        id: 69089,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                vendor: {
                    id: 345,
                    prefix: 'PT',
                    name: 'DJ VENDOR 1',
                    suffix: '',
                    status_pkp: 1,
                    place: 'Gedung Dim V 1',
                    street: 'Jalan Tim V 1',
                    trademark: 'DJ 1',
                    created_at: '2018-06-05T08:31:31.000Z',
                    logo: null,
                    geograph: {
                        id: 1,
                        province: 'Sumatera Selatan',
                        city: 'Palembang',
                        district: 'Alang-Alang Lebar',
                        village: 'Karya Baru',
                        zipcode: '30151',
                        geotag: '1006132327',
                        jnecitycode: 'PLM10017'
                    }
                }
            },
            {
                id: 567,
                organization_address_id: 525,
                type_id: 1,
                is_primary: 1,
                warehouse_hub_id: 1,
                warehouse_hub: {
                    id: 1,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    address: 'Intirub Business Park Warehouse Phase 1 Ground Floor Kav 47-48, Jalan Cililitan Besar No.454, RT.7/RW.11, Kebon Pala, Makasar, Jakarta Timur 13570',
                    phone: '-',
                    geograph: {
                        id: 69089,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                warehouse_hub_shipper: [],
                warehouse_address: {
                    id: 525,
                    organization_id: 345,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    internal_code: null,
                    place: 'Gedung Dim V 1',
                    street: 'Jalan Tim V 1',
                    geograph_id: 69089,
                    phone: '6221831290830912',
                    status: 1,
                    company_name: null,
                    geograph: {
                        id: 69089,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                vendor: {
                    id: 678,
                    prefix: 'PT',
                    name: 'DJ VENDOR 1',
                    suffix: '',
                    status_pkp: 1,
                    place: 'Gedung Dim V 1',
                    street: 'Jalan Tim V 1',
                    trademark: 'DJ 1',
                    created_at: '2018-06-05T08:31:31.000Z',
                    logo: null,
                    geograph: {
                        id: 5,
                        province: 'Sumatera Selatan',
                        city: 'Palembang',
                        district: 'Alang-Alang Lebar',
                        village: 'Karya Baru',
                        zipcode: '30151',
                        geotag: '1006132327',
                        jnecitycode: 'PLM10017'
                    }
                }
            }
        ]
    });

    t.context.sandbox.stub(SyncRepository, 'getPriceContract').resolves([
        {
            id: 11756,
            sku: '75312DCDBD',
            type: null,
            tier_data: {
                tier_min_qty_1: 1,
                tier_price_1: 24800,
                tier_min_qty_2: 24,
                tier_price_2: 24153,
                tier_min_qty_3: 60,
                tier_price_3: 23722
            },
            shipping: [
                {
                    tier_data: {
                        tier_min_qty_1: 1,
                        tier_price_1: 24800,
                        tier_min_qty_2: 24,
                        tier_price_2: 24153,
                        tier_min_qty_3: 60,
                        tier_price_3: 23722
                    },
                    from: 1,
                    to: 2
                }
            ],
            cid: '72f0ed223c48f5443a4c7868099fe80c19c191ae04e91ecd2cf0fc51ef8e598f010d0d2ec4f6887033def119756249d06a6b8e6fc403e06bb0ce4e80b7a6bfb46ac60c9c40026601fc5e1fef056070e70b22ef4cfdd58e8485ba950e3610e03674657b3807741fc8e76958567a3b87f9',
            top_days: 0,
            is_contract_price: false,
            is_franco: 0,
            channel_type: 'MP',
            is_contract: 0,
            vendor_id: '345'
        },
        {
            id: 11756,
            sku: '75312DCDBD',
            type: null,
            tier_data: {
                tier_min_qty_1: 1,
                tier_price_1: 24800,
                tier_min_qty_2: 24,
                tier_price_2: 24153,
                tier_min_qty_3: 60,
                tier_price_3: 23722
            },
            shipping: [
                {
                    tier_data: {
                        tier_min_qty_1: 1,
                        tier_price_1: 24800,
                        tier_min_qty_2: 24,
                        tier_price_2: 24153,
                        tier_min_qty_3: 60,
                        tier_price_3: 23722
                    },
                    from: 1,
                    to: 3
                }
            ],
            cid: '72f0ed223c48f5443a4c7868099fe80c19c191ae04e91ecd2cf0fc51ef8e598f010d0d2ec4f6887033def119756249d06a6b8e6fc403e06bb0ce4e80b7a6bfb46ac60c9c40026601fc5e1fef056070e70b22ef4cfdd58e8485ba950e3610e03674657b3807741fc8e76958567a3b87f9',
            top_days: 0,
            is_contract_price: false,
            is_franco: 0,
            channel_type: 'MP',
            is_contract: 0,
            vendor_id: '678'
        }]);

    t.context.sandbox.stub(SyncRepository, 'getOrganizationsByIds').resolves({
        data: [{
            uuid: '6fec9b99-e3e8-11e8-b92b-06b0976369e4',
            id: 345
        },
        {
            uuid: '6fec9b99-e3e8-11e8-b92b-06b0976369e5',
            id: 678
        }]
    });

    const expected = {
        data: [
            {
                id: 97,
                uuid: '6fec9b99-e3e8-11e8-b92b-06b0976369e4',
                vendor_id: 345,
                vendor_joined_at: '2018-06-05T08:31:31.000Z',
                vendor_name: 'PT DJ VENDOR 1 ',
                vendor_trademark: 'DJ 1',
                vendor_pkp: 1,
                vendor_logo: '',
                warehouse_id: 145,
                warehouse_name: 'Warehouse PT. DJ VENDOR 1',
                warehouse_hub_id: 1,
                warehouse_hub_shipper: [],
                warehouse_hub: {
                    id: 1,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    address: 'Intirub Business Park Warehouse Phase 1 Ground Floor Kav 47-48, Jalan Cililitan Besar No.454, RT.7/RW.11, Kebon Pala, Makasar, Jakarta Timur 13570',
                    phone: '-',
                    geograph: {
                        id: 69089,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                stock_available: 977,
                currency: 'IDR',
                warehouse_geograph: {
                    id: 69089,
                    province: 'Jakarta',
                    city: 'Jakarta Selatan',
                    district: 'Setia Budi',
                    village: 'Setiabudi',
                    zipcode: '12910',
                    geotag: '1006115132',
                    jnecitycode: 'CGK10208'
                },
                sku_vendor: 'dj-1',
                warranty_coverage: null,
                warranty_limit: null,
                warranty_option: 'no_warranty',
                warranty_period: null,
                price: {
                    id: 11756,
                    sku: '75312DCDBD',
                    tier_data: {
                        tier_min_qty_1: 1,
                        tier_price_1: 24800,
                        tier_min_qty_2: 24,
                        tier_price_2: 24153,
                        tier_min_qty_3: 60,
                        tier_price_3: 23722
                    },
                    cid: '72f0ed223c48f5443a4c7868099fe80c19c191ae04e91ecd2cf0fc51ef8e598f010d0d2ec4f6887033def119756249d06a6b8e6fc403e06bb0ce4e80b7a6bfb46ac60c9c40026601fc5e1fef056070e70b22ef4cfdd58e8485ba950e3610e03674657b3807741fc8e76958567a3b87f9',
                    top_days: 0,
                    is_contract_price: false,
                    channel_type: 'MP',
                    from_franco: false,
                    vendor_id: '345'
                },
                indent_limit: 0,
                indent_period: '',
                is_indent: 0,
                rating_process_time: null,
                down_payment_type: 0,
                down_payment_value: 0,
                is_decimal: 0
            }
        ]
    };

    try {
        const result = yield Methods.getVendorPrice(datas, context);
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err.stack);
    }
});

test.serial('Should be return \'Organizations not found\'', function* (t) {
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves(resultFindIdPG);
    t.context.sandbox.stub(ProductVendorRepository, 'findByVariant').resolves([
        {
            id: 97,
            product_variant_id: 4,
            vendor_id: 345,
            warehouse_id: 145,
            location_label: 'Jakarta',
            stock_available: 977,
            stock_used: 23,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 11,
            tier_min_qty_3: 21,
            tier_cogs_price_1: '9000000.00',
            tier_cogs_price_2: '8900000.00',
            tier_cogs_price_3: '8800000.00',
            warranty_option: 'no_warranty',
            warranty_period: null,
            warranty_limit: null,
            warranty_coverage: null,
            indent_period: null,
            indent_limit: null,
            reference_link: '[]',
            sku_vendor: 'dj-1',
            is_indent: 0,
            is_active: 1,
            created_by: 975,
            is_contract: 0,
            created_at: '2018-06-06T08:49:37.000Z',
            updated_at: '2018-08-06T06:49:30.000Z'
        }
    ]);
    t.context.sandbox.stub(SyncRepository, 'findWarehouseWithoutShippingByIds').resolves({
        data: [
            {
                id: 145,
                organization_address_id: 525,
                type_id: 1,
                is_primary: 1,
                warehouse_hub_id: 1,
                warehouse_hub: {
                    id: 1,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    address: 'Intirub Business Park Warehouse Phase 1 Ground Floor Kav 47-48, Jalan Cililitan Besar No.454, RT.7/RW.11, Kebon Pala, Makasar, Jakarta Timur 13570',
                    phone: '-',
                    geograph: {
                        id: 69089,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                warehouse_hub_shipper: [],
                warehouse_address: {
                    id: 525,
                    organization_id: 345,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    internal_code: null,
                    place: 'Gedung Dim V 1',
                    street: 'Jalan Tim V 1',
                    geograph_id: 69089,
                    phone: '6221831290830912',
                    status: 1,
                    company_name: null,
                    geograph: {
                        id: 69089,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                vendor: {
                    id: 345,
                    prefix: 'PT',
                    name: 'DJ VENDOR 1',
                    suffix: '',
                    status_pkp: 1,
                    place: 'Gedung Dim V 1',
                    street: 'Jalan Tim V 1',
                    trademark: 'DJ 1',
                    created_at: '2018-06-05T08:31:31.000Z',
                    logo: null,
                    geograph: {
                        id: 1,
                        province: 'Sumatera Selatan',
                        city: 'Palembang',
                        district: 'Alang-Alang Lebar',
                        village: 'Karya Baru',
                        zipcode: '30151',
                        geotag: '1006132327',
                        jnecitycode: 'PLM10017'
                    }
                }
            }
        ]
    });

    t.context.sandbox.stub(SyncRepository, 'getPriceContract').resolves([{
        id: 11756,
        sku: '75312DCDBD',
        type: null,
        tier_data: {
            tier_min_qty_1: 1,
            tier_price_1: 24800,
            tier_min_qty_2: 24,
            tier_price_2: 24153,
            tier_min_qty_3: 60,
            tier_price_3: 23722
        },
        shipping: [
            {
                tier_data: {
                    tier_min_qty_1: 1,
                    tier_price_1: 24800,
                    tier_min_qty_2: 24,
                    tier_price_2: 24153,
                    tier_min_qty_3: 60,
                    tier_price_3: 23722
                },
                from: 1,
                to: 2
            }
        ],
        cid: '72f0ed223c48f5443a4c7868099fe80c19c191ae04e91ecd2cf0fc51ef8e598f010d0d2ec4f6887033def119756249d06a6b8e6fc403e06bb0ce4e80b7a6bfb46ac60c9c40026601fc5e1fef056070e70b22ef4cfdd58e8485ba950e3610e03674657b3807741fc8e76958567a3b87f9',
        top_days: 0,
        is_contract_price: false,
        is_franco: 0,
        channel_type: 'MP',
        is_contract: 0,
        vendor_id: '345'
    }]);

    t.context.sandbox.stub(SyncRepository, 'getOrganizationsByIds').throws(new Error('{ "code": "NotFound" }'));
    t.context.sandbox.stub(SyncRepository, 'getRatingByVendorIds').resolves(getRatingByVendorIds);

    const expected = {
        data: [], message: 'Organizations not found.'
    };

    try {
        const result = yield Methods.getVendorPrice(datas, context);
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err.stack);
    }
});

test.serial('Should be return \'Cannot find warehouses.\'', function* (t) {
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves(resultFindIdPG);
    t.context.sandbox.stub(ProductVendorRepository, 'findByVariant').resolves([
        {
            id: 97,
            product_variant_id: 4,
            vendor_id: 345,
            warehouse_id: 145,
            location_label: 'Jakarta',
            stock_available: 977,
            stock_used: 23,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 11,
            tier_min_qty_3: 21,
            tier_cogs_price_1: '9000000.00',
            tier_cogs_price_2: '8900000.00',
            tier_cogs_price_3: '8800000.00',
            warranty_option: 'no_warranty',
            warranty_period: null,
            warranty_limit: null,
            warranty_coverage: null,
            indent_period: null,
            indent_limit: null,
            reference_link: '[]',
            sku_vendor: 'dj-1',
            is_indent: 0,
            is_active: 1,
            created_by: 975,
            is_contract: 0,
            created_at: '2018-06-06T08:49:37.000Z',
            updated_at: '2018-08-06T06:49:30.000Z'
        }
    ]);
    t.context.sandbox.stub(SyncRepository, 'findWarehouseWithoutShippingByIds').throws(new Error('{ "code": "NotFound" }'));

    t.context.sandbox.stub(SyncRepository, 'getPriceContract').resolves([{
        id: 11756,
        sku: '75312DCDBD',
        type: null,
        tier_data: {
            tier_min_qty_1: 1,
            tier_price_1: 24800,
            tier_min_qty_2: 24,
            tier_price_2: 24153,
            tier_min_qty_3: 60,
            tier_price_3: 23722
        },
        shipping: [
            {
                tier_data: {
                    tier_min_qty_1: 1,
                    tier_price_1: 24800,
                    tier_min_qty_2: 24,
                    tier_price_2: 24153,
                    tier_min_qty_3: 60,
                    tier_price_3: 23722
                },
                from: 1,
                to: 2
            }
        ],
        cid: '72f0ed223c48f5443a4c7868099fe80c19c191ae04e91ecd2cf0fc51ef8e598f010d0d2ec4f6887033def119756249d06a6b8e6fc403e06bb0ce4e80b7a6bfb46ac60c9c40026601fc5e1fef056070e70b22ef4cfdd58e8485ba950e3610e03674657b3807741fc8e76958567a3b87f9',
        top_days: 0,
        is_contract_price: false,
        is_franco: 0,
        channel_type: 'MP',
        is_contract: 0,
        vendor_id: '345'
    }]);

    t.context.sandbox.stub(SyncRepository, 'getOrganizationsByIds').resolves({
        data: [{
            uuid: '6fec9b99-e3e8-11e8-b92b-06b0976369e4',
            id: 345
        }]
    });
    t.context.sandbox.stub(SyncRepository, 'getRatingByVendorIds').resolves(getRatingByVendorIds);

    const expected = {
        data: [], message: 'Cannot find warehouses.'
    };

    try {
        const result = yield Methods.getVendorPrice(datas, context);
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err.stack);
    }
});

test.serial('Should be return \'Cannot find contracts.\'', function* (t) {
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves(resultFindIdPG);
    t.context.sandbox.stub(ProductVendorRepository, 'findByVariant').resolves([
        {
            id: 97,
            product_variant_id: 4,
            vendor_id: 345,
            warehouse_id: 145,
            location_label: 'Jakarta',
            stock_available: 977,
            stock_used: 23,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 11,
            tier_min_qty_3: 21,
            tier_cogs_price_1: '9000000.00',
            tier_cogs_price_2: '8900000.00',
            tier_cogs_price_3: '8800000.00',
            warranty_option: 'no_warranty',
            warranty_period: null,
            warranty_limit: null,
            warranty_coverage: null,
            indent_period: null,
            indent_limit: null,
            reference_link: '[]',
            sku_vendor: 'dj-1',
            is_indent: 0,
            is_active: 1,
            created_by: 975,
            is_contract: 0,
            created_at: '2018-06-06T08:49:37.000Z',
            updated_at: '2018-08-06T06:49:30.000Z'
        }
    ]);
    t.context.sandbox.stub(BizzyService, 'callSync').resolves({
        data: [
            {
                id: 145,
                organization_address_id: 525,
                type_id: 1,
                is_primary: 1,
                warehouse_hub_id: 1,
                warehouse_hub: {
                    id: 1,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    address: 'Intirub Business Park Warehouse Phase 1 Ground Floor Kav 47-48, Jalan Cililitan Besar No.454, RT.7/RW.11, Kebon Pala, Makasar, Jakarta Timur 13570',
                    phone: '-',
                    geograph: {
                        id: 69089,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                warehouse_hub_shipper: [],
                warehouse_address: {
                    id: 525,
                    organization_id: 345,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    internal_code: null,
                    place: 'Gedung Dim V 1',
                    street: 'Jalan Tim V 1',
                    geograph_id: 69089,
                    phone: '6221831290830912',
                    status: 1,
                    company_name: null,
                    geograph: {
                        id: 69089,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                vendor: {
                    id: 345,
                    prefix: 'PT',
                    name: 'DJ VENDOR 1',
                    suffix: '',
                    status_pkp: 1,
                    place: 'Gedung Dim V 1',
                    street: 'Jalan Tim V 1',
                    trademark: 'DJ 1',
                    created_at: '2018-06-05T08:31:31.000Z',
                    logo: null,
                    geograph: {
                        id: 1,
                        province: 'Sumatera Selatan',
                        city: 'Palembang',
                        district: 'Alang-Alang Lebar',
                        village: 'Karya Baru',
                        zipcode: '30151',
                        geotag: '1006132327',
                        jnecitycode: 'PLM10017'
                    }
                }
            }
        ]
    });

    t.context.sandbox.stub(SyncRepository, 'getPriceContract').throws(new Error('{ "code": "NotFound" }'));

    t.context.sandbox.stub(SyncRepository, 'getOrganizationsByIds').resolves({
        data: [{
            uuid: '6fec9b99-e3e8-11e8-b92b-06b0976369e4',
            id: 345
        }]
    });
    t.context.sandbox.stub(SyncRepository, 'getRatingByVendorIds').resolves(getRatingByVendorIds);

    const expected = {
        data: [], message: 'Cannot find contracts.'
    };

    try {
        const result = yield Methods.getVendorPrice(datas, context);
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err.stack);
    }
});

test.serial('Should be return error when get contracts', function* (t) {
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves(resultFindIdPG);
    t.context.sandbox.stub(ProductVendorRepository, 'findByVariant').resolves([
        {
            id: 97,
            product_variant_id: 4,
            vendor_id: 345,
            warehouse_id: 145,
            location_label: 'Jakarta',
            stock_available: 977,
            stock_used: 23,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 11,
            tier_min_qty_3: 21,
            tier_cogs_price_1: '9000000.00',
            tier_cogs_price_2: '8900000.00',
            tier_cogs_price_3: '8800000.00',
            warranty_option: 'no_warranty',
            warranty_period: null,
            warranty_limit: null,
            warranty_coverage: null,
            indent_period: null,
            indent_limit: null,
            reference_link: '[]',
            sku_vendor: 'dj-1',
            is_indent: 0,
            is_active: 1,
            created_by: 975,
            is_contract: 0,
            created_at: '2018-06-06T08:49:37.000Z',
            updated_at: '2018-08-06T06:49:30.000Z'
        }
    ]);
    t.context.sandbox.stub(BizzyService, 'callSync').resolves({
        data: [
            {
                id: 145,
                organization_address_id: 525,
                type_id: 1,
                is_primary: 1,
                warehouse_hub_id: 1,
                warehouse_hub: {
                    id: 1,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    address: 'Intirub Business Park Warehouse Phase 1 Ground Floor Kav 47-48, Jalan Cililitan Besar No.454, RT.7/RW.11, Kebon Pala, Makasar, Jakarta Timur 13570',
                    phone: '-',
                    geograph: {
                        id: 69089,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                warehouse_hub_shipper: [],
                warehouse_address: {
                    id: 525,
                    organization_id: 345,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    internal_code: null,
                    place: 'Gedung Dim V 1',
                    street: 'Jalan Tim V 1',
                    geograph_id: 69089,
                    phone: '6221831290830912',
                    status: 1,
                    company_name: null,
                    geograph: {
                        id: 69089,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                vendor: {
                    id: 345,
                    prefix: 'PT',
                    name: 'DJ VENDOR 1',
                    suffix: '',
                    status_pkp: 1,
                    place: 'Gedung Dim V 1',
                    street: 'Jalan Tim V 1',
                    trademark: 'DJ 1',
                    created_at: '2018-06-05T08:31:31.000Z',
                    logo: null,
                    geograph: {
                        id: 1,
                        province: 'Sumatera Selatan',
                        city: 'Palembang',
                        district: 'Alang-Alang Lebar',
                        village: 'Karya Baru',
                        zipcode: '30151',
                        geotag: '1006132327',
                        jnecitycode: 'PLM10017'
                    }
                }
            }
        ]
    });

    t.context.sandbox.stub(SyncRepository, 'getPriceContract').throws(new Error('{ "code": "BadRequest" }'));

    t.context.sandbox.stub(SyncRepository, 'getOrganizationsByIds').resolves({
        data: [{
            uuid: '6fec9b99-e3e8-11e8-b92b-06b0976369e4',
            id: 345
        }]
    });
    t.context.sandbox.stub(SyncRepository, 'getRatingByVendorIds').resolves(getRatingByVendorIds);

    try {
        yield Methods.getVendorPrice(datas, context);
        t.fail('Should be return bad request.');
    } catch (err) {
        t.true(err instanceof Error, err.message);
    }
});

test.serial('Should be return error when get organizations', function* (t) {
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves(resultFindIdPG);
    t.context.sandbox.stub(ProductVendorRepository, 'findByVariant').resolves([
        {
            id: 97,
            product_variant_id: 4,
            vendor_id: 345,
            warehouse_id: 145,
            location_label: 'Jakarta',
            stock_available: 977,
            stock_used: 23,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 11,
            tier_min_qty_3: 21,
            tier_cogs_price_1: '9000000.00',
            tier_cogs_price_2: '8900000.00',
            tier_cogs_price_3: '8800000.00',
            warranty_option: 'no_warranty',
            warranty_period: null,
            warranty_limit: null,
            warranty_coverage: null,
            indent_period: null,
            indent_limit: null,
            reference_link: '[]',
            sku_vendor: 'dj-1',
            is_indent: 0,
            is_active: 1,
            created_by: 975,
            is_contract: 0,
            created_at: '2018-06-06T08:49:37.000Z',
            updated_at: '2018-08-06T06:49:30.000Z'
        }
    ]);
    t.context.sandbox.stub(BizzyService, 'callSync').resolves({
        data: [
            {
                id: 145,
                organization_address_id: 525,
                type_id: 1,
                is_primary: 1,
                warehouse_hub_id: 1,
                warehouse_hub: {
                    id: 1,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    address: 'Intirub Business Park Warehouse Phase 1 Ground Floor Kav 47-48, Jalan Cililitan Besar No.454, RT.7/RW.11, Kebon Pala, Makasar, Jakarta Timur 13570',
                    phone: '-',
                    geograph: {
                        id: 69089,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                warehouse_hub_shipper: [],
                warehouse_address: {
                    id: 525,
                    organization_id: 345,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    internal_code: null,
                    place: 'Gedung Dim V 1',
                    street: 'Jalan Tim V 1',
                    geograph_id: 69089,
                    phone: '6221831290830912',
                    status: 1,
                    company_name: null,
                    geograph: {
                        id: 69089,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                vendor: {
                    id: 345,
                    prefix: 'PT',
                    name: 'DJ VENDOR 1',
                    suffix: '',
                    status_pkp: 1,
                    place: 'Gedung Dim V 1',
                    street: 'Jalan Tim V 1',
                    trademark: 'DJ 1',
                    created_at: '2018-06-05T08:31:31.000Z',
                    logo: null,
                    geograph: {
                        id: 1,
                        province: 'Sumatera Selatan',
                        city: 'Palembang',
                        district: 'Alang-Alang Lebar',
                        village: 'Karya Baru',
                        zipcode: '30151',
                        geotag: '1006132327',
                        jnecitycode: 'PLM10017'
                    }
                }
            }
        ]
    });

    t.context.sandbox.stub(SyncRepository, 'getPriceContract').resolves([]);

    t.context.sandbox.stub(SyncRepository, 'getOrganizationsByIds').throws(new Error('{ "code": "BadRequest" }'));
    t.context.sandbox.stub(SyncRepository, 'getRatingByVendorIds').resolves(getRatingByVendorIds);

    try {
        yield Methods.getVendorPrice(datas, context);
        t.fail('Should be return bad request.');
    } catch (err) {
        t.true(err instanceof Error, err.message);
    }
});

test.serial('Should be return error when get warehouses', function* (t) {
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves(resultFindIdPG);
    t.context.sandbox.stub(ProductVendorRepository, 'findByVariant').resolves([
        {
            id: 97,
            product_variant_id: 4,
            vendor_id: 345,
            warehouse_id: 145,
            location_label: 'Jakarta',
            stock_available: 977,
            stock_used: 23,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 11,
            tier_min_qty_3: 21,
            tier_cogs_price_1: '9000000.00',
            tier_cogs_price_2: '8900000.00',
            tier_cogs_price_3: '8800000.00',
            warranty_option: 'no_warranty',
            warranty_period: null,
            warranty_limit: null,
            warranty_coverage: null,
            indent_period: null,
            indent_limit: null,
            reference_link: '[]',
            sku_vendor: 'dj-1',
            is_indent: 0,
            is_active: 1,
            created_by: 975,
            is_contract: 0,
            created_at: '2018-06-06T08:49:37.000Z',
            updated_at: '2018-08-06T06:49:30.000Z'
        }
    ]);
    t.context.sandbox.stub(BizzyService, 'callSync').throws(new Error('{ "code": "BadRequest" }'));

    t.context.sandbox.stub(SyncRepository, 'getPriceContract').resolves([]);

    t.context.sandbox.stub(SyncRepository, 'getOrganizationsByIds').resolves([]);
    t.context.sandbox.stub(SyncRepository, 'getRatingByVendorIds').resolves(getRatingByVendorIds);

    try {
        yield Methods.getVendorPrice(datas, context);
        t.fail('Should be return error.');
    } catch (err) {
        t.true(err instanceof Error, err.message);
    }
});

test.serial('Should be return Bad Request', function* (t) {
    try {
        const data = {
            body: {
                sku: 123
            }
        };
        yield Methods.getVendorPrice(data, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('Should be return Not Authorized', function* (t) {
    try {
        const data = {
            body: {
                sku: 123
            }
        };
        yield Methods.getVendorPrice(data, {});
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotAuthorized, err.message);
    }
});

test.serial('Should be return Not Found', function* (t) {
    t.context.sandbox.stub(VendorRepository, 'getVendorWarehousesMongo').resolves([]);
    t.context.sandbox.stub(ProductVendorRepository, 'findByVariant').resolves(null);
    try {
        yield Methods.getVendorPrice(datas, context);
        t.fail('The validator doesn\'t throw an error');
    } catch (err) {
        t.true(err instanceof BizzyError.NotFound, 'Vendor Not Found');
    }
});

test.serial('getRatingByVendorIds: scenario with s2s is rejects', function* (t) {
    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves(resultFindIdPG);
    t.context.sandbox.stub(ProductVendorRepository, 'findByVariant').resolves([
        {
            id: 97,
            product_variant_id: 4,
            vendor_id: 345,
            warehouse_id: 145,
            location_label: 'Jakarta',
            stock_available: 977,
            stock_used: 23,
            stock_reserved: 0,
            currency: 'IDR',
            tier_min_qty_1: 1,
            tier_min_qty_2: 11,
            tier_min_qty_3: 21,
            tier_cogs_price_1: '9000000.00',
            tier_cogs_price_2: '8900000.00',
            tier_cogs_price_3: '8800000.00',
            warranty_option: 'no_warranty',
            warranty_period: null,
            warranty_limit: null,
            warranty_coverage: null,
            indent_period: null,
            indent_limit: null,
            reference_link: '[]',
            sku_vendor: 'dj-1',
            is_indent: 0,
            is_active: 1,
            created_by: 975,
            is_contract: 0,
            created_at: '2018-06-06T08:49:37.000Z',
            updated_at: '2018-08-06T06:49:30.000Z',
            down_payment_type: 0,
            down_payment_value: 0,
            is_decimal: 0
        }
    ]);
    t.context.sandbox.stub(BizzyService, 'callSync').resolves({
        data: [
            {
                id: 145,
                organization_address_id: 525,
                type_id: 1,
                is_primary: 1,
                warehouse_hub_id: 1,
                warehouse_hub: {
                    id: 1,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    address: 'Intirub Business Park Warehouse Phase 1 Ground Floor Kav 47-48, Jalan Cililitan Besar No.454, RT.7/RW.11, Kebon Pala, Makasar, Jakarta Timur 13570',
                    phone: '-',
                    geograph: {
                        id: 69089,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                warehouse_hub_shipper: [],
                warehouse_address: {
                    id: 525,
                    organization_id: 345,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    internal_code: null,
                    place: 'Gedung Dim V 1',
                    street: 'Jalan Tim V 1',
                    geograph_id: 69089,
                    phone: '6221831290830912',
                    status: 1,
                    company_name: null,
                    geograph: {
                        id: 69089,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                vendor: {
                    id: 345,
                    prefix: 'PT',
                    name: 'DJ VENDOR 1',
                    suffix: '',
                    status_pkp: 1,
                    place: 'Gedung Dim V 1',
                    street: 'Jalan Tim V 1',
                    trademark: 'DJ 1',
                    created_at: '2018-06-05T08:31:31.000Z',
                    logo: null,
                    geograph: {
                        id: 11594,
                        province: 'Sumatera Selatan',
                        city: 'Palembang',
                        district: 'Alang-Alang Lebar',
                        village: 'Karya Baru',
                        zipcode: '30151',
                        geotag: '1006132327',
                        jnecitycode: 'PLM10017'
                    }
                }
            }
        ]
    });

    t.context.sandbox.stub(SyncRepository, 'getPriceContract').resolves([{
        id: 11756,
        sku: '75312DCDBD',
        type: null,
        tier_data: {
            tier_min_qty_1: 1,
            tier_price_1: 24800,
            tier_min_qty_2: 24,
            tier_price_2: 24153,
            tier_min_qty_3: 60,
            tier_price_3: 23722
        },
        cid: '72f0ed223c48f5443a4c7868099fe80c19c191ae04e91ecd2cf0fc51ef8e598f010d0d2ec4f6887033def119756249d06a6b8e6fc403e06bb0ce4e80b7a6bfb46ac60c9c40026601fc5e1fef056070e70b22ef4cfdd58e8485ba950e3610e03674657b3807741fc8e76958567a3b87f9',
        top_days: 0,
        is_contract_price: false,
        is_franco: 0,
        shipping: [],
        channel_type: 'MP',
        is_contract: 0,
        vendor_id: '345'
    }]);

    t.context.sandbox.stub(SyncRepository, 'getOrganizationsByIds').resolves({
        data: [{
            uuid: '6fec9b99-e3e8-11e8-b92b-06b0976369e4',
            id: 345
        }]
    });

    t.context.sandbox.stub(SyncRepository, 'getRatingByVendorIds').rejects();

    const expected = {
        data: [
            {
                id: 97,
                uuid: '6fec9b99-e3e8-11e8-b92b-06b0976369e4',
                vendor_id: 345,
                vendor_joined_at: '2018-06-05T08:31:31.000Z',
                vendor_name: 'PT DJ VENDOR 1 ',
                vendor_trademark: 'DJ 1',
                vendor_pkp: 1,
                vendor_logo: '',
                warehouse_id: 145,
                warehouse_name: 'Warehouse PT. DJ VENDOR 1',
                warehouse_hub_id: 1,
                warehouse_hub_shipper: [],
                warehouse_hub: {
                    id: 1,
                    name: 'Warehouse PT. DJ VENDOR 1',
                    address: 'Intirub Business Park Warehouse Phase 1 Ground Floor Kav 47-48, Jalan Cililitan Besar No.454, RT.7/RW.11, Kebon Pala, Makasar, Jakarta Timur 13570',
                    phone: '-',
                    geograph: {
                        id: 69089,
                        province: 'Jakarta',
                        city: 'Jakarta Selatan',
                        district: 'Setia Budi',
                        village: 'Setiabudi',
                        zipcode: '12910',
                        geotag: '1006115132',
                        jnecitycode: 'CGK10208'
                    }
                },
                stock_available: 977,
                currency: 'IDR',
                warehouse_geograph: {
                    id: 69089,
                    province: 'Jakarta',
                    city: 'Jakarta Selatan',
                    district: 'Setia Budi',
                    village: 'Setiabudi',
                    zipcode: '12910',
                    geotag: '1006115132',
                    jnecitycode: 'CGK10208'
                },
                sku_vendor: 'dj-1',
                warranty_coverage: null,
                warranty_limit: null,
                warranty_option: 'no_warranty',
                warranty_period: null,
                price: {
                    id: 11756,
                    sku: '75312DCDBD',
                    tier_data: {
                        tier_min_qty_1: 1,
                        tier_price_1: 24800,
                        tier_min_qty_2: 24,
                        tier_price_2: 24153,
                        tier_min_qty_3: 60,
                        tier_price_3: 23722
                    },
                    cid: '72f0ed223c48f5443a4c7868099fe80c19c191ae04e91ecd2cf0fc51ef8e598f010d0d2ec4f6887033def119756249d06a6b8e6fc403e06bb0ce4e80b7a6bfb46ac60c9c40026601fc5e1fef056070e70b22ef4cfdd58e8485ba950e3610e03674657b3807741fc8e76958567a3b87f9',
                    top_days: 0,
                    is_contract_price: false,
                    channel_type: 'MP',
                    vendor_id: '345',
                    from_franco: false
                },
                indent_limit: 0,
                indent_period: '',
                is_indent: 0,
                rating_process_time: null,
                down_payment_type: 0,
                down_payment_value: 0,
                is_decimal: 0
            }
        ]
    };

    try {
        const result = yield Methods.getVendorPrice(datas, context);
        t.deepEqual(result, expected);
    } catch (err) {
        t.fail(err.stack);
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
