const bcrypt = require('bcryptjs');

const { User } = require('../models');
const { validation } = require('../util');

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

exports.postSignup = (req, res, next) => {
  // destructure rules and checkMultipe out of validation
  const { rules, checkMultiple } = validation;

  const {
    email,
    uname,
    fname,
    lname,
    pass
  } = req.body;

  // see if all rules are true
  const isValid = checkMultiple([
    rules.email(email),
    rules.username(uname),
    rules.legalName(fname),
    rules.legalName(lname),
    rules.password(pass)
  ]);

  // if all rules aren't true go to an error page (because client-side you shouldn't be able to submit an invalid form)
  if (!isValid) {
    return next(422);
  }

  res.send('hi');
};