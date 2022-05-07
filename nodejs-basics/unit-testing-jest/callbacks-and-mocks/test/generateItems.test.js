const generateItems = require('../src/generateItems')

test('generateItems should call callback for every item', () => {
  const mockCallback = jest.fn(x => x * 2) // mock function
  const arr = [1, 2]
  /* const actual = */generateItems(arr, mockCallback)
  // const expected = [2, 4]
  // expect(actual).toEqual(expected)
  // expect(mockCallback).toHaveBeenCalled()
  expect(mockCallback).toHaveBeenCalledTimes(2)
  expect(mockCallback.mock.results[0].value).toBe(2)
  expect(mockCallback.mock.results[1].value).toBe(4)
})
