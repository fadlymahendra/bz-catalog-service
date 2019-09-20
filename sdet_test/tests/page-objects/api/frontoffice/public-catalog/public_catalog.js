const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_ECATALOG);
const apiKey = process.env.API_ECATALOG_KEY;
const path = '/catalog/category';

function getCategoryPublicCatalog(key = apiKey) {
  return api.get(path)
    .set('Accept', 'application/json')
    .set('x-api-key', key)
}

function getCategoryPublicCatalogWithoutKey() {
  return api.get(path)
    .set('Accept', 'application/json')
}
module.exports = {
  getCategoryPublicCatalog,
  getCategoryPublicCatalogWithoutKey
};