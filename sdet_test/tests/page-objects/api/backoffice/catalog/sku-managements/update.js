const supertest = require('supertest');

const api = supertest(process.env.API_BASE_URL_BO);
const path = '/catalog/sku-managements';

function updateSku(skuID, body, token) {
  return api.put(`${path}/${skuID}`)
    .set('Authorization', token)
    .set('Accept', 'application/json')
    .send(body);
}

function updateSkuWithoutAuth(skuID, body) {
  return api.put(`${path}/${skuID}`)
    .set('Accept', 'application/json')
    .send(body);
}

module.exports = {
  updateSku,
  updateSkuWithoutAuth,
};
