/* eslint no-unused-vars: off */
const env = require('dotenv').config();
const supertest = require('supertest');

const api = supertest(process.env.API_BASE_URL_BO);
const apiFo = supertest(process.env.API_BASE_OATH);

const getBackOfficeToken = (() => {
  let token;

  function init(credential) {
    function requestToken() {
      return api.post('/oauth/token')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(credential);
    }

    return {
      requestToken: requestToken(credential),
    };
  }

  return {
    getToken: (credential) => {
      token = init(credential).requestToken;
      return token;
    },
  };
})();

const getFrontOfficeToken = (() => {
  let token;

  function init(credential) {
    function requestToken() {
      return apiFo.post('/oauth/token/multiple')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(credential);
    }

    return {
      requestToken: requestToken(credential),
    };
  }

  return {
    getToken: (credential) => {
      token = init(credential).requestToken;
      return token;
    },
  };
})();

module.exports = {
  getBackOfficeToken,
  getFrontOfficeToken,
};
