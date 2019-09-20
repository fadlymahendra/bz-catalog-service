const { expect } = require('chai');
const api = require('./../../../page-objects/api/backoffice/categories/category_management.js');
const common = require('./../../../helper/common.js');
const testData = require('./../../../helper/backoffice/category/attribute_data.json');
const cases = require('./../../../testcases/backoffice/catalog/categories/case_attribute_categories.js');
const jsonData = require('./../../../helper/schema/category_management/attribute_schema.js');
const responseCodeMessage = require('../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../helper/userCredential.json');

describe('Attribute categories @happy @backoffice @categories @attributecategory', () => {
  let token;

  before(async () => {
    const userToLogin = userCredential.backOffice.admin;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseCodeMessage.successOk);
    token = respond.body.token;
  });

  it(`@happy @get @backoffice @categories @attributecategory ${cases.getAttribute.correctparam_datacontent.description}`, async () => {
    const response = await api.attribute(testData.idCategory, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    expect(response.body.data).not.equal(0);
    expect(response.body.data).to.be.jsonSchema(jsonData.attribute_schema);
  });

  it(`@happy @get @backoffice @categories @attributecategory ${cases.getAttribute.correctparam_datacontent.description}`, async () => {
    const response = await api.attribute(testData.idCatEmptyVar, token);
    expect(response.status).to.equal(responseCodeMessage.successOk);
    expect(response.body.data).not.equal(0);
    expect(response.body.data).to.be.jsonSchema(jsonData.attribute_schema);
  });

  it(`@neg @get @backoffice @categories @attributecategory ${cases.getAttribute.invalidid.description}`, async () => {
    const response = await api.attribute(testData.invalidIdCategory, token);
    expect(response.status).to.equal(responseCodeMessage.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedBadRequest.codeMessage);
  });

  it(`@neg @get @backoffice @categories @attributecategory ${cases.getAttribute.negativeid.description}`, async () => {
    const response = await api.attribute(testData.negativeIdCategory, token);
    expect(response.status).to.equal(responseCodeMessage.failedNotFound.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedNotFound.codeMessage);
  });

  it(`@neg @get @backoffice @categories @attributecategory ${cases.getAttribute.blankid.description}`, async () => {
    const response = await api.attribute(testData.blankIdCategory, token);
    expect(response.status).to.equal(responseCodeMessage.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedBadRequest.codeMessage);
  });

  it(`@neg @get @backoffice @categories @attributecategory ${cases.getAttribute.invalidtoken.description}`, async () => {
    const response = await api.attribute(testData.idCategory, testData.invalidToken);
    expect(response.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageInvalidToken);
  });

  it(`@neg @get @backoffice @categories @attributecategory ${cases.getAttribute.blanktoken.description}`, async () => {
    const response = await api.attributeWithoutAuth(testData.idCategory);
    expect(response.status).to.equal(responseCodeMessage.failedUnauthorized.codeNumber);
    expect(response.body.code).to.equal(responseCodeMessage.failedUnauthorized.codeMessage);
  });
});
