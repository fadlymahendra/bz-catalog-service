
const supertest = require('supertest');

const api = supertest(process.env.API_BASE_URL_FO);
const categoriesByIdPath = '/catalog/categories';

// Search brand
function getCategoriesById(categoryID, token) {
  return api.get(`${categoriesByIdPath}/${categoryID}`)
    .set('Authorization', token)
    .set('Accept', 'application/json');
}

function getCategoriesByIdWoAuth(categoryID) {
  return api.get(`${categoriesByIdPath}/${categoryID}`)
    .set('Accept', 'application/json');
}

module.exports = {
  getCategoriesById,
  getCategoriesByIdWoAuth,
};
