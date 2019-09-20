
const { expect } = require('chai');
const chai = require('chai');
chai.use(require('chai-json-schema'));
chai.use(require('chai-subset'));
const path = require('path');
const base64Converter = require('base64-img');
const bulkUploadApi = require('../../../../../page-objects/api/frontoffice/catalog/bulk-sku/download-upload/bulk_upload.js');
const premodApi = require('../../../../../page-objects/api/backoffice/premoderation/premoderation.js');
const responseMessageCode = require('../../../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../../../helper/userCredential.json');
const common = require('../../../../../helper/common.js');
const testData = require('../../../../../helper/frontoffice/catalog/bulk-sku/bulk-upload/bulk_data.json');
const testDataPremod = require('../../../../../helper/backoffice/premoderation/premoderation.json');
const schemaAssertion = require('../../../../../helper/schema/backoffice/catalog/premoderation/detail_schema.json');

const testScenario = {
  describe: 'As Bizzy Content, I able to see the premoderation product from vendor bulk upload',
  successPostBulkUpload: 'should success upload new products with fill all column',
  successGetPremodDetails: 'should success get Premod Details based on bulk upload product',
  successPostBulkUploadNewBrand: 'should success upload new products with fill all column and add new brand',
  successGetPremodDetailsNewBrand: 'should success get Premod Details based on bulk upload product with new brand',
  successPostBulkUploadWithoutUNSPSC: 'should success upload new products without fill UNSPSC column',
  successGetPremodDetailsWithoutUNSPSC: 'should success get Premod Details based on bulk upload product without UNSPSC',
};

describe(`@skip ${testScenario.describe}`, () => {
  let token;
  let tokenBo;
  let orgId;
  const pathXls = path.join(__dirname, '../../../../../helper/frontoffice/catalog/bulk-sku/bulk-upload/excel/Upload Produk ke Bizzy - Positive Case.xlsx'); // temporary file
  const pathXlsNewBrand = path.join(__dirname, '../../../../../helper/frontoffice/catalog/bulk-sku/bulk-upload/excel/Upload Produk ke Bizzy - Positive Case - New Brand.xlsx'); // temporary file
  const pathXlsNoUNSPSC = path.join(__dirname, '../../../../../helper/frontoffice/catalog/bulk-sku/bulk-upload/excel/Upload Produk ke Bizzy - Positive Case - Optional UNSPSC.xlsx'); // temporary file

  before(async () => {
    const userToLogin = userCredential.vendor.dj2;
    const userBoToLogin = userCredential.backOffice.admin;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.seller.token;
    const respondBo = await common.getTokenBo(userBoToLogin);
    expect(respondBo.status).to.equal(responseMessageCode.successOk);
    tokenBo = respondBo.body.token;
    orgId = testData.vendor.dj2.orgId;
  });

  it(`@happy @uploadpremod ${testScenario.successPostBulkUpload}`, async () => {
    const bodyData = JSON.parse(JSON.stringify(testData.successPostWithValidBody));
    bodyData.data = base64Converter.base64Sync(pathXls);
    const resp = await bulkUploadApi.postAddProducts(orgId, bodyData, token);
    expect(resp.status).to.equal(responseMessageCode.successCreated);
    expect(resp.body.success).to.equal(true);
  });

  it(`@happy @uploadpremod ${testScenario.successGetPremodDetails}`, async () => {
    const premodQuery = JSON.parse(JSON.stringify(testDataPremod.successGetListPremoderation));
    premodQuery.search = testDataPremod.successGetDetailsPremoderation.product_name;
    premodQuery.vendor_id = orgId;
    const respond = await premodApi.getPremoderationList(premodQuery, tokenBo);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    const premodId = respond.body.data[0].id;
    const respondDetails = await premodApi.getPremoderationDetails(premodId, tokenBo);
    const responseToAssert = premodApi.extractPremoderationDetailResponse(respondDetails.body.data);
    expect(respondDetails.status).to.equal(responseMessageCode.successOk);
    expect(responseToAssert).to.containSubset(testDataPremod.successGetDetailsPremoderation);
    expect(respondDetails.body.data).to.jsonSchema(schemaAssertion.getPremodDetailNonMandatory);
    expect(respondDetails.body.data.variant_detail[0].sku_vendor).to.equal(testDataPremod.successGetDetailsPremoderationSkuVendorId.sku_vendor);
    expect(respondDetails.body.data.variant_detail[0].stock).to.equal(testDataPremod.successGetDetailsPremoderationZeroStock.stock);
  });

  it(`@happy @uploadpremod ${testScenario.successPostBulkUploadNewBrand}`, async () => {
    const bodyData = JSON.parse(JSON.stringify(testData.successPostWithValidBody));
    bodyData.data = base64Converter.base64Sync(pathXlsNewBrand);
    const resp = await bulkUploadApi.postAddProducts(orgId, bodyData, token);
    expect(resp.status).to.equal(responseMessageCode.successCreated);
    expect(resp.body.success).to.equal(true);
  });

  it(`@happy @uploadpremod ${testScenario.successGetPremodDetailsNewBrand}`, async () => {
    const premodQuery = JSON.parse(JSON.stringify(testDataPremod.successGetListPremoderation));
    premodQuery.search = testDataPremod.successGetDetailsPremoderationNewBrand.product_name;
    premodQuery.vendor_id = orgId;
    const respond = await premodApi.getPremoderationList(premodQuery, tokenBo);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    const premodId = respond.body.data[0].id;
    const respondDetails = await premodApi.getPremoderationDetails(premodId, tokenBo);
    const responseToAssert = premodApi.extractPremoderationDetailResponse(respondDetails.body.data);
    expect(respondDetails.status).to.equal(responseMessageCode.successOk);
    expect(responseToAssert).to.containSubset(testDataPremod.successGetDetailsPremoderationNewBrand);
    expect(respondDetails.body.data).to.jsonSchema(schemaAssertion.getPremodDetailNewBrand);
  });

  it(`@happy @uploadpremod ${testScenario.successPostBulkUploadWithoutUNSPSC}`, async () => {
    const bodyData = JSON.parse(JSON.stringify(testData.successPostWithValidBody));
    bodyData.data = base64Converter.base64Sync(pathXlsNoUNSPSC);
    const resp = await bulkUploadApi.postAddProducts(orgId, bodyData, token);
    expect(resp.status).to.equal(responseMessageCode.successCreated);
    expect(resp.body.success).to.equal(true);
  });

  it(`@happy @uploadpremod ${testScenario.successGetPremodDetailsWithoutUNSPSC}`, async () => {
    const premodQuery = JSON.parse(JSON.stringify(testDataPremod.successGetListPremoderation));
    premodQuery.search = testDataPremod.successGetDetailsPremoderationWithoutUNSPSC.product_name;
    premodQuery.vendor_id = orgId;
    const respond = await premodApi.getPremoderationList(premodQuery, tokenBo);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    const premodId = respond.body.data[0].id;
    const respondDetails = await premodApi.getPremoderationDetails(premodId, tokenBo);
    const responseToAssert = premodApi.extractPremoderationDetailResponse(respondDetails.body.data);
    expect(respondDetails.status).to.equal(responseMessageCode.successOk);
    expect(responseToAssert).to.containSubset(testDataPremod.successGetDetailsPremoderationWithoutUNSPSC);
    expect(respondDetails.body.data).to.containSubset(testDataPremod.successGetDetailsPremoderationWithoutUNSPSC);
    expect(respondDetails.body.data).to.jsonSchema(schemaAssertion.getPremodDetailWithoutUNSPSC);
  });
});
