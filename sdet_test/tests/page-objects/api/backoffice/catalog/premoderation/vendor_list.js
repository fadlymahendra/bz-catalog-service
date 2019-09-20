/* eslint no-unused-vars: off */
/* eslint camelcase: off */

const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_BO);

const path = '/vendors';

function searchVendor(query, token) {
  return api.get(path)
    .query(query)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', token);
}

function searchVendorWithoutAuth(query) {
  return api.get(path)
    .query(query)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json');
}

module.exports = {
  searchVendor,
  searchVendorWithoutAuth,
};
