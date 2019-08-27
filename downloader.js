const fsExtra = require('fs-extra')
const fs = require('fs')
const fsPromises = fs.promises
const config = require('./config')

const path = require('path')
const download = require('download')

module.exports = class Downloader {
  constructor (logos) {
    this.logos = logos
    this.destination = config.workingDirDestination + Math.random().toString(36).substring(7)
    this._createDestinationDir()
  }

  _createDestinationDir () {
    if (!fsExtra.existsSync(this.destination)) {
      fsExtra.mkdirpSync(this.destination, '0744')
    }
  }

  emptyWorkingDir () {
    fsExtra.removeSync(this.destination)
  }

  async run () {
    return Promise.all(this.logos.map(logo => this.download(logo)))
  }

  async download (logo) {
    const filename = logo.filename()
    const url = logo.downloadUrl

    try {
      const data = await download(url)
      const absolutePath = path.join(this.destination, filename)
      await fsPromises.writeFile(absolutePath, data)
      logo.localFilepath = absolutePath
      return logo
    } catch (e) {
      console.error(`Error downloading logo for: ${filename} from: ${url}`, e.stack)
      throw e
    }
  }
}
