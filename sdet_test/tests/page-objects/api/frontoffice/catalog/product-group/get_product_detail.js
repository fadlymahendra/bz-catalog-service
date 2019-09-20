/* eslint no-unused-vars: off */
const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_FO);

const path = '/catalog/product-groups';

function getProductGroupDetail(pgroupId, token) {
  return api.get(`${path}/${pgroupId}`)
    .set('Authorization', token)
    .set('Accept', 'application/json');
}
function getProductGroupDetailWoAtuh(pgroupId) {
  return api.get(`${path}/${pgroupId}`)
    .set('Accept', 'application/json');
}

module.exports = {
  getProductGroupDetail,
  getProductGroupDetailWoAtuh,
};
