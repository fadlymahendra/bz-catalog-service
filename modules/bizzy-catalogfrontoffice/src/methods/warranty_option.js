'use strict';

const Promise = require('bluebird');
const { BizzyError } = require('bizzy-common');
const Authorization = require('../utils/authorization');
const MiscRespository = require('../repositories/misc');

exports.getWarrantyOption = async function (data, context) {
    if (!Authorization.getUser(context)) {
        throw BizzyError.Forbidden('You are not authorized user');
    }

    const result = await MiscRespository.findByKey('warranty_options');

    return {
        data: JSON.parse(result.value)
    };
};

module.exports = exports;
