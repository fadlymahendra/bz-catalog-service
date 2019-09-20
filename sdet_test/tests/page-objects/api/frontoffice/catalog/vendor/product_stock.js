/* eslint no-unused-vars:off */

const should = require('chai').should();
const { expect } = require('chai');
const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_FO);
const common = require('./../../../../../helper/common.js');

const path = '/catalog/vendors';

const productStock = (vendorId, sort, limit, token, response) => {
  api.get(`${path}/${vendorId}/summary/product-stocks`)
    .query({
      sort,
      limit,
    })
    .set('Authorization', token)
    .set('Accept', 'application/json')
    .end((err, result) => {
      response(result);
    });
};
const productStockNoAuth = (vendorId, sort, limit, response) => {
  api.get(`${path}/${vendorId}/summary/product-stocks`)
    .query({
      sort,
      limit,
    })
    .set('Accept', 'application/json')
    .end((err, result) => {
      response(result);
    });
};

module.exports = {
  productStock,
  productStockNoAuth,
};
