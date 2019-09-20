const supertest = require('supertest');

const api = supertest(process.env.API_BASE_URL_FO);
const path = '/catalog/vendors';

function putPremodUpdate(vendorId, premodId, body, token) {
  return api.put(`${path}/${vendorId}/premoderations/${premodId}`)
    .set('Authorization', token)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send(body);
}

function putPremodUpdateWoAuth(vendorId, premodId, body) {
  return api.put(`${path}/${vendorId}/premoderations/${premodId}`)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send(body);
}

module.exports = {
  putPremodUpdate,
  putPremodUpdateWoAuth,
};
