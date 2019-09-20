'use strict';

const { handler } = require('..');
const mock_context = require('./mocks/context.json');

const action = process.argv[2];
const inlineData = process.argv[3];
let mockData;

if (inlineData) {
    mockData = JSON.parse(inlineData);
} else {
    mockData = require('./mocks/' + process.argv[2] + '.json');
}

(async () => {
    try {
        const result = await handler({
            action,
            data: mockData,
            context:mock_context
        }, {
            invokedFunctionArn: 'local'
        });
    } catch (error) {
        console.error(error.stack);
    }
})();