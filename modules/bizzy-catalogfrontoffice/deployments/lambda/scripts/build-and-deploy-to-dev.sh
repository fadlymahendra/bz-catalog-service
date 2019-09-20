#!/usr/bin/env bash

# Helper scripts that
# Tests, packages, tests, executes Lambda itests, etc...
# Usage:
#   ./build-and-deploy-to-dev.sh build_number
set -e

cd "$( dirname "${BASH_SOURCE[0]}" )"

script_dir=$(pwd)

echo -e "\n==================== Package Files =========================================\n"
sh ./2-package.sh

echo -e "\n==================== Deploy Lambda =========================================\n"
sh ./3-update-lambda.sh
