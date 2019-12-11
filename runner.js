const urlFetcher = require('./urlFetcher')
const Downloader = require('./downloader')
const { defaultLogo } = require('./spriteFiles')
const spriteGenerator = require('./spriteGenerator')
const Uploader = require('./uploader')
const { logger } = require('./logger')

async function run () {
  logger.info('Fetching logo urls...')
  let logos = await urlFetcher.run()
  logger.info(`Done fetching urls for ${logos.length} logos.`)

  logger.info('Downloading logos...')
  const downloader = new Downloader(logos)
  logos = await downloader.run()
  logger.info(`Done downloading ${logos.length} logos.`)

  logger.info('Generating sprite files...')
  const generatedFiles = await spriteGenerator.run(logos)
  logger.info(`Done generating sprite files: ${JSON.stringify(generatedFiles)}.`)

  const uploader = new Uploader()

  logger.info(`Uploading sprite files...`)
  const uploadedSpriteFilesResponse = await uploader.run(generatedFiles)
  logger.info(`Done uploading sprite files: ${JSON.stringify(uploadedSpriteFilesResponse)}.`)

  logger.info(`Uploading default project logo...`)
  const uploadedDefaultLogoResponse = await uploader.run([defaultLogo])
  logger.info(`Done uploading default project logo: ${JSON.stringify(uploadedDefaultLogoResponse)}`)

  logger.info('Cleaning-up temp files...')
  downloader.emptyWorkingDir()
  logger.info('Done cleaning-up')

  logger.info('Finished')
}

module.exports = {
  run: run
}
