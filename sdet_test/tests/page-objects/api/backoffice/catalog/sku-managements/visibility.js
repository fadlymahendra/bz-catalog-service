const supertest = require('supertest');

const api = supertest(process.env.API_BASE_URL_BO);
const path = '/catalog/sku-managements';

function skuVisibility(skuId, body, token) {
  return api.put(`${path}/${skuId}/visibility`)
    .set('Authorization', token)
    .set('Accept', 'application/json')
    .send(body);
}

function skuVisibilityWithoutAuth(skuId, body) {
  return api.put(`${path}/${skuId}/visibility`)
    .set('Accept', 'application/json')
    .send(body);
}

module.exports = {
  skuVisibility,
  skuVisibilityWithoutAuth,
};
