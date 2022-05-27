const express = require('express')
const createError = require('http-errors')
const logger = require('../../../config/logger')
const data = require('./data')
const Person = require('../../models/person.model')


const controller = express.Router()
controller.get('/', async (req, res) => {
  const people = await Person.find()
  // Debug szintű logolás, csak a konzolra.
  logger.debug(`Get all people, returning ${people.length} items.`)
  res.json(people)
  // Átalakítja a tömböt json formátumba.
})

// Get one person.
controller.get('/:id', async (req, res, next) => {
  // const person = data.find(person => person.id === Number(req.params.id))

  const person = await Person.findById(req.params.id)
  if (!person) {
    return next(new createError.NotFound(`Person ${req.params.id} is not found.`))
  }
  res.json(person)
})

// Create a new person.
controller.post('/', (req, res, next) => {
  const { last_name, first_name, email } = req.body
  if (!first_name || !last_name || !email) {
    return next(new createError.BadRequest('Missing properties!'))
  }

  // const newPerson = req.body
  // newPerson.id = data[data.length - 1].id + 1
  // data.push(newPerson)

  const newPerson = new Person({
    firstName: first_name,
    lastName: last_name,
    email
  })

  newPerson.save()
    .then(data => {
      res.status(201)
      res.send(data)
    })

})

// Update a person.
controller.put('/:id', async (req, res, next) => {
  const id = req.params.id
  // const index = data.findIndex(person => person.id === Number(id))
  const { first_name, last_name, email } = req.body
  if (!first_name || !last_name || !email) {
    return next(new createError.BadRequest('Missing properties!'))
  }

  // data[index] = { id: Number(id), first_name, last_name, email }
  const update = {
    firstName: first_name,
    lastName: last_name,
    email
  }

  let person = {}
  try {
    person = await Person.findByIdAndUpdate(id, update, { new: true, useFindAndModify: false })
  } catch (err) {
    return next(new createError.BadRequest(err))
  }
  return res.json(person)

  // res.send(data[index])
})

// Delete a person.
controller.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const person = await Person.findByIdAndDelete(id)
  } catch (err) {
    return next(new createError.NotFound('Person is not found.'))

  }
  res.json({})
})

module.exports = controller