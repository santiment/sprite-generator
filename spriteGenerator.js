const Spritesmith = require('spritesmith')
const fs = require('fs')
const fsPromises = fs.promises
const { spriteFiles } = require('./spriteFiles')
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

        Promise.all([
          fsPromises.writeFile(spriteFiles.image.localFilepath, result.image),
          fsPromises.writeFile(spriteFiles.json.localFilepath, JSON.stringify(coordinates)),
          fsPromises.writeFile(spriteFiles.css.localFilepath, generateCSS(coordinates))
        ]).then(() => {
          resolve(Object.values(spriteFiles))
        })
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
