/* eslint no-unused-vars: off */
/* global env */
const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_FO);
const path = '/catalog/categories';

function getListCategoryPcp(token) {
  return api.get(`${path}/pcp`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', token);
}

function getListCategoryDetailPcp(catId, token) {
  return api.get(`${path}/${catId}/pcp`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', token);
}

module.exports = {
  getListCategoryPcp,
  getListCategoryDetailPcp,
};
