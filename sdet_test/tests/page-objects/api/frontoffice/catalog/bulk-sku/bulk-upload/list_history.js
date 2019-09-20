const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_URL_FO);
const path = '/catalog/vendors';


function getListHistory(vendorId ,query, token, callback) {
  api.get(`${path}/${vendorId}/bulk-history-upload`)
    .query(query)
    .set('Accept', 'application/json')
    .set('Authorization', token)
    .end((err, result) => {
      callback(err, result);
    });
}

function getListHistoryWithoutAuth(vendorId ,query, callback) {
  api.get(`${path}/${vendorId}/bulk-history-upload`)
    .query(query)
    .set('Accept', 'application/json')
    .end((err, result) => {
      callback(err, result);
    });
}


module.exports = {
  getListHistory,
  getListHistoryWithoutAuth
};
