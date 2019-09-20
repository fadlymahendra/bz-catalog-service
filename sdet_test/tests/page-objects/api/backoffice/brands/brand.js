/* eslint no-unused-vars:off */
const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_BO);

const brandsPath = '/catalog/brands';

// Create brand 2
function createBrand(body, token, response) {
  api.post(brandsPath)
    .set('Authorization', token)
    .set('Content-Type', 'application/json')
    .send(body)
    .end((err, result) => {
      response(result);
    });
}

function createBrandWoAuth(body, response) {
  api.post(brandsPath)
    .set('Content-Type', 'application/json')
    .send(body)
    .end((err, result) => {
      response(result);
    });
}

// Search brand 2 coba
function getBrandsDetail(brandId, token, response) {
  api.get(`${brandsPath}/${brandId}`)
    .set('Authorization', token)
    .set('Content-Type', 'application/json')
    .end((err, result) => {
      response(result);
    });
}

function getBrandsDetailWoAuth(brandId, response) {
  api.get(`${brandsPath}/${brandId}`)
    .set('Content-Type', 'application/json')
    .end((err, result) => {
      response(result);
    });
}

// Search brand 2
function searchBrand(query, token, response) {
  api.get(brandsPath)
    .query(query)
    .set('Authorization', token)
    .set('Content-Type', 'application/json')
    .end((err, result) => {
      response(result);
    });
}

function searchBrandWoAuth(query, response) {
  api.get(brandsPath)
    .query(query)
    .set('Content-Type', 'application/json')
    .end((err, result) => {
      response(result);
    });
}

// Update brand 2
function updateBrand(brandId, body, token, response) {
  api.put(`${brandsPath}/${brandId}`)
    .set('Authorization', token)
    .set('Content-Type', 'application/json')
    .send(body)
    .end((err, result) => {
      response(result);
    });
}

function updateBrandWoAuth(brandId, body, response) {
  api.put(`${brandsPath}/${brandId}`)
    .set('Content-Type', 'application/json')
    .send(body)
    .end((err, result) => {
      response(result);
    });
}

// Delete brand 2
function deleteBrand(brandId, token, response) {
  api.delete(`${brandsPath}/${brandId}`)
    .set('Authorization', token)
    .set('Content-Type', 'application/json')
    .end((err, result) => {
      response(result);
    });
}

function deleteBrandWoAuth(brandId, response) {
  api.delete(`${brandsPath}/${brandId}`)
    .set('Content-Type', 'application/json')
    .end((err, result) => {
      response(result);
    });
}

module.exports = {
  createBrand,
  createBrandWoAuth,
  getBrandsDetail,
  getBrandsDetailWoAuth,
  searchBrand,
  searchBrandWoAuth,
  updateBrand,
  updateBrandWoAuth,
  deleteBrand,
  deleteBrandWoAuth,
};
