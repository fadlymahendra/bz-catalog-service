const respMesCode = require('./../../../helper/responseMessageAndCode.json');

const scenario = ({
  getSuccess: {
    successGetCategoryPublicCatalog: 'should success get category public catalog',
    response: respMesCode.successOk,
  },
  getFailed: {
    failedGetInvalidKey: 'get error when invalid key',
    failedGetBlankKey: 'get error when blank key',
    response: respMesCode.failedForbiddenInvalidToken.codeNumber,
  }
});

  module.exports = {
    scenario,
  };