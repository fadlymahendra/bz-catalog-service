/* eslint no-unused-vars: off */
/* global env */
const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_FO);
const path = '/catalog/vendors';

function putUpdateProduct(vendorId, skuID, body, token, callback) {
  api.put(`${path}/${vendorId}/products/${skuID}`)
    .set('Accept', 'application/json')
    .set('Authorization', token)
    .send(body)
    .end((err, result) => {
      callback(err, result);
    });
}

module.exports = {
  putUpdateProduct,
};
