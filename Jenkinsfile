def dockerimage
pipeline {
    
     agent any
    
  tools {nodejs "NodeJS 19.2.0"
          maven 'mvn'
        }
    stages {
        
        stage('Deployer app node'){

          steps {
           echo 'test'
          }
        }
        
        stage('Build') {
          steps {
              
            sh 'npm --version'  
              
            sh 'npm install '  
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
        
     stage('SonarQube analysis') {
      steps {
        script {
          def scannerHome = tool 'SonarQube';
          withSonarQubeEnv('SonarQube') {
            sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=pipdevsecops -Dsonar.projectName=pipdevsecops"
          }
        }
      }
    }
    stage('Quality gate') {
      steps {
        script {
          def qualitygate = waitForQualityGate()
          sleep(10)
          if (qualitygate.status != "OK") {
            waitForQualityGate abortPipeline: false
          }
        }
      }
    }
        
        
        
        
        stage('Vulnerability Scan - Docker') {
                steps {
                   
                     //sh "mvn dependency-check:check"
                     // dependencyCheck additionalArguments: '--format HTML --format XML --suppression suppression.xml',odcInstallation: 'OWASP-DC'
                       //  sh('mkdir -p build/owasp')
dependencyCheck additionalArguments: '--scan ./ --out dependency-check-report.xml --format XML --suppression suppression.xml', odcInstallation: 'OWASP-DC'
                       }
                     post{
                        always {
                          
                           dependencyCheckPublisher pattern: 'dependency-check-report.xml'

                             }
                        }
            
            /*steps {
                dependencyCheck additionalArguments: ''' 
                    -o "./" 
                    -s "./"
                    -f "ALL" 
                    --prettyPrint''', odcInstallation: 'OWASP-DC'

                dependencyCheckPublisher pattern: 'dependency-check-report.xml'
            }*/
            
            
            
            
              }
        
        
        
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
                        sh 'docker build -t karydock/appnode-oct:""$GIT_COMMIT"" .'
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
