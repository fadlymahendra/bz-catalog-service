const global = require('./../../../../helper/global.js');


const scenario = ({
  getOK: {
    descVisible: 'As a Vendor, I want to set visibility selected product is VISIBLE',
    descInvis: 'As a Vendor, I want set visibility selected product is INVISIBLE',
    response: global.response.ok,
  },
  // 400
  getNotFound: {
    descInvalid: 'As a Vendor, I can NOT update visibility selected product with invalid SKU',
    response: global.response.notFound,
  },
  // 401
  getWithoutAuth: {
    desc: 'As a Vendor, I can NOT update visibility selected product without login',
    response: global.response.unauthorized,

  },
  // 403
  getInvalidAuth: {
    descOtherVendorID: 'As a Vendor, I can NOT update visibility selected product with other vendor ID',
    descInvalidBoth: 'As a Vendor, I cant NOT update visibility selected product with other vendor ID and invalid SKU',
    descOtherVendorSession: 'As a Vendor, I can NOT update visibility selected product with other vendor session',
    response: global.response.invalidAuth,
  },
  // 403
  getForbidden: {
    descString1: 'is_active value should NOT allow STRING 1',
    descString0: 'is_active value should NOT allow STRING 0',
    descInt: 'is_active value should NOT allow INTEGER (except 0/1)',
    descAlp: 'is_active value should NOT allow ALPHABETH',
    descEmpty: 'is_active value should NOT allow EMPTY',
    response: global.response.forbidden,
  },

});

module.exports = {
  scenario,
};
