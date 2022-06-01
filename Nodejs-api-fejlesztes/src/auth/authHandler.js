const jwt = require('jsonwebtoken')

// Mock users
const Users = [
  {
    username: 'admin',
    password: 'admin_pw',
    role: 'admin'
  },
  {
    username: 'user',
    password: 'user_pw',
    role: 'user'
  },
]

const refreshTokens = []

// POST /login kérés esetén fut le.
module.exports.login = (req, res) => {
  const { username, password } = req.body
  const user = Users.find(
    user => user.username === username && user.password === password
  )

  if (user) {
    const accessToken = jwt.sign({
      username: user.username,
      role: user.role
    }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRY // 20 perc után lejár
    })

    const refreshToken = jwt.sign({
      username: user.username,
      role: user.role
    }, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken) // Nincs lejárati ideje

    res.json({ accessToken, refreshToken })
  } else {
    res.send('Username or password incorrect.')
  }
}


// AccessToken frissítése (POST /refresh, body: refreshToken)
module.exports.refresh = (req, res, next) => {
  const { token } = req.body

  if (!token) {
    res.sendStatus(401)
  }

  if (!refreshTokens.includes(token)) {
    res.sendStatus(403)
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      // Forbidden
      res.sendStatus(403)
    }

    const accessToken = jwt.sign({
      username: user.username,
      role: user.role
    }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRY
    })

    res.json({ accessToken })
  })
}

// POST /logout, body: refreshToken
module.exports.logout = (req, res) => {
  const { token } = req.body

  if (!refreshTokens.includes(token)) {
    return res.sendStatus(403)
  }

  const index = refreshTokens.indexOf(token)
  refreshTokens.splice(index, 1)

  return res.sendStatus(200)
}

