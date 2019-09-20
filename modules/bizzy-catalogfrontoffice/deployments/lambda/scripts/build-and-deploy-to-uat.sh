#!/usr/bin/env bash

# Helper scripts that
# Tests, packages, tests, executes Lambda itests, etc...
# Usage:
#   ./build-and-deploy-to-dev.sh build_number
set -e

cd "$( dirname "${BASH_SOURCE[0]}" )"

build_number=$1
lambda_name=$2

echo -e "\n==================== Get Lambda TEST Version ================================\n"
version=$(aws lambda get-function --function-name ${lambda_name}:TEST --query "to_number(Configuration.Version)")

echo ${version}

echo -e "\n==================== Update Lambda UAT Alias =============================\n"
sh ./5-update-uat-alias.sh ${build_number} ${version}
