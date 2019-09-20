/* eslint no-unused-vars:off */

const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_BO);
const path = '/catalog/variants';

function variantList(query, token, response) {
  api.get(path)
    .query(query)
    .set('Authorization', token)
    .set('Accept', 'application/json')
    .end((err, result) => {
      response(result);
    });
}

function variantListWoAuth(query, callback) {
  api.get(path)
    .query(query)
    .set('Accept', 'application/json')
    .end((err, result) => {
      callback(result);
    });
}

module.exports = {
  variantList,
  variantListWoAuth,
};
