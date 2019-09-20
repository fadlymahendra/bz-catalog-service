const supertest = require('supertest');

const api = supertest(process.env.API_BASE_URL_FO);
const uomsPath = '/catalog/uoms';

// Search brand 
function searchUoms(token) {
  return api.get(uomsPath)
    .set('Authorization', token)
    .set('Accept', 'application/json');
}

function searchUomsWoAuth() {
  return api.get(uomsPath)
    .set('Accept', 'application/json');
}

module.exports = {
  searchUoms,
  searchUomsWoAuth,
}