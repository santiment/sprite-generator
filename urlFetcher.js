const { request } = require('graphql-request')
const Logo = require('./logo')

const SANTIMENT_GQL_URL = 'https://api-stage.santiment.net/graphql'

async function run () {
  const query = `{
    allProjects {
      slug
      logo64Url
    }
  }
  `

  const data = await request(SANTIMENT_GQL_URL, query)

  return data
    .allProjects
    .filter(elem => elem.logo64Url !== null)
    .map(elem => new Logo(elem.slug, elem.logo64Url))
}

module.exports = {
  run: run
}
