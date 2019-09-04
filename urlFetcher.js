const { request } = require('graphql-request')
const Logo = require('./logo')
const config = require('./config')

async function run () {
  const query = `{
    allProjects {
      slug
      logoUrl
    }
  }
  `

  const data = await request(`${config.santimentUrl}/graphql`, query)

  return data
    .allProjects
    .filter(elem => elem.logoUrl !== null)
    .map(elem => new Logo(elem.slug, elem.logoUrl))
}

module.exports = {
  run: run
}
