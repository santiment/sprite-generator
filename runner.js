const debug = require('debug')('runner')
const urlFetcher = require('./urlFetcher')
const Downloader = require('./downloader')
const spriteGenerator = require('./spriteGenerator')
const Uploader = require('./uploader')

async function run () {
  debug('Fetching urls...')
  let logos = await urlFetcher.run()
  debug('Done fetching urls.')

  debug('Downloading logos...')
  const downloader = new Downloader(logos)
  logos = await downloader.run()
  debug('Done downloading logos.')

  debug('Generating sprite files...')
  const spriteFiles = await spriteGenerator.run(logos)
  debug('Done generating sprite files.')

  debug('Uploading...')
  const uploader = new Uploader(spriteFiles)
  await uploader.run()
  debug('Done uploading.')

  debug('Cleaning-up temp files...')
  downloader.emptyWorkingDir()
  debug('Done cleaning-up')

  debug('Finished')
}

module.exports = {
  run: run
}
