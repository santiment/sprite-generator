const debug = require('debug')('runner')
const urlFetcher = require('./urlFetcher')
const Downloader = require('./downloader')
const spriteGenerator = require('./spriteGenerator')
const uploader = require('./uploader')

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

  debug('uploading to cloud...')
  await uploader.run('sprite.png')
  await uploader.run('coordinates.json')
  await uploader.run('coordinates.css')
  debug('done')

  debug('cleaning-up...')
  downloader.emptyWorkingDir()
  debug('done')

  debug('finished')
}

module.exports = {
  run: run
}
