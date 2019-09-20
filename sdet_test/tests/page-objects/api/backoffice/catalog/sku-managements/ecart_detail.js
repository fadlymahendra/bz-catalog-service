/* eslint no-unused-vars: off */
/* eslint prefer-destructuring:off */


const should = require('chai').should();
const { expect } = require('chai');
const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_BO);
const common = require('./../../../../../helper/common.js');

const path = '/catalog/sku-managements';

function ecartDetail(skuID, token) {
  return api.get(`${path}/${skuID}/ecart`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', token);
}

function ecartDetailWithoutAuth(skuID, token) {
  return api.get(`${path}/${skuID}/ecart`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', token);
}


module.exports = {
  ecartDetail,
  ecartDetailWithoutAuth,
};
