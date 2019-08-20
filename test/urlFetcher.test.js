require('./helper.js')
const nock = require('nock')
const Logo = require('../logo')
const urlFetcher = require('../urlFetcher')

describe('run', () => {
  it('returns logos objects', async () => {
    nock('https://api-stage.santiment.net')
      .post('/graphql')
      .reply(200, {
        data: {
          allProjects: [
            {
              logo64Url: 'https://example.com/logo64_bitcoin.png',
              slug: 'bitcoin'
            },
            {
              logo64Url: 'https://example.com/logo64_ethereum.png',
              slug: 'ethereum'
            },
            {
              logo64Url: 'https://example.com/logo64_santiment.png',
              slug: 'santiment'
            }
          ]
        }
      })

    const result = await urlFetcher.run()

    expect(result).toEqual([
      new Logo('bitcoin', 'https://example.com/logo64_bitcoin.png'),
      new Logo('ethereum', 'https://example.com/logo64_ethereum.png'),
      new Logo('santiment', 'https://example.com/logo64_santiment.png')
    ])
  })

  it('filters projects without logo', async () => {
    nock('https://api-stage.santiment.net')
      .post('/graphql')
      .reply(200, {
        data: {
          allProjects: [
            {
              logo64Url: 'https://example.com/logo64_bitcoin.png',
              slug: 'bitcoin'
            },
            {
              logo64Url: null,
              slug: 'ethereum'
            }
          ]
        }
      })

    const result = await urlFetcher.run()

    expect(result).toEqual([new Logo('bitcoin', 'https://example.com/logo64_bitcoin.png')])
  })

  it('throws an exception when no data is returned', async () => {
    nock('https://api-stage.santiment.net')
      .post('/graphql')
      .reply(400, {})

    expect.assertions(1)

    try {
      await urlFetcher.run()
    } catch (e) {
      expect(e).toBeTruthy()
    }
  })
})
