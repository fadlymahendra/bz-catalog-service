/* eslint no-unused-vars:off */
const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_FO);

const path = '/catalog/product-groups-categories';

function searchPgroupCategories(search, token) {
  return api.get(path)
    .query({ search })
    .set('Authorization', token)
    .set('Accept', 'application/json');
}

function searchPgroupCatNoAuth(search) {
  return api.get(path)
    .query({ search })
    .set('Accept', 'application/json');
}

function getTotalProductGroupCountByCategoryId(categoryId, response) {
  const categoryObject = response.body.data.find(category => category.id === categoryId);
  return categoryObject.total;
}

module.exports = {
  searchPgroupCategories,
  searchPgroupCatNoAuth,
  getTotalProductGroupCountByCategoryId,
};
