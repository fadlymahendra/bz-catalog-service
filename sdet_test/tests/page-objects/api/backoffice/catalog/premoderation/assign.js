/* eslint no-unused-vars: off */
const env = require('dotenv').config();
const supertest = require('supertest');
const common = require('./../../../../../helper/common.js');

const api = supertest(process.env.API_BASE_URL_BO);
const path = '/catalog/premoderations/assign';

function postPremodAssign(body, token, response) {
  api.post(path)
    .set('Authorization', token)
    .set('Content-Type', 'application/json')
    .send(body)
    .end((err, result) => {
      response(result);
    });
}

function postPremodAssignWoAuth(body, callback) {
  api.post(path)
    .set('Content-Type', 'application/json')
    .send(body)
    .end((err, result) => {
      callback(result);
    });
}

module.exports = {
  postPremodAssign,
  postPremodAssignWoAuth,
};
