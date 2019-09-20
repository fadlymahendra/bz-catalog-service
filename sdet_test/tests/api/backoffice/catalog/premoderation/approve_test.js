
/* eslint prefer-destructuring: off */

const { expect } = require('chai');
const authHelper = require('../../../../helper/token');
const api = require('./../../../../page-objects/api/backoffice/catalog/premoderation/approve');
const apiValidation = require('./../../../../page-objects/api/frontoffice/catalog/vendor/request_product');
const responseCodeMessage = require('../../../../helper/responseMessageAndCode.json');
const testData = require('../../../../helper/backoffice/catalog/premoderation/approve_data.json');
const userCredential = require('../../../../helper/userCredential.json');

const string = {
  describeIt: {
    successApproveSkuWithNOVARIANTValue: 'Success approved product SKU with variant value no_variant',
    successApproveSkuWithIndentDecimalDownPayment: 'Success approved product SKU with isIndent, isDecimal, Down Payment',
    successApproveSkuWithoutUNSPSC: 'Success approved product SKU without UNSPSC',
    failedApproveSkuTwoTimes: 'Failed approved product SKU two times',
    failedApproveSkuWithIncorrectToken: 'Failed approved product SKU with incorrect token',
    failedApprovedSkuWithoutAuth: 'Failed approved product SKU without auth',
    failedApprovedInvalidSkuId: 'Failed approved product SKU with invalid sku id',
  },
};

describe('Premoderation Approve', () => {
  let token;
  let tokenFo;
  const validSkuId = testData.validSkuIdForApproval;
  const validSkuIdIndentDecimal = testData.validSkuIdForApprovalIndentDecimal;
  const validVendorId = testData.vendorId;
  const validProductGroupId = testData.productGroupId;
  const validProductGroupIdIndentDecimal = testData.productGroupIdIndentDecimal;
  const invalidSkuId = testData.invalidSkuIdForApproval;

  const isIndentResponse = testData.isIndentResponse;
  const isDecimalResponse = testData.isDecimalResponse;
  const downPaymentTypeResponse = testData.downPaymentTypeResponse;
  const downPaymentValueResponse = testData.downPaymentValueResponse;

  before(async () => {
    const response = await authHelper.getBackOfficeToken.getToken(userCredential.backOffice.admin);
    const responseFo = await authHelper.getFrontOfficeToken.getToken(userCredential.vendor.dj2);
    tokenFo = responseFo.body.seller.token;
    token = response.body.token;
  });

  it(`@happy @put @backoffice @premodapprove|  ${string.describeIt.successApproveSkuWithNOVARIANTValue}`, (done) => {
    api.putPremodApprove(validSkuId, testData.validApprovalRequestBody, token, (response) => {
      expect(response.status).to.equal(responseCodeMessage.successOk);
      expect(response.body.data.id).to.equal(validSkuId);
      expect(response.body.data.status).to.equal('done');
      done();
    });
  });

  it(`@C11508 @happy @put @backoffice @premodapprove |  ${string.describeIt.successApproveSkuWithIndentDecimalDownPayment}`, (done) => {
    api.putPremodApprove(validSkuIdIndentDecimal, testData.validApprovalRequestBodyIndentDecimal, token, (response) => {
      expect(response.status).to.equal(responseCodeMessage.successOk);
      expect(response.body.data.id).to.equal(validSkuIdIndentDecimal);
      expect(response.body.data.status).to.equal('done');
      apiValidation.getRequestProductWithProdGroup(validVendorId, validProductGroupIdIndentDecimal, tokenFo, (responseFo) => {
        expect(responseFo.body.product.isIndentProperty).to.equal(isIndentResponse);
        expect(responseFo.body.product.isDecimalProperty).to.equal(isDecimalResponse);
        expect(responseFo.body.product.downPaymentTypeProperty).to.equal(downPaymentTypeResponse);
        expect(responseFo.body.product.downPaymentValueProperty).to.equal(downPaymentValueResponse);
        done();
      });
    });
  });

  it(`@happy @put @backoffice @premodapprove | ${string.describeIt.successApproveSkuWithoutUNSPSC}`, (done) => {
    api.putPremodApprove(testData.validSkuIdForApprovalWOUNSPSC, testData.validApprovalWOUNSPSCRequestBody, token, (response) => {
      expect(response.status).to.equal(responseCodeMessage.successOk);
      expect(response.body.data.id).to.equal(testData.validSkuIdForApprovalWOUNSPSC);
      done();
    });
  });

  it(`@neg @put @backoffice @premodapprove | ${string.describeIt.failedApproveSkuTwoTimes}`, (done) => {
    api.putPremodApprove(validSkuId, testData.validApprovalRequestBody, token, (response) => {
      expect(response.status).to.equal(responseCodeMessage.failedBadRequest.codeNumber);
      expect(response.body.code).to.equal(responseCodeMessage.failedBadRequest.codeMessage);
      done();
    });
  });

  it(`@neg @put @backoffice @premodapprove | ${string.describeIt.failedApproveSkuWithIncorrectToken}`, (done) => {
    api.putPremodApprove(validSkuId, testData.validApprovalRequestBody, 'incorrect_token', (response) => {
      expect(response.status).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeNumber);
      expect(response.body.code).to.equal(responseCodeMessage.failedForbiddenInvalidToken.codeMessageInvalidToken);
      done();
    });
  });

  it(`@neg @put @backoffice @premodapprove | ${string.describeIt.failedApprovedSkuWithoutAuth}`, (done) => {
    api.putPremodApproveWoAuth(validSkuId, testData.validApprovalRequestBody, (response) => {
      expect(response.status).to.equal(responseCodeMessage.failedUnauthorized.codeNumber);
      expect(response.body.code).to.equal(responseCodeMessage.failedUnauthorized.codeMessage);
      done();
    });
  });

  it(`@reg @put @backoffice @premodapprove | ${string.describeIt.failedApprovedInvalidSkuId}`, (done) => {
    api.putPremodApprove(invalidSkuId, testData.validApprovalRequestBody, token, (response) => {
      expect(response.status).to.equal(responseCodeMessage.failedNotFound.codeNumber);
      expect(response.body.code).to.equal(responseCodeMessage.failedNotFound.codeMessage);
      done();
    });
  });
});
