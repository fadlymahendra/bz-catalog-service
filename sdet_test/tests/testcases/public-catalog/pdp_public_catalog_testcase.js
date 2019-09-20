const respMesCode = require('./../../helper/responseMessageAndCode.json');

const scenario = ({
  getSuccess: {
    successGetPDPPublicCatalog: 'should success get PDP public catalog',
    successGetCategoryC2PublicCatalog: 'should success get category C2 PDP public catalog',
    successGetCategoryC3PublicCatalog: 'should success get category C3 PDP public catalog',
    response: respMesCode.successOk,
  },
  getFailed: {
    failedGetPDPPublicCatalogInvalidSKU: {
      Desc: 'get error with invalid SKU',
      response: respMesCode.failedNotFound.codeNumber,
    },
    failedGetPDPPublicCatalogSKUNull: {
      Desc: 'get error when SKU null',
      response: respMesCode.failedNotFound.codeNumber,
    },
    failedGetPDPPublicCatalogInactiveSKU: {
      Desc: 'get error when SKU inactive',
      response: respMesCode.failedNotFound.codeNumber,
    },
    failedGetPDPPublicCatalogInvalidKey: {
      Desc: 'get error when API key invalid',
      response: respMesCode.failedForbiddenInvalidToken.codeNumber,
    },
    failedGetPDPPublicCatalogBlankKey: {
      Desc: 'get error when API key blank',
      response: respMesCode.failedForbiddenInvalidToken.codeNumber,
    },
    failedGetCategoryPublicCatalogInvalidKey: {
      Desc: 'get error when API key invalid',
      response: respMesCode.failedForbiddenInvalidToken.codeNumber,
    },
    failedGetCategoryPublicCatalogBlankKey: {
      Desc: 'get error when API key blank',
      response: respMesCode.failedForbiddenInvalidToken.codeNumber,
    },
    failedGetCategoryWithInvalidId: {
      Desc: 'get error when id category invalid',
      response: respMesCode.failedNotFound.codeNumber,
    }
  }
});

module.exports = {
  scenario,
};