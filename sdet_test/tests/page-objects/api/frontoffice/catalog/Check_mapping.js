const supertest = require('supertest');

const api = supertest(process.env.API_BASE_URL_FO);

const path = '/catalog/checkmapping';

function checkMapping(paramQuery, token) {
  return api.get(path)
    .query(paramQuery)
    .set('Authorization', token)
    .set('Accept', 'application/json');
}

function checkMappingWoAuth(paramQuery) {
  return api.get(path)
    .query(paramQuery)
    .set('Accept', 'application/json');
}

module.exports = {
  checkMapping,
  checkMappingWoAuth,
}