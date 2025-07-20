pipeline {
  agent any

  stages {
    stage('Install dependencies - changed') {
      steps {
        sh 'npm install'
      }
    }

    stage('Test') {
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