const supertest = require('supertest');

const api = supertest(process.env.API_BASE_URL_FO);
const warrantyOptionPath = '/catalog/warranty/options';

// Warranty option list
function warrantyOption(token) {
  return api.get(warrantyOptionPath)
    .set('Authorization', token)
    .set('Accept', 'application/json');
}

function warrantyOptionWoAuth() {
  return api.get(warrantyOptionPath)
    .set('Accept', 'application/json');
}

module.exports = {
  warrantyOption,
  warrantyOptionWoAuth,
}