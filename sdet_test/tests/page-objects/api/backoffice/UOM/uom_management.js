const supertest = require('supertest');

const api = supertest(process.env.API_BASE_URL_BO);

const uomPath = '/catalog/uoms';

// create UOM
function createUom(body, token) {
  return api.post(uomPath)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', token)
    .send(body);
}

function createUomWithoutAuth(body) {
  return api.post(uomPath)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send(body);
}

// get UOM
function getUom(uomID, token) {
  return api.get(`${uomPath}/${uomID}`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', token);
}

function getUomWithoutAuth(uomID) {
  return api.get(`${uomPath}/${uomID}`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json');
}


// search UOM
function searchUoms(query, token) {
  return api.get(uomPath)
    .query(query)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', token);
}

function searchUomsWithoutAuth(query) {
  return api.get(uomPath)
    .query(query)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json');
}

// update UOM
function updateUom(uomID, body, token) {
  return api.put(`${uomPath}/${uomID}`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', token)
    .send(body);
}

function updateUomWithoutAuth(uomID, body) {
  return api.put(`${uomPath}/${uomID}`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send(body);
}

// delete uom
function deleteUom(uomID, token) {
  return api.delete(`${uomPath}/${uomID}`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', token);
}

function deleteUomWithoutAuth(uomID) {
  return api.delete(`${uomPath}/${uomID}`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json');
}


module.exports = {
  createUom,
  createUomWithoutAuth,
  getUom,
  getUomWithoutAuth,
  searchUoms,
  searchUomsWithoutAuth,
  updateUom,
  updateUomWithoutAuth,
  deleteUom,
  deleteUomWithoutAuth,
};
