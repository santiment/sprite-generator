#!/usr/bin/env node

const runner = require('./runner')
const { logger } = require('./logger')

runner.run()
  .then(() => logger.info('Finished succesfully'))
  .catch(console.error.bind(console))
