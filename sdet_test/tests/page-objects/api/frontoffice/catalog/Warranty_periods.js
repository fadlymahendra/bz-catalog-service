const supertest = require('supertest');

const api = supertest(process.env.API_BASE_URL_FO);
const warrantyPeriodPath = '/catalog/warranty/periods';

// Warranty period list
function warrantyPeriod(token) {
  return api.get(warrantyPeriodPath)
    .set('Authorization', token)
    .set('Accept', 'application/json');
}

function warrantyPeriodWoAuth() {
  return api.get(warrantyPeriodPath)
    .set('Accept', 'application/json');
}

module.exports = {
  warrantyPeriod,
  warrantyPeriodWoAuth,
}