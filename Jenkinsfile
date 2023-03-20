pipeline {
    agent {label 'agent2'}
    options {
        buildDiscarder(logRotator(numToKeepStr:'5'))
    }

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub_with_token')
    }

    parameters {
        choice(
            choices: ['branch', 'tag'],
            description: 'Choose whether to deploy a branch or tag',
            name: 'DEPLOY_TYPE'
        )
        string(
            defaultValue: 'master',
            description: 'Enter the branch name to deploy',
            name: 'BRANCH_NAME'
        )
        string(
            defaultValue: '',
            description: 'Enter the tag name to deploy',
            name: 'TAG_NAME'
        )
    }

    stages {

        // selected parameters
        stage('Selected Parameter') {
            steps {
                script {
                    if (params.DEPLOY_TYPE == 'branch') {
                        echo "Deploying branch: ${params.BRANCH_NAME}"
                    } else {
                        echo "Deploying tag: ${params.TAG_NAME}"
                    }
                }
            }
        }

        // stop docker container
        stage('Stop') {
            when {
                branch 'master'
            }
            steps {
                sh '''
                echo "stopping container"
                docker ps -q --filter "name=nodejs-app" | xargs -r docker stop
                docker ps -aq --filter "name=nodejs-app" | xargs -r docker rm
                '''
            }
        }

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
                docker run -d -p 3000:3000 --name nodejs-app -v nodejs_app:/usr/src/app gauravgn90/nodejs-simple-app:${BUILD_NUMBER}
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