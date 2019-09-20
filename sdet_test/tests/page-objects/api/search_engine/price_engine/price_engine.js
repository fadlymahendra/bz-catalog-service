/* eslint no-unused-vars: off */
/* global env */
const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_FO);
const path = '/search-engine/price';

function postPriceEngine(dataBody, token) {
  return api.post(path)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', token)
    .send(dataBody);
}

function topAdjustmentFormula(ajsParams) {
  const spread = parseFloat(ajsParams.sub) / 100;
  const costOfFound = parseFloat(ajsParams.cof) / 100;
  const adjustment = parseFloat((1 + ((1 + spread) * costOfFound) / 30));
  const top = (ajsParams.topC - ajsParams.topV) > 0 ? (ajsParams.topC - ajsParams.topV) : 0;
  const topAdjustment = parseFloat(((adjustment ** top) - 1) * 100);
  return topAdjustment;
}

function marginFormula(margin, topAdjustment) {
  return parseFloat(margin.bm) + parseFloat(margin.rebate) + parseFloat(margin.salesAdjustment) + parseFloat(topAdjustment) + parseFloat(margin.fulfillmentFee);
}

function priceEngineFormula(peParams, srpVendor) {
  const ajsTotal = topAdjustmentFormula(peParams.adjustment);
  const marginTotal = parseFloat(marginFormula(peParams.margin, ajsTotal));
  const srp = parseFloat(srpVendor);
  const pe = parseInt((srp / (1 - (marginTotal / 100))).toFixed(0), 10);
  return pe;
}

function priceDiscountFormula(discountType, basePrice, discount) {
  let price;
  switch (discountType) {
    case 'PERCENTAGE':
      price = parseInt((basePrice - (basePrice * discount / 100)).toFixed(0), 10);
      break;
    case 'PRICE':
      price = parseInt(basePrice - discount, 10);
      break;
    default:
      price = 0;
  }
  return price;
}

module.exports = {
  postPriceEngine,
  priceEngineFormula,
  priceDiscountFormula,
};
