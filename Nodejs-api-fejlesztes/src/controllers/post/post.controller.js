const createError = require('http-errors')
const logger = require('../../config/logger')
const postService = require('./post.service')

exports.create = (req, res, next) => {
  const { title, body, author } = req.body
  if (!title || !body || !author) {
    return next(new createError.BadRequest('No title, body, or author_id!'))
  }

  const postData = {
    title,
    body,
    author
  }

  return postService.create(postData)
    .then(createdPost => {
      res.status(201)
      res.json(createdPost)
    })
    .catch(err => next(new createError.BadRequest(err.message))) // => Nem ajánlott éles környezetben.
}

exports.findOne = (req, res, next) => {
  return postService.findOne(req.params.id)
    .then(post => {
      if (!post) {
        return next(new createError.BadRequest('Post not found.'))
      }

      res.json(post)
    })
    .catch(err => next(new createError.InternalServerError(err.message)))
}