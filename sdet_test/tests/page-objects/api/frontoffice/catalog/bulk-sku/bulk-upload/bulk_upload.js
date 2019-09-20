/* eslint no-unused-vars: off */
/* global env */
const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL);
const path = '/your/api/path';// replace this LINE with your api path

/* SET YOUR API spec below add or remove as necessary */
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

module.exports = {
  getBulkUpload,
  postBulkUpload,
  putBulkUpload,
  deleteBulkUpload,
};
