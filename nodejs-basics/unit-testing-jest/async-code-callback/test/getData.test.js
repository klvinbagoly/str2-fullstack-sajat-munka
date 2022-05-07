const getData = require('../src/getData')

test('getData callback should get "data"', (done) => {
  const callback = (str) => {
    expect(str).toBe('data')
    done()
  }
  getData(callback)
})
