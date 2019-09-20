const { expect } = require('chai');
const api = require('./../../../page-objects/api/backoffice/categories/category_management.js');
const common = require('./../../../helper/common.js');
const testData = require('./../../../helper/backoffice/category/change_status_data.json');
const dataKeys = require('./../../../helper/testDataCategories.js');
const cases = require('./../../../testcases/backoffice/catalog/categories/case_change_status.js');
const responseCodeMessage = require('../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../helper/userCredential.json');

describe('Attribute categories @backoffice @categories @changestatus', () => {
  let token;

  before(async () => {
    const userToLogin = userCredential.backOffice.admin;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseCodeMessage.successOk);
    token = respond.body.token;
  });

  it(`@happy @get @backoffice @categories @attributecategory ${cases.getStatus.correctparam_datacontent.description}`, async () => {
    const response = await api.changeStatus(testData.categoryId, dataKeys.changeStatusCategories, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    expect(response.body.message).to.equal('SUCCESS_CHANGE_STATUS');
    const respBodyDetail = await api.detailSingle(testData.categoryId, token);
    expect(respBodyDetail.status).to.equal(responseCodeMessage.successOk);
    expect(respBodyDetail.body.data.is_active).to.equal(1);
  });

  it(`@neg @get @backoffice @categories @attributecategory ${cases.getStatus.invalidid.description}`, async () => {
    const response = await api.changeStatus(testData.invalidIdCategory, dataKeys.changeStatusCategories, token);
    expect(response.status).to.equal(responseCodeMessage.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedBadRequest.codeMessage);
  });

  it(`@neg @get @backoffice @categories @attributecategory ${cases.getStatus.negativeid.description}`, async () => {
    const response = await api.changeStatus(testData.negativeIdCategory, dataKeys.changeStatusCategories, token);
    expect(response.status).to.equal(responseCodeMessage.failedNotFound.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedNotFound.codeMessage);
  });

  it(`@neg @get @backoffice @categories @attributecategory ${cases.getStatus.blankid.description}`, async () => {
    const response = await api.changeStatus(testData.blankIdCategory, dataKeys.changeStatusCategories, token);
    expect(response.status).to.equal(responseCodeMessage.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedBadRequest.codeMessage);
  });

  it(`@neg @get @backoffice @categories @attributecategory ${cases.getStatus.invalidtoken.description}`, async () => {
    const response = await api.changeStatus(testData.idCategory, dataKeys.changeStatusCategories, testData.invalidToken);
    expect(response.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageInvalidToken);
  });

  it(`@neg @get @backoffice @categories @attributecategory ${cases.getStatus.blanktoken.description}`, async () => {
    const response = await api.changeStatusWithoutAuth(testData.idCategory, dataKeys.changeStatusCategories);
    expect(response.status).to.equal(responseCodeMessage.failedUnauthorized.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedUnauthorized.codeMessage);
  });
});
