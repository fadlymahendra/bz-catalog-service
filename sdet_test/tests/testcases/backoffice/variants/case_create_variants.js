const global = require('./../../../../tests/helper/global.js');

const postCreate = {

  createMandatoryFieldsOnly: {
    description: 'Create variant with fill mandatory fields only , variant should be created',
    responseCode: global.response.created,
  },
  createFillAllFields: {
    description: 'Create variant with fill all fields , variant should be created',
    responseCode: global.response.created,
  },

  // negative case
  CreateWithoutMandatory: {
    description: 'Create variant with empty mandatory field, get error and variant not created',
    responseCode: global.response.badRequest,
  },
  CreateWithFillCategoryc0: {
    description: 'Create variant with fill category C0, get error and variant not created',
    responseCode: global.response.badRequest,
  },
  createWithFillCategoryc1: {
    description: 'Create variant with fill category C1, get error and variant not created',
    responseCode: global.response.badRequest,
  },
  createWithFillCategoryc2: {
    description: 'Create variant with fill category C2, get error and variant not created',
    responseCode: global.response.badRequest,
  },
  createExistVariantName: {
    description: 'Create variant with exist variant name, get error and variant not created',
    responseCode: global.response.badRequest,
  },
  createBlankCategory: {
    description: 'Create variant with blank category, get error and variant not created',
    responseCode: global.response.badRequest,
  },
  createBlankVariantName: {
    description: 'Create variant with blank variant name, get error and variant not created',
    responseCode: global.response.badRequest,
  },
  createBlankVariantValue: {
    description: 'Create variant with blank variant value, get error and variant not created',
    responseCode: global.response.badRequest,
  },
  createDoubleSameNameVariantValue: {
    description: 'Create variant with fill double same name variant value, get error and variant not created',
    responseCode: global.response.badRequest,
  },
  createInvalidAuth: {
    description: 'Create variant with invalid Auth, get error and variant not created',
    responseCode: global.response.forbidden,
  },
  createNoAuth: {
    description: 'Create variant without Auth, get error and variant not created',
    responseCode: global.response.unauthorized,
  },
};

module.exports = {
  postCreate,
};
