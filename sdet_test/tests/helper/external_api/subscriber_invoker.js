const aws = require('aws-sdk');

async function invokeSubscriber(lambdaName, subscriberMethodName, payload) {
  const lambda = new aws.Lambda({ region: 'ap-southeast-1' });
  const lambdaPayload = {
    action: subscriberMethodName,
    context: {},
    data: payload,
  };

  let lambdaResponse = await lambda.invoke({
    FunctionName: lambdaName,
    Payload: JSON.stringify(lambdaPayload),
    Qualifier: 'TEST',
  }).promise();

  lambdaResponse = JSON.parse(lambdaResponse.Payload);
  if (lambdaResponse.errorMessage) {
    throw new Error({
      detail: JSON.stringify(lambdaResponse),
      message: `error when invoke ${subscriberMethodName} with error message`,
    });
  } else {
    return lambdaResponse;
  }
}

module.exports = invokeSubscriber;
