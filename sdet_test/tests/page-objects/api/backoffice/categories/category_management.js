/* eslint no-unused-vars: off */
const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_BO);
const common = require('./../../../../helper/common.js');

const path = '/catalog/categories';
const level = '';

function list(query, token) {
  return api.get(path)
    .query(query)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Authorization', token);
}

function listWithoutAuth(query) {
  return api.get(path)
    .query(query)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');
}

function list2(token, search) {
  return api.get(path)
    .query({
      level,
      search,
    })
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Authorization', token);
}

function updateCategory(categoryId, body, token) {
  return api.put(`${path}/${categoryId}/update`)
    .set('Authorization', token)
    .set('Accept', 'application/json')
    .send(body);
}

function updateCategoryWithoutAuth(categoryId, body) {
  return api.put(`${path}/${categoryId}/update`)
    .set('Accept', 'application/json')
    .send(body);
}

function searchByBreadcrumb(query, token) {
  return api.get(`${path}/search`)
    .query(query)
    .set('Authorization', token)
    .set('Accept', 'application/json');
}

function searchByBreadcrumbWithoutAuth(query, body) {
  return api.get(`${path}/search`)
    .query(query)
    .set('Accept', 'application/json');
}

function postProcess(responseData) {
  return responseData.every(data => data.is_active === 1);
}

function create(body, token, callback) {
  api.post(`${path}/create`)
    .set('Accept', 'application/json')
    .set('Authorization', token)
    .send(body)
    .end((err, result) => {
      callback(err, result);
    });
}

function createWithoutAuth(body, callback) {
  api.post(`${path}/create`)
    .set('Accept', 'application/json')
    .send(body)
    .end((err, result) => {
      callback(err, result);
    });
}

function detail(idcategory, token) {
  return api.get(`${path}/${idcategory}`)
    .set('Authorization', token)
    .set('Accept', 'application/json');
}

function detailWithoutAuth(idcategory) {
  return api.get(`${path}/${idcategory}`)
    .set('Accept', 'application/json');
}


function getSingleCategoryDetail(categoryId, token) {
  return api.get(`${path}/${categoryId}/single`)
    .set('Authorization', token)
    .set('Accept', 'application/json');
}

function detailSingle(idcategory, token) {
  return api.get(`${path}/${idcategory}/single`)
    .set('Authorization', token)
    .set('Accept', 'application/json');
}

function detailSingleWithoutAuth(idcategory) {
  return api.get(`${path}/${idcategory}/single`)
    .set('Accept', 'application/json');
}

function history(idcategory, query, token) {
  return api.get(`${path}/${idcategory}/history`)
    .query(query)
    .set('Authorization', token)
    .set('Accept', 'application/json');
}

function historyWithoutAuth(idcategory, query) {
  return api.get(`${path}/${idcategory}/history`)
    .query(query)
    .set('Accept', 'application/json');
}

function deleteCategory(idcategory, token) {
  return api.del(`${path}/${idcategory}/delete`)
    .set('Authorization', token)
    .set('Accept', 'application/json');
}

function deleteCategoryWithoutAuth(idcategory) {
  return api.del(`${path}/${idcategory}/delete`)
    .set('Accept', 'application/json');
}

function attribute(idcategory, token) {
  return api.get(`${path}/${idcategory}/attributes`)
    .set('Authorization', token)
    .set('Accept', 'application/json');
}

function attributeWithoutAuth(idcategory) {
  return api.get(`${path}/${idcategory}/attributes`)
    .set('Accept', 'application/json');
}

function changeStatus(idcategory, body, token) {
  return api.put(`${path}/${idcategory}/status`)
    .set('Authorization', token)
    .set('Accept', 'application/json')
    .send(body);
}

function changeStatusWithoutAuth(idcategory, body) {
  return api.put(`${path}/${idcategory}/status`)
    .set('Accept', 'application/json')
    .send(body);
}


module.exports = {
  list,
  listWithoutAuth,
  updateCategory,
  updateCategoryWithoutAuth,
  getSingleCategoryDetail,
  searchByBreadcrumb,
  searchByBreadcrumbWithoutAuth,
  create,
  createWithoutAuth,
  postProcess,
  detail,
  detailWithoutAuth,
  detailSingle,
  list2,
  history,
  historyWithoutAuth,
  deleteCategory,
  deleteCategoryWithoutAuth,
  attribute,
  attributeWithoutAuth,
  changeStatus,
  changeStatusWithoutAuth,
  detailSingleWithoutAuth,
};
