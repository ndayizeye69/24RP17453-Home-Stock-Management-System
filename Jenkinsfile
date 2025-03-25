pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'inventory-api'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        KUBECONFIG = credentials('kubeconfig')
    }

    stages {
        stage('Build') {
            steps {
                script {
                    // Build the Docker image
                    docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    // Run tests inside a Docker container
                    docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").inside {
                        sh 'npm install'
                        sh 'npm test'
                    }
                }
            }
        }

        stage('Push') {
            steps {
                script {
                    // Push to container registry
                    docker.withRegistry('https://registry.example.com', 'registry-credentials') {
                        docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").push()
                        docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").push('latest')
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Update Kubernetes deployment
                    sh "kubectl --kubeconfig=$KUBECONFIG set image deployment/inventory-api inventory-api=${DOCKER_IMAGE}:${DOCKER_TAG}"
                    sh "kubectl --kubeconfig=$KUBECONFIG rollout status deployment/inventory-api"
                }
            }
        }
    }

    post {
        always {
            // Clean up local Docker images
            sh "docker rmi ${DOCKER_IMAGE}:${DOCKER_TAG} || true"
            sh "docker rmi ${DOCKER_IMAGE}:latest || true"
        }
    }
}