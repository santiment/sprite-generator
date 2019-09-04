const env = process.env.NODE_ENV || 'development'

const AWS_S3_ACCESS_KEY_ID = process.env.AWS_S3_ACCESS_KEY_ID
const AWS_S3_SECRET_ACCESS_KEY = process.env.AWS_S3_SECRET_ACCESS_KEY
const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME
const AWS_S3_BUCKET_REGION = process.env.AWS_S3_BUCKET_REGION

const production = {
  workingDirDestination: `${__dirname}/tmp/`,
  santimentUrl: 'https://api.santiment.net',
  downloaderConcurrency: 32,
  s3Key: AWS_S3_ACCESS_KEY_ID,
  s3Secret: AWS_S3_SECRET_ACCESS_KEY,
  s3Bucket: AWS_S3_BUCKET_NAME,
  s3Region: AWS_S3_BUCKET_REGION
}

const development = {
  workingDirDestination: `${__dirname}/tmp/`,
  santimentUrl: 'https://api-stage.santiment.net',
  s3Key: AWS_S3_ACCESS_KEY_ID,
  s3Secret: AWS_S3_SECRET_ACCESS_KEY,
  s3Bucket: AWS_S3_BUCKET_NAME,
  s3Region: AWS_S3_BUCKET_REGION
}

const test = {
  workingDirDestination: `${__dirname}/test/tmp/`,
  santimentUrl: 'https://example.com'
}

const config = {
  production,
  development,
  test
}

module.exports = config[env]
