const { expect } = require('chai');
const chai = require('chai');
const common = require('./../../../../tests/helper/common.js');
const api = require('./../../../../tests/page-objects/api/backoffice/variants/variant_management.js');
const jsonData = require('./../../../../tests/helper/schema/variants/create_schema');
const cases = require('./../../../testcases/backoffice/variants/case_create_variants');
const userCredential = require('./../../../helper/userCredential.json');
const responseMessageCode = require('./../../../helper/responseMessageAndCode.json');
const testData = require('./../../../helper/testDataVariants.js');
chai.use(require('chai-json-schema'));

describe('create variants @happy @backoffice @variants @createvariant @test', () => {
  let token;

  before(async () => {
    const userToLogin = userCredential.backOffice.admin;
    const respond = await common.getTokenBo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.token;
  });

  it(cases.postCreate.createMandatoryFieldsOnly.description, async () => {
    const response = await api.variantCreate(testData.createMandatoryFieldsOnly, token);
    expect(response.status).to.equal(responseMessageCode.successCreated);
    expect(response.body).to.be.jsonSchema(jsonData.schema);
    expect(response.body.message).to.equal('Variant Telah Disimpan');
  });

  it(cases.postCreate.createFillAllFields.description, async () => {
    const response = await api.variantCreate(testData.createFillAllFields, token);
    expect(response.status).to.equal(responseMessageCode.successCreated);
    expect(response.body.message).to.equal('Variant Telah Disimpan');
  });

  it(cases.postCreate.createExistVariantName.description, async () => {
    const response = await api.variantCreate(testData.createVariantEmptyMandatory, token);
    expect(response.status).to.equal(responseMessageCode.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseMessageCode.failedBadRequest.codeMessage);
  });

  it(cases.postCreate.createBlankCategory.description, async () => {
    const response = await api.variantCreate(testData.createBlankCategory, token);
    expect(response.status).to.equal(responseMessageCode.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseMessageCode.failedBadRequest.codeMessage);
  });

  it(cases.postCreate.createBlankCategory.description, async () => {
    const response = await api.variantCreate(testData.createBlankCategory, token);
    expect(response.status).to.equal(responseMessageCode.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseMessageCode.failedBadRequest.codeMessage);
  });

  it(cases.postCreate.createBlankVariantName.description, async () => {
    const response = await api.variantCreate(testData.createBlankVariantName, token);
    expect(response.status).to.equal(responseMessageCode.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseMessageCode.failedBadRequest.codeMessage);
  });

  it(cases.postCreate.createBlankVariantValue.description, async () => {
    const response = await api.variantCreate(testData.createBlankVariantValue, token);
    expect(response.status).to.equal(responseMessageCode.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseMessageCode.failedBadRequest.codeMessage);
  });

  it(cases.postCreate.createDoubleSameNameVariantValue.description, async () => {
    const response = await api.variantCreate(testData.createDoubleSameNameVariantValue, token);
    expect(response.status).to.equal(responseMessageCode.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseMessageCode.failedBadRequest.codeMessage);
  });

  it(cases.postCreate.createWithoutMandatory.description, async () => {
    const response = await api.variantCreate(testData.createVariantEmptyMandatory, token);
    expect(response.status).to.equal(responseMessageCode.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseMessageCode.failedBadRequest.codeMessage);
  });

  it(cases.postCreate.createWithFillCategoryc0.description, async () => {
    const response = await api.variantCreate(testData.createWithFillCategoryc0, token);
    expect(response.status).to.equal(responseMessageCode.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseMessageCode.failedBadRequest.codeMessage);
  });

  it(cases.postCreate.createWithFillCategoryc1.description, async () => {
    const response = await api.variantCreate(testData.createWithFillCategoryc1, token);
    expect(response.status).to.equal(responseMessageCode.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseMessageCode.failedBadRequest.codeMessage);
  });

  it(cases.postCreate.createWithFillCategoryc2.description, async () => {
    const response = await api.variantCreate(testData.createWithFillCategoryc2, token);
    expect(response.status).to.equal(responseMessageCode.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseMessageCode.failedBadRequest.codeMessage);
  });

  it(cases.postCreate.createInvalidAuth.description, async () => {
    const response = await api.variantCreate(testData.createFillAllFields, testData.invalidToken);
    expect(response.status).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeNumber);
    expect(response.body.code).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeMessageInvalidToken);
  });

  it(cases.postCreate.createNoAuth.description, async () => {
    const response = await api.variantCreateWithoutAuth(testData.createFillAllFields);
    expect(response.status).to.equal(responseMessageCode.failedUnauthorized.codeNumber);
    expect(response.body.code).to.equal(responseMessageCode.failedUnauthorized.codeMessage);
  });
});
