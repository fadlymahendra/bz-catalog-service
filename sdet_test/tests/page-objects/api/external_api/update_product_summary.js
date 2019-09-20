/* eslint no-unused-vars: off */
/* eslint camelcase: off */
/* global env */

const supertest = require('supertest');
const env = require('dotenv').config();
const jwt = require('jsonwebtoken');

const api = supertest(process.env.API_PUBLIC_URL);
const path = '/catalogs/product/update-product-summary';

function constructJwtToken(clientDetail) {
  const { email, client_id, organization_id, secretKey, exp } = { ...clientDetail };
  const token = jwt.sign(
    {
      exp: exp === 'invalid' ? Math.floor(Date.now() / 1000) - (60 * 60 * 24) : Math.floor(Date.now() / 1000) + (60 * 60 * 24),
      email,
      client_id,
      organization_id,
    }, secretKey,
  );
  return token;
}

function constructJwtTokenWithoutOrganizationId(clientDetail) {
  const { email, client_id, secretKey, exp } = { ...clientDetail };
  const token = jwt.sign(
    {
      exp: exp === 'invalid' ? Math.floor(Date.now() / 1000) - (60 * 60 * 24) : Math.floor(Date.now() / 1000) + (60 * 60 * 24),
      email,
      client_id,
    }, secretKey,
  );
  return token;
}

function putUpdateProductSummary(vendorId, requestBody, token) {
  return api.put(`${path}/${vendorId}`)
    .send(requestBody)
    .set('Accept', 'application/json')
    .set('Authorization', token);
}

function putUpdateProductSummaryWithoutToken(vendorId, requestBody) {
  return api.put(`${path}/${vendorId}`)
    .send(requestBody)
    .set('Accept', 'application/json');
}

module.exports = {
  constructJwtToken,
  putUpdateProductSummary,
  putUpdateProductSummaryWithoutToken,
  constructJwtTokenWithoutOrganizationId,
};
