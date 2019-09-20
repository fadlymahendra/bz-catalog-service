
/* eslint prefer-destructuring: off */

const { expect } = require('chai');
const api = require('./../../../../page-objects/api/backoffice/catalog/premoderation/history');
const testData = require('../../../../helper/backoffice/catalog/premoderation/history_data.json');
const authHelper = require('../../../../helper/token');
const responseCodeMessage = require('../../../../helper/responseMessageAndCode.json');
const getHistorySchema = require('../../../../helper/schema/backoffice/catalog/premoderation/history_schema.json');
const userCredential = require('../../../../helper/userCredential.json');

const string = {
  describeIt: {
    checkResult: 'Success get premoderation history list',
    checkResultAsc: 'Success get premoderation history list ascending created date',
    checkEmptyPremodId: 'Failed get premoderation history list with empty premod id, Bad Request',
    checkInvalidPremodId: 'Failed get premoderation history list with invalid premod id, Not Found',
    checkResultWithoutAuth: 'Failed to get premoderation history list without auth, Uauthorized',
    checkResultInvalidAuth: 'Failed to get premoderation history list with wrong Token',
  },
};

describe('Get Pre - moderation History', () => {
  let token;

  before(async () => {
    const response = await authHelper.getBackOfficeToken.getToken(userCredential.backOffice.admin);
    token = response.body.token;
  });


  it(`@happy @get @backoffice @premod | ${string.describeIt.checkResult}`, (done) => {
    api.getPremodHistory(testData.validPremodId, {}, token, (response) => {
      expect(response.status).to.equal(responseCodeMessage.successOk);
      expect(response.body).to.be.jsonSchema(getHistorySchema);
      expect(response.body.data).not.equal(0);
      done();
    });
  });

  it(`@happy @get @backoffice @premod | ${string.describeIt.checkResultAsc}`, (done) => {
    api.getPremodHistory(testData.validPremodId, testData.validGetPremodHistoryRequestSortCreateAscending, token, (response) => {
      expect(response.status).to.equal(responseCodeMessage.successOk);
      expect(response.body.data).not.equal(0);
      done();
    });
  });

  it(`@neg @get @backoffice @premod | ${string.describeIt.checkEmptyPremodId}`, (done) => {
    api.getPremodHistory('', testData.validGetPremodHistoryRequestSortCreateDescending, token, (response) => {
      expect(response.status).to.equal(responseCodeMessage.failedBadRequest.codeNumber);
      expect(response.body.code).to.equal(responseCodeMessage.failedBadRequest.codeMessage);
      done();
    });
  });

  it(`@neg @get @backoffice @premod | ${string.describeIt.checkInvalidPremodId}`, (done) => {
    api.getPremodHistory(testData.invalidPremodId, testData.validGetPremodHistoryRequestSortCreateDescending, token, (response) => {
      expect(response.status).to.equal(responseCodeMessage.failedNotFound.codeNumber);
      expect(response.body.code).to.equal(responseCodeMessage.failedNotFound.codeMessage);
      done();
    });
  });

  it(`@neg @get @backoffice @premod | ${string.describeIt.checkResultWithoutAuth}`, (done) => {
    api.getPremodHistoryWoAuth(testData.validPremodId, testData.validGetPremodHistoryRequestSortCreateDescending, (response) => {
      expect(response.status).to.equal(responseCodeMessage.failedUnauthorized.codeNumber);
      expect(response.body.code).to.equal(responseCodeMessage.failedUnauthorized.codeMessage);
      done();
    });
  });

  it(`@neg @get @backoffice @premod | ${string.describeIt.checkResultInvalidAuth}`, (done) => {
    api.getPremodHistory(testData.validPremodId, testData.validGetPremodHistoryRequestSortCreateDescending, 'incorrect_token', (response) => {
      expect(response.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber);
      expect(response.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageInvalidToken);
      done();
    });
  });
});
