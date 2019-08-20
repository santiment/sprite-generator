@Library('podTemplateLib')

import net.santiment.utils.podTemplates
slaveTemplates = new podTemplates()

slaveTemplates.dockerTemplate { label ->
  node(label) {
    container('docker') {
        def scmVars = checkout scm
        def gitHead = scmVars.GIT_COMMIT.substring(0,7)

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
    }
  }
}