const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_FO);
const path = '/catalog/vendors';

function getBulkTemplate(vendorId, token) {
  return api.get(`${path}/${vendorId}/download-template-upload`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', token);
}

function getBulkTemplateUpdate(vendorId, token) {
  return api.get(`${path}/${vendorId}/download-template-update`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', token);
}

function getBulkTemplateWithoutAuth(vendorId) {
  return api.get(`${path}/${vendorId}/download-template-upload`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
}

function getBulkTemplateUpdateWithoutAuth(vendorId) {
  return api.get(`${path}/${vendorId}/download-template-update`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
}

function getTemplate(pathFile) {
  return supertest('')
    .get(pathFile);
}

module.exports = {
  getBulkTemplate,
  getBulkTemplateUpdate,
  getBulkTemplateWithoutAuth,
  getBulkTemplateUpdateWithoutAuth,
  getTemplate,
};
