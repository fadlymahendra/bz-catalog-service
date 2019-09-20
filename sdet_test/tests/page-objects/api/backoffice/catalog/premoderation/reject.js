/* eslint no-unused-vars: off */
const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_BO);
const path = '/catalog/premoderations';

function putPremodReject(skuId, body, token, response) {
  api.put(`${path}/${skuId}/reject`)
    .set('Authorization', token)
    .set('Content-Type', 'application/json')
    .send(body)
    .end((err, result) => {
      response(result);
    });
}

function putPremodRejectWoAuth(skuId, body, response) {
  api.put(`${path}/${skuId}/reject`)
    .set('Content-Type', 'application/json')
    .send(body)
    .end((err, result) => {
      response(result);
    });
}

module.exports = {
  putPremodReject,
  putPremodRejectWoAuth,
};
