#!/usr/bin/env bash

set -e

script_dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

api_id=$(cat ${script_dir}/../api.id)

echo -e "\nDelaying 20 seconds"
sleep 20
echo -e "Creating TEST Stage"
aws apigateway create-deployment --rest-api-id ${api_id} --stage-name TEST --stage-description "Test stage" --variables LAMBDA_ALIAS=TEST

echo -e "\nDelaying 20 seconds"
sleep 20
echo "Creating UAT Stage"
aws apigateway create-deployment --rest-api-id ${api_id} --stage-name UAT --stage-description "UAT stage" --variables LAMBDA_ALIAS=TEST

echo -e "\nDelaying 20 seconds"
sleep 20
echo "Creating PROD Stage"
aws apigateway create-deployment --rest-api-id ${api_id} --stage-name PROD --stage-description "Production stage" --variables LAMBDA_ALIAS=PROD

echo -e "\nFinish step 1"

#test