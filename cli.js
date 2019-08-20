#!/usr/bin/env node

console.log('Generating image sprite ...')
const runner = require('./runner')

runner.run()
  .then(console.log('Done'))
  .catch(error => console.error(error))
