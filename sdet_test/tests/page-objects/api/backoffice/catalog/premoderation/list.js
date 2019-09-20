/* eslint no-unused-vars:off */
const supertest = require('supertest');
const env = require('dotenv').config();
const common = require('./../../../../../helper/common.js');

const api = supertest(process.env.API_BASE_URL_BO);
const premodListPath = '/catalog/premoderations';

function getPremodList(query, token, response) {
  api.get(premodListPath)
    .query(query)
    .set('Authorization', token)
    .set('Accept', 'application/json')
    .end((err, result) => {
      response(result);
    });
}

function getPremodListWoAuth(query, callback) {
  api.get(premodListPath)
    .query(query)
    .set('Accept', 'application/json')
    .end((err, result) => {
      callback(result);
    });
}

module.exports = {
  getPremodList,
  getPremodListWoAuth,
};
