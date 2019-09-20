/* eslint no-unused-vars: off */
/* eslint camelcase: off */

const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_BO);
const path = '/catalog/premoderations/product-groups';

function prodGroup(token) {
  return api.get(path)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', token);
}

function prodGroupWithoutAuth() {
  return api.get(path)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json');
}

module.exports = {
  prodGroup,
  prodGroupWithoutAuth,
};
