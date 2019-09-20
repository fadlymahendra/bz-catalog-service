#!/usr/bin/env bash

# Creates or updates a Lambda alias to point to the specified build number
#
# Usage:
#   update-alias.sh build_number alias
set -e

script_dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
lambda_name=$(echo $script_dir | awk -F/ '{print $(NF-3)}')

build_number=$1
alias=$2

if [ -z "$AWS_DEFAULT_REGION" ]; then
    aws_region="ap-southeast-1"
else
    aws_region=$AWS_DEFAULT_REGION
fi


# Lookup the Lambda version provided by AWS by looking at the build_number in the description
#lambda_version=$(aws lambda list-versions-by-function --function-name $lambda_name --region $aws_region --query "to_number((Versions[?Description=='${build_number}'])[0].Version)")
lambda_version=$3
echo "Found matching Lambda version $lambda_version for build number $build_number"

# Update existing alias to point to the Lambda version
echo "Updating alias $alias for Lambda $lambda_name"
aws lambda update-alias --function-name $lambda_name --name $alias --function-version $lambda_version --description $build_number --region $aws_region