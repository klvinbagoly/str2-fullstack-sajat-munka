const yargs = require('yargs')
const { id, producer, title } = require('./options')
const MoviesService = require('./movies.service')
const { dbFilePath, propName } = require('./config')

const MoviesApi = require('./movies.api')(dbFilePath, propName)
const {
  getAllMovies,
  findMovieByID,
  createMovie,
  editMovie,
  removeMovie
} = MoviesService(MoviesApi)

yargs
  .version('1.0.0')
  .usage('Usage: <command> [options]')
  .command({
    command: 'get',
    describe: 'Get all movies',
    handler: () => console.log(getAllMovies())
  })
  .command({
    command: 'find',
    describe: 'Find a movie by id',
    builder: { id },
    handler: (args) => console.log(findMovieByID(args.id))
  })
  .command({
    command: 'create',
    describe: 'Create a new movie',
    builder: { producer, title },
    handler: (args) => {
      console.log(createMovie(args))
    }
  })
  .command({
    command: 'edit',
    describe: 'Edit a movie',
    builder: { id, producer, title },
    handler: (args) => {
      console.log(editMovie(args))
    }
  })
  .command({
    command: 'remove',
    describe: 'Remove a movie by ID',
    builder: { id },
    handler: (args) => {
      removeMovie(args.id)
      console.log('Deleted')
    }
  })
  .locale('en')
  .strict()
  .help()
  .parse() // process.argv helyett args-ban lesz elérhető a parancs
