
/* eslint prefer-destructuring: off */
/* eslint no-unused-expressions: off */

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

const scenarioSKUPriceFr = {
  describe: 'As a MP Customer, I able to see my SKU price when my SKU is in my Franco Contract',
  postPrice: 'should check tier SRP vendor',
  postShippingPrice: 'should check tier shipping price',
  postShipping: 'should check shipping location',
};

const scenarioSKUPriceVHubOutFR = {
  describe: 'As a MP Customer, I able to see my SKU price when Vendor Hub outside my Franco Contract',
  postPrice: 'should get tier SRP Vendor',
};

const scenarioSKUPriceOutFR = {
  describe: 'As a MP Customer, I able to see my SKU price when my SKU outside my Franco Contract',
  postPrice: 'should get tier SRP Vendor',
};

const scenarioSKUPriceNoContract = {
  describe: 'As a MP Customer, I able to see my SKU price when I dont have any contract',
  postPrice: 'should get tier SRP Vendor',
};

const scenarioSKUPriceDisableProducts = {
  describe: 'As a MP Customer, I able to see the updated SKU price when Vendor disable their products',
  postPeDisableVendorSku: 'should check price from active vendor only',
};

const scenarioUPdSKUPriceVChangeSRP = {
  describe: 'As a MP Customer, I able to see the updated SKU price when Vendor change their SRP',
  postPrice: 'should check tier contract price updated after vendor update price',
  postPriceShipping: 'should check tier shiping price contract not change after vendor update price',
};

const scenarioUpdmultiTOSingleTier = {
  describe: 'As a MP Customer, I able to see the updated tier after my vendor update multi to single tier',
  postPe: 'should check price the updated price',
};

const scenarioSKUPriceLoco = {
  describe: 'As a MP Customer, I able to see my SKU price when my SKU is in my LOCO Contract',
  postPrice: 'should check tier Price Loco Contract',
};

describe(`@priceLocoMP ${scenarioSKUPriceFr.describe}`, () => {
  let token;
  let respondPe;

  before(async () => {
    const userToLogin = userCredential.customer.djMpTopStaging;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.customer.token;
    const bodyPriceEngine = testData.bodyPostPeIphoneVendor22;
    respondPe = await priceEngineApi.postPriceEngine(bodyPriceEngine, token);
    expect(respondPe.status).to.equal(responseMessageCode.successOk);
    expect(respondPe.body).to.be.jsonSchema(schemaAssertion.fullTierDataSingleTierShipping);
    expect(respondPe.body[0].is_franco).to.equal(1);
  });

  it(`@happy ${scenarioSKUPriceFr.postPrice}`, async () => {
    const pe = respondPe.body[0].tier_data;
    const priceVendor = testDataListProduct.iphoneVendor22;
    expect(pe.tier_min_qty_1).to.equal(priceVendor.tier_min_qty_1);
    expect(pe.tier_min_qty_2).to.equal(priceVendor.tier_min_qty_2);
    expect(pe.tier_min_qty_3).to.equal(priceVendor.tier_min_qty_3);
    expect(pe.tier_price_1).to.equal(parseInt(priceVendor.tier_cogs_price_1, 10));
    expect(pe.tier_price_2).to.equal(parseInt(priceVendor.tier_cogs_price_2, 10));
    expect(pe.tier_price_3).to.equal(parseInt(priceVendor.tier_cogs_price_3, 10));
  });

  it(`@happy ${scenarioSKUPriceFr.postShippingPrice}`, async () => {
    const peShipping = respondPe.body[0].shipping[0].tier_data;
    const priceRules = testDataAgreement.agreementCustomerMpTopToVendor22.price_rule[0].price_rule_items[0];
    const price1 = priceEngineApi.priceDiscountFormula(priceRules.tier_discount_1_type, priceRules.base_price_tier_1, priceRules.tier_discount_1);
    expect(peShipping.tier_min_qty_1).to.equal(priceRules.min_tier_1);
    expect(peShipping.tier_price_1).to.equal(price1);
  });

  it(`@happy ${scenarioSKUPriceFr.postShipping}`, async () => {
    const shippingTo = respondPe.body[0].shipping[0].to;
    const shippingFrom = respondPe.body[0].shipping[0].from;
    const shipingRules = testDataAgreement.agreementCustomerMpTopToVendor22.shipping_rule[0].shipping_geograph;
    expect(shippingTo).to.equal(shipingRules.find(shipTo => shipTo.type === 'CUSTOMER').geograph);
    expect(shippingFrom).to.equal(shipingRules.find(shipTo => shipTo.type === 'VENDOR').geograph);
  });
});

describe(`@priceLocoMP ${scenarioSKUPriceVHubOutFR.describe}`, () => {
  let token;
  let respondPe;

  before(async () => {
    const userToLogin = userCredential.customer.djMpTopStaging;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.customer.token;
    const bodyPriceEngine = testData.bodyPostPeIphoneVendor31;
    respondPe = await priceEngineApi.postPriceEngine(bodyPriceEngine, token);
    expect(respondPe.status).to.equal(responseMessageCode.successOk);
    expect(respondPe.body).to.be.jsonSchema(schemaAssertion.fullTierDataSingleTierShipping);
    expect(respondPe.body[0].shipping).to.have.lengthOf(0);
    expect(respondPe.body[0].is_franco).to.equal(0);
  });

  it(`@happy ${scenarioSKUPriceVHubOutFR.postPrice}`, async () => {
    const pe = respondPe.body[0].tier_data;
    const priceVendor = testDataListProduct.iphoneVendor31;
    expect(pe.tier_min_qty_1).to.equal(priceVendor.tier_min_qty_1);
    expect(pe.tier_min_qty_2).to.equal(priceVendor.tier_min_qty_2);
    expect(pe.tier_min_qty_3).to.equal(priceVendor.tier_min_qty_3);
    expect(pe.tier_price_1).to.equal(parseInt(priceVendor.tier_cogs_price_1, 10));
    expect(pe.tier_price_2).to.equal(parseInt(priceVendor.tier_cogs_price_2, 10));
    expect(pe.tier_price_3).to.equal(parseInt(priceVendor.tier_cogs_price_3, 10));
  });
});

describe(`@priceLocoMP ${scenarioSKUPriceOutFR.describe}`, () => {
  let token;
  let respondPe;

  before(async () => {
    const userToLogin = userCredential.customer.djMpTopStaging;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.customer.token;
    const bodyPriceEngine = testData.bodyPostPeBerasVendor22;
    respondPe = await priceEngineApi.postPriceEngine(bodyPriceEngine, token);
    expect(respondPe.status).to.equal(responseMessageCode.successOk);
    expect(respondPe.body).to.be.jsonSchema(schemaAssertion.fullTierDataSingleTierShipping);
    expect(respondPe.body[0].shipping).to.have.lengthOf(0);
    expect(respondPe.body[0].is_franco).to.equal(0);
  });

  it(`@happy ${scenarioSKUPriceOutFR.postPrice}`, async () => {
    const pe = respondPe.body[0].tier_data;
    const priceVendor = testDataListProduct.berasVendor22;
    expect(pe.tier_min_qty_1).to.equal(priceVendor.tier_min_qty_1);
    expect(pe.tier_min_qty_2).to.equal(priceVendor.tier_min_qty_2);
    expect(pe.tier_min_qty_3).to.equal(priceVendor.tier_min_qty_3);
    expect(pe.tier_price_1).to.equal(parseInt(priceVendor.tier_cogs_price_1, 10));
    expect(pe.tier_price_2).to.equal(parseInt(priceVendor.tier_cogs_price_2, 10));
    expect(pe.tier_price_3).to.equal(parseInt(priceVendor.tier_cogs_price_3, 10));
  });
});

describe(`@priceLocoMP ${scenarioSKUPriceNoContract.describe}`, () => {
  let token;
  let respondPe;

  before(async () => {
    const userToLogin = userCredential.customer.djMpStaging;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.customer.token;
    const bodyPriceEngine = testData.bodyPostPeBerasVendor22;
    respondPe = await priceEngineApi.postPriceEngine(bodyPriceEngine, token);
    expect(respondPe.status).to.equal(responseMessageCode.successOk);
    expect(respondPe.body).to.be.jsonSchema(schemaAssertion.fullTierDataSingleTierShipping);
    expect(respondPe.body[0].shipping).to.have.lengthOf(0);
    expect(respondPe.body[0].is_franco).to.equal(0);
  });

  it(`@happy ${scenarioSKUPriceNoContract.postPrice}`, async () => {
    const pe = respondPe.body[0].tier_data;
    const priceVendor = testDataListProduct.berasVendor22;
    expect(pe.tier_min_qty_1).to.equal(priceVendor.tier_min_qty_1);
    expect(pe.tier_min_qty_2).to.equal(priceVendor.tier_min_qty_2);
    expect(pe.tier_min_qty_3).to.equal(priceVendor.tier_min_qty_3);
    expect(pe.tier_price_1).to.equal(parseInt(priceVendor.tier_cogs_price_1, 10));
    expect(pe.tier_price_2).to.equal(parseInt(priceVendor.tier_cogs_price_2, 10));
    expect(pe.tier_price_3).to.equal(parseInt(priceVendor.tier_cogs_price_3, 10));
  });
});

describe(`@priceLocoMP ${scenarioSKUPriceDisableProducts.describe}`, () => {
  let tokenCustomer;
  let tokenVendor;

  before(async () => {
    const userToLogin = userCredential.customer.djMpTopStaging;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    tokenCustomer = respond.body.customer.token;
    const userToLoginVendor = userCredential.vendor.dj2;
    const respondVendor = await common.getTokenFo(userToLoginVendor);
    expect(respondVendor.status).to.equal(responseMessageCode.successOk);
    tokenVendor = respondVendor.body.seller.token;
    const vendorId = testData.vendor.dj_pkp_2.organization_id;
    const productId = testDataListProduct.product.iphoneVendor31.id;
    const dataBody = testDataListProduct.bodyPutProductVendorStatusNotActive;
    const respondCatalogVendorStatus = await catalogVendorStatuApi.putProductVendorStatus(vendorId, productId, dataBody, tokenVendor);
    expect(respondCatalogVendorStatus.status).to.equal(responseMessageCode.successOk);
  });

  it(` @negative ${scenarioSKUPriceDisableProducts.postPeDisableVendorSku}`, async () => {
    const bodyPriceEngine = testData.bodyPostPeIphoneMultiVendor;
    const respondPe = await priceEngineApi.postPriceEngine(bodyPriceEngine, tokenCustomer);
    const priceVendor = testDataListProduct.iphoneVendor22;
    respondPe.body = respondPe.body.filter(item => item.vendor_id !== testData.vendor.dj_pkp_2.organization_id.toString());
    expect(respondPe.status).to.equal(responseMessageCode.successOk);
    expect(respondPe.body).to.be.jsonSchema(schemaAssertion.singleTierDataSingleTierShipping);
    expect(respondPe.body[0].shipping).to.have.lengthOf(1);
    expect(respondPe.body[0].is_franco).to.equal(1);
    const pe = respondPe.body[0].tier_data;
    expect(pe.tier_min_qty_1).to.equal(priceVendor.tier_min_qty_1);
    expect(pe.tier_min_qty_2).to.equal(priceVendor.tier_min_qty_2);
    expect(pe.tier_min_qty_3).to.equal(priceVendor.tier_min_qty_3);
    expect(pe.tier_price_1).to.equal(parseInt(priceVendor.tier_cogs_price_1, 10));
    expect(pe.tier_price_2).to.equal(parseInt(priceVendor.tier_cogs_price_2, 10));
    expect(pe.tier_price_3).to.equal(parseInt(priceVendor.tier_cogs_price_3, 10));
    const respondPeDisable = respondPe.body.find(element => element.vendor_id === testData.vendor.dj_pkp_2.organization_id);
    expect(respondPeDisable).be.undefined;
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

describe(`@priceLocoMP ${scenarioUPdSKUPriceVChangeSRP.describe}`, () => {
  let tokenCustomer;
  let tokenVendor;
  let respondPe;
  let priceVendor;

  before(async () => {
    const userToLoginCustomer = userCredential.customer.djMpTopStaging;
    const respond = await common.getTokenFo(userToLoginCustomer);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    tokenCustomer = respond.body.customer.token;
    const userToLoginVendor = userCredential.vendor.dj1;
    const respondVendor = await common.getTokenFo(userToLoginVendor);
    expect(respondVendor.status).to.equal(responseMessageCode.successOk);
    tokenVendor = respondVendor.body.seller.token;
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

  it(`@negative ${scenarioUPdSKUPriceVChangeSRP.postPrice}`, async () => {
    const bodyPriceEngine = testData.bodyPostPeIphoneVendor22;
    respondPe = await priceEngineApi.postPriceEngine(bodyPriceEngine, tokenCustomer);
    expect(respondPe.status).to.equal(responseMessageCode.successOk);
    expect(respondPe.body).to.be.jsonSchema(schemaAssertion.fullTierDataSingleTierShipping);
    expect(respondPe.body[0].shipping).to.have.lengthOf(1);
    expect(respondPe.body[0].is_franco).to.equal(1);
    const pe = respondPe.body[0].tier_data;
    expect(pe.tier_min_qty_1).to.equal(priceVendor.tier_min_qty_1);
    expect(pe.tier_min_qty_2).to.equal(priceVendor.tier_min_qty_2);
    expect(pe.tier_min_qty_3).to.equal(priceVendor.tier_min_qty_3);
    expect(pe.tier_price_1).to.equal(parseInt(priceVendor.tier_cogs_price_1, 10));
    expect(pe.tier_price_2).to.equal(parseInt(priceVendor.tier_cogs_price_2, 10));
    expect(pe.tier_price_3).to.equal(parseInt(priceVendor.tier_cogs_price_3, 10));
  });

  it(`@negative ${scenarioUPdSKUPriceVChangeSRP.postPriceShipping}`, async () => {
    const peShipping = respondPe.body[0].shipping[0].tier_data;
    const priceRules = testDataAgreement.agreementCustomerMpTopToVendor22AfterUpdate.price_rule[0].price_rule_items[0];
    const price1 = priceEngineApi.priceDiscountFormula(priceRules.tier_discount_1_type, priceRules.base_price_tier_1, priceRules.tier_discount_1);
    expect(peShipping.tier_min_qty_1).to.equal(priceRules.min_tier_1);
    expect(peShipping.tier_price_1).to.equal(price1);
  });

  after(async () => {
    const vendorId = testData.vendor.dj_pkp_1.organization_id;
    const productId = testDataListProduct.product.iphoneVendor22.id;
    const dataBody = testDataListProduct.bodyRestorePriceIphone;
    const respondCatalogVendorStatus = await catalogVendorStatuApi.putProductVendor(vendorId, productId, dataBody, tokenVendor);
    expect(respondCatalogVendorStatus.status).to.equal(responseMessageCode.successOk);
  });
});

describe(`@priceLocoMP ${scenarioUpdmultiTOSingleTier.describe}`, () => {
  let token;
  let tokenVendor;

  before(async () => {
    const userToLogin = userCredential.customer.djMpTopStaging;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.customer.token;
    const userToLoginVendor = userCredential.vendor.dj1;
    const respondVendor = await common.getTokenFo(userToLoginVendor);
    expect(respondVendor.status).to.equal(responseMessageCode.successOk);
    tokenVendor = respondVendor.body.seller.token;
    const vendorId = testData.vendor.dj_pkp_1.organization_id;
    const productId = testDataListProduct.product.berasVendor22.id;
    const dataBody = testDataListProduct.bodyUpdateTierBeras;
    const respondCatalogVendorStatus = await catalogVendorStatuApi.putProductVendor(vendorId, productId, dataBody, tokenVendor);
    expect(respondCatalogVendorStatus.status).to.equal(responseMessageCode.successOk);
  });

  it(`@happy ${scenarioUpdmultiTOSingleTier.postPe}`, async () => {
    const bodyPriceEngine = testData.bodyPostPeBerasVendor22;
    const respondPeLoco = await priceEngineApi.postPriceEngine(bodyPriceEngine, token);
    expect(respondPeLoco.status).to.equal(responseMessageCode.successOk);
    expect(respondPeLoco.body).to.be.jsonSchema(schemaAssertion.singleTierDataLoco);
    const pe = respondPeLoco.body[0].tier_data;
    const priceVendor = testDataListProduct.berasVendor22AfterUpdate;
    expect(respondPeLoco.body[0].shipping).to.have.lengthOf(0);
    expect(respondPeLoco.body[0].is_franco).to.equal(0);
    expect(pe.tier_min_qty_1).to.equal(priceVendor.tier_min_qty_1);
    expect(pe.tier_price_1).to.equal(parseInt(priceVendor.tier_cogs_price_1, 10));
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

describe(`@priceLocoMP ${scenarioSKUPriceLoco.describe}`, () => {
  let token;
  let respondPe;

  before(async () => {
    const userToLogin = userCredential.customer.hardiMpLocoStaging;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.customer.token;
    const bodyPriceEngine = testData.bodyPostPeMacbookVendor31;
    respondPe = await priceEngineApi.postPriceEngine(bodyPriceEngine, token);
    expect(respondPe.status).to.equal(responseMessageCode.successOk);
    expect(respondPe.body).to.be.jsonSchema(schemaAssertion.singleTierDataLoco);
    expect(respondPe.body[0].shipping).to.have.lengthOf(0);
    expect(respondPe.body[0].is_franco).to.equal(0);
  });

  it(` @happy ${scenarioSKUPriceLoco.postPrice}`, async () => {
    const pe = respondPe.body[0].tier_data;
    const priceRules = testDataAgreement.agrrementCustomerMpLocoToVendor22.price_rule[0].price_rule_items[0];
    const price1 = priceEngineApi.priceDiscountFormula(priceRules.tier_discount_1_type, priceRules.base_price_tier_1, priceRules.tier_discount_1);
    expect(pe.tier_min_qty_1).to.equal(priceRules.min_tier_1);
    expect(pe.tier_price_1).to.equal(price1);
    expect(pe).to.not.have.property('tier_min_qty_2');
    expect(pe).to.not.have.property('tier_min_qty_3');
    expect(pe).to.not.have.property('tier_price_2');
    expect(pe).to.not.have.property('tier_price_3');
  });
});
