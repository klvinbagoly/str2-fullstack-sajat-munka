const convertToUpperCase = require('./convertToUpperCase')

describe('convertToUpperCase ', () => {
  test('"test" should be "TEST"', () => {
    return convertToUpperCase('test')
      .then(str => {
        expect(str).toBe('TEST')
      })
  })

  test('should give a TypeError if parameter is not a string', () => {
    return convertToUpperCase(10)
      .catch(err => {
        expect(err).toEqual(TypeError())
      })
  })
  // vagy async:
  test('"test" should be "TEST"', async () => {
    await expect(convertToUpperCase('test')).resolves.toBe('TEST')
  })

  test('should give a TypeError if parameter is not a string', async () => {
    await expect(convertToUpperCase(10)).rejects.toEqual(TypeError())
  })
})
