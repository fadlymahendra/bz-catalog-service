/* eslint-env mocha */
/* eslint prefer-destructuring: off */

const { expect } = require('chai');
const chai = require('chai');
chai.use(require('chai-json-schema'));
const base64Converter = require('base64-img');
const path = require('path');
const bulkUploadApiBO = require('../../../../page-objects/api/backoffice/catalog/bulk-sku/bulk_upload.js');
const productListApi = require('../../../../page-objects/api/frontoffice/catalog/products/product_list.js');
const productDetailApi = require('../../../../page-objects/api/frontoffice/catalog/products/detail.js');
const responseMessageCode = require('../../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../../helper/userCredential.json');
const common = require('../../../../helper/common.js');
const testData = require('../../../../helper/backoffice/catalog/bulk-sku/bulk_upload_data.json');
const testDataProd = require('../../../../helper/backoffice/catalog/sku-management/sku_management_data.json');
const testDataListProduct = require('../../../../helper/frontoffice/catalog/bulk-sku/bulk-upload/vendor_product_list.json');
const schemaAssertion = require('../../../../helper/schema/backoffice/catalog/bulk-upload/bulk_upload_schema.json');

const testScenario = {
  describe: 'Create bulkUploadApi Test',
  successPostWithMandatory: 'should success post data with valid mandatory data',
  successGetVendorData: 'should success get data Product with default value',
};

describe(testScenario.describe, () => {
  let token;
  let tokenBo;
  const pathXls = path.join(__dirname, '../../../../helper/backoffice/catalog/bulk-sku/excel/Bulk Upload Passthrough - default data case.xlsx'); // temporary file

  before(async () => {
    const userToLogin = userCredential.vendor.lindav;
    const userBoToLogin = userCredential.backOffice.admin;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.seller.token;
    const respondBo = await common.getTokenBo(userBoToLogin);
    expect(respondBo.status).to.equal(responseMessageCode.successOk);
    tokenBo = respondBo.body.token;
  });

  it(`@happy @uploadproductDefault ${testScenario.successPostWithMandatory}`, async () => {
    const bodyData = JSON.parse(JSON.stringify(testData.successPostWithValidBody));
    bodyData.data = base64Converter.base64Sync(pathXls);
    testData.successPostWithValidBody.data = bodyData.data;
    const resp = await bulkUploadApiBO.postAddProducts(testData.successPostWithValidBody, tokenBo);
    expect(resp.status).to.equal(responseMessageCode.successOk);
    expect(resp.body.message).to.equal(testData.successMessageDefault);
    expect(resp.body).to.jsonSchema(schemaAssertion.getResponseValidBulkUpdate);
  });

  it(`@happy @uploadproductDefault ${testScenario.successGetVendorData}`, async () => {
    const bodyData = JSON.parse(JSON.stringify(testDataListProduct.successGetListProducts));
    bodyData.search = testDataProd.successGetDetailSKUDefaultData.long_name;
    const resp = await productListApi.getVendorProductList(testDataProd.successGetDetailSKUDefaultData.vendors[0].vendor_id, bodyData, token);
    expect(resp.status).to.equal(responseMessageCode.successOk);
    const pgId = resp.body.data[0].product_group_id;
    const respDetail = await productDetailApi.getProductDetail(testDataProd.successGetDetailSKUDefaultData.vendors[0].vendor_id, pgId, token);
    expect(respDetail.status).to.equal(responseMessageCode.successOk);
    expect(respDetail.body).to.containSubset(testDataProd.defaultValueBulkUploadAutoLive);
  });
});
