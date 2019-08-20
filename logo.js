const { parseFilenameFromUrl } = require('./utils')

module.exports = class Logo {
  constructor (slug, downloadUrl, localFilepath) {
    this.slug = slug
    this.downloadUrl = downloadUrl
    this._localFilepath = localFilepath
  }

  filename () {
    const rawFilename = parseFilenameFromUrl(this.downloadUrl)
    return rawFilename.split('logo64_')[1]
  }

  set localFilepath (filepath) {
    this._localFilepath = filepath
  }

  get localFilepath () {
    return this._localFilepath
  }
}
