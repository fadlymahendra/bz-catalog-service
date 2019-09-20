/* eslint no-unused-vars:off */

const supertest = require('supertest');
const env = require('dotenv').config();
const common = require('./../../../../helper/common.js');

const api = supertest(process.env.API_BASE_URL_BO);
const path = '/catalog/variants';

function variantList(tokenSelection, authSelection, response) {
  if (authSelection === 'with-auth') {
    api.get(path)
      .set('Authorization', common.backoffice_auth(tokenSelection))
      .set('Accept', 'application/json')
      .end((err, result) => {
        response(result);
      });
  } else if (authSelection === 'without-auth') {
    api.get(path)
      .set('Accept', 'application/json')
      .end((err, result) => {
        response(result);
      });
  }
}

function variantListparam(param, tokenSelection, authSelection, response) {
  if (authSelection === 'with-auth') {
    api.get(path)
      .query(param)
      .set('Authorization', common.backoffice_auth(tokenSelection))
      .set('Accept', 'application/json')
      .end((err, result) => {
        response(result);
      });
  } else if (authSelection === 'without-auth') {
    api.get(path)
      .query(param)
      .set('Accept', 'application/json')
      .end((err, result) => {
        response(result);
      });
  }
}

function variantCreate(body, token) {
  return api.post(`${path}/create`)
    .set('Authorization', token)
    .set('Accept', 'application/json')
    .send(body);
}

function variantCreateWithoutAuth(body) {
  return api.post(`${path}/create`)
    .set('Accept', 'application/json')
    .send(body);
}

function variantDetail(variantId, token, authSelection, response) {
  if (authSelection === 'with-auth') {
    api.get(`${path}/${variantId}`)
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .end((err, result) => {
        response(result);
      });
  } else if (authSelection === 'without-auth') {
    api.get(`${path}/${variantId}`)
      .set('Accept', 'application/json')
      .end((err, result) => {
        response(result);
      });
  }
}

function variantHistory(variantId, token) {
  return api.get(`${path}/${variantId}/history`)
    .set('Authorization', token)
    .set('Accept', 'application/json');
}

function variantHistoryWithoutAuth(variantId) {
  return api.get(`${path}/${variantId}/history`)
    .set('Accept', 'application/json');
}

function variantUpdate(variantId, body, token) {
  return api.put(`${path}/${variantId}/update`)
    .set('Authorization', token)
    .set('Accept', 'application/json')
    .send(body);
}

function variantUpdateWithoutAuth(variantId, body) {
  return api.put(`${path}/${variantId}/update`)
    .set('Accept', 'application/json')
    .send(body);
}

function variantDelete(variantId, token) {
  return api.delete(`${path}/${variantId}/delete`)
    .set('Authorization', token)
    .set('Accept', 'application/json');
}

function variantDeleteWithoutAuth(variantId) {
  return api.delete(`${path}/${variantId}/delete`)
    .set('Accept', 'application/json');
}

module.exports = {
  variantList,
  variantListparam,
  variantCreate,
  variantCreateWithoutAuth,
  variantDetail,
  variantDelete,
  variantDeleteWithoutAuth,
  variantHistory,
  variantHistoryWithoutAuth,
  variantUpdate,
  variantUpdateWithoutAuth,
};
