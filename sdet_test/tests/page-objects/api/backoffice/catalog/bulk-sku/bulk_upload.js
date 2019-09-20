/* eslint no-unused-vars: off */
/* global env */
const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_BO);
const path = '/catalog/bulk-upload';

function postAddProducts(dataBody, token) {
  return api.post(path)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', token)
    .send(dataBody);
}

module.exports = {
  postAddProducts,
};
