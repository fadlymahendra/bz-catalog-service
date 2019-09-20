const supertest = require('supertest');

const api = supertest(process.env.API_BASE_URL_FO);
const indentPeriodPath = '/catalog/indent/periods';

//Warranty indent list
function indentPeriod(token) {
  return api.get(indentPeriodPath)
    .set('Authorization', token)
    .set('Accept', 'application/json');
}

function indentPeriodWoAuth() {
  return api.get(indentPeriodPath)
    .set('Accept', 'application/json');
}

module.exports = {
  indentPeriod,
  indentPeriodWoAuth,
}