'use strict';

const AWS = require('aws-sdk');
const Promise = require('bluebird');

const call = Promise.coroutine(function* call(invokeType, serviceName, action, payload) {
    const lambda = new AWS.Lambda({ region: 'ap-southeast-1' });
    const mappingData = {
        action,
        context: payload.context,
        data: payload.data
    };

    let alias = 'DEV';
    switch (process.env.NODE_ENV) {
    case 'production':
        alias = 'PROD';
        break;
    case 'test':
        alias = 'TEST';
        break;
    case 'uat':
        alias = 'UAT';
        break;
    default:
        break;
    }

    const lambdaPayload = JSON.stringify(mappingData);
    const response = yield lambda.invoke({
        FunctionName: serviceName,
        InvocationType: invokeType,
        Payload: lambdaPayload,
        Qualifier: alias
    }).promise().catch((error) => {
        throw new Error(error.message);
    });

    if (invokeType === 'Event') {
        return 'SENT_TO_SERVICE';
    }

    const result = JSON.parse(response.Payload);
    if (result.errorMessage) {
        let parsedError;
        try {
            parsedError = JSON.parse(result.errorMessage);
        } catch (err) {
            console.log(err);
        }

        if (parsedError) {
            throw new Error(JSON.stringify({
                code: parsedError.code,
                message: parsedError.detail
            }));
        }

        throw new Error(JSON.stringify({
            code: 'BadRequest',
            message: result.errorMessage
        }));
    }

    return result;
});

exports.callSync = Promise.coroutine(function* callSync(serviceName, action, payload) {
    return yield call('RequestResponse', serviceName, action, payload);
});

exports.callAsync = Promise.coroutine(function* callSync(serviceName, action, payload) {
    return yield call('Event', serviceName, action, payload);
});

module.exports = exports;
