/* eslint no-unused-vars:off */

const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_FO);
const common = require('./../../../../../helper/common.js');

const path = '/catalog/vendors';

function prodDetails(vendorId, pgId, token, response) {
  api.get(`${path}/${vendorId}/products/${pgId}`)
    .set('Authorization', token)
    .set('Accept', 'application/json')
    .end((err, result) => {
      response(result);
    });
}

function prodDetailWoAuth(vendorId, pgId, response) {
  api.get(`${path}/${vendorId}/products/${pgId}`)
    .set('Accept', 'application/json')
    .end((err, result) => {
      response(result);
    });
}

function getProductDetail(vendorId, pgId, token) {
  return api.get(`${path}/${vendorId}/products/${pgId}`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', token);
}

function getWarrantyInfoOnly(responseBody, skuLongName) {
  const skuLongNameWithWarrantyInfo = responseBody.product.find((sku) => {
    let mySku;
    if (sku.long_name.includes(skuLongName)) {
      const { long_name, warranty_option, warranty_period, warranty_limit, warranty_coverage } = { ...sku };
      mySku = { long_name, warranty_option, warranty_period, warranty_limit, warranty_coverage };
    }
    return mySku;
  });
  return skuLongNameWithWarrantyInfo;
}

module.exports = {
  prodDetails,
  prodDetailWoAuth,
  getProductDetail,
  getWarrantyInfoOnly,
};
