pipeline {
    agent {label 'agent2'}
    options {
        buildDiscarder(logRotator(numToKeepStr:'5'))
    }

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub_with_token')
    }

    stages {
         stage('Login') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin docker.io'
            }
        }

        stage('Build') {
            steps {
                sh 'docker build -t gauravgn90/nodejs-simple-app:${BUILD_NUMBER} -f Dockerfile .'
            }
        }
        stage('Tag') {
            steps {
                sh 'docker tag gauravgn90/nodejs-simple-app:${BUILD_NUMBER} gauravgn90/nodejs-simple-app:${BUILD_NUMBER}'
            }
        }

        stage('Push') {
            steps {
                sh '''
                docker push gauravgn90/nodejs-simple-app:${BUILD_NUMBER}
                '''
            }
        }

         stage('Deploy') {
            when {
                branch 'master'
            }
            steps {
                sh '''
                echo "deploying from master branch"
                docker run -d -p 3000:3000 -v $(pwd):/usr/src/app gauravgn90/nodejs-simple-app:${BUILD_NUMBER}
                '''
            }
        }
    }
    
    post {
        always {
            sh '''
            docker logout
            echo "post always will be executed"
            '''
        }
        
        success {
            sh 'echo "Build successful!"'
        }
        
        failure {
            sh 'echo "Build failed :("'
        }
    }

}