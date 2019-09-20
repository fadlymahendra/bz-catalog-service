'use strict';

const Promise = require('bluebird');
const lambda = require('..');

const handler = Promise.promisify(lambda.handler);

let action = process.argv[2];
let inlineData = process.argv[3];
let inlineContext = process.argv[4];
let mock_data;
let mock_context;

if(inlineData) {
    // mock_data = JSON.parse(inlineData);
    // mock_context = JSON.parse(inlineContext);
    mock_data = require('./mocks/' + process.argv[2] + '.json');
    mock_context = require('./mocks/' + process.argv[3] + '.json');
} else {
    mock_data = require('./mocks/' + process.argv[2] + '.json');
    mock_context = require('./mocks/context.json');
}

return handler({
    action: action,
    data: mock_data,
    context: mock_context
}, {
    invokedFunctionArn: 'local'
}).catch(error => {
    //console.error(error.stack);
});