'use strict';

const { BizzyError } = require('bizzy-common');
const test = require('ava');
const sinon = require('sinon');
const Method = require('../../../../src/methods/product-detail/sku_multiple');

const ProductVariantRepository = require('../../../../src/repositories/product_variant');
const ProductVendorRepository = require('../../../../src/repositories/product_vendor');
const ProductGroupRepository = require('../../../../src/repositories/product_group');
const CustomeRepository = require('../../../../src/repositories/raw_query');
const UomRepository = require('../../../../src/repositories/uom');
const BrandRepository = require('../../../../src/repositories/brand');
const StockingUomRepository = require('../../../../src/repositories/stocking_uom');
const CategoryRepository = require('../../../../src/repositories/category');
const SyncRepository = require('../../../../src/repositories/sync_service');
const ProductGroupAttributeCategory = require('../../../../src/repositories/product_group_attribute');
const ProductMappingRepository = require('../../../../src/repositories/product_sku_mapping');
const GeneralRepository = require('../../../../src/repositories/general');


const context = {
    user: {
        customer: {
            organization_id: 1
        }
    }
};

const priceEngine = [ { id: 4,
    sku: 'WBQH1BWFAN',
    type: null,
    tier_data: [Object],
    cid: '72f0ed223c48f5443a4c7868099fe80c90e3ef10c15e43bdf15fa689816b4574465e8a3f01a2ee9d6355b8184075dfa19272f1421ba8365e4a3f027b6918ec3e625d6d4adc86292e190d251635a59c40e62e18e485d3f6ccec63a62526cabe6891ecef527269014aabc81a517e52b999',
    top_days: 0,
    is_contract_price: false,
    is_franco: false,
    shipping: [],
    channel_type: 'MP',
    vendor_id: '345' },
  { id: 4,
    sku: 'WBQH1BWFAN',
    type: null,
    tier_data: [Object],
    cid: '72f0ed223c48f5443a4c7868099fe80c3540a8f1c5269e98aa493317504e52d4074e8c9c0ea0c9d0a483049994782da7e6af815ed01285753cea655d046a3cceb3858de7f0931cae182e2b4a4adb41aa5734a284ccf6b47b20146c496e7723c677407179f086461b2ec453ca6a431b09',
    top_days: 0,
    is_contract_price: false,
    is_franco: false,
    shipping: [],
    channel_type: 'MP',
    vendor_id: '351' },
  { id: 4,
    sku: 'WBQH1BWFAN',
    type: null,
    tier_data: [Object],
    cid: '72f0ed223c48f5443a4c7868099fe80c600594304430c815788e87bf870440fc904d0eab304f022171cb053c1871d528',
    top_days: 0,
    is_contract_price: false,
    is_franco: false,
    shipping: [],
    channel_type: 'MP',
    vendor_id: '194' },
  { id: 4,
    sku: 'WBQH1BWFAN',
    type: null,
    tier_data: [Object],
    cid: '72f0ed223c48f5443a4c7868099fe80ce757e27b5ee8086b8aadeab00ff54a41cb34b3d90d823db700f674c341191963ad0c7d60db6479f4e9b33a85d7feb7166c0ee91f4a0b86c5bff9144707c260015195631584f1c40f0c46f394b2cffc16e7ca98e59945ee148f5fb2c2f0c2533c',
    top_days: 0,
    is_contract_price: false,
    is_franco: false,
    shipping: [],
    channel_type: 'MP',
    vendor_id: '4' },
  { id: 4,
    sku: 'WBQH1BWFAN',
    type: null,
    tier_data: [Object],
    cid: '72f0ed223c48f5443a4c7868099fe80c2ed8ec8e4a575822632e207409155b77c96884d23b6ed4715abd479301c713d2fac008d2ad708b48c1793c155b5a9affdc2674811ed66a48a954535062a9d47a35b1ade8362ade5f13af3db8fb601a6befc4937090b98289306f3c2f21c05aae',
    top_days: 0,
    is_contract_price: false,
    is_franco: false,
    shipping: [],
    channel_type: 'MP',
    vendor_id: '2' },
  { id: 4,
    sku: 'WBQH1BWFAN',
    type: null,
    tier_data: [Object],
    cid: '5f1da45d6c33837dd6e0173196ef1e3d399de1224518771e5b6666685fd1d756e1067f2926fcb4aba9ece5ddf939ad540181dd2ccca93a1a4fa79c88da259f2c38a3f631aa27af02730d28a1da23ce3508c52b716a313d60660714e4fab04f00912b50650d6ec2b3ec9b98fa92c5f17260581123d399055527078cbd597e6a8e',
    top_days: 0,
    is_contract_price: false,
    is_franco: false,
    shipping: [],
    channel_type: 'MP',
    vendor_id: '3' } ];

test.serial('getSkuMultiple: Failure throw no authorized access', function* (t) {
    const data = {
        query: {
            skus: 'WBQH1BWFAN,8Y20N10TL9'
        }
    };
    try {
        yield Method.getSkuMultiple(data, {
            users: {
                customer: {
                    organization_id: 1
                }
            }
        });
        t.fail('getSkuMultiple: Failure throw no authorized access');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden);
    }
});

test.serial('getSkuMultiple: Failure throw incorrect payload', function* (t) {
    const data = {
        query: {
            skus: 1
        }
    };
    try {
        yield Method.getSkuMultiple(data, context);
        t.fail('getSkuMultiple: Failure throw incorrect payload');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest);
    }
});

test.serial('getSkuMultiple: Success case product variant found, NOVARIANT', function* (t) {
    const data = {
        query: {
            skus: 'WBQH1BWFAN'
        }
    };
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves({
        id: 1,
        product_group_id: 2,
        // variant: 'NO_VARIANT',
        variant_value: 'NO_VARIANT',
        primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516885661.jpg',
        additional_image: '["https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516885671.jpg","https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516885675.png"]'
    });

    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves({
        id: 1,
        name: 'pg1',
        variant_matrix: [],
        category_id: 1,
        brand_id: 2,
        product_specifications: []
    });

    t.context.sandbox.stub(CustomeRepository, 'findAllCategoryId').resolves([{
        c0: 1, c1: 2, c2: 3, c3: 4
    }]);

    t.context.sandbox.stub(ProductVendorRepository, 'findByVariant').resolves([{
        id: 2,
        vendor_id: 3,
        warehouse_id: 3
    }]);

    t.context.sandbox.stub(BrandRepository, 'findById').resolves({ id: 1, name: 'Apple' });
    t.context.sandbox.stub(UomRepository, 'findById').resolves({ id: 1 });
    t.context.sandbox.stub(StockingUomRepository, 'findById').resolves({ id: 1 });
    const cat = t.context.sandbox.stub(CategoryRepository, 'findOne');
    cat.onCall(0).resolves({ id: 1, name: 'c', level: '1' });
    cat.onCall(1).resolves({ id: 1, name: 'c', level: '1' });
    cat.onCall(2).resolves({ id: 1, name: 'c', level: '1' });
    cat.onCall(3).resolves({ id: 1, name: 'c', level: '1' });

    t.context.sandbox.stub(ProductGroupAttributeCategory, 'findAll').resolves([]);
    t.context.sandbox.stub(SyncRepository, 'findWarehouseByIds').resolves({
        data: [{ 
            id: 3,
            vendor: { id: 3, prefix: 'Pt', suffix: '', name: 'Legal'},
            warehouse_address: {
                id: 3,
                name: 'jakarta'
            }
        }]
    });
    t.context.sandbox.stub(SyncRepository, 'priceEngineCart').resolves(priceEngine);
    t.context.sandbox.stub(ProductMappingRepository, 'findMappingSku').resolves([]);

    try {
        yield Method.getSkuMultiple(data, context);
        t.pass();
    } catch (err) {
        console.log(err);
        t.fail('getSkuMultiple: Success case variant found');
    }
});


test.serial('getSkuMultiple: Success case product variant found, WITH VARIANT', function* (t) {
    const data = {
        query: {
            skus: 'WBQH1BWFAN'
        }
    };
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves({
        id: 1,
        product_group_id: 2,
        // variant: 'NO_VARIANT',
        variant_value: '{"color":3}',
        primary_image: 'https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516885661.jpg',
        additional_image: '["https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516885671.jpg","https://catalogproducts-staging.s3.ap-southeast-1.amazonaws.com/2018/01/product_1516885675.png"]'
    });

    t.context.sandbox.stub(ProductGroupRepository, 'findById').resolves({
        id: 1,
        name: 'pg1',
        variant_matrix: [],
        category_id: 1,
        brand_id: 2,
        product_specifications: []
    });

    t.context.sandbox.stub(CustomeRepository, 'findAllCategoryId').resolves([{
        c0: 1, c1: 2, c2: 3, c3: 4
    }]);

    t.context.sandbox.stub(ProductVendorRepository, 'findByVariant').resolves([{
        id: 2,
        vendor_id: 3,
        warehouse_id: 3
    }]);

    t.context.sandbox.stub(GeneralRepository, 'findAttributeByVariantValue').resolves([{ id: 1, name: 'Apple' }]);
    t.context.sandbox.stub(BrandRepository, 'findById').resolves({ id: 1, name: 'Apple' });
    t.context.sandbox.stub(UomRepository, 'findById').resolves({ id: 1 });
    t.context.sandbox.stub(StockingUomRepository, 'findById').resolves({ id: 1 });
    const cat = t.context.sandbox.stub(CategoryRepository, 'findOne');
    cat.onCall(0).resolves({ id: 1, name: 'c', level: '1' });
    cat.onCall(1).resolves({ id: 1, name: 'c', level: '1' });
    cat.onCall(2).resolves({ id: 1, name: 'c', level: '1' });
    cat.onCall(3).resolves({ id: 1, name: 'c', level: '1' });

    t.context.sandbox.stub(ProductGroupAttributeCategory, 'findAll').resolves([]);
    t.context.sandbox.stub(SyncRepository, 'findWarehouseByIds').resolves({
        data: [{ 
            id: 3,
            vendor: { id: 3, prefix: 'Pt', suffix: '', name: 'Legal'},
            warehouse_address: {
                id: 3,
                name: 'jakarta'
            }
        }]
    });
    t.context.sandbox.stub(SyncRepository, 'priceEngineCart').resolves(priceEngine);
    t.context.sandbox.stub(ProductMappingRepository, 'findMappingSku').resolves([]);

    try {
        yield Method.getSkuMultiple(data, context);
        t.pass();
    } catch (err) {
        console.log(err);
        t.fail('getSkuMultiple: Success case product variant found');
    }
});

test.serial('getSkuMultiple: Success case product variant not found', function* (t) {
    const data = {
        query: {
            skus: 'WBQH1BWFAN'
        }
    };
    t.context.sandbox.stub(ProductVariantRepository, 'findOne').resolves(null);
    try {
        const res = yield Method.getSkuMultiple(data, context);
        t.deepEqual(res.data, []);
    } catch (err) {
        t.fail('getSkuMultiple: Success case variant not found');
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
