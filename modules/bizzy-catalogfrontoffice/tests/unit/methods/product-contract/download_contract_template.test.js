'use strict';

// Plugin helper
const test = require('ava');
const sinon = require('sinon');
const { BizzyError, DBContext } = require('bizzy-common');
const _ = require('lodash');
const moment = require('moment');

// Tranformer
const Generate = require('../../../../src/utils/contract/generate_template');

// Utils
const UploadTemplate = require('../../../../src/utils/contract/upload_template');

// Repository
const ContractRepoCategory = require('../../../../src/repositories/contract/category');
const ContractRepoProduct = require('../../../../src/repositories/contract/product_vendor');

// Method
const Methods = require('../../../../src/methods/product-contract/download_contract_template');


// ---------------------- Download Contract Tempalte - Test ---------------------------

// Define Payload and Response
const context = require('../../../mocks/context.json');

const PAYLOAD = {
    path: {
        vendor_id: 4
    },
    body: {
        shipping_origins: {
            shipping_hubs: [
                {
                    hub: 1,
                    name: 'Jakarta Pusat, Menteng'
                },
                {
                    hub: 3,
                    name: 'Banyu Asin, Talang Kelapa'
                }
            ],
            shipping_geographs: [
                {
                    geograph: 1899,
                    name: 'Banyu Asin, Talang Kelapa'
                },
                {
                    geograph: 1829,
                    name: 'Cirebon, Pabedilan'
                }
            ]
        },
        shipping_destinations: {
            shipping_hubs: [
                {
                    hub: 1,
                    name: 'Jakarta Pusat, Menteng'
                },
                {
                    hub: 3,
                    name: 'Banyu Asin, Talang Kelapa'
                }
            ],
            shipping_geographs: [
                {
                    geograph: 1899,
                    name: 'Banyu Asin, Talang Kelapa'
                },
                {
                    geograph: 1829,
                    name: 'Cirebon, Pabedilan'
                }
            ]
        },
        customer_id: 123,
        shipping_payment_type_id: 1,
        tier_type: 'CUSTOM',
        is_vendor: true,
        category: {
            name: 'Printing & writing paper',
            type: 'C3',
            id: 561
        },
        start_date: moment().add(1, 'days'),
        end_date: moment().add(1, 'days')
    }
};

const RESPONSE_FIND_BY_C2 = [{ id: 219 }];

const RESPONSE_FIND_C3_BY_C2 = [{ id: 396 }, { id: 561 }, { id: 712 }, { id: 719 }];

const RESPONSE_FIND_BY_C3 = [{ id: 396 }, { id: 561 }, { id: 712 }, { id: 719 }];

const RESPONSE_PRODUCT = [
    {
        id: 20,
        tier_min_qty_1: 1,
        tier_min_qty_2: 50,
        tier_min_qty_3: 100,
        tier_cogs_price_1: '3100000.00',
        tier_cogs_price_2: '3050000.00',
        tier_cogs_price_3: '3000000.00',
        ProductVariant: {
            id: 9,
            sku: '93VN03AVNO',
            long_name: 'RedMi A1 - Black - 32GB'
        }
    },
    {
        id: 4,
        tier_min_qty_1: 1,
        tier_min_qty_2: 2,
        tier_min_qty_3: 3,
        tier_cogs_price_1: '12000000.00',
        tier_cogs_price_2: '11999000.00',
        tier_cogs_price_3: '11990000.00',
        ProductVariant: {
            id: 4,
            sku: 'WBQH1BWFAN',
            long_name: 'Apple iPhone 7 - Silver - 32GB'
        }
    }
];

const RESPONSE_UPLOAD = {
    Location: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/contract-template/template-contract-e3f9b08d-cec7-44b9-be9d-02225bf69f67.xlsx',
    key: 'contract-template/template-contract-e3f9b08d-cec7-44b9-be9d-02225bf69f67.xlsx'
};

// Test Scenario
test.serial('Failed Download Contract Product Template, Error -> Unauthorized', async (t) => {
    await Methods.downloadContractTemplate({}, {})
        .catch((error) => {
            t.is(error.message, 'Not Authorized');
        });
});

test.serial('Failed Download Contract Product Template, Error -> Invalid path vendor id', async (t) => {
    const payload = _.chain(PAYLOAD)
        .cloneDeep()
        .set('path.vendor_id', 'Eaaaaa')
        .value();

    await Methods.downloadContractTemplate(payload, context)
        .catch((error) => {
            t.is(error.message, 'value must be a number');
        });
});

test.serial('Failed Download Contract Product Template, Error -> Invalid body payload', async (t) => {
    const payload = _.chain(PAYLOAD)
        .cloneDeep()
        .omit('body.category')
        .value();

    await Methods.downloadContractTemplate(payload, context)
        .catch((error) => {
            t.is(error.message, 'child category fails because [category is required]');
        });
});

test.serial('Failed Download Contract Product Template, Error -> Failed to start transaction', async (t) => {
    t.context.sandbox.stub(DBContext, 'startTransaction')
        .throws(new Error('startTransaction error'));

    t.context.sandbox.stub(DBContext, 'rollback')
        .resolves({});

    await Methods.downloadContractTemplate(PAYLOAD, context)
        .catch((error) => {
            t.is(error.message, 'startTransaction error');
        });
});

test.serial('Failed Download Contract Product Template, Error -> Shipping Franco but origins geographs and hub empty', async (t) => {
    const payload = _.chain(PAYLOAD)
        .cloneDeep()
        .set('body.shipping_origins.shipping_hubs', [])
        .set('body.shipping_origins.shipping_geographs', [])
        .value();

    t.context.sandbox.stub(DBContext, 'startTransaction')
        .resolves({});

    t.context.sandbox.stub(DBContext, 'rollback')
        .resolves({});

    await Methods.downloadContractTemplate(payload, context)
        .catch((error) => {
            t.is(error.message, 'Anda mempunyai tipe pengiriman FRANCO sehingga anda harus memilih origins geograph ataupun hub');
        });
});

test.serial('Failed Download Contract Product Template, Error -> Shipping Franco but destinations geographs and hub empty', async (t) => {
    const payload = _.chain(PAYLOAD)
        .cloneDeep()
        .set('body.shipping_destinations.shipping_hubs', [])
        .set('body.shipping_destinations.shipping_geographs', [])
        .value();

    t.context.sandbox.stub(DBContext, 'startTransaction')
        .resolves({});

    t.context.sandbox.stub(DBContext, 'rollback')
        .resolves({});

    await Methods.downloadContractTemplate(payload, context)
        .catch((error) => {
            t.is(error.message, 'Anda mempunyai tipe pengiriman FRANCO sehingga anda harus memilih destinations geograph ataupun hub');
        });
});

test.serial('Failed Download Contract Product Template, Error -> Shipping LOCO but origins geographs or hub exist', async (t) => {
    const payload = _.chain(PAYLOAD)
        .cloneDeep()
        .set('body.shipping_payment_type_id', 2)
        .set('body.shipping_destinations.shipping_geographs', [])
        .value();

    t.context.sandbox.stub(DBContext, 'startTransaction')
        .resolves({});

    t.context.sandbox.stub(DBContext, 'rollback')
        .resolves({});

    await Methods.downloadContractTemplate(payload, context)
        .catch((error) => {
            t.is(error.message, 'Anda mempunyai tipe pengiriman LOCO sehingga anda tidak boleh memilih origins geograph ataupun hub');
        });
});

test.serial('Failed Download Contract Product Template, Error -> Shipping LOCO but destinations geographs or hub EXIST', async (t) => {
    const payload = _.chain(PAYLOAD)
        .cloneDeep()
        .set('body.shipping_payment_type_id', 2)
        .set('body.shipping_origins.shipping_geographs', [])
        .set('body.shipping_origins.shipping_hubs', [])
        .value();

    t.context.sandbox.stub(DBContext, 'startTransaction')
        .resolves({});

    t.context.sandbox.stub(DBContext, 'rollback')
        .resolves({});

    await Methods.downloadContractTemplate(payload, context)
        .catch((error) => {
            t.is(error.message, 'Anda mempunyai tipe pengiriman LOCO sehingga anda tidak boleh memilih destinations geograph ataupun hub');
        });
});

test.serial('Failed Download Contract Product Template, Error -> Product tidak ditemukan', async (t) => {
    t.context.sandbox.stub(DBContext, 'startTransaction')
        .resolves({});

    t.context.sandbox.stub(ContractRepoCategory, 'findC3')
        .resolves(RESPONSE_FIND_BY_C3);

    t.context.sandbox.stub(ContractRepoProduct, 'findProductByVendorAndCategory')
        .resolves([]);

    t.context.sandbox.stub(DBContext, 'rollback')
        .resolves({});

    await Methods.downloadContractTemplate(PAYLOAD, context)
        .catch((error) => {
            t.is(error.message, 'Produk tidak ditemukan');
        });
});

test.serial('Failed Download Contract Product Template, Error -> Shipping LOCO but destinations geographs or hub EXIST', async (t) => {
    const payload = _.chain(PAYLOAD)
        .cloneDeep()
        .set('body.shipping_payment_type_id', 2)
        .set('body.shipping_origins.shipping_geographs', [])
        .set('body.shipping_origins.shipping_hubs', [])
        .value();

    t.context.sandbox.stub(DBContext, 'startTransaction')
        .resolves({});

    t.context.sandbox.stub(DBContext, 'rollback')
        .resolves({});

    await Methods.downloadContractTemplate(payload, context)
        .catch((error) => {
            t.is(error.message, 'Anda mempunyai tipe pengiriman LOCO sehingga anda tidak boleh memilih destinations geograph ataupun hub');
        });
});

test.serial('Success Download Contract Product Template, Success -> C2', async (t) => {
    const payload = _.chain(PAYLOAD)
        .cloneDeep()
        .set('body.is_vendor', false)
        .set('body.category.type', 'C2')
        .set('body.tier_type', 'DEFAULT')
        .set('body.shipping_payment_type_id', 2)
        .set('body.shipping_origins.shipping_hubs', [])
        .set('body.shipping_origins.shipping_geographs', [])
        .set('body.shipping_destinations.shipping_hubs', [])
        .set('body.shipping_destinations.shipping_geographs', [])
        .value();

    t.context.sandbox.stub(DBContext, 'startTransaction')
        .resolves({});

    t.context.sandbox.stub(ContractRepoCategory, 'findC2')
        .resolves(RESPONSE_FIND_BY_C2);

    t.context.sandbox.stub(ContractRepoCategory, 'findC3ByC2')
        .resolves(RESPONSE_FIND_C3_BY_C2);

    t.context.sandbox.stub(ContractRepoProduct, 'findProductByVendorAndCategory')
        .resolves(RESPONSE_PRODUCT);

    t.context.sandbox.stub(Generate, 'generateProductTemplate')
        .resolves('Buffer File 13123131231');

    t.context.sandbox.stub(UploadTemplate, 'upload')
        .resolves(RESPONSE_UPLOAD);

    t.context.sandbox.stub(DBContext, 'commit')
        .resolves({});

    await Methods.downloadContractTemplate(payload, context)
        .then((response) => {
            t.is(response.message, 'success');
        })
        .catch((error) => {
            t.fail(error.message);
        });
});

test.serial('Success Download Contract Product Template, Success -> C3 ', async (t) => {
    const payload = _.chain(PAYLOAD)
        .cloneDeep()
        .set('body.shipping_payment_type_id', 2)
        .set('body.shipping_origins.shipping_hubs', [])
        .set('body.shipping_origins.shipping_geographs', [])
        .set('body.shipping_destinations.shipping_hubs', [])
        .set('body.shipping_destinations.shipping_geographs', [])
        .value();

    t.context.sandbox.stub(DBContext, 'startTransaction')
        .resolves({});

    t.context.sandbox.stub(ContractRepoCategory, 'findC3')
        .resolves(RESPONSE_FIND_BY_C3);

    t.context.sandbox.stub(ContractRepoProduct, 'findProductByVendorAndCategory')
        .resolves(RESPONSE_PRODUCT);

    t.context.sandbox.stub(Generate, 'generateProductTemplate')
        .resolves('Buffer File 13123131231');

    t.context.sandbox.stub(UploadTemplate, 'upload')
        .resolves(RESPONSE_UPLOAD);

    t.context.sandbox.stub(DBContext, 'commit')
        .resolves({});

    await Methods.downloadContractTemplate(payload, context)
        .then((response) => {
            t.is(response.message, 'success');
        })
        .catch((error) => {
            t.fail(error.message);
        });
});

test.serial('Success Download Contract Product Template, FRANCO', async (t) => {
    const payload = _.chain(PAYLOAD)
        .cloneDeep()
        .set('body.shipping_payment_type_id', 1)
        .set('body.shipping_origins.shipping_hubs', [{ name: 'hub origin', hub: '111' }])
        .set('body.shipping_origins.shipping_geographs', [{ name: 'geo origin', geograph: '222' }])
        .set('body.shipping_destinations.shipping_hubs', [{ name: 'hub dest', hub: '333' }])
        .set('body.shipping_destinations.shipping_geographs', [{ name: 'hub dest', geograph: '444' }])
        .value();

    t.context.sandbox.stub(DBContext, 'startTransaction')
        .resolves({});

    t.context.sandbox.stub(ContractRepoCategory, 'findC3')
        .resolves(RESPONSE_FIND_BY_C3);

    t.context.sandbox.stub(ContractRepoProduct, 'findProductByVendorAndCategory')
        .resolves(RESPONSE_PRODUCT);

    t.context.sandbox.stub(Generate, 'generateProductTemplate')
        .resolves('Buffer File 13123131231');

    t.context.sandbox.stub(UploadTemplate, 'upload')
        .resolves(RESPONSE_UPLOAD);

    t.context.sandbox.stub(DBContext, 'commit')
        .resolves({});

    await Methods.downloadContractTemplate(payload, context)
        .then((response) => {
            t.is(response.message, 'success');
        })
        .catch((error) => {
            t.fail(error.message);
        });
});

test.serial('Success Download Contract Product Template, incomplete tier qty and price', async (t) => {
    const payload = _.chain(PAYLOAD)
        .cloneDeep()
        .set('body.shipping_payment_type_id', 1)
        .set('body.shipping_origins.shipping_hubs', [{ name: 'hub origin', hub: '111' }])
        .set('body.shipping_origins.shipping_geographs', [{ name: 'geo origin', geograph: '222' }])
        .set('body.shipping_destinations.shipping_hubs', [{ name: 'hub dest', hub: '333' }])
        .set('body.shipping_destinations.shipping_geographs', [{ name: 'hub dest', geograph: '444' }])
        .value();

    t.context.sandbox.stub(DBContext, 'startTransaction')
        .resolves({});

    t.context.sandbox.stub(ContractRepoCategory, 'findC3')
        .resolves(RESPONSE_FIND_BY_C3);

    const product = [
        {
            id: 20,
            tier_min_qty_1: null,
            tier_min_qty_2: null,
            tier_min_qty_3: null,
            tier_cogs_price_1: null,
            tier_cogs_price_2: null,
            tier_cogs_price_3: null,
            ProductVariant: {
                id: 9,
                sku: '93VN03AVNO',
                long_name: 'RedMi A1 - Black - 32GB'
            }
        },
        {
            id: 4,
            tier_min_qty_1: 1,
            tier_min_qty_2: 2,
            tier_min_qty_3: 3,
            tier_cogs_price_1: '12000000.00',
            tier_cogs_price_2: '11999000.00',
            tier_cogs_price_3: '11990000.00',
            ProductVariant: {
                id: 4,
                sku: 'WBQH1BWFAN',
                long_name: 'Apple iPhone 7 - Silver - 32GB'
            }
        }
    ];
    t.context.sandbox.stub(ContractRepoProduct, 'findProductByVendorAndCategory')
        .resolves(product);

    t.context.sandbox.stub(Generate, 'generateProductTemplate')
        .resolves('Buffer File 13123131231');

    t.context.sandbox.stub(UploadTemplate, 'upload')
        .resolves(RESPONSE_UPLOAD);

    t.context.sandbox.stub(DBContext, 'commit')
        .resolves({});

    await Methods.downloadContractTemplate(payload, context)
        .then((response) => {
            t.is(response.message, 'success');
        })
        .catch((error) => {
            t.fail(error.message);
        });
});


// ------------------------------------------------------------------------------------

test.before('Initialize BizzyError Before All Tests', (t) => {
    BizzyError.initializeErrors();
});
test.beforeEach('Initialize New Sandbox Before Each Test', (t) => {
    t.context.sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
});
test.afterEach.always('Restore Sandbox and Configuration After Each Test', (t) => {
    t.context.sandbox.restore();
});
