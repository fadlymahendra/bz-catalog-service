'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const { BizzyError, DBContext, BizzyService } = require('bizzy-common');
const Methods = require('../../../../src/methods/products/bulk_upload');

const CategoryRepository = require('../../../../src/repositories/category');
const BrandRepository = require('../../../../src/repositories/brand');
const UomRepository = require('../../../../src/repositories/uom');
const StockingUomRepository = require('../../../../src/repositories/stocking_uom');
const SyncRepository = require('../../../../src/repositories/sync_service');
const ProductGroupRepository = require('../../../../src/repositories/product_group');
const ProductVendorRepository = require('../../../../src/repositories/product_vendor');
const ProductVariantRepository = require('../../../../src/repositories/product_variant');
const ProductSkuRepository = require('../../../../src/repositories/product_sku');
const PremoderationRepository = require('../../../../src/repositories/premoderation');
const ProductUploadRepository = require('../../../../src/repositories/product_upload');
const S3Bucket = require('../../../../src/utils/s3_bucket');
const ExcelAdapter = require('../../../../src/adapter/bulk_upload');
const context = require('../../../mocks/context.json');

const payload = {
    body: {
        customer_id: 3,
        data: 'VALID'
    }
};

const resBrand = [
    {
        id: 2,
        name: 'apple'
    },
    {
        id: 33,
        name: 'NO BRAND'
    }
];

const resUom = [
    {
        id: 1,
        name: 'Each'
    },
    {
        id: 2,
        name: 'Unit'
    }
];

const resStockUom = [
    {
        id: 1,
        name: 'Each / Buah'
    },
    {
        id: 2,
        name: 'Box'
    }
];

const resListVendor = [
    {
        id: 1,
        name: 'PT name',
        primary_warehouse: {
            id: 31,
            name: 'Kantor Cabang 2'
        }
    },
    {
        id: 2,
        name: 'PT last',
        primary_warehouse: {
            id: 21,
            name: 'Kantor Cabang 2'
        }
    }
];

const resCategory = {
    id: 1,
    name: 'Tidak Terkategori',
    level: 'C3'
};

const docCase1 = [{
    prefix: '',
    no: '1',
    vendor_id: 1,
    product_name: 'Apple Y',
    brand: 'apple',
    description: 'mix',
    package_content: '1 Apple Y',
    uom: 'Each',
    stocking_uom: 'Each / Buah',
    quantity_stocking_uom: 1,
    package_weight: 1,
    package_width: 1,
    package_length: 1,
    package_height: 1,
    tier_min_qty_1: 1,
    tier_cogs_price_1: 100000,
    warranty_option: 'Tidak Bergaransi',
    warranty_period: '',
    warranty_limit: ''
}];


const docCase2 = [{
    prefix: '',
    no: '1',
    vendor_id: 1,
    product_name: 'Apple Y',
    brand: 'samsung',
    description: 'mix',
    package_content: '1 Apple Y',
    uom: 'Each',
    stocking_uom: 'Each / Buah',
    quantity_stocking_uom: 1,
    package_weight: 1,
    package_width: 1,
    package_length: 1,
    package_height: 1,
    tier_min_qty_1: 1,
    tier_cogs_price_1: 100000,
    warranty_option: 'Tidak Bergaransi',
    warranty_period: '',
    warranty_limit: ''
},
{
    prefix: '',
    no: '2',
    vendor_id: 1,
    product_name: 'Apple Y',
    brand: 'apple',
    description: 'mix',
    package_content: '1 Apple Y',
    uom: 'Each',
    stocking_uom: 'Each / Buah',
    quantity_stocking_uom: 1,
    package_weight: 1,
    package_width: 1,
    package_length: 1,
    package_height: 1,
    tier_min_qty_1: 1,
    tier_cogs_price_1: 100000,
    warranty_option: 'Tidak Bergaransi',
    warranty_period: '',
    warranty_limit: ''
}];

test.serial('Successfull Bulk Upload Sku, 1 Sku berhasil ditambahkan', function* (t) {
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.stub(ExcelAdapter, 'readDocumentForBulkUpload').resolves(docCase1);
    t.context.sandbox.stub(ProductGroupRepository, 'createOne').resolves({
        dataValues: { id: 1 }
    });
    t.context.sandbox.stub(ProductVariantRepository, 'createOne').resolves({
        dataValues: { id: 2 }
    });
    t.context.sandbox.stub(ProductVendorRepository, 'createOne').resolves();
    t.context.sandbox.stub(ProductSkuRepository, 'findOne').resolves(null);
    const asyncCall = t.context.sandbox.stub(BizzyService, 'callAsync');
    asyncCall.onCall(0).resolves(null);
    asyncCall.onCall(1).resolves(null);
    t.context.sandbox.stub(BrandRepository, 'createOne').resolves({
        id: 11, name: 'Apple'
    });
    t.context.sandbox.stub(CategoryRepository, 'findOne').resolves(resCategory);
    t.context.sandbox.stub(SyncRepository, 'getListVendor').resolves({
        data: resListVendor
    });

    try {
        const res = yield Methods.uploadSkuByBizzy(payload, context);
        t.deepEqual(res.message, '1 Sku berhasil ditambahkan');
        t.pass();
    } catch (err) {
        console.log(err);
        t.fail();
    }
});

test.serial('Successfull Bulk Upload Sku, 1 Sku berhasil ditambahkan, 1 Sku gagal, create new brand', function* (t) {
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.stub(ExcelAdapter, 'readDocumentForBulkUpload').resolves(docCase2);
    t.context.sandbox.stub(ProductGroupRepository, 'createOne').resolves({ dataValues: { id: 1 } });
    t.context.sandbox.stub(ProductVariantRepository, 'createOne').resolves({ dataValues: { id: 1 } });
    t.context.sandbox.stub(ProductVendorRepository, 'createOne').resolves();
    t.context.sandbox.stub(ProductSkuRepository, 'findOne').resolves(null);
    t.context.sandbox.stub(CategoryRepository, 'findOne').resolves(resCategory);
    t.context.sandbox.stub(BrandRepository, 'createOne').resolves({ id: 11, name: 'samsung' });
    const asyncCall = t.context.sandbox.stub(BizzyService, 'callAsync');
    asyncCall.onCall(0).resolves(null);
    asyncCall.onCall(1).resolves(null);
    t.context.sandbox.stub(SyncRepository, 'getListVendor').resolves({
        data: resListVendor
    });

    try {
        const res = yield Methods.uploadSkuByBizzy(payload, context);
        t.deepEqual(res.message, '1 Sku berhasil ditambahkan, 1 Sku gagal');
        t.pass();
    } catch (err) {
        console.log(err);
        t.fail();
    }
});

test.serial('Failed Bulk Upload Sku, 0 Sku berhasil ditambahkan, Failed on create product vendor', function* (t) {
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.stub(ExcelAdapter, 'readDocumentForBulkUpload').resolves(docCase1);
    t.context.sandbox.stub(ProductGroupRepository, 'createOne').resolves({
        dataValues: { id: 1 }
    });
    t.context.sandbox.stub(ProductVariantRepository, 'createOne').resolves({
        dataValues: { id: 1 }
    });
    t.context.sandbox.stub(ProductVendorRepository, 'createOne').rejects();
    t.context.sandbox.stub(ProductSkuRepository, 'findOne').resolves(null);
    t.context.sandbox.stub(CategoryRepository, 'findOne').resolves(resCategory);
    t.context.sandbox.stub(SyncRepository, 'getListVendor').resolves({
        data: resListVendor
    });

    try {
        const res = yield Methods.uploadSkuByBizzy(payload, context);
        t.deepEqual(res.message, '0 Sku berhasil ditambahkan');
        t.pass();
    } catch (err) {
        console.log(err);
        t.fail();
    }
});

test.serial('Failed Bulk Upload Sku, reject payload', function* (t) {
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.stub(CategoryRepository, 'findOne').resolves(resCategory);
    t.context.sandbox.stub(SyncRepository, 'getListVendor').resolves({
        data: resListVendor
    });

    try {
        yield Methods.uploadSkuByBizzy({
            body: {
                customer_id: 'ss',
                datas: 'sss'
            }
        }, context);
        t.fail('Should return bad request');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest);
    }
});

test.serial('Failed Bulk Upload Sku, reject when reading excel', function* (t) {
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.stub(CategoryRepository, 'findOne').resolves(resCategory);
    t.context.sandbox.stub(SyncRepository, 'getListVendor').resolves({
        data: resListVendor
    });

    t.context.sandbox.stub(ExcelAdapter, 'readDocumentForBulkUpload').rejects();

    try {
        yield Methods.uploadSkuByBizzy(payload, context);
        t.fail('Should return bad request');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest);
    }
});

test.serial('Failed Bulk Upload Sku, not authorized context', function* (t) {
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.stub(CategoryRepository, 'findOne').resolves(resCategory);
    t.context.sandbox.stub(SyncRepository, 'getListVendor').resolves({
        data: resListVendor
    });

    try {
        yield Methods.uploadSkuByBizzy(payload, {});
        t.fail('Should return bad request');
    } catch (err) {
        t.true(err instanceof BizzyError.Forbidden);
    }
});

test.serial('Bulk Upload Sku: ERR_VENDOR_WAREHOUSE_NOT_FOUND', function* (t) {
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    const resListVendor2 = JSON.parse(JSON.stringify(resListVendor));
    resListVendor2[0].primary_warehouse = null;

    const docCase9 = JSON.parse(JSON.stringify(docCase1));
    docCase9[0].product_name = null;

    t.context.sandbox.stub(BrandRepository, 'createOne').resolves({ id: 11, name: 'samsung' });
    t.context.sandbox.stub(CategoryRepository, 'findOne').resolves(resCategory);
    t.context.sandbox.stub(ExcelAdapter, 'readDocumentForBulkUpload').resolves(docCase9);
    t.context.sandbox.stub(ProductGroupRepository, 'createOne').resolves({ dataValues: { id: 1 } });
    t.context.sandbox.stub(ProductVariantRepository, 'createOne').resolves({ dataValues: { id: 2 } });
    t.context.sandbox.stub(ProductVendorRepository, 'createOne').resolves();
    t.context.sandbox.stub(ProductSkuRepository, 'findOne').resolves(null);
    t.context.sandbox.stub(SyncRepository, 'getListVendor').resolves({
        data: resListVendor2
    });

    try {
        yield Methods.uploadSkuByBizzy(payload, context);
        t.pass();
    } catch (err) {
        t.fail('Should return BadRequest: ERR_VENDOR_WAREHOUSE_NOT_FOUND');
    }
});

test.serial('Bulk Upload Sku: Template Data tidak lengkap', function* (t) {
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.stub(BrandRepository, 'createOne').resolves({ id: 11, name: 'samsung' });
    t.context.sandbox.stub(CategoryRepository, 'findOne').resolves(null);
    t.context.sandbox.stub(ExcelAdapter, 'readDocumentForBulkUpload').resolves(docCase1);
    t.context.sandbox.stub(ProductGroupRepository, 'createOne').resolves({ dataValues: { id: 1 } });
    t.context.sandbox.stub(ProductVariantRepository, 'createOne').resolves({ dataValues: { id: 2 } });
    t.context.sandbox.stub(ProductVendorRepository, 'createOne').resolves();
    t.context.sandbox.stub(ProductSkuRepository, 'findOne').resolves(null);
    t.context.sandbox.stub(SyncRepository, 'getListVendor').resolves({
        data: resListVendor
    });

    try {
        yield Methods.uploadSkuByBizzy(payload, context);
        t.fail('Should return BadRequest: Template Data tidak lengkap');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest);
    }
});

test.serial('isSKUExists: screnario false and true', function* (t) {
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.stub(ExcelAdapter, 'readDocumentForBulkUpload').resolves(docCase1);
    t.context.sandbox.stub(ProductGroupRepository, 'createOne').resolves({
        dataValues: { id: 1 }
    });
    t.context.sandbox.stub(ProductVariantRepository, 'createOne').resolves({
        dataValues: { id: 2 }
    });
    t.context.sandbox.stub(ProductVendorRepository, 'createOne').resolves();
    const asyncCall = t.context.sandbox.stub(BizzyService, 'callAsync');
    asyncCall.onCall(0).resolves(null);
    asyncCall.onCall(1).resolves(null);
    t.context.sandbox.stub(BrandRepository, 'createOne').resolves({
        id: 11, name: 'Apple'
    });
    t.context.sandbox.stub(CategoryRepository, 'findOne').resolves(resCategory);
    t.context.sandbox.stub(SyncRepository, 'getListVendor').resolves({
        data: resListVendor
    });

    const findOneStub = t.context.sandbox.stub(ProductSkuRepository, 'findOne');
    findOneStub.onCall(0).resolves(true);
    findOneStub.onCall(1).resolves(null);

    try {
        const res = yield Methods.uploadSkuByBizzy(payload, context);
        t.deepEqual(res.message, '1 Sku berhasil ditambahkan');
        t.pass();
    } catch (err) {
        console.log(err);
        t.fail();
    }
});

test.serial('uploadSkuByBizzy: scenario fails when "await Promise.map(acceptedRecord,"', function* (t) {
    t.context.sandbox.mock(DBContext).expects('startTransaction').rejects();
    t.context.sandbox.stub(ExcelAdapter, 'readDocumentForBulkUpload').resolves(docCase1);
    t.context.sandbox.stub(ProductGroupRepository, 'createOne').resolves({ dataValues: { id: 1 } });
    t.context.sandbox.stub(ProductVariantRepository, 'createOne').resolves({ dataValues: { id: 2 } });
    t.context.sandbox.stub(ProductVendorRepository, 'createOne').resolves();
    t.context.sandbox.stub(ProductSkuRepository, 'findOne').resolves(null);

    const asyncCall = t.context.sandbox.stub(BizzyService, 'callAsync');
    asyncCall.onCall(0).resolves(null);
    asyncCall.onCall(1).resolves(null);

    t.context.sandbox.stub(BrandRepository, 'createOne').resolves({ id: 11, name: 'Apple' });
    t.context.sandbox.stub(CategoryRepository, 'findOne').resolves(resCategory);
    t.context.sandbox.stub(SyncRepository, 'getListVendor').resolves({ data: resListVendor });

    try {
        yield Methods.uploadSkuByBizzy(payload, context);
        t.fail('Should be throw BadRequest when "await Promise.map"');
    } catch (err) {
        t.true(err instanceof BizzyError.BadRequest, err.message);
    }
});

test.serial('uploadSkuByBizzy: scenario (!isVendorExist || isRecordExist) ==> false || true', function* (t) {
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.stub(ExcelAdapter, 'readDocumentForBulkUpload').resolves(docCase1);
    t.context.sandbox.stub(ProductGroupRepository, 'createOne').resolves({
        dataValues: { id: 1 }
    });
    t.context.sandbox.stub(ProductVariantRepository, 'createOne').resolves({
        dataValues: { id: 2 }
    });
    t.context.sandbox.stub(ProductVendorRepository, 'createOne').resolves();
    t.context.sandbox.stub(ProductSkuRepository, 'findOne').resolves(null);
    const asyncCall = t.context.sandbox.stub(BizzyService, 'callAsync');
    asyncCall.onCall(0).resolves(null);
    asyncCall.onCall(1).resolves(null);
    t.context.sandbox.stub(BrandRepository, 'createOne').resolves({
        id: 11, name: 'Apple'
    });
    t.context.sandbox.stub(CategoryRepository, 'findOne').resolves(resCategory);

    const resListVendor2 = JSON.parse(JSON.stringify(resListVendor));
    resListVendor2[0].id = 3;
    t.context.sandbox.stub(SyncRepository, 'getListVendor').resolves({ data: resListVendor2 });

    try {
        const res = yield Methods.uploadSkuByBizzy(payload, context);
        t.deepEqual(res.message, '0 Sku berhasil ditambahkan, 1 Sku gagal');
        t.pass();
    } catch (err) {
        console.log(err);
        t.fail();
    }
});

test.serial('generateProductPayload: scenario (warrantyOption !== NO_WARRANTY) is false', function* (t) {
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.stub(ProductGroupRepository, 'createOne').resolves({ dataValues: { id: 1 } });
    t.context.sandbox.stub(ProductVariantRepository, 'createOne').resolves({ dataValues: { id: 2 } });
    t.context.sandbox.stub(ProductVendorRepository, 'createOne').resolves();
    t.context.sandbox.stub(ProductSkuRepository, 'findOne').resolves(null);
    t.context.sandbox.stub(BrandRepository, 'createOne').resolves({ id: 11, name: 'Apple' });
    t.context.sandbox.stub(CategoryRepository, 'findOne').resolves(resCategory);
    t.context.sandbox.stub(SyncRepository, 'getListVendor').resolves({ data: resListVendor });

    const asyncCall = t.context.sandbox.stub(BizzyService, 'callAsync');
    asyncCall.onCall(0).resolves(null);
    asyncCall.onCall(1).resolves(null);

    const docCase9 = JSON.parse(JSON.stringify(docCase1));
    docCase9[0].warranty_option = 'Resmi';
    docCase9[0].warranty_period = 'Minggu';
    docCase9[0].warranty_limit = '1';
    t.context.sandbox.stub(ExcelAdapter, 'readDocumentForBulkUpload').resolves(docCase9);

    try {
        const res = yield Methods.uploadSkuByBizzy(payload, context);
        t.deepEqual(res.message, '1 Sku berhasil ditambahkan');
        t.pass();
    } catch (err) {
        console.log(err);
        t.fail();
    }
});

test.serial('generateProductPayload: scenario parseInt(data.tier_min_qty_1) is false', function* (t) {
    t.context.sandbox.mock(DBContext).expects('startTransaction').resolves();
    t.context.sandbox.stub(ProductGroupRepository, 'createOne').resolves({ dataValues: { id: 1 } });
    t.context.sandbox.stub(ProductVariantRepository, 'createOne').resolves({ dataValues: { id: 2 } });
    t.context.sandbox.stub(ProductVendorRepository, 'createOne').resolves();
    t.context.sandbox.stub(ProductSkuRepository, 'findOne').resolves(null);
    t.context.sandbox.stub(BrandRepository, 'createOne').resolves({ id: 11, name: 'Apple' });
    t.context.sandbox.stub(CategoryRepository, 'findOne').resolves(resCategory);
    t.context.sandbox.stub(SyncRepository, 'getListVendor').resolves({ data: resListVendor });

    const asyncCall = t.context.sandbox.stub(BizzyService, 'callAsync');
    asyncCall.onCall(0).resolves(null);
    asyncCall.onCall(1).resolves(null);

    const docCase9 = JSON.parse(JSON.stringify(docCase1));
    docCase9[0].brand = 'Apel';
    docCase9[0].uom = 'Batang';
    docCase9[0].quantity_stocking_uom = '';
    docCase9[0].package_weight = '';
    docCase9[0].package_width = '';
    docCase9[0].package_length = '';
    docCase9[0].package_height = '';
    docCase9[0].package_content = '';
    docCase9[0].description = '';
    delete docCase9[0].tier_min_qty_1;
    t.context.sandbox.stub(ExcelAdapter, 'readDocumentForBulkUpload').resolves(docCase9);

    try {
        const res = yield Methods.uploadSkuByBizzy(payload, context);
        t.deepEqual(res.message, '1 Sku berhasil ditambahkan');
        t.pass();
    } catch (err) {
        console.log(err);
        t.fail();
    }
});


test.before('Initialize BizzyError Before All Tests', (t) => {
    BizzyError.initializeErrors();
});
test.beforeEach('Initialize New Sandbox Before Each Test', (t) => {
    t.context.sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
    t.context.sandbox.mock(DBContext).expects('rollback').resolves();
    t.context.sandbox.mock(DBContext).expects('commit').resolves();


    t.context.sandbox.stub(BrandRepository, 'findAll').resolves(resBrand);
    t.context.sandbox.stub(UomRepository, 'findAll').resolves(resUom);
    t.context.sandbox.stub(StockingUomRepository, 'findAll').resolves(resStockUom);

    t.context.sandbox.stub(ExcelAdapter, 'generateStream').resolves('VALIDBASE64');
    t.context.sandbox.stub(S3Bucket, 'uploads3').resolves({
        Location: 'documentuploaded.xlxs'
    });

    t.context.sandbox.stub(PremoderationRepository, 'insertMany').resolves();
    t.context.sandbox.stub(ProductUploadRepository, 'insertMany').resolves();
});
test.afterEach.always('Restore Sandbox and Configuration After Each Test', (t) => {
    t.context.sandbox.restore();
});
