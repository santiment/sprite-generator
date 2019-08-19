const fs = require('fs')
const nock = require('nock')
const Logo = require('../logo')
const Downloader = require('../downloader')

describe('run', () => {
  beforeAll(() => nock.disableNetConnect())
  afterAll(() => nock.enableNetConnect())

  afterEach(() => nock.cleanAll())

  it(`downloads file and returns it's path`, async () => {
    nock('https://example.com')
      .get('/logo64_ethereum.png')
      .reply(200, fs.readFile('./data/logo64_ethereum.png'))

    const logo = new Logo('ethereum', 'https://example.com/logo64_ethereum.png')
    const downloader = new Downloader([logo])
    const result = await downloader.run()

    expect(result).toContainEqual(
      expect.objectContaining({
        downloadUrl: 'https://example.com/logo64_ethereum.png',
        slug: 'ethereum',
        localFilepath: expect.stringContaining('ethereum.png')
      }))

    downloader.emptyWorkingDir()
  })
})
