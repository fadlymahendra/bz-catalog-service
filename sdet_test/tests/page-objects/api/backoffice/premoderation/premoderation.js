/* eslint no-unused-vars: off */
/* eslint camelcase: off */

const supertest = require('supertest');
const env = require('dotenv').config();

const apiBo = supertest(process.env.API_BASE_URL_BO);
const path = '/catalog/premoderations';

function getPremoderationList(query, token) {
  return apiBo.get(path)
    .query(query)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', token);
}

function getPremoderationDetails(premodId, token) {
  return apiBo.get(`${path}/${premodId}`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', token);
}

function extractPremoderationDetailResponse(response) {
  const {
    product_name,
    brand,
    category,
    package_weight,
    package_length,
    package_width,
    package_height,
    package_content,
    uom,
    stocking_uom,
    quantity_stocking_uom,
    description,
    barcode,
    manufacturing_number,
  } = { ...response };
  return {
    product_name,
    brand: { ...brand },
    category: { ...category },
    package_weight,
    package_length,
    package_width,
    package_height,
    package_content,
    uom: { ...uom },
    stocking_uom: { ...stocking_uom },
    quantity_stocking_uom,
    description,
    barcode,
    manufacturing_number,
  };
}

module.exports = {
  getPremoderationList,
  getPremoderationDetails,
  extractPremoderationDetailResponse,
};
