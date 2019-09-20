#!/bin/bash


set -e
mkdir -p reports

for dir in ./modules/bizzy-*/
do
    buildId=$(uuidgen)
    npm run deploy-uat --prefix ${dir}

    echo "\nFinish Deploy to UAT"
done