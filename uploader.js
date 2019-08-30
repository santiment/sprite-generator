const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const AWS_S3_ACCESS_KEY_ID = process.env.AWS_S3_ACCESS_KEY_ID || ''
const AWS_S3_SECRET_ACCESS_KEY = process.env.AWS_S3_SECRET_ACCESS_KEY || ''
const AWS_S3_BUCKET_NAME =
  process.env.AWS_S3_BUCKET_NAME || 'santiment-sprite-generator-archive'
const AWS_S3_BUCKET_REGION = process.env.AWS_S3_BUCKET_REGION || 'eu-central-1'

async function run (filePaths) {
  return Promise.all(filePaths.forEach(s3Upload))
}

function s3Upload (filename) {
  return new Promise((resolve, reject) => {
    try {
      const s3 = new S3(
        {
          accessKeyId: AWS_S3_ACCESS_KEY_ID,
          secretAccessKey: AWS_S3_SECRET_ACCESS_KEY,
          region: AWS_S3_BUCKET_REGION
        }
      )
      const params = {
        Bucket: AWS_S3_BUCKET_NAME,
        Key: filename,
        Body: fs.readFileSync(filename)
      }
      resolve(s3.putObject(params))
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  run: run
}
