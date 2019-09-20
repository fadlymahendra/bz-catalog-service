
/* eslint prefer-destructuring: off */
/* eslint camelcase: off */

const { expect } = require('chai');
const chai = require('chai');
chai.use(require('chai-json-schema'));
const openApi = require('../../page-objects/api/external_api/update_product_summary.js');
const responseMessageCode = require('../../helper/responseMessageAndCode.json');
const userCredential = require('../../helper/userCredential.json');
const testData = require('../../helper/external_api/product_summary/update_product_summary_credential_data.json');
const updateProductSummaryCredentialSchema = require('../../helper/schema/external_api/update_product_summary_credential_schema.json');
const updateProductSummarySchema = require('../../helper/schema/external_api/update_product_summary_schema.json');

describe('@publicApi @publicApiAuth Public API update product summary negative credential test', () => {
  let token;

  for (const dataSet of testData.dataList) {
    it(`@negative @invalidToken ${dataSet.title}`, async () => {
      token = openApi.constructJwtToken({ ...userCredential.vendor.vendorPublicApi, ...dataSet.data });
      const response = await openApi.putUpdateProductSummary(userCredential.vendor.vendorId, testData.validRequestBody, token);
      expect(response.status).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeNumber);
      expect(response.body.code).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeMessageForbidden);
      expect(response.body).to.be.jsonSchema(updateProductSummaryCredentialSchema);
    });
  }

  it(`@negative @unauthorized ${testData.unauthorizedRequest.title}`, async () => {
    token = openApi.constructJwtToken({ ...testData.unauthorizedRequest.data });
    const response = await openApi.putUpdateProductSummary(userCredential.vendor.vendorId, testData.validRequestBody, token);
    expect(response.status).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeNumber);
    expect(response.body.code).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeMessageForbidden);
    expect(response.body.message).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeMessageInvalidToken);
    expect(response.body).to.be.jsonSchema(updateProductSummaryCredentialSchema);
  });

  it(`@negative @forbidden ${testData.dataUnauthorized.title}`, async () => {
    const vendorId = userCredential.vendor.vendorPublicApi.vendorId;
    const vendorId2 = userCredential.vendor.openAPIhbmi.vendorId;
    token = openApi.constructJwtToken(userCredential.vendor.openAPIhbmi);
    const response = await openApi.putUpdateProductSummary(vendorId2, testData.dataUnauthorized.requestBody, token);
    expect(response.status).to.equal(responseMessageCode.successOk);
    expect(response.body).to.be.jsonSchema(updateProductSummarySchema.responseValidSchema);
    const responseVendorId = await openApi.putUpdateProductSummary(vendorId, testData.dataUnauthorized.requestBody, token);
    expect(responseVendorId.status).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeNumber);
    expect(responseVendorId.body.code).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeMessageForbidden);
    expect(responseVendorId.body).to.be.jsonSchema(updateProductSummarySchema.responseFullyReject);
  });

  it(`@negative @withoutToken ${testData.requestWoToken.title}`, async () => {
    const response = await openApi.putUpdateProductSummaryWithoutToken(userCredential.vendor.vendorId, testData.validRequestBody);
    expect(response.status).to.equal(responseMessageCode.failedUnauthorized.codeNumber);
    expect(response.body.code).to.equal(testData.requestWoToken.codeMessage);
    expect(response.body).to.be.jsonSchema(updateProductSummaryCredentialSchema);
  });

  it(`@negative @invalidClientIdSecretKeyVendorId ${testData.invalidClientIdSecretKeyVendorId.title}`, async () => {
    const vendorId = userCredential.vendor.vendorPublicApi.vendorId;
    token = await openApi.constructJwtToken(testData.invalidClientIdSecretKeyVendorId.data);
    const response = await openApi.putUpdateProductSummary(vendorId, testData.validRequestBody, token);
    expect(response.status).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeNumber);
    expect(response.body.code).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeMessageForbidden);
    expect(response.body).to.be.jsonSchema(updateProductSummaryCredentialSchema);
  });
});
