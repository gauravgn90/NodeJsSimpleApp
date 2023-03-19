pipeline {
    agent {label 'agent1'}
    options {
        buildDiscarder(logRotator(numToKeepStr:'5'))
    }

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
    }

    stages {
         stage('Login') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }

        stage('Build') {
            steps {
                sh 'docker build -t nodejs-simple-app:${BUILD_NUMBER} -f Dockerfile .'
            }
        }
        stage('Tag') {
            steps {
                sh 'docker tag nodejs-simple-app:${BUILD_NUMBER} gauravgn90/nodejs-simple-app:${BUILD_NUMBER}'
            }
        }

        stage('Push') {
            steps {
                sh 'docker push nodejs-simple-app:${BUILD_NUMBER}'
            }
        }
    }
    
    post {
        always {
            sh 'echo "post always will be executed"'
        }
        
        success {
            sh 'echo "Build successful!"'
        }
        
        failure {
            sh 'echo "Build failed :("'
        }
    }

}