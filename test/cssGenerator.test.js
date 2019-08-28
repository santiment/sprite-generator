require('./helper.js')

const { generateCSS } = require('../cssGenerator.js')

it('generates the css correctly', async () => {
  const testExample = {
    ethereum: { x: 0, y: 0, width: 64, height: 64 },
    santiment: { x: 0, y: 64, width: 64, height: 64 }
  }

  const testResult = generateCSS(testExample)

  const expectedResult =
`.project-icon {
  background-image: url('https://example.com/sprite.png');
  width: 64px;
  height: 64px;
}
.project-icon-ethereum {
  background-position: 0px 0px;
}
.project-icon-santiment {
  background-position: 0px 64px;
}
`
  expect(testResult).toEqual(expectedResult)
})
