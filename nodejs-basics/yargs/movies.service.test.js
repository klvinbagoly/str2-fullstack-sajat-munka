const MoviesService = require('./movies.service')
const moviesApi = jest.createMockFromModule('./movies.api.js')
const moviesStub = [{ id: 1, title: 'Title', producer: 'Producer' }]
moviesApi.get = jest.fn(() => moviesStub)
moviesApi.save = jest.fn()

const {
  findMovieByID,
  createMovie,
  editMovie,
  removeMovie
} = MoviesService(moviesApi)

describe('MoviesService', () => {
  test('findMovieById(id) should return a movie', () => {
    expect(findMovieByID(1)).toEqual(moviesStub[0])
  })

  test('createMovie should return a new movie', () => {
    const payload = { title: 'New Title', producer: 'New Producer' }
    expect(createMovie(payload)).toMatchObject(payload)
    // expect(createMovie(payload)).toEqual({ ...payload, id: 3 })
    expect(moviesApi.save).toBeCalled()
  })

  test('editMovie should return the modified movie', () => {
    const payload = { id: 1, title: 'New Title', producer: 'New Producer' }
    expect(editMovie(payload)).toEqual(payload)
    expect(moviesApi.save).toBeCalled()
  })

  test('removeMovie() should return undefined', () => {
    expect(removeMovie(1)).toBeUndefined()
    expect(moviesApi.save).toBeCalled()
  })
})
