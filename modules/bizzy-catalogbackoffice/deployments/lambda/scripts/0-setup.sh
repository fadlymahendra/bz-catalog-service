#!/usr/bin/env bash

# Creates the stack

set -e

script_dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

lambda_name=$(echo $script_dir | awk -F/ '{print $(NF-3)}')
nama_stack=lambda-$lambda_name-stack

template_file="$script_dir/../stack.yml"

if [ -z "$AWS_DEFAULT_REGION" ]; then
    aws_region="ap-southeast-1"
else
    aws_region=$AWS_DEFAULT_REGION
fi

aws cloudformation create-stack --stack-name ${nama_stack} --template-body file://"$template_file" --capabilities CAPABILITY_IAM --region ${aws_region}