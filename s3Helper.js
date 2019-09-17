const config = require('./config')

function s3Url (filename) {
  return `https://${config.s3Bucket}.s3.${config.s3Region}.amazonaws.com/${s3FilePath(filename)}`
}

function s3FilePath (filename) {
  return `${config.s3Path}/${filename}`
}

module.exports = {
  s3FilePath: s3FilePath,
  s3Url: s3Url
}
