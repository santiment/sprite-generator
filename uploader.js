const fs = require('fs')
const fsPromises = fs.promises
const S3 = require('aws-sdk/clients/s3')
const config = require('./config')

module.exports = class Uploader {
  constructor (files) {
    this.files = files
    this.s3 = new S3({ accessKeyId: config.s3Key, secretAccessKey: config.s3Secret, region: config.s3Region })
  }

  async run () {
    return Promise.all(this.files.map(file => this._upload(file)))
  }

  async _upload (file) {
    const fileBody = await fsPromises.readFile(file.localFilepath)

    const params = {
      Bucket: config.s3Bucket,
      Key: this._s3Path(file.filename),
      Body: fileBody,
      ContentType: file.contentType
    }

    await this.s3.putObject(params).promise()
  }

  _s3Path (filename) {
    return `${config.s3Path}/${filename}`
  }
}
