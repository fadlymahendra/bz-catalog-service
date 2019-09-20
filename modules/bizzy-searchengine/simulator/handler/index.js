'use strict';

const path = require('path');
const fs = require('fs');
const Promise = require('bluebird');
const Joi = require('joi');

let configuration = null;
let methods = new Set();
let dbContext = null;
let mongoContext = null;
let redisContext = null;

exports.configure = config => {
    const configurationSchema = Joi.object().keys({
        context: Joi.object().required()
    });

    let validation = Joi.validate(config, configurationSchema);

    if (validation.error) {
        throw validation.error;
    } else {
        configuration = validation.value;
    }
}

exports.resetConfiguration = () => {
    configuration = null;
    methods.clear();
    dbContext = null;
    mongoContext = null;
}

exports.getConfiguration = () => configuration;

exports.registerHandler = () => {
    if (!configuration) throw new Error('HandlerUnitialized');
    
    const awsApiGatewayHandler = require(path.join(__dirname, 'local.js'));
    const awsServiceCommunicator = require(path.join(__dirname, '../service_communication/aws_lambda', 'lambda_invoker.js'));
    configuration.context.handler = awsApiGatewayHandler.getHandler(methods, dbContext, mongoContext, redisContext);
    configuration.context.errorTransformer = awsApiGatewayHandler.getErrorTransformer();
    configuration.context.serviceCommunicator = awsServiceCommunicator;
}

exports.registerMethods = (methodPath) => {
    methods.add(methodPath);
}

exports.getMethods = () => methods;

exports.registerDBContext = context => {
    dbContext = context;
}

exports.getDBContext = () => dbContext;

exports.registerMongoContext = context => {
    mongoContext = context;
}

exports.getMongoContext = () => mongoContext;

exports.registerRedisContext = context => {
    redisContext = context;
}

exports.getRedisContext = () => redisContext;

module.exports = exports;
