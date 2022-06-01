const express = require('express')
const controller = require('./post.controller')

const router = express.Router()

router.get('/:id', controller.findOne)

router.post('/', controller.create)

module.exports = router