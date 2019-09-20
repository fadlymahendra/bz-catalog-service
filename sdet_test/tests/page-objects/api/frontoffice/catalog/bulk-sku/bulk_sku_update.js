
const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_FO);

const path = '/catalog/vendors';

function downloadBulkUpdate(vendorId, token, authSelection, response) {
  if (authSelection === 'with-auth') {
    api.get(`${path}/${vendorId}/download-template-update`)
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .end((err, result) => {
        response(result);
      });
  } else if (authSelection === 'without-auth') {
    api.get(`${path}/${vendorId}/download-template-update`)
      .set('Accept', 'application/json')
      .end((err, result) => {
        response(result);
      });
  }
}

function getS3Url(response) {
  return response.body.data;
}

function checktemplate(requestUrl, response) {
  const s3Url = getS3Url(requestUrl);
  supertest('')
    .get(s3Url)
    .set('Accept', 'application/octet-stream')
    .end((err, result) => {
      response(result);
    });
}

function historyBulkUpdate(vendorId, param, token, authSelection, response) {
  if (authSelection === 'with-auth') {
    api.get(`${path}/${vendorId}/bulk-history-update`)
      .query(param)
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .end((err, result) => {
        response(result);
      });
  } else if (authSelection === 'without-auth') {
    api.get(`${path}/${vendorId}/bulk-history-update`)
      .query(param)
      .set('Accept', 'application/json')
      .end((err, result) => {
        response(result);
      });
  }
}

module.exports = {
  downloadBulkUpdate,
  checktemplate,
  historyBulkUpdate,
};
