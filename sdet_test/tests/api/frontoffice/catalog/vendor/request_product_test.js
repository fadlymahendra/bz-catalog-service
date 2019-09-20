/* eslint prefer-destructuring: off */


const { expect } = require('chai');
const jwtDecoder = require('jwt-decode');
const getPreProcessData = require('../../../../helper/frontoffice/catalog/vendor/testDataRequestProduct');
const testData = require('../../../../helper/frontoffice/catalog/vendor/request_product_data.json');
const schema = require('../../../../helper/schema/frontoffice/catalog/vendor/request_product_schema.json');
const api = require('../../../../page-objects/api/frontoffice/catalog/vendor/request_product.js');
const cases = require('../../../../testcases/frontoffice/catalog/vendors/request_product_testcase.js');
const responseCodeAndMessage = require('../../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../../helper/userCredential.json');
const common = require('./../../../../helper/common.js');

describe('Add SKU with product group (w/o premod)', () => {
  let token;
  let organizationId;

  before(async () => {
    const response = await common.getTokenFo(userCredential.vendor.dj2);
    token = response.body.seller.token;
    organizationId = jwtDecoder(token).customer.organization_id;
  });

  it(`@happy @post @frontoffice @reqprod | ${cases.scenario.getOK.descCreateTwoVariantWithPG}`, (done) => {
    api.postRequestProductWithProdGroup(organizationId, testData.validReqSkuWithProdGroup, token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.successCreated);
      expect(response.body).to.be.jsonSchema(schema.validReqProdResponsePost);
      expect(response.body.data.product_group_id).to.equal(testData.validReqSkuWithProdGroup.product_group_id);
      done();
    });
  });

  it(`@neg @post @frontoffice @reqprod | ${cases.scenario.getInvalidAuth.descOtherSessionTwoVariantWithPG}`, (done) => {
    api.postRequestProductWithProdGroup(organizationId, testData.validReqSkuWithProdGroup, 'h_vendor', (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.failedForbiddenInvalidToken.codeNumber);
      expect(response.body.code).to.equal(responseCodeAndMessage.failedForbiddenInvalidToken.codeMessageInvalidToken);
      done();
    });
  });

  it(`@neg @post @frontoffice @reqprod | ${cases.scenario.getWithoutAuth.descTwoVariantWithPG}`, (done) => {
    api.postRequestProductWithProdGroupWoAuth(organizationId, testData.validReqSkuWithProdGroup, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.failedUnauthorized.codeNumber);
      expect(response.body.code).to.equal(responseCodeAndMessage.failedUnauthorized.codeMessage);
      done();
    });
  });

  it(`@neg @post @frontoffice @reqprod | ${cases.scenario.getInvalidAuth.descInvalidSessionTwoVariant}`, (done) => {
    api.postRequestProductWithProdGroup(organizationId, testData.validReqSkuWithProdGroup, 'incorrect_token', (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.failedForbiddenInvalidToken.codeNumber);
      expect(response.body.code).to.equal(responseCodeAndMessage.failedForbiddenInvalidToken.codeMessageInvalidToken);
      done();
    });
  });

  it(`@neg @post @frontoffice @reqprod | ${cases.scenario.getBadRequest.descTier2lessTier1}`, (done) => {
    api.postRequestProductWithProdGroup(organizationId, getPreProcessData.reqProdWithProdGroupQty2LessThanQty1(), token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.failedBadRequest.codeNumber);
      expect(response.body.code).to.equal(responseCodeAndMessage.failedBadRequest.codeMessage);
      expect(response.body.message).to.equal(testData.errorMessageQtyTierOrPriceNotValid);
      done();
    });
  });

  it(`@neg @post @frontoffice @reqprod | ${cases.scenario.getBadRequest.descTier3lessTier2}`, (done) => {
    api.postRequestProductWithProdGroup(organizationId, getPreProcessData.reqProdWithProdGroupQty3LessThanQty2(), token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.failedBadRequest.codeNumber);
      expect(response.body.code).to.equal(responseCodeAndMessage.failedBadRequest.codeMessage);
      expect(response.body.message).to.equal(testData.errorMessageQtyTierOrPriceNotValid);
      done();
    });
  });

  it(`@neg @post @frontoffice @reqprod | ${cases.scenario.getBadRequest.descTier2sameTier1}`, (done) => {
    api.postRequestProductWithProdGroup(organizationId, getPreProcessData.reqProdWithProdGroupQty2EqualQty1(), token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.failedBadRequest.codeNumber);
      expect(response.body.code).to.equal(responseCodeAndMessage.failedBadRequest.codeMessage);
      expect(response.body.message).to.equal(testData.errorMessageQtyTierOrPriceNotValid);
      done();
    });
  });

  it(`@neg @post @frontoffice @reqprod | ${cases.scenario.getBadRequest.descTier3sameTier2}`, (done) => {
    api.postRequestProductWithProdGroup(organizationId, getPreProcessData.reqProdWithProdGroupQty3EqualQty2(), token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.failedBadRequest.codeNumber);
      expect(response.body.code).to.equal(responseCodeAndMessage.failedBadRequest.codeMessage);
      expect(response.body.message).to.equal(testData.errorMessageQtyTierOrPriceNotValid);
      done();
    });
  });

  it(`@neg @post @frontoffice @reqprod | ${cases.scenario.getBadRequest.descPrice2morePrice1}`, (done) => {
    api.postRequestProductWithProdGroup(organizationId, getPreProcessData.reqProdWithProdGroupPrice2MoreThanPrice1(), token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.failedBadRequest.codeNumber);
      expect(response.body.code).to.equal(responseCodeAndMessage.failedBadRequest.codeMessage);
      expect(response.body.message).to.equal(testData.errorMessageQtyTierOrPriceNotValid);
      done();
    });
  });

  it(`@neg @post @frontoffice @reqprod | ${cases.scenario.getBadRequest.descPrice3morePrice2}`, (done) => {
    api.postRequestProductWithProdGroup(organizationId, getPreProcessData.reqProdWithProdGroupPrice3MoreThanPrice2(), token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.failedBadRequest.codeNumber);
      expect(response.body.code).to.equal(responseCodeAndMessage.failedBadRequest.codeMessage);
      expect(response.body.message).to.equal(testData.errorMessageQtyTierOrPriceNotValid);
      done();
    });
  });

  it(`@neg @post @frontoffice @reqprod | ${cases.scenario.getBadRequest.descPrice2samePrice1}`, (done) => {
    api.postRequestProductWithProdGroup(organizationId, getPreProcessData.reqProdWithProdGroupPrice2EqualPrice1(), token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.failedBadRequest.codeNumber);
      expect(response.body.code).to.equal(responseCodeAndMessage.failedBadRequest.codeMessage);
      expect(response.body.message).to.equal(testData.errorMessageQtyTierOrPriceNotValid);
      done();
    });
  });

  it(`@neg @post @frontoffice @reqprod | ${cases.scenario.getBadRequest.descPrice3samePrice2}`, (done) => {
    api.postRequestProductWithProdGroup(organizationId, getPreProcessData.reqProdWithProdGroupPrice3EqualPrice2(), token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.failedBadRequest.codeNumber);
      expect(response.body.code).to.equal(responseCodeAndMessage.failedBadRequest.codeMessage);
      expect(response.body.message).to.equal(testData.errorMessageQtyTierOrPriceNotValid);
      done();
    });
  });

  it(`@neg @post @frontoffice @reqprod | ${cases.scenario.getBadRequest.emptyTier1}`, (done) => {
    api.postRequestProductWithProdGroup(organizationId, getPreProcessData.reqProdWithProdGroupEmptyQtyTier1(), token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.failedBadRequest.codeNumber);
      expect(response.body.code).to.equal(responseCodeAndMessage.failedBadRequest.codeMessage);
      expect(response.body.message).to.equal(getPreProcessData.errorMessageEmptyQtyTier(1));
      done();
    });
  });

  it(`@neg @post @frontoffice @reqprod | ${cases.scenario.getBadRequest.emptyPrice1}`, (done) => {
    api.postRequestProductWithProdGroup(organizationId, getPreProcessData.reqProdWithProdGroupEmptyPriceTier1(), token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.failedBadRequest.codeNumber);
      expect(response.body.code).to.equal(responseCodeAndMessage.failedBadRequest.codeMessage);
      expect(response.body.message).to.equal(getPreProcessData.errorMessageEmptyPriceTier(1));
      done();
    });
  });

  it(`@neg @post @frontoffice @reqprod | ${cases.scenario.getBadRequest.emptySKUVendor}`, (done) => {
    api.postRequestProductWithProdGroup(organizationId, getPreProcessData.reqProdWithProdGroupEmptySKUVendor(), token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.failedBadRequest.codeNumber);
      expect(response.body.code).to.equal(responseCodeAndMessage.failedBadRequest.codeMessage);
      expect(response.body.message).to.equal(getPreProcessData.errorMessageEmptySKUVendor());
      done();
    });
  });

  it(`@neg @post @frontoffice @reqprod | ${cases.scenario.getBadRequest.existSKUVendor}`, (done) => {
    api.postRequestProductWithProdGroup(organizationId, testData.validReqSkuWithProdGroup, token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.failedBadRequest.codeNumber);
      expect(response.body.code).to.equal(responseCodeAndMessage.failedBadRequest.codeMessage);
      expect(response.body.message).to.equal(getPreProcessData.errorMessageExistSKUVendor(testData.validReqSkuWithProdGroup.products[0].sku_vendor));
      done();
    });
  });

  it(`@neg @post @frontoffice @reqprod | ${cases.scenario.getBadRequest.invalidSKUVendor}`, (done) => {
    api.postRequestProductWithProdGroup(organizationId, getPreProcessData.reqProdWithProdGroupInvalidSKUVendor(), token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.failedBadRequest.codeNumber);
      expect(response.body.code).to.equal(responseCodeAndMessage.failedBadRequest.codeMessage);
      expect(response.body.message).to.equal(getPreProcessData.errorMessageInvalidSKUVendor());
      done();
    });
  });

  it(`@neg @post @frontoffice @reqprod | ${cases.scenario.getBadRequest.intTier1}`, (done) => {
    api.postRequestProductWithProdGroup(organizationId, getPreProcessData.reqProdWithProdGroupQtyTier1NotString(), token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.failedBadRequest.codeNumber);
      expect(response.body.code).to.equal(responseCodeAndMessage.failedBadRequest.codeMessage);
      expect(response.body.message).to.equal(getPreProcessData.errorMessageQtyTierMustString(1));
      done();
    });
  });

  it(`@neg @post @frontoffice @reqprod | ${cases.scenario.getBadRequest.intTier2}`, (done) => {
    api.postRequestProductWithProdGroup(organizationId, getPreProcessData.reqProdWithProdGroupQtyTier2NotString(), token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.failedBadRequest.codeNumber);
      expect(response.body.code).to.equal(responseCodeAndMessage.failedBadRequest.codeMessage);
      expect(response.body.message).to.equal(getPreProcessData.errorMessageQtyTierMustString(2));
      done();
    });
  });

  it(`@neg @post @frontoffice @reqprod | ${cases.scenario.getBadRequest.intTier3}`, (done) => {
    api.postRequestProductWithProdGroup(organizationId, getPreProcessData.reqProdWithProdGroupQtyTier3NotString(), token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.failedBadRequest.codeNumber);
      expect(response.body.code).to.equal(responseCodeAndMessage.failedBadRequest.codeMessage);
      expect(response.body.message).to.equal(getPreProcessData.errorMessageQtyTierMustString(3));
      done();
    });
  });

  it(`@neg @post @frontoffice @reqprod | ${cases.scenario.getBadRequest.intPrice1}`, (done) => {
    api.postRequestProductWithProdGroup(organizationId, getPreProcessData.reqProdWithProdGroupPriceTier1NotString(), token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.failedBadRequest.codeNumber);
      expect(response.body.code).to.equal(responseCodeAndMessage.failedBadRequest.codeMessage);
      expect(response.body.message).to.equal(getPreProcessData.errorMessagePriceTierMustString(1));
      done();
    });
  });

  it(`@neg @post @frontoffice @reqprod | ${cases.scenario.getBadRequest.intPrice2}`, (done) => {
    api.postRequestProductWithProdGroup(organizationId, getPreProcessData.reqProdWithProdGroupPriceTier2NotString(), token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.failedBadRequest.codeNumber);
      expect(response.body.code).to.equal(responseCodeAndMessage.failedBadRequest.codeMessage);
      expect(response.body.message).to.equal(getPreProcessData.errorMessagePriceTierMustString(2));
      done();
    });
  });

  it(`@neg @post @frontoffice @reqprod | ${cases.scenario.getBadRequest.intPrice3}`, (done) => {
    api.postRequestProductWithProdGroup(organizationId, getPreProcessData.reqProdWithProdGroupPriceTier3NotString(), token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.failedBadRequest.codeNumber);
      expect(response.body.code).to.equal(responseCodeAndMessage.failedBadRequest.codeMessage);
      expect(response.body.message).to.equal(getPreProcessData.errorMessagePriceTierMustString(3));
      done();
    });
  });

  it(`@neg @post @frontoffice @reqprod | ${cases.scenario.getNotFound.descInvalidPG}`, (done) => {
    api.postRequestProductWithProdGroup(organizationId, getPreProcessData.reqProductWithInvalidProdGroup(), token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.failedBadRequest.codeNumber);
      expect(response.body.code).to.equal(responseCodeAndMessage.failedBadRequest.codeMessage);
      expect(response.body.message).to.equal(getPreProcessData.errorMessageProdutGroupMustBePositive());
      done();
    });
  });

  it(`@happy @post @frontoffice @reqprod | ${cases.scenario.getOK.descCreateTwoVariantWithPG1Tier}`, (done) => {
    api.postRequestProductWithProdGroup(organizationId, testData.validReqSkuWithOnlyQtyTier1PriceTier1, token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.successCreated);
      expect(response.body.data).to.not.equal(0);
      expect(response.body.data.product_group_id).to.equal(testData.validReqSkuWithProdGroup.product_group_id);
      done();
    });
  });

  it(`@C11383 @happy @post @frontoffice @reqprod | ${cases.scenario.getOK.activeDecimal}`, (done) => {
    api.postRequestProductWithProdGroup(organizationId, testData.validReqSkuWithDecimal, token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.successCreated, JSON.stringify(response.body));
      done();
    });
  });

  it(`@C11380 @happy @post @frontoffice @reqprod | ${cases.scenario.getOK.activateIndent}`, (done) => {
    api.postRequestProductWithProdGroup(organizationId, testData.validReqSkuWithIndent, token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.successCreated, JSON.stringify(response.body));
      done();
    });
  });

  it(`@C11381 @happy @post @frontoffice @reqprod | ${cases.scenario.getOK.activeDP}`, (done) => {
    api.postRequestProductWithProdGroup(organizationId, testData.validReqSkuWithDP, token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.successCreated, JSON.stringify(response.body));
      done();
    });
  });

  it(`@C11382 @neg @post @frontoffice @reqprod | ${cases.scenario.getOK.nonactiveIndentAndActiveDP}`, (done) => {
    api.postRequestProductWithProdGroup(organizationId, testData.activeDPNonactiveIndent, token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.successCreated);
      done();
    });
  });

  it(`@C11393 @happy @post @frontoffice @reqprod | ${cases.scenario.getOK.nonactiveDecimal}`, (done) => {
    api.postRequestProductWithProdGroup(organizationId, testData.nonactiveDecimal, token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.successCreated, JSON.stringify(response.body));
      done();
    });
  });

  it(`@C11394 @happy @post @frontoffice @reqprod | ${cases.scenario.getOK.nonActiveIndent}`, (done) => {
    api.postRequestProductWithProdGroup(organizationId, testData.nonActiveIndent, token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.successCreated, JSON.stringify(response.body));
      done();
    });
  });

  it(`@C11395 @happy @post @frontoffice @reqprod | ${cases.scenario.getOK.nonactiveDP}`, (done) => {
    api.postRequestProductWithProdGroup(organizationId, testData.nonactiveDP, token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.successCreated, JSON.stringify(response.body));
      done();
    });
  });

  it(`@C11396 @happy @post @frontoffice @reqprod | ${cases.scenario.getOK.nonactiveIndentAndNonactiveDP}`, (done) => {
    api.postRequestProductWithProdGroup(organizationId, testData.nonactiveIndentAndNonactiveDP, token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.successCreated, JSON.stringify(response.body));
      done();
    });
  });

  it(`@C11592 @neg @post @frontoffice @reqprod | ${cases.scenario.getBadRequest.invalidPercentageDP}`, (done) => {
    api.postRequestProductWithProdGroup(organizationId, getPreProcessData.reqProdWithProdGroupInvalidPercentageDP(), token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.failedBadRequest.codeNumber, JSON.stringify(response.body));
      expect(response.body.code).to.equal(responseCodeAndMessage.failedBadRequest.codeMessage);
      expect(response.body.message).to.equal(getPreProcessData.errorMessageInvalidPercentageDP(testData.validReqSkuWithProdGroup.products[0].sku_vendor));
      done();
    });
  });

  it(`@C11593 @neg @post @frontoffice @reqprod | ${cases.scenario.getBadRequest.invalidNominalDP}`, (done) => {
    api.postRequestProductWithProdGroup(organizationId, getPreProcessData.reqProdWithProdGroupInvalidNominalDP(), token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.failedBadRequest.codeNumber, JSON.stringify(response.body));
      expect(response.body.code).to.equal(responseCodeAndMessage.failedBadRequest.codeMessage);
      expect(response.body.message).to.equal(getPreProcessData.errorMessageInvalidNominalDP(testData.validReqSkuWithProdGroup.products[0].sku_vendor, testData.validReqSkuWithProdGroup.products[0].tier_cogs_price_3));
      done();
    });
  });

  it(`@C11594 @neg @post @frontoffice @reqprod | ${cases.scenario.getBadRequest.invalidIndentLimit}`, (done) => {
    api.postRequestProductWithProdGroup(organizationId, getPreProcessData.reqProdWithProdGroupInvalidIndenLimit(), token, (response) => {
      expect(response.status).to.equal(responseCodeAndMessage.failedBadRequest.codeNumber, JSON.stringify(response.body));
      expect(response.body.code).to.equal(responseCodeAndMessage.failedBadRequest.codeMessage);
      expect(response.body.message).to.equal(getPreProcessData.errorMessageInvalidIndentLimit(testData.validReqSkuWithProdGroup.products[0].sku_vendor));
      done();
    });
  });
});
