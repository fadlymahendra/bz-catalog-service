/* eslint no-unused-vars: off */
/* global env */
const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_FO);
const path = '/catalog/vendors';


function postBulkUpload(query, token, callback) {
  api.post(path)
    .send(query)
    .set('Accept', 'application/json')
    .set('Authorization', token)
    .end((err, result) => {
      callback(err, result);
    });
}

function getBulkUpload(query, token, callback) {
  api.get(path)
    .query(query)
    .set('Accept', 'application/json')
    .set('Authorization', token)
    .end((err, result) => {
      callback(err, result);
    });
}

function putBulkUpload(query, token, callback) {
  api.put(path)
    .send(query)
    .set('Accept', 'application/json')
    .set('Authorization', token)
    .end((err, result) => {
      callback(err, result);
    });
}

function deleteBulkUpload(query, token, callback) {
  api.delete(`${path}/${query}`)
    .set('Accept', 'application/json')
    .set('Authorization', token)
    .end((err, result) => {
      callback(err, result);
    });
}

function postAddProducts(vendorId, dataBody, token) {
  return api.post(`${path}/${vendorId}/bulk-upload-sku`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', token)
    .send(dataBody);
}

function postUpdateProducts(vendorId, dataBody, token) {
  return api.put(`${path}/${vendorId}/bulk-update-sku`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', token)
    .send(dataBody);
}

module.exports = {
  getBulkUpload,
  postBulkUpload,
  putBulkUpload,
  deleteBulkUpload,
  postAddProducts,
  postUpdateProducts,
};
