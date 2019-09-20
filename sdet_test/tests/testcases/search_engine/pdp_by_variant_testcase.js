const global = require('./../../helper/global.js');

const scenario = ({
  getOK: {
    description: 'As a Vendor, I want to see product details page',
    response: global.response.ok,
  },
  getWithoutAuth: {
    description: 'As a Vendor, I can NOT see product details page without login',
    response: global.response.unauthorized,

  },
  getInvalidAuth: {
    description: 'As a Vendor, I can NOT see product details page with other user session',
    response: global.response.invalidAuth,
  },
  getNotFound: {
    descOther: 'As a Vendor, I can NOT found RANDOM SKU',
    descInvalid: 'As a Vendor, I can NOT see unregistered SKU',
    response: global.response.notFound,
  },
});

module.exports = {
  scenario,
};
