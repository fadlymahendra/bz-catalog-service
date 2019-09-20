/* eslint no-unused-vars: off */
/* eslint prefer-destructuring:off */


const should = require('chai').should();
const expect = require('chai').expect;
const chai = require('chai');
const common = require('./../../../../tests/helper/common.js');
const api = require('./../../../../tests/page-objects/api/backoffice/variants/variant_management.js');
const cases = require('./../../../testcases/backoffice/variants/case_delete_variants');
const testData = require('./../../../helper/testDataVariants.js');
const userCredential = require('./../../../helper/userCredential.json');
const responseMessageCode = require('./../../../helper/responseMessageAndCode.json');
chai.use(require('chai-json-schema'));

describe('@deletevariant Delete variant Test API Service', () => {
  let token;

  before(async () => {
    const userToLogin = userCredential.backOffice.admin;
    const respond = await common.getTokenBo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.token;
  });

  it(`@happy @backoffice @categories @variants @deletevariant ${cases.scenario.deleteSuccess.successDeleteVariant}`, async () => {
    const respond = await api.variantDelete(testData.DeleteIdVariant, token);
    expect(respond.status).to.equal(responseMessageCode.successNoContent, respond.body.message);
  });

  it(`@happy @backoffice @categories @variants @deletevariant ${cases.scenario.deleteSuccess.successDeleteWhenVisibilityandStatus0}`, async () => {
    const respond = await api.variantDelete(testData.DeleteIdVariantVisibilityAndStatus0, token);
    expect(respond.status).to.equal(responseMessageCode.successNoContent, respond.body.message);
  });

  it(`@happy @backoffice @categories @variants @deletevariant ${cases.scenario.deleteSuccess.successDeleteWhenStatus1}`, async () => {
    const respond = await api.variantDelete(testData.DeleteIdVariantStatus1, token);
    expect(respond.status).to.equal(responseMessageCode.successNoContent, respond.body.message);
  });

  it(`@happy @backoffice @categories @variants @deletevariant ${cases.scenario.deleteSuccess.successDeleteWhenVisibility1}`, async () => {
    const respond = await api.variantDelete(testData.DeleteIdVariantVisibility1, token);
    expect(respond.status).to.equal(responseMessageCode.successNoContent, respond.body.message);
  });

  it(`@neg @backoffice @categories @deletevariant ${cases.scenario.deleteFailed.deleteInvalidAuth.description}`, async () => {
    const invalidToken = 'invalidtoken';
    const respond = await api.variantDelete(null, invalidToken);
    expect(respond.status).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeNumber);
  });

  it(`@neg @backoffice @categories @deletevariant ${cases.scenario.deleteFailed.deleteNoAuth.description}`, async () => {
    const respond = await api.variantDeleteWithoutAuth(null, token);
    expect(respond.status).to.equal(responseMessageCode.failedUnauthorized.codeNumber);
  });
});
