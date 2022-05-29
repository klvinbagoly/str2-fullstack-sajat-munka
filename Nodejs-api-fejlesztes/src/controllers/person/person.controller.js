const express = require('express')
const createError = require('http-errors')

const personService = require('./person.service')


exports.findAll = (req, res, next) => {
  return personService.findAll(req.params.id)
    .then(people => {
      res.json(people)
    })
}


// Get one person.
exports.findOne = (req, res, next) => {
  return personService.findOne(req.params.id)
    .then(person => {
      if (!person) {
        return next(new createError.NotFound(`Person ${req.params.id} is not found.`))
      }
      res.json(person)
    })
}


// Create a new person.
exports.create = (req, res, next) => {
  const { last_name, first_name, email } = req.body
  if (!first_name || !last_name || !email) {
    return next(new createError.BadRequest('Missing properties!'))
  }

  const newPerson = {
    firstName: first_name,
    lastName: last_name,
    email
  }

  return personService.create(newPerson)
    .then((cp) => { // created person
      res.status(201)
      res.json(cp)
    }).catch(err => next(new createError.InternalServerError(err.message)))
}

// Update a person.
exports.update = (req, res, next) => {
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
  return personService.update(req.params.id, update)
    .then(person => res.json(person))
    .catch(err => next(new createError.InternalServerError(err.message)))
}

// Delete a person.

exports.delete = (req, res, next) => {
  return personService.delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(new createError.InternalServerError(err.message)))
}