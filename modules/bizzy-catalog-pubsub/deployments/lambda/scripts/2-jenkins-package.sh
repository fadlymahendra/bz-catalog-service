#!/usr/bin/env bash

# Creates the deployable Lambda zip
set -e

script_dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

lambda_name=$(echo $script_dir | awk -F/ '{print $(NF-3)}')
package_file_name="$lambda_name.zip"
cd "$script_dir/../../../"

rm -rf deployments/lambda/build
mkdir -p deployments/lambda/build

if [ -e node_modules ]
then
    mv node_modules dev_node_modules
fi

rm -f package-lock.json
npm install --production > /dev/null

cp -Lr *.js package.json src node_modules environments deployments/lambda/build/

rm -rf node_modules
if [ -e dev_node_modules ]
then
    mv dev_node_modules node_modules
fi

cd deployments/lambda/build
zip -qr ${package_file_name} .
cd ../../../