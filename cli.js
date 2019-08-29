#!/usr/bin/env node

console.log('Generating image sprite ...')
const runner = require('./runner')

runner.run()
  .then(() => console.log('Finished succesfully'))
  .catch(console.error.bind(console))
