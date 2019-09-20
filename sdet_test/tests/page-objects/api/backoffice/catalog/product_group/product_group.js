/* eslint no-unused-vars: off */

const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_BO);
const common = require('./../../../../../helper/common.js');

const cataloge = {
  productGroup: '/catalog/product-groups',
};


const getProductGroupList = (query, tokenSelection, response) => {
  api.get(cataloge.productGroup)
    .query(query)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', tokenSelection)
    .end((err, result) => {
      response(result);
    });
};

const postProductGroup = (body, tokenSelection, response) => {
  api.post(cataloge.productGroup)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', tokenSelection)
    .send(body)
    .end((err, result) => {
      response(result);
    });
};

const getProductGroupDetail = (pgId, tokenSelection, response) => {
  api.get(`${cataloge.productGroup}/${pgId}`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', tokenSelection)
    .end((err, result) => {
      response(result);
    });
};

const putProductGroup = (pgId, body, tokenSelection, response) => {
  api.put(`${cataloge.productGroup}/${pgId}`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', tokenSelection)
    .send(body)
    .end((err, result) => {
      response(result);
    });
};

const delProductGroup = (pgId, tokenSelection, response) => {
  api.delete(`${cataloge.productGroup}/${pgId}`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', tokenSelection)
    .end((err, result) => {
      response(result);
    });
};

const visProductGroup = (pgId, body, tokenSelection, response) => {
  api.put(`${cataloge.productGroup}/${pgId}/visibility`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', tokenSelection)
    .send(body)
    .end((err, result) => {
      response(result);
    });
};

const getSkuDetails = (pgId, tokenSelection, response) => {
  api.get(`${cataloge.productGroup}/${pgId}/skus`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', tokenSelection)
    .end((err, result) => {
      response(result);
    });
};

const addSkuProductGroup = (pgId, body, tokenSelection, response) => {
  api.put(`${cataloge.productGroup}/${pgId}/add-sku`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', tokenSelection)
    .send(body)
    .end((err, result) => {
      response(result);
    });
};

const getHistoryProductGroup = (pgId, tokenSelection, response) => {
  api.get(`${cataloge.productGroup}/${pgId}/histories`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', tokenSelection)
    .end((err, result) => {
      response(result);
    });
};

// function for async await
function putBoProductGroup(pgId, body, tokenSelection) {
  return api.put(`${cataloge.productGroup}/${pgId}`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', tokenSelection)
    .send(body);
}

function putBoProductGroupVisibility(pgId, body, tokenSelection) {
  return api.put(`${cataloge.productGroup}/${pgId}/visibility`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', tokenSelection)
    .send(body);
}

function getPGList(query, tokenSelection) {
  return api.get(cataloge.productGroup)
    .query(query)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', tokenSelection);
}

function getPGDetail(pgId, tokenSelection) {
  return api.get(`${cataloge.productGroup}/${pgId}`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', tokenSelection);
}

function getSkuDetail(pgId, tokenSelection) {
  return api.get(`${cataloge.productGroup}/${pgId}/skus`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', tokenSelection);
}

function getProductGroupIdWithoutProductGroupName(prodGroupName, responseBody) {
  let productGroupidList = responseBody.data.filter(item => item.name !== prodGroupName);
  productGroupidList = productGroupidList.map(item => item.id);
  return productGroupidList;
}

module.exports = {
  getProductGroupList,
  postProductGroup,
  getProductGroupDetail,
  putProductGroup,
  delProductGroup,
  visProductGroup,
  getSkuDetails,
  addSkuProductGroup,
  getHistoryProductGroup,
  putBoProductGroup,
  putBoProductGroupVisibility,
  getPGList,
  getPGDetail,
  getSkuDetail,
  getProductGroupIdWithoutProductGroupName,
};
