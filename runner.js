const debug = require('debug')('runner')
const urlFetcher = require('./urlFetcher')
const Downloader = require('./downloader')
const spriteGenerator = require('./spriteGenerator')

async function run () {
  debug('fetching urls...')
  let logos = await urlFetcher.run()
  debug('done')

  debug('downloading logos...')
  const downloader = new Downloader(logos)
  logos = await downloader.run()
  debug('done')

  debug('generating sprite image...')
  await spriteGenerator.run(logos)
  debug('done')

  debug('cleaning-up...')
  downloader.emptyWorkingDir()
  debug('done')

  debug('finished')
}

module.exports = {
  run: run
}
