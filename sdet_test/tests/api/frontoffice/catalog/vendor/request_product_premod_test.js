/* eslint prefer-destructuring: off */


const { expect } = require('chai');
const jwtDecoder = require('jwt-decode');
const testData = require('../../../../helper/frontoffice/catalog/vendor/request_product_premod_data.json');
const getPreProcessData = require('../../../../helper/frontoffice/catalog/vendor/testDataRequestPremod');
const schema = require('../../../../helper/schema/frontoffice/catalog/vendor/request_product_premod_schema.json');
const api = require('../../../../page-objects/api/frontoffice/catalog/vendor/request_product_premod');
const cases = require('../../../../testcases/frontoffice/catalog/vendors/request_product_testcase.js');
const responseCodeAndMessage = require('../../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../../helper/userCredential.json');
const common = require('./../../../../helper/common.js');

describe('Add SKU w/o product group (with premod)', () => {
  let token;
  let organizationId;

  before(async () => {
    const response = await common.getTokenFo(userCredential.vendor.dj2);
    token = response.body.seller.token;
    organizationId = jwtDecoder(token).customer.organization_id;
  });

  it(`@happy @post @frontoffice @reqprod | ${cases.scenario.getOK.descCreateNoVariant}`, (done) => {
    api.postRequestProduct(organizationId, testData.validRequestSkuWoProdGroupWithVariantValNO_VARIANT, token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.successCreated);
      expect(response.body).to.be.jsonSchema(schema.validReqProdPremodResponsePost);
      done();
    });
  });

  it(`@neg @post @frontoffice @reqprod | ${cases.scenario.getInvalidAuth.descOtherSession}`, (done) => {
    api.postRequestProduct(organizationId, testData.validRequestSkuWoProdGroupWithVariantValNO_VARIANT, 'h_vendor', (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.failedForbiddenInvalidToken.codeNumber);
      expect(response.body.code).to.equal(responseCodeAndMessage.failedForbiddenInvalidToken.codeMessageInvalidToken);
      done();
    });
  });

  it(`@happy @post @frontoffice @reqprod | ${cases.scenario.getOK.descCreateTwoVariant}`, (done) => {
    api.postRequestProduct(organizationId, testData.validRequestSkuWoProdGroupWithTwoVariantVal, token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.successCreated);
      expect(response.body).to.be.jsonSchema(schema.validReqProdPremodResponsePost);
      done();
    });
  });

  it(`@neg @post @frontoffice @reqprod | ${cases.scenario.getWithoutAuth.descWithoutAuth}`, (done) => {
    api.postRequestProductWoAuth(organizationId, testData.validRequestSkuWoProdGroupWithTwoVariantVal, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.failedUnauthorized.codeNumber);
      expect(response.body.code).to.equal(responseCodeAndMessage.failedUnauthorized.codeMessage);
      done();
    });
  });

  it(`@neg @post @frontoffice @reqprod | ${cases.scenario.getBadRequest.emptySKUVendor}`, (done) => {
    api.postRequestProduct(organizationId, testData.invalidRequestSkuWoSKUVendor, token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.failedBadRequest.codeNumber);
      expect(response.body.code).to.equal(responseCodeAndMessage.failedBadRequest.codeMessage);
      done();
    });
  });

  it(`@neg @post @frontoffice @reqprod | ${cases.scenario.getBadRequest.invalidSKUVendor}`, (done) => {
    api.postRequestProduct(organizationId, testData.invalidRequestSkuInvalidSKUVendor, token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.failedBadRequest.codeNumber);
      expect(response.body.code).to.equal(responseCodeAndMessage.failedBadRequest.codeMessage);
      done();
    });
  });

  it(`@neg @post @frontoffice @reqprod | ${cases.scenario.getInvalidAuth.descOtherSessionTwoVariant}`, (done) => {
    api.postRequestProduct(organizationId, testData.validRequestSkuWoProdGroupWithTwoVariantVal, 'incorrect_token', (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.failedForbiddenInvalidToken.codeNumber);
      expect(response.body.code).to.equal(responseCodeAndMessage.failedForbiddenInvalidToken.codeMessageInvalidToken);
      done();
    });
  });

  it(`@neg @post @frontoffice @reqprod | ${cases.scenario.getForbidden.descInvalidVendorId}`, (done) => {
    api.postRequestProduct(organizationId + 2, testData.validRequestSkuWoProdGroupWithVariantValNO_VARIANT, token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.failedForbiddenInvalidToken.codeNumber);
      expect(response.body.code).to.equal(responseCodeAndMessage.failedForbiddenInvalidToken.codeMessageForbidden);
      done();
    });
  });

  it(`@C11365 @happy @post @frontoffice @reqprod | ${cases.scenario.getOK.activeDecimal}`, (done) => {
    api.postRequestProduct(organizationId, testData.DecimalProduct, token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.successCreated);
      expect(response.body).to.be.jsonSchema(schema.validReqProdPremodResponsePost);
      done();
    });
  });

  it(`@C11366 @happy @post @frontoffice @reqprod | ${cases.scenario.getOK.activateIndent}`, (done) => {
    api.postRequestProduct(organizationId, testData.IndentProduct, token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.successCreated);
      expect(response.body).to.be.jsonSchema(schema.validReqProdPremodResponsePost);
      done();
    });
  });

  it(`@C11367 @happy @post @frontoffice @reqprod | ${cases.scenario.getOK.activeDP}`, (done) => {
    api.postRequestProduct(organizationId, testData.DPProduct, token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.successCreated);
      expect(response.body).to.be.jsonSchema(schema.validReqProdPremodResponsePost);
      done();
    });
  });

  it(`@C11368 @neg @post @frontoffice @reqprod | ${cases.scenario.getOK.nonactiveIndentAndActiveDP}`, (done) => {
    api.postRequestProduct(organizationId, testData.premodWithDPAndNoIndent, token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.successCreated);
      expect(response.body).to.be.jsonSchema(schema.validReqProdPremodResponsePost);
      done();
    });
  });

  it(`@C11388 @happy @post @frontoffice @reqprod | ${cases.scenario.getOK.nonactiveDecimal}`, (done) => {
    api.postRequestProduct(organizationId, testData.nonActiveDecimal, token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.successCreated);
      expect(response.body).to.be.jsonSchema(schema.validReqProdPremodResponsePost);
      done();
    });
  });

  it(`@C11389 @happy @post @frontoffice @reqprod | ${cases.scenario.getOK.nonActiveIndent}`, (done) => {
    api.postRequestProduct(organizationId, testData.nonActiveIndent, token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.successCreated);
      expect(response.body).to.be.jsonSchema(schema.validReqProdPremodResponsePost);
      done();
    });
  });

  it(`@C11390 @happy @post @frontoffice @reqprod | ${cases.scenario.getOK.nonactiveDP}`, (done) => {
    api.postRequestProduct(organizationId, testData.nonActiveDP, token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.successCreated);
      expect(response.body).to.be.jsonSchema(schema.validReqProdPremodResponsePost);
      done();
    });
  });

  it(`@C11392 @happy @post @frontoffice @reqprod | ${cases.scenario.getOK.nonactiveIndentAndNonactiveDP}`, (done) => {
    api.postRequestProduct(organizationId, testData.nonactiveIndentAndNonactiveDP, token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.successCreated);
      expect(response.body).to.be.jsonSchema(schema.validReqProdPremodResponsePost);
      done();
    });
  });

  it(`@C11391 @neg @post @frontoffice @reqprod | ${cases.scenario.getBadRequest.invalidPercentageDP}`, (done) => {
    api.postRequestProduct(organizationId, testData.invalidPercentageDP, token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.failedBadRequest.codeNumber);
      expect(response.body.code).to.equal(responseCodeAndMessage.failedBadRequest.codeMessage);
      expect(response.body.message).to.equal(getPreProcessData.errorMessageInvalidPercentageDP(testData.invalidPercentageDP.products[0].sku_vendor));
      done();
    });
  });

  it(`@C11556 @neg @post @frontoffice @reqprod | ${cases.scenario.getBadRequest.invalidNominalDP}`, (done) => {
    api.postRequestProduct(organizationId, testData.invalidNominalDP, token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.failedBadRequest.codeNumber);
      expect(response.body.code).to.equal(responseCodeAndMessage.failedBadRequest.codeMessage);
      expect(response.body.message).to.equal(getPreProcessData.errorMessageInvalidNominalDP(testData.invalidNominalDP.products[0].sku_vendor, testData.invalidNominalDP.products[0].tier_cogs_price_3));
      done();
    });
  });

  it(`C11557 @neg @post @frontoffice @reqprod | ${cases.scenario.getBadRequest.invalidIndentLimit}`, (done) => {
    api.postRequestProduct(organizationId, testData.invalidIndentLimit, token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.failedBadRequest.codeNumber);
      expect(response.body.code).to.equal(responseCodeAndMessage.failedBadRequest.codeMessage);
      expect(response.body.message).to.equal(getPreProcessData.errorMessageInvalidIndentLimit(testData.invalidIndentLimit.products[0].sku_vendor));
      done();
    });
  });
});
