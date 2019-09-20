#!/bin/bash

set -e
mkdir -p reports

for dir in ./modules/bizzy-*/
do
    buildId=$(uuidgen)
    npm run deploy-staging --prefix ${dir} -- ${buildId} $(basename ${dir})
    #jalanin integration test di sini
    #npm run deploy-uat --prefix ${dir} -- ${buildId}

    echo "\nFinish Deploy to Staging $(basename ${dir})"
done