#!/bin/bash

set -e

export PATH=/home/jenkins/sonar-scanner-3.0/bin:$PATH
java -version
env

mkdir -p reports

for dir in ./modules/bizzy-*/
# for dir in ./modules/bizzy-*/
do
    echo "\nStart Processing ${dir}"

    pushd ${dir}
    mkdir -p coverage
    ls
    npm ci

    if npm run unit-test-with-coverage
    then
        npm run report-test

        ls coverage

        popd

        cp -r ${dir}coverage/report.html ${dir}../../reports/$(basename ${dir}).html

        # R=$(echo ${dir}|sed 's/\//-/g'|sed 's/.-modules-//g')
        # sonar-scanner -D sonar.sources=src -D sonar.tests=tests -D sonar.projectBaseDir=${dir} -D sonar.projectKey=${R} -D sonar.projectName=${R} -D sonar.branch=$GIT_BRANCH -D sonar.host.url=http://52.76.48.239:9007 -D sonar.login=fe60df6e335d89141d47b35fe90c739bef19d4f0

        echo "\nFinish Processing $(basename ${dir})"
    else
        npm run report-test

        ls coverage

        popd

        cp -r ${dir}coverage/report.html ${dir}../../reports/$(basename ${dir}).html

        # R=$(echo ${dir}|sed 's/\//-/g'|sed 's/.-modules-//g')
        # sonar-scanner -D sonar.sources=src -D sonar.tests=tests -D sonar.projectBaseDir=${dir} -D sonar.projectKey=${R} -D sonar.projectName=${R} -D sonar.branch=$GIT_BRANCH -D sonar.host.url=http://52.76.48.239:9007 -D sonar.login=fe60df6e335d89141d47b35fe90c739bef19d4f0

        echo "\nFinish Processing $(basename ${dir})"
        exit 1
    fi
done
