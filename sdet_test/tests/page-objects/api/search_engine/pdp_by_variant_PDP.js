const supertest = require('supertest');

const api = supertest(process.env.API_BASE_URL_FO);
const path = '/search-engine/product-detail';

function byVariant(skuVariant, token) {
  return api.get(`${path}/${skuVariant}/variant/pdp`)
    .set('Authorization', token)
    .set('Accept', 'application/json');
}

function byVariantNoAuth(skuVariant) {
  return api.get(`${path}/${skuVariant}/variant/pdp`)
    .set('Accept', 'application/json');
}

function pdpByVariant(skuVariant, token) {
  return api.get(`${path}/${skuVariant}/variant/pdp`)
    .set('Authorization', token)
    .set('Accept', 'application/json');
}

module.exports = {
  byVariant,
  byVariantNoAuth,
  pdpByVariant,
};
