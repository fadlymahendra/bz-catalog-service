/* eslint no-unused-vars:off */

const should = require('chai').should();
const { expect } = require('chai');
const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_FO);
const common = require('./../../../../../helper/common.js');

const path = '/catalog/vendors';

const productCount = (vendorId, token, response) => {
  api.get(`${path}/${vendorId}/summary/product-count`)
    .set('Authorization', token)
    .set('Accept', 'application/json')
    .end((err, result) => {
      response(result);
    });
};

const productCountNoAuth = (vendorId, response) => {
  api.get(`${path}/${vendorId}/summary/product-count`)
    .set('Accept', 'application/json')
    .end((err, result) => {
      response(result);
    });
};

module.exports = {
  productCount,
  productCountNoAuth,
};
