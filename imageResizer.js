const jimp = require('jimp')

async function run (images, width, height) {
  await Promise.all(
    images.map(async imgPath => {
      const image = await jimp.read(imgPath)
      await image.resize(width, height)
      await image.writeAsync(imgPath)
    })
  )
}

module.exports = {
  run: run
}
