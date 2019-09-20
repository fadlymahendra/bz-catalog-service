const supertest = require('supertest');

const api = supertest(process.env.API_BASE_URL_FO_CATALOG);
const path = '/catalog/vendors';


function getDownloadTemplate(vendorId, token, callback) {
  api.get(`${path}/${vendorId}/download-template-upload`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', token)
    .end((err, result) => {
      callback(err, result);
    });
}

function getDownloadTemplateWithoutAuth(vendorId, callback) {
  api.get(`${path}/${vendorId}/download-template-upload`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .end((err, result) => {
      callback(err, result);
    });
}

function checkTemplate(path_file, callback) {
  supertest('')
    .get(path_file)
    .end((err, result) => {
      callback(err, result);
    });
}


module.exports = {
  getDownloadTemplate,
  getDownloadTemplateWithoutAuth,
  checkTemplate,
};
