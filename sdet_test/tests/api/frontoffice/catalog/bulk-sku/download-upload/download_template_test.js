
/* eslint prefer-destructuring: off */

const { expect } = require('chai');
const chai = require('chai');
const xlsx = require('node-xlsx');
const path = require('path');
chai.use(require('chai-json-schema'));
const downloadTemplateApi = require('../../../../../page-objects/api/frontoffice/catalog/bulk-sku/download-upload/download_template.js');
const responseMessageCode = require('../../../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../../../helper/userCredential.json');
const common = require('../../../../../helper/common.js');
const testData = require('../../../../../helper/frontoffice/catalog/bulk-sku/bulk-upload/bulk_data.json');
const schemaAssertion = require('../../../../../helper/schema/download_template_schema.json');

const testScenario1 = {
  describe: 'As a vendor, I would like to download an Excel template to mass add products',
  successGetData: 'should success get data with valid request parameter',
  successGetFilename: 'should success get filename with the correct format',
  failedGetDataInvalidIdVendor: 'should be failed get data with invalid vendor id',
  failedGetDataInvalidToken: 'get error when token invalid',
  failedGetTemplateWithoutCredential: 'get error when token blank',
};
const testScenario2 = {
  describe: 'As a vendor, I would like to download an Excel template to mass edit products',
  successGetData: 'should success get data with valid request parameter',
  successGetFilename: 'should success get filename with the correct format',
  failedGetDataInvalidIdVendor: 'should be failed get data with invalid vendor id',
  failedGetDataInvalidToken: 'get error when token invalid',
  failedGetTemplateWithoutCredential: 'get error when token blank',
};

describe(`@skip ${testScenario1.describe}`, () => {
  let token;
  let orgId;

  before(async () => {
    const userToLogin = userCredential.vendor.dj2;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.seller.token;
    orgId = testData.vendor.dj2.orgId;
  });

  it(`@happy @C207 ${testScenario1.successGetData}`, async () => {
    const resp = await downloadTemplateApi.getBulkTemplate(orgId, token);
    expect(resp.status).to.equal(responseMessageCode.successOk);
    expect(resp.body).to.be.jsonSchema(schemaAssertion.getResponseValidSchema);
    const pathS3 = resp.body.data;
    const respBuffer = await downloadTemplateApi.getTemplate(pathS3);
    expect(respBuffer.status).to.equal(responseMessageCode.successOk);
    const s3file = respBuffer.body;
    const pathXls = path.join(__dirname, '../../../../../helper/frontoffice/catalog/bulk-sku/bulk-upload/excel/Upload Produk ke Bizzy.xlsx'); // temporary file
    const dataSheetLocal = xlsx.parse(pathXls);
    const dataSheetSheetS3 = xlsx.parse(s3file);
    expect(dataSheetSheetS3[0]).to.deep.equal(dataSheetLocal[0]);
    expect(dataSheetSheetS3[1]).to.deep.equal(dataSheetLocal[1]);
  });

  it(`@happy ${testScenario1.successGetFilename}`, async () => {
    const resp = await downloadTemplateApi.getBulkTemplate(orgId, token);
    expect(resp.status).to.equal(responseMessageCode.successOk);
    const pathS3 = resp.body.data;
    const fileName = pathS3.split('/');
    const regxAdd = new RegExp('^Upload%20Produk%20ke%20Bizzy%20-%20.*xlsx$');
    expect(regxAdd.test(fileName[3])).to.equal(true);
  });

  it(`@neg @C276 ${testScenario1.failedGetDataInvalidIdVendor}`, async () => {
    const resp = await downloadTemplateApi.getBulkTemplate(testData.vendor.invalid.orgId, token);
    expect(resp.status).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeNumber);
  });

  it(`@neg @C277 ${testScenario1.failedGetDataInvalidToken}`, async () => {
    const resp = await downloadTemplateApi.getBulkTemplate(orgId, testData.invalidToken);
    expect(resp.status).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeNumber);
  });

  it(`@neg @C278 ${testScenario1.failedGetTemplateWithoutCredential}`, async () => {
    const resp = await downloadTemplateApi.getBulkTemplateWithoutAuth(orgId);
    expect(resp.status).to.equal(responseMessageCode.failedUnauthorized.codeNumber);
  });
});

describe(testScenario2.describe, () => {
  let token;
  let orgId;

  before(async () => {
    const userToLogin = userCredential.vendor.dj1;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.seller.token;
    orgId = testData.vendor.dj1.orgId;
  });

  it(`@happy ${testScenario2.successGetData}`, async () => {
    const resp = await downloadTemplateApi.getBulkTemplateUpdate(orgId, token);
    expect(resp.status).to.equal(responseMessageCode.successOk);
    expect(resp.body).to.be.jsonSchema(schemaAssertion.getResponseValidSchema);
    const pathS3 = resp.body.data;
    const respBuffer = await downloadTemplateApi.getTemplate(pathS3);
    expect(respBuffer.status).to.equal(responseMessageCode.successOk);
    const s3file = respBuffer.body;
    const pathXls = path.join(__dirname, '../../../../../helper/frontoffice/catalog/bulk-sku/bulk-upload/excel/Daftar Produk ke Bizzy - 13Agu2018.xlsx'); // temporary file
    const dataSheetLocal = xlsx.parse(pathXls);
    const dataSheetSheetS3 = xlsx.parse(s3file);
    expect(dataSheetSheetS3[1]).to.deep.equal(dataSheetLocal[1]);
    expect(dataSheetSheetS3[0].data[0]).to.equal(dataSheetSheetS3[0].data[0]);
    expect(dataSheetSheetS3[0].data[1]).to.deep.equal(dataSheetSheetS3[0].data[1]);
  });

  it(`@happy ${testScenario2.successGetFilename}`, async () => {
    const resp = await downloadTemplateApi.getBulkTemplateUpdate(orgId, token);
    expect(resp.status).to.equal(responseMessageCode.successOk);
    const pathS3 = resp.body.data;
    const fileName = pathS3.split('/');
    const regxAdd = new RegExp('^Daftar%20Produk%20ke%20Bizzy%20-%20.*xlsx$');
    expect(regxAdd.test(fileName[3])).to.equal(true);
  });

  it(`@neg ${testScenario2.failedGetDataInvalidIdVendor}`, async () => {
    const resp = await downloadTemplateApi.getBulkTemplateUpdate(testData.vendor.invalidId, token);
    expect(resp.status).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeNumber);
  });

  it(`@neg ${testScenario2.failedGetDataInvalidToken}`, async () => {
    const resp = await downloadTemplateApi.getBulkTemplateUpdate(orgId, testData.invalidToken);
    expect(resp.status).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeNumber);
  });

  it(`@neg ${testScenario2.failedGetTemplateWithoutCredential}`, async () => {
    const resp = await downloadTemplateApi.getBulkTemplateUpdateWithoutAuth(orgId);
    expect(resp.status).to.equal(responseMessageCode.failedUnauthorized.codeNumber);
  });
});
