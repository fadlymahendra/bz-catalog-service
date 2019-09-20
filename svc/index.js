'use strict';

const path = require('path');
const fs = require('fs');

const isDirectory = source => fs.lstatSync(source).isDirectory() && !source.endsWith("-models");

const getLambdaFolders = source => {
    return fs.readdirSync(source).map(name => path.join(source, name)).filter(isDirectory)
}

function recreate() {
    let lambdaFolders = getLambdaFolders(path.join(__dirname, '../modules'));

    lambdaFolders.forEach(lambdaFolder => {
        let stackFilePath = path.join(lambdaFolder, 'deployments', 'lambda', 'stack.yml');
        let oldApiId = fs.existsSync('old.api.id') ? fs.readFileSync('old.api.id', 'utf8') : null;
        let apiId = fs.readFileSync('api.id','utf8');

        console.log("oldApiId: ", oldApiId);
        console.log("newApiId: ", apiId);

        if(oldApiId) {
            oldApiId = oldApiId.trim();
        }

        if(apiId) {
            apiId = apiId.trim();
        }

        let defaultContent = fs.readFileSync(stackFilePath, 'utf8');
        let regex = new RegExp(oldApiId ? oldApiId : '__API_ID__', 'g');
        let newContent = defaultContent.replace(regex, apiId);

        fs.writeFileSync(stackFilePath, newContent, 'utf8');
    });
}

function prepareServiceEnv(serviceName) {
    let filePath = path.join(__dirname, '.conf');

    let defaultContent = fs.readFileSync(filePath, 'utf8');
    let regex = new RegExp('__SERVICE_NAME_TITLE__', 'g');
    let newContent = defaultContent.replace(regex, serviceName);
    regex = new RegExp('__SERVICE_NAME__', 'g');
    newContent = newContent.replace(regex, serviceName.toLowerCase());

    fs.writeFileSync(filePath, newContent, 'utf8');
}

function prepareApiIndexYmlFile(serviceName, description) {
    let filePath = path.join(__dirname, 'api', 'index.yml');

    let defaultContent = fs.readFileSync(filePath, 'utf8');
    let regex = new RegExp('__SERVICE_NAME_TITLE__', 'g');
    let newContent = defaultContent.replace(regex, serviceName);

    regex = new RegExp('__SERVICE_DESCRIPTION__', 'g');
    newContent = newContent.replace(regex, description);

    fs.writeFileSync(filePath, newContent, 'utf8');
}

function prepareExamples(serviceName) {
    let folderPath = path.join(__dirname, 'api/routes/examples/');
    let files = fs.readdirSync(folderPath);

    files.forEach(file => {
        let filePath = path.join(folderPath, file);
        let defaultContent = fs.readFileSync(filePath, 'utf8');
        let regex = new RegExp('__SERVICE_NAME__', 'g');
        let newContent = defaultContent.replace(regex, serviceName.toLowerCase());
        fs.writeFileSync(filePath, newContent, 'utf8');
    });
}

function prepareFolders(serviceName) {
    let defaultModelFolderName = '../modules/[servicename]-models';
    let newModelFolderName = '../modules/' + serviceName.toLowerCase() + '-models';

    if(fs.existsSync(defaultModelFolderName)) {
        fs.renameSync(defaultModelFolderName, newModelFolderName);
    }

    let defaultLambdaFolderName = '../modules/bizzy-[servicename]';
    let newLambdaFolderName = '../modules/bizzy-' + serviceName.toLowerCase();

    if(fs.existsSync(defaultLambdaFolderName)) {
        fs.renameSync(defaultLambdaFolderName, newLambdaFolderName);
    }
}

function prepareModelsPackage(serviceName, serviceDescription) {
    let indexFilePath = path.join(__dirname, '../modules', serviceName.toLowerCase() + '-models', 'index.js');

    let defaultContent = fs.readFileSync(indexFilePath, 'utf8');
    let regex = new RegExp('__SERVICE_NAME__', 'g');
    let newContent = defaultContent.replace(regex, serviceName);

    fs.writeFileSync(indexFilePath, newContent, 'utf8');

    let packageFilePath = path.join(__dirname, '../modules', serviceName.toLowerCase() + '-models', 'package.json');

    defaultContent = fs.readFileSync(packageFilePath, 'utf8');

    regex = new RegExp('__SERVICE_NAME__', 'g');
    newContent = defaultContent.replace(regex, serviceName.toLowerCase());

    regex = new RegExp('__SERVICE_DESCRIPTION__', 'g');
    newContent = newContent.replace(regex, serviceDescription);

    fs.writeFileSync(packageFilePath, newContent, 'utf8');
}

function prepareLambdaPackage(serviceName, serviceDescription) {
    let lambdaRoot = path.join(__dirname, '../modules', 'bizzy-' + serviceName.toLowerCase());

    let indexFilePath = path.join(lambdaRoot, 'index.js');
    let defaultContent = fs.readFileSync(indexFilePath, 'utf8');
    let regex = new RegExp('__SERVICE_NAME__', 'g');
    let newContent = defaultContent.replace(regex, serviceName.toLowerCase());
    fs.writeFileSync(indexFilePath, newContent, 'utf8');

    let packageFilePath = path.join(lambdaRoot, 'package.json');
    defaultContent = fs.readFileSync(packageFilePath, 'utf8');

    regex = new RegExp('__SERVICE_NAME__', 'g');
    newContent = defaultContent.replace(regex, serviceName.toLowerCase());

    regex = new RegExp('__SERVICE_DESCRIPTION__', 'g');
    newContent = newContent.replace(regex, serviceDescription);

    fs.writeFileSync(packageFilePath, newContent, 'utf8');

    let stackFilePath = path.join(lambdaRoot, 'deployments/lambda', 'stack.yml');
    defaultContent = fs.readFileSync(stackFilePath, 'utf8');

    regex = new RegExp('__SERVICE_NAME_TITLE__', 'g');
    newContent = defaultContent.replace(regex, serviceName);

    regex = new RegExp('__SERVICE_NAME__', 'g');
    newContent = newContent.replace(regex, serviceName.toLowerCase());

    regex = new RegExp('__SERVICE_DESCRIPTION__', 'g');
    newContent = newContent.replace(regex, serviceDescription);

    fs.writeFileSync(stackFilePath, newContent, 'utf8');

    let devEnvPath = path.join(lambdaRoot, 'environments', 'development.env.example');
    let devNewEnvPath = path.join(lambdaRoot, 'environments', 'development.env');

    if (fs.existsSync(devEnvPath)) {
        fs.renameSync(devEnvPath, devNewEnvPath);
    }

    let localEnvPath = path.join(lambdaRoot, 'environments', 'local.env.example');
    let localNewEnvPath = path.join(lambdaRoot, 'environments', 'local.env');

    if (fs.existsSync(localEnvPath)) {
        fs.renameSync(localEnvPath, localNewEnvPath);
    }
}

function create() {
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    let currentPrompt = "ServiceName";

    let steps = {
        "ServiceName": null,
        "Description": null
    }

    rl.setPrompt(currentPrompt + ": ");
    rl.prompt();

    rl.on('line', (line) => {
        let input = line.trim();

        if(!input || input.length === 0) {
            console.log("Please input value")
        } else {
            steps[currentPrompt] = input;
            let nextPrompt = Object.keys(steps).filter(c => {return steps[c] === null})[0];
            if(!nextPrompt) {
                rl.close();
            } else {
                currentPrompt = nextPrompt;
                rl.setPrompt(nextPrompt + ": ");
            }
        }

        rl.prompt();
    }).on('close', () => {
      console.log('Have a nightmare!');

      prepareServiceEnv(steps.ServiceName);
      prepareApiIndexYmlFile(steps.ServiceName, steps.Description);
      prepareExamples(steps.ServiceName);
      prepareFolders(steps.ServiceName);
      prepareModelsPackage(steps.ServiceName, steps.Description);
      prepareLambdaPackage(steps.ServiceName, steps.Description);

      process.exit(0);
    });
}

if(process.argv[2] === 'new') {
    console.log("Starting new creation....")
    create();
} else if (process.argv[2] === 'recreate') {
    console.log("Starting recreate....")
    recreate();
}