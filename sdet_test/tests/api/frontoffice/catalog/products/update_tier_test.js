
/* eslint no-unused-expressions: off */
/* eslint prefer-destructuring:off */

const { expect } = require('chai');
const common = require('./../../../../helper/common.js');
const global = require('./../../../../helper/global.js');
const detailTestData = require('./../../../../helper/frontoffice/update_tier_data.json');
const detailSchema = require('./../../../../helper/schema/frontoffice/catalog/products/update_tier_schema.json');
const api = require('./../../../../page-objects/api/frontoffice/catalog/products/update_tier.js');
const cases = require('./../../../../testcases/frontoffice/catalog/products/update_tiers_testcase.js');
const userCredential = require('../../../../helper/userCredential.json');
const testData = require('./../../../../helper/testDataUpdateTier');

describe('Product List Update Price and Qty', () => {
  let token;
  const skuIdProductVendor = testData.skuIdProductVendor;
  const otherSkuIdProductVendor = testData.otherSkuIdProductVendor;
  const invalidSkuIdProductVendor = testData.invalidSkuIdProductVendor;
  const vendorID = common.vendor_list('h_vendor');
  const invalidVendorID = common.vendor_list('invalid_vendor');
  const nfoundVendorID = common.vendor_list('notfound_vendor');
  const emptyVendorID = common.vendor_list('empty_vendor');
  const otherVendorID = common.vendor_list('ildav_vendor');

  before(async () => {
    const response = await common.getTokenFo(userCredential.vendor.hvendor);
    token = response.body.seller.token;
  });

  it(`@happy @put @frontoffice @products @updTier | ${cases.scenario.getOK.descPrice1}`, (done) => {
    api.updateTiers(vendorID, skuIdProductVendor, detailTestData.updateTierPrice, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getOK.response);
      expect(response.body.data.tier_min_qty_1).to.equal(detailTestData.updateTierPrice.tier_min_qty_1);
      expect(response.body.data.tier_min_qty_2).to.equal(detailTestData.updateTierPrice.tier_min_qty_2);
      expect(response.body.data.tier_min_qty_3).to.equal(detailTestData.updateTierPrice.tier_min_qty_3);
      expect(parseInt(response.body.data.tier_cogs_price_1, 10)).to.equal(detailTestData.updateTierPrice.tier_cogs_price_1);
      expect(parseInt(response.body.data.tier_cogs_price_2, 10)).to.equal(detailTestData.updateTierPrice.tier_cogs_price_2);
      expect(parseInt(response.body.data.tier_cogs_price_3, 10)).to.equal(detailTestData.updateTierPrice.tier_cogs_price_3);
      expect(response.body.data.id).to.equal(skuIdProductVendor);
      expect(response.body.data.vendor_id).to.equal(vendorID);
      expect(response.body.data).to.be.jsonSchema(detailSchema.updTierResponse);
      done();
    });
  });

  it(`@happy @put @frontoffice @products @updTier | ${cases.scenario.getOK.descPrice1Twice}`, (done) => {
    api.updateTiers(vendorID, skuIdProductVendor, detailTestData.descPrice1Twice, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getOK.response);
      expect(response.body.data.tier_min_qty_1).to.equal(detailTestData.descPrice1Twice.tier_min_qty_1);
      expect(response.body.data.tier_min_qty_2).to.equal(detailTestData.descPrice1Twice.tier_min_qty_2);
      expect(response.body.data.tier_min_qty_3).to.equal(detailTestData.descPrice1Twice.tier_min_qty_3);
      expect(parseInt(response.body.data.tier_cogs_price_1, 10)).to.equal(detailTestData.descPrice1Twice.tier_cogs_price_1);
      expect(parseInt(response.body.data.tier_cogs_price_2, 10)).to.equal(detailTestData.descPrice1Twice.tier_cogs_price_2);
      expect(parseInt(response.body.data.tier_cogs_price_3, 10)).to.equal(detailTestData.descPrice1Twice.tier_cogs_price_3);
      expect(response.body.data.id).to.equal(skuIdProductVendor);
      expect(response.body.data.vendor_id).to.equal(vendorID);
      expect(response.body.data).to.be.jsonSchema(detailSchema.updTierResponse);
      done();
    });
  });

  it(`@happy @put @frontoffice @products @updTier | ${cases.scenario.getOK.updateInto1Tier}`, (done) => {
    api.updateTiers(vendorID, skuIdProductVendor, detailTestData.updateInto1Tier, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getOK.response);
      expect(response.body.data.tier_min_qty_1).to.equal(detailTestData.updateInto1Tier.tier_min_qty_1);
      expect(response.body.data.tier_min_qty_2).to.be.null;
      expect(response.body.data.tier_min_qty_3).to.be.null;
      expect(parseInt(response.body.data.tier_cogs_price_1, 10)).to.equal(detailTestData.updateInto1Tier.tier_cogs_price_1);
      expect(response.body.data.tier_cogs_price_2).to.be.null;
      expect(response.body.data.tier_cogs_price_3).to.be.null;
      expect(response.body.data.id).to.equal(skuIdProductVendor);
      expect(response.body.data.vendor_id).to.equal(vendorID);
      expect(response.body.data).to.be.jsonSchema(detailSchema.updTierResponse);
      done();
    });
  });

  it(`@happy @put @frontoffice @products @updTier | ${cases.scenario.getOK.updateInto2Tier}`, (done) => {
    api.updateTiers(vendorID, skuIdProductVendor, detailTestData.updateInto2Tier, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getOK.response);
      expect(response.body.data.tier_min_qty_1).to.equal(detailTestData.updateInto2Tier.tier_min_qty_1);
      expect(response.body.data.tier_min_qty_2).to.equal(detailTestData.updateInto2Tier.tier_min_qty_2);
      expect(response.body.data.tier_min_qty_3).to.be.null;
      expect(parseInt(response.body.data.tier_cogs_price_1, 10)).to.equal(detailTestData.updateInto2Tier.tier_cogs_price_1);
      expect(parseInt(response.body.data.tier_cogs_price_2, 10)).to.equal(detailTestData.updateInto2Tier.tier_cogs_price_2);
      expect(response.body.data.tier_cogs_price_3).to.be.null;
      expect(response.body.data.id).to.equal(skuIdProductVendor);
      expect(response.body.data.vendor_id).to.equal(vendorID);
      expect(response.body.data).to.be.jsonSchema(detailSchema.updTierResponse);
      done();
    });
  });

  it(`@happy @put @frontoffice @products @updTier | ${cases.scenario.getOK.descPrice2}`, (done) => {
    api.updateTiers(vendorID, skuIdProductVendor, detailTestData.descPrice2, token, (response) => {
      expect(response.body.data.tier_min_qty_1).to.equal(detailTestData.descPrice2.tier_min_qty_1);
      expect(response.body.data.tier_min_qty_2).to.equal(detailTestData.descPrice2.tier_min_qty_2);
      expect(response.body.data.tier_min_qty_3).to.be.null;
      expect(parseInt(response.body.data.tier_cogs_price_1, 10)).to.equal(detailTestData.descPrice2.tier_cogs_price_1);
      expect(parseInt(response.body.data.tier_cogs_price_2, 10)).to.equal(detailTestData.descPrice2.tier_cogs_price_2);
      expect(response.body.data.tier_cogs_price_3).to.be.null;
      expect(response.body.data.id).to.equal(skuIdProductVendor);
      expect(response.body.data.vendor_id).to.equal(vendorID);
      expect(response.body.data).to.be.jsonSchema(detailSchema.updTierResponse);
      done();
    });
  });

  it(`@happy @put @frontoffice @products @updTier | ${cases.scenario.getOK.descPrice2Twice}`, (done) => {
    api.updateTiers(vendorID, skuIdProductVendor, detailTestData.descPrice2Twice, token, (response) => {
      expect(response.body.data.tier_min_qty_1).to.equal(detailTestData.descPrice2Twice.tier_min_qty_1);
      expect(response.body.data.tier_min_qty_2).to.equal(detailTestData.descPrice2Twice.tier_min_qty_2);
      expect(response.body.data.tier_min_qty_3).to.be.null;
      expect(parseInt(response.body.data.tier_cogs_price_1, 10)).to.equal(detailTestData.descPrice2Twice.tier_cogs_price_1);
      expect(parseInt(response.body.data.tier_cogs_price_2, 10)).to.equal(detailTestData.descPrice2Twice.tier_cogs_price_2);
      expect(response.body.data.tier_cogs_price_3).to.be.null;
      expect(response.body.data.id).to.equal(skuIdProductVendor);
      expect(response.body.data.vendor_id).to.equal(vendorID);
      expect(response.body.data).to.be.jsonSchema(detailSchema.updTierResponse);
      done();
    });
  });

  it(`@happy @put @frontoffice @products @updTier | ${cases.scenario.getOK.descPrice3}`, (done) => {
    api.updateTiers(vendorID, skuIdProductVendor, detailTestData.descPrice3, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getOK.response);
      expect(parseInt(response.body.data.tier_cogs_price_3, 10)).to.equal(detailTestData.descPrice3.tier_cogs_price_3);
      expect(response.body.data.id).to.equal(skuIdProductVendor);
      expect(response.body.data.vendor_id).to.equal(vendorID);
      expect(response.body.data).to.be.jsonSchema(detailSchema.updTierResponse);
      done();
    });
  });

  it(`@happy @put @frontoffice @products @updTier | ${cases.scenario.getOK.descPrice3Twice}`, (done) => {
    api.updateTiers(vendorID, skuIdProductVendor, detailTestData.descPrice3Twice, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getOK.response);
      expect(parseInt(response.body.data.tier_cogs_price_3, 10)).to.equal(detailTestData.descPrice3Twice.tier_cogs_price_3);
      expect(response.body.data.id).to.equal(skuIdProductVendor);
      expect(response.body.data.vendor_id).to.equal(vendorID);
      expect(response.body.data).to.be.jsonSchema(detailSchema.updTierResponse);
      done();
    });
  });

  it(`@happy @put @frontoffice @products @updTier | ${cases.scenario.getOK.descTier1}`, (done) => {
    api.updateTiers(vendorID, skuIdProductVendor, detailTestData.descTier1, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getOK.response);
      expect(response.body.data.tier_min_qty_1).to.equal(detailTestData.descTier1.tier_min_qty_1);
      expect(response.body.data.id).to.equal(skuIdProductVendor);
      expect(response.body.data.vendor_id).to.equal(vendorID);
      expect(response.body.data).to.be.jsonSchema(detailSchema.updTierResponse);
      done();
    });
  });

  it(`@happy @put @frontoffice @products @updTier | ${cases.scenario.getOK.descTier1Twice}`, (done) => {
    api.updateTiers(vendorID, skuIdProductVendor, detailTestData.descTier1Twice, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getOK.response);
      expect(response.body.data.tier_min_qty_1).to.equal(2);
      expect(response.body.data.id).to.equal(skuIdProductVendor);
      expect(response.body.data.vendor_id).to.equal(vendorID);
      expect(response.body.data).to.be.jsonSchema(detailSchema.updTierResponse);
      done();
    });
  });

  it(`@happy @put @frontoffice @products @updTier | ${cases.scenario.getOK.descTier2}`, (done) => {
    api.updateTiers(vendorID, skuIdProductVendor, detailTestData.descTier2, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getOK.response);
      expect(response.body.data.tier_min_qty_2).to.equal(detailTestData.descTier2.tier_min_qty_2);
      expect(response.body.data.id).to.equal(skuIdProductVendor);
      expect(response.body.data.vendor_id).to.equal(vendorID);
      expect(response.body.data).to.be.jsonSchema(detailSchema.updTierResponse);
      done();
    });
  });

  it(`@happy @put @frontoffice @products @updTier | ${cases.scenario.getOK.descTier2Twice}`, (done) => {
    api.updateTiers(vendorID, skuIdProductVendor, detailTestData.descTier2Twice, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getOK.response);
      expect(response.body.data.tier_min_qty_2).to.equal(detailTestData.descTier2Twice.tier_min_qty_2);
      expect(response.body.data.id).to.equal(skuIdProductVendor);
      expect(response.body.data.vendor_id).to.equal(vendorID);
      expect(response.body.data).to.be.jsonSchema(detailSchema.updTierResponse);
      done();
    });
  });

  it(`@happy @put @frontoffice @products @updTier | ${cases.scenario.getOK.descTier3}`, (done) => {
    api.updateTiers(vendorID, skuIdProductVendor, detailTestData.descTier3, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getOK.response);
      expect(response.body.data.tier_min_qty_3).to.equal(detailTestData.descTier3.tier_min_qty_3);
      expect(response.body.data.id).to.equal(skuIdProductVendor);
      expect(response.body.data.vendor_id).to.equal(vendorID);
      expect(response.body.data).to.be.jsonSchema(detailSchema.updTierResponse);
      done();
    });
  });

  it(`@happy @put @frontoffice @products @updTier | ${cases.scenario.getOK.descTier3Twice}`, (done) => {
    api.updateTiers(vendorID, skuIdProductVendor, detailTestData.descTier3Twice, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getOK.response);
      expect(response.body.data.tier_min_qty_3).to.equal(detailTestData.descTier3Twice.tier_min_qty_3);
      expect(response.body.data.id).to.equal(skuIdProductVendor);
      expect(response.body.data.vendor_id).to.equal(vendorID);
      expect(response.body.data).to.be.jsonSchema(detailSchema.updTierResponse);
      done();
    });
  });


  it(`@neg @put @frontoffice @products @updTier | ${cases.scenario.getBadRequest.descTier2lessTier1}`, (done) => {
    api.updateTiers(vendorID, skuIdProductVendor, detailTestData.descTier2lessTier1, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getBadRequest.response);
      expect(response.body.code).to.equal(global.codes.badRequest);
      done();
    });
  });

  it(`@neg @put @frontoffice @products @updTier | ${cases.scenario.getBadRequest.descTier3lessTier2}`, (done) => {
    api.updateTiers(vendorID, skuIdProductVendor, detailTestData.descTier3lessTier2, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getBadRequest.response);
      expect(response.body.code).to.equal(global.codes.badRequest);
      done();
    });
  });

  it(`@neg @put @frontoffice @products @updTier | ${cases.scenario.getBadRequest.descTier2sameTier1}`, (done) => {
    api.updateTiers(vendorID, skuIdProductVendor, detailTestData.descTier2sameTier1, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getBadRequest.response);
      expect(response.body.code).to.equal(global.codes.badRequest);
      done();
    });
  });

  it(`@neg @put @frontoffice @products @updTier | ${cases.scenario.getBadRequest.descTier3sameTier2}`, (done) => {
    api.updateTiers(vendorID, skuIdProductVendor, detailTestData.descTier3sameTier2, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getBadRequest.response);
      expect(response.body.code).to.equal(global.codes.badRequest);
      done();
    });
  });

  it(`@neg @put @frontoffice @products @updTier | ${cases.scenario.getBadRequest.descPrice2morePrice1}`, (done) => {
    api.updateTiers(vendorID, skuIdProductVendor, detailTestData.descPrice2morePrice1, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getBadRequest.response);
      expect(response.body.code).to.equal(global.codes.badRequest);
      done();
    });
  });

  it(`@neg @put @frontoffice @products @updTier | ${cases.scenario.getBadRequest.descPrice3morePrice2}`, (done) => {
    api.updateTiers(vendorID, skuIdProductVendor, detailTestData.descPrice3morePrice2, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getBadRequest.response);
      expect(response.body.code).to.equal(global.codes.badRequest);
      done();
    });
  });

  it(`@neg @put @frontoffice @products @updTier | ${cases.scenario.getBadRequest.descPrice2samePrice1}`, (done) => {
    api.updateTiers(vendorID, skuIdProductVendor, detailTestData.descPrice2samePrice1, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getBadRequest.response);
      expect(response.body.code).to.equal(global.codes.badRequest);
      done();
    });
  });

  it(`@neg @put @frontoffice @products @updTier | ${cases.scenario.getBadRequest.descPrice3samePrice2}`, (done) => {
    api.updateTiers(vendorID, skuIdProductVendor, detailTestData.descPrice3samePrice2, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getBadRequest.response);
      expect(response.body.code).to.equal(global.codes.badRequest);
      done();
    });
  });

  it(`@neg @put @frontoffice @products @updTier | ${cases.scenario.getBadRequest.emptyTier1}`, (done) => {
    api.updateTiers(vendorID, skuIdProductVendor, detailTestData.emptyTier1, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getBadRequest.response);
      expect(response.body.code).to.equal(global.codes.badRequest);
      done();
    });
  });

  it(`@neg @put @frontoffice @products @updTier | ${cases.scenario.getBadRequest.emptyTier2}`, (done) => {
    api.updateTiers(vendorID, skuIdProductVendor, detailTestData.emptyTier2, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getBadRequest.response);
      expect(response.body.code).to.equal(global.codes.badRequest);
      done();
    });
  });

  it(`@neg @put @frontoffice @products @updTier | ${cases.scenario.getBadRequest.emptyTier3}`, (done) => {
    api.updateTiers(vendorID, skuIdProductVendor, detailTestData.emptyTier3, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getBadRequest.response);
      expect(response.body.code).to.equal(global.codes.badRequest);
      done();
    });
  });

  it(`@neg @put @frontoffice @products @updTier | ${cases.scenario.getBadRequest.emptyPrice1}`, (done) => {
    api.updateTiers(vendorID, skuIdProductVendor, detailTestData.emptyPrice1, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getBadRequest.response);
      expect(response.body.code).to.equal(global.codes.badRequest);
      done();
    });
  });

  it(`@neg @put @frontoffice @products @updTier | ${cases.scenario.getBadRequest.emptyPrice2}`, (done) => {
    api.updateTiers(vendorID, skuIdProductVendor, detailTestData.emptyPrice2, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getBadRequest.response);
      expect(response.body.code).to.equal(global.codes.badRequest);
      done();
    });
  });

  it(`@neg @put @frontoffice @products @updTier | ${cases.scenario.getBadRequest.emptyPrice3}`, (done) => {
    api.updateTiers(vendorID, skuIdProductVendor, detailTestData.emptyPrice3, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getBadRequest.response);
      expect(response.body.code).to.equal(global.codes.badRequest);
      done();
    });
  });

  it(`@neg @put @frontoffice @products @updTier | ${cases.scenario.getBadRequest.stringTier1}`, (done) => {
    api.updateTiers(vendorID, skuIdProductVendor, detailTestData.stringTier1, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getBadRequest.response);
      expect(response.body.code).to.equal(global.codes.badRequest);
      done();
    });
  });

  it(`@neg @put @frontoffice @products @updTier | ${cases.scenario.getBadRequest.stringTier2}`, (done) => {
    api.updateTiers(vendorID, skuIdProductVendor, detailTestData.stringTier2, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getBadRequest.response);
      expect(response.body.code).to.equal(global.codes.badRequest);
      done();
    });
  });

  it(`@neg @put @frontoffice @products @updTier | ${cases.scenario.getBadRequest.stringTier3}`, (done) => {
    api.updateTiers(vendorID, skuIdProductVendor, detailTestData.stringTier3, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getBadRequest.response);
      expect(response.body.code).to.equal(global.codes.badRequest);
      done();
    });
  });

  it(`@neg @put @frontoffice @products @updTier | ${cases.scenario.getBadRequest.stringPrice1}`, (done) => {
    api.updateTiers(vendorID, skuIdProductVendor, detailTestData.stringPrice1, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getBadRequest.response);
      expect(response.body.code).to.equal(global.codes.badRequest);
      done();
    });
  });

  it(`@neg @put @frontoffice @products @updTier | ${cases.scenario.getBadRequest.stringPrice2}`, (done) => {
    api.updateTiers(vendorID, skuIdProductVendor, detailTestData.stringPrice2, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getBadRequest.response);
      expect(response.body.code).to.equal(global.codes.badRequest);
      done();
    });
  });

  it(`@neg @put @frontoffice @products @updTier | ${cases.scenario.getBadRequest.stringPrice3}`, (done) => {
    api.updateTiers(vendorID, skuIdProductVendor, detailTestData.stringPrice3, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getBadRequest.response);
      expect(response.body.code).to.equal(global.codes.badRequest);
      done();
    });
  });

  it(`@neg @put @frontoffice @products @updTier | ${cases.scenario.getForbidden.desc}`, (done) => {
    api.updateTiers(otherVendorID, skuIdProductVendor, detailTestData.descTier3Twice, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getForbidden.response);
      expect(response.body.code).to.equal(global.codes.forbidden);
      done();
    });
  });

  it(`@neg @put @frontoffice @products @updTier | ${cases.scenario.getForbidden.descOther}`, (done) => {
    api.updateTiers(otherVendorID, otherSkuIdProductVendor, detailTestData.descTier3Twice, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getForbidden.response);
      expect(response.body.code).to.equal(global.codes.forbidden);
      done();
    });
  });

  it(`@neg @put @frontoffice @products @updTier | ${cases.scenario.getNotFound.descOther}`, (done) => {
    api.updateTiers(vendorID, otherSkuIdProductVendor, detailTestData.descTier3Twice, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getNotFound.response);
      expect(response.body.code).to.equal(global.codes.notFound);
      done();
    });
  });

  it(`@neg @put @frontoffice @products @updTier | ${cases.scenario.getNotFound.descInvalid}`, (done) => {
    api.updateTiers(vendorID, invalidSkuIdProductVendor, detailTestData.descTier3Twice, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getNotFound.response);
      expect(response.body.code).to.equal(global.codes.notFound);
      done();
    });
  });

  it(`@neg @put @frontoffice @products @updTier | ${cases.scenario.getForbidden.descOtherSession}`, (done) => {
    api.updateTiers(vendorID, skuIdProductVendor, detailTestData.descTier3Twice, 'incorrect_token', (response) => {
      expect(response.status).to.equal(cases.scenario.getForbidden.response);
      expect(response.body.code).to.equal(global.codes.invalidToken);
      done();
    });
  });

  it(`@neg @put @frontoffice @products @updTier | ${cases.scenario.getForbidden.descOtherSession}`, (done) => {
    api.updTiersNOAuth(vendorID, skuIdProductVendor, detailTestData.descTier3Twice, (response) => {
      expect(response.status).to.equal(cases.scenario.getForbidden.responseUnAuth);
      expect(response.body.code).to.equal(global.codes.unauthorized);
      done();
    });
  });

  it(`@neg @put @frontoffice @products @updTier | ${cases.scenario.getBadRequest.tier1WithoutPrice1}`, (done) => {
    api.updateTiers(vendorID, skuIdProductVendor, detailTestData.tier1WithoutPrice1, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getBadRequest.response);
      expect(response.body.code).to.equal(global.codes.badRequest);
      done();
    });
  });

  it(`@neg @put @frontoffice @products @updTier | ${cases.scenario.getBadRequest.tier2WithoutPrice2}`, (done) => {
    api.updateTiers(vendorID, skuIdProductVendor, detailTestData.tier2WithoutPrice2, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getBadRequest.response);
      expect(response.body.code).to.equal(global.codes.badRequest);
      done();
    });
  });

  it(`@neg @put @frontoffice @products @updTier | ${cases.scenario.getBadRequest.tier3WithoutPrice3}`, (done) => {
    api.updateTiers(vendorID, skuIdProductVendor, detailTestData.tier3WithoutPrice3, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getBadRequest.response);
      expect(response.body.code).to.equal(global.codes.badRequest);
      done();
    });
  });

  it(`@neg @put @frontoffice @products @updTier | ${cases.scenario.getBadRequest.price1WithoutTier1}`, (done) => {
    api.updateTiers(vendorID, skuIdProductVendor, detailTestData.price1WithoutTier1, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getBadRequest.response);
      expect(response.body.code).to.equal(global.codes.badRequest);
      done();
    });
  });

  it(`@neg @put @frontoffice @products @updTier | ${cases.scenario.getBadRequest.price2WithoutTier2}`, (done) => {
    api.updateTiers(vendorID, skuIdProductVendor, detailTestData.price2WithoutTier2, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getBadRequest.response);
      expect(response.body.code).to.equal(global.codes.badRequest);
      done();
    });
  });

  it(`@neg @put @frontoffice @products @updTier | ${cases.scenario.getBadRequest.price3WithoutTier3}`, (done) => {
    api.updateTiers(vendorID, skuIdProductVendor, detailTestData.price3WithoutTier3, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getBadRequest.response);
      expect(response.body.code).to.equal(global.codes.badRequest);
      done();
    });
  });

  it(`@neg @put @frontoffice @products @updTier | ${cases.scenario.getBadRequest.price3WithoutTier3}`, (done) => {
    api.updateTiers(invalidVendorID, skuIdProductVendor, detailTestData.price3WithoutTier3, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getInvalidAuth.response);
      expect(response.body.code).to.equal(global.codes.forbidden);
      done();
    });
  });

  it(`@neg @put @frontoffice @products @updTier | ${cases.scenario.getBadRequest.price3WithoutTier3}`, (done) => {
    api.updateTiers(nfoundVendorID, skuIdProductVendor, detailTestData.price3WithoutTier3, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getForbidden.response);
      expect(response.body.code).to.equal(global.codes.forbidden);
      done();
    });
  });

  it(`@neg @put @frontoffice @products @updTier | ${cases.scenario.getBadRequest.price3WithoutTier3}`, (done) => {
    api.updateTiers(emptyVendorID, skuIdProductVendor, detailTestData.price3WithoutTier3, token, (response) => {
      expect(response.status).to.equal(cases.scenario.getForbidden.response);
      expect(response.body.code).to.equal(global.codes.forbidden);
      done();
    });
  });
});
