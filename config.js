const env = process.env.NODE_ENV

const production = {
  workingDirDestination: `${__dirname}/tmp/`
}

const dev = {
  workingDirDestination: `${__dirname}/tmp/`
}

const test = {
  workingDirDestination: `${__dirname}/test/tmp/`
}

const config = {
  production,
  dev,
  test
}

module.exports = config[env]
