/* eslint no-unused-vars: off */
/* global env */
const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_FO);
const path = '/contract/agreements';


function getAgreementDetails(id, token) {
  return api.get(`${path}/${id}`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', token);
}

module.exports = {
  getAgreementDetails,
};
