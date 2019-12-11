const fsExtra = require('fs-extra')
const fs = require('fs')
const fsPromises = fs.promises
const path = require('path')
const debug = require('debug')('runner')
const PromisePool = require('es6-promise-pool')
const download = require('download')
const config = require('./config')

const concurrency = config.downloaderConcurrency || 32

module.exports = class Downloader {
  constructor (logos) {
    this.logos = logos.filter(logo => logo.filename !== null)
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
    debug(`Downloading logos with concurrency of: ${concurrency} ...`)

    const logos = [...this.logos]
    const logoPromises = []
    const self = this

    const pool = new PromisePool(function * () {
      for (const logo of logos) {
        const promise = self.download(logo)
        logoPromises.push(promise)
        yield promise
      }
    }, concurrency)

    const poolPromise = pool.start()

    await poolPromise.then(() => {
      debug('All logos downloaded.')
    }, (error) => {
      console.error(`Error occured while downloading logos. Message: ${error.message}`)
    })

    return Promise.all(logoPromises)
  }

  async download (logo) {
    const filename = logo.filename
    const url = logo.downloadUrl

    try {
      debug(`Downloading: ${logo.slug} from ${url}`)
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
