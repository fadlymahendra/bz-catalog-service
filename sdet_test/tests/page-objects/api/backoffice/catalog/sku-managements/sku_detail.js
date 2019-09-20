const supertest = require('supertest');

const api = supertest(process.env.API_BASE_URL_BO);
const path = '/catalog/sku-managements';

function getSKUDetail(skuID, token) {
  return api.get(`${path}/${skuID}`)
    .set('Authorization', token)
    .set('Accept', 'application/json');
}

function getSKUDetailWithoutAuth(skuID) {
  return api.get(`${path}/${skuID}`)
    .set('Accept', 'application/json');
}

module.exports = {
  getSKUDetail,
  getSKUDetailWithoutAuth,
};
