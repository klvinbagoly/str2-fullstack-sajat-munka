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

// POST /login kérés esetén fut le.
module.exports = (req, res) => {
  const { username, password } = req.body
  const user = Users.find(
    user => user.username === username && user.password === password
  )

  if (user) {
    const accessToken = jwt.sign({
      username: user.username,
      role: user.role
    }, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken })
  } else {
    res.send('Username or password incorrect.')
  }


}