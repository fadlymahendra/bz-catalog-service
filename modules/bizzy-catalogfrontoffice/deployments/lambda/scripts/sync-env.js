'use strict';

const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const packageInfo = require(path.join(__dirname, '../../../package.json'));

const env = process.argv[2];
const folder = env === 'test' ? 'staging' : env;

const envPath = path.join(__dirname, '../../../environments', `${env}.env`);
console.log(envPath)
if (fs.existsSync(envPath)) {
    const command = `aws s3 cp ${envPath} s3://bizzy-sams/envs/${folder}/${packageInfo.name}.env`;

    console.log(`Executing: ${command}`);
    childProcess.exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(error.message);
        } else if (stderr) {
            console.error(stderr);
        } else {
            console.log(stdout);
        }
    });
} else {
    throw new Error('Environment File Not Found!');
}
