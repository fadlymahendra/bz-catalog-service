#!/usr/bin/env bash

# Helper scripts that
# Tests, packages, tests, executes Lambda itests, etc...
# Usage:
#   ./build-and-deploy-to-dev.sh build_number
set -e

cd "$( dirname "${BASH_SOURCE[0]}" )"

build_number=$1
lambda_name=$2

echo -e "\n==================== Get Lambda UAT Version ================================\n"
uat_version=$(aws lambda get-function --function-name ${lambda_name}:UAT --query "to_number(Configuration.Version)")

echo -e "\n==================== Get Lambda PROD Version ================================\n"
prod_version=$(aws lambda get-function --function-name ${lambda_name}:PROD --query "to_number(Configuration.Version)")

echo "UAT Version is ${uat_version}"
echo "PROD Version is ${prod_version}"

echo -e "\n==================== Update Lambda PROD Alias =============================\n"
sh ./5-update-prod-alias.sh ${build_number} ${uat_version}
