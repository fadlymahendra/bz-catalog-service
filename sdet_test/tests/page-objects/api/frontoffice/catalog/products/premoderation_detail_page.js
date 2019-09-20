/* eslint no-unused-vars: off */
/* global env */
const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_FO);
const path = '/catalog/vendors';

function getPremoderationDetail(query, vendorId, premoderationId, token, callback) {
  api.get(`${path}/${vendorId}/premoderations/${premoderationId}`)
    .query(query)
    .set('Accept', 'application/json')
    .set('Authorization', token)
    .end((err, result) => {
      callback(err, result);
    });
}

module.exports = {
  getPremoderationDetail,
};
