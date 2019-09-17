const path = require('path')
const config = require('./config')

const spriteImageFilename = 'sprite.png'
const coordinatesCssFilename = 'coordinates.css'
const coordinatesJsonFilename = 'coordinates.json'
const defaultProjectLogoFilename = 'default_project_logo.png'

const spriteFiles = {
  image: {
    localFilepath: path.join(config.workingDirDestination, spriteImageFilename),
    filename: spriteImageFilename,
    contentType: 'image/png'
  },
  css: {
    localFilepath: path.join(config.workingDirDestination, coordinatesCssFilename),
    filename: coordinatesCssFilename,
    contentType: 'text/css'
  },
  json: {
    localFilepath: path.join(config.workingDirDestination, coordinatesJsonFilename),
    filename: coordinatesJsonFilename,
    contentType: 'application/json'
  }
}

const defaultLogo = {
  localFilepath: path.join(`${__dirname}/images/`, defaultProjectLogoFilename),
  filename: defaultProjectLogoFilename,
  contentType: 'image/png'
}

module.exports = {
  spriteFiles: spriteFiles,
  defaultLogo: defaultLogo
}
