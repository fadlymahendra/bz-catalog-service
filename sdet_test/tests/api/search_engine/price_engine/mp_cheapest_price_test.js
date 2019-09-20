
/* eslint prefer-destructuring: off */

const { expect } = require('chai');
const chai = require('chai');
chai.use(require('chai-json-schema'));
const cheapestpriceApi = require('../../../page-objects/api/search_engine/price_engine/cheapest_price');
const priceEngineApi = require('../../../page-objects/api/search_engine/price_engine/price_engine.js');
const responseMessageCode = require('../../../helper/responseMessageAndCode.json');
const userCredential = require('../../../helper/userCredential.json');
const common = require('../../../helper/common.js');
const testData = require('../../../helper/search_engine/price_engine/cheapest_price_test_data.json');
const testDataPe = require('../../../helper/search_engine/price_engine/price_engine_test_data.json');
const schemaAssertion = require('../../../helper/schema/search_engine/price_engine/cheapest_price_schema.json');

const scenarioMPLowestPriceFr = {
  describe: 'As a MP Customer, I able to see the lowest price for my Franco Contract',
  getCheapestPrice: 'should get the lowest price of Franco Price',
};

const scenarioMPLowestPriceBerasOutFr = {
  describe: 'As a MP Customer, I able to see the lowest price for my SKU outside Franco Contract',
  getCheapestPrice: 'should get the lowest price of Franco Price with SKU Beras',
};

const scenarioMPLowestPriceMacOutFr = {
  describe: 'As a MP Customer, I able to see the lowest price for my SKU outside Franco Contract',
  getCheapestPrice: 'should get the lowest price of Franco Price with SKU Macbook',
};

const scenarioMPLowestPriceNoContract = {
  describe: 'As a MP Customer, I able to see the lowest price if I dont have any contract',
  getCheapestPrice: 'should get the lowest price of Price',
};

describe(scenarioMPLowestPriceFr.describe, () => {
  let token;
  let respondPe;

  before(async () => {
    const userToLogin = userCredential.customer.djMpTopStaging;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.customer.token;
    const bodyPriceEngine = testDataPe.bodyPostPeIphoneMultiVendor;
    respondPe = await priceEngineApi.postPriceEngine(bodyPriceEngine, token);
    expect(respondPe.status).to.equal(responseMessageCode.successOk);
    expect(respondPe.body[0].is_franco).to.equal(1);
  });

  it(`@happy ${scenarioMPLowestPriceFr.getCheapestPrice}`, async () => {
    const respond = await cheapestpriceApi.getCheapestPrice(testData.dataPathIphone, token);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    const currentCheapestPrice = respond.body.price;
    const expectedCheapestPrice = cheapestpriceApi.getLowestPrice(respondPe.body);
    expect(currentCheapestPrice).to.equal(expectedCheapestPrice);
    expect(respond.body).to.jsonSchema(schemaAssertion.getValidResponseCheapestPrice);
  });
});

describe(scenarioMPLowestPriceBerasOutFr.describe, () => {
  let token;
  let respondPe;

  before(async () => {
    const userToLogin = userCredential.customer.djMpTopStaging;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.customer.token;
    const bodyPriceEngine = testDataPe.bodyPostPeBerasMultiVendor;
    respondPe = await priceEngineApi.postPriceEngine(bodyPriceEngine, token);
    expect(respondPe.status).to.equal(responseMessageCode.successOk);
    expect(respondPe.body[0].is_franco).to.equal(0);
  });

  it(`@happy ${scenarioMPLowestPriceBerasOutFr.getCheapestPrice}`, async () => {
    const respond = await cheapestpriceApi.getCheapestPrice(testData.dataPathBeras, token);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    const currentCheapestPrice = respond.body.price;
    const expectedCheapestPrice = cheapestpriceApi.getLowestPrice(respondPe.body);
    expect(currentCheapestPrice).to.equal(expectedCheapestPrice);
    expect(respond.body).to.jsonSchema(schemaAssertion.getValidResponseCheapestPrice);
  });
});

describe(scenarioMPLowestPriceMacOutFr.describe, () => {
  let token;
  let respondPe;

  before(async () => {
    const userToLogin = userCredential.customer.djMpTopStaging;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.customer.token;
    const bodyPriceEngine = testDataPe.bodyPostPeMacbookMultiVendor;
    respondPe = await priceEngineApi.postPriceEngine(bodyPriceEngine, token);
    expect(respondPe.status).to.equal(responseMessageCode.successOk);
    expect(respondPe.body[0].is_franco).to.equal(0);
  });

  it(`@happy ${scenarioMPLowestPriceMacOutFr.getCheapestPrice}`, async () => {
    const respond = await cheapestpriceApi.getCheapestPrice(testData.dataPathMacbook, token);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    const currentCheapestPrice = respond.body.price;
    const expectedCheapestPrice = cheapestpriceApi.getLowestPrice(respondPe.body);
    expect(currentCheapestPrice).to.equal(expectedCheapestPrice);
    expect(respond.body).to.jsonSchema(schemaAssertion.getValidResponseCheapestPrice);
  });
});

describe(scenarioMPLowestPriceNoContract.describe, () => {
  let token;
  let respondPe;

  before(async () => {
    const userToLogin = userCredential.customer.djMpStaging;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.customer.token;
    const bodyPriceEngine = testDataPe.bodyPostPeIphoneMultiVendor;
    respondPe = await priceEngineApi.postPriceEngine(bodyPriceEngine, token);
    expect(respondPe.status).to.equal(responseMessageCode.successOk);
    expect(respondPe.body[0].is_franco).to.equal(0);
  });

  it(`@happy ${scenarioMPLowestPriceNoContract.getCheapestPrice}`, async () => {
    const respond = await cheapestpriceApi.getCheapestPrice(testData.dataPathIphone, token);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    const currentCheapestPrice = respond.body.price;
    const expectedCheapestPrice = cheapestpriceApi.getLowestPrice(respondPe.body);
    expect(currentCheapestPrice).to.equal(expectedCheapestPrice);
    expect(respond.body).to.jsonSchema(schemaAssertion.getValidResponseCheapestPrice);
  });
});
