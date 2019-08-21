const env = process.env.NODE_ENV || 'development'

const production = {
  workingDirDestination: `${__dirname}/tmp/`,
  santimentUrl: 'https://api.santiment.net'
}

const development = {
  workingDirDestination: `${__dirname}/tmp/`,
  santimentUrl: 'https://api-stage.santiment.net'
}

const test = {
  workingDirDestination: `${__dirname}/test/tmp/`,
  santimentUrl: 'https://example.com'
}

const config = {
  production,
  development,
  test
}

module.exports = config[env]
