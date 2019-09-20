/* eslint no-unused-vars:off */

const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_FO);
const path = '/catalog/vendors';

function vendorUpdatePremoderation(vendorId, skuId, body, token) {
  return api.put(`${path}/${vendorId}/premoderations/${skuId}`)
    .set('Authorization', token)
    .set('Accept', 'application/json')
    .send(body);
}

function vendorUpdatePremodWoAuth(vendorId, skuId, updateBody) {
  return api.put(`${path}/${vendorId}/premoderations/${skuId}`)
    .set('Accept', 'application/json')
    .send(updateBody);
}

module.exports = {
  vendorUpdatePremoderation,
  vendorUpdatePremodWoAuth,
};
