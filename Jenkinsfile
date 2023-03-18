pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = "https://index.docker.io/v2/"
        DOCKER_IMAGE = "https://index.docker.io/v2/nodejssimpleapp:latest"
        DOCKER_PORT = "3000"
        EXPOSED_PORT = "3000"
    }

    stages {
        stage('Fetch Code from GitHub') {
            steps {
                git branch: 'master', url: 'https://github.com/gauravgn90/NodeJsSimpleApp.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    def app = docker.build("${DOCKER_IMAGE}", "-f Dockerfile .")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry("${DOCKER_REGISTRY}", "docker-registry-credentials") {
                        docker.image("${DOCKER_IMAGE}").push()
                    }
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    def app = docker.image("${DOCKER_IMAGE}").withRun("-p ${EXPOSED_PORT}:${DOCKER_PORT}")
                }
            }
        }
    }
}
