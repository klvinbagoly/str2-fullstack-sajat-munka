var express = require('express');
var router = express.Router();
const userModel = require('../model/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  userModel.find({}, (err, users) => {
    res.render('users', { users: users })
  })

});

/* Show one user. */
router.get('/show/:id', function(req, res, next) {
  userModel.findOne({ _id: req.params.id }, (err, user) => {
    res.render('showuser', { user: user })
  })
})

/* Update user. */
router.post('/update/:id', function(req, res, next) {
  userModel.findOneAndUpdate({ _id: req.params.id }, req.body, (err, user) => {
    if (err) {
      console.error(err)
    }
    res.redirect('/users')
  })
})

/* GET Create user. */
router.get('/create', function(req, res, next) {
  res.render('createuser')
})

/* Create user. */
router.post('/create', function(req, res, next) {
  const user = new userModel(req.body)

  user.save((err, user) => {
    res.redirect('/users')
  })
})


/* Delete user. */
router.post('/delete/:id', function(req, res, next) {
  userModel.deleteOne({ _id: req.params.id }, (err) => {
    res.redirect('/users')
  })
})

module.exports = router;
