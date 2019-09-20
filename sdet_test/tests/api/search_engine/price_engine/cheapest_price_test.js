
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

const scenarioQRLowestPriceFr = {
  describe: 'As a QR Customer, I able to see the lowest price for my Franco Contract',
  getCheapestPrice: 'should get the lowest price of Franco Price',
};

const scenarioQRLowestPriceLoco = {
  describe: 'As a QR Customer, I able to see the lowest price for my Loco Contract',
  getCheapestPricePe: 'should get the lowest price of Price Engine',
};

const scenarioQRLowestPriceOutLoco = {
  describe: 'As a QR Customer, I able to see the lowest price outside my Loco Contract',
  getCheapestPricePe: 'should get the lowest price of Price Engine',
};

const scenarioQRLowestPriceFRmultiHub = {
  describe: 'As a QR Customer, I able to see the lowest price for my Franco Contract with multiple hub',
  getCheapestPrice: 'should get the lowest price of Franco Price',
};

const scenarioQRLowestPriceOutFR = {
  describe: 'As a QR Customer, I able to see the lowest price outside my Franco Contract',
  getCheapestPrice: 'should get the lowest price of Franco Price',
};

const scenarioQRLowestPriceNotAble = {
  describe: 'As a QR Customer, I am not able to see the lowest price',
  getFailedCategory: 'should get Unprocessable Response when request invalid category id',
  getFailedForbiddenToken: 'should get Forbidden Response when request invalid category id',
  getFailedUnauthToken: 'should get Unauth Response when request invalid category id',
};
// add @skip for QR schema
describe(`@skip ${scenarioQRLowestPriceFr.describe}`, () => {
  let token;
  let respondPe;

  before(async () => {
    const userToLogin = userCredential.customer.djQrStaging;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.token;
    const bodyPriceEngine = testDataPe.bodyPostPeIphoneMultiVendor;
    respondPe = await priceEngineApi.postPriceEngine(bodyPriceEngine, token);
    expect(respondPe.status).to.equal(responseMessageCode.successOk);
    expect(respondPe.body[0].is_franco).to.equal(1);
  });

  it(`@happy ${scenarioQRLowestPriceFr.getCheapestPrice}`, async () => {
    const respond = await cheapestpriceApi.getCheapestPrice(testData.dataPathIphone, token);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    const currentCheapestPrice = respond.body.price;
    const expectedCheapestPrice = cheapestpriceApi.getLowestPrice(respondPe.body);
    expect(currentCheapestPrice).to.equal(expectedCheapestPrice);
    expect(respond.body).to.jsonSchema(schemaAssertion.getValidResponseCheapestPrice);
  });
});
// add @skip for QR schema
describe(`@skip ${scenarioQRLowestPriceLoco.describe}`, () => {
  let token;
  let respondPe;

  before(async () => {
    const userToLogin = userCredential.customer.ikiQrLocoStaging;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.token;
    const bodyPriceEngine = testDataPe.bodyPostPeIphoneMultiVendor;
    respondPe = await priceEngineApi.postPriceEngine(bodyPriceEngine, token);
    expect(respondPe.status).to.equal(responseMessageCode.successOk);
    expect(respondPe.body[0].is_franco).to.equal(0);
  });

  it(`@happy ${scenarioQRLowestPriceLoco.getCheapestPricePe}`, async () => {
    const respond = await cheapestpriceApi.getCheapestPrice(testData.dataPathIphone, token);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    const currentCheapestPrice = respond.body.price;
    const expectedCheapestPrice = cheapestpriceApi.getLowestPrice(respondPe.body);
    expect(currentCheapestPrice).to.equal(expectedCheapestPrice);
    expect(respond.body).to.jsonSchema(schemaAssertion.getValidResponseCheapestPrice);
  });
});
// add @skip for QR schema
describe(`@skip ${scenarioQRLowestPriceOutLoco.describe}`, () => {
  let token;
  let respondPe;

  before(async () => {
    const userToLogin = userCredential.customer.ikiQrLocoStaging;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.token;
    const bodyPriceEngine = testDataPe.bodyPostPeBerasMultiVendor;
    respondPe = await priceEngineApi.postPriceEngine(bodyPriceEngine, token);
    expect(respondPe.status).to.equal(responseMessageCode.successOk);
    expect(respondPe.body[0].is_franco).to.equal(0);
  });

  it(`@happy ${scenarioQRLowestPriceOutLoco.getCheapestPricePe}`, async () => {
    const respond = await cheapestpriceApi.getCheapestPrice(testData.dataPathBeras, token);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    const currentCheapestPrice = respond.body.price;
    const expectedCheapestPrice = cheapestpriceApi.getLowestPrice(respondPe.body);
    expect(currentCheapestPrice).to.equal(expectedCheapestPrice);
    expect(respond.body).to.jsonSchema(schemaAssertion.getValidResponseCheapestPrice);
  });
});
// add @skip for QR schema
describe(`@skip ${scenarioQRLowestPriceFRmultiHub.describe}`, () => {
  let token;
  let respondPe;

  before(async () => {
    const userToLogin = userCredential.customer.hardiQrFrancoStaging;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.token;
    const bodyPriceEngine = testDataPe.bodyPostPeMacbookMultiVendor;
    respondPe = await priceEngineApi.postPriceEngine(bodyPriceEngine, token);
    expect(respondPe.status).to.equal(responseMessageCode.successOk);
  });

  it(`@happy ${scenarioQRLowestPriceFRmultiHub.getCheapestPrice}`, async () => {
    const respond = await cheapestpriceApi.getCheapestPrice(testData.dataPathMacbook, token);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    const currentCheapestPrice = respond.body.price;
    const expectedCheapestPrice = cheapestpriceApi.getLowestPrice(respondPe.body);
    expect(currentCheapestPrice).to.equal(expectedCheapestPrice);
    expect(respond.body).to.jsonSchema(schemaAssertion.getValidResponseCheapestPrice);
  });
});
// add @skip for QR schema
describe(`@skip ${scenarioQRLowestPriceOutFR.describe}`, () => {
  let token;
  let respondPe;

  before(async () => {
    const userToLogin = userCredential.customer.djQrStaging;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.token;
    const bodyPriceEngine = testDataPe.bodyPostPeMacbookMultiVendor;
    respondPe = await priceEngineApi.postPriceEngine(bodyPriceEngine, token);
    expect(respondPe.status).to.equal(responseMessageCode.successOk);
    expect(respondPe.body[0].is_franco).to.equal(0);
  });

  it(`@happy ${scenarioQRLowestPriceOutFR.getCheapestPrice}`, async () => {
    const respond = await cheapestpriceApi.getCheapestPrice(testData.dataPathMacbook, token);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    const currentCheapestPrice = respond.body.price;
    const expectedCheapestPrice = cheapestpriceApi.getLowestPrice(respondPe.body);
    expect(currentCheapestPrice).to.equal(expectedCheapestPrice);
    expect(respond.body).to.jsonSchema(schemaAssertion.getValidResponseCheapestPrice);
  });
});
// add @skip for QR schema
describe(`@skip ${scenarioQRLowestPriceNotAble.describe}`, () => {
  let token;

  before(async () => {
    const userToLogin = userCredential.customer.djQrStaging;
    const respond = await common.getTokenFo(userToLogin);
    expect(respond.status).to.equal(responseMessageCode.successOk);
    token = respond.body.token;
  });

  it(`@negative ${scenarioQRLowestPriceNotAble.getFailedCategory}`, async () => {
    const respond = await cheapestpriceApi.getCheapestPrice(testData.dataInvalidCategoryPathIphone, token);
    expect(respond.status).to.equal(responseMessageCode.failedUnprocessableEntity.codeNumber);
  });

  it(`@negative ${scenarioQRLowestPriceNotAble.getFailedForbiddenToken}`, async () => {
    const respond = await cheapestpriceApi.getCheapestPrice(testData.dataPathMacbook, testData.token.invalid);
    expect(respond.status).to.equal(responseMessageCode.failedForbiddenInvalidToken.codeNumber);
  });

  it(`@negative ${scenarioQRLowestPriceNotAble.getFailedUnauthToken}`, async () => {
    const respond = await cheapestpriceApi.getCheapestPriceWoToken(testData.dataPathMacbook);
    expect(respond.status).to.equal(responseMessageCode.failedUnauthorized.codeNumber);
  });
});
