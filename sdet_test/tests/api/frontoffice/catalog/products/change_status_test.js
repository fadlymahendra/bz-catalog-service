const { expect } = require('chai');
const jwtDecode = require('jwt-decode');
const authHelper = require('../../../../helper/token');
const userCredential = require('../../../../helper/userCredential.json');
const responseCodeMessage = require('../../../../helper/responseMessageAndCode.json');
const global = require('./../../../../helper/global.js');
const testData = require('./../../../../helper/frontoffice/testDataProductList.js');
const api = require('./../../../../page-objects/api/frontoffice/catalog/products/change_status.js');
const cases = require('./../../../../testcases/frontoffice/catalog/products/change_status_testcase.js');

describe('Product List Visibility ', () => {
  let token;
  let organizationId;
  const skuId = 312;
  const invalidSku = 202020;

  before(async () => {
    const response = await authHelper.getFrontOfficeToken.getToken(userCredential.vendor.lindav);
    token = response.body.seller.token;
    organizationId = jwtDecode(token).customer.organization_id;
  });

  it(`@happy @put @frontoffice @products | ${cases.scenario.getOK.descVisible}`, async () => {
    const response = await api.changeStatus(organizationId, skuId, testData.bodyUpdateVisibility(1), token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    expect(response.body.data.is_active).to.equal(1);
    expect(response.body.data.id).to.equal(skuId);
    expect(response.body.data.vendor_id).to.equal(organizationId);
  });

  it(`@happy @put @frontoffice @products | ${cases.scenario.getOK.descInvis}`, async () => {
    const response = await api.changeStatus(organizationId, skuId, testData.bodyUpdateVisibility(0), token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    expect(response.body.data.is_active).to.equal(0);
    expect(response.body.data.id).to.equal(skuId);
    expect(response.body.data.vendor_id).to.equal(organizationId);
  });

  it(`@neg @put @products @frontoffice | ${cases.scenario.getInvalidAuth.descOtherVendorID}`, async () => {
    const resp = await api.changeStatus(4, skuId, testData.bodyUpdateVisibility(0), token);
    expect(resp.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber);
    expect(resp.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageForbidden);
  });

  it(`@neg @put @products @frontoffice | ${cases.scenario.getForbidden.descInt}`, async () => {
    const resp = await api.changeStatus(organizationId, skuId, testData.bodyUpdateVisibility(5), token);
    expect(resp.status).to.equal(responseCodeMessage.failedBadRequest.codeNumber);
    expect(resp.body.code).to.equal(responseCodeMessage.failedBadRequest.codeMessage);
  });

  it(`@neg @put @products @frontoffice | ${cases.scenario.getForbidden.descAlp}`, async () => {
    const resp = await api.changeStatus(organizationId, skuId, testData.bodyUpdateVisibility('hore'), token);
    expect(resp.status).to.equal(responseCodeMessage.failedBadRequest.codeNumber);
    expect(resp.body.code).to.equal(responseCodeMessage.failedBadRequest.codeMessage);
  });

  it(`@neg @put @products @frontoffice | ${cases.scenario.getForbidden.descEmpty}`, async () => {
    const resp = await api.changeStatus(organizationId, skuId, testData.bodyUpdateVisibility(), token);
    expect(resp.status).to.equal(responseCodeMessage.failedBadRequest.codeNumber);
    expect(resp.body.code).to.equal(responseCodeMessage.failedBadRequest.codeMessage);
  });

  it(`@neg @put @products @frontoffice | ${cases.scenario.getInvalidAuth.descInvalidBoth}`, async () => {
    const resp = await api.changeStatus(4, invalidSku, testData.bodyUpdateVisibility(0), token);
    expect(resp.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber);
    expect(resp.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageForbidden);
  });

  it(`@neg @put @products @frontoffice | ${cases.scenario.getNotFound.descInvalid}`, async () => {
    const resp = await api.changeStatus(organizationId, invalidSku, testData.bodyUpdateVisibility(0), token);
    expect(resp.status).to.equal(cases.scenario.getNotFound.response);
    expect(resp.body.code).to.equal(global.codes.notFound);
  });

  it(`@neg @put @frontoffice @products | ${cases.scenario.getInvalidAuth.descOtherVendorSession}`, async () => {
    const resp = await api.changeStatus('ildav_vendor', skuId, testData.bodyUpdateVisibility(0), 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRqLnZlb');
    expect(resp.status).to.equal(cases.scenario.getInvalidAuth.response);
    expect(resp.body.code).to.equal(global.codes.invalidToken);
  });

  it(`@neg @put @frontoffice @products | ${cases.scenario.getWithoutAuth.desc}`, async () => {
    const resp = await api.changeStatusWoAuth(organizationId, skuId, testData.bodyUpdateVisibility(0));
    expect(resp.status).to.equal(cases.scenario.getWithoutAuth.response);
    expect(resp.body.code).to.equal(global.codes.unauthorized);
  });
});
