const bcrypt = require('bcryptjs');

const { User } = require('../models');

// LOGIN
// ===============================================================================

exports.getLogin = (req, res) => {
  res.render('auth/login', {
    docTitle: 'Login',
    pageCategory: null
  });
};

// SIGNUP
// ===============================================================================

exports.getSignup = (req, res) => {
  res.render('auth/signup', {
    docTitle: 'Signup',
    pageCategory: null
  });
};

exports.postSignup = (req, res) => {
  const {
    email,
    uname,
    fname,
    lname,
    pass
  } = req.body;

  console.log(req.body);

  User
    .findOne({ $or: [{ email: email }, { uname: uname }] })
    .then(userDoc => {
      if (userDoc) {
        console.log('user already existsted');
      }
    });
};