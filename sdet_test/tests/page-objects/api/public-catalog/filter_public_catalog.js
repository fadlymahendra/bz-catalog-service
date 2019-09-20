const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_ECATALOG);
const apiKey = process.env.API_ECATALOG_KEY;
const path = '/catalog/search';

function postFilterPublicCatalog(query, body, key = apiKey) {
  return api.post(path)
    .query(query)
    .set('Accept', 'application/json')
    .set('x-api-key', key)
    .send(body)
}

function postFilterPublicCatalogWithoutKey(query, body) {
  return api.post(path)
    .query(query)
    .set('Accept', 'application/json')
    .send(body)
}

module.exports = {
  postFilterPublicCatalog,
  postFilterPublicCatalogWithoutKey
};