const urlFetcher = require('./urlFetcher')
const Downloader = require('./downloader')
const spriteGenerator = require('./spriteGenerator')

async function run () {
  let logos = await urlFetcher.run()

  const downloader = new Downloader(logos)
  logos = await downloader.run()

  await spriteGenerator.run(logos)

  downloader.emptyWorkingDir()
}

module.exports = {
  run: run
}
