#!/bin/bash
set -e

if [ -z "$AWS_DEFAULT_REGION" ]; then
    aws_region="ap-southeast-1"
else
    aws_region=$AWS_DEFAULT_REGION
fi

for dir in ./modules/bizzy-*/
do
    lambda_name=$(basename ${dir})
    prod_name=${lambda_name}-production

    buildId=$(uuidgen)
    npm run deploy-prod --prefix ${dir} -- ${buildId} ${lambda_name}

    raw_url=$(aws lambda get-function --function-name ${lambda_name}:PROD --query "Code.Location")

    temp="${raw_url%\"}"
    lambda_url="${temp#\"}"

    wget ${lambda_url} -O ${buildId}.zip

    aws lambda update-function-code --function-name ${prod_name} --zip-file fileb://${buildId}.zip --region ${aws_region}

    rm ${buildId}.zip

    echo "Released"
done