const { expect } = require('chai');
const common = require('./../../../helper/common.js');
const api = require('./../../../page-objects/api/backoffice/categories/category_management.js');
const cases = require('./../../../testcases/backoffice/catalog/categories/case_delete_categories');
const testData = require('./../../../helper/backoffice/category/delete_data.json');
const responseCodeMessage = require('../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../helper/userCredential.json');

describe('@deletecategory @happy @categories | Catalog Service - Detail Category - As Content Team', () => {
  let token;

  before(async () => {
    const userToLogin = userCredential.backOffice.admin;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseCodeMessage.successOk);
    token = respond.body.token;
  });

  it(cases.getDelete.correctdata.description, async () => {
    const response = await api.deleteCategory(testData.idCategory, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    expect(response.body.data).not.equal(0);
  });

  it(cases.getDelete.invalidid.description, async () => {
    const response = await api.deleteCategory(testData.invalidIdCategory, token);
    expect(response.status).to.equal(responseCodeMessage.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedBadRequest.codeMessage);
  });

  it(cases.getDelete.negativeid.description, async () => {
    const response = await api.deleteCategory(testData.negativeIdCategory, token);
    expect(response.status).to.equal(responseCodeMessage.failedNotFound.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedNotFound.codeMessage);
  });

  it(cases.getDelete.blankid.description, async () => {
    const response = await api.deleteCategory(testData.blankIdCategory, token);
    expect(response.status).to.equal(responseCodeMessage.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedBadRequest.codeMessage);
  });

  it(cases.getDelete.invalidtoken.description, async () => {
    const response = await api.deleteCategory(testData.idCategory, testData.invalidToken);
    expect(response.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageInvalidToken);
  });

  it(cases.getDelete.blanktoken.description, async () => {
    const response = await api.deleteCategoryWithoutAuth(testData.idCategory);
    expect(response.status).to.equal(responseCodeMessage.failedUnauthorized.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedUnauthorized.codeMessage);
  });
});
