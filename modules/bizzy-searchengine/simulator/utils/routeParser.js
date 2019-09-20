const fs = require('fs');
const path = require('path');
const jsonExtractor = require('./jsonExtractor');
const yaml = require('js-yaml');
const velocityRenderer = require('./velocityRenderer');
const jsonPath = require('./jsonPath');

const routes = {};
const routesPath = path.join(__dirname, './../../../../svc/api/routes');
const methodsPath = path.join(__dirname, './../../src/methods');

let action;

exports.generateFromMethod = function () {
    let data = {};
    let methods = fs.readdirSync(
        methodsPath
    )
    let main = [];

    for (const methodFolder of methods) {
        let newPath = path.join(methodsPath, methodFolder);
        let isDir = fs.lstatSync(newPath).isDirectory();

        if (isDir) {
            let methodFile = fs.readdirSync(newPath);

            for (const methodFileName of methodFile) {
                let trimmedMethod = methodFileName.substring(
                    methodFileName.length - 3, methodFileName
                );

                let combinedPath = `${methodFolder}/${trimmedMethod}`;

                main[combinedPath] = [];

                const factoryPath = path.join(newPath, `${methodFileName}`);
                if (path.extname(factoryPath) === '.js') {
                    const factory = require(factoryPath);
                    for (const key in factory) {
                        main[combinedPath].push(key);
                    }
                }
            }
        }
    }
    return main;
}

exports.generate = function () {
    let dir = fs.readdirSync(
        routesPath
    )

    dir.map(dataName => {
        let newPath = path.join(routesPath, dataName);
        let isDir = fs.lstatSync(newPath).isDirectory();

        // now parse configuration data
        if (isDir) {
            let conf = fs.readdirSync(newPath)

            conf.map(confName => {
                let isDir = fs.lstatSync(
                    path.join(routesPath, dataName, confName)
                ).isDirectory();

                if (!isDir) {
                    if (path.extname(path.join(routesPath, dataName, confName)) === '.yml') {
                        let fileLocation = path.join(routesPath, dataName, confName);
                        let configData = yaml.load(
                            fs.readFileSync(
                                fileLocation, 'utf8'
                            )
                        );

                        try {
                            let rendered = velocityRenderer(configData, velocityContextDummy());

                            let method = Object.keys(configData)[0];
                            extractedResult = jsonExtractor.extract(rendered, 'requestTemplates');

                            const payloadValue = extractedResult['requestTemplates']['application/json'];

                            routes[payloadValue.action] = {
                                method: method,
                                fileLocation: fileLocation
                            };
                        } catch (err) {
                            // console.log(err.message);
                        }
                    }
                }
            })
        }
    });

    return routes;
}

function velocityContextDummy(payload) {
    const path = x => jsonPath(payload || {}, x);

    return {
        context: {
            apiId: 'offlineContext_apiId',
            authorizer: 'authorizer',
            httpMethod: 'test',
            identity: {
                accountId: 'offlineContext_accountId',
                apiKey: 'offlineContext_apiKey',
                caller: 'offlineContext_caller',
                cognitoAuthenticationProvider: 'offlineContext_cognitoAuthenticationProvider',
                cognitoAuthenticationType: 'offlineContext_cognitoAuthenticationType',
                user: 'offlineContext_user',
                userAgent: ['user-agent'],
                userArn: 'offlineContext_userArn',
            },
            requestId: `offlineContext_requestId_${Math.random().toString(10).slice(2)}`,
            resourceId: 'offlineContext_resourceId',
            resourcePath: 'request.route.path',
        },
        input: {
            body: "",
            json: x => JSON.stringify(path(x)),
            params: function () {
                return {
                    path: Object.assign({}, {}),
                    querystring: Object.assign({}, {}),
                    header: Object.assign({}, {})
                }
            }
        },
        util: {
            escapeJavaScript
        },
    }
}

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

module.exports = exports;