@Library('podTemplateLib')

import net.santiment.utils.podTemplates
slaveTemplates = new podTemplates()

slaveTemplates.dockerTemplate { label ->
  node(label) {
    container('docker') {
      def scmVars = checkout scm

      sh "docker build \
        -t sprite-generator-test:${scmVars.GIT_COMMIT}-${env.BUILD_ID}-${env.CHANGE_ID} \
        -f docker/test/Dockerfile . \
        --progress plain"

      stage('Test') {
        try {
          sh "docker run --rm \
            -t sprite-generator-test:${scmVars.GIT_COMMIT}-${env.BUILD_ID}-${env.CHANGE_ID}"
        } finally {
        }
      }
      
      stage('Build & Push if Master') {
        if (env.BRANCH_NAME == "master") {
          withCredentials([
            string(
              credentialsId: 'aws_account_id',
              variable: 'aws_account_id'
            )
          ]) {
            def gitHead = scmVars.GIT_COMMIT.substring(0,7)
            def awsRegistry = "${env.aws_account_id}.dkr.ecr.eu-central-1.amazonaws.com"

            docker.withRegistry("https://${awsRegistry}", "ecr:eu-central-1:ecr-credentials") {
              sh "docker build \
                -t ${awsRegistry}/sprite-generator:${env.BRANCH_NAME} \
                -t ${awsRegistry}/sprite-generator:${scmVars.GIT_COMMIT} \
                --build-arg GIT_HEAD=${gitHead} \
                -f docker/production/Dockerfile . \
                --progress plain"

            }

            sh "docker push ${awsRegistry}/sprite-generator:${env.BRANCH_NAME}"
            sh "docker push ${awsRegistry}/sprite-generator:${scmVars.GIT_COMMIT}"
          }
        }
      }
    }
  }
}
