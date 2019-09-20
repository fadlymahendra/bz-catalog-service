const supertest = require('supertest');

const api = supertest(process.env.API_BASE_URL_FO);
const uploadPath = '/catalog/product-images';

// Upload images
function postUploadImages(body, token) {
  return api.post(uploadPath)
    .set('Authorization', token)
    .set('Accept', 'application/json')
    .send(body);
}

function postUploadImagesWoAuth(body) {
  return api.post(uploadPath)
    .set('Accept', 'application/json')
    .send(body);
}

module.exports = {
  postUploadImages,
  postUploadImagesWoAuth,
}