/**
 * @jest-environment node
 */

const nock = require('nock')
const fsExtra = require('fs-extra')
const config = require('../config')

beforeAll(() => {
  nock.disableNetConnect()
  fsExtra.mkdirpSync(config.workingDirDestination, '0744')
})

afterAll(() => {
  nock.enableNetConnect()
  fsExtra.removeSync(config.workingDirDestination)
})

afterEach(() => nock.cleanAll())
