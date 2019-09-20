/* eslint no-unused-vars:off */
const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_BO);
const path = '/catalog/premoderations';

function getPremodDetails(premodID, token, callback) {
  api.get(`${path}/${premodID}`)
    .set('Authorization', token)
    .set('Accept', 'application/json')
    .end((err, result) => {
      callback(result);
    });
}

function getPremodDetailsWoAuth(premodId, callback) {
  api.get(`${path}/${premodId}`)
    .set('Accept', 'application/json')
    .end((err, result) => {
      callback(result);
    });
}

module.exports = {
  getPremodDetails,
  getPremodDetailsWoAuth,
};
