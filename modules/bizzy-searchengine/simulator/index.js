'use strict';

const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const VelocityContext = require('./context_generator/velocity');
const VelocityRenderer = require('./utils/velocityRenderer');
const yaml = require('js-yaml');
const routeParser = require('./utils/routeParser');
const jsonExtractor = require('./utils/jsonExtractor');
const lambda = require('./lambda');

const app = express();
const port = 8080;
const handler = Promise.promisify(lambda.handler);

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let data = routeParser.generateFromMethod();
let routes = routeParser.generate();

console.log('Server Running at http://localhost:' + port);
console.log('');
console.log('Available API`s :');
for (let p in data) {
    data[p].map((func) => {
        lambda.Handler.registerMethods(p);
        
        let routeData = routes[func];

        if (routeData !== undefined) {
            console.log(' - [' + routeData.method.toUpperCase() + '] ' + '/' + p + '/' + func);
            app[routeData.method]('/' + p + '/' + func, (req, res) => {
                let context = VelocityContext(req, {}, req.body);
                let template = yaml.load(
                    fs.readFileSync(
                        routeData.fileLocation, 'utf8'
                    )
                );

                let rendered = VelocityRenderer(template, context);
                
                let extractedResult = jsonExtractor.extract(rendered, 'requestTemplates');
                const payloadValue = extractedResult['requestTemplates']['application/json'];

                try {
                    handler({
                        action: func,
                        data: payloadValue.data,
                        context: payloadValue.context
                    }, {
                            invokedFunctionArn: 'local'
                        })
                        .then(result => {
                            res.status(200).send(result);
                        })
                        .catch(error => {
                            if (error.defaultCode) {
                                res.status(error.defaultCode).send({
                                    "code": error.defaultCode,
                                    "message": error._message
                                });
                            } else {
                                res.status(500).send({
                                    "code": 500,
                                    "message": error.message,
                                    "error_detail": error.stack
                                });
                            }
                        });
                } catch (error) {
                    res.status(error.defaultCode).send({
                        "code": 500,
                        "message": error._message
                    });
                }
            })
        } else {
            console.log(' - [ANY] ' + '/' + p + '/' + func);
            app.route('/' + p + '/' + func).all((req, res) => {
                let template;
                let context = VelocityContext(req, {}, req.body);
            
                template = yaml.load(
                    fs.readFileSync(
                        path.join(__dirname, './default_mapping/any.yml'), 'utf8'
                    )
                );

                let rendered = VelocityRenderer(template, context);

                let regex = /\,(?!\s*?[\{\[\"\'\w])/g;

                let extractedResult = jsonExtractor.extract(JSON.parse(JSON.stringify(rendered)), 'requestTemplates');
                let payloadValue = extractedResult['requestTemplates']['application/json'];

                if (typeof payloadValue === 'string') {
                    payloadValue = JSON.parse((extractedResult['requestTemplates']['application/json']).replace(regex, ''));
                }
                
                let {body: input} = payloadValue.data;
                payloadValue.data.body = JSON.parse((JSON.stringify(input)).replaceAll('=', ':'));

                try {
                    handler({
                        action: func,
                        data: payloadValue.data,
                        context: payloadValue.context
                    }, {
                            invokedFunctionArn: 'local'
                        })
                        .then(result => {
                            res.status(200).send(result);
                        })
                        .catch(error => {
                            if (error.defaultCode) {
                                res.status(error.defaultCode).send({
                                    "code": error.defaultCode,
                                    "message": error._message
                                });
                            } else {
                                res.status(500).send({
                                    "code": 500,
                                    "message": error.message,
                                    "error_detail": error.stack
                                });
                            }
                        });
                } catch (error) {
                    res.status(500).send({
                        "code": 500,
                        "message": error.stack
                    });
                }
            })
        }
    })
}

app.listen(port);