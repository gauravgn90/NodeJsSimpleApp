pipeline {
  agent any
  
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
        sh 'npm run build'
      }
    }
    
    stage('Test') {
      steps {
        sh 'npm test'
      }
    }
    
    stage('Deploy') {
      when {
        branch 'master'
      }
      steps {
        sh 'echo "deploying from master branch"'
      }
    }
  }
  
  post {
    always {
      sh 'echo "post alwasy will be executed"'
    }
    
    success {
      sh 'echo "Build successful!"'
    }
    
    failure {
      sh 'echo "Build failed :("'
    }
  }
}
