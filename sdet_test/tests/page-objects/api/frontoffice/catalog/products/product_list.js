/* eslint no-unused-vars:off */
const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_FO);
const common = require('./../../../../../helper/common.js');

const path = '/catalog/vendors';

function getVendorProductList(vendorId, query, token) {
  return api.get(`${path}/${vendorId}/products`)
    .query(query)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', token);
}

function getVendorProductListWoAuth(vendorId, query) {
  return api.get(`${path}/${vendorId}/products`)
    .query(query)
    .set('Accept', 'application/json');
}

module.exports = {
  getVendorProductList,
  getVendorProductListWoAuth,
};
