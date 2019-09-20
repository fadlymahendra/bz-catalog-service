/* eslint camelcase: off */

const supertest = require('supertest');

const api = supertest(process.env.API_BASE_URL_BO);

const path = '/catalog/premoderations/reject-reasons';

function rejectList(token) {
  return api.get(path)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', token);
}

function rejectListWithoutAuth() {
  return api.get(path)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json');
}

module.exports = {
  rejectList,
  rejectListWithoutAuth,
};
