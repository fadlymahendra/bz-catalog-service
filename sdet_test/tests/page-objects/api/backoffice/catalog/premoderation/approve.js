/* eslint no-unused-vars: off */

const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_BO);
const path = '/catalog/premoderations';

function putPremodApprove(skuId, body, token, response) {
  api.put(`${path}/${skuId}/approve`)
    .set('Authorization', token)
    .set('Content-Type', 'application/json')
    .send(body)
    .end((err, result) => {
      response(result);
    });
}

function putPremodApproveWoAuth(skuId, body, callback) {
  api.put(`${path}/${skuId}/approve`)
    .set('Content-Type', 'application/json')
    .send(body)
    .end((err, result) => {
      callback(result);
    });
}

module.exports = {
  putPremodApprove,
  putPremodApproveWoAuth,
};
