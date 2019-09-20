#!/usr/bin/env groovy

def publishHTMLReports(String reportDir, String reportFiles, String reportName){
    publishHTML (target: [
            allowMissing: false,
            alwaysLinkToLastBuild: false,
            keepAll: true,
            reportDir: "${reportDir}",
            reportFiles: "${reportFiles}",
            reportName: "${reportName}"
    ]
    )
}

return this
