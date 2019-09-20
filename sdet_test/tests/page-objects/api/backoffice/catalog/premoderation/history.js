/* eslint no-unused-vars: off */
const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_BO);
const path = '/catalog/premoderations';

// sort, page, limit

function getPremodHistory(premodId, query, token, response) {
  api.get(`${path}/${premodId}/histories`)
    .query(query)
    .set('Authorization', token)
    .set('Accept', 'application/json')
    .end((err, result) => {
      response(result);
    });
}

function getPremodHistoryWoAuth(premodId, query, callback) {
  api.get(`${path}/${premodId}/histories`)
    .query(query)
    .set('Accept', 'application/json')
    .end((err, result) => {
      callback(result);
    });
}

module.exports = {
  getPremodHistory,
  getPremodHistoryWoAuth,
};
