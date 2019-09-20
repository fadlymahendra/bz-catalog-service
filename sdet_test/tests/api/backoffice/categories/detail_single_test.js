
const { expect } = require('chai');
const api = require('./../../../page-objects/api/backoffice/categories/category_management.js');
const common = require('./../../../helper/common.js');
const testData = require('./../../../helper/backoffice/category/detail_single_data.json');
const cases = require('./../../../testcases/backoffice/catalog/categories/case_detailsingle_categories');
const jsonData = require('./../../../helper/schema/category_management/detail_single_schema.js');
const responseCodeMessage = require('../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../helper/userCredential.json');

describe('@detailsinglecategory @happy @categories | Catalog Service - Detail Category - As Content Team', () => {
  let token;

  before(async () => {
    const userToLogin = userCredential.backOffice.admin;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseCodeMessage.successOk);
    token = respond.body.token;
  });

  it(cases.getDetailSingle.correctparam_datacontent.description, async () => {
    const response = await api.detailSingle(testData.idCategory, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    expect(response.body.data).not.equal(0);
    expect(response.body.data).to.be.jsonSchema(jsonData.detail_single_category);
  });

  it(cases.getDetailSingle.invalidid.description, async () => {
    const response = await api.detailSingle(testData.invalidIdCategory, token);
    expect(response.status).to.equal(responseCodeMessage.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedBadRequest.codeMessage);
  });

  it(cases.getDetailSingle.negativeid.description, async () => {
    const response = await api.detailSingle(testData.negativeIdCategory, token);
    expect(response.status).to.equal(responseCodeMessage.failedNotFound.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedNotFound.codeMessage);
  });

  it(cases.getDetailSingle.blankid.description, async () => {
    const response = await api.detailSingle(testData.blankIdCategory, token);
    expect(response.status).to.equal(responseCodeMessage.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedBadRequest.codeMessage);
  });

  it(cases.getDetailSingle.invalidtoken.description, async () => {
    const response = await api.detailSingle(testData.idCategory, testData.invalidToken);
    expect(response.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageInvalidToken);
  });

  it(cases.getDetailSingle.blanktoken.description, async () => {
    const response = await api.detailSingleWithoutAuth(testData.idCategory);
    expect(response.status).to.equal(responseCodeMessage.failedUnauthorized.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedUnauthorized.codeMessage);
  });
});
