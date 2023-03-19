pipeline {
    agent {label 'agent1'}
    options {
        buildDiscarder(logRotator(numToKeepStr:'5'))
    }

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
    }

    stages {
        stage('Build') {
            steps {
                sh 'docker info'
            }
        }

        stage('Login') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }

        stage('Push') {
            steps {
                sh 'docker info'
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