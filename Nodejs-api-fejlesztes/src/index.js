require('dotenv').config()
const config = require('config')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const logger = require('../config/logger')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

// SpJ7wsJlizYWqHD8

const app = express()
const port = process.env.PORT || 3000

// Connection to MongoDB database.
if (!config.has('database')) {
  logger.error('No config database found.')
  process.exit()
}
const { username, password, host } = config.get('database')
mongoose.connect(`mongodb+srv://${username}:${password}@${host}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => logger.info('MongoDB connection has been established successfully.'))
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

app.use('/person', require('./controllers/person/person.routes'))

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


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
})