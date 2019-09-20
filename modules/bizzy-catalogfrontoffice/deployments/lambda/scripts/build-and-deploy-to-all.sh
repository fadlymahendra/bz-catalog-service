#!/usr/bin/env bash

# Helper scripts that
# Tests, packages, tests, executes Lambda itests, etc...
# Usage:
#   ./build-and-deploy-to-dev.sh build_number
set -e

cd "$( dirname "${BASH_SOURCE[0]}" )"

script_dir=$(pwd)
lambda_name=$2

echo -e "\n==================== Injecting Env =========================================\n"
aws s3 cp s3://bizzy-sams/envs/development/${lambda_name}.env "$script_dir/../../../environments/development.env"
aws s3 cp s3://bizzy-sams/envs/staging/${lambda_name}.env "$script_dir/../../../environments/test.env"
aws s3 cp s3://bizzy-sams/envs/uat/${lambda_name}.env "$script_dir/../../../environments/uat.env"
aws s3 cp s3://bizzy-sams/envs/production/${lambda_name}.env "$script_dir/../../../environments/production.env"

echo -e "\n==================== Package Files =========================================\n"
sh ./2-package.sh

echo -e "\n==================== Deploy Lambda =========================================\n"
sh ./3-update-lambda.sh

build_number=$1

echo -e "\n==================== Publish Lambda Version ================================\n"
version=$(sh ./4-publish-version.sh ${build_number})

echo -e "\n==================== Update TEST Lambda Alias =============================\n"
sh ./5-update-test-alias.sh ${build_number} ${version}

echo -e "\n==================== Update UAT Lambda Alias =============================\n"
sh ./5-update-uat-alias.sh ${build_number} ${version}
