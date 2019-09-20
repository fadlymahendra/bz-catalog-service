/* eslint no-unused-vars: off */
/* global env */
const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_BO);
const path = '/catalog/categories/management';


function getListCategoryManagement(query, token, callback) {
  api.get(path)
    .query(query)
    .set('Accept', 'application/json')
    .set('Authorization', token)
    .end((err, result) => {
      callback(err, result);
    });
}

function getListCategoryManagementWithoutAuth(query, callback) {
  api.get(path)
    .query(query)
    .set('Accept', 'application/json')
    .end((err, result) => {
      callback(err, result);
    });
}


module.exports = {
  getListCategoryManagement,
  getListCategoryManagementWithoutAuth,
};
