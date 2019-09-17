const path = require('path')
const config = require('./config')

function defaultProjectLogo () {
  return {
    localFilepath: path.join(`${__dirname}/images/`, config.defaultProjectLogoFilename),
    filename: config.defaultProjectLogoFilename,
    contentType: 'image/png'
  }
}

module.exports = {
  defaultProjectLogo: defaultProjectLogo
}
