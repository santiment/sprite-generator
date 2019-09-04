const { parseFilenameFromUrl } = require('./utils')

module.exports = class Logo {
  constructor (slug, downloadUrl, localFilepath) {
    this.slug = slug
    this.downloadUrl = downloadUrl
    this._localFilepath = localFilepath
    this._filename = this.extractFilename()
  }

  extractFilename () {
    const rawFilename = parseFilenameFromUrl(this.downloadUrl)
    return rawFilename.split('logo64_')[1] || null
  }

  get filename () {
    return this._filename
  }

  set localFilepath (filepath) {
    this._localFilepath = filepath
  }

  get localFilepath () {
    return this._localFilepath
  }
}
