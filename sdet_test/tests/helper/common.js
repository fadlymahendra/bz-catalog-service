/* eslint no-unused-vars:off */

const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_BASE_OATH);
const apiFo = supertest(process.env.API_BASE_URL_FO);
const apiBo = supertest(process.env.API_BASE_URL_BO);
const account = require('./testDataAccount.js');
const testData = require('../helper/frontoffice/catalog/vendor/testDataRequestProduct');

let tokenBackoffice;
let tokenFrontoffice;
let tokenOtherFrontoffice;
let tokenCustomer;

const login = require('./login.js');
const loginAccount = require('./login_data.js');


function getTokenBackoffice() {
  return login.login(loginAccount.backoffice);
}


const common = {

  getAuth(query, response) {
    api.post('/oauth/token')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(query)
      .end((err, result) => {
        response(result);
      });
  },

  getTokenBo(body) {
    return apiBo.post('/oauth/token')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(body);
  },

  getTokenFo(body) {
    return api.post('/oauth/token/multiple')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(body);
  },

  getTokenPunchout(body) {
    return api.post('/punchouts/token')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(body);
  },

  getAuthToken(response) {
    api.post('/oauth/token')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send('{"username": "fatkhurozaq.budi@bizzy.co.id","password": "bizzy123"}')
      .end((err, result) => {
        response(result);
      });
  },
  createSkuNoVariant(response) {
    apiFo.post('/catalog/vendors/4/premoderations')
      .set('Authorization', tokenFrontoffice)
      .set('Content-Type', 'application/json')
      .send(testData.postDataNoVariant)
      .end((err, result) => {
        response(result);
      });
  },
  createSkuNoVariantApprove(response) {
    apiFo.post('/catalog/vendors/4/premoderations')
      .set('Authorization', tokenFrontoffice)
      .set('Content-Type', 'application/json')
      .send(testData.postApproveNoVariant)
      .end((err, result) => {
        response(result);
      });
  },

  getPremodlist(response) {
    apiBo.get('/catalog/premoderations')
      .query({
        search: '',
        page: 1,
        limit: 5,
      })
      .set('Authorization', tokenBackoffice)
      .set('Accept', 'application/json')
      .end((err, result) => {
        response(result);
      });
  },

  getAuthTokenBackoffice(username, password, response) {
    const accountUsername = account.usernameAccount(username);
    const accountPassword = account.usernamePassword(password);
    console.log('======================================================================');
    console.log(`Login as Back Office account: ${accountUsername}`);
    api.post('/oauth/token')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        username: accountUsername,
        password: accountPassword,
      })
      .end((err, result) => {
        response(result);
      });
  },
  backoffice_auth(tokenselection) {
    if (tokenselection === 'correct_token') {
      console.log('>>>>>> Using Back Office account <<<<<<');
      return tokenBackoffice;
    } if (tokenselection === 'incorrect_token') {
      return 'tokenFrontoffice';
    }
    return '';
  },
  setTokenBackoffice(loginToken) {
    tokenBackoffice = loginToken;
  },
  // frontoffice
  getAuthTokenFrontoffice(username, password, response) {
    const accountUsername = account.usernameAccount(username);
    const accountPassword = account.usernamePassword(password);
    console.log('======================================================================');
    console.log(`Login as Front Office account: ${accountUsername}`);
    console.log('======================================================================');
    api.post('/oauth/token')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        username: accountUsername,
        password: accountPassword,
      })
      .end((err, result) => {
        response(result);
      });
  },

  frontoffice_auth(tokenselection) {
    if (tokenselection === 'correct_token') {
      console.log('>>>>>> Using Front Office account <<<<<<');
      return tokenFrontoffice;
    } if (tokenselection === 'incorrect_token') {
      return 'tokenBackoffice';
    } if (tokenselection === 'h_vendor') {
      console.log('>>>>>> Using Other User Front Office account <<<<<<');
      return tokenOtherFrontoffice;
    }
    return '';
  },
  setTokenFrontoffice(loginToken) {
    tokenFrontoffice = loginToken;
  },

  getAuthTokenOtherFrontoffice(username, password, response) {
    const accountUsername = account.usernameAccount(username);
    const accountPassword = account.usernamePassword(password);
    // console.log('======================================================================');
    console.log(`Login as Other Front Office account: ${accountUsername}`);
    console.log('======================================================================');
    api.post('/oauth/token')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        username: accountUsername,
        password: accountPassword,
      })
      .end((err, result) => {
        response(result);
      });
  },
  setTokenOtherFrontoffice(loginToken) {
    tokenOtherFrontoffice = loginToken;
  },
  // customer
  getAuthTokenCustomer(username, password, response) {
    const accountUsername = account.usernameAccount(username);
    const accountPassword = account.usernamePassword(password);
    // console.log('======================================================================');
    console.log(`Login as Customer account: ${accountUsername}`);
    console.log('======================================================================');
    api.post('/oauth/token')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        username: accountUsername,
        password: accountPassword,
      })
      .end((err, result) => {
        response(result);
      });
  },
  customer_auth(tokenselection) {
    if (tokenselection === 'correct_token') {
      console.log('>>>>>> Using customer account <<<<<<');
      return tokenCustomer;
    } if (tokenselection === 'incorrect_token') {
      return 'tokenFrontoffice';
    }
    return '';
  },
  setTokenCustomer(loginToken) {
    tokenCustomer = loginToken;
  },

  vendor_list(vendor) {
    if (vendor === 'empty_vendor') {
      return '';
    } if (vendor === 'bizzy_vendor') {
      return 4;
    } if (vendor === 'ildav_vendor') {
      return 91;
    } if (vendor === 'h_vendor') {
      return 93;
    } if (vendor === 'invalid_vendor') {
      return 0;
    } if (vendor === 'notfound_vendor') {
      return 2134567;
    }
    return '';
  },

  assign_list(assign) {
    if (assign === 'empty_assign') {
      return '';
    } if (assign === 'employee_assign') {
      return 73;
    } if (assign === 'invalid_assign') {
      return 20000;
    }
    return '';
  },

  status_list(status) {
    if (status === 'empty_status') {
      return '';
    } if (status === 'need_revision') {
      return 'need_revision';
    } if (status === 'revision_inprogress') {
      return 'revision_inprogress';
    } if (status === 'rejected') {
      return 'rejected';
    } if (status === 'revision_complete') {
      return 'revision_complete';
    }
    return '';
  },

  itResponse(responseCode) {
    let expectString;
    if (responseCode === '200') {
      expectString = 'Should get response 200 OK';
    } else if (responseCode === '201') {
      expectString = 'Should get response 201 OK';
    } else if (responseCode === '204') {
      expectString = 'Should get response 204 OK';
    } else if (responseCode === '401') {
      expectString = 'Should get response 401 Unauthorize';
    } else if (responseCode === '442') {
      expectString = 'Should get response 422 Unprocessable Entity';
    } else {
      expectString = 'Should get response 500 internal server error';
    }
    return expectString;
  },

  switchHeadersParameter(header, parameter) {
    let descriptionString;
    if (header && parameter) {
      descriptionString = 'With correct parameters and headers';
    } else if (!header && parameter) {
      descriptionString = 'With correct parameters and incorrect headers';
    }
    return descriptionString;
  },

  randomId() {
    const min = 1;
    const max = 1816;
    return (Math.floor(Math.random() * (max - min)) + min);
  },

  randomUomsId() {
    const min = 1;
    const max = 6;
    return (Math.floor(Math.random() * (max - min)) + min);
  },

  randomNumber() {
    const min = 100000000000000;
    const max = 999999999999999;
    return (Math.floor(Math.random() * (max - min)) + min).toString();
  },

  convertMonth(mmmmBahasa) {
    let mydate;

    mydate = mmmmBahasa;
    mydate = mydate.split(' ');
    if (mydate[1] === 'Januari') mydate[1] = 1;
    else if (mydate[1] === 'Februari') mydate[1] = 2;
    else if (mydate[1] === 'Maret') mydate[1] = 3;
    else if (mydate[1] === 'April') mydate[1] = 4;
    else if (mydate[1] === 'Mei') mydate[1] = 5;
    else if (mydate[1] === 'June') mydate[1] = 6;
    else if (mydate[1] === 'Juli') mydate[1] = 7;
    else if (mydate[1] === 'Agustus') mydate[1] = 8;
    else if (mydate[1] === 'September') mydate[1] = 9;
    else if (mydate[1] === 'Oktober') mydate[1] = 10;
    else if (mydate[1] === 'November') mydate[1] = 11;
    else if (mydate[1] === 'Desember') mydate[1] = 12;
    const newdate = mydate[2] + mydate[1] + mydate[0];

    return newdate;
  },

  convertJSONStringValueToNumber(jsonArray) {
    let obj;
    for (let i = 0; i < jsonArray.length; i += 1) {
      obj = jsonArray[i];
      for (const prop in obj) {
        if (Object.hasOwnProperty.call(obj, prop) && obj[prop] !== null && !Number.isNaN(obj[prop])) {
          obj[prop] = +obj[prop];
        }
      }
    }
    return jsonArray;
  },
};

module.exports = common;
