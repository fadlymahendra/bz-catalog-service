
/* eslint prefer-destructuring:off */

const { expect } = require('chai');
const api = require('./../../../page-objects/api/backoffice/attributes/details.js');
const authHelper = require('../../../helper/token.js');
const testData = require('../../../helper/backoffice/attributes/detail_data.json');
const responseCodeMessage = require('../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../helper/userCredential.json');

const testTitle = {
  description: 'Get attribute detail test',
  describeIt: {
    successGetAttributeDetail: 'Should give Attributes details',
    successGetNotFoundAttributeDetail: 'Should give error Attribute not found',
    failedGetAttributeDetailWoAuth: 'Attributes Details without auth should give http response 401',
    checkResultInvalidAuth: 'Attributes Details invalid auth should give http response 403',
  },
};

describe(testTitle.description, () => {
  let token;
  before(async () => {
    const response = await authHelper.getBackOfficeToken.getToken(userCredential.backOffice.admin);
    token = response.body.token;
  });

  it(`${testTitle.describeIt.successGetAttributeDetail}`, (done) => {
    api.getAttributes(testData.validAttributeId, token, (response) => {
      expect(response.status).to.equal(responseCodeMessage.successOk);
      expect(response.body.id).equal(testData.validAttributeId);
      done();
    });
  });

  it(`${testTitle.describeIt.successGetNotFoundAttributeDetail}`, (done) => {
    api.getAttributes(testData.invalidAttributeId, token, (response) => {
      expect(response.status).to.equal(responseCodeMessage.failedNotFound.codeNumber);
      expect(response.body.code).to.equal(responseCodeMessage.failedNotFound.codeMessage);
      expect(response.body.message).to.equal(testData.notFoundMessage);
      done();
    });
  });

  it(`${testTitle.describeIt.failedGetAttributeDetailWoAuth}`, (done) => {
    api.getAttributeWithoutAuth(testData.validAttributeId, (response) => {
      expect(response.status).to.equal(responseCodeMessage.failedUnauthorized.codeNumber);
      expect(response.body.code).to.equal(responseCodeMessage.failedUnauthorized.codeMessage);
      done();
    });
  });

  it(`${testTitle.describeIt.checkResultInvalidAuth}`, (done) => {
    api.getAttributes(testData.validAttributeId, 'incorrect_token', (response) => {
      expect(response.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber);
      expect(response.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageInvalidToken);
      done();
    });
  });
});
