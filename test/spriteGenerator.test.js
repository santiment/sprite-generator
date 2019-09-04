require('./helper.js')
const path = require('path')
const fs = require('fs')
const fsPromises = fs.promises
const config = require('../config')
const spriteGenerator = require('../spriteGenerator.js')
const Logo = require('../logo.js')

const slug = 'ethereum'
const logoUrl = 'https://example.com/logo64_ethereum.png'
const imageFile = `${__dirname}/data/logo64_ethereum.png`

it('generates a coordinates.json file', async () => {
  const logo = new Logo(slug, logoUrl, imageFile)

  await spriteGenerator.run([logo])
  const coordinatesFile = await fsPromises.readFile(
    path.join(config.workingDirDestination, 'coordinates.json')
  )

  const coordinatesJson = JSON.parse(coordinatesFile)

  expect(coordinatesJson).toEqual({ logo64_ethereum: { x: 0, y: 0, width: 64, height: 64 } })
})

it('generates an image sprite file', async () => {
  const logo = new Logo(slug, logoUrl, imageFile)

  await spriteGenerator.run([logo])
  const exists = fs.existsSync(path.join(config.workingDirDestination, 'sprite.png'))
  expect(exists).toBe(true)
})

it('generates a coordinates.css file', async () => {
  const logo = new Logo(slug, logoUrl, imageFile)

  await spriteGenerator.run([logo])
  const exists = fs.existsSync(path.join(config.workingDirDestination, 'coordinates.css'))
  expect(exists).toBe(true)
})

it('throws an error when image sprite generation has an error', async () => {
  const logo = new Logo(slug, logoUrl, `${__dirname}/data/not_found.png`)

  try {
    await spriteGenerator.run([logo])
  } catch (e) {
    expect(e).toBeTruthy()
  }
})

it('returns list of sprite png and coordinate files', async () => {
  const logo = new Logo(slug, logoUrl, imageFile)
  const result = await spriteGenerator.run([logo])

  expect(result).toEqual([
    {
      filename: 'sprite.png',
      localFilepath: path.join(config.workingDirDestination, 'sprite.png')
    },
    {
      filename: 'coordinates.css',
      localFilepath: path.join(config.workingDirDestination, 'coordinates.css')
    },
    {
      filename: 'coordinates.json',
      localFilepath: path.join(config.workingDirDestination, 'coordinates.json')
    }
  ])
})
