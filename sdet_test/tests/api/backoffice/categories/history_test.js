const { expect } = require('chai');
const api = require('./../../../page-objects/api/backoffice/categories/category_management.js');
const common = require('./../../../helper/common.js');
const testData = require('./../../../helper/backoffice/category/history_data.json');
const cases = require('./../../../testcases/backoffice/catalog/categories/case_history_categories.js');
const jsonData = require('./../../../helper/schema/category_management/history_schema.js');
const responseCodeMessage = require('../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../helper/userCredential.json');


describe('@historycategory @happy @categories | Catalog Service - History Category - As Content Team', () => {
  let token;

  before(async () => {
    const userToLogin = userCredential.backOffice.admin;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseCodeMessage.successOk);
    token = respond.body.token;
  });

  it(cases.getHistory.correctparam_datacontent.description, async () => {
    const response = await api.history(testData.categoryId, testData.validParam, token);
    expect(response.status).to.equal(responseCodeMessage.successOk, JSON.stringify(response.body));
    expect(response.body.data).not.equal(0, JSON.stringify(response.body.message));
    expect(response.body).to.be.jsonSchema(jsonData.detail_history, JSON.stringify(response.body));
  });

  it(cases.getHistory.invalidid.description, async () => {
    const response = await api.history(testData.invalidIdCategory, testData.validParam, token);
    expect(response.status).to.equal(responseCodeMessage.failedBadRequest.codeNumber, JSON.stringify(response.body));
    expect(response.body.code).to.equal(responseCodeMessage.failedBadRequest.codeMessage, JSON.stringify(response.body));
  });

  it(cases.getHistory.negativeid.description, async () => {
    const response = await api.history(testData.negativeIdCategory, testData.validParam, token);
    expect(response.status).to.equal(responseCodeMessage.failedNotFound.codeNumber, JSON.stringify(response.body));
    expect(response.body.code).to.equal(responseCodeMessage.failedNotFound.codeMessage, JSON.stringify(response.body));
  });

  it(cases.getHistory.blankid.description, async () => {
    const response = await api.history(testData.blankIdCategory, testData.validParam, token);
    expect(response.status).to.equal(responseCodeMessage.failedBadRequest.codeNumber, JSON.stringify(response.body));
    expect(response.body.code).to.equal(responseCodeMessage.failedBadRequest.codeMessage, JSON.stringify(response.body));
  });

  it(cases.getHistory.invalidtoken.description, async () => {
    const response = await api.attribute(testData.idCategory, testData.validParam, testData.invalidToken);
    expect(response.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber, JSON.stringify(response.body));
    expect(response.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageInvalidToken), JSON.stringify(response.body);
  });

  it(cases.getHistory.blanktoken.description, async () => {
    const response = await api.attributeWithoutAuth(testData.idCategory, testData.validParam);
    expect(response.status).to.equal(responseCodeMessage.failedUnauthorized.codeNumber, JSON.stringify(response.body));
    expect(response.body.code).to.equal(responseCodeMessage.failedUnauthorized.codeMessage, JSON.stringify(response.body));
  });
});
