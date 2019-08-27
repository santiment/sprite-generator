require('./helper.js')
const nock = require('nock')
const Logo = require('../logo')
const Downloader = require('../downloader')

describe('run', () => {
  it(`downloads file and returns it's path`, async () => {
    nock('https://example.com')
      .get('/logo64_ethereum.png')
      .replyWithFile(200, `${__dirname}/data/logo64_ethereum.png`, {
        'Content-Type': 'image/png'
      })

    const logo = new Logo('ethereum', 'https://example.com/logo64_ethereum.png')
    const downloader = new Downloader([logo])
    const result = await downloader.run()

    expect(result).toContainEqual(
      expect.objectContaining({
        downloadUrl: 'https://example.com/logo64_ethereum.png',
        slug: 'ethereum',
        localFilepath: expect.stringContaining('ethereum.png')
      }))
  })
})
