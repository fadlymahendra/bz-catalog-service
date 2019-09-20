#!/usr/bin/env bash

# Deploy Serverless Application Model

script_dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

. "$script_dir/../.conf"

stack_exists=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "(length(Stacks) > to_number('0'))")

if [ $? -eq 0 ]
then
    if [ $stack_exists == true ]
    then
        echo "Stack already exists, can not create the stack"
        exit 1
    else
        echo "0.Stack does not exists, proceed..."
    fi
else
    echo "\nIT IS OKAY, IT IS NOT ERROR"
    echo "1.Stack does not exists, proceed..."
fi

set -e

template_file="$script_dir/../template.yml"
output_template_file="$script_dir/../build/template-output.yml"
bucket=$STACK_BUCKET
bucket_prefix=$STACK_FOLDER
service_name=$SERVICE_NAME

echo -e "Validating swagger files......"
swagger validate "$script_dir/../api/index.yml" > /dev/null

echo -e "\nBundling swagger files......"
mkdir -p ${script_dir}/../build
swagger bundle "$script_dir/../api/index.yml" > "$script_dir/../build/index.json" -r

echo -e "\nCreating package......"
aws cloudformation package --template-file ${template_file} --s3-bucket ${bucket} --s3-prefix ${bucket_prefix} --output-template-file ${output_template_file} --force-upload --use-json > /dev/null

echo -e "\nDeploying stack......"
aws cloudformation deploy --template-file ${output_template_file} --stack-name ${STACK_NAME} --capabilities CAPABILITY_IAM

if [ -e ${script_dir}/../api.id ]
then
    cp ${script_dir}/../api.id ${script_dir}/../old.api.id

    if [ -e ${script_dir}/../api.url ]
    then
        cp ${script_dir}/../api.url ${script_dir}/../old.api.url
    else
        echo -e "\nAPI.URL not found, keep going"
    fi

    echo -e "\nOLD DATA FOUND"
else
    echo -e "\nNEW DEPLOYMENT"
fi

rm -f ${script_dir}/../api.id
rm -f ${script_dir}/../api.url

echo -e "\nGetting deployed service id......"
result_api_id=$(aws apigateway get-rest-apis --query "(items[?name=='$service_name'])[0].id")

temp="${result_api_id%\"}"
api_id="${temp#\"}"

echo -e "\n"

file_content=$(echo "API ID: $api_id")
url_content=$(echo \
"Your API Endpoints:" \
"\nhttps://$api_id.execute-api.ap-southeast-1.amazonaws.com/DEV/" \
"\nhttps://$api_id.execute-api.ap-southeast-1.amazonaws.com/TEST/" \
"\nhttps://$api_id.execute-api.ap-southeast-1.amazonaws.com/UAT/" \
"\nhttps://$api_id.execute-api.ap-southeast-1.amazonaws.com/PROD/")

echo -e $file_content
echo -e $api_id > ${script_dir}/../api.id

echo -e $url_content
echo -e $url_content > ${script_dir}/../api.url

echo -e "\nFinish step 0"