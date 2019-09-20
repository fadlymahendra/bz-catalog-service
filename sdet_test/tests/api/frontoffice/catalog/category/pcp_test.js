
/* eslint prefer-destructuring: off */
/* eslint no-unused-expressions: off */

const { expect } = require('chai');
const chai = require('chai');
chai.use(require('chai-subset'));
chai.use(require('chai-json-schema'));
const pcpApi = require('../../../../page-objects/api/frontoffice/catalog/category/pcp.js');
const responseMessageCode = require('../../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../../helper/userCredential.json');
const common = require('../../../../helper/common.js');
const testData = require('../../../../helper/frontoffice/catalog/category/category_test_data.json');
const schemaAssertion = require('../../../../helper/schema/catalog/categories/pcp.json');

const testScenarioListCatPCP = {
  describe: 'As a Customer, I can see the list of category at PCP',
  successGetData: 'success get list of categories at PCP',
  failedGetDataInvalidAuth: 'failed get list of categories at PCP invalid auth',
};

const testScenarioDetailCatPCP = {
  describe: 'As a Customer, I can see the details of category at PCP',
  successGetDetailLevel0: 'success get details of categories level 0 at PCP',
  successGetDetailLevel1: 'success get details of categories level 1 at PCP',
  successGetDetailLevel2: 'success get details of categories level 2 at PCP',
  successGetDetailLevel3: 'success get details of categories level 3 at PCP',
  failedGetDataInvalidAuth: 'failed get details of categories at PCP invalid auth',
};

describe(`@PCP @listCatPCP ${testScenarioListCatPCP.describe}`, () => {
  let token;

  before(async () => {
    const userToLogin = userCredential.vendor.dj2;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.seller.token;
  });

  it(`@PCP @happy ${testScenarioListCatPCP.successGetData}`, async () => {
    const respond = await pcpApi.getListCategoryPcp(token);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    expect(respond.body).to.jsonSchema(schemaAssertion.getValidResponsePcpList);
  });

  it(`@PCP @neg ${testScenarioListCatPCP.failedGetDataInvalidAuth}`, async () => {
    const respond = await pcpApi.getListCategoryPcp('');
    expect(respond.status).to.equal(responseMessageCode.failedUnauthorized.codeNumber);
    expect(respond.body.code).to.equal(responseMessageCode.failedUnauthorized.codeMessage);
  });
});

describe(`@PCP @detailCatPCP ${testScenarioDetailCatPCP.describe}`, () => {
  let token;

  before(async () => {
    const userToLogin = userCredential.vendor.dj2;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.seller.token;
  });

  it(`@happy @PCP ${testScenarioDetailCatPCP.successGetDetailLevel0}`, async () => {
    const respondList = await pcpApi.getListCategoryPcp(token);
    expect(respondList.status).to.equal(responseMessageCode.successOk);
    const pcpCategory = respondList.body[0];
    const respondDetails = await pcpApi.getListCategoryDetailPcp(pcpCategory.id, token);
    expect(respondDetails.status).to.equal(responseMessageCode.successOk);
    expect(respondDetails.body).to.jsonSchema(schemaAssertion.getValidResponsePcpDetailsC0);
    expect(respondDetails.body.data.id).to.equal(pcpCategory.id);
    expect(respondDetails.body.data.name).to.equal(pcpCategory.name);
    expect(respondDetails.body.data.url_key).to.equal(pcpCategory.url_key);
    expect(respondDetails.body.data.parent).to.equal(null);
    expect(respondDetails.body.others).to.be.empty;
  });

  it(`@happy @PCP ${testScenarioDetailCatPCP.successGetDetailLevel1}`, async () => {
    const respondList = await pcpApi.getListCategoryPcp(token);
    expect(respondList.status).to.equal(responseMessageCode.successOk);
    const pcpCategoryLevel0 = respondList.body[0];
    const pcpCategoryLevel1 = respondList.body[0].child[1];
    const respondDetails = await pcpApi.getListCategoryDetailPcp(pcpCategoryLevel1.id, token);
    expect(respondDetails.status).to.equal(responseMessageCode.successOk);
    expect(respondDetails.body).to.jsonSchema(schemaAssertion.getValidResponsePcpDetailsC1);
    expect(respondDetails.body.data.id).to.equal(pcpCategoryLevel1.id);
    expect(respondDetails.body.data.name).to.equal(pcpCategoryLevel1.name);
    expect(respondDetails.body.data.url_key).to.equal(pcpCategoryLevel1.url_key);
    expect(respondDetails.body.data.parent.C0.id).to.equal(pcpCategoryLevel0.id);
    expect(respondDetails.body.data.parent.C0.name).to.equal(pcpCategoryLevel0.name);
    expect(respondDetails.body.data.parent.C0.url_key).to.equal(pcpCategoryLevel0.url_key);
    expect(respondDetails.body.others[0].name).to.containSubset(pcpCategoryLevel0.child[0].name);
    expect(respondDetails.body.others[0].url_key).to.containSubset(pcpCategoryLevel0.child[0].url_key);
  });

  it(`@happy @PCP ${testScenarioDetailCatPCP.successGetDetailLevel2}`, async () => {
    const respondDetails = await pcpApi.getListCategoryDetailPcp(testData.category2.id_adonan, token);
    expect(respondDetails.status).to.equal(responseMessageCode.successOk);
    expect(respondDetails.body).to.jsonSchema(schemaAssertion.getValidResponsePcpDetailsC2);
  });

  it(`@happy @PCP ${testScenarioDetailCatPCP.successGetDetailLevel3}`, async () => {
    const respondDetails = await pcpApi.getListCategoryDetailPcp(testData.category3.id_batang_pengukuran, token);
    expect(respondDetails.status).to.equal(responseMessageCode.successOk);
    expect(respondDetails.body).to.jsonSchema(schemaAssertion.getValidResponsePcpDetailsC3);
  });

  it(`@neg @PCP ${testScenarioDetailCatPCP.failedGetDataInvalidAuth}`, async () => {
    const respond = await pcpApi.getListCategoryDetailPcp('1', '');
    expect(respond.status).to.equal(responseMessageCode.failedUnauthorized.codeNumber);
    expect(respond.body.code).to.equal(responseMessageCode.failedUnauthorized.codeMessage);
  });
});
