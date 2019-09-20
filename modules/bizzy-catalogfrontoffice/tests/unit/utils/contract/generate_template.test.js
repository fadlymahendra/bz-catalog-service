'use strict';

// Plugin helper
const test = require('ava');
const sinon = require('sinon');
const { BizzyError } = require('bizzy-common');
const _ = require('lodash');

// Method
const Methods = require('../../../../src/utils/contract/generate_template');

const PAYLOAD = {
    templatePayload: [
        {
            skuName: 'Apple iPhone 7 - Black - 32GB',
            skuNumber: 'MX7R97RTC7',
            tierQty1: 1,
            tierPrice1: 8000000,
            tierQty2: null,
            tierPrice2: null,
            tierQty3: null,
            tierPrice3: null,
            destination: 'Banyu Asin, Talang Kelapa-HUB-3',
            convertedStartDate: '12-11-2017',
            convertedEndDate: '12-11-2018'
        }, {
            skuName: 'Apple iPhone 7 - Black - 32GB',
            skuNumber: 'MX7R97RTC7',
            tierQty1: 1,
            tierPrice1: 8000000,
            tierQty2: null,
            tierPrice2: null,
            tierQty3: null,
            tierPrice3: null,
            destination: 'Banyu Asin, Talang Kelapa-GEO-1899',
            convertedStartDate: '12-1 1-2017',
            convertedEndDate: '12-11-2018'
        }, {
            skuName: 'Apple iPhone 7 - Black - 32GB',
            skuNumber: 'MX7R97RTC7',
            tierQty1: 1,
            tierPrice1: 8000000,
            tierQty2: null,
            tierPrice2: null,
            tierQty3: null,
            tierPrice3: null,
            destination: 'Cirebon, Pabedilan-GEO-1829',
            convertedStartDate: '12-11-2017',
            convertedEndDate: '12-11-2018'
        }, {
            skuName: 'Apple iPhone 7 - Black - 32GB',
            skuNumber: 'MX7R97RTC7',
            tierQty1: 1,
            tierPrice1: 8000000,
            tierQty2: 5,
            tierPrice2: 90000,
            tierQty3: 10,
            tierPrice3: 100000,
            destination: 'Cirebon, Pabedilan-GEO-1829',
            convertedStartDate: '12-11-2017',
            convertedEndDate: '12-11-2018'
        }
    ],
    shippingPaymentTypeId: 1,
    shippingOrigins: {
        shippingHubs: [
            {
                hub: 1,
                name: 'Jakarta Pusat, Menteng'
            },
            {
                hub: 3,
                name: 'Banyu Asin, Talang Kelapa'
            }
        ],
        shippingGeographs: [
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
    tierType: 'CUSTOM',
    isVendor: false
};

test.serial('Generate Template -> LOCO -> CUSTOM -> CUSTOMER', async (t) => {
    const payload = _.chain(PAYLOAD)
        .cloneDeep()
        .set('shippingPaymentTypeId', 2)
        .value();

    await Methods.generateProductTemplate(payload)
        .then((response) => {
            t.is(response.message, 'transformed');
        });
});

test.serial('Generate Template -> LOCO -> DEFAULT -> CUSTOMER', async (t) => {
    const payload = _.chain(PAYLOAD)
        .cloneDeep()
        .set('shippingPaymentTypeId', 2)
        .set('tierType', 'DEFAULT')
        .value();

    await Methods.generateProductTemplate(payload)
        .then((response) => {
            t.is(response.message, 'transformed');
        });
});

test.serial('Generate Template -> FRANCO -> CUSTOM -> CUSTOMER', async (t) => {
    const payload = _.chain(PAYLOAD)
        .cloneDeep()
        .value();

    await Methods.generateProductTemplate(payload)
        .then((response) => {
            t.is(response.message, 'transformed');
        });
});

test.serial('Generate Template -> FRANCO -> DEFAULT -> CUSTOMER', async (t) => {
    const payload = _.chain(PAYLOAD)
        .cloneDeep()
        .set('tierType', 'DEFAULT')
        .value();

    await Methods.generateProductTemplate(payload)
        .then((response) => {
            t.is(response.message, 'transformed');
        });
});

test.serial('Generate Template -> FRANCO -> CUSTOM -> VENDOR', async (t) => {
    const payload = _.chain(PAYLOAD)
        .cloneDeep()
        .set('isVendor', true)
        .value();

    await Methods.generateProductTemplate(payload)
        .then((response) => {
            t.is(response.message, 'transformed');
        });
});

test.serial('Generate Template -> FRANCO -> DEFAULT -> VENDOR', async (t) => {
    const payload = _.chain(PAYLOAD)
        .cloneDeep()
        .set('tierType', 'DEFAULT')
        .set('isVendor', true)
        .value();

    await Methods.generateProductTemplate(payload)
        .then((response) => {
            t.is(response.message, 'transformed');
        });
});

test.before('Initialize BizzyError Before All Tests', (t) => {
    BizzyError.initializeErrors();
});
test.beforeEach('Initialize New Sandbox Before Each Test', (t) => {
    t.context.sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
});
test.afterEach.always('Restore Sandbox and Configuration After Each Test', (t) => {
    t.context.sandbox.restore();
});
