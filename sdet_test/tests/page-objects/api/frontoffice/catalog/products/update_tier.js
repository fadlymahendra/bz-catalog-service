/* eslint no-unused-vars:off */

const should = require('chai').should();
const { expect } = require('chai');
const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_FO);
const common = require('./../../../../../helper/common.js');

const path = '/catalog/vendors';

const updateTiers = (vendorId, skuID, body, token, response) => {
  api.put(`${path}/${vendorId}/products/${skuID}/tiers`)
    .set('Authorization', token)
    .set('Accept', 'application/json')
    .send(body)
    .end((err, result) => {
      response(result);
    });
};
const updTiersNOAuth = (vendorId, skuID, body, response) => {
  api.put(`${path}/${vendorId}/products/${skuID}/tiers`)
    .set('Accept', 'application/json')
    .send(body)
    .end((err, result) => {
      response(result);
    });
};

module.exports = {
  updateTiers,
  updTiersNOAuth,
};
