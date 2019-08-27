const config = require('./config.js')

function generateCSS (coordinates) {
  let result =
`.project-icon {
  background-image: url('${config.santimentUrl}/sprite.png');
  width: 64px;
  height: 64px;
}
`
  for (const slug of Object.keys(coordinates)) {
    result += projectPosition(slug, coordinates)
  }
  return result
}

function projectPosition (slug, coordinates) {
  const projectLogoCss =
`.project-icon-${slug} {
  background-position: ${coordinates[slug]['x']}px ${coordinates[slug]['y']}px;
}
`
  return projectLogoCss
}

module.exports = {
  generateCSS: generateCSS
}
