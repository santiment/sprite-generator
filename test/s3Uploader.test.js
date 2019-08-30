require('./helper.js')
require('dotenv').config()
const uploader = require('../uploader')
const spriteGenerator = require('../spriteGenerator.js')
const Logo = require('../logo.js')
const slug = 'ethereum'
const logoUrl = 'https://example.com/logo64_ethereum.png'
const imageFile = `${__dirname}/data/logo64_ethereum.png`
const AWSMock = require('mock-aws-s3')

const params = {
  Bucket: process.env.AWS_S3_ACCESS_KEY_ID,
  BucketArn: process.env.AWS_S3_BUCKET_NAME_ARN,
  accessId: process.env.AWS_S3_ACCESS_KEY_ID,
  accessSecret: process.env.AWS_S3_SECRET_ACCESS_KEY
}

AWSMock.config.basePath = 'test/tmp'
const s3 = AWSMock.S3(params)

it('uploads the files to s3', async () => {
  const logo = new Logo(slug, logoUrl, imageFile)
  s3.createBucket(params, function (err) {
    if (err) {
      console.error(err)
    }
  })

  const exampleSpriteFiles = await spriteGenerator.run([logo])
  await uploader.run(exampleSpriteFiles)

  s3.getObject({ Prefix: 'coordinates.json' }, function (err, data) {
    if (err) {
      console.error(err)
    } else {
      console.log(data)
    }
  })

  expect(false).toBe(true)
})
