/* eslint no-unused-vars:off */
const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_FO);
const common = require('./../../../../../helper/common.js');

const path = '/catalog/vendors';

function putNewStock(vendorId, productVendorId, body, token) {
  return api.put(`${path}/${vendorId}/products/${productVendorId}/stock`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', token)
    .send(body);
}

function putNewStockWoAuth(vendorId, productVendorId, body) {
  return api.put(`${path}/${vendorId}/products/${productVendorId}/stock`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send(body);
}

module.exports = {
  putNewStock,
  putNewStockWoAuth,
};
