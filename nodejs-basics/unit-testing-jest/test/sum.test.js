const sum = require('../src/sum')

test('Sum 1 + 2 should be 3', () => {
  const actual = sum(1, 2)
  const expected = 3
  expect(actual).toBe(expected)
})

test('Sum 0.1 + 0.2 should be close to 0.3', () => {
  expect(sum(0.1, 0.2)).toBeCloseTo(0.3)
})

test('Sum gives an error if one or more parameters are not finite numbers', () => {
  const wrongParameters = [null, undefined, NaN, '', Infinity]
  wrongParameters.forEach(parameter => {
    expect(() => sum(1, parameter)).toThrow()
  })
})
