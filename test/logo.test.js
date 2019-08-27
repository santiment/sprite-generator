require('./helper.js')
const Logo = require('../logo.js')

it('returns filename from url', () => {
  const url = 'https://example.com/logo64_santiment.png'
  const logo = new Logo('santiment', url)

  expect(logo.filename()).toBe('santiment.png')
})
