const express = require('express')
const controller = require('./person.controller')


const router = express.Router()
router.get('/', (req, res, next) => controller.findAll(req, res, next))

// Get one person.
router.get('/:id', (req, res, next) => controller.findOne(req, res, next))

// Create a new person.
router.post('/', (req, res, next) => controller.create(req, res, next))


// Update a person.
router.put('/:id', (req, res, next) => controller.update(req, res, next))



// Delete a person.
router.delete('/:id', (req, res, next) => controller.delete(req, res, next))

module.exports = router
