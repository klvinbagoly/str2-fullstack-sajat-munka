const findMoviesByTitle = require('./findMoviesByTitle')

test('findMoviesByTitle should return an array of movie objects', () => {
  // expect(findMoviesByTitle('F')).toEqual([{ title: 'Flipper', emoji: '🐬' }])
  expect.addSnapshotSerializer({
    test: ({ title, emoji }) => title && emoji,
    print: ({ title, emoji }) => `${emoji} ${title}`
  })
  expect(findMoviesByTitle('F')).toMatchSnapshot()
})
