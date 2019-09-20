/* eslint no-unused-vars: off */
const env = require('dotenv').config();
const supertest = require('supertest');

const api = supertest(process.env.API_BASE_URL_FO);
const path = '/catalog/product-groups';

// search brand
function searchProdGroup(query, token) {
  return api.get(path)
    .query(query)
    .set('Authorization', token)
    .set('Accept', 'application/json');
}

function searchProdGroupWoAuth(query) {
  return api.get(path)
    .query(query)
    .set('Accept', 'application/json');
}

module.exports = {
  searchProdGroup,
  searchProdGroupWoAuth,
};
