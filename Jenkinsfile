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
                  
                   dockerImage = docker.build("karydock/appnode-oct:latest")
                    
                }
             }
                    
          }
        stage('Push image') {
            steps{
                script{
           
                   /* withDockerRegistry([credentialsId: "docker-hub", url:"https://hub.docker.com/"]){
                    dockerImage.push()}*/
                   /* docker.withRegistry('https://registry.hub.docker.com', 'docker-hub') {
                            dockerImage.push("${env.BUILD_NUMBER}")
                            dockerImage.push("latest")
                        }*/
                    withDockerRegistry([credentialsId: "docker-hub", url: ""]) {
                        sh 'printenv'
                        sh 'sudo docker build -t karydock/appnode-oct:""$GIT_COMMIT"" .'
                        sh 'docker push karydock/appnode-oct:""$GIT_COMMIT""'
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
