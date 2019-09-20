const respMesCode = require('./../../../../tests/helper/responseMessageAndCode.json');

const scenario = ({
  deleteSuccess: {
    successDeleteVariant: 'Delete variant, variant should be deleted',
    successDeleteWhenVisibilityandStatus0: 'Delete variant when visibility and status 0 at product group, variant should be deleted',
    successDeleteWhenStatus1: 'Delete variant when visibility 0 and status 1 at product group, variant should be deleted',
    successDeleteWhenVisibility1: 'Delete variant when visibility 1 and status 1 at product group, variant should be deleted',
    responseCode: respMesCode.successNoContent,
  },
  deleteFailed: {
    deleteInvalidAuth: {
      description: 'Delete variant with invalid Auth, get error and variant not deleted',
      responseCode: respMesCode.failedForbiddenInvalidToken.codeNumber,
    },
    deleteNoAuth: {
      description: 'Delete variant without Auth, get error and variant not deleted',
      responseCode: respMesCode.failedUnauthorized.codeNumber,
    },
  }
}) 

module.exports = {
  scenario,
} 