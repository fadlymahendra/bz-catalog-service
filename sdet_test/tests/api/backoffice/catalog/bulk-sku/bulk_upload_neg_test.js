
/* eslint prefer-destructuring: off */

const { expect } = require('chai');
const chai = require('chai');
chai.use(require('chai-json-schema'));
const base64Converter = require('base64-img');
const path = require('path');
const bulkUploadApiBO = require('../../../../page-objects/api/backoffice/catalog/bulk-sku/bulk_upload.js');
const responseMessageCode = require('../../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../../helper/userCredential.json');
const common = require('../../../../helper/common.js');
const testData = require('../../../../helper/backoffice/catalog/bulk-sku/bulk_upload_data.json');

const testScenario = {
  describe: 'As Content Team, I want to save the history of requested SKUs that fails to validate (Future Premod)',
  successPostWithValidBody: 'should success upload new products with fill all colomn',
  successPostWithMandatory: 'should success upload new products without fill all non mandatory colomn',
  failedPostBlankVendorId: 'should failed upload new products with blank Vendor ID',
  failedPostBlankProductName: 'should failed upload new products with blank Product Name',
  failedPostBlankPrice: 'should failed upload new products with blank Price',
  failedPostWrongVendorId: 'should failed upload new products with wrong Vendor ID',
  failedPostNegPrice: 'should failed upload new products with negative Price',
  failedDuplicateProduct: 'should failed upload new products with duplicate data',
  failedNoVendorWarehouse: 'should failed upload new products with no vendor warehouse data',
};

describe(testScenario.describe, () => {
  let tokenBo;
  let resp;

  before(async () => {
    const userBoToLogin = userCredential.backOffice.admin;
    const respondBo = await common.getTokenBo(userBoToLogin);
    expect(respondBo.status).to.equal(responseMessageCode.successOk);
    tokenBo = respondBo.body.token;
    const bodyData = JSON.parse(JSON.stringify(testData.successPostWithValidBody));
    const pathXls = path.join(__dirname, '../../../../helper/backoffice/catalog/bulk-sku/excel/Bulk Upload Passthrough - negative case.xlsx'); // temporary file
    bodyData.data = base64Converter.base64Sync(pathXls);
    testData.successPostWithValidBody.data = bodyData.data;
    resp = await bulkUploadApiBO.postAddProducts(testData.successPostWithValidBody, tokenBo);
    expect(resp.status).to.equal(responseMessageCode.successOk);
  });

  it(`@neg @negupload ${testScenario.failedPostBlankProductName}`, async () => {
    const respError = resp.body.rejected_records[0].error;
    expect(respError[0]).to.equal(testData.errorMessage.blankProductName);
    expect(respError.length).to.equal(1);
  });

  it(`@neg @negupload ${testScenario.failedPostBlankVendorId}`, async () => {
    const respError = resp.body.rejected_records[1].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongVendorId);
    expect(respError.length).to.equal(1);
  });

  it(`@neg @negupload ${testScenario.failedPostBlankPrice}`, async () => {
    const respError = resp.body.rejected_records[2].error;
    expect(respError[0]).to.equal(testData.errorMessage.blankPrice);
    expect(respError.length).to.equal(1);
  });

  it(`@neg @negupload ${testScenario.failedDuplicateProduct}`, async () => {
    const respError = resp.body.rejected_records[3].error;
    expect(respError[0]).to.equal(testData.errorMessage.duplicateProduct);
    expect(respError.length).to.equal(1);
  });

  it(`@neg @negupload ${testScenario.failedPostWrongVendorId}`, async () => {
    const respError = resp.body.rejected_records[4].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongVendorId);
    expect(respError.length).to.equal(1);
  });

  it(`@neg @negupload ${testScenario.failedPostNegPrice}`, async () => {
    const respError = resp.body.rejected_records[5].error;
    expect(respError[0]).to.equal(testData.errorMessage.wrongPrice);
    expect(respError.length).to.equal(1);
  });

  it(`@neg @negupload ${testScenario.failedNoVendorWarehouse}`, async () => {
    const respError = resp.body.rejected_records[6].error;
    expect(respError[0]).to.equal(testData.errorMessage.noWarehouse);
    expect(respError.length).to.equal(1);
  });
});
