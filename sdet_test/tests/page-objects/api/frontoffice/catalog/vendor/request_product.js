/* eslint-disable no-undef */
/* eslint no-unused-vars: off */

const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_FO);
const common = require('../../../../../helper/common.js');

const path = '/catalog/vendors';

function postRequestProductWithProdGroup(vendorId, body, token, response) {
  api.post(`${path}/${vendorId}/products`)
    .set('Authorization', token)
    .set('Content-Type', 'application/json')
    .send(body)
    .end((err, result) => {
      response(result);
    });
}

function postRequestProductWithProdGroupWoAuth(vendorId, body, callback) {
  api.post(`${path}/${vendorId}/products`)
    .set('Content-Type', 'application/json')
    .send(body)
    .end((err, result) => {
      callback(result);
    });
}

function getRequestProductWithProdGroup(vendorId, productVariantId, token, callback) {
  api.get(`${path}/${vendorId}/products/${productVariantId}`)
    .set('Authorization', token)
    .set('Content-Type', 'application/json')
    .end((err, result) => {
      callback(result);
    });
}

module.exports = {
  postRequestProductWithProdGroup,
  postRequestProductWithProdGroupWoAuth,
  getRequestProductWithProdGroup,
};
