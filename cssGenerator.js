const { spriteFiles, defaultLogo } = require('./spriteFiles')
const { s3Url } = require('./s3Helper')

const size = '64px'

function generateCSS (coordinates) {
  let result =
`
.project-icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-icon::before {
  content: '';
  display: block;
  position: absolute;
  width: ${size};
  height: ${size};
  background-image: 
    url('${s3Url(spriteFiles.image.filename)}'),
    url('${s3Url(defaultLogo.filename)}');
  background-repeat: repeat, no-repeat;
  background-position: 100% 100%;
  transform: scale(var(--scale));
}
`
  for (const slug of Object.keys(coordinates)) {
    result += _projectPosition(slug, coordinates)
  }
  return result
}

function _projectPosition (slug, coordinates) {
  const projectLogoCss =
`.project-icon-${slug}::before {
  background-position: ${_generateCoordinate(coordinates[slug]['x'])} ${_generateCoordinate(coordinates[slug]['y'])};
}
`
  return projectLogoCss
}

function _generateCoordinate (coordinate) {
  if (coordinate === 0) {
    return '0px'
  } else {
    return `-${coordinate}px`
  }
}

module.exports = {
  generateCSS: generateCSS
}
