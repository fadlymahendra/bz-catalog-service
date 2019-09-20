/* eslint no-unused-vars: off */

const should = require('chai').should();
const { expect } = require('chai');
const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_FO);
const common = require('./../../../helper/common.js');

const path = '/search-engine/product-detail';

const byVariant = (sku, token, response) => {
  api.get(`${path}/${sku}/variant`)
    .set('Authorization', token)
    .set('Accept', 'application/json')
    .end((err, result) => {
      response(result);
    });
};

const byVariantNoAuth = (sku, response) => {
  api.get(`${path}/${sku}/variant`)
    .set('Accept', 'application/json')
    .end((err, result) => {
      response(result);
    });
};

module.exports = {
  byVariant,
  byVariantNoAuth,
};
