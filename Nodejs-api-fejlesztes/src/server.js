const express = require('express')
const config = require('config')
const logger = require('./config/logger')


const bodyParser = require('body-parser')
const morgan = require('morgan')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

// Authentication.
const authenticateJwt = require('./auth/authenticate')
const adminOnly = require('./auth/adminOnly')
const authHandler = require('./auth/authHandler')

const app = express()

const swaggerDocument = YAML.load('./docs/swagger.yaml')

// Connection to MongoDB database.
if (!config.has('database')) {
  logger.error('No config database found.')
  process.exit()
}

const { username, password, host } = config.get('database')
mongoose.connect(`mongodb://${host}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // dbName: 'test'
})
  .then(() => logger.info('MongoDB connection has been established successfully.'))
  // .then(() => require('./seeder'))
  .catch(err => {
    logger.error(err)
    process.exit()
  })

// Morgan: a logoláshoz kell, kombinált logger
app.use(morgan('combined', { stream: logger.stream }))

// Statikus fájlok kiszolgálása.
// app.use('/images', express.static('images'))
app.use(express.static('public'))

// Json kéréseket automatikusan átkonvertál
app.use(bodyParser.json())


// Router - bejelentkezés
app.post('/login', authHandler.login)
app.post('/refresh', authHandler.refresh)
app.post('/logout', authHandler.logout)

// Csak bejelentkezés után tekinthető meg
app.use('/person', authenticateJwt, require('./controllers/person/person.routes'))

// Csak bejelentkezés és admin jogosultság esetén engedi tovább
app.use('/post', authenticateJwt, adminOnly, require('./controllers/post/post.routes'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Hibakezelés
app.use((err, req, res, next) => {
  logger.error(`ERR ${err.statusCode}: ${err.message}`)
  res.status(err.statusCode)
  res.json({
    hasError: true,
    message: err.message
  })
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

module.exports = app