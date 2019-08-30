const Spritesmith = require('spritesmith')
const fs = require('fs')
const fsPromises = fs.promises
const path = require('path')
const config = require('./config')
const { parseSlugFromFilename } = require('./utils')
const { generateCSS } = require('./cssGenerator.js')

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

        const filesPaths = [
          path.join(config.workingDirDestination, 'sprite.png'),
          path.join(config.workingDirDestination, 'coordinates.json'),
          path.join(config.workingDirDestination, 'coordinates.json')
        ]

        fsPromises.writeFile(
          path.join(config.workingDirDestination, 'sprite.png'),
          result.image
        )

        fsPromises.writeFile(
          path.join(config.workingDirDestination, 'coordinates.json'),
          JSON.stringify(coordinates)
        )

        fsPromises.writeFile(
          path.join(config.workingDirDestination, 'coordinates.css'),
          generateCSS(coordinates)
        )
        resolve(filesPaths)
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
