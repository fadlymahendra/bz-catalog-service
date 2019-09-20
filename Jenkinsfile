#!/usr/bin/env groovy
def commons
node("sdet-node-staging") {
  timestamps {
    wrap([$class: "AnsiColorBuildWrapper", "colorMapName": "XTerm", "defaultFg": 1, "defaultBg": 2]) {
      def pipelines
      def currentDir = pwd()
      def VERSION

      stage("Prepare the Repo") {
        step([$class: 'WsCleanup'])
        checkout scm
        commons = load 'common.groovy'
        pipelines = load "${currentDir}/pipeline.groovy"
        def HEAD_REF = pipelines.getCommitHash()
        VERSION = "$HEAD_REF"
      }

      stage("Labelling") {
        currentBuild.displayName = "#$env.BUILD_NUMBER-git--$VERSION"
      }

      stage("Unit Testing & Static Analysis") {
        bitbucketStatusNotify(
          buildState: 'INPROGRESS',
          buildKey: 'unit-test',
          buildName: 'unit-test'
        )
        int x = 0
        try {
          sh "whoami"
            withEnv(["PATH+=/home/ubuntu/.nvm/versions/node/v8.15.0/bin:/home/ubuntu/sonar-scanner-3.0/bin"]) {
              sh "aws s3 cp s3://bizzy-sams/sdet/staging/jenkins_config/runner-unittest-sonar.sh ./runner-unittest-sonar.sh"
              sh "echo $PATH"
              sh "node -v"
              sh "npm -v"
              sh "chmod +x *.sh"
              sh "./runner-unittest-sonar.sh"
            }
        } catch(Exception error) {
          x=-1
        }
        commons.publishHTMLReports("reports","bizzy-catalog-pubsub.html", "Unit Test Catalog Pub-Sub Report")
        commons.publishHTMLReports("reports","bizzy-catalogbackoffice.html", "Unit Test Catalog Backoffice Report")
        commons.publishHTMLReports("reports","bizzy-catalogfrontoffice.html", "Unit Test Catalog Frontoffice Report")
        commons.publishHTMLReports("reports","bizzy-searchengine.html", "Unit Test Search Engine Report")
        commons.publishHTMLReports("modules/bizzy-catalog-pubsub/coverage/lcov-report/","index.html", "Coverage Test Catalog Pub-Sub Report")
        commons.publishHTMLReports("modules/bizzy-catalogbackoffice/coverage/lcov-report/","index.html", "Coverage Test Catalog Backoffice Report")
        commons.publishHTMLReports("modules/bizzy-catalogfrontoffice/coverage/lcov-report/","index.html", "Coverage Test Catalog Frontoffice Report")
        commons.publishHTMLReports("modules/bizzy-searchengine/coverage/lcov-report/","index.html", "Coverage Test Search Engine Report")

        if (x<0){
          bitbucketStatusNotify(
            buildState: 'FAILED',
            buildKey: 'unit-test',
            buildName: 'unit-test',
            buildDescription: 'Something went wrong with Unit Testing!'
          )
          sh ('exit 1')
        }else{
          bitbucketStatusNotify(
            buildState: 'SUCCESSFUL',
            buildKey: 'unit-test',
            buildName: 'unit-test'
          )
        }
      }

      stage("Deploy to Staging Lambda") {
        withEnv(["PATH+=/home/ubuntu/.local/bin:/home/ubuntu/.nvm/versions/node/v8.15.0/bin:/home/ubuntu/sonar-scanner-3.0/bin"]) {
          sh """#!/bin/bash
                ./deploy-staging.sh
            """
        }
      }

      stage("Preparing Data") {
        bitbucketStatusNotify(
          buildState: 'INPROGRESS',
          buildKey: 'data-seed',
          buildName: 'data-seed'
        )
        try {
          withEnv(["PATH+=/usr/bin/:/home/ubuntu/.nvm/versions/node/v8.15.0/bin"]) {
            sh "aws s3 cp s3://bizzy-sams/sdet/staging/seed_data/catalog sdet_test/data_seed --recursive"
            sh "chmod +x -R sdet_test/data_seed"
            
            dir ('sdet_test/data_seed') {
                sh "./prepare_catalog_data_rds.sh"
                sh "./insert_catalog_data_mongo.sh"
                sh "./clean_insert_data_premoderation_mongo.sh"
            }
          }
          bitbucketStatusNotify(
            buildState: 'SUCCESSFUL',
            buildKey: 'data-seed',
            buildName: 'data-seed'
          )
        }catch(Exception e){
          bitbucketStatusNotify(
            buildState: 'FAILED',
            buildKey: 'data-seed',
            buildName: 'data-seed',
            buildDescription: 'Something went wrong with Data Seed'
          )
        }
      }

      stage("Functional Automation Testing"){
        bitbucketStatusNotify(
          buildState: 'INPROGRESS',
          buildKey: 'AT',
          buildName: 'AT'
        )

        build job: 'Catalog-Service-PublicApi-Develop', propagate: false, wait: false
        int x = 0

        withEnv(["PATH+=/home/ubuntu/.local/bin:/home/ubuntu/.nvm/versions/node/v8.15.0/bin:/home/ubuntu/sonar-scanner-3.0/bin"]) {
          dir ('sdet_test'){
            sh "aws s3 cp s3://bizzy-sams/sdet/staging/bizzy-catalog.env ./.env"
            sh "aws s3 cp s3://bizzy-sams/sdet/staging/file_expected/catalog/ ./tests/helper/frontoffice/catalog/bulk-sku/bulk-upload/excel --recursive"
            sh "mkdir -p ./tests/helper/backoffice/catalog/bulk-sku"
            sh "cp -r ./tests/helper/frontoffice/catalog/bulk-sku/bulk-upload/excel ./tests/helper/backoffice/catalog/bulk-sku/excel"

            docker.image('bizzy:sdet-test').inside {
              // sh 'npm install --package-lock-only' 
              // sh 'npm ci'
              sh 'npm install'

              try{
                sh "npm run test-api -- --grep '@skip|@publicApi' --invert"
              }catch(Exception error){
                x=-1
              }
            }

            sh 'npm run send-log-elk'
            commons.publishHTMLReports("reports/mochawesome","mochawesome.html", "API Functional Test")
          }
          
          dir ('sdet_test/data_seed') {
            sh "./clean_up_catalog_data_rds.sh"
          }
        }

        if (x<0){
          dir ('sdet_test/data_seed') {
            sh "./clean_up_catalog_data_rds.sh"
          }
          bitbucketStatusNotify(
            buildState: 'FAILED',
            buildKey: 'AT',
            buildName: 'AT',
            buildDescription: 'Something went wrong with Automation Testing!'
          )
          sh ('exit 1')
        }else{
          bitbucketStatusNotify(
            buildState: 'SUCCESSFUL',
            buildKey: 'AT',
            buildName: 'AT'
          )
        }
      }
    }
  }
}
