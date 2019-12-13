require('./helper.js')
const path = require('path')
const fs = require('fs')
const fsPromises = fs.promises
const config = require('../config')
const spriteGenerator = require('../spriteGenerator.js')
const imageFile = `${__dirname}/data/logo64_ethereum.png`

it('generates a coordinates.json file', async () => {
  await spriteGenerator.run([imageFile])
  const coordinatesFile = await fsPromises.readFile(
    path.join(config.workingDirDestination, 'coordinates.json')
  )

  const coordinatesJson = JSON.parse(coordinatesFile)

  expect(coordinatesJson).toEqual({ logo64_ethereum: { x: 0, y: 0, width: 64, height: 64 } })
})

it('generates an image sprite file', async () => {
  await spriteGenerator.run([imageFile])
  const exists = fs.existsSync(path.join(config.workingDirDestination, 'sprite.png'))
  expect(exists).toBe(true)
})

it('generates a coordinates.css file', async () => {
  await spriteGenerator.run([imageFile])
  const exists = fs.existsSync(path.join(config.workingDirDestination, 'coordinates.css'))
  expect(exists).toBe(true)
})

it('throws an error when image sprite generation has an error', async () => {
  try {
    await spriteGenerator.run([`${__dirname}/data/not_found.png`])
  } catch (e) {
    expect(e).toBeTruthy()
  }
})

it('returns list of sprite png and coordinate files', async () => {
  const result = await spriteGenerator.run([imageFile])

  expect(result).toEqual([
    {
      contentType: 'image/png',
      filename: 'sprite.png',
      localFilepath: path.join(config.workingDirDestination, 'sprite.png')
    },
    {
      contentType: 'text/css',
      filename: 'coordinates.css',
      localFilepath: path.join(config.workingDirDestination, 'coordinates.css')
    },
    {
      contentType: 'application/json',
      filename: 'coordinates.json',
      localFilepath: path.join(config.workingDirDestination, 'coordinates.json')
    }
  ])
})
