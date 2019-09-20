/* eslint no-unused-vars: off */
/* global env */
const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_BO);
const Path = '/employees';

function employeeList(token) {
  return api.get(Path)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', token);
}

function employeeListWithoutAuth() {
  return api.get(Path)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json');
}

module.exports = {
  employeeList,
  employeeListWithoutAuth,
};
