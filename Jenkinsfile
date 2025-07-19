pipeline {
    agent any

    environment {
        AWS_DEFAULT_REGION = 'eu-west-1'
        BLUE_BUCKET = 'jenkins-example-q8w7e5r2'
        GREEN_BUCKET = 'jenkins-example-blue-green'
        ALIAS_BUCKET = 'my-app-alias'
    }

    stages {

        stage('Manual approval') {
            steps {
                timeout(time: 10, unit: 'MINUTES') {
                    input message: "Switch traffic?", ok: "Yes, switch"
                }
            }
        }

        stage('Switch traffic') {
            steps {
                script {
                    script {
                        def currentRedirect = sh(
                                script: "aws s3 cp s3://${ALIAS_BUCKET}/index.html - || echo ''",
                                returnStdout: true
                        ).trim()

                        if (currentRedirect.contains("${BLUE_BUCKET}")) {
                            env.TARGET_BUCKET = GREEN_BUCKET
                        } else {
                            env.TARGET_BUCKET = BLUE_BUCKET
                        }

                        echo "Will switch traffic to: ${env.TARGET_BUCKET}"
                    }

                    def redirectHtml = """
                    <html><head>
                    <meta http-equiv="refresh" content="0; url=http://${env.TARGET_BUCKET}.s3-website-${env.AWS_DEFAULT_REGION}.amazonaws.com" />
                    </head></html>
                    """.stripIndent()

                    writeFile file: 'redirect.html', text: redirectHtml
                    sh "aws s3 cp redirect.html s3://${ALIAS_BUCKET}/index.html --content-type text/html"
                }
            }
        }
    }
}