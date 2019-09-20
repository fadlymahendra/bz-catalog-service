
/* eslint prefer-destructuring: off */

const { expect } = require('chai');
const chai = require('chai');
chai.use(require('chai-json-schema'));
const priceEngineApi = require('../../../page-objects/api/search_engine/price_engine/price_engine.js');
const catalogVendorStatuApi = require('../../../page-objects/api/frontoffice/catalog/vendor/product_vendor.js');
const responseMessageCode = require('../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../helper/userCredential.json');
const common = require('../../../helper/common.js');
const testData = require('../../../helper/search_engine/price_engine/price_engine_test_data.json');
const testDataAgreement = require('../../../helper/search_engine/price_engine/agreement_test_data.json');
const testDataListProduct = require('../../../helper/search_engine/price_engine/catalog_vendor_test_data.json');
const schemaAssertion = require('../../../helper/schema/search_engine/price_engine/price_engine_schema.json');

const scenarioQRSKUPriceFr = {
  describe: 'As a QR Customer, I able to see my SKU price when my SKU in my Franco Contract',
  postPe: 'should check price engine calculation based on my TOP and other parameters',
  postPeShipping: 'should check price engine shipping calculation base on my Franco contract',
  postShippingLocation: 'should check shipping location based on my contract',
};

const scenarioQRSKUPriceVHubOutFr = {
  describe: 'As a QR Customer, I able to see my SKU price when Vendor Hub outside my Franco Contract',
  postPe: 'should check price engine calculation based on my TOP and other parameters',
  postPeShipping: 'should check price engine shipping calculation base on my Franco contract',
  postShippingLocation: 'should check shipping location based on my contract',
};

const scenarioQRSKUPriceOutFr = {
  describe: 'As a QR Customer, I able to see my SKU price when my SKU outside my Franco Contract',
  postPe: 'should check price engine calculation based on my TOP and other parameters',
};

const scenarioQRSKUPriceLoco = {
  describe: 'As a QR Customer, I able to see my SKU price when my SKU in my Loco Contract',
  postPe: 'should check price base on my Loco contract from all vendors',
};

const scenarioQRSKUPriceOutLoco = {
  describe: 'As a QR Customer, I able to see my SKU price when my SKU outside my Loco Contract',
  postPe: 'should check price engine calculation based on my TOP and other parameters from vendors 1',
  postPe2: 'should check price engine calculation based on my TOP and other parameters from vendors 2',
};

const scenarioQRUpdSKUPriceVDisable = {
  describe: 'As a QR Customer, I able to see the updated SKU price when Vendor disable their products',
  postPeDisableVendorSku: 'should check price engine calculation based on my TOP and other parameters from active vendor only',
};

const scenarioQRUpdSKUPriceVChangeSRP = {
  describe: 'As a QR Customer, I able to see the updated SKU price when Vendor change their SRP',
  postPe: 'should post price engine data after vendor update price',
  postPeCalculation: 'should check price engine calculation based on my TOP and other parameters',
};

const scenarioQRVUpdMultiTOSingle = {
  describe: 'As a QR Customer, I able to see the updated tier after my vendor update multi to single tier',
  postPe: 'should check price engine calculation based on my TOP and other parameters from vendor',
};
// add @skip for QR schema
describe(`@skip ${scenarioQRSKUPriceFr.describe}`, () => {
  let token;
  let respondPe;

  before(async () => {
    const userToLogin = userCredential.customer.djQrStaging;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.token;
    const bodyPriceEngine = testData.bodyPostPeIphoneVendor22;
    respondPe = await priceEngineApi.postPriceEngine(bodyPriceEngine, token);
    expect(respondPe.status).to.equal(responseMessageCode.successOk);
    expect(respondPe.body[0].shipping).to.have.lengthOf(1);
    expect(respondPe.body[0].is_franco).to.equal(1);
    expect(respondPe.body).to.be.jsonSchema(schemaAssertion.fullTierDataSingleTierShipping);
  });

  it(`@happy ${scenarioQRSKUPriceFr.postPe}`, async () => {
    const pe = respondPe.body[0].tier_data;
    const priceVendor = testDataListProduct.iphoneVendor22;
    const peParams = testData.priceEngineParams;
    peParams.adjustment.topC = testDataAgreement.agreementCustomerDjqrToBizzy.top_rule[0].top_days;
    peParams.adjustment.topV = testDataAgreement.agreementVendor22ToBizzy.top_rule[0].top_days;
    peParams.margin.bm = testDataAgreement.basicMargin.category_mobiles;
    peParams.margin.rebate = testDataAgreement.agreementCustomerDjqrToBizzy.rebate_rule[0].percentage;
    const price1 = priceEngineApi.priceEngineFormula(peParams, priceVendor.tier_cogs_price_1);
    const price2 = priceEngineApi.priceEngineFormula(peParams, priceVendor.tier_cogs_price_2);
    const price3 = priceEngineApi.priceEngineFormula(peParams, priceVendor.tier_cogs_price_3);
    expect(pe.tier_min_qty_1).to.equal(priceVendor.tier_min_qty_1);
    expect(pe.tier_min_qty_2).to.equal(priceVendor.tier_min_qty_2);
    expect(pe.tier_min_qty_3).to.equal(priceVendor.tier_min_qty_3);
    expect(pe.tier_price_1).to.equal(price1);
    expect(pe.tier_price_2).to.equal(price2);
    expect(pe.tier_price_3).to.equal(price3);
  });

  it(`@happy ${scenarioQRSKUPriceFr.postPeShipping}`, async () => {
    const peShipping = respondPe.body[0].shipping[0].tier_data;
    const priceRules = testDataAgreement.agreementCustomerDjqrToBizzy.price_rule[0].price_rule_items[0];
    const price1 = priceEngineApi.priceDiscountFormula(priceRules.tier_discount_1_type, priceRules.base_price_tier_1, priceRules.tier_discount_1);
    expect(peShipping.tier_min_qty_1).to.equal(priceRules.min_tier_1);
    expect(peShipping.tier_price_1).to.equal(price1);
    expect(peShipping).to.not.have.property('tier_min_qty_2');
    expect(peShipping).to.not.have.property('tier_min_qty_3');
    expect(peShipping).to.not.have.property('tier_price_2');
    expect(peShipping).to.not.have.property('tier_price_3');
  });

  it(`@happy ${scenarioQRSKUPriceFr.postShippingLocation}`, async () => {
    const shippingTo = respondPe.body[0].shipping[0].to;
    const shippingFrom = respondPe.body[0].shipping[0].from;
    const shipingRules = testDataAgreement.agreementCustomerDjqrToBizzy.shipping_rule[0];
    expect(shippingTo).to.equal(shipingRules.shipping_geograph[0].geograph);
    expect(shippingFrom).to.equal(shipingRules.shipping_hub[0].hub);
  });
});
// add @skip for QR schema
describe(`@skip ${scenarioQRSKUPriceVHubOutFr.describe}`, () => {
  let token;
  let respondPe;

  before(async () => {
    const userToLogin = userCredential.customer.djQrStaging;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.token;
    const bodyPriceEngine = testData.bodyPostPeIphoneVendor31;
    respondPe = await priceEngineApi.postPriceEngine(bodyPriceEngine, token);
    expect(respondPe.status).to.equal(responseMessageCode.successOk);
    expect(respondPe.body[0].shipping).to.have.lengthOf(1);
    expect(respondPe.body[0].is_franco).to.equal(1);
    expect(respondPe.body).to.be.jsonSchema(schemaAssertion.fullTierDataSingleTierShipping);
  });

  it(`@happy ${scenarioQRSKUPriceVHubOutFr.postPe}`, async () => {
    const pe = respondPe.body[0].tier_data;
    const priceVendor = testDataListProduct.iphoneVendor31;
    const peParams = testData.priceEngineParams;
    peParams.adjustment.topC = testDataAgreement.agreementCustomerDjqrToBizzy.top_rule[0].top_days;
    peParams.adjustment.topV = testDataAgreement.agreementVendor33ToBizzy.top_rule[0].top_days;
    peParams.margin.bm = testDataAgreement.basicMargin.category_mobiles;
    peParams.margin.rebate = testDataAgreement.agreementCustomerDjqrToBizzy.rebate_rule[0].percentage;
    const price1 = priceEngineApi.priceEngineFormula(peParams, priceVendor.tier_cogs_price_1);
    const price2 = priceEngineApi.priceEngineFormula(peParams, priceVendor.tier_cogs_price_2);
    const price3 = priceEngineApi.priceEngineFormula(peParams, priceVendor.tier_cogs_price_3);
    expect(pe.tier_min_qty_1).to.equal(priceVendor.tier_min_qty_1);
    expect(pe.tier_min_qty_2).to.equal(priceVendor.tier_min_qty_2);
    expect(pe.tier_min_qty_3).to.equal(priceVendor.tier_min_qty_3);
    expect(pe.tier_price_1).to.equal(price1);
    expect(pe.tier_price_2).to.equal(price2);
    expect(pe.tier_price_3).to.equal(price3);
  });

  it(`@happy ${scenarioQRSKUPriceVHubOutFr.postPeShipping}`, async () => {
    const peShipping = respondPe.body[0].shipping[0].tier_data;
    const priceRules = testDataAgreement.agreementCustomerDjqrToBizzy.price_rule[0].price_rule_items[0];
    const price1 = priceEngineApi.priceDiscountFormula(priceRules.tier_discount_1_type, priceRules.base_price_tier_1, priceRules.tier_discount_1);
    expect(peShipping.tier_min_qty_1).to.equal(priceRules.min_tier_1);
    expect(peShipping.tier_price_1).to.equal(price1);
    expect(peShipping).to.not.have.property('tier_min_qty_2');
    expect(peShipping).to.not.have.property('tier_min_qty_3');
    expect(peShipping).to.not.have.property('tier_price_2');
    expect(peShipping).to.not.have.property('tier_price_3');
  });

  it(`@happy ${scenarioQRSKUPriceVHubOutFr.postShippingLocation}`, async () => {
    const shippingTo = respondPe.body[0].shipping[0].to;
    const shippingFrom = respondPe.body[0].shipping[0].from;
    const shipingRules = testDataAgreement.agreementCustomerDjqrToBizzy.shipping_rule[0];
    expect(shippingTo).to.equal(shipingRules.shipping_geograph[0].geograph);
    expect(shippingFrom).to.equal(shipingRules.shipping_hub[0].hub);
  });
});
// add @skip for QR schema
describe(`@skip ${scenarioQRSKUPriceOutFr.describe}`, () => {
  let token;
  let respondPe;

  before(async () => {
    const userToLogin = userCredential.customer.djQrStaging;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.token;
    const bodyPriceEngine = testData.bodyPostPeBerasVendor22;
    respondPe = await priceEngineApi.postPriceEngine(bodyPriceEngine, token);
    expect(respondPe.status).to.equal(responseMessageCode.successOk);
    expect(respondPe.body[0].shipping).to.have.lengthOf(0);
    expect(respondPe.body[0].is_franco).to.equal(0);
    expect(respondPe.body).to.be.jsonSchema(schemaAssertion.fullTierDataSingleTierShipping);
  });

  it(`@happy ${scenarioQRSKUPriceOutFr.postPe}`, async () => {
    const pe = respondPe.body[0].tier_data;
    const priceVendor = testDataListProduct.berasVendor22;
    const peParams = testData.priceEngineParams;
    peParams.adjustment.topC = testDataAgreement.agreementCustomerDjqrToBizzy.top_rule[0].top_days;
    peParams.adjustment.topV = testDataAgreement.agreementVendor22ToBizzy.top_rule[0].top_days;
    peParams.margin.bm = testDataAgreement.basicMargin.category_seed_of_residues;
    peParams.margin.rebate = testDataAgreement.agreementCustomerDjqrToBizzy.rebate_rule[0].percentage;
    const price1 = priceEngineApi.priceEngineFormula(peParams, priceVendor.tier_cogs_price_1);
    const price2 = priceEngineApi.priceEngineFormula(peParams, priceVendor.tier_cogs_price_2);
    const price3 = priceEngineApi.priceEngineFormula(peParams, priceVendor.tier_cogs_price_3);
    expect(pe.tier_min_qty_1).to.equal(priceVendor.tier_min_qty_1);
    expect(pe.tier_min_qty_2).to.equal(priceVendor.tier_min_qty_2);
    expect(pe.tier_min_qty_3).to.equal(priceVendor.tier_min_qty_3);
    expect(pe.tier_price_1).to.equal(price1);
    expect(pe.tier_price_2).to.equal(price2);
    expect(pe.tier_price_3).to.equal(price3);
  });
});
// add @skip for QR schema
describe(`@skip ${scenarioQRSKUPriceLoco.describe}`, () => {
  let token;
  let respondPe;

  before(async () => {
    const userToLogin = userCredential.customer.ikiQrLocoStaging;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.token;
    const bodyPriceEngine = testData.bodyPostPeIphoneMultiVendor;
    respondPe = await priceEngineApi.postPriceEngine(bodyPriceEngine, token);
    expect(respondPe.status).to.equal(responseMessageCode.successOk);
    expect(respondPe.body).to.be.jsonSchema(schemaAssertion.fullTierDataLoco);
  });

  it(`@happy ${scenarioQRSKUPriceLoco.postPe}`, async () => {
    const priceRules = testDataAgreement.agreementCustomerLocoToBizzy.price_rule[0].price_rule_items[0];
    const price1 = priceEngineApi.priceDiscountFormula(priceRules.tier_discount_1_type, priceRules.base_price_tier_1, priceRules.tier_discount_1);
    const price2 = priceEngineApi.priceDiscountFormula(priceRules.tier_discount_2_type, priceRules.base_price_tier_2, priceRules.tier_discount_2);
    const price3 = priceEngineApi.priceDiscountFormula(priceRules.tier_discount_3_type, priceRules.base_price_tier_3, priceRules.tier_discount_3);
    const respBody = respondPe.body;
    for (let i = 0; i < respBody.length; i += 1) {
      const pe = respBody[i].tier_data;
      expect(respBody[i].shipping).to.have.lengthOf(0);
      expect(respBody[i].is_franco).to.equal(0);
      expect(pe.tier_min_qty_1).to.equal(testDataAgreement.agreementCustomerLocoToBizzy.price_rule[0].price_rule_items[0].min_tier_1);
      expect(pe.tier_min_qty_2).to.equal(testDataAgreement.agreementCustomerLocoToBizzy.price_rule[0].price_rule_items[0].min_tier_2);
      expect(pe.tier_min_qty_3).to.equal(testDataAgreement.agreementCustomerLocoToBizzy.price_rule[0].price_rule_items[0].min_tier_3);
      expect(pe.tier_price_1).to.equal(price1);
      expect(pe.tier_price_2).to.equal(price2);
      expect(pe.tier_price_3).to.equal(price3);
    }
  });
});
// add @skip for QR schema
describe(`@skip ${scenarioQRSKUPriceOutLoco.describe}`, () => {
  let token;
  let respondPe;

  before(async () => {
    const userToLogin = userCredential.customer.ikiQrLocoStaging;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.token;
    const bodyPriceEngine = testData.bodyPostPeBerasMultiVendor;
    respondPe = await priceEngineApi.postPriceEngine(bodyPriceEngine, token);
    expect(respondPe.status).to.equal(responseMessageCode.successOk);
    expect(respondPe.body).to.be.jsonSchema(schemaAssertion.singleTierDataLoco);
  });

  it(`@happy ${scenarioQRSKUPriceOutLoco.postPe}`, async () => {
    const pe = respondPe.body[0].tier_data;
    const priceVendor = testDataListProduct.berasVendor22;
    const peParams = testData.priceEngineParams;
    peParams.adjustment.topC = testDataAgreement.agreementCustomerLocoToBizzy.top_rule[0].top_days;
    peParams.adjustment.topV = testDataAgreement.agreementVendor22ToBizzy.top_rule[0].top_days;
    peParams.margin.bm = testDataAgreement.basicMargin.category_seed_of_residues;
    peParams.margin.rebate = testDataAgreement.agreementCustomerLocoToBizzy.rebate_rule[0].percentage;
    const price1 = priceEngineApi.priceEngineFormula(peParams, priceVendor.tier_cogs_price_1);
    const price2 = priceEngineApi.priceEngineFormula(peParams, priceVendor.tier_cogs_price_2);
    const price3 = priceEngineApi.priceEngineFormula(peParams, priceVendor.tier_cogs_price_3);
    expect(respondPe.body[0].shipping).to.have.lengthOf(0);
    expect(respondPe.body[0].is_franco).to.equal(0);
    expect(pe.tier_min_qty_1).to.equal(priceVendor.tier_min_qty_1);
    expect(pe.tier_min_qty_2).to.equal(priceVendor.tier_min_qty_2);
    expect(pe.tier_min_qty_3).to.equal(priceVendor.tier_min_qty_3);
    expect(pe.tier_price_1).to.equal(price1);
    expect(pe.tier_price_2).to.equal(price2);
    expect(pe.tier_price_3).to.equal(price3);
  });

  it(`@happy ${scenarioQRSKUPriceOutLoco.postPe2}`, async () => {
    const pe = respondPe.body[1].tier_data;
    const priceVendor = testDataListProduct.berasVendor33;
    const peParams = testData.priceEngineParams;
    peParams.adjustment.topC = testDataAgreement.agreementCustomerLocoToBizzy.top_rule[0].top_days;
    peParams.adjustment.topV = testDataAgreement.agreementVendor33ToBizzy.top_rule[0].top_days;
    peParams.margin.bm = testDataAgreement.basicMargin.category_seed_of_residues;
    peParams.margin.rebate = testDataAgreement.agreementCustomerLocoToBizzy.rebate_rule[0].percentage;
    const price1 = priceEngineApi.priceEngineFormula(peParams, priceVendor.tier_cogs_price_1);
    const price2 = priceEngineApi.priceEngineFormula(peParams, priceVendor.tier_cogs_price_2);
    const price3 = priceEngineApi.priceEngineFormula(peParams, priceVendor.tier_cogs_price_3);
    expect(respondPe.body[1].shipping).to.have.lengthOf(0);
    expect(respondPe.body[1].is_franco).to.equal(0);
    expect(pe.tier_min_qty_1).to.equal(priceVendor.tier_min_qty_1);
    expect(pe.tier_min_qty_2).to.equal(priceVendor.tier_min_qty_2);
    expect(pe.tier_min_qty_3).to.equal(priceVendor.tier_min_qty_3);
    expect(pe.tier_price_1).to.equal(price1);
    expect(pe.tier_price_2).to.equal(price2);
    expect(pe.tier_price_3).to.equal(price3);
  });
});
// add @skip for QR schema
describe(`@skip ${scenarioQRUpdSKUPriceVDisable.describe}`, () => {
  let tokenCustomer;
  let tokenVendor;

  before(async () => {
    const userToLoginCustomer = userCredential.customer.djQrStaging;
    const respond = await common.getTokenFo(userToLoginCustomer);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    tokenCustomer = respond.body.token;
    const userToLoginVendor = userCredential.vendor.dj2;
    const respondVendor = await common.getTokenFo(userToLoginVendor);
    expect(respondVendor.status).to.equal(responseMessageCode.successOk);
    tokenVendor = respondVendor.body.token;
    const vendorId = testData.vendor.dj_pkp_2.organization_id;
    const productId = testDataListProduct.product.iphoneVendor31.id;
    const dataBody = testDataListProduct.bodyPutProductVendorStatusNotActive;
    const respondCatalogVendorStatus = await catalogVendorStatuApi.putProductVendorStatus(vendorId, productId, dataBody, tokenVendor);
    expect(respondCatalogVendorStatus.status).to.equal(responseMessageCode.successOk);
  });

  it(`@negative ${scenarioQRUpdSKUPriceVDisable.postPeDisableVendorSku}`, async () => {
    const bodyPriceEngine = testData.bodyPostPeIphoneVendor22;
    const respondPe = await priceEngineApi.postPriceEngine(bodyPriceEngine, tokenCustomer);
    expect(respondPe.status).to.equal(responseMessageCode.successOk);
    expect(respondPe.body[0].shipping).to.have.lengthOf(1);
    expect(respondPe.body[0].is_franco).to.equal(1);
    expect(respondPe.body).to.be.jsonSchema(schemaAssertion.fullTierDataSingleTierShipping);
  });

  after(async () => {
    const vendorId = testData.vendor.dj_pkp_2.organization_id;
    const productId = testDataListProduct.product.iphoneVendor31.id;
    const dataBody = testDataListProduct.bodyPutProductVendorStatusActive;
    const respondCatalogVendorStatus = await catalogVendorStatuApi.putProductVendorStatus(vendorId, productId, dataBody, tokenVendor);
    expect(respondCatalogVendorStatus.status).to.equal(responseMessageCode.successOk);
    expect(respondCatalogVendorStatus.body.data.is_active).to.equal(1);
  });
});
// add @skip for QR schema
describe(`@skip ${scenarioQRUpdSKUPriceVChangeSRP.describe}`, () => {
  let tokenCustomer;
  let tokenVendor;
  let respondPe;
  let priceVendor;

  before(async () => {
    const userToLoginCustomer = userCredential.customer.djQrStaging;
    const respond = await common.getTokenFo(userToLoginCustomer);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    tokenCustomer = respond.body.token;
    const userToLoginVendor = userCredential.vendor.dj1;
    const respondVendor = await common.getTokenFo(userToLoginVendor);
    expect(respondVendor.status).to.equal(responseMessageCode.successOk);
    tokenVendor = respondVendor.body.token;
    const vendorId = testData.vendor.dj_pkp_1.organization_id;
    const productId = testDataListProduct.product.iphoneVendor22.id;
    const dataBody = testDataListProduct.bodyUpdatePriceIphone;
    const respondCatalogVendorStatus = await catalogVendorStatuApi.putProductVendor(vendorId, productId, dataBody, tokenVendor);
    expect(respondCatalogVendorStatus.status).to.equal(responseMessageCode.successOk);
    const vendorProductListQuery = testDataListProduct.queryGetProductVendorList;
    vendorProductListQuery.search = testDataListProduct.product.iphoneVendor22.sku_number;
    const respondVendorProductList = await catalogVendorStatuApi.getCatalogListProduct(vendorId, vendorProductListQuery, tokenVendor);
    expect(respondVendorProductList.status).to.equal(responseMessageCode.successOk);
    priceVendor = respondVendorProductList.body.data[0];
  });

  it(`@negative ${scenarioQRUpdSKUPriceVChangeSRP.postPe}`, async () => {
    const bodyPriceEngine = testData.bodyPostPeIphoneVendor22;
    respondPe = await priceEngineApi.postPriceEngine(bodyPriceEngine, tokenCustomer);
    expect(respondPe.status).to.equal(responseMessageCode.successOk);
    expect(respondPe.body[0].shipping).to.have.lengthOf(1);
    expect(respondPe.body[0].is_franco).to.equal(1);
    expect(respondPe.body).to.be.jsonSchema(schemaAssertion.fullTierDataSingleTierShipping);
  });

  it(`@negative ${scenarioQRUpdSKUPriceVChangeSRP.postPeCalculation}`, async () => {
    const pe = respondPe.body[0].tier_data;
    const peParams = testData.priceEngineParams;
    peParams.adjustment.topC = testDataAgreement.agreementCustomerDjqrToBizzy.top_rule[0].top_days;
    peParams.adjustment.topV = testDataAgreement.agreementVendor22ToBizzy.top_rule[0].top_days;
    peParams.margin.bm = testDataAgreement.basicMargin.category_mobiles;
    peParams.margin.rebate = testDataAgreement.agreementCustomerDjqrToBizzy.rebate_rule[0].percentage;
    const price1 = priceEngineApi.priceEngineFormula(peParams, priceVendor.tier_cogs_price_1);
    const price2 = priceEngineApi.priceEngineFormula(peParams, priceVendor.tier_cogs_price_2);
    const price3 = priceEngineApi.priceEngineFormula(peParams, priceVendor.tier_cogs_price_3);
    expect(pe.tier_min_qty_1).to.equal(priceVendor.tier_min_qty_1);
    expect(pe.tier_min_qty_2).to.equal(priceVendor.tier_min_qty_2);
    expect(pe.tier_min_qty_3).to.equal(priceVendor.tier_min_qty_3);
    expect(pe.tier_price_1).to.equal(price1);
    expect(pe.tier_price_2).to.equal(price2);
    expect(pe.tier_price_3).to.equal(price3);
  });

  after(async () => {
    const vendorId = testData.vendor.dj_pkp_1.organization_id;
    const productId = testDataListProduct.product.iphoneVendor22.id;
    const dataBody = testDataListProduct.bodyRestorePriceIphone;
    const respondCatalogVendorStatus = await catalogVendorStatuApi.putProductVendor(vendorId, productId, dataBody, tokenVendor);
    expect(respondCatalogVendorStatus.status).to.equal(responseMessageCode.successOk);
  });
});
// add @skip for QR schema
describe(`@skip ${scenarioQRVUpdMultiTOSingle.describe}`, () => {
  let token;
  let tokenVendor;

  before(async () => {
    const userToLogin = userCredential.customer.ikiQrLocoStaging;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.token;
    const userToLoginVendor = userCredential.vendor.dj1;
    const respondVendor = await common.getTokenFo(userToLoginVendor);
    expect(respondVendor.status).to.equal(responseMessageCode.successOk);
    tokenVendor = respondVendor.body.token;
    const vendorId = testData.vendor.dj_pkp_1.organization_id;
    const productId = testDataListProduct.product.berasVendor22.id;
    const dataBody = testDataListProduct.bodyUpdateTierBeras;
    const respondCatalogVendorStatus = await catalogVendorStatuApi.putProductVendor(vendorId, productId, dataBody, tokenVendor);
    expect(respondCatalogVendorStatus.status).to.equal(responseMessageCode.successOk);
  });

  it(`@happy ${scenarioQRVUpdMultiTOSingle.postPe}`, async () => {
    const bodyPriceEngine = testData.bodyPostPeBerasVendor22;
    const respondPeLoco = await priceEngineApi.postPriceEngine(bodyPriceEngine, token);
    expect(respondPeLoco.status).to.equal(responseMessageCode.successOk);
    expect(respondPeLoco.body).to.be.jsonSchema(schemaAssertion.singleTierDataLoco);
    const pe = respondPeLoco.body[0].tier_data;
    const priceVendor = testDataListProduct.berasVendor22AfterUpdate;
    const peParams = testData.priceEngineParams;
    peParams.adjustment.topC = testDataAgreement.agreementCustomerLocoToBizzy.top_rule[0].top_days;
    peParams.adjustment.topV = testDataAgreement.agreementVendor22ToBizzy.top_rule[0].top_days;
    peParams.margin.bm = testDataAgreement.basicMargin.category_seed_of_residues;
    peParams.margin.rebate = testDataAgreement.agreementCustomerLocoToBizzy.rebate_rule[0].percentage;
    const price1 = priceEngineApi.priceEngineFormula(peParams, priceVendor.tier_cogs_price_1);
    expect(respondPeLoco.body[0].shipping).to.have.lengthOf(0);
    expect(respondPeLoco.body[0].is_franco).to.equal(0);
    expect(pe.tier_min_qty_1).to.equal(priceVendor.tier_min_qty_1);
    expect(pe.tier_price_1).to.equal(price1);
    expect(pe).to.not.have.property('tier_min_qty_2');
    expect(pe).to.not.have.property('tier_min_qty_3');
    expect(pe).to.not.have.property('tier_price_2');
    expect(pe).to.not.have.property('tier_price_3');
  });

  after(async () => {
    const vendorId = testData.vendor.dj_pkp_1.organization_id;
    const productId = testDataListProduct.product.berasVendor22.id;
    const dataBody = testDataListProduct.bodyRestoreTierBeras;
    const respondCatalogVendorStatus = await catalogVendorStatuApi.putProductVendor(vendorId, productId, dataBody, tokenVendor);
    expect(respondCatalogVendorStatus.status).to.equal(responseMessageCode.successOk);
  });
});
