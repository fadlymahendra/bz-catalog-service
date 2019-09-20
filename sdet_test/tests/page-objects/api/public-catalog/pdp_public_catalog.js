const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_ECATALOG);
const apiKey = process.env.API_ECATALOG_KEY;
const path = '/catalog/sku';
const pathCategory = '/catalog/category'

function getPDPPublicCatalog(id, key=apiKey) {
  return api.get(`${path}/${id}`)
    .set('Accept', 'application/json')
    .set('x-api-key', key)
}

function getPDPPublicCatalogWithoutKey(id) {
  return api.get(`${path}/${id}`)
    .set('Accept', 'application/json')
}

function getPDPCategory(id, key=apiKey) {
  return api.get(`${pathCategory}/${id}`)
    .set('Accept', 'application/json')
    .set('x-api-key', key)
}

function getPDPCategoryWithoutKey(id) {
  return api.get(`${pathCategory}/${id}`)
    .set('Accept', 'application/json')
}

module.exports = {
  getPDPPublicCatalog,
  getPDPPublicCatalogWithoutKey,
  getPDPCategory,
  getPDPCategoryWithoutKey
};