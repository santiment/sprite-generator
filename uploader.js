const fs = require('fs')
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
    return new Promise((resolve, reject) => {
      try {
        const params = { Bucket: config.s3Bucket, Key: file.filename, Body: fs.readFileSync(file.localFilepath) }
        resolve(this.s3.putObject(params).promise())
      } catch (error) {
        reject(error)
      }
    })
  }
}
