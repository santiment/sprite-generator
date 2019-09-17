require('./helper.js')

const { generateCSS } = require('../cssGenerator.js')

it('generates the css correctly', async () => {
  const testExample = {
    ethereum: { x: 0, y: 0, width: 64, height: 64 },
    santiment: { x: 0, y: 64, width: 64, height: 64 }
  }

  const testResult = generateCSS(testExample)

  const expectedResult =
`
.project-icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-icon::before {
  content: '';
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  background-image: 
    url('https://example.com/sprite.png'),
    url('https://example.com/sprite.png');
  background-repeat: repeat, no-repeat;
  background-position: 100% 100%;
  transform: scale(var(--scale));
}
.project-icon-ethereum::before {
  background-position: 0px 0px;
}
.project-icon-santiment::before {
  background-position: 0px -64px;
}
`
  expect(testResult).toEqual(expectedResult)
})
