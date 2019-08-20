/**
 * @jest-environment node
 */

const nock = require('nock')
const fsExtra = require('fs-extra')
const config = require('../config')

beforeAll(() => nock.disableNetConnect())
afterAll(() => nock.enableNetConnect())

afterEach(() => {
  nock.cleanAll()
  fsExtra.removeSync(config.workingDirDestination)
})
