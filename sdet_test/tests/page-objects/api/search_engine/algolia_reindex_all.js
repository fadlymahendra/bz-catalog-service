/* eslint no-unused-vars: off */
/* global env */
const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_FO);
const path = '/search-engine/algolia/reindex/all';

function putAlgoliaReindexAll(body) {
  return api.put(path)
    .set('Accept', 'application/json')
    .send(body);
}

module.exports = {
  putAlgoliaReindexAll,
};
