/* eslint no-unused-vars: off */
/* global env */
const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_FO);
const path = '/search-engine/cheapest';

function getCheapestPrice(dataPath, token) {
  return api.get(`${path}/${dataPath.sku_number}/${dataPath.category_id}/${dataPath.brand_id}`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', token);
}

function getCheapestPriceWoToken(dataPath) {
  return api.get(`${path}/${dataPath.sku_number}/${dataPath.category_id}/${dataPath.brand_id}`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json');
}

function getLowestTierDataPrice(priceShiping) {
  const price = priceShiping.reduce((prev, curr) => {
    let currValue;
    if (Object.prototype.hasOwnProperty.call(curr.tier_data, 'tier_price_3')) {
      currValue = curr.tier_data.tier_price_3;
    } else if (Object.prototype.hasOwnProperty.call(curr.tier_data, 'tier_price_2')) {
      currValue = curr.tier_data.tier_price_2;
    } else {
      currValue = curr.tier_data.tier_price_1;
    }
    const minValue = prev < currValue ? prev : currValue;
    return minValue;
  }, 999999999999);

  return price;
}

function getLowestPrice(priceTierData) {
  let shippingPrice;

  switch (priceTierData[0].is_franco) {
    case 1:
      shippingPrice = getLowestTierDataPrice(priceTierData[0].shipping);
      break;
    default:
      shippingPrice = 999999999999;
  }
  const tierPrice = getLowestTierDataPrice(priceTierData);
  const lowestPrice = Math.min(shippingPrice, tierPrice);
  return lowestPrice;
}

module.exports = {
  getLowestPrice,
  getCheapestPrice,
  getCheapestPriceWoToken,
};
