def dockerimage
pipeline {
    
     agent any
    
  tools {nodejs "NodeJS 19.1.0"}
    stages {
        
        stage('Deployer app node'){

          steps {
           echo 'test'
          }
        }
        
        stage('Build') {
          steps {
              
            sh 'npm --version'  
            sh 'npm install express'
            sh 'npm install mongo'
            sh 'npm install mocha -g'
            
          }
        }  
        /* stage('Test') {
          steps {
            sh 'npm test'
          }
        }*/
        stage('Build image with docker') {
             steps{
                script{
                   sh 'groupadd docker'
                    sh 'usermod -aG docker ${USER}'
                    
                   dockerImage = docker.build("karydock/appnode-oct:latest")
                    
                }
             }
                    
          }
        stage('Push image') {
            steps{
                script{
           
                    withDockerRegistry([credentialsId: "docker-hub", url:""]){
                    dockerImage.push()
                    
              }
               }
             }
        }
        
        
        /*stage('Docker Build and Push'){
            steps{
                withDockerRegistry([credentialsId: "docker-hub", url:""]){
                    //sh 'printenv'
                    sh 'docker build -t karydock/appnode-oct:""$GIT_COMMIT"" .'
                    sh 'docker push karydock/appnode-oct:""$GIT_COMMIT"" '
                }
            }
            
        }*/
        
         
        
    }
}
