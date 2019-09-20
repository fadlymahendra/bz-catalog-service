const { expect } = require('chai');
const api = require('./../../../page-objects/api/backoffice/categories/category_management.js');
const common = require('./../../../helper/common.js');
const testData = require('./../../../helper/backoffice/category/detail_data.json');
const cases = require('./../../../testcases/backoffice/catalog/categories/case_detail_categories');
const jsonData = require('./../../../helper/schema/category_management/detail_schema.js');
const responseCodeMessage = require('../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../helper/userCredential.json');

describe('Detail categories @backoffice @categories @detailcategory', () => {
  let token;

  before(async () => {
    const userToLogin = userCredential.backOffice.admin;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseCodeMessage.successOk);
    token = respond.body.token;
  });

  it(cases.getDetail.correctparam_datacontent.description, async () => {
    const response = await api.detail(testData.idCategory, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    expect(response.body.data).not.equal(0);
    expect(response.body.data).to.be.jsonSchema(jsonData.detail_category);
    expect(response.body.data.every(element => element.parent_id === testData.idCategory)).ok;
  });

  it(cases.getDetail.invalidid.description, async () => {
    const response = await api.detail(testData.invalidIdCategory, token);
    expect(response.status).to.equal(responseCodeMessage.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedBadRequest.codeMessage);
  });

  it(cases.getDetail.negativeid.description, async () => {
    const response = await api.detail(testData.negativeIdCategory, token);
    expect(response.status).to.equal(responseCodeMessage.failedNotFound.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedNotFound.codeMessage);
  });

  it(cases.getDetail.blankid.description, async () => {
    const response = await api.detail(testData.blankIdCategory, token);
    expect(response.status).to.equal(responseCodeMessage.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedBadRequest.codeMessage);
  });

  it(cases.getDetail.invalidtoken.description, async () => {
    const response = await api.detail(testData.idCategory, testData.invalidToken);
    expect(response.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageInvalidToken);
  });

  it(cases.getDetail.blanktoken.description, async () => {
    const response = await api.detailWithoutAuth(testData.idCategory);
    expect(response.status).to.equal(responseCodeMessage.failedUnauthorized.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedUnauthorized.codeMessage);
  });
});
