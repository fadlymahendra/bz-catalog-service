/* eslint no-unused-vars: off */
/* eslint camelcase: off */
/* global env */

const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_WEBHOOK);
const apiFo = supertest(process.env.API_BASE_URL_FO);
const path = '/TEST/webhook/external/logs';
const productPath = '/catalog/vendors';

function getWebhookLogs(query) {
  return api.get(`${path}`)
    .query(query)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json');
}

function getWebhookLogsDetail(id) {
  return api.get(`${path}/${id}`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json');
}

function sleep(miliseconds) {
  const currentTime = new Date().getTime();

  while (currentTime + miliseconds >= new Date().getTime()) {
    // no activity
  }
}

function putUpdateProduct(vendorId, skuID, body, token) {
  return apiFo.put(`${productPath}/${vendorId}/products/${skuID}`)
    .set('Authorization', token)
    .set('Accept', 'application/json')
    .send(body);
}

module.exports = {
  getWebhookLogs,
  getWebhookLogsDetail,
  sleep,
  putUpdateProduct,
};
