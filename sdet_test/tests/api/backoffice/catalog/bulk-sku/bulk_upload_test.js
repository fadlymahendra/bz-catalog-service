
/* eslint prefer-destructuring: off */

const { expect } = require('chai');
const chai = require('chai');
chai.use(require('chai-json-schema'));
chai.use(require('chai-subset'));
const base64Converter = require('base64-img');
const jwtDecode = require('jwt-decode');
const path = require('path');
const bulkUploadApiBO = require('../../../../page-objects/api/backoffice/catalog/bulk-sku/bulk_upload.js');
const pgApi = require('../../../../page-objects/api/backoffice/catalog/product_group/product_group');
const prodApi = require('../../../../page-objects/api/backoffice/catalog/sku-managements/sku_list');
const prodDetailApi = require('../../../../page-objects/api/backoffice/catalog/sku-managements/sku_detail');
const premodApi = require('../../../../page-objects/api/backoffice/premoderation/premoderation.js');
const pdpApi = require('../../../../page-objects/api/search_engine/pdp_by_variant_PDP.js');
const testDataPremod = require('../../../../helper/backoffice/premoderation/premoderation.json');
const responseMessageCode = require('../../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../../helper/userCredential.json');
const authHelper = require('../../../../helper/token');
const testData = require('../../../../helper/backoffice/catalog/bulk-sku/bulk_upload_data.json');
const testDataPG = require('../../../../helper/backoffice/catalog/product-group/product_group_data.json');
const testDataProductSku = require('../../../../helper/backoffice/catalog/sku-management/sku_management_data.json');
const schemaAssertion = require('../../../../helper/schema/backoffice/catalog/bulk-upload/bulk_upload_schema.json');
const vendorSkuProduct = require('../../../../page-objects/api/frontoffice/catalog/products/detail');

const testScenario = {
  describe: 'Create bulkUploadApi Test',
  successPostWithValidBody: 'should success post data with valid request data',
  successGetPGDetail: 'should success get data PG with valid request data',
  successGetProductDetail: 'should success get data product with valid request data',
  successGetPremodDetails: 'should success get data premoderation with valid request data',
  successGetVendorSkuProductDetail: 'should success get vendor sku product detail with valid detail information',
  successGetPDP: 'should success get data PDP with valid request data',
};

describe(testScenario.describe, () => {
  let token;
  let tokenVendor;
  let tokenBo;
  let productGroupIdToReindex;
  let productGroupIndexList = [];
  let vendorOrgId;
  const pathXls = path.join(__dirname, '../../../../helper/backoffice/catalog/bulk-sku/excel/Bulk Upload Passthrough - positive case.xlsx'); // temporary file

  before(async () => {
    const userToLogin = userCredential.customer.djQrStaging;
    const vendorToLogin = userCredential.vendor.hvendor;
    const userBoToLogin = userCredential.backOffice.admin;
    const responseCustomer = await authHelper.getFrontOfficeToken.getToken(userToLogin);
    const responseVendor = await authHelper.getFrontOfficeToken.getToken(vendorToLogin);
    expect(responseCustomer.status).to.equal(responseMessageCode.successOk);
    token = responseCustomer.body.customer.token;
    tokenVendor = responseVendor.body.seller.token;
    vendorOrgId = jwtDecode(tokenVendor).customer.organization_id;
    const respondBo = await authHelper.getBackOfficeToken.getToken(userBoToLogin);
    expect(respondBo.status).to.equal(responseMessageCode.successOk);
    tokenBo = respondBo.body.token;
  });

  it(`@happy @uploadproduct ${testScenario.successPostWithValidBody}`, async () => {
    const bodyData = JSON.parse(JSON.stringify(testData.successPostWithValidBody));
    bodyData.data = base64Converter.base64Sync(pathXls);
    testData.successPostWithValidBody.data = bodyData.data;
    const resp = await bulkUploadApiBO.postAddProducts(testData.successPostWithValidBody, tokenBo);
    expect(resp.status).to.equal(responseMessageCode.successOk);
    expect(resp.body.message).to.equal(testData.successMessage);
    expect(resp.body).to.jsonSchema(schemaAssertion.getResponseValidBulkUpdate);
  });

  it(`@happy @uploadproduct ${testScenario.successGetPGDetail}`, async () => {
    const pgQuery = { ...testDataPG.successGetListPg };
    const respond = await pgApi.getPGList(pgQuery, tokenBo);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    productGroupIdToReindex = respond.body.data[0].id;
    productGroupIndexList = pgApi.getProductGroupIdWithoutProductGroupName('Lenovo S1 Shot', respond.body);
    const respondDetails = await pgApi.getPGDetail(productGroupIdToReindex, tokenBo);
    expect(respondDetails.status).to.equal(responseMessageCode.successOk);
    expect(respondDetails.body.data).to.containSubset(testDataPG.successGetDetailPg);
    const respondSKUListPG = await pgApi.getSkuDetail(productGroupIdToReindex, tokenBo);
    expect(respondSKUListPG.status).to.equal(responseMessageCode.successOk);
  });

  it(`@happy @uploadproduct ${testScenario.successGetProductDetail}`, async () => {
    const prodQuery = JSON.parse(JSON.stringify(testDataProductSku.successGetListSKU));
    prodQuery.search = testDataProductSku.successGetDetailSKU.long_name;
    const respond = await prodApi.getSKUList(prodQuery, tokenBo);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    const skuId = respond.body.data[0].id;
    const respondDetails = await prodDetailApi.getSKUDetail(skuId, tokenBo);
    expect(respondDetails.status).to.equal(responseMessageCode.successOk);
    expect(respondDetails.body.data).to.containSubset(testDataProductSku.successGetDetailSKU);
  });

  // Skip because no filter at list
  it(`@happy @uploadproduct @skip ${testScenario.successGetPremodDetails}`, async () => {
    const premodQuery = JSON.parse(JSON.stringify(testDataPremod.successGetListPremoderation));
    premodQuery.search = testDataPremod.successGetDetailsPremoderationAutoLive.name;
    premodQuery.vendor_id = testDataProductSku.successGetDetailSKU.vendors.vendor_id;
    const respond = await premodApi.getPremoderationList(premodQuery, tokenBo);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    const premodId = respond.body.data[0].id;
    const respondDetails = await premodApi.getPremoderationDetails(premodId, tokenBo);
    expect(respondDetails.status).to.equal(responseMessageCode.successOk);
    expect(respondDetails.body.data).to.containSubset(testDataPremod.successGetDetailsPremoderationAutoLive);
  });

  it(`@happy @uploadproduct ${testScenario.successGetVendorSkuProductDetail}`, async () => {
    for (const uploadedPgId of productGroupIndexList) {
      const response = await vendorSkuProduct.getProductDetail(vendorOrgId, uploadedPgId, tokenVendor);
      expect(response.status).to.equal(responseMessageCode.successOk, response.body.message);
      const skuProductInfo = vendorSkuProduct.getWarrantyInfoOnly(response.body, testDataProductSku.skuAutoConvertWarrantyName);
      expect(skuProductInfo).to.containSubset(testDataProductSku.autoConvertWarrantyType);
    }
  });

  // TO DO update PDP end point API
  it(`@happy @uploadproduct ${testScenario.successGetPDP}`, async () => {
    const prodQuery = JSON.parse(JSON.stringify(testDataProductSku.successGetListSKU));
    prodQuery.search = testDataProductSku.successGetDetailSKU.long_name;
    const respond = await prodApi.getSKUList(prodQuery, tokenBo);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    const skuId = respond.body.data[0].id;
    const respondDetails = await prodDetailApi.getSKUDetail(skuId, tokenBo);
    expect(respondDetails.status).to.equal(responseMessageCode.successOk);
    const skuVariant = respondDetails.body.data.sku;
    const respondPDP = await pdpApi.pdpByVariant(skuVariant, token);
    expect(respondPDP.status).to.equal(responseMessageCode.successOk);
  });
});
