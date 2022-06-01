const jwt = require('jsonwebtoken')

// GET /person esetén fut le
module.exports = (req, res, next) => {
  const authHeaders = req.headers.authorization

  if (authHeaders) {
    // így néz ki: "Bearer 34gr6gt1o3874rc"
    const token = authHeaders.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        // Forbidden
        res.sendStatus(403)
      }

      req.user = user
      next()
    })
  } else {
    // Unauthorized.
    res.sendStatus(401)
  }
}