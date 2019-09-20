const supertest = require('supertest');

const api = supertest(process.env.API_BASE_URL_BO);
const skuManagePath = '/catalog/sku-managements';

function skuManageList(token) {
  return api.get(skuManagePath)
    .set('Authorization', token)
    .set('Accept', 'application/json');
}

function skuManageListWithoutAuth() {
  return api.get(skuManagePath)
    .set('Accept', 'application/json');
}

function getSKUList(query, token) {
  return api.get(skuManagePath)
    .query(query)
    .set('Authorization', token)
    .set('Accept', 'application/json');
}
module.exports = {
  skuManageList,
  getSKUList,
  skuManageListWithoutAuth,
};
