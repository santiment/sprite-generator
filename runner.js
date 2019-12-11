const debug = require('debug')('runner')
const urlFetcher = require('./urlFetcher')
const Downloader = require('./downloader')
const { defaultLogo } = require('./spriteFiles')
const spriteGenerator = require('./spriteGenerator')
const Uploader = require('./uploader')

async function run () {
  debug('Fetching logo urls...')
  let logos = await urlFetcher.run()
  debug(`Done fetching urls for ${logos.length} logos.`)

  debug('Downloading logos...')
  const downloader = new Downloader(logos)
  logos = await downloader.run()
  debug(`Done downloading ${logos.length} logos.`)

  debug('Generating sprite files...')
  const generatedFiles = await spriteGenerator.run(logos)
  debug(`Done generating sprite files: ${JSON.stringify(generatedFiles)}.`)

  const uploader = new Uploader()

  debug(`Uploading sprite files...`)
  const uploadedSpriteFilesResponse = await uploader.run(generatedFiles)
  debug(`Done uploading sprite files: ${JSON.stringify(uploadedSpriteFilesResponse)}.`)

  debug(`Uploading default project logo...`)
  const uploadedDefaultLogoResponse = await uploader.run([defaultLogo])
  debug(`Done uploading default project logo: ${JSON.stringify(uploadedDefaultLogoResponse)}`)

  debug('Cleaning-up temp files...')
  downloader.emptyWorkingDir()
  debug('Done cleaning-up')

  debug('Finished')
}

module.exports = {
  run: run
}
