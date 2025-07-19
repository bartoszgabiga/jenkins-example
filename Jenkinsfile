pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        git url: 'https://github.com/bartoszgabiga/jenkins-example.git', branch: 'main'
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test -- --watchAll=false --testPathPattern="C:/Users/barto/.jenkins/workspace/jenkins-example/src/tests/*.test.js"'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Deploy to S3') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'aws-jenkins-creds', usernameVariable: 'AWS_ACCESS_KEY_ID', passwordVariable: 'AWS_SECRET_ACCESS_KEY')]) {
          sh '''
                aws s3 sync build/ s3://jenkins-example-q8w7e5r2 --delete
            '''
        }
      }
    }
  }
}