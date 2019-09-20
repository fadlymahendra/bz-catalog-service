/* eslint no-unused-vars: off */
/* global env */
const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_FO);
const path = '/catalog/vendors';

function getCatalogListProduct(vendorId, dataQuery, token) {
  return api.get(`${path}/${vendorId}/products`)
    .query(dataQuery)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', token);
}

function putProductVendorStatus(vendorId, productId, dataBody, token) {
  return api.put(`${path}/${vendorId}/products/${productId}/status`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', token)
    .send(dataBody);
}

function putProductVendor(vendorId, productId, dataBody, token) {
  return api.put(`${path}/${vendorId}/products/${productId}/tiers`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', token)
    .send(dataBody);
}

function putProductVendorStock(vendorId, productId, dataBody, token) {
  return api.put(`${path}/${vendorId}/products/${productId}/stock`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', token)
    .send(dataBody);
}

module.exports = {
  getCatalogListProduct,
  putProductVendorStatus,
  putProductVendor,
  putProductVendorStock,
};
