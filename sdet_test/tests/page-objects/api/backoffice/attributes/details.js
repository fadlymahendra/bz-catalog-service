/* eslint no-unused-vars:off */
const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_BO);
const common = require('./../../../../helper/common.js');

const path = '/catalog/attributes';

function getAttributes(attributeId, token, response) {
  api.get(`${path}/${attributeId}`)
    .set('Authorization', token)
    .set('Content-Type', 'application/json')
    .end((err, result) => {
      response(result);
    });
}

function getAttributeWithoutAuth(attributeId, response) {
  api.get(`${path}/${attributeId}`)
    .set('Content-Type', 'application/json')
    .end((err, result) => {
      response(result);
    });
}

module.exports = {
  getAttributes,
  getAttributeWithoutAuth,
};
