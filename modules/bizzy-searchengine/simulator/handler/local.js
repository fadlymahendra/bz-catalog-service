'use strict';

const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const DotEnv = require('dotenv');

function loadEnvironment(context) {
    const invokedArn = context.invokedFunctionArn.toUpperCase();
    let inferredEnv = 'local';

    if (invokedArn.endsWith('PROD')) {
        inferredEnv = 'production';
    } else if (invokedArn.endsWith('DEV')) {
        inferredEnv = 'development';
    } else if (invokedArn.endsWith('TEST')) {
        inferredEnv = 'test';
    } else if (invokedArn.endsWith('UAT')) {
        inferredEnv = 'uat';
    }

    const loadedEnv = DotEnv.parse(fs.readFileSync(path.join('environments', `${inferredEnv}.env`)));
    for (const key in loadedEnv) {
        process.env[key] = loadedEnv[key];
    }
    process.env.NODE_ENV = inferredEnv;
}

function parseUser(context) {
    if (!context || !context.encodedUser) {
        return null;
    }

    try {
        return JSON.parse(Buffer.from(context.encodedUser, 'base64').toString());
    } catch (error) {
        console.log(context.encodedUser);
        console.log(`Parse userContext failed \n${error.message}`);
    }

    return null;
}

exports.getHandler = function (methods, dbContext, mongoContext, redisContext) {
    const lambdaHandler = function (event, context, callback) {
        let result,
            error;

        loadEnvironment(context);

        return Promise.coroutine(function* () {
            if (dbContext) {
                yield dbContext.getContext();
            }

            if (mongoContext) {
                yield mongoContext.getContext();
            }

            if (redisContext) {
                yield redisContext.getContext();
            }

            return Promise.resolve('Context Opened');
        })().then(() => {
            const main = {};
            for (const methodKey of methods) {
                const factoryPath = path.join(__dirname, '../../src/methods', `${methodKey}.js`);
                const factory = require(factoryPath);
                for (const key in factory) {
                    main[key] = () => factory[key];
                }
            }

            const parsedUser = parseUser(event.context);
            if (parsedUser) {
                event.context.user = parsedUser;
            }

            return main[event.action]()(event.data, event.context || {}).then((res) => {
                result = res;
            }).catch((err) => {
                error = err;
            });
        }).catch((err) => {
            error = new Error(JSON.stringify({
                code: 500,
                detail: err.stack
            }));
        }).finally(Promise.coroutine(function* () {
            if (dbContext) {
                yield dbContext.closeContext();
            }

            if (mongoContext) {
                yield mongoContext.closeContext();
            }

            if (redisContext) {
                yield redisContext.closeContext();
            }

            return callback(error, result);
        }));
    };

    return lambdaHandler;
};

exports.getErrorTransformer = () => ({
    getter() {
        return JSON.stringify({
            code: this.name,
            detail: this._message
        });
    },
    setter(message) {
        this._message = message;
    }
});

module.exports = exports;
