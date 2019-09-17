const debug = require('debug')('runner')
const urlFetcher = require('./urlFetcher')
const Downloader = require('./downloader')
const { defaultLogo } = require('./spriteFiles')
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
  const generatedFiles = await spriteGenerator.run(logos)
  debug('Done generating sprite files.')

  const uploader = new Uploader()

  debug('Uploading sprite files...')
  await uploader.run(generatedFiles)
  debug('Done uploading sprite files.')

  debug('Uploading default project logo...')
  await uploader.run([defaultLogo])
  debug('Done uploading default project logo.')

  debug('Cleaning-up temp files...')
  downloader.emptyWorkingDir()
  debug('Done cleaning-up')

  debug('Finished')
}

module.exports = {
  run: run
}
