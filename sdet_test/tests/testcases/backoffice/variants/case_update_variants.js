const global = require('./../../../../tests/helper/global.js');


const putUpdate = {

  updateCategoryC3: {
    description: 'Update variant with fill category to category C3, Variant should be updated',
    responseCode: global.response.ok,
  },
  updateVariantName: {
    description: 'Update variant name, Variant should be updated',
    responseCode: global.response.ok,
  },
  updateDescription: {
    description: 'Update variant description, Variant should be updated',
    responseCode: global.response.ok,
  },
  updateValues: {
    description: 'Update variant values, Variant should be updated',
    responseCode: global.response.ok,
  },

  // negative case
  updateCategoryC2: {
    description: 'Update variant with fill category to category C2, Variant should not be updated',
    responseCode: global.response.badRequest,
  },
  updateCategoryC1: {
    description: 'Update variant with fill category to category C1, Variant should not be updated',
    responseCode: global.response.badRequest,
  },
  updateCategoryC0: {
    description: 'Update variant with fill category to category C0, Variant should not be updated',
    responseCode: global.response.badRequest,
  },
  blankcategory: {
    description: 'get error when blank value in param category',
    responseCode: global.response.badRequest,
  },
  blankVariantName: {
    description: 'get error when blank value in param variant name',
    responseCode: global.response.badRequest,
  },
  blankVariantValue: {
    description: 'get error when blank value in param variant Value',
    responseCode: global.response.badRequest,
  },
  DoubleSameVariantValue: {
    description: 'get error when double same value in param variant Value',
    responseCode: global.response.badRequest,
  },
  invalidid: {
    description: 'get error when id invalid',
    responseCode: global.response.notFound,
  },
  negativeid: {
    description: 'get error when id is negative',
    responseCode: global.response.notFound,
  },
  blankid: {
    description: 'get error when id blank',
    responseCode: global.response.badRequest,
  },
  invalidtoken: {
    description: 'get error when token invalid',
    responseCode: global.response.forbidden,
  },
  blanktoken: {
    description: 'get error when token blank',
    responseCode: global.response.unauthorized,
  },
  nothingEdit: {
    description: 'get error when nothing edit',
    responseCode: global.response.badRequest,
  },
};

module.exports = {
  putUpdate,
};
