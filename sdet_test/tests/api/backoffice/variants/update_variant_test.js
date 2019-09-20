const expect = require('chai').expect;
const chai = require('chai');
const common = require('./../../../../tests/helper/common.js');
const api = require('./../../../../tests/page-objects/api/backoffice/variants/variant_management.js');
const jsonData = require('./../../../../tests/helper/schema/variants/update_schema');
const cases = require('./../../../testcases/backoffice/variants/case_update_variants');
const testData = require('./../../../helper/testDataVariants.js');
const userCredential = require('./../../../helper/userCredential.json');
const responseMessageCode = require('./../../../helper/responseMessageAndCode.json');
chai.use(require('chai-json-schema'));

const newLabel = `AT warna ${common.randomNumber()}`;

const bodyUpdateCategoryC3 = (label) => {
  const body = testData.updateCategoryC3;
  body.label = label;
  return body;
};
const bodyUpdateDescription = (label) => {
  const body = testData.updateDescription;
  body.label = label;
  return body;
};
const bodyUpdateValues = (label) => {
  const body = testData.updateValues;
  body.label = label;
  return body;
};

describe('update variants @happy @backoffice @variants @updatevariant', () => {
  let token;

  before(async () => {
    const userToLogin = userCredential.backOffice.admin;
    const respond = await common.getTokenBo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.token;
  });

  it(cases.putUpdate.updateCategoryC3.description, async () => {
    const response = await api.variantUpdate(testData.UpdateIdVariant, bodyUpdateCategoryC3(newLabel), token);
    expect(response.status).to.equal(responseMessageCode.successNoContent, response.body.message);
    expect(response.body).to.be.jsonSchema(jsonData.schema);
  });

  it(cases.putUpdate.updateVariantName.description, async () => {
    const response = await api.variantUpdate(testData.UpdateIdVariant, testData.updateVariantName, token);
    expect(response.status).to.equal(responseMessageCode.successNoContent, response.body.message);
  });

  it(cases.putUpdate.updateDescription.description, async () => {
    const response = await api.variantUpdate(testData.UpdateIdVariant, bodyUpdateDescription(newLabel), token);
    expect(response.status).to.equal(responseMessageCode.successNoContent, response.body.message);
  });

  it(cases.putUpdate.updateValues.description, async () => {
    const response = await api.variantUpdate(testData.UpdateIdVariant, bodyUpdateValues(newLabel), token);
    expect(response.status).to.equal(responseMessageCode.successNoContent, response.body.message);
  });

  it(cases.putUpdate.nothingEdit.description, async () => {
    const response = await api.variantUpdate(testData.UpdateIdVariant, bodyUpdateValues(newLabel), token);
    expect(response.status).to.equal(responseMessageCode.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseMessageCode.failedBadRequest.codeMessage);
  });

  it(cases.putUpdate.updateCategoryC2.description, async () => {
    const response = await api.variantUpdate(testData.UpdateIdVariant, testData.updateCategoryC2, token);
    expect(response.status).to.equal(responseMessageCode.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseMessageCode.failedBadRequest.codeMessage);
  });

  it(cases.putUpdate.updateCategoryC1.description, async () => {
    const response = await api.variantUpdate(testData.UpdateIdVariant, testData.updateCategoryC1, token);
    expect(response.status).to.equal(responseMessageCode.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseMessageCode.failedBadRequest.codeMessage);
  });

  it(cases.putUpdate.updateCategoryC0.description, async () => {
    const response = await api.variantUpdate(testData.UpdateIdVariant, testData.updateCategoryC0, token);
    expect(response.status).to.equal(responseMessageCode.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseMessageCode.failedBadRequest.codeMessage);
  });

  it(cases.putUpdate.blankcategory.description, async () => {
    const response = await api.variantUpdate(testData.UpdateIdVariant, testData.blankcategory, token);
    expect(response.status).to.equal(responseMessageCode.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseMessageCode.failedBadRequest.codeMessage);
  });

  it(cases.putUpdate.blankVariantValue.description, async () => {
    const response = await api.variantUpdate(testData.UpdateIdVariant, testData.blankVariantValue, token);
    expect(response.status).to.equal(responseMessageCode.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseMessageCode.failedBadRequest.codeMessage);
  });

  it(cases.putUpdate.blankVariantName.description, async () => {
    const response = await api.variantUpdate(testData.UpdateIdVariant, testData.blankVariantName, token);
    expect(response.status).to.equal(responseMessageCode.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseMessageCode.failedBadRequest.codeMessage);
  });

  it(cases.putUpdate.DoubleSameVariantValue.description, async () => {
    const response = await api.variantUpdate(testData.UpdateIdVariant, testData.DoubleSameVariantValue, token);
    expect(response.status).to.equal(responseMessageCode.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseMessageCode.failedBadRequest.codeMessage);
  });

  it(cases.putUpdate.invalidid.description, async () => {
    const response = await api.variantUpdate(testData.UpdateInvalidIdVariant, testData.updateDescription, token);
    expect(response.status).to.equal(responseMessageCode.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseMessageCode.failedBadRequest.codeMessage);
  });

  it(cases.putUpdate.negativeid.description, async () => {
    const response = await api.variantUpdate(testData.UpdateNegativeIdVariant, testData.updateDescription, token);
    expect(response.status).to.equal(responseMessageCode.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseMessageCode.failedBadRequest.codeMessage);
  });

  it(cases.putUpdate.blankid.description, async () => {
    const response = await api.variantUpdate(testData.UpdateBlankIdVariant, testData.updateDescription, token);
    expect(response.status).to.equal(responseMessageCode.failedBadRequest.codeNumber);
    expect(response.body.code).to.equal(responseMessageCode.failedBadRequest.codeMessage);
  });

  it(cases.putUpdate.invalidtoken.description, async () => {
    const response = await api.variantUpdate(testData.UpdateIdVariant, testData.updateDescription, testData.invalidToken);
    expect(response.status).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeNumber);
    expect(response.body.code).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeMessageInvalidToken);
  });

  it(cases.putUpdate.blanktoken.description, async () => {
    const response = await api.variantUpdateWithoutAuth(testData.UpdateIdVariant, testData.updateDescription);
    expect(response.status).to.equal(responseMessageCode.failedUnauthorized.codeNumber);
    expect(response.body.code).to.equal(responseMessageCode.failedUnauthorized.codeMessage);
  });
});
