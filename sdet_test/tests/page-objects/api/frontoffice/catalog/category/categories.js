const supertest = require('supertest');

const api = supertest(process.env.API_BASE_URL_FO);
const categoriesPath = '/catalog/categories';

function searchCategories(token) {
  return api.get(categoriesPath)
    .set('Authorization', token)
    .set('Accept', 'application/json');
}

function searchCategoriesWoAuth() {
  return api.get(categoriesPath)
    .set('Accept', 'application/json');
}

module.exports = {
  searchCategories,
  searchCategoriesWoAuth,
}