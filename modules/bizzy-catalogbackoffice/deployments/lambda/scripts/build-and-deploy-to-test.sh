#!/usr/bin/env bash

# Helper scripts that
# Tests, packages, tests, executes Lambda itests, etc...
# Usage:
#   ./build-and-deploy-to-dev.sh build_number
set -e

cd "$( dirname "${BASH_SOURCE[0]}" )"

build_number=$(uuidgen)

echo -e "\n==================== Publish Lambda Version ================================\n"
sh ./4-publish-version.sh ${build_number}

echo -e "\n==================== Update TEST Lambda Alias =============================\n"
sh ./5-update-test-alias.sh ${build_number}
