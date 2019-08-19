const Spritesmith = require('spritesmith')
const fs = require('fs')
const fsPromises = fs.promises
const path = require('path')
const { parseSlugFromFilename } = require('./utils')

const DEST_DIR = `${__dirname}/tmp/`

async function run (logos) {
  const filesToGenerate = logos.map(logo => { return logo.localFilepath })
  return generate(filesToGenerate)
}

async function generate (files) {
  return new Promise((resolve, reject) => {
    Spritesmith.run({ src: files }, function handleResult (err, result) {
      if (err) {
        reject(err)
      } else {
        const coordinates = buildCoordinates(result)

        fsPromises.writeFile(path.join(DEST_DIR, 'sprite.png'), result.image)
        fsPromises.writeFile(path.join(DEST_DIR, 'coordinates.json'), JSON.stringify(coordinates))
        resolve('done')
      }
    })
  })
}

function buildCoordinates (result) {
  const coordinates = {}

  for (const k of Object.keys(result.coordinates)) {
    coordinates[parseSlugFromFilename(k)] = result.coordinates[k]
  }

  return coordinates
}

module.exports = {
  run: run
}
