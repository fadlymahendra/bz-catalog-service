#!/usr/bin/env bash

# Publishes the version $LATEST Lambda with the build number as description
#
# Usage:
#   5-publish-version.sh build_number
set -e

script_dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

lambda_name=$(echo $script_dir | awk -F/ '{print $(NF-3)}')
build_number=$1

if [ -z "$AWS_DEFAULT_REGION" ]; then
    aws_region="ap-southeast-1"
else
    aws_region=$AWS_DEFAULT_REGION
fi

aws lambda publish-version --function-name ${lambda_name} --description ${build_number} --region ${aws_region} --query "to_number(Version)"