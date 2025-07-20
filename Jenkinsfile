pipeline {
    agent any
    parameters
            {
                booleanParam(name: "SKIP_TEST", defaultValue: false, description: 'Skip npm test')
                booleanParam(name: "DEPLOY", defaultValue: false, description: 'Deploy')
            }

    stages {

        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            when {
                expression {
                    params.SKIP_TEST == false
                }
            }
            steps {
                bat 'npm test -- --watchAll=false'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to S3') {
            when {
                expression {
                    params.DEPLOY == true
                }
            }
            steps {
                withCredentials([usernamePassword(credentialsId: 'kredki', usernameVariable: 'AWS_ACCESS_KEY_ID', passwordVariable: 'AWS_SECRET_ACCESS_KEY')]) {
                    sh '''
                aws s3 sync build/ s3://jenkins-example-q8w7e5r2 --delete
            '''
                }
            }
        }
    }
}