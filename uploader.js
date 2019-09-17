const fs = require('fs')
const fsPromises = fs.promises
const S3 = require('aws-sdk/clients/s3')
const config = require('./config')
const { s3FilePath } = require('./s3Helper')

module.exports = class Uploader {
  constructor () {
    this.s3 = new S3({ accessKeyId: config.s3Key, secretAccessKey: config.s3Secret, region: config.s3Region })
  }

  async run (files) {
    return Promise.all(files.map(file => this._upload(file)))
  }

  async _upload (file) {
    const fileBody = await fsPromises.readFile(file.localFilepath)

    const params = {
      Bucket: config.s3Bucket,
      Key: s3FilePath(file.filename),
      Body: fileBody,
      ContentType: file.contentType
    }

    await this.s3.putObject(params).promise()
  }
}
