
/* eslint prefer-destructuring: off */

const { expect } = require('chai');
const testData = require('../../../../helper/backoffice/catalog/premoderation/reject_data.json');
const api = require('./../../../../page-objects/api/backoffice/catalog/premoderation/reject');
const authHelper = require('../../../../helper/token');
const responseCodeMessage = require('../../../../helper/responseMessageAndCode.json');
const rejectSchema = require('../../../../helper/schema/backoffice/catalog/premoderation/reject_schema.json');
const userCredential = require('../../../../helper/userCredential.json');

const string = {
  description: {
    reject: 'Reject product',
    approvePartialReject: 'Ask to re-submit product',
    rejectPartialWOUNSPSC: 'Partial Reject product without UNSPSC',
    rejectFullyWOUNSPSC: 'Fully Reject product without UNSPSC',
    rejectInvalidAuth: 'Reject product with invalid Auth',
    rejectNoAuth: 'Reject product without Auth',
    rejectNotFound: 'Reject product with invalid sku ID',
  },
  describeIt: {
    checkReject: 'success reject premoderation SKU',
    checkRejectInvalidAuth: 'failed reject premoderation SKU without auth (http response 403)',
    checkRejectNoAuth: 'failed reject premoderation SKU without auth (http response 401)',
    checkNotFound: 'failed reject premoderation SKU with not found premoderation id (http response 404)',
  },
};

describe('Premoderation Fully Reject Test', () => {
  let token;

  before(async () => {
    const response = await authHelper.getBackOfficeToken.getToken(userCredential.backOffice.admin);
    token = response.body.token;
  });

  // TO DO add test for invalid reason, reason is mandatory when fully reject premoderation sku

  it(`@happy @put @backoffice @reject-premod | ${string.description.reject} : ${string.describeIt.checkReject}`, (done) => {
    api.putPremodReject(testData.validSkuIdFullReject, testData.validFullyRejected, token, (response) => {
      expect(response.status).to.equal(responseCodeMessage.successOk);
      expect(response.body.data.premoderation_id).to.equal(testData.validSkuIdFullReject);
      expect(response.body.data.status).to.equal(testData.validFullyRejected.status);
      expect(response.body).to.jsonSchema(rejectSchema);
      done();
    });
  });

  it(`@happy @put @backoffice @reject-premod | ${string.description.rejectFullyWOUNSPSC} : ${string.describeIt.checkReject}`, (done) => {
    api.putPremodReject(testData.validSkuIdFullyRejectNoUNSPSC, testData.validFullyRejected, token, (response) => {
      expect(response.status).to.equal(responseCodeMessage.successOk);
      expect(response.body.data.premoderation_id).to.equal(testData.validSkuIdFullyRejectNoUNSPSC);
      expect(response.body.data.status).to.equal(testData.validFullyRejected.status);
      expect(response.body).to.jsonSchema(rejectSchema);
      done();
    });
  });

  it(`@neg @put @backoffice @reject-premod | ${string.description.rejectInvalidAuth} : ${string.describeIt.checkRejectInvalidAuth}`, (done) => {
    api.putPremodReject(testData.validSkuIdFullReject, testData.validFullyRejected, 'incorrect_token', (response) => {
      expect(response.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber);
      expect(response.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageInvalidToken);
      done();
    });
  });

  it(`@neg @put @backoffice @reject-premod | ${string.description.rejectNoAuth} : ${string.describeIt.checkRejectNoAuth}`, (done) => {
    api.putPremodRejectWoAuth(testData.validSkuIdFullReject, testData.validFullyRejected, (response) => {
      expect(response.status).to.equal(responseCodeMessage.failedUnauthorized.codeNumber);
      expect(response.body.code).to.equal(responseCodeMessage.failedUnauthorized.codeMessage);
      done();
    });
  });

  it(`@reg @put @backoffice @reject-premod | ${string.description.rejectNotFound} : ${string.describeIt.checkNotFound}`, (done) => {
    api.putPremodReject(testData.skuNotFound, testData.validFullyRejected, token, (response) => {
      expect(response.status).to.equal(responseCodeMessage.failedNotFound.codeNumber);
      expect(response.body.code).to.equal(responseCodeMessage.failedNotFound.codeMessage);
      done();
    });
  });
});


describe('Premoderation Partially Reject Test', () => {
  let token;

  before(async () => {
    const response = await authHelper.getBackOfficeToken.getToken(userCredential.backOffice.admin);
    token = response.body.token;
  });

  // TO DO add test for invalid reason, on of reject reason is mandatory same as from FE

  it(`@happy @put @backoffice @partial-reject-premod | ${string.description.approvePartialReject} : ${string.describeIt.checkReject}`, (done) => {
    api.putPremodReject(testData.validSkuIdPartialReject, testData.validPartialRejectProdDataReason, token, (response) => {
      expect(response.status).to.equal(responseCodeMessage.successOk);
      expect(response.body.data.premoderation_id).to.equal(testData.validSkuIdPartialReject);
      expect(response.body.data.status).to.equal(testData.validPartialRejectProdDataReason.status);
      expect(response.body).to.jsonSchema(rejectSchema);
      done();
    });
  });

  it(`@happy @put @backoffice @partial-reject-premod | ${string.description.rejectPartialWOUNSPSC} : ${string.describeIt.checkReject}`, (done) => {
    api.putPremodReject(testData.validSkuIdPartialRejectNoUNSPSC, testData.validPartialRejectProdDataReason, token, (response) => {
      expect(response.status).to.equal(responseCodeMessage.successOk);
      expect(response.body.data.premoderation_id).to.equal(testData.validSkuIdPartialRejectNoUNSPSC);
      expect(response.body.data.status).to.equal(testData.validPartialRejectProdDataReason.status);
      expect(response.body).to.jsonSchema(rejectSchema);
      done();
    });
  });
});
