'use strict';

const BaseJoi = require('joi');
const JoiDateExtension = require('joi-date-extensions');

const Joi = BaseJoi.extend(JoiDateExtension);

// Validator option - download template
const DOWNLOAD_TEMPLATE = Joi.object().keys({
    shippingOrigins: Joi.object().keys({
        shippingHubs: Joi.array().items({
            hub: Joi.number().positive().required(),
            name: Joi.string().required()
        }).min(0).required(),
        shippingGeographs: Joi.array().items({
            geograph: Joi.number().positive().required(),
            name: Joi.string().required()
        }).min(0).required()
    }).required(),
    shippingDestinations: Joi.object().keys({
        shippingHubs: Joi.array().items({
            hub: Joi.number().positive().required(),
            name: Joi.string().required()
        }).min(0).required(),
        shippingGeographs: Joi.array().items({
            geograph: Joi.number().positive().required(),
            name: Joi.string().required()
        }).min(0).required()
    }).required(),
    customerId: Joi.number().positive().required(),
    shippingPaymentTypeId: Joi.number().valid([1, 2]).positive().required(),
    tierType: Joi.string().valid(['DEFAULT', 'CUSTOM']).required(),
    isVendor: Joi.boolean().required(),
    category: Joi.object().keys({
        name: Joi.string().required(),
        type: Joi.string().valid(['C2', 'C3']).required(),
        id: Joi.number().positive().required()
    }).required(),
    startDate: Joi.date().format('DD-MM-YYYY').required(),
    endDate: Joi.date().format('DD-MM-YYYY').min('now').min(Joi.ref('startDate'))
        .required()
});

// List of schema
const SCHEMAS = {
    id: Joi.number().positive().required(),
    downloadTemplate: DOWNLOAD_TEMPLATE
};

// Validation method
const validate = async function validate(payload, schema) {
    try {
        return await Joi.validate(payload, SCHEMAS[schema]);
    } catch (error) {
        throw new Error(error.message.replace(/"/g, ''));
    }
};

module.exports = {
    validate
};
