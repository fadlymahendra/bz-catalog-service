
/* eslint prefer-destructuring: off */
const { expect } = require('chai');
const api = require('./../../../../page-objects/api/backoffice/catalog/premoderation/details.js');
const authHelper = require('../../../../helper/token');
const responseCodeMessage = require('../../../../helper/responseMessageAndCode.json');
const detailSchemaResponse = require('../../../../helper/schema/backoffice/catalog/premoderation/detail_schema.json');
const testData = require('../../../../helper/backoffice/catalog/premoderation/details_data.json');
const userCredential = require('../../../../helper/userCredential.json');

const string = {
  description: {
    get: 'Premoderation Details',
    getDataWithoutUNSPSC: 'Premoderation Details without UNSPSC',
    invalidId: 'Premoderation Details with invalid premod ID',
    emptyId: 'Premoderation Details with empty premod ID',
    getWithoutAuth: 'Premoderation Details without Auth',
    getInvalidAuth: 'Premoderation Details invalid Auth',
  },
  describeIt: {
    checkResult: 'Premoderation Details list should be displayed',
    checkGetDataWithoutUNSPSC: 'Premoderation Details list should be displayed',
    checkNotFound: 'Premoderation Details not found',
    checkResultWithoutAuth: 'Premoderation Details without auth should give http response 401',
    checkResultInvalidAuth: 'Premoderation Details invalid auth should give http response 403',
  },
};

describe('Get Pre - moderation Details', () => {
  let token;

  before(async () => {
    const response = await authHelper.getBackOfficeToken.getToken(userCredential.backOffice.admin);
    token = response.body.token;
  });

  it(`@happy @get @backoffice @premod | ${string.description.get} ${string.describeIt.checkResult}`, (done) => {
    api.getPremodDetails(testData.validPremodId, token, (response) => {
      expect(response.status).to.equal(responseCodeMessage.successOk);
      expect(response.body).to.be.jsonSchema(detailSchemaResponse.getSinglePremodDetail);
      expect(response.body.data).not.equal(0);
      done();
    });
  });

  it(`@happy @get @backoffice @premod | ${string.description.getDataWithoutUNSPSC} ${string.describeIt.checkGetDataWithoutUNSPSC}`, (done) => {
    api.getPremodDetails(testData.woUNSPSCId, token, (response) => {
      expect(response.status).to.equal(responseCodeMessage.successOk);
      expect(response.body).to.be.jsonSchema(detailSchemaResponse.getSinglePremodDetail);
      expect(response.body.data.category.c0.id).to.equal(0);
      done();
    });
  });

  it(`@neg @get @backoffice @premod | ${string.description.invalidId} ${string.describeIt.checkNotFound}`, (done) => {
    api.getPremodDetails(testData.invalidPremodId, token, (response) => {
      expect(response.status).to.equal(responseCodeMessage.failedNotFound.codeNumber);
      done();
    });
  });

  it(`@happy @get @backoffice @premod | ${string.description.emptyId}`, (done) => {
    api.getPremodDetails('', token, (response) => {
      expect(response.status).to.equal(responseCodeMessage.successOk);
      expect(response.body).to.be.jsonSchema(detailSchemaResponse.getManyPremodDetail);
      done();
    });
  });

  it(`@neg @get @backoffice @premod | ${string.description.getWithoutAuth} ${string.describeIt.checkResultWithoutAuth}`, (done) => {
    api.getPremodDetailsWoAuth(testData.validPremodId, (response) => {
      expect(response.status).to.equal(responseCodeMessage.failedUnauthorized.codeNumber);
      expect(response.body.code).to.equal(responseCodeMessage.failedUnauthorized.codeMessage);
      done();
    });
  });

  it(`@neg @get @backoffice @premod | ${string.description.getInvalidAuth} ${string.describeIt.checkResultInvalidAuth}`, (done) => {
    api.getPremodDetails(testData.validPremodId, 'incorrect_token', (response) => {
      expect(response.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber);
      expect(response.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageInvalidToken);
      done();
    });
  });
});
