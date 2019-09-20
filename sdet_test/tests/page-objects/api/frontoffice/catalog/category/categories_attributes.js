const supertest = require('supertest');

const api = supertest(process.env.API_BASE_URL_FO);

const path = '/catalog/categories';

function getCategoriesAttributes(categoryID, token) {
  return api.get(`${path}/${categoryID}/attributes`)
    .set('Authorization', token)
    .set('Accept', 'application/json');
}

function getCategoriesAttributesWoAuth(categoryID) {
  return api.get(`${path}/${categoryID}/attributes`)
    .set('Accept', 'application/json');
}

module.exports = {
  getCategoriesAttributes,
  getCategoriesAttributesWoAuth,
};
