const { request } = require('graphql-request')
const Logo = require('./logo')
const config = require('./config')

async function run () {
  const query = `{
    allProjects {
      slug
      logo64Url
    }
  }
  `

  const data = await request(`${config.santimentUrl}/graphql`, query)

  return data
    .allProjects
    .filter(elem => elem.logo64Url !== null)
    .map(elem => new Logo(elem.slug, elem.logo64Url))
}

module.exports = {
  run: run
}
