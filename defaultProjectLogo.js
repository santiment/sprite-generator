const path = require('path')

function defaultProjectLogo () {
  const defaultProjectLogo = 'default_project_logo.png'

  return {
    localFilepath: path.join(`${__dirname}/images/`, defaultProjectLogo),
    filename: defaultProjectLogo,
    contentType: 'image/png'
  }
}

module.exports = {
  defaultProjectLogo: defaultProjectLogo
}
