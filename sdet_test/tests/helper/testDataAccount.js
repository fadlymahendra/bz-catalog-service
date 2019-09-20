/* eslint no-unused-vars: off */
/* eslint prefer-destructuring:off */


const supertest = require('supertest');
const env = require('dotenv').config();
// var accountBo = supertest(process.env.USERNAME_BO);
// var accountFo = supertest(process.env.USERNAME_FO);
// var passBo = supertest(process.env.PASS_BO);
// var passFo = supertest(process.env.PASS_FO);


const account = {
  usernameAccount(username) {
    if (username === 'user_backoffice') {
      return 'fatkhurozaq.budi@bizzy.co.id';
      // return accountBo; console.log(accountBo);
    } if (username === 'user_frontoffice') {
      return 'vendor@ildav.com';
      // return accountFo;
    } if (username === 'other_frontoffice') {
      return 'h.vendor@staging.com';
    } if (username === 'customer') {
      return 'h.mp.top.fr@staging.com';
    }
    return '';
  },
  usernamePassword(password) {
    if (password === 'pwd_user_backoffice') {
      return 'bizzy123';
      // return passBo;
    } if (password === 'pwd_user_frontoffice') {
      return 'bizzy123';
      // return passFo;
    } if (password === 'pwd_other_frontoffice') {
      return 'bizzy123';
    }
    if (password === 'pwd_customer') {
      return 'bizzy123';
    }
    return '';
  },
};

module.exports = account;
