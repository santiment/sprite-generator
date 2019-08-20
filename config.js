const env = process.env.NODE_ENV || 'development'

const production = {
  workingDirDestination: `${__dirname}/tmp/`
}

const development = {
  workingDirDestination: `${__dirname}/tmp/`
}

const test = {
  workingDirDestination: `${__dirname}/test/tmp/`
}

const config = {
  production,
  development,
  test
}

module.exports = config[env]
