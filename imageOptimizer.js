const jimp = require('jimp')

async function run (images, quality) {
  await Promise.all(
    images.map(async imgPath => {
      const image = await jimp.read(imgPath)
      await image.quality(quality)
      await image.writeAsync(imgPath)
    })
  )
}

module.exports = {
  run: run
}
