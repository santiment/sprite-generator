const urlFetcher = require('./urlFetcher')
const Downloader = require('./downloader')
const { defaultLogo } = require('./spriteFiles')
const imageResizer = require('./imageResizer')
const imageOptimizer = require('./imageOptimizer')
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

  const logosLocalPaths = logos.map(logo => { return logo.localFilepath })

  logger.info(`Resizing ${logosLocalPaths.length} images...`)
  await imageResizer.run(logosLocalPaths, 40, 40)
  logger.info('Done resizing images.')

  logger.info(`Optimizing ${logosLocalPaths.length} images...`)
  await imageOptimizer.run(logosLocalPaths, 90)
  logger.info('Done optimizing images.')

  logger.info('Generating sprite files...')
  const generatedFiles = await spriteGenerator.run(logosLocalPaths)
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
}

module.exports = {
  run: run
}
