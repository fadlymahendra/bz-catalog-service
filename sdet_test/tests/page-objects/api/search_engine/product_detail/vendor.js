/* eslint no-unused-vars: off */
/* global env */
const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_FO);
const path = '/search-engine/product-detail/vendors';

function postProductDetailVendor(dataBody, token) {
  return api.post(path)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', token)
    .send(dataBody);
}

function postFailedProductDetailVendor(dataBody) {
  return api.post(path)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send(dataBody);
}

module.exports = {
  postProductDetailVendor,
  postFailedProductDetailVendor,
};
