const supertest = require('supertest');

const api = supertest(process.env.API_BASE_URL_FO);

const brandsPath = '/catalog/brands';

//Search brand 
function searchBrand(search, page, limit, token) {
  return api.get(brandsPath)
    .query({
      search,
      page,
      limit,
    })
    .set('Authorization', token)
    .set('Accept', 'application/json');
}

function searchBrandWoAuth(search, page, limit) {
  return api.get(brandsPath)
    .query({
      search,
      page,
      limit,
    })
    .set('Accept', 'application/json');
}
module.exports = {
  searchBrand,
  searchBrandWoAuth,
};
