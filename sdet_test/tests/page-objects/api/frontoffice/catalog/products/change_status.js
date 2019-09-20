/* eslint no-unused-vars:off */
const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_FO);

const path = '/catalog/vendors';

function changeStatus(vendorId, skuId, body, token) {
  return api.put(`${path}/${vendorId}/products/${skuId}/status`)
    .set('Authorization', token)
    .set('Accept', 'application/json')
    .send(body);
}

function changeStatusWoAuth(vendorId, skuId, body) {
  return api.put(`${path}/${vendorId}/products/${skuId}/status`)
    .set('Accept', 'application/json')
    .send(body);
}

module.exports = {
  changeStatus,
  changeStatusWoAuth,
};
