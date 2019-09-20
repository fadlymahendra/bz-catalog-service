
const jsonPath = require('./../utils/jsonPath');
const jsEscapeString = require('js-string-escape');
const isPlainObject = require('lodash').isPlainObject;

/**
 * @param {*} x 
 */
function escapeJavaScript(x) {
  if (typeof x === 'string') return jsEscapeString(x).replace(/\\n/g, '\n'); // See #26,
  else if (isPlainObject(x)) {
    const result = {};
    for (let key in x) { // eslint-disable-line prefer-const
      result[key] = jsEscapeString(x[key]);
    }

    return JSON.stringify(result); // Is this really how APIG does it?
  }
  else if (typeof x.toString === 'function') return escapeJavaScript(x.toString());

  return x;
}

/**
 * Returns a context object that mocks APIG mapping template reference
 * http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html
 * Credits to https://github.com/dherault/serverless-offline
 * @param {*} request 
 * @param {*} options 
 * @param {*} payload 
 */
module.exports = function createVelocityContext(request, options, payload) {
  const path = x => jsonPath(payload || {}, x);

  const authPrincipalId = request.auth && request.auth.credentials && request.auth.credentials.user;
  const headers = request.headers;

  return {
    context: {
      apiId: 'offlineContext_apiId',
      authorizer: {
        principalId: authPrincipalId || process.env.PRINCIPAL_ID || 'offlineContext_authorizer_principalId', // See #24
      },
      httpMethod: request.method.toUpperCase(),
      identity: {
        accountId: 'offlineContext_accountId',
        apiKey: 'offlineContext_apiKey',
        caller: 'offlineContext_caller',
        cognitoAuthenticationProvider: 'offlineContext_cognitoAuthenticationProvider',
        cognitoAuthenticationType: 'offlineContext_cognitoAuthenticationType',
        user: 'offlineContext_user',
        userAgent: request.headers['user-agent'] || '',
        userArn: 'offlineContext_userArn',
      },
      requestId: `offlineContext_requestId_${Math.random().toString(10).slice(2)}`,
      resourceId: `offlineContext_resourceId`,
      resourcePath: request.route.path,
    },
    input: {
      body: payload,
      json: x => JSON.stringify(path(x)),
      params: x => typeof x === 'string' ?
        request.params[x] || request.query[x] || headers[x] :
        ({
          path: Object.assign({}, request.params),
          querystring: Object.assign({}, request.query),
          headers,
        }),
      path,
    },
    util: {
      escapeJavaScript
    },
  };
};