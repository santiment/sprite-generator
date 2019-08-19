#!/usr/bin/env node

const runner = require('./runner')

runner.run().catch(error => console.error(error))
