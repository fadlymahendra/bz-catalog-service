export PATH=/home/jenkins/sonar-scanner-3.0/bin:$PATH
java -version
env

set -e
mkdir -p reports

for dir in ./modules/bizzy-*/
do
    echo "\nStart Processing ${dir}"

    mkdir -p ${dir}coverage
    rm -f ${dir}package-lock.json
    npm install --prefix ${dir}
    npm run unit-test --prefix ${dir}

    cp -r ${dir}coverage/report.html ${dir}../../reports/$(basename ${dir}).html

    R=$(echo ${dir}|sed 's/\//-/g')
    sonar-scanner -D sonar.sources=src -D sonar.tests=tests -D sonar.projectBaseDir=${dir} -D sonar.projectKey=${R} -D sonar.projectName=${R} -D sonar.branch=$GIT_BRANCH -D sonar.host.url=http://52.76.48.239:9007 -D sonar.login=fe60df6e335d89141d47b35fe90c739bef19d4f0

    buildId=$(uuidgen)
    npm run deploy-staging --prefix ${dir} -- ${buildId} $(basename ${dir})
    #jalanin integration test di sini
    npm run deploy-uat --prefix ${dir} -- ${buildId}

    echo "\nFinish Processing $(basename ${dir})"
done
