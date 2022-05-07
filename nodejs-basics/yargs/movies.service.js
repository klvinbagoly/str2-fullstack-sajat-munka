const MoviesService = (MoviesApi) => {
  let movies = MoviesApi.get()

  const getAllMovies = () => movies

  const findMovieByID = (id) => movies.find(movie => movie.id === id)

  const generateNewMovieId = () => {
    const sortedMovies = [...movies].sort((a, b) => b.id - a.id)
    return sortedMovies[0].id + 1
  }

  const createMovie = ({ producer, title }) => {
    const movie = { id: generateNewMovieId(), producer, title }
    movies.push(movie)
    MoviesApi.save(movies)
    return movie
  }

  const editMovie = ({ id, producer, title }) => {
    movies = movies.map(movie => movie.id === id ? { id, producer, title } : movie)
    MoviesApi.save(movies)
    return findMovieByID(id)
  }

  const removeMovie = (id) => {
    movies = movies.filter(movie => movie.id !== id)
    MoviesApi.save(movies)
  }

  return {
    getAllMovies,
    findMovieByID,
    createMovie,
    editMovie,
    removeMovie
  }
}

module.exports = MoviesService
