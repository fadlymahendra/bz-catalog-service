/* eslint no-unused-vars:off */
const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_FO);
const common = require('./../../../../../helper/common.js');

const path = '/catalog/vendors';

function getPrivateCustomerList(vendorId, productId, token) {
  return api.get(`${path}/${vendorId}/list-customer/${productId}`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', token);
}

function getPrivateCustomerListWoAuth(vendorId, productId) {
  return api.get(`${path}/${vendorId}/list-customer/${productId}`)
    .set('Accept', 'application/json');
}

module.exports = {
  getPrivateCustomerList,
  getPrivateCustomerListWoAuth,
};
