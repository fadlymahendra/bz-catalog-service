/* eslint no-unused-vars: off */

const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_FO);
const common = require('../../../../../helper/common.js');

const path = '/catalog/vendors';

function postRequestProduct(vendorId, body, token, response) {
  api.post(`${path}/${vendorId}/premoderations`)
    .set('Authorization', token)
    .set('Content-Type', 'application/json')
    .send(body)
    .end((err, result) => {
      response(result);
    });
}

function postRequestProductWoAuth(vendorId, body, callback) {
  api.post(`${path}/${vendorId}/premoderations`)
    .set('Content-Type', 'application/json')
    .send(body)
    .end((err, result) => {
      callback(result);
    });
}

module.exports = {
  postRequestProduct,
  postRequestProductWoAuth,
};
